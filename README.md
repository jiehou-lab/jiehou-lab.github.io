# Hou Lab website — https://jiehou-lab.github.io/

A multi-page redesign of https://jiehou-lab.github.io/ modelled on the layout of
[photonlines/Research-Lab-Website](https://github.com/photonlines/Research-Lab-Website)
(university lead + large lab title, full-width segmented nav, sticky side navigation on
long pages, footer with contact info), rebuilt in plain HTML/CSS/JS with no framework
dependencies. The previous single-page Bootstrap site is preserved in `oldsite/`
(reachable at https://jiehou-lab.github.io/oldsite/) and can be deleted once no longer needed.

## Pages

| File | Contents |
|---|---|
| `index.html` | Lab introduction (highlight slideshow is commented out for later), research-area tiles, three recent news cards, sponsor logos |
| `people.html` | PI profile, current graduate / undergraduate / high-school students, alumni |
| `research.html` | Research directions with selected papers, grants (with badges), honors & awards |
| `publications.html` | 57 publications grouped by topic, newest first, Dr. Hou highlighted |
| `software.html` | *Hidden from the nav for now.* Cards for AutoRNA, RNASS, SAXSDom, DeepSF, … — to show it, add `<li><a href="software.html">Software</a></li>` to the nav list in every page |
| `teaching.html` | SLU course table, placeholder for MSU courses, AI-in-education section |
| `news.html` | All news items 2018–2026, grouped by year with colored tags |
| `join.html` | Openings, research topics, what we look for, how to apply |
| `gallery.html` | Photo grid with click-to-enlarge lightbox |
| `contact.html` | Address, email, links, embedded Google map |

Shared assets: `css/theme.css` (all styling; the Spartan-green palette is set as CSS variables at the top — alternative palettes are in `css/palettes/` and can be previewed by adding one extra `<link>` after `theme.css`),
`js/main.js` (mobile menu, carousel, side-nav scroll-spy, lightbox), `images/`, `cv/`.

## Preview locally

Open `index.html` directly in a browser, or from a terminal:

```bash
cd /Users/jiehou/Documents/msu/website/jiehou-lab.github.io
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing

The site is served by GitHub Pages straight from the repository root. To publish changes:

```bash
git add -A
git commit -m "Update website"
git push
```

## Adding content

- **News**: add a `<li>` at the top of the matching year in `news.html` (copy an existing one;
  tag classes are `fund`, `paper`, `talk`, `people`, `award`). The three "Recent News" cards on
  `index.html` are edited separately.
- **Grants**: each grant in `research.html` is a `<div class="grant" id="grant-…">` block; the
  home-page chips link to those ids.
- **People**: add a `<li>` to the right roster in `people.html`; drop a square photo named
  `first-last.jpg` into `images/people/` and the initials circle is replaced automatically.
- **Publications**: each entry is a `<li>` in `publications.html`; add new ones at the top of
  the relevant topic list.
- **Gallery**: each photo is a `<figure>` in `gallery.html`. To attach a long write-up, add inside the
  figure a `<button class="more" data-title="…">More details</button>` followed by
  `<div class="details" hidden>…</div>`; the button opens the text in a pop-up window.
- **Highlight slideshow** on the home page is commented out in `index.html` — see the note there.
- **Software page** (`software.html`) exists but is not in the nav; add
  `<li><a href="software.html">Software</a></li>` to the nav list in every page to show it.

## Things to review / fill in

- **People** — the student roster is carried over from the SLU site. Please confirm who is
  still working with you at MSU, move anyone who has finished to *Alumni*, and add new MSU
  members. Student photos can be added using the `.person` block shown for the PI.
- **Teaching** — add MSU course assignments under the "Michigan State University" heading.
- **Join Us** — the target start term ("Fall 2027") and funding statements are placeholders;
  adjust to match your actual openings.
- **Contact** — the map is centered on 428 S. Shaw Lane (Engineering Building). Change the
  address in `contact.html` if CMSE 2502 is elsewhere.
- **Software** — repository links point to `jiehou-lab`, `multicom-toolbox` and
  `jianlin-cheng` GitHub accounts. AutoRNA currently links only to the poster; add a repo
  link when public.
- **Publications** — the stats (57 / h-index 24 / 22) are copied from the old site; update
  as needed. Each entry is a plain `<li>` — add new papers at the top of the relevant list.
- **Images** — `images/jie_hou.jpg` is a cropped version of `hou_zoom.png` (black border
  removed). Replace with a newer portrait if you like.

## Cache busting

`css/theme.css` and `js/main.js` are referenced with a `?v=YYYYMMDDHHMM` query string in
every page. After editing either file, bump the number in all pages so browsers and the
GitHub Pages CDN fetch the new version:

```bash
V=$(date +%Y%m%d%H%M); sed -i '' -E "s/(theme\.css|main\.js)\?v=[0-9]+/\1?v=$V/g" *.html
```
