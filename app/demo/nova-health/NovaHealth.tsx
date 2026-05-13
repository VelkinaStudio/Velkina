'use client';

import * as React from 'react';
import Link from 'next/link';

type Locale = 'en' | 'tr';

const COPY = {
  en: {
    nav: { doctors: 'Doctors', clinics: 'Clinics', about: 'About', book: 'Request a visit' },
    eyebrow: 'Three clinics in Istanbul · Forty-one physicians',
    hero1: 'Healthcare that starts',
    hero2: 'with a person, not a queue.',
    heroP: 'Choose the doctor first. The clinic, the time, the room come after. Imaging reports back within twenty-four hours. Private insurance and direct pay accepted.',
    seeDoctors: 'Browse our doctors ↓',
    book: 'Request a visit',
    doctorsTitle: 'Forty-one physicians.',
    doctorsLead: 'Filter by specialty or language. Hours shown are typical clinic hours, not live availability — call to confirm a slot for the same day.',
    filterAll: 'All specialties',
    filterLang: 'Speaks',
    clinicLabel: 'Practices at',
    yearsLabel: 'in practice since',
    langsLabel: 'languages',
    hoursLabel: 'Typical hours',
    requestWith: 'Request a visit with',
    clinicsTitle: 'Three clinics, one record.',
    clinicsLead: 'Your record follows you across our three buildings. Bring an old report? We digitise it on arrival.',
    bookTitle: 'Request a visit.',
    bookLead: 'A coordinator will call within two business hours to confirm a time. We do not collect medical detail in this form — only what we need to call you back.',
    fullName: 'Full name',
    phone: 'Phone',
    preferred: 'Preferred doctor (optional)',
    notes: 'Anything we should know before calling (optional)',
    submit: 'Send request →',
    after: 'Built by Velkina →',
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  tr: {
    nav: { doctors: 'Doktorlar', clinics: 'Klinikler', about: 'Hakkımızda', book: 'Randevu talebi' },
    eyebrow: 'İstanbul’da üç klinik · Kırk bir hekim',
    hero1: 'Sıraya değil,',
    hero2: 'bir hekime gidin.',
    heroP: 'Önce doktoru seçin. Klinik, saat, oda sonradan. Görüntüleme raporları yirmi dört saat içinde. Özel sigortalar ve doğrudan ödeme kabul edilir.',
    seeDoctors: 'Hekimlerimize göz at ↓',
    book: 'Randevu talebi',
    doctorsTitle: 'Kırk bir hekim.',
    doctorsLead: 'Branşa ya da dile göre süzün. Saatler tipik klinik saatleridir, anlık müsaitlik değildir — aynı gün için lütfen arayın.',
    filterAll: 'Tüm branşlar',
    filterLang: 'Dil',
    clinicLabel: 'Çalıştığı klinik',
    yearsLabel: 'meslekte',
    langsLabel: 'dil',
    hoursLabel: 'Tipik saatleri',
    requestWith: 'Randevu talebi —',
    clinicsTitle: 'Üç klinik, tek dosya.',
    clinicsLead: 'Dosyanız üç binamızda sizinle gelir. Eski rapor mu var? Geldiğinizde dijitalleştiriyoruz.',
    bookTitle: 'Randevu talebi.',
    bookLead: 'Bir koordinatör iki iş saati içinde sizi arayıp saat verir. Bu formda tıbbi detay almıyoruz — sadece sizi aramak için gereken bilgileri.',
    fullName: 'Ad Soyad',
    phone: 'Telefon',
    preferred: 'Tercih ettiğiniz hekim (opsiyonel)',
    notes: 'Aramadan önce bilmemiz iyi olur mu? (opsiyonel)',
    submit: 'Talebi gönder →',
    after: 'Velkina tarafından →',
    weekdays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  }
} as const;

type SpecKey = 'family' | 'cardio' | 'derm' | 'endo' | 'ortho' | 'paed' | 'gyn' | 'neuro' | 'ent' | 'psych';

type Doctor = {
  id: string;
  name: string;
  specKey: SpecKey;
  spec: { en: string; tr: string };
  clinic: 'Şişli' | 'Kadıköy' | 'Üsküdar';
  since: number;
  langs: string[];
  photo: string;
  hours: (string | null)[];
  note?: { en: string; tr: string };
};

const SPECS: { key: SpecKey; en: string; tr: string }[] = [
  { key: 'family', en: 'Family medicine', tr: 'Aile hekimliği' },
  { key: 'cardio', en: 'Cardiology', tr: 'Kardiyoloji' },
  { key: 'derm', en: 'Dermatology', tr: 'Dermatoloji' },
  { key: 'endo', en: 'Endocrinology', tr: 'Endokrinoloji' },
  { key: 'ortho', en: 'Orthopaedics', tr: 'Ortopedi' },
  { key: 'paed', en: 'Paediatrics', tr: 'Pediatri' },
  { key: 'gyn', en: 'Gynaecology', tr: 'Kadın doğum' },
  { key: 'neuro', en: 'Neurology', tr: 'Nöroloji' },
  { key: 'ent', en: 'ENT', tr: 'KBB' },
  { key: 'psych', en: 'Psychiatry', tr: 'Psikiyatri' },
];

const PHOTO = (seed: string) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=600&q=70`;

const DOCTORS: Doctor[] = [
  {
    id: 'demir-aksoy',
    name: 'Dr. Demir Aksoy',
    specKey: 'family',
    spec: { en: 'Family medicine', tr: 'Aile hekimliği' },
    clinic: 'Şişli',
    since: 2008,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1612349317150-e413f6a5b16d'),
    hours: ['08:00 – 17:00', '08:00 – 17:00', '08:00 – 17:00', '08:00 – 13:00', '08:00 – 17:00', null],
    note: { en: 'Same-day intake. Accepts walk-ins until 11:00.', tr: 'Aynı gün muayene. 11:00’a kadar randevusuz kabul.' },
  },
  {
    id: 'leyla-kaya',
    name: 'Dr. Leyla Kaya',
    specKey: 'cardio',
    spec: { en: 'Cardiology', tr: 'Kardiyoloji' },
    clinic: 'Şişli',
    since: 2003,
    langs: ['Türkçe', 'English', 'Deutsch'],
    photo: PHOTO('photo-1559839734-2b71ea197ec2'),
    hours: ['10:00 – 18:00', null, '10:00 – 18:00', null, '10:00 – 18:00', '09:00 – 13:00'],
    note: { en: 'ECG and stress test in-house. Reports same day.', tr: 'EKG ve efor testi merkezde. Rapor aynı gün.' },
  },
  {
    id: 'asli-celik',
    name: 'Dr. Aslı Çelik',
    specKey: 'derm',
    spec: { en: 'Dermatology', tr: 'Dermatoloji' },
    clinic: 'Kadıköy',
    since: 2011,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1594824476967-48c8b964273f'),
    hours: ['09:30 – 18:00', '09:30 – 18:00', null, '09:30 – 18:00', '09:30 – 18:00', '10:00 – 14:00'],
    note: { en: 'Dermatoscopy and mole mapping.', tr: 'Dermoskopi ve ben haritalama.' },
  },
  {
    id: 'mehmet-arslan',
    name: 'Dr. Mehmet Arslan',
    specKey: 'endo',
    spec: { en: 'Endocrinology', tr: 'Endokrinoloji' },
    clinic: 'Şişli',
    since: 2006,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1622253692010-333f2da6031d'),
    hours: ['11:00 – 18:00', '11:00 – 18:00', '11:00 – 18:00', null, null, null],
    note: { en: 'Diabetes, thyroid, hormonal disorders.', tr: 'Diyabet, tiroid, hormonal hastalıklar.' },
  },
  {
    id: 'pinar-sahin',
    name: 'Dr. Pınar Şahin',
    specKey: 'ortho',
    spec: { en: 'Orthopaedics', tr: 'Ortopedi' },
    clinic: 'Üsküdar',
    since: 2010,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1638202993928-7267aad84c31'),
    hours: ['08:30 – 17:00', '08:30 – 17:00', '08:30 – 17:00', '08:30 – 17:00', null, '09:00 – 13:00'],
    note: { en: 'Sports injuries and post-operative care.', tr: 'Spor yaralanmaları ve ameliyat sonrası bakım.' },
  },
  {
    id: 'ahmet-yildiz',
    name: 'Dr. Ahmet Yıldız',
    specKey: 'cardio',
    spec: { en: 'Cardiology', tr: 'Kardiyoloji' },
    clinic: 'Kadıköy',
    since: 1999,
    langs: ['Türkçe', 'English', 'Français'],
    photo: PHOTO('photo-1537368910025-700350fe46c7'),
    hours: [null, '14:00 – 20:00', '14:00 – 20:00', '14:00 – 20:00', '14:00 – 20:00', null],
    note: { en: 'Senior cardiologist. Evenings only.', tr: 'Kıdemli kardiyolog. Sadece akşam.' },
  },
  {
    id: 'esra-demir',
    name: 'Dr. Esra Demir',
    specKey: 'paed',
    spec: { en: 'Paediatrics', tr: 'Pediatri' },
    clinic: 'Üsküdar',
    since: 2009,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1559839914-17aae19cec71'),
    hours: ['09:00 – 17:00', '09:00 – 17:00', '09:00 – 17:00', '09:00 – 17:00', '09:00 – 17:00', '09:00 – 13:00'],
    note: { en: 'Newborn checks and vaccinations.', tr: 'Yenidoğan kontrolleri ve aşılar.' },
  },
  {
    id: 'selin-ozkan',
    name: 'Dr. Selin Özkan',
    specKey: 'gyn',
    spec: { en: 'Gynaecology', tr: 'Kadın doğum' },
    clinic: 'Şişli',
    since: 2007,
    langs: ['Türkçe', 'English', 'Italiano'],
    photo: PHOTO('photo-1607746882042-944635dfe10e'),
    hours: ['10:00 – 18:00', '10:00 – 18:00', null, '10:00 – 18:00', '10:00 – 18:00', null],
    note: { en: 'Routine screenings and prenatal care.', tr: 'Rutin tarama ve doğum öncesi bakım.' },
  },
  {
    id: 'cem-kilic',
    name: 'Dr. Cem Kılıç',
    specKey: 'neuro',
    spec: { en: 'Neurology', tr: 'Nöroloji' },
    clinic: 'Kadıköy',
    since: 2005,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1612531385446-f7e6d131e1d0'),
    hours: ['09:00 – 16:00', null, '09:00 – 16:00', null, '09:00 – 16:00', null],
    note: { en: 'Headache clinic on Wednesdays.', tr: 'Çarşamba günleri baş ağrısı kliniği.' },
  },
  {
    id: 'burcu-yilmaz',
    name: 'Dr. Burcu Yılmaz',
    specKey: 'ent',
    spec: { en: 'ENT', tr: 'KBB' },
    clinic: 'Üsküdar',
    since: 2012,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1551836022-d5d88e9218df'),
    hours: ['08:30 – 16:00', '08:30 – 16:00', '08:30 – 16:00', '08:30 – 16:00', '08:30 – 16:00', null],
    note: { en: 'Audiology and sinus diagnostics in-house.', tr: 'Odyoloji ve sinüs tanı merkezde.' },
  },
  {
    id: 'okan-tekin',
    name: 'Dr. Okan Tekin',
    specKey: 'psych',
    spec: { en: 'Psychiatry', tr: 'Psikiyatri' },
    clinic: 'Şişli',
    since: 2004,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1622902046580-2b18a6f5b3a6'),
    hours: ['12:00 – 19:00', '12:00 – 19:00', '12:00 – 19:00', '12:00 – 19:00', null, null],
    note: { en: 'Adult psychiatry. Fifty-minute sessions.', tr: 'Yetişkin psikiyatrisi. Elli dakikalık seanslar.' },
  },
  {
    id: 'fatma-arikan',
    name: 'Dr. Fatma Arıkan',
    specKey: 'family',
    spec: { en: 'Family medicine', tr: 'Aile hekimliği' },
    clinic: 'Kadıköy',
    since: 2014,
    langs: ['Türkçe', 'English'],
    photo: PHOTO('photo-1638202993928-7267aad84c31'),
    hours: ['14:00 – 21:00', '14:00 – 21:00', '14:00 – 21:00', '14:00 – 21:00', null, null],
    note: { en: 'Evening clinic for working patients.', tr: 'Çalışanlar için akşam kliniği.' },
  },
];

const CLINICS = [
  { name: 'Şişli', address: 'Halaskargazi Cad. 248', open: '07:30 — 21:00', floors: 'Imaging · Labs · Five floors' },
  { name: 'Kadıköy', address: 'Bağdat Cad. 156', open: '08:00 — 20:00', floors: 'Imaging · Cardiology suite' },
  { name: 'Üsküdar', address: 'Hâkimiyet-i Milliye Cad. 88', open: '08:00 — 19:00', floors: 'Paediatrics · Orthopaedics' },
];

const ACCENT = '#1E6B96';
const INK = '#0B1F2C';
const PAPER = '#F5F8FA';
const RULE = '#0B1F2C18';

type Copy = {
  clinicLabel: string;
  yearsLabel: string;
  requestWith: string;
  weekdays: readonly string[];
};

function DoctorCard({ d, locale, copy, onPick }: { d: Doctor; locale: Locale; copy: Copy; onPick: () => void }) {
  const years = 2026 - d.since;
  return (
    <article style={{display: 'grid', gridTemplateColumns: '110px 1fr', gap: '1.25rem', alignItems: 'start', padding: '1.5rem 0', borderTop: `1px solid ${RULE}`}}>
      <div style={{width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', background: '#E8EEF2'}}>
        <img src={d.photo} alt={d.name} loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}} />
      </div>
      <div>
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.75rem'}}>
          <h3 style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.35rem', fontWeight: 500, letterSpacing: '-0.015em', color: INK}}>{d.name}</h3>
          <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', color: ACCENT, fontSize: '1.05rem'}}>{d.spec[locale]}</span>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: '0.5rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5B6B79'}}>
          <span>{d.clinic} · {copy.clinicLabel}</span>
          <span>{years} {locale === 'en' ? 'yrs' : 'yıl'} {copy.yearsLabel}</span>
          <span>{d.langs.join(' · ')}</span>
        </div>
        {d.note && (
          <p style={{marginTop: '0.75rem', color: '#3A4A5A', fontSize: '0.97rem', lineHeight: 1.55, maxWidth: '52ch'}}>{d.note[locale]}</p>
        )}
        <div style={{marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '0.3rem', maxWidth: '460px'}}>
          {d.hours.map((h, i) => (
            <div key={i} style={{textAlign: 'center', padding: '0.4rem 0.2rem', borderRadius: '6px', background: h ? '#E8F1F7' : 'transparent', border: h ? `1px solid ${ACCENT}33` : `1px dashed ${RULE}`}}>
              <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.62rem', letterSpacing: '0.1em', color: h ? ACCENT : '#9BA5AE', textTransform: 'uppercase'}}>{copy.weekdays[i]}</div>
              <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.66rem', marginTop: '0.15rem', color: h ? INK : '#9BA5AE'}}>{h ? h.split(' – ').map(t => t.replace(':', '')).join('–') : '—'}</div>
            </div>
          ))}
        </div>
        <button onClick={onPick} style={{marginTop: '1.1rem', background: 'transparent', border: `1px solid ${INK}33`, color: INK, padding: '0.7rem 1.1rem', borderRadius: '999px', cursor: 'pointer', fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', minHeight: '44px'}}>
          {copy.requestWith} {d.name.replace('Dr. ', '')} →
        </button>
      </div>
    </article>
  );
}

export default function NovaHealth() {
  const [locale, setLocale] = React.useState<Locale>('en');
  const [filterSpec, setFilterSpec] = React.useState<SpecKey | 'all'>('all');
  const [filterLang, setFilterLang] = React.useState<string>('all');
  const [preferred, setPreferred] = React.useState<string>('');
  const copy = COPY[locale];

  const filtered = DOCTORS.filter(d => {
    if (filterSpec !== 'all' && d.specKey !== filterSpec) return false;
    if (filterLang !== 'all' && !d.langs.includes(filterLang)) return false;
    return true;
  });

  const allLangs = Array.from(new Set(DOCTORS.flatMap(d => d.langs))).sort();

  return (
    <div style={{background: '#FFFFFF', color: INK, minHeight: '100dvh', fontFamily: 'var(--font-inter), Inter, sans-serif'}}>
      <header style={{borderBottom: `1px solid ${RULE}`, position: 'sticky', top: 0, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', zIndex: 20}}>
        <div className="vk-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
            <div style={{width: 26, height: 26, borderRadius: '50%', background: ACCENT, display: 'grid', placeItems: 'center'}}>
              <span style={{color: '#fff', fontWeight: 600, fontSize: 13, letterSpacing: '-0.02em'}}>N</span>
            </div>
            <span style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontWeight: 500, letterSpacing: '-0.01em'}}>Nova Health</span>
          </div>
          <nav style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
            <a href="#doctors" className="hidden sm:inline" style={{color: INK, fontSize: '0.92rem', padding: '0 0.8rem'}}>{copy.nav.doctors}</a>
            <a href="#clinics" className="hidden sm:inline" style={{color: INK, fontSize: '0.92rem', padding: '0 0.8rem'}}>{copy.nav.clinics}</a>
            <div style={{display: 'flex', gap: '0.15rem', marginInline: '0.5rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.08em'}}>
              {(['en', 'tr'] as Locale[]).map(l => (
                <button key={l} onClick={() => setLocale(l)} style={{background: locale === l ? INK : 'transparent', color: locale === l ? '#fff' : '#5B6B79', border: `1px solid ${locale === l ? INK : RULE}`, padding: '0.35rem 0.6rem', borderRadius: '999px', cursor: 'pointer', textTransform: 'uppercase'}}>{l}</button>
              ))}
            </div>
            <a href="#book" style={{background: ACCENT, color: '#fff', padding: '0.55rem 1rem', borderRadius: '999px', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500}}>{copy.nav.book}</a>
          </nav>
        </div>
      </header>

      <section style={{paddingBlock: '5rem'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.74rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT}}>{copy.eyebrow}</span>
          <h1 style={{marginTop: '1.5rem', fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.6rem, 7.2vw, 5.4rem)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 500, maxWidth: '14ch'}}>
            {copy.hero1}{' '}
            <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: ACCENT}}>{copy.hero2}</span>
          </h1>
          <p style={{marginTop: '1.75rem', fontSize: '1.125rem', lineHeight: 1.55, color: '#3A4A5A', maxWidth: '54ch'}}>{copy.heroP}</p>
          <div style={{marginTop: '2.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem'}}>
            <a href="#doctors" style={{background: INK, color: '#fff', padding: '0.95rem 1.5rem', borderRadius: '999px', textDecoration: 'none', minHeight: '48px', display: 'inline-flex', alignItems: 'center', fontWeight: 500}}>{copy.seeDoctors}</a>
            <a href="#book" style={{padding: '0.95rem 1.5rem', borderRadius: '999px', textDecoration: 'none', minHeight: '48px', display: 'inline-flex', alignItems: 'center', fontWeight: 500, border: `1px solid ${INK}33`, color: INK}}>{copy.book}</a>
          </div>
        </div>
      </section>

      <section id="doctors" style={{paddingBlock: '4rem', background: PAPER, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`}}>
        <div className="vk-container">
          <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', alignItems: 'baseline'}}>
            <h2 style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.2rem, 5.4vw, 3.4rem)', lineHeight: 1.02, letterSpacing: '-0.025em', fontWeight: 500}}>{copy.doctorsTitle}</h2>
            <p style={{color: '#3A4A5A', maxWidth: '60ch', fontSize: '1rem', lineHeight: 1.55}}>{copy.doctorsLead}</p>
          </div>

          <div style={{marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
            <button onClick={() => setFilterSpec('all')} style={chip(filterSpec === 'all')}>{copy.filterAll}</button>
            {SPECS.map(s => (
              <button key={s.key} onClick={() => setFilterSpec(s.key)} style={chip(filterSpec === s.key)}>{s[locale]}</button>
            ))}
          </div>

          <div style={{marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center'}}>
            <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B6B79', marginRight: '0.4rem'}}>{copy.filterLang}</span>
            <button onClick={() => setFilterLang('all')} style={chipSm(filterLang === 'all')}>{copy.filterAll}</button>
            {allLangs.map(l => (
              <button key={l} onClick={() => setFilterLang(l)} style={chipSm(filterLang === l)}>{l}</button>
            ))}
          </div>

          <div style={{marginTop: '2.5rem'}}>
            {filtered.length === 0 && (
              <p style={{padding: '3rem 0', color: '#5B6B79', fontFamily: 'var(--font-serif), serif', fontStyle: 'italic'}}>
                {locale === 'en' ? 'No doctor matches that combination right now. Try widening one of the filters.' : 'Bu kombinasyona uygun hekim yok. Filtrelerden birini genişletmeyi deneyin.'}
              </p>
            )}
            {filtered.map(d => (
              <DoctorCard
                key={d.id}
                d={d}
                locale={locale}
                copy={copy}
                onPick={() => {
                  setPreferred(d.name);
                  const el = document.getElementById('book');
                  if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="clinics" style={{paddingBlock: '5rem'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.74rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT}}>{copy.nav.clinics}</span>
          <h2 style={{marginTop: '1.25rem', fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.2rem, 5.4vw, 3.4rem)', lineHeight: 1.02, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '18ch'}}>{copy.clinicsTitle}</h2>
          <p style={{marginTop: '1rem', color: '#3A4A5A', maxWidth: '54ch'}}>{copy.clinicsLead}</p>
          <div style={{marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0'}}>
            {CLINICS.map((c, i) => (
              <div key={c.name} style={{padding: '1.5rem 1.5rem 1.5rem 1.5rem', borderTop: `1px solid ${RULE}`, borderLeft: i > 0 ? `1px solid ${RULE}` : 'none'}}>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT}}>0{i + 1}</div>
                <div style={{marginTop: '0.6rem', fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.55rem', letterSpacing: '-0.02em', fontWeight: 500}}>{c.name}</div>
                <div style={{marginTop: '0.4rem', color: '#3A4A5A'}}>{c.address}</div>
                <div style={{marginTop: '0.4rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.85rem', color: INK}}>{c.open}</div>
                <div style={{marginTop: '0.6rem', fontStyle: 'italic', color: '#5B6B79', fontFamily: 'var(--font-serif), serif'}}>{c.floors}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" style={{paddingBlock: '5rem', background: PAPER, borderTop: `1px solid ${RULE}`}}>
        <div className="vk-container" style={{maxWidth: '640px'}}>
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.74rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT}}>{copy.nav.book}</span>
          <h2 style={{marginTop: '1.25rem', fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.2rem, 5.4vw, 3.4rem)', lineHeight: 1.02, letterSpacing: '-0.025em', fontWeight: 500}}>{copy.bookTitle}</h2>
          <p style={{marginTop: '1rem', color: '#3A4A5A', maxWidth: '54ch'}}>{copy.bookLead}</p>
          <form onSubmit={(e) => e.preventDefault()} style={{marginTop: '2.25rem', display: 'grid', gap: '1.25rem'}}>
            <Field label={copy.fullName} required>
              <input required style={inputStyle} />
            </Field>
            <Field label={copy.phone} required>
              <input type="tel" required style={inputStyle} />
            </Field>
            <Field label={copy.preferred}>
              <select value={preferred} onChange={e => setPreferred(e.target.value)} style={inputStyle}>
                <option value="">—</option>
                {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name} · {d.spec[locale]} · {d.clinic}</option>)}
              </select>
            </Field>
            <Field label={copy.notes}>
              <textarea rows={3} style={{...inputStyle, resize: 'vertical', minHeight: '88px', paddingTop: '0.7rem'}} />
            </Field>
            <button type="submit" style={{background: ACCENT, color: '#fff', padding: '0.95rem 1.5rem', borderRadius: '999px', border: 'none', minHeight: '48px', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer'}}>{copy.submit}</button>
          </form>
        </div>
      </section>

      <footer style={{borderTop: `1px solid ${RULE}`, paddingBlock: '2rem'}}>
        <div className="vk-container" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', fontSize: '0.85rem', color: '#5B6B79'}}>
          <span>© Nova Health · Istanbul · {locale === 'en' ? 'Healthcare network demo' : 'Sağlık ağı demo'}</span>
          <Link href="/en/work/novahealth-cloud-migration" style={{color: '#5B6B79', textDecoration: 'underline', textUnderlineOffset: '3px'}}>{copy.after}</Link>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label style={{display: 'block'}}>
      <span style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5B6B79', marginBottom: '0.45rem'}}>{label}{required && <span style={{color: ACCENT}}> *</span>}</span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#fff',
  border: `1px solid ${INK}22`,
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  fontSize: '1rem',
  minHeight: '48px',
  color: INK,
  fontFamily: 'inherit',
};

function chip(active: boolean): React.CSSProperties {
  return {
    background: active ? INK : '#FFFFFF',
    color: active ? '#FFFFFF' : INK,
    border: `1px solid ${active ? INK : RULE}`,
    padding: '0.5rem 0.9rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.88rem',
    fontFamily: 'inherit',
    minHeight: '40px',
  };
}

function chipSm(active: boolean): React.CSSProperties {
  return {
    background: active ? ACCENT : 'transparent',
    color: active ? '#fff' : '#3A4A5A',
    border: `1px solid ${active ? ACCENT : RULE}`,
    padding: '0.35rem 0.7rem',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.78rem',
    fontFamily: 'var(--font-mono), monospace',
    letterSpacing: '0.04em',
    minHeight: '34px',
  };
}
