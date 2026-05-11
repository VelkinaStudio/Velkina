# Velkina audit summary — 2026-05-12 (Wave 1 synthesis)

Synthesized from three parallel audits. Source reports linked.

- [flow-audit.md](./flow-audit.md) — end-to-end user flows, 244 lines, 8 screenshots
- [honest-state.md](./honest-state.md) — grep-driven scan for fake content / placeholders / locale drift
- ux-audit.md — Lighthouse + a11y (UX agent partial: lighthouse JSONs only, full report pending; I have enough data to proceed)

## TL;DR for reviewers (Codex / Gemini / Baha / Nalba)

The HANDOFF.md claim "market-ready for a Romania pitch trip" is **not accurate**. Three P0 bugs visible in the first minute of using the site. Plus a structural hydration error firing on every page.

**Most damaging single finding:** `app/customer-agent/CustomerAgentView.tsx:17` — Romanian visitors on `/ro/customer-agent` see an English page titled "Turkish Customer Service Agents" with a Turkish accessibility label. The page IS in the primary nav for Romanian visitors. HANDOFF self-described this as a "known minor item" — for the pitch trip, this is not minor.

## Consolidated P0 list (Wave 3 must fix all of these)

| # | Finding | Files | Effort | Verified by |
|---|---|---|---|---|
| P0-1 | Double-root layout / hydration error on every page | `app/layout.jsx:18-25` + `app/[locale]/layout.jsx:78-178` | low (~30min) | flow-audit + console transcript + ux-audit lighthouse |
| P0-2 | `/customer-agent` renders English on RO (treats RO as EN) | `app/customer-agent/CustomerAgentView.tsx:17` (and 310 lines of inline content) | medium (~2h) | honest-state + flow-audit + screenshot velkina-04 |
| P0-3 | Blog quick-contact CTAs are dead (no `href`) | `app/blog/BlogView.tsx:112,118,124` | low (~10min) | flow-audit DOM probe |
| P0-4 | Blog detail pages return 200 for ANY slug (no `notFound()` call) | `app/[locale]/blog/[slug]/page.jsx:30` | low (~5min) | flow-audit |
| P0-5 | 12 blog "posts" are boilerplate stubs ("Overview / What we built / Outcomes" identical across all) | `app/[locale]/blog/[slug]/page.jsx:33-50` + `messages/*.json:300-313` | medium (decision: hide nav, or write real content) | honest-state |
| P0-6 | **NEW from UX audit:** Canonical URL on every subpage points to home — Google will not index /services, /use-cases/*, /customer-agent etc. as separate pages | `app/[locale]/layout.jsx:33-40` + need per-page `generateMetadata` on ~10 page.jsx files | medium (~1h) | ux-audit lighthouse canonical audit |
| P0-7 | **NEW from UX audit:** Missing `llms.txt` — Agentic Browsing score 67 across all routes | `D:/Velkina/public/llms.txt` (NEW) | low (~30min, one-shot file) | ux-audit |

**Cumulative P0 effort:** ~3-4 hours if we write real blog content; ~1.5 hours if we hide the blog from nav and ship without it.

## P1 list (Wave 3 should fix; Wave 4 sweep may pick up the rest)

| # | Finding | Files | Effort |
|---|---|---|---|
| P1-1 | Use-case detail content is shallow (avg 165 chars/project) | `messages/*.json:useCases.*` | medium-high |
| P1-2 | Home-page agency metrics grid (120/95/5/99.9) is unattributed | `app/HomeViewSnap.tsx:113-138`, `messages/*.json:88-95` | low (decide attribute or remove) |
| P1-3 | Contact "page" has no form (only mailto/tel/WA cards) | `app/contact/ContactView.tsx:22-65` | medium |
| P1-4 | Public contact = personal Hotmail + TR mobile | `lib/contact.ts` | low (decision) |
| P1-5 | No per-service routes (`/services/[id]`) — SEO miss | `app/services/` | medium |
| P1-6 | "AI-slop" phrases in user copy (`Seamless Escalation`, `Shipping thin slices with high-leverage motion`) | `app/customer-agent/CustomerAgentView.tsx:62`, `messages/en.json:303` | low |
| P1-7 | Blog desc fallback hardcoded Turkish, served to EN/RO | `app/[locale]/blog/[slug]/page.jsx:22` | low |
| P1-8 | Tawk.to CORS errors on every page (console pollution, not user-visible) | `app/[locale]/layout.jsx:157-173` | low |
| P1-9 | Hidden in lighthouse: a11y is 93 (target 95) on home-en | needs full UX report | low |

## P2 list (Wave 4 polish pass)

- Legacy `bg-vkpink` palette drift on mobile nav CTA, contact CTAs, blog CTAs (`MobileNavClient.jsx:70`, `ContactView.tsx:59`, `BlogView.tsx:112`) — drift from declared editorial amber
- Customer-agent page still uses old neon `radial-gradient` palette
- `/customer-agent` even in EN is a niche-Turkish offering — should it appear in `/ro` nav at all?
- Mobile drawer doesn't trap focus or close on Escape (a11y polish)
- Missing alt on context banner image (decorative-vs-content judgment)
- Hero CTA href format inconsistency (`/en#cta` vs `/en/#cta`)

## What audit verified vs. HANDOFF claims (honest delta)

| HANDOFF.md claim | Reality |
|---|---|
| "Build verified. npm run build passes clean." | Build may pass but runtime has page-wide hydration error on every page (double `<html><body>` from two layouts). Not separately verified at build-time yet. |
| "All routes return 200 on the production server." | True for routes that should 200. ALSO true for routes that should 404 (any blog slug returns 200). |
| "Romanian dropdown verified" | Verified independently — works. |
| "customer-agent locale fallback is not central" | The page IS in primary nav for `/ro` visitors. Re-classified P0. |
| "market-ready for Romania pitch" | 3 P0s, 9 P1s, 6 P2s. Not market-ready as-is. Fixable in this session. |

## Lighthouse partial results (UX agent in flight)

From `lighthouse/home-en.json`:
- Accessibility: **93** (target 95)
- Best-practices: 96
- SEO: 100
- Performance: NOT MEASURED (UX agent ran without `performance` category — needs re-run)
- CLS: 0.009 (excellent)

UX agent has produced `home-en.json` + `home-tr.json` so far. Full report pending. **I will NOT re-dispatch a third time** — at hour 5 I'll re-run lighthouse myself with performance included.

## What the agents DID NOT verify (honest)

- Actual production build (`npm run build`) — only dev server tested. Hydration error may behave differently in prod.
- iOS Safari behavior — Chromium-only testing.
- Real cellular network throttling — only the synthetic Lighthouse "Slow 4G" profile.
- Whether `omercannalbant@hotmail.com` was a deliberate choice or oversight (lib/contact.ts).
- Whether the 4 home-page metrics (120/95/5/99.9) are real, fabricated, or aspirational — Nalba needs to decide.
- Customer-agent page even after RO fix: is this offering relevant to Romania pitches at all?

## Decision points for Nalba (defaults below)

1. **Blog handling.** Default: hide from public nav until 3-5 real posts exist. Alternative: write 3 real posts now (out of session budget).
2. **Home metrics (120/95/5/99.9).** Default: remove the grid. Replace with per-client metrics from real case studies (which we do have). Alternative: attribute with "Aggregate across X projects".
3. **Public contact email.** Default: leave as-is (lib/contact.ts owner decision). Flag in HANDOFF for Nalba to set up `@velkina.com` email.
4. **Customer-agent in RO nav.** Default: keep, but translate properly. Alternative: hide from /ro nav (Turkish-customer-service product is niche).

If you don't override, I take the defaults at hour 4 when Wave 3 starts.

## Generation budget so far

| Service | Calls | Cost |
|---|---|---|
| WebFetch (cal.com verification) | 1 | ~$0 |
| LLM agents (3 audits) | 3 internal | counted toward Claude usage, no separate API cost |
| Image gen | 0 | $0 |
| **Total** | | **$0 / $30** |

## Next: Wave 2 (creative brief refinement) — 30 min

Take the [creative-brief-DRAFT.md](./creative-brief-DRAFT.md) and refine against these audit findings. The audit changes my creative direction:
- The shipping-log signature element (Hypothesis 2) is now more attractive because it solves the credibility problem the unattributed metrics expose.
- Blog elimination simplifies — frees space for case-study depth instead.
- Customer-agent page becomes a meaningful rebuild target, not just a translation patch.
