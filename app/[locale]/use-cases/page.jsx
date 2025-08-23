import UseCasesPage from '../../use-cases/page.jsx';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.useCases?.metaTitle || 'Velkina — Kullanım Alanları',
    description: messages.useCases?.metaDesc || 'Hızla hayata geçen senaryolar: siteler, sistemler, otomasyonlar ve ölçülebilir büyüme.'
  };
}

export default function LocalizedUseCases({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <UseCasesPage messages={messages} locale={locale} />;
}
