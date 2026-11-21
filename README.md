# Jem Karaceylan — about-me

Personal site for **Jem Karaceylan** — Operations Manager at Survey Air, a drone survey company in Surrey, and an aerospace engineer and software builder. Static, dependency-free, deployed on GitHub Pages.

**Live:** https://jemini-pro.github.io/about-me/
**Repo:** https://github.com/jemini-pro/about-me

---

## What's in here

```
about-me/
├── index.html              # single page, all content
├── styles.css              # tokens, type, case studies, light + dark
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

## Design direction: project-led editorial CV

The first build was a kinetic editorial page: numbered section kickers, a marquee, a radar panel, a four-stat strip, seven project cards, scroll reveals and counters. It looked art-directed, but it also looked assembled. Every section had the same shape, and the decoration was doing the work the project information should do.

This version keeps the strong typography and the real project visuals, but turns the page into a designed CV: a clear hero, three structured case studies, a compact index of smaller projects, skills, experience, and a contact close.

### What was cut

- The five identical section openers (numbered kicker, two-line display heading, italic orange payoff, 34ch aside).
- The marquee, role rotator, radar panel, green "Available" dot and the four-stat brag strip.
- Uniform project cards, chip walls, rail controls, progress bars and drag-scroll behaviour.
- Scroll reveals on every element, counters, the live clock and the blurred sticky header.
- Copy that explained its own design ("Not a wall of logos…", "Kept short on purpose…").

### What is there now

- **A hero with a real artifact.** Name, role, summary, contact actions, three CV facts, and the GeoMapper 3D screenshot. The screenshot replaces the old radar panel.
- **Three case studies.** Each has a left metadata rail (year, context, role, status), a title, a lede, two or three scannable points, and a figure where one helps:
  - **Client portal** — the upload path as a responsive HTML flow: browser to S3, app server signing presigned URLs, lifecycle to IA and Glacier.
  - **GeoMapper 3D** — a wide crop of the real screenshot.
  - **F1 wing endplates** — the dissertation's wing and endplate drawing, redrawn as inline SVG.
- **A compact "More work" index.** Four smaller projects with year, one-line description and a private/open-source link.
- **Skills as a two-column matrix** grouped by job, not a wall of chips.
- **Experience as a dated list.** Role, independent software, degree, flying.
- **A dark contact close.** Large email, phone, GitHub, location, and a footer line.

### Type and colour

| Role | Face |
|---|---|
| Display | **Instrument Serif** (roman + italic) |
| Body, labels, captions | **Space Grotesk** |

Two families, not three. JetBrains Mono was removed: the mono labels were half the "technical template" voice.

Paper (`#f3f0e8`), ink (`#141412`), and one rust accent (`#a83a14`) used for links, figure numbers and the short section rules. Dark mode is a true dark (`#0d0d0b`). The contact band inverts: dark on light mode, light on dark mode.

### Motion

There is almost none. Links, buttons and the theme toggle have short colour transitions. Nothing moves on scroll. `prefers-reduced-motion` zeroes the remaining transitions.

---

## Editing the site

### Add a case study

Copy an `<article class="case"> … </article>` inside `#work` and edit it. The layout is a 190px metadata rail plus the body.

```html
<article class="case">
  <aside class="case__meta">
    <dl>
      <div><dt>Year</dt><dd>2026</dd></div>
      <div><dt>Context</dt><dd>Independent</dd></div>
      <div><dt>Role</dt><dd>Solo build</dd></div>
      <div><dt>Status</dt><dd>Open source</dd></div>
    </dl>
  </aside>
  <div class="case__body">
    <h3>Project name</h3>
    <p class="case__lede">What it is.</p>
    <ul class="case__points">
      <li>What it does.</li>
      <li>Why it matters.</li>
    </ul>
    <p class="case__link"><a href="https://…" rel="noopener">github.com/… ↗</a></p>
  </div>
</article>
```

### Add a figure

Copy a `<figure class="case__figure"> … </figure>`. Figure numbers are written by hand, so renumber the ones after it if you insert in the middle.

Use `.case__shot` for a 16:9 image crop, `.flow` for the upload diagram, and `.case__figure--drawing` for the technical drawing.

### Add a project to "More work"

Copy an `<li>` in `.more__list`. Keep the year, title, one-line description and tag.

### Update Skills or Experience

Edit the four blocks in `#skills` or the `<li>` rows in `#experience`. Keep the lists plain; no chips.

### Re-render the social image

`og-source.html` is a 600×315 page designed to be captured at 2× and saved as `og.png` (1200×630). Open it at 600×315 in a browser, screenshot the viewport, and save over `og.png`.

The checked-in `og.png` still shows the original design. Re-render it from `og-source.html` before publishing so link previews match the page.

---

## Content audit

The content was rebuilt against the live repos, not just restyled.

- **GitHub links** point at `jemini-pro`, the renamed account (previously `jem-cell`). Repo links 301-redirect from the old name.
- **`Health-app` was removed** — the repo is gone.
- **GeoMapper 3D** (`3D_Georeference`) is described from the repo: 3D/2D switching, 30,000+ photo coverage maps, OSM building masses, Copernicus DEM terrain, ADRs and CI.
- **dashboard-v2** is the full command centre: stdlib-only Python API, SQLite metrics history, Caddy deploy with rollback, agents for Linux, macOS, Windows, Proxmox and Docker.
- **discord-activity** is a TypeScript daily math game with date-seeded puzzles, five difficulty bands, streaks and per-guild leaderboards.
- **The client portal and skills library** are private systems, described but not linked.
- **Degree:** BSc (Hons) Aerospace Engineering, Swansea University, 2019, 2.1. Dissertation on Formula One wing endplates.
- **Licence:** GVC remote pilot (CAA), around 30 hours in civilian gliders.
- **Redactions held:** no exact coordinates, headcount beyond "small company", client names, site locations or licence numbers.

Nothing on the page is invented. The GeoMapper hero and case figure use a real screenshot; the portal flow and F1 drawing are schematic, and captioned as such.

---

## Accessibility

- Skip link; semantic landmarks; every section has an `aria-labelledby`.
- Visible `:focus-visible` rings, never removed.
- The hero screenshot and the F1 drawing have alt text; the flow is real text, not an image.
- The theme toggle is a real button with `aria-pressed` and a state-dependent label.
- Light and dark are both first-class; body text is ~10:1 on paper.
- `prefers-reduced-motion` removes the remaining transitions.

## Performance

- One CSS file, one ~35-line JS file, no dependencies, no build.
- One raster asset, used twice (hero and GeoMapper detail); Fig. 1 is an HTML flow and Fig. 3 is inline SVG.
- Two font families with only the weights used.
- No scroll listeners, no observers, no animation frames.

---

## License

MIT. Do what you want with it.
