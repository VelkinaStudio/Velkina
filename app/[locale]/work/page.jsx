import WorkView from '../../work/WorkView';
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
    title: `${messages.work.hero.heading} — ${messages.site.name}`,
    description: messages.work.hero.sub,
    alternates: {
      canonical: `/${locale}/work`,
      languages: { en: '/en/work', tr: '/tr/work', ro: '/ro/work' }
    }
  };
}

export default function LocalizedWork({ params }) {
  const { locale } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  return <WorkView messages={messages} locale={locale} />;
}
