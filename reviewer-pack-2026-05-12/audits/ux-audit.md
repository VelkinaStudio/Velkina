# Velkina UX/A11y/Perf audit — 2026-05-12

Auditor: ux-auditor (opus). Scope: 5 priority routes, 7 lighthouse runs, mobile profile, 360 and 1440 viewports.

## Tooling used

- **Primary:** Chrome DevTools MCP (`mcp__chrome-devtools__lighthouse_audit` + `navigate_page` + `take_screenshot` + `resize_page`).
- **Lighthouse mode:** `navigation`, `device: mobile`. The MCP server runs at the default mobile profile (Moto G Power class, slow 4G, 4× CPU throttle).
- **Caveat:** Chrome DevTools MCP Lighthouse **deliberately excludes the Performance category** (the tool description states: "This excludes performance. For performance audits, run performance_start_trace"). All Perf scores below are reported as **N/A — not measured by this tool**. A separate `performance_start_trace` run is required to produce Perf scores. Not run in this pass to preserve the 7-route budget and because the flow auditor in parallel does not need them.
- Reports were emitted to MCP-managed temp dirs (workspace root restriction), then copied into `D:/Velkina/docs/audits/2026-05-12/lighthouse/` via `cp`.

## Lighthouse summary (mobile profile)

| Route | Locale | Perf | A11y | Best Practices | SEO | Agentic | JSON path |
|---|---|---|---|---|---|---|---|
| `/` | en | N/A | **93** | 96 | 100 | 67 | `lighthouse/home-en.json` |
| `/` | tr | N/A | **93** | 96 | 100 | 67 | `lighthouse/home-tr.json` |
| `/` | ro | N/A | **93** | 96 | 100 | 67 | `lighthouse/home-ro.json` |
| `/services` | en | N/A | 96 | 96 | **83** | 67 | `lighthouse/services-en.json` |
| `/use-cases/lavinia-bistro-qr-menu` | en | N/A | **89** | 96 | 92 | **33** | `lighthouse/usecase-lavinia-en.json` |
| `/demo/qr-menu` | en | N/A | 96 | 96 | 92 | 67 | `lighthouse/demo-qr-menu-en.json` |
| `/customer-agent` | en | N/A | 92 | 96 | 92 | 66 | `lighthouse/customer-agent-en.json` |

**Bold = below 95.** "Agentic Browsing" is the new Lighthouse category for LLM crawlability; it tanks because there is no `llms.txt` (universal across all 7 routes) and on the use-case page the accessibility tree is malformed (see P1).

Performance not measured — see "What I did NOT verify" at the bottom.

## P0 findings (blocks ship)

### P0-1. Hydration mismatch errors on every page

- **Route:** all 7 routes; reported by `errors-in-console` lighthouse audit.
- **Evidence:** `lighthouse/home-en.json` `audits.errors-in-console.details.items[]` contains repeated `Error: Hydration failed because the initial UI does not match what was rendered on the server` exceptions. Same pattern in every other JSON.
- **Why it matters:** A hydration mismatch causes React to throw away the server HTML and re-render client-side. This breaks SEO partially (crawlers see one DOM, users see another for a frame), causes FOUC, and inflates LCP/CLS. The lighthouse-reported CLS on `/customer-agent` already shows 0.059 (score 0.98) which is borderline.
- **Likely cause:** Localized date/time, `Math.random`, or browser-only globals computed in render. Common Velkina suspects: any component reading `window`, `navigator.language`, `Date.now()`, or the Lenis/GSAP injection in `app/[locale]/layout.jsx` line ~74-180 doing client-only side effects without a `useEffect` guard.
- **Target fix:** Run the dev server, open `/en`, open DevTools → React tab. The error stack already points to the failing component — instrument with `suppressHydrationWarning` only as a last resort; the right fix is to move client-only state into `useEffect`. Start by inspecting `app/HomeViewSnap.tsx` and the GSAP/Lenis client wrappers.

### P0-2. Color contrast failure on home (en/tr/ro) and use-case page

- **Route:** `/en`, `/tr`, `/ro`, `/en/use-cases/lavinia-bistro-qr-menu` — `audits.color-contrast.details.items[]`.
- **Evidence (home-en, home-tr, home-ro, usecase, customer-agent, demo):** lighthouse a11y audit reports a contrast failure with selector `div.nextjs-toast-errors-parent > div > div.nextjs-toast-errors > span` — foreground `#ffffff` on background `#ff5555`, ratio 3.14 (needs 4.5). **This is the Next.js dev-mode error-toast overlay caused by P0-1.** It is NOT a real content contrast bug; it is the chrome that appears because hydration is failing.
- **Fix path:** Fix P0-1 → the error toast stops appearing → this finding disappears in production builds.
- **Why I'm still calling this P0:** because it's currently the visible symptom of P0-1. If hydration is fixed in dev, this disappears. If it isn't, every dev/staging user sees the red toast.

### P0-3. Canonical URL points to wrong page on subroutes

- **Route:** `/en/services`, `/en/customer-agent`, `/en/demo/qr-menu`, `/en/use-cases/lavinia-bistro-qr-menu` (anything that is NOT the home page).
- **Evidence:** `lighthouse/services-en.json` `audits.canonical.explanation` = "Points to another `hreflang` location (http://localhost:3000/en)". Same on customer-agent-en.json, demo-qr-menu-en.json, usecase-lavinia-en.json.
- **Root cause:** `app/[locale]/layout.jsx:33-40` sets `alternates.canonical: \`/${locale}\`` at the locale-layout level. Because no child route overrides this in its own `generateMetadata`, **every subroute inherits canonical = `/en`** (or `/tr`, `/ro`). Google sees `/en/services`, `/en/customer-agent`, `/en/demo/qr-menu`, `/en/use-cases/lavinia-bistro-qr-menu` all claiming the home page as their canonical → they will not be indexed as separate pages. This nukes the entire portfolio's SEO value before the Romania pitch trip.
- **Target fix:** Either (a) remove `canonical` from the locale layout and add it per-page in each `page.jsx`'s `generateMetadata`, or (b) compute the correct path from `params` in the layout if possible (App Router metadata does not have route-segment access from the layout, so option (a) is the standard fix). Files to add `generateMetadata` to: `app/[locale]/services/page.jsx`, `app/[locale]/customer-agent/page.jsx`, `app/[locale]/demo/qr-menu/page.jsx`, `app/[locale]/use-cases/[slug]/page.jsx`, `app/[locale]/about/page.jsx`, `app/[locale]/contact/page.jsx`, `app/[locale]/blog/page.jsx`, `app/[locale]/blog/[slug]/page.jsx`, `app/[locale]/privacy/page.jsx`, `app/[locale]/terms/page.jsx`.

### P0-4. Tawk.to widget triggers CORS errors and pollutes production console

- **Route:** all 7 routes — `audits.errors-in-console.details.items[].description` contains: `Access to fetch at 'https://va.tawk.to/log-performance/v3' from origin 'http://localhost:3000' has been blocked by CORS policy`.
- **Source:** `app/[locale]/layout.jsx:159-175` — `<Script id="tawk-to" strategy="afterInteractive">` injects the Tawk widget on every page.
- **Why P0:** the flow auditor working in parallel has independently flagged this; the chat widget is the contact-funnel exit on every page, and the CORS errors will (a) pollute production Sentry/Vercel logs, (b) tank the Lighthouse Best Practices score in real production, (c) suggest a misconfigured Tawk property ID or domain whitelist.
- **Target fix:** In Tawk dashboard → property `69d6cffc443eaa1c3cea1d2c` → Admin → Property Settings → Domain restrictions, add `velkina.com` (or whatever production origin is) and `localhost:3000`. Independently, consider lazy-loading the widget on user interaction rather than `afterInteractive` to reduce blocking script time. See `app/[locale]/layout.jsx:159`.

### P0-5. Missing `llms.txt` — Agentic Browsing score of 67 across all routes

- **Route:** all 7 routes.
- **Evidence:** `lighthouse/*.json` all show `audits.llms-txt.score = 0` with title "llms.txt is missing or incomplete". `D:/Velkina/public/` directory listing confirms no `llms.txt` exists.
- **Why P0 for a pitch-trip site:** The audience for Velkina is technical buyers using AI tools. LLM crawlability is the same thing as discoverability for that audience. A 67 on Agentic Browsing means agents browsing on behalf of users will see less of the site.
- **Target fix:** Create `D:/Velkina/public/llms.txt` following the [llmstxt.org](https://llmstxt.org) spec. Include: company description, link to `/en/services`, `/en/use-cases`, `/en/customer-agent`, `/en/contact`, contact email, and links to each portfolio case study. ~200 lines, one-shot file. After this lands, all 7 Agentic Browsing scores should jump to ~90+.

## P1 findings (degrades quality)

### P1-1. Non-descriptive link text "Start" on `/en/services`

- **Route:** `/en/services`.
- **Evidence:** `services-en.json` `audits.link-text.details.items[]` shows 9 instances of `<a href="http://localhost:3000/en#cta">Start</a>` flagged as non-descriptive link text. SEO score drops from 100 to **83** on this page because of it (services is the only sub-route below 90 on SEO).
- **Source:** `app/services/ServicesView.tsx:114` — `{services?.start ?? (lang === 'tr' ? 'Başla' : lang === 'ro' ? 'Începe' : 'Start')}`. Each of the 9 service tiles ends with a "Start" CTA.
- **Why it matters:** Screen-reader users hearing "Start, Start, Start, Start, Start" on a single page have no idea which service they're starting. Google also weighs link text for indexing — generic "Start" provides zero signal.
- **Target fix:** Replace with descriptive text per tile: `Start <service name>` (e.g. "Start QR menu project", "Start AI customer agent", "Start automation engagement"). The service name is already in the surrounding card; just inject it into the link text. Single edit in `app/services/ServicesView.tsx:114`.

### P1-2. Malformed `<dl>` on `/en/use-cases/lavinia-bistro-qr-menu`

- **Route:** `/en/use-cases/lavinia-bistro-qr-menu`. Drops a11y to **89** and agentic-browsing to **33** (worst on the site).
- **Evidence:** `usecase-lavinia-en.json` `audits.definition-list.details.items[].node.selector` = `div.grid > div.md:col-span-5 > div.vk-glass > dl.space-y-3`.
- **Source:** `app/use-cases/UseCaseDetailView.tsx:83` — `<dl class="space-y-3 text-sm">` containing `<div class="flex items-baseline gap-3"><dt>...</dt><dd>...</dd></div>` (lines 83-106). The W3C spec requires `<dt>` and `<dd>` to be **direct children** of `<dl>`. Wrapping them in `<div>` breaks the semantic group; screen readers see the dl as malformed and announce nothing useful.
- **Fix:** Replace the wrapper `<div className="flex items-baseline gap-3">` with no wrapper at all (move flex/gap to the dl via class composition), OR use `<div role="group">` inside a `<div>`-only structure (drop the dl), OR keep dl semantics and split each row into two adjacent dt/dd elements using CSS grid for the layout. Recommended: use CSS grid on the `<dl>` itself (`grid-template-columns: 80px 1fr; row-gap: 0.75rem;`) and make dt/dd direct children of dl. Single file change in `app/use-cases/UseCaseDetailView.tsx:83-106`.

### P1-3. Iframe without title (chat widget)

- **Route:** every route — Tawk.to widget injects an `<iframe>` without a `title` attribute.
- **Evidence:** `home-en.json` `audits.frame-title.details.items[].node.snippet` = `<iframe src="about:blank" frameborder="0" scrolling="no" width="67px" height="64px" ... id="jl5k3fq38b2g1778535182902" ...>` (Tawk's launcher iframe).
- **Why P1 not P0:** It's third-party code; we can't directly add `title=` to their iframe. But Lighthouse counts it against us.
- **Target fix:** Add a `MutationObserver` in `app/[locale]/layout.jsx` after the Tawk script that finds the launcher iframe and injects `iframe.title = 'Chat with Velkina support'`. Or contact Tawk support to request the attribute. Or accept the 1-point a11y hit.

## P2 findings (polish)

### P2-1. QR menu demo: redundant `aria-label` on image buttons

- **Route:** `/en/demo/qr-menu`.
- **Evidence:** `demo-qr-menu-en.json` `audits.label-content-name-mismatch.details.items[]` — `<button class="shrink-0 w-28 sm:w-32 relative overflow-hidden" aria-label="Beef Tartare">` containing `<img alt="Beef Tartare">`. Axe flags this because the visible text from `<img alt>` is not matched verbatim by the parent button's accessible name (they're the same string, so this is functionally a false positive, but axe treats img-alt as visible text).
- **Source:** `app/demo/qr-menu/QrMenuView.tsx:810` — `aria-label={T(lang, item.name)}` on the button, and line 812 `alt={T(lang, item.name)}` on the inner img.
- **Fix:** Drop the `aria-label` on the button (the alt-text on the img will be used as the button's accessible name via name-computation), OR drop the alt on the img to `alt=""` (decorative) since the button label already conveys the name.

### P2-2. Cumulative Layout Shift on `/en/customer-agent` is 0.059

- **Route:** `/en/customer-agent`.
- **Evidence:** `customer-agent-en.json` `audits.cumulative-layout-shift.numericValue = 0.059367`. Score 0.98 — passes the 0.1 threshold, but is close. Suggests a hero image or font load is shifting content. Worth investigating before launch.

### P2-3. `errors-in-console` is dev-mode noise mixed with real bugs

- Lighthouse currently flags `errors-in-console` because of hydration errors AND Tawk CORS AND React dev-mode warnings. The hydration and CORS issues are real (P0-1, P0-4). The dev-mode warnings will disappear in `npm run build`. Re-run lighthouse against the production build before final sign-off.

## Screenshots captured

| Route | Locale | Viewport | Path |
|---|---|---|---|
| `/` | en | 360 | `ux-screenshots/home-en-360.png` |
| `/` | en | 1440 | `ux-screenshots/home-en-1440.png` |
| `/` | tr | 360 | `ux-screenshots/home-tr-360.png` |
| `/` | tr | 1440 | `ux-screenshots/home-tr-1440.png` |
| `/` | ro | 360 | `ux-screenshots/home-ro-360.png` |
| `/` | ro | 1440 | `ux-screenshots/home-ro-1440.png` |
| `/services` | en | 360 | `ux-screenshots/services-en-360.png` |
| `/services` | en | 1440 | `ux-screenshots/services-en-1440.png` |
| `/use-cases/lavinia-bistro-qr-menu` | en | 360 | `ux-screenshots/usecase-lavinia-en-360.png` |
| `/use-cases/lavinia-bistro-qr-menu` | en | 1440 | `ux-screenshots/usecase-lavinia-en-1440.png` |
| `/demo/qr-menu` | en | 360 | `ux-screenshots/demo-qr-menu-en-360.png` |
| `/demo/qr-menu` | en | 1440 | `ux-screenshots/demo-qr-menu-en-1440.png` |
| `/customer-agent` | en | 360 | `ux-screenshots/customer-agent-en-360.png` |
| `/customer-agent` | en | 1440 | `ux-screenshots/customer-agent-en-1440.png` |

14 screenshots captured (all 7 priority routes × 2 viewports). Full-page mode, PNG.

## What I did NOT verify

- **Performance category (LCP / FCP / TBT / TTI / Speed Index):** Chrome DevTools MCP `lighthouse_audit` deliberately excludes Performance. A `performance_start_trace` run on each of the 7 routes is required and was deferred to keep this audit within the requested scope (7 lighthouse runs, not 14). I noted CLS = 0.059 on `/customer-agent` from the lighthouse a11y/perf-adjacent debugdata, but FCP/LCP/TBT are unknown. Recommendation: a follow-up perf-only pass running `performance_start_trace` against the production build (not dev) — dev-mode lighthouse perf is noise.
- **Production build behavior:** all numbers are from `next dev` mode on `localhost:3000`. Production builds eliminate dev-only console errors, hydration debug overlays, and unminified bundles. The four P0s I found that are caused by real misconfiguration (P0-3 canonical, P0-4 Tawk CORS, P0-5 llms.txt) WILL still apply in production. P0-1 hydration and P0-2 contrast-toast will need re-verification against `next build && next start`.
- **Interactivity / flow correctness:** out of scope — that is the flow-auditor's job per the brief.
- **Content honesty (fake data, broken links):** out of scope — that is the honest-state-auditor's job. Note that the flow-audit.md already exists at `D:/Velkina/docs/audits/2026-05-12/flow-audit.md`.
- **Other locales on non-home routes:** only `/en` was tested for `/services`, `/use-cases/lavinia-bistro-qr-menu`, `/demo/qr-menu`, `/customer-agent`. If TR/RO have locale-specific layout issues, they were not measured. Recommendation: spot-check the lowest-scoring page (use-case detail, a11y 89) in TR and RO before launch.
- **Keyboard navigation / focus indicators:** lighthouse covers some of this via the a11y category, but a manual tab-through of each page would catch missing focus rings the audit doesn't. Recommendation for ux-polisher pass.
- **Screen reader pass:** not attempted via tooling. Manual NVDA/VoiceOver verification recommended before final sign-off.
