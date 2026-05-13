import Link from 'next/link';
import { whatsappHref } from '../../lib/contact';

type Locale = 'en' | 'tr' | 'ro';

type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
  what: string;
  deliverables: string[];
  timeline: string;
  from: string;
  caseSlug: string;
};

export default function ServicesView({ messages, locale }: { messages: any; locale: Locale }) {
  const s = messages.services;
  const labels = s.labels;
  const common = messages.common;
  const items: ServiceItem[] = s.items;
  const caseTitles = messages.useCase?.studies || {};

  return (
    <div>
      {/* HERO */}
      <section className="vk-section" style={{paddingTop: '4rem'}}>
        <div className="vk-container">
          <span className="vk-eyebrow">{s.hero.eyebrow}</span>
          <h1 className="vk-h1 mt-5" style={{maxWidth: '22ch'}}>{s.hero.heading}</h1>
          <p className="vk-lead vk-muted mt-5" style={{maxWidth: '52ch'}}>{s.hero.sub}</p>
        </div>
      </section>

      <hr className="vk-rule" />

      {/* In-page service nav */}
      <section style={{paddingBlock: '2rem'}}>
        <div className="vk-container">
          <ul className="flex flex-wrap gap-2">
            {items.map(it => (
              <li key={it.id}>
                <a href={`#${it.id}`} className="vk-chip" style={{textDecoration: 'none'}}>
                  {it.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {items.map((it, idx) => {
        const caseTitle = caseTitles[it.caseSlug]?.title;
        return (
          <section key={it.id} id={it.id} style={{paddingBlock: '4rem'}}>
            <hr className="vk-rule" />
            <div className="vk-container pt-16">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="vk-eyebrow">{String(idx + 1).padStart(2, '0')} · {it.title}</span>
                  <h2 className="vk-h2 mt-4" style={{maxWidth: '14ch'}}>{it.tagline}</h2>
                  <p className="vk-muted mt-4" style={{maxWidth: '40ch'}}>{it.what}</p>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-8">
                    <div>
                      <div className="vk-label">{labels.timeline}</div>
                      <div className="mt-1">{it.timeline}</div>
                    </div>
                    <div>
                      <div className="vk-label">{labels.from}</div>
                      <div className="mt-1">{it.from}</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href={whatsappHref(`${common.whatsappPrefill} (${it.title})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vk-btn vk-btn-primary"
                    >
                      {labels.cta} — {it.title}
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 lg:pl-10">
                  <div className="vk-label">{labels.deliverables}</div>
                  <ul className="mt-3 space-y-2">
                    {it.deliverables.map((d, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="font-mono text-xs mt-1" style={{color: 'var(--vk-text-dim)'}}>{String(i + 1).padStart(2, '0')}</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {caseTitle && (
                    <div className="mt-8 vk-card">
                      <div className="vk-label">{labels.case}</div>
                      <Link href={`/${locale}/work/${it.caseSlug}`} className="vk-h3 mt-2 inline-block hover:underline">
                        {caseTitle} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
