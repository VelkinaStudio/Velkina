import en from '../../../../messages/en.json';
import tr from '../../../../messages/tr.json';
import ro from '../../../../messages/ro.json';

const DICTS = { en, tr, ro };

function slugify(s = ''){
  return s
    .toLowerCase()
    .replace(/[^a-z0-9çğıöşü\s-]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function generateMetadata({ params }){
  const { locale = 'en', slug = '' } = params || {};
  const messages = DICTS[locale] || en;
  const posts = Array.isArray(messages?.blog?.samplePosts) ? messages.blog.samplePosts : [];
  const match = posts.find(p => slugify(p.title) === slug);
  const title = match?.title || (locale==='en' ? 'Blog' : 'Blog');
  const desc = match?.desc || (messages.blog?.metaDesc || 'Velkina’dan içgörüler, pratik rehberler ve mühendislik notları.');
  return { title: `${title} — Blog`, description: desc };
}

export default function BlogPostPage({ params }){
  const { locale = 'en', slug = '' } = params || {};
  const messages = DICTS[locale] || en;
  const posts = Array.isArray(messages?.blog?.samplePosts) ? messages.blog.samplePosts : [];
  const match = posts.find(p => slugify(p.title) === slug);

  const LABELS = {
    en: { untitled: 'Untitled', soon: 'Article coming soon.', general: 'General', read: '5 min', more: 'More from the blog',
          sections: [
            {h: 'Overview', p: '__DESC__'},
            {h: 'What we built', p: 'We focus on clean architecture, performance and measurable impact across web, apps and AI.'},
            {h: 'Outcomes', p: 'Clear improvements on speed, reliability and conversion with a senior engineering + design team.'}
          ] },
    tr: { untitled: 'Başlıksız', soon: 'Makale yakında.', general: 'Genel', read: '5 dk', more: 'Blogdan daha fazlası',
          sections: [
            {h: 'Genel Bakış', p: '__DESC__'},
            {h: 'Ne inşa ettik', p: 'Web, uygulamalar ve yapay zekâda temiz mimari, performans ve ölçülebilir etkiye odaklanıyoruz.'},
            {h: 'Sonuçlar', p: 'Kıdemli mühendislik + tasarım ekibiyle hız, güvenilirlik ve dönüşümde net iyileşmeler.'}
          ] },
    ro: { untitled: 'Fără titlu', soon: 'Articol în curând.', general: 'General', read: '5 min', more: 'Mai mult de pe blog',
          sections: [
            {h: 'Prezentare generală', p: '__DESC__'},
            {h: 'Ce am construit', p: 'Ne concentrăm pe arhitectură curată, performanță și impact măsurabil în web, aplicații și AI.'},
            {h: 'Rezultate', p: 'Îmbunătățiri clare în viteză, fiabilitate și conversie cu o echipă senior de inginerie și design.'}
          ] }
  };
  const L = LABELS[locale] || LABELS.en;

  const title = match?.title || L.untitled;
  const desc = match?.desc || L.soon;
  const cat = match?.cat || L.general;
  const read = match?.read || L.read;

  const sections = L.sections.map(s => ({ ...s, p: s.p.replace('__DESC__', desc) }));

  return (
    <div className="pt-4">
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 relative">
          <div className="absolute -inset-24 blur-3xl opacity-50 pointer-events-none" style={{
            background:'radial-gradient(600px 300px at 20% 10%, rgba(162,89,255,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(0,255,255,.25), transparent 60%)'
          }} />
          <h1 className="relative z-10 font-heading text-4xl md:text-5xl">{title}</h1>
          <div className="relative z-10 text-white/70 mt-2 text-sm">{cat} • {read}</div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 md:px-10 pb-16 prose prose-invert prose-headings:font-heading prose-p:leading-relaxed">
        {sections.map((s, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-heading text-white/95">{s.h}</h2>
            <p className="text-white/80 mt-2">{s.p}</p>
          </section>
        ))}
      </article>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <h3 className="font-heading text-2xl md:text-3xl mb-4">{L.more}</h3>
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 pr-8 snap-x snap-mandatory">
            {posts.filter(p=>slugify(p.title)!==slug).slice(0,6).map((p, i)=>{
              const s = slugify(p.title);
              return (
                <a key={i} href={`/${locale}/blog/${s}`} className="min-w-[260px] max-w-[320px] snap-start vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition block focus:outline-none focus:ring-2 focus:ring-vkcyan/50">
                  <div className="text-xs text-white/60 mb-1">{p.cat}</div>
                  <div className="font-heading text-lg text-white/90">{p.title}</div>
                  <div className="text-white/70 text-sm mt-2">{p.desc}</div>
                  <div className="mt-3 text-xs text-white/60">{p.read}</div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
