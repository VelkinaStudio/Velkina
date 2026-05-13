import ContactView from '../../contact/ContactView';
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
    title: `${messages.contact.hero.heading} — ${messages.site.name}`,
    description: messages.contact.hero.sub,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: '/en/contact', tr: '/tr/contact', ro: '/ro/contact' }
    }
  };
}

export default function LocalizedContact({ params }) {
  const { locale } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  return <ContactView messages={messages} locale={locale} />;
}
