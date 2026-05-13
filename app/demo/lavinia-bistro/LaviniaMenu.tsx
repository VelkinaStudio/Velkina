'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type Allergen = 'gluten' | 'dairy' | 'egg' | 'nuts' | 'soy' | 'fish' | 'shellfish';
type Tag = 'house' | 'vegetarian' | 'vegan' | 'spicy' | 'new' | 'gluten-free';

type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number; // USD
  image?: string;
  allergens?: Allergen[];
  tags?: Tag[];
};

type Category = {
  id: string;
  title: string;
  blurb?: string;
  dishes: Dish[];
};

const IMG = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=70`;

const MENU: Category[] = [
  {
    id: 'coffee-bar',
    title: 'Coffee bar',
    blurb: 'Espresso bar from 7am. Filter from 9. Beans roasted in Bucharest.',
    dishes: [
      { id: 'espresso', name: 'Espresso', desc: 'House blend. Double, 36g out.', price: 2.5, allergens: [] },
      { id: 'cortado', name: 'Cortado', desc: 'Two parts espresso, two parts silky milk.', price: 3.5, allergens: ['dairy'], tags: ['house'], image: IMG('photo-1517701604599-bb29b565090c') },
      { id: 'flat-white', name: 'Flat white', desc: 'Made the right way. No latte art ego.', price: 4, allergens: ['dairy'] },
      { id: 'latte', name: 'Café latte', desc: 'Long espresso, gentle milk, low foam.', price: 4, allergens: ['dairy'] },
      { id: 'cap', name: 'Cappuccino', desc: 'Equal espresso, milk and foam.', price: 4, allergens: ['dairy'] },
      { id: 'iced-shakerato', name: 'Iced shakerato', desc: 'Espresso shaken with ice and a single sugar.', price: 4.5, allergens: [], tags: ['new'] },
      { id: 'mocha', name: 'Mocha', desc: '70% cocoa, single-origin chocolate from Cluj.', price: 4.5, allergens: ['dairy'] },
      { id: 'filter-kenya', name: 'Filter — Kenya AA', desc: 'Bright, blackcurrant, citrus finish.', price: 4.5, image: IMG('photo-1495474472287-4d71bcdd2085') }
    ]
  },
  {
    id: 'drinks',
    title: 'Drinks',
    blurb: 'Fresh-pressed juices, sparkling sodas, the usual softs.',
    dishes: [
      { id: 'oj', name: 'Fresh orange', desc: 'Pressed minutes ago. No sugar added.', price: 5, tags: ['vegan'] },
      { id: 'apple-ginger', name: 'Apple · ginger', desc: 'Sweet, sharp, alive.', price: 5.5, tags: ['vegan'] },
      { id: 'greens', name: 'Greens', desc: 'Spinach, apple, cucumber, lemon, mint.', price: 6, tags: ['vegan', 'new'] },
      { id: 'lemonade', name: 'House lemonade', desc: 'Lemon, basil, soda.', price: 4.5 },
      { id: 'sparkling-water', name: 'Sparkling water', desc: 'Borsec, 0.5L.', price: 3 },
      { id: 'still-water', name: 'Still water', desc: 'Local, 0.5L.', price: 2.5 },
      { id: 'cola', name: 'Cola · classic', desc: 'Glass bottle, 0.33L.', price: 3.5 },
      { id: 'tonic', name: 'Tonic water', desc: 'Fever-Tree Mediterranean.', price: 4 }
    ]
  },
  {
    id: 'wine-cocktails',
    title: 'Wine, beer & cocktails',
    blurb: 'A short list. House pours from Romanian winemakers we visit.',
    dishes: [
      { id: 'white-feteasca', name: 'Fetească Albă · glass', desc: 'Crâmpoșie Vineyards, 2023. Lemon, white peach.', price: 7, image: IMG('photo-1510812431401-41d2bd2722f3') },
      { id: 'rose-busuioaca', name: 'Busuioacă de Bohotin · glass', desc: 'Cotnari estate. Aromatic, dry, raspberry.', price: 7 },
      { id: 'red-feteasca-neagra', name: 'Fetească Neagră · glass', desc: 'Halewood Reserve, 2021. Plum, cocoa, soft tannins.', price: 8 },
      { id: 'pinot-noir', name: 'Pinot Noir · glass', desc: 'Recaș, 2022. Light, cherry, earth.', price: 8 },
      { id: 'craft-pils', name: 'Ground Zero · pilsner', desc: 'Bere Zaganu, 0.33L. Bucharest brewery.', price: 5 },
      { id: 'craft-ipa', name: 'Sunrise · session IPA', desc: 'Hophead, 0.33L. Citrus, low bitter.', price: 6 },
      { id: 'negroni', name: 'Negroni', desc: 'Equal parts. Stirred. Orange peel.', price: 9, image: IMG('photo-1567696911980-2eed69a46042') },
      { id: 'spritz', name: 'Aperol spritz', desc: 'Prosecco, Aperol, soda, orange.', price: 8 },
      { id: 'old-fashioned', name: 'Old fashioned', desc: 'Buffalo Trace, demerara, bitters.', price: 11, tags: ['house'] },
      { id: 'martini', name: 'Dirty martini', desc: 'Tanqueray, dry vermouth, brine.', price: 11 }
    ]
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    blurb: 'Served from 7am to 12pm. All day on weekends.',
    dishes: [
      { id: 'sourdough-eggs', name: 'Sourdough · eggs · feta', desc: 'Two poached eggs, Mihalıç feta, sumac, sourdough.', price: 9, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'], image: IMG('photo-1525351484163-7529414344d8') },
      { id: 'avocado-toast', name: 'Avocado · lime · chilli', desc: 'On sourdough. Optional poached egg +$2.', price: 10, allergens: ['gluten'], tags: ['vegan'] },
      { id: 'shakshuka', name: 'Shakshuka', desc: 'Slow-cooked tomato, eggs, harissa, parsley, sourdough.', price: 11, allergens: ['gluten', 'egg'], tags: ['vegetarian', 'spicy'], image: IMG('photo-1590412200988-a436970781fa') },
      { id: 'granola', name: 'House granola', desc: 'Oats, walnuts, honey, yogurt, blueberries.', price: 8, allergens: ['gluten', 'dairy', 'nuts'], tags: ['vegetarian'] },
      { id: 'omelette', name: 'Three-egg omelette', desc: 'Cheese, herbs. Add ham, mushroom or spinach.', price: 9, allergens: ['egg', 'dairy'], tags: ['vegetarian', 'gluten-free'] },
      { id: 'pancakes', name: 'Buttermilk pancakes', desc: 'Stack of three, maple syrup, salted butter.', price: 9, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'] }
    ]
  },
  {
    id: 'starters',
    title: 'Starters',
    blurb: 'Small plates. Order two or three to share.',
    dishes: [
      { id: 'placinta-spanac', name: 'Plăcintă cu spanac', desc: 'Sourdough phyllo, spinach, sheep cheese, dill.', price: 8, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'], image: IMG('photo-1565299543923-37dd37887442') },
      { id: 'salata-vinete', name: 'Salată de vinete', desc: 'Smoked eggplant, sunflower oil, onion, sourdough.', price: 7, allergens: ['gluten'], tags: ['vegan'] },
      { id: 'zacusca', name: 'Zacuscă', desc: 'Roasted pepper and eggplant spread, sourdough.', price: 7, allergens: ['gluten'], tags: ['vegan'] },
      { id: 'meze-board', name: 'Meze board', desc: 'Five spreads, olives, sourdough. For two.', price: 16, allergens: ['gluten', 'dairy'], tags: ['vegetarian'], image: IMG('photo-1544025162-d76694265947') },
      { id: 'ciorba-radauteana', name: 'Ciorbă rădăuțeană', desc: 'Smoked chicken sour soup, sour cream, garlic.', price: 9, allergens: ['dairy'], tags: ['house'] },
      { id: 'ciorba-burta', name: 'Ciorbă de burtă', desc: 'Tripe soup. Sour cream, garlic, vinegar on the side.', price: 9, allergens: ['dairy'] },
      { id: 'mititei', name: 'Mititei (3)', desc: 'Grilled minced beef and lamb, mustard, sourdough.', price: 10, allergens: ['gluten'], tags: ['spicy'], image: IMG('photo-1529193591184-b1d58069ecdd') }
    ]
  },
  {
    id: 'mains',
    title: 'Mains',
    blurb: 'House classics and a few from the Saturday special.',
    dishes: [
      { id: 'sarmale', name: 'Sarmale + mămăligă', desc: 'Vine-leaf rolls, slow-cooked pork, polenta, sour cream.', price: 14, allergens: ['dairy'], tags: ['house'], image: IMG('photo-1547592180-85f173990554') },
      { id: 'tochitura', name: 'Tochitură moldovenească', desc: 'Pork stew, fried egg, smoked cheese, mămăligă.', price: 15, allergens: ['egg', 'dairy'] },
      { id: 'mici-platter', name: 'Mici platter', desc: 'Five mititei, fries, mustard, pickled veg.', price: 16, allergens: ['gluten'], tags: ['spicy'] },
      { id: 'ciulama', name: 'Ciulama de pui', desc: 'Chicken in mushroom cream sauce, mămăligă.', price: 13, allergens: ['dairy'], tags: ['gluten-free'] },
      { id: 'roast-lamb', name: 'Slow-roast lamb shoulder', desc: 'Twelve hours. Garlic, rosemary, roast potatoes.', price: 22, tags: ['gluten-free', 'house'], image: IMG('photo-1532636721795-8d70d781ce14') },
      { id: 'pork-knuckle', name: 'Roast pork knuckle', desc: 'Slow-cooked, crackling, sauerkraut, mustard.', price: 19, tags: ['gluten-free'] },
      { id: 'duck-breast', name: 'Duck breast · cherry sauce', desc: 'Pan-roasted, cherry-thyme glaze, potato gratin.', price: 21, allergens: ['dairy'], tags: ['gluten-free'] },
      { id: 'sea-bass', name: 'Pan-seared sea bass', desc: 'Black Sea catch. Lemon, capers, herbed potatoes.', price: 20, allergens: ['fish'], tags: ['gluten-free'] },
      { id: 'mushroom-risotto', name: 'Wild mushroom risotto', desc: 'Carnaroli, porcini, parmesan, truffle oil.', price: 15, allergens: ['dairy'], tags: ['vegetarian', 'gluten-free'] }
    ]
  },
  {
    id: 'pasta',
    title: 'Pasta',
    blurb: 'Fresh-made daily. Ask the kitchen if a gluten-free version is available.',
    dishes: [
      { id: 'cacio-pepe', name: 'Cacio e pepe', desc: 'Tonnarelli, pecorino romano, cracked black pepper.', price: 12, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'], image: IMG('photo-1551183053-bf91a1d81141') },
      { id: 'carbonara', name: 'Carbonara', desc: 'Guanciale, egg yolk, pecorino, black pepper.', price: 14, allergens: ['gluten', 'dairy', 'egg'] },
      { id: 'arrabbiata', name: 'Penne arrabbiata', desc: 'Tomato, garlic, chilli, parsley.', price: 11, allergens: ['gluten'], tags: ['vegan', 'spicy'] },
      { id: 'ravioli', name: 'Ricotta · spinach ravioli', desc: 'House-made. Sage butter, parmesan.', price: 14, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'] },
      { id: 'bolognese', name: 'Tagliatelle bolognese', desc: 'Eight-hour ragù. Parmesan.', price: 15, allergens: ['gluten', 'dairy', 'egg'] }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    blurb: 'Baked daily on site. Coffee pairing recommended.',
    dishes: [
      { id: 'papanasi', name: 'Papanași cu dulceață', desc: 'Fried doughnut, sour cream, blueberry jam.', price: 8, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian', 'house'], image: IMG('photo-1565958011703-44f9829ba187') },
      { id: 'tort-morcovi', name: 'Carrot cake', desc: 'Single-layer carrot cake, cream cheese frosting.', price: 7, allergens: ['gluten', 'dairy', 'egg', 'nuts'], tags: ['vegetarian'] },
      { id: 'cheesecake', name: 'Baked cheesecake', desc: 'Vanilla bean, raspberry coulis, biscuit base.', price: 8, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'] },
      { id: 'tiramisu', name: 'Tiramisù', desc: 'Mascarpone, espresso, cocoa, ladyfingers.', price: 8, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'] },
      { id: 'chocolate-fondant', name: 'Chocolate fondant', desc: 'Warm centre, vanilla ice cream. Twelve-minute wait.', price: 9, allergens: ['gluten', 'dairy', 'egg'], tags: ['vegetarian'], image: IMG('photo-1606313564200-e75d5e30476c') },
      { id: 'icecream', name: 'Vanilla ice cream', desc: 'Three scoops, fresh berries.', price: 6, allergens: ['dairy'], tags: ['vegetarian', 'gluten-free'] }
    ]
  }
];

const ALLERGEN_LABEL: Record<Allergen, string> = {
  gluten: 'Gluten',
  dairy: 'Dairy',
  egg: 'Egg',
  nuts: 'Nuts',
  soy: 'Soy',
  fish: 'Fish',
  shellfish: 'Shellfish'
};

const TAG_LABEL: Record<Tag, string> = {
  house: 'House favourite',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  spicy: 'Spicy',
  new: 'New',
  'gluten-free': 'Gluten-free'
};

const FILTERS: Tag[] = ['house', 'vegetarian', 'vegan', 'gluten-free', 'spicy', 'new'];

const PALETTE = {
  bg: '#FAF6EE',
  surface: '#FFFFFF',
  surface2: '#F0E8D8',
  text: '#231C13',
  muted: '#776A56',
  dim: '#A39681',
  border: '#231C1322',
  borderSoft: '#231C1311',
  accent: '#7A2D2D',
  accentText: '#FAF6EE'
};

export default function LaviniaMenu() {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Tag[]>([]);
  const [order, setOrder] = useState<Record<string, number>>({});
  const [orderOpen, setOrderOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState<string>(MENU[0].id);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );
    for (const cat of MENU) {
      const el = sectionRefs.current[cat.id];
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const toggleFilter = (t: Tag) => {
    setActiveFilters(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));
  };

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MENU.map(cat => ({
      ...cat,
      dishes: cat.dishes.filter(d => {
        if (q) {
          if (!d.name.toLowerCase().includes(q) && !d.desc.toLowerCase().includes(q)) return false;
        }
        if (activeFilters.length > 0) {
          const tags = d.tags || [];
          for (const f of activeFilters) if (!tags.includes(f)) return false;
        }
        return true;
      })
    })).filter(cat => cat.dishes.length > 0);
  }, [search, activeFilters]);

  const addToOrder = (id: string) => setOrder(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const removeFromOrder = (id: string) =>
    setOrder(p => {
      const n = (p[id] || 0) - 1;
      if (n <= 0) {
        const { [id]: _, ...rest } = p;
        return rest;
      }
      return { ...p, [id]: n };
    });

  const orderCount = Object.values(order).reduce((a, b) => a + b, 0);
  const allDishes = MENU.flatMap(c => c.dishes);
  const orderTotal = Object.entries(order).reduce((sum, [id, qty]) => {
    const d = allDishes.find(x => x.id === id);
    return sum + (d ? d.price * qty : 0);
  }, 0);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const headerOffset = 130;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div style={{ background: PALETTE.bg, color: PALETTE.text, minHeight: '100dvh', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
      {/* Top header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: PALETTE.bg,
          borderBottom: `1px solid ${PALETTE.border}`
        }}
      >
        <div className="vk-container" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="font-heading" style={{ letterSpacing: '0.18em', fontWeight: 600, fontSize: '0.95rem' }}>LAVINIA · BISTRO</div>
            <div style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontSize: '0.78rem', color: PALETTE.muted, letterSpacing: '-0.005em' }}>
              Table 12 · Centru Vechi
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            style={{
              background: PALETTE.accent,
              color: PALETTE.accentText,
              padding: '10px 16px',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              minHeight: 40
            }}
          >
            <span>Order</span>
            <span
              style={{
                background: PALETTE.accentText,
                color: PALETTE.accent,
                borderRadius: 999,
                fontWeight: 700,
                fontSize: '0.78rem',
                minWidth: 22,
                height: 22,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 6px'
              }}
            >
              {orderCount}
            </span>
          </button>
        </div>

        {/* Category nav */}
        <nav
          style={{
            borderTop: `1px solid ${PALETTE.borderSoft}`,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="vk-container" style={{ display: 'flex', gap: 0, padding: '0', minWidth: 'max-content' }}>
            {MENU.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToSection(cat.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '12px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  color: activeSection === cat.id ? PALETTE.text : PALETTE.muted,
                  borderBottom: `2px solid ${activeSection === cat.id ? PALETTE.accent : 'transparent'}`,
                  transition: 'color 160ms ease, border-color 160ms ease'
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: '2.5rem 0 1.5rem' }}>
        <div className="vk-container">
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: PALETTE.muted }}>
            Open today · 8am — 11pm
          </span>
          <h1 className="mt-4" style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(2rem, 8vw, 4rem)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 500, maxWidth: '16ch', margin: '1rem 0 0' }}>
            What we're cooking{' '}
            <span style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontWeight: 400, color: PALETTE.accent }}>
              today.
            </span>
          </h1>
          <p className="mt-4" style={{ fontSize: '1rem', lineHeight: 1.5, color: PALETTE.muted, maxWidth: '52ch' }}>
            Order at the table — your waiter brings it to you. Prices in USD include service. Allergens listed on every dish.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section style={{ paddingBottom: '1.5rem' }}>
        <div className="vk-container">
          <div style={{ position: 'relative' }}>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search the menu — try 'sarmale' or 'vegetarian'"
              style={{
                width: '100%',
                background: PALETTE.surface,
                border: `1px solid ${PALETTE.border}`,
                padding: '14px 16px 14px 44px',
                borderRadius: 12,
                fontSize: '1rem',
                color: PALETTE.text,
                minHeight: 48,
                fontFamily: 'inherit'
              }}
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PALETTE.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 14, top: 15 }}>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 4 }}>
            {FILTERS.map(f => {
              const active = activeFilters.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFilter(f)}
                  style={{
                    background: active ? PALETTE.text : 'transparent',
                    color: active ? PALETTE.bg : PALETTE.muted,
                    border: `1px solid ${active ? PALETTE.text : PALETTE.border}`,
                    padding: '6px 12px',
                    borderRadius: 999,
                    fontSize: '0.78rem',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 160ms ease, color 160ms ease'
                  }}
                >
                  {TAG_LABEL[f]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu sections */}
      <main style={{ paddingBottom: '6rem' }}>
        {filteredMenu.length === 0 ? (
          <div className="vk-container" style={{ padding: '4rem 0', textAlign: 'center', color: PALETTE.muted }}>
            <p style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', fontSize: '1.25rem' }}>
              Nothing matches that — try a different search or clear the filters.
            </p>
          </div>
        ) : (
          filteredMenu.map(cat => (
            <section
              key={cat.id}
              id={cat.id}
              ref={el => { sectionRefs.current[cat.id] = el; }}
              style={{ padding: '2rem 0', borderTop: `1px solid ${PALETTE.borderSoft}` }}
            >
              <div className="vk-container">
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 500, letterSpacing: '-0.025em', margin: 0 }}>
                    {cat.title}
                  </h2>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', color: PALETTE.dim, letterSpacing: '0.08em' }}>
                    {cat.dishes.length} item{cat.dishes.length === 1 ? '' : 's'}
                  </span>
                </div>
                {cat.blurb && (
                  <p style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', color: PALETTE.muted, marginBottom: '1.5rem', maxWidth: '52ch' }}>
                    {cat.blurb}
                  </p>
                )}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                  {cat.dishes.map(d => (
                    <DishCard
                      key={d.id}
                      dish={d}
                      count={order[d.id] || 0}
                      onAdd={() => addToOrder(d.id)}
                      onRemove={() => removeFromOrder(d.id)}
                    />
                  ))}
                </ul>
              </div>
            </section>
          ))
        )}
      </main>

      {/* Floating order button (mobile) */}
      {orderCount > 0 && !orderOpen && (
        <button
          type="button"
          onClick={() => setOrderOpen(true)}
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: PALETTE.text,
            color: PALETTE.bg,
            padding: '14px 22px',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 30,
            boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
            fontSize: '0.95rem',
            fontWeight: 500
          }}
        >
          <span>View order</span>
          <span style={{ opacity: 0.7 }}>·</span>
          <span>${orderTotal.toFixed(2)}</span>
          <span
            style={{
              background: PALETTE.accent,
              color: PALETTE.accentText,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '0.78rem',
              padding: '2px 8px'
            }}
          >
            {orderCount}
          </span>
        </button>
      )}

      {/* Order drawer */}
      {orderOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(35,28,19,0.55)',
            zIndex: 50,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setOrderOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 480,
              background: PALETTE.bg,
              height: '100%',
              overflowY: 'auto',
              boxShadow: '-12px 0 36px rgba(0,0,0,0.2)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: `1px solid ${PALETTE.border}`, position: 'sticky', top: 0, background: PALETTE.bg, zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-sora), Sora, sans-serif', fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>Your order</h2>
              <button
                type="button"
                onClick={() => setOrderOpen(false)}
                aria-label="Close"
                style={{ background: 'transparent', border: 'none', width: 40, height: 40, cursor: 'pointer', color: PALETTE.text }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <div style={{ padding: '1.25rem' }}>
              {orderCount === 0 ? (
                <p style={{ color: PALETTE.muted, fontFamily: 'var(--font-serif), serif', fontStyle: 'italic' }}>Your order is empty. Tap a dish to add it.</p>
              ) : (
                <>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {Object.entries(order).map(([id, qty]) => {
                      const d = allDishes.find(x => x.id === id);
                      if (!d) return null;
                      return (
                        <li key={id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '0.75rem 1rem', padding: '1rem 0', borderBottom: `1px solid ${PALETTE.borderSoft}` }}>
                          <div>
                            <div style={{ fontWeight: 500 }}>{d.name}</div>
                            <div style={{ fontSize: '0.85rem', color: PALETTE.muted, marginTop: 2 }}>${d.price.toFixed(2)} · {qty} × ${d.price.toFixed(2)} = ${(d.price * qty).toFixed(2)}</div>
                          </div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <button
                              type="button"
                              onClick={() => removeFromOrder(id)}
                              aria-label={`Remove one ${d.name}`}
                              style={{ width: 32, height: 32, borderRadius: 999, border: `1px solid ${PALETTE.border}`, background: 'transparent', cursor: 'pointer', color: PALETTE.text, fontSize: '1.1rem' }}
                            >
                              −
                            </button>
                            <span style={{ minWidth: 18, textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{qty}</span>
                            <button
                              type="button"
                              onClick={() => addToOrder(id)}
                              aria-label={`Add one ${d.name}`}
                              style={{ width: 32, height: 32, borderRadius: 999, border: `1px solid ${PALETTE.border}`, background: 'transparent', cursor: 'pointer', color: PALETTE.text, fontSize: '1.1rem' }}
                            >
                              +
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div style={{ marginTop: '1.5rem', padding: '1rem 0', borderTop: `1px solid ${PALETTE.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.0625rem', fontWeight: 500 }}>
                      <span>Total</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>${orderTotal.toFixed(2)}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: PALETTE.muted, marginTop: 8 }}>Service included. Tip optional. Payment with your waiter — cash or card.</p>
                  </div>

                  <button
                    type="button"
                    style={{ background: PALETTE.accent, color: PALETTE.accentText, padding: '14px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, width: '100%', marginTop: '1rem', minHeight: 48 }}
                    onClick={() => alert('Order sent to the kitchen. Your waiter will be over shortly.')}
                  >
                    Send to kitchen →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${PALETTE.border}`, padding: '2rem 0' }}>
        <div className="vk-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, alignItems: 'center', fontSize: '0.85rem', color: PALETTE.muted }}>
          <div>
            <div>Lavinia Bistro · Strada Smârdan 18, București</div>
            <div style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', marginTop: 4 }}>Allergic to something? Tell your waiter — we adapt most dishes.</div>
          </div>
          <Link href="/en/work/lavinia-bistro-qr-menu" style={{ color: PALETTE.muted, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Built by Velkina →
          </Link>
        </div>
      </footer>
    </div>
  );
}

function DishCard({ dish, count, onAdd, onRemove }: { dish: Dish; count: number; onAdd: () => void; onRemove: () => void }) {
  const hasImage = !!dish.image;
  return (
    <li
      style={{
        display: 'grid',
        gridTemplateColumns: hasImage ? '88px 1fr' : '1fr',
        gap: '1rem',
        alignItems: 'start',
        padding: '1rem',
        background: PALETTE.surface,
        border: `1px solid ${PALETTE.borderSoft}`,
        borderRadius: 14
      }}
    >
      {hasImage && (
        <div style={{ width: 88, height: 88, borderRadius: 10, overflow: 'hidden', background: PALETTE.surface2, flexShrink: 0 }}>
          <img src={dish.image} alt={dish.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontWeight: 500, fontSize: '1.0625rem' }}>{dish.name}</div>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.95rem', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>${dish.price.toFixed(2)}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-serif), serif', fontStyle: 'italic', color: PALETTE.muted, fontSize: '0.95rem', lineHeight: 1.45 }}>
          {dish.desc}
        </div>
        {(dish.tags?.length || dish.allergens?.length) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {dish.tags?.map(t => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: PALETTE.accent,
                  border: `1px solid ${PALETTE.accent}66`,
                  padding: '2px 6px',
                  borderRadius: 4
                }}
              >
                {TAG_LABEL[t]}
              </span>
            ))}
            {dish.allergens?.map(a => (
              <span
                key={a}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: PALETTE.dim,
                  border: `1px dashed ${PALETTE.dim}66`,
                  padding: '2px 6px',
                  borderRadius: 4
                }}
              >
                {ALLERGEN_LABEL[a]}
              </span>
            ))}
          </div>
        )}
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          {count === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              style={{
                background: 'transparent',
                color: PALETTE.text,
                padding: '8px 14px',
                borderRadius: 999,
                border: `1px solid ${PALETTE.border}`,
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                minHeight: 36
              }}
            >
              Add to order
            </button>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: PALETTE.surface2, padding: '4px 6px', borderRadius: 999 }}>
              <button
                type="button"
                onClick={onRemove}
                aria-label="Remove one"
                style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', color: PALETTE.text, fontSize: '1rem' }}
              >
                −
              </button>
              <span style={{ minWidth: 16, textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{count}</span>
              <button
                type="button"
                onClick={onAdd}
                aria-label="Add one"
                style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: PALETTE.accent, color: PALETTE.accentText, cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
