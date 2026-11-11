*{box-sizing:border-box}
:root{--green:#718579;--green-dark:#20392d;--pale:#f5f7f2;--line:#e1e9e3;--done:#dcedb9;--qadha:#f4d38e;--missed:#edc1e8;--muted:#94aa9e}
body{margin:0;background:#fff;color:#20392d;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
.hero{background:var(--green);color:#fff;padding:22px 16px 20px;border-radius:0 0 20px 20px}
.topline{font-size:10px;letter-spacing:2px;opacity:.85;display:flex;gap:8px;align-items:center}
.brand-mark{font-size:16px}
h1{font-size:26px;line-height:1.1;margin:15px 0 5px;font-weight:650;letter-spacing:-.7px}
.subtitle{margin:0;color:#e0e8e2;font-size:12px}
.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:20px}
.metric{border-radius:11px;padding:10px 5px 9px;text-align:center;color:#24382c}
.metric strong{display:block;font-size:23px;line-height:1.2}
.metric span{font-size:11px;display:block;margin-top:3px}
.performed{background:var(--done)}.qadha{background:var(--qadha)}.missed{background:var(--missed)}
main{padding:15px 8px 24px;max-width:760px;margin:auto}
.monthbar{height:52px;border:1px solid var(--line);background:#f8faf6;border-radius:12px;display:flex;align-items:center;justify-content:space-between;padding:0 9px}
.monthbar h2{font-size:16px;font-weight:600;margin:0;text-align:center}
.month-arrow{border:0;background:var(--green);color:white;width:32px;height:32px;border-radius:50%;font-size:25px;line-height:23px;cursor:pointer;flex:0 0 auto}
.hint{font-size:11px;color:#8ba095;margin:12px 2px 8px}
.table-wrap{width:100%;overflow:visible}
table{width:100%;border-collapse:separate;border-spacing:3px 5px;table-layout:fixed;min-width:0}
th{font-size:clamp(9px,2.7vw,12px);font-weight:650;color:#456052;padding:6px 0;white-space:nowrap}
th.date-head{width:52px;color:#8ba095}
td{padding:0;text-align:center;min-width:0}
.date-cell{min-height:42px;background:#f5f7f2;border:1px solid var(--line);border-radius:9px;color:#8ba095;font-size:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.05}
.date-day{font-size:12px;font-weight:650}.date-month{font-size:9px;margin-top:3px}
.status-cell{display:block;height:42px;width:100%;min-width:0;padding:0;border:1px solid var(--line);border-radius:9px;background:#fff;color:#263c30;font-size:17px;cursor:pointer;transition:transform .08s}
.status-cell:active{transform:scale(.95)}
.status-cell.done{background:var(--done);border-color:var(--done)}
.status-cell.qadha{background:var(--qadha);border-color:var(--qadha);font-size:13px}
.status-cell.missed{background:var(--missed);border-color:var(--missed)}
.status-cell:focus-visible,button:focus-visible{outline:3px solid #315d48;outline-offset:2px}
.today .date-cell{color:#315d48;font-weight:700;border-color:#9db8a7}
.legend{display:flex;gap:9px 12px;flex-wrap:wrap;padding:13px 3px 3px;color:#73877b;font-size:10px}
.legend span{display:flex;align-items:center;gap:5px}
.dot{width:9px;height:9px;border-radius:3px;display:inline-block}
.dot-done{background:var(--done)}.dot-qadha{background:var(--qadha)}.dot-missed{background:var(--missed)}.dot-empty{border:1px solid #cbd8d0}
.privacy{text-align:center;color:#a0afa6;font-size:10px;margin:15px 0 0}
dialog{border:0;border-radius:20px 20px 0 0;padding:0;width:min(100%,520px);max-width:100%;position:fixed;bottom:0;top:auto;margin:0 auto;background:#fff;box-shadow:0 -10px 40px #172a1c25}
dialog::backdrop{background:#15251c66}
.dialog-content{padding:12px 20px 25px;display:flex;flex-direction:column;gap:9px}
.dialog-grip{height:4px;width:38px;border-radius:4px;background:#d9e1db;margin:0 auto 9px}
.eyebrow{font-size:10px;letter-spacing:1.5px;color:#8ba095;margin:4px 0 0}
.dialog-content h3{font-size:21px;margin:0 0 5px}
.choice{border:0;border-radius:12px;padding:14px;text-align:left;display:flex;align-items:center;gap:13px;font-size:14px;color:#25392e;cursor:pointer}
.choice span{width:30px;text-align:center;font-size:18px}
.choice-done{background:var(--done)}.choice-qadha{background:var(--qadha)}.choice-missed{background:var(--missed)}.choice-clear{background:#f3f5f3}
.cancel{border:0;background:none;color:#718579;padding:12px;font-size:14px}
@media(min-width:520px){
 .hero{padding:26px max(20px,calc((100% - 700px)/2)) 22px}
 h1{font-size:30px}.summary{max-width:500px}
 main{padding:22px 12px 28px}
 .monthbar{padding:0 16px}
 table{border-spacing:5px 6px}
 th.date-head{width:76px}
 .date-cell{min-height:46px;font-size:11px}
 .status-cell{height:46px}
}
@media(max-width:360px){
 main{padding-left:5px;padding-right:5px}
 table{border-spacing:2px 4px}
 th{font-size:8px}
 th.date-head{width:43px}
 .date-cell{min-height:39px}
 .date-day{font-size:11px}
 .status-cell{height:39px;font-size:15px;border-radius:7px}
 .status-cell.qadha{font-size:11px}
 .monthbar h2{font-size:14px}
}
