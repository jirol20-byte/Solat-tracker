(() => {
  "use strict";

  const PRAYERS = [
    { key: "fajr", label: "Subuh" },
    { key: "dhuhr", label: "Zohor" },
    { key: "asr", label: "Asar" },
    { key: "maghrib", label: "Maghrib" },
    { key: "isha", label: "Isyak" }
  ];

  // New key for the clean rebuild. This intentionally starts with fresh records.
  const STORAGE_KEY = "solat-tracker-clean-v1";
  const MONTHS = [
    "Januari", "Februari", "Mac", "April", "Mei", "Jun",
    "Julai", "Ogos", "September", "Oktober", "November", "Disember"
  ];
  const SHORT_MONTHS = [
    "Jan", "Feb", "Mac", "Apr", "Mei", "Jun",
    "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"
  ];

  const $ = (id) => document.getElementById(id);
  const pad = (number) => String(number).padStart(2, "0");
  const dateKey = (date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  let records = {};
  let viewDate = new Date();
  let activeCell = null;

  function loadRecords() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      records = saved ? JSON.parse(saved) : {};
      if (!records || typeof records !== "object" || Array.isArray(records)) records = {};
    } catch (error) {
      console.error("Could not load prayer records:", error);
      records = {};
    }
  }

  function saveRecords() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error("Could not save prayer records:", error);
      alert("Rekod tidak dapat disimpan. Semak ruang simpanan browser telefon.");
    }
  }

  function statusSymbol(status) {
    if (status === "done") return "✓";
    if (status === "qadha") return "✓✓";
    if (status === "missed") return "!";
    return "";
  }

  function render() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = dateKey(new Date());

    $("monthLabel").textContent = `${MONTHS[month]} ${year}`;

    let doneCount = 0;
    let qadhaCount = 0;
    let missedCount = 0;
    let rows = "";

    for (let day = 1; day <= daysInMonth; day += 1) {
      const currentDate = new Date(year, month, day);
      const keyForDate = dateKey(currentDate);
      const dayRecords = records[keyForDate] || {};
      const isToday = keyForDate === todayKey;

      rows += `<tr class="${isToday ? "today" : ""}">
        <td><div class="date-cell"><span class="date-day">${pad(day)}</span><span class="date-month">${SHORT_MONTHS[month]}</span></div></td>`;

      for (const prayer of PRAYERS) {
        const status = dayRecords[prayer.key] || "";

        if (status === "done") doneCount += 1;
        if (status === "qadha") qadhaCount += 1;
        if (status === "missed") missedCount += 1;

        const symbol = statusSymbol(status);
        const accessibleStatus = status
          ? (status === "done" ? "Tunai" : status === "qadha" ? "Qadha" : "Tertinggal")
          : "Belum direkod";

        rows += `<td>
          <button
            type="button"
            class="status-cell ${status}"
            data-date="${keyForDate}"
            data-prayer="${prayer.key}"
            aria-label="${prayer.label}, ${day} ${MONTHS[month]}, ${accessibleStatus}">
            ${symbol}
          </button>
        </td>`;
      }
      rows += "</tr>";
    }

    $("trackerBody").innerHTML = rows;
    $("doneCount").textContent = doneCount;
    $("qadhaCount").textContent = qadhaCount;
    $("missedCount").textContent = missedCount;
  }

  function openStatusDialog(date, prayerKey) {
    const prayer = PRAYERS.find((item) => item.key === prayerKey);
    if (!prayer) return;

    activeCell = { date, prayerKey };
    const parsedDate = new Date(`${date}T12:00:00`);

    $("selectedDate").textContent =
      `${parsedDate.getDate()} ${MONTHS[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
    $("selectedPrayer").textContent = prayer.label;

    const dialog = $("statusDialog");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      // Fallback for older browsers without HTML dialog support.
      const answer = window.prompt(
        `${prayer.label}: taip done, qadha, missed atau clear`,
        "done"
      );
      if (answer) applyStatus(answer.trim().toLowerCase());
    }
  }

  function applyStatus(status) {
    if (!activeCell) return;

    const allowed = ["done", "qadha", "missed", "clear"];
    if (!allowed.includes(status)) return;

    const { date, prayerKey } = activeCell;

    if (status === "clear") {
      if (records[date]) {
        delete records[date][prayerKey];
        if (Object.keys(records[date]).length === 0) delete records[date];
      }
    } else {
      if (!records[date]) records[date] = {};
      records[date][prayerKey] = status;
    }

    saveRecords();
    activeCell = null;
    render();
  }

  function changeMonth(amount) {
    viewDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + amount,
      1
    );
    render();
  }

  function attachEvents() {
    $("prevMonth").addEventListener("click", () => changeMonth(-1));
    $("nextMonth").addEventListener("click", () => changeMonth(1));

    $("trackerBody").addEventListener("click", (event) => {
      const button = event.target.closest("button.status-cell");
      if (!button) return;
      openStatusDialog(button.dataset.date, button.dataset.prayer);
    });

    $("statusDialog").querySelectorAll("[data-status]").forEach((button) => {
      button.addEventListener("click", () => {
        const status = button.dataset.status;
        $("statusDialog").close();
        applyStatus(status);
      });
    });

    $("statusDialog").addEventListener("close", () => {
      activeCell = null;
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol !== "https:" && location.hostname !== "localhost") return;

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }

  function start() {
    loadRecords();
    attachEvents();
    render();
    registerServiceWorker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
