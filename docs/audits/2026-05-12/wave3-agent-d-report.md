# Wave 3 Agent D — Blog nav removal — 2026-05-12

## What I changed

- **`app/[locale]/layout.jsx` line 100-101**: commented out desktop nav Blog `<Link>`. Route still alive at `/[locale]/blog`. Added an inline note explaining why.
- **`app/[locale]/layout.jsx` line 131-133**: also commented out the footer Quick Links Blog entry. The task said "no internal links" — leaving the footer link would have contradicted the goal. Footer Quick Links now: Home / Services / Use Cases.
- **`components/MobileNavClient.jsx` line 28-29**: commented out the Blog entry in the `links` array used by the mobile drawer.
- **`app/[locale]/blog/page.jsx` line 18**: added `robots: { index: false, follow: false }` to the existing `generateMetadata` export.
- **`app/[locale]/blog/[slug]/page.jsx` line 23**: added `robots: { index: false, follow: false }` to the existing `generateMetadata` return.

Comments were preferred over deletion so a future "blog launch" can restore the four lines without re-deriving the structure.

## Validation

### Grep for residual blog links in nav files

```
$ grep -nE "href.*blog|to.*blog" app/[locale]/layout.jsx components/MobileNavClient.jsx
app/[locale]/layout.jsx:101:                {/* <Link href={`/${locale}/blog`} className="text-white/80 hover:text-vkcyan">{t.blog}</Link> */}
app/[locale]/layout.jsx:133:                {/* <li><Link href={`/${locale}/blog`} className="hover:text-vkcyan">{messages.nav?.blog}</Link></li> */}
components/MobileNavClient.jsx:29:    // { href: `/${locale}/blog`, label: labels?.blog ?? 'Blog' },
```

All three remaining hits are inside JS comments — they are not emitted to the DOM. No live blog links in nav or footer.

### Grep for robots metadata

```
$ grep -nE "robots" app/[locale]/blog/**/*.jsx app/[locale]/blog/*.jsx
app/[locale]/blog/page.jsx:18:    robots: { index: false, follow: false }
app/[locale]/blog/[slug]/page.jsx:23:  ... robots: { index: false, follow: false } ...
```

Both blog pages now declare `robots: { index: false, follow: false }`. Next.js converts this to `<meta name="robots" content="noindex,nofollow">` at render time.

### Routes still alive

Both `app/[locale]/blog/page.jsx` and `app/[locale]/blog/[slug]/page.jsx` retain their default exports and `generateStaticParams` (where present). No file deleted. Hitting `/en/blog` directly should still 200 with the BlogView component, just with a `noindex` header.

A live HTTP probe (curl) was not run because no dev server is up in this agent shell. The static analysis above is sufficient evidence — no JSX `<Link href={...blog}>` is reachable from `<header>` or `<footer>` rendering paths.

## What I did NOT do

- Did not delete the blog route files. Both `blog/page.jsx` and `blog/[slug]/page.jsx` remain functional and statically generated for `en`, `tr`, `ro`.
- Did not modify `messages/*.json` blog entries. Translations remain available for when blog is restored.
- Did not touch sitemap/robots.txt. If the project has a generated sitemap that enumerates blog routes, it may still emit them — but the per-page `robots` meta will prevent indexing. (Out of scope; flagged for follow-up if a sitemap exists.)
- Did not run a build or live HTTP probe — no dev server / no `npm run build` was executed in this agent session.

## Conflict notes

No conflict with Agent A. At the moment I read `app/[locale]/blog/[slug]/page.jsx`, the `generateMetadata` export was intact and did not contain a `notFound()` call. I added the `robots` field on the existing `return { title, description }` line at L23. If Agent A subsequently rewrites that file or moves the metadata export, this edit may need to be re-applied; but the Edit succeeded cleanly without retry.
