document.body.insertAdjacentHTML(
  "afterbegin",
  '<div style="background:red;color:white;padding:15px">JAVASCRIPT BERJALAN</div>'
);
const prayers = ["Subuh","Zohor","Asar","Maghrib","Isyak"];
const keys = ["fajr","dhuhr","asr","maghrib","isha"];
const storageKey = "solat-tracker-v1";
let records = {};
let viewDate = new Date();
let active = null;

try {
  records = JSON.parse(localStorage.getItem(storageKey) || "{}");
} catch {
  records = {};
}

const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2,"0");

const dateKey = d =>
  `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

const monthNames = [
  "Januari","Februari","Mac","April","Mei","Jun",
  "Julai","Ogos","September","Oktober","November","Disember"
];

const shortMonths = [
  "Jan","Feb","Mac","Apr","Mei","Jun",
  "Jul","Ogo","Sep","Okt","Nov","Dis"
];

function save() {
  localStorage.setItem(storageKey, JSON.stringify(records));
}

function render() {
  $("monthLabel").textContent =
    `${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const count = new Date(year, month + 1, 0).getDate();
  const today = dateKey(new Date());

  let done = 0, qadha = 0, missed = 0;
  let html = "";

  for (let day = 1; day <= count; day++) {
    const d = new Date(year, month, day);
    const dk = dateKey(d);
    const row = records[dk] || {};

    html += `<tr class="${dk === today ? 'today' : ''}">
      <td>
        <div class="date-cell">
          <span class="date-day">${pad(day)}</span>
          <span class="date-month">${shortMonths[month]}</span>
        </div>
      </td>`;

    keys.forEach((key, i) => {
      const s = row[key] || "";

      if (s === "done") done++;
      if (s === "qadha") qadha++;
      if (s === "missed") missed++;

      const symbol =
        s === "done" ? "✓" :
        s === "qadha" ? "✓✓" :
        s === "missed" ? "!" : "";

      html += `<td>
        <button class="status-cell ${s}"
          data-date="${dk}"
          data-key="${key}"
          aria-label="${prayers[i]} ${day} ${monthNames[month]}">
          ${symbol}
        </button>
      </td>`;
    });

    html += "</tr>";
  }

  $("trackerBody").innerHTML = html;

  $("doneCount").textContent = done;
  $("qadhaCount").textContent = qadha;
  $("missedCount").textContent = missed;

  document.querySelectorAll(".status-cell").forEach(btn => {
    btn.addEventListener("click", () =>
      openStatus(btn.dataset.date, btn.dataset.key)
    );
  });
}

function openStatus(date, key) {
  active = {date, key};

  const d = new Date(date + "T12:00:00");

  $("selectedDate").textContent =
    `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;

  $("selectedPrayer").textContent =
    prayers[keys.indexOf(key)];

  $("statusDialog").showModal();
}

$("statusDialog").addEventListener("close", () => {
  if (!active) return;

  const value = $("statusDialog").returnValue;

  if (["done", "qadha", "missed"].includes(value)) {
    records[active.date] ||= {};
    records[active.date][active.key] = value;
    save();
    render();
  } else if (value === "clear") {
    if (records[active.date]) {
      delete records[active.date][active.key];

      if (!Object.keys(records[active.date]).length) {
        delete records[active.date];
      }

      save();
      render();
    }
  }

  active = null;
});

$("prevMonth").addEventListener("click", () => {
  viewDate = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() - 1,
    1
  );
  render();
});

$("nextMonth").addEventListener("click", () => {
  viewDate = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    1
  );
  render();
});

render();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
}
