# Jem Karaceylan — about-me

Personal site for **Jem Karaceylan** — Operations Manager at Survey Air, a drone survey company in Surrey, and an aerospace engineer and software builder. Static, dependency-free, deployed on GitHub Pages.

**Live:** https://jemini-pro.github.io/about-me/
**Repo:** https://github.com/jemini-pro/about-me

---

## What's in here

```
about-me/
├── index.html              # single page, all content
├── styles.css              # tokens, type, one-column layout, light + dark
├── script.js               # theme toggle and footer year (no deps)
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

No build step. No `node_modules`. No framework.

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

## Design direction: subtractive editorial

The previous build was a kinetic editorial page: numbered section kickers, a marquee, a radar panel, a four-stat strip, seven project cards, scroll reveals and counters. It looked art-directed, but it also looked assembled. Every section had the same shape, and the decoration was doing the work the writing should do.

This version is one column, two typefaces and four figures. It reads like an essay rather than a landing page.

### What was cut

- The five identical section openers (numbered kicker, two-line display heading, italic orange payoff, 34ch aside).
- The marquee, role rotator, radar panel, green "Available" dot and the four-stat brag strip.
- Project cards, chip walls, rail controls, progress bars and drag-scroll behaviour.
- Scroll reveals on every element, counters, the live clock and the sticky blurred header.
- Copy that explained its own design ("Not a wall of logos…", "Kept short on purpose…").

### What replaced it

- **A masthead, a title block and prose.** The page opens with a dateline, the name, and a standfirst, then goes straight into the work.
- **Work as an annotated list.** Each project is a heading, a small meta line and one paragraph. Public projects get a repo link. Private work is labelled private.
- **Four figures, each doing a job.**
  - **Fig. 1** — the client portal upload path, drawn as a responsive HTML flow: browser to S3, app server signing presigned URLs, lifecycle to IA and Glacier.
  - **Fig. 2** — the real GeoMapper 3D screenshot.
  - **Fig. 3** — a printed-style ledger of ninety days of agent usage: sessions, tokens and cache savings, with the two harnesses named. A table, not a stat strip.
  - **Fig. 4** — the dissertation's wing and endplate drawing, redrawn as an inline SVG.
- **Tools as a definition list and Record as a plain two-column list.** No chips, no timeline tags, no hover backgrounds.
- **Now as four short paragraphs** with run-in italic labels.
- **Contact as text.** A large email link, phone, location, and nothing else.

### Type and colour

| Role | Face |
|---|---|
| Display | **Instrument Serif** (roman + italic) |
| Body, labels, captions | **Space Grotesk** |

Two families, not three. JetBrains Mono was removed: the mono labels were half the "technical template" voice.

Paper (`#f3f0e8`), ink (`#141412`), and one rust accent (`#a83a14`) used for links and figure numbers. Dark mode is a true dark (`#0d0d0b`), not an inverted grey. No grain overlay.

### Motion

There is almost none. Links and the theme toggle have short colour transitions. Nothing moves on scroll. `prefers-reduced-motion` still zeroes the remaining transitions.

---

## Editing the site

### Add a project

Copy any `<article class="entry"> … </article>` inside `#work` and edit it. Public projects get an `.entry-link` line; private ones do not.

```html
<article class="entry">
  <div class="entry__head">
    <h3>Project name</h3>
    <p class="entry-meta">2026 · open source</p>
  </div>
  <p>What it is and why it exists.</p>
  <p class="entry-link"><a href="https://…" rel="noopener">github.com/…</a></p>
</article>
```

### Add a figure

Copy a `<figure class="figure"> … </figure>`. Figure numbers are written by hand in the caption, so renumber the ones after it if you insert in the middle.

```html
<figure class="figure">
  <div class="figure__frame">
    <img src="./assets/name.png" alt="…" width="1400" height="900" loading="lazy" />
  </div>
  <figcaption><span class="figure__no">Fig. 4</span> Caption.</figcaption>
</figure>
```

Use `.figure--diagram` for a frameless flow (like Fig. 1) and `.figure--drawing` for technical drawings.

### Update the agent ledger

Fig. 3 lives in `#work`, between the skills library entry and the dissertation entry. Each `.ledger__row` is a `<dt>` label with a `<small>` sub-line and a `<dd>` value. Update the three values and the "Ninety days to …" line together, or the figure will claim a window it no longer covers. Take the numbers from the usage dashboard's 90-day view; keep the API-equivalent caption.

### Update the "Now" section

Edit the four paragraphs in `#now` and the `November 2026` dateline above them.

### Re-render the social image

`og-source.html` is a 600×315 page designed to be captured at 2× and saved as `og.png` (1200×630). Open it at 600×315 in a browser, screenshot the viewport, and save over `og.png`.

The checked-in `og.png` still shows the previous design. Re-render it from `og-source.html` before publishing so link previews match the page.

---

## Content audit

The content was rebuilt against the live repos, not just restyled.

- **GitHub links** point at `jemini-pro`, the renamed account (previously `jem-cell`). Repo links 301-redirect from the old name.
- **`Health-app` was removed** — the repo is gone.
- **GeoMapper 3D** (`3D_Georeference`) is described from the repo: 3D/2D switching, 30,000+ photo coverage maps, OSM building masses, Copernicus DEM terrain, ADRs and CI.
- **dashboard-v2** is the full command centre: stdlib-only Python API, SQLite metrics history, Caddy deploy with rollback, agents for Linux, macOS, Windows, Proxmox and Docker.
- **discord-activity** is a TypeScript daily math game with date-seeded puzzles, five difficulty bands, streaks and per-guild leaderboards.
- **The client portal and skills library** are private systems, described but not linked.
- **The agent ledger (Fig. 3)** is taken from the usage dashboard's 90-day view: 1,364 sessions, 6.68B tokens, 4.99B cached input and $3,302.39 of cache savings between 24 August and 21 November 2026. It is labelled as an API-equivalent estimate; no spend figure is shown.
- **Degree:** BSc (Hons) Aerospace Engineering, Swansea University, 2019, 2.1. Dissertation on Formula One wing endplates.
- **Licence:** GVC remote pilot (CAA), around 30 hours in civilian gliders.
- **Redactions held:** no exact coordinates, headcount beyond "small company", client names, site locations or licence numbers.

Nothing on the page is invented. The GeoMapper figure uses a real screenshot; the portal diagram and F1 drawing are schematic, and captioned as such.

---

## Accessibility

- Skip link; semantic landmarks; every section has an `aria-labelledby`.
- Visible `:focus-visible` rings, never removed.
- Figures with SVG use `role="img"` and an `aria-label`; the screenshot has alt text.
- The theme toggle is a real button with `aria-pressed` and a state-dependent label.
- Light and dark are both first-class; body text is ~12:1 on paper.
- `prefers-reduced-motion` removes the remaining transitions.

## Performance

- One CSS file, one ~35-line JS file, no dependencies, no build.
- One raster image on the page (`assets/geomapper-3d.png`, lazy-loaded); Fig. 1 is an HTML flow, Fig. 3 is a CSS ledger and Fig. 4 is inline SVG.
- Two font families with only the weights used.
- No scroll listeners, no observers, no animation frames.

---

## License

MIT. Do what you want with it.
