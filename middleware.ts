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
  // Enforce locale prefixes and ignore Next.js internals & static files
  matcher: [
    '/((?!_next|.*\\..*).*)'
  ]
};
