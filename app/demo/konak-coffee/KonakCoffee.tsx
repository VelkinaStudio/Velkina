'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Lang = 'en' | 'tr';

type Bean = {
  origin: string;
  region: string;
  process: string;
  roastDate: string;
  notes: string[];
  weight: string;
  price: string;
  current?: boolean;
};

type Brew = {
  id: 'espresso' | 'filter' | 'home';
  label: { en: string; tr: string };
  recipe: { step: string; sec: number }[]; // cumulative seconds
  drinks: { en: string; tr: string; priceTL: number }[];
};

const BEANS: Bean[] = [
  {
    origin: 'Ethiopia',
    region: 'Yirgacheffe · Gedeb',
    process: 'Washed',
    roastDate: '2026-05-12',
    notes: ['Jasmine', 'Bergamot', 'Lemon zest'],
    weight: '250g',
    price: '₺520',
    current: true
  },
  {
    origin: 'Kenya',
    region: 'Nyeri · AA',
    process: 'Washed',
    roastDate: '2026-05-12',
    notes: ['Blackcurrant', 'Tomato', 'Sugarcane'],
    weight: '250g',
    price: '₺560'
  },
  {
    origin: 'Colombia',
    region: 'Huila · Inzá',
    process: 'Honey',
    roastDate: '2026-05-12',
    notes: ['Red apple', 'Caramel', 'Walnut'],
    weight: '250g',
    price: '₺480'
  },
  {
    origin: 'House blend',
    region: 'Konak · 70/30',
    process: 'Washed + natural',
    roastDate: '2026-05-12',
    notes: ['Milk chocolate', 'Hazelnut', 'Brown sugar'],
    weight: '250g',
    price: '₺420'
  }
];

const BREWS: Brew[] = [
  {
    id: 'espresso',
    label: { en: 'Espresso bar', tr: 'Espresso bar' },
    recipe: [
      { step: '18g in', sec: 0 },
      { step: 'tamp', sec: 8 },
      { step: 'pre-infuse', sec: 14 },
      { step: 'first drops', sec: 18 },
      { step: '36g out', sec: 28 }
    ],
    drinks: [
      { en: 'Espresso', tr: 'Espresso', priceTL: 55 },
      { en: 'Cortado', tr: 'Cortado', priceTL: 75 },
      { en: 'Flat white', tr: 'Flat white', priceTL: 90 },
      { en: 'Cappuccino', tr: 'Cappuccino', priceTL: 90 },
      { en: 'Latte', tr: 'Latte', priceTL: 95 },
      { en: 'Iced shakerato', tr: 'Iced shakerato', priceTL: 95 }
    ]
  },
  {
    id: 'filter',
    label: { en: 'Filter bar', tr: 'Filtre bar' },
    recipe: [
      { step: 'rinse', sec: 0 },
      { step: 'bloom', sec: 30 },
      { step: 'first pour', sec: 60 },
      { step: 'second', sec: 120 },
      { step: 'drawdown', sec: 210 },
      { step: 'serve', sec: 240 }
    ],
    drinks: [
      { en: 'V60 — single origin', tr: 'V60 — tek menşeli', priceTL: 110 },
      { en: 'Aeropress', tr: 'Aeropress', priceTL: 95 },
      { en: 'Chemex (for two)', tr: 'Chemex (iki kişilik)', priceTL: 180 },
      { en: 'Cold brew', tr: 'Cold brew', priceTL: 95 }
    ]
  },
  {
    id: 'home',
    label: { en: 'Brewed at home', tr: 'Evde demle' },
    recipe: [
      { step: '50g coffee', sec: 0 },
      { step: '1L cold water', sec: 6 },
      { step: '18h fridge', sec: 12 },
      { step: 'strain', sec: 18 },
      { step: 'serve', sec: 22 }
    ],
    drinks: [
      { en: '250g beans · single origin', tr: '250g çekirdek · tek menşeli', priceTL: 520 },
      { en: '250g beans · house blend', tr: '250g çekirdek · ev karışımı', priceTL: 420 },
      { en: 'Aeropress kit + 250g', tr: 'Aeropress seti + 250g', priceTL: 1450 },
      { en: 'V60 kit + 250g', tr: 'V60 seti + 250g', priceTL: 1280 }
    ]
  }
];

const COPY = {
  en: {
    nav: { menu: 'Menu', beans: 'Beans', visit: 'Visit' },
    hero: {
      label: 'Single origin · roasted Monday · brewed by hand',
      h1Lead: 'Coffee, made the',
      h1Italic: 'long way.',
      sub: 'A small roastery and bar on the old peninsula. Two espresso machines, three filter stations, and a quiet table for the manual brew. No iPad ordering, no plastic stamps.',
      cta: 'See the menu →',
      cta2: 'Beans this week →'
    },
    timer: {
      label: 'Brewing — espresso',
      sub: 'A double espresso, start to cup.'
    },
    beansHeading: 'Beans on the bar this week.',
    beansSub: 'Roasted in-house every Monday. Brewed Tuesday through Sunday. What we run out of, we don\'t fake.',
    visit: {
      h: 'Find the bar.',
      addr: 'Çukurcuma Caddesi 47\nBeyoğlu, 34425 İstanbul',
      hoursH: 'Open every day',
      hours: 'Mon–Fri  07:30 — 19:00\nSat–Sun 09:00 — 19:00',
      contact: 'hello@konakcoffee.co · +90 212 555 04 18',
      direction: "Five minutes' walk from Tophane tram. Two doors from Çukurcuma Hamamı."
    }
  },
  tr: {
    nav: { menu: 'Menü', beans: 'Çekirdekler', visit: 'Ziyaret' },
    hero: {
      label: 'Tek menşeli · pazartesi kavrulur · elde demlenir',
      h1Lead: 'Kahve,',
      h1Italic: 'eski usul.',
      sub: 'Eski yarımadada küçük bir kavurucu ve bar. İki espresso makinesi, üç filtre istasyonu, manuel demleme için sakin bir masa. Tablet sipariş yok, plastik damga yok.',
      cta: 'Menüye bak →',
      cta2: 'Bu haftaki çekirdekler →'
    },
    timer: {
      label: 'Demleniyor — espresso',
      sub: 'Bir double espresso, baştan fincana.'
    },
    beansHeading: 'Bu hafta barın üstündeki çekirdekler.',
    beansSub: 'Her pazartesi içeride kavrulur. Salıdan pazara demlenir. Bittiği gün taklit etmiyoruz.',
    visit: {
      h: 'Bar nerede.',
      addr: 'Çukurcuma Caddesi 47\nBeyoğlu, 34425 İstanbul',
      hoursH: 'Her gün açık',
      hours: 'Pzt–Cum  07:30 — 19:00\nCmt–Paz  09:00 — 19:00',
      contact: 'hello@konakcoffee.co · +90 212 555 04 18',
      direction: 'Tophane tramvayından beş dakika yürüyüş. Çukurcuma Hamamı\'nın iki kapı ötesi.'
    }
  }
} as const;

export default function KonakCoffee() {
  const [lang, setLang] = useState<Lang>('en');
  const [seconds, setSeconds] = useState(0); // 0..28 for espresso loop

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s >= 28 ? 0 : s + 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const c = COPY[lang];

  // Espresso recipe progress
  const espresso = BREWS[0];
  const activeStep = useMemo(() => {
    let last = 0;
    for (let i = 0; i < espresso.recipe.length; i++) {
      if (seconds >= espresso.recipe[i].sec) last = i;
    }
    return last;
  }, [seconds]);

  return (
    <div
      style={{
        background: '#0E0B08',
        color: '#F4EBDB',
        minHeight: '100dvh',
        fontFamily: 'var(--font-inter), Inter, sans-serif'
      }}
    >
      {/* Top bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(14,11,8,0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(244,235,219,0.08)'
        }}
      >
        <div
          className="vk-container"
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div className="font-heading" style={{ letterSpacing: '0.22em', fontWeight: 600, fontSize: '0.9rem' }}>
            KONAK
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <a href="#menu" style={{ color: '#C0B6A2', fontSize: '0.88rem' }}>{c.nav.menu}</a>
            <a href="#beans" style={{ color: '#C0B6A2', fontSize: '0.88rem' }}>{c.nav.beans}</a>
            <a href="#visit" style={{ color: '#C0B6A2', fontSize: '0.88rem' }}>{c.nav.visit}</a>
            <div style={{ display: 'inline-flex', gap: 6, paddingLeft: 14, borderLeft: '1px solid rgba(244,235,219,0.14)' }}>
              {(['en', 'tr'] as const).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: lang === l ? '#F4EBDB' : '#736959',
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

      {/* HERO — brew timer signature */}
      <section style={{ padding: '4rem 0 3rem', position: 'relative' }}>
        <div className="vk-container">
          <div style={{ display: 'grid', gap: '3rem', alignItems: 'start' }} className="lg:grid-cols-12">
            <div style={{ gridColumn: 'span 7' }} className="lg:col-span-7">
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#9B8E72'
                }}
              >
                {c.hero.label}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-sora), Sora, sans-serif',
                  fontSize: 'clamp(2.75rem, 11vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  fontWeight: 500,
                  margin: '1.5rem 0 0',
                  maxWidth: '11ch'
                }}
              >
                {c.hero.h1Lead}{' '}
                <span
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: '#E8A55C'
                  }}
                >
                  {c.hero.h1Italic}
                </span>
              </h1>
              <p
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.55,
                  color: '#C0B6A2',
                  marginTop: '1.5rem',
                  maxWidth: '42ch'
                }}
              >
                {c.hero.sub}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: '2rem' }}>
                <a
                  href="#menu"
                  style={{
                    background: '#F4EBDB',
                    color: '#0E0B08',
                    padding: '12px 22px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    minHeight: 44,
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  {c.hero.cta}
                </a>
                <a
                  href="#beans"
                  style={{
                    background: 'transparent',
                    color: '#F4EBDB',
                    padding: '12px 22px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    minHeight: 44,
                    border: '1px solid rgba(244,235,219,0.18)',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  {c.hero.cta2}
                </a>
              </div>
            </div>

            {/* Brew timer */}
            <div style={{ gridColumn: 'span 5' }} className="lg:col-span-5">
              <div
                style={{
                  border: '1px solid rgba(244,235,219,0.16)',
                  borderRadius: 18,
                  padding: '1.5rem 1.5rem 1.25rem',
                  background: 'linear-gradient(180deg, #15110C 0%, #0E0B08 100%)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#9B8E72',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: '#E8A55C',
                      animation: 'konak-pulse 1.4s ease-in-out infinite'
                    }}
                  />
                  {c.timer.label}
                </div>

                {/* Big timer */}
                <div
                  style={{
                    fontFamily: 'var(--font-sora), Sora, sans-serif',
                    fontSize: 'clamp(3.5rem, 14vw, 6rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.95,
                    marginTop: '0.5rem',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  0:{String(seconds).padStart(2, '0')}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontStyle: 'italic',
                    color: '#C0B6A2',
                    marginTop: '0.25rem',
                    fontSize: '0.95rem'
                  }}
                >
                  {c.timer.sub}
                </div>

                {/* Steps */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0' }}>
                  {espresso.recipe.map((r, i) => {
                    const done = i <= activeStep;
                    const next = i === activeStep + 1;
                    return (
                      <li
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '52px 1fr',
                          alignItems: 'center',
                          gap: 12,
                          padding: '8px 0',
                          borderTop: i === 0 ? 'none' : '1px solid rgba(244,235,219,0.08)',
                          opacity: done ? 1 : next ? 0.85 : 0.4,
                          color: done ? '#F4EBDB' : '#C0B6A2',
                          transition: 'opacity 320ms ease, color 320ms ease'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '0.8rem',
                            letterSpacing: '0.06em',
                            fontVariantNumeric: 'tabular-nums',
                            color: done ? '#E8A55C' : '#736959'
                          }}
                        >
                          0:{String(r.sec).padStart(2, '0')}
                        </span>
                        <span style={{ fontSize: '0.95rem' }}>
                          {r.step}
                          {done && i === activeStep ? (
                            <span style={{ color: '#E8A55C', marginLeft: 8, fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem' }}>now</span>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEANS — labels carousel */}
      <section id="beans" style={{ padding: '4rem 0', borderTop: '1px solid rgba(244,235,219,0.08)' }}>
        <div className="vk-container">
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#9B8E72'
            }}
          >
            {lang === 'en' ? 'On the bar · week 19' : 'Barda · hafta 19'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sora), Sora, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              margin: '1rem 0 0',
              maxWidth: '20ch'
            }}
          >
            {c.beansHeading}
          </h2>
          <p style={{ color: '#C0B6A2', maxWidth: '52ch', marginTop: '1rem', lineHeight: 1.5 }}>
            {c.beansSub}
          </p>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div
            style={{
              display: 'grid',
              gridAutoColumns: 'minmax(280px, 1fr)',
              gridAutoFlow: 'column',
              gap: '1rem',
              marginTop: '2.5rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 8
            }}
            className="lg:grid-flow-row lg:grid-cols-4 lg:grid-auto-cols-auto"
          >
            {BEANS.map((b, i) => (
              <article
                key={i}
                style={{
                  border: '1px solid rgba(244,235,219,0.12)',
                  borderRadius: 12,
                  padding: '1.25rem',
                  background: b.current ? 'linear-gradient(180deg, rgba(232,165,92,0.06) 0%, transparent 100%)' : 'transparent',
                  scrollSnapAlign: 'start',
                  position: 'relative'
                }}
              >
                {b.current && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.62rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#E8A55C',
                      border: '1px solid #E8A55C',
                      padding: '2px 8px',
                      borderRadius: 999
                    }}
                  >
                    {lang === 'en' ? 'Now pouring' : 'Şimdi'}
                  </span>
                )}
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9B8E72' }}>
                  Lot {String(i + 1).padStart(2, '0')} · {b.process}
                </div>
                <div style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', marginTop: 10 }}>
                  {b.origin}
                </div>
                <div style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', color: '#C0B6A2', marginTop: 2 }}>
                  {b.region}
                </div>

                <hr style={{ border: 0, borderTop: '1px solid rgba(244,235,219,0.1)', margin: '1.25rem 0' }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {b.notes.map(n => (
                    <li
                      key={n}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.7rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#F4EBDB',
                        border: '1px solid rgba(244,235,219,0.18)',
                        padding: '2px 8px',
                        borderRadius: 4
                      }}
                    >
                      {n}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', color: '#736959' }}>
                    {lang === 'en' ? 'Roasted' : 'Kavruldu'} {b.roastDate}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.95rem', color: '#F4EBDB' }}>
                    {b.weight} · {b.price}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MENU — split by brew method */}
      <section id="menu" style={{ padding: '4rem 0', borderTop: '1px solid rgba(244,235,219,0.08)' }}>
        <div className="vk-container">
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#9B8E72'
            }}
          >
            {lang === 'en' ? 'Menu — by brew method' : 'Menü — demleme yöntemine göre'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sora), Sora, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              margin: '1rem 0 0',
              maxWidth: '18ch'
            }}
          >
            {lang === 'en' ? (
              <>How do you want it{' '}<span style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#E8A55C' }}>brewed?</span></>
            ) : (
              <>Nasıl{' '}<span style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#E8A55C' }}>demlensin?</span></>
            )}
          </h2>

          <div style={{ display: 'grid', gap: '2.5rem', marginTop: '2.5rem' }} className="lg:grid-cols-3">
            {BREWS.map(brew => (
              <div key={brew.id}>
                <div
                  style={{
                    fontFamily: 'var(--font-sora), Sora, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    letterSpacing: '-0.015em',
                    marginBottom: 12
                  }}
                >
                  {brew.label[lang]}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {brew.drinks.map((d, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '14px 0',
                        borderTop: '1px solid rgba(244,235,219,0.08)',
                        gap: 12
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1rem' }}>
                        {d[lang]}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '0.88rem',
                          color: '#C0B6A2',
                          fontVariantNumeric: 'tabular-nums'
                        }}
                      >
                        ₺{d.priceTL}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section
        id="visit"
        style={{
          padding: '4rem 0',
          borderTop: '1px solid rgba(244,235,219,0.08)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(232,165,92,0.04) 100%)'
        }}
      >
        <div className="vk-container">
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#9B8E72'
            }}
          >
            {lang === 'en' ? 'Visit · Beyoğlu' : 'Ziyaret · Beyoğlu'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sora), Sora, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              margin: '1rem 0 0',
              maxWidth: '14ch'
            }}
          >
            {c.visit.h}
          </h2>

          <div style={{ display: 'grid', gap: '2.5rem', marginTop: '2.5rem' }} className="lg:grid-cols-2">
            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9B8E72' }}>
                {lang === 'en' ? 'Address' : 'Adres'}
              </div>
              <div style={{ marginTop: 10, fontSize: '1.0625rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{c.visit.addr}</div>

              <div style={{ marginTop: 24, fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9B8E72' }}>
                {c.visit.hoursH}
              </div>
              <div style={{ marginTop: 10, fontSize: '1.0625rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{c.visit.hours}</div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9B8E72' }}>
                {lang === 'en' ? 'Find us' : 'Bulun'}
              </div>
              <div style={{ marginTop: 10, fontSize: '1.0625rem', lineHeight: 1.5 }}>
                <span style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic' }}>{c.visit.direction}</span>
              </div>

              <div style={{ marginTop: 24, fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9B8E72' }}>
                {lang === 'en' ? 'Contact' : 'İletişim'}
              </div>
              <div style={{ marginTop: 10, fontSize: '1rem', lineHeight: 1.5 }}>{c.visit.contact}</div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(244,235,219,0.08)', padding: '2rem 0' }}>
        <div className="vk-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontSize: '0.85rem', color: '#9B8E72' }}>
          <span>© Konak · Istanbul</span>
          <Link href="/en/work/konak-coffee-house" style={{ color: '#9B8E72', textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Built by Velkina →
          </Link>
        </div>
      </footer>

      <style>{`
        @keyframes konak-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.45); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
