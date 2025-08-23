import ContactPage from '../../contact/page.jsx';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.nav?.contact ? `Velkina — ${messages.nav.contact}` : 'Velkina — Contact',
    description: messages.services?.quickContactDesc || 'Quick contact with Velkina.'
  };
}

export default function LocalizedContact({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <ContactPage messages={messages} locale={locale} />;
}
