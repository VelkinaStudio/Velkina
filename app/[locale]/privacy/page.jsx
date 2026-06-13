import PrivacyView from '../../privacy/PrivacyView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.privacy?.title ? `${messages.privacy.title} — Velkina` : (locale === 'tr' ? 'Gizlilik — Velkina' : 'Privacy — Velkina'),
    description: messages.privacy?.desc
  };
}

export default function LocalizedPrivacy({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  return <PrivacyView messages={messages} locale={locale} />;
}
