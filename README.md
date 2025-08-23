# Velkina — Next.js Migration

This is the Next.js app version of the Velkina site, ready for Vercel.

## Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- GSAP + ScrollTrigger (CDN)
- Lenis (CDN)

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

## Structure
- `app/layout.jsx` — global layout, navbar, footer, transition overlay
- `app/page.jsx` — home page (hero, about, services, stack, CTA)
- `app/blog/page.jsx` — blog list with search + category filters
- `app/use-cases/page.jsx` — use cases with category filters
- `components/GlobalClient.jsx` — smooth scroll, transitions, CTA links, light reveals
- `app/globals.css` — design tokens and utilities

## Notes
- Brand logos currently load via Simple Icons CDN. You can move local SVGs into `public/assets/brands/` and switch `src` accordingly.
- CTA links are set in the client. Optionally expose `window.VELK_CONTACT` to override `whatsapp` or `schedule`.
- Ready to deploy on Vercel (no special config required).
