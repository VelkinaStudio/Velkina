import Link from 'next/link';

export const metadata = {
  title: 'Skyline Media · An Istanbul weekly',
  description: 'Independent reporting from Istanbul. New every Friday.',
  alternates: { canonical: '/demo/skyline-media' }
};

const ISSUE = {
  number: 'Vol. IV · Issue 27',
  date: 'Friday, 15 May 2026',
  weather: 'İstanbul · 22°C, partly cloudy',
  subs: '4,287 paying readers',
  lead: {
    kicker: 'Long read',
    title: "The slow privatisation of Istanbul's coastline",
    byline: 'By Selin Kuruoğlu',
    minutes: '14',
    dek:
      "Two laws, twelve quietly approved permits, and a stretch of the Bosphorus that locals can no longer reach on foot. A six-month investigation into how the European shore stopped being public — without anyone passing a law that said so.",
    pull: '"Nobody voted for this. Twelve permits did the voting."'
  },
  features: [
    {
      kicker: 'Q&A',
      title: 'Ece Temelkuran on writing in three languages',
      by: 'Maya Akman',
      mins: '8',
      dek:
        'The novelist on Turkish, English, and the political cost of leaving one of them behind. Recorded at the studio, March.'
    },
    {
      kicker: 'Field',
      title: 'A morning at the Kadıköy fish market',
      by: 'Onur Demir',
      mins: '5',
      dek:
        'Photographs and notes from the 04:30 shift. The auctioneer, the boats, the men who decide what İstanbul eats tonight.'
    },
    {
      kicker: 'Notes',
      title: 'Three things the mayor said this week',
      by: 'The editors',
      mins: '3',
      dek:
        'And one he very carefully did not. Read with our annotation overlay turned on.'
    }
  ],
  briefs: [
    { kicker: 'Music', line: 'The new Cem Adrian record, reviewed.' },
    { kicker: 'Politics', line: 'A primer on the new election law — in 800 words.' },
    { kicker: 'City', line: "What's happening to the Haydarpaşa terminal." },
    { kicker: 'Books', line: 'Six new translations worth your shelf.' },
    { kicker: 'Food', line: 'A hidden meyhane in Kuzguncuk, and three to skip.' },
    { kicker: 'Letters', line: 'On last week\'s piece about the Princes\' Islands.' }
  ],
  podcast: {
    title: 'The Weekly · Episode 212',
    guest: 'with Nuray Mert',
    duration: '1h 14m',
    summary:
      'The columnist and political scientist on the press, exile, and what changed in 2024.',
    timestamps: [
      { t: '00:00', label: 'Cold open' },
      { t: '03:21', label: 'The first column she ever filed' },
      { t: '18:40', label: 'On leaving and coming back' },
      { t: '41:02', label: 'How readers became publishers' },
      { t: '58:55', label: 'A question from Onur' }
    ]
  }
};

export default function SkylineMediaPage() {
  return (
    <div
      style={{
        background: '#F6F1E7',
        color: '#171513',
        minHeight: '100dvh',
        fontFamily: '"Iowan Old Style", "Charter", "Source Serif Pro", Georgia, serif'
      }}
    >
      {/* MASTHEAD */}
      <header style={{ borderBottom: '3px double #171513' }}>
        <div className="vk-container" style={{ padding: '12px 0', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C544A' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span>{ISSUE.number}</span>
            <span>{ISSUE.date}</span>
            <span>{ISSUE.weather}</span>
          </div>
        </div>
        <div className="vk-container" style={{ padding: '8px 0 24px', textAlign: 'center', borderTop: '1px solid #17151333' }}>
          <h1
            style={{
              fontFamily: '"Playfair Display", "Iowan Old Style", "Charter", Georgia, serif',
              fontSize: 'clamp(3rem, 13vw, 8.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 0.92,
              margin: '0.5rem 0 0',
              fontStyle: 'italic'
            }}
          >
            Skyline
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 10 }}>
            <div style={{ height: 1, width: 60, background: '#171513' }} />
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
              an Istanbul weekly
            </span>
            <div style={{ height: 1, width: 60, background: '#171513' }} />
          </div>
        </div>
        <div className="vk-container" style={{ padding: '10px 0', fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', borderTop: '1px solid #17151322', borderBottom: '1px solid #17151322', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a href="#lead" style={{ color: '#171513' }}>Lead</a>
          <a href="#features" style={{ color: '#171513' }}>Features</a>
          <a href="#podcast" style={{ color: '#171513' }}>The Weekly</a>
          <a href="#briefs" style={{ color: '#171513' }}>Briefs</a>
          <a href="#subscribe" style={{ color: '#A03028', fontWeight: 600 }}>Subscribe</a>
        </div>
      </header>

      {/* LEAD STORY */}
      <section id="lead" style={{ padding: '3rem 0' }}>
        <div className="vk-container">
          <div style={{ display: 'grid', gap: '2.5rem' }} className="lg:grid-cols-12">
            <article style={{ gridColumn: 'span 8' }} className="lg:col-span-8" >
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A03028' }}>
                {ISSUE.lead.kicker} · {ISSUE.lead.minutes} min
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", "Iowan Old Style", "Charter", Georgia, serif',
                  fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.02,
                  margin: '0.75rem 0 0',
                  maxWidth: '18ch'
                }}
              >
                {ISSUE.lead.title}
              </h2>
              <div style={{ marginTop: 12, fontFamily: '"Iowan Old Style", Charter, Georgia, serif', fontStyle: 'italic', color: '#5C544A' }}>
                {ISSUE.lead.byline}
              </div>
              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.55,
                  marginTop: '1.5rem',
                  maxWidth: '52ch',
                  // drop cap
                }}
              >
                <span
                  style={{
                    float: 'left',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: '4.5rem',
                    lineHeight: 0.85,
                    marginRight: 10,
                    marginTop: 4,
                    color: '#171513'
                  }}
                >
                  T
                </span>
                {ISSUE.lead.dek}
              </p>
              <blockquote
                style={{
                  borderLeft: '3px solid #A03028',
                  padding: '6px 0 6px 18px',
                  margin: '1.75rem 0 0',
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: '1.4rem',
                  lineHeight: 1.3,
                  maxWidth: '32ch'
                }}
              >
                {ISSUE.lead.pull}
              </blockquote>
              <a href="#" style={{ display: 'inline-block', marginTop: '1.5rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A03028' }}>
                Read the full piece →
              </a>
            </article>

            {/* sidebar — masthead facts */}
            <aside style={{ gridColumn: 'span 4', borderTop: '1px solid #17151322', paddingTop: '1.5rem' }} className="lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C544A' }}>
                Inside this issue
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0' }}>
                {[
                  { p: 'p. 2', t: 'Q&A · Ece Temelkuran on writing in three languages' },
                  { p: 'p. 4', t: 'Field · A morning at the Kadıköy fish market' },
                  { p: 'p. 6', t: 'Notes · Three things the mayor said this week' },
                  { p: 'p. 8', t: 'The Weekly · with Nuray Mert (audio)' }
                ].map((it, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr',
                      gap: 14,
                      padding: '10px 0',
                      borderBottom: i < 3 ? '1px dotted #17151322' : 'none'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', color: '#5C544A' }}>{it.p}</span>
                    <span style={{ fontSize: '0.98rem', lineHeight: 1.35 }}>{it.t}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#EEE6D5', border: '1px solid #17151322', fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.08em', color: '#5C544A' }}>
                Reader-funded · {ISSUE.subs}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FEATURES — 3 column */}
      <section id="features" style={{ borderTop: '3px double #171513', padding: '3rem 0' }}>
        <div className="vk-container">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C544A', marginBottom: '1.25rem' }}>
            Inside · features
          </div>
          <div style={{ display: 'grid', gap: '2rem' }} className="md:grid-cols-3">
            {ISSUE.features.map((f, i) => (
              <article key={i} style={{ borderTop: '1px solid #171513', paddingTop: 14 }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A03028' }}>
                  {f.kicker} · {f.mins} min
                </div>
                <h3 style={{ fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.1, margin: '8px 0 0', maxWidth: '20ch' }}>
                  {f.title}
                </h3>
                <div style={{ fontStyle: 'italic', color: '#5C544A', marginTop: 6, fontSize: '0.92rem' }}>By {f.by}</div>
                <p style={{ marginTop: 12, fontSize: '1.02rem', lineHeight: 1.5 }}>{f.dek}</p>
                <a href="#" style={{ display: 'inline-block', marginTop: 12, fontFamily: 'var(--font-mono), monospace', fontSize: '0.74rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A03028' }}>
                  Read →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PODCAST inline player */}
      <section id="podcast" style={{ borderTop: '3px double #171513', padding: '3rem 0', background: '#171513', color: '#F6F1E7' }}>
        <div className="vk-container">
          <div className="lg:grid-cols-12" style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ gridColumn: 'span 7' }} className="lg:col-span-7">
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F6E2B6' }}>
                The Weekly · Audio
              </div>
              <h3 style={{ fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em', margin: '10px 0 0' }}>
                {ISSUE.podcast.title}
              </h3>
              <div style={{ fontStyle: 'italic', color: '#D6CDB7', marginTop: 6 }}>
                {ISSUE.podcast.guest} · {ISSUE.podcast.duration}
              </div>
              <p style={{ marginTop: '1.25rem', fontSize: '1.1rem', lineHeight: 1.5, maxWidth: '52ch' }}>{ISSUE.podcast.summary}</p>

              {/* Player */}
              <div style={{ marginTop: '1.5rem', padding: '14px 16px', background: '#221E1A', border: '1px solid #F6F1E722', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 14 }}>
                <button
                  type="button"
                  aria-label="Play"
                  style={{ width: 48, height: 48, borderRadius: 999, background: '#F6E2B6', color: '#171513', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0v16l14-8z" /></svg>
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 4, background: '#F6F1E722', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '34%', background: '#F6E2B6' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', color: '#D6CDB7' }}>
                    <span>25:14</span>
                    <span>1:14:08</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ gridColumn: 'span 5' }} className="lg:col-span-5">
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D6CDB7' }}>
                Chapters
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0' }}>
                {ISSUE.podcast.timestamps.map((t, i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 14, padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid #F6F1E714' }}>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', color: '#F6E2B6', fontVariantNumeric: 'tabular-nums' }}>{t.t}</span>
                    <span style={{ fontSize: '0.98rem' }}>{t.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BRIEFS */}
      <section id="briefs" style={{ borderTop: '3px double #171513', padding: '3rem 0' }}>
        <div className="vk-container">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C544A', marginBottom: '1rem' }}>
            Briefs · 60-second reads
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, columnCount: 1, columnGap: '2rem' }} className="md:columns-2 lg:columns-3">
            {ISSUE.briefs.map((b, i) => (
              <li key={i} style={{ breakInside: 'avoid', padding: '10px 0 14px', borderBottom: '1px dotted #17151333', marginBottom: 6 }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A03028' }}>{b.kicker}</div>
                <div style={{ marginTop: 4, fontSize: '1.05rem' }}>{b.line}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section id="subscribe" style={{ borderTop: '3px double #171513', padding: '4rem 0', background: '#EEE6D5' }}>
        <div className="vk-container" style={{ maxWidth: 640 }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A03028' }}>
            Reader-funded · no advertising
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              margin: '12px 0 0',
              lineHeight: 1.05,
              maxWidth: '16ch'
            }}
          >
            Read Skyline every Friday.
          </h2>
          <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: 1.55 }}>
            Four pieces a week. One long, three short. A weekly podcast.
            No ads, no algorithm. Pay what suits you — ₺99, ₺149, or ₺299 a month.
          </p>
          <form style={{ marginTop: '1.5rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              style={{
                flex: '1 1 220px',
                background: '#F6F1E7',
                border: '1px solid #171513',
                padding: '12px 14px',
                fontSize: '1rem',
                color: '#171513',
                minHeight: 48,
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#171513',
                color: '#F6F1E7',
                padding: '12px 22px',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: 48,
                letterSpacing: '0.04em'
              }}
            >
              Subscribe
            </button>
          </form>
          <p style={{ fontStyle: 'italic', color: '#5C544A', marginTop: 12, fontSize: '0.9rem' }}>
            Try the first month free. Cancel any Friday.
          </p>
        </div>
      </section>

      <footer style={{ borderTop: '3px double #171513', padding: '2rem 0', background: '#F6F1E7' }}>
        <div className="vk-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-mono), monospace', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C544A' }}>
          <span>© Skyline · Istanbul · est. 2021</span>
          <Link href="/en/work/skyline-media-mobile-app" style={{ color: '#5C544A', textDecoration: 'underline' }}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}
