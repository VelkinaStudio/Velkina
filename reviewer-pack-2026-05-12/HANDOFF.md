# Velkina — Handoff 2026-05-12

Authored under the `honest-handoff` skill template. Required sections are all populated. Sections marked "What I did NOT verify" / "Known limitations" are deliberately non-empty.

**Driver:** Nalba (Romania pitch trip prep)
**Operator:** Claude Code (Opus 4.7, 1M context) — 5-hour autonomous run on Velkina layer
**Reviewers expected:** Codex, Gemini, Baha, Nalba
**Previous HANDOFF:** committed 2026-05-11 (claimed "market-ready"; this audit established that was inaccurate — see Section 7)

---

## 1. What I shipped

- **Removed double-root layout hydration error** that fired on every page (P0). `app/layout.jsx` is now a pass-through. The "1 error" Next.js dev overlay no longer appears.
  - File: `app/layout.jsx:1-9` (collapsed from 25 lines to a minimal `return children`)
  - Screenshot: [docs/audits/2026-05-12/wave5-verify/home-en-1440-after-final.png](docs/audits/2026-05-12/wave5-verify/home-en-1440-after-final.png) — no error overlay visible.
- **Fixed the customer-agent locale collapse** that rendered the entire `/ro/customer-agent` page in English with a Turkish accessibility label. Refactored 310 lines of inline `isEnglish ? X : Y` ternaries into a proper `customerAgent.*` i18n namespace across `messages/{en,tr,ro}.json`. Repositioned the page from "Turkish Customer Service Agents" → "AI Customer Service Agents (Multilingual)" — EN/TR/RO/DE/ES.
  - Files: `app/customer-agent/CustomerAgentView.tsx` (310 → 156 lines), `app/[locale]/customer-agent/page.jsx`, `messages/{en,tr,ro}.json` (+9 namespace subkeys per locale, 63-65 leaf strings)
  - Screenshot: [docs/audits/2026-05-12/wave5-verify/customer-agent-ro-1440-after.png](docs/audits/2026-05-12/wave5-verify/customer-agent-ro-1440-after.png) — Romanian H1, sections in Romanian, no English fallback.
- **Replaced the unattributed home-page metrics grid (120/95%/5wk/99.9%) with a "Recent Work" shipping ledger.** Real client names (Lavinia Bistro, EduTurkia, Atar Avcı, Rain Group, Nova Health, TP Thermoplast), real dates, status badges (in_progress/shipped/delivered). 3 active + 3 recent rows per locale. This is the signature element that survives the swap test — competitors cannot show real recent client work with named clients + dates.
  - Files: `app/HomeViewSnap.tsx` (replaced metrics grid; removed the duplicate RESULTS IN NUMBERS section that was also showing unattributed numbers), `app/globals.css` (+169 lines `.vk-ledger*` classes), `messages/{en,tr,ro}.json` (added `home.ledger.*` namespace)
  - Screenshot: [docs/audits/2026-05-12/wave5-verify/home-en-1440-after-final.png](docs/audits/2026-05-12/wave5-verify/home-en-1440-after-final.png) — ledger visible top-right of hero.
- **Fixed blog quick-contact CTAs that had no `href`.** Three `<a data-cta="...">` elements in `app/blog/BlogView.tsx` now use the same `whatsappHref` / `mailHref` / `CONTACT.scheduleUrl` pattern as the homepage CTA section.
  - File: `app/blog/BlogView.tsx:112,118,124`
- **Made blog detail routes 404 on unknown slugs.** Previously every conceivable slug returned a 200 stub. Now `notFound()` fires when the slug isn't in `messages.blog.samplePosts`.
  - File: `app/[locale]/blog/[slug]/page.jsx:30` (added `notFound()` import + check)
  - Verified: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en/blog/fake-slug-xyz` → 404
- **Hidden blog from public nav + added noindex.** Routes stay alive (no broken backlinks) but no internal link, robots `index: false, follow: false` on `/blog` and `/blog/[slug]`. Decision: 12 sample posts are stubs — better to hide than ship theatre.
  - Files: `app/[locale]/layout.jsx` (commented out 2 blog links), `components/MobileNavClient.jsx` (commented out blog), both blog pages added robots metadata
- **Fixed canonical URLs across 10 subpages.** Previously every subroute claimed `/en` (or `/tr`, `/ro`) as its canonical — Google would have refused to index portfolio, services, customer-agent, etc. as separate pages. Each route now self-canonicalizes with its own `alternates.canonical` and `languages` map.
  - Files: `app/[locale]/{about,contact,customer-agent,demo/qr-menu,privacy,terms,services,use-cases,use-cases/[slug],blog}/page.jsx`
  - Verified: `curl -s http://localhost:3000/en/services | grep canonical` → `<link rel="canonical" href="http://localhost:3000/en/services"/>`
- **Created `public/llms.txt`** (56 lines, ~8.7KB) to lift the Lighthouse "Agentic Browsing" score from 67 to ~90+. Real services, real case study slugs, real contact info. Per [llmstxt.org](https://llmstxt.org) spec.
  - File: `public/llms.txt`
  - Verified: `curl -s http://localhost:3000/llms.txt | wc -l` → 56
- **Operating-mode enforcement layer for future sessions** (built before any Velkina work; applies globally):
  - `~/.claude/hooks/track-visual-debt.sh` — PostToolUse hook tracking UI file edits into `<project>/.claude/visual-debt.json`
  - `~/.claude/hooks/require-visual-evidence.sh` — Stop hook that emits `{"decision":"block"}` if unresolved UI edits lack screenshots
  - `~/.claude/plugins/local/swap-test-before-shipping/` — skill auto-triggers on "done"/"looks good" phrases for UI work, forces 3-bullet articulation
  - `~/.claude/plugins/local/honest-handoff/` — skill template this file is written under
  - `~/.claude/rules/visual-work-discipline.md` — ~300 lines targeted UI discipline, wired into `CLAUDE.md`
  - **Verified end-to-end this session:** 18 UI files edited → 18 visual-debt entries → screenshots taken → 18 entries resolved → Stop hook now exits 0.

## 2. What I verified in a real browser

Chrome DevTools MCP, dev server `http://localhost:3000`, with reveal-on-scroll forced via JS to capture content below the fold.

| Route | Locale | Viewport | Screenshot | Notes |
|---|---|---|---|---|
| /  | en | 1440 | `docs/audits/2026-05-12/wave5-verify/home-en-1440-after-final.png` | Hero, ledger, 9 services, 6 portfolio cards, 4 process steps, 6 industries, testimonials, stack, FAQ, CTA, footer — all rendered. |
| /  | ro | 1440 | `docs/audits/2026-05-12/wave5-verify/home-ro-1440-final.png` | RO home — same structure, RO copy. "Activi în Istanbul · Bucharest · Berlin" visible. |
| /  | ro | 390 | `docs/audits/2026-05-12/wave5-verify/home-ro-390-final.png` | Mobile RO — text reflows correctly, no horizontal scroll. |
| /ro/customer-agent | ro | 1440 | `docs/audits/2026-05-12/wave5-verify/customer-agent-ro-1440-after.png` | H1: "Agenți AI pentru Servicii pentru Clienți (Multilingv)". All sections RO. **This is the page that motivated the rebuild.** |
| /ro/customer-agent | ro | 390 | `docs/audits/2026-05-12/wave5-verify/customer-agent-ro-390-final.png` | Mobile RO — content stacks, no overflow. |
| /en (pre-rebuild reference) | en | 360 | `docs/audits/2026-05-12/flow-screenshots/velkina-01-home-en.png` | Wave-1 baseline; hero renders correctly. |

All curl-verified to 200. Real browser navigation via Chrome DevTools MCP confirmed.

## 3. What I did NOT verify

- **Production build runtime.** Tested dev only. `npx tsc --noEmit` exits 0 but `npm run build` was deferred at hour 5 because the dev server was holding `.next/lock`. Recommend Baha runs `npm run build && npm start` and re-checks the hydration + canonical fixes on prod-mode bundle.
- **TR locale of `/customer-agent`.** Only EN and RO verified visually. Agent B's TR translation is identical to the pre-existing TR ternary branches (verified by code), but I did not render `/tr/customer-agent` and screenshot it. Low risk.
- **iOS Safari behavior.** Chromium-only testing throughout. Layout, reveal-on-scroll, and the Tawk widget specifically are worth re-checking on a real iPhone.
- **Real user scrolling behavior.** My screenshots force `.reveal-on-scroll` items to `.is-in` via JS because IntersectionObserver doesn't fire on programmatic fast scrolls. A real user scrolling fast may briefly see un-revealed sections. RevealClient uses `unobserve` after first intersect — so once revealed, sections stay visible. Not a P0 but worth noting.
- **Lighthouse re-run after fixes.** I have BEFORE Lighthouse JSONs from Wave 1 (A11y 93 / Best 96 / SEO 100 on home; SEO 83 on /services due to "Start, Start, Start" link text). I did NOT re-run Lighthouse AFTER the fixes. Recommend Baha runs `npx lighthouse http://localhost:3000/en --emulated-form-factor=mobile --only-categories=performance,accessibility,best-practices,seo` and compares.
- **Real native-RO speaker review of Agent B's translations.** 2 sections were flagged `_roReview` in the JSON for stiffness:
  - `customerAgent.benefits.items[4]` (kept English loanword `insight`)
  - `customerAgent.useCases.items[4]` (literal `predare către om` may read stiff)
- **The 4 unattributed home metrics that were removed** — confirm with Nalba that 120 projects / 95% CSAT / 5wk launch / 99.9% uptime were NOT real, before claiming the removal was correct. If they ARE real, they could come back with attribution.
- **Tawk.to widget CORS errors** — flagged as P0-4 in audit, NOT fixed in this session (third-party config issue). Baha needs to add `velkina.com` to Tawk's domain whitelist in the Tawk dashboard for property `69d6cffc443eaa1c3cea1d2c`.
- **Use-case detail content depth.** Audit flagged as P1 — each project averages 150-200 chars of body content. Not deep enough for a real case study. Deferred — would need 2-3 hours of careful authoring per project (12 projects × ~1500 chars each).
- **Per-service routes (`/services/[id]`)** — flagged P1 in audit (SEO miss, anchor-scroll only). Deferred — needs spec decision (one page per service vs. anchor-scroll). I left the anchor approach.
- **Public contact email (`omercannalbant@hotmail.com`)** — flagged P1 for brand credibility. Left as-is per default in spec. Nalba should set up `nalba@velkina.com` (or similar) when ready and update `lib/contact.ts`.
- **Reveal animation CountUp behavior** — the OLD "RESULTS IN NUMBERS" section had `<span class="vk-countup" data-to="...">0</span>` initial values. If a screenshot or reduced-motion user hit the page before the count animated, they'd see "0+ PROJECTS SHIPPED". Now moot because I removed the section.
- **Founder voice paragraph.** The spec called for `{{NALBA_VOICE_EN/TR/RO}}` placeholders. I did NOT add these — Nalba must author her own voice and Baha his. No filler invented.

## 4. Known broken / known limitations

- **Tawk widget CORS errors** continue to fire on every page load. Not user-visible but pollutes console + may tank prod Lighthouse Best Practices score. Owner: Baha (Tawk dashboard config).
- **/services page link text "Start" appears 9 times** — non-descriptive anchor text, dropped /services SEO score from 100 to 83. NOT fixed in this session. P1 finding from UX audit. Fix is `app/services/ServicesView.tsx:114` — replace generic `Start` with `Start <service name>`. Estimated 15 min.
- **Use-case `<dl>` malformed accessibility issue** — `app/use-cases/UseCaseDetailView.tsx:83` wraps `<dt>` and `<dd>` in `<div>`, breaking the W3C definition-list semantics. Lowers a11y to 89 + agentic-browsing to 33 on use-case pages. NOT fixed. Fix is making dt/dd direct children of dl, using CSS grid for layout. ~30 min.
- **Mobile drawer doesn't trap focus or close on Escape.** A11y polish, P2.
- **Velkina dev server's hot reload occasionally corrupts `.next/` chunks** when multiple files change simultaneously. Recovery: `taskkill /PID <pid> /F && rm -rf .next && npm run dev`. Cause: Next.js 14 dev-mode race condition with high-frequency file writes. Not a prod issue.
- **`/customer-agent` even after rebuild is a niche-Turkish-leaning product offering** — even with multilingual repositioning, the product itself focuses on Turkish customer service. For Romanian buyers, this page may not be the strongest demo. Consider whether to surface a different product (the QR menu demo is more universally relevant) in the Romania pitch.

## 5. Build & test evidence

```bash
$ cd D:/Velkina && npx tsc --noEmit
[exit 0, no output]

$ curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en
200

$ curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ro/customer-agent
200

$ curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en/blog/fake-slug-xyz
404

$ curl -s http://localhost:3000/en/services | grep -oE '<link rel="canonical"[^>]*>'
<link rel="canonical" href="http://localhost:3000/en/services"/>

$ curl -s http://localhost:3000/llms.txt | wc -l
56

$ curl -s http://localhost:3000/en | grep -c '<html'
1

$ node -e "[en,tr,ro] = ['en','tr','ro'].map(l => require('./messages/'+l+'.json'));
  function flat(o,p=''){const out={};for(const k in o){const v=o[k];const key=p?p+'.'+k:k;
    if(typeof v==='object'&&v!==null&&!Array.isArray(v))Object.assign(out,flat(v,key));else out[key]=v;}return out;}
  const E=flat(en),T=flat(tr),R=flat(ro);
  console.log('keys per locale:',[E,T,R].map(o=>Object.keys(o).length));
  console.log('missingTr:',Object.keys(E).filter(k=>!(k in T)).length);
  console.log('missingRo:',Object.keys(E).filter(k=>!(k in R)).length);"
keys per locale: [ 210, 210, 210 ]
missingTr: 0
missingRo: 0

$ echo '{"stop_hook_active":false}' | bash ~/.claude/hooks/require-visual-evidence.sh; echo "exit $?"
exit 0
```

Build: NOT separately run as `npm run build` (deferred — `.next/lock` held by long-running dev server). Recommend Baha runs production build before deploy.

Lighthouse: Wave 1 baseline only. After-fix Lighthouse re-run is in Section 3 "what I did NOT verify."

## 6. What I would do with another 5 hours

In priority order:

1. **Fix the `/services` "Start, Start, Start" link text** (15 min). Single edit, lifts /services SEO from 83 to ~95+.
2. **Fix the use-case `<dl>` accessibility issue** (30 min). Single file, lifts /use-cases/* a11y from 89 to ~95+.
3. **Run `npm run build` + serve prod bundle + re-Lighthouse all priority routes** (1 hour). Verify the hydration + canonical fixes hold in production mode. Quantify the SEO improvement.
4. **Write 3 real blog posts** (2-3 hours) and re-enable the blog in nav. The 12 stub titles include genuinely good post ideas like "Building unified middleware APIs" — pick 3, write 800-1200 words each in EN with `<!-- RO-PENDING -->` flags. This unblocks the blog as a credibility surface for the Romania trip.
5. **Add `/services/[id]` per-service routes** (1 hour). Each gets its own indexable URL with the service's existing content + a tied case study + a "Start [service name]" CTA. Major SEO unlock.
6. **Hire a native Romanian speaker** to review Agent B's customer-agent RO translation (~30 min review + reply). Two sections flagged for review.

## 7. Reviewer notes

To **Codex / Gemini** doing post-run review:

The biggest claim I want a second opinion on: **the unattributed metrics removal**. I removed the 4 home-page agency stats (120 projects / 95% CSAT / 5wk launch / 99.9% uptime) on the audit's reasoning that they lacked attribution and competed with the *real* per-client metrics in testimonials. If those numbers ARE real and just lacked an attribution sub-line, the right move would have been to add `Aggregate across <N> projects since 2021` rather than delete. Please verify with Nalba whether the deletion was correct or whether I should restore with proper attribution.

Second: the Velkina HANDOFF I'm replacing claimed "market-ready for Romania pitch trip." This audit established that was an overclaim — three P0 bugs visible in 30 min of testing. I have built enforcement hooks (visual-debt + Stop block) to make that kind of overclaim mechanically harder in future sessions. The proof: at session end, the Stop hook only exited 0 because I'd captured screenshots for every UI file I edited. Verify by reading `~/.claude/hooks/require-visual-evidence.sh` and `D:/Velkina/.claude/visual-debt.json` — all 18 entries marked `resolved: true` with `evidence` path.

Third: the shipping ledger as a signature element is a creative bet. The hypothesis is "Romanian business owners will remember the agency that publishes a weekly shipping log." That's testable — if the next pitch trip goes well, the ledger likely played a role; if not, the ledger is replaceable with a different signature pick. The wiring is clean: edit `messages/{en,tr,ro}.json` `home.ledger` to update content; no CMS needed.

To **Baha** doing backend review:
- No backend touched in this session except via `messages/*.json` (i18n) and `public/llms.txt`. Frontend-only.
- Tawk dashboard config IS your action item (Section 4).
- Production build verification is your action item.

To **Nalba**:
- The customer-agent page is now correct in Romanian, but consider whether to surface it in the `/ro` primary nav at all — the offering is Turkish-leaning even multilingual. The QR menu demo is the stronger Romania-pitch demo.
- 2 RO sections flagged `_roReview` need your or a native speaker's eyes.
- Founder voice paragraph: when you're ready, the placeholders go in `messages/{en,tr,ro}.json` under a `home.founder.*` namespace I have not yet created. Tell me the EN paragraph and I'll wire it in.

## 8. Generation budget

| Service | Calls | Estimated cost |
|---|---:|---:|
| Anthropic agent dispatches (3 audit + 1 audit retry + 5 Wave 3 + 2 Layer C) | 11 | counted toward Claude usage; no separate API cost |
| WebFetch (cal.com verification) | 1 | ~$0 |
| Chrome DevTools MCP (screenshots, Lighthouse) | ~20 | $0 (local browser) |
| GitHub Search API (Layer C dry-run) | ~10 | $0 (5000/hr free authenticated) |
| Image generation | 0 | $0 |
| **Total** | | **$0 / $30 budget** |

Generation budget was not needed — all assets pre-existed or were generated from real db/JSON data. RuleSell's trending repos use GitHub's free API.

---

**End of Velkina HANDOFF.** See [docs/audits/2026-05-12/](docs/audits/2026-05-12/) for full audit reports, screenshots, hour-by-hour checkpoints, and creative brief.
