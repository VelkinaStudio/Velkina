import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported locales
  locales: ['en', 'tr'],
  // Default locale when visiting '/'
  defaultLocale: 'tr'
});

export const config = {
  // Enforce locale prefixes and ignore Next.js internals & static files
  matcher: [
    '/((?!_next|.*\\..*).*)'
  ]
};
