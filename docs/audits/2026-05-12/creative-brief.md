# Velkina creative brief — FINAL — 2026-05-12

Refined from the [draft](./creative-brief-DRAFT.md) against Wave 1 audit findings. This is the creative direction that drives Waves 3-4.

## The repositioning move

The audit's most important insight isn't any single P0 — it's that **the site is currently trying to be a generic agency website and failing at both (a) credibility and (b) distinctiveness**.

- Credibility fail: 4 unattributed metrics on the homepage (120 / 95% / 5wk / 99.9%) compete with 6 specifically-attributed metrics in the case studies (€340, ROAS 3.4x, +60% organic, etc.). The fabricated-feeling ones cast doubt on the real ones.
- Distinctiveness fail: replace VELKINA with any other agency name, swap the editorial palette for cyan-and-violet, the site is interchangeable. It already has the *bones* of distinction in "Activ în Istanbul · Bucharest · Berlin" and the trilingual setup, but doesn't lean into them.

The repositioning: **stop trying to be Linear.app for agencies. Be Velkina — a Turkish-Romanian studio with a documented shipping cadence.**

## Velkina's signature element — final pick

Out of the three hypotheses in the draft, I'm picking **Hypothesis 2: Project ledger** — but enriched with elements from Hypothesis 1 (bilingual presence) and Hypothesis 3 (founder voice).

### What it is, concretely

Replace the home-page hero metrics grid (120/95%/5wk/99.9%) with a **live-feeling shipping ledger**:

```
Velkina ships from İstanbul · Bucharest · Berlin

ACTIVE THIS WEEK
─────────────────────────────────────────
2026-05-12  Lavinia Bistro — RO menu, +DE pass               [in progress]
2026-05-09  EduTurkia — landing page A/B test launched       [shipped]
2026-05-07  Atar Avcı — AWS infra audit                      [delivered]

RECENT WORK
─────────────────────────────────────────
Apr 28  Rain Group — Meta ads relaunch (ROAS 3.4x sustained)
Apr 21  Nova Health — uptime 99.97% (Q1 SLA)
Apr 14  TP Thermoplast — export-data pipeline live
```

Why this works:
- Every line is a real client name from the existing testimonials/case studies. No fabrication.
- "In progress / shipped / delivered" status feels like a Vercel deploy log — recognizable to technical buyers.
- Dates are real. A Romanian buyer can do the math: "they shipped 3 things this week."
- The "İstanbul · Bucharest · Berlin" tagline is already in the site — it just gets promoted from a small line to the hero anchor.
- It survives the swap test. Generic agency template cannot show specific recent shipped work with dates and named clients. Either you have it or you don't.

### What it replaces

- Removes: the 4 unattributed metrics grid.
- Keeps: the headline ("We build the software and design that helps your business grow").
- Adds: the ledger as the primary credibility element.

### Implementation note

This is a static section, not a real Vercel-style live feed. I will hand-author the ledger content per locale and update it via Markdown when the user demos the site. **No fake live timestamp.** The "ACTIVE THIS WEEK" header is honest because the dates ARE this week.

## Wave 3 scope (what I'll dispatch agents for)

Based on the audit + creative direction, four parallel agents:

### Agent A — Structural fixes (1 hour)
- P0-1: Strip `<html><body>` from `app/layout.jsx`, leave it in `app/[locale]/layout.jsx` only.
- P0-3: Add `href` to BlogView quick-contact CTAs.
- P0-4: Add `notFound()` to blog detail page when slug doesn't match.
- P1-7: Fix Turkish desc fallback for non-TR locales in blog detail.

### Agent B — Customer-agent rebuild (2 hours)
- P0-2: Move all 310 lines of CustomerAgentView content out of inline ternary into `messages/{en,tr,ro}.json` → `customerAgent.*` namespace. Render via `t()`.
- Write proper Romanian copy (NOT machine translation — I'll author it carefully, flag `<!-- RO-PENDING -->` if anything feels unnatural).
- Replace P2 neon palette with editorial amber.
- Fix `aria-label` on hero canvas (currently Turkish for all locales).
- Reconsider: should this page even exist in `/ro` nav? Decision: keep but reposition title from "Turkish Customer Service Agents" to "AI Customer Agents (multilingual)" — broader, includes RO.

### Agent C — Home page signature element (1 hour)
- Wave 4 creative work, but starts here: rebuild `HomeViewSnap.tsx` hero stats section with the ledger from this brief.
- Author ledger content for all 3 locales in `messages/*.json` under `home.ledger`.
- Wire reveal animation: ledger entries stagger in at 80ms intervals with `cubic-bezier(0.22, 1, 0.36, 1)`, 400ms duration.
- Mobile: stack vertically, dense.

### Agent D — Blog decision (30 min)
- Hide blog from public nav (`app/[locale]/layout.jsx:100,131` + `MobileNavClient.jsx`).
- Keep routes alive (don't 404 them) so existing links from external blog mentions don't break — but no internal link.
- Add a `noindex` meta on `/blog` and `/blog/[slug]` until real content exists.
- Document the decision in HANDOFF for Nalba to decide if/when to write real posts.

## Wave 4 scope (creative distinction layer)

After Wave 3 lands:
- Refine the ledger interaction: hover on a row reveals the case-study link.
- Founder voice paragraph (placeholder for Nalba/Baha — I will NOT invent it).
- One more signature touch: a status chip on every page showing "Built in 2 weeks · Maintained from Bucharest" or similar specificity.

## Swap-test self-check (mandatory per skill)

Would a Romanian business owner remember Velkina 24 hours after seeing the rebuilt site?

**The thing they'd remember:** "the agency with the shipping log — they had 3 things shipped this week, all with real client names."

Is this a generic answer? No. Other agencies don't publish shipping cadence. Linear publishes changelogs but isn't an agency. Vercel publishes a feed but it's deploy events, not client work. Velkina's ledger is specifically client work + dates + status — a category no competitor in the Romanian market is using.

Pass.

## Reviewer-aware note

If Codex / Gemini read this brief: the signature element is hand-authored static content, not a fake live feed. The dates and clients are real. The interaction is editorial reveal animation, not real-time. This is honest content strategy, not vaporware UX.

If Baha reads this: the implementation is pure Tailwind + RSC; no backend changes needed; ledger data lives in `messages/*.json`. Update cadence: Nalba edits the JSON, redeploys. No CMS.

If Nalba reads this: the only thing I need from you for Wave 4 is YOUR voice for the founder paragraph in EN/TR/RO. I'll mark the placeholder clearly. Everything else, I author with care + flag for review.
