import RevealClient from '../components/RevealClient';
import HeroStepsClient from '../components/HeroStepsClient';
import HeroShapesClient from '../components/HeroShapesClient';
import CountUpClient from '../components/CountUpClient';
import CardParallaxClient from '../components/CardParallaxClient';

export const metadata = {
  title: 'Velkina — Yarını Birlikte İnşa Edelim',
  description: 'İstanbul merkezli, yazılım‑odaklı bir dijital ajansız. Akıcı tasarım ile güçlü mühendisliği birleştiriyor; web siteleri, uygulamalar ve sistemleri tek bir akıcı yaratıcı sistemle tasarlıyor, geliştiriyor ve büyütüyoruz.',
};

export default function HomePage({messages, locale} = {}){
  const t = messages?.home;
  return (
    <div>
      <RevealClient />
      {/* Hero */}
      <section className="vk-hero relative overflow-hidden min-h-[86vh]">
        <div id="vk-hero-fallback" className="absolute inset-0" style={{background: 'var(--vk-bg)', backgroundImage: 'var(--vk-grad-neon)', opacity:.6}} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-20 grid gap-10 sm:grid-cols-2 items-center">
          {/* Left column: rotating steps headline + copy + CTAs */}
          <div>
            <h1 className="font-heading text-4xl md:text-6xl leading-tight">
              <span id="vk-hero-steps-text" className="inline-block align-baseline" aria-live="polite" aria-atomic="true">Keşfet</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mt-3">{t?.heroDesc ?? 'Retro‑fütüristik estetiği net ve bakımı kolay kodla buluşturuyoruz. Marka deneyimini; web sitesi, uygulama, orta katman ve büyüme adımlarını tek bir akıcı yaratıcı sistemle hayata geçiriyoruz.'}</p>
            <div className="flex flex-wrap gap-3 pt-4">
              <a data-cta="whatsapp" className="inline-flex items-center px-6 py-3 rounded-xl bg-vkpink text-black shadow-strong hover:scale-[1.02] transition will-change-transform font-mono">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0  0 1-.825-.242m9.345-8.334a2.126 2.126 0  0 0-.476-.095 48.64 48.64 0  0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0  0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l-4.155-4.155"/></svg>
                {t?.ctas?.whatsapp ?? 'WhatsApp’tan yazın'}
              </a>
              <a data-cta="email" className="inline-flex items-center px-6 py-3 rounded-xl border border-vkcyan/50 text-vkcyan/90 bg-white/5 hover:bg-white/10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0  0 1-2.25 2.25h-15a2.25 2.25 0  0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0  0 0 19.5  4.5h-15a2.25 2.25 0  0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0  0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0  0 1-2.36 0L3.32 8.91a2.25 2.25 0  0 1-1.07-1.916V6.75"/></svg>
                {t?.ctas?.email ?? 'E‑posta gönderin'}
              </a>
              <a data-cta="schedule" className="inline-flex items-center px-6 py-3 rounded-xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0  0 1 2.25-2.25h13.5A2.25 2.25 0  0 1 21 7.5v11.25m-18 0A2.25 2.25 0  0 0 5.25 21h13.5A2.25 2.25 0  0 0 21 18.75m-18 0v-7.5A2.25 2.25 0  0 1 5.25 9h13.5A2.25 2.25 0  0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Z"/>
              </svg>
              {t?.ctas?.schedule ?? 'Görüşme planlayın'}
            </a>
          </div>

          {/* Right column: synchronized shapes canvas */}
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <canvas id="vk-hero-shapes" className="absolute inset-0 w-full h-full" role="img" aria-label="Hero step visualization"></canvas>
          </div>
        </div>
        {/* Featured Services moved below hero */}
      </div>
      {/* Wire up hero interactions */}
      <HeroStepsClient />
      <HeroShapesClient />
    </section>

    {/* Featured Services (separate section below hero) */}
    <section id="services" className="vk-section--services">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-heading text-2xl md:text-3xl">{t?.servicesTitle ?? 'Ne yapıyoruz'}</h2>
          <a href={`${locale ? '/' + locale : ''}/services`} className="hidden sm:inline-flex items-center text-white/80 hover:text-vkcyan">
            {t?.servicesViewAll ?? 'Tüm hizmetleri gör'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Featured services">
          {/* Web Development */}
          <article role="listitem" className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--cyan" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0  0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>
              </span>
              <h3 className="font-heading text-xl">Web Geliştirme</h3>
            </div>
            <p className="text-white/80">Next.js 14 ile premium hareket ve sağlam SEO temellerine sahip web siteleri ve uygulamalar.</p>
            <a href={`${locale ? '/' + locale : ''}/services#web`} aria-label="Web Geliştirme'yi inceleyin" className="mt-3 inline-flex items-center text-vkcyan hover:text-white/90">
              {t?.explore ?? 'İncele'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
            </a>
          </article>

          {/* Edge Hosting & DevOps */}
          <article role="listitem" className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--cyan" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0  0 1 20.25 6v2.25A2.25 2.25 0  0 1 18 10.5H6A2.25 2.25 0  0 1 3.75 8.25V6ZM3.75 15A2.25 2.25 0  0 1 6 12.75h12A2.25 2.25 0  0 1 20.25 15v2.25A2.25 2.25 0  0 1 18 19.5H6a2.25 2.25 0  0 1-2.25-2.25V15Z"/></svg>
              </span>
              <h3 className="font-heading text-xl">Edge Hosting & DevOps</h3>
            </div>
            <p className="text-white/80">Önizlemeler, geri almalar ve Vercel/Cloudflare üzerinde edge hız ile sakin sürümler.</p>
            <a href={`${locale ? '/' + locale : ''}/services#hosting`} aria-label="Edge Hosting & DevOps'u inceleyin" className="mt-3 inline-flex items-center text-vkcyan hover:text-white/90">
              {t?.explore ?? 'İncele'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
            </a>
          </article>

          {/* AI Agents & Automation */}
          <article role="listitem" className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--pink" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0  0 0 2.25-2.25V6.75a2.25 2.25 0  0 0-2.25-2.25H6.75A2.25 2.25 0  0 0 4.5 6.75v10.5a2.25 2.25 0  0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"/></svg>
              </span>
              <h3 className="font-heading text-xl">Yapay Zekâ Asistanları & Otomasyon</h3>
            </div>
            <p className="text-white/80">Operasyon, destek ve analitik için gerçekten çalışan ve sürdürülebilir asistanlar.</p>
            <a href={`${locale ? '/' + locale : ''}/services#production`} aria-label="Yapay Zekâ Asistanları & Otomasyon'u inceleyin" className="mt-3 inline-flex items-center text-vkcyan hover:text-white/90">
              {t?.explore ?? 'İncele'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
            </a>
          </article>

          {/* CRM–CMS Middleware */}
          <article role="listitem" className="vk-card vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--cyan" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>
              </span>
              <h3 className="font-heading text-xl">CRM–CMS Orta Katman</h3>
            </div>
            <a href={`${locale ? '/' + locale : ''}/services#middleware`} aria-label="CRM–CMS Orta Katman'ı inceleyin" className="mt-3 inline-flex items-center text-vkcyan hover:text-white/90">
              {t?.explore ?? 'İncele'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
            </a>
          </article>
        </div>
        <div className="mt-4 flex justify-center">
          <a href={`${locale ? '/' + locale : ''}/services#cta`} className="inline-flex items-center px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/90">
            {t?.startProjectShort ?? 'Proje başlat — Hızlı iletişim'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 ml-1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    {/* Non-visual clients */}
    <CountUpClient />
    <CardParallaxClient />

      {/* Sonuçlar şeridi: kanıt */}
      <section aria-labelledby="results" className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 id="results" className="font-heading text-2xl md:text-3xl">Kanıtlanmış Sonuçlar</h2>
          <span className="hidden sm:inline text-white/60 text-sm">Son işlerden öne çıkanlar</span>
        </div>
        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-6">
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="120">0</span>+</span></div>
            <span className="sr-only">120+ yayınlanan web sitesi ve uygulama</span>
            <div className="text-white/70 text-sm">Yayınlanan web sitesi ve uygulama</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-vkcyan">+<span className="vk-countup" data-to="86">0</span>%</span></div>
            <span className="sr-only">Sayfaların yüzde 86’sı Core Web Vitals “İyi” seviyesine taşındı</span>
            <div className="text-white/70 text-sm">Core Web Vitals “İyi”ye taşınan sayfalar</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-vkpink">+<span className="vk-countup" data-to="35">0</span>%</span></div>
            <span className="sr-only">Lansman sonrası ortalama dönüşüm artışı yüzde 35</span>
            <div className="text-white/70 text-sm">Lansman sonrası ortalama dönüşüm artışı</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="5">0</span> hafta</span></div>
            <span className="sr-only">Medyan yayına alma süresi 5 haftadır</span>
            <div className="text-white/70 text-sm">Medyan yayına alma süresi</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="40">0</span>+</span></div>
            <span className="sr-only">40+ API ve entegrasyon otomatikleştirildi</span>
            <div className="text-white/70 text-sm">Otomatikleştirilen API ve entegrasyon</div>
          </div>
          <div className="vk-glass border border-white/10 rounded-xl p-4 shadow-soft text-center">
            <div className="font-heading text-2xl" aria-hidden="true"><span className="text-white"><span className="vk-countup" data-to="99.9" data-decimals="1">0.0</span>%</span></div>
            <span className="sr-only">Gözlemlenen edge çalışma süresi yüzde 99.9</span>
            <div className="text-white/70 text-sm">Gözlemlenen edge çalışma süresi</div>
          </div>
        </div>

        {/* Güvenilen markalar (kompakt kayan liste) */}
        <div className="relative overflow-hidden mb-6" aria-label="Güvenilen markalar karuseli" role="group" tabIndex={0}>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
          {/* Pause/Play control */}
          <button
            data-ticker-toggle
            aria-label="Karuseli duraklat"
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

        {/* Who we help removed in favor of results-focused strip */}
      </section>

      

      {/* Neden Velkina */}
      <section id="why" className="vk-section--values max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">Neden Velkina</h2>
            <p className="text-white/80 max-w-3xl mt-1">Kıdemli ürün, tasarım ve mühendislik tek şeritte. Premium marka deneyimleri ve güvenilir sistemleri hızlı, ölçülebilir ve sakin bir şekilde hayata geçiriyoruz.</p>
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
              <h3 className="font-heading text-lg">Nasıl çalışıyoruz</h3>
            </div>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2"><span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-vkcyan" aria-hidden="true"></span><span>Önizlemeler, geri almalar ve net demolarla haftalık gönderim ritmi.</span></li>
              <li className="flex items-start gap-2"><span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-vkpink" aria-hidden="true"></span><span>Önce tasarım sistemi: tutarlılık için token’lar, bileşenler ve hareket.</span></li>
              <li className="flex items-start gap-2"><span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-white/60" aria-hidden="true"></span><span>Ölçülebilir büyüme: sunucu tarafı analitik, deneyler ve CRO.</span></li>
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center" aria-hidden="true">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3"><div className="font-heading">120+</div><div className="text-xs text-white/70">Lansman</div></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3"><div className="font-heading">5 haftadır</div><div className="text-xs text-white/70">Medyan süre</div></div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3"><div className="font-heading">99.9%</div><div className="text-xs text-white/70">Edge çalışma süresi</div></div>
            </div>
          </article>

          {/* Senior-only team */}
          <article className="vk-card vk-glass border border-white/10 rounded-xl p-6 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll lg:col-span-7">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--purple" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
              </span>
              <h3 className="font-heading text-xl">Sadece kıdemli ekip</h3>
            </div>
            <p className="text-white/80">Handover yok, yük yok. Strateji, tasarım ve kod birlikte ilerler; siz de öyle.</p>
          </article>

          {/* Speed without stress */}
          <article className="vk-card vk-glass border border-white/10 rounded-xl p-6 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll lg:col-span-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--cyan" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </span>
              <h3 className="font-heading text-lg">Stres olmadan hız</h3>
            </div>
            <p className="text-white/80">Edge barındırma, CI/CD ve tip güvenli API’ler. Önizlemeler her adımı güvenli kılar.</p>
          </article>

          {/* Design that converts */}
          <article className="vk-card vk-glass border border-white/10 rounded-xl p-6 shadow-soft hover:shadow-strong hover:-translate-y-1 hover:scale-[1.01] transition reveal-on-scroll lg:col-span-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="vk-chip vk-chip--pink" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l3.938-3.063L17 21l-.813-5.096L20 12l-5.156-.75L12.938 6 11 11.25 6 12l3.813 3.904Z"/></svg>
              </span>
              <h3 className="font-heading text-lg">Dönüştüren tasarım</h3>
            </div>
            <p className="text-white/80">Premium hareket ve net hikâye. Sadece güzel görünen değil, satan sistemler.</p>
          </article>
        </div>
      </section>

      {/* Process removed per request */}

      {/* Services moved into hero */}

      {/* Teknoloji Yığını Karuseli */}
      <section id="stack" className="max-w-7xl mx-auto px-6 md:px-10 py-16 relative">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">Teknoloji Yığını</h2>
        <div className="relative overflow-hidden" role="group" aria-label="Teknoloji logoları karuseli" tabIndex={0}>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}}></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}}></div>
          {/* Pause/Play control */}
          <button
            data-ticker-toggle
            aria-label="Karuseli duraklat"
            aria-pressed="false"
            className="absolute right-2 top-2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4.5 h-4.5" aria-hidden="true"><path strokeLinecap="round" d="M8 5h2v14H8zM14 5h2v14h-2z"/></svg>
          </button>
          <div data-ticker className="ticker py-4">
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
