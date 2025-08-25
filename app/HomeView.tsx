'use client';
import React from 'react';
import RevealClient from '../components/RevealClient';
import HeroStepsClient from '../components/HeroStepsClient';
import HeroShapesClient from '../components/HeroShapesClient';
import CountUpClient from '../components/CountUpClient';
import CardParallaxClient from '../components/CardParallaxClient';
import type {Locale, Messages} from '../i18n/messages';
import {createT, getDefaultMessages} from '../i18n/messages';

type HomeViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function HomeView({messages, locale}: HomeViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const h = t('home') as any;
  const common = t('common') as any;

  return (
    <div>
      {/* Non-visual clients */}
      <CountUpClient />
      <CardParallaxClient />
      <RevealClient />

      {/* Hero */}
      <section id="hero" className="relative py-10 md:py-14">
        {/* Full-bleed animated background */}
        <div className="absolute inset-y-0 right-0 z-0 overflow-hidden pointer-events-none w-full md:w-3/5 lg:w-1/2">
          <canvas id="vk-hero-shapes" className="w-full h-full block" />
        </div>
        {/* Subtle gradient overlay for readability */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-6">
            <h1 className="font-heading text-5xl md:text-7xl leading-[1.05] tracking-tight">
              <span id="vk-hero-steps-text" className="text-white" data-step="0">{(Array.isArray(h?.heroSteps) && h?.heroSteps?.[0]) || 'Evolve'}</span>
            </h1>
            <p className="mt-4 text-white/80 text-lg md:text-xl max-w-2xl">
              {h?.heroDesc ?? 'We fuse retro‑futuristic aesthetics with clear, maintainable code. We bring brand experiences to life across websites, apps, middleware and growth—through one fluent creative system.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a data-cta="whatsapp" className="inline-flex items-center px-5 py-3 rounded-2xl bg-vkpink text-black shadow-strong font-mono">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0  0 1-.825-.242m9.345-8.334a2.126 2.126 0  0 0-.476-.095 48.64 48.64 0  0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0  0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l-4.155-4.155"/></svg>
                {h?.ctas?.whatsapp ?? 'Message on WhatsApp'}
              </a>
              <a data-cta="email" className="inline-flex items-center px-5 py-3 rounded-2xl border border-white/25 text-white/90 bg-white/5 hover:bg-white/10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0  0 1-2.25 2.25h-15a2.25 2.25 0  0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0  0 0 19.5  4.5h-15a2.25 2.25 0  0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0  0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0  0 1-2.36 0L3.32 8.91a2.25 2.25 0  0 1-1.07-1.916V6.75"/></svg>
                {h?.ctas?.email ?? 'Send an email'}
              </a>
            </div>
            <div className="mt-3 flex justify-start">
              <a data-cta="schedule" className="inline-flex items-center px-5 py-3 rounded-2xl border border-white/15 bg-white/5 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 mr-1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                {h?.ctas?.schedule ?? 'Schedule a call'}
              </a>
            </div>
          </div>
            {/* Visuals removed: shapes now render as section background */}
          </div>
        </div>
        {/* Clients to drive animations */}
        <HeroStepsClient steps={Array.isArray(h?.heroSteps) ? h.heroSteps : undefined} />
        <HeroShapesClient />
      </section>

      {/* Why Velkina */}
      <section id="why" className="vk-section--values max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">{h?.why?.title ?? 'Neden Velkina'}</h2>
            <p className="text-white/80 max-w-3xl mt-1">{h?.why?.subtitle ?? 'Kıdemli ürün, tasarım ve mühendislik tek şeritte. Premium marka deneyimleri ve güvenilir sistemleri hızlı, ölçülebilir ve sakin bir şekilde hayata geçiriyoruz.'}</p>
          </div>
          <div className="text-white/60 text-sm">{h?.why?.techLine ?? 'Next.js 14 • Edge • Analytics • Automation'}</div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
          {/* Big proof card */}
          <article className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft reveal-on-scroll lg:col-span-5 lg:row-span-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="vk-chip vk-chip--cyan" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75"/></svg>
              </span>
              <h3 className="font-heading text-lg">{h?.why?.howWeWork?.title ?? 'Nasıl çalışıyoruz'}</h3>
            </div>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2"><span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-vkcyan" aria-hidden="true"></span><span>{h?.why?.howWeWork?.items?.[0] ?? 'Önizlemeler, geri almalar ve net demolarla haftalık gönderim ritmi.'}</span></li>
              <li className="flex items-start gap-2"><span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-vkpink" aria-hidden="true"></span><span>{h?.why?.howWeWork?.items?.[1] ?? 'Önce tasarım sistemi: tutarlılık için token’lar, bileşenler ve hareket.'}</span></li>
              <li className="flex items-start gap-2"><span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-white/60" aria-hidden="true"></span><span>{h?.why?.howWeWork?.items?.[2] ?? 'Ölçülebilir büyüme: sunucu tarafı analitik, deneyler ve CRO.'}</span></li>
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center" aria-hidden="true">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3"><div className="font-heading">120+</div><div className="text-xs text-white/70">{h?.why?.howWeWork?.stats?.launches ?? 'Lansman'}</div></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3"><div className="font-heading">5</div><div className="text-xs text-white/70">{h?.why?.howWeWork?.stats?.median ?? 'Medyan süre'}</div></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3"><div className="font-heading">99.9%</div><div className="text-xs text-white/70">{h?.why?.howWeWork?.stats?.uptime ?? 'Edge çalışma süresi'}</div></div>
            </div>
          </article>

          {/* Senior-only team */}
          <article className="vk-card vk-glass border border-white/10 rounded-xl p-6 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll lg:col-span-7">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--purple" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
              </span>
              <h3 className="font-heading text-xl">{h?.why?.seniorOnly?.title ?? 'Sadece kıdemli ekip'}</h3>
            </div>
            <p className="text-white/80">{h?.why?.seniorOnly?.desc ?? 'Handover yok, yük yok. Strateji, tasarım ve kod birlikte ilerler; siz de öyle.'}</p>
          </article>

          {/* Speed without stress */}
          <article className="vk-card vk-glass border border-white/10 rounded-xl p-6 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll lg:col-span-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--cyan" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </span>
              <h3 className="font-heading text-lg">{h?.why?.speed?.title ?? 'Stres olmadan hız'}</h3>
            </div>
            <p className="text-white/80">{h?.why?.speed?.desc ?? 'Edge barındırma, CI/CD ve tip güvenli API’ler. Önizlemeler her adımı güvenli kılar.'}</p>
          </article>

          {/* Design that converts */}
          <article className="vk-card vk-glass border border-white/10 rounded-xl p-6 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll lg:col-span-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--pink" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l3.938-3.063L17 21l-.813-5.096L20 12l-5.156-.75L12.938 6 11 11.25 6 12l3.813 3.904Z"/></svg>
              </span>
              <h3 className="font-heading text-lg">{h?.why?.design?.title ?? 'Dönüştüren tasarım'}</h3>
            </div>
            <p className="text-white/80">{h?.why?.design?.desc ?? 'Premium hareket ve net hikâye. Sadece güzel görünen değil, satan sistemler.'}</p>
          </article>
  
      </div>
      </section>

      {/* Sonuçlar şeridi: kanıt */}
      <section aria-labelledby="results" className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 id="results" className="font-heading text-2xl md:text-3xl">{h?.resultsTitle ?? 'Kanıtlanmış Sonuçlar'}</h2>
          <span className="hidden sm:inline text-white/60 text-sm">{h?.resultsSubtitle ?? 'Son işlerden öne çıkanlar'}</span>
        </div>
        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-6">
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="120">0</span>+</span></div>
            <span className="sr-only">{h?.metrics?.published?.sr ?? '120+ yayınlanan web sitesi ve uygulama'}</span>
            <div className="text-white/70 text-sm">{h?.metrics?.published?.label ?? 'Yayınlanan web sitesi ve uygulama'}</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-vkcyan">+<span className="vk-countup" data-to="86">0</span>%</span></div>
            <span className="sr-only">{h?.metrics?.cwv?.sr ?? 'Sayfaların yüzde 86’sı Core Web Vitals “İyi” seviyesine taşındı'}</span>
            <div className="text-white/70 text-sm">{h?.metrics?.cwv?.label ?? 'Core Web Vitals “İyi”ye taşınan sayfalar'}</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-vkpink">+<span className="vk-countup" data-to="35">0</span>%</span></div>
            <span className="sr-only">{h?.metrics?.conversion?.sr ?? 'Lansman sonrası ortalama dönüşüm artışı yüzde 35'}</span>
            <div className="text-white/70 text-sm">{h?.metrics?.conversion?.label ?? 'Lansman sonrası ortalama dönüşüm artışı'}</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="5">0</span> hafta</span></div>
            <span className="sr-only">{h?.metrics?.medianTime?.sr ?? 'Medyan yayına alma süresi 5 haftadır'}</span>
            <div className="text-white/70 text-sm">{h?.metrics?.medianTime?.label ?? 'Medyan yayına alma süresi'}</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="40">0</span>+</span></div>
            <span className="sr-only">{h?.metrics?.integrations?.sr ?? '40+ API ve entegrasyon otomatikleştirildi'}</span>
            <div className="text-white/70 text-sm">{h?.metrics?.integrations?.label ?? 'Otomatikleştirilen API ve entegrasyon'}</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="99.9" data-decimals="1">0.0</span>%</span></div>
            <span className="sr-only">{h?.metrics?.uptime?.sr ?? 'Gözlemlenen edge çalışma süresi yüzde 99.9'}</span>
            <div className="text-white/70 text-sm">{h?.metrics?.uptime?.label ?? 'Gözlemlenen edge çalışma süresi'}</div>
          </div>
        </div>

        {/* Güvenilen markalar (kompakt kayan liste) */}
        <h3 className="font-heading text-xl md:text-2xl mb-3">{h?.brandsTitle ?? 'Müşterilerimiz'}</h3>
        <div className="relative overflow-hidden mb-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
          <div className="ticker ticker--auto py-3">
            <div className="flex items-center gap-12 pr-12">
              <img className="brand brand--bw" data-brand="clown3d" src="/clients/clown3d.svg" alt="Clown 3D" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="raingroup" src="/clients/raingroup.svg" alt="Rain Group" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="novahealth" src="/clients/novahealth.svg" alt="Nova Health" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="skylinemedia" src="/clients/skyline-media.svg" alt="Skyline Media" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="marmarafoods" src="/clients/marmara-foods.svg" alt="Marmara Foods" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="bosporustravel" src="/clients/bosporus-travel.svg" alt="Bosporus Travel" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="anatoliahotel" src="/clients/anatolia-hotel.svg" alt="Anatolia Hotel" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="velkina" src="/clients/velkina.svg" alt="Velkina" loading="eager" decoding="async" draggable="false" />
            </div>
            <div className="flex items-center gap-12 pr-12" aria-hidden="true">
              <img className="brand brand--bw" data-brand="clown3d" src="/clients/clown3d.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="raingroup" src="/clients/raingroup.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="novahealth" src="/clients/novahealth.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="skylinemedia" src="/clients/skyline-media.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="marmarafoods" src="/clients/marmara-foods.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="bosporustravel" src="/clients/bosporus-travel.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="anatoliahotel" src="/clients/anatolia-hotel.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="velkina" src="/clients/velkina.svg" alt="" loading="lazy" decoding="async" draggable="false" />
            </div>
          </div>
        </div>

        {/* Who we help removed in favor of results-focused strip */}
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">{h?.testimonials?.title ?? 'What clients say'}</h2>
        {(() => {
          const items = (Array.isArray(h?.testimonials?.items) && h?.testimonials?.items?.length)
            ? h.testimonials.items
            : [
                { quote: 'Velkina shipped our site in weeks with a clean design system.', name: 'Aylin K.', role: 'CMO, SaaS' },
                { quote: 'Clear scope, fast iterations and measurable results.', name: 'Kerem D.', role: 'Founder' },
                { quote: 'A senior team end‑to‑end—no handovers, just momentum.', name: 'Mert S.', role: 'Product Lead' },
                { quote: 'Edge hosting and observability gave us confidence to ship.', name: 'Elif A.', role: 'Engineering Manager' }
              ];
          return (
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
              <div className="ticker ticker--auto py-4">
                <div className="flex items-stretch gap-4 pr-8">
                  {items.map((item: any, idx: number) => (
                    <figure key={`t1-${idx}`} className="min-w-[280px] max-w-[380px] vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
                      <blockquote className="text-white/80">“{item?.quote}”</blockquote>
                      <figcaption className="mt-3 text-sm text-white/70">
                        <span className="font-medium text-white/90">{item?.name}</span>
                        {item?.role ? <span className="text-white/60"> — {item.role}</span> : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <div className="flex items-stretch gap-4 pr-8" aria-hidden="true">
                  {items.map((item: any, idx: number) => (
                    <figure key={`t2-${idx}`} className="min-w-[280px] max-w-[380px] vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
                      <blockquote className="text-white/80">“{item?.quote}”</blockquote>
                      <figcaption className="mt-3 text-sm text-white/70">
                        <span className="font-medium text-white/90">{item?.name}</span>
                        {item?.role ? <span className="text-white/60"> — {item.role}</span> : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Process removed per request */}

      {/* Our Services (compact) */}
      <section id="services" className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {(() => {
          const s = t('services') as any;
          let items = Array.isArray(s?.items) ? s.items : [];
          if (!items || items.length === 0) {
            items = [
              { id: 'web', title: 'Web Development', tag: 'Design • Frontend • Backend', intro: 'High‑performance websites and apps built on Next.js 14, TypeScript, and a robust design system.' },
              { id: 'hosting', title: 'Edge Hosting & DevOps', tag: 'Vercel • Cloudflare • AWS', intro: 'Fast, dependable and observable deployments with CI/CD, caching and rollbacks.' },
              { id: 'it', title: 'IT Solutions & Integrations', tag: 'Identity • Data • Workflows', intro: 'Connect your stack with secure auth, data sync and automated workflows.' },
              { id: 'middleware', title: 'CRM–CMS Middleware', tag: 'HubSpot • Salesforce • Sanity', intro: 'A unified API layer between sites, CRMs and CMSs for clean data and faster ops.' },
              { id: 'growth', title: 'Ad Campaigns & Growth', tag: 'Acquisition • CRO • Analytics', intro: 'Campaigns that compound with accurate measurement and fast landing iterations.' },
              { id: 'production', title: 'Production & Content', tag: 'Video • Motion • Docs', intro: 'Crisp visuals, motion and docs that actually onboard and differentiate.' }
            ];
          }
          return (
            <div>
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-heading text-3xl md:text-4xl">{h?.servicesTitle ?? 'Ne yapıyoruz'}</h2>
                <a href={`/${locale}/services`} className="text-white/80 hover:text-vkcyan text-sm border border-white/15 rounded-lg px-3 py-1.5 bg-white/5 hover:bg-white/10">{h?.servicesViewAll ?? 'Tüm hizmetleri gör'}</a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.slice(0, 6).map((item: any) => (
                  <a key={item.id} href={`/${locale}/services#${item.id}`} className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50">
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
                      {h?.explore ?? 'İncele'}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* Tech Stack Carousel */}
      <section id="stack" className="max-w-7xl mx-auto px-6 md:px-10 py-16 relative">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">{h?.stackTitle ?? 'Teknoloji Yığını'}</h2>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
          <div className="ticker ticker--auto py-4">
            <div className="flex items-center gap-12 pr-12">
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="nextjs" src="https://cdn.simpleicons.org/nextdotjs/FFFFFF" alt="Next.js" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Next.js</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="react" src="https://cdn.simpleicons.org/react/61DAFB" alt="React" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">React</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="nodejs" src="https://cdn.simpleicons.org/nodedotjs/339933" alt="Node.js" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Node.js</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="express" src="https://cdn.simpleicons.org/express/FFFFFF" alt="Express" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Express</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="tailwindcss" src="https://cdn.simpleicons.org/tailwindcss/38BDF8" alt="Tailwind CSS" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="prisma" src="https://cdn.simpleicons.org/prisma" alt="Prisma" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Prisma</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="supabase" src="https://cdn.simpleicons.org/supabase/3FCF8E" alt="Supabase" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Supabase</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="postgresql" src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">PostgreSQL</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="mongodb" src="https://cdn.simpleicons.org/mongodb/47A248" alt="MongoDB" loading="eager" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">MongoDB</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="redis" src="https://cdn.simpleicons.org/redis/DC382D" alt="Redis" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Redis</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="stripe" src="https://cdn.simpleicons.org/stripe/635BFF" alt="Stripe" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Stripe</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="openai" src="https://cdn.simpleicons.org/openai/FFFFFF" alt="OpenAI" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">OpenAI</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="threejs" src="https://cdn.simpleicons.org/threedotjs/FFFFFF" alt="Three.js" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Three.js</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="docker" src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Docker</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="kubernetes" src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="Kubernetes" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Kubernetes</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="vercel" src="https://cdn.simpleicons.org/vercel/FFFFFF" alt="Vercel" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Vercel</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="netlify" src="https://cdn.simpleicons.org/netlify/00C7B7" alt="Netlify" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Netlify</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="cloudflare" src="https://cdn.simpleicons.org/cloudflare/F38020" alt="Cloudflare" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Cloudflare</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="aws" src="https://cdn.simpleicons.org/amazonwebservices/FF9900" alt="AWS" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">AWS</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="azure" src="https://cdn.simpleicons.org/microsoftazure/0078D4" alt="Azure" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Azure</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="github" src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">GitHub</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="gitlab" src="https://cdn.simpleicons.org/gitlab/FC6D26" alt="GitLab" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">GitLab</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="google" src="https://cdn.simpleicons.org/google/4285F4" alt="Google" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Google</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="meta" src="https://cdn.simpleicons.org/meta/0467DF" alt="Meta" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Meta</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="webflow" src="https://cdn.simpleicons.org/webflow/4353FF" alt="Webflow" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Webflow</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="wix" src="https://cdn.simpleicons.org/wix/FFFFFF" alt="Wix" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Wix</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="python" src="https://cdn.simpleicons.org/python/3776AB" alt="Python" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Python</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="apachekafka" src="https://cdn.simpleicons.org/apachekafka/FFFFFF" alt="Apache Kafka" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Apache Kafka</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="grafana" src="https://cdn.simpleicons.org/grafana/F46800" alt="Grafana" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Grafana</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="sentry" src="https://cdn.simpleicons.org/sentry/FFFFFF" alt="Sentry" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Sentry</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="figma" src="https://cdn.simpleicons.org/figma/F24E1E" alt="Figma" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/70">Figma</span>
              </div>
            </div>
            <div className="flex items-center gap-12 pr-12" aria-hidden="true">
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="nextjs" src="https://cdn.simpleicons.org/nextdotjs/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Next.js</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="react" src="https://cdn.simpleicons.org/react/61DAFB" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">React</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="nodejs" src="https://cdn.simpleicons.org/nodedotjs/339933" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Node.js</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="express" src="https://cdn.simpleicons.org/express/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Express</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="tailwindcss" src="https://cdn.simpleicons.org/tailwindcss/38BDF8" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="prisma" src="https://cdn.simpleicons.org/prisma" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Prisma</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="supabase" src="https://cdn.simpleicons.org/supabase/3FCF8E" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Supabase</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="postgresql" src="https://cdn.simpleicons.org/postgresql/4169E1" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">PostgreSQL</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="mongodb" src="https://cdn.simpleicons.org/mongodb/47A248" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">MongoDB</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="redis" src="https://cdn.simpleicons.org/redis/DC382D" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Redis</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="stripe" src="https://cdn.simpleicons.org/stripe/635BFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Stripe</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="openai" src="https://cdn.simpleicons.org/openai/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">OpenAI</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="threejs" src="https://cdn.simpleicons.org/threedotjs/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Three.js</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="docker" src="https://cdn.simpleicons.org/docker/2496ED" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Docker</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="kubernetes" src="https://cdn.simpleicons.org/kubernetes/326CE5" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Kubernetes</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="vercel" src="https://cdn.simpleicons.org/vercel/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Vercel</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="netlify" src="https://cdn.simpleicons.org/netlify/00C7B7" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Netlify</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="cloudflare" src="https://cdn.simpleicons.org/cloudflare/F38020" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Cloudflare</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="aws" src="https://cdn.simpleicons.org/amazonwebservices/FF9900" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">AWS</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="azure" src="https://cdn.simpleicons.org/microsoftazure/0078D4" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Azure</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="github" src="https://cdn.simpleicons.org/github/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">GitHub</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="gitlab" src="https://cdn.simpleicons.org/gitlab/FC6D26" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">GitLab</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="google" src="https://cdn.simpleicons.org/google/4285F4" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Google</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="meta" src="https://cdn.simpleicons.org/meta/0467DF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Meta</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="webflow" src="https://cdn.simpleicons.org/webflow/4353FF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Webflow</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="wix" src="https://cdn.simpleicons.org/wix/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Wix</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="python" src="https://cdn.simpleicons.org/python/3776AB" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Python</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="apachekafka" src="https://cdn.simpleicons.org/apachekafka/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Apache Kafka</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="grafana" src="https://cdn.simpleicons.org/grafana/F46800" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Grafana</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="sentry" src="https://cdn.simpleicons.org/sentry/FFFFFF" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Sentry</span>
              </div>
              <div className="flex flex-col items-center min-w-[84px]">
                <img className="brand w-10 h-10 object-contain" data-brand="figma" src="https://cdn.simpleicons.org/figma/F24E1E" alt="" loading="lazy" decoding="async" draggable="false" />
                <span className="mt-1 text-xs text-white/50">Figma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <div className="rounded-xl border border-white/10 vk-glass shadow-soft p-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl mb-2">Hızlı İletişim</h2>
          <p className="text-white/80 mb-4">Bir iş günü içinde yanıtlıyoruz. Baskı yok, netlik var.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a data-cta="whatsapp" className="inline-flex items-center px-5 py-2.5 rounded-xl bg-vkpink text-black shadow-strong font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0  0 1-.825-.242m9.345-8.334a2.126 2.126 0  0 0-.476-.095 48.64 48.64 0  0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0  0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l-4.155-4.155"/>
              </svg>
              WhatsApp’tan yazın
            </a>
            <a data-cta="email" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-vkcyan/50 text-vkcyan/90 bg-white/5 hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0  0 1-2.25 2.25h-15a2.25 2.25 0  0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0  0 0 19.5  4.5h-15a2.25 2.25 0  0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0  0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0  0 1-2.36 0L3.32 8.91a2.25 2.25 0  0 1-1.07-1.916V6.75"/>
              </svg>
              E‑posta gönderin
            </a>
            <a data-cta="schedule" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0  0 1 2.25-2.25h13.5A2.25 2.25 0  0 1 21 7.5v11.25m-18 0A2.25 2.25 0  0 0 5.25 21h13.5A2.25 2.25 0  0 0 21 18.75m-18 0v-7.5A2.25 2.25 0  0 1 5.25 9h13.5A2.25 2.25 0  0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008Z"/>
              </svg>
              Görüşme planlayın
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
