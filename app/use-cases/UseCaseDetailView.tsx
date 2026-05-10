import React from 'react';
import Link from 'next/link';
import type {Messages} from '../../i18n/messages';
import {createT} from '../../i18n/messages';
import {CONTACT, mailHref, whatsappHref} from '../../lib/contact';

type Props = {
  project: any;
  messages: Messages;
  locale: string;
};

export default function UseCaseDetailView({project, messages, locale}: Props) {
  const t = createT(messages);
  const uc = t('useCases') as any;
  const h = t('home') as any;
  const common = t('common') as any;
  const lang: 'en' | 'tr' | 'ro' = (locale === 'tr' || locale === 'ro') ? locale : 'en';
  const labels = uc?.labels || {};

  const allItems: any[] = Array.isArray(uc?.projects?.items) ? uc.projects.items : [];
  const related = allItems.filter(p => p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const fillerCount = Math.max(0, 3 - related.length);
  const fillers = allItems.filter(p => p.slug !== project.slug && p.category !== project.category).slice(0, fillerCount);
  const relatedAll = [...related, ...fillers];

  return (
    <div>
      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-8">
        <Link href={`/${locale}/use-cases`} className="inline-flex items-center text-sm text-white/65 hover:text-vkcyan transition mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5 7.5 12l7.5-7.5"/></svg>
          {common?.backToWork ?? (lang === 'tr' ? 'Tüm projeler' : lang === 'ro' ? 'Toate proiectele' : 'All work')}
        </Link>

        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-wider font-mono text-vkcyan bg-vkcyan/10 border border-vkcyan/30 rounded-full px-2 py-1">{uc?.categories?.[project.category] ?? project.category}</span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-white/55">{project.year}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl leading-tight">{project.title}</h1>
            <p className="text-white/80 mt-5 text-base md:text-lg leading-relaxed">{project.intro}</p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 px-5 py-3 rounded-2xl border border-vkcyan/40 text-vkcyan bg-vkcyan/5 hover:bg-vkcyan/10 transition text-sm"
              >
                {common?.viewLive ?? (lang === 'tr' ? 'Canlı sitesi' : lang === 'ro' ? 'Vezi live' : 'View live')}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
              </a>
            )}
          </div>

          <div className="md:col-span-5">
            <div className="vk-glass rounded-2xl border border-white/10 p-6 shadow-soft">
              <dl className="space-y-3 text-sm">
                <div className="flex items-baseline gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-white/55 w-20 flex-shrink-0">{labels.client ?? 'Client'}</dt>
                  <dd className="text-white/90">{project.client}</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-white/55 w-20 flex-shrink-0">{labels.year ?? 'Year'}</dt>
                  <dd className="text-white/90">{project.year}</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-white/55 w-20 flex-shrink-0">{labels.scope ?? 'Scope'}</dt>
                  <dd className="text-white/90">{project.scope}</dd>
                </div>
                {Array.isArray(project.tags) && project.tags.length > 0 && (
                  <div className="pt-3 border-t border-white/10">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/55 mb-2">{labels.stack ?? 'Stack & tags'}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tg: string) => (
                        <span key={tg} className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/80">{tg}</span>
                      ))}
                    </div>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* MOCKUP HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 shadow-strong">
          <img
            src={`/projects/${project.mockup || project.slug}.svg`}
            alt={project.title}
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* PROBLEM · APPROACH · RESULT */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 pb-12 md:pb-16 space-y-12">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-vkpink font-mono mb-3">{labels.problem ?? 'The problem'}</div>
          <p className="text-white/85 text-base md:text-lg leading-relaxed">{project.problem}</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-vkpurple font-mono mb-3">{labels.approach ?? 'Our approach'}</div>
          <p className="text-white/85 text-base md:text-lg leading-relaxed">{project.approach}</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-vkmint font-mono mb-3">{labels.result ?? 'The result'}</div>
          <p className="text-white/85 text-base md:text-lg leading-relaxed">{project.result}</p>
        </div>
      </section>

      {/* HIGHLIGHTS LIST */}
      {Array.isArray(project.highlights) && project.highlights.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-10 pb-12 md:pb-16">
          <div className="vk-glass rounded-2xl border border-white/10 p-6 md:p-8 shadow-soft">
            <div className="text-xs uppercase tracking-[0.22em] text-vkcyan font-mono mb-4">
              {lang === 'tr' ? 'Öne çıkanlar' : lang === 'ro' ? 'Repere principale' : 'Key highlights'}
            </div>
            <ul className="space-y-3">
              {project.highlights.map((hl: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-white/85 text-sm md:text-base leading-relaxed">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-vkcyan flex-shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* RELATED PROJECTS */}
      {relatedAll.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
          <h2 className="font-heading text-2xl md:text-3xl mb-6">
            {lang === 'tr' ? 'İlgili projeler' : lang === 'ro' ? 'Proiecte similare' : 'Related projects'}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedAll.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/use-cases/${p.slug}`}
                className="group vk-glass rounded-2xl border border-white/10 overflow-hidden shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50"
              >
                <div className="aspect-[3/2] overflow-hidden bg-black/30 border-b border-white/5">
                  <img src={`/projects/${p.mockup || p.slug}.svg`} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-wider font-mono text-vkcyan mb-2">{uc?.categories?.[p.category] ?? p.category}</div>
                  <h3 className="font-heading text-lg text-white/95 leading-snug">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA STRIP */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div className="rounded-2xl border border-white/10 vk-glass shadow-soft p-8 md:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{background: 'radial-gradient(600px 300px at 50% 50%, rgba(0,255,255,0.12), transparent 70%)'}} />
          <h2 className="font-heading text-2xl md:text-3xl relative">
            {lang === 'tr' ? 'Sıradaki proje sizinki olabilir.' : lang === 'ro' ? 'Următorul proiect ar putea fi al dvs.' : "Your project could be next."}
          </h2>
          <p className="text-white/75 mt-3 relative max-w-xl mx-auto">{h?.ctaSection?.subtitle ?? uc?.quickContactDesc}</p>
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
