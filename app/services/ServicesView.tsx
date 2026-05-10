import React from 'react';
import type { ReactNode } from 'react';
import HeroShapesClient from '../../components/HeroShapesClient';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import {CONTACT, mailHref, whatsappHref} from '../../lib/contact';

export type ServicesViewProps = {
  messages?: Messages;
  locale?: Locale;
};

const ICON: Record<string, ReactNode> = {
  websites: <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zm9-9v18m-9-9h18M5.6 5.6c2 3.4 2 9.4 0 12.8M18.4 5.6c-2 3.4-2 9.4 0 12.8" strokeLinecap="round" strokeLinejoin="round"/>,
  shopify: <path d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7" strokeLinecap="round" strokeLinejoin="round"/>,
  'qr-menu': <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h2v2h-2v-2zm4 0h3v3h-3v-3zm-4 5h3v2h-3v-2zm5 0h2v2h-2v-2z" strokeLinecap="round" strokeLinejoin="round"/>,
  'google-ads': <path d="M3 16l5-9 4 7 4-5 5 7H3z" strokeLinecap="round" strokeLinejoin="round"/>,
  'meta-ads': <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.5-1.2 4.8-3 6.3M12 4c-3 0-5.7 2.7-6.5 6m6.5-6c3 0 5.7 2.7 6.5 6" strokeLinecap="round" strokeLinejoin="round"/>,
  cloud: <path d="M6.5 19a4.5 4.5 0 010-9 6 6 0 0111.7 1A4 4 0 0118 19H6.5z" strokeLinecap="round" strokeLinejoin="round"/>,
  'ai-automation': <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1M9 12a3 3 0 116 0 3 3 0 01-6 0z" strokeLinecap="round" strokeLinejoin="round"/>,
  mobile: <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm3 18h4" strokeLinecap="round" strokeLinejoin="round"/>,
  seo: <path d="M11 4a7 7 0 100 14 7 7 0 000-14zm5.5 12L21 20.5" strokeLinecap="round" strokeLinejoin="round"/>,
  branding: <path d="M12 3l2.5 6 6.5.5-5 4.3 1.5 6.5L12 17l-5.5 3.3 1.5-6.5-5-4.3 6.5-.5L12 3z" strokeLinecap="round" strokeLinejoin="round"/>
};

export default function ServicesView({messages, locale}: ServicesViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const lang: 'en' | 'tr' | 'ro' = (locale === 'tr' || locale === 'ro') ? locale : 'en';
  const services = (t('services') as any) || {};
  const h = (t('home') as any) || {};
  const common = (t('common') as any) || {};
  const items: any[] = Array.isArray(services?.items) ? services.items : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -inset-24 blur-3xl opacity-50 pointer-events-none" style={{background: 'radial-gradient(600px 300px at 20% 10%, rgba(162,89,255,.30), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(0,255,255,.20), transparent 60%)'}} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-10 md:pb-14">
          <div className="text-xs uppercase tracking-[0.22em] text-vkcyan font-mono mb-3">
            {lang === 'tr' ? 'Hizmetlerimiz' : lang === 'ro' ? 'Serviciile noastre' : 'Our services'}
          </div>
          <h1 className="font-heading text-4xl md:text-6xl leading-tight max-w-3xl">{services?.title ?? 'Services'}</h1>
          <p className="text-white/80 mt-5 text-base md:text-lg max-w-2xl">{services?.subtitle ?? services?.heroDesc}</p>
        </div>
      </section>

      {/* Sticky TOC chips */}
      <div className="sticky top-20 z-30 -mx-6 md:mx-0 px-6 py-3 bg-vkbg/85 backdrop-blur border-y border-white/10">
        <div className="max-w-7xl mx-auto relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 z-10" style={{background: 'linear-gradient(90deg, var(--vk-bg), transparent)'}} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 z-10" style={{background: 'linear-gradient(270deg, var(--vk-bg), transparent)'}} />
          <nav className="flex gap-2 overflow-x-auto hide-scrollbar snap-x" aria-label="Services table of contents">
            {items.map((s: any) => (
              <a key={s.id} href={`#${s.id}`} className="snap-start flex-shrink-0 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-vkcyan/40 text-white/80 text-sm whitespace-nowrap transition">
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Models + Included */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-12 grid gap-4 md:grid-cols-2">
        <div className="vk-glass border border-white/10 rounded-2xl p-6 shadow-soft">
          <h2 className="font-heading text-lg md:text-xl mb-3">{services?.modelsTitle ?? 'How we work'}</h2>
          <ul className="space-y-2 text-white/80 text-sm md:text-base leading-relaxed">
            {(services?.models ?? []).map((m: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-vkcyan flex-shrink-0 mt-1"><circle cx="12" cy="12" r="3"/></svg>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="vk-glass border border-white/10 rounded-2xl p-6 shadow-soft">
          <h2 className="font-heading text-lg md:text-xl mb-3">{services?.includedTitle ?? 'Always included'}</h2>
          <ul className="space-y-2 text-white/80 text-sm md:text-base leading-relaxed">
            {(services?.included ?? []).map((m: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-vkmint flex-shrink-0 mt-1"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service sections */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16 space-y-12">
        {items.map((s: any) => {
          const isQr = s.id === 'qr-menu';
          return (
            <article id={s.id} key={s.id} className="scroll-mt-32 vk-glass border border-white/10 rounded-2xl p-6 md:p-8 shadow-soft">
              <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`w-6 h-6 ${isQr ? 'text-vkpink' : 'text-vkcyan'}`}>{ICON[s.id] ?? ICON.websites}</svg>
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl text-white/95 leading-tight">{s.title}</h2>
                    {s.tag && <div className="text-xs text-white/60 mt-1 font-mono">{s.tag}</div>}
                    <p className="text-white/80 mt-3 text-sm md:text-base leading-relaxed max-w-2xl">{s.intro}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex md:flex-col gap-2">
                  {isQr ? (
                    <a href={`/${locale}/demo/qr-menu`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-vkpink text-black font-mono text-sm shadow-strong hover:-translate-y-0.5 transition font-semibold">
                      {lang === 'tr' ? 'Demoyu aç' : lang === 'ro' ? 'Deschide demo' : 'Try the demo'}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                    </a>
                  ) : (
                    <a href={`/${locale}#cta`} className="inline-flex items-center px-4 py-2.5 rounded-xl border border-vkcyan/40 text-vkcyan bg-vkcyan/5 hover:bg-vkcyan/10 text-sm transition">
                      {services?.start ?? (lang === 'tr' ? 'Başla' : lang === 'ro' ? 'Începe' : 'Start')}
                    </a>
                  )}
                </div>
              </header>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-vkcyan mb-3">{services?.deliverables ?? 'Deliverables'}</h3>
                  <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
                    {(s.deliverables ?? []).map((d: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-vkcyan flex-shrink-0">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-vkmint mb-3">{services?.outcomes ?? 'Outcomes'}</h3>
                  <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
                    {(s.outcomes ?? []).map((d: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-vkmint flex-shrink-0 mt-1"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-vkpink mb-3">{services?.examples ?? 'Best for'}</h3>
                  <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
                    {(s.examples ?? []).map((d: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-vkpink flex-shrink-0">→</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 pb-16">
        <div className="vk-glass border border-white/10 rounded-2xl p-6 md:p-8 shadow-soft">
          <h2 className="font-heading text-2xl md:text-3xl mb-6">{services?.faq ?? 'FAQ'}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {(services?.faqs ?? []).map((qa: any, i: number) => (
              <div key={i}>
                <h3 className="font-heading text-base text-white/95">{qa.q}</h3>
                <p className="mt-2 text-white/75 text-sm leading-relaxed">{qa.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div id="cta" className="rounded-2xl border border-white/10 vk-glass shadow-soft p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{background: 'radial-gradient(600px 300px at 50% 50%, rgba(0,255,255,0.12), transparent 70%)'}}/>
          <h2 className="font-heading text-2xl md:text-3xl relative">{services?.quickContact ?? 'Quick contact'}</h2>
          <p className="text-white/75 mt-3 relative">{services?.quickContactDesc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 relative">
            <a
              data-cta="whatsapp"
              href={whatsappHref(common?.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono font-semibold"
            >
              {h?.ctas?.whatsapp}
            </a>
            <a
              data-cta="email"
              href={mailHref(common?.emailSubject)}
              className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition"
            >
              {h?.ctas?.email}
            </a>
            <a
              data-cta="schedule"
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition"
            >
              {h?.ctas?.schedule}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
