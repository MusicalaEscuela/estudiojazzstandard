const STORAGE_KEY = "musicala-standard-jazz-progress-v1";

const steps = [...document.querySelectorAll("[data-step]")];
const progressValue = document.querySelector("[data-progress-value]");
const progressBar = document.querySelector("[data-progress-bar]");
const progressNote = document.querySelector("[data-progress-note]");
const resetButton = document.querySelector("[data-reset]");
const printButton = document.querySelector("[data-print]");

const notes = [
  "Marca los pasos completados y deja que la máquina recuerde por ti. Qué detalle.",
  "Buen arranque. Ya no estamos improvisando la forma de estudiar, que irónicamente ayuda a improvisar mejor.",
  "Vas tomando forma. El standard empieza a parecer música y no una lista de enemigos armónicos.",
  "Mitad de camino. Aquí el oído ya debería estar menos confundido que un guitarrista leyendo bajo cifrado.",
  "Esto ya huele a arreglo. Falta pulir, pero el caos empezó a obedecer.",
  "Ruta casi lista. Graba, escucha, ajusta y presume con moderación institucional.",
  "Completado. Ahora sí: tocar, grabar, compartir y fingir que todo fue fácil."
];

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  steps.forEach((step) => {
    step.checked = Boolean(saved[step.dataset.step]);
  });
  updateProgress();
}

function saveProgress() {
  const payload = steps.reduce((acc, step) => {
    acc[step.dataset.step] = step.checked;
    return acc;
  }, {});

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  updateProgress();
}

function updateProgress() {
  const completed = steps.filter((step) => step.checked).length;
  const percent = steps.length ? Math.round((completed / steps.length) * 100) : 0;
  const noteIndex = Math.min(Math.floor(percent / 17), notes.length - 1);

  progressValue.textContent = percent;
  progressBar.style.width = `${percent}%`;
  progressNote.textContent = notes[noteIndex];
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  steps.forEach((step) => { step.checked = false; });
  updateProgress();
}

steps.forEach((step) => step.addEventListener("change", saveProgress));
resetButton?.addEventListener("click", resetProgress);
printButton?.addEventListener("click", () => window.print());

loadProgress();
