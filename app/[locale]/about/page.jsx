import AboutPage from '../../about/page.jsx';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.nav?.about ? `Velkina — ${messages.nav.about}` : 'Velkina — About',
    description: 'Who we are, how we work, and why teams partner with Velkina.'
  };
}

export default function LocalizedAbout({params}) {
  const {locale} = params || {locale: 'tr'};
  const messages = locale === 'en' ? en : tr;
  return <AboutPage messages={messages} locale={locale} />;
}
