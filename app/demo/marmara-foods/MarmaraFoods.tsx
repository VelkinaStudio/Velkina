'use client';

import { useState } from 'react';
import Link from 'next/link';

type Lang = 'en' | 'tr';

type Product = {
  lot: string;
  name: { en: string; tr: string };
  blurb: { en: string; tr: string };
  origin: string;
  date: string; // bottled / packed
  acidity?: string;
  weight: string;
  priceTL: number;
  notes: string[]; // tasting notes
  category: 'olive-oil' | 'pantry' | 'preserves' | 'frozen';
};

const PRODUCTS: Product[] = [
  {
    lot: '01',
    name: { en: 'Early-harvest olive oil', tr: 'Erken hasat zeytinyağı' },
    blurb: {
      en: 'Pressed within four hours of picking. Memecik variety, single-grove.',
      tr: 'Toplamadan dört saat içinde sıkıldı. Memecik, tek bahçe.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2025-11-08',
    acidity: '0.18%',
    weight: '500ml',
    priceTL: 420,
    notes: ['Grass', 'Green almond', 'Black pepper finish'],
    category: 'olive-oil'
  },
  {
    lot: '02',
    name: { en: 'Classic olive oil', tr: 'Klasik zeytinyağı' },
    blurb: {
      en: 'Six months in stainless. Rounder, mellower, for everyday cooking.',
      tr: 'Altı ay paslanmazda. Daha yumuşak, daha yuvarlak, günlük pişirme için.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2025-09-20',
    acidity: '0.30%',
    weight: '1L',
    priceTL: 580,
    notes: ['Buttery', 'Artichoke', 'Mild'],
    category: 'olive-oil'
  },
  {
    lot: '03',
    name: { en: 'Picual reserve', tr: 'Picual rezerv' },
    blurb: {
      en: 'A small block of Picual planted by our grandmother in 1981.',
      tr: 'Büyükannemizin 1981\'de diktiği küçük bir Picual parselinden.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2025-11-12',
    acidity: '0.21%',
    weight: '250ml',
    priceTL: 360,
    notes: ['Tomato leaf', 'Sharp', 'Long finish'],
    category: 'olive-oil'
  },
  {
    lot: '04',
    name: { en: 'Tarhana', tr: 'Tarhana' },
    blurb: {
      en: 'Yogurt and peppers, dried in the sun on linen. The way our grandmother made it.',
      tr: 'Yoğurt ve biber, keten üzerinde güneşte kurutuldu. Büyükannemizin yöntemi.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2025-10-04',
    weight: '300g',
    priceTL: 95,
    notes: ['Sour', 'Smoky', 'Slow'],
    category: 'pantry'
  },
  {
    lot: '05',
    name: { en: 'Frozen mantı', tr: 'Dondurulmuş mantı' },
    blurb: {
      en: 'Folded by hand at the village mill. Fifty pieces per box.',
      tr: 'Köy değirmeninde elle katlandı. Kutuda elli adet.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2026-04-30',
    weight: '500g',
    priceTL: 140,
    notes: ['Lamb', 'Cumin', 'Hand-folded'],
    category: 'frozen'
  },
  {
    lot: '06',
    name: { en: 'Grape molasses · pekmez', tr: 'Üzüm pekmezi' },
    blurb: {
      en: 'Boiled the old way. No sugar, no preservatives. From Şarköy grapes.',
      tr: 'Eski usulle kaynatıldı. Şeker yok, koruyucu yok. Şarköy üzümünden.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2025-10-22',
    weight: '600g',
    priceTL: 160,
    notes: ['Dark', 'Caramel', 'Mineral'],
    category: 'preserves'
  },
  {
    lot: '07',
    name: { en: 'Wild thyme honey', tr: 'Yabani kekik balı' },
    blurb: {
      en: 'From one beekeeper in the Şarköy hills. Cold-extracted, raw.',
      tr: 'Şarköy tepelerinden tek bir arıcıdan. Soğuk çekim, ham.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2025-09-12',
    weight: '450g',
    priceTL: 280,
    notes: ['Floral', 'Resinous', 'Slow crystallise'],
    category: 'preserves'
  },
  {
    lot: '08',
    name: { en: 'Walnut · date loaf', tr: 'Cevizli · hurmalı ekmek' },
    blurb: {
      en: 'Baked Thursday, packed Friday. Walnuts from the same village.',
      tr: 'Perşembe pişti, cuma paketlendi. Cevizler aynı köyden.'
    },
    origin: 'Şarköy · Tekirdağ',
    date: '2026-05-10',
    weight: '500g',
    priceTL: 145,
    notes: ['Dense', 'Sweet', 'Long-keeping'],
    category: 'pantry'
  }
];

const COPY = {
  en: {
    masthead: 'A family mill on the Şarköy coast · since 1978',
    h1Lead: 'Pressed by hand,',
    h1Italic: 'bottled the same day.',
    sub:
      'Memecik and Picual olive oil from our own grove. Tarhana, mantı, pekmez and honey from the same village. No middleman, no warehouse — what we made this season is what you get.',
    cta: 'Browse the shelf',
    ctaSub: 'Order on WhatsApp',
    shelfH: 'On the shelf this week.',
    filters: { all: 'All', 'olive-oil': 'Olive oil', pantry: 'Pantry', preserves: 'Preserves', frozen: 'Frozen' },
    label: { lot: 'Lot', origin: 'Origin', bottled: 'Bottled', acidity: 'Acidity', weight: 'Weight', notes: 'Tasting notes' },
    storyH: 'Four generations,',
    storyI: 'one mill.',
    storyP: [
      'The grove was planted by my great-grandfather in 1922. The mill came in 1978, when my grandmother decided she was tired of carrying olives to the village press.',
      'We pick by hand, press the same day, bottle dark glass to keep the oil out of the light. No blends. No tankers from somewhere else. What we make this season is what we have until the next.'
    ],
    visitH: 'Visit the mill.',
    visitP: "Open Saturdays, 9–13. Walk-ins welcome. Bring your own container — we'll fill it from the latest pressing for ₺10 off."
  },
  tr: {
    masthead: 'Şarköy kıyısında aile değirmeni · 1978\'den beri',
    h1Lead: 'Elle sıkıldı,',
    h1Italic: 'aynı gün şişelendi.',
    sub:
      'Kendi bahçemizden Memecik ve Picual zeytinyağı. Aynı köyden tarhana, mantı, pekmez ve bal. Aracı yok, depo yok — bu sezon ürettiğimiz, alacağınız şey.',
    cta: 'Rafa göz at',
    ctaSub: 'WhatsApp\'tan sipariş ver',
    shelfH: 'Bu hafta rafta.',
    filters: { all: 'Tümü', 'olive-oil': 'Zeytinyağı', pantry: 'Kiler', preserves: 'Reçel & bal', frozen: 'Dondurulmuş' },
    label: { lot: 'Parti', origin: 'Köken', bottled: 'Şişelendi', acidity: 'Asitlik', weight: 'Ağırlık', notes: 'Tat notları' },
    storyH: 'Dört kuşak,',
    storyI: 'tek değirmen.',
    storyP: [
      'Bahçeyi büyük büyükbabam 1922\'de dikti. Değirmen 1978\'de geldi — büyükannem zeytini köy preshanesine taşımaktan yorulmuştu.',
      'Elle topluyoruz, aynı gün sıkıyoruz, koyu cama dolduruyoruz. Harman yok, başka tankerden gelen yok. Bu sezon ürettiğimiz, bir sonraki sezona kadar olan tek şey.'
    ],
    visitH: 'Değirmene gel.',
    visitP: 'Cumartesileri 9–13 açık. Önceden haber etmeden gel. Kendi kabını getirirsen son sıkımdan dolduralım, ₺10 indirim.'
  }
} as const;

const PAPER_BG = '#EFE6D2';

export default function MarmaraFoods() {
  const [lang, setLang] = useState<Lang>('en');
  const [filter, setFilter] = useState<'all' | Product['category']>('all');
  const c = COPY[lang];

  const items = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div
      style={{
        background: PAPER_BG,
        color: '#1F1A11',
        minHeight: '100dvh',
        fontFamily: '"Iowan Old Style", "Charter", "Source Serif Pro", Georgia, serif',
        // subtle paper grain via CSS gradients
        backgroundImage:
          'radial-gradient(rgba(91,68,28,0.05) 1px, transparent 1px), radial-gradient(rgba(91,68,28,0.03) 1px, transparent 1px)',
        backgroundSize: '3px 3px, 7px 7px',
        backgroundPosition: '0 0, 1px 1px'
      }}
    >
      {/* Header */}
      <header style={{ borderBottom: '1px solid #1F1A1133' }}>
        <div className="vk-container" style={{ padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: '#5C7A2D', color: PAPER_BG, fontFamily: 'var(--font-mono), monospace', fontWeight: 600, fontSize: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.04em' }}>
              MF
            </div>
            <div>
              <div style={{ fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif', fontSize: '1.15rem', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
                Marmara Foods
              </div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5240' }}>
                Şarköy · Est. 1978
              </div>
            </div>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <a href="#shelf" style={{ color: '#1F1A11', fontSize: '0.92rem' }}>{lang === 'en' ? 'Shelf' : 'Raf'}</a>
            <a href="#story" style={{ color: '#1F1A11', fontSize: '0.92rem' }}>{lang === 'en' ? 'Story' : 'Hikâye'}</a>
            <a href="#visit" style={{ color: '#1F1A11', fontSize: '0.92rem' }}>{lang === 'en' ? 'Visit' : 'Ziyaret'}</a>
            <div style={{ display: 'inline-flex', gap: 6, paddingLeft: 12, borderLeft: '1px solid #1F1A1133' }}>
              {(['en', 'tr'] as const).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: lang === l ? '#1F1A11' : '#9E947E',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    padding: 4
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '3.5rem 0 2rem' }}>
        <div className="vk-container">
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5240' }}>
            {c.masthead}
          </div>
          <h1
            style={{
              fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
              fontSize: 'clamp(2.5rem, 9vw, 6rem)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              lineHeight: 0.96,
              margin: '1rem 0 0',
              maxWidth: '14ch'
            }}
          >
            {c.h1Lead}{' '}
            <span style={{ fontStyle: 'italic', color: '#5C7A2D' }}>{c.h1Italic}</span>
          </h1>
          <p style={{ marginTop: '1.5rem', fontSize: '1.0625rem', lineHeight: 1.55, maxWidth: '54ch', color: '#3F3727' }}>
            {c.sub}
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#shelf"
              style={{
                background: '#1F1A11',
                color: PAPER_BG,
                padding: '12px 22px',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: 44
              }}
            >
              {c.cta}
            </a>
            <a
              href="https://wa.me/905323360051"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                color: '#1F1A11',
                padding: '12px 22px',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                border: '1px solid #1F1A1133',
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: 44
              }}
            >
              {c.ctaSub}
            </a>
          </div>
        </div>
      </section>

      {/* Shelf */}
      <section id="shelf" style={{ padding: '3rem 0', borderTop: '1px solid #1F1A1122' }}>
        <div className="vk-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'baseline' }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              {c.shelfH}
            </h2>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5240' }}>
              {items.length} {lang === 'en' ? 'items' : 'ürün'}
            </span>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '1.5rem' }}>
            {(['all', 'olive-oil', 'pantry', 'preserves', 'frozen'] as const).map(f => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  style={{
                    background: active ? '#1F1A11' : 'transparent',
                    color: active ? PAPER_BG : '#1F1A11',
                    border: '1px solid #1F1A1144',
                    padding: '6px 14px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  {c.filters[f]}
                </button>
              );
            })}
          </div>

          {/* Shelf grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
              marginTop: '2rem'
            }}
          >
            {items.map(p => (
              <ProductLabel key={p.lot} p={p} lang={lang} labels={c.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" style={{ padding: '4rem 0', borderTop: '1px solid #1F1A1122', background: '#E5DAC0' }}>
        <div className="vk-container">
          <div style={{ display: 'grid', gap: '2.5rem' }} className="lg:grid-cols-12">
            <div style={{ gridColumn: 'span 5' }} className="lg:col-span-5">
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5240' }}>
                {lang === 'en' ? 'Since 1978' : '1978\'den beri'}
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
                  fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.04,
                  margin: '1rem 0 0',
                  maxWidth: '14ch'
                }}
              >
                {c.storyH}{' '}
                <span style={{ fontStyle: 'italic', color: '#5C7A2D' }}>{c.storyI}</span>
              </h2>
            </div>
            <div style={{ gridColumn: 'span 7' }} className="lg:col-span-7">
              {c.storyP.map((p, i) => (
                <p key={i} style={{ fontSize: '1.075rem', lineHeight: 1.6, marginBottom: '1rem', maxWidth: '52ch' }}>
                  {i === 0 ? (
                    <>
                      <span
                        style={{
                          float: 'left',
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 700,
                          fontStyle: 'italic',
                          fontSize: '4rem',
                          lineHeight: 0.85,
                          marginRight: 10,
                          marginTop: 4,
                          color: '#5C7A2D'
                        }}
                      >
                        {p[0]}
                      </span>
                      {p.slice(1)}
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" style={{ padding: '4rem 0', borderTop: '1px solid #1F1A1122' }}>
        <div className="vk-container" style={{ maxWidth: 760 }}>
          <h2
            style={{
              fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
              fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontStyle: 'italic',
              margin: 0
            }}
          >
            {c.visitH}
          </h2>
          <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '50ch' }}>{c.visitP}</p>

          <div style={{ marginTop: '2rem', display: 'grid', gap: 24 }} className="sm:grid-cols-3">
            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C5240' }}>
                {lang === 'en' ? 'Address' : 'Adres'}
              </div>
              <div style={{ marginTop: 6 }}>Çamlıca Köyü, Şarköy · 59800 Tekirdağ</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C5240' }}>
                {lang === 'en' ? 'Open' : 'Açık'}
              </div>
              <div style={{ marginTop: 6 }}>{lang === 'en' ? 'Sat 09:00 — 13:00' : 'Cmt 09:00 — 13:00'}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C5240' }}>
                {lang === 'en' ? 'Reach' : 'Ulaş'}
              </div>
              <div style={{ marginTop: 6 }}>+90 282 555 04 18</div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #1F1A1133', padding: '2rem 0' }}>
        <div className="vk-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C5240' }}>
          <span>© Marmara Foods · Şarköy</span>
          <Link href="/en/work/marmara-foods-google-ads" style={{ color: '#5C5240', textDecoration: 'underline' }}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}

function ProductLabel({ p, lang, labels }: { p: Product; lang: Lang; labels: { lot: string; origin: string; bottled: string; acidity: string; weight: string; notes: string } }) {
  return (
    <article
      style={{
        background: '#FAF3E1',
        border: '1px solid #1F1A1133',
        padding: '20px 18px 18px',
        position: 'relative',
        boxShadow: '0 1px 0 #1F1A1118, 0 12px 24px -16px rgba(31,26,17,0.18)'
      }}
    >
      {/* Lot stamp top-right */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 38,
          height: 38,
          borderRadius: 999,
          border: '1.5px solid #5C7A2D',
          color: '#5C7A2D',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(-6deg)'
        }}
      >
        L·{p.lot}
      </div>

      {/* Producer rule */}
      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#5C5240', borderBottom: '1px solid #1F1A1133', paddingBottom: 8 }}>
        Marmara Foods · Lot
      </div>

      {/* Product name */}
      <h3
        style={{
          fontFamily: '"Playfair Display", "Iowan Old Style", Charter, Georgia, serif',
          fontSize: '1.4rem',
          fontWeight: 700,
          fontStyle: 'italic',
          letterSpacing: '-0.005em',
          margin: '14px 0 4px',
          maxWidth: '14ch'
        }}
      >
        {p.name[lang]}
      </h3>
      <p style={{ fontSize: '0.95rem', color: '#3F3727', lineHeight: 1.45, margin: 0 }}>{p.blurb[lang]}</p>

      {/* Spec dl */}
      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 14px', margin: '14px 0', borderTop: '1px dotted #1F1A1144', paddingTop: 10, fontSize: '0.82rem' }}>
        <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5240' }}>{labels.origin}</dt>
        <dd style={{ margin: 0 }}>{p.origin}</dd>
        <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5240' }}>{labels.bottled}</dt>
        <dd style={{ margin: 0 }}>{p.date}</dd>
        {p.acidity && (
          <>
            <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5240' }}>{labels.acidity}</dt>
            <dd style={{ margin: 0 }}>{p.acidity}</dd>
          </>
        )}
        <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5240' }}>{labels.weight}</dt>
        <dd style={{ margin: 0 }}>{p.weight}</dd>
      </dl>

      {/* Notes */}
      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C5240', marginBottom: 6 }}>
        {labels.notes}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {p.notes.map(n => (
          <span
            key={n}
            style={{
              fontFamily: '"Iowan Old Style", Charter, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: '#1F1A11',
              borderBottom: '1px dotted #5C5240'
            }}
          >
            {n}
          </span>
        ))}
      </div>

      {/* Price + buy */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #1F1A1133', paddingTop: 12 }}>
        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '1.05rem', color: '#1F1A11', fontVariantNumeric: 'tabular-nums' }}>
          ₺{p.priceTL}
        </div>
        <a
          href="https://wa.me/905323360051"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#5C7A2D',
            textDecoration: 'none'
          }}
        >
          {lang === 'en' ? 'Order →' : 'Sipariş →'}
        </a>
      </div>
    </article>
  );
}
