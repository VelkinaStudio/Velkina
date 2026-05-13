import Link from 'next/link';

export const metadata = {
  title: 'Lavinia Bistro — Bucharest',
  description: 'Modern Romanian bistro. Four locations across Bucharest. View our menu in your language.',
  alternates: { canonical: '/demo/lavinia-bistro' }
};

const DISHES = [
  { name: 'Plăcintă cu spanac', desc: 'Sourdough phyllo, spinach, sheep cheese, dill.', price: '32 lei', tag: 'Vegetarian' },
  { name: 'Ciorbă rădăuţeană', desc: 'Smoked chicken sour soup, sour cream, garlic.', price: '38 lei' },
  { name: 'Sarmale + mămăligă', desc: 'Vine-leaf rolls, slow-cooked, polenta on the side.', price: '54 lei', tag: 'House' },
  { name: 'Tochitură moldovenească', desc: 'Pork stew, fried egg, smoked cheese.', price: '62 lei' },
  { name: 'Papanaşi cu dulceaţă', desc: 'Fried doughnut, sour cream, blueberry jam.', price: '34 lei' },
  { name: 'Tort de morcovi', desc: 'Single-layer carrot cake. Made daily.', price: '28 lei' }
];

const LOCATIONS = [
  { city: 'Centru Vechi', address: 'Strada Smârdan 18 · Sector 3', phone: '+40 21 555 04 11' },
  { city: 'Cotroceni', address: 'Bulevardul Eroilor 24 · Sector 6', phone: '+40 21 555 04 12' },
  { city: 'Floreasca', address: 'Calea Floreasca 91 · Sector 1', phone: '+40 21 555 04 13' },
  { city: 'Pipera', address: 'Bulevardul Pipera 1A · Voluntari', phone: '+40 21 555 04 14' }
];

export default function LaviniaBistroPage() {
  return (
    <div style={{background: '#FAF7F1', color: '#221C16', minHeight: '100dvh', fontFamily: 'var(--font-inter), Inter, sans-serif'}}>
      <header style={{borderBottom: '1px solid #221C1622', position: 'sticky', top: 0, background: 'rgba(250,247,241,0.94)', backdropFilter: 'blur(10px)', zIndex: 10}}>
        <div className="vk-container flex items-center justify-between" style={{height: '64px'}}>
          <div className="font-heading" style={{letterSpacing: '0.16em', fontWeight: 600, color: '#221C16'}}>LAVINIA · BISTRO</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#menu" style={{color: '#221C16'}}>Menu</a>
            <a href="#locations" style={{color: '#221C16'}}>Locations</a>
            <a href="#book" style={{background: '#7A2D2D', color: '#FAF7F1', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none'}}>Book a table</a>
          </nav>
          <a href="#book" className="md:hidden" style={{background: '#7A2D2D', color: '#FAF7F1', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem'}}>Book</a>
        </div>
      </header>

      <section style={{paddingBlock: '4rem'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A6B5C'}}>Modern Romanian · Four bistros · Bucharest</span>
          <h1 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.035em', fontWeight: 500, maxWidth: '14ch'}}>
            The food we grew up{' '}
            <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#7A2D2D'}}>eating.</span>
          </h1>
          <p className="mt-6" style={{fontSize: '1.125rem', lineHeight: 1.5, color: '#4A4036', maxWidth: '52ch'}}>
            Sarmale, ciorbă, papanaşi — done the way our grandmothers did, with vegetables from the Obor market and meat from the same butcher our family has used for thirty years. Four bistros, one menu, four neighbourhoods.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#book" style={{background: '#7A2D2D', color: '#FAF7F1', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500}}>
              Book a table →
            </a>
            <a href="#menu" style={{padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500, border: '1px solid #221C1633', color: '#221C16'}}>
              Read the menu
            </a>
          </div>
        </div>
      </section>

      <section id="menu" style={{paddingBlock: '4rem', borderTop: '1px solid #221C1622'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A6B5C'}}>The menu</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500}}>
            What we cook{' '}
            <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#7A2D2D'}}>this season.</span>
          </h2>
          <ul className="list-none p-0 mt-10" style={{maxWidth: '720px'}}>
            {DISHES.map((d, i) => (
              <li key={i} style={{padding: '1.25rem 0', borderBottom: '1px solid #221C1611', display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem 1rem', alignItems: 'baseline'}}>
                <div>
                  <div style={{fontWeight: 500, fontSize: '1.125rem'}}>
                    {d.name}
                    {d.tag && (
                      <span style={{marginLeft: '0.75rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A2D2D', border: '1px solid #7A2D2D55', padding: '2px 6px', borderRadius: '4px'}}>{d.tag}</span>
                    )}
                  </div>
                  <div style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', color: '#7A6B5C', fontSize: '1rem', marginTop: '0.125rem'}}>{d.desc}</div>
                </div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.95rem', color: '#221C16'}}>{d.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="locations" style={{paddingBlock: '4rem', background: '#F0E8D8'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A6B5C'}}>Locations</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '16ch'}}>
            Four bistros,{' '}
            <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: '#7A2D2D'}}>one kitchen philosophy.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {LOCATIONS.map((loc, i) => (
              <div key={i} style={{background: '#FAF7F1', padding: '1.5rem', borderRadius: '12px', border: '1px solid #221C1611'}}>
                <div style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.015em'}}>{loc.city}</div>
                <div style={{color: '#4A4036', marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: 1.5}}>{loc.address}</div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.8rem', color: '#7A6B5C', marginTop: '0.5rem'}}>{loc.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" style={{paddingBlock: '4rem'}}>
        <div className="vk-container">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A6B5C'}}>Reservations</span>
              <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '14ch'}}>
                Book a table.
              </h2>
              <p className="mt-4" style={{color: '#4A4036', maxWidth: '40ch', lineHeight: 1.6}}>
                Best to book ahead for dinner — Thursday through Saturday we sit out the door. Confirmation comes back to you on WhatsApp within minutes.
              </p>
            </div>
            <form className="lg:col-span-7 space-y-5" style={{background: '#F0E8D8', padding: '2rem', borderRadius: '12px'}}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6B5C', marginBottom: '0.5rem'}}>Name</label>
                  <input type="text" required style={{width: '100%', background: '#FAF7F1', border: '1px solid #221C1622', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#221C16'}} />
                </div>
                <div>
                  <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6B5C', marginBottom: '0.5rem'}}>Party of</label>
                  <select style={{width: '100%', background: '#FAF7F1', border: '1px solid #221C1622', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#221C16'}}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6B5C', marginBottom: '0.5rem'}}>Date</label>
                  <input type="date" required style={{width: '100%', background: '#FAF7F1', border: '1px solid #221C1622', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#221C16'}} />
                </div>
                <div>
                  <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6B5C', marginBottom: '0.5rem'}}>Time</label>
                  <select style={{width: '100%', background: '#FAF7F1', border: '1px solid #221C1622', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#221C16'}}>
                    {['12:00','13:00','19:00','19:30','20:00','20:30','21:00'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6B5C', marginBottom: '0.5rem'}}>Phone (WhatsApp)</label>
                <input type="tel" required style={{width: '100%', background: '#FAF7F1', border: '1px solid #221C1622', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#221C16'}} />
              </div>
              <button type="submit" style={{background: '#7A2D2D', color: '#FAF7F1', padding: '14px 24px', borderRadius: '8px', border: 'none', minHeight: '48px', fontSize: '0.95rem', fontWeight: 500, width: '100%', cursor: 'pointer'}}>
                Request a table →
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer style={{borderTop: '1px solid #221C1622', paddingBlock: '2rem'}}>
        <div className="vk-container flex flex-wrap items-center justify-between gap-3" style={{fontSize: '0.85rem', color: '#7A6B5C'}}>
          <span>© Lavinia Bistro · București</span>
          <Link href="/en/work/lavinia-bistro-qr-menu" style={{color: '#7A6B5C', textDecoration: 'underline', textUnderlineOffset: '3px'}}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}
