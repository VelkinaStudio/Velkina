import Link from 'next/link';

export const metadata = {
  title: 'Konak Coffee House — Istanbul',
  description: 'Single-origin coffee, brewed by hand, served on Istanbul\'s old peninsula. Order online for pickup.',
  alternates: { canonical: '/demo/konak-coffee' }
};

type Item = { name: string; desc: string; price: string; tag?: string };

const MENU: { section: string; items: Item[] }[] = [
  {
    section: 'Espresso bar',
    items: [
      { name: 'Espresso', desc: 'Konak House blend. Double shot, 18g in, 38g out.', price: '₺55' },
      { name: 'Cortado', desc: 'Two parts espresso, two parts silky milk.', price: '₺75', tag: 'Most ordered' },
      { name: 'Flat white', desc: 'Made the right way. No latte art ego.', price: '₺85' },
      { name: 'Iced shakerato', desc: 'Espresso shaken with ice and a single sugar.', price: '₺85' }
    ]
  },
  {
    section: 'Brew bar',
    items: [
      { name: 'Filter — Kenya AA', desc: 'Bright, blackcurrant, citrus finish.', price: '₺95', tag: 'New origin' },
      { name: 'Filter — Ethiopia Yirgacheffe', desc: 'Floral, peach, tea-like body.', price: '₺95' },
      { name: 'Aeropress — choose origin', desc: 'Quick brew. Ask the barista.', price: '₺85' },
      { name: 'Cold brew', desc: '18-hour drip. Served black or with milk.', price: '₺90' }
    ]
  },
  {
    section: 'From the kitchen',
    items: [
      { name: 'Sourdough toast · feta + tomato', desc: 'Mihalıç feta, sungold tomato, oregano.', price: '₺160' },
      { name: 'Avocado, lime, sumac', desc: 'On sourdough. Optional poached egg.', price: '₺180' },
      { name: 'Mantı pide', desc: 'House-made manti on a stretched pide.', price: '₺195' },
      { name: 'Walnut & date loaf', desc: 'Baked in-house every morning.', price: '₺85' }
    ]
  },
  {
    section: 'Take home',
    items: [
      { name: '250g — House blend', desc: 'Comp / Honduras / Brazil. Whole bean.', price: '₺380' },
      { name: '250g — Single origin (rotating)', desc: 'Ask about this week\'s lot.', price: '₺420' },
      { name: 'Coffee class · weekends', desc: 'Two hours, four brews. Limit 6 people.', price: '₺850 / person' }
    ]
  }
];

export default function KonakCoffeePage() {
  return (
    <div style={{background: '#F4EFE6', color: '#1B1812', minHeight: '100dvh', fontFamily: 'var(--font-inter), Inter, sans-serif'}}>
      <header style={{borderBottom: '1px solid #1B181222', position: 'sticky', top: 0, background: 'rgba(244,239,230,0.94)', backdropFilter: 'blur(10px)', zIndex: 10}}>
        <div className="vk-container flex items-center justify-between" style={{height: '64px'}}>
          <div className="font-heading" style={{letterSpacing: '0.18em', fontWeight: 600, color: '#1B1812'}}>KONAK · COFFEE HOUSE</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#menu" style={{color: '#1B1812'}}>Menu</a>
            <a href="#visit" style={{color: '#1B1812'}}>Visit</a>
            <a href="#order" style={{color: '#1B1812'}}>Order</a>
            <a href="#order" style={{background: '#1B1812', color: '#F4EFE6', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none'}}>Order pickup</a>
          </nav>
          <a href="#order" className="md:hidden" style={{background: '#1B1812', color: '#F4EFE6', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem'}}>Order</a>
        </div>
      </header>

      <section className="vk-section" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
        <div className="vk-container">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5851'}}>
                Single origin · brewed by hand · Beyoğlu
              </span>
              <h1 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.035em', fontWeight: 500, maxWidth: '14ch'}}>
                Coffee, slowly,{' '}
                <span style={{fontFamily: 'var(--font-serif), "Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400}}>
                  in the morning.
                </span>
              </h1>
              <p className="mt-6" style={{fontSize: '1.125rem', lineHeight: 1.5, color: '#3A352E', maxWidth: '52ch'}}>
                A small roastery and coffee bar on the old peninsula. Single-origin beans roasted on Monday, brewed by hand from Tuesday. Order ahead for pickup, or sit down with a book.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#order" style={{background: '#1B1812', color: '#F4EFE6', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500}}>
                  Order pickup →
                </a>
                <a href="#menu" style={{background: 'transparent', color: '#1B1812', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', fontWeight: 500, border: '1px solid #1B181233'}}>
                  See the menu
                </a>
              </div>
            </div>

            <aside className="lg:col-span-5" style={{borderLeft: '1px solid #1B181222', paddingLeft: '1.5rem'}}>
              <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851'}}>Open today</div>
              <div className="mt-2" style={{fontSize: '1.5rem', fontFamily: 'var(--font-sora), Sora, sans-serif', fontWeight: 500}}>
                07:30 — 19:00
              </div>
              <hr style={{borderColor: '#1B181211', margin: '1.25rem 0'}} />
              <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851'}}>This week</div>
              <div className="mt-2">
                <div style={{fontWeight: 500}}>Kenya AA — Nyeri</div>
                <div style={{color: '#5C5851', fontStyle: 'italic'}}>Blackcurrant, citrus, tea finish.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="vk-section" style={{paddingBlock: '4rem', borderTop: '1px solid #1B181222'}}>
        <div className="vk-container">
          <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5851'}}>The menu</span>
          <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500}}>
            What we're pouring{' '}
            <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400}}>today.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-12 mt-12">
            {MENU.map((s, si) => (
              <div key={si}>
                <h3 style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5851', paddingBottom: '0.75rem', borderBottom: '1px solid #1B181222'}}>
                  {s.section}
                </h3>
                <ul className="list-none p-0 m-0">
                  {s.items.map((it, ii) => (
                    <li key={ii} style={{padding: '1rem 0', borderBottom: '1px solid #1B181211', display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem 1rem', alignItems: 'baseline'}}>
                      <div>
                        <div style={{fontWeight: 500, fontSize: '1.0625rem'}}>
                          {it.name}
                          {it.tag && (
                            <span style={{marginLeft: '0.75rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A5A3A', border: '1px solid #7A5A3A55', padding: '2px 6px', borderRadius: '4px'}}>
                              {it.tag}
                            </span>
                          )}
                        </div>
                        <div style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', color: '#5C5851', fontSize: '0.98rem', marginTop: '0.125rem'}}>{it.desc}</div>
                      </div>
                      <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.92rem', color: '#1B1812'}}>{it.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="vk-section" style={{paddingBlock: '4rem', background: '#EAE3D5'}}>
        <div className="vk-container">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5851'}}>Visit</span>
              <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '14ch'}}>
                On the old peninsula,{' '}
                <span style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400}}>five minutes from the tram.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851'}}>Address</div>
                <div className="mt-2" style={{fontSize: '1.0625rem', lineHeight: 1.55}}>
                  Çukurcuma Caddesi 47<br />
                  Beyoğlu, 34425 İstanbul
                </div>
              </div>
              <div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851'}}>Hours</div>
                <div className="mt-2" style={{fontSize: '1.0625rem', lineHeight: 1.55}}>
                  Mon–Fri 07:30 — 19:00<br />
                  Sat–Sun 09:00 — 19:00
                </div>
              </div>
              <div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851'}}>Find us</div>
                <div className="mt-2" style={{fontSize: '1.0625rem', lineHeight: 1.55}}>
                  Five minutes' walk from Tophane tram.<br />
                  Two doors from Çukurcuma Hamamı.
                </div>
              </div>
              <div>
                <div style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851'}}>Contact</div>
                <div className="mt-2" style={{fontSize: '1.0625rem', lineHeight: 1.55}}>
                  hello@konakcoffee.co<br />
                  +90 212 555 04 18
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order */}
      <section id="order" className="vk-section" style={{paddingBlock: '4rem'}}>
        <div className="vk-container">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <span style={{fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C5851'}}>Order ahead</span>
              <h2 className="mt-5" style={{fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: '14ch'}}>
                Skip the queue.
              </h2>
              <p className="mt-5" style={{color: '#3A352E', maxWidth: '40ch', lineHeight: 1.6}}>
                Place your order from your phone on the way in. We'll have it on the counter the minute you walk in. Pickup slots every five minutes.
              </p>
            </div>
            <form className="lg:col-span-7 space-y-5" style={{background: '#FFFFFF99', padding: '2rem', border: '1px solid #1B181222', borderRadius: '12px'}}>
              <div>
                <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851', marginBottom: '0.5rem'}}>Your name</label>
                <input type="text" required style={{width: '100%', background: 'transparent', border: '1px solid #1B181233', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#1B1812'}} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851', marginBottom: '0.5rem'}}>Phone (for the pickup ping)</label>
                  <input type="tel" required style={{width: '100%', background: 'transparent', border: '1px solid #1B181233', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#1B1812'}} />
                </div>
                <div>
                  <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851', marginBottom: '0.5rem'}}>Pickup at</label>
                  <select style={{width: '100%', background: 'transparent', border: '1px solid #1B181233', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', minHeight: '48px', color: '#1B1812'}}>
                    <option>In 10 minutes</option>
                    <option>In 15 minutes</option>
                    <option>In 20 minutes</option>
                    <option>In 30 minutes</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5851', marginBottom: '0.5rem'}}>Your order</label>
                <textarea required rows={4} placeholder="e.g. 2× cortado, 1× sourdough toast" style={{width: '100%', background: 'transparent', border: '1px solid #1B181233', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '1rem', color: '#1B1812', minHeight: '120px', fontFamily: 'inherit', resize: 'vertical'}}></textarea>
              </div>
              <button type="submit" style={{background: '#1B1812', color: '#F4EFE6', padding: '14px 24px', borderRadius: '8px', border: 'none', minHeight: '48px', fontSize: '0.95rem', fontWeight: 500, width: '100%', cursor: 'pointer'}}>
                Send order →
              </button>
              <p style={{fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontSize: '0.92rem', color: '#5C5851', textAlign: 'center'}}>
                Payment when you pick up. No cards required to book.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer style={{borderTop: '1px solid #1B181222', paddingBlock: '2rem'}}>
        <div className="vk-container flex flex-wrap items-center justify-between gap-3" style={{fontSize: '0.85rem', color: '#5C5851'}}>
          <span>© Konak Coffee House · Istanbul</span>
          <Link href="/en/work/konak-coffee-house" style={{color: '#5C5851', textDecoration: 'underline', textUnderlineOffset: '3px'}}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}
