import UseCasesView from '../../use-cases/UseCasesView';
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
    title: messages.useCases?.metaTitle || 'Velkina — Portfolio',
    description: messages.useCases?.metaDesc || 'Real projects we shipped: websites, e-commerce, AI agents, cloud and growth systems.'
  };
}

export default function LocalizedUseCases({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <UseCasesView messages={messages} locale={locale} />;
}
