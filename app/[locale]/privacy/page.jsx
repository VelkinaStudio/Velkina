import PrivacyPage from '../../privacy/page.jsx';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: locale === 'tr' ? 'Gizlilik — Velkina' : 'Privacy — Velkina'
  };
}

export default function LocalizedPrivacy({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <PrivacyPage messages={messages} locale={locale} />;
}
