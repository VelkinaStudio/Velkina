import AboutView from '../../about/AboutView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.about?.title ? `Velkina — ${messages.about.title}` : 'Velkina — About',
    description: messages.about?.desc || 'Who we are, how we work, and why teams partner with Velkina.'
  };
}

export default function LocalizedAbout({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  return <AboutView messages={messages} locale={locale} />;
}
