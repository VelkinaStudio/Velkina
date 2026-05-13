import Link from 'next/link';
import { notFound } from 'next/navigation';
import { whatsappHref } from '../../lib/contact';

type Locale = 'en' | 'tr' | 'ro';

export default function WorkDetailView({
  messages,
  locale,
  slug
}: {
  messages: any;
  locale: Locale;
  slug: string;
}) {
  const studies = messages.useCase?.studies || {};
  const study = studies[slug];
  if (!study) notFound();

  const labels = messages.useCase.labels;
  const common = messages.common;
  const all: string[] = (messages.work?.items || []).map((i: any) => i.slug);
  const idx = all.indexOf(slug);
  const nextSlug = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : all[0];

  return (
    <div>
      <section style={{paddingTop: '2rem', paddingBottom: '1rem'}}>
        <div className="vk-container">
          <Link href={`/${locale}/work`} className="vk-nav-link font-mono text-xs uppercase tracking-widest">
            {labels.back}
          </Link>
        </div>
      </section>

      <section className="vk-section" style={{paddingTop: '1rem'}}>
        <div className="vk-container">
          <div className="flex flex-wrap gap-2">
            <span className="vk-chip">{study.industry}</span>
            <span className="vk-chip">{study.service}</span>
            <span className="vk-chip">{study.year}</span>
          </div>
          <h1 className="vk-h1 mt-5" style={{maxWidth: '24ch'}}>{study.title}</h1>
          <p className="vk-lead vk-muted mt-4">{study.client}</p>

          {study.image && study.image.endsWith('.webp') && (
            <div className="mt-10 rounded-lg overflow-hidden" style={{background: 'var(--vk-surface)', border: '1px solid var(--vk-border)'}}>
              <img src={study.image} alt={study.client} className="w-full h-auto" />
            </div>
          )}
        </div>
      </section>

      <hr className="vk-rule" />

      <section className="vk-section">
        <div className="vk-container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="vk-eyebrow">{labels.problem}</h2>
                <p className="mt-3" style={{lineHeight: 1.7}}>{study.problem}</p>
              </div>
              <div>
                <h2 className="vk-eyebrow">{labels.approach}</h2>
                <p className="mt-3" style={{lineHeight: 1.7}}>{study.approach}</p>
              </div>
              <div>
                <h2 className="vk-eyebrow">{labels.outcome}</h2>
                <p className="mt-3 vk-lead">{study.outcome}</p>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="vk-card sticky" style={{top: '5rem'}}>
                {study.liveUrl && (
                  <>
                    <a
                      href={study.liveUrl}
                      target={/^https?:/.test(study.liveUrl) ? '_blank' : undefined}
                      rel={/^https?:/.test(study.liveUrl) ? 'noopener noreferrer' : undefined}
                      className="vk-btn vk-btn-primary w-full"
                      style={{marginBottom: '1rem'}}
                    >
                      {messages.work?.labels?.viewLive || 'Visit live →'}
                    </a>
                  </>
                )}
                <div>
                  <div className="vk-label">{labels.stack}</div>
                  <div className="mt-2 font-mono text-sm" style={{color: 'var(--vk-text)'}}>{study.stack}</div>
                </div>
                <hr className="vk-rule my-5" />
                <div>
                  <div className="vk-label">{labels.timeline}</div>
                  <div className="mt-2">{study.timeline}</div>
                </div>
                <hr className="vk-rule my-5" />
                <a
                  href={whatsappHref(common.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vk-btn vk-btn-secondary w-full"
                >
                  {messages.home.cta.whatsapp}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <hr className="vk-rule" />

      <section className="vk-section">
        <div className="vk-container">
          <Link href={`/${locale}/work/${nextSlug}`} className="vk-nav-link font-mono text-xs uppercase tracking-widest">
            {labels.next}
          </Link>
        </div>
      </section>
    </div>
  );
}
