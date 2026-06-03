import * as React from 'react';
import Link from 'next/link';
import { CONTACT, mailHref, whatsappHref } from '../lib/contact';

/*
 * Velkina v8 — warm graphite atmospheric, scroll-pinned project reveal grid.
 *
 * Reads:
 *   docs/audits/2026-05-14-v8/IMPLEMENTATION-LOG.md  (this build)
 *
 * Section rhythm (canvas: warm graphite → deep → warm marquee → graphite + paper):
 *   0. Cinematic hero (100vh, kinetic typography + ticker)
 *   1. Studio short statement (scenic ring atmosphere)
 *   2. Featured work grid (THE CENTER — image-dominant, hover-reveal)
 *   3. Capabilities marquee (40vh, slow horizontal scroll)
 *   4. Two operators (real voice paragraphs, no placeholders)
 *   5. Footer-CTA scene (kinetic buttons, client marquee)
 */

type Locale = 'en' | 'tr' | 'ro';

type V8 = {
  heroEyebrow: string;
  heroTickerLabel: string;
  heroTickerItems: string[];
  headlineL1: string;
  headlineL2: string;
  headlineL3: string;
  studioEyebrow: string;
  studioStatement: string;
  workEyebrow: string;
  workHeading: string;
  workLead: string;
  capabilitiesItems: string[];
  capabilitiesStatement: string;
  operatorsEyebrow: string;
  operatorsHeading: string;
  nalbaName: string;
  nalbaRole: string;
  nalbaContact: string;
  nalbaVoice: string;
  bahaName: string;
  bahaRole: string;
  bahaContact: string;
  bahaVoice: string;
  contactEyebrow: string;
  contactHeading: string;
  contactHeadingItalic: string;
  contactSub: string;
  contactEmail: string;
  contactWhatsapp: string;
  contactSchedule: string;
  clientsLabel: string;
  seeWorkCta: string;
};

type WorkItem = {
  slug: string;
  client: string;
  industry: string;
  service: string;
  year: string;
  outcome: string;
  image: string;
  liveUrl?: string;
};

// Asymmetric grid sizing — which tiles span 2 cols on desktop.
// The 3 deep-case projects + Lavinia are wide-emphasis.
const WIDE_SLUGS = new Set([
  'rulesell-marketplace',
  'lavinia-bistro-qr-menu',
  'customer-agent-multilingual'
]);

export default function HomeView({
  messages,
  locale
}: {
  messages: any;
  locale: Locale;
}) {
  const common = messages.common;
  const v8 = messages.home.v8 as V8;
  const work = messages.work;
  const tagLabels = work.tagLabels as Record<string, string>;
  const slugTag = work.slugTag as Record<string, string>;
  const hoverProblem = work.hoverProblem as Record<string, string>;
  const featuredSlugs: string[] = work.v8Featured;
  const items: WorkItem[] = work.items;
  const itemBySlug: Record<string, WorkItem> = Object.fromEntries(items.map(it => [it.slug, it]));
  const featured: WorkItem[] = featuredSlugs
    .map(slug => itemBySlug[slug])
    .filter(Boolean);

  // Client marquee — duplicate the list so the CSS animation loops seamlessly.
  const clientNames = items.map(it => it.client);
  const clientTrack = [...clientNames, ...clientNames];

  // Capability marquee — duplicate for seamless loop.
  const capItems = v8.capabilitiesItems;
  const capTrack = [...capItems, ...capItems, ...capItems];

  return (
    <div className="v8-root">

      {/* ═════════════════════════════════════════════════════
          SECTION 0 — Cinematic hero
          ───────────────────────────────────────────────────── */}
      <section className="v8-hero" aria-label="Velkina studio hero">
        <div className="v8-hero-top">
          <span className="v8-mono">{v8.heroEyebrow}</span>
          <span className="v8-mono">{locale.toUpperCase()} · 26.05.14</span>
        </div>

        <div className="v8-hero-center">
          <h1 className="v8-hero-headline">
            <span>{v8.headlineL1}</span>
            <span>{v8.headlineL2}</span>
            <span>{v8.headlineL3}</span>
          </h1>
        </div>

        <div className="v8-hero-bottom">
          <div className="v8-ticker" aria-live="off">
            <span className="v8-ticker-label">{v8.heroTickerLabel}</span>
            {v8.heroTickerItems.slice(0, 3).map((item, i) => (
              <span key={i} className="v8-ticker-item">{item}</span>
            ))}
          </div>
          <a href="#work" className="v8-scroll-hint" aria-label="Scroll to work">
            <span>SCROLL</span>
          </a>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 1 — Studio short statement (scenic)
          ───────────────────────────────────────────────────── */}
      <section className="v8-studio" aria-labelledby="v8-studio-heading">
        <div className="v8-wrap">
          <div className="v8-studio-inner">
            <div>
              <span className="v8-mono" style={{ display: 'block', marginBottom: '1.5rem' }}>
                {v8.studioEyebrow}
              </span>
              <p id="v8-studio-heading" className="v8-studio-statement">
                {v8.studioStatement}
              </p>
            </div>
            <div className="v8-studio-scene" aria-hidden="true">
              <div className="v8-studio-ring">
                <div className="v8-studio-ring-mark"></div>
              </div>
              <div className="v8-studio-ring v8-studio-ring--inner">
                <div className="v8-studio-ring-mark"></div>
              </div>
              <div className="v8-studio-ring v8-studio-ring--core"></div>
              <div className="v8-studio-ring-label">V</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 2 — Featured work grid (THE CENTER)
          ───────────────────────────────────────────────────── */}
      <section id="work" className="v8-work" aria-labelledby="v8-work-heading">
        <div className="v8-wrap">
          <div className="v8-work-header">
            <span className="v8-mono">{v8.workEyebrow}</span>
            <h2 id="v8-work-heading" className="v8-work-heading">
              {v8.workHeading}
            </h2>
            <p className="v8-work-lead">{v8.workLead}</p>
          </div>

          <ul className="v8-tile-grid list-none p-0 m-0">
            {featured.map((it, idx) => {
              const tagKey = slugTag[it.slug] || 'web';
              const tag = tagLabels[tagKey] || tagKey.toUpperCase();
              const problem = hoverProblem[it.slug] || '';
              const wide = WIDE_SLUGS.has(it.slug);
              return (
                <li key={it.slug} className={wide ? 'v8-tile--wide' : ''}>
                  <Link
                    href={`/${locale}/work/${it.slug}`}
                    className="v8-tile"
                    aria-label={`${it.client} — ${tagLabels.viewCase || 'View case'}`}
                  >
                    <div className="v8-tile-image">
                      <img
                        src={it.image}
                        alt={`${it.client} — ${it.service}`}
                        loading={idx < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <div className="v8-tile-overlay">
                        {problem && (
                          <p className="v8-tile-overlay-text">{problem}</p>
                        )}
                        <span className="v8-tile-overlay-cta">
                          {tagLabels.viewCase || 'VIEW CASE STUDY →'}
                        </span>
                      </div>
                    </div>
                    <div className="v8-tile-meta">
                      <span className="v8-tile-tag">{tag} · {it.year}</span>
                      <span className="v8-tile-client">{it.client}</span>
                      <span className="v8-tile-service">{it.service}</span>
                      <span className="v8-tile-outcome">{it.outcome}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href={`/${locale}/work`} className="v8-see-all">
            {v8.seeWorkCta}
          </Link>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 3 — Capabilities marquee
          ───────────────────────────────────────────────────── */}
      <section className="v8-marquee-section" aria-label="What we do">
        <div className="v8-marquee" aria-hidden="true">
          {capTrack.map((cap, i) => (
            <React.Fragment key={`${cap}-${i}`}>
              <span className="v8-marquee-item">{cap}</span>
              <span className="v8-marquee-sep">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="v8-wrap">
          <p className="v8-capabilities-statement">{v8.capabilitiesStatement}</p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 4 — Two operators
          ───────────────────────────────────────────────────── */}
      <section className="v8-operators" aria-labelledby="v8-operators-heading">
        <div className="v8-wrap">
          <div className="v8-operators-header">
            <span className="v8-mono">{v8.operatorsEyebrow}</span>
            <h2 id="v8-operators-heading" className="v8-operators-heading">
              {v8.operatorsHeading}
            </h2>
          </div>

          <div className="v8-operators-grid">
            <article className="v8-operator">
              <div className="v8-operator-avatar" aria-hidden="true">
                <span>N</span>
              </div>
              <div className="v8-operator-body">
                <span className="v8-operator-name">{v8.nalbaName}</span>
                <span className="v8-operator-role">{v8.nalbaRole}</span>
                <p className="v8-operator-voice">{v8.nalbaVoice}</p>
                <span className="v8-operator-contact">{v8.nalbaContact}</span>
              </div>
            </article>

            <article className="v8-operator">
              <div className="v8-operator-avatar" aria-hidden="true">
                <span>B</span>
              </div>
              <div className="v8-operator-body">
                <span className="v8-operator-name">{v8.bahaName}</span>
                <span className="v8-operator-role">{v8.bahaRole}</span>
                <p className="v8-operator-voice">{v8.bahaVoice}</p>
                <span className="v8-operator-contact">{v8.bahaContact}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 5 — Footer CTA scene
          ───────────────────────────────────────────────────── */}
      <section className="v8-cta-scene" id="cta" aria-labelledby="v8-cta-heading">
        <div className="v8-wrap">
          <span className="v8-mono" style={{ display: 'block', marginBottom: '1.5rem' }}>
            {v8.contactEyebrow}
          </span>
          <h2 id="v8-cta-heading">
            <span className="v8-cta-heading">{v8.contactHeading}</span>
            {v8.contactHeadingItalic ? (
              <>{' '}<span className="v8-cta-heading-italic">{v8.contactHeadingItalic}</span></>
            ) : null}
          </h2>
          <p className="v8-cta-sub">{v8.contactSub}</p>

          <div className="v8-cta-links">
            <a
              className="v8-cta-link"
              href={mailHref(common.emailSubject)}
            >
              <span className="v8-cta-link-label">{v8.contactEmail}</span>
              <span className="v8-cta-link-value">{CONTACT.email}</span>
            </a>
            <a
              className="v8-cta-link"
              href={whatsappHref(common.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="v8-cta-link-label">{v8.contactWhatsapp}</span>
              <span className="v8-cta-link-value">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              className="v8-cta-link"
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="v8-cta-link-label">{v8.contactSchedule}</span>
              <span className="v8-cta-link-value">cal.com/velkina</span>
            </a>
          </div>

          <div className="v8-clients-marquee" aria-label="Past clients">
            <p className="v8-clients-label">{v8.clientsLabel}</p>
            <div className="v8-clients-track" aria-hidden="true">
              {clientTrack.map((name, i) => (
                <span key={`${name}-${i}`} className="v8-clients-track-item">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
