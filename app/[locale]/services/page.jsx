import ServicesView from '../../services/ServicesView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.services?.metaTitle || 'Velkina — Hizmetler',
    description: messages.services?.metaDesc || 'Web, barındırma, IT, ara katman, büyüme, prodüksiyon ve dijital turlar boyunca uçtan uca hizmetler.'
  };
}

export default function LocalizedServices({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <ServicesView messages={messages} locale={locale} />;
}
