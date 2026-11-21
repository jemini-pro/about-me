// Jem Karaceylan — about-me
// Vanilla, dependency-free. Everything below is progressive: if this file
// fails to load, the page still reads and every link still works.

(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth = reducedMotion ? 'auto' : 'smooth';

  /* ---------------------------------------------------------------- Theme */
  const themeToggle = document.getElementById('theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const currentTheme = () => {
    const attr = root.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return systemDark.matches ? 'dark' : 'light';
  };

  const syncThemeButton = () => {
    if (!themeToggle) return;
    const isDark = currentTheme() === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('jk-theme', next); } catch (e) { /* private mode */ }
      syncThemeButton();
    });
    systemDark.addEventListener?.('change', syncThemeButton);
    syncThemeButton();
  }

  /* ---------------------------------------------------------------- Clock */
  const clockEl = document.getElementById('clock');
  const footerTimeEl = document.getElementById('local-time');
  let timeFormat = null;

  try {
    timeFormat = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (e) { /* very old browsers: leave the em dash */ }

  const tickClock = () => {
    if (!timeFormat) return;
    const now = timeFormat.format(new Date());
    if (clockEl) clockEl.textContent = now;
    if (footerTimeEl) footerTimeEl.textContent = `Farnham ${now}`;
  };
  tickClock();
  window.setInterval(tickClock, 30000);

  /* ---------------------------------------------------------------- Year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------ Scroll progress */
  const progressBar = document.getElementById('progress-bar');
  let progressQueued = false;

  const drawProgress = () => {
    progressQueued = false;
    if (!progressBar) return;
    const max = root.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progressBar.style.width = (ratio * 100).toFixed(2) + '%';
  };

  const queueProgress = () => {
    if (progressQueued) return;
    progressQueued = true;
    window.requestAnimationFrame(drawProgress);
  };

  window.addEventListener('scroll', queueProgress, { passive: true });
  window.addEventListener('resize', queueProgress);
  drawProgress();

  /* --------------------------------------------------- Active nav section */
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sectionLinks = new Map();

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionLinks.set(section, link);
  });

  if ('IntersectionObserver' in window && sectionLinks.size) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => link.removeAttribute('aria-current'));
          const link = sectionLinks.get(entry.target);
          if (link) link.setAttribute('aria-current', 'true');
        });
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );
    sectionLinks.forEach((_, section) => navObserver.observe(section));
  }

  /* ----------------------------------------------------- Reveal on scroll */
  const revealTargets = Array.from(
    document.querySelectorAll(
      '.panel, .hero__stats, .section__head, .work-card, .stack__group, ' +
      '.timeline__item, .now__item, .contact__title, .contact__email, .contact__foot'
    )
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* -------------------------------------------------------------- Counters */
  const counters = Array.from(document.querySelectorAll('[data-count]'));

  const formatCount = (value, el) => {
    const decimals = Number(el.dataset.decimals || 0);
    const pad = Number(el.dataset.pad || 0);
    let text = value.toFixed(decimals);
    if (pad) text = text.padStart(pad, '0');
    return (el.dataset.prefix || '') + text + (el.dataset.suffix || '');
  };

  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    if (reducedMotion) {
      el.textContent = formatCount(target, el);
      return;
    }

    const duration = 1500;
    const start = performance.now();

    const frame = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = formatCount(target * eased, el);
      if (t < 1) {
        window.requestAnimationFrame(frame);
      } else {
        el.textContent = formatCount(target, el);
      }
    };

    window.requestAnimationFrame(frame);
  };

  if (counters.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach((el) => { el.textContent = formatCount(Number(el.dataset.count), el); });
    } else {
      counters.forEach((el) => { el.textContent = formatCount(0, el); });
      const countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => countObserver.observe(el));
    }
  }

  /* ------------------------------------------------------------ Work rail */
  const rail = document.getElementById('work-track');
  if (rail) {
    const prevBtn = document.getElementById('rail-prev');
    const nextBtn = document.getElementById('rail-next');
    const railBar = document.getElementById('rail-progress-bar');

    const step = () => {
      const card = rail.querySelector('.work-card');
      if (!card) return Math.round(rail.clientWidth * 0.8);
      const styles = window.getComputedStyle(rail);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return Math.round(card.getBoundingClientRect().width + gap);
    };

    const syncRail = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = max > 0 ? Math.min(1, Math.max(0, rail.scrollLeft / max)) : 0;
      if (railBar) railBar.style.width = (ratio * 100).toFixed(2) + '%';
      if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = max <= 2 || rail.scrollLeft >= max - 2;
    };

    rail.addEventListener('scroll', syncRail, { passive: true });
    window.addEventListener('resize', syncRail);
    syncRail();

    if (prevBtn) prevBtn.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: smooth }));
    if (nextBtn) nextBtn.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: smooth }));

    // Pointer drag for mice. Touch keeps native momentum scrolling.
    // Capture starts only after real movement, so a plain click still reaches the link.
    let pointerDown = false;
    let captured = false;
    let moved = 0;
    let startX = 0;
    let startScroll = 0;

    rail.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return;
      pointerDown = true;
      captured = false;
      moved = 0;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
    });

    rail.addEventListener('pointermove', (event) => {
      if (!pointerDown) return;
      const dx = event.clientX - startX;
      if (!captured) {
        if (Math.abs(dx) < 5) return;
        captured = true;
        rail.classList.add('is-dragging');
        rail.setPointerCapture?.(event.pointerId);
      }
      moved = Math.max(moved, Math.abs(dx));
      rail.scrollLeft = startScroll - dx;
    });

    const endDrag = (event) => {
      if (!pointerDown) return;
      pointerDown = false;
      captured = false;
      rail.classList.remove('is-dragging');
      if (rail.hasPointerCapture?.(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    };

    rail.addEventListener('pointerup', endDrag);
    rail.addEventListener('pointercancel', endDrag);
    rail.addEventListener('pointerleave', endDrag);

    // A drag should not also count as a click on a project card.
    rail.addEventListener(
      'click',
      (event) => {
        if (moved > 6) {
          event.preventDefault();
          event.stopPropagation();
          moved = 0;
        }
      },
      true
    );
  }
})();
