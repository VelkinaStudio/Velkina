'use client';

import React, {useState} from 'react';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import {CONTACT, mailHref, whatsappHref} from '../../lib/contact';

export type UseCasesViewProps = {
  messages?: Messages;
  locale?: Locale;
};

const FILTER_ORDER = ['all', 'websites', 'ecommerce', 'qr', 'ads', 'cloud', 'ai', 'mobile'];

// Real, live client-site screenshots captured via Chrome DevTools.
const LIVE_SCREENSHOTS: Record<string, string> = {
  'lavinia-bistro-qr-menu': '/portfolio-screenshots/lavinia-bistro-qr-menu.webp',
  'rain-group-ecommerce': '/portfolio-screenshots/rain-group-ecommerce.webp',
  'drsevim-beauty-clinic': '/portfolio-screenshots/drsevim-beauty-clinic.webp',
  'tp-thermoplast-b2b': '/portfolio-screenshots/tp-thermoplast-b2b.webp',
  'eduturkia-platform': '/portfolio-screenshots/eduturkia-platform.webp',
  'clown3d-creative-studio': '/portfolio-screenshots/clown3d-creative-studio.webp',
  'ataravci-law-firm': '/portfolio-screenshots/ataravci-law-firm.webp'
};

export default function UseCasesView({messages, locale}: UseCasesViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const uc = t('useCases') as any;
  const h = t('home') as any;
  const common = t('common') as any;
  const lang: 'en' | 'tr' | 'ro' = (locale === 'tr' || locale === 'ro') ? locale : 'en';
  const items: any[] = Array.isArray(uc?.projects?.items) ? uc.projects.items : [];

  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);

  const filterLabel = (k: string): string => uc?.filters?.[k] ?? k;

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-vkcyan font-mono mb-3">
          {lang === 'tr' ? 'Seçilmiş İşler' : lang === 'ro' ? 'Proiecte Selectate' : 'Selected Work'}
        </div>
        <h1 className="font-heading text-4xl md:text-6xl leading-tight">{uc?.title ?? 'Selected Work'}</h1>
        <p className="text-white/75 max-w-2xl mt-4 text-base md:text-lg">{uc?.subtitle}</p>

        <div className="mt-8 flex flex-wrap gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-2 px-2" role="radiogroup" aria-label="Project filters">
          {FILTER_ORDER.map((f) => (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={filter === f ? 'true' : 'false'}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm transition ${filter === f ? 'border-vkcyan text-vkcyan bg-vkcyan/10' : 'border-white/15 text-white/75 bg-white/5 hover:bg-white/10'}`}
            >
              {filterLabel(f)}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p: any) => (
            <a
              key={p.slug}
              href={`/${locale}/use-cases/${p.slug}`}
              className="group vk-glass rounded-2xl border border-white/10 overflow-hidden shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50"
            >
              <div className="aspect-[3/2] overflow-hidden bg-black/30 border-b border-white/5">
                <img
                  src={LIVE_SCREENSHOTS[p.slug] || `/projects/${p.mockup || p.slug}.svg`}
                  alt={`${p.client || p.title}${p.url ? ' — live site' : ''}`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    try { (e.currentTarget as HTMLImageElement).src = '/projects/placeholder.svg'; } catch {}
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-vkcyan">{uc?.categories?.[p.category] ?? p.category}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-[10px] text-white/55 font-mono">{p.client}</span>
                </div>
                <h3 className="font-heading text-lg text-white/95 leading-snug">{p.title}</h3>
                <p className="text-sm text-white/65 mt-2 line-clamp-2 leading-relaxed">{p.intro}</p>
                <div className="mt-3 inline-flex items-center text-sm text-vkcyan font-medium">
                  {common?.readCase ?? 'Read case'}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/60">
            {lang === 'tr' ? 'Bu kategoride henüz proje yok.' : lang === 'ro' ? 'Niciun proiect în această categorie.' : 'No projects in this category yet.'}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div className="rounded-2xl border border-white/10 vk-glass shadow-soft p-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl">{uc?.quickContact ?? 'Quick contact'}</h2>
          <p className="text-white/75 mt-3">{uc?.quickContactDesc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              data-cta="whatsapp"
              href={whatsappHref(common?.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono font-semibold"
            >
              {h?.ctas?.whatsapp ?? 'WhatsApp'}
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
