import HomeView from '../HomeViewSnap';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';
import ro from '../../messages/ro.json';

const DICTS = { en, tr, ro };

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'tr'}, {locale: 'ro'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return {
    title: messages.site?.title || 'Velkina — Software & Design Agency',
    description: messages.site?.description || 'Velkina builds software, design and growth systems for businesses.'
  };
}

export default function LocalizedHome({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <HomeView messages={messages} locale={locale} />;
}
