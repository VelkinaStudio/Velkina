import HomeView from '../HomeView';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.site?.title || 'Velkina — Yarını Birlikte İnşa Edelim',
    description: messages.site?.description || 'Velkina, İstanbul merkezli kıdemli bir yaratıcı mühendislik stüdyosudur. Next.js, edge barındırma ve modern araçlarla yüksek performanslı web siteleri, uygulamalar ve sistemler tasarlar, geliştirir ve ölçeklendirir.'
  };
}

export default function LocalizedHome({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <HomeView messages={messages} locale={locale} />;
}
