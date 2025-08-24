import React from 'react';
import HeroShapesClient from '../../components/HeroShapesClient';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import type { ReactNode } from 'react';

export type ServicesViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function ServicesView({messages}: ServicesViewProps) {
  const t = createT(messages ?? getDefaultMessages());

  const icons: Record<string, ReactNode> = {
    web: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"/></svg>
    ),
    hosting: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 16.5h16.5M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/></svg>
    ),
    it: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
    ),
    middleware: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5h10.5m-10.5 4.5h10.5m-10.5 4.5h10.5"/></svg>
    ),
    growth: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 9 7.5l4.5 4.5L20.25 6v12.75A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25V13.5Z"/></svg>
    ),
    production: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5M4.5 10.5h15v9.75a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V10.5Z"/></svg>
    ),
    tours: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12 12 3l9.75 9M4.5 10.5V21h15V10.5"/></svg>
    ),
  };

  const services = t('services');
  let items = Array.isArray(services?.items) ? (services!.items as any[]) : [];
  if (!items || items.length === 0) {
    items = [
      { id: 'web', title: 'Web & Uygulamalar', tag: 'Next.js, React, CMS', intro: 'Modern web siteleri ve uygulamalar. Tasarımdan canlıya kadar uçtan uca.', deliverables: ['Tasarım sistemi', 'Bileşen kütüphanesi', 'Performans bütçesi'], outcomes: ['Hızlı sayfalar', 'Kolay bakım', 'SEO temelleri'], examples: ['Kurumsal site', 'Ürün sitesi', 'Panel'] },
      { id: 'hosting', title: 'Barındırma', tag: 'Vercel / Cloudflare', intro: 'Sıfırdan veya mevcut altyapıda hızlı, güvenilir barındırma.', deliverables: ['CI/CD', 'Önizlemeler', 'Gözlemlenebilirlik'], outcomes: ['%99.9+ uptime', 'Şeffaf maliyet', 'Kolay ölçeklenme'], examples: ['Statik/SSR dağıtım', 'Ön uç ağ geçidi'] },
      { id: 'it', title: 'IT & Operasyon', tag: 'SLA, Destek', intro: 'Kurumsal gereksinimler için operasyonel mükemmellik.', deliverables: ['SLA ve destek', 'Olay yönetimi', 'Sürümleme'], outcomes: ['Azalan risk', 'Hızlı yanıt', 'Düzenli bakım'], examples: ['Güncellemeler', 'Yedekleme'] },
      { id: 'middleware', title: 'Ara Katman', tag: 'APIs, Entegrasyon', intro: 'Sistemler arası entegrasyon ve güvenilir servisler.', deliverables: ['API tasarımı', 'Auth', 'Ölçümleme'], outcomes: ['Sağlam mimari', 'Genişleme alanı'], examples: ['Webhooklar', 'İç servisler'] },
      { id: 'growth', title: 'Büyüme', tag: 'CRO, Analitik', intro: 'Dönüşüm optimizasyonu ve deneylerle büyüme.', deliverables: ['A/B deneyleri', 'Huni analizi', 'Isı haritaları'], outcomes: ['Daha çok dönüşüm', 'Net içgörü'], examples: ['Yeni varyantlar', 'İyileştirme planı'] },
      { id: 'production', title: 'Prodüksiyon', tag: 'Video, 3D, İçerik', intro: 'Marka deneyimini güçlendiren içerik üretimi.', deliverables: ['Storyboard', 'Renderlar', 'Formatlar'], outcomes: ['Tutarlı kalite', 'Marka uyumu'], examples: ['Teaser', 'Case video'] },
      { id: 'tours', title: 'Dijital Turlar', tag: '360°, WebGL', intro: 'Mekan ve ürünleri etkileşimli deneyimlere taşıyın.', deliverables: ['Sahneleme', 'Optimizasyon', 'Yayın'], outcomes: ['Etkileyici sunum', 'Paylaşılabilir link'], examples: ['Galeri turu', 'Ürün demo'] },
    ];
  }

  const title = services?.title ?? 'Hizmetler';
  const heroDesc = services?.heroDesc ?? 'Fikirden büyümeye—tek ekip, tek sistem. Nasıl tasarladığımızı, geliştirdiğimizi ve ölçeklediğimizi keşfedin.';
  const modelsTitle = services?.modelsTitle ?? 'Çalışma Modelleri';
  const includedTitle = services?.includedTitle ?? 'Her Çalışmada Dahil';
  const start = services?.start ?? 'Başlat';
  const deliverables = services?.deliverables ?? 'Teslimatlar';
  const outcomes = services?.outcomes ?? 'Sonuçlar';
  const examples = services?.examples ?? 'Örnekler';
  const faq = services?.faq ?? 'SSS';
  const faqs = Array.isArray(services?.faqs) ? services!.faqs : undefined;
  const models = Array.isArray(services?.models) ? services!.models : undefined;
  const included = Array.isArray(services?.included) ? services!.included : undefined;

  const quickContact = services?.quickContact ?? 'Hızlı İletişim';
  const quickContactDesc = services?.quickContactDesc ?? 'Bir iş günü içinde yanıtlarız. Baskı yok; sadece netlik.';

  const ctaWhatsapp = t('home', 'ctas')?.whatsapp ?? 'WhatsApp’tan yazın';
  const ctaEmail = t('home', 'ctas')?.email ?? 'E‑posta gönderin';
  const ctaSchedule = t('home', 'ctas')?.schedule ?? 'Görüşme planlayın';

  return (
    <div className="pt-4">
      {/* Hero */}
      <section className="vk-hero relative overflow-hidden">
        <div
          className="absolute -inset-24 blur-3xl opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px 300px at 20% 10%, rgba(162,89,255,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(0,255,255,.25), transparent 60%)',
          }}
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-14 grid gap-10 sm:grid-cols-2 items-center">
          {/* Left column: title + copy */}
          <div>
            <h1 className="font-heading text-4xl md:text-5xl">{title}</h1>
            <p className="text-white/80 max-w-2xl mt-3">{heroDesc}</p>
          </div>
          {/* Right column: animation canvas */}
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <canvas id="vk-hero-shapes" className="absolute inset-0 w-full h-full" role="img" aria-label="Hizmetler görselleştirme"></canvas>
          </div>
        </div>
        {/* Wire shapes */}
        {/** Client-only visualizer lives outside grid like on home */}
        <HeroShapesClient />
      </section>

      {/* What we do: TOC + models (separate section below hero) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="relative z-10 mt-8 flex flex-wrap gap-2" role="navigation" aria-label="Services table of contents">
          {items.map((s: any) => (
            <a key={s.id} href={`#${s.id}`} className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80">{s.title}</a>
          ))}
        </div>
        <div className="relative z-10 mt-6 vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
          <h2 className="font-heading text-xl">{modelsTitle}</h2>
          {Array.isArray(models) ? (
            <ul className="mt-2 grid gap-2 md:grid-cols-3 text-white/80 list-disc pl-5">
              {models!.map((m, i) => (
                <li key={i}>{m as any}</li>
              ))}
            </ul>
          ) : (
            <ul className="mt-2 grid gap-2 md:grid-cols-3 text-white/80 list-disc pl-5">
              <li><strong className="text-white/90">Proje</strong>: Sabit kapsam, net çıktılar, hızlı teslim.</li>
              <li><strong className="text-white/90">Sprint</strong>: Deney ve iterasyonlar için 1–2 haftalık döngüler.</li>
              <li><strong className="text-white/90">Süreli Anlaşma</strong>: Süregelen yol haritası, optimizasyon ve destek.</li>
            </ul>
          )}
        </div>
      </section>

      {/* Included with every engagement */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-10">
        <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
          <h2 className="font-heading text-xl">{includedTitle}</h2>
          {Array.isArray(included) ? (
            <ul className="mt-2 grid gap-2 md:grid-cols-2 text-white/80 list-disc pl-5">
              {included!.map((x, i) => (
                <li key={i}>{x as any}</li>
              ))}
            </ul>
          ) : (
            <ul className="mt-2 grid gap-2 md:grid-cols-2 text-white/80 list-disc pl-5">
              <li>Net kapsam, kilometre taşları ve haftalık sprint değerlendirmeleri</li>
              <li>Tasarım sistemi token’ları ve belgelenmiş bileşenler</li>
              <li>Performans bütçesi, erişilebilirlik ve SEO temelleri</li>
              <li>Kuruluşunuzda kaynak kodu; CI/CD ve önizlemeler</li>
              <li>Gözlemlenebilirlik: loglar, metrikler ve çalışma süresi panoları</li>
              <li>Devir dokümanları, Loom videoları ve makul bir geri alma planı</li>
            </ul>
          )}
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid gap-8">
          {items.map((s: any) => (
            <article key={s.id} id={s.id} className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft scroll-mt-24">
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="mt-1">{icons[s.id]}</span>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl">{s.title}</h2>
                    <div className="text-xs text-white/60 mt-1">{s.tag}</div>
                  </div>
                </div>
                <a href="#cta" className="hidden md:inline-flex items-center px-3 py-1.5 rounded-lg border border-white/15 text-white/90 bg-white/5 hover:bg-white/10">{start}</a>
              </header>
              <p className="text-white/80 mt-3">{s.intro}</p>
              <div className="mt-4 grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-heading text-lg">{deliverables}</h3>
                  <ul className="list-disc pl-5 text-white/80 mt-2">
                    {s.deliverables.map((d: any, i: number) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg">{outcomes}</h3>
                  <ul className="list-disc pl-5 text-white/80 mt-2">
                    {s.outcomes.map((d: any, i: number) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg">{examples}</h3>
                  <ul className="list-disc pl-5 text-white/80 mt-2">
                    {s.examples?.map((d: any, i: number) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* FAQs */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-4">
          <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
            <h2 className="font-heading text-xl">{faq}</h2>
            {Array.isArray(faqs) ? (
              <div className="mt-2 grid gap-4 md:grid-cols-2 text-white/80">
                {faqs!.map((qa, i) => (
                  <div key={i}>
                    <h3 className="font-heading text-base text-white/90">{(qa as any).q}</h3>
                    <p className="mt-1">{(qa as any).a}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2 grid gap-4 md:grid-cols-2 text-white/80">
                <div>
                  <h3 className="font-heading text-base text-white/90">Nasıl başlıyoruz?</h3>
                  <p className="mt-1">Hedefler ve kısıtları hizalamak için 30–45 dakikalık bir görüşme ile başlarız. Ardından kapsam, zaman çizelgesi ve başarı metrikleri ile ilerleriz.</p>
                </div>
                <div>
                  <h3 className="font-heading text-base text-white/90">Nasıl iletişim kuruyor ve teslim ediyoruz?</h3>
                  <p className="mt-1">Demolar, asenkron güncellemeler ve açık proje panosu ile haftalık sprintler. Her değişiklik için önizleme linkleri ve PR’lar sağlarız.</p>
                </div>
                <div>
                  <h3 className="font-heading text-base text-white/90">Fikri mülkiyet kime ait?</h3>
                  <p className="mt-1">Size. Kaynak kodu kuruluşunuzda barınır; üçüncü taraf varlıklar için açık lisanslar kullanılır.</p>
                </div>
                <div>
                  <h3 className="font-heading text-base text-white/90">Lansman sonrası destek var mı?</h3>
                  <p className="mt-1">Evet — süreli anlaşmalarla yol haritası, CRO ve bakım desteği. Uzun sözleşmeler yok; ihtiyaca göre artar veya azalır.</p>
                </div>
                <div>
                  <h3 className="font-heading text-base text-white/90">Tipik zaman çizelgeleri?</h3>
                  <p className="mt-1">1–2 haftada ince bir dilim. 4–6 haftada pazarlama sitesi veya özellik seti. Daha büyük entegrasyonlar dönen sprintlerde evrilir.</p>
                </div>
                <div>
                  <h3 className="font-heading text-base text-white/90">Barındırma ve platformlar?</h3>
                  <p className="mt-1">Web için Vercel/Cloudflare, veri/hizmetler için tercih ettiğiniz bulutu öneriyoruz. Platform maliyetleri ayrı ve şeffaftır.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quick connect CTA */}
        <div id="cta" className="mt-12 rounded-xl border border-white/10 vk-glass shadow-soft p-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl mb-2">{quickContact}</h2>
          <p className="text-white/80 mb-4">{quickContactDesc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a data-cta="whatsapp" className="inline-flex items-center px-5 py-2.5 rounded-xl bg-vkpink text-black shadow-strong font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c 0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l-4.155-4.155"/></svg>
              {ctaWhatsapp}
            </a>
            <a data-cta="email" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-vkcyan/50 text-vkcyan/90 bg-white/5 hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0  0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
              {ctaEmail}
            </a>
            <a data-cta="schedule" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008Z"/></svg>
              {ctaSchedule}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
