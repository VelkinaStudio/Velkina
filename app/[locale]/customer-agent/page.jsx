import CustomerAgentView from '../../customer-agent/CustomerAgentView';
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
  const ca = messages.customerAgent || {};
  return {
    title: ca.metaTitle || 'Velkina — AI Customer Service Agents',
    description: ca.metaDescription || 'Multilingual AI customer service agents (EN/TR/RO/DE/ES). 24/7 support, faster responses, higher satisfaction.',
    alternates: {
      canonical: `/${locale}/customer-agent`,
      languages: { en: '/en/customer-agent', tr: '/tr/customer-agent', ro: '/ro/customer-agent' }
    }
  };
}

export default function LocalizedCustomerAgent({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <CustomerAgentView messages={messages} locale={locale} />;
}
