'use client';

import React, {useEffect, useRef} from 'react';
import HeroShapesClient from '../components/HeroShapesClient';
import HeroStepsClient from '../components/HeroStepsClient';
import CountUpClient from '../components/CountUpClient';
import CardParallaxClient from '../components/CardParallaxClient';
import RailClient from '../components/RailClient';
import RevealClient from '../components/RevealClient';
import type {Locale, Messages} from '../i18n/messages';
import {createT, getDefaultMessages} from '../i18n/messages';

type HomeViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function HomeViewSnap({messages, locale}: HomeViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const h = t('home') as any;
  const common = t('common') as any;
  const lang = locale === 'en' ? 'en' : 'tr';

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Internal hash navigation within the snap scroller
  useEffect(() => {
    const scrollToHash = () => {
      try {
        const hash = (typeof window !== 'undefined' && window.location.hash) || '';
        if (!hash) return;
        const id = hash.replace('#', '');
        const target = scrollerRef.current?.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null;
        if (target) target.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      } catch {}
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  // Micro‑motion: morph hero shapes on CTA hover/focus
  useEffect(() => {
    const bind = (sel: string, idx: number) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return () => {};
      const onEnter = () => {
        try { window.dispatchEvent(new CustomEvent('vk-hero-step', { detail: { index: idx } })); } catch {}
      };
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('focus', onEnter, true);
      return () => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('focus', onEnter, true); };
    };
    const clean1 = bind('#hero [data-cta="whatsapp"]', 1);
    const clean2 = bind('#hero [data-cta="email"]', 2);
    const clean3 = bind('#hero [data-cta="schedule"]', 3);
    return () => { try { clean1(); clean2(); clean3(); } catch {} };
  }, []);

  const clients = [
    { id: 'clown3d', name: 'Clown 3D', src: '/clients/clown3d.svg' },
    { id: 'raingroup', name: 'Rain Group', src: '/clients/raingroup.svg' },
    { id: 'novahealth', name: 'Nova Health', src: '/clients/novahealth.svg' },
    { id: 'skyline-media', name: 'Skyline Media', src: '/clients/skyline-media.svg' },
    { id: 'marmara-foods', name: 'Marmara Foods', src: '/clients/marmara-foods.svg' },
    { id: 'bosporus-travel', name: 'Bosporus Travel', src: '/clients/bosporus-travel.svg' },
    { id: 'anatolia-hotel', name: 'Anatolia Hotel', src: '/clients/anatolia-hotel.svg' },
    { id: 'velkina', name: 'Velkina', src: '/clients/velkina.svg' }
  ];

  // Services items (fallbacks if messages missing)
  const s = t('services') as any;
  let serviceItems = Array.isArray(s?.items) ? s.items : [];
  if (!serviceItems || serviceItems.length === 0) {
    serviceItems = [
      { id: 'web', title: 'Web Development', tag: 'Design • Frontend • Backend', intro: 'High‑performance websites and apps built on Next.js 14, TypeScript, and a robust design system.' },
      { id: 'hosting', title: 'Edge Hosting & DevOps', tag: 'Vercel • Cloudflare • AWS', intro: 'Fast, dependable and observable deployments with CI/CD, caching and rollbacks.' },
      { id: 'it', title: 'IT Solutions & Integrations', tag: 'Identity • Data • Workflows', intro: 'Connect your stack with secure auth, data sync and automated workflows.' },
      { id: 'middleware', title: 'CRM–CMS Middleware', tag: 'HubSpot • Salesforce • Sanity', intro: 'A unified API layer between sites, CRMs and CMSs for clean data and faster ops.' },
      { id: 'growth', title: 'Ad Campaigns & Growth', tag: 'Acquisition • CRO • Analytics', intro: 'Campaigns that compound with accurate measurement and fast landing iterations.' },
      { id: 'production', title: 'Production & Content', tag: 'Video • Motion • Docs', intro: 'Crisp visuals, motion and docs that actually onboard and differentiate.' }
    ];
  }

  const testimonials = (Array.isArray(h?.testimonials?.items) && h.testimonials.items?.length)
    ? h.testimonials.items
    : [
        { quote: lang==='en' ? 'Velkina shipped our site in weeks with a clean design system.' : 'Velkina, temiz bir tasarım sistemiyle sitemizi haftalar içinde yayına aldı.', name: 'Aylin K.', role: 'CMO, SaaS' },
        { quote: lang==='en' ? 'Clear scope, fast iterations and measurable results.' : 'Net kapsam, hızlı iterasyonlar ve ölçülebilir sonuçlar.', name: 'Kerem D.', role: lang==='en' ? 'Founder' : 'Kurucu' }
      ];
  const chips = lang === 'en' ? ['Web', 'Apps', 'AI'] : ['Web', 'Uygulamalar', 'Yapay Zekâ'];
  const homeBlock = (t('home') as any) || {};
  const m2 = homeBlock?.metrics2 || {};
  const slugify = (s: string) => (s || '')
    .replace(/[çÇ]/g,'c').replace(/[ğĞ]/g,'g').replace(/[ıIİ]/g,'i').replace(/[öÖ]/g,'o').replace(/[şŞ]/g,'s').replace(/[üÜ]/g,'u')
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return (
    <div className="relative">
      {/* Non-visual clients */}
      <CountUpClient />
      <CardParallaxClient />
      <RevealClient />
      <RailClient />

      {/* Snap container filling viewport minus fixed header */}
      <div
        ref={scrollerRef}
        className="snap-y snap-proximity sm:snap-mandatory h-[calc(100svh-5rem)] overflow-y-auto hide-scrollbar scroll-smooth"
        aria-label={lang==='en' ? 'Homepage sections' : 'Ana sayfa bölümleri'}
        tabIndex={0}
      >
        {/* 1) HERO: rich with animated steps and shapes */}
        <section id="hero" className="snap-start snap-always relative min-h-[calc(100svh-5rem)] flex items-center">
          {/* Full-bleed animated background on the right */}
          <div className="absolute inset-y-0 right-0 z-0 overflow-hidden pointer-events-none w-full md:w-3/5 lg:w-1/2">
            <canvas id="vk-hero-shapes" className="w-full h-full block" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="text-xs uppercase tracking-[0.18em] text-vkcyan/90 font-mono mb-2">
                  <span id="vk-hero-steps-text" data-step="0">{(Array.isArray(h?.heroSteps) && h?.heroSteps?.[0]) || (lang==='en' ? 'Analyze' : 'Analiz')}</span>
                </div>
                <h1 className="font-heading text-5xl md:text-7xl leading-[1.05] tracking-tight">
                  {lang==='en'
                    ? <>Clear, fast and reliable <span className="vk-highlight">software</span></>
                    : <>İşletmeniz için modern <span className="vk-highlight">yazılım</span></>
                  }
                </h1>
                <ul className="mt-4 flex flex-wrap items-center gap-2 text-white/80">
                  {chips.map((txt) => (
                    <li key={txt} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs">{txt}</li>
                  ))}
                </ul>
                <p className="mt-3 text-white/75 text-base md:text-lg">
                  {lang==='en'
                    ? 'Web, apps and AI — one senior team, end to end.'
                    : 'Web, uygulamalar ve yapay zekâ — tek kıdemli ekip, uçtan uca.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a data-cta="whatsapp" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono">
                    {h?.ctas?.whatsapp ?? (lang==='en' ? 'Message on WhatsApp' : 'WhatsApp’tan yazın')}
                  </a>
                  <a data-cta="email" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition">
                    {h?.ctas?.email ?? (lang==='en' ? 'Send an email' : 'E‑posta gönderin')}
                  </a>
                  <a data-cta="schedule" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 bg-white/5 text-white/90">
                    {h?.ctas?.schedule ?? (lang==='en' ? 'Schedule a call' : 'Görüşme planlayın')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Clients to drive animations */}
          <HeroStepsClient steps={Array.isArray(h?.heroSteps) ? h.heroSteps : undefined} />
          <HeroShapesClient />
        </section>

        {/* 2) SERVICES */}
        <section id="services" className="snap-start snap-always min-h-[calc(100svh-5rem)] flex items-center vk-section--services">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-heading text-3xl md:text-4xl">{h?.servicesTitle ?? (lang==='en' ? 'What we do' : 'Ne yapıyoruz')}</h2>
              <a href={`/${locale}/services`} className="text-white/80 hover:text-vkcyan text-sm border border-white/15 rounded-lg px-3 py-1.5 bg-white/5 hover:bg-white/10">{h?.servicesViewAll ?? (lang==='en' ? 'See all services' : 'Tüm hizmetleri gör')}</a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceItems.slice(0, 6).map((item: any) => (
                <a key={item.id} href={`/${locale}/services#${item.id}`} className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-xl text-white/90">{item.title}</h3>
                      {item.tag && <div className="text-xs text-white/60 mt-1">{item.tag}</div>}
                      {item.intro && (
                        <p className="text-sm text-white/70 mt-2">
                          {typeof item.intro === 'string' && item.intro.length > 160 ? item.intro.slice(0, 157) + '…' : item.intro}
                        </p>
                      )}
                    </div>
                    <span aria-hidden className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/15">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4.5 h-4.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center text-white/80 text-sm">
                    {h?.explore ?? (lang==='en' ? 'Explore' : 'İncele')}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 3 benefits: condensed Why */}
        <section id="why" className="snap-start snap-always min-h-[calc(100svh-5rem)] flex items-center vk-section--values">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl">{h?.why?.title ?? (lang==='en' ? 'Why Velkina' : 'Neden Velkina')}</h2>
                <p className="text-white/80 max-w-3xl mt-1">{h?.why?.subtitle ?? (lang==='en'
                  ? 'Modern software delivered by a senior engineering + design team.'
                  : 'Kıdemli mühendislik + tasarım ekibinden modern yazılım.')}</p>
              </div>
              <div className="text-white/60 text-sm">{h?.why?.techLine ?? (lang==='en' ? 'Next.js • Edge • Analytics • Automation' : 'Next.js • Edge • Analitik • Otomasyon')}</div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <article className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft reveal-on-scroll">
                <h3 className="font-heading text-lg">{h?.why?.seniorOnly?.title ?? (lang==='en' ? 'Senior-only team' : 'Sadece kıdemli ekip')}</h3>
                <p className="text-white/80 text-sm">{h?.why?.seniorOnly?.desc ?? (lang==='en' ? 'Engineering-first, end‑to‑end delivery—no handovers.' : 'Mühendislik öncelikli, uçtan uca teslim—handover yok.')}</p>
              </article>
              <article className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft reveal-on-scroll">
                <h3 className="font-heading text-lg">{h?.why?.speed?.title ?? (lang==='en' ? 'Fast delivery' : 'Hızlı teslim')}</h3>
                <p className="text-white/80 text-sm">{h?.why?.speed?.desc ?? (lang==='en' ? 'Rapid integrations, previews, rollbacks and observability.' : 'Hızlı entegrasyon, önizleme, geri alma ve izlenebilirlik.')}</p>
              </article>
              <article className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft reveal-on-scroll">
                <h3 className="font-heading text-lg">{h?.why?.design?.title ?? (lang==='en' ? 'Design that converts' : 'Dönüştüren tasarım')}</h3>
                <p className="text-white/80 text-sm">{h?.why?.design?.desc ?? (lang==='en' ? 'Clear stories, motion and systems that sell.' : 'Net hikâye, hareket ve satışa dönen sistemler.')}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Projects: horizontally scrollable cards */}
        <section id="projects" className="snap-start snap-always min-h-[calc(100svh-5rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-heading text-3xl md:text-4xl">{lang==='en' ? 'Projects' : 'Projelerimiz'}</h2>
              <a href={`/${locale}/use-cases`} className="text-white/80 hover:text-vkcyan text-sm border border-white/15 rounded-lg px-3 py-1.5 bg-white/5 hover:bg-white/10">{lang==='en' ? 'All projects' : 'Tüm projeler'}</a>
            </div>
            {(() => {
              const uc = t('useCases') as any;
              const items = Array.isArray(uc?.projects?.items) ? uc.projects.items : [];
              const cards = (items && items.length ? items : []).map((it:any) => ({ cat: it.cat, title: it.title, url: it.url, desc: it.desc }));
              const fallback = lang==='en'
                ? [
                    {cat:'Web | Beauty', title:'Dr. Sevim Aydın Beauty', url:'https://www.drsevimaydinbeauty.com', desc:'Clinic website with modern UI and appointment system.'},
                    {cat:'Web | Manufacturing', title:'TP Thermoplast', url:'https://tpthermoplast.com', desc:'B2B corporate site with multi-language and product catalog.'},
                    {cat:'Web | Décor', title:'Rain Group', url:'https://www.raingroupas.com', desc:'Corporate and e‑commerce foundation, modern brand image.'},
                    {cat:'Web | Education', title:'EduTurkia', url:'https://www.eduturkia.com', desc:'Education platform with CRM integration and catalog.'},
                    {cat:'Web | Art', title:'Ali Cengiz İşcanlı', url:'https://www.alicengiziscanli.com', desc:'Portfolio site with gallery‑first presentation for a global audience.'},
                    {cat:'Web | 3D', title:'Clown3D', url:'https://www.clown3d.com', desc:'Playful, modern site with dynamic animations and 3D visuals.'},
                    {cat:'Web | Legal', title:'Atar Avcı Hukuk Bürosu', url:'https://www.ataravci.com.tr', desc:'Professional portfolio with clear services and fast UX.'},
                    {cat:'Web | Hospitality', title:'Anatolia Hotel', url:'/', desc:'Brand refresh and conversion‑focused booking journey.'}
                  ]
                : [
                    {cat:'Web | Güzellik', title:'Dr. Sevim Aydın Beauty', url:'https://www.drsevimaydinbeauty.com', desc:'Modern arayüz ve randevu sistemi ile klinik sitesi.'},
                    {cat:'Web | Üretim', title:'TP Thermoplast', url:'https://tpthermoplast.com', desc:'Çok dilli, ürün kataloğuna sahip kurumsal site.'},
                    {cat:'Web | Dekor', title:'Rain Group', url:'https://www.raingroupas.com', desc:'Kurumsal + e‑ticaret temeli, modern marka imajı.'},
                    {cat:'Web | Eğitim', title:'EduTurkia', url:'https://www.eduturkia.com', desc:'CRM entegrasyonlu eğitim platformu ve katalog.'},
                    {cat:'Web | Sanat', title:'Ali Cengiz İşcanlı', url:'https://www.alicengiziscanli.com', desc:'Galeri ağırlıklı portfolyo; global izleyiciye sunum.'},
                    {cat:'Web | 3D', title:'Clown3D', url:'https://www.clown3d.com', desc:'Dinamik animasyonlar ve 3D görseller ile modern site.'},
                    {cat:'Web | Hukuk', title:'Atar Avcı Hukuk Bürosu', url:'https://www.ataravci.com.tr', desc:'Net hizmetler ve hızlı deneyimle profesyonel portfolyo.'},
                    {cat:'Web | Otelcilik', title:'Anatolia Hotel', url:'/', desc:'Marka yenileme ve dönüşüm odaklı rezervasyon akışı.'}
                  ];
              const list = cards.length ? cards : fallback;
              return (
                <div className="relative" data-rail="projects" data-auto="true" data-interval="3000" tabIndex={0}>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
                  <button className="vk-arrow left-2 inline-flex" data-rail-left="projects" aria-label={lang==='en' ? 'Scroll left' : 'Sola kaydır'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
                  </button>
                  <button className="vk-arrow right-2 inline-flex" data-rail-right="projects" aria-label={lang==='en' ? 'Scroll right' : 'Sağa kaydır'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5"/></svg>
                  </button>
                  <div className="overflow-x-auto hide-scrollbar" data-rail-scroller>
                    <div className="flex gap-4 pr-8 snap-x snap-mandatory" role="list">
                      {list.map((c:any, i:number) => {
                        const s = slugify(c.title || '');
                        const img = `/projects/${s}.svg`;
                        const fallback = '/projects/placeholder.svg';
                        return (
                          <a key={`${c.title}-${i}`} href={c.url || `/${locale}/use-cases`} target={c.url? '_blank':'_self'} rel={c.url? 'noopener noreferrer':undefined} role="listitem" className="min-w-[280px] max-w-[360px] snap-start vk-glass border border-white/10 rounded-xl p-0 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50">
                            <div className="overflow-hidden rounded-t-xl border-b border-white/10">
                              <img src={img} alt={c.title} className="w-full h-[160px] object-cover" onError={(e)=>{ try{ (e.currentTarget as HTMLImageElement).src = fallback; }catch{} }} />
                            </div>
                            <div className="p-5">
                              {c.cat && <div className="text-xs text-white/60 mb-1">{c.cat}</div>}
                              <h3 className="font-heading text-xl text-white/90">{c.title}</h3>
                              {c.desc && <p className="text-white/70 text-sm mt-2">{typeof c.desc==='string' && c.desc.length>180 ? c.desc.slice(0,177)+'…' : c.desc}</p>}
                              <div className="mt-3 inline-flex items-center text-white/80 text-sm">{lang==='en' ? 'View' : 'İncele'}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg></div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* 3) RESULTS + CLIENTS */}
        <section id="results" className="snap-start snap-always min-h-[calc(100svh-5rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-heading text-3xl md:text-4xl">{h?.resultsTitle ?? (lang==='en' ? 'Proven results' : 'Kanıtlanmış Sonuçlar')}</h2>
              <span className="hidden sm:inline text-white/60 text-sm">{h?.resultsSubtitle ?? (lang==='en' ? 'Highlights from recent work' : 'Son projelerden öne çıkanlar')}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-8">
              <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
                <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to={String(m2?.shipped?.value ?? 120)}>0</span>+</span></div>
                <span className="sr-only">{m2?.shipped?.sr ?? (lang==='en' ? '120+ shipped projects' : '120+ teslim edilen proje')}</span>
                <div className="text-white/70 text-sm">{m2?.shipped?.label ?? (lang==='en' ? 'Shipped projects' : 'Teslim edilen projeler')}</div>
              </div>
              <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
                <div className="font-heading text-2xl" aria-hidden="true"><span className="text-vkcyan">+<span className="vk-countup" data-to={String(m2?.leadsIncrease?.value ?? 86)}>0</span>%</span></div>
                <span className="sr-only">{m2?.leadsIncrease?.sr ?? (lang==='en' ? 'Average qualified lead increase' : 'Ortalama nitelikli lead artışı')}</span>
                <div className="text-white/70 text-sm">{m2?.leadsIncrease?.label ?? (lang==='en' ? 'Qualified leads increase' : 'Nitelikli lead artışı')}</div>
              </div>
              <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
                <div className="font-heading text-2xl" aria-hidden="true"><span className="text-vkpink">-<span className="vk-countup" data-to={String(m2?.supportReduction?.value ?? 40)}>0</span>%</span></div>
                <span className="sr-only">{m2?.supportReduction?.sr ?? (lang==='en' ? 'Customer service cost reduction' : 'Müşteri hizmetleri maliyetlerinde azalma')}</span>
                <div className="text-white/70 text-sm">{m2?.supportReduction?.label ?? (lang==='en' ? 'Support cost reduction' : 'Destek maliyeti azalması')}</div>
              </div>
              <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
                <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to={String(m2?.csat?.value ?? 95)}>0</span>%</span></div>
                <span className="sr-only">{m2?.csat?.sr ?? (lang==='en' ? 'Customer satisfaction' : 'Müşteri memnuniyeti')}</span>
                <div className="text-white/70 text-sm">{m2?.csat?.label ?? (lang==='en' ? 'CSAT' : 'Memnuniyet (CSAT)')}</div>
              </div>
              <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
                <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to={String(m2?.launchTime?.value ?? 5)}>0</span> {lang==='en' ? 'weeks' : 'hafta'}</span></div>
                <span className="sr-only">{m2?.launchTime?.sr ?? (lang==='en' ? 'Median time to launch' : 'Medyan yayına alma süresi')}</span>
                <div className="text-white/70 text-sm">{m2?.launchTime?.label ?? (lang==='en' ? 'Median launch time' : 'Medyan yayın süresi')}</div>
              </div>
              <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
                <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to={String(m2?.uptime?.value ?? 99.9)} data-decimals={m2?.uptime?.decimals ? String(m2.uptime.decimals) : undefined}>0.0</span>%</span></div>
                <span className="sr-only">{m2?.uptime?.sr ?? (lang==='en' ? 'Observed uptime' : 'Gözlemlenen çalışma süresi')}</span>
                <div className="text-white/70 text-sm">{m2?.uptime?.label ?? (lang==='en' ? 'Uptime' : 'Uptime')}</div>
              </div>
            </div>

            {/* Clients rail (logos-only, BW) */}
            <div className="relative" data-rail="clients" data-auto="true" data-interval="2600" tabIndex={0} aria-label={h?.brandsCarouselLabel ?? (lang==='en' ? 'Trusted brands carousel' : 'Güvenilen markalar karuseli')}>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
              <button className="vk-arrow left-2 inline-flex" data-rail-left="clients" aria-label={lang==='en' ? 'Scroll left' : 'Sola kaydır'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
              </button>
              <button className="vk-arrow right-2 inline-flex" data-rail-right="clients" aria-label={lang==='en' ? 'Scroll right' : 'Sağa kaydır'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5"/></svg>
              </button>
              <div className="overflow-x-auto hide-scrollbar py-3" data-rail-scroller>
                <div className="flex items-center gap-8 pr-12 snap-x snap-mandatory" role="list">
                  {clients.map((c) => (
                    <div key={`cl-${c.id}`} role="listitem" className="w-[160px] min-w-[160px] max-w-[160px] snap-start flex items-center justify-center">
                      <img className="brand brand--bw h-8 w-auto object-contain" src={c.src} alt={c.name} loading="eager" decoding="async" draggable="false" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4) TESTIMONIALS (rail with arrows) */}
        <section id="testimonials" className="snap-start snap-always min-h-[calc(100svh-5rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <h2 className="font-heading text-3xl md:text-4xl mb-6">{h?.testimonials?.title ?? (lang==='en' ? 'What clients say' : 'Müşteriler ne diyor')}</h2>
            <div className="relative" data-rail="testimonials" data-auto="true" data-interval="3400" tabIndex={0} aria-label={h?.testimonials?.carouselLabel ?? (lang==='en' ? 'Testimonials carousel' : 'Müşteri yorumları karuseli')}>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
              <button className="vk-arrow left-2 inline-flex" data-rail-left="testimonials" aria-label={lang==='en' ? 'Scroll left' : 'Sola kaydır'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
              </button>
              <button className="vk-arrow right-2 inline-flex" data-rail-right="testimonials" aria-label={lang==='en' ? 'Scroll right' : 'Sağa kaydır'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5"/></svg>
              </button>
              <div className="overflow-x-auto hide-scrollbar" data-rail-scroller>
                <div className="flex items-stretch gap-4 pr-8 snap-x snap-mandatory" role="list">
                  {testimonials.map((item: any, idx: number) => (
                    <figure key={`t-${idx}`} className="min-w-[280px] max-w-[380px] snap-start vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
                      <blockquote className="text-white/80 leading-relaxed">“{item?.quote}”</blockquote>
                      <figcaption className="mt-3 text-sm text-white/70">
                        <span className="font-medium text-white/90">{item?.name}</span>
                        {item?.role ? <span className="text-white/60"> — {item.role}</span> : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 6) CTA */}
        <section id="cta" className="snap-start snap-always min-h-[calc(100svh-5rem)] flex items-center">
          <div className="max-w-xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl">{lang==='en' ? 'Start' : 'Başlat'}</h2>
            <p className="mt-3 text-white/70">{h?.startProjectShort ?? (lang==='en' ? 'Start project — Quick contact' : 'Proje başlat — Hızlı iletişim')}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a data-cta="whatsapp" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono">
                {h?.ctas?.whatsapp ?? (lang==='en' ? 'Message on WhatsApp' : 'WhatsApp’tan yazın')}
              </a>
              <a data-cta="email" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition">
                {h?.ctas?.email ?? (lang==='en' ? 'Send an email' : 'E‑posta gönderin')}
              </a>
              <a data-cta="schedule" className="vk-cta inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition">
                {h?.ctas?.schedule ?? (lang==='en' ? 'Schedule a call' : 'Görüşme planlayın')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
