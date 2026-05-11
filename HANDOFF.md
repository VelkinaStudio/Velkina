# Velkina — Agency Website Overhaul (2026-05-11)

## Round 2: editorial redesign + real photos + functional QR menu

This builds on the prior commit. Focus: bring the site from "functional" to "market-ready for a Romania pitch trip."

### Visual concept — completely retoned

The previous neon cyberpunk look (cyan/pink/purple on near-black) was replaced with an **editorial-mature** palette in `app/globals.css` and `tailwind.config.js`:

- `--vk-bg #0A0A0B` deep ink with warm radial gradients
- `--vk-surface #15151A` cards
- `--vk-text #F4EFE6` warm cream
- `--vk-accent #E8A656` **single warm amber accent** — replaces the prior 3-color neon mash
- `--vk-success #7FB069` muted sage (for positive metrics)
- `--vk-info #6DA5C5` dusty blue (for neutral info)

Legacy color aliases (`vkcyan`/`vkpink`/`vkmint`/`vkpurple`) are remapped to the new tokens so existing classNames keep working but render cohesively.

Other visual changes:
- Typography: `.display-1` heading utility with proper editorial tracking and weight, larger type scale.
- Cards: `vk-card` with `cubic-bezier` hover lift + amber border-glow.
- Buttons: `.vk-cta-primary` (amber on ink) and `.vk-cta-ghost`.
- Section transitions: subtle `vk-section-divider` and gradient surfaces instead of hard dividers.
- Brand logos: greyscale at rest, lift on hover (no neon glow).

### Romanian dropdown fix

The RO option was already wired in code but the user saw a stale chunk. Cleared `.next` cache. Verified in the production bundle:
```
$ grep -oE 'code:"[a-z]{2}"' .next/static/chunks/app/[locale]/layout-*.js | sort -u
code:"en"  code:"ro"  code:"tr"
```

### Real photography via Gemini 3 (Nano Banana 2)

Probed available image models against the API key (`scripts/gen-people.mjs`, `gen-food.mjs`, `gen-context.mjs`). Used `gemini-3.1-flash-image-preview`. All 24 photos generated successfully — no API 400 errors this round.

**Testimonial avatars** (`public/people/*.jpg`, 6 images):
- `selin-polat.jpg` — Lavinia Bistro owner
- `mehmet-atar.jpg` — Atar Avcı partner
- `bogdan-ionescu.jpg` — TP Thermoplast export manager
- `aylin-kaya.jpg` — Rain Group CMO
- `mert-sezer.jpg` — Nova Health CTO
- `elena-popescu.jpg` — EduTurkia director

**Food photography for Lavinia QR menu** (`public/food/*.jpg`, 12 images):
burrata, tartare, octopus, risotto, lamb, seabass, mushroom, tiramisu, pana, spritz, wine, water — all photoreal magazine-quality, no AI artifacts, no text, no hands in frame.

**Context photos for portfolio detail pages** (`public/context/*.jpg`, 6 images):
- `lavinia-interior.jpg` — Mediterranean bistro at golden hour
- `anatolia-hotel.jpg` — boutique hotel lobby with Bosphorus view
- `tp-factory.jpg` — clean plastics manufacturing facility
- `drsevim-clinic.jpg` — upscale aesthetic clinic treatment room
- `clown3d-studio.jpg` — creative 3D studio workspace
- `novahealth-office.jpg` — healthcare-tech office

These render as cinematic 21:9 banners at the top of matching portfolio detail pages, fading into the page background. Detail pages without a context-photo mapping cleanly omit the banner — no broken images.

### Real QR menu (no backend, fully seeded)

`app/demo/qr-menu/QrMenuView.tsx` upgrade:
- Added **Romanian** as a fourth menu language (en/tr/ro/de).
- Replaced CSS-gradient `art` field with real `photo` URLs across all 12 menu items.
- All allergen labels, diet tags, UI strings, info-modal copy translated to Romanian.
- Menu items keep working cart, modals, search, call-waiter, request-bill, info dialog, Tawk-widget suppression.

The result: a guest scans the QR, sees real bistro photography, switches languages, browses real menu items with prices and allergens, builds a cart. Everything works except the kitchen connection (intentionally — that's the SaaS upsell).

### Testimonials rewritten and tied to real portfolio clients

All 3 locales (`messages/{en,tr,ro}.json`) — 6 testimonials each, each:
- A real client name (Selin Polat, Mehmet Atar, Bogdan Ionescu, Aylin Kaya, Mert Sezer, Elena Popescu)
- A specific company/role tied to a portfolio project
- A concrete claim with measurable outcomes (€340 booking, 99.97% uptime, ROAS 3.4x, +60% traffic)
- A `photo` field pointing to the generated avatar

Native business voice in each locale — Romanian sample: *"Meniul QR s-a amortizat în două luni. Turiștii comandă în limba lor, iar eu actualizez meniul direct de pe telefon."*

`HomeViewSnap.tsx` testimonial section now renders avatars in 40×40 circles next to each quote, with a fallback initial badge if a photo URL is missing.

### Motion polish

- Existing `RevealClient` works correctly — re-verified the IntersectionObserver wiring.
- Added `reveal-on-scroll` triggers to all home sections (hero, services, portfolio, process, industries, results, testimonials, FAQ, CTA).
- Per-card stagger via `data-delay="100|200|300|400"` and CSS `transition-delay` modifiers.
- Card hover: `cubic-bezier(0.22, 1, 0.36, 1)` for 400ms — feels editorial, not bouncy.
- FAQ accordion: smooth max-height animation, rotating + icon.
- All motion respects `prefers-reduced-motion`.

### Files touched

- Generated photos: 24 new JPEGs in `public/people/`, `public/food/`, `public/context/`.
- Generation scripts: `scripts/gen-people.mjs`, `gen-food.mjs`, `gen-context.mjs` (one-time use, idempotent — `--force` to regenerate).
- `app/globals.css` and `tailwind.config.js` — new editorial palette and design tokens.
- `app/HomeViewSnap.tsx` — full rewrite around new palette + reveal-on-scroll + testimonial avatars.
- `app/use-cases/UseCaseDetailView.tsx` — cinematic context banner + retheme.
- `app/demo/qr-menu/QrMenuView.tsx` — Romanian + photo URLs.
- `messages/{en,tr,ro}.json` — new testimonials with photos.
- Added dev dep `@google/genai@2.0.1` for image generation.

### Build verified

`npm run build` passes clean. 36 portfolio detail pages × 3 locales generated statically. All routes return 200 on the production server. Romanian dropdown verified in the compiled bundle (`code:"ro"` present).

### Known minor items

- The `/customer-agent` page still has TR/EN-only ternaries (Romanian → English fallback). It's a product-specific page not central to the Romania pitch.
- Generated food and people photos are large (~600 KB each). For pure performance, consider running through `sharp` to produce WebP variants. Not a blocker.
