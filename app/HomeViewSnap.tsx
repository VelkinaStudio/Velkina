'use client';

import React, {useEffect, useRef, useState} from 'react';
import HeroShapesClient from '../components/HeroShapesClient';
import CountUpClient from '../components/CountUpClient';
import CardParallaxClient from '../components/CardParallaxClient';
import RailClient from '../components/RailClient';
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

  // FAQ accordion
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
      <CardParallaxClient />
      <RevealClient />
      <RailClient />

      {/* HERO */}
      <section id="hero" className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <div className="absolute inset-y-0 right-0 z-0 overflow-hidden pointer-events-none w-full md:w-3/5 lg:w-1/2 opacity-80">
          <canvas id="vk-hero-shapes" className="w-full h-full block" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.22em] text-vkcyan/90 font-mono mb-4">
              {heroData.eyebrow ?? 'Software · Design · Growth'}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              {heroData.title ?? 'We build the software and design that helps your business grow.'}
            </h1>
            <p className="mt-6 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {heroData.subtitle ?? 'Full-service agency: websites, e-commerce, ads, cloud, AI agents and mobile apps.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`/${locale}#cta`}
                className="vk-cta inline-flex items-center px-6 py-3.5 rounded-2xl bg-vkpink text-black shadow-strong font-mono font-semibold"
              >
                {heroData.primaryCta ?? h?.ctas?.whatsapp ?? 'Start a project'}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
              </a>
              <a
                href={`/${locale}/use-cases`}
                className="vk-cta inline-flex items-center px-6 py-3.5 rounded-2xl border border-white/25 text-white/95 bg-white/5 hover:bg-white/10 transition"
              >
                {heroData.secondaryCta ?? common?.viewWork ?? 'See our work'}
              </a>
            </div>

            {/* Hero KPI strip */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              <div className="border-l-2 border-vkcyan pl-3">
                <div className="font-heading text-2xl text-white">
                  <span className="vk-countup" data-to={String(m2?.shipped?.value ?? 120)}>0</span>+
                </div>
                <div className="text-white/60 text-xs leading-tight mt-1">{m2?.shipped?.label}</div>
              </div>
              <div className="border-l-2 border-vkpink pl-3">
                <div className="font-heading text-2xl text-white">
                  <span className="vk-countup" data-to={String(m2?.uptime?.value ?? 99.9)} data-decimals="1">0.0</span>%
                </div>
                <div className="text-white/60 text-xs leading-tight mt-1">{m2?.uptime?.label}</div>
              </div>
              <div className="border-l-2 border-vkpurple pl-3">
                <div className="font-heading text-2xl text-white">
                  <span className="vk-countup" data-to={String(m2?.launchTime?.value ?? 5)}>0</span>{lang === 'tr' ? ' hf' : lang === 'ro' ? ' săpt' : ' wk'}
                </div>
                <div className="text-white/60 text-xs leading-tight mt-1">{m2?.launchTime?.label}</div>
              </div>
              <div className="border-l-2 border-vkmint pl-3">
                <div className="font-heading text-2xl text-white">
                  <span className="vk-countup" data-to={String(m2?.csat?.value ?? 95)}>0</span>%
                </div>
                <div className="text-white/60 text-xs leading-tight mt-1">{m2?.csat?.label}</div>
              </div>
            </div>
          </div>
        </div>
        <HeroShapesClient />
      </section>

      {/* TRUST BAR (client logos) */}
      <section id="trust" className="py-10 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-center text-white/55 text-xs uppercase tracking-[0.18em] font-mono mb-6">
            {h?.trustBar?.title ?? 'Trusted by businesses across Europe'}
          </p>
          <div className="overflow-hidden" data-ticker>
            <div className="ticker ticker--auto items-center">
              {[...brandLogos, ...brandLogos].map((c, idx) => (
                <div key={`logo-${idx}`} className="flex items-center justify-center" style={{minWidth: 120}}>
                  <img src={c.src} alt={c.name} className="brand brand--bw h-7 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-vkpink font-mono mb-3">{h?.servicesIntro?.eyebrow}</div>
            <h2 className="font-heading text-3xl md:text-5xl leading-tight">{h?.servicesIntro?.title}</h2>
            <p className="mt-4 text-white/75 text-base md:text-lg">{h?.servicesIntro?.subtitle}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item: any) => {
              const isQr = item.id === 'qr-menu';
              const href = isQr ? `/${locale}/demo/qr-menu` : `/${locale}/services#${item.id}`;
              const iconPath = SERVICE_ICONS[item.id] ?? SERVICE_ICONS.websites;
              return (
                <a
                  key={item.id}
                  href={href}
                  className={`group vk-card vk-glass rounded-2xl p-6 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50 relative overflow-hidden ${
                    isQr ? 'border border-vkpink/40 ring-1 ring-vkpink/30' : 'border border-white/10'
                  }`}
                >
                  {isQr && (
                    <span className="absolute top-0 right-0 px-2 py-1 rounded-bl-lg bg-vkpink text-black text-[10px] font-mono tracking-wider uppercase font-semibold">
                      {lang === 'tr' ? 'Canlı demo' : lang === 'ro' ? 'Demo live' : 'Live demo'}
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`w-5 h-5 ${isQr ? 'text-vkpink' : 'text-vkcyan'}`}>{iconPath}</svg>
                  </div>
                  <h3 className="font-heading text-xl text-white/95 leading-tight">{item.title}</h3>
                  {item.tag && <div className="text-xs text-white/55 mt-1 font-mono">{item.tag}</div>}
                  {item.intro && <p className="text-sm text-white/70 mt-3 leading-relaxed">{item.intro}</p>}
                  <div className={`mt-4 inline-flex items-center text-sm font-medium ${isQr ? 'text-vkpink' : 'text-vkcyan'}`}>
                    {isQr ? (lang === 'tr' ? 'Demoyu dene' : lang === 'ro' ? 'Încearcă demo' : 'Try the demo') : (h?.explore ?? 'Learn more')}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="py-20 md:py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-vkcyan font-mono mb-3">{h?.portfolioIntro?.eyebrow}</div>
              <h2 className="font-heading text-3xl md:text-5xl leading-tight">{h?.portfolioIntro?.title}</h2>
              <p className="mt-4 text-white/75 text-base md:text-lg">{h?.portfolioIntro?.subtitle}</p>
            </div>
            <a href={`/${locale}/use-cases`} className="self-start md:self-end text-white/85 hover:text-vkcyan text-sm border border-white/15 rounded-lg px-4 py-2 bg-white/5 hover:bg-white/10 inline-flex items-center gap-2">
              {lang === 'tr' ? 'Tüm projeler' : lang === 'ro' ? 'Toate proiectele' : 'All projects'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p: any) => (
              <a
                key={p.slug}
                href={`/${locale}/use-cases/${p.slug}`}
                className="group vk-glass rounded-2xl border border-white/10 overflow-hidden shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50"
              >
                <div className="aspect-[3/2] overflow-hidden bg-black/30 border-b border-white/5">
                  <img
                    src={`/projects/${p.mockup || p.slug}.svg`}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      try { (e.currentTarget as HTMLImageElement).src = '/projects/placeholder.svg'; } catch {}
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-vkcyan">{catLabel(p.category)}</span>
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
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-vkpurple font-mono mb-3">{h?.processIntro?.eyebrow}</div>
            <h2 className="font-heading text-3xl md:text-5xl leading-tight">{h?.processIntro?.title}</h2>
            <p className="mt-4 text-white/75 text-base md:text-lg">{h?.processIntro?.subtitle}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(h?.process?.steps ?? []).map((step: any, idx: number) => (
              <div key={idx} className="relative">
                <div className="font-mono text-vkcyan/70 text-sm mb-2">{step.n}</div>
                <h3 className="font-heading text-xl text-white/95 leading-tight">{step.title}</h3>
                <p className="mt-2 text-white/70 text-sm leading-relaxed">{step.body}</p>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1 left-full w-full h-px bg-gradient-to-r from-white/15 to-transparent -translate-x-3" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-20 md:py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-5xl leading-tight max-w-3xl">{h?.industries?.title}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(h?.industries?.items ?? []).map((ind: any, idx: number) => (
              <div key={idx} className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
                <h3 className="font-heading text-lg text-white/95">{ind.name}</h3>
                <p className="text-sm text-white/65 mt-2 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS METRICS */}
      <section id="results" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-[0.22em] text-vkmint font-mono mb-3">{h?.resultsIntro?.eyebrow}</div>
            <h2 className="font-heading text-3xl md:text-5xl leading-tight">{h?.resultsIntro?.title}</h2>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft text-center">
              <div className="font-heading text-3xl text-white">
                <span className="vk-countup" data-to={String(m2?.shipped?.value ?? 120)}>0</span>+
              </div>
              <div className="text-white/65 text-xs mt-2 leading-tight">{m2?.shipped?.label}</div>
            </div>
            <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft text-center">
              <div className="font-heading text-3xl text-vkcyan">+<span className="vk-countup" data-to={String(m2?.leadsIncrease?.value ?? 86)}>0</span>%</div>
              <div className="text-white/65 text-xs mt-2 leading-tight">{m2?.leadsIncrease?.label}</div>
            </div>
            <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft text-center">
              <div className="font-heading text-3xl text-vkpink">-<span className="vk-countup" data-to={String(m2?.supportReduction?.value ?? 40)}>0</span>%</div>
              <div className="text-white/65 text-xs mt-2 leading-tight">{m2?.supportReduction?.label}</div>
            </div>
            <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft text-center">
              <div className="font-heading text-3xl text-white"><span className="vk-countup" data-to={String(m2?.csat?.value ?? 95)}>0</span>%</div>
              <div className="text-white/65 text-xs mt-2 leading-tight">{m2?.csat?.label}</div>
            </div>
            <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft text-center">
              <div className="font-heading text-3xl text-white"><span className="vk-countup" data-to={String(m2?.launchTime?.value ?? 5)}>0</span></div>
              <div className="text-white/65 text-xs mt-2 leading-tight">{m2?.launchTime?.label}</div>
            </div>
            <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft text-center">
              <div className="font-heading text-3xl text-white"><span className="vk-countup" data-to={String(m2?.uptime?.value ?? 99.9)} data-decimals="1">0.0</span>%</div>
              <div className="text-white/65 text-xs mt-2 leading-tight">{m2?.uptime?.label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-10">
            <div className="text-xs uppercase tracking-[0.22em] text-vkcyan font-mono mb-3">{h?.testimonialsIntro?.eyebrow}</div>
            <h2 className="font-heading text-3xl md:text-5xl leading-tight">{h?.testimonialsIntro?.title}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item: any, idx: number) => (
              <figure key={idx} className="vk-glass border border-white/10 rounded-2xl p-6 shadow-soft">
                <div className="text-vkcyan text-4xl font-serif leading-none mb-2">"</div>
                <blockquote className="text-white/85 leading-relaxed text-base">{item?.quote}</blockquote>
                <figcaption className="mt-4 pt-4 border-t border-white/10 text-sm">
                  <div className="font-medium text-white/95">{item?.name}</div>
                  {item?.role && <div className="text-white/60 text-xs mt-1">{item.role}</div>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-10">
            <div className="text-xs uppercase tracking-[0.22em] text-white/55 font-mono mb-3">{h?.stackIntro?.eyebrow}</div>
            <h2 className="font-heading text-2xl md:text-3xl leading-tight">{h?.stackIntro?.title}</h2>
            <p className="mt-3 text-white/65 text-sm md:text-base">{h?.stackIntro?.subtitle}</p>
          </div>
          <div className="overflow-hidden" data-ticker>
            <div className="ticker ticker--auto items-center">
              {[...techStack, ...techStack].map((b, i) => (
                <div key={`tech-${i}`} className="flex items-center justify-center" style={{minWidth: 140}}>
                  <img src={b.src} alt={b.name} className="brand brand--bw h-8 w-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-xs uppercase tracking-[0.22em] text-vkpurple font-mono mb-3">{h?.faqIntro?.eyebrow}</div>
          <h2 className="font-heading text-3xl md:text-5xl leading-tight mb-10">{h?.faqIntro?.title}</h2>
          <div className="space-y-3">
            {faqs.map((f: any, idx: number) => {
              const open = openFaq === idx;
              return (
                <div key={idx} className="vk-glass border border-white/10 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="w-full text-left flex items-start justify-between gap-4 px-5 py-4 hover:bg-white/[0.03] transition"
                  >
                    <span className="font-heading text-base md:text-lg text-white/95 leading-snug">{f.q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 flex-shrink-0 mt-1 text-vkcyan transition-transform ${open ? 'rotate-45' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16"/></svg>
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-white/75 text-sm md:text-base leading-relaxed">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{background: 'radial-gradient(800px 400px at 50% 50%, rgba(0,255,255,0.15), transparent 70%), radial-gradient(600px 300px at 30% 80%, rgba(255,0,204,0.12), transparent 70%)'}} />
        <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-vkpink font-mono mb-4">{h?.ctaSection?.eyebrow}</div>
          <h2 className="font-heading text-4xl md:text-6xl leading-tight">{h?.ctaSection?.title}</h2>
          <p className="mt-5 text-white/75 text-base md:text-lg">{h?.ctaSection?.subtitle}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              data-cta="whatsapp"
              href={whatsappHref(common?.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-cta inline-flex items-center px-6 py-3.5 rounded-2xl bg-vkpink text-black shadow-strong font-mono font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path d="M20.52 3.48A11.93 11.93 0 0012.06 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.32-1.66a11.85 11.85 0 005.72 1.46h.01c6.56 0 11.89-5.33 11.89-11.9 0-3.18-1.24-6.17-3.42-8.42zM12.06 21.7h-.01a9.74 9.74 0 01-4.96-1.36l-.36-.21-3.75.98 1-3.66-.23-.38a9.78 9.78 0 01-1.5-5.18c0-5.42 4.42-9.83 9.84-9.83 2.63 0 5.1 1.02 6.96 2.88a9.77 9.77 0 012.88 6.96c0 5.42-4.42 9.8-9.87 9.8z"/></svg>
              {h?.ctaSection?.primaryCta ?? h?.ctas?.whatsapp}
            </a>
            <a
              data-cta="email"
              href={mailHref(common?.emailSubject)}
              className="vk-cta inline-flex items-center px-6 py-3.5 rounded-2xl border border-white/25 text-white/95 bg-white/5 hover:bg-white/10 transition"
            >
              {h?.ctas?.email}
            </a>
            <a
              data-cta="schedule"
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-cta inline-flex items-center px-6 py-3.5 rounded-2xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition"
            >
              {h?.ctaSection?.secondaryCta ?? h?.ctas?.schedule}
            </a>
          </div>
          <p className="mt-8 text-white/55 text-xs font-mono">
            {lang === 'tr' ? 'Şu anda: İstanbul · Bükreş · Berlin' : lang === 'ro' ? 'Activi în: Istanbul · București · Berlin' : 'Active in: Istanbul · Bucharest · Berlin'}
          </p>
        </div>
      </section>
    </div>
  );
}
