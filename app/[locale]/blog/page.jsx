import BlogView from '../../blog/BlogView';
import en from '../../../messages/en.json';
import tr from '../../../messages/tr.json';

export function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

export function generateMetadata({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  return {
    title: messages.blog?.metaTitle || 'Velkina — Blog',
    description: messages.blog?.metaDesc || 'Velkina’dan içgörüler, pratik rehberler ve mühendislik notları.'
  };
}

export default function LocalizedBlog({params}) {
  const {locale} = params || {locale: 'en'};
  const messages = locale === 'en' ? en : tr;
  return <BlogView messages={messages} locale={locale} />;
}
