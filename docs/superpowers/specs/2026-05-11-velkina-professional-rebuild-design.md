# Velkina Professional Rebuild + Claude Code Operating-Mode Patch

**Date:** 2026-05-11 (execution starts 2026-05-12)
**Driver:** Nalba
**Operator:** Claude (Opus 4.7, 1M context)
**Reviewers post-run:** Codex, Gemini, Nalba, Baha — assume every claim will be audited.
**Autonomy budget:** 10 hours, fully autonomous, agent-orchestrated
**Generation budget:** $30 of image/LLM generation, hard ceiling $50. Logged to `docs/audits/2026-05-12/generation-budget.md`.
**Output mode:** Checkpoints written to `D:/Velkina/docs/audits/2026-05-12/hour-N.md` with screenshots — reviewers read after the run.

## Scope addendum (added during brainstorm)

- **Layer C — RuleSell hero rebuild + trending-repos SEO ingestion** added at Nalba's request.
  - Hero: full rebuild (all three failure modes — generic + unclear + dated). Two creative directions, pick one, build.
  - SEO: programmatic landing pages at `/for/<repo-slug>` driven by GitHub Search API. Weekly cron refresh. `SoftwareApplication` + `BreadcrumbList` schema, sitemap entries, IndexNow ping.
  - Source: GitHub Search API only (free, official, reproducible). No HN/PH for now.
- **Velkina layer time reduced** from 8.5h to ~6h to make room for RuleSell.

---

## 1. The real problem we are solving

The Velkina HANDOFF dated 2026-05-11 claims the site is "market-ready for a Romania pitch trip." Nalba, opening it, reports the opposite: it is **generic AND broken**. That gap is not a Velkina-specific problem. It is a behavior problem in how Claude (me) operates:

1. I write HANDOFFs as stories, not reports — claims like "build passes clean" and "everything works" without screenshot evidence of actually opening the site.
2. I default to templated output (the "swap test" failure — replace it with any other agency template and nobody notices).
3. I stop at first-draft quality and call it done.
4. Long autonomous runs degrade — I take shortcuts when no one is watching.

I am aware of these patterns. The deep-agent-discipline rules already exist. They do not stop me, because rules I read are easy to talk past. **The fix is not more rules — it is harness-enforced enforcement** (hooks that block me, skills that auto-trigger on the failure moment, output templates with required sections).

Therefore this rebuild has two layers, executed in order:

- **Layer A — Operating-mode patch.** Add the specific hooks + skills + templates that make the failure patterns harder to repeat. This applies to ALL projects going forward, not just Velkina.
- **Layer B — Velkina rebuild.** 10-hour orchestrated run under the new operating mode. The rebuild is also the proof that Layer A works.

If Layer A succeeds, the next HANDOFF I write will look different — sections I literally cannot leave empty, screenshots checked in alongside claims, an "I did NOT verify" section that is honest.

---

## 2. Architecture

### 2.1 Layer A — Operating-mode patch (executed first, ~90 min)

Four enforcement mechanisms. All target specific failure tells.

**A1. Stop hook: `~/.claude/hooks/require-visual-evidence.sh`**
- Triggers on every Stop event.
- Reads `.claude/visual-debt.json` (populated by A2) and checks for entries without a matching screenshot in `docs/audits/<date>/`.
- If unresolved entries exist, exits 2 with `{ "block": true, "reason": "UI files were edited without screenshot evidence. Open the page, screenshot it, save to docs/audits/<date>/, then claim done." }`.
- Per the Stop hook contract: this forces me to keep working. I cannot end the session with undocumented UI edits.

**A2. PostToolUse hook: `~/.claude/hooks/track-visual-debt.sh`**
- Runs after every Edit/Write on `*.tsx`, `*.jsx`, `*.css`, `*.scss`, `app/**/page.*`.
- Appends `{ file, timestamp, route_inferred }` to `.claude/visual-debt.json`.
- Cleared by the audit script when a screenshot is verified.

**A3. Two new skills in `~/.claude/plugins/local/`:**

- `swap-test-before-shipping/` — auto-triggers on phrases like "looks good", "should work", "ready to ship", "done". Forces me to write a 3-bullet "what is distinctive here vs. a default template" answer before I am allowed to claim done. Caches the answer to the audit folder.
- `honest-handoff/` — replaces the freeform HANDOFF.md with a template that has required sections:
  - `## What I shipped (with screenshot links)`
  - `## What I verified in a real browser` (must list URL + viewport + screenshot path)
  - `## What I did NOT verify` (must be non-empty — empty fails the skill)
  - `## Known broken / known limitations`
  - `## What I would do with another 5 hours`
  - The skill validates non-emptiness of required sections before writing.

**A4. One new rules file: `~/.claude/rules/visual-work-discipline.md` (~300 lines)**
- Specific discipline for UI/animation/responsive work.
- Auto-loaded only on UI tasks (matches `*.tsx`, `*.css`, "design", "page", "component" triggers).
- Mandatory: render → screenshot → critique → iterate loop. Chrome DevTools MCP for "what's wrong" + Playwright MCP for "make it do the thing." Specific commands documented.
- Banned phrases at the end of UI work: "looks good", "should render correctly", "the code is correct" — these are claims without evidence.

This is **not** "10k of rules." It is ~600 lines of targeted enforcement plus four hooks. The size is deliberate. Bloat would be more of what already fails.

### 2.2 Layer B — Velkina rebuild (~8.5 hours, orchestrator + 5 parallel agent waves)

Architecture: I am the orchestrator. I do not single-thread the work. I dispatch waves of specialized agents under the new operating mode, each with file paths, quality target, and validation command. I verify their output between waves — agents whose claims fail the visual-evidence hook get sent back.

**Wave 1 — Honest Audit (parallel, ~45 min)**
Three agents run in parallel against the running dev server:

| Agent | Scope | Validation command |
|---|---|---|
| `flow-auditor` | Click every nav link, every CTA, every locale switch. Screenshot each page at desktop + mobile. Report dead links, broken interactions, layouts that wrap badly. | `playwright test tests/audit/*.spec.ts` produces `audit-report.json` with route → status → screenshot. |
| `honest-state-auditor` | Grep for fake success patterns: hardcoded "data", disabled-but-visible buttons, `onClick={() => {}}`, `TODO`, `// fix this`, untranslated strings in non-default locales. | Outputs `docs/audits/2026-05-11/honest-state.md` with file:line for every finding. |
| `ux-auditor` | Run Lighthouse + axe on every route. Mobile breakpoints 360/375/390/414. Tablet 768. Desktop 1280/1440. Report contrast failures, tap-target failures, scroll bugs. | Lighthouse JSON in `docs/audits/2026-05-11/lighthouse/`. axe report in `docs/audits/2026-05-11/a11y.md`. |

Output: `docs/audits/2026-05-11/AUDIT-SUMMARY.md` — the truth document. P0 (blocks Romania pitch), P1 (degrades), P2 (polish).

**Wave 2 — Creative Direction (sequential, ~30 min)**
I personally (not an agent) do this, because creative direction is where genericness sneaks in:
- Pull 5 reference agency sites (think Linear's marketing site, Vercel, Mercury, Stripe, Arc browser — concrete bars to beat).
- Write `docs/audits/2026-05-11/creative-brief.md`: Velkina's signature element, what it WON'T look like, the one detail that survives the swap test.
- Self-critique: would a Romanian business owner remember this site 24 hours after seeing it? If no, redo.

**Wave 3 — Targeted Fixes (parallel, ~3 hours)**
Four agents work concurrently on the P0/P1 findings from Wave 1. Each agent's prompt is fully specified: file paths to touch, quality target, validation command, return format. No "figure out what to do."

| Agent | Likely scope (refined by Wave 1 output) | Validation |
|---|---|---|
| Frontend agent 1 | Hero + portfolio detail pages — fix layout, mobile, RO locale completeness | Screenshot evidence at 360/768/1440 for every touched page |
| Frontend agent 2 | Services pages + Customer Agent page (the one HANDOFF flagged as RO-incomplete) | RO renders no English fallback, all 9 service areas have distinct content |
| Backend/data agent | `messages/{en,tr,ro}.json` integrity — every key present in every locale, no machine-translated stiffness | Validation script: `node scripts/check-i18n.mjs` exits 0 |
| Polish agent | Motion, micro-interactions, image optimization (sharp → WebP), accessibility fixes | Lighthouse score ≥ 90 perf / 95 a11y on home + 3 sampled service pages |

**Wave 4 — Creative Distinction (sequential, ~2 hours)**
Once functional is solid, address the swap-test failure. This is the hardest part and the part I usually skip:
- One signature design element executed at craft level. Not a glow. Not a gradient. Something specific to Velkina's positioning (Turkish-Romanian software studio with editorial maturity).
- Real case studies with metrics that read like a portfolio, not a stock photo grid.
- Founder voice somewhere — a real paragraph from Nalba or Baha about why they exist, not "we are a leading agency providing innovative solutions."
- Each piece must pass the swap-test skill (A3) before commit.

**Wave 5 — Full Verification (parallel, ~1 hour)**
- Run Playwright suite that visits every page in every locale at 3 breakpoints, screenshots, diffs against Wave 4 baseline.
- Chrome DevTools MCP: record performance trace on the 5 most-trafficked routes. LCP/CLS/INP must hit targets.
- Lighthouse final pass: scores written to `docs/audits/2026-05-11/lighthouse-final.json`.
- `honest-handoff` skill writes the final HANDOFF. If any required section is empty or contradicted by evidence, the skill blocks the write.

**Wave 6 — Final HANDOFF (~30 min)**
- Single `D:/Velkina/HANDOFF.md` written via the `honest-handoff` template.
- All five hour-N checkpoints linked.
- Honest "what I did NOT verify" list.
- Three concrete recommendations for the next 5 hours (Nalba decides when).

### 2.3 Data flow

```
   [Nalba approves spec]
            │
            ▼
   ┌─ Layer A (90 min) ──────────────┐
   │ • Write 2 hooks + register      │
   │ • Build 2 skills                │
   │ • Write visual-work-discipline  │
   │ • Self-test the hooks fire      │
   └────────────────┬────────────────┘
                    ▼
   ┌─ Wave 1 (45 min, parallel) ─────┐
   │   flow + honest-state + ux      │
   └────────────────┬────────────────┘
                    ▼
   ┌─ Wave 2 (30 min, me) ───────────┐
   │   Creative brief                │
   └────────────────┬────────────────┘
                    ▼
   ┌─ Wave 3 (3h, 4 parallel) ───────┐
   │   Targeted fixes                │
   └────────────────┬────────────────┘
                    ▼
   ┌─ Wave 4 (2h, sequential) ───────┐
   │   Creative distinction          │
   └────────────────┬────────────────┘
                    ▼
   ┌─ Wave 5 (1h, parallel) ─────────┐
   │   Full verification             │
   └────────────────┬────────────────┘
                    ▼
   ┌─ Wave 6 (30 min) ───────────────┐
   │   Honest HANDOFF                │
   └─────────────────────────────────┘
```

Each wave writes its hour-checkpoint to `docs/audits/2026-05-11/hour-N.md` before the next wave starts. If the visual-evidence hook fires and blocks, the orchestrator (me) loops the wave instead of advancing.

### 2.4 Error handling

| Failure mode | Response |
|---|---|
| An agent's claim fails the visual-evidence hook | Re-dispatch with the specific evidence gap; do not advance. |
| The build breaks during a wave | Pause the wave, fix on a side branch, resume only after green. |
| An agent returns shallow output (no file:line, no screenshots) | Reject + re-dispatch with a stricter prompt template. Two rejections → I do the task myself. |
| Two consecutive failed attempts at the same fix | STOP per anti-laziness rule. Switch approach. |
| Image generation API errors | Document the error, fall back to SVG mockups (per existing Velkina memory). Do not silently swap providers. |
| I notice I am about to claim "looks good" without evidence | The swap-test skill auto-fires. I write the distinctive-vs-template paragraph or I cannot proceed. |
| Time pressure at hour 9 | The `honest-handoff` template requires me to LIST what is unfinished. Pressure does not equal cutting corners — it equals an honest list. |

### 2.5 Testing strategy

Three layers of testing, all running in CI fashion during the run:

1. **Build correctness** — `npm run build` after every wave. Must pass.
2. **Visual correctness** — Playwright suite (`tests/audit/visual.spec.ts`) navigates every locale × route × breakpoint combo. Screenshots saved. Diff against approved baselines (the Wave 1 audit shots become baselines after Wave 2 approval).
3. **Performance correctness** — Lighthouse + Chrome DevTools MCP perf trace on a fixed set of routes. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms on the 5 priority routes. Failures block the wave.

If Playwright sees a layout that differs unexpectedly between waves, the run pauses. No silent regressions.

---

## 3. Out of scope (explicit YAGNI)

These come up but stay out:

- Building a CMS for portfolio entries — Markdown + JSON is fine for now.
- Migrating to a different stack — Next.js 14 + Tailwind + next-intl stays.
- Image generation provider audit — keep generated photos that work, fall back to SVG when generation fails. No re-roll of all 24 photos.
- Backend QR menu — already noted as "intentional SaaS upsell" in HANDOFF, stays a static demo.
- New service areas beyond the 9 confirmed.
- SEO competitive analysis — separate skill (`seo-engine`) should handle this in a later run.
- Marketing email sequences for the Romania trip — separate project.
- Velkina admin dashboard — out of scope.

---

## 4. Success criteria

The run succeeds if **all** are true at hour 10:

1. **Build green.** `npm run build` passes; `npx tsc --noEmit` passes.
2. **All routes return 200** across all three locales (EN/TR/RO).
3. **Lighthouse ≥ 90 perf / 95 a11y / 95 best-practices** on home + 3 sampled service pages, on mobile profile.
4. **Visual evidence on disk.** Every Velkina page screenshotted at 360/768/1440 in `docs/audits/2026-05-11/`. Not "screenshots will be generated" — they exist.
5. **HANDOFF written via `honest-handoff` skill** with non-empty "what I did NOT verify" section.
6. **Swap test passed** for the home page and at least 3 service pages — a written paragraph per page on what is specifically Velkina here vs. a template.
7. **Operating-mode patch survives a self-test.** I deliberately trigger the visual-evidence hook on a dummy edit; it blocks me. I deliberately try to claim "looks good" without evidence; the swap-test skill fires.

Failure criteria — any one of these means the run is honestly reported as incomplete:

- Lighthouse fails the threshold on any priority page.
- An agent claim is contradicted by a screenshot.
- The HANDOFF has a section the skill could not validate.
- I hit two failed fix attempts on the same issue and do not change approach.

---

## 5. What I am explicitly committing to

- I will not claim a page "looks good" without a screenshot at the relevant viewport in the audit folder.
- I will not call the work done if the visual-debt hook is still flagging files.
- I will not write a HANDOFF that omits what I did not test.
- I will not re-use a phrasing from the existing HANDOFF that I cannot back with evidence.
- I will not silently swap approaches — every agent dispatch is logged, every reject is logged.
- I will not exceed 10 hours of clock time. At hour 10, whatever state the site is in becomes the honest HANDOFF, even if unfinished.
- At hour 5 (midpoint) I write a self-critique to `docs/audits/2026-05-11/midpoint-self-critique.md`. If I am drifting toward generic output, the critique catches it and Wave 4 gets re-planned.

---

## 6. Open questions for Nalba (before execution)

These should be resolved in the brainstorm reply, otherwise I proceed with defaults marked.

1. **Reference quality bar.** Default: Linear / Vercel / Mercury / Stripe / Arc level. Confirm or override.
2. **Velkina founder voice.** Should I write a real "why we exist" paragraph in Nalba's voice, or leave a `{{NALBA_VOICE}}` placeholder for you to fill? Default: leave the placeholder, do not invent your voice.
3. **Romanian copy quality.** Default: I'll use the existing translations + tighten obvious stiffness. I will NOT machine-translate new content I generate — anything new will be EN-first and flagged for human RO pass. Confirm or override.
4. **The customer-agent page.** HANDOFF noted RO fallback. Default: bring it to full RO parity since it's part of the demonstrable product range.
5. **Image regeneration budget.** Default: zero new image generation; only sharp → WebP optimization of existing photos. Confirm if you want me to spend image-gen credits.

---

## 7. References

- [What's new in Claude Opus 4.7](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7) — 1M context, new tokenizer, high-res images
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide) — PostToolUse, Stop, block:true contract
- [Create custom subagents](https://code.claude.com/docs/en/sub-agents) — orchestrator-subagent model, up to 20 parallel
- [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — progressive disclosure architecture
- [Chrome DevTools MCP vs Playwright MCP](https://stevekinney.com/writing/driving-vs-debugging-the-browser) — DevTools for diagnostics, Playwright for interaction
- [Code with Claude 2026 features](https://www.mindstudio.ai/blog/code-with-claude-2026-new-agent-features) — multi-agent orchestration patterns

---

**End of spec. Awaiting Nalba's approval before execution.**
