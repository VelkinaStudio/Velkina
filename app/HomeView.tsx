import * as React from 'react';
import Link from 'next/link';
import { CONTACT, mailHref, whatsappHref } from '../lib/contact';

type Locale = 'en' | 'tr' | 'ro';

type LedgerItem = { date: string; client: string; scope: string; outcome: string; status: 'active' | 'delivered' };
type ServiceItem = { id: string; title: string; desc: string };
type ProcessItem = { n: string; title: string; desc: string };
type FaqItem = { q: string; a: string };

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  websites: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M7 13h6" />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h2l2.5 11h11L20 9H6" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19l5-6 4 4 7-10" />
      <path d="M14 7h6v6" />
    </svg>
  )
};

export default function HomeView({ messages, locale }: { messages: any; locale: Locale }) {
  const h = messages.home;
  const common = messages.common;
  const hero = h.hero;
  const ledger = h.ledger;
  const services = h.services;
  const process = h.process;
  const faq = h.faq;
  const cta = h.cta;

  return (
    <div>
      {/* HERO */}
      <section className="vk-section" style={{paddingTop: '4rem'}}>
        <div className="vk-container">
          <span className="vk-eyebrow">{hero.eyebrow}</span>
          <h1 className="vk-display mt-5" style={{maxWidth: '20ch'}}>
            {hero.headline}
          </h1>
          <p className="vk-lead vk-muted mt-6" style={{maxWidth: '42ch'}}>
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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

      <hr className="vk-rule" />

      {/* LEDGER */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="vk-eyebrow">{ledger.eyebrow}</span>
              <h2 className="vk-h2 mt-3" style={{maxWidth: '20ch'}}>{ledger.heading}</h2>
              <p className="vk-muted mt-2">{ledger.sub}</p>
            </div>
            <Link href={`/${locale}/work`} className="vk-nav-link font-mono text-xs uppercase tracking-widest">
              {ledger.seeAll}
            </Link>
          </div>

          <div className="vk-ledger mt-8">
            {(ledger.items as LedgerItem[]).map((it, i) => (
              <div key={i} className="vk-ledger-row">
                <div className="vk-ledger-date">{it.date}</div>
                <div className="vk-ledger-body">
                  <div className="vk-ledger-client">{it.client}</div>
                  <div className="vk-ledger-scope">{it.scope}</div>
                </div>
                <div className="vk-ledger-outcome">
                  <span className="vk-ledger-status" data-status={it.status}>
                    {it.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="vk-rule" />

      {/* SERVICES */}
      <section className="vk-section">
        <div className="vk-container">
          <span className="vk-eyebrow">{services.eyebrow}</span>
          <h2 className="vk-h2 mt-3" style={{maxWidth: '20ch'}}>{services.heading}</h2>
          <p className="vk-muted mt-2" style={{maxWidth: '52ch'}}>{services.sub}</p>

          <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {(services.items as ServiceItem[]).map(s => (
              <Link key={s.id} href={`/${locale}/services#${s.id}`} className="vk-service">
                <div className="vk-service-icon">{SERVICE_ICONS[s.id]}</div>
                <div className="vk-service-title">{s.title}</div>
                <div className="vk-service-desc">{s.desc}</div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link href={`/${locale}/services`} className="vk-nav-link font-mono text-xs uppercase tracking-widest">
              {services.cta}
            </Link>
          </div>
        </div>
      </section>

      <hr className="vk-rule" />


      {/* PROCESS */}
      <section className="vk-section">
        <div className="vk-container">
          <span className="vk-eyebrow">{process.eyebrow}</span>
          <h2 className="vk-h2 mt-3" style={{maxWidth: '20ch'}}>{process.heading}</h2>

          <ol className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {(process.items as ProcessItem[]).map((p, i) => (
              <li key={i} className="vk-card">
                <div className="font-mono text-xs uppercase tracking-widest vk-muted">{p.n}</div>
                <div className="vk-h3 mt-2">{p.title}</div>
                <div className="vk-muted mt-2 text-sm" style={{lineHeight: 1.55}}>{p.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr className="vk-rule" />

      {/* FAQ */}
      <section className="vk-section">
        <div className="vk-container">
          <span className="vk-eyebrow">{faq.eyebrow}</span>
          <div className="mt-8" style={{maxWidth: '720px'}}>
            {(faq.items as FaqItem[]).map((it, i) => (
              <details key={i} className="border-b py-5" style={{borderColor: 'var(--vk-border)'}}>
                <summary className="vk-h3 cursor-pointer list-none flex justify-between items-start gap-4">
                  <span>{it.q}</span>
                  <span className="vk-muted font-mono text-base mt-1 shrink-0">+</span>
                </summary>
                <p className="vk-muted mt-3" style={{lineHeight: 1.6}}>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <hr className="vk-rule" />

      {/* CTA */}
      <section className="vk-section" id="cta">
        <div className="vk-container">
          <span className="vk-eyebrow">{cta.eyebrow}</span>
          <h2 className="vk-h2 mt-3" style={{maxWidth: '20ch'}}>{cta.heading}</h2>
          <p className="vk-muted mt-2" style={{maxWidth: '52ch'}}>{cta.sub}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
