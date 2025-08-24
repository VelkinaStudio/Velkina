import ContactView from '../../contact/ContactView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.contact?.title ? `Velkina — ${messages.contact.title}` : 'Velkina — Contact',
    description: messages.contact?.subtitle || 'Quick contact with Velkina.'
  };
}

export default function LocalizedContact({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <ContactView messages={messages} locale={locale} />;
}
