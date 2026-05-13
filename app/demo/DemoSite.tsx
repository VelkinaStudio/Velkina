import Link from 'next/link';

type Section = { title: string; sub?: string; tag?: string };
type Stat = { label: string; value: string };

export type DemoSiteProps = {
  brand: string;
  brandMark?: string; // 1-2 letter
  caption: string;
  headlineLead: string;
  headlineItalic: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  sectionsEyebrow: string;
  sectionsHeadingLead: string;
  sectionsHeadingItalic: string;
  sections: Section[];
  stats: Stat[];
  statsHeading: string;
  footerLine: string;
  caseSlug: string;
  palette: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    accentText: string;
  };
};

export default function DemoSite(p: DemoSiteProps) {
  const c = p.palette;
  return (
    <div style={{background: c.bg, color: c.text, minHeight: '100dvh', fontFamily: 'var(--font-inter), Inter, sans-serif'}}>
      <header style={{borderBottom: `1px solid ${c.border}`, position: 'sticky', top: 0, background: c.bg, zIndex: 10}}>
        <div className="vk-container flex items-center justify-between" style={{height: '64px'}}>
          <div className="flex items-center gap-2">
            {p.brandMark && (
              <div style={{width: 30, height: 30, borderRadius: 6, background: c.accent, color: c.accentText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13}}>
                {p.brandMark}
              </div>
            )}
            <span className="font-heading" style={{fontWeight: 600, letterSpacing: '-0.01em'}}>{p.brand}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" style={{color: c.text}}>About</a>
            <a href="#what" style={{color: c.text}}>What we do</a>
            <a href="#contact" style={{background: c.accent, color: c.accentText, padding: '8px 14px', borderRadius: '6px', textDecoration: 'none'}}>{p.primaryCta}</a>
          </nav>
          <a href="#contact" className="md:hidden" style={{background: c.accent, color: c.accentText, padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem'}}>Contact</a>
        </div>
      </header>

      <section style={{paddingBlock: '4rem'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.muted}}>{p.caption}</span>
          <h1 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 500, maxWidth: '14ch'}}>
            {p.headlineLead}{' '}
            <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: c.accent}}>{p.headlineItalic}</span>
          </h1>
          <p className="mt-6" style={{fontSize: '1.125rem', lineHeight: 1.5, color: c.muted, maxWidth: '52ch'}}>{p.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#contact" style={{background: c.accent, color: c.accentText, padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500}}>
              {p.primaryCta} →
            </a>
            <a href="#what" style={{padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500, border: `1px solid ${c.border}`, color: c.text}}>
              {p.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section id="what" style={{paddingBlock: '4rem', borderTop: `1px solid ${c.border}`}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.muted}}>{p.sectionsEyebrow}</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '16ch'}}>
            {p.sectionsHeadingLead}{' '}
            <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: c.accent}}>{p.sectionsHeadingItalic}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {p.sections.map((s, i) => (
              <div key={i} style={{background: c.surface, padding: '1.5rem', borderRadius: '10px', border: `1px solid ${c.border}`}}>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted}}>{String(i + 1).padStart(2, '0')}{s.tag ? ` · ${s.tag}` : ''}</div>
                <div className="mt-3" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.02em'}}>{s.title}</div>
                {s.sub && <div style={{color: c.muted, marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: 1.55, fontFamily: 'var(--font-serif), serif', fontStyle: 'italic'}}>{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{paddingBlock: '4rem', background: c.surface}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.muted}}>By the numbers</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '20ch'}}>
            {p.statsHeading}
          </h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {p.stats.map((s, i) => (
              <div key={i}>
                <dt style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted}}>{s.label}</dt>
                <dd className="mt-2" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.025em', color: c.text, lineHeight: 1, margin: 0}}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" style={{paddingBlock: '4rem'}}>
        <div className="vk-container" style={{maxWidth: '640px'}}>
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.muted}}>Get in touch</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500}}>
            {p.primaryCta}.
          </h2>
          <form className="mt-8 space-y-5">
            <div>
              <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: '0.5rem'}}>Name</label>
              <input required style={{width: '100%', background: c.surface, border: `1px solid ${c.border}`, padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: c.text}} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: '0.5rem'}}>Phone</label>
                <input type="tel" required style={{width: '100%', background: c.surface, border: `1px solid ${c.border}`, padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: c.text}} />
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: '0.5rem'}}>Email</label>
                <input type="email" required style={{width: '100%', background: c.surface, border: `1px solid ${c.border}`, padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: c.text}} />
              </div>
            </div>
            <div>
              <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: '0.5rem'}}>What can we help with?</label>
              <textarea rows={4} style={{width: '100%', background: c.surface, border: `1px solid ${c.border}`, padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', color: c.text, minHeight: '120px', fontFamily: 'inherit', resize: 'vertical'}}></textarea>
            </div>
            <button type="submit" style={{background: c.accent, color: c.accentText, padding: '14px 24px', borderRadius: '8px', border: 'none', minHeight: '48px', fontSize: '0.95rem', fontWeight: 500, width: '100%', cursor: 'pointer'}}>
              Send →
            </button>
          </form>
        </div>
      </section>

      <footer style={{borderTop: `1px solid ${c.border}`, paddingBlock: '2rem'}}>
        <div className="vk-container flex flex-wrap items-center justify-between gap-3" style={{fontSize: '0.85rem', color: c.muted}}>
          <span>{p.footerLine}</span>
          <Link href={`/en/work/${p.caseSlug}`} style={{color: c.muted, textDecoration: 'underline', textUnderlineOffset: '3px'}}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}
