import UseCasesClient from './parts/UseCasesClient';

export const metadata = {
  title: 'Velkina — Kullanım Alanları',
  description: 'Hızla hayata geçen senaryolar: siteler, sistemler, otomasyonlar ve ölçülebilir büyüme.',
};

export default function UseCasesPage({messages, locale} = {}){
  const t = messages?.useCases;
  const catLabel = {
    Web: t?.categories?.Web ?? 'Web',
    AI: t?.categories?.AI ?? 'Yapay Zekâ',
    Data: t?.categories?.Data ?? 'Veri',
    Growth: t?.categories?.Growth ?? 'Büyüme',
    Integrations: t?.categories?.Integrations ?? 'Entegrasyonlar'
  };
  const items = [
    {cat:'Web', title:'Pazarlama Sitesi + CMS', desc:'Hızlı derlenen, yüksek performanslı site, blog ve CMS.'},
    {cat:'Web', title:'Fiyatlandırma + Hesaplayıcı', desc:'Planları netleştirip satış döngüsünü kısaltan netlik.'},
    {cat:'Web', title:'Doküman Portalı + SDK', desc:'Takımları daha hızlı “Hello World”e ulaştıran dev‑öncelikli dokümanlar.'},
    {cat:'Web', title:'Dönüşüm Landing + A/B', desc:'Haftalık varyantlar; hareket ve metinle CVR artışı.'},
    {cat:'AI', title:'Destek Asistanı + CRM', desc:'Biletleri azaltır, içgörüleri otomatik CRM’e senkronlar.'},
    {cat:'AI', title:'Lead Skorlama Botu', desc:'Zenginleştirme, olaylar ve skorlamayla PQL önceliklendirme.'},
    {cat:'Data', title:'Operasyon Panosu', desc:'Öncü göstergeleri izleyin, otomasyonları tetikleyin.'},
    {cat:'Data', title:'Sunucu Tarafı Analitik', desc:'Atıf kaymasını düzeltin; kanallar arasında gerçeği ölçün.'},
    {cat:'Growth', title:'Atıf & Harcama', desc:'Gözlenen ve modellenmiş ROI ile bütçeyi akıllıca kaydırın.'},
    {cat:'Growth', title:'Mağaza CRO', desc:'PDP, sepet ve ödeme akışında bileşik artış için iterasyon.'},
    {cat:'Integrations', title:'Middleware Merkezi', desc:'Entegrasyonlar, webhooks ve rate limit için tek ağ geçidi.'},
    {cat:'Integrations', title:'CRM ⇄ CMS Senkron', desc:'İçerik ve lead taksonomilerini veri kaybı olmadan hizalayın.'},
  ];
  return (
    <div className="pt-4">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <h1 className="font-heading text-4xl md:text-5xl">{t?.title ?? 'Kullanım Alanları'}</h1>
        <p className="text-white/80 max-w-2xl mt-3">{t?.subtitle ?? 'Hızlı, gözlemlenebilir ve ölçeklenebilir şekilde teslim ettiğimiz sistemlerden bir seçki. Dönüşüm, netlik ve güveni artırmak için tasarlandı.'}</p>
        <div className="mt-6 flex flex-wrap gap-2" id="uc-filters" role="radiogroup" aria-label="Kullanım alanı filtreleri">
          {['All','Web','AI','Data','Growth','Integrations'].map((f,i)=> (
            <button key={f} className={`px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 ${i===0 ? 'vk-outline' : ''}`} data-filter={f} role="radio" aria-checked={i===0?'true':'false'} tabIndex={i===0?0:-1}>
              {f==='All' ? (t?.filters?.all ?? 'Tümü') : catLabel[f]}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div id="uc-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it,i)=> (
            <article key={i} className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft" data-cat={it.cat}>
              <h3 className="font-heading text-xl">{it.title}</h3>
              <p className="text-white/80 mt-2">{it.desc}</p>
              <div className="text-xs text-white/60 mt-3">{catLabel[it.cat]}</div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-white/10 vk-glass shadow-soft p-6 text-center">
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

      <UseCasesClient />
    </div>
  );
}
