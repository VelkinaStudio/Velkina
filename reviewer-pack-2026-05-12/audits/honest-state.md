# Velkina honest-state audit — 2026-05-12

Auditor: honest-state-auditor (sonnet)
Scope: D:/Velkina/ — Next.js 14 + next-intl, locales en/tr/ro
HANDOFF claim under test: "market-ready". Nalba's report: generic AND broken.

## Summary

| Category | Count | Worst severity |
|---|---|---|
| Placeholders | 4 | P1 |
| AI-slop phrases | 3 | P1 |
| Dead handlers / href="#" | 0 | — |
| Missing RO translations | 0 (JSON parity OK) | — |
| Missing TR translations | 0 (JSON parity OK) | — |
| Hardcoded English in TR/RO | 1 entire page + 1 metadata fallback | P0 |
| Ternary fallbacks omitting RO | 1 critical (treats RO as English) | P0 |
| Broken internal links | 0 routes; 12 fake blog posts route to stub renderer | P0 |
| Missing alt text | 1 | P2 |
| Suspicious metrics | 4 home-page agency-wide numbers | P1 |
| Stub article body presented as real content | 12 sample posts | P0 |

---

## Findings (every entry has file:line)

### 1. Placeholders

- `D:/Velkina/app/use-cases/UseCasesView.tsx:68` — fallback `src='/projects/placeholder.svg'` for project mockups. The fallback file exists (`README.md:68` confirms), but if a project lacks its own SVG, the user sees the generic placeholder branded as a real case study. **P1 — verify each project has its own SVG before launch.**
- `D:/Velkina/app/[locale]/blog/[slug]/page.jsx:33,39,45` — when no blog post matches a slug, the page renders "Article coming soon." (`L.soon`) — but only the *description line*. Headings and body text below it (lines 36-37, 42-43, 48-49) are rendered as if the article exists. **P0 — see "Stub article body" section below.**
- `D:/Velkina/app/[locale]/blog/[slug]/page.jsx:22` — `desc` fallback is hardcoded Turkish: `'Velkina'dan içgörüler, pratik rehberler ve mühendislik notları.'` — served to EN and RO visitors. **P1.**
- `D:/Velkina/app/[locale]/blog/[slug]/page.jsx:21` — `title = match?.title || (locale==='en' ? 'Blog' : 'Blog')` — broken ternary, both branches identical. **P2 (dead code), but indicates an i18n bug was abandoned mid-fix.**

### 2. AI-slop phrases in user-visible copy

Filtered to USER-VISIBLE only (page content, headings, CTAs). CSS `transform` etc. ignored.

- `D:/Velkina/app/customer-agent/CustomerAgentView.tsx:62` — feature card titled `"Seamless Escalation"` / TR `"Sorunsuz Yükseltme"`. Classic agency filler. **P1.**
- `D:/Velkina/messages/en.json:303` — blog tile "From landing to activation in days" — desc: `"Shipping thin slices with high-leverage motion."` Reads as AI-generated agency word salad. **P1.**
- `D:/Velkina/messages/ro.json:196` — services intro: "transformă vizitatorii în clienți". Verb "transformă" is legitimate Romanian usage here, NOT slop. Same for `ro.json:411`. Logged as not-slop after read; included for traceability.

### 3. Dead handlers, href="#", onClick={() => {}}

None found in `app/` or `components/`. The 2026-04-09 contact-fix plan resolved the previously documented `href="#"` (`docs/superpowers/specs/2026-04-09-velkina-contact-fix-design.md:11`). Verified via grep — only occurrences are in `docs/superpowers/plans/` (historical).

**0 findings.**

### 4. Hardcoded fake metrics — home-page stat grid

Source: `D:/Velkina/messages/en.json:88-95` (`home.metrics2`), rendered at `D:/Velkina/app/HomeViewSnap.tsx:113-138`.

```
shipped: 120 — "Projects shipped"
csat: 95 — "Client satisfaction"
launchTime: 5 — "Median launch (weeks)"
uptime: 99.9 — "Uptime (%)"
leadsIncrease: 86 — "Avg. qualified-lead lift" (defined, possibly unused)
supportReduction: 40 — "Support-cost reduction" (defined, possibly unused)
```

HANDOFF-cited REAL metrics (per testimonials/case studies, source-attributed):
- €1,500 / €3,500 pricing — `en.json:147` (FAQ, self-stated)
- ROAS 3.4x — `en.json:103,391,397` (Rain Group / Aylin Kaya)
- +60% organic traffic Q1 — `en.json:103,391,396` (Rain Group)
- 99.97% uptime — `en.json:104` (Nova Health / Mert Sezer)
- 4.2x ROAS, -31% CPA — `en.json:615,621` (Marmara Foods)
- +38% attach rate, 80% AI handling, 28% direct bookings, 62% push opt-in, +40% organic, etc. — all attached to named clients in case studies.

The home-page numbers (120 / 95 / 5 / 99.9) are **agency-aggregate claims with no attribution**. There is no "based on N projects" sub-line, no methodology, no link to a transparency page. **P1 — either attribute them or remove.**

Especially questionable for a Romania-pitch trip: "Median launch 5 weeks" and "120 projects shipped" are claims a buyer will challenge. If even ONE of the four is fabricated, the whole grid loses credibility.

### 5. Locale parity (node script output, verbatim)

```
=== Total en keys: 182 ===
=== Total tr keys: 182 ===
=== Total ro keys: 182 ===
=== missingTr (keys in en, not in tr) ===
[]
=== missingRo (keys in en, not in ro) ===
[]
=== extraTr (keys in tr, not in en) ===
[]
=== extraRo (keys in ro, not in en) ===
[]
```

JSON-level parity is clean. **But values identical to English (possible untranslated)** — second pass:

TR values that are identical to EN strings >3 chars (8 keys, all justified):
- `site.name = "Velkina"` (brand)
- `nav.blog = "Blog"` (loanword)
- `home.ctas.whatsapp = "WhatsApp"` (brand)
- `blog.metaTitle = "Velkina — Blog"`
- `useCases.labels.stack = "Stack"` (technical term, kept in EN in TR markets)
- `contact.whatsapp = "WhatsApp"`
- `privacy.lastUpdated = "2026-05-11"` (date)
- `terms.lastUpdated = "2026-05-11"` (date)

RO values identical to EN (18 keys). Most are brand/loanword/category labels. None are sentences. Acceptable.

**0 P0 findings from JSON parity.** Real translation drift happens OUTSIDE the JSON — see next section.

### 6. Disabled-but-visible

`pointer-events-none` audit: all 12 hits are on decorative gradient overlays / blur backgrounds. No CTAs are disabled-but-visible.

**0 findings.**

### 7. Ternary fallbacks omitting RO — and the worst single finding in this audit

**P0 — CRITICAL:** `D:/Velkina/app/customer-agent/CustomerAgentView.tsx:17`

```tsx
// English is the safe fallback for non-Turkish locales (Romanian, etc.)
const isEnglish = locale !== 'tr';
```

The ENTIRE Customer Agent page (310 lines) is hardcoded as a two-branch ternary: TR or EN. Romanian visitors (`/ro/customer-agent`) see:
- Page title: **"Turkish Customer Service Agents"** (en, line 21) — and the H1 they read in Romanian context literally advertises *Turkish* service agents.
- Hero description, 6 feature cards, 6 benefit cards, 6 use cases, 6 implementation steps, 4 CTA labels — **all in English**, despite the user choosing Romanian.
- Hero canvas aria-label (line 211): `"Türkçe Müşteri Hizmetleri Ajanları görselleştirme"` — pure Turkish screen-reader label for Romanian users.

The HANDOFF specifically flagged this page. It is still broken. For the Romania pitch, this is the page most likely to be opened on the prospect's laptop. **A Romanian buyer hitting `/ro/customer-agent` sees: a Romanian site that brags about Turkish service in English, with a Turkish accessibility label.**

The customer-agent route exists at `D:/Velkina/app/[locale]/customer-agent/` (confirmed via `find`). Nav links to it from `D:/Velkina/app/[locale]/layout.jsx:99`.

**Other ternaries (acceptable — all three branches present):**
- `app/HomeViewSnap.tsx:38,129,141,189,199,219` — all use `lang === 'tr' ? X : lang === 'ro' ? Y : Z`
- `app/services/ServicesView.tsx:41,109,114` — three-branch
- `app/use-cases/UseCasesView.tsx:32,91` — three-branch
- `app/use-cases/UseCaseDetailView.tsx:56,75,146,164,191` — three-branch
- `app/privacy/PrivacyView.tsx:13`, `app/terms/TermsView.tsx:13` — three-branch

**1 critical finding. The page that Nalba's pitch will lead with is the one that's broken.**

### 8. Hardcoded English in non-default locales

- `app/customer-agent/CustomerAgentView.tsx:20-190` — see #7. The entire `content` object is two-branch (`isEnglish ? EN_STRING : TR_STRING`). Romanian falls into `isEnglish === true`. **P0.**
- `app/[locale]/blog/[slug]/page.jsx:22` — desc fallback is hardcoded Turkish for ALL locales (including `/en/blog/...` and `/ro/blog/...`). **P1.**
- `app/[locale]/blog/[slug]/page.jsx:36-37` — when no slug matches, the EN section bodies render as English even on `/tr/...` and `/ro/...` routes. Actually mitigated by the LABELS branch (TR/RO sections are defined separately on lines 39-50), so this is handled correctly **only if** `locale` is one of the three. Verified — acceptable.

### 9. Broken internal links

All app routes confirmed to exist:
- `/[locale]` ✓
- `/[locale]/about` ✓
- `/[locale]/blog` ✓
- `/[locale]/blog/[slug]` ✓
- `/[locale]/contact` ✓
- `/[locale]/customer-agent` ✓
- `/[locale]/demo/qr-menu` ✓
- `/[locale]/privacy` ✓
- `/[locale]/services` ✓
- `/[locale]/terms` ✓
- `/[locale]/use-cases` ✓
- `/[locale]/use-cases/[slug]` ✓

Anchor `#cta` exists at `app/HomeViewSnap.tsx:403` and `app/services/ServicesView.tsx:177` ✓.

**0 broken-route findings.**

**HOWEVER — Dead-link adjacent: the 12 sample blog posts** (`messages/en.json:300-313`) all generate slugs that point to `/${locale}/blog/${slug}` — and that route exists, but renders BOILERPLATE STUBS (see next section). Functionally these are dead links wrapped in a "200 OK" shell. **P0 — counted in section 11.**

External link unverified:
- `D:/Velkina/lib/contact.ts:6` — `scheduleUrl: 'https://cal.com/velkina'`. Not curled. If the cal.com handle isn't claimed, the "Schedule a call" button across 5+ surfaces points to a 404. **P1 — verify with `curl -I https://cal.com/velkina`.**

### 10. Missing alt text

- `D:/Velkina/app/use-cases/UseCaseDetailView.tsx:45` — `<img src={contextPhoto} alt="" />` on the cinematic context banner of a project detail page. Empty alt = treated as decorative by screen readers. Acceptable IF this is purely atmospheric, but the image represents the client's real context (per `CONTEXT_PHOTOS[project.slug]`). For SEO and a11y, should be `alt={project.title}` or `alt=""` only if the H1 next to it conveys the same info. **P2 — borderline acceptable, flag for review.**

All other `<img>` tags have meaningful `alt={...}` (HomeViewSnap brand logos, testimonial photos, project mockups, QR demo photos). **1 finding.**

### 11. Stub article body presented as real content (P0)

`D:/Velkina/app/[locale]/blog/[slug]/page.jsx:30-79` — when no `match` is found OR when match has only `{cat, title, desc, read}` (which is **all 12 sample posts**), the page still renders three sections:

```jsx
sections = [
  {h: 'Overview',    p: desc},   // injects the 1-sentence desc
  {h: 'What we built', p: 'We focus on clean architecture, performance and measurable impact across web, apps and AI.'},
  {h: 'Outcomes',    p: 'Clear improvements on speed, reliability and conversion with a senior engineering + design team.'}
]
```

So every blog tile on the home / blog listing leads to a page with:
- The desc shown twice (once as subtitle, once as the only real paragraph)
- Two boilerplate paragraphs that are IDENTICAL across all 12 articles
- A "More from the blog" carousel that links to 11 more identical stub pages

Equivalent to a publishing site shipping 12 lorem-ipsum articles dressed as real content. **For a Romania pitch where the prospect WILL click "Building unified middleware APIs" out of curiosity, they will discover the site is theatre. This is the second-most damaging finding after #7.**

**Fix recommendation (audit-only, do NOT implement):** Either (a) remove the blog from public nav entirely until 3-5 real posts exist, or (b) gate `/blog/[slug]` to 404 unless the slug has a real body in `messages/*.json`. Currently the page returns 200 for every conceivable slug, defeating SEO trust and visitor trust simultaneously.

---

## Top 3 categories by P0 count

1. **Ternary fallbacks omitting RO** — 1 finding, but it cripples the highest-traffic specialty page (`customer-agent`) for the Romania-pitch audience. The whole page in English with a Turkish-only aria-label.
2. **Stub articles served as real content** — 12 fake blog posts each generating a /blog/[slug] page with identical boilerplate body. Routes return 200, search engines will index them, prospects will click them.
3. **Hardcoded English on non-default locale** — same root cause as #1, but separate count because it manifests across the entire 310-line CustomerAgentView body and the blog metadata fallback.

## Most damaging single finding

`D:/Velkina/app/customer-agent/CustomerAgentView.tsx:17` — `const isEnglish = locale !== 'tr';`

A Romanian visitor on `/ro/customer-agent` sees the page rendered in English (310 lines of content, including the H1 "Turkish Customer Service Agents" and the canvas aria-label written in Turkish: "Türkçe Müşteri Hizmetleri Ajanları görselleştirme"). For Nalba's Romania pitch this week, this single line invalidates the trilingual claim on the page the prospect is most likely to evaluate.

---

## Categories NOT flagged (verified clean)

- Lorem ipsum: 0 hits in app/
- `onClick={() => {}}` / `onClick={() => null}` / `href="#"`: 0 hits in app/ or components/
- `disabled` on real CTAs: 0
- `Math.random()` / `faker.`: 0
- `localStorage.setItem` for fake persistence: not checked because no settings UI exists yet (out of scope)
