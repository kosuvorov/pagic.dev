// Light or dark: follows the system until you pick one with the sun/moon
// button, and remembers it. Each page's <head> applies the saved choice
// before it paints.
const toggle = document.querySelector(".theme-toggle");
const systemDark = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => (document.documentElement.dataset.theme ?? (systemDark.matches ? "dark" : "light")) === "dark";
const labelToggle = () => toggle.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
toggle.addEventListener("click", () => {
  const theme = isDark() ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("pagic-theme", theme); } catch {}
  labelToggle();
});
systemDark.addEventListener("change", labelToggle);
labelToggle();
