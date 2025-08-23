import TermsPage from '../../terms/page.jsx';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  return {
    title: locale === 'tr' ? 'Koşullar — Velkina' : 'Terms — Velkina'
  };
}

export default function LocalizedTerms({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <TermsPage messages={messages} locale={locale} />;
}
