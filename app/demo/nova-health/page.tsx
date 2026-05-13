import Link from 'next/link';

export const metadata = {
  title: 'Nova Health — Healthcare network',
  description: 'Modern healthcare across Istanbul. Book online in 60 seconds.',
  alternates: { canonical: '/demo/nova-health' }
};

const SERVICES = [
  { title: 'General medicine', desc: 'Same-day appointments with a family doctor.', specialists: 14 },
  { title: 'Cardiology', desc: 'Heart screening, ECG, stress test, lipid panel.', specialists: 6 },
  { title: 'Endocrinology', desc: 'Diabetes, thyroid and hormonal disorders.', specialists: 4 },
  { title: 'Dermatology', desc: 'Skin checks, mole scans, dermatoscopy.', specialists: 5 },
  { title: 'Orthopaedics', desc: 'Joint, sports and post-surgical care.', specialists: 8 },
  { title: 'Imaging', desc: 'MRI, CT, ultrasound. Reports within 24h.', specialists: 3 }
];

const LOCATIONS = [
  { name: 'Nova Health · Şişli', address: 'Halaskargazi Cad. 248', open: '07:30 — 21:00' },
  { name: 'Nova Health · Kadıköy', address: 'Bağdat Cad. 156', open: '08:00 — 20:00' },
  { name: 'Nova Health · Üsküdar', address: 'Hâkimiyet-i Milliye Cad. 88', open: '08:00 — 19:00' }
];

export default function NovaHealthPage() {
  return (
    <div style={{background: '#FFFFFF', color: '#0B1F2C', minHeight: '100dvh', fontFamily: 'var(--font-inter), Inter, sans-serif'}}>
      <header style={{borderBottom: '1px solid #0B1F2C18', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(10px)', zIndex: 10}}>
        <div className="vk-container flex items-center justify-between" style={{height: '64px'}}>
          <div className="flex items-center gap-2">
            <div style={{width: 28, height: 28, borderRadius: 8, background: '#1E6B96', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span style={{color: '#fff', fontWeight: 600, fontSize: 14}}>N</span>
            </div>
            <span className="font-heading" style={{fontWeight: 600, letterSpacing: '-0.01em'}}>Nova Health</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" style={{color: '#0B1F2C'}}>Specialties</a>
            <a href="#locations" style={{color: '#0B1F2C'}}>Locations</a>
            <a href="#book" style={{background: '#1E6B96', color: '#fff', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none'}}>Book online</a>
          </nav>
          <a href="#book" className="md:hidden" style={{background: '#1E6B96', color: '#fff', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem'}}>Book</a>
        </div>
      </header>

      <section style={{paddingBlock: '4rem'}}>
        <div className="vk-container">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1E6B96'}}>Three clinics · Istanbul</span>
              <h1 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 500, maxWidth: '14ch'}}>
                Modern healthcare,{' '}
                <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#1E6B96'}}>booked in 60 seconds.</span>
              </h1>
              <p className="mt-6" style={{fontSize: '1.125rem', lineHeight: 1.5, color: '#4A5A6A', maxWidth: '52ch'}}>
                Forty specialists across three clinics. Same-day appointments for general medicine. Reports back within 24 hours for imaging. We accept private insurance and direct pay.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#book" style={{background: '#1E6B96', color: '#fff', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500}}>
                  Book online →
                </a>
                <a href="#services" style={{padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500, border: '1px solid #0B1F2C33', color: '#0B1F2C'}}>
                  Browse specialties
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div style={{background: '#F0F6FA', padding: '1.5rem', borderRadius: '12px', border: '1px solid #1E6B9622'}}>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A5A6A'}}>Today · Şişli clinic</div>
                <div className="mt-3 space-y-2">
                  {[
                    { spec: 'General medicine', slots: '4 slots' },
                    { spec: 'Cardiology', slots: 'Next: 14:30' },
                    { spec: 'Dermatology', slots: '2 slots' },
                    { spec: 'Imaging', slots: 'Next: 16:00' }
                  ].map((s, i) => (
                    <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: i < 3 ? '1px solid #1E6B9622' : 'none'}}>
                      <span>{s.spec}</span>
                      <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.85rem', color: '#1E6B96', fontWeight: 500}}>{s.slots}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={{paddingBlock: '4rem', background: '#F7FAFC'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1E6B96'}}>Specialties</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '16ch'}}>
            What we treat.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {SERVICES.map((s, i) => (
              <div key={i} style={{background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #0B1F2C11'}}>
                <div style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.015em'}}>{s.title}</div>
                <div style={{color: '#4A5A6A', marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: 1.55}}>{s.desc}</div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', color: '#1E6B96', marginTop: '1rem', letterSpacing: '0.04em'}}>{s.specialists} specialists</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" style={{paddingBlock: '4rem'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1E6B96'}}>Locations</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '16ch'}}>
            Three clinics across Istanbul.
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {LOCATIONS.map((loc, i) => (
              <div key={i} style={{padding: '1.5rem', borderLeft: '2px solid #1E6B96'}}>
                <div style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.25rem', fontWeight: 500}}>{loc.name}</div>
                <div style={{color: '#4A5A6A', marginTop: '0.5rem'}}>{loc.address}</div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.85rem', color: '#1E6B96', marginTop: '0.5rem'}}>{loc.open}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" style={{paddingBlock: '4rem', background: '#F7FAFC'}}>
        <div className="vk-container" style={{maxWidth: '640px'}}>
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1E6B96'}}>Booking</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500}}>
            Book a visit.
          </h2>
          <form className="mt-8 space-y-5">
            <div>
              <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A5A6A', marginBottom: '0.5rem'}}>Full name</label>
              <input required style={{width: '100%', background: '#fff', border: '1px solid #0B1F2C22', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px'}} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A5A6A', marginBottom: '0.5rem'}}>Phone</label>
                <input type="tel" required style={{width: '100%', background: '#fff', border: '1px solid #0B1F2C22', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px'}} />
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A5A6A', marginBottom: '0.5rem'}}>Specialty</label>
                <select style={{width: '100%', background: '#fff', border: '1px solid #0B1F2C22', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px'}}>
                  {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" style={{background: '#1E6B96', color: '#fff', padding: '14px 24px', borderRadius: '8px', border: 'none', minHeight: '48px', fontSize: '0.95rem', fontWeight: 500, width: '100%', cursor: 'pointer'}}>
              Request appointment →
            </button>
          </form>
        </div>
      </section>

      <footer style={{borderTop: '1px solid #0B1F2C18', paddingBlock: '2rem'}}>
        <div className="vk-container flex flex-wrap items-center justify-between gap-3" style={{fontSize: '0.85rem', color: '#4A5A6A'}}>
          <span>© Nova Health · Istanbul</span>
          <Link href="/en/work/novahealth-cloud-migration" style={{color: '#4A5A6A', textDecoration: 'underline', textUnderlineOffset: '3px'}}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}
