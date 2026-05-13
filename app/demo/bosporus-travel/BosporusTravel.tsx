'use client';

import { useState } from 'react';
import Link from 'next/link';

type Stop = {
  id: string;
  name: string;
  side: 'european' | 'asian';
  // SVG coords inside our 1000×600 viewBox
  x: number;
  y: number;
  tour: {
    title: string;
    duration: string;
    pax: string;
    blurb: string;
    includes: string[];
    priceUSD: number;
  };
};

const STOPS: Stop[] = [
  {
    id: 'kabatas',
    name: 'Kabataş',
    side: 'european',
    x: 320,
    y: 460,
    tour: {
      title: 'Old peninsula, on foot',
      duration: '6 hours · day tour',
      pax: 'Up to 6 guests',
      blurb:
        'We start at the funicular, walk to Eminönü, work through Sultanahmet by the back streets locals use. Coffee at a corner-house, lunch in a meyhane the buses do not stop at.',
      includes: ['Local English-speaking guide', 'All entrance fees', 'Lunch at a meyhane', 'Coffee + dessert stop'],
      priceUSD: 195
    }
  },
  {
    id: 'beyoglu',
    name: 'Beyoğlu',
    side: 'european',
    x: 360,
    y: 380,
    tour: {
      title: 'Beyoğlu after dark',
      duration: '4 hours · evening',
      pax: 'Up to 4 guests',
      blurb:
        'Galata at sunset, the back streets of Cihangir, a meyhane sit-down with the regulars, a stop at a music house before catching the last ferry.',
      includes: ['Walking guide', 'Meze + rakı', 'Music house cover', 'Late ferry ticket'],
      priceUSD: 175
    }
  },
  {
    id: 'rumelihisari',
    name: 'Rumeli Hisarı',
    side: 'european',
    x: 530,
    y: 220,
    tour: {
      title: 'European shore, end to end',
      duration: '8 hours · day tour',
      pax: 'Up to 5 guests',
      blurb:
        'Ortaköy, Bebek, Rumeli Hisarı, Sarıyer. Tea at a fortress, a fish lunch in Sarıyer, the small mansions, an ice-cream stop tourists never find.',
      includes: ['Van + driver', 'Fortress entry', 'Fish lunch at Sarıyer', 'Local guide'],
      priceUSD: 235
    }
  },
  {
    id: 'bosphorus',
    name: 'Boat — Bosphorus',
    side: 'european',
    x: 470,
    y: 290,
    tour: {
      title: 'Bosphorus by private boat',
      duration: '4 hours · half-day',
      pax: 'Up to 8 guests',
      blurb:
        'Our own boat, no shared schedule. Two stops you choose, a long swim under the second bridge, lunch on board or at one of three jetties.',
      includes: ['Private boat + captain', 'Two stops', 'On-board lunch', 'Drinks'],
      priceUSD: 420
    }
  },
  {
    id: 'kadikoy',
    name: 'Kadıköy',
    side: 'asian',
    x: 600,
    y: 480,
    tour: {
      title: 'The Asian side',
      duration: '7 hours · day tour',
      pax: 'Up to 6 guests',
      blurb:
        'Kadıköy markets at the morning rush, Moda for coffee, Üsküdar at sunset, ferry back to Karaköy. The Istanbul tourists rarely see, in the order locals do it.',
      includes: ['Ferry tickets', 'Coffee + sweets stop', 'Lunch in Kadıköy', 'Sunset boat back'],
      priceUSD: 175
    }
  },
  {
    id: 'cengelkoy',
    name: 'Çengelköy',
    side: 'asian',
    x: 640,
    y: 360,
    tour: {
      title: 'Asian shore villages',
      duration: '6 hours · day tour',
      pax: 'Up to 5 guests',
      blurb:
        'Beylerbeyi palace, Kuzguncuk, Çengelköy. Tea in the wooden cottages, a long walk on the corniche, a fish dinner where the locals eat.',
      includes: ['Van + driver', 'Palace entry', 'Tea house stop', 'Fish dinner'],
      priceUSD: 215
    }
  },
  {
    id: 'kucuksu',
    name: 'Küçüksu',
    side: 'asian',
    x: 580,
    y: 240,
    tour: {
      title: 'Küçüksu sunset boat',
      duration: '3 hours · evening',
      pax: 'Up to 6 guests',
      blurb:
        'A short private boat run for sunset only. Drinks on board, the city lights coming on, dropped back at Beşiktaş or Üsküdar — your call.',
      includes: ['Private boat + captain', 'Two-stop route', 'Drinks + meze'],
      priceUSD: 280
    }
  },
  {
    id: 'islands',
    name: "Princes' Islands",
    side: 'asian',
    x: 720,
    y: 540,
    tour: {
      title: "Princes' Islands · Büyükada",
      duration: 'Full day',
      pax: 'Up to 6 guests',
      blurb:
        'Ferry to Büyükada, lunch on the water, the long bike loop, a quiet church on the hill, ferry back at golden hour. Car-free island; we walk and cycle.',
      includes: ['Return ferry', 'Bike rental', 'Lunch on the water', 'Local guide'],
      priceUSD: 165
    }
  }
];

const STATS = [
  { l: 'Reviews', v: '4.93★' },
  { l: 'Tours / year', v: '1,800' },
  { l: 'Languages', v: '5' },
  { l: 'Years guiding', v: '11' }
];

export default function BosporusTravel() {
  const [active, setActive] = useState<string>('bosphorus');
  const stop = STOPS.find(s => s.id === active) || STOPS[0];

  return (
    <div style={{ background: '#0B1820', color: '#E6F0F2', minHeight: '100dvh', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
      <header style={{ borderBottom: '1px solid rgba(230,240,242,0.08)', position: 'sticky', top: 0, zIndex: 20, background: 'rgba(11,24,32,0.94)', backdropFilter: 'blur(10px)' }}>
        <div className="vk-container" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Compass />
            <span style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontWeight: 500, letterSpacing: '-0.01em' }}>Bosporus Travel</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <a href="#map" style={{ color: '#A8C0CB', fontSize: '0.9rem' }}>Map</a>
            <a href="#about" style={{ color: '#A8C0CB', fontSize: '0.9rem' }}>About</a>
            <a href="#book" style={{ background: '#E8B26A', color: '#0B1820', padding: '8px 14px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, borderRadius: 4 }}>Plan a trip</a>
          </nav>
        </div>
      </header>

      {/* Hero with map */}
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="vk-container">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8B26A' }}>
            Privately guided · 8 routes · since 2014
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-sora), Sora, sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              margin: '1rem 0 0',
              maxWidth: '14ch'
            }}
          >
            Pick a stop.{' '}
            <span style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#E8B26A' }}>
              We do the rest.
            </span>
          </h1>
          <p style={{ color: '#A8C0CB', maxWidth: '52ch', lineHeight: 1.55, marginTop: '1.25rem', fontSize: '1.0625rem' }}>
            Tap any pin on the map. A small studio of local guides, our own boat, our own driver — small groups, no megaphone tours, no kickback shops.
          </p>
        </div>

        <div id="map" className="vk-container" style={{ marginTop: '2.5rem' }}>
          <BosphorusMap stops={STOPS} active={active} setActive={setActive} />
        </div>

        {/* Selected tour */}
        <div className="vk-container" style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'grid', gap: '2.5rem' }} className="lg:grid-cols-12">
            <div style={{ gridColumn: 'span 7' }} className="lg:col-span-7">
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8B26A' }}>
                {stop.side === 'european' ? 'European side' : 'Asian side'} · {stop.name}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-sora), Sora, sans-serif',
                  fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                  fontWeight: 500,
                  margin: '1rem 0 0',
                  maxWidth: '18ch'
                }}
              >
                {stop.tour.title}
              </h2>
              <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', lineHeight: 1.55, maxWidth: '54ch' }}>{stop.tour.blurb}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: '1.5rem' }}>
                <Meta label="Duration" value={stop.tour.duration} />
                <Meta label="Group" value={stop.tour.pax} />
                <Meta label="From / group" value={`$${stop.tour.priceUSD}`} />
              </div>
            </div>

            <aside style={{ gridColumn: 'span 5' }} className="lg:col-span-5">
              <div style={{ border: '1px solid rgba(230,240,242,0.16)', padding: '1.5rem', background: '#11222C' }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8B26A' }}>
                  Includes
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
                  {stop.tour.includes.map((i, idx) => (
                    <li key={idx} style={{ padding: '10px 0', borderTop: idx === 0 ? 'none' : '1px solid rgba(230,240,242,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8B26A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                      <span style={{ fontSize: '0.98rem' }}>{i}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginTop: '1.25rem',
                    background: '#E8B26A',
                    color: '#0B1820',
                    padding: '12px 18px',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    letterSpacing: '0.02em',
                    minHeight: 44,
                    alignItems: 'center'
                  }}
                >
                  Book this tour →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '4rem 0', borderTop: '1px solid rgba(230,240,242,0.08)', background: '#091420' }}>
        <div className="vk-container">
          <div style={{ display: 'grid', gap: '2.5rem' }} className="lg:grid-cols-12">
            <div style={{ gridColumn: 'span 5' }} className="lg:col-span-5">
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8B26A' }}>
                Studio · Galata
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-sora), Sora, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                  fontWeight: 500,
                  margin: '1rem 0 0',
                  maxWidth: '14ch'
                }}
              >
                A studio of{' '}
                <span style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#E8B26A' }}>seven guides.</span>
              </h2>
            </div>
            <div style={{ gridColumn: 'span 7' }} className="lg:col-span-7">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '52ch' }}>
                We are seven friends who happen to live here. Architects, a chef, a journalist, two historians.
                Each tour is led by one of us — no franchised guides, no megaphone, no scripted patter.
                We speak English, Turkish, French, German and Russian.
              </p>
              <div style={{ display: 'grid', gap: 18, marginTop: '1.75rem' }} className="sm:grid-cols-4">
                {STATS.map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8B26A' }}>{s.l}</div>
                    <div style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em', marginTop: 4 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan a trip */}
      <section id="book" style={{ padding: '4rem 0', borderTop: '1px solid rgba(230,240,242,0.08)' }}>
        <div className="vk-container" style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8B26A' }}>
            Plan a trip
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sora), Sora, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              margin: '1rem 0 0'
            }}
          >
            Tell us what you'd like to see.
          </h2>
          <form style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }} className="md:grid-cols-2">
            <Field label="Name"><input required style={inputStyle} /></Field>
            <Field label="Email"><input type="email" required style={inputStyle} /></Field>
            <Field label="Arrive"><input type="date" required style={inputStyle} /></Field>
            <Field label="Depart"><input type="date" required style={inputStyle} /></Field>
            <Field label="Group size">
              <select style={inputStyle}>
                <option>1–2 people</option><option>3–4</option><option>5–6</option><option>7–8</option>
              </select>
            </Field>
            <Field label="Most interested in">
              <select style={inputStyle}>
                <option>Pick from the map</option>
                {STOPS.map(s => <option key={s.id}>{s.tour.title}</option>)}
              </select>
            </Field>
            <Field label="Anything else (optional)" full>
              <textarea rows={3} style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} />
            </Field>
            <button
              type="submit"
              style={{
                background: '#E8B26A',
                color: '#0B1820',
                padding: '14px 24px',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                border: 'none',
                cursor: 'pointer',
                gridColumn: '1 / -1',
                minHeight: 48
              }}
            >
              Send the brief →
            </button>
          </form>
          <p style={{ marginTop: 10, fontSize: '0.85rem', color: '#7C95A1', fontStyle: 'italic' }}>We reply within four hours during European working hours.</p>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(230,240,242,0.08)', padding: '2rem 0' }}>
        <div className="vk-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C95A1' }}>
          <span>© Bosporus Travel · Istanbul · since 2014</span>
          <Link href="/en/work/bosporus-travel-ai-agent" style={{ color: '#7C95A1', textDecoration: 'underline' }}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}

function BosphorusMap({ stops, active, setActive }: { stops: Stop[]; active: string; setActive: (id: string) => void }) {
  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid rgba(230,240,242,0.16)',
        borderRadius: 14,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0C1F2C 0%, #0A1722 100%)'
      }}
    >
      <svg viewBox="0 0 1000 600" width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        {/* European landmass */}
        <path
          d="M0,560 L0,200 C 60,180 140,210 220,180 C 290,160 340,200 390,180 C 430,170 440,260 470,310 C 480,340 460,400 440,440 C 420,500 380,540 320,560 Z"
          fill="#11242E"
          stroke="rgba(230,240,242,0.1)"
          strokeWidth="1"
        />
        {/* Asian landmass */}
        <path
          d="M1000,560 L1000,160 C 940,140 880,180 800,170 C 720,160 660,210 620,260 C 580,310 600,360 620,400 C 660,470 720,520 800,560 Z"
          fill="#11242E"
          stroke="rgba(230,240,242,0.1)"
          strokeWidth="1"
        />
        {/* Bosphorus water — keep gap between landmasses */}
        {/* dotted route from south to north */}
        <path
          d="M 320,540 C 380,460 460,380 510,300 C 540,250 530,200 510,140"
          stroke="#E8B26A"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          fill="none"
          opacity="0.65"
        />

        {/* Labels for sides */}
        <text x="40" y="100" fill="#7C95A1" fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="3">
          EUROPE
        </text>
        <text x="900" y="100" fill="#7C95A1" fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="3" textAnchor="end">
          ASIA
        </text>
        <text x="500" y="40" fill="#A8C0CB" fontFamily="var(--font-serif), serif" fontStyle="italic" fontSize="14" textAnchor="middle">
          Black Sea ↑
        </text>
        <text x="500" y="580" fill="#A8C0CB" fontFamily="var(--font-serif), serif" fontStyle="italic" fontSize="14" textAnchor="middle">
          Sea of Marmara ↓
        </text>

        {/* Stops */}
        {stops.map(s => {
          const isActive = s.id === active;
          return (
            <g
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse ring */}
              {isActive && (
                <circle cx={s.x} cy={s.y} r="22" fill="none" stroke="#E8B26A" strokeWidth="1" opacity="0.5">
                  <animate attributeName="r" values="14;26;14" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={s.x} cy={s.y} r={isActive ? 9 : 6} fill={isActive ? '#E8B26A' : '#A8C0CB'} stroke="#0B1820" strokeWidth="2" />
              <text
                x={s.x + 14}
                y={s.y + 4}
                fill={isActive ? '#E8B26A' : '#E6F0F2'}
                fontFamily="var(--font-mono), monospace"
                fontSize="11"
                letterSpacing="1.5"
                style={{ textTransform: 'uppercase' }}
              >
                {s.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile picker (under map) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '12px', borderTop: '1px solid rgba(230,240,242,0.08)' }}>
        {stops.map(s => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              style={{
                background: isActive ? '#E8B26A' : 'transparent',
                color: isActive ? '#0B1820' : '#A8C0CB',
                border: '1px solid ' + (isActive ? '#E8B26A' : 'rgba(230,240,242,0.18)'),
                padding: '6px 12px',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {s.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Compass() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8B26A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M16.24 7.76 14 14l-6.24 2.24L10 10z" />
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#11222C',
  border: '1px solid rgba(230,240,242,0.18)',
  color: '#E6F0F2',
  padding: '12px 14px',
  fontSize: '1rem',
  minHeight: 48,
  fontFamily: 'inherit'
};

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', gridColumn: full ? '1 / -1' : undefined }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8B26A', marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7C95A1' }}>{label}</div>
      <div style={{ marginTop: 4, fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.05rem', fontWeight: 500 }}>{value}</div>
    </div>
  );
}
