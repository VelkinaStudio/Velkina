import CustomerAgentView from '../../customer-agent/CustomerAgentView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  const title = locale === 'en' ? 'Velkina — Turkish Customer Service Agents' : 'Velkina — Türkçe Müşteri Hizmetleri Ajanları';
  const description = locale === 'en' 
    ? 'Enhance your customer service with AI agents fluent in Turkish. Provide 24/7 support, reduce response times, and improve customer satisfaction.'
    : 'Türkçe akıcı yapay zeka ajanlarıyla müşteri hizmetlerinizi geliştirin. 7/24 destek sağlayın, yanıt sürelerini azaltın ve müşteri memnuniyetini artırın.';
  
  return {
    title,
    description
  };
}

export default function LocalizedCustomerAgent({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  return <CustomerAgentView messages={messages} locale={locale} />;
}