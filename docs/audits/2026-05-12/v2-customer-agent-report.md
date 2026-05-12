# V2 — Customer-agent reposition — 2026-05-12

## Old positioning
"AI Customer Service Agents (Multilingual)" — read as "Turkish/Multilingual Customer Service Agents." Page sold one vertical (customer service) in five languages.

## New positioning
- **EN:** "AI agents that run on your business"
- **TR:** "İşletmenin içinde çalışan AI ajanları"
- **RO:** "Agenți AI care lucrează în business-ul tău"

Subtitle (3 locales): "We design, train and ship AI agents for your real workflows. Customer service, ops, sales, content, internal tools — anywhere repetitive judgment lives." (and native equivalents).

Customer service is now ONE of six use cases, not the headline. The page sells "Velkina builds AI agents for any business workflow."

## Sections shipped
1. **Hero** — eyebrow ("Velkina · AI agents"), H1, subtitle, two CTAs (Schedule a call / See how it works), decorative CSS-only gradient orb (replaced the Turkish-specific HeroShapes canvas)
2. **Where agents pay off** — 6 use cases with `01`-`06` amber-tinted numbered badges: Customer service, Internal ops, Sales & qualification, Content & marketing, Data extraction, Custom workflows
3. **How we build it** — 4-step horizontal row: Discovery, Prototype, Train & measure, Ship & maintain (25-40 words each)
4. **What you get** — 5 bullets (hosting choice, integrations, weekly metrics, human-in-the-loop, handover playbook)
5. **When AI agents don't make sense** — honest carve-out in an amber-bordered card: low volume, high-judgment work, one-shot-irrecoverable mistakes
6. **Why Velkina** — Lavinia QR menu, Nova Health, EduTurkia refs; native TR/RO/EN + DE/ES out of box; ops + software DNA; price-honest
7. **CTA** — "Want to harness AI for your business?" → Schedule a call (cal.com/velkina) + WhatsApp

## Files changed
- `D:/Velkina/app/customer-agent/CustomerAgentView.tsx` — 235 lines (rewritten from 156). Dropped `HeroShapesClient` import + canvas. Replaced with CSS-only `vk-agent-orb` (radial gradient + two slowly-rotating border rings, `prefers-reduced-motion` honored). Switched accent from `vkcyan` to `vkaccent` (amber). 7 sections, 4 different layout patterns (hero, 3-col card grid, 4-col numbered ordered list, bullet list, bordered callout, paragraph block, centered CTA).
- `D:/Velkina/app/[locale]/customer-agent/page.jsx` — 30 lines. Metadata fallbacks updated to new positioning.
- `D:/Velkina/messages/en.json` — `customerAgent` namespace rewritten (9 top-level keys: metaTitle, metaDescription, hero, useCases, process, included, notForThis, why, cta).
- `D:/Velkina/messages/tr.json` — hand-authored Turkish parity.
- `D:/Velkina/messages/ro.json` — hand-authored Romanian parity (no machine translation).

## Validation

### `npx tsc --noEmit`
```
EXIT=0
```
Clean, no errors.

### Locale parity
```
EN keys: 214
TR keys: 214 | missing: 0 | extra: 0
RO keys: 214 | missing: 0 | extra: 0
```
All three locales have full parity.

### Status codes (dev server on :3009)
```
/en/customer-agent -> 200
/tr/customer-agent -> 200
/ro/customer-agent -> 200
```

### H1 probes
```
curl -s /en/customer-agent → "AI agents that run on your business"
curl -s /tr/customer-agent → "İşletmenin içinde çalışan AI ajanları"
curl -s /ro/customer-agent → "Agenți AI care lucrează în business-ul tău"
```
EN H1 contains no "Turkish" and no "Customer Service" as primary positioning. TR is Turkish, RO is Romanian.

### EN H1/H2 audit (for laundered Turkish-centric framing)
```
H1: AI agents that run on your business
H2: Where agents pay off
H2: How we build it
H2: What you get
H2: When AI agents don't make sense
H2: Why Velkina
H2: Want to harness AI for your business?
```
No "Turkish" or "Customer Service" headings.

### Screenshots
- 1440 EN: `C:/Users/nalba/AppData/Local/Temp/velkina-v2-shots/en-1440.png` — clean 3-col use case grid, 4-col process row, amber accent only, hero orb visible
- 360 EN: `C:/Users/nalba/AppData/Local/Temp/velkina-v2-shots/en-360.png` — all sections stack, no overflow, amber callout box renders correctly
- 1440 RO: `C:/Users/nalba/AppData/Local/Temp/velkina-v2-shots/ro-1440.png` — Romanian renders cleanly, no diacritic clipping
- 1440 TR: `C:/Users/nalba/AppData/Local/Temp/velkina-v2-shots/tr-1440.png` — Turkish renders cleanly

(Chrome DevTools MCP could only write to C:/Users/nalba and Temp — not D:/. Files live under Temp, referenced here for reproducibility.)

## Romanian sections flagged for Nalba review
No `_roReview` keys were embedded this round (cleaner JSON), but two phrasings to double-check at proofread:

1. `customerAgent.hero.description` — "oriunde apar decizii repetitive" — literal: "anywhere repetitive decisions appear." Brief said "anywhere repetitive judgment lives"; Romanian has no clean idiom for "judgment lives," so I went with "decisions appear." Alternative: "oriunde se repetă deciziile."
2. `customerAgent.notForThis.body` — "Volum mic — sub aproximativ 50 de evenimente pe zi" — "events" is the generic word. If the audience reads "events" as "happenings" rather than "actions/transactions," swap to "interacțiuni" or "tranzacții" depending on context.
3. `customerAgent.cta.description` — "Spune-ne fluxul" — colloquial. Slightly punchier than "Descrie-ne fluxul de lucru." Kept colloquial; flip if you want corporate tone.

## What I did NOT do
- Did not delete the `HeroShapesClient` component file itself — only stopped importing it. Other routes may still use it. (Confirmed by grep: nothing else in `app/` imports it.)
- Did not run Lighthouse — visual-work-discipline asks for it on priority routes; customer-agent is a service detail page, not home/top-3. Add later if Nalba wants the score on file.
- Did not adjust the global nav. The nav still says "AI Customer Service Agents" in some locale strings — that lives under `nav.*` namespace, not `customerAgent.*`, and is outside the agent-allowed scope for this task.
- Did not test interactive states (hover/focus) with explicit screenshots — relied on Tailwind utilities (`hover:border-vkaccent/40`, default focus ring). If the polish pass wants them, add a follow-up.
- Did not screenshot 768/390 viewports — 360 + 1440 covered. Add if needed.
- Did not run `npm run build` (only `npx tsc --noEmit`). Build is the next gate before merge.
- Did not touch `app/HomeViewSnap.tsx` or `app/[locale]/layout.jsx` (out of scope).
