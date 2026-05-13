const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Old route → new route, keep SEO equity from the prior site
      { source: '/:locale(en|tr|ro)/use-cases', destination: '/:locale/work', permanent: true },
      { source: '/:locale(en|tr|ro)/use-cases/:slug', destination: '/:locale/work/:slug', permanent: true },
      { source: '/:locale(en|tr|ro)/blog', destination: '/:locale', permanent: false },
      { source: '/:locale(en|tr|ro)/blog/:slug', destination: '/:locale', permanent: false },
      { source: '/:locale(en|tr|ro)/customer-agent', destination: '/:locale/services#automation', permanent: true },
      { source: '/:locale(en|tr|ro)/demo/qr-menu', destination: '/:locale/work/lavinia-bistro-qr-menu', permanent: false }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
