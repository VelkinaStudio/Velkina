import QrMenuView from '../../../demo/qr-menu/QrMenuView';

const TITLES = {
  en: 'QR Menu Demo — Lavinia Bistro · Velkina',
  tr: 'QR Menü Demo — Lavinia Bistro · Velkina',
  ro: 'Demo Meniu QR — Lavinia Bistro · Velkina'
};
const DESCS = {
  en: 'A working QR menu demo by Velkina for restaurants, cafés and bars. Mobile-first, multilingual, photo-rich.',
  tr: 'Restoranlar, kafeler ve barlar için Velkina’nın çalışan QR menü demosu. Mobil öncelikli, çok dilli, fotoğraflı.',
  ro: 'Demo de meniu QR funcțional pentru restaurante, cafenele și baruri. Mobile-first, multilingv, cu fotografii.'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'tr'}, {locale: 'ro'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  return {
    title: TITLES[locale] || TITLES.en,
    description: DESCS[locale] || DESCS.en,
    alternates: {
      canonical: `/${locale}/demo/qr-menu`,
      languages: { en: '/en/demo/qr-menu', tr: '/tr/demo/qr-menu', ro: '/ro/demo/qr-menu' }
    }
  };
}

export default function LocalizedQrMenuDemo({params}) {
  const {locale} = params || {locale: 'en'};
  return <QrMenuView sitePath={`/${locale}`} />;
}
