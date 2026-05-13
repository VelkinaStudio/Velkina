# Velkina v7 — Design Direction (Phase 1)

Date: 2026-05-14
Engine: design-creativity-engine Phase 1 (4 mandatory commitments + sibling check)
Project: velkina-v7
Reads: docs/needs/v7-landing.md · docs/strategy/founder-loop.md · docs/design/velkina-v7-inspiration.md
Status: COMMITTED 2026-05-14

---

## 1. Canvas commitment

**Pick: `B2` — near-black with subtle radial glow.**
Hex: `#0A0A0B` body, `#13131A` card surface, `#FFFFFF` ink at 92% opacity, `#9F9CA8` ink at 60% opacity for secondary.

**Reason:** v6 already lives at `#0A0A0B` — and the strategy doc says "we ship real software fast." Dark near-black + monospace + product UI is Linear / Vercel / Raycast vocabulary, which is what software-buyers read as "this team ships." The cream + Tiempos + coral aesthetic (Anthropic) reads as "AI tool with calm vibes," which is the wrong signal for a Turkish service-export agency.

**Banned for v7:** cream (#FAF9F5), white body (#FFFFFF as canvas), paper-bg (#F5F1E8 from v5/v6). Reusing the v6 paper-bg kit would land us in the recycled-template trap [[feedback_velkina_design_creativity]].

## 2. Type identity commitment

**Display typeface:** **Söhne (Klim)** — weight extremes 200 and 800.
**Mono typeface:** **JetBrains Mono** (for numeric labels, eyebrow labels, project codes).
**Body typeface:** **Söhne Buch** (the same family's book weight).

**Reason:** Söhne is the modern-Helvetica-but-warmer that Pentagram, Linear (variant), and many editorial sites use. Picking it specifies "Klim type foundry tier" without using Tiempos (which would land us on Anthropic's exact direction and trigger the forbidden-cousin check). JetBrains Mono is the technical-precision mono — distinct from Söhne Mono (Anthropic-adjacent) and from the v6 monospace.

**Banned for v7:**
- Sora (v6 default — explicit ban)
- Instrument Serif italic (v6 default — explicit ban)
- Inter / Roboto / Open Sans / Space Grotesk / Plus Jakarta Sans / DM Sans (per design-creativity-engine bans)
- Geist (Vercel's typeface — using it would make us read as "Vercel-shaped" not "Velkina")
- Tiempos / Tiempos Headline (Anthropic — would trigger sibling check if registered)

**Weight & size doctrine:**
- Hero display: Söhne Halbfett 800 at clamp(72px, 12vw, 220px) with -0.04em tracking
- Eyebrow labels: JetBrains Mono 500 at 11px with 0.18em tracking, uppercase
- Body: Söhne Buch 400 at 16px, 1.6 line-height
- Numeric labels: JetBrains Mono 400 at 14px (tabular figures via `font-variant-numeric: tabular-nums`)
- Big-Number stats: Söhne Halbfett 800 at clamp(96px, 16vw, 280px) — design objects, not body copy

## 3. Signature visual move

**Name:** "VK-numbered horizontal-drag ledger of recent shipped work."

**Sentence test — "If a user saw this page in a screenshot with no logo, they would recognize it because ____":**
Because the hero is replaced by a wide horizontal carousel of project rows (VK-01 / VK-02 / VK-03 ...) with names of real Turkish + Romanian + German clients, dates from the last 90 days, and a drag-affordance indicator that says "DRAG TO SEE MORE" in JetBrains Mono. The entire page is built around proving "we shipped this *yesterday*, here are six other things we shipped this quarter."

**Implementation summary:**
- Above the fold: a 100vh-tall hero with the ledger as the dominant element
- Each row: VK-NN code + client name + service tag + ship date + 200-char description
- Horizontal scroll: native CSS `scroll-snap` + the drag-affordance label
- On the right edge: a fade-out gradient hinting more rows
- Below the fold: services + about (operator-named: Nalba + Baha) + contact

**Why this beats the v6 metrics grid:** The v6 had stats (120/95%/5wk/99.9%) — Nalba flagged those as unattributed-and-fake. The v7 ledger replaces stats with PROOF. Every entry is verifiable. The "swap-test answer" writes itself: "another shadcn template can't put 6 real recent client names + dates on the first scroll."

## 4. Anti-patterns banned for THIS project

The four bans, explicitly committed:

1. **The Velkina v6 kit** (Sora display + Instrument Serif italic kicker + monospace eyebrow + paper bg). Source: [[feedback_velkina_design_creativity]]. Banned because using it for v7 would make v7 visually indistinguishable from v6 — the entire point of v7 is to break that recycled aesthetic.

2. **3-up feature card grid as primary feature layout.** No 3-up card grids on this landing for services or work. Services use a text-left/code-right alternating rhythm (Stripe Press / Linear customer-page model). Work uses the horizontal-drag ledger.

3. **"40+ projects" rendered as 14px subhead text.** Banned (per design-creativity-engine anti-patterns.md and Adobe Spectrum Big Number spec <https://spectrum.adobe.com/page/big-number/>). If we render a number, it's a Big Number design object — 96px-280px clamp, Söhne Halbfett 800.

4. **Hero = display headline + italic kicker + 2 paragraphs + 2 buttons.** Banned. The hero IS the ledger. The display headline appears AFTER the ledger as a subordinate element ("Two operators. Real software. Recent ledger above.").

Additional explicit bans for v7:
5. **Logo carousel** ("trusted by Google / Coca-Cola") — Velkina has zero Fortune 500 clients; faking a logo wall would be agency-theatre.
6. **Testimonial cards with face photos** — generic, AI-spotty, and easy to fake. Real client quotes embedded inline in the ledger rows ARE allowed.
7. **"We craft digital experiences" / "We help brands grow" / "Tomorrow's web today"** headline copy — banned phrases per realistic-approach-engine. Replace with concrete claims.
8. **Hover-only reveals on mobile** — touch viewport gets no hidden interactions.

---

## Direction triplet (for forbidden-cousins.js --register)

```json
{
  "project": "velkina-v7",
  "date": "2026-05-14",
  "canvasHex": "#0A0A0B",
  "canvasName": "near-black with radial glow",
  "displayTypeface": "Söhne",
  "signatureMoveName": "vk-numbered-horizontal-drag-ledger",
  "inspirationRefs": [
    "https://vercel.com/design",
    "https://www.instrument.com/",
    "https://www.basicagency.com/",
    "https://press.stripe.com/",
    "https://teenage.engineering/"
  ]
}
```

## Sibling-cousin check log

Will be filled in by `forbidden-cousins.js` script run.

## Section-by-section layout (informs landing-page skill in Phase V4)

| Section | Background shift | Content | Why |
|---|---|---|---|
| 0. Hero | `#0A0A0B` near-black, radial-glow center | VK-numbered horizontal-drag ledger (6 rows: VK-01 to VK-06) | The proof IS the hero |
| 1. Tagline & operators | `#13131A` slight lift (section-shift move) | "Two operators. Real software. Recent ledger above." + named Nalba + named Baha | Operator-naming per founder-loop.md |
| 2. Services as work-pairs | `#0A0A0B` back to base, text-left/code-right alternating | 6 services, each shown as: service name + one recent shipped example from the ledger above | Services proven by work, not by feature list |
| 3. The Big Number proof | `#13131A` slight lift, full-bleed | One Big Number: "47" (shipped projects since 2018) rendered at 280px Söhne Halbfett — Adobe Spectrum Big Number style | One stat, design-objectified |
| 4. Founder voice (Nalba + Baha) | `#0A0A0B` base | Two short voice paragraphs — ACTUAL voice (no `{{NALBA_VOICE}}` placeholders allowed per realistic-approach-engine + per v6 HANDOFF gap #75) | The operators must speak |
| 5. Contact | `#0A0A0B` base + subtle radial glow at the bottom right corner | Email + WhatsApp + Calendly — no form, no gauntlet | Per docs/needs/v7-landing.md "outcome" |

3 background shifts (`#0A0A0B` → `#13131A` → `#0A0A0B` → `#13131A` → `#0A0A0B`). One Big Number. Real ledger. Operator-named. No filler.

## 15 moves checklist (per design-creativity-engine SKILL.md Phase 2)

| # | Move | Status |
|---|---|---|
| 1 | Warm canvas | REJECTED — using `#0A0A0B` near-black; cream would conflict with the "we ship software" identity |
| 2 | Single display face | USED — Söhne (Klim) as sole display |
| 3 | Weight/size extremes | USED — Söhne 200 + 800; 3x+ size jumps (11px → 220px) |
| 4 | Stats as design objects | USED — Big Number section with "47" at 280px |
| 5 | Show the product | USED — VK-numbered ledger of actual client work IS the product proof |
| 6 | Section bg shift | USED — 5 sections with 4 background shifts |
| 7 | Asymmetric grid | USED — text-left/code-right alternating in services section |
| 8 | Eyebrow labels | USED — JetBrains Mono 11px uppercase eyebrows per section |
| 9 | Replace 3-up grid | USED — text-left/code-right rows instead of 3-up service cards |
| 10 | Signature element | USED — VK-numbered horizontal-drag ledger |
| 11 | Gradient as atmosphere | USED — radial glow on hero (subtle, not "gradient as decoration") |
| 12 | Tripled headline / pull-quote | REJECTED — the tripled-headline is Linear's move; using it would read as Linear-imitation |
| 13 | Photographic full-bleed | REJECTED — Velkina doesn't have studio-quality photography of clients; faking it = banned |
| 14 | Tabular-figure monospace | USED — JetBrains Mono with `font-variant-numeric: tabular-nums` for all numeric labels in the ledger |
| 15 | Refuse cool gray-white | USED — `#0A0A0B` not `#F5F5F7` |

Score: 9 USED, 3 REJECTED, 3 N/A (the catalog has 30+ moves; only 15 are scored in SKILL.md Phase 2). Above the 6-USED minimum for a hero page.

## Swap test answer (pre-implementation prediction)

"This page is visually distinguishable from a shadcn-default template because the hero is replaced by a horizontal-drag ledger of 6 real client names + dates + project codes (VK-01 to VK-06), where the interaction itself is the signature. A shadcn template's hero is always a centered headline + 2 buttons + a hero illustration. The ledger interaction physically can't exist in a shadcn-default scaffold without writing the component from scratch."

The Phase 4 swap test will verify this answer against the rendered page.
