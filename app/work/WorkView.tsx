import Link from 'next/link';

type Locale = 'en' | 'tr' | 'ro';
type WorkItem = {
  slug: string;
  client: string;
  industry: string;
  service: string;
  year: string;
  outcome: string;
  image: string;
};

export default function WorkView({ messages, locale }: { messages: any; locale: Locale }) {
  const w = messages.work;
  const items: WorkItem[] = w.items;
  const labels = w.labels;

  return (
    <div>
      <section className="vk-section" style={{paddingTop: '4rem'}}>
        <div className="vk-container">
          <span className="vk-eyebrow">{w.hero.eyebrow}</span>
          <h1 className="vk-h1 mt-5" style={{maxWidth: '22ch'}}>{w.hero.heading}</h1>
          <p className="vk-lead vk-muted mt-5" style={{maxWidth: '52ch'}}>{w.hero.sub}</p>
        </div>
      </section>

      <hr className="vk-rule" />

      <section className="vk-section">
        <div className="vk-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, idx) => {
              const isReal = it.image.endsWith('.webp');
              const eager = idx < 6;
              return (
                <Link
                  key={it.slug}
                  href={`/${locale}/work/${it.slug}`}
                  className="group block"
                  style={{textDecoration: 'none'}}
                >
                  <div
                    className="aspect-[16/10] overflow-hidden rounded-lg relative"
                    style={{
                      background: isReal ? 'var(--vk-surface)' : 'linear-gradient(135deg, #1B1B22 0%, #131318 100%)',
                      border: '1px solid var(--vk-border)'
                    }}
                  >
                    {isReal ? (
                      <img
                        src={it.image}
                        alt={`${it.client} — ${it.service}`}
                        loading={eager ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={eager ? 'high' : 'auto'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="font-mono text-xs uppercase tracking-widest" style={{color: 'var(--vk-text-muted)'}}>
                          {it.year} · {it.industry}
                        </div>
                        <div>
                          <div className="font-heading text-xl" style={{lineHeight: 1.1, letterSpacing: '-0.02em'}}>
                            {it.client}
                          </div>
                          <div className="text-sm vk-muted mt-1">{it.service}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <div className="font-medium">{it.client}</div>
                    <div className="font-mono text-xs uppercase tracking-widest" style={{color: 'var(--vk-text-dim)'}}>{it.year}</div>
                  </div>
                  <div className="text-sm vk-muted mt-1">{it.service} · {it.industry}</div>
                  <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{color: 'var(--vk-success)'}}>{it.outcome}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
