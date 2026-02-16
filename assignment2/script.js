'use strict';

(function () {
  const STORAGE_KEY = "cs355_theme"; // "dark" or "light"

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);

    // Update icon for clarity
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const icon = btn.querySelector(".toggle-icon");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙";
      btn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }
  }

  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "dark" ? "dark" : "light";
  }

  function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    saveTheme(next);
    applyTheme(next);
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Load persisted theme on every page load
    applyTheme(getSavedTheme());

    // Wire up toggle button on both pages
    const btn = document.getElementById("themeToggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  });
})();