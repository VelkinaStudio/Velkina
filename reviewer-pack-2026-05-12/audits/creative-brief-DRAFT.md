# Velkina creative brief (DRAFT — refine after audit lands)

This is a working draft I'm writing BEFORE the audit completes so the audit findings can sharpen it. It will be revised before any rebuild work starts.

## The positioning problem

Velkina is being introduced to Romanian businesses by a founder (Nalba) flying in to pitch in person. The site is the back-up they'll Google after the meeting. That changes what the site needs to do:

- **It is not for SEO discovery.** Nobody is finding Velkina via search before the meeting.
- **It is the resume after the handshake.** Romanian business owner gets a card, opens the site on their phone 6 hours later, decides if Velkina is real or vapor.
- **The verdict happens in 15 seconds.** Hero + first scroll. Does this feel like a real studio that has shipped things?

So the site's job is **proof of substance**, not lead capture. The lead is already in motion.

## What "professional" means here (specific)

Not: "modern design system with glassmorphism cards."
Yes: **a portfolio that survives a 30-second skim by someone skeptical, in a language they can read.**

Concrete bar:

- Open the site at any of the 9 service pages. There is a real case study with a specific client name, a specific problem, a specific approach, and a measurable result. Not "we helped X grow." → "Lavinia Bistro replaced printed menus with a QR menu in 4 languages. Tourists order in their own language. Owner updates the menu from her phone. Two-month payback."
- The Romanian version doesn't read like English with Romanian words. It reads like a Romanian copywriter wrote it.
- The mobile view is the primary view. Romania has high mobile-first usage — Statista 2025: ~75% of Romanian internet usage is mobile.

## Reference sites (the quality bar)

Per the spec defaults: Linear / Vercel / Mercury / Stripe / Arc level. Let me be specific about what I'm pulling from each, because "Linear-level" is itself a vague target.

| Reference | What I'm specifically stealing | What I'm NOT copying |
|---|---|---|
| Linear.app | Editorial type hierarchy, density, dark-mode-as-default that feels intentional not lazy | Their software-product feel — Velkina is a studio not a SaaS product |
| Vercel.com | The "shipping log" rhythm — recent shipped things visible upfront | Their build-tool aesthetic |
| Mercury.com | Quiet authority in copy — short sentences, no marketing fluff, trust through specificity | Their financial-product structure |
| Stripe.com | Treatment of case studies — real metrics, real screenshots, embedded in the page not a separate "customers" section | Their developer audience |
| Arc browser (thebrowser.company) | Personality. They have a *voice*, you can tell a small team wrote it | Their playfulness — Velkina serves businesses, not consumers |

## Velkina's signature element (the thing that survives the swap test)

This is the hardest part — what does Velkina have that no other agency template has?

**Hypothesis 1: A bilingual TR-RO live banner.** Top of every page: a small ticker showing "Now in: İstanbul · Iași" with a real-time clock. Signals: we are physically present in both countries, we are not a faceless global agency, we are local enough to take a meeting tomorrow.

**Hypothesis 2: Project ledger.** Instead of a "Portfolio" section that looks like every agency, a chronological ledger — "Week 47: Shipped QR menu for Lavinia (TR→EN/RO/DE). Week 46: Cloud migration for Atar Avcı (AWS, $3.4k/mo saved)." Reads like a shipping log, not a brochure. Inspired by Vercel's release pace.

**Hypothesis 3: Founder paragraph in three languages.** A single block where Nalba writes (in EN, TR, RO) why Velkina exists. Not a corporate "About Us" — a paragraph that could only have been written by a real person. This is the placeholder I'm leaving for you to fill in three voices.

**I'll pick one for the rebuild. Most likely #2 (project ledger), because it doubles as proof of substance AND requires zero invention — it's just the real work, organized.**

## What this brief is missing (will fill after audit)

- The specific P0 broken pieces — until the audit lands, I'm guessing.
- Which pages get the rebuild and which stay (some service pages may be fine).
- Generation budget allocation — if image-gen is needed for anything, it goes here.

## Self-critique (the mandatory step)

Reading my own draft: would a Romanian business owner remember Velkina 24 hours after seeing this?

- If we ship Hypothesis 2 (project ledger): YES — they'd remember "the agency that publishes a weekly shipping log." That's recallable and specific.
- If we ship the default agency template + new palette + new photos (what the current site is): NO — they'd remember "a Turkish-Romanian agency that made a clean website." Forgettable.

The hypothesis with the higher recall probability is what we build. That's the rule.
