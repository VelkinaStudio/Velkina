'use client';

import React, {useState} from 'react';
import CountUpClient from '../components/CountUpClient';
import RevealClient from '../components/RevealClient';
import type {Locale, Messages} from '../i18n/messages';
import {createT, getDefaultMessages} from '../i18n/messages';
import {CONTACT, mailHref, whatsappHref} from '../lib/contact';

type HomeViewProps = {
  messages?: Messages;
  locale?: Locale;
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
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

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  en: {websites: 'Websites', ecommerce: 'E-commerce', qr: 'QR Menus', ads: 'Ads & Growth', cloud: 'Cloud', ai: 'AI', mobile: 'Mobile'},
  tr: {websites: 'Web Siteleri', ecommerce: 'E-ticaret', qr: 'QR Menüler', ads: 'Reklam & Büyüme', cloud: 'Cloud', ai: 'Yapay Zekâ', mobile: 'Mobil'},
  ro: {websites: 'Site-uri web', ecommerce: 'E-commerce', qr: 'Meniuri QR', ads: 'Reclame & Creștere', cloud: 'Cloud', ai: 'AI', mobile: 'Mobil'}
};

export default function HomeView({messages, locale}: HomeViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const h = t('home') as any;
  const common = t('common') as any;
  const lang: 'en' | 'tr' | 'ro' = (locale === 'tr' || locale === 'ro' || locale === 'en') ? locale : 'en';
  const services = (t('services') as any) || {};
  const serviceItems: any[] = Array.isArray(services?.items) ? services.items : [];
  const useCases = (t('useCases') as any) || {};
  const projects: any[] = Array.isArray(useCases?.projects?.items) ? useCases.projects.items : [];

  const m2 = h?.metrics2 || {};
  const heroData = h?.hero || {};
  const testimonials = Array.isArray(h?.testimonials?.items) ? h.testimonials.items : [];
  const ledger = h?.ledger || {};
  const ledgerActive: any[] = Array.isArray(ledger?.active) ? ledger.active : [];
  const ledgerRecent: any[] = Array.isArray(ledger?.recent) ? ledger.recent : [];
  const statusLabels: Record<string, string> = ledger?.statusLabels || {};

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs: any[] = Array.isArray(h?.faq?.items) ? h.faq.items : [];

  const catLabel = (k: string) => CATEGORY_LABELS[lang]?.[k] || k;

  const brandLogos = [
    {id: 'clown3d', name: 'Clown 3D', src: '/clients/clown3d.svg'},
    {id: 'raingroup', name: 'Rain Group', src: '/clients/raingroup.svg'},
    {id: 'novahealth', name: 'Nova Health', src: '/clients/novahealth.svg'},
    {id: 'skyline-media', name: 'Skyline Media', src: '/clients/skyline-media.svg'},
    {id: 'marmara-foods', name: 'Marmara Foods', src: '/clients/marmara-foods.svg'},
    {id: 'bosporus-travel', name: 'Bosporus Travel', src: '/clients/bosporus-travel.svg'},
    {id: 'anatolia-hotel', name: 'Anatolia Hotel', src: '/clients/anatolia-hotel.svg'},
    {id: 'velkina', name: 'Velkina', src: '/clients/velkina.svg'}
  ];

  const techStack = [
    {name: 'Next.js', src: '/brands/nextjs.svg'},
    {name: 'React', src: '/brands/react.svg'},
    {name: 'AWS', src: '/brands/aws.svg'},
    {name: 'Cloudflare', src: '/brands/cloudflare.svg'},
    {name: 'PostgreSQL', src: '/brands/postgresql.svg'},
    {name: 'Vercel', src: '/brands/vercel.svg'},
    {name: 'GitHub', src: '/brands/github.svg'},
    {name: 'Stripe', src: '/brands/stripe.svg'}
  ];

  return (
    <div className="relative">
      <CountUpClient />
      <RevealClient />

      {/* HERO — editorial split */}
      <section id="hero" className="relative pt-12 md:pt-20 pb-24 md:pb-32 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-90" style={{background: 'var(--vk-grad-warm)'}} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 reveal-on-scroll">
              <div className="text-[11px] uppercase tracking-[0.28em] text-vkaccent font-mono mb-6">
                {heroData.eyebrow ?? 'Software · Design · Growth'}
              </div>
              <h1 className="display-1 text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-vktext">
                {heroData.title ?? 'We build software and design that helps your business grow.'}
              </h1>
              <p className="mt-8 text-vktext/75 text-lg md:text-xl leading-relaxed max-w-2xl">
                {heroData.subtitle ?? ''}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`/${locale}#cta`}
                  className="vk-cta vk-cta-primary inline-flex items-center px-6 py-4 rounded-md font-mono text-sm font-semibold tracking-wider uppercase"
                >
                  {heroData.primaryCta ?? 'Start a project'}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 ml-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                </a>
                <a
                  href={`/${locale}/use-cases`}
                  className="vk-cta vk-cta-ghost inline-flex items-center px-6 py-4 rounded-md font-mono text-sm font-semibold tracking-wider uppercase"
                >
                  {heroData.secondaryCta ?? 'See our work'}
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 reveal-on-scroll" data-delay="200">
              <section className="vk-ledger" data-vk-section="ledger" aria-label={ledger?.heading}>
                <div className="vk-ledger__header">
                  <h2 className="vk-ledger__heading">{ledger?.heading}</h2>
                  <p className="vk-ledger__sub">{ledger?.subheading}</p>
                </div>

                <div className="vk-ledger__group">
                  <span className="vk-ledger__label">
                    <span className="vk-ledger__pulse" aria-hidden="true" />
                    {ledger?.activeLabel}
                  </span>
                  {ledgerActive.map((row: any, i: number) => (
                    <div
                      className="vk-ledger__row reveal-on-scroll"
                      style={{transitionDelay: `${i * 80}ms`}}
                      key={`active-${row.date}-${row.client}`}
                    >
                      <time className="vk-ledger__date" dateTime={row.date}>{row.date}</time>
                      <span className="vk-ledger__client">{row.client}</span>
                      <span className="vk-ledger__scope">{row.scope}</span>
                      <span className={`vk-ledger__status vk-ledger__status--${row.status}`}>
                        {statusLabels?.[row.status] ?? row.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="vk-ledger__group">
                  <span className="vk-ledger__label vk-ledger__label--muted">{ledger?.recentLabel}</span>
                  {ledgerRecent.map((row: any, i: number) => (
                    <div
                      className="vk-ledger__row reveal-on-scroll"
                      style={{transitionDelay: `${(ledgerActive.length + i) * 80}ms`}}
                      key={`recent-${row.date}-${row.client}`}
                    >
                      <time className="vk-ledger__date" dateTime={row.date}>{row.date}</time>
                      <span className="vk-ledger__client">{row.client}</span>
                      <span className="vk-ledger__scope">{row.scope}</span>
                      <span className="vk-ledger__outcome">{row.outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section id="trust" className="py-12 border-y border-vkborder">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-center text-vkmuted text-[10px] uppercase tracking-[0.28em] font-mono mb-8">
            {h?.trustBar?.title ?? 'Trusted by businesses across Europe'}
          </p>
          <div className="overflow-hidden" data-ticker>
            <div className="ticker ticker--auto items-center">
              {[...brandLogos, ...brandLogos].map((c, idx) => (
                <div key={`logo-${idx}`} className="flex items-center justify-center" style={{minWidth: 130}}>
                  <img src={c.src} alt={c.name} className="brand brand--bw h-7 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl reveal-on-scroll">
            <div className="text-[11px] uppercase tracking-[0.28em] text-vkaccent font-mono mb-4">{h?.servicesIntro?.eyebrow}</div>
            <h2 className="display-1 text-3xl md:text-5xl text-vktext">{h?.servicesIntro?.title}</h2>
            <p className="mt-5 text-vktext/70 text-base md:text-lg leading-relaxed">{h?.servicesIntro?.subtitle}</p>
          </div>

          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-vkborder border border-vkborder rounded-lg overflow-hidden">
            {serviceItems.map((item: any, idx: number) => {
              const isQr = item.id === 'qr-menu';
              const href = isQr ? `/${locale}/demo/qr-menu` : `/${locale}/services#${item.id}`;
              const iconPath = SERVICE_ICONS[item.id] ?? SERVICE_ICONS.websites;
              return (
                <a
                  key={item.id}
                  href={href}
                  className={`group bg-vkbg hover:bg-vksurface transition-all duration-500 p-7 block focus:outline-none focus:bg-vksurface relative reveal-on-scroll`}
                  data-delay={String(Math.min(idx * 60, 400))}
                >
                  {isQr && (
                    <span className="absolute top-4 right-4 px-2 py-1 rounded-full bg-vkaccent text-black text-[9px] font-mono tracking-[0.18em] uppercase font-semibold">
                      {lang === 'tr' ? 'Canlı demo' : lang === 'ro' ? 'Demo live' : 'Live demo'}
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-md bg-vksurface border border-vkborder flex items-center justify-center mb-6 group-hover:bg-vkaccent/10 group-hover:border-vkaccent/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5 text-vkaccent">{iconPath}</svg>
                  </div>
                  <h3 className="font-heading text-xl text-vktext leading-snug">{item.title}</h3>
                  {item.tag && <div className="text-[10px] text-vkmuted mt-1.5 font-mono uppercase tracking-wider">{item.tag}</div>}
                  {item.intro && <p className="text-sm text-vktext/65 mt-4 leading-relaxed line-clamp-3">{item.intro}</p>}
                  <div className="mt-5 inline-flex items-center text-sm text-vkaccent font-mono">
                    {isQr ? (lang === 'tr' ? 'Demoyu aç' : lang === 'ro' ? 'Deschide demo' : 'Open demo') : (h?.explore ?? 'Learn more')}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="py-24 md:py-32 border-y border-vkborder bg-gradient-to-b from-transparent via-vksurface/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal-on-scroll">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.28em] text-vkaccent font-mono mb-4">{h?.portfolioIntro?.eyebrow}</div>
              <h2 className="display-1 text-3xl md:text-5xl text-vktext">{h?.portfolioIntro?.title}</h2>
              <p className="mt-5 text-vktext/70 text-base md:text-lg leading-relaxed">{h?.portfolioIntro?.subtitle}</p>
            </div>
            <a href={`/${locale}/use-cases`} className="self-start md:self-end text-vktext hover:text-vkaccent text-sm border border-vkborder hover:border-vkaccent rounded-md px-5 py-3 inline-flex items-center gap-2 font-mono uppercase tracking-wider transition">
              {lang === 'tr' ? 'Tüm projeler' : lang === 'ro' ? 'Toate proiectele' : 'All work'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p: any, idx: number) => (
              <a
                key={p.slug}
                href={`/${locale}/use-cases/${p.slug}`}
                className="vk-card group rounded-md border border-vkborder overflow-hidden bg-vksurface block focus:outline-none focus:border-vkaccent reveal-on-scroll"
                data-delay={String(Math.min(idx * 80, 400))}
              >
                <div className="aspect-[3/2] overflow-hidden bg-vkbg border-b border-vkborder">
                  <img
                    src={`/projects/${p.mockup || p.slug}.svg`}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-vkaccent">{catLabel(p.category)}</span>
                    <span className="text-vkmuted">·</span>
                    <span className="text-[10px] text-vkmuted font-mono">{p.client}</span>
                  </div>
                  <h3 className="font-heading text-xl text-vktext leading-snug">{p.title}</h3>
                  <p className="text-sm text-vktext/65 mt-3 line-clamp-2 leading-relaxed">{p.intro}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl reveal-on-scroll">
            <div className="text-[11px] uppercase tracking-[0.28em] text-vkaccent font-mono mb-4">{h?.processIntro?.eyebrow}</div>
            <h2 className="display-1 text-3xl md:text-5xl text-vktext">{h?.processIntro?.title}</h2>
            <p className="mt-5 text-vktext/70 text-base md:text-lg leading-relaxed">{h?.processIntro?.subtitle}</p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {(h?.process?.steps ?? []).map((step: any, idx: number) => (
              <div key={idx} className="relative reveal-on-scroll" data-delay={String(idx * 100)}>
                <div className="font-heading text-vkaccent/50 text-5xl mb-4">{step.n}</div>
                <h3 className="font-heading text-xl text-vktext leading-tight">{step.title}</h3>
                <p className="mt-3 text-vktext/65 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-24 md:py-32 border-y border-vkborder bg-gradient-to-b from-transparent via-vksurface/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="display-1 text-3xl md:text-5xl text-vktext max-w-3xl reveal-on-scroll">{h?.industries?.title}</h2>
          <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-vkborder border border-vkborder rounded-md overflow-hidden">
            {(h?.industries?.items ?? []).map((ind: any, idx: number) => (
              <div key={idx} className="bg-vkbg p-7 hover:bg-vksurface transition-colors duration-500 reveal-on-scroll" data-delay={String(Math.min(idx * 60, 400))}>
                <h3 className="font-heading text-lg text-vktext">{ind.name}</h3>
                <p className="text-sm text-vktext/65 mt-3 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS METRICS — removed 2026-05-12. The unattributed aggregate metrics (120/+86%/-40%/95%/5/99.9) competed with the per-client metrics in testimonials/use-cases.
           Credibility is now carried by the Recent Work ledger in the hero (real client names + dates) and the testimonials section below (real names + measurable per-client outcomes). */}

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 md:py-32 border-y border-vkborder bg-gradient-to-b from-transparent via-vksurface/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-12 reveal-on-scroll">
            <div className="text-[11px] uppercase tracking-[0.28em] text-vkaccent font-mono mb-4">{h?.testimonialsIntro?.eyebrow}</div>
            <h2 className="display-1 text-3xl md:text-5xl text-vktext">{h?.testimonialsIntro?.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item: any, idx: number) => (
              <figure key={idx} className="vk-card rounded-md border border-vkborder bg-vksurface p-7 reveal-on-scroll" data-delay={String(Math.min(idx * 80, 400))}>
                <div className="text-vkaccent text-5xl font-serif leading-none mb-4 opacity-50">"</div>
                <blockquote className="text-vktext/90 leading-relaxed text-base">{item?.quote}</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-vkborder flex items-center gap-3">
                  {item?.photo ? (
                    <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-vkborder" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-vksurface2 border border-vkborder flex items-center justify-center text-vkaccent font-mono text-sm">
                      {(item?.name || '?').charAt(0)}
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="font-medium text-vktext">{item?.name}</div>
                    {item?.role && <div className="text-vkmuted text-xs mt-0.5">{item.role}</div>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-10 reveal-on-scroll">
            <div className="text-[11px] uppercase tracking-[0.28em] text-vkmuted font-mono mb-4">{h?.stackIntro?.eyebrow}</div>
            <h2 className="font-heading text-2xl md:text-3xl text-vktext">{h?.stackIntro?.title}</h2>
            <p className="mt-3 text-vktext/65 text-sm md:text-base leading-relaxed">{h?.stackIntro?.subtitle}</p>
          </div>
          <div className="overflow-hidden" data-ticker>
            <div className="ticker ticker--auto items-center">
              {[...techStack, ...techStack].map((b, i) => (
                <div key={`tech-${i}`} className="flex items-center justify-center" style={{minWidth: 150}}>
                  <img src={b.src} alt={b.name} className="brand brand--bw h-8 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 border-y border-vkborder bg-gradient-to-b from-transparent via-vksurface/30 to-transparent">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="reveal-on-scroll">
            <div className="text-[11px] uppercase tracking-[0.28em] text-vkaccent font-mono mb-4">{h?.faqIntro?.eyebrow}</div>
            <h2 className="display-1 text-3xl md:text-5xl text-vktext mb-12">{h?.faqIntro?.title}</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((f: any, idx: number) => {
              const open = openFaq === idx;
              return (
                <div key={idx} className="border-b border-vkborder reveal-on-scroll" data-delay={String(Math.min(idx * 60, 400))}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="w-full text-left flex items-start justify-between gap-6 py-5 hover:text-vkaccent transition-colors"
                  >
                    <span className="font-heading text-lg md:text-xl text-vktext leading-snug">{f.q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`w-6 h-6 flex-shrink-0 mt-1 text-vkaccent transition-transform duration-300 ${open ? 'rotate-45' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16"/></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${open ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                    <p className="text-vktext/75 text-sm md:text-base leading-relaxed">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-60" style={{background: 'radial-gradient(800px 400px at 50% 50%, rgba(232,166,86,0.10), transparent 70%)'}} />
        <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center reveal-on-scroll">
          <div className="text-[11px] uppercase tracking-[0.28em] text-vkaccent font-mono mb-6">{h?.ctaSection?.eyebrow}</div>
          <h2 className="display-1 text-4xl md:text-6xl lg:text-7xl text-vktext">{h?.ctaSection?.title}</h2>
          <p className="mt-6 text-vktext/75 text-base md:text-lg max-w-2xl mx-auto">{h?.ctaSection?.subtitle}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              data-cta="whatsapp"
              href={whatsappHref(common?.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-cta vk-cta-primary inline-flex items-center px-6 py-4 rounded-md font-mono text-sm font-semibold tracking-wider uppercase"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2.5" aria-hidden="true"><path d="M20.52 3.48A11.93 11.93 0 0012.06 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.32-1.66a11.85 11.85 0 005.72 1.46h.01c6.56 0 11.89-5.33 11.89-11.9 0-3.18-1.24-6.17-3.42-8.42z"/></svg>
              {h?.ctaSection?.primaryCta ?? h?.ctas?.whatsapp}
            </a>
            <a
              data-cta="schedule"
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-cta vk-cta-ghost inline-flex items-center px-6 py-4 rounded-md font-mono text-sm font-semibold tracking-wider uppercase"
            >
              {h?.ctaSection?.secondaryCta ?? h?.ctas?.schedule}
            </a>
            <a
              data-cta="email"
              href={mailHref(common?.emailSubject)}
              className="vk-cta vk-cta-ghost inline-flex items-center px-6 py-4 rounded-md font-mono text-sm font-semibold tracking-wider uppercase"
            >
              {h?.ctas?.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
