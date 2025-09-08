# Velkina — Next.js App

Modern, bilingual (TR/EN) website built on Next.js App Router with a full‑screen, snap‑scrolling home and clean content structure.

## Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- Lenis (smooth scroll, CDN)
- GSAP + ScrollTrigger (CDN, used lightly)

## Develop locally

1. Install deps:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Visit http://localhost:3000

## Key routes and structure

- `app/[locale]/layout.jsx`
  - Global layout for `tr` and `en`, navbar/footer, transition overlay
  - Loads fonts via `next/font` (Sora + Inter)
  - Wires global clients (`GlobalClient`, `RevealClient`)

- `app/[locale]/page.jsx`
  - Home: renders `app/HomeViewSnap.tsx`

- `app/HomeViewSnap.tsx`
  - Sections: Hero → Services → Why (3 benefits) → Projects (rail) → Results + Clients → Testimonials (rail) → CTA
  - Uses: `HeroShapesClient`, `HeroStepsClient`, `RailClient`, `CountUpClient`, `CardParallaxClient`, `RevealClient`

- `app/[locale]/blog/page.jsx` + `app/blog/BlogView.tsx`
  - Blog list with search and category filters
  - Cards link to detailed pages

- `app/[locale]/blog/[slug]/page.jsx`
  - Blog article detail page generated from titles in messages

- `components/GlobalClient.jsx`
  - Smooth scroll, navbar solid state, CTA link wiring, simple reveals, ticker a11y helpers

- `components/RailClient.jsx`
  - Auto + manual scroll for horizontal rails (Projects, Testimonials)
  - Arrow buttons (left/right) and hover/focus pause

- `app/globals.css`
  - Design tokens (colors, radii, shadows)
  - Variants for cards, chips, tickers
  - Extra violet accent `--vk-violet` to reduce monotony

## Content model (i18n)

All copy and demo data live in `messages/en.json` and `messages/tr.json`.

- Home
  - `home.ctas` — button labels
  - `home.testimonials.items[]` — testimonial quotes
  - `home.metrics2.*` — improved Results labels + values

- Projects rail (homepage)
  - Reads from `useCases.projects.items[]` (title, desc, cat, url)
  - Card thumbnails resolve by slug to `public/projects/<slug>.svg`, with a fallback image at `public/projects/placeholder.svg`

- Blog
  - List and details read from `blog.samplePosts[]` (title, desc, cat, read)
  - Slugs generated from titles: `/[locale]/blog/[slug]`

## Adding project thumbnails

1. Add or edit an item in `messages/tr.json` or `messages/en.json` under `useCases.projects.items[]`.
2. Create a thumbnail SVG/PNG in `public/projects/` named after the slugified title (e.g. `dr-sevim-aydin-beauty.svg`).
3. The homepage rail will automatically pick it up (fallback provided if missing).

## Cleanup & conventions

- Keep only referenced components and assets in the repo. Legacy or unused files can be removed.
- Co-locate component‑specific clients under `components/` and keep them side‑effect free.
- Prefer i18n messages for labels and copy (`messages/*.json`).
- Favor composition over flags in UI components.

## Deployment

- Ready for Vercel/Netlify. No special config required.

