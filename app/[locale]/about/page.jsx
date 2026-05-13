import AboutView from '../../about/AboutView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';
import ro from '../../../messages/ro.json';

const DICTS = { en, tr, ro };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }, { locale: 'ro' }];
}

export function generateMetadata({ params }) {
  const { locale } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  return {
    title: `${messages.about.hero.heading} — ${messages.site.name}`,
    description: messages.about.hero.sub,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: '/en/about', tr: '/tr/about', ro: '/ro/about' }
    }
  };
}

export default function LocalizedAbout({ params }) {
  const { locale } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  return <AboutView messages={messages} locale={locale} />;
}
