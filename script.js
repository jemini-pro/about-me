// Jem Karaceylan — about-me
// Two jobs: remember the theme, and keep the footer year current.

(() => {
  'use strict';

  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const currentTheme = () => {
    const attr = root.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return systemDark.matches ? 'dark' : 'light';
  };

  const syncToggle = () => {
    if (!toggle) return;
    const isDark = currentTheme() === 'dark';
    toggle.textContent = isDark ? 'Light' : 'Dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('jk-theme', next); } catch (e) { /* private mode */ }
      syncToggle();
    });
    systemDark.addEventListener?.('change', syncToggle);
    syncToggle();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
