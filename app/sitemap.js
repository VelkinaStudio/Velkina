export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const lastModified = new Date();
  const locales = ['en', 'tr', 'ro'];
  const paths = ['', 'services', 'use-cases', 'blog', 'about', 'contact'];
  const entries = [];
  for (const locale of locales) {
    for (const p of paths) {
      const suffix = p ? `/${p}` : '';
      entries.push({ url: `${baseUrl}/${locale}${suffix}`, lastModified });
    }
  }
  return entries;
}
