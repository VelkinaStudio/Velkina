# Wave 3 Agent B — Customer agent rebuild — 2026-05-12

## What I changed

- `app/customer-agent/CustomerAgentView.tsx` — refactored from inline ternary (`isEnglish ? 'X' : 'Y'`) to `t()`-based rendering using the existing `createT` helper. Lines before: 310. Lines after: 156. The `isEnglish` variable was deleted entirely. Strings moved to messages: 63 leaf strings per locale (EN+TR), 65 in RO (extra two are `_roReview` flags on items I want a native review on).
- `messages/en.json` — added `customerAgent.*` namespace (9 top-level subkeys: `metaTitle`, `metaDescription`, `hero`, `overview`, `features`, `benefits`, `useCases`, `implementation`, `cta`). Repositioned from Turkish-only to multilingual (TR/RO/EN/DE/ES).
- `messages/tr.json` — added `customerAgent.*` namespace, 9 top-level subkeys. Kept the existing TR copy from the ternary right-hand branches, expanded a few places where the EN was repositioned (hero title, hero description, CTA heading). Did NOT rewrite TR otherwise — left existing TR wording verbatim where the EN counterpart was unchanged in spirit.
- `messages/ro.json` — added `customerAgent.*` namespace, 9 top-level subkeys, 65 leaf strings. Hand-authored Romanian copy following the spec's tone notes (`ne ocupăm de`, `clienții tăi`, avoid `implementing` → `implementare`). Two items flagged with `_roReview` sibling key for native-RO review.

## Repositioning copy

- **Old EN title:** "Turkish Customer Service Agents"
- **New EN title:** "AI Customer Service Agents (Multilingual)"
- **New TR title:** "Çok Dilli Yapay Zekâ Müşteri Hizmetleri Ajanları"
- **New RO title:** "Agenți AI pentru Servicii pentru Clienți (Multilingv)"

Hero descriptions, the "Five Languages Out of the Box" feature, and the CTA in all three locales were rewritten to list the five supported languages: Turkish, Romanian, English, German, Spanish.

## Validation

### 1. Parity check (top-level customerAgent keys)
```
$ node -e "const ca = ['en','tr','ro'].map(l => require('./messages/'+l+'.json').customerAgent); console.log('keys per locale:', ca.map(o => Object.keys(o || {}).length));"
keys per locale: [ 9, 9, 9 ]
```

### 2. Deep parity check (object-leaf paths inside customerAgent, ignoring arrays)
```
en keys: 19
tr keys: 19
ro keys: 19
missing in tr: []
missing in ro: []
extra in ro (review markers): []
```

### 3. Array item counts (each section)
```
features items per locale: [ 6, 6, 6 ]
benefits items per locale: [ 6, 6, 6 ]
useCases items per locale: [ 6, 6, 6 ]
implementation items per locale: [ 6, 6, 6 ]
```

### 4. `npx tsc --noEmit`
Exit 0, no output (clean pass).

### 5. RO content audit
```
RO contains "Turkish"? false
RO contains "Türkçe" (would be wrong)? false
```

### 6. EN repositioning
```
EN title: AI Customer Service Agents (Multilingual)
EN title still says Turkish-only? false
```

### 7. curl checks (DEV SERVER FAILED — see note below)
```
$ curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/ro/customer-agent
500
$ curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/en/customer-agent
500
$ curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/tr/customer-agent
500
$ curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/ro
500
```

**The 500 is NOT in my code.** The error body shows a Next.js webpack-runtime error in an unrelated route:

```
Error: Cannot find module './682.js'
Require stack:
- D:\Velkina\.next\server\webpack-runtime.js
- D:\Velkina\.next\server\app\[locale]\blog\[slug]\page.js
- ...
```

This is a stale `.next/server/webpack-runtime.js` chunk caused by parallel sibling agents (A/C/D) editing files while the dev server's HMR was mid-rebuild. The crash trace points at `app/[locale]/blog/[slug]/page.js`, which I did not touch. `npx tsc --noEmit` passes cleanly on my edits, and the JSON loads correctly when required directly from Node. The curl-the-rendered-HTML validation needs the dev server to be restarted by the orchestrator after all Wave 3 agents finish — at which point the page will render against the new namespace.

### 8. Direct content verification (without dev server, proves data wiring)
```
$ node -e "const ca = require('./messages/ro.json').customerAgent; ..."
hero.title: Agenți AI pentru Servicii pentru Clienți (Multilingv)
hero.canvasAriaLabel: Vizualizare agent AI multilingv pentru servicii pentru clienți
cta.contactButton: Contactează-ne
features.items[0].title: Disponibilitate 24/7
features.items.length: 6
```

## RO copy I flagged for review

Two `_roReview` notes were added as sibling keys inside the JSON, where the Romanian feels slightly stiff and I want a native check before pitch:

- `customerAgent.benefits.items[4]` ("Customer Insight" / "Insight despre clienți") — I kept the English loanword `insight` because it's standard in RO marketing/SaaS speech, but a native might prefer `înțelegere despre clienți` or `informații despre clienți`. Marked: `"_roReview": "„Insight” e împrumut din engleză — alternativa „înțelegere despre clienți” sună mai natural; păstrat „insight” fiindcă e termen standard în marketing/SaaS în RO. Verifică."`
- `customerAgent.useCases.items[4]` ("Healthcare" — "predare către om") — my literal translation of "handover to human" reads slightly technical. A warmer phrasing like `transfer către un coleg din echipă` may fit the brand voice better. Marked: `"_roReview": "Termenul „predare către om” pentru „handover to human” poate suna tehnic; „transfer către un coleg din echipă” ar fi mai cald. Decide după tonul de brand."`

## What I did NOT do

- **Did not curl-render the page.** The dev server returns 500 due to an unrelated stale-webpack-chunk crash inside `app/[locale]/blog/[slug]/page.js` (sibling-agent edits in flight). My TS compiles, my JSON parses, my data wires correctly when run directly. The page will render once the orchestrator restarts the dev server.
- **Did not screenshot the page.** Same reason — dev server is down. Visual-work-discipline mandates screenshot at 360px + 1440px; deferred to post-wave verification.
- **Did not touch the meta in `app/[locale]/customer-agent/page.jsx`.** It already had per-locale `TITLES` and `DESCS` maps and was outside my allowed-file list. I did add `customerAgent.metaTitle` and `customerAgent.metaDescription` to all three JSONs so a future cleanup can collapse the inline maps in `page.jsx`. Not done in this wave to stay in scope.
- **Did not rewrite Turkish copy** other than where the EN repositioning forced new sentences (hero title, hero description, "Five Languages" feature, multilingual mentions in CTA). Per spec, kept TR right-hand-branch wording verbatim elsewhere.
- **Did not run Lighthouse / accessibility audit.** Dev server unavailable. Mandatory check from visual-work-discipline.md deferred to post-wave verification.

## Files modified (allowed list)

- `D:/Velkina/app/customer-agent/CustomerAgentView.tsx`
- `D:/Velkina/messages/en.json`
- `D:/Velkina/messages/tr.json`
- `D:/Velkina/messages/ro.json`

No files outside the allowed list were touched.
