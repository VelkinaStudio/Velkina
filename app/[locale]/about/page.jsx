import AboutView from '../../about/AboutView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';
import ro from '../../../messages/ro.json';

const DICTS = { en, tr, ro };

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'tr'}, {locale: 'ro'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return {
    title: messages.about?.title ? `Velkina — ${messages.about.title}` : 'Velkina — About',
    description: messages.about?.desc || 'Who we are, how we work, and why teams partner with Velkina.'
  };
}

export default function LocalizedAbout({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <AboutView messages={messages} locale={locale} />;
}
