import QrMenuView from '../../../demo/qr-menu/QrMenuView';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  const isTr = locale === 'tr';
  return {
    title: isTr
      ? 'QR Menü Demo — Lavinia Bistro · Velkina'
      : 'QR Menu Demo — Lavinia Bistro · Velkina',
    description: isTr
      ? 'Restoranlar, kafeler ve barlar için Velkina’nın çalışan QR menü demosu. Mobil öncelikli, çok dilli, fotoğraflı.'
      : 'A working QR menu demo by Velkina for restaurants, cafés, and bars. Mobile-first, multilingual, photo-rich.',
  };
}

export default function LocalizedQrMenuDemo({params}) {
  const {locale} = params || {locale: 'en'};
  return <QrMenuView sitePath={`/${locale}`} />;
}
