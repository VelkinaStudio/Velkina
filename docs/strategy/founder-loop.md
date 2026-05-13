# Velkina — Founder Loop (business-engine output)

Date: 2026-05-14
Engine: business-engine (4-question founder loop, distribution-first)
Reads: docs/needs/v7-landing.md

## Q1 — Who is already paying for the next-best alternative, and how do they buy?

Romanian / EU / UK / US CMOs at 5-50 person companies are currently paying for technical+design work from one of four classes of provider. Named examples, not "agencies in general":

### Class A — Eastern European mid-tier studios (Velkina's direct competition)
- **Halo Lab** (Dubai HQ + 24 global offices, NOT Ukraine-only as I'd initially drafted) — design + dev studio, **$25-49/hr** rate band per Clutch profile (verified 2026-05-14), 50-249 person team, $10k+ minimum project, founded 2013. Source: <https://clutch.co/profile/halo-lab>. They get clients via Clutch + Behance + cold outbound + global office presence.
- **Brand Vision** (Toronto, but Eastern-European-shaped pricing/tone) — branding + web, ~$75-150/hr. Source: <https://brandvm.com/>. Clutch-driven inbound.
- **Outcrowd** (Ukraine) — heavy design focus, $50-99/hr per Clutch. <https://outcrowd.io/>.
- **Vendasta-network agencies** — fragmented, $30-80/hr, white-label SaaS resellers serving small business. The bottom of the market.

**Where they get paid:** Clutch (the dominant B2B services directory), Behance/Dribbble showcase → DM inbound, LinkedIn outbound, referrals.

**Typical project size:** $5k - $50k for these competitors. Retainers $2k-$8k/mo.

### Class B — Western boutique studios (above Velkina's price point — aspirational comp set)
- **Locomotive** (Montreal) — <https://locomotive.ca/> — $120-200/hr, Awwwards SOTD repeated winner. Tight 20-person team.
- **DEPT** (Amsterdam, but big now) — was the model for "EU boutique"; now too large.
- **BASIC/DEPT** — <https://www.basicagency.com/> — same lineage.
- **Pentagram** — top end, $400+/hr equivalent, brand work for Fortune 500.

These don't compete on price; they compete on craft + name recognition. They get paid by Fortune 500 marketing departments who Google "best agency for [thing]" and click the named brands.

### Class C — Freelancer-on-Upwork (below Velkina's price point — the threat from below)
- Individual freelancers $15-50/hr on Upwork / Fiverr / Toptal
- The risk: a CMO might think "why pay €25k for a Velkina project when I can hire a $30/hr Upwork dev for €5k?"
- The answer: they CAN, and they do, and they get burned, and they come back. That's the funnel — Velkina is the "I tried Upwork and it didn't work" upgrade.

### Class D — In-house contractors / fractional CTOs
- Toptal (~$150-300/hr) for vetted freelancers
- Andela (~$80-150/hr) for African engineering talent
- These are the "we want a flexible team" buyers; Velkina competes when the buyer realizes design + dev + brand integration is the actual need, not just engineering hours.

**Verdict on Q1:** Customer existence verified. They pay €5k-€50k per project, $2k-$8k/mo retainer. They find Class A providers via Clutch + cold outbound + referrals. Class B via Google branded search. Class C via Upwork search. Class D via fractional/talent marketplaces.

**The substitution Velkina must beat:** Class A (Halo Lab et al). Not Class B (out of price band), not Class C (out of quality band), not Class D (different shape). The buyer comparing Velkina to Halo Lab is the live competition.

**Important correction (2026-05-14):** Halo Lab is **cheaper than I initially assumed** ($25-49/hr, not $50-99). This means Velkina at €60-100/hr effective rate is positioned ABOVE Halo Lab, not at parity. The pitch must justify the premium — "boutique, founder-led, EE-international wedge specialty" — and accept that price-only buyers will pick Halo Lab. That's actually fine; Velkina was never going to win the price-only segment.

## Q2 — Smallest paid bet that proves demand

### $0 rung
**Test:** Is the v7 landing's 30-second-conclude promise read by visitors as differentiated?
**Yes if:** Lighthouse "Real User Monitoring" via Vercel Analytics shows >40% scroll past the ledger, time-on-page > 45 sec on /en homepage. Tracked via Vercel Web Analytics or PostHog.
**Kill:** If after 2 weeks of organic + referral traffic (target n=200 sessions) the ledger gets <20% scroll-past or time-on-page <20 sec, the recency-ledger thesis is wrong and we revert to a portfolio-first format.

### $500 rung
**Test:** Can Velkina convert a cold-outreach campaign into 1 first paying project at €5k+ minimum?
**Method:** 50 personalized cold emails to Romanian/EU CMOs whose companies launched a new product in the last 60 days (signal of recent investment in marketing/dev). Subject line names the specific recent launch, body offers a free 30-min "what would I do differently" review (the Win-Without-Pitching discovery call).
**Yes if:** ≥2 calls book → ≥1 project signed at €5k+ within 60 days.
**Budget cap:** €500 for tooling (Apollo.io list export, Clay enrichment, maybe Hunter.io email finder). Time cost not capped — this is the operator-time experiment.
**Kill:** If after 100 sends (2× the planned 50) the reply rate is <5% (5 replies on 100 sends), the cold outreach approach is dead and we pivot to referral-only/inbound-only.

### $5,000 rung
**Test:** Can we hit €25k MRR equivalent (4-5 active retainer clients OR 6-10 active projects) by 2026-12-31?
**Method:** Layer in (1) Clutch profile + reviews farming, (2) targeted LinkedIn content (Nalba on design, Baha on infra — 2 posts/week each), (3) one piece of "named-target" content per month (e.g., "What we'd change about [named Romanian company]'s site").
**Yes if:** By 2026-12-31, monthly recurring agency revenue is €15k+ (project income smoothed) AND there are ≥3 active retainer clients with 90-day forward visibility.
**Budget cap:** €5,000 for Clutch profile boost, content production time, LinkedIn ads test budget ~€1,500.
**Kill:** If by 2026-09-30 (3-month checkpoint) monthly revenue trajectory is <€8k, kill the agency-growth thesis and shrink to lifestyle solo-operator scale (Nalba+Baha both pick up day jobs, run Velkina as 20%-time side studio).

## Q3 — Wedge → Beachhead → Expansion

### Wedge (6 months, by 2026-11-14)
**Specific:** "The boutique software studio for Eastern European companies launching their first English-language product into EU/US markets."
- The wedge customer is a 5-25 person company in Romania / Turkey / Bulgaria / Poland with a successful local product who wants to ship internationally and needs the website + brand + first-version product to read as "global software company," not "translated local product."
- Velkina's edge: Turkey-based founders who understand the Eastern European cost structure AND have shipped EN-language products that look international. The Romania pitch trip seeded this exact wedge.
- Named target customers in this wedge (from Velkina's existing portfolio + reachable network): Lavinia Bistro (already client), Atar Avcı (already client), TP Thermoplast (already client), plus 15-20 named Romanian/Turkish companies launching globally in 2026-2027.

### Beachhead (18 months, by 2027-11-14)
**Specific:** "The default boutique software studio that Eastern European founders recommend to each other when they need to ship internationally."
- 8-12 named EE companies have shipped projects with Velkina, generating word-of-mouth referrals.
- Velkina has a public Clutch profile with 5+ reviews and ranks in "top 10 design studios in Turkey" for Eastern European buyers.
- The 2-person team has scaled to 2-3 trusted subcontractors (per agency-ops-engine subcontractor-management.md), allowing 1.5x throughput without permanent hires.

### Expansion (3 years, by 2029-05-14)
**Specific:** "A vertical software studio that specializes in launching Eastern European products globally" — moving from generalist agency → specialist productized service.
- The signature offer is a **6-week "Global Launch Sprint"** ($35k flat) that takes a successful local EE product and ships its English version + brand + 3-pillar marketing site. This is the productized version of what Velkina already does as bespoke projects.
- Repeated 8-12 times per year = $280-420k revenue from the flagship offering alone.
- Secondary revenue from retainer-style ongoing support post-launch.
- This is the Stripe → "developer-payments → online businesses → financial infrastructure" arc, scaled down: EE-product-launch → EE-international → EE-tech-export.

## Q4 — Kill conditions

Three specific kill triggers. If any fire, restructure.

### Kill 1 — Distribution kill
**Trigger:** By 2026-09-01 (108 days from today), cold outbound + referral has not produced ≥3 paying projects at €5k+ each (€15k cumulative).
**Why:** Distribution is the binding constraint. If we can't find paying customers in 3.5 months despite a Romania-trip warm list + targeted cold campaign, the customer acquisition mechanism is broken and the agency model doesn't work for us.
**Action on trigger:** Pivot to product mode — Velkina becomes a 1-product company (likely RuleSell or a Velkina-internal product), and the agency wraps to "selective consulting only."

### Kill 2 — Economics kill
**Trigger:** By 2026-12-31, target effective hourly rate across the year is <€60/hr (the floor for Turkey-resident operator life sustainably, per agency-ops-engine pricing-retainer-vs-project.md).
**Why:** Below €60/hr effective rate, you're working freelance for less than agency wage. The productized-service pivot is the only path to escape this.
**Action on trigger:** Drop bespoke project pricing, force-launch the €35k Global Launch Sprint flat package, refuse all sub-€20k projects.

### Kill 3 — Founder kill
**Trigger:** Either Nalba or Baha has had 2+ months in a row of <50% utilization on Velkina work (with the other carrying revenue) by 2027-02-01.
**Why:** A two-operator agency only works if both are loaded. If one drifts, the relationship strains, the work suffers, and the model collapses into "Nalba's solo studio with Baha as contractor."
**Action on trigger:** Honest conversation between Nalba and Baha; either rebalance with a new offering for the under-loaded operator, or split the agency into Nalba-led + Baha-led divisions, or one of you exits to a day job and Velkina becomes one-person.

## Distribution-first sanity check

If "how do the first 10 paying customers find us" cannot be answered in one specific sentence, the strategy is broken.

**Answer:** The first 10 paying v7-era customers find Velkina via:
1. Romania pitch trip contacts (3-4 leads, warm)
2. Cold outbound to named EE companies with recent product launches (3-4 leads, lukewarm)
3. Referrals from existing clients in TR (Lavinia Bistro, Atar Avcı, TP Thermoplast — 2-3 leads, warm)
4. Inbound from the v7 landing's "what we'd change about your site" public content (0-2 leads, cold but pre-qualified)

This is real. It's not "we'll do content marketing" or "we'll do paid ads." It's three named channels with named warm contacts.

## Notes (operator honesty per realistic-approach-engine)

- Clutch profile is not currently set up. That's a P1 task before any Clutch-funnel claim can fire.
- The €35k Global Launch Sprint is a hypothesis — has not been priced/sold yet. The first attempt at packaging it is the test.
- Subcontractor capacity is also a hypothesis — we have not yet hired anyone. First subcontract is the test.
- The "what we'd change about your site" content has zero examples published. Zero. That's the gap.

These are the unverified bets. They live in the kill-conditions, not in the website copy.
