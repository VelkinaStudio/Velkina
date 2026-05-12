'use client';

import React, {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import type {Locale} from '../../../i18n/messages';

type MenuLang = 'en' | 'tr' | 'ro' | 'de';

type LocalizedString = Record<MenuLang, string>;

type Allergen = 'gluten' | 'dairy' | 'nuts' | 'egg' | 'shellfish' | 'fish' | 'soy';

type DietTag = 'veg' | 'vegan' | 'gf' | 'spicy' | 'chef';

type MenuItem = {
  id: string;
  name: LocalizedString;
  desc: LocalizedString;
  price: number;
  allergens?: Allergen[];
  diet?: DietTag[];
  /** Path to photograph */
  photo: string;
};

type Category = {
  id: string;
  name: LocalizedString;
  items: MenuItem[];
};

const RESTAURANT = {
  name: 'Lavinia',
  subtitle: 'B  I  S  T  R  O',
  tagline: {
    en: 'Mediterranean kitchen · Made today',
    tr: 'Akdeniz mutfağı · Bugünün ürünleri',
    ro: 'Bucătărie mediteraneană · Făcut azi',
    de: 'Mediterrane Küche · Heute frisch',
  } as LocalizedString,
  location: {
    en: 'Bebek, Istanbul · Open until 23:30',
    tr: 'Bebek, İstanbul · 23:30’a kadar açık',
    ro: 'Bebek, Istanbul · Deschis până la 23:30',
    de: 'Bebek, Istanbul · Geöffnet bis 23:30',
  } as LocalizedString,
};

const CATS: Category[] = [
  {
    id: 'starters',
    name: {en: 'Starters', tr: 'Başlangıçlar', ro: 'Aperitive', de: 'Vorspeisen'},
    items: [
      {
        id: 'burrata',
        name: {en: 'Burrata Salad', tr: 'Burrata Salatası', ro: 'Salată cu Burrata', de: 'Burrata-Salat'},
        desc: {
          en: 'Creamy burrata, heirloom tomato, basil oil, sourdough crumb.',
          tr: 'Kremalı burrata, geleneksel domates, fesleğenli zeytinyağı, ekşi maya kırıntı.',
          ro: 'Burrata cremoasă, roșii tradiționale, ulei de busuioc, firimituri de pâine cu maia.',
          de: 'Cremige Burrata, alte Tomatensorten, Basilikumöl, Sauerteigbrösel.',
        },
        price: 14,
        allergens: ['dairy', 'gluten'],
        diet: ['veg'],
        photo: '/food/burrata.jpg',
      },
      {
        id: 'tartare',
        name: {en: 'Beef Tartare', tr: 'Dana Tartar', ro: 'Tartar de Vită', de: 'Rindertatar'},
        desc: {
          en: 'Hand-cut tenderloin, capers, shallot, smoked yolk, focaccia.',
          tr: 'Bıçakla doğranmış bonfile, kapari, arpacık, tütsülü yumurta sarısı, focaccia.',
          ro: 'Mușchi de vită tăiat cu mâna, capere, șalotă, gălbenuș afumat, focaccia.',
          de: 'Handgeschnittenes Filet, Kapern, Schalotte, geräuchertes Eigelb, Focaccia.',
        },
        price: 19,
        allergens: ['egg', 'gluten'],
        diet: ['chef'],
        photo: '/food/tartare.jpg',
      },
      {
        id: 'octopus',
        name: {en: 'Charred Octopus', tr: 'Kömürlü Ahtapot', ro: 'Caracatiță la Grătar', de: 'Gegrillter Oktopus'},
        desc: {
          en: 'Slow-cooked, paprika oil, white bean purée, lemon.',
          tr: 'Yavaş pişmiş, kırmızıbiberli yağ, beyaz fasulye püresi, limon.',
          ro: 'Gătită lent, ulei de paprika, piure de fasole albă, lămâie.',
          de: 'Langsam gegart, Paprikaöl, weiße Bohnencreme, Zitrone.',
        },
        price: 22,
        allergens: ['fish'],
        diet: ['gf'],
        photo: '/food/octopus.jpg',
      },
    ],
  },
  {
    id: 'mains',
    name: {en: 'Mains', tr: 'Ana Yemekler', ro: 'Feluri Principale', de: 'Hauptspeisen'},
    items: [
      {
        id: 'risotto',
        name: {en: 'Truffle Risotto', tr: 'Trüflü Risotto', ro: 'Risotto cu Trufe', de: 'Trüffel-Risotto'},
        desc: {
          en: 'Carnaroli rice, parmigiano, summer truffle, sage butter.',
          tr: 'Carnaroli pirinç, parmigiano, yaz trüfü, adaçayılı tereyağı.',
          ro: 'Orez Carnaroli, parmigiano, trufe de vară, unt cu salvie.',
          de: 'Carnaroli-Reis, Parmigiano, Sommertrüffel, Salbeibutter.',
        },
        price: 24,
        allergens: ['dairy', 'gluten'],
        diet: ['veg', 'chef'],
        photo: '/food/risotto.jpg',
      },
      {
        id: 'lamb',
        name: {en: 'Lamb Chops', tr: 'Kuzu Pirzola', ro: 'Cotlete de Miel', de: 'Lammkoteletts'},
        desc: {
          en: 'Rosemary jus, baby spinach, charred leeks, anchovy butter.',
          tr: 'Biberiyeli jus, taze ıspanak, közlenmiş pırasa, hamsi tereyağı.',
          ro: 'Sos cu rozmarin, spanac tânăr, praz la grătar, unt cu anșoa.',
          de: 'Rosmarinjus, Babyspinat, gegrillter Lauch, Sardellenbutter.',
        },
        price: 32,
        allergens: ['dairy', 'fish'],
        diet: ['gf'],
        photo: '/food/lamb.jpg',
      },
      {
        id: 'seabass',
        name: {en: 'Whole Sea Bass', tr: 'Bütün Levrek', ro: 'Biban de Mare Întreg', de: 'Ganzer Wolfsbarsch'},
        desc: {
          en: 'Fennel, salt-crust, citrus oil, capers, soft potatoes.',
          tr: 'Rezene, tuz kabuğu, narenciyeli yağ, kapari, yumuşak patates.',
          ro: 'Fenicul, crustă de sare, ulei de citrice, capere, cartofi noi.',
          de: 'Fenchel, Salzkruste, Zitrusöl, Kapern, weiche Kartoffeln.',
        },
        price: 28,
        allergens: ['fish'],
        diet: ['gf'],
        photo: '/food/seabass.jpg',
      },
      {
        id: 'mushroom',
        name: {en: 'Wild Mushroom Pasta', tr: 'Yaban Mantarlı Makarna', ro: 'Paste cu Ciuperci de Pădure', de: 'Wildpilz-Pasta'},
        desc: {
          en: 'Tagliatelle, porcini, garlic confit, herbs.',
          tr: 'Tagliatelle, porcini, sarımsak konfit, taze otlar.',
          ro: 'Tagliatelle, hribi, usturoi confit, ierburi proaspete.',
          de: 'Tagliatelle, Steinpilze, Knoblauch-Confit, Kräuter.',
        },
        price: 21,
        allergens: ['gluten', 'egg'],
        diet: ['veg'],
        photo: '/food/mushroom.jpg',
      },
    ],
  },
  {
    id: 'desserts',
    name: {en: 'Desserts', tr: 'Tatlılar', ro: 'Deserturi', de: 'Desserts'},
    items: [
      {
        id: 'tiramisu',
        name: {en: 'Tiramisu', tr: 'Tiramisu', ro: 'Tiramisu', de: 'Tiramisu'},
        desc: {
          en: 'Mascarpone, espresso-soaked savoiardi, cocoa.',
          tr: 'Mascarpone, espressoda yumuşatılmış savoiardi, kakao.',
          ro: 'Mascarpone, pișcoturi savoiardi înmuiate în espresso, cacao.',
          de: 'Mascarpone, in Espresso getränkte Savoiardi, Kakao.',
        },
        price: 9,
        allergens: ['dairy', 'gluten', 'egg'],
        diet: ['veg'],
        photo: '/food/tiramisu.jpg',
      },
      {
        id: 'pana',
        name: {en: 'Vanilla Panna Cotta', tr: 'Vanilyalı Panna Cotta', ro: 'Panna Cotta cu Vanilie', de: 'Vanille-Panna-Cotta'},
        desc: {
          en: 'Tahitian vanilla, raspberry coulis, almond crumble.',
          tr: 'Tahiti vanilyası, ahududu sosu, badem kırma.',
          ro: 'Vanilie de Tahiti, sos de zmeură, crumble de migdale.',
          de: 'Tahiti-Vanille, Himbeercoulis, Mandelcrumble.',
        },
        price: 8,
        allergens: ['dairy', 'nuts'],
        diet: ['veg', 'gf'],
        photo: '/food/pana.jpg',
      },
    ],
  },
  {
    id: 'drinks',
    name: {en: 'Drinks', tr: 'İçecekler', ro: 'Băuturi', de: 'Getränke'},
    items: [
      {
        id: 'spritz',
        name: {en: 'Lavinia Spritz', tr: 'Lavinia Spritz', ro: 'Lavinia Spritz', de: 'Lavinia Spritz'},
        desc: {
          en: 'Aperol, prosecco, soda, blood orange.',
          tr: 'Aperol, prosecco, soda, kan portakalı.',
          ro: 'Aperol, prosecco, sifon, portocală roșie.',
          de: 'Aperol, Prosecco, Soda, Blutorange.',
        },
        price: 11,
        diet: ['chef'],
        photo: '/food/spritz.jpg',
      },
      {
        id: 'wine',
        name: {en: 'House Red, glass', tr: 'Ev Şarabı (Kırmızı), kadeh', ro: 'Vin Roșu al Casei, pahar', de: 'Hauswein Rot, Glas'},
        desc: {
          en: 'Anatolian Boğazkere, plum and cocoa.',
          tr: 'Anadolu Boğazkere, erik ve kakao notaları.',
          ro: 'Boğazkere din Anatolia, note de prună și cacao.',
          de: 'Anatolischer Boğazkere, Pflaume und Kakao.',
        },
        price: 9,
        diet: [],
        photo: '/food/wine.jpg',
      },
      {
        id: 'water',
        name: {en: 'Sparkling Water 0.5L', tr: 'Maden Suyu 0.5L', ro: 'Apă Minerală 0.5L', de: 'Sprudelwasser 0,5L'},
        desc: {en: 'Glass bottle.', tr: 'Cam şişe.', ro: 'Sticlă de sticlă.', de: 'Glasflasche.'},
        price: 3,
        photo: '/food/water.jpg',
      },
    ],
  },
];

const ALLERGEN_LABEL: Record<Allergen, LocalizedString> = {
  gluten: {en: 'gluten', tr: 'gluten', ro: 'gluten', de: 'Gluten'},
  dairy: {en: 'milk', tr: 'süt', ro: 'lactate', de: 'Milch'},
  nuts: {en: 'nuts', tr: 'kuruyemiş', ro: 'nuci', de: 'Nüsse'},
  egg: {en: 'egg', tr: 'yumurta', ro: 'ou', de: 'Ei'},
  shellfish: {en: 'shellfish', tr: 'kabuklu', ro: 'crustacee', de: 'Schalentiere'},
  fish: {en: 'fish', tr: 'balık', ro: 'pește', de: 'Fisch'},
  soy: {en: 'soy', tr: 'soya', ro: 'soia', de: 'Soja'},
};

const DIET_LABEL: Record<DietTag, LocalizedString> = {
  veg: {en: 'vegetarian', tr: 'vejetaryen', ro: 'vegetarian', de: 'vegetarisch'},
  vegan: {en: 'vegan', tr: 'vegan', ro: 'vegan', de: 'vegan'},
  gf: {en: 'gluten-free', tr: 'glütensiz', ro: 'fără gluten', de: 'glutenfrei'},
  spicy: {en: 'spicy', tr: 'acılı', ro: 'picant', de: 'scharf'},
  chef: {en: "chef's pick", tr: 'şefin seçimi', ro: 'alegerea șefului', de: 'Empfehlung'},
};

const UI: Record<string, LocalizedString> = {
  add: {en: 'Add', tr: 'Ekle', ro: 'Adaugă', de: 'Hinzufügen'},
  cart: {en: 'Your order', tr: 'Siparişiniz', ro: 'Comanda ta', de: 'Ihre Bestellung'},
  total: {en: 'Total', tr: 'Toplam', ro: 'Total', de: 'Gesamt'},
  callWaiter: {en: 'Call waiter', tr: 'Garson çağır', ro: 'Cheamă ospătarul', de: 'Kellner rufen'},
  requestBill: {en: 'Request bill', tr: 'Hesabı iste', ro: 'Cere nota', de: 'Rechnung'},
  empty: {en: 'No items yet — tap a dish to add it.', tr: 'Henüz seçim yok — bir yemeğe dokunarak ekleyin.', ro: 'Niciun produs încă — atinge un fel pentru a-l adăuga.', de: 'Noch nichts — Gericht antippen, um es hinzuzufügen.'},
  table: {en: 'Table', tr: 'Masa', ro: 'Masa', de: 'Tisch'},
  waiterToast: {en: 'A waiter is on the way.', tr: 'Garson yola çıktı.', ro: 'Un ospătar vine imediat.', de: 'Ein Kellner kommt.'},
  billToast: {en: 'Your bill is being prepared.', tr: 'Hesabınız hazırlanıyor.', ro: 'Nota se pregătește.', de: 'Rechnung wird vorbereitet.'},
  poweredBy: {en: 'QR menu by Velkina', tr: 'QR menü: Velkina', ro: 'Meniu QR de la Velkina', de: 'QR-Menü von Velkina'},
  info: {en: 'About this demo', tr: 'Bu demo hakkında', ro: 'Despre acest demo', de: 'Über diese Demo'},
  remove: {en: 'Remove', tr: 'Kaldır', ro: 'Elimină', de: 'Entfernen'},
  close: {en: 'Close', tr: 'Kapat', ro: 'Închide', de: 'Schließen'},
  search: {en: 'Search the menu', tr: 'Menüde ara', ro: 'Caută în meniu', de: 'Speisekarte durchsuchen'},
  noResult: {en: 'No matches.', tr: 'Sonuç yok.', ro: 'Niciun rezultat.', de: 'Keine Treffer.'},
};

const UI_ITEM_SINGULAR: LocalizedString = {en: 'item', tr: 'ürün', ro: 'produs', de: 'Artikel'};
const UI_ITEM_PLURAL: LocalizedString = {en: 'items', tr: 'ürün', ro: 'produse', de: 'Artikel'};

const INFO_BODY_1: LocalizedString = {
  en: 'This is a working demo of a QR menu Velkina builds for restaurants, cafés, and bars. Every item, photo, language toggle, and action is real — only the basket and waiter calls are scripted (no kitchen connected).',
  tr: 'Bu, Velkina’nın restoranlar, kafeler ve barlar için hazırladığı QR menünün çalışan bir demosu. Her ürün, fotoğraf, dil seçici ve eylem gerçek — yalnızca sepet ve garson çağrısı simüle edilmiştir (mutfağa bağlı değildir).',
  ro: 'Acesta este un demo funcțional al meniului QR pe care Velkina îl construiește pentru restaurante, cafenele și baruri. Fiecare produs, fotografie, comutator de limbă și acțiune este real — doar coșul și apelul ospătarului sunt simulate (nu este conectată o bucătărie).',
  de: 'Eine funktionierende Demo des QR-Menüs, das Velkina für Restaurants, Cafés und Bars baut. Jeder Eintrag, jedes Foto, jede Sprachumschaltung und jede Aktion ist echt — nur Warenkorb und Kellnerruf sind simuliert (keine Küche verbunden).',
};
const INFO_BODY_2: LocalizedString = {
  en: 'Real installs include a manager dashboard for editing items, prices and translations, table-specific QR codes, allergen disclosure, and Google-indexed menu pages so your restaurant shows up when guests search.',
  tr: 'Gerçek kurulumlarda; ürünleri, fiyatları ve çevirileri düzenleyebileceğiniz yönetici paneli, masa bazlı QR kodlar, alerjen bilgisi ve misafirleriniz aradığında çıkacağınız Google’a indekslenmiş menü sayfaları yer alır.',
  ro: 'Instalările reale includ un dashboard de manager pentru editarea produselor, prețurilor și traducerilor, coduri QR per masă, declarația alergenilor și pagini de meniu indexate de Google, astfel încât restaurantul tău să apară când oaspeții caută.',
  de: 'Echte Installationen enthalten ein Manager-Dashboard zum Bearbeiten von Speisen, Preisen und Übersetzungen, tischspezifische QR-Codes, Allergen-Hinweise und in Google indexierte Menüseiten, damit Ihr Restaurant gefunden wird.',
};
const CTA_SEE_SERVICE: LocalizedString = {en: 'See the service', tr: 'Hizmeti gör', ro: 'Vezi serviciul', de: 'Service ansehen'};
const CTA_START: LocalizedString = {en: 'Start a project', tr: 'Proje başlat', ro: 'Începe un proiect', de: 'Projekt starten'};

const T = (locale: MenuLang, s?: LocalizedString) => (s ? s[locale] || s.en : '');

type CartLine = {id: string; qty: number};

type ToastMsg = {kind: 'waiter' | 'bill'; at: number} | null;

export default function QrMenuView({sitePath = '/en'}: {sitePath?: string}) {
  const [lang, setLang] = useState<MenuLang>('en');
  const [activeCat, setActiveCat] = useState<string>(CATS[0].id);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState<MenuItem | null>(null);
  const [toast, setToast] = useState<ToastMsg>(null);
  const [search, setSearch] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // Mark body so the site shell (header/footer) hides in demo mode.
  useEffect(() => {
    document.body.setAttribute('data-qr-demo', 'true');
    return () => {
      document.body.removeAttribute('data-qr-demo');
    };
  }, []);

  // Sticky cat observer
  useEffect(() => {
    const ids = CATS.map(c => c.id);
    const sections = ids.map(id => document.getElementById(`cat-${id}`)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        let bestId = activeCat;
        let bestRatio = 0;
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestId = (e.target as HTMLElement).id.replace('cat-', '');
          }
        }
        if (bestRatio > 0) setActiveCat(bestId);
      },
      {rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.4, 0.7]},
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = useMemo(() => {
    const flat = CATS.flatMap(c => c.items);
    return cart.reduce((sum, line) => {
      const item = flat.find(i => i.id === line.id);
      return item ? sum + item.price * line.qty : sum;
    }, 0);
  }, [cart]);

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  const addToCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(l => l.id === id);
      if (existing) return prev.map(l => (l.id === id ? {...l, qty: l.qty + 1} : l));
      return [...prev, {id, qty: 1}];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(l => l.id === id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter(l => l.id !== id);
      return prev.map(l => (l.id === id ? {...l, qty: l.qty - 1} : l));
    });
  };

  const fireToast = (kind: 'waiter' | 'bill') => {
    setToast({kind, at: Date.now()});
    setTimeout(() => setToast(null), 2500);
  };

  const goToCat = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
      setActiveCat(id);
    }
  };

  const matchesQuery = (it: MenuItem, q: string) => {
    if (!q) return true;
    const norm = (s: string) => s.toLowerCase();
    return (
      norm(T(lang, it.name)).includes(norm(q)) ||
      norm(T(lang, it.desc)).includes(norm(q))
    );
  };

  return (
    <div className="vk-qr-root">
      {/* Local style block — overlays the demo on top of the inherited site shell so guests see only the menu. */}
      <style jsx global>{`
        body[data-qr-demo] {
          overflow: hidden;
        }
        body[data-qr-demo] header[data-nav],
        body[data-qr-demo] footer,
        body[data-qr-demo] #tawk-default-container,
        body[data-qr-demo] iframe[title*='chat'i],
        body[data-qr-demo] iframe[title*='widget'i],
        body[data-qr-demo] iframe[src*='tawk'],
        body[data-qr-demo] iframe[src*='embed.tawk.to'],
        body[data-qr-demo] [class*='tawk-min-container'],
        body[data-qr-demo] [id*='tawk'],
        body[data-qr-demo] > iframe:last-of-type {
          display: none !important;
        }
        body[data-qr-demo] main#main {
          padding-top: 0 !important;
        }
        .vk-qr-root {
          position: fixed;
          inset: 0;
          z-index: 100;
          overflow-y: auto;
          overflow-x: hidden;
          --paper: #FBF7EE;
          --paper-2: #F1E9D6;
          --ink: #1B1A18;
          --ink-2: #4A463E;
          --accent: #B8385F;
          --accent-2: #E1A24C;
          --line: rgba(27, 26, 24, 0.1);
          background: var(--paper);
          color: var(--ink);
          min-height: 100svh;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .vk-qr-root .serif {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
        }
        @media (prefers-reduced-motion: no-preference) {
          .vk-qr-fade-in {
            animation: vk-qr-fade 380ms ease both;
          }
        }
        @keyframes vk-qr-fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top brand bar */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: 'linear-gradient(180deg, rgba(251,247,238,0.96) 0%, rgba(251,247,238,0.85) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="max-w-md mx-auto px-4 pt-3 pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="serif text-2xl leading-none" style={{color: 'var(--ink)'}}>{RESTAURANT.name}</div>
              <div className="text-[10px] tracking-[0.45em] mt-1" style={{color: 'var(--ink-2)'}}>{RESTAURANT.subtitle}</div>
              <div className="text-[11px] mt-1.5" style={{color: 'var(--ink-2)'}}>{T(lang, RESTAURANT.tagline)}</div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {/* Lang */}
              <div className="flex gap-0.5 rounded-full border" style={{borderColor: 'var(--line)', background: '#fff'}}>
                {(['en', 'tr', 'ro', 'de'] as MenuLang[]).map(L => (
                  <button
                    key={L}
                    onClick={() => setLang(L)}
                    className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full transition"
                    style={{
                      background: lang === L ? 'var(--ink)' : 'transparent',
                      color: lang === L ? 'var(--paper)' : 'var(--ink-2)',
                    }}
                    aria-label={`Switch to ${L.toUpperCase()}`}
                  >
                    {L}
                  </button>
                ))}
              </div>
              <div className="text-[10px]" style={{color: 'var(--ink-2)'}}>
                {T(lang, UI.table)} 12
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-2.5 relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={T(lang, UI.search)}
              className="w-full rounded-full border text-sm px-4 py-2 outline-none focus:border-[var(--accent)] transition"
              style={{
                borderColor: 'var(--line)',
                background: '#fff',
                color: 'var(--ink)',
              }}
            />
          </div>

          {/* Category pills */}
          <div className="mt-2.5 -mx-4 px-4 overflow-x-auto hide-scrollbar">
            <div className="flex gap-1.5">
              {CATS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => goToCat(cat.id)}
                  className="whitespace-nowrap px-3 py-1.5 text-xs rounded-full font-semibold transition"
                  style={{
                    background: activeCat === cat.id ? 'var(--ink)' : '#fff',
                    color: activeCat === cat.id ? 'var(--paper)' : 'var(--ink)',
                    border: '1px solid ' + (activeCat === cat.id ? 'var(--ink)' : 'var(--line)'),
                  }}
                >
                  {T(lang, cat.name)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu body */}
      <div className="max-w-md mx-auto px-4 pt-3" style={{paddingBottom: cartCount > 0 ? 132 : 96}}>
        {CATS.map(cat => {
          const items = cat.items.filter(it => matchesQuery(it, search));
          if (search && items.length === 0) return null;
          return (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32 pt-4">
              <h2 className="serif text-2xl leading-none mb-3" style={{color: 'var(--ink)'}}>{T(lang, cat.name)}</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    qty={cart.find(l => l.id === item.id)?.qty || 0}
                    onAdd={() => addToCart(item.id)}
                    onOpen={() => setOpen(item)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {search && CATS.every(c => c.items.filter(i => matchesQuery(i, search)).length === 0) && (
          <div className="text-center py-12 text-sm" style={{color: 'var(--ink-2)'}}>{T(lang, UI.noResult)}</div>
        )}

        {/* Footer info */}
        <div className="mt-10 pt-6 border-t text-center" style={{borderColor: 'var(--line)'}}>
          <button
            onClick={() => setShowInfo(true)}
            className="text-xs underline decoration-dotted"
            style={{color: 'var(--ink-2)'}}
          >
            {T(lang, UI.info)}
          </button>
          <div className="mt-2 text-[10px] tracking-wider" style={{color: 'var(--ink-2)', opacity: 0.6}}>
            {T(lang, UI.poweredBy)} ·
            <Link href={sitePath} className="ml-1 underline">velkina.com</Link>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-40"
        style={{
          background: 'linear-gradient(0deg, var(--paper) 60%, rgba(251,247,238,0) 100%)',
          paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        }}
      >
        <div className="max-w-md mx-auto px-4 pb-3 pt-6">
          {cartCount > 0 && (
            <div className="rounded-2xl shadow-lg mb-2 vk-qr-fade-in" style={{background: 'var(--ink)', color: 'var(--paper)'}}>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] tracking-wider opacity-70 uppercase">{T(lang, UI.cart)}</div>
                  <div className="font-semibold text-sm">{cartCount} {T(lang, cartCount === 1 ? UI_ITEM_SINGULAR : UI_ITEM_PLURAL)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] tracking-wider opacity-70 uppercase">{T(lang, UI.total)}</div>
                  <div className="font-semibold text-base">€{total.toFixed(2)}</div>
                </div>
                <details className="ml-2">
                  <summary className="list-none text-xs underline cursor-pointer">▾</summary>
                </details>
              </div>
              <div className="px-4 pb-3 max-h-40 overflow-y-auto">
                {cart.map(line => {
                  const item = CATS.flatMap(c => c.items).find(i => i.id === line.id);
                  if (!item) return null;
                  return (
                    <div key={line.id} className="flex items-center justify-between py-1.5 border-t border-white/10">
                      <span className="text-xs">{line.qty}× {T(lang, item.name)}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-80">€{(item.price * line.qty).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(line.id)}
                          className="text-[10px] uppercase tracking-wider opacity-60 hover:opacity-100"
                        >
                          −
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => fireToast('waiter')}
              className="flex-1 rounded-full py-3 text-sm font-semibold border transition active:scale-[0.98]"
              style={{
                background: '#fff',
                color: 'var(--ink)',
                borderColor: 'var(--ink)',
              }}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h.01M6 12h.01M9 12h.01M12 12h9M3 6h.01M6 6h.01M9 6h.01M12 6h9M3 18h.01M6 18h.01M9 18h.01M12 18h9"/></svg>
                {T(lang, UI.callWaiter)}
              </span>
            </button>
            <button
              onClick={() => fireToast('bill')}
              className="flex-1 rounded-full py-3 text-sm font-semibold transition active:scale-[0.98]"
              style={{background: 'var(--accent)', color: '#fff'}}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                {T(lang, UI.requestBill)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Item modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div className="absolute inset-0" style={{background: 'rgba(15, 14, 12, 0.55)'}} />
          <div
            className="relative w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden vk-qr-fade-in"
            style={{background: '#fff', maxHeight: '90svh'}}
            onClick={e => e.stopPropagation()}
          >
            <div className="h-56 relative overflow-hidden" style={{background: '#222'}}>
              <img src={open.photo} alt={T(lang, open.name)} className="w-full h-full object-cover" />
              <button
                onClick={() => setOpen(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl"
                style={{background: 'rgba(0,0,0,0.55)'}}
                aria-label={T(lang, UI.close)}
              >
                ×
              </button>
            </div>
            <div className="p-5 overflow-y-auto" style={{maxHeight: 'calc(90svh - 11rem)'}}>
              <div className="serif text-2xl leading-tight">{T(lang, open.name)}</div>
              <div className="text-sm mt-2" style={{color: 'var(--ink-2)'}}>{T(lang, open.desc)}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(open.diet || []).map(d => (
                  <span key={d} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full" style={{background: 'var(--paper-2)', color: 'var(--ink)'}}>
                    {T(lang, DIET_LABEL[d])}
                  </span>
                ))}
                {(open.allergens || []).map(a => (
                  <span key={a} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full" style={{background: '#fbeae3', color: '#7a2412'}}>
                    contains {T(lang, ALLERGEN_LABEL[a])}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="font-semibold text-lg">€{open.price.toFixed(2)}</div>
                <button
                  onClick={() => {
                    addToCart(open.id);
                    setOpen(null);
                  }}
                  className="px-5 py-2.5 rounded-full font-semibold text-sm"
                  style={{background: 'var(--ink)', color: 'var(--paper)'}}
                >
                  + {T(lang, UI.add)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed left-1/2 top-24 z-50 -translate-x-1/2 vk-qr-fade-in"
          role="status"
        >
          <div
            className="rounded-full px-4 py-2 text-sm font-semibold shadow-lg"
            style={{background: 'var(--ink)', color: 'var(--paper)'}}
          >
            {toast.kind === 'waiter' ? T(lang, UI.waiterToast) : T(lang, UI.billToast)}
          </div>
        </div>
      )}

      {/* Info modal */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowInfo(false)}
        >
          <div className="absolute inset-0" style={{background: 'rgba(15,14,12,0.6)'}} />
          <div
            className="relative w-full max-w-md rounded-3xl overflow-hidden p-6 vk-qr-fade-in"
            style={{background: '#fff'}}
            onClick={e => e.stopPropagation()}
          >
            <div className="serif text-2xl mb-2">{T(lang, UI.info)}</div>
            <p className="text-sm leading-relaxed mb-3" style={{color: 'var(--ink-2)'}}>
              {T(lang, INFO_BODY_1)}
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{color: 'var(--ink-2)'}}>
              {T(lang, INFO_BODY_2)}
            </p>
            <div className="flex gap-2">
              <Link
                href={`${sitePath}/services#qr-menu`}
                className="flex-1 text-center rounded-full py-2.5 text-sm font-semibold"
                style={{background: 'var(--ink)', color: 'var(--paper)'}}
              >
                {T(lang, CTA_SEE_SERVICE)}
              </Link>
              <Link
                href={`${sitePath}/#cta`}
                className="flex-1 text-center rounded-full py-2.5 text-sm font-semibold"
                style={{background: 'var(--accent)', color: '#fff'}}
              >
                {T(lang, CTA_START)}
              </Link>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{background: 'var(--paper-2)', color: 'var(--ink)'}}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ItemCard({
  item,
  lang,
  qty,
  onAdd,
  onOpen,
}: {
  item: MenuItem;
  lang: MenuLang;
  qty: number;
  onAdd: () => void;
  onOpen: () => void;
}) {
  return (
    <div
      className="flex gap-3 rounded-2xl border overflow-hidden transition active:scale-[0.99]"
      style={{borderColor: 'var(--line)', background: '#fff'}}
    >
      <button
        onClick={onOpen}
        className="shrink-0 w-28 sm:w-32 relative overflow-hidden"
        style={{minHeight: 120, background: '#222'}}
        aria-label={T(lang, item.name)}
      >
        <img src={item.photo} alt={T(lang, item.name)} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        {/* subtle ring */}
        <span className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-l-2xl pointer-events-none" />
        {item.diet?.includes('chef') && (
          <span className="absolute top-2 left-2 text-[9px] tracking-wider uppercase font-bold px-1.5 py-0.5 rounded-full" style={{background: '#fff', color: '#1B1A18'}}>★ chef</span>
        )}
      </button>
      <div className="flex-1 py-3 pr-3 min-w-0">
        <button onClick={onOpen} className="block text-left w-full">
          <div className="serif text-base leading-tight">{T(lang, item.name)}</div>
          <div className="text-xs mt-1 line-clamp-2" style={{color: 'var(--ink-2)'}}>{T(lang, item.desc)}</div>
        </button>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {(item.diet || []).slice(0, 2).map(d => (
              <span key={d} className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{background: 'var(--paper-2)', color: 'var(--ink-2)'}}>
                {T(lang, DIET_LABEL[d])}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">€{item.price.toFixed(2)}</span>
            <button
              onClick={onAdd}
              className="w-8 h-8 rounded-full text-base font-bold transition active:scale-95"
              style={{background: 'var(--ink)', color: 'var(--paper)'}}
              aria-label={`${T(lang, UI.add)} ${T(lang, item.name)}`}
            >
              {qty > 0 ? qty : '+'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
