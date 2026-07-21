// ===== THEME SYSTEM FIXED =====

const themeSelect = document.querySelector("[data-theme-select]");
const selected = themeSelect?.querySelector(".select-selected");

// detectar sistema
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

let currentTheme = savedTheme || (systemDark ? "dark" : "light");

// aplicar tema inicial
document.documentElement.setAttribute("data-theme", currentTheme);
updateLabel(currentTheme);

// função label
function updateLabel(theme) {
  if (!selected) return;
  selected.innerHTML = (theme === "dark" ? "Escuro" : "Claro") + '<span class="arrow"></span>';
}

// 👇 EVENTO GLOBAL (funciona sempre)
document.addEventListener("click", (e) => {
  const option = e.target.closest(".option[data-theme]");
  if (!option) return;

  const theme = option.getAttribute("data-theme");

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  updateLabel(theme);
});