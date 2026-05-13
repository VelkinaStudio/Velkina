import WorkDetailView from '../../../work/WorkDetailView';
import { notFound } from 'next/navigation';
import en from '../../../../messages/en.json';
import tr from '../../../../messages/tr.json';
import ro from '../../../../messages/ro.json';

const DICTS = { en, tr, ro };

export function generateStaticParams() {
  const slugs = Object.keys(en.useCase.studies);
  const out = [];
  for (const locale of ['en', 'tr', 'ro']) for (const slug of slugs) out.push({ locale, slug });
  return out;
}

export function generateMetadata({ params }) {
  const { locale, slug } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  const study = messages.useCase?.studies?.[slug];
  if (!study) return { title: messages.site.title };
  return {
    title: `${study.title} — ${messages.site.name}`,
    description: study.outcome,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        en: `/en/work/${slug}`,
        tr: `/tr/work/${slug}`,
        ro: `/ro/work/${slug}`
      }
    },
    openGraph: {
      title: study.title,
      description: study.outcome,
      images: study.image ? [study.image] : []
    }
  };
}

export default function LocalizedWorkDetail({ params }) {
  const { locale, slug } = params || { locale: 'en' };
  const messages = DICTS[locale] || en;
  if (!messages.useCase?.studies?.[slug]) notFound();
  return <WorkDetailView messages={messages} locale={locale} slug={slug} />;
}
