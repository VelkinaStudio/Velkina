import Link from 'next/link';

export const metadata = {
  title: 'Anatolia · Cave hotel in Uçhisar',
  description: 'A twelve-room cave hotel in Uçhisar village. Book directly, pay less.',
  alternates: { canonical: '/demo/anatolia-hotel' }
};

type Room = {
  n: string;
  name: string;
  blurb: string;
  pax: number;
  bed: string;
  size: string;
  view: string;
  priceFrom: number; // EUR
  img: string;
  notes: string[];
};

const IMG = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=2000&q=70`;

const ROOMS: Room[] = [
  {
    n: '01',
    name: 'The Arch',
    blurb: 'The corner suite. Two terraces. The widest valley view in the hotel.',
    pax: 2,
    bed: 'King',
    size: '54 m²',
    view: 'Pigeon Valley',
    priceFrom: 280,
    img: IMG('photo-1564501049412-61c2a3083791'),
    notes: ['Two terraces', 'Stone bath', 'Working fireplace']
  },
  {
    n: '02',
    name: 'The Chimney',
    blurb: 'Three storeys carved into a fairy chimney. Two terraces, the bedroom on top.',
    pax: 2,
    bed: 'King',
    size: '62 m²',
    view: 'Pigeon Valley',
    priceFrom: 320,
    img: IMG('photo-1582719508461-905c673771fd'),
    notes: ['3 levels', 'Private staircase', 'Best view at sunrise']
  },
  {
    n: '03',
    name: 'The Pomegranate',
    blurb: 'The family room. Two connecting caves. Sleeps four — a king and a twin.',
    pax: 4,
    bed: 'King + twin',
    size: '70 m²',
    view: 'Village',
    priceFrom: 240,
    img: IMG('photo-1551882547-ff40c63fe5fa'),
    notes: ['Sleeps 4', 'Two rooms', 'Stone bath']
  },
  {
    n: '04',
    name: 'The Almond',
    blurb: 'Standard cave room. King bed, stone-cut bath, terrace at the level of the village rooftops.',
    pax: 2,
    bed: 'King',
    size: '38 m²',
    view: 'Village',
    priceFrom: 160,
    img: IMG('photo-1631049307264-da0ec9d70304'),
    notes: ['King bed', 'Stone bath', 'Quiet wing']
  },
  {
    n: '05',
    name: 'The Olive',
    blurb: 'A twin-bed cave for travellers who would rather not share. Same stone bath, same terrace.',
    pax: 2,
    bed: 'Twin',
    size: '36 m²',
    view: 'Village',
    priceFrom: 150,
    img: IMG('photo-1566073771259-6a8506099945'),
    notes: ['Twin beds', 'Stone bath', 'Quiet wing']
  },
  {
    n: '06',
    name: 'The Fig',
    blurb: 'The smallest cave. Single sleeper. Solo travellers, writers, anyone in Cappadocia for the silence.',
    pax: 1,
    bed: 'Queen',
    size: '24 m²',
    view: 'Village',
    priceFrom: 110,
    img: IMG('photo-1505693416388-ac5ce068fe85'),
    notes: ['Single occupancy', 'Stone bath']
  },
  {
    n: '07',
    name: 'The Saffron',
    blurb: 'Standard cave room, mirror of The Almond. Terrace, fireplace, balloons overhead at sunrise.',
    pax: 2,
    bed: 'King',
    size: '38 m²',
    view: 'Village',
    priceFrom: 160,
    img: IMG('photo-1568084680786-a84f91d1153c'),
    notes: ['King bed', 'Fireplace', 'Quiet wing']
  },
  {
    n: '08',
    name: 'The Cedar',
    blurb: 'Higher on the rock face. The bed faces the sunrise. Glass door to a private patio.',
    pax: 2,
    bed: 'King',
    size: '42 m²',
    view: 'Pigeon Valley',
    priceFrom: 200,
    img: IMG('photo-1591088398332-8a7791972843'),
    notes: ['Patio', 'East-facing', 'Reading nook']
  },
  {
    n: '09',
    name: 'The Walnut',
    blurb: 'A long room cut into the cliff. Reading desk, writing chair, soaking tub at the back.',
    pax: 2,
    bed: 'Queen',
    size: '34 m²',
    view: 'Village',
    priceFrom: 140,
    img: IMG('photo-1611892440504-42a792e24d32'),
    notes: ['Soaking tub', 'Writing desk']
  },
  {
    n: '10',
    name: 'The Quince',
    blurb: 'Twin-bed room with a small private terrace. Friends who travel together, two writers, a parent and child.',
    pax: 2,
    bed: 'Twin',
    size: '36 m²',
    view: 'Village',
    priceFrom: 150,
    img: IMG('photo-1614518921956-0d7c71b7999d'),
    notes: ['Private terrace', 'Twin beds']
  },
  {
    n: '11',
    name: 'The Mulberry',
    blurb: 'The library room. Bookshelves carved into the back wall — books in English, Turkish, French.',
    pax: 2,
    bed: 'King',
    size: '40 m²',
    view: 'Village',
    priceFrom: 180,
    img: IMG('photo-1631049035634-a90a456c1f70'),
    notes: ['Library nook', 'King bed']
  },
  {
    n: '12',
    name: 'The Vine',
    blurb: 'The honeymoon suite. Vaulted ceiling, sunken stone bath for two, the longest terrace.',
    pax: 2,
    bed: 'King',
    size: '58 m²',
    view: 'Pigeon Valley',
    priceFrom: 340,
    img: IMG('photo-1582719478250-c89cae4dc85b'),
    notes: ['Sunken bath', 'Long terrace', 'Vaulted ceiling']
  }
];

export default function AnatoliaHotelPage() {
  return (
    <div style={{ background: '#1F1714', color: '#F2E4D0', minHeight: '100dvh', fontFamily: '"Iowan Old Style", "Charter", Georgia, serif' }}>
      {/* Top bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '12px 0',
          background: 'linear-gradient(180deg, rgba(31,23,20,0.72) 0%, rgba(31,23,20,0) 100%)'
        }}
      >
        <div className="vk-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif', fontSize: '1.15rem', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.02em', color: '#F2E4D0', textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>
            Anatolia
          </div>
          <nav style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <a href="#rooms" style={{ color: '#F2E4D0', fontSize: '0.88rem', textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>Rooms</a>
            <a href="#visit" style={{ color: '#F2E4D0', fontSize: '0.88rem', textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>Visit</a>
            <a
              href="#book"
              style={{
                background: '#E0A268',
                color: '#1F1714',
                padding: '8px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em'
              }}
            >
              Book direct · save 20%
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          minHeight: '92vh',
          padding: '5rem 0 3rem',
          backgroundImage: `linear-gradient(rgba(31,23,20,0.62), rgba(31,23,20,0.62)), url(${IMG('photo-1605000797499-95a51c5269ae')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="vk-container">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E0A268' }}>
            Uçhisar · Cappadocia · since 2018
          </div>
          <h1
            style={{
              fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
              fontSize: 'clamp(3rem, 11vw, 8rem)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              margin: '1rem 0 0',
              maxWidth: '12ch'
            }}
          >
            Twelve rooms,{' '}
            <span style={{ fontStyle: 'italic', color: '#E0A268' }}>carved into the rock.</span>
          </h1>
          <p style={{ marginTop: '1.5rem', fontSize: '1.15rem', lineHeight: 1.55, maxWidth: '48ch', color: '#E5D6BE' }}>
            A small family-run cave hotel in Uçhisar village. Each room cut by hand,
            each one different. Breakfast on the terrace at sunrise — the same minute the
            balloons go up.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: '2rem' }}>
            <a href="#rooms" style={{ background: '#F2E4D0', color: '#1F1714', padding: '14px 24px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '0.02em' }}>
              Walk through the rooms ↓
            </a>
            <a href="#book" style={{ background: 'transparent', color: '#F2E4D0', padding: '14px 24px', border: '1px solid rgba(242,228,208,0.4)', fontSize: '0.95rem', fontWeight: 500 }}>
              Book direct
            </a>
          </div>
          <div style={{ marginTop: '3rem', display: 'grid', gap: 18 }} className="sm:grid-cols-4">
            {[
              { l: 'Rooms', v: '12' },
              { l: 'Guests max', v: '24' },
              { l: 'OTA saving', v: '20%' },
              { l: 'Booking.com rating', v: '9.5' }
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E0A268' }}>{s.l}</div>
                <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '2rem', fontWeight: 700, fontStyle: 'italic', marginTop: 4 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms cinematic — each one full-bleed */}
      <section id="rooms">
        {ROOMS.map((r, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={r.n}
              style={{
                position: 'relative',
                minHeight: 'min(100vh, 720px)',
                display: 'flex',
                alignItems: 'stretch',
                borderTop: '1px solid #F2E4D018',
                backgroundImage: `linear-gradient(rgba(31,23,20,0.36), rgba(31,23,20,0.7)), url(${r.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="vk-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: flip ? 'flex-end' : 'flex-start', padding: '4rem 0', width: '100%' }}>
                <div
                  style={{
                    maxWidth: 540,
                    marginLeft: flip ? 'auto' : 0,
                    background: 'rgba(31,23,20,0.42)',
                    backdropFilter: 'blur(6px)',
                    padding: '1.5rem 1.75rem',
                    border: '1px solid rgba(242,228,208,0.18)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: '4rem', fontWeight: 700, color: '#E0A268', lineHeight: 0.85 }}>
                      {r.n}
                    </span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E0A268' }}>
                        Room
                      </div>
                      <h3
                        style={{
                          fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
                          fontStyle: 'italic',
                          fontWeight: 700,
                          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                          letterSpacing: '-0.01em',
                          margin: 0,
                          color: '#F2E4D0'
                        }}
                      >
                        {r.name}
                      </h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '1.05rem', lineHeight: 1.55, color: '#F2E4D0', marginTop: '1rem' }}>{r.blurb}</p>

                  <dl
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '6px 14px',
                      margin: '1rem 0 0',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(242,228,208,0.18)',
                      fontSize: '0.92rem'
                    }}
                  >
                    {([
                      ['Sleeps', `${r.pax}`],
                      ['Bed', r.bed],
                      ['Size', r.size],
                      ['Looks at', r.view]
                    ] as [string, string][]).map(([k, v]) => (
                      <FragmentRow key={k} k={k} v={v} />
                    ))}
                  </dl>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                    {r.notes.map(n => (
                      <span
                        key={n}
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '0.65rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#E0A268',
                          border: '1px solid rgba(224,162,104,0.6)',
                          padding: '2px 8px'
                        }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(242,228,208,0.18)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E0A268' }}>From / night</div>
                      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: 700, color: '#F2E4D0' }}>
                        €{r.priceFrom}
                      </div>
                    </div>
                    <a
                      href="#book"
                      style={{
                        background: '#E0A268',
                        color: '#1F1714',
                        padding: '12px 18px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        textDecoration: 'none'
                      }}
                    >
                      Book this room →
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Visit + Book */}
      <section id="visit" style={{ padding: '4rem 0', borderTop: '1px solid #F2E4D018' }}>
        <div className="vk-container">
          <div className="lg:grid-cols-12" style={{ display: 'grid', gap: '2.5rem' }}>
            <div style={{ gridColumn: 'span 5' }} className="lg:col-span-5">
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E0A268' }}>
                Find the hotel
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  letterSpacing: '-0.01em',
                  margin: '1rem 0 0',
                  maxWidth: '14ch'
                }}
              >
                Uçhisar village, the top of the rock.
              </h2>
            </div>
            <div style={{ gridColumn: 'span 7' }} className="lg:col-span-7">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                We're at the foot of the Uçhisar fortress, fifteen minutes by car from
                Göreme, twenty from the regional airport. The balloon take-off field is
                a four-minute walk if you prefer to watch from below.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'grid', gap: 18 }} className="sm:grid-cols-3">
                <div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E0A268' }}>Address</div>
                  <div style={{ marginTop: 6 }}>Kayabaşı Mh. 14, Uçhisar 50240, Nevşehir</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E0A268' }}>Reception</div>
                  <div style={{ marginTop: 6 }}>+90 384 555 04 18</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E0A268' }}>Email</div>
                  <div style={{ marginTop: 6 }}>stay@anatoliacave.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="book" style={{ padding: '4rem 0', borderTop: '1px solid #F2E4D018', background: '#15100D' }}>
        <div className="vk-container" style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E0A268' }}>
            Book direct · save 20% over Booking.com
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '-0.01em',
              margin: '1rem 0 0'
            }}
          >
            Stay with us.
          </h2>
          <form style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }} className="md:grid-cols-2">
            <Field label="Arrival">
              <input type="date" required style={inputStyle} />
            </Field>
            <Field label="Departure">
              <input type="date" required style={inputStyle} />
            </Field>
            <Field label="Guests">
              <select style={inputStyle}>
                <option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option>
              </select>
            </Field>
            <Field label="Preferred room (optional)">
              <select style={inputStyle}>
                <option>No preference</option>
                {ROOMS.map(r => <option key={r.n}>{r.n} · {r.name}</option>)}
              </select>
            </Field>
            <Field label="Name" full>
              <input required style={inputStyle} />
            </Field>
            <Field label="Email" full>
              <input type="email" required style={inputStyle} />
            </Field>
            <button
              type="submit"
              style={{
                background: '#E0A268',
                color: '#1F1714',
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
              Request this stay →
            </button>
          </form>
          <p style={{ marginTop: 12, fontSize: '0.85rem', color: '#A4927A', fontStyle: 'italic' }}>
            We confirm by email within four hours during business hours. Direct guests pay 20% less than the same room on Booking or Expedia.
          </p>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #F2E4D018', padding: '2rem 0' }}>
        <div className="vk-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A4927A' }}>
          <span>© Anatolia · Uçhisar</span>
          <Link href="/en/work/anatolia-hotel-booking" style={{ color: '#A4927A', textDecoration: 'underline' }}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1F1714',
  border: '1px solid rgba(242,228,208,0.24)',
  color: '#F2E4D0',
  padding: '12px 14px',
  fontSize: '1rem',
  minHeight: 48,
  fontFamily: 'inherit'
};

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', gridColumn: full ? '1 / -1' : undefined }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E0A268', marginBottom: 6 }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function FragmentRow({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E0A268' }}>{k}</dt>
      <dd style={{ margin: 0 }}>{v}</dd>
    </>
  );
}
