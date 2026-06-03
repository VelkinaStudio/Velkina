export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://velkina.com';
  const lastModified = new Date();

  // Single-page portfolio + the live interactive demos.
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
