# Velkina v7 — Needs Determination (needs-determination-engine output)

Date: 2026-05-14
Engine: needs-determination-engine (always-active, fires first)
Status: COMMITTED

## Audience (one sentence)

The v7 landing speaks to a **CMO, marketing director, or founder at a 5-50 person Romanian / EU / UK / US company** who has been disappointed by big-five-shaped agencies that overcharge and under-deliver and is hunting for a small operator team that ships real software fast — landing on velkina.com from a referral, an outbound message, a LinkedIn post, or a Romanian-buyer-network introduction during/after the Romania pitch trip (which already shipped 2026-05-11).

Specifically NOT:
- Other agencies looking to white-label (those came in via referrals in the past; v7 doesn't court them)
- Junior people (CMO-level decision-makers only)
- Pure SaaS founders looking for a CTO replacement (Velkina is project-based + retainer, not embedded team)
- Enterprise procurement-driven buyers (procurement adds 6 months and we're 2 people)

## Outcome (one sentence)

A first-time visitor must, **within 30 seconds of landing**, conclude: "These two operators ship real software for real Turkish + EU + US clients, they have shipped *recently* (last 30 days), and I can email them about my project without a sales gauntlet."

Operationalized:
- The ledger of shipped work must be visible above the fold without scrolling
- The two operators (Nalba + Baha) must be named, not "our team"
- Contact email + WhatsApp must be one click away, not gated behind a form
- The work shown must be RECENT and SPECIFIC (named clients, dated, not "120+ projects")

## Constraints that actually bind

1. **Solo+plus-one team.** Two operators, not a 30-person agency. Visuals that imply a 30-person team (six service columns, generic "Our Team of Experts" photos, jargon-laden "departments") would betray the truth on month-1 of working with us. The site must look like what we ARE, not what bigger agencies look like.
2. **The work IS the proof.** No testimonials (we have some but they read generic), no "trusted by" logo carousel (too easy to fake), no awards (don't have any worth showing). The signature element is the recency ledger.
3. **Trilingual EN/TR/RO is hard-required.** All copy renders in all three locales. No "coming soon" placeholders, no English-only sections that 404 in RO. The customer-agent page locale-collapse bug (2026-05-11) cannot return.
4. **Mobile is the dominant viewport** for Romanian/Turkish CMOs scrolling between meetings. 360px screenshots are the primary QA target, not 1440.
5. **2-second swap test must pass.** If a visitor replaced velkina.com with a shadcn template + the same copy, they should NOT be unable to distinguish them within 2 seconds. v6 fails this test — the recycled paper-bg + Sora display + Instrument italic kit makes it indistinguishable from 40+ other "calm AI tool" landings.
6. **No founder-voice placeholders.** The v5/v6 spec had `{{NALBA_VOICE_EN}}` placeholders that were never filled. v7 either ships with Nalba's actual voice paragraph or drops the section entirely — placeholders are banned.
7. **Lighthouse mobile ≥ 90 on /en** (perf + a11y + SEO + best practices). v6 had 67 on agentic-browsing — must hit 90+ after llms.txt + canonical fixes were shipped 2026-05-12.

## Kill condition (one sentence with a date)

If by **2026-07-01** (45 days post-launch) the v7 landing has not produced **at least 3 inbound qualified leads** (CMO/founder-level inquiries about a project >= €5k from a non-referral source — tracked via `?ref=` UTMs + email subjects + Tawk widget), kill the v7 narrative and switch the landing to a portfolio-only single-page format (no copy, just 6 named work tiles, contact). The bet here is that the recency ledger + named operators converts the "is this real?" question; if it doesn't, less is more.

## What this docs informs downstream

- `docs/strategy/founder-loop.md` (business-engine output) — bends the wedge/beachhead/expansion question toward this audience
- `docs/design/velkina-v7-direction.md` (design-creativity output) — bends canvas/type/signature toward "we ship real software fast" (NOT "calm AI tool")
- `app/HomeView.tsx` rebuild — every section justifies itself against the 30-second-conclude test

## Notes (honesty)

- The 2026-05-11 Romania trip already shipped. v7 is now about *capitalizing* on the trip's contacts and the next 90 days of outbound, not about pre-trip prep.
- The kill condition (3 leads by 2026-07-01) is aggressive on purpose. If v7 can't produce 3 leads in 45 days from a site already getting visits, the bottleneck isn't the site — it's distribution. That's the actual signal we want.
