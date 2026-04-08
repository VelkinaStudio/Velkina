# Velkina Contact Fix, Tawk.to Chat & Audit Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix broken contact CTAs site-wide by centralizing contact details in `lib/contact.ts`, wire static phone/WhatsApp/cal.com/email hrefs into server-rendered HTML, add the Tawk.to chat widget, and clean up stale non-locale route duplicates plus dead i18n keys.

**Architecture:** A single `lib/contact.ts` TypeScript module exports the contact constants (`CONTACT`) and three href helpers (`telHref`, `mailHref`, `whatsappHref`). Components that render contact CTAs import from this module and produce real hrefs at server-render time — removing the never-defined `window.VELK_CONTACT` runtime rewrite indirection. Tawk.to loads via `next/script` with strategy `afterInteractive`. Cleanup lands as an independent commit.

**Tech stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind, next-intl for locale routing, `next/script` for third-party scripts.

**Spec:** `docs/superpowers/specs/2026-04-09-velkina-contact-fix-design.md`

**Audit correction (found during plan prep):** The spec's cleanup section listed `home.metrics2.*.value` / `.decimals` as orphaned en-only keys. They are **not** orphaned — `app/HomeViewSnap.tsx:97` aliases `metrics2` to a local `m2` variable and reads `m2?.shipped?.value`, `m2?.leadsIncrease?.value`, `m2?.supportReduction?.value`, `m2?.csat?.value`, `m2?.launchTime?.value`, `m2?.uptime?.value`, and `m2?.uptime?.decimals` (lines 288-313). The initial audit grep missed this because the access was via the aliased variable. Result: `home.metrics2.*` stays untouched in `en.json`; the real issue is that `tr.json` is missing those numeric fields (i18n parity gap, explicitly out of scope for this plan). `home.why.techLine` is in both files and unused — included in cleanup.

**Note on testing:** This codebase has no test suite. The verification loop for every code change is (1) `npm run build` — which runs the TypeScript type-checker and Next.js's static page generation, and (2) targeted `grep` over the generated output in `.next/` or the source tree to confirm specific literal strings were written or removed. That substitutes for "run the tests."

---

## Phase 1 — Contact Fix (Commit 1)

### Task 1: Create `lib/contact.ts`

**Files:**
- Create: `lib/contact.ts`

- [ ] **Step 1: Create the file**

Create `lib/contact.ts` with these exact contents:

```ts
export const CONTACT = {
  email: 'info@velkina.com',
  phoneDisplay: '+90 532 336 00 51',
  phoneE164: '+905323360051',
  whatsappDigits: '905323360051',
  scheduleUrl: 'https://cal.com/velkina',
} as const;

export const telHref = `tel:${CONTACT.phoneE164}`;

export const mailHref = (subject?: string): string =>
  `mailto:${CONTACT.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const whatsappHref = (prefill?: string): string =>
  `https://wa.me/${CONTACT.whatsappDigits}${prefill ? `?text=${encodeURIComponent(prefill)}` : ''}`;
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build succeeds, "✓ Generating static pages (29/29)", zero errors. The new file is not yet imported by anything, so this just confirms it compiles.

---

### Task 2: Add `contact.phone` label to both message files

**Files:**
- Modify: `messages/tr.json` (inside the `"contact"` object around line 345)
- Modify: `messages/en.json` (inside the `"contact"` object around line 380)

**Why tr.json first:** `i18n/messages.ts:10` declares `type Messages = typeof tr`. The TypeScript shape is inferred from `tr.json`, and `en.json` is then constrained to match. Adding the key to `tr.json` first means `en.json` can reference it on the next edit without a type gap.

- [ ] **Step 1: Add `"phone"` key to `messages/tr.json`**

In `messages/tr.json`, find this block inside `"contact"`:

```json
    "email": "E‑posta",
    "emailAddress": "hello@velkina.com",
```

Replace with:

```json
    "email": "E‑posta",
    "phone": "Telefon",
    "emailAddress": "hello@velkina.com",
```

The `"emailAddress"` line stays for now — it gets removed later in Phase 3.

- [ ] **Step 2: Add `"phone"` key to `messages/en.json`**

In `messages/en.json`, find this block inside `"contact"`:

```json
    "email": "Email",
    "emailAddress": "hello@velkina.com",
```

Replace with:

```json
    "email": "Email",
    "phone": "Phone",
    "emailAddress": "hello@velkina.com",
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

Expected: build succeeds, still 29 pages.

---

### Task 3: Rewrite `app/contact/ContactView.tsx` with four cards and static hrefs

**Files:**
- Modify: `app/contact/ContactView.tsx` (full rewrite — ~45 lines)

Note: `ContactView.tsx` is the component imported by `app/[locale]/contact/page.jsx`. The other file `app/contact/page.jsx` is a stale duplicate that middleware never serves (middleware redirects `/contact` → `/en/contact` or `/tr/contact`), and that stale file gets deleted in Phase 3. Do not touch it in this task.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `app/contact/ContactView.tsx` with:

```tsx
import Link from 'next/link';
import React from 'react';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import {CONTACT, telHref, mailHref, whatsappHref} from '../../lib/contact';

export type ContactViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function ContactView({messages, locale}: ContactViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const m = t('contact') as any;
  const nav = t('nav') as any;
  const common = t('common') as any;
  const prefix = locale ? `/${locale}` : '';

  const cardClass =
    'vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition';

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <h1 className="font-heading text-3xl md:text-4xl mb-2">{m?.title ?? 'Contact'}</h1>
      <p className="text-white/80 mb-6">{m?.subtitle ?? 'Quick contact with Velkina.'}</p>

      <div className="grid gap-4">
        <a href={mailHref(common?.emailSubject)} className={cardClass}>
          <div className="font-heading">{m?.email ?? 'Email'}</div>
          <div className="text-white/80">{CONTACT.email}</div>
        </a>
        <a href={telHref} className={cardClass}>
          <div className="font-heading">{m?.phone ?? 'Phone'}</div>
          <div className="text-white/80">{CONTACT.phoneDisplay}</div>
        </a>
        <a
          href={whatsappHref(common?.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <div className="font-heading">{m?.whatsapp ?? 'WhatsApp'}</div>
          <div className="text-white/80">{CONTACT.phoneDisplay}</div>
        </a>
        <a
          href={CONTACT.scheduleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <div className="font-heading">{m?.schedule ?? 'Schedule a call'}</div>
          <div className="text-white/80">{m?.scheduleDesc ?? 'Pick a time that works for you'}</div>
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`${prefix}/#cta`}
          className="inline-flex items-center px-5 py-3 rounded-xl bg-vkpink text-black font-mono shadow-strong"
        >
          {nav?.startProject ?? 'Start project'}
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build succeeds, 29 pages.

- [ ] **Step 3: Verify all four contact hrefs land in the generated HTML**

Run: `grep -ro 'tel:+905323360051\|wa\.me/905323360051\|cal\.com/velkina\|mailto:info@velkina\.com' .next/server/app/\[locale\]/contact.html 2>/dev/null | sort -u`

Expected: all four patterns appear (`cal.com/velkina`, `mailto:info@velkina.com`, `tel:+905323360051`, `wa.me/905323360051`).

If any are missing, re-check the component — the corresponding `href={...}` expression in the JSX is probably wrong.

---

### Task 4: Wire hero-section CTAs in `app/HomeViewSnap.tsx`

**Files:**
- Modify: `app/HomeViewSnap.tsx` (add import; replace three `<a>` tags at lines 153-161)

- [ ] **Step 1: Add the import**

In `app/HomeViewSnap.tsx`, find this import block near the top:

```tsx
import type {Locale, Messages} from '../i18n/messages';
import {createT, getDefaultMessages} from '../i18n/messages';
```

Replace with:

```tsx
import type {Locale, Messages} from '../i18n/messages';
import {createT, getDefaultMessages} from '../i18n/messages';
import {CONTACT, mailHref, whatsappHref} from '../lib/contact';
```

- [ ] **Step 2: Replace the hero CTAs at lines 153-161**

In `app/HomeViewSnap.tsx`, find this block (inside the hero `<section>`):

```tsx
                <div className="mt-6 flex flex-wrap gap-3">
                  <a data-cta="whatsapp" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono">
                    {h?.ctas?.whatsapp ?? (lang==='en' ? 'Message on WhatsApp' : 'WhatsApp’tan yazın')}
                  </a>
                  <a data-cta="email" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition">
                    {h?.ctas?.email ?? (lang==='en' ? 'Send an email' : 'E‑posta gönderin')}
                  </a>
                  <a data-cta="schedule" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 bg-white/5 text-white/90">
                    {h?.ctas?.schedule ?? (lang==='en' ? 'Schedule a call' : 'Görüşme planlayın')}
                  </a>
                </div>
```

Replace with:

```tsx
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    data-cta="whatsapp"
                    href={whatsappHref(common?.whatsappPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono"
                  >
                    {h?.ctas?.whatsapp ?? (lang==='en' ? 'Message on WhatsApp' : 'WhatsApp’tan yazın')}
                  </a>
                  <a
                    data-cta="email"
                    href={mailHref(common?.emailSubject)}
                    className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition"
                  >
                    {h?.ctas?.email ?? (lang==='en' ? 'Send an email' : 'E‑posta gönderin')}
                  </a>
                  <a
                    data-cta="schedule"
                    href={CONTACT.scheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 bg-white/5 text-white/90"
                  >
                    {h?.ctas?.schedule ?? (lang==='en' ? 'Schedule a call' : 'Görüşme planlayın')}
                  </a>
                </div>
```

**Keep** the `data-cta="..."` attributes. They are still read by a separate `useEffect` at lines 43-58 that binds hover/focus handlers to `#hero [data-cta="..."]` selectors to drive the hero-shape morph animation. Removing them would silently break that animation. `common` is already defined at line 21 (`const common = t('common') as any;`), so no additional setup is needed.

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

Expected: build succeeds.

---

### Task 5: Wire CTA-section buttons in `app/HomeViewSnap.tsx`

**Files:**
- Modify: `app/HomeViewSnap.tsx` (replace three `<a>` tags at lines 379-387)

- [ ] **Step 1: Replace the CTA-section buttons**

In `app/HomeViewSnap.tsx`, find this block (inside the final `<section id="cta">`):

```tsx
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a data-cta="whatsapp" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono">
                {h?.ctas?.whatsapp ?? (lang==='en' ? 'Message on WhatsApp' : 'WhatsApp’tan yazın')}
              </a>
              <a data-cta="email" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition">
                {h?.ctas?.email ?? (lang==='en' ? 'Send an email' : 'E‑posta gönderin')}
              </a>
              <a data-cta="schedule" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition">
                {h?.ctas?.schedule ?? (lang==='en' ? 'Schedule a call' : 'Görüşme planlayın')}
              </a>
            </div>
```

Replace with:

```tsx
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                data-cta="whatsapp"
                href={whatsappHref(common?.whatsappPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono"
              >
                {h?.ctas?.whatsapp ?? (lang==='en' ? 'Message on WhatsApp' : 'WhatsApp’tan yazın')}
              </a>
              <a
                data-cta="email"
                href={mailHref(common?.emailSubject)}
                className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition"
              >
                {h?.ctas?.email ?? (lang==='en' ? 'Send an email' : 'E‑posta gönderin')}
              </a>
              <a
                data-cta="schedule"
                href={CONTACT.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition"
              >
                {h?.ctas?.schedule ?? (lang==='en' ? 'Schedule a call' : 'Görüşme planlayın')}
              </a>
            </div>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build succeeds.

- [ ] **Step 3: Verify hrefs land in both home locale HTMLs**

Run: `grep -ro 'wa\.me/905323360051\|cal\.com/velkina\|mailto:info@velkina\.com' .next/server/app/\[locale\].html 2>/dev/null | wc -l`

Expected: at least 6 matches (3 hrefs × 2 locales at minimum, more likely 12 since each of the two sections has all three CTAs).

---

### Task 6: Fix `app/customer-agent/CustomerAgentView.tsx` hardcoded WhatsApp

**Files:**
- Modify: `app/customer-agent/CustomerAgentView.tsx` (add import, read `common`, fix two hrefs at lines 296 and 299)

- [ ] **Step 1: Add the import**

In `app/customer-agent/CustomerAgentView.tsx`, find this import block:

```tsx
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import Link from 'next/link';
```

Replace with:

```tsx
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import Link from 'next/link';
import {mailHref, whatsappHref} from '../../lib/contact';
```

- [ ] **Step 2: Read `common` from messages**

Still in `app/customer-agent/CustomerAgentView.tsx`, find:

```tsx
export default function CustomerAgentView({messages, locale}: CustomerAgentViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const isEnglish = locale === 'en';
```

Replace with:

```tsx
export default function CustomerAgentView({messages, locale}: CustomerAgentViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const common = (t('common') as any) ?? {};
  const isEnglish = locale === 'en';
```

- [ ] **Step 3: Replace the hardcoded CTA links**

Find this block (lines 295-301):

```tsx
            <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="vk-button vk-button-outline">
              {content.ctaWhatsapp}
            </a>
            <a href="mailto:info@velkina.com" className="vk-button vk-button-outline">
              {content.ctaEmail}
            </a>
```

Replace with:

```tsx
            <a href={whatsappHref(common?.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="vk-button vk-button-outline">
              {content.ctaWhatsapp}
            </a>
            <a href={mailHref(common?.emailSubject)} className="vk-button vk-button-outline">
              {content.ctaEmail}
            </a>
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

Expected: build succeeds.

- [ ] **Step 5: Verify the fake number is gone and the real one is present**

Run: `grep -rn '905555555555' app/ components/ lib/` — expected: **zero matches.**

Run: `grep -o 'wa\.me/905323360051' .next/server/app/\[locale\]/customer-agent.html 2>/dev/null | head -3` — expected: at least one match.

---

### Task 7: Extend the footer in `app/[locale]/layout.jsx` with phone, WhatsApp, and schedule links

**Files:**
- Modify: `app/[locale]/layout.jsx` (add import; extend the "Get in touch" list at lines 129-135; also remove the now-dead `data-email-subject` and `data-whatsapp-prefill` body attributes at lines 75-78)

- [ ] **Step 1: Add the import**

In `app/[locale]/layout.jsx`, find:

```jsx
import { Inter, Sora } from 'next/font/google';
```

Replace with:

```jsx
import { Inter, Sora } from 'next/font/google';
import {CONTACT, telHref, mailHref, whatsappHref} from '../../lib/contact';
```

- [ ] **Step 2: Remove dead body dataset attributes**

Find:

```jsx
      <body
        className="font-body bg-vkbg text-vktext min-h-screen flex flex-col"
        data-email-subject={messages.common?.emailSubject ?? 'Project Inquiry'}
        data-whatsapp-prefill={messages.common?.whatsappPrefill ?? "Hi Velkina! I'd like to discuss a project."}
        data-carousel-play={messages.common?.carouselPlay ?? 'Play carousel'}
        data-carousel-pause={messages.common?.carouselPause ?? 'Pause carousel'}
      >
```

Replace with:

```jsx
      <body
        className="font-body bg-vkbg text-vktext min-h-screen flex flex-col"
        data-carousel-play={messages.common?.carouselPlay ?? 'Play carousel'}
        data-carousel-pause={messages.common?.carouselPause ?? 'Pause carousel'}
      >
```

The two removed attributes were read only by the CTA rewrite block in `GlobalClient.jsx` that Task 8 deletes. `data-carousel-play` / `data-carousel-pause` stay — they are still used by the ticker a11y code in `GlobalClient.jsx` lines 107-108.

- [ ] **Step 3: Extend the "Get in touch" footer column**

Find:

```jsx
            <div>
              <h3 className="font-heading text-white/90 mb-2">{messages.footer?.getInTouch ?? 'Get in touch'}</h3>
              <ul className="space-y-1">
                <li><a href="mailto:hello@velkina.com" className="hover:text-vkcyan">hello@velkina.com</a></li>
                <li><Link href={`/${locale}/#cta`} className="hover:text-vkcyan">{messages.home?.startProjectShort ?? 'Start project — Quick contact'}</Link></li>
              </ul>
            </div>
```

Replace with:

```jsx
            <div>
              <h3 className="font-heading text-white/90 mb-2">{messages.footer?.getInTouch ?? 'Get in touch'}</h3>
              <ul className="space-y-1">
                <li><a href={mailHref(messages.common?.emailSubject)} className="hover:text-vkcyan">{CONTACT.email}</a></li>
                <li><a href={telHref} className="hover:text-vkcyan">{CONTACT.phoneDisplay}</a></li>
                <li><a href={whatsappHref(messages.common?.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="hover:text-vkcyan">WhatsApp</a></li>
                <li><a href={CONTACT.scheduleUrl} target="_blank" rel="noopener noreferrer" className="hover:text-vkcyan">{messages.contact?.schedule ?? 'Schedule a call'}</a></li>
                <li><Link href={`/${locale}/#cta`} className="hover:text-vkcyan">{messages.home?.startProjectShort ?? 'Start project — Quick contact'}</Link></li>
              </ul>
            </div>
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

Expected: build succeeds.

- [ ] **Step 5: Verify footer hrefs present and `hello@velkina.com` is gone from the layout**

Run: `grep -n 'hello@velkina' app/\[locale\]/layout.jsx` — expected: **zero matches.**

Run: `grep -o 'tel:+905323360051' .next/server/app/\[locale\].html 2>/dev/null | wc -l` — expected: at least 2 (once per locale footer).

---

### Task 8: Delete the CTA-rewrite block in `components/GlobalClient.jsx`

**Files:**
- Modify: `components/GlobalClient.jsx` (remove lines 38-51)

- [ ] **Step 1: Delete the dead effect block**

In `components/GlobalClient.jsx`, use an Edit replacement with the following `old_string` (15 lines, from the `// CTA destinations` comment through the blank line that precedes the next comment):

```jsx
    // CTA destinations (localized via body data-*)
    try {
      const email = 'hello@velkina.com';
      const body = document.body || null;
      const prefill = (body && body.dataset && body.dataset.whatsappPrefill) || "Hi Velkina! I'd like to discuss a project.";
      const pre = encodeURIComponent(prefill);
      const wa = (window.VELK_CONTACT?.whatsapp || '').replace(/[^0-9]/g,'');
      const schedule = window.VELK_CONTACT?.schedule || 'https://calendly.com/velkina/intro-call';
      const waHref = wa ? `https://wa.me/${wa}?text=${pre}` : '/#contact';
      document.querySelectorAll('[data-cta="whatsapp"]').forEach(a=>a.setAttribute('href', waHref));
      const subj = encodeURIComponent((body && body.dataset && body.dataset.emailSubject) || 'Project Inquiry');
      document.querySelectorAll('[data-cta="email"]').forEach(a=>a.setAttribute('href', `mailto:${email}?subject=${subj}`));
      document.querySelectorAll('[data-cta="schedule"]').forEach(a=>a.setAttribute('href', schedule));
    } catch(e){}

    // Page transition overlay for same-origin nav
```

And `new_string`:

```jsx
    // Page transition overlay for same-origin nav
```

This removes lines 38-52 (the CTA block plus the blank line that separated it from the next comment) while keeping the "Page transition overlay" comment that starts the next effect block.

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build succeeds.

- [ ] **Step 3: Negative greps**

Run each of these — all should return **zero matches**:

- `grep -n 'VELK_CONTACT' components/GlobalClient.jsx`
- `grep -n 'hello@velkina' components/GlobalClient.jsx`
- `grep -n 'calendly\.com/velkina' components/GlobalClient.jsx`

---

### Task 9: Phase 1 final verification and commit

- [ ] **Step 1: Run the full production build one more time**

Run: `npm run build`

Expected: "✓ Generating static pages (29/29)", zero errors, zero warnings.

- [ ] **Step 2: Global negative greps across the repo**

Each command below should return **zero matches**:

- `grep -rn 'hello@velkina' app/ components/ lib/` — expected: zero. (Note: `messages/{tr,en}.json` still contain `contact.emailAddress: "hello@velkina.com"` until Phase 3; deliberately not searched here.)
- `grep -rn '905555555555' app/ components/ lib/ messages/` — expected: zero.
- `grep -rn 'VELK_CONTACT' app/ components/ lib/` — expected: zero.
- `grep -rn 'calendly\.com' app/ components/ lib/` — expected: zero.

- [ ] **Step 3: Positive grep — confirm real hrefs in generated HTML**

Run: `grep -ro 'tel:+905323360051\|wa\.me/905323360051\|cal\.com/velkina\|mailto:info@velkina\.com' .next/server/app/ 2>/dev/null | sort -u`

Expected: all four patterns present, each appearing on multiple pages (home, contact, customer-agent, footer on all pages).

- [ ] **Step 4: Commit**

```bash
git add lib/contact.ts \
        app/contact/ContactView.tsx \
        app/HomeViewSnap.tsx \
        app/customer-agent/CustomerAgentView.tsx \
        'app/[locale]/layout.jsx' \
        components/GlobalClient.jsx \
        messages/tr.json \
        messages/en.json
git commit -m "$(cat <<'EOF'
feat(contact): centralize contact info; wire real phone, WhatsApp, cal.com hrefs

Add lib/contact.ts as the single source of truth for contact details
(email, phone E.164, WhatsApp digits, cal.com URL) with telHref /
mailHref / whatsappHref helpers. Rewrite the contact page with four
cards, add phone / WhatsApp / schedule links to the footer, wire the
six home-page CTAs, and replace the hardcoded placeholder WhatsApp
number on the customer-agent page. Delete the runtime CTA-rewrite
block in GlobalClient.jsx that depended on a never-defined
window.VELK_CONTACT global, and drop the now-unused body dataset
attributes. Switch the visible email from hello@ to info@velkina.com.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 2 — Tawk.to Chat Widget (Commit 2)

### Task 10: Add Tawk.to `<Script>` to the locale layout

**Files:**
- Modify: `app/[locale]/layout.jsx` (insert a `<Script>` tag after the existing third-party scripts, around line 148)

- [ ] **Step 1: Insert the Tawk.to script tag**

In `app/[locale]/layout.jsx`, find:

```jsx
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/bundled/lenis.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" strategy="afterInteractive" />

        <GlobalClient />
```

Replace with:

```jsx
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/bundled/lenis.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" strategy="afterInteractive" />
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
            `,
          }}
        />

        <GlobalClient />
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build succeeds.

- [ ] **Step 3: Confirm the Tawk.to embed URL is in the generated HTML**

Run: `grep -rl 'embed\.tawk\.to/69d6cffc443eaa1c3cea1d2c/1jlnhosg4' .next/server/app/ 2>/dev/null | head -5`

Expected: at least one match per locale (it appears on every page inside the locale layout).

- [ ] **Step 4: Commit**

```bash
git add 'app/[locale]/layout.jsx'
git commit -m "$(cat <<'EOF'
feat(chat): add Tawk.to widget via next/script in locale layout

Loads the Tawk.to live chat widget (property
69d6cffc443eaa1c3cea1d2c, widget 1jlnhosg4) through next/script with
strategy afterInteractive so it does not block LCP. Mounted in the
shared locale layout so both /en/* and /tr/* get the widget on every
page.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 3 — Audit Cleanup (Commit 3)

### Task 11: Pre-flight — confirm no imports of the stale non-locale pages

**Files:**
- Read-only verification.

- [ ] **Step 1: Grep for imports of each stale page file**

Run:

```bash
grep -rn 'app/contact/page\|app/about/page\|app/blog/page\|app/customer-agent/page\|app/privacy/page\|app/services/page' app/ components/ lib/ 2>/dev/null
```

Expected: **zero matches.** Next.js discovers `page.*` files by filesystem convention, not by import — no component file should be importing them. If any match is found, stop and investigate before proceeding.

---

### Task 12: Delete the six stale non-locale route duplicates

**Files:**
- Delete: `app/contact/page.jsx`
- Delete: `app/about/page.jsx`
- Delete: `app/blog/page.tsx`
- Delete: `app/customer-agent/page.jsx`
- Delete: `app/privacy/page.jsx`
- Delete: `app/services/page.tsx`

These files define routes at `/contact`, `/about`, `/blog`, `/customer-agent`, `/privacy`, `/services` without a locale prefix. `middleware.ts` redirects every non-prefixed path to the `/[locale]/...` equivalent, so these routes never serve in production — they only add dead weight to the build. The corresponding `*View.tsx` components that the locale routes actually render are **not** deleted.

- [ ] **Step 1: Delete the six files**

```bash
rm app/contact/page.jsx \
   app/about/page.jsx \
   app/blog/page.tsx \
   app/customer-agent/page.jsx \
   app/privacy/page.jsx \
   app/services/page.tsx
```

- [ ] **Step 2: Verify build still passes and route count drops**

Run: `npm run build`

Expected: build succeeds. The "Route (app)" table should no longer list the non-prefixed `/about`, `/blog`, `/contact`, `/customer-agent`, `/privacy`, `/services` routes. Total static pages generated drops from 29 to 23 (6 routes × 1 each removed).

If the drop is different, check the build output — a stale duplicate may have been missed or an unexpected route collapsed.

---

### Task 13: Remove dead i18n keys (tr.json first, then en.json)

**Files:**
- Modify: `messages/tr.json`
- Modify: `messages/en.json`

Dead keys verified unused by grep over `app/` `components/` `lib/`:
- `nav.why`
- `nav.tech`
- `homeSimple` (entire subtree)
- `home.why` (entire subtree — in tr.json this is `{"techLine": "..."}`; in en.json it's a larger object; both are dead)
- `home.techCarouselLabel` (en.json only, not present in tr.json)
- `contact.emailAddress` (only ever read by `ContactView.tsx` — replaced in Phase 1 — and the deleted `app/contact/page.jsx` — deleted in Task 12)

**Ordering:** Remove from `tr.json` first (base type source), then from `en.json`. Adding/removing keys in `en.json` that do not exist in `tr.json` is safe in either order, because the `Messages` type only constrains keys that exist in `tr.json`.

- [ ] **Step 1: Remove `nav.why` and `nav.tech` from `messages/tr.json`**

Find:

```json
  "nav": {
    "home": "Ana sayfa",
    "why": "Neden",
    "services": "Hizmetler",
    "useCases": "Projelerimiz",
    "blog": "Blog",
    "tech": "Teknoloji",
    "about": "Hakkımızda",
```

Replace with:

```json
  "nav": {
    "home": "Ana sayfa",
    "services": "Hizmetler",
    "useCases": "Projelerimiz",
    "blog": "Blog",
    "about": "Hakkımızda",
```

- [ ] **Step 2: Remove `homeSimple` subtree from `messages/tr.json`**

Find:

```json
  "homeSimple": {
    "heroTitle": "Yapay Zeka",
    "heroSub": "İşi otomatikleştir.",
    "automateTitle": "Otomasyon",
    "automateSub": "Zaman kazanın.",
    "proofTitle": "Kanıt",
    "clientsTitle": "Müşteriler",
    "ctaTitle": "Başlat",
    "ctaSub": "Hızlı iletişim"
  },
  "home": {
```

Replace with:

```json
  "home": {
```

- [ ] **Step 3: Remove `home.why` subtree from `messages/tr.json`**

Find (the exact shape in tr.json — only a `techLine`, unlike en.json):

```json
    "startProjectShort": "Proje başlat — Hızlı iletişim",
    "why": {
      "techLine": "Next.js 14 • Edge • Analitik • Otomasyon"
    }
  },
```

Replace with:

```json
    "startProjectShort": "Proje başlat — Hızlı iletişim"
  },
```

(Note: removed the trailing comma after `"startProjectShort"` because `"why"` was the last key inside `home`.)

- [ ] **Step 4: Remove `contact.emailAddress` from `messages/tr.json`**

Find:

```json
    "email": "E‑posta",
    "phone": "Telefon",
    "emailAddress": "hello@velkina.com",
    "whatsapp": "WhatsApp",
```

Replace with:

```json
    "email": "E‑posta",
    "phone": "Telefon",
    "whatsapp": "WhatsApp",
```

- [ ] **Step 5: Run build after tr.json edits**

Run: `npm run build`

Expected: build succeeds. If TypeScript fails with a missing-property error, a grep missed a consumer of one of the keys being removed — stop and investigate.

- [ ] **Step 6: Remove `nav.why` and `nav.tech` from `messages/en.json`**

Find:

```json
  "nav": {
    "home": "Home",
    "why": "Why",
    "services": "Services",
    "useCases": "Use Cases",
    "blog": "Blog",
    "tech": "Tech",
    "about": "About",
```

Replace with:

```json
  "nav": {
    "home": "Home",
    "services": "Services",
    "useCases": "Use Cases",
    "blog": "Blog",
    "about": "About",
```

- [ ] **Step 7: Remove `homeSimple` subtree from `messages/en.json`**

Find:

```json
  "homeSimple": {
    "heroTitle": "AI Agents",
    "heroSub": "Automate work.",
    "automateTitle": "Automate",
    "automateSub": "Save time.",
    "proofTitle": "Proof",
    "clientsTitle": "Clients",
    "ctaTitle": "Start",
    "ctaSub": "Quick contact"
  },
  "home": {
```

Replace with:

```json
  "home": {
```

- [ ] **Step 8: Remove `home.why` subtree and `home.techCarouselLabel` from `messages/en.json`**

Find the end of the `home.metrics2` object followed by the `why` and `stackTitle`/`techCarouselLabel` block. The exact pattern:

```json
      "uptime": {
        "value": 99.9,
        "decimals": 1,
        "label": "Uptime",
        "sr": "Observed uptime"
      }
    },
    "why": {
      "title": "Why Velkina",
      "subtitle": "AI specialists with expertise in natural language processing, voice recognition, and conversational design. We build intelligent agents that transform customer service and business operations.",
      "howWeWork": {
        "title": "How we work",
        "items": [
          "Analyze your business needs and design custom AI agent solutions.",
          "Train models on your specific domain with multilingual capabilities.",
          "Deploy with continuous monitoring and performance optimization."
        ],
        "stats": {
          "launches": "Deployments",
          "median": "Training time",
          "uptime": "Agent uptime"
        }
      },
      "seniorOnly": {
        "title": "AI specialists",
        "desc": "Our team combines expertise in linguistics, machine learning, and software engineering to create agents that truly understand your customers."
      },
      "speed": {
        "title": "Rapid deployment",
        "desc": "Quick integration with your existing systems. Our agents can be deployed and operational within weeks, not months."
      },
      "design": {
        "title": "Conversational intelligence",
        "desc": "Natural dialogue flows and contextual understanding. Our agents don't just respond—they comprehend and solve."
      },
      "techLine": "NLP • Voice Recognition • Machine Learning • n8n Integration"
    },
    "stackTitle": "Tech Stack",
    "techCarouselLabel": "Technology logos carousel",
    "ctas": {
```

Replace with:

```json
      "uptime": {
        "value": 99.9,
        "decimals": 1,
        "label": "Uptime",
        "sr": "Observed uptime"
      }
    },
    "stackTitle": "Tech Stack",
    "ctas": {
```

- [ ] **Step 9: Remove `contact.emailAddress` from `messages/en.json`**

Find:

```json
    "email": "Email",
    "phone": "Phone",
    "emailAddress": "hello@velkina.com",
    "whatsapp": "WhatsApp",
```

Replace with:

```json
    "email": "Email",
    "phone": "Phone",
    "whatsapp": "WhatsApp",
```

- [ ] **Step 10: Run build after en.json edits**

Run: `npm run build`

Expected: build succeeds, 23 static pages generated (same as after Task 12).

---

### Task 14: Phase 3 final verification and commit

- [ ] **Step 1: Global negative greps**

Each should return **zero matches**:

- `grep -rn 'hello@velkina' app/ components/ lib/ messages/` — now including messages/ because `contact.emailAddress` is gone.
- `grep -rn '"homeSimple"' messages/`
- `grep -rn '"techCarouselLabel"' messages/`
- `grep -rn '"why":' messages/` — note the colon restricts to JSON object keys rather than the `nav.why` string label, but `nav.why` is also gone now so this should still be zero. (If it matches anything, investigate.)
- `grep -n '"tech":' messages/` — expected: zero matches for `nav.tech`.

- [ ] **Step 2: Confirm full build is green one last time**

Run: `npm run build`

Expected: "✓ Generating static pages (23/23)", zero errors, zero warnings.

- [ ] **Step 3: Commit**

```bash
git add 'app/contact/page.jsx' \
        'app/about/page.jsx' \
        'app/blog/page.tsx' \
        'app/customer-agent/page.jsx' \
        'app/privacy/page.jsx' \
        'app/services/page.tsx' \
        messages/tr.json \
        messages/en.json
git commit -m "$(cat <<'EOF'
chore: remove stale non-locale route duplicates and orphaned i18n keys

Delete six stale page.* files under app/ that defined non-locale
routes (/contact, /about, /blog, /customer-agent, /privacy, /services).
Middleware already redirects every non-prefixed path to /[locale]/...,
so these routes never served in production — they only increased
build output. The corresponding *View.tsx components continue to
render via app/[locale]/**.

Also remove dead i18n keys that no component reads: nav.why, nav.tech,
homeSimple (both files); home.why (both files; en.json's copy was
left behind when the Why section was removed in 5629be4, tr.json had
only a stray techLine); home.techCarouselLabel (en.json only); and
contact.emailAddress (both files; superseded by lib/contact.ts).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 4: Show the final git log**

Run: `git log --oneline -6`

Expected: the three new commits at the top in order (cleanup → Tawk.to → contact fix → spec doc).

---

## Done — what "working software" looks like

After Phase 1 commit lands, the following is already true:

- Every WhatsApp button across the site opens `https://wa.me/905323360051` with a localized prefill.
- Every "Schedule a call" button opens `https://cal.com/velkina` in a new tab.
- Every email CTA opens `mailto:info@velkina.com` with a localized subject.
- The contact page shows four cards: Email, Phone, WhatsApp, Schedule — all functional.
- The footer on every locale page shows four real contact links.
- The Customer Agent page no longer points to the placeholder `905555555555`.
- `hello@velkina.com` is gone from the rendered site (though still lingers as a string in the two JSON files until Phase 3).
- The dead `window.VELK_CONTACT` indirection is gone.

Phase 2 adds the Tawk.to chat widget to every locale page.

Phase 3 is pure cleanup: no user-visible change, ~200 fewer lines of dead code + dead i18n, and 6 fewer static routes in the build.

## Scope coverage check

| Spec requirement | Task(s) |
|---|---|
| `lib/contact.ts` with `CONTACT` + `telHref` / `mailHref` / `whatsappHref` | 1 |
| Contact page rewritten with 4 cards | 3 |
| New `contact.phone` i18n key (both files) | 2 |
| Home hero CTAs wired | 4 |
| Home CTA-section buttons wired | 5 |
| `data-cta` attributes preserved for hero hover animation | 4, 5 |
| CustomerAgentView hardcoded WhatsApp + email fixed | 6 |
| Footer extended with phone / WhatsApp / schedule | 7 |
| `hello@velkina.com` → `info@velkina.com` everywhere in code | 7 |
| `GlobalClient.jsx` CTA rewrite block deleted | 8 |
| Body `data-email-subject` / `data-whatsapp-prefill` removed | 7 |
| Tawk.to widget via `next/script` `afterInteractive` | 10 |
| Delete 6 stale non-locale pages | 12 |
| Remove `home.why` (both files) | 13 (steps 3, 8) |
| Remove `home.techCarouselLabel` (en only) | 13 (step 8) |
| Remove `nav.why`, `nav.tech`, `homeSimple` (both files) | 13 (steps 1, 2, 6, 7) |
| Remove `contact.emailAddress` (both files) | 13 (steps 4, 9) |
| **Not in this plan:** `home.metrics2.*.value` removal — was in the spec but `HomeViewSnap.tsx:288-313` actually uses those values; see "Audit correction" at top of this plan | — |
| Three-commit split: contact / Tawk.to / cleanup | 9, 10, 14 |
| `npm run build` verification at every milestone | All tasks |
