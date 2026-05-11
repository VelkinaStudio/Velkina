import BlogView from '../../blog/BlogView';
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
  return {
    title: messages.blog?.metaTitle || 'Velkina — Blog',
    description: messages.blog?.metaDesc || 'Insights, practical guides and engineering notes from Velkina.',
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { en: '/en/blog', tr: '/tr/blog', ro: '/ro/blog' }
    },
    robots: { index: false, follow: false }
  };
}

export default function LocalizedBlog({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = DICTS[locale] || en;
  return <BlogView messages={messages} locale={locale} />;
}
