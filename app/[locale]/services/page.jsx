import ServicesView from '../../services/ServicesView';
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
    title: messages.services?.metaTitle || 'Velkina — Services',
    description: messages.services?.metaDesc || 'Full-service software, design and growth agency.'
  };
}

export default function LocalizedServices({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <ServicesView messages={messages} locale={locale} />;
}
