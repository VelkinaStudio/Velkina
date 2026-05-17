# The Studio Journal — `/portfolio`

A handcrafted, **zero‑dependency** portfolio site living next to (but never touching) the Velkina Next.js app. It reads like a printed journal: cover, editor's letter, principles, polaroid case grid, four working demo apps, a curriculum, capabilities and a colophon.

## What's inside

```
portfolio/
├── index.html                     # main 8‑section journal experience
├── styles.css                     # the whole stylesheet, hand‑tuned
├── app.js                         # interactions: loader, cursor, magnetic
│                                  #   hover, scroll spy, polaroid grid
├── cv.html                        # printable A4 CV (also used by main site)
└── projects/
    ├── menu/index.html            # ✦ Plate I — Bistro · editorial menu
    │                              #   categories, dietary filters, cart
    ├── booking/index.html         # ✦ Plate II — Réservation · calendar
    │                              #   + party size + slots + ticket
    ├── snake/index.html           # ✦ Plate III — Snake · arcade loop
    │                              #   keyboard / swipe, local high score
    └── paint/index.html           # ✦ Plate IV — Pixel Studio · 16×16
                                   #   editor, palette, fill, undo, PNG
```

## Design notes

The aesthetic was researched away from "agency template" energy and built around one idea: a **journal you read end to end**. The references are zines, editorial magazines and printed studio annuals — not sliders and 3D landing pages.

- **Type system.** *Fraunces* (display, soft + opsz axes), *Inter* (body), *JetBrains Mono* (notes), *Caveat* (margins / handwritten).
- **Palette.** Cream paper `#F4ECDD` and ink `#16140F`, with rust `#C8501E` and leaf `#4A6F3D` as accents.
- **Texture.** Subtle SVG grain `mix-blend-mode: multiply` over the page.
- **Motion.** Soft lerp custom cursor, magnetic hover on key links, scroll‑driven reveal of section heads, light parallax on the cover plate.
- **Information design.** A folio sidebar (page numbers + section names) tracks the current section while you scroll.

Each demo project keeps its own self‑contained palette so it reads as a different "plate" — the bistro is terracotta on cocoa, the reservation suite is teal on deep sea, snake is mint on charcoal, pixel studio is cyan/magenta on plum.

## Running locally

There is no build step. Pick whichever is convenient:

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000/portfolio/
```

```bash
# or with Node
npx serve .
# open http://localhost:3000/portfolio/
```

Opening `index.html` directly with `file://` also works, but inter‑page links (cv, demos) need a server.

## Isolation from the Next.js app

This folder is deliberately separate from the Velkina Next.js application:

- It is **not** under `/app`, `/components`, `/public` or `/lib`, so Next.js never touches it.
- It uses **zero** npm dependencies — `package.json` is unaffected.
- It links to `../public/projects/*.svg` for thumbnails, **read‑only**, never mutating anything in `public/`.
- `middleware.ts` only matches non‑file paths, so `/portfolio/index.html` would still resolve as a static file when deployed alongside the main app.

To run the Velkina app, follow the root `README.md` as before.

## Deploying

Two clean options:

1. **Same site, sub‑path.** Move `portfolio/` to `public/portfolio/`, then visit `/portfolio/index.html` after deploying the main app. (Update the relative thumbnails from `../public/projects/...` → `../projects/...`.)
2. **Standalone.** Drop the `portfolio/` folder onto any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). It is fully self‑contained.

## Editing checklist

- **Add a project polaroid.** Append an entry to the `projects` array in `app.js` and drop a thumbnail SVG into `public/projects/<slug>.svg`.
- **Update the CV.** Edit the `<ol class="record">` in `index.html` and the matching list in `cv.html`.
- **Tune the palette.** All colors live as CSS custom properties at the top of `styles.css`. Search for `--paper`, `--ink`, `--accent`.
- **Swap the email.** Replace `hello@velkina.studio` everywhere — there are three references in `index.html` and one in `cv.html`.

## Credits

- Set in **Fraunces** by CJ Dunn, **Inter** by Rasmus Andersson, **JetBrains Mono** by Philipp Nurullin, **Caveat** by Pablo Impallari.
- No frameworks. No trackers. Hand‑bound, MMXXVI.
