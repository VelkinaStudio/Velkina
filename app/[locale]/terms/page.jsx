import TermsView from '../../terms/TermsView';
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
    title: messages.terms?.title ? `${messages.terms.title} — Velkina` : 'Terms — Velkina',
    description: messages.terms?.desc
  };
}

export default function LocalizedTerms({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <TermsView messages={messages} locale={locale} />;
}
