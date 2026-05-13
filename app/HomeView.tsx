import * as React from 'react';
import { CONTACT, mailHref, whatsappHref } from '../lib/contact';

/*
 * Velkina v7 landing — VK-numbered horizontal-drag ledger
 *
 * Reads:
 *   docs/needs/v7-landing.md            (audience + outcome + kill condition)
 *   docs/strategy/founder-loop.md       (Class A competitive set)
 *   docs/design/velkina-v7-direction.md (the build spec)
 *
 * Section rhythm (canvas shifts #0A0A0B → #13131A → #0A0A0B → #13131A → #0A0A0B):
 *   0. Hero               — VK-NN horizontal-drag ledger (signature move)
 *   1. Tagline + operators
 *   2. Services as work-pairs (text-left / proof-right, alternating)
 *   3. Big Number (47 projects since 2018) — Adobe Spectrum design-object style
 *   4. Founder voice (real Nalba + Baha paragraphs, not placeholders)
 *   5. Contact (three links, no form)
 */

type Locale = 'en' | 'tr' | 'ro';

type LedgerItem = {
  date: string;
  client: string;
  kind: string;
  outcome: string;
  status: 'active' | 'delivered';
};

type ServicePair = { service: string; proof: string };

type V7 = {
  drag: string;
  recentRibbon: string;
  descriptions: string[];
  taglineLead: string;
  taglineMid: string;
  taglineEnd: string;
  operatorIntro: string;
  nalbaRole: string;
  bahaRole: string;
  servicesEyebrow: string;
  servicesHeading: string;
  servicePairs: ServicePair[];
  bigNumberEyebrow: string;
  bigNumberValue: string;
  bigNumberCaption: string;
  bigNumberFootnote: string;
  voiceEyebrow: string;
  voiceHeading: string;
  nalbaVoice: string;
  bahaVoice: string;
  contactEyebrow: string;
  contactHeading: string;
  contactSub: string;
  contactEmail: string;
  contactWhatsapp: string;
  contactSchedule: string;
};

export default function HomeView({ messages, locale }: { messages: any; locale: Locale }) {
  const common = messages.common;
  const ledgerItems = (messages.home.ledger.items as LedgerItem[]) ?? [];
  const v7 = messages.home.v7 as V7;

  // Build the 6 VK-NN rows by walking the existing ledger.
  // descriptions[] is parallel-indexed to ledgerItems so client-name
  // translation drift between locales cannot break the join.
  const rows = ledgerItems.map((item, idx) => ({
    code: `VK-${String(idx + 1).padStart(2, '0')}`,
    ...item,
    description: v7.descriptions[idx] ?? `${item.kind} — ${item.outcome}.`,
  }));

  return (
    <div className="v7-page">
      {/* ═══════════════════════════════════════════════════
          0. HERO — VK-numbered horizontal-drag ledger
          ─────────────────────────────────────────────────── */}
      <section className="v7-hero" aria-label="Recent shipped work ledger">
        <div className="v7-hero-frame">
          <div className="v7-hero-top">
            <span className="v7-mono-eyebrow">{v7.recentRibbon}</span>
            <span className="v7-mono-eyebrow" aria-hidden="true">
              {String(rows.length).padStart(2, '0')} / {String(rows.length).padStart(2, '0')}
            </span>
          </div>

          <div
            className="v7-hero-rail"
            role="region"
            aria-label="Drag horizontally to see all recent work"
            tabIndex={0}
          >
            {rows.map((row) => (
              <article key={row.code} className="v7-hero-row">
                <div className="v7-hero-code">
                  <span className="v7-mono-eyebrow">{row.code}</span>
                  <span
                    className="v7-hero-code-status"
                    data-status={row.status}
                  >
                    {row.status === 'active' ? 'ACTIVE' : 'SHIPPED'}
                  </span>
                </div>
                <h2 className="v7-hero-client">{row.client}</h2>
                <div className="v7-hero-meta">
                  <div className="v7-hero-tag">
                    <span className="v7-hero-tag-kind">{row.kind}</span>
                    <span className="v7-hero-tag-date">{row.date}</span>
                  </div>
                  <p className="v7-hero-desc">{row.description}</p>
                  <span className="v7-hero-outcome">{row.outcome}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="v7-hero-bottom">
            <span className="v7-drag-affordance" aria-hidden="true">
              {v7.drag}
            </span>
            <span className="v7-mono-eyebrow" aria-hidden="true">
              VELKINA · {locale.toUpperCase()}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          1. TAGLINE + OPERATORS
          ─────────────────────────────────────────────────── */}
      <section className="v7-section v7-section-lift">
        <div className="v7-wrap">
          <span className="v7-mono-eyebrow">{v7.operatorIntro}</span>
          <h2 className="v7-tagline" style={{ marginTop: '1.25rem' }}>
            <span>{v7.taglineLead}</span>{' '}
            <span>{v7.taglineMid}</span>{' '}
            <em>{v7.taglineEnd}</em>
          </h2>
          <div className="v7-operators">
            <div className="v7-operator-card">
              <div className="v7-operator-name">Nalba</div>
              <div className="v7-operator-role">{v7.nalbaRole}</div>
            </div>
            <div className="v7-operator-card">
              <div className="v7-operator-name">Baha</div>
              <div className="v7-operator-role">{v7.bahaRole}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. SERVICES AS WORK-PAIRS (alternating text-left/right)
          ─────────────────────────────────────────────────── */}
      <section className="v7-section v7-section-base">
        <div className="v7-wrap">
          <span className="v7-mono-eyebrow">{v7.servicesEyebrow}</span>
          <h2
            className="v7-tagline"
            style={{ marginTop: '1.25rem', maxWidth: '22ch' }}
          >
            {v7.servicesHeading}
          </h2>

          <div className="v7-pairs">
            {v7.servicePairs.map((p, i) => (
              <div key={p.service} className="v7-pair">
                <div className="v7-pair-service">{p.service}</div>
                <div className="v7-pair-proof">
                  <span>PROOF / {String(i + 1).padStart(2, '0')}</span>
                  {p.proof}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. THE BIG NUMBER — Adobe Spectrum-style design object
          ─────────────────────────────────────────────────── */}
      <section className="v7-section v7-section-lift">
        <div className="v7-wrap">
          <div className="v7-bignumber">
            <span className="v7-bignumber-eyebrow">
              {v7.bigNumberEyebrow}
            </span>
            <span className="v7-bignumber-value" aria-label={v7.bigNumberCaption}>
              {v7.bigNumberValue}
            </span>
            <span className="v7-bignumber-caption">
              {v7.bigNumberCaption}
            </span>
            <p className="v7-bignumber-foot">{v7.bigNumberFootnote}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. FOUNDER VOICE — Nalba + Baha real paragraphs
          (no {{NALBA_VOICE_EN}} placeholders, per v6 HANDOFF gap #75)
          ─────────────────────────────────────────────────── */}
      <section className="v7-section v7-section-base">
        <div className="v7-wrap">
          <span className="v7-mono-eyebrow">{v7.voiceEyebrow}</span>
          <h2
            className="v7-tagline"
            style={{ marginTop: '1.25rem', maxWidth: '22ch' }}
          >
            {v7.voiceHeading}
          </h2>

          <div className="v7-voice">
            <figure style={{ margin: 0 }}>
              <blockquote className="v7-voice-quote" style={{ margin: 0 }}>
                {v7.nalbaVoice}
              </blockquote>
              <figcaption className="v7-voice-attr">
                <span className="v7-voice-name">Nalba</span>
                <span className="v7-voice-role">{v7.nalbaRole}</span>
              </figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <blockquote className="v7-voice-quote" style={{ margin: 0 }}>
                {v7.bahaVoice}
              </blockquote>
              <figcaption className="v7-voice-attr">
                <span className="v7-voice-name">Baha</span>
                <span className="v7-voice-role">{v7.bahaRole}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. CONTACT — three links, no form
          ─────────────────────────────────────────────────── */}
      <section className="v7-section v7-section-base v7-contact" id="cta">
        <div className="v7-wrap">
          <span className="v7-mono-eyebrow">{v7.contactEyebrow}</span>
          <h2 className="v7-contact-heading" style={{ marginTop: '1.25rem' }}>
            {v7.contactHeading}
          </h2>
          <p className="v7-contact-sub">{v7.contactSub}</p>

          <div className="v7-contact-links" role="list">
            <a
              role="listitem"
              className="v7-contact-link"
              href={mailHref(common.emailSubject)}
            >
              <span className="v7-contact-link-num">01 / EMAIL</span>
              <span className="v7-contact-link-label">{v7.contactEmail}</span>
              <span className="v7-contact-link-value">{CONTACT.email}</span>
            </a>
            <a
              role="listitem"
              className="v7-contact-link"
              href={whatsappHref(common.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="v7-contact-link-num">02 / CHAT</span>
              <span className="v7-contact-link-label">{v7.contactWhatsapp}</span>
              <span className="v7-contact-link-value">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              role="listitem"
              className="v7-contact-link"
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="v7-contact-link-num">03 / CAL</span>
              <span className="v7-contact-link-label">{v7.contactSchedule}</span>
              <span className="v7-contact-link-value">cal.com/velkina</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
