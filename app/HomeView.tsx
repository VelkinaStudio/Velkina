import Link from 'next/link';
import HeroSceneClient from '../components/HeroSceneClient';
import CountUpClient from '../components/CountUpClient';
import MarqueeClient from '../components/MarqueeClient';
import {CONTACT, mailHref, whatsappHref} from '../lib/contact';

type Project = {
  slug: string;
  title: string;
  tag: string;
  sector: string;
  desc: string;
  url?: string;
  caseUrl?: string;
  experiment?: boolean;
  year: string;
  metrics?: string[];
};

const PROJECTS: Project[] = [
  {
    slug: 'eduturkia',
    title: 'EduTurkia',
    tag: 'Web · Bilingual · CRM',
    sector: 'Education',
    desc: 'A bilingual education-consultancy platform with admin-managed records, CRM-tracked applications and a university catalog.',
    url: 'https://www.eduturkia.com/',
    year: '2024',
    metrics: ['100% digital application tracking', 'TR/EN content', 'Significant uplift in applications'],
  },
  {
    slug: 'dr-sevim-aydin-beauty',
    title: 'Dr. Sevim Aydın Beauty',
    tag: 'Web · Booking · SEO',
    sector: 'Beauty clinic',
    desc: 'Trustworthy clinic site with an integrated online appointment system and an SEO content engine.',
    url: 'https://www.drsevimaydinbeauty.com',
    year: '2022',
    metrics: ['+40% organic visibility', '70% mobile sessions'],
  },
  {
    slug: 'tp-thermoplast',
    title: 'TP Thermoplast',
    tag: 'Web · B2B · Multilingual',
    sector: 'Manufacturing',
    desc: 'A multi-language B2B platform for an export-oriented plastics manufacturer. Lead capture, structured catalog.',
    url: 'https://tpthermoplast.com',
    year: '2023',
    metrics: ['−50% page-load time', 'Global lead capture'],
  },
  {
    slug: 'rain-group',
    title: 'Rain Group',
    tag: 'Brand · E-commerce · SEO',
    sector: 'Home décor',
    desc: 'Identity and e-commerce foundation for a home-textiles brand. Minimal, trustworthy, internationally legible.',
    url: 'https://www.raingroupas.com',
    year: '2023',
    metrics: ['+60% traffic', 'E-commerce groundwork'],
  },
  {
    slug: 'clown3d',
    title: 'Clown3D',
    tag: 'Web · 3D · Creative',
    sector: '3D studio',
    desc: 'Playful, motion-rich site for a 3D visualization studio. Strong first impression, organized portfolio.',
    url: 'https://www.clown3d.com',
    year: '2023',
    metrics: ['Animation-rich UI', 'Improved organic visibility'],
  },
  {
    slug: 'ali-cengiz-iscanli',
    title: 'Ali Cengiz İşcanlı',
    tag: 'Web · Portfolio · Art',
    sector: 'Fine art',
    desc: 'Gallery-first portfolio for an artist. Optimized imagery, multi-language content, distinct brand voice.',
    url: 'https://www.alicengiziscanli.com',
    year: '2023',
    metrics: ['Art-first presentation', 'Global reach'],
  },
  {
    slug: 'atar-avci-hukuk-burosu',
    title: 'Atar Avcı Hukuk Bürosu',
    tag: 'Web · Trust · Local SEO',
    sector: 'Law firm',
    desc: 'Authority-driven brand site with practice-area routing, contact funnels, local SEO foundation.',
    url: 'https://www.ataravci.com.tr',
    year: '2022',
    metrics: ['Authority-driven', 'Local SEO foundation'],
  },
  // ── Demos / experiments (live in /portfolio) ──
  {
    slug: 'bistro-menu',
    title: 'Bistro Menu System',
    tag: 'App · Restaurant · Cart',
    sector: 'Studio experiment',
    desc: 'Editorial restaurant menu app with categories, dietary filters, pairings and a live tab. Built without dependencies.',
    caseUrl: '/portfolio/projects/menu/',
    experiment: true,
    year: '2026',
    metrics: ['Live cart', 'Dietary filters', 'Editorial type'],
  },
  {
    slug: 'reservation-suite',
    title: 'Reservation Suite',
    tag: 'App · Booking · Calendar',
    sector: 'Studio experiment',
    desc: 'A compact booking flow — calendar, party-size logic, slot availability, instant confirmation, printable ticket.',
    caseUrl: '/portfolio/projects/booking/',
    experiment: true,
    year: '2026',
    metrics: ['Slot logic', 'Printable ticket', 'Mobile-first'],
  },
  {
    slug: 'pixel-studio',
    title: 'Pixel Studio',
    tag: 'App · Creative · Canvas',
    sector: 'Studio experiment',
    desc: 'A 16×16 pixel-art editor. Palette, fill bucket, undo, PNG export, local gallery.',
    caseUrl: '/portfolio/projects/paint/',
    experiment: true,
    year: '2026',
    metrics: ['Canvas API', 'Undo/redo', 'PNG export'],
  },
  {
    slug: 'snake-arcade',
    title: 'Snake — Coffee Break',
    tag: 'Game · Arcade · Loop',
    sector: 'Studio experiment',
    desc: 'A small piece of joy — classic snake, made smooth. Keyboard or swipe, local-storage high score.',
    caseUrl: '/portfolio/projects/snake/',
    experiment: true,
    year: '2026',
    metrics: ['Keyboard + swipe', 'Local best score', 'Three speeds'],
  },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const href = p.experiment ? (p.caseUrl ?? '#') : (p.url ?? '#');
  const target = p.experiment ? '_self' : '_blank';
  const thumbSlug = p.experiment ? 'placeholder' : p.slug;
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className="vk-work-card group reveal-on-scroll"
      data-magnetic
      aria-label={`${p.title}, ${p.sector}`}
    >
      <div className="vk-work-card__media">
        <span className="vk-work-card__corner font-mono">
          <span className="hidden md:inline">{p.year} · </span>{p.experiment ? 'Studio demo' : 'Live'}
        </span>
        {p.experiment ? (
          <ExperimentArt slug={p.slug} />
        ) : (
          <object type="image/svg+xml" data={`/projects/${thumbSlug}.svg`} aria-label={`${p.title} preview`}>
            <img src="/projects/placeholder.svg" alt={`${p.title} preview`} />
          </object>
        )}
      </div>
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="font-mono text-[11px] tracking-[.14em] uppercase text-white/50">
            <span className="text-white/80">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-white/20">/</span>{p.tag}
          </span>
        </div>
        <h3 className="font-display text-[26px] md:text-[30px] leading-[1.05] tracking-[-.02em] mb-2">{p.title}</h3>
        <p className="text-white/70 text-[15px] max-w-[52ch] mb-5">{p.desc}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="vk-tag">{p.sector}</span>
          {p.metrics?.slice(0, 1).map((m) => (
            <span key={m} className="vk-tag" style={{borderColor: 'rgba(0,255,255,.25)', color: '#9be8e0'}}>{m}</span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4">
          {p.url && (
            <span className="vk-arrow-link">
              Visit live site
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 11 L11 3 M5 3h6v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
          {p.caseUrl && (
            <span className="vk-arrow-link">
              Open the demo
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

function ExperimentArt({ slug }: { slug: string }) {
  switch (slug) {
    case 'bistro-menu':
      return (
        <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="380" fill="#1b1410"/>
          <circle cx="180" cy="200" r="120" fill="#d8a86c"/>
          <circle cx="180" cy="200" r="90" fill="#1b1410"/>
          <path d="M40 320 Q 300 270 560 320" stroke="#d8a86c" strokeWidth="2" fill="none" opacity=".55"/>
          <text x="40" y="56" fontFamily="Instrument Serif" fontSize="32" fill="#f4ece0" fontStyle="italic">— bistro</text>
          <text x="40" y="356" fontFamily="JetBrains Mono" fontSize="11" fill="#f4ece0" letterSpacing="3" opacity=".7">EDITORIAL · MENU · CART</text>
        </svg>
      );
    case 'reservation-suite':
      return (
        <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="380" fill="#0f1a1c"/>
          <g stroke="#65d6c0" strokeWidth="1" opacity=".55">
            {[100,160,220,280].map((y) => <line key={y} x1="60" y1={y} x2="540" y2={y}/>)}
            {[180,300,420].map((x) => <line key={x} x1={x} y1="80" x2={x} y2="320"/>)}
          </g>
          <circle cx="300" cy="220" r="22" fill="#65d6c0"/>
          <text x="40" y="56" fontFamily="Instrument Serif" fontSize="32" fill="#f4ece0" fontStyle="italic">— réservation</text>
          <text x="40" y="356" fontFamily="JetBrains Mono" fontSize="11" fill="#f4ece0" letterSpacing="3" opacity=".7">CALENDAR · SLOTS · TICKET</text>
        </svg>
      );
    case 'pixel-studio':
      return (
        <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="380" fill="#1a1024"/>
          <g>
            {[
              ['180','110','#00FFFF'],['220','110','#FF00CC'],['260','110','#ECE9E2'],
              ['180','150','#FF00CC'],['220','150','#00FFFF'],['260','150','#FF00CC'],
              ['180','190','#FFE066'],['220','190','#ECE9E2'],['260','190','#FFE066'],
              ['180','230','#00FFFF'],['220','230','#FF00CC'],['260','230','#00FFFF'],
            ].map(([x,y,c]) => (<rect key={String(x)+y} x={x} y={y} width="40" height="40" fill={c} />))}
          </g>
          <text x="40" y="56" fontFamily="JetBrains Mono" fontSize="14" fill="#ECE9E2" letterSpacing="3">PIXEL · 16 × 16</text>
        </svg>
      );
    case 'snake-arcade':
      return (
        <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="380" fill="#0e1410"/>
          <g fill="#7af0c0">
            {[0,1,2,3,4].map(i => (
              <rect key={i} x={120+i*30} y={200} width="28" height="28"/>
            ))}
            {[0,1,2].map(i => (
              <rect key={'v'+i} x={240} y={200-(i+1)*30} width="28" height="28"/>
            ))}
          </g>
          <rect x="440" y="120" width="22" height="22" fill="#ff5b9b"/>
          <text x="40" y="48" fontFamily="JetBrains Mono" fontSize="14" fill="#ECE9E2" letterSpacing="3">SCORE · 047</text>
        </svg>
      );
    default:
      return null;
  }
}

export default function HomeView({ messages, locale }: { messages: any; locale: string }) {
  const m = messages.home2 || {};

  return (
    <div className="font-body text-vktext">

      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative overflow-hidden" id="top">
        {/* 3D scene background */}
        <div className="vk-hero-canvas">
          <HeroSceneClient />
        </div>

        {/* Gradient blooms */}
        <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden>
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.18]" style={{background:'radial-gradient(circle, #00FFFF 0%, transparent 60%)'}} />
          <div className="absolute -bottom-40 -right-20 w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.18]" style={{background:'radial-gradient(circle, #FF00CC 0%, transparent 60%)'}} />
        </div>

        <div className="vk-container relative z-[2] pt-[clamp(96px,14vw,180px)] pb-[clamp(80px,12vw,160px)]">
          <div className="max-w-[1080px]">
            <span className="vk-eyebrow reveal-on-scroll">
              {m.heroEyebrow ?? 'Velkina · Istanbul · est. 2025'}
            </span>

            <h1 className="vk-h1 reveal-on-scroll mt-7 text-[clamp(64px,11vw,176px)]">
              <span className="block">{m.heroLine1 ?? 'We engineer'}</span>
              <span className="block">{m.heroLine2 ?? 'software clients'}</span>
              <span className="block">
                <span className="vk-grad-text font-display italic">{m.heroLine3a ?? 'can feel'}</span>
                <span>.</span>
              </span>
            </h1>

            <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-16 mt-10 md:mt-14">
              <p className="reveal-on-scroll text-[17px] md:text-[19px] text-white/75 max-w-[56ch] leading-[1.55]">
                {m.heroLead ?? 'A senior software studio in Istanbul. We design, ship and scale websites, applications and AI-powered systems for clients who care about the work after launch — speed, conversion, retention, the way the thing actually feels.'}
              </p>

              <div className="reveal-on-scroll flex items-end md:justify-end">
                <div className="flex flex-wrap items-center gap-4">
                  <Link href={`/${locale}/#cta`} className="vk-cta-pill inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20">
                    <span>{m.heroCtaPrimary ?? 'Start a project'}</span>
                    <span aria-hidden>→</span>
                  </Link>
                  <Link href={`/${locale}/use-cases`} className="vk-arrow-link">
                    <span>{m.heroCtaSecondary ?? 'See selected work'}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-14 md:mt-20 reveal-on-scroll flex flex-wrap items-baseline gap-x-10 gap-y-3 text-white/55 text-[13px] font-mono">
              <span>11 shipped projects</span>
              <span>·</span>
              <span>7 sectors</span>
              <span>·</span>
              <span>Edge-rendered</span>
              <span>·</span>
              <span>Bilingual TR / EN</span>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute left-0 right-0 bottom-6 flex justify-center pointer-events-none z-[2]">
          <div className="flex flex-col items-center gap-2 text-white/40 font-mono text-[10px] tracking-[.2em] uppercase">
            <span>scroll</span>
            <span className="block w-px h-10 bg-gradient-to-b from-white/60 to-transparent" aria-hidden />
          </div>
        </div>
      </section>

      {/* ──────────────────── MARQUEE ──────────────────── */}
      <MarqueeClient
        items={[
          m.mWeb ?? 'Websites',
          m.mApps ?? 'Applications',
          m.mAi ?? 'AI Automation',
          m.mBrand ?? 'Brand Systems',
          m.mPerf ?? 'Performance',
          m.mSeo ?? 'SEO & Growth',
        ]}
      />

      {/* ──────────────────── METRICS ──────────────────── */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="vk-section-head reveal-on-scroll">
            <span className="vk-eyebrow">{m.numbersEyebrow ?? '— By the numbers'}</span>
            <h2 className="vk-section-head__title">
              {m.numbersTitle1 ?? 'Honest measurements,'}<br/>
              <i>{m.numbersTitle2 ?? 'after launch.'}</i>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mt-12">
            {[
              { v: 11, suf: '', label: m.kpi1 ?? 'Live projects shipped' },
              { v: 40, suf: '%', label: m.kpi2 ?? 'Average organic uplift' },
              { v: 50, suf: '%', label: m.kpi3 ?? 'Faster load times' },
              { v: 7, suf: '', label: m.kpi4 ?? 'Industries served' },
            ].map((k, i) => (
              <div key={i} className="reveal-on-scroll">
                <div className="font-display text-[56px] md:text-[88px] leading-none tracking-[-.04em] vk-grad-text">
                  <span className="vk-countup" data-to={k.v} data-duration={1400}>0</span>
                  <span>{k.suf}</span>
                </div>
                <p className="mt-4 text-white/65 text-[14px] max-w-[26ch]">{k.label}</p>
              </div>
            ))}
          </div>
          <CountUpClient />
        </div>
      </section>

      {/* ──────────────────── SELECTED WORK ──────────────────── */}
      <section className="vk-section" id="work">
        <div className="vk-container">
          <div className="vk-section-head reveal-on-scroll">
            <span className="vk-eyebrow">{m.workEyebrow ?? '— Selected work'}</span>
            <h2 className="vk-section-head__title">
              {m.workTitle1 ?? 'Eleven cases,'}<br/>
              <i>{m.workTitle2 ?? 'in production today.'}</i>
            </h2>
            <p className="vk-section-head__lead">
              {m.workLead ?? 'Seven live client engagements plus four studio experiments — the kind we publish to demonstrate craft. Click any card to visit the live site or open the demo.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {PROJECTS.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 reveal-on-scroll">
            <p className="text-white/60 text-[14px] max-w-[52ch]">
              {m.workFootnote ?? 'Want a deeper case study? Each project has notes in the studio journal — typeset and printable.'}
            </p>
            <a href="/portfolio/index.html" className="vk-arrow-link">
              <span>{m.workJournalLink ?? 'Open the studio journal'}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 11 L11 3 M5 3h6v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────── PROCESS ──────────────────── */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="vk-section-head reveal-on-scroll">
            <span className="vk-eyebrow">{m.processEyebrow ?? '— How we work'}</span>
            <h2 className="vk-section-head__title">
              {m.processTitle1 ?? 'A clear cycle,'}<br/>
              <i>{m.processTitle2 ?? 'weekly demos.'}</i>
            </h2>
            <p className="vk-section-head__lead">
              {m.processLead ?? 'We move in 1–2 week sprints. Preview links every Friday, a measurable goal every cycle, a written hand-over at the end.'}
            </p>
          </div>

          <div className="vk-process reveal-on-scroll">
            <div>
              <small>01 · {m.p1k ?? 'Map'}</small>
              <h4>{m.p1t ?? 'Define the slice.'}</h4>
              <p>{m.p1d ?? 'A short call, a scoped slice of value, a written success metric. No upfront discovery PDFs.'}</p>
            </div>
            <div>
              <small>02 · {m.p2k ?? 'Design'}</small>
              <h4>{m.p2t ?? 'Tokens then pixels.'}</h4>
              <p>{m.p2d ?? 'Color, type, motion — defined as a system before any screen is signed off. Consistency is cheap when decided early.'}</p>
            </div>
            <div>
              <small>03 · {m.p3k ?? 'Ship'}</small>
              <h4>{m.p3t ?? 'Friday previews.'}</h4>
              <p>{m.p3d ?? 'Each sprint ends with a live preview link, a short demo and a roll-back plan.'}</p>
            </div>
            <div>
              <small>04 · {m.p4k ?? 'Measure'}</small>
              <h4>{m.p4t ?? 'Server-side truth.'}</h4>
              <p>{m.p4d ?? 'Server-side analytics, weekly reads, a simple experiment list. We argue with data, not opinions.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── CAPABILITIES ──────────────────── */}
      <section className="vk-section" id="capabilities">
        <div className="vk-container">
          <div className="vk-section-head reveal-on-scroll">
            <span className="vk-eyebrow">{m.capsEyebrow ?? '— Capabilities'}</span>
            <h2 className="vk-section-head__title">
              {m.capsTitle1 ?? 'What we build,'}<br/>
              <i>{m.capsTitle2 ?? 'end to end.'}</i>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { n: '01', t: m.c1t ?? 'Websites', d: m.c1d ?? 'Editorial, e-commerce and bilingual marketing sites. Edge-rendered, accessible, fast.', icon: 'M3 4h18v16H3z M3 8h18' },
              { n: '02', t: m.c2t ?? 'Applications', d: m.c2d ?? 'Custom admin panels, dashboards and user-facing apps wired to your real data.', icon: 'M4 6h16v12H4z M8 10h8 M8 14h5' },
              { n: '03', t: m.c3t ?? 'AI Automation', d: m.c3d ?? 'Agents and workflows that handle inbox, booking, content and ops — quietly, reliably.', icon: 'M12 3 L17 7 L17 14 L12 18 L7 14 L7 7 Z M12 12 L12 18' },
              { n: '04', t: m.c4t ?? 'Brand & Identity', d: m.c4d ?? 'Names, logos, type systems and motion language that survive scale.', icon: 'M5 12 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 M9 12 L15 12' },
              { n: '05', t: m.c5t ?? 'SEO & Growth', d: m.c5d ?? 'Server-side analytics, content engines and CRO experiments with measured uplift.', icon: 'M4 18 L10 12 L14 16 L20 6' },
              { n: '06', t: m.c6t ?? 'Hosting & DevOps', d: m.c6d ?? 'Vercel, Cloudflare, CI/CD with preview environments and observability you can read.', icon: 'M3 7 h18 v10 H3 z M7 17 v3 M17 17 v3 M9 12 h6' },
            ].map((c) => (
              <div key={c.n} className="vk-cap reveal-on-scroll">
                <div className="flex items-start justify-between gap-4">
                  <div className="vk-cap__icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d={c.icon} stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="vk-cap__num">{c.n}</span>
                </div>
                <h3 className="font-display text-[26px] leading-[1.05] tracking-[-.02em]">{c.t}</h3>
                <p className="text-white/70 text-[14.5px] max-w-[38ch]">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── JOURNAL PROMO ──────────────────── */}
      <section className="vk-section">
        <div className="vk-container">
          <a href="/portfolio/index.html" className="vk-journal-card reveal-on-scroll group" data-magnetic>
            <div className="vk-journal-card__body">
              <span className="vk-eyebrow">{m.jEyebrow ?? '— The studio journal'}</span>
              <h2 className="font-display text-[clamp(36px,5vw,68px)] leading-[1] tracking-[-.03em]">
                {m.jTitle ?? 'Read Issue Nº 01'} <span style={{color:'var(--vk-fg-2)', fontStyle:'italic'}}>{m.jTitleItalic ?? '— a hand-bound studio journal.'}</span>
              </h2>
              <p className="text-white/70 text-[16px] max-w-[60ch]">
                {m.jLead ?? 'Forty-eight pages of selected work, principles, plates from the kitchen and a short, honest record. Typeset like a magazine, readable end to end.'}
              </p>
              <span className="vk-arrow-link mt-2">
                <span>{m.jCta ?? 'Open the journal'}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 11 L11 3 M5 3h6v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
            <div className="vk-journal-card__media">
              <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
                <rect width="600" height="480" fill="#11121C"/>
                <g stroke="rgba(236,233,226,.18)" strokeWidth="1">
                  {[60,120,180,240,300,360,420].map(y => (<line key={y} x1="40" y1={y} x2="560" y2={y}/>))}
                </g>
                <text x="40" y="56" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="3" fill="#ECE9E2" opacity=".55">ISSUE Nº 01 · MMXXVI</text>
                <text x="40" y="180" fontFamily="Instrument Serif" fontSize="74" fill="#ECE9E2" fontStyle="italic" letterSpacing="-2">A studio</text>
                <text x="40" y="252" fontFamily="Instrument Serif" fontSize="74" fill="#ECE9E2" letterSpacing="-2">journal.</text>
                <text x="40" y="450" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="3" fill="#ECE9E2" opacity=".55">48 PAGES · HAND-BOUND</text>
                <circle cx="500" cy="380" r="44" fill="none" stroke="#FF00CC" strokeWidth="1.5" opacity=".8"/>
                <text x="500" y="385" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" fill="#FF00CC" letterSpacing="2">READ</text>
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* ──────────────────── STACK TICKER (existing brand assets) ──────────────────── */}
      <section className="vk-section" style={{paddingTop: 0}}>
        <div className="vk-container mb-12">
          <span className="vk-eyebrow reveal-on-scroll">{m.stackEyebrow ?? '— The toolkit we ship with'}</span>
          <h2 className="vk-section-head__title reveal-on-scroll mt-4">
            {m.stackTitle1 ?? 'Built on tools'}<br/>
            <i>{m.stackTitle2 ?? 'we can defend.'}</i>
          </h2>
        </div>
        <div className="relative overflow-hidden border-y border-white/10 py-10">
          <div className="ticker" data-ticker>
            {[...['nextjs','react','postgresql','vercel','cloudflare','stripe','github','aws'], ...['nextjs','react','postgresql','vercel','cloudflare','stripe','github','aws']].map((b, i) => (
              <img key={b+i} className="brand brand--bw" data-brand={b} src={`/brands/${b}.svg`} alt={b} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── CTA ──────────────────── */}
      <section className="vk-section" id="cta">
        <div className="vk-container">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
            <div className="reveal-on-scroll">
              <span className="vk-eyebrow">{m.ctaEyebrow ?? '— Get in touch'}</span>
              <h2 className="font-display text-[clamp(48px,8vw,128px)] leading-[.95] tracking-[-.04em] mt-6">
                {m.ctaTitle1 ?? 'Have something'}<br/>
                <i className="text-white/55">{m.ctaTitle2 ?? 'in mind?'}</i>
              </h2>
              <p className="mt-8 text-white/70 text-[17px] max-w-[52ch]">
                {m.ctaLead ?? 'A short call, then a written scope and a fixed price. We reply within one business day.'}
              </p>

              <a href={mailHref(messages.common?.emailSubject)} className="block mt-10 font-display italic text-[clamp(28px,4.5vw,56px)] leading-none tracking-[-.025em] border-b border-white/15 hover:border-white pb-3 transition-colors group">
                <span className="inline-flex items-center gap-4">
                  {CONTACT.email}
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path d="M3 12 H 18 M14 7 L 21 12 L 14 17" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>

            <aside className="reveal-on-scroll grid gap-7 mt-2">
              <div>
                <span className="font-mono text-[11px] tracking-[.18em] uppercase text-white/40">{m.cChannels ?? 'Channels'}</span>
                <ul className="mt-3 grid gap-2 text-[15px] text-white/80">
                  <li><a className="hover:text-white" href={mailHref(messages.common?.emailSubject)}>Email — {CONTACT.email}</a></li>
                  <li><a className="hover:text-white" href={whatsappHref(messages.common?.whatsappPrefill)} target="_blank" rel="noopener noreferrer">WhatsApp — quick start</a></li>
                  <li><a className="hover:text-white" href={CONTACT.scheduleUrl} target="_blank" rel="noopener noreferrer">Schedule — pick a 30-min slot</a></li>
                </ul>
              </div>
              <div>
                <span className="font-mono text-[11px] tracking-[.18em] uppercase text-white/40">{m.cStudio ?? 'Studio'}</span>
                <p className="mt-3 text-white/80 text-[15px]">Istanbul · Türkiye<br/>Working globally, async-first.</p>
              </div>
              <div>
                <span className="font-mono text-[11px] tracking-[.18em] uppercase text-white/40">{m.cMore ?? 'More'}</span>
                <p className="mt-3 text-[15px] grid gap-1">
                  <Link href={`/${locale}/about`} className="text-white/80 hover:text-white">About the studio →</Link>
                  <Link href={`/${locale}/services`} className="text-white/80 hover:text-white">Services & engagement →</Link>
                  <a href="/portfolio/index.html" className="text-white/80 hover:text-white">Studio journal →</a>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
