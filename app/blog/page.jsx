import BlogClient from './parts/BlogClient';

export const metadata = {
  title: 'Velkina — Blog',
  description: 'Velkina’dan içgörüler, pratik rehberler ve mühendislik notları.',
};

export default function BlogPage({messages, locale} = {}){
  const t = messages?.blog;
  return (
    <div className="pt-4">
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 relative">
          <div className="absolute -inset-24 blur-3xl opacity-60 pointer-events-none" style={{background: 'radial-gradient(600px 300px at 20% 10%, rgba(162,89,255,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(0,255,255,.25), transparent 60%)'}}></div>
          <h1 className="relative z-10 font-heading text-4xl md:text-5xl">{t?.title ?? 'İçgörüler & Sinyaller'}</h1>
          <p className="relative z-10 text-white/80 max-w-2xl mt-3">{t?.subtitle ?? 'Mühendislik, büyüme ve dijital sistemler üzerine Velkina’dan notlar.'}</p>
          <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-[1fr_auto] items-start">
            <input id="q" placeholder={t?.searchPlaceholder ?? 'Makalelerde ara…'} className="vk-glass border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-vkcyan/40" />
            <div id="filters" className="flex flex-wrap gap-2" role="radiogroup" aria-label="Blog category filters">
              <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10" data-filter="All" role="radio" aria-checked="true" tabIndex={0}>{t?.filters?.all ?? 'Tümü'}</button>
              <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10" data-filter="Engineering" role="radio" aria-checked="false" tabIndex={-1}>{t?.filters?.engineering ?? 'Mühendislik'}</button>
              <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10" data-filter="Marketing" role="radio" aria-checked="false" tabIndex={-1}>{t?.filters?.marketing ?? 'Pazarlama'}</button>
              <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10" data-filter="Product" role="radio" aria-checked="false" tabIndex={-1}>{t?.filters?.product ?? 'Ürün'}</button>
              <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10" data-filter="Data" role="radio" aria-checked="false" tabIndex={-1}>{t?.filters?.data ?? 'Veri'}</button>
            </div>
            <p id="filter-status" className="sr-only" role="status" aria-live="polite"></p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div id="posts" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {cat:'Engineering', title:'Birleşik orta katman API’leri inşa etmek', desc:'Ölçeklenen, gözlemlenebilir ve dayanıklı API merkezleri için kalıplar.', read:'6 dk'},
            {cat:'Marketing', title:'Harcamayı gerçekten yönlendiren atıf', desc:'Kanal ROI’si ve bütçe kaydırmaları için pragmatik yaklaşım.', read:'5 dk'},
            {cat:'Product', title:'Landing’den aktivasyona günler içinde', desc:'Yüksek kaldıraçlı animasyonlarla ince dilimler göndermek.', read:'7 dk'},
            {cat:'Data', title:'Gerçekten işe yarayan operasyon panoları', desc:'Eyleme dönük ekipler için öncü ve artçı göstergeler.', read:'4 dk'},
            {cat:'Engineering', title:'Servisler arası tipli veri hatları', desc:'Sözleşmeler ve codegen ile daha güvenli değişimler.', read:'6 dk'},
            {cat:'Product', title:'Kendini pazarlayan içerik sistemleri', desc:'Her yayında bileşik artan tasarım ve yapı.', read:'5 dk'},
            {cat:'Engineering', title:'Next.js 14 edge kalıpları', desc:'SSR/ISR/statik; önbellek, yeniden doğrulama ve DX.', read:'6 dk'},
            {cat:'Engineering', title:'Üretimde tasarım token’ları', desc:'Web, dokümantasyon ve pazarlamada tek doğruluk kaynağı.', read:'5 dk'},
            {cat:'Marketing', title:'Hareket ile yaratıcı test', desc:'Ağırlık eklemeden CVR’ı yükselten mikro etkileşimler.', read:'5 dk'},
            {cat:'Marketing', title:'Dönüştüren fiyatlandırma sayfaları', desc:'Açıklık, sürtünme kontrolü ve pişmanlığı azaltan hesaplayıcılar.', read:'6 dk'},
            {cat:'Data', title:'Güvenilir sunucu tarafı izleme', desc:'Onay, atıf ve olay yönlendirmesinde sağduyulu yapı.', read:'5 dk'},
            {cat:'Product', title:'Hızlı onboarding sağlayan dokümanlar', desc:'Daha az destek için yapı, örnekler ve net metin.', read:'6 dk'},
          ].map((p,i)=> (
            <article key={i} className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft" data-cat={p.cat} data-title={p.title}>
              <h3 className="font-heading text-xl">{p.title}</h3>
              <p className="text-white/80 mt-2">{p.desc}</p>
              <div className="text-xs text-white/60 mt-3">{p.cat} • {p.read}</div>
            </article>
          ))}
        </div>

        {/* Quick connect CTA */}
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

      <BlogClient />
    </div>
  );
}
