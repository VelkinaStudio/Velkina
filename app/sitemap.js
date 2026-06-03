export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://velkina.com';
  const lastModified = new Date();

  // The portfolio is a single page at the root (comic world). The old editorial
  // /en /tr /ro routes are retired (redirected to /), so they're no longer in
  // the sitemap. Only the homepage and the live interactive demos are indexed.
  const demos = [
    'lavinia-bistro',
    'anatolia-hotel',
    'bosporus-travel',
    'konak-coffee',
    'marmara-foods',
    'nova-health',
    'skyline-media',
  ];

  return [
    { url: `${baseUrl}/`, lastModified, priority: 1 },
    ...demos.map((slug) => ({ url: `${baseUrl}/demo/${slug}`, lastModified, priority: 0.5 })),
  ];
}
