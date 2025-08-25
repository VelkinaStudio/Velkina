import React from 'react';
import UseCasesClient from './parts/UseCasesClient';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';

export type UseCasesViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function UseCasesView({messages}: UseCasesViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const uc = t('useCases') as any;
  const ctas = t('home', 'ctas') as any;

  const catLabel = {
    Web: uc?.categories?.Web ?? 'Web',
    AI: uc?.categories?.AI ?? 'Yapay Zekâ',
    Data: uc?.categories?.Data ?? 'Veri',
    Growth: uc?.categories?.Growth ?? 'Büyüme',
    Integrations: uc?.categories?.Integrations ?? 'Entegrasyonlar'
  } as const;

  // Prefer real projects from i18n; fall back to generic use cases
  const projectItems = Array.isArray((uc as any)?.projects?.items) ? (uc as any).projects.items : null;
  const items = [
    {cat:'Web', title:'Pazarlama Sitesi + CMS', desc:'Hızlı açılan, SEO dostu site + blog; kolay içerik yönetimi.'},
    {cat:'Web', title:'Fiyatlandırma + Hesaplayıcı', desc:'Planları netleştirir, soruları azaltır; satış döngüsünü kısaltır.'},
    {cat:'Web', title:'Doküman Portalı + SDK', desc:'Geliştirici dostu içerikle ekipleri daha hızlı “Hello World”e ulaştırır.'},
    {cat:'Web', title:'Dönüşüm Landing + A/B', desc:'Haftalık varyantlarla metin ve mikro hareketle CVR artışı.'},
    {cat:'AI', title:'Destek Asistanı + CRM', desc:'Bilet hacmini düşürür, içgörüleri otomatik CRM’e işler.'},
    {cat:'AI', title:'Lead Skorlama Botu', desc:'Zenginleştirme ve olaylarla PQL’leri doğru sıraya koyar.'},
    {cat:'Data', title:'Operasyon Panosu', desc:'Öncü göstergeleri izler; doğru anda otomasyon tetikler.'},
    {cat:'Data', title:'Sunucu Tarafı Analitik', desc:'Atfı düzeltir; kanallar arasında gerçeği ölçer.'},
    {cat:'Growth', title:'Atıf & Harcama', desc:'Gözlenen + modellenmiş ROI ile bütçeyi akıllıca kaydırır.'},
    {cat:'Growth', title:'Mağaza CRO', desc:'PDP, sepet ve ödemede sürekli iterasyonla bileşik artış.'},
    {cat:'Integrations', title:'Middleware Merkezi', desc:'Entegrasyonlar, webhooks ve rate limit için tek, güvenilir ağ geçidi.'},
    {cat:'Integrations', title:'CRM ⇄ CMS Senkron', desc:'İçerik ve lead taksonomilerini veri kaybı olmadan hizalar.'},
  ];

  return (
    <div className="pt-4">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <h1 className="font-heading text-4xl md:text-5xl">{(uc as any)?.projects?.title ?? (uc?.title ?? 'Kullanım Alanları')}</h1>
        <p className="text-white/80 max-w-2xl mt-3">{uc?.subtitle ?? 'Hızlı, gözlemlenebilir ve ölçeklenebilir şekilde teslim ettiğimiz sistemlerden bir seçki. Dönüşüm, netlik ve güveni artırmak için tasarlandı.'}</p>
        <div className="mt-6 flex flex-wrap gap-2" id="uc-filters" role="radiogroup" aria-label="Kullanım alanı filtreleri">
          {['All','Web','AI','Data','Growth','Integrations'].map((f,i)=> (
            <button key={f} className={`px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 ${i===0 ? 'vk-outline' : ''}`} data-filter={f} role="radio" aria-checked={i===0?'true':'false'} tabIndex={i===0?0:-1}>
              {f==='All' ? (uc?.filters?.all ?? 'Tümü') : (catLabel as any)[f]}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div id="uc-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(projectItems ?? items).map((it:any,i:number)=> {
            const allowed = ['Web','AI','Data','Growth','Integrations'] as const;
            const tags = String(it.cat||'').split('|').map((s:string)=>s.trim()).filter(Boolean);
            const primary = (tags.find((t:string)=> (allowed as readonly string[]).includes(t)) || tags[0] || 'Web') as string;
            return (
              <article key={i} className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft" data-cat={primary}>
                <h3 className="font-heading text-xl">{it.title}</h3>
                {it.url && (
                  <a href={it.url} target="_blank" rel="noopener noreferrer" className="text-xs text-vkcyan/80 hover:text-vkcyan/100 underline underline-offset-2 break-all">{it.url}</a>
                )}
                {it.desc && (
                  <p className="text-white/80 mt-2">{it.desc}</p>
                )}
                {Array.isArray(it.highlights) && it.highlights.length>0 && (
                  <ul className="mt-3 list-disc list-inside text-white/75 text-sm space-y-1">
                    {it.highlights.slice(0,4).map((h:string, idx:number)=> (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
                {it.tourSrc && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-vkcyan/90 hover:text-vkcyan/100">
                      {uc?.virtualTour ?? 'Virtual Tour'}
                    </summary>
                    <div className="mt-2 rounded-lg overflow-hidden border border-white/10 bg-black/20">
                      <div className="w-full h-64 md:h-72">
                        <iframe
                          src={it.tourSrc}
                          title={`${it.title} – ${uc?.virtualTour ?? 'Virtual Tour'}`}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full border-0"
                        />
                      </div>
                    </div>
                  </details>
                )}
                <div className="text-xs text-white/60 mt-3">{(catLabel as any)[primary] || primary}</div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl border border-white/10 vk-glass shadow-soft p-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl mb-2">{uc?.quickContact ?? 'Hızlı İletişim'}</h2>
          <p className="text-white/80 mb-4">{uc?.quickContactDesc ?? 'Bir iş günü içinde yanıtlarız. Baskı yok; sadece netlik.'}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a data-cta="whatsapp" className="inline-flex items-center px-5 py-2.5 rounded-xl bg-vkpink text-black shadow-strong font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l-4.155-4.155"/></svg>
              {ctas?.whatsapp ?? 'WhatsApp’tan yazın'}
            </a>
            <a data-cta="email" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-vkcyan/50 text-vkcyan/90 bg-white/5 hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
              {ctas?.email ?? 'E‑posta gönderin'}
            </a>
            <a data-cta="schedule" className="inline-flex items-center px-5 py-2.5 rounded-xl border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008Z"/></svg>
              {ctas?.schedule ?? 'Görüşme planlayın'}
            </a>
          </div>
        </div>
      </section>

      <UseCasesClient />
    </div>
  );
}
