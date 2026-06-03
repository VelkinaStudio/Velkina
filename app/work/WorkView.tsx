import * as React from 'react';
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
  liveUrl?: string;
};

/*
 * Velkina v8 — /work index page.
 *
 * Visual language matches HomeView v8 (warm graphite atmospheric,
 * Cabinet Grotesque display, hover-reveal tiles). Shows every project
 * the studio has shipped — same tile vocabulary as the home grid, in
 * a fuller 16-tile asymmetric layout.
 */
export default function WorkView({
  messages,
  locale
}: {
  messages: any;
  locale: Locale;
}) {
  const w = messages.work;
  const items: WorkItem[] = w.items;
  const tagLabels = w.tagLabels as Record<string, string>;
  const slugTag = w.slugTag as Record<string, string>;
  const hoverProblem = w.hoverProblem as Record<string, string>;
  const v8 = messages.home.v8;

  // Asymmetric pattern: every 5th + every 9th tile is wide (spans 2 cols).
  // Gives the grid the irregular rhythm we want without manual per-slug
  // assignment for every project.
  const wideIndices = new Set([0, 5, 9, 13]);

  return (
    <div className="v8-root">
      <section className="v8-work-index" aria-labelledby="v8-work-index-heading">
        <div className="v8-wrap">
          <div className="v8-work-index-header">
            <span className="v8-mono">{tagLabels.workIndexEyebrow}</span>
            <h1 id="v8-work-index-heading" className="v8-work-heading">
              {tagLabels.workIndexHeading}
            </h1>
            <p className="v8-work-lead">{tagLabels.workIndexLead}</p>
          </div>

          <ul className="v8-tile-grid list-none p-0 m-0">
            {items.map((it, idx) => {
              const tagKey = slugTag[it.slug] || 'web';
              const tag = tagLabels[tagKey] || tagKey.toUpperCase();
              const problem = hoverProblem[it.slug] || '';
              const wide = wideIndices.has(idx);
              return (
                <li key={it.slug} className={wide ? 'v8-tile--wide' : ''}>
                  <Link
                    href={`/${locale}/work/${it.slug}`}
                    className="v8-tile"
                    aria-label={`${it.client} — ${tagLabels.viewCase || 'View case'}`}
                  >
                    <div className="v8-tile-image">
                      <img
                        src={it.image}
                        alt={`${it.client} — ${it.service}`}
                        loading={idx < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <div className="v8-tile-overlay">
                        {problem && (
                          <p className="v8-tile-overlay-text">{problem}</p>
                        )}
                        <span className="v8-tile-overlay-cta">
                          {tagLabels.viewCase || 'VIEW CASE STUDY →'}
                        </span>
                      </div>
                    </div>
                    <div className="v8-tile-meta">
                      <span className="v8-tile-tag">{tag} · {it.year}</span>
                      <span className="v8-tile-client">{it.client}</span>
                      <span className="v8-tile-service">{it.service}</span>
                      <span className="v8-tile-outcome">{it.outcome}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
