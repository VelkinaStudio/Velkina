import * as React from 'react';
import Link from 'next/link';
import { CONTACT, mailHref, whatsappHref } from '../lib/contact';

type Locale = 'en' | 'tr' | 'ro';

type LedgerItem = { date: string; client: string; kind: string; outcome: string; status: 'active' | 'delivered'; slug?: string; liveUrl?: string };
type ServiceItem = { id: string; title: string; line: string };
type ProcessItem = { n: string; title: string; desc: string };
type FaqItem = { q: string; a: string };

export default function HomeView({ messages, locale }: { messages: any; locale: Locale }) {
  const h = messages.home;
  const common = messages.common;
  const hero = h.hero;
  const ledger = h.ledger;
  const services = h.services;
  const process = h.process;
  const faq = h.faq;
  const cta = h.cta;

  const ledgerItems = ledger.items as LedgerItem[];
  const workItems = (messages.work?.items || []) as Array<{ slug: string; client: string; liveUrl?: string }>;
  // Join ledger client → work slug + liveUrl
  const enrichedLedger = ledgerItems.map(l => {
    const match = workItems.find(w => w.client === l.client);
    return { ...l, slug: match?.slug, liveUrl: match?.liveUrl };
  });
  const serviceItems = services.items as ServiceItem[];
  const workLabels = messages.work?.labels || {};
  // Marquee uses ledger client names + scopes — doubled so it loops seamlessly
  const marqueeItems = ledgerItems.flatMap(l => [`${l.client}`, l.kind]);
  const marquee = [...marqueeItems, ...marqueeItems];

  return (
    <div>
      {/* HERO — kinetic display */}
      <section className="vk-section" style={{paddingTop: 'clamp(3rem, 8vw, 6rem)', paddingBottom: 'clamp(2rem, 5vw, 4rem)'}}>
        <div className="vk-container relative">
          <div className="flex items-center justify-between mb-10">
            <span className="vk-eyebrow">{hero.label}</span>
            <span className="vk-eyebrow" style={{paddingLeft: 0}}>
              <span className="vk-italic" style={{fontSize: '0.95rem', letterSpacing: '-0.005em', textTransform: 'none'}}>{hero.tag}</span>
            </span>
          </div>

          <h1 className="vk-display" style={{maxWidth: '14ch'}}>
            <span style={{display: 'block'}}>{hero.we} {hero.verb}</span>
            <span className="vk-kinetic" aria-hidden="true">
              <ul className="vk-kinetic-list">
                {(hero.objects as string[]).map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
                {/* repeat first item so the rotation loops cleanly */}
                <li>{(hero.objects as string[])[0]}</li>
              </ul>
            </span>
            {/* SR-only: spell out the list for screen readers */}
            <span className="sr-only">
              {(hero.objects as string[]).join(', ')}
            </span>
          </h1>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappHref(common.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-btn vk-btn-primary"
            >
              {hero.primaryCta}
            </a>
            <Link href={`/${locale}/work`} className="vk-btn vk-btn-secondary">
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE — kinetic shipping log */}
      <div className="vk-marquee" aria-hidden="true">
        <div className="vk-marquee-track">
          {marquee.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      {/* LEDGER */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <span className="vk-eyebrow">{ledger.eyebrow}</span>
              <h2 className="vk-display mt-4" style={{maxWidth: '14ch'}}>
                {ledger.headingLead}{' '}
                <span className="vk-italic">{ledger.headingItalic}</span>
              </h2>
            </div>
            <Link href={`/${locale}/work`} className="vk-nav-link font-mono text-xs uppercase tracking-widest">
              {ledger.seeAll}
            </Link>
          </div>

          <ul className="vk-ledger list-none p-0 m-0">
            {enrichedLedger.map((it, i) => {
              const isExternal = !!it.liveUrl && /^https?:/.test(it.liveUrl);
              return (
                <li key={i} className="vk-ledger-row-wrap">
                  {it.slug ? (
                    <Link href={`/${locale}/work/${it.slug}`} className="vk-ledger-row vk-ledger-row-link">
                      <span className="vk-ledger-date">{it.date}</span>
                      <span className="vk-ledger-body">
                        <span className="vk-ledger-client">{it.client}</span>
                        <span className="vk-ledger-scope vk-italic">{it.kind}</span>
                      </span>
                      <span className="vk-ledger-outcome">
                        <span className="vk-ledger-status" data-status={it.status}>{it.outcome}</span>
                      </span>
                    </Link>
                  ) : (
                    <div className="vk-ledger-row">
                      <span className="vk-ledger-date">{it.date}</span>
                      <span className="vk-ledger-body">
                        <span className="vk-ledger-client">{it.client}</span>
                        <span className="vk-ledger-scope vk-italic">{it.kind}</span>
                      </span>
                      <span className="vk-ledger-outcome">
                        <span className="vk-ledger-status" data-status={it.status}>{it.outcome}</span>
                      </span>
                    </div>
                  )}
                  {it.liveUrl && (
                    <a
                      href={it.liveUrl}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="vk-ledger-live"
                    >
                      {workLabels.viewLive || 'Visit live →'}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* SERVICES — "we do this" row list */}
      <section className="vk-section" style={{background: 'var(--vk-surface)'}}>
        <div className="vk-container">
          <div className="mb-12">
            <span className="vk-eyebrow">{services.eyebrow}</span>
            <h2 className="vk-display mt-4" style={{maxWidth: '14ch'}}>
              {services.headingLead}{' '}
              <span className="vk-italic">{services.headingItalic}</span>
            </h2>
          </div>

          <ul className="list-none p-0 m-0">
            {serviceItems.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={`/${locale}/services#${s.id}`}
                  className="vk-service-row"
                >
                  <span className="vk-service-row-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="vk-service-row-body">
                    <span className="vk-service-row-title">{s.title}</span>
                    <span className="vk-service-row-line">{s.line}</span>
                  </span>
                  <span className="vk-service-row-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link href={`/${locale}/services`} className="vk-nav-link font-mono text-xs uppercase tracking-widest">
              {services.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="mb-12">
            <span className="vk-eyebrow">{process.eyebrow}</span>
            <h2 className="vk-display mt-4" style={{maxWidth: '14ch'}}>
              {process.headingLead}{' '}
              <span className="vk-italic">{process.headingItalic}</span>
            </h2>
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(process.items as ProcessItem[]).map((p, i) => (
              <li key={i}>
                <div className="font-mono text-xs uppercase tracking-widest vk-muted">{p.n}</div>
                <div className="vk-h2 mt-3" style={{fontSize: '1.5rem'}}>{p.title}</div>
                <div className="vk-muted mt-3 text-sm" style={{lineHeight: 1.55, maxWidth: '32ch'}}>{p.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="vk-eyebrow">{faq.eyebrow}</span>
            </div>
            <div className="lg:col-span-8">
              {(faq.items as FaqItem[]).map((it, i) => (
                <details key={i} className="border-b py-6" style={{borderColor: 'var(--vk-border)'}}>
                  <summary className="cursor-pointer list-none flex justify-between items-start gap-4 vk-h2" style={{fontSize: '1.25rem', fontWeight: 500}}>
                    <span>{it.q}</span>
                    <span className="vk-muted font-mono text-base mt-1 shrink-0">+</span>
                  </summary>
                  <p className="vk-muted mt-3" style={{lineHeight: 1.65, maxWidth: '60ch'}}>{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vk-section" id="cta" style={{paddingBottom: 'clamp(4rem, 10vw, 8rem)'}}>
        <div className="vk-container">
          <span className="vk-eyebrow">{cta.eyebrow}</span>
          <h2 className="vk-display mt-4" style={{maxWidth: '14ch'}}>
            {cta.headingLead}{' '}
            <span className="vk-italic">{cta.headingItalic}</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappHref(common.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-btn vk-btn-primary"
            >
              {cta.whatsapp}
            </a>
            <a href={mailHref(common.emailSubject)} className="vk-btn vk-btn-secondary">
              {cta.email}
            </a>
            <a
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-btn vk-btn-secondary"
            >
              {cta.schedule}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
