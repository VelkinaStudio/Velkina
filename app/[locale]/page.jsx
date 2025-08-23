import HomePage from '../page.jsx';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export default function LocalizedHome({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <HomePage messages={messages} locale={locale} />;
}
