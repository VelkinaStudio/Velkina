import TermsView from '../../terms/TermsView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.terms?.title ? `${messages.terms.title} — Velkina` : (locale === 'tr' ? 'Koşullar — Velkina' : 'Terms — Velkina'),
    description: messages.terms?.desc
  };
}

export default function LocalizedTerms({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <TermsView messages={messages} locale={locale} />;
}
