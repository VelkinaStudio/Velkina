# Velkina — Contact Info Fix, Tawk.to Chat, and Audit Cleanup

**Date:** 2026-04-09
**Status:** Approved
**Scope:** Fix broken contact CTAs site-wide, add Tawk.to live chat, clean up dead routes and i18n keys uncovered during audit.

## Background

Audit of `https://www.velkina.com/en` and the local codebase (Next.js 14 App Router, bilingual TR/EN via `next-intl`) surfaced the following user-facing bugs:

1. Contact page WhatsApp and "Schedule a call" buttons render `href="#"` — dead clicks. (`app/contact/ContactView.tsx:27,31`)
2. Home hero and CTA sections use `<a data-cta="whatsapp|email|schedule">` elements that are rewritten at runtime by `components/GlobalClient.jsx:38-51`. That block reads `window.VELK_CONTACT.whatsapp` / `.schedule` — but `VELK_CONTACT` is **never defined anywhere in the repo**. Result: WhatsApp buttons silently fall back to `/#contact`, Schedule buttons fall back to a hard-coded `https://calendly.com/velkina/intro-call` that is not a real Calendly URL.
3. `app/customer-agent/CustomerAgentView.tsx:296` hard-codes a placeholder WhatsApp number `905555555555` — looks functional, goes nowhere.
4. No `tel:` link exists anywhere in the site, and no phone number is rendered on any page.
5. Email address is inconsistent: footer, contact page, and privacy policy use `hello@velkina.com`; Customer Agent page uses `info@velkina.com`.

Additional audit findings (not user-blocking but worth cleaning up in the same pass):

6. Six stale non-locale route duplicates (`app/contact/page.jsx`, `app/about/page.jsx`, `app/blog/page.tsx`, `app/customer-agent/page.jsx`, `app/privacy/page.jsx`, `app/services/page.tsx`). `middleware.ts` always redirects non-prefixed paths to `/en/...` or `/tr/...`, so these never serve in production, but they still build into every deploy. `app/contact/page.jsx` additionally hard-codes Turkish by importing `tr.json` directly, which would be a latent bug if middleware behavior ever changed.
7. `messages/en.json` contains 21 orphaned keys from a previously-removed "Why" section (commit `5629be4`): all of `home.why.*`, `home.metrics2.*.value` / `.decimals`, and `home.techCarouselLabel`.
8. `messages/en.json` AND `messages/tr.json` both contain dead keys `nav.why`, `nav.tech`, and `homeSimple.*` that no component references.

User has also requested:

9. Add a Tawk.to live chat widget using property `69d6cffc443eaa1c3cea1d2c` and widget `1jlnhosg4`.

Build verification at the start of this work: `npm run build` passes cleanly (29 pages generated, Next.js 14.2.32, zero warnings, zero TypeScript errors).

## Goals

- Every "Contact" / "WhatsApp" / "Phone" / "Schedule a call" / "Email" affordance on the site resolves to a real, working link, rendered server-side so it is crawlable and functional without JavaScript.
- Contact details live in exactly one place; changing them requires editing exactly one file.
- Tawk.to chat widget loads on every page without hurting LCP.
- Audit cleanup lands as a separate commit so it can be reviewed (or reverted) independently of the contact fix.

## Non-goals

- Redesigning the contact page layout.
- Building a contact form.
- Adding a cookie-consent banner for Tawk.to (out of scope; revisit if legal requires it).
- Gating Tawk.to by environment (dev/prod). Can be added later via an env var if it becomes noisy during local dev.
- Migrating the email subject / WhatsApp prefill strings away from i18n messages; they stay localized.

## Decisions (contact values)

| Field | Value |
|---|---|
| Email | `info@velkina.com` |
| Phone (display) | `+90 532 336 00 51` |
| Phone (E.164, for `tel:`) | `+905323360051` |
| WhatsApp (digits only, for `wa.me/`) | `905323360051` |
| Schedule URL | `https://cal.com/velkina` |

Phone and WhatsApp share the same underlying number.

## Design

### 1. Single source of truth — `lib/contact.ts` (new file)

```ts
export const CONTACT = {
  email: 'info@velkina.com',
  phoneDisplay: '+90 532 336 00 51',
  phoneE164: '+905323360051',
  whatsappDigits: '905323360051',
  scheduleUrl: 'https://cal.com/velkina',
} as const;

export const telHref = `tel:${CONTACT.phoneE164}`;

export const mailHref = (subject?: string) =>
  `mailto:${CONTACT.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const whatsappHref = (prefill?: string) =>
  `https://wa.me/${CONTACT.whatsappDigits}${prefill ? `?text=${encodeURIComponent(prefill)}` : ''}`;
```

Rationale: Contact info is not locale-dependent, so it does not belong in `messages/*.json`. A TypeScript constant gives us type safety, static hrefs in the server-rendered HTML (better SEO and crawlability), no runtime JS dependency, and a single location to update. The helper functions accept an optional locale-dependent `subject` / `prefill` string that callers read from `messages.common.*` — this preserves the existing bilingual email subject ("Project Inquiry" / "Proje Talebi") and WhatsApp prefill without leaking i18n concerns into the contact constants.

### 2. Wiring map

| File | Change |
|---|---|
| `app/contact/ContactView.tsx` | Replace the three cards with **four** cards in this order: Email, Phone, WhatsApp, Schedule a call. Each card has a real `href` sourced from `lib/contact.ts`. Phone and WhatsApp cards both display `CONTACT.phoneDisplay` as their body text so visitors see the number. External links (WhatsApp, Schedule) get `target="_blank"` and `rel="noopener noreferrer"`. Email card gets `mailHref(messages?.common?.emailSubject)`; WhatsApp card gets `whatsappHref(messages?.common?.whatsappPrefill)`. New i18n strings needed: `contact.phone` ("Phone" / "Telefon") and `contact.phoneDesc` ("Call us during business hours" / "İş saatlerinde arayın") — added to both `en.json` and `tr.json`. |
| `app/HomeViewSnap.tsx` | Import `CONTACT`, `mailHref`, `whatsappHref` from `lib/contact`. On the six `<a data-cta="...">` elements (hero at lines 153/156/159, CTA at lines 379/382/385), add explicit `href={...}` attributes and the `target="_blank"` / `rel="noopener noreferrer"` pair on external links. **Keep** the `data-cta` attributes — they are still used by a separate `useEffect` at lines 43-58 that binds hover/focus handlers to `#hero [data-cta="whatsapp|email|schedule"]` to drive the hero-shape morph animation. Removing them would silently break that animation. The WhatsApp prefill and email subject come from the `common` object already in scope at line 21 (`const common = t('common') as any;`): `whatsappHref(common?.whatsappPrefill)` and `mailHref(common?.emailSubject)`. |
| `app/customer-agent/CustomerAgentView.tsx` | Line 296: replace `href="https://wa.me/905555555555"` with `whatsappHref(messages?.common?.whatsappPrefill)`. Line 299: replace literal `mailto:info@velkina.com` with `mailHref(messages?.common?.emailSubject)`. Import from `../../lib/contact`. |
| `app/[locale]/layout.jsx` | Footer "Get in touch" column (lines 130-135): extend the list to four items — Email, Phone (`tel:` link showing `phoneDisplay`), WhatsApp, Schedule a call — all sourced from `lib/contact.ts`. Replace the literal `hello@velkina.com` string with `CONTACT.email`. The existing "Start project — Quick contact" CTA link stays. |
| `components/GlobalClient.jsx` | **Delete** the entire block at lines 38-51 (the CTA-rewrite effect). Once static hrefs are in place on the home page, nothing in the codebase needs `window.VELK_CONTACT`, and leaving dead code that references a never-defined global is a footgun. Also delete the corresponding `data-email-subject` / `data-whatsapp-prefill` body dataset attributes in `app/[locale]/layout.jsx:75-78` because they become unused. |

### 3. Tawk.to integration

One file touched: `app/[locale]/layout.jsx`.

Add immediately after the existing Lenis/GSAP `<Script>` tags (around line 148, before `<GlobalClient />`):

```jsx
<Script
  id="tawk-to"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/69d6cffc443eaa1c3cea1d2c/1jlnhosg4';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `
  }}
/>
```

- `strategy="afterInteractive"` loads the widget after hydration without blocking LCP.
- The widget registers once per page load; because the layout wraps both `/en/*` and `/tr/*` subtrees, visitors see the chat on every localized page.
- IDs inline for now. If we later need dev-vs-prod gating, promote to an env var (`NEXT_PUBLIC_TAWKTO_PROPERTY_ID`, `NEXT_PUBLIC_TAWKTO_WIDGET_ID`).

### 4. Cleanup — files to delete

Before deletion, verify no imports with `grep -rn "app/contact/page" app/ components/ lib/` (etc.). None are expected because Next.js discovers `page.*` files by convention, not by import.

Files:
- `app/contact/page.jsx`
- `app/about/page.jsx`
- `app/blog/page.tsx`
- `app/customer-agent/page.jsx`
- `app/privacy/page.jsx`
- `app/services/page.tsx`

Keep (these are imported by the `[locale]` routes that actually serve):
- `app/contact/ContactView.tsx`
- `app/about/AboutView.tsx`
- `app/blog/BlogView.tsx` and `app/blog/parts/**`
- `app/customer-agent/CustomerAgentView.tsx`
- `app/privacy/PrivacyView.tsx`
- `app/services/ServicesView.tsx`
- `app/terms/TermsView.tsx`
- `app/use-cases/UseCasesView.tsx` and `app/use-cases/parts/**`
- `app/HomeViewSnap.tsx`

### 5. Cleanup — i18n keys to delete

From `messages/en.json` only (stale after the "Why" section removal):
- `home.why` (entire subtree)
- `home.metrics2.shipped.value`
- `home.metrics2.leadsIncrease.value`
- `home.metrics2.supportReduction.value`
- `home.metrics2.csat.value`
- `home.metrics2.launchTime.value`
- `home.metrics2.uptime.value`
- `home.metrics2.uptime.decimals`
- `home.techCarouselLabel`

From **both** `messages/en.json` AND `messages/tr.json`:
- `nav.why`
- `nav.tech`
- `homeSimple` (entire subtree)

Verification command before deleting each key: `grep -rn "home.why\|home\.techCarouselLabel\|nav\.why\|nav\.tech\|homeSimple" app/ components/`. Expect zero hits outside the JSON files themselves (the README may reference old keys descriptively — that is acceptable and not touched).

New keys to add (for the phone card on the contact page) to **both** `en.json` and `tr.json`:
- `contact.phone` → "Phone" / "Telefon"
- `contact.phoneDesc` → "Call us during business hours" / "İş saatlerinde arayın"

**i18n ordering constraint:** `i18n/messages.ts:10` defines `type Messages = typeof tr` — the TypeScript shape of all messages is inferred from `tr.json`, and `en.json` is then constrained to `Record<Locale, Messages>` (line 13), i.e. it must structurally match. Therefore, when adding new shared keys (`contact.phone`, `contact.phoneDesc`), add them to `tr.json` **first**, then `en.json`. When removing keys that exist in both files (`nav.why`, `nav.tech`, `homeSimple.*`), remove from `tr.json` **first**, then `en.json`. Keys that only exist in `en.json` (`home.why.*`, `home.metrics2.*.value`, `home.techCarouselLabel`) are not part of the `Messages` type and can be removed without ordering concern. If any code still reads a key being removed from `tr.json`, the next `npm run build` will fail at type-checking — which is the safety net.

### 6. Commit plan

Three commits, each builds green independently:

1. **`feat(contact): centralize contact info; wire phone, WhatsApp, cal.com; info@ email`**
   - Adds `lib/contact.ts`
   - Updates `ContactView.tsx`, `HomeViewSnap.tsx`, `CustomerAgentView.tsx`, `app/[locale]/layout.jsx`
   - Deletes the CTA-rewrite block in `GlobalClient.jsx`
   - Adds `contact.phone` / `contact.phoneDesc` to both JSON files
   - Delivers the entire user-visible fix.
2. **`feat(chat): add Tawk.to widget via next/script in locale layout`**
   - Single-file change to `app/[locale]/layout.jsx`.
3. **`chore: remove stale non-locale route duplicates and orphaned i18n keys`**
   - Deletes the six `page.*` duplicates.
   - Removes dead keys from `en.json` and `tr.json`.

Splitting this way means commits 1+2 can ship even if commit 3 surfaces an unexpected reference (e.g. if a non-locale duplicate turned out to be reachable).

## Verification

After all changes, before any commit:

1. **Build:** `npm run build` — must pass, still 29 pages generated (or 23 after commit 3 removes the duplicates), zero new warnings, zero TS errors.
2. **Literal-href check:** inspect the static HTML output of `.next/server/app/[locale]/contact.html` (or run `npm run start` and `curl http://localhost:3000/en/contact`) and confirm:
   - `tel:+905323360051` appears
   - `wa.me/905323360051` appears (with prefill query)
   - `cal.com/velkina` appears
   - `mailto:info@velkina.com` appears
   - The Tawk.to script tag appears exactly once per page
3. **Negative greps** (should return zero matches anywhere in the repo after the work is complete):
   - `grep -rn "hello@velkina"`
   - `grep -rn "905555555555"`
   - `grep -rn "VELK_CONTACT"`
   - `grep -rn "calendly.com/velkina"`
4. **Spot-check the home page and customer-agent page HTML** the same way — all CTAs should have real hrefs in server-rendered HTML.

## Risks and mitigations

- **Risk:** Tawk.to widget conflicts with Lenis smooth scroll or the page-transition overlay. **Mitigation:** `afterInteractive` load, widget is injected as an iframe in a fixed-position container that Lenis does not touch. If visual clashes appear, revisit z-index on `#vk-trans` and Tawk.to's container.
- **Risk:** Deleting the non-locale duplicate pages changes the build's generated route list, which could theoretically break an external link that pointed to a non-prefixed path. **Mitigation:** Middleware already redirects `/contact` → `/en/contact`; Next.js will continue to match the middleware before route resolution, so external links still work. The only change is that the duplicate static HTML is no longer emitted.
- **Risk:** Removing `home.why.*` breaks something we didn't find in the grep. **Mitigation:** final `npm run build` + keeping the i18n cleanup in its own commit for easy revert.
- **Risk:** `info@velkina.com` is not yet configured on the domain's email provider, so users clicking the mailto bounce. **Mitigation:** out of scope for this change — flagged to user to verify the mailbox exists before deploy.
