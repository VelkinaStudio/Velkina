import CustomerAgentView from '../../customer-agent/CustomerAgentView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';
import ro from '../../../messages/ro.json';

const DICTS = { en, tr, ro };
const TITLES = {
  en: 'Velkina — AI Customer Service Agents',
  tr: 'Velkina — Türkçe Müşteri Hizmetleri Ajanları',
  ro: 'Velkina — Agenți AI pentru servicii pentru clienți'
};
const DESCS = {
  en: 'Enhance customer service with AI agents that handle calls and chats. 24/7 support, faster responses, higher satisfaction.',
  tr: 'Yapay zekâ ajanlarıyla müşteri hizmetlerinizi geliştirin. 7/24 destek, daha hızlı yanıt, daha yüksek memnuniyet.',
  ro: 'Îmbunătățiți serviciile pentru clienți cu agenți AI care preiau apeluri și mesaje. Suport 24/7, răspunsuri rapide, satisfacție mai mare.'
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'tr'}, {locale: 'ro'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  return {
    title: TITLES[locale] || TITLES.en,
    description: DESCS[locale] || DESCS.en
  };
}

export default function LocalizedCustomerAgent({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <CustomerAgentView messages={messages} locale={locale} />;
}
