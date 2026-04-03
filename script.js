const BPM_MODE = new URLSearchParams(location.search).get('type') === 'bpm';
if (BPM_MODE) document.body.classList.add('bpm-mode');

const display = document.getElementById("timer-display");
const liveRegion = document.getElementById("live-region");
const minInput = document.getElementById("min-input");
const secInput = document.getElementById("sec-input");
const btnStop = document.getElementById("btn-stop");
const btnStart = document.getElementById("btn-start");
const btnPause = document.getElementById("btn-pause");
const pageContent = document.getElementById("page-content");

const PHASE_COLORS = {
  green: "#1b5e20",
  amber: "#e65100",
  red: "#b71c1c",
};

const PHASE_BPM_SEGMENTS = {
  green: { fill: "#b9f6ca", stroke: "#ccff90" },
  amber: { fill: "#fff9c4", stroke: "#ffffff" },
  red:   { fill: "#efc100", stroke: "#fff176" },
};

const PHASE_LABELS = {
  green: null, // no announcement when starting/resuming green phase
  amber: "Less than one minute remaining",
  red: "Time is up",
};

let totalSeconds = 5 * 60;
let colonOn = true;
let remaining = totalSeconds;
let intervalId = null;
let runState = "stopped"; // 'stopped' | 'running' | 'paused'
let lastPhase = "green";
let startTime = null;      // Date.now() when the timer last started/resumed
let remainingAtStart = 0;  // remaining value at that moment

/* ── helpers ─────────────────────────────────────────── */

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTime(secs) {
  if (secs < 0) {
    const abs = Math.abs(secs);
    return `+${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
  }
  return `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`;
}

function spokenTime(secs) {
  if (secs < 0) {
    const abs = Math.abs(secs);
    const m = Math.floor(abs / 60);
    const s = abs % 60;
    const parts = [];
    if (m > 0) parts.push(`${m} minute${m !== 1 ? "s" : ""}`);
    if (s > 0) parts.push(`${s} second${s !== 1 ? "s" : ""}`);
    return `${parts.join(" and ")} over time`;
  }
  if (secs === 0) return "Time is up";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const parts = [];
  if (m > 0) parts.push(`${m} minute${m !== 1 ? "s" : ""}`);
  if (s > 0) parts.push(`${s} second${s !== 1 ? "s" : ""}`);
  return `${parts.join(" and ")} remaining`;
}

function getPhase() {
  if (remaining <= 0) return "red";
  if (remaining <= 60) return "amber";
  return "green";
}

function getDuration() {
  const m = Math.max(0, Number.parseInt(minInput.value, 10) || 0);
  const s = Math.min(59, Math.max(0, Number.parseInt(secInput.value, 10) || 0));
  return m * 60 + s;
}

/* ── UI updates ──────────────────────────────────────── */

const landscapeQuery = window.matchMedia(
  "(orientation: landscape) and (max-height: 500px)",
);
const portraitQuery = window.matchMedia(
  "(orientation: portrait) and (max-width: 768px)",
);

function fitText() {
  display.style.fontSize = "100px";
  const isPortrait = portraitQuery.matches;
  const availableWidth = landscapeQuery.matches
    ? window.innerWidth * 0.45
    : window.innerWidth * 0.75;
  const scaleW = availableWidth / display.scrollWidth;
  let scale = scaleW;
  if (isPortrait) {
    // Two stacked numbers — constrain by height too (60% of viewport)
    const scaleH = (window.innerHeight * 0.6) / display.scrollHeight;
    scale = Math.min(scaleW, scaleH);
  }
  display.style.fontSize = `${100 * scale}px`;
}

let lastTextLength = -1;

function announce(message) {
  liveRegion.textContent = "";
  // Timeout ensures the DOM change triggers a new announcement
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 50);
}

function render() {
  const text = formatTime(remaining);
  const phase = getPhase();

  const colonIdx = text.indexOf(":");
  const mins = text.slice(0, colonIdx);
  const secs = text.slice(colonIdx + 1);
  if (BPM_MODE) {
    const g = ch => `<bpm-glyph char="${ch}" aria-hidden="true"></bpm-glyph>`;
    display.innerHTML =
      `<span class="mins">${[...mins].map(g).join('')}</span>` +
      `<span class="colon">${g(colonOn ? ':' : ' ')}</span>` +
      `<span class="secs">${[...secs].map(g).join('')}</span>`;
  } else {
    display.innerHTML = `<span class="mins">${mins}</span><span class="colon">:</span><span class="secs">${secs}</span>`;
  }
  display.setAttribute("aria-label", spokenTime(remaining));
  document.body.style.backgroundColor = PHASE_COLORS[phase];
  if (BPM_MODE) {
    const { fill, stroke } = PHASE_BPM_SEGMENTS[phase];
    document.body.style.setProperty('--bpm-background', PHASE_COLORS[phase]);
    document.body.style.setProperty('--bpm-fill', fill);
    document.body.style.setProperty('--bpm-stroke', stroke);
  }

  if (text.length !== lastTextLength) {
    lastTextLength = text.length;
    fitText();
  }

  if (phase !== lastPhase) {
    lastPhase = phase;
    const msg = PHASE_LABELS[phase];
    if (msg) announce(msg);
  }
}

function syncButtons() {
  const running = runState === "running";
  btnStart.disabled = running;
  btnPause.disabled = !running;
  pageContent.style.display = runState === "stopped" ? "block" : "none";
  minInput.disabled = running;
  secInput.disabled = running;
}

/* ── timer logic ─────────────────────────────────────── */

function tick() {
  remaining = remainingAtStart - Math.floor((Date.now() - startTime) / 1000);
  if (BPM_MODE) colonOn = !colonOn;
  render();
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
  runState = "stopped";
  colonOn = true;
  totalSeconds = getDuration();
  remaining = totalSeconds;
  lastPhase = "green";
  render();
  syncButtons();
  announce("Timer stopped");
}

function start() {
  if (runState === "stopped") {
    totalSeconds = getDuration();
    remaining = totalSeconds;
    if (remaining <= 0) return;
  }
  runState = "running";
  startTime = Date.now();
  remainingAtStart = remaining;
  clearInterval(intervalId);
  intervalId = setInterval(tick, 1000);
  render();
  syncButtons();
  announce("Timer started");
}

function pause() {
  if (runState !== "running") return;
  clearInterval(intervalId);
  intervalId = null;
  runState = "paused";
  colonOn = true;
  syncButtons();
  announce("Timer paused");
}

/* ── events ──────────────────────────────────────────── */

btnStop.addEventListener("click", stop);
btnStart.addEventListener("click", start);
btnPause.addEventListener("click", pause);

function onDurationChange() {
  if (runState !== "stopped") return;
  secInput.value = Math.min(
    59,
    Math.max(0, Number.parseInt(secInput.value, 10) || 0),
  );
  totalSeconds = getDuration();
  remaining = totalSeconds;
  render();
}

minInput.addEventListener("change", onDurationChange);
secInput.addEventListener("change", onDurationChange);

window.addEventListener("resize", fitText);
landscapeQuery.addEventListener("change", fitText);
portraitQuery.addEventListener("change", fitText);
document.fonts.ready.then(fitText);

/* ── init ────────────────────────────────────────────── */

render();
syncButtons();
if (BPM_MODE) customElements.whenDefined('bpm-glyph').then(fitText);
