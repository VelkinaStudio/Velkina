# Wave 3 Agent E — llms.txt — 2026-05-12

## File created

- `D:/Velkina/public/llms.txt` (56 lines, 8,767 bytes)

Structure follows the [llmstxt.org](https://llmstxt.org) spec exactly: H1 site name, blockquote summary, prose context paragraph, then four H2 sections — `## Services` (10 entries), `## Case studies` (12 entries, one per real portfolio project), `## Contact`, and `## Optional` (locale variants + key routes + legal pages). Every link is a real route in `app/[locale]/`.

## Source data verification

- **Service slugs** sourced from `D:/Velkina/messages/en.json` `services.items[].id` — lines 213-302. All 10 service IDs confirmed verbatim: `websites`, `shopify`, `qr-menu`, `google-ads`, `meta-ads`, `cloud`, `ai-automation`, `mobile`, `seo`, `branding`. These map to `#<id>` anchors on `/[locale]/services` per `D:/Velkina/app/services/ServicesView.tsx:94` (`<article id={s.id}>`).
- **Case study slugs** sourced from `D:/Velkina/messages/en.json` `useCases.projects.items[].slug` — lines 374-645. All 12 project slugs confirmed verbatim and mapped to `/[locale]/use-cases/[slug]` per `D:/Velkina/app/[locale]/use-cases/[slug]/`. Intro/result wording in each bullet is a faithful condensation of the project's own `intro` + `result` + standout `highlights` from the JSON — nothing invented.
- **Contact details** sourced from `D:/Velkina/lib/contact.ts:1-7`: `omercannalbant@hotmail.com`, `+90 532 336 00 51`, WhatsApp `https://wa.me/905323360051`, schedule `https://cal.com/velkina`.
- **URL base** assumed: `https://www.velkina.com`. `D:/Velkina/app/sitemap.js:2` reads `process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'` — production is www.velkina.com per the existing internal QR-menu link at `D:/Velkina/app/demo/qr-menu/QrMenuView.tsx:582` and the public domain referenced in `D:/Velkina/docs/superpowers/specs/2026-04-09-velkina-contact-fix-design.md:9`. The canonical llms.txt should use the production absolute URL, not the dev fallback.
- **Locales** confirmed from `D:/Velkina/app/sitemap.js:4` — `['en', 'tr', 'ro']`. The "Optional" section lists all three locale homepages so crawlers know the multilingual surface; per llmstxt.org spec, only one canonical English llms.txt is published.

## Validation

```
$ curl -s -o /tmp/llms-probe.txt -w "HTTP %{http_code} | bytes %{size_download}\n" http://localhost:3000/llms.txt
HTTP 200 | bytes 8767

$ wc -l /tmp/llms-probe.txt
56 /tmp/llms-probe.txt
```

`curl -s http://localhost:3000/llms.txt | head -5`:

```
# Velkina

> Velkina is a Turkish-Romanian software, design and growth agency building websites, e-commerce, AI customer agents, cloud infrastructure, mobile apps and restaurant QR menus for businesses across İstanbul, Bucharest and Berlin. One senior team across software, design and growth. Trilingual delivery (EN / TR / RO), no handover to juniors after signing, code and accounts stay in the client's name.

Velkina operates as a fixed-scope project shop, sprint partner or monthly retainer. Weekly demos with real preview links, honest scope, honest pricing, honest timelines. Common engagements pair a website or store with the Google or Meta ads that run on top of it, so one team is accountable for both build and growth.
```

Next.js serves `/public/*` statically — no rebuild needed. The dev server returned 200 with the exact file contents.

## What I did NOT do

- Did not commit
- Did not run lighthouse re-audit (orchestrator's job in Wave 5)
- Did not generate TR / RO versions of llms.txt (one canonical English version, per spec — locale homepages are listed in the Optional section instead)
- Did not touch any file other than `D:/Velkina/public/llms.txt` and this report
- Did not modify `messages/*.json`, `app/sitemap.js`, or any route file
