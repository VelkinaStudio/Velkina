import en from '../../../../messages/en.json';
import tr from '../../../../messages/tr.json';
import ro from '../../../../messages/ro.json';
import UseCaseDetailView from '../../../use-cases/UseCaseDetailView';
import { notFound } from 'next/navigation';

const DICTS = { en, tr, ro };

export function generateStaticParams() {
  const params = [];
  for (const locale of ['en', 'tr', 'ro']) {
    const items = DICTS[locale]?.useCases?.projects?.items || [];
    for (const it of items) {
      if (it?.slug) params.push({ locale, slug: it.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const { locale = 'en', slug = '' } = params || {};
  const messages = DICTS[locale] || en;
  const items = messages?.useCases?.projects?.items || [];
  const project = items.find(p => p.slug === slug);
  if (!project) return { title: 'Velkina — Project' };
  return {
    title: `${project.title} · Velkina`,
    description: project.intro
  };
}

export default function UseCaseDetailPage({ params }) {
  const { locale = 'en', slug = '' } = params || {};
  const messages = DICTS[locale] || en;
  const items = messages?.useCases?.projects?.items || [];
  const project = items.find(p => p.slug === slug);
  if (!project) notFound();
  return <UseCaseDetailView project={project} messages={messages} locale={locale} />;
}
