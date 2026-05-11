# Velkina flow audit — 2026-05-12

Live server probed: `http://localhost:3000` (Next.js dev). All curl probes ran against the dev server. Screenshots captured via Playwright MCP at 1440x900 desktop and 390x800 mobile.

## Summary

- Flows tested: 10 / 10
- Working: 5 (locale switch, Accept-Language redirect, hero CTA, portfolio detail routing, QR demo, mobile nav)
- Partially working: 3 (services nav — anchors only; contact "form" — no form; mobile nav uses legacy palette)
- Broken: 2 (customer-agent locale; blog quick-contact CTAs); plus one root-level hydration bug that degrades every page

## P0 (blocks Romania pitch)

- **Double-root layout / hydration failure** — `app/layout.jsx:18-25` and `app/[locale]/layout.jsx:78-178` both emit `<html><body>`. The browser console shows `Hydration failed because the initial UI does not match what was rendered on the server` on *every* page navigation, with React falling back to client rendering. A Romanian investor opening the site in a fresh tab sees the dev-overlay error banner (in dev) and a flash of unstyled / re-rendered content (in prod). Evidence: `flow-screenshots/velkina-01-home-en.png` + console log showing 15 hydration errors after a clean nav to `/en`. Suggested fix: convert `app/layout.jsx` to a pass-through (`return children`) — only `[locale]/layout.jsx` should emit the document root.
- **/customer-agent renders in English when locale is RO** — `app/customer-agent/CustomerAgentView.tsx:17` uses `const isEnglish = locale !== 'tr'`. Romanian visitors land on `/ro/customer-agent` and see English body content. Evidence: live probe at `/ro/customer-agent` returned `h1 = "Turkish Customer Service Agents"` and section headings `["Overview","Key Features","Benefits","Use Cases"]` (English) while the `<title>` is Romanian. Screenshot: `flow-screenshots/velkina-04-customer-agent-ro.png`. HANDOFF.md:108 acknowledges this as a "known minor item" — for a Romania pitch trip, an English page reachable from the Romanian nav is not minor. Suggested fix: add a third branch in `CustomerAgentView.tsx:13-190` for `locale === 'ro'` with Romanian copy, OR move all strings into `messages/{en,tr,ro}.json` under `customerAgent.*` and render from `t('customerAgent', '…')`.
- **Blog quick-contact CTAs are dead** — `app/blog/BlogView.tsx:112,118,124` render three `<a data-cta="…">` elements with no `href` attribute. Live DOM probe on `/en/blog` confirmed `href: null` for all three CTAs (WhatsApp / Email us / Schedule a call). Clicking any of them is a no-op. Compare with the equivalent block in `app/HomeViewSnap.tsx:410-435` and `app/contact/ContactView.tsx:28,32,36` which use `whatsappHref(...)`, `mailHref(...)`, and `CONTACT.scheduleUrl`. Suggested fix: add `href={whatsappHref(common?.whatsappPrefill)}`, `href={mailHref(common?.emailSubject)}`, `href={CONTACT.scheduleUrl}` plus `target="_blank" rel="noopener noreferrer"` on the latter two — pattern already used in `HomeViewSnap.tsx:412-432`.

## P1 (degrades)

- **Blog detail pages 200 on any slug** — `app/[locale]/blog/[slug]/page.jsx:26-60` matches `params.slug` against a slugified post title; on no match it renders an "Article coming soon." stub (`L.soon`) instead of calling `notFound()`. Live probe: `GET /en/blog/totally-fake-slug-test` returned 200. Use-case detail pages do this correctly (`app/[locale]/use-cases/[slug]/page.jsx:37 — notFound()`); blog should match. Suggested fix: insert `if (!match) notFound();` after line 30, mirroring the use-case page.
- **Blog "posts" are placeholder shells** — `app/[locale]/blog/[slug]/page.jsx:33-50` renders three boilerplate sections per post ("Overview / What we built / Outcomes") interpolating the post's `desc` field into the first paragraph. There are 12 article titles but zero actual article bodies. A Romanian prospect clicking any "Building unified middleware APIs"-style headline sees ~120 words of generic agency boilerplate. Suggested fix: add a `body` field per post in `messages/{en,tr,ro}.json:blog.samplePosts` (or move to MDX); render `prose` from that. If shipping shells is the intent, hide the blog from nav until real bodies exist (`app/[locale]/layout.jsx:100,131`).
- **Use-case detail content is shallow** — Measured via `node` script on `messages/en.json`: per-project content (intro + challenge + solution + outcome + stack + deliverables + metric labels) averages 150-200 chars. Example: `rain-group-ecommerce` = 152 chars, `drsevim-beauty-clinic` = 146 chars, `marmara-foods-google-ads` = 154 chars. Rendered page totals ~2300 chars including nav and footer (`flow-screenshots/velkina-08-usecase-detail-ro.png`). For an agency portfolio piece pitched to a Romanian buyer, this reads like a meta-description, not a case study.
- **Contact "page" has no form** — `app/contact/ContactView.tsx:22-65` has zero `<form>` / `<input>` elements (verified live: `forms: 0, inputs: 0`). Four cards: mailto, tel, WhatsApp, scheduling link. For a B2B prospect who prefers structured intake (project brief, budget, timeline), there's no path. Acceptable for some agencies, but flag it.
- **Public-facing contact info is a personal Hotmail + TR mobile** — Live DOM probe on `/en/contact` confirmed `mailto:omercannalbant@hotmail.com` and `tel:+905323360051`. For Romania pitch credibility, a `@velkina.com` (or equivalent) email is expected. Likely intentional, flagging for visibility — defined in `lib/contact.ts`.
- **Services pages have no individual route per service** — Hero CTA "Learn more" on the home services grid (`app/HomeViewSnap.tsx:178`) goes to `/${locale}/services#${item.id}`. There are no `/services/[id]` pages. All 10 anchors (websites, shopify, qr-menu, google-ads, meta-ads, cloud, ai-automation, mobile, seo, branding) do exist on `/en/services` (verified `grep -oE 'id="..."'` returned all 10). Anchor jump works, but per-service deep-link SEO and richer per-service content are absent.

## P2 (polish)

- **Hero CTA href format `/${locale}#cta` is missing a trailing slash** — `app/HomeViewSnap.tsx:98` emits `/en#cta`. Browser resolves it because the current route IS `/en`, but if a user is on a sub-page (e.g. `/en/about`) the same JSX pattern wouldn't be present, so no in-app bug today. Footer at `app/[locale]/layout.jsx:101,141` uses `/${locale}/#cta` (with slash). Inconsistent but functional.
- **Mobile nav "Start project" pill uses legacy `bg-vkpink`** — `components/MobileNavClient.jsx:70`. HANDOFF.md:9-17 declares a new editorial palette built around `bg-vkaccent` (amber). Legacy aliases (`vkpink`) are remapped per HANDOFF.md:18, so it renders, but the brand voice on mobile drifts. Cross-check with `HomeViewSnap.tsx:99` which uses `vk-cta-primary` (new palette). Same drift at `ContactView.tsx:59`, `BlogView.tsx:112`, `MobileNavClient.jsx:70`.
- **Tawk.to CORS errors on every page** — `app/[locale]/layout.jsx:157-173` injects the Tawk widget; the embed makes a CORS-blocked fetch to `https://va.tawk.to/log-performance/v3`. Not user-visible but pollutes the console.
- **Customer-agent page hero uses old `radial-gradient` neon palette** — `app/customer-agent/CustomerAgentView.tsx:198-202` and similar in `BlogView.tsx:46-48` — purple+cyan glow that HANDOFF.md:9 claims was replaced everywhere.
- **No XML sitemap entries for blog detail pages** — `app/sitemap.js` (not opened in this audit; flag for follow-up if blog detail bodies are added).
- **Customer-agent content doesn't fit Romania pitch context** — Whole page is about *Turkish*-speaking customer service agents. For a Romanian prospect this is not just an English fallback issue (P0 above) — even in English it's a niche product offer. Worth deciding whether to hide `/customer-agent` from `/ro` nav entirely.

## Per-flow detail

### 1. Locale switch

**Status:** Working
**Entry component:** `components/LanguageSwitcher.jsx:55` (button) → dropdown options `components/LanguageSwitcher.jsx:78-87`
**Handler:** `go(target)` at `components/LanguageSwitcher.jsx:46-49` calls `router.push(toLocalePath(pathname, target))`
**Path rewrite:** `toLocalePath` at `components/LanguageSwitcher.jsx:34-44` correctly swaps the leading segment if it's a known locale, else prepends.
**Evidence:**
- HTTP probe: `/en/`, `/tr/`, `/ro/` all return 308 (trailing-slash redirect) and content loads (curl output above).
- Live click: navigated `/en` → clicked dropdown → clicked "Română" → URL became `/ro` (Playwright trace: `velkina-02-lang-dropdown-en.png` → `velkina-03-home-ro.png`).
- All 3 locales present in dropdown options at `LanguageSwitcher.jsx:5-9`.

### 2. Browser-language redirect

**Status:** Working
**Entry:** `middleware.ts:3-11` (next-intl middleware), `localeDetection: true`.
**Evidence (curl):**
```
GET /                                   -> 307 -> /en
GET / Accept-Language: ro               -> 307 -> /ro
GET / Accept-Language: tr               -> 307 -> /tr
GET / Accept-Language: en               -> 307 -> /en
```
Romanian browsers land on `/ro` correctly.

### 3. Hero CTA

**Status:** Working (with minor href-format inconsistency — see P2)
**Entry component:** `app/HomeViewSnap.tsx:97-103` — primary CTA anchor `href={`/${locale}#cta`}`.
**Target anchor:** `app/HomeViewSnap.tsx:403` — `<section id="cta" …>`.
**Secondary CTA:** `app/HomeViewSnap.tsx:104-109` → `/${locale}/use-cases`.
**Evidence:** Live DOM probe on `/en` returned `heroCtaHref: "/en#cta"` and `ctaAnchorExists: true`. Anchor-jump works because the current page IS `/en`. The CTA section has three working sub-CTAs: WhatsApp, schedule, email (all hrefs populated via `whatsappHref`/`mailHref`/`CONTACT.scheduleUrl` at lines 412/422/431).

### 4. Services nav (9+ service areas with real content)

**Status:** Partial — 10 service areas exist; content is moderate (~450-580 chars each); no per-service pages.
**Entry component:** `app/HomeViewSnap.tsx:176-203` — grid of `<a>` cards linking to `/${locale}/services#${item.id}`.
**Target page:** `app/services/ServicesView.tsx:90-158` — single page, anchor-scrolled sections per service.
**Evidence (content depth, `messages/en.json` :: `services.items[].{intro,deliverables,outcomes,examples}`):**
```
websites          507 chars
shopify           497 chars
qr-menu           577 chars
google-ads        479 chars
meta-ads          443 chars
cloud             457 chars
ai-automation     495 chars
mobile            513 chars
seo               477 chars
branding          486 chars
```
All 10 IDs render server-side: `curl /en/services | grep id="..."` returned all 10. Romanian/Turkish equivalents also exist in `messages/{ro,tr}.json`.
**Observation:** Audit criterion was ">500 chars unique text per page" — 7 of 10 are just under that bar, all are above 400. There is no individual `/services/[id]` page; navigation is anchor-based on a single tall page. That's a deliberate design choice but limits SEO (no per-service landing) and means each "service area" doesn't get its own indexable URL.

### 5. Portfolio detail pages

**Status:** Working (routing) — content is shallow (P1)
**Entry component:** `app/HomeViewSnap.tsx:226-249` (home portfolio grid), `app/use-cases/UseCasesView.tsx:58` (listing).
**Route:** `app/[locale]/use-cases/[slug]/page.jsx` — uses `generateStaticParams()` from `messages.useCases.projects.items[].slug` and `notFound()` on miss.
**Renderer:** `app/use-cases/UseCaseDetailView.tsx` — includes a context-photo banner conditional on slug.
**Evidence (HTTP probes, all 12 slugs × 3 locales = 36 routes):**
```
/en/use-cases/lavinia-bistro-qr-menu          200
/tr/use-cases/lavinia-bistro-qr-menu          200
/ro/use-cases/lavinia-bistro-qr-menu          200
… (36 total, all 200)
```
Fake slug returns 404 correctly: `/en/use-cases/totally-fake-slug-test -> 404`.
Screenshot: `flow-screenshots/velkina-08-usecase-detail-ro.png` — context banner renders, breadcrumb works.
**Content depth (`messages/en.json` :: per-project detail):**
```
lavinia-bistro-qr-menu       208 chars
rain-group-ecommerce         152 chars
drsevim-beauty-clinic        146 chars
… avg ~165 chars per project
```
This is the "shallow content" P1 above.

### 6. Demo QR menu

**Status:** Working
**Route:** `app/[locale]/demo/qr-menu/page.jsx` → `app/demo/qr-menu/QrMenuView.tsx`.
**Locale support:** 4 menu languages (`en | tr | ro | de`) at `QrMenuView.tsx:7,296,485`.
**Photos:** 12 real food JPEGs in `public/food/` (burrata, tartare, octopus, risotto, lamb, seabass, mushroom, tiramisu, pana, spritz, wine, water).
**Evidence:**
- HTTP: `/en/demo/qr-menu`, `/tr/demo/qr-menu`, `/ro/demo/qr-menu` → all 200.
- Live DOM probe (`/ro/demo/qr-menu`): `foodImgCount: 12`, sample srcs `[/food/burrata.jpg, /food/tartare.jpg, /food/octopus.jpg]`.
- Romanian translations confirmed in source: `QrMenuView.tsx:38, 44, 52, 56-74` (item names + descriptions in RO).
- Screenshot: `flow-screenshots/velkina-05-qr-menu-ro.png` — full menu UI in Romanian with photos.
**Observation:** This is the strongest functional demo on the site. HANDOFF.md's claims here are accurate.

### 7. Customer agent demo

**Status:** Broken (locale)
**Route:** `app/[locale]/customer-agent/page.jsx` → `app/customer-agent/CustomerAgentView.tsx`.
**Bug locus:** `CustomerAgentView.tsx:17` — `const isEnglish = locale !== 'tr'`. Comment at line 16 acknowledges: "English is the safe fallback for non-Turkish locales (Romanian, etc.)".
**Evidence:**
- HTTP: `/ro/customer-agent` → 200.
- Live DOM probe (`/ro/customer-agent`):
  - `<title>`: "Velkina — Agenți AI pentru servicii pentru clienți" (Romanian — from `messages/ro.json`)
  - `<h1>`: "Turkish Customer Service Agents" (English — from inline component string)
  - Section headings: `["Overview", "Key Features", "Benefits", "Use Cases"]` (English)
  - First paragraph: "Enhance your customer service with AI agents fluent in Turkish…"
- Screenshot: `flow-screenshots/velkina-04-customer-agent-ro.png` — full-page proof of English body under Romanian title.
**HANDOFF self-disclosure:** Line 108 — "The /customer-agent page still has TR/EN-only ternaries (Romanian → English fallback). It's a product-specific page not central to the Romania pitch." This audit disagrees: the page is in the primary nav at `app/[locale]/layout.jsx:99` and `MobileNavClient.jsx:27`; Romanian buyers will click it.

### 8. Contact form

**Status:** No form exists (by design); content links work
**Page:** `app/contact/ContactView.tsx:22-65` — four anchor cards.
**Evidence:** Live DOM probe on `/en/contact`: `forms: 0, inputs: 0`. Four working links:
```
mailto:omercannalbant@hotmail.com?subject=Project%20inquiry
tel:+905323360051
https://wa.me/905323360051?text=Hi%20Velkina!%20I%27d%20like%20to%20talk%20about%20a%20project.
[CONTACT.scheduleUrl]
```
No `action=` / `onSubmit=` handler anywhere in the file. The Quick Contact pill at line 58-62 anchors to `/${prefix}/#cta` (home page CTA section).
**Verdict:** Not "broken" — just absent. P1 if a structured intake is expected; the personal-Hotmail email is also a P1 brand-credibility issue.

### 9. Mobile nav

**Status:** Working
**Component:** `components/MobileNavClient.jsx`.
**Open trigger:** hamburger button at line 34-43 — `setOpen(true)` on click.
**Close:** overlay click at line 48, X button at line 55-57, route change (`useEffect` line 12), Escape (not implemented — Escape closing handled in language switcher only, not the drawer).
**Body scroll lock:** line 15-20 — `body.style.overflow = 'hidden'` when open.
**Links rendered (line 23-29):** Home, Services, Use Cases, Customer Agent, Blog + Start Project CTA.
**Language switcher** included in drawer footer at line 78-80.
**Evidence:** Mobile screenshot at 390x800 of `/en` with hamburger pressed (`flow-screenshots/velkina-06-mobile-nav-open.png`) — drawer slides in, all 5 nav links + Start project pill + Language switcher visible.
**Minor:** Drawer doesn't trap focus or close on Escape (a11y polish, P2). "Start project" pill uses legacy `bg-vkpink` (P2 palette drift).

### 10. Internal link integrity

**Status:** Working
**Methodology:** Grepped all `href={`/${locale}/…` patterns in `app/` and `components/`, normalized, and confirmed each target route exists in the `app/[locale]/` tree.
**Inventory (locale-prefixed targets):**
```
/about       ✓ app/[locale]/about
/blog        ✓ app/[locale]/blog
/contact     ✓ app/[locale]/contact
/customer-agent  ✓ app/[locale]/customer-agent
/demo/qr-menu    ✓ app/[locale]/demo/qr-menu
/privacy     ✓ app/[locale]/privacy
/services    ✓ app/[locale]/services
/terms       ✓ app/[locale]/terms
/use-cases   ✓ app/[locale]/use-cases
/use-cases/<slug>  ✓ app/[locale]/use-cases/[slug]
/blog/<slug>       ✓ app/[locale]/blog/[slug]  (but accepts any slug — P1)
#cta              ✓ HomeViewSnap.tsx:403
```
**No 404-able internal links found** in app/ or components/. All hardcoded `href="/…"` (non-locale-prefixed) were exhausted — none exist except `#main` (skip-to-content at layout:85).

## Verdict table

| Flow | Verdict | Break layer | Effort |
|---|---|---|---|
| 1. Locale switch | WORKS | — | — |
| 2. Accept-Language redirect | WORKS | — | — |
| 3. Hero CTA | WORKS | — | — |
| 4. Services nav | PARTIAL | UX/content (no per-service routes) | medium |
| 5. Portfolio detail | WORKS (routing) / PARTIAL (content) | content depth | high |
| 6. QR demo | WORKS | — | — |
| 7. Customer-agent locale | BROKEN | layer 1 (component string source) | medium |
| 8. Contact form | N/A by design / PARTIAL | no form | low–medium |
| 9. Mobile nav | WORKS | — | — |
| 10. Link integrity | WORKS | — | — |
| (Cross-cutting) double root layout | BROKEN | infra | low |
| (Cross-cutting) blog CTAs dead | BROKEN | layer 2 (handler — missing href) | low |
| (Cross-cutting) blog any-slug 200 | BROKEN | layer 4 (route handler) | low |

## Screenshots captured

`docs/audits/2026-05-12/flow-screenshots/`

- `velkina-01-home-en.png` — home page, /en, desktop
- `velkina-02-lang-dropdown-en.png` — language switcher dropdown open
- `velkina-03-home-ro.png` — home page after locale switch to /ro
- `velkina-04-customer-agent-ro.png` — *evidence of English body under Romanian title*
- `velkina-05-qr-menu-ro.png` — QR demo in Romanian with 12 food photos
- `velkina-06-mobile-nav-open.png` — mobile drawer at 390x800
- `velkina-07-blog-en.png` — blog listing with dead quick-contact CTAs at bottom
- `velkina-08-usecase-detail-ro.png` — Lavinia Bistro use-case detail in Romanian

## Cross-cutting hydration error transcript (excerpt)

From `Playwright browser_console_messages` on a clean nav to `http://localhost:3000/en`:

```
[ERROR] Warning: You are mounting a new <html> component when a previous one has not first unmounted.
[ERROR] Warning: You are mounting a new <body> component when a previous one has not first unmounted.
[ERROR] Warning: In HTML, <html> cannot be a child of <main>. This will cause a hydration error.
[ERROR] Hydration failed because the initial UI does not match what was rendered on the server.
[ERROR] There was an error while hydrating. Because the error happened outside of a Suspense
        boundary, the entire root will switch to client rendering.
```

Stack trace shows BOTH `LocaleLayout (Server)` and `RootLayout (Server)` emitting their own `<html>` / `<body>`. The DOM eventually settles with a single html/body after client takeover (verified `htmls: 1, bodies: 1` post-hydration), but the visitor still gets the "fall back to client rendering" path on every page.

## Honest deltas vs. HANDOFF.md claims

| HANDOFF.md claim | Reality |
|---|---|
| "Build verified. npm run build passes clean." (line 103) | Dev server has page-wide hydration error from double root layout. Build-time prerender may also be affected; not separately probed in this audit. |
| "All routes return 200 on the production server." (line 104) | True for the 30+ routes probed, plus blog detail pages return 200 for *any* slug — not a wanted behavior. |
| "Romanian dropdown verified" (line 30-33) | Verified live: dropdown works end-to-end. |
| "The /customer-agent page still has TR/EN-only ternaries… not central to the Romania pitch." (line 108) | The page IS in the primary nav for Romanian visitors (`layout.jsx:99`). Calling it "minor" understates the impact. |
| "market-ready for a Romania pitch trip" (line 5) | Three P0 issues found in 30 minutes of probing. Two are <1 hour fixes (root layout, blog CTAs). The customer-agent locale is half a day to do properly. |
