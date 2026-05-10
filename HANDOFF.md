# Velkina — Agency Website Overhaul (2026-05-11)

## What changed

Velkina was transformed from a small bilingual TR/EN agency site into a **complete agency-tech company website** ready for in-person business pitches in Romania.

### 1. Locales (TR/EN → EN/TR/RO)
- Added **Romanian** as a first-class locale alongside English and Turkish.
- Default fallback locale changed to English. Romanian browsers route to `/ro` via `Accept-Language` detection.
- All locale-aware page files (`/[locale]/...`) extended for `ro`.
- `LanguageSwitcher` rebuilt as a 3-option dropdown (was a 2-state toggle).
- `next-intl.config.js`, `middleware.ts`, `i18n/messages.ts`, `i18n/request.js`, `app/sitemap.js` updated.

### 2. Content (messages/*.json)
- **`messages/en.json`** rewritten with new agency positioning:
  - 9 service items (websites, Shopify, QR menu, Google Ads, Meta Ads, Cloud, AI automation, Mobile, SEO, Branding)
  - 12 portfolio projects with `slug`, `category`, `client`, `year`, `scope`, `mockup`, `intro`, `problem`, `approach`, `result`, `highlights`, `tags`
  - New sections: `home.hero`, `home.process` (4 steps), `home.industries`, `home.faq` (7 items), `home.ctaSection`, `home.trustBar`, `home.servicesIntro`, `home.portfolioIntro`, `home.processIntro`, `home.resultsIntro`, `home.stackIntro`, `home.testimonialsIntro`, `home.faqIntro`
- **`messages/tr.json`** translated to native business Turkish (matching tone, proper typography).
- **`messages/ro.json`** translated to native business Romanian (proper ă â î ș ț diacritics, idiomatic phrasing — not Google-Translate stiff).

### 3. Portfolio mockups (12 hand-built SVGs)
All in `public/projects/`. No AI image generation — every mockup is a hand-coded SVG with a browser/phone frame and believable, sector-specific UI content:
- `lavinia-bistro-qr-menu.svg` — kept from previous work
- `rain-group-ecommerce.svg` — Shopify product page (Riviera Throw — Sand)
- `drsevim-beauty-clinic.svg` — clinic website
- `tp-thermoplast-b2b.svg` — B2B catalog with spec sheet
- `eduturkia-platform.svg` — admin dashboard (488-line table)
- `clown3d-creative-studio.svg` — creative studio with 3D orb
- `ataravci-law-firm.svg` — law firm landing
- `anatolia-hotel-booking.svg` — direct-booking page with OTA comparison
- `novahealth-cloud-migration.svg` — AWS CloudWatch console
- `bosporus-travel-ai-agent.svg` — WhatsApp + agent console split view
- `skyline-media-mobile-app.svg` — twin iOS app phones
- `marmara-foods-google-ads.svg` — Google Ads overview dashboard with charts and campaign table

### 4. Pages & components rebuilt
- `app/HomeViewSnap.tsx` — full rewrite. Hero, trust bar, services grid, portfolio grid, process, industries, results, testimonials, tech stack, FAQ accordion, CTA. Mobile-first. Locale-aware throughout (no hardcoded EN/TR ternaries).
- `app/use-cases/UseCasesView.tsx` — client component with React state filters. New mockup-based card grid.
- `app/use-cases/UseCaseDetailView.tsx` — **NEW** detail view: hero with category/year/scope, fact card, mockup hero image, problem → approach → result, highlights checklist, related projects, CTA.
- `app/[locale]/use-cases/[slug]/page.jsx` — **NEW** dynamic detail route with `generateStaticParams` covering all 12 projects × 3 locales = 36 paths.
- `app/services/ServicesView.tsx` — rewrite, hardcoded TR/EN strings removed, native RO support.
- `components/LanguageSwitcher.jsx` — 3-locale dropdown with globe icon.
- `app/privacy/PrivacyView.tsx`, `app/terms/TermsView.tsx` — "Last updated" label now locale-aware.

## Build & QA

- `npm run build` passes clean. 0 errors, 0 warnings.
- 36 portfolio detail pages (12 projects × 3 locales) generated statically.
- All 3 locales render correctly at 390×844 mobile and 1440×900 desktop (verified with chrome-devtools MCP).
- Romanian copy verified to read natively (samples: "Construim software-ul și designul care vă ajută afacerea să crească", "Tot ce are nevoie afacerea dvs. online — sub același acoperiș").

## Known minor items (not blockers)

- `app/customer-agent/CustomerAgentView.tsx` still has TR/EN-only hardcoded content. Romanian falls through to English. The page is product-specific (Turkish customer service agents) and not a primary Romania pitch surface.
- `app/use-cases/parts/UseCasesClient.jsx` is dead code (filter logic moved into UseCasesView's React state). Safe to delete in a follow-up.
- Tawk.to chat widget overlaps hero CTAs on small viewports — third-party widget, not our component. Consider repositioning or delaying load on mobile.

## Files touched

26 modified, 14 new, 8 deleted (old small placeholder mockups). See `git status` for the full list.
