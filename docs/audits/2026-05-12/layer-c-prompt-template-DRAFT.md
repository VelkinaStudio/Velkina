# Layer C — RuleSell hero rebuild + trending-repos SEO (prompt template, drafted in advance)

This document is my pre-drafted prompt for the Layer C agents, written while Wave 3 runs. Will be refined when Layer C starts.

## Current state observations (gathered while Velkina agents run)

### Hero copy (D:/RulesetMarketplace-master/messages/en.json)
```
eyebrow: "Open-source catalog · Claim your work"
title: "Real GitHub authors. Real quality signals. AI tool configs in one place."
subtitle: "212 rules, MCP servers, skills, and agents — sourced from real GitHub repos, quality-scored on freshness, schema cleanliness, and reviews. Authors can claim their listing via GitHub OAuth."
```

**Honest review:**
- Title: third clause weakest ("in one place" is filler).
- Subtitle: actually specific — "212 rules", "quality-scored on freshness/schema/reviews". This works.
- Eyebrow: "Claim your work" is interesting but vague out of context.

The hero copy isn't *generic*. The "all three failure modes" the user described is likely visual + structural, not pure copy. The Layer C agents need to see the rendered page, not just read the source.

### Existing SEO landing pattern (good reference)
- `src/app/[locale]/(public)/claude-code-skills/page.tsx` — clean RSC, db-backed listings, BreadcrumbList + CollectionPage JSON-LD, metadata. Use as template for `/for/[repo-slug]`.

### Stack
- Next.js 14 (App Router + src/ dir)
- Prisma + PostgreSQL
- framer-motion already in use
- Tailwind + shadcn components

## Layer C plan (2 sub-agents in parallel)

### Sub-agent C-1: Trending repos SEO ingestion (90 min)

**Files allowed:**
- `src/app/[locale]/(public)/for/[slug]/page.tsx` (NEW)
- `src/lib/github/trending.ts` (NEW)
- `scripts/refresh-trending-repos.ts` (NEW)
- `prisma/schema.prisma` (NEW model `TrendingRepo`)
- `prisma/migrations/<timestamp>_add_trending_repo/migration.sql` (NEW)
- `src/app/sitemap.ts` (extend with trending repo URLs)

**What to build:**
1. New Prisma model `TrendingRepo` with fields: `id`, `slug`, `name`, `owner`, `description`, `language`, `stars`, `topicsJson`, `readmeExcerpt`, `htmlUrl`, `avatarUrl`, `lastSeenAt`, `pageviewCount?`, `relatedRulesetSlugsJson`.
2. `scripts/refresh-trending-repos.ts` — GitHub Search API ingestion. Query topics: `ai-tools, claude, cursor, llm, agent, mcp, vscode-extension`. Sort by stars created in last 30 days. Top 50 per category, deduplicated. Fetch repo details (README first 500 chars, owner avatar URL). Upsert into TrendingRepo. Use `GITHUB_PERSONAL_ACCESS_TOKEN` env var.
3. `src/app/[locale]/(public)/for/[slug]/page.tsx` — RSC route. `generateStaticParams` from TrendingRepo. Renders:
   - H1: "Claude Code & Cursor rules for {repo.name}"
   - Repo card (owner avatar, name, stars, language, link to GitHub)
   - README excerpt
   - "{N} rules from RuleSell target {repo.name}" — list from `relatedRulesetSlugsJson` IF non-empty, else CTA "Be the first to publish rules for {repo.name}"
   - JSON-LD: BreadcrumbList + SoftwareApplication (subject is the repo) + WebPage
   - Metadata: title `"Claude/Cursor rules for {repo.name} (2026) · RuleSell"`, description from `readmeExcerpt`
4. `sitemap.ts` extension: append `/for/<slug>` for every TrendingRepo row.
5. `package.json` script: `"refresh-trending": "tsx scripts/refresh-trending-repos.ts"`.

**Validation:**
- `npx tsc --noEmit` exits 0
- `pnpm refresh-trending` (or `npm run refresh-trending`) populates DB without errors
- `curl -s http://localhost:<port>/for/anthropics-claude-code` returns 200 + correct JSON-LD
- Sitemap includes new URLs
- One screenshot of a rendered `/for/[slug]` page at 1440 viewport

### Sub-agent C-2: Hero rebuild (90 min)

**Files allowed:**
- `src/app/[locale]/(public)/page.tsx`
- `src/components/marketing/hero-*.tsx`
- `src/components/marketing/hero-search.tsx`
- `messages/en.json` (only the `landing.hero.*` namespace)
- `src/lib/motion/variants.ts` (only `heroEntrance`, `heroChild`)

**What to fix (the three failure modes Nalba named):**

1. **Generic / templated** — the right-side HeroScatter visualization IS distinctive (212 dots, real slugs), but it's desktop-only. Mobile falls back to nothing distinctive. Sub-agent should:
   - Build a mobile-equivalent signature element: maybe a tight grid of 6 logos (Claude / Cursor / Aider / Continue / Codeium / Zed) with "212 rules ship to {tool}" beneath each.
   - Add a single live-feeling element: latest 3 published rules ticker (real db query, not fake).

2. **Doesn't explain fast enough** — eyebrow + title + subtitle take ~30 words to convey what RuleSell is. Tighten:
   - Eyebrow: "Marketplace for AI tool configs"
   - Title: "212 rules, skills, and MCP servers — quality-scored, from real GitHub."
   - Subtitle (shorter): "Authors claim their listing via GitHub. Buyers pick by freshness, schema, and reviews."

3. **Visually broken / dated** — sub-agent should screenshot the current hero at 360/1440 before changing anything. Then identify specific visual issues from the screenshot. Possible candidates:
   - Spacing crisis on mobile
   - HeroSearch component looks like a stock input
   - Type hierarchy weak (h1 and subtitle font sizes too close)

**Validation:**
- Build passes
- 4 screenshots: hero before/after at 360 and 1440
- Mobile hero now has a distinctive element (not just text)
- Copy is ~20% tighter

## What I won't agent out — these stay with me

- Final review of agent outputs.
- Writing HANDOFF for RuleSell using honest-handoff skill.
- Decision on whether sub-agent C-1 should publish the `/for/[slug]` route in this run or behind a feature flag for Baha's review first (will ask Nalba).

## Estimated budget for Layer C

- GitHub API: ~50 search queries + ~200 repo detail fetches = ~250 calls (5000/hr core, plenty).
- LLM cost (this run): zero — agents use Claude internally; trending data is pure API+DB.
- Image gen: zero — repos provide their own avatars via `https://github.com/{owner}.png`.

## When Layer C starts

After Wave 5 of Velkina completes and I've verified Velkina is in honest shape. Estimated hour 7.
