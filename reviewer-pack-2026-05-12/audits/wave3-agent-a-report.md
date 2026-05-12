# Wave 3 Agent A — Structural fixes — 2026-05-12

## Fixes attempted

| # | Status | File | Lines changed | Validation |
|---|---|---|---|---|
| P0-1 | done | `app/layout.jsx` | 17-25 → 17-19 (8 lines deleted, 1 added) | `grep -oE '<html' \| wc -l` went 2 → 1 |
| P0-3 | done | `app/blog/BlogView.tsx` | imports +1, body +1, 3 anchors expanded with href props | curl shows all 3 CTAs render with proper hrefs |
| P0-4 | done | `app/[locale]/blog/[slug]/page.jsx` | +1 import (notFound), +1 guard line | fake slug returns 404 (was 200) |
| P1-7 | done | `app/[locale]/blog/[slug]/page.jsx` | 1 line — Turkish fallback removed | EN/RO real-slug pages show locale-correct meta desc, 0 hits for 'içgörüler' |

## Validation evidence

### Fix 1 — Double-root layout

Baseline (raw curl `<html` count was misleading via `grep -c` because `<html` appears mid-line; `grep -oE` is the correct measurement):
```
$ curl -s http://localhost:3000/en | grep -oE '<html' | wc -l
2
$ curl -s http://localhost:3000/en | grep -oE '<body' | wc -l
2
$ curl -s http://localhost:3000/en | grep -oE '<html[^>]*>'
<html lang="en">
<html lang="en" class="__variable_1b85de __variable_e86977">
```

After fix:
```
$ curl -s http://localhost:3000/en | grep -oE '<html' | wc -l
1
$ curl -s http://localhost:3000/en | grep -oE '<body' | wc -l
1
$ curl -s http://localhost:3000/ro | grep -oE '<html' | wc -l
1
```

Change applied to `app/layout.jsx`: the previously wrapping `<html><body><main>` element tree replaced with `return children`. The root layout retains its `metadata` and `viewport` exports unchanged.

### Fix 2 — Blog quick-contact CTAs

Baseline (file source):
```
112:            <a data-cta="whatsapp" className="...">
118:            <a data-cta="email" className="...">
124:            <a data-cta="schedule" className="...">
```
No `href` attribute on any of the three.

After fix (rendered HTML on `/en/blog`):
```
data-cta="whatsapp" href="https://wa.me/905323360051?text=Hi%20Velkina!%20I&#x27;d%20like%20to%20talk%20about%20a%20project."
data-cta="email" href="mailto:omercannalbant@hotmail.com?subject=Project%20inquiry"
data-cta="schedule" href="https://cal.com/velkina"
```

`target="_blank"` + `rel="noopener noreferrer"` added to whatsapp and schedule (matches `HomeViewSnap.tsx:411-425` pattern). Email opens default mail client so no `target` needed. Imports added: `import {CONTACT, mailHref, whatsappHref} from '../../lib/contact';`. `common` now read from `t('common')` (line added after `const t = createT(...)`).

### Fix 3 — Blog detail 404

Baseline:
```
$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en/blog/this-is-a-fake-slug-test-xyz
200
```

After fix:
```
$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en/blog/this-is-a-fake-slug-test-xyz
404
$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/ro/blog/fake-test-slug-xyz
404
$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en/blog/building-unified-middleware-apis
200   (real EN slug still renders)
$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/ro/blog/construirea-de-api-uri-unificate-de-middleware
200   (real RO slug still renders)
```

`import { notFound } from 'next/navigation';` added at top of file. `if (!match) notFound();` placed right after the slug-match lookup in the page function (mirrors `app/[locale]/use-cases/[slug]/page.jsx:37`).

Build pivot side-effect: `/[locale]/blog/[slug]` becomes `ƒ` (dynamic) in the build manifest instead of statically generated. That is the expected SSR-gate pattern from `~/.claude/rules/deep-agent-discipline.md` review-agent section — server-side `notFound()` returns a real 404 to crawlers, not a 200 HTML shell.

### Fix 4 — Turkish desc leak to EN/RO

Baseline line 22 (after another agent already replaced literal Turkish with `messages.blog?.metaDesc || 'Velkina...'`, but the Turkish hardcoded fallback was still the final defence):
```js
const desc = match?.desc || (messages.blog?.metaDesc || 'Velkina'dan içgörüler, pratik rehberler ve mühendislik notları.');
```

After fix:
```js
const desc = match?.desc || messages.blog?.metaDesc || '';
```

Validated (note: fake slugs now 404, so test on real slugs; verified the meta tag — not "no Turkish anywhere" because per-locale `blog.metaDesc` is correct in `messages/{en,tr,ro}.json` already):
```
$ curl -s http://localhost:3000/en/blog/building-unified-middleware-apis | grep -oE '<meta name="description"[^>]*>'
<meta name="description" content="Patterns for API hubs that scale, observe and endure."/>

$ curl -s http://localhost:3000/ro/blog/construirea-de-api-uri-unificate-de-middleware | grep -oE '<meta name="description"[^>]*>'
<meta name="description" content="Pattern-uri pentru hub-uri de API care scalează, se observă și rezistă."/>

$ curl -s http://localhost:3000/en/blog/building-unified-middleware-apis | grep -c 'içgörüler'
0
```

`blog.metaDesc` confirmed present in all three message files at line 286 — no JSON edits were needed.

## Files touched

- `D:/Velkina/app/layout.jsx` — 8 lines deleted, 1 line added (pass-through now)
- `D:/Velkina/app/blog/BlogView.tsx` — 1 import line + 1 `common` assignment + 3 anchor tags expanded (whatsapp/email/schedule)
- `D:/Velkina/app/[locale]/blog/[slug]/page.jsx` — 1 import line (`notFound`) + 1 guard line (`if (!match) notFound();`) + 1 line modified in `generateMetadata` (Turkish fallback removed)

Total: 3 files touched. None outside the allowed list.

## Build status

`npm run build` output last lines (after clearing `.next` cache which had a stale `/robots.txt` module manifest):

```
├ ƒ /[locale]/blog/[slug]                   152 B          87.4 kB
├ ● /[locale]/contact                       180 B          96.1 kB
[... all routes listed ...]
├ ○ /robots.txt                             0 B                0 B
└ ○ /sitemap.xml                            0 B                0 B
+ First Load JS shared by all               87.2 kB
ƒ Middleware                                39.3 kB
```

Exit code 0. The build initially failed once with `PageNotFoundError: Cannot find module for page: /robots.txt` — this was a stale `.next` cache from an earlier build (predating my edits). `rm -rf .next && npm run build` resolved it. Reproducible by running build again now.

`npx tsc --noEmit` exits 0 silently (no errors, no warnings).

## What I did NOT change

- Did NOT edit `app/[locale]/layout.jsx` — its structure was correct (it should emit `<html><body>` per next-intl convention).
- Did NOT touch the `L.soon` default in the blog detail body sections. With Fix 3, `!match` now triggers `notFound()` BEFORE reaching that fallback, so it is dead-code-ish but defensive. Removing it adds risk for zero benefit.
- Did NOT add a new `blog.metaDesc` key — it already existed in all three locale JSONs at line 286.
- Did NOT touch `messages/*.json` — Fix 4 was achievable without JSON edits.
- Did NOT touch `app/[locale]/blog/page.jsx` (server wrapper) — only the slug detail page needed changes.
- Did NOT investigate whether `app/[locale]/blog/[slug]/page.jsx` had a recent edit by a sibling agent. Noticed on re-read that line 23 already had `robots: { index: false, follow: false }` added since my first read — assumed it was a deliberate prior edit; left it untouched.
- Did NOT take screenshots (per orchestrator instructions).
- Did NOT run Lighthouse / a11y checks (out of scope for this agent's structural-fix mandate).

## Notes for orchestrator

1. **Stale `.next` cache risk:** if another agent runs `npm run build` and hits the `/robots.txt` `PageNotFoundError`, the fix is `rm -rf .next && npm run build`. It is not caused by my edits.
2. **`/[locale]/blog/[slug]` is now dynamic (`ƒ`).** Expected. `notFound()` makes statically pre-rendered 200 shells impossible — which was the point of P0-4.
3. **All four fixes were independently verifiable.** Each had a baseline measurement before and a post-fix measurement that closed the loop.

## Agent self-improvement proposal

- **Worked well:** measuring `<html` count with `grep -oE '<html' | wc -l` (substring occurrences) instead of `grep -c '<html'` (matching-lines count). The audit's prescribed validation command would have produced a misleading "1" because the second `<html>` was mid-line in compacted SSR output. Correct token-counting probe for inline HTML: `grep -oE` not `grep -c`.
- **Anti-pattern:** trusting first `grep -c` result. Two-step verification (count matching lines AND inspect the actual matches with `grep -oE`) caught the misleading baseline before I incorrectly closed Fix 1.
