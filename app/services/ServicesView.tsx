import React from 'react';
import HeroShapesClient from '../../components/HeroShapesClient';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import type { ReactNode } from 'react';

export type ServicesViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function ServicesView({messages, locale}: ServicesViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const lang = locale === 'tr' ? 'tr' : 'en';

  const icons: Record<string, ReactNode> = {
    websites: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"/></svg>
    ),
    applications: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
    ),
    'ai-automation': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5h10.5m-10.5 4.5h10.5m-10.5 4.5h10.5"/></svg>
    ),
    ads: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 9 7.5l4.5 4.5L20.25 6v12.75A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25V13.5Z"/></svg>
    ),
    seo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12 12 3l9.75 9M4.5 10.5V21h15V10.5"/></svg>
    ),
    middleware: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5h10.5m-10.5 4.5h10.5m-10.5 4.5h10.5"/></svg>
    ),
    'analytics-cro': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 9 7.5l4.5 4.5L20.25 6v12.75A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25V13.5Z"/></svg>
    ),
    'hosting-devops': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 16.5h16.5M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/></svg>
    ),
    // Legacy keys fallback (no-op)
  };

  const services = t('services');
  const trItems = [
    { id: 'websites', title: 'Web Siteleri', tag: 'Tasarım • Frontend • Backend', intro: 'Hızlı, güvenilir ve net web siteleri. Tasarımdan canlıya kadar uçtan uca.', deliverables: ['Tasarım sistemi ve bileşenler', 'CMS entegrasyonu', 'Performans ve erişilebilirlik'], outcomes: ['Hızlı sayfalar', 'Yüksek algılanan kalite', 'SEO temelleri'], examples: ['Kurumsal site', 'Ürün‑pazarlama', 'Doküman portalı'] },
    { id: 'applications', title: 'Uygulamalar', tag: 'Web App • Mobil • Panel', intro: 'İş süreçlerinize özel paneller ve kullanıcı uygulamaları.', deliverables: ['Akışlar ve yetkilendirme', 'Bileşen kütüphanesi', 'API entegrasyonları'], outcomes: ['Verimli ekipler', 'Daha az hata', 'Ölçeklenebilir mimari'], examples: ['Yönetim paneli', 'Müşteri portalı'] },
    { id: 'ai-automation', title: 'AI Otomasyonu', tag: 'İş Akışları • Ajanlar', intro: 'Tekrarlayan işleri yapay zekâ ve iş akışlarıyla otomatikleştirin.', deliverables: ['Süreç analizi', 'n8n/entegrasyonlar', 'Takip ve raporlama'], outcomes: ['Zaman tasarrufu', 'Daha düşük maliyet', 'Tutarlı kalite'], examples: ['Lead yönlendirme', 'Belge işleme'] },
    { id: 'ads', title: 'Meta & Google Reklamları', tag: 'Edinim • Yeniden Hedefleme', intro: 'Performans odaklı kampanyalar net ölçümleme ile.', deliverables: ['Kampanya kurulumu', 'Kreatif varyantlar', 'Olay akışı'], outcomes: ['Kaliteli trafik', 'Ölçülebilir büyüme'], examples: ['Arama', 'Görüntülü', 'Sosyal'] },
    { id: 'seo', title: 'SEO Hizmetleri', tag: 'Teknik • İçerik • On‑page', intro: 'Arama görünürlüğü için teknik temel ve kaliteli içerik.', deliverables: ['Teknik audit', 'Bilgi mimarisi', 'İçerik planı'], outcomes: ['Artan organik trafik', 'Daha iyi sıralama'], examples: ['Schema', 'İç bağlantı'] },
    { id: 'middleware', title: 'CRM/CMS Entegrasyonları', tag: 'HubSpot • Salesforce • Sanity', intro: 'Sistemler arası sağlam veri akışı ve ara katman.', deliverables: ['API tasarımı', 'Kimlik doğrulama', 'Gözlemlenebilirlik'], outcomes: ['Temiz veri', 'Güvenilir servisler'], examples: ['Webhooklar', 'İç servisler'] },
    { id: 'analytics-cro', title: 'Analitik & CRO', tag: 'Ölçümleme • Deneyler', intro: 'Doğru ölçüm ve deneylerle dönüşüm optimizasyonu.', deliverables: ['Sunucu tarafı izleme', 'A/B testleri', 'Funnel analizi'], outcomes: ['Daha yüksek dönüşüm', 'İçgörü'], examples: ['Yeni varyantlar', 'Raporlar'] },
    { id: 'hosting-devops', title: 'Barındırma & DevOps', tag: 'Vercel • Cloudflare • AWS', intro: 'Hızlı, güvenilir ve geri alınabilir dağıtımlar.', deliverables: ['CI/CD & önizlemeler', 'Önbellek & optimizasyon', 'Uptime panoları'], outcomes: ['%99.9+ uptime', 'Düşük risk'], examples: ['Statik/SSR', 'Çok bölgeli dağıtım'] },
  ];
  const enItems = [
    { id: 'websites', title: 'Websites', tag: 'Design • Frontend • Backend', intro: 'Fast, reliable and clear websites. End‑to‑end from design to production.', deliverables: ['Design system & components', 'CMS integration', 'Performance & accessibility'], outcomes: ['Fast pages', 'Premium feel', 'SEO foundations'], examples: ['Corporate site', 'Product marketing', 'Docs portal'] },
    { id: 'applications', title: 'Applications', tag: 'Web App • Mobile • Admin', intro: 'Custom admin panels and user applications for your workflows.', deliverables: ['Flows & authorization', 'Component library', 'API integrations'], outcomes: ['Efficient teams', 'Fewer errors', 'Scalable architecture'], examples: ['Admin panel', 'Customer portal'] },
    { id: 'ai-automation', title: 'AI Automation', tag: 'Workflows • Agents', intro: 'Automate repetitive tasks with AI agents and workflow tooling.', deliverables: ['Process analysis', 'n8n/integrations', 'Monitoring & reporting'], outcomes: ['Time savings', 'Lower costs', 'Consistent quality'], examples: ['Lead routing', 'Document processing'] },
    { id: 'ads', title: 'Meta & Google Ads', tag: 'Acquisition • Retargeting', intro: 'Performance campaigns with trustworthy measurement.', deliverables: ['Campaign setup', 'Creative variants', 'Event pipeline'], outcomes: ['Quality traffic', 'Measurable growth'], examples: ['Search', 'Display', 'Social'] },
    { id: 'seo', title: 'SEO Services', tag: 'Technical • Content • On‑page', intro: 'Technical foundations and quality content for search visibility.', deliverables: ['Technical audit', 'Information architecture', 'Content plan'], outcomes: ['More organic traffic', 'Better rankings'], examples: ['Schema', 'Internal linking'] },
    { id: 'middleware', title: 'CRM/CMS Integrations', tag: 'HubSpot • Salesforce • Sanity', intro: 'Robust data flows and middleware between systems.', deliverables: ['API design', 'Authentication', 'Observability'], outcomes: ['Clean data', 'Reliable services'], examples: ['Webhooks', 'Internal services'] },
    { id: 'analytics-cro', title: 'Analytics & CRO', tag: 'Measurement • Experiments', intro: 'Conversion optimization with accurate measurement and A/B testing.', deliverables: ['Server‑side tracking', 'A/B tests', 'Funnel analysis'], outcomes: ['Higher conversion', 'Insights'], examples: ['New variants', 'Reports'] },
    { id: 'hosting-devops', title: 'Hosting & DevOps', tag: 'Vercel • Cloudflare • AWS', intro: 'Fast, reliable and reversible deployments.', deliverables: ['CI/CD & previews', 'Caching & optimization', 'Uptime dashboards'], outcomes: ['99.9%+ uptime', 'Lower risk'], examples: ['Static/SSR', 'Multi‑region deploy'] },
  ];
  const items = (lang === 'en') ? enItems : trItems;

  const title = services?.title ?? 'Hizmetlerimiz';
  const heroDesc = services?.heroDesc ?? 'Web siteleri, uygulamalar, AI otomasyonu, reklam, SEO ve entegrasyonlar—fikrinizden büyümeye tek ekip.';
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
        {/* Sticky, horizontally scrollable TOC for mobile */}
        <div className="sticky top-20 z-30 -mx-6 md:mx-0 px-6 py-2 bg-vkbg/70 backdrop-blur border-y border-white/5">
          {(() => {
            const tocIds = ['websites','applications','ai-automation','ads','seo','analytics-cro','middleware','hosting-devops'];
            const toc = tocIds.map(id => items.find((x:any)=>x.id===id)).filter(Boolean) as any[];
            return (
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-6" style={{background:'linear-gradient(90deg, var(--vk-bg), transparent)'}} />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-6" style={{background:'linear-gradient(270deg, var(--vk-bg), transparent)'}} />
                <nav className="flex gap-2 overflow-x-auto hide-scrollbar snap-x" aria-label="Services table of contents">
                  {toc.map((s:any) => (
                    <a key={s.id} href={`#${s.id}`} className="snap-start px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 whitespace-nowrap">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            );
          })()}
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

      {/* Sections (grouped with subtle tone transitions) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        {(() => {
          const GROUPS: { key: string; title: string; ids: string[] }[] = [
            { key: 'design', title: 'Tasarım & Geliştirme', ids: ['websites', 'applications'] },
            { key: 'ai', title: 'Yapay Zekâ & Otomasyon', ids: ['ai-automation'] },
            { key: 'marketing', title: 'Pazarlama & Büyüme', ids: ['ads', 'seo', 'analytics-cro'] },
            { key: 'systems', title: 'Sistemler & Entegrasyonlar', ids: ['middleware', 'hosting-devops'] },
          ];
          const grouped = GROUPS.map(g => ({...g, items: items.filter((s:any)=>g.ids.includes(s.id))})).filter(g=>g.items.length>0);
          return (
            <div className="grid gap-10">
              {grouped.map((g, gi) => (
                <div key={g.key}>
                  <div className="mb-3">
                    <h2 className="font-heading text-2xl md:text-3xl text-white/95">{g.title}</h2>
                  </div>
                  <div className="rounded-2xl border border-white/10 vk-glass shadow-soft">
                    <div className="p-6 grid gap-8">
                      {g.items.map((s:any, idx:number) => (
                        <div key={s.id}>
                          <article id={s.id} className="scroll-mt-24">
                            <header className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <span aria-hidden className="mt-1">{icons[s.id]}</span>
                                <div>
                                  <h3 className="font-heading text-xl md:text-2xl">{s.title}</h3>
                                  <div className="text-xs text-white/60 mt-1">{s.tag}</div>
                                </div>
                              </div>
                              <a href="#cta" className="hidden md:inline-flex items-center px-3 py-1.5 rounded-lg border border-white/15 text-white/90 bg-white/5 hover:bg-white/10">{start}</a>
                            </header>
                            <p className="text-white/80 mt-3">{s.intro}</p>
                            <div className="mt-4 grid gap-6 md:grid-cols-3">
                              <div>
                                <h4 className="font-heading text-base text-white/90">{deliverables}</h4>
                                <ul className="list-disc pl-5 text-white/80 mt-2">
                                  {s.deliverables.map((d: any, i: number) => <li key={i}>{d}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-heading text-base text-white/90">{outcomes}</h4>
                                <ul className="list-disc pl-5 text-white/80 mt-2">
                                  {s.outcomes.map((d: any, i: number) => <li key={i}>{d}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-heading text-base text-white/90">{examples}</h4>
                                <ul className="list-disc pl-5 text-white/80 mt-2">
                                  {s.examples?.map((d: any, i: number) => <li key={i}>{d}</li>)}
                                </ul>
                              </div>
                            </div>
                          </article>
                          {idx < g.items.length - 1 && (
                            <div className="my-6 h-px bg-gradient-to-r from-white/0 via-white/15 to-white/0" aria-hidden="true" />
                          )}
                        </div>
                      ))}
                    </div>
                    {/* group tone separator */}
                    <div className="h-8 bg-gradient-to-b from-white/5 to-transparent rounded-b-2xl" aria-hidden="true" />
                  </div>
                  {gi < grouped.length - 1 && (
                    <div className="mt-4 h-2 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          );
        })()}

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
