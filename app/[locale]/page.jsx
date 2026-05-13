import HomeView from '../HomeView';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';
import ro from '../../messages/ro.json';

const DICTS = { en, tr, ro };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }, { locale: 'ro' }];
}

export function generateMetadata({ params }) {
  const { locale } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  return {
    title: messages.site.title,
    description: messages.site.description,
    alternates: { canonical: `/${locale}`, languages: { en: '/en', tr: '/tr', ro: '/ro' } }
  };
}

export default function LocalizedHome({ params }) {
  const { locale } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  return <HomeView messages={messages} locale={locale} />;
}
