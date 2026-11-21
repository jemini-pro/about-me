# Jem Karaceylan — about-me

Personal site for **Jem Karaceylan** — Operations Manager at [Survey Air](https://github.com/jemini-pro), a drone survey startup, and an aerospace engineer and software builder. Static, dependency-free, deployed on GitHub Pages.

**Live:** https://jemini-pro.github.io/about-me/
**Repo:** https://github.com/jemini-pro/about-me

> The GitHub account was renamed from `jem-cell` to `jemini-pro`. Every URL in the site, sitemap, robots file and README was moved to the new name — the old `jem-cell.github.io` address now 404s.

---

## What's in here

```
about-me/
├── index.html              # single page, all content
├── styles.css              # design tokens, layout, light + dark
├── script.js               # theme, rail, counters, reveals (no deps)
├── assets/
│   └── geomapper-3d.png    # real GeoMapper 3D screenshot
├── og.png                  # 1200×630 social preview
├── og-source.html          # source used to render og.png
├── favicon.svg             # reticle monogram
├── sitemap.xml
├── robots.txt
├── .nojekyll               # tells GitHub Pages not to run Jekyll
└── README.md
```

No build step. No `node_modules`. No framework. Three files of actual content.

---

## Run it locally

```bash
python3 -m http.server 8000
# then open http://127.0.0.1:8000
```

Any static server works. Opening `index.html` directly also works, though some browsers block the Google Fonts request over `file://`.

## Deploy it

GitHub Pages from the `main` branch, root directory:

1. Push to GitHub.
2. **Settings → Pages → Build and deployment → Source: "Deploy from a branch"** → branch `main`, folder `/ (root)`.
3. The site is live at `https://jemini-pro.github.io/about-me/`.

No custom domain. `.nojekyll` keeps Pages from running the files through Jekyll.

---

## Design direction: kinetic editorial

The previous version was a restrained editorial layout — clean, but quiet. This rebuild keeps the editorial discipline and adds motion, scale and a technical vocabulary that matches the work itself.

### Typography

| Role | Face | Why |
|---|---|---|
| Display | **Instrument Serif** (roman + italic) | High-contrast, characterful at 100px+, and the italic has real energy. Carries the giant name and every section title. |
| Body | **Space Grotesk** | Neutral but not generic; the same family already used in `dashboard-v2`, so the site and the work share a voice. |
| Data | **JetBrains Mono** | Kickers, metadata, tags, chips, readouts. Keeps technical detail in its own register. |

No Inter. No single-font default. Three considered families with distinct jobs.

### Colour

A warm paper base (`#f3f0e8`), near-black ink (`#111110`), and one signal colour — an orange-red (`#ff4d12`) used for movement, emphasis and the instrument panel. Light and dark are both first-class:

- Dark mode is a true dark, not an inverted grey.
- The contact section deliberately inverts: dark in light mode, light in dark mode. It closes the page with a hard tonal shift.
- A very light SVG grain sits over the page so the paper never reads as a flat hex.

### Motion

All motion is CSS-first and respects `prefers-reduced-motion`:

- **Role rotator** in the hero cycles Operations Manager → Aerospace Engineer → Software Engineer → Geospatial Builder.
- **Radar sweep** and drifting aircraft in the instrument panel.
- **Marquee** of disciplines, paused on hover.
- **Scroll reveals** via one `IntersectionObserver` (no scroll listeners for layout).
- **Counters** count up once, in-view.
- **Top progress bar** and horizontal **rail progress**.
- **Active nav** follows the section in view.

Reduced-motion users get static final states, not a broken page.

### Components built for the page

- **Instrument panel** — an inline-SVG radar with bearings, sweep, blips, aircraft, live Farnham clock and readouts.
- **Horizontal work rail** — native scroll-snap, drag with a mouse, arrow buttons, keyboard scrolling, a progress bar, and a "more on GitHub" end card. Cards reveal as they enter the horizontal viewport.
- **Project visuals** — a real GeoMapper screenshot, plus hand-built CSS/SVG previews for `dashboard-v2` (workbench mock), the Discord game (split-flap puzzle) and the F1 dissertation (technical drawing).
- **Theme toggle** — light/dark, persisted in `localStorage`, no flash of the wrong theme (an inline head script sets it before first paint).

---

## Content audit — what changed and why

This rebuild was driven by an audit against the live repos, not just a restyle.

### Fixed

- **Every GitHub link was dead.** The account was renamed `jem-cell` → `jemini-pro`. The profile link 404'd; repo links only worked through redirects. All URLs now point at `jemini-pro`.
- **The live URL moved.** `jem-cell.github.io/about-me/` is 404; the canonical, OG URL, sitemap and robots now use `jemini-pro.github.io/about-me/`.
- **`Health-app` was removed.** The repo is gone (404, no redirect). It is no longer presented as public work.
- **"Now" was six months stale.** Rewritten and dated **November 2026**.
- **`sitemap.xml` lastmod** updated to 2026-11-21.
- **The old README documented a brief that no longer applied** (banned gradients, etc.). Replaced with the actual design rationale.

### Understated work, now described accurately

- **`3D_Georeference` is now GeoMapper 3D** — 3D/2D auto-switching, 30,000+ photo coverage maps, OSM building masses, Copernicus DEM terrain, ADRs and CI. The old one-liner ("a browser tool for placing point clouds") sold it short.
- **`dashboard-v2` is now a full command centre** — stdlib-only Python API, SQLite metrics history, Caddy deploy with rollback, and agents for Linux, macOS, Windows, Proxmox and Docker. It was previously mentioned only as a footnote.
- **`discord-activity`** — a TypeScript daily math game with deterministic date-seeded puzzles, difficulty bands, streaks and per-guild leaderboards — is now featured.
- **`route-planning`** is still public, but the stronger current work leads the rail.

### Verified content sources

- **GitHub** — `https://github.com/jemini-pro` (the renamed `jem-cell` account; repos 301-redirect from the old name).
  - `3D_Georeference` (GeoMapper 3D), `dashboard-v2`, `discord-activity`, `georeference`, `route-planning`, `t3code`, `padel-up`, `Uber-clone`.
- **CV** — BSc Aerospace Engineering, 2.1, Swansea University (2019); F1 wing-endplate aerodynamics dissertation; GVC drone licence (CAA); ~30 hours glider time.
- **Survey Air** — Operations Manager, 2025–present, three-person drone survey startup.
- **Contact** — `jkaraceylan@gmail.com`, `07745 795 585`, Farnham, Surrey.

Nothing on the page is invented: no fabricated employers, testimonials, metrics or headshots. The one stylised element is the `dashboard-v2` card, which is explicitly badged **UI sketch**; the GeoMapper card uses a real screenshot and is badged **Open source**.

---

## Editing the site

### Add a project

Copy any `<li class="work-card"> … </li>` inside `#work-track` in `index.html` and edit it. Nothing else needs changing: the rail measures itself and the "more on GitHub" count is independent. The HTML comment above the list marks the spot.

Each card follows this shape:

```html
<li class="work-card">
  <div class="work-card__visual">…</div>
  <div class="work-card__body">
    <p class="work-card__meta"><span class="work-card__no">06</span><span>Stack</span><span>2026</span></p>
    <h3 class="work-card__title">Project name</h3>
    <p class="work-card__text">What it is and why it exists.</p>
    <a class="work-card__link" href="https://…" rel="noopener">View project <svg class="ext-arrow" …></svg></a>
  </div>
</li>
```

### Update the "Now" section

Edit the four items in `#now` and the `Updated Nov 2026` label in its kicker. Keep it short — the page says so.

### Update the numbers

The four hero stats live in `.hero__stats`, each as `data-count`, `data-prefix`, `data-suffix`, `data-decimals` or `data-pad`. Change the attributes and the visible fallback text together; the animation reads the attributes.

### Re-render the social image

`og-source.html` is a 600×315 page designed to be captured at 2× and saved as `og.png` (1200×630). Open it at 600×315 in a browser, screenshot the viewport, and save over `og.png`.

---

## Accessibility

- Skip link; semantic landmarks; every section has an `aria-labelledby`.
- Visible `:focus-visible` rings, never removed.
- The decorative radar and marquee are `aria-hidden`; the rotator has a static screen-reader equivalent.
- The rail is a labelled, keyboard-scrollable region with buttons.
- `prefers-reduced-motion: reduce` disables the rotator, marquee, radar, reveals and counters, and shows final values immediately.
- Colour: body text is ~12:1 on paper; the signal colour is used for large text and graphics. Dark mode is tuned separately rather than inverted.
- External links carry `rel="noopener"`; the GitHub profile uses `rel="me noopener"`.

## Performance

- One CSS file, one ~200-line JS file, no dependencies, no build.
- One raster image on the page (`assets/geomapper-3d.png`, lazy-loaded); the rest of the visuals are CSS and inline SVG.
- Motion uses `IntersectionObserver` and `requestAnimationFrame`; no layout-thrashing scroll handlers.
- Fonts use `preconnect`; three families with only the weights used.
- No horizontal overflow at 360, 390, 768, 1280 or 1440px.

---

## License

MIT. Do what you want with it.
