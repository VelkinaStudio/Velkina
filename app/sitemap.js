export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const lastModified = new Date();
  const locales = ['tr', 'en'];
  const paths = ['', 'services', 'use-cases', 'blog'];
  const entries = [];
  for (const locale of locales) {
    for (const p of paths) {
      const suffix = p ? `/${p}` : '';
      entries.push({ url: `${baseUrl}/${locale}${suffix}`, lastModified });
    }
  }
  return entries;
}
