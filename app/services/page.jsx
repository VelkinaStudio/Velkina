import HeroShapesClient from '../../components/HeroShapesClient';
export const metadata = {
  title: 'Velkina — Hizmetler',
  description: 'Web, barındırma, IT, ara katman, büyüme, prodüksiyon ve dijital turlar boyunca uçtan uca hizmetler.',
};

export default function ServicesPage({messages, locale} = {}){
  const t = messages?.services;
  const icons = {
    web: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582"/></svg>
    ),
    hosting: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-vkcyan/90" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5H6A2.25 2.25 0 0 1 3.75 8.25V6ZM3.75 15A2.25 2.25 0 0 1 6 12.75h12A2.25 2.25 0 0 1 20.25 15v2.25A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V15Z"/></svg>
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
  const items = [
    { id:'web', title:'Web Development', tag:'Design • Frontend • Backend',
      intro:'High‑performance websites and apps built on Next.js 14, TypeScript, and a robust design system.',
      deliverables:[
        'UX flows, wireframes, and design system tokens',
        'Component library and page templates',
        'CMS or content pipeline integration',
        'Performance, accessibility, and SEO foundations'
      ],
      outcomes:[
        'Fast loads, premium feel, and measurable impact',
        'Shorter iteration cycles with reusable components'
      ],
      examples:[
        'Marketing site + pricing calculator in 4–6 weeks',
        'Docs portal with SDK playground and search'
      ]
    },
    { id:'hosting', title:'Edge Hosting & DevOps', tag:'Vercel • Cloudflare • AWS',
      intro:'Deployments that are fast, dependable, and observable—so shipping is calm and reversible.',
      deliverables:[
        'CI/CD with preview environments',
        'Edge caching, image optimization, and SSR tuning',
        'Monitoring, logging, and alerting',
        'Privacy‑safe analytics and server‑side tracking'
      ],
      outcomes:[
        'Confident releases and rollbacks in seconds',
        'Lower hosting cost with higher perceived speed'
      ],
      examples:[
        'Multi‑region deploy with cache strategy in a week',
        'Error budgets + SLO dashboards for marketing stack'
      ]
    },
    { id:'it', title:'IT Solutions & Integrations', tag:'Identity • Data • Workflows',
      intro:'Connect your stack with secure auth, file storage, data sync, and automated workflows.',
      deliverables:[
        'SSO, roles, and permissions',
        'Data pipelines and scheduled jobs',
        'Asset storage, CDN, and backups',
        'Admin consoles and internal tools'
      ],
      outcomes:[
        'Fewer manual steps, fewer errors',
        'A clearer picture of systems health'
      ],
      examples:[
        'User provisioning via SCIM + audit logs',
        'Data sync to warehouse with retries + DLQs'
      ]
    },
    { id:'middleware', title:'CRM–CMS Middleware', tag:'HubSpot • Salesforce • Sanity',
      intro:'A unified API layer between marketing sites, CRMs, and CMSs for clean data and faster ops.',
      deliverables:[
        'Typed middleware API with rate‑limit and retries',
        'Forms, leads, and webhooks normalization',
        'Content models and editorial workflows',
        'Attribution mapping and consent handling'
      ],
      outcomes:[
        'Reliable data you can actually act on',
        'Content velocity without breaking analytics'
      ],
      examples:[
        'HubSpot ⇄ Sanity sync for forms and content',
        'Lead dedupe + enrichment at the edge'
      ]
    },
    { id:'growth', title:'Ad Campaigns & Growth', tag:'Acquisition • CRO • Analytics',
      intro:'Campaigns that compound: strong creative, accurate measurement, and fast landing iterations.',
      deliverables:[
        'Creative concepts, copy, and motion assets',
        'Landing page variants and experiment plans',
        'Server‑side conversion tracking and dashboards',
        'Playbooks for scaling winners and cutting waste'
      ],
      outcomes:[
        'Spend guided by real attribution',
        'Higher CVR, AOV, and LTV with clarity'
      ],
      examples:[
        'Motion‑led ads + landing page variants',
        'CRO on PDP/cart/checkout with weekly releases'
      ]
    },
    { id:'production', title:'Production & Content', tag:'Video • Motion • Docs',
      intro:'Make the product feel inevitable with crisp visuals, motion, and docs that actually onboard.',
      deliverables:[
        'Brand reels, product explainers, and social edits',
        'Micro‑interactions and premium transitions',
        'Docs and knowledge bases with code samples',
        'Editorial calendars and distribution'
      ],
      outcomes:[
        'Clearer differentiation at a glance',
        'Self‑serve education that reduces sales load'
      ],
      examples:[
        'Product reel + doc refresh for v2 launch',
        'Motion library for consistent micro‑interactions'
      ]
    },
    { id:'tours', title:'Digital Tours', tag:'Real‑Estate • Retail • Spaces',
      intro:'Immersive tours that pre‑qualify interest and reduce questions—before a visit is booked.',
      deliverables:[
        '3D/360 capture and motion‑guided walkthroughs',
        'Booking integrations and lead capture',
        'Interactive hotspots and layered info',
        'Mobile‑first performance and accessibility'
      ],
      outcomes:[
        'Higher inquiry volume and quality',
        'Faster leasing and fewer no‑shows'
      ],
      examples:[
        'Leasing tour with CRM lead routing',
        'Retail floor guide with promos + analytics'
      ]
    },
  ];

  return (
    <div className="pt-4">
      {/* Hero */}
      <section className="vk-hero relative overflow-hidden">
        <div className="absolute -inset-24 blur-3xl opacity-60 pointer-events-none" style={{background: 'radial-gradient(600px 300px at 20% 10%, rgba(162,89,255,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(0,255,255,.25), transparent 60%)'}}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-14 grid gap-10 md:grid-cols-2 items-center">
          {/* Left column: title + copy */}
          <div>
            <h1 className="font-heading text-4xl md:text-5xl">{t?.title ?? 'Hizmetler'}</h1>
            <p className="text-white/80 max-w-2xl mt-3">{t?.heroDesc ?? 'Fikirden büyümeye—tek ekip, tek sistem. Nasıl tasarladığımızı, geliştirdiğimizi ve ölçeklediğimizi keşfedin.'}</p>
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
      {/* What we do: TOC + models (moved below hero) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-6 pb-6">
        <div className="relative z-10 mt-8 flex flex-wrap gap-2" role="navigation" aria-label="Services table of contents">
          {items.map(s=> (
            <a key={s.id} href={`#${s.id}`} className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80">{s.title}</a>
          ))}
        </div>
        <div className="relative z-10 mt-6 vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
          <h2 className="font-heading text-xl">{t?.modelsTitle ?? 'Çalışma Modelleri'}</h2>
          <ul className="mt-2 grid gap-2 md:grid-cols-3 text-white/80 list-disc pl-5">
            <li><strong className="text-white/90">Proje</strong>: Sabit kapsam, net çıktılar, hızlı teslim.</li>
            <li><strong className="text-white/90">Sprint</strong>: Deney ve iterasyonlar için 1–2 haftalık döngüler.</li>
            <li><strong className="text-white/90">Süreli Anlaşma</strong>: Süregelen yol haritası, optimizasyon ve destek.</li>
          </ul>
        </div>
      </section>
      {/* Included with every engagement */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-10">
        <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
          <h2 className="font-heading text-xl">{t?.includedTitle ?? 'Her Çalışmada Dahil'}</h2>
          <ul className="mt-2 grid gap-2 md:grid-cols-2 text-white/80 list-disc pl-5">
            <li>Net kapsam, kilometre taşları ve haftalık sprint değerlendirmeleri</li>
            <li>Tasarım sistemi token’ları ve belgelenmiş bileşenler</li>
            <li>Performans bütçesi, erişilebilirlik ve SEO temelleri</li>
            <li>Kuruluşunuzda kaynak kodu; CI/CD ve önizlemeler</li>
            <li>Gözlemlenebilirlik: loglar, metrikler ve çalışma süresi panoları</li>
            <li>Devir dokümanları, Loom videoları ve makul bir geri alma planı</li>
          </ul>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid gap-8">
          {items.map((s)=> (
            <article key={s.id} id={s.id} className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft scroll-mt-24">
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="mt-1">{icons[s.id]}</span>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl">{s.title}</h2>
                    <div className="text-xs text-white/60 mt-1">{s.tag}</div>
                  </div>
                </div>
                <a href="#cta" className="hidden md:inline-flex items-center px-3 py-1.5 rounded-lg border border-white/15 text-white/90 bg-white/5 hover:bg-white/10">{t?.start ?? 'Başlat'}</a>
              </header>
              <p className="text-white/80 mt-3">{s.intro}</p>
              <div className="mt-4 grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-heading text-lg">{t?.deliverables ?? 'Teslimatlar'}</h3>
                  <ul className="list-disc pl-5 text-white/80 mt-2">
                    {s.deliverables.map((d,i)=> <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg">{t?.outcomes ?? 'Sonuçlar'}</h3>
                  <ul className="list-disc pl-5 text-white/80 mt-2">
                    {s.outcomes.map((d,i)=> <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg">{t?.examples ?? 'Örnekler'}</h3>
                  <ul className="list-disc pl-5 text-white/80 mt-2">
                    {s.examples?.map((d,i)=> <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
 
        {/* FAQs */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-4">
          <div className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft">
            <h2 className="font-heading text-xl">{t?.faq ?? 'SSS'}</h2>
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
          </div>
        </section>

      {/* Quick connect CTA */}
      <div id="cta" className="mt-12 rounded-xl border border-white/10 vk-glass shadow-soft p-6 text-center">
        <h2 className="font-heading text-2xl md:text-3xl mb-2">{t?.quickContact ?? 'Hızlı İletişim'}</h2>
        <p className="text-white/80 mb-4">{t?.quickContactDesc ?? 'Bir iş günü içinde yanıtlarız. Baskı yok; sadece netlik.'}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a data-cta="whatsapp" className="inline-flex items-center px-5 py-2.5 rounded-xl bg-vkpink text-black shadow-strong font-mono">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l-4.155-4.155"/></svg>
            {messages?.home?.ctas?.whatsapp ?? 'WhatsApp’tan yazın'}
          </a>
          <a data-cta="email" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-vkcyan/50 text-vkcyan/90 bg-white/5 hover:bg-white/10 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
            {messages?.home?.ctas?.email ?? 'E‑posta gönderin'}
          </a>
          <a data-cta="schedule" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008Z"/></svg>
            {messages?.home?.ctas?.schedule ?? 'Görüşme planlayın'}
          </a>
        </div>
      </div>
    </section>
  </div>
);
}
