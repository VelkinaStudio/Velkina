import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported locales: English, Turkish, Romanian
  locales: ['en', 'tr', 'ro'],
  // Default locale when visiting '/'; Accept-Language will route TR/RO browsers automatically
  defaultLocale: 'en',
  // Always prefix URLs with the locale segment and detect from Accept-Language on first visit
  localePrefix: 'always',
  localeDetection: true
});

export const config = {
  // Enforce locale prefixes everywhere EXCEPT:
  //   _next      → Next.js internals
  //   *.foo      → static files
  //   demo/*     → English-only demo sites (showcase mini-products)
  //   robots.txt, sitemap.xml → handled by Next directly
  matcher: [
    '/((?!_next|demo|robots\\.txt|sitemap\\.xml|.*\\..*).*)'
  ]
};
