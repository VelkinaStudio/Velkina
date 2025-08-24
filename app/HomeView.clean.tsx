'use client';
import React from 'react';
import type {Locale, Messages} from '../i18n/messages';
import {createT, getDefaultMessages} from '../i18n/messages';
import CountUpClient from '../components/CountUpClient';
import CardParallaxClient from '../components/CardParallaxClient';
import HeroShapesClient from '../components/HeroShapesClient';
import HeroStepsClient from '../components/HeroStepsClient';

type HomeViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function HomeView({messages, locale}: HomeViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const h = t('home') as any;
  const common = t('common') as any;
  const nav = t('nav') as any;
  const s = t('services') as any;
  const base = locale ? `/${locale}` : '';

  return (
    <div>
      {/* Non-visual clients */}
      <CountUpClient />
      <CardParallaxClient />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* WebGL background shapes canvas */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <canvas id="vk-hero-shapes" className="w-full h-full" aria-hidden="true"></canvas>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl tracking-wide">VELKINA</h1>
              <p className="mt-3 text-white/80 max-w-2xl">{h?.heroDesc ?? 'We design, build and scale high‑performance websites, apps and systems with modern tooling and edge hosting.'}</p>

              {/* Animated steps text */}
              <div className="mt-6 font-mono text-vkcyan text-lg" aria-label="Process steps">
                <span id="vk-hero-steps-text">{h?.heroSteps?.[0] ?? 'Discover'}</span>
              </div>
            </div>

            {/* Spacer / visual column to keep layout balanced */}
            <div className="h-40 md:h-56 lg:h-64" aria-hidden="true"></div>
          </div>
        </div>

        {/* Hero clients (non-visual controllers) */}
        <HeroShapesClient />
        <HeroStepsClient steps={h?.heroSteps ?? []} />
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-heading text-3xl md:text-4xl">{h?.servicesTitle ?? 'What we do'}</h2>
          <a href={`${base}/services`} className="hidden sm:inline text-vkcyan hover:text-white/90">
            {h?.servicesViewAll ?? 'See all services'}
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(s?.items ?? []).slice(0, 3).map((item: any, idx: number) => (
            <article key={item?.id ?? `svc-${idx}`} className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll">
              <div className="mb-2">
                <h3 className="font-heading text-xl">{item?.title ?? 'Service'}</h3>
                {item?.tag ? <div className="text-xs text-white/60 mt-0.5">{item.tag}</div> : null}
              </div>
              {item?.intro ? <p className="text-white/80">{item.intro}</p> : null}
              <a
                href={`${base}/services#${item?.id ?? ''}`}
                aria-label={`${(h?.explore ?? 'Explore')} ${item?.title ?? ''}`}
                className="mt-3 inline-flex items-center text-vkcyan hover:text-white/90"
              >
                {h?.explore ?? 'Explore'}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
              </a>
            </article>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <a href={`${base}/services#cta`} className="inline-flex items-center px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/90">
            {h?.startProjectShort ?? 'Start project — Quick contact'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
          </a>
        </div>
      </section>

      {/* Tech Stack Carousel */}
      <section id="stack" className="max-w-7xl mx-auto px-6 md:px-10 py-16 relative">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">{nav?.tech ?? 'Tech'}</h2>
        <div className="relative overflow-hidden" role="group" aria-label={h?.brandsCarouselLabel ?? 'Technology carousel'} tabIndex={0}>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
          <button
            data-ticker-toggle
            aria-label={common?.carouselPause ?? 'Pause carousel'}
            aria-pressed="false"
            className="absolute right-2 top-2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4.5 h-4.5" aria-hidden="true"><path strokeLinecap="round" d="M8 5h2v14H8zM14 5h2v14h-2z"/></svg>
          </button>
          <div data-ticker className="ticker py-3">
            <div className="flex items-center gap-12 pr-12">
              <img className="brand brand--bw" data-brand="nextjs" src="/brands/nextjs.svg" alt="Next.js" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="react" src="/brands/react.svg" alt="React" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="cloudflare" src="/brands/cloudflare.svg" alt="Cloudflare" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="aws" src="/brands/aws.svg" alt="AWS" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="stripe" src="/brands/stripe.svg" alt="Stripe" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="postgresql" src="/brands/postgresql.svg" alt="PostgreSQL" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="github" src="/brands/github.svg" alt="GitHub" loading="eager" decoding="async" draggable="false" />
            </div>
            <div className="flex items-center gap-12 pr-12" aria-hidden="true">
              <img className="brand brand--bw" data-brand="nextjs" src="/brands/nextjs.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="react" src="/brands/react.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="cloudflare" src="/brands/cloudflare.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="aws" src="/brands/aws.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="stripe" src="/brands/stripe.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="postgresql" src="/brands/postgresql.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="github" src="/brands/github.svg" alt="" loading="lazy" decoding="async" draggable="false" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Velkina */}
      <section id="why" className="vk-section--values max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">{h?.why?.title ?? 'Neden Velkina'}</h2>
            <p className="text-white/80 max-w-3xl mt-1">{h?.why?.subtitle ?? 'Kıdemli ürün, tasarım ve mühendislik tek şeritte. Premium marka deneyimleri ve güvenilir sistemleri hızlı, ölçülebilir ve sakin bir şekilde hayata geçiriyoruz.'}</p>
          </div>
          <div className="text-white/60 text-sm">Next.js 14 • Edge • Analitik • Otomasyon</div>
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

      {/* Results */}
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
        <div className="relative overflow-hidden mb-6" aria-label={h?.brandsCarouselLabel ?? 'Güvenilen markalar karuseli'} role="group" tabIndex={0}>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
          {/* Pause/Play control */}
          <button
            data-ticker-toggle
            aria-label={common?.carouselPause ?? 'Karuseli duraklat'}
            aria-pressed="false"
            className="absolute right-2 top-2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-sm"
          >
            {/* Pause icon by default; JS updates aria-label/state */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4.5 h-4.5" aria-hidden="true"><path strokeLinecap="round" d="M8 5h2v14H8zM14 5h2v14h-2z"/></svg>
          </button>
          <div data-ticker className="ticker py-3">
            <div className="flex items-center gap-12 pr-12">
              <img className="brand brand--bw" data-brand="vercel" src="/brands/vercel.svg" alt="Vercel" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="cloudflare" src="/brands/cloudflare.svg" alt="Cloudflare" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="aws" src="/brands/aws.svg" alt="AWS" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="github" src="/brands/github.svg" alt="GitHub" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="nextjs" src="/brands/nextjs.svg" alt="Next.js" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="stripe" src="/brands/stripe.svg" alt="Stripe" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="postgresql" src="/brands/postgresql.svg" alt="PostgreSQL" loading="eager" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="react" src="/brands/react.svg" alt="React" loading="eager" decoding="async" draggable="false" />
            </div>
            <div className="flex items-center gap-12 pr-12" aria-hidden="true">
              <img className="brand brand--bw" data-brand="vercel" src="/brands/vercel.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="cloudflare" src="/brands/cloudflare.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="aws" src="/brands/aws.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="github" src="/brands/github.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="nextjs" src="/brands/nextjs.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="stripe" src="/brands/stripe.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="postgresql" src="/brands/postgresql.svg" alt="" loading="lazy" decoding="async" draggable="false" />
              <img className="brand brand--bw" data-brand="react" src="/brands/react.svg" alt="" loading="lazy" decoding="async" draggable="false" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
