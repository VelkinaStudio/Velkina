import en from '../messages/en.json';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://velkina.com';
  const lastModified = new Date();
  const locales = ['en', 'tr', 'ro'];
  const paths = ['', 'work', 'services', 'about', 'contact', 'privacy', 'terms'];
  const slugs = Object.keys(en.useCase.studies);
  const entries = [];
  for (const locale of locales) {
    for (const p of paths) {
      const suffix = p ? `/${p}` : '';
      entries.push({ url: `${baseUrl}/${locale}${suffix}`, lastModified });
    }
    for (const slug of slugs) {
      entries.push({ url: `${baseUrl}/${locale}/work/${slug}`, lastModified });
    }
  }
  return entries;
}
