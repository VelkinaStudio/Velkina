import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Locale = 'en' | 'tr' | 'ro';

type Metric = { label: string; value: string };
type GalleryItem = { src: string; caption: string };

type Study = {
  title: string;
  client: string;
  industry: string;
  service: string;
  year: string;
  problem: string;
  approach: string;
  decisions?: string[];
  stack: string;
  timeline: string;
  outcome: string;
  metrics?: Metric[];
  gallery?: GalleryItem[];
  image?: string;
  liveUrl?: string;
};

/*
 * Velkina v8 — /work/[slug] deep case study.
 *
 * 5-act story structure:
 *   A. Cover (full-bleed)
 *   B. The complex problem (200-400 words)
 *   C. Engineering & design decisions (4-6 specific moves)
 *   D. Visual proof gallery (1-N screenshots)
 *   E. The plain outcome (single sentence) + metrics row
 *   F. Next case study tease
 *
 * For lighter projects (no `decisions` array, no `metrics`, just a
 * problem + approach + outcome), the view degrades gracefully to a
 * slim template: Cover → Problem/Approach → 1 image → Outcome → Next.
 */
export default function WorkDetailView({
  messages,
  locale,
  slug
}: {
  messages: any;
  locale: Locale;
  slug: string;
}) {
  const studies: Record<string, Study> = messages.useCase?.studies || {};
  const study = studies[slug];
  if (!study) notFound();

  const tagLabels = messages.work?.tagLabels || {};
  const slugTag = (messages.work?.slugTag || {}) as Record<string, string>;
  const tagKey = slugTag[slug] || 'web';
  const tag = tagLabels[tagKey] || '';

  // Compute next slug — wrap around at the end of the catalog.
  const allSlugs: string[] = (messages.work?.items || []).map((i: any) => i.slug);
  const idx = allSlugs.indexOf(slug);
  const nextSlug = idx >= 0 && idx < allSlugs.length - 1 ? allSlugs[idx + 1] : allSlugs[0];
  const nextStudy = studies[nextSlug];
  const nextItem = (messages.work?.items || []).find((i: any) => i.slug === nextSlug);

  const decisions = study.decisions || [];
  const metrics = study.metrics || [];
  const gallery = study.gallery && study.gallery.length > 0
    ? study.gallery
    : (study.image ? [{ src: study.image, caption: study.title }] : []);
  const isDeepStudy = decisions.length >= 4;

  return (
    <article className="v8-root v8-case">

      {/* SECTION A — Cover */}
      <section className="v8-case-cover" aria-labelledby="v8-case-title">
        <div className="v8-wrap">
          <div className="v8-case-cover-inner">
            <Link href={`/${locale}/work`} className="v8-case-back">
              ← {tagLabels.workIndexEyebrow ? 'ALL WORK' : 'ALL WORK'}
            </Link>

            <div className="v8-case-tags">
              {tag && <span className="v8-case-tag">{tag}</span>}
              <span className="v8-case-tag">{study.industry}</span>
              <span className="v8-case-tag">{study.year}</span>
              {isDeepStudy && (
                <span className="v8-case-tag" style={{ color: 'var(--v8-accent)', borderColor: 'var(--v8-accent)' }}>
                  {tagLabels.deep || 'DEEP CASE STUDY'}
                </span>
              )}
            </div>

            <h1 id="v8-case-title" className="v8-case-title">{study.title}</h1>
            <p className="v8-case-client">{study.client} · {study.service}</p>

            {study.image && (
              <div className="v8-case-cover-image">
                <img src={study.image} alt={`${study.client} — ${study.service}`} />
              </div>
            )}

            <div className="v8-case-side">
              <div className="v8-case-side-item">
                <span className="v8-case-side-label">{tagLabels.detailStack || 'STACK'}</span>
                <span className="v8-case-side-value">{study.stack}</span>
              </div>
              <div className="v8-case-side-item">
                <span className="v8-case-side-label">{tagLabels.detailTimeline || 'TIMELINE'}</span>
                <span className="v8-case-side-value">{study.timeline}</span>
              </div>
              {study.liveUrl && (
                <div className="v8-case-side-item">
                  <span className="v8-case-side-label">LIVE</span>
                  <a
                    href={study.liveUrl}
                    target={/^https?:/.test(study.liveUrl) ? '_blank' : undefined}
                    rel={/^https?:/.test(study.liveUrl) ? 'noopener noreferrer' : undefined}
                    className="v8-case-side-value"
                    style={{ color: 'var(--v8-accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                  >
                    {/^https?:/.test(study.liveUrl) ? study.liveUrl.replace(/^https?:\/\//, '') : 'View live →'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — The problem (eyebrow only, no narrating subheading) */}
      <section className="v8-case-section">
        <div className="v8-wrap">
          <div className="v8-case-section-eyebrow">{tagLabels.detailProblem || 'THE PROBLEM'}</div>
          <div className="v8-case-prose">
            <p>{study.problem}</p>
            <p>{study.approach}</p>
          </div>
        </div>
      </section>

      {/* SECTION C — Decisions (deep case studies only) */}
      {decisions.length > 0 && (
        <section className="v8-case-section">
          <div className="v8-wrap">
            <div className="v8-case-section-eyebrow">{tagLabels.detailDecisions || 'HOW IT WAS BUILT'}</div>
            <div className="v8-decisions">
              {decisions.map((d, i) => (
                <div key={i} className="v8-decision">
                  <span className="v8-decision-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="v8-decision-text">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION D — Product gallery */}
      {gallery.length > 0 && (
        <section className="v8-case-section">
          <div className="v8-wrap">
            <div className="v8-case-section-eyebrow">{tagLabels.detailGallery || 'PRODUCT'}</div>
            <div className="v8-gallery">
              {gallery.map((g, i) => (
                <figure key={i} className="v8-gallery-item" style={{ margin: 0 }}>
                  <img src={g.src} alt={g.caption} loading={i === 0 ? 'eager' : 'lazy'} />
                  {g.caption && <figcaption className="v8-gallery-caption">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION E — Outcome + metrics */}
      <section className="v8-case-section">
        <div className="v8-wrap">
          <div className="v8-case-section-eyebrow">{tagLabels.detailOutcome || 'OUTCOME'}</div>
          <p className="v8-outcome-line">
            <em>{study.outcome}</em>
          </p>
          {metrics.length > 0 && (
            <div className="v8-metrics">
              {metrics.map((m, i) => (
                <div key={i} className="v8-metric">
                  <span className="v8-metric-value">{m.value}</span>
                  <span className="v8-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION F — Next case tease */}
      {nextStudy && nextItem && (
        <section className="v8-case-next" aria-label="Next case study">
          <div className="v8-wrap">
            <Link href={`/${locale}/work/${nextSlug}`} className="v8-case-next-card">
              <div className="v8-case-next-image">
                <img src={nextItem.image} alt={nextStudy.client} loading="lazy" />
              </div>
              <div>
                <div className="v8-case-next-eyebrow">{tagLabels.detailNext || 'NEXT CASE STUDY'}</div>
                <h3 className="v8-case-next-title">{nextStudy.title}</h3>
                <span className="v8-case-next-client">{nextStudy.client} · {nextStudy.year}</span>
              </div>
            </Link>
          </div>
        </section>
      )}
    </article>
  );
}
