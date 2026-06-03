const withNextIntl = require('next-intl/plugin')();

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile our local linked engine (it ships JSX + modern syntax that
  // node_modules normally aren't run through Babel for).
  transpilePackages: ['@velkina/inkwell'],
  webpack(config) {
    // Force a SINGLE three.js + postprocessing instance across the app and the
    // linked @velkina/inkwell package. Two copies of three break R3F effect
    // identity ("Multiple instances of Three.js being imported").
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      three: path.resolve(__dirname, 'node_modules/three'),
      postprocessing: path.resolve(__dirname, 'node_modules/postprocessing'),
    };
    return config;
  },
  async redirects() {
    return [
      // Old route → new route, keep SEO equity from the prior site
      { source: '/:locale(en|tr|ro)/use-cases', destination: '/:locale/work', permanent: true },
      { source: '/:locale(en|tr|ro)/use-cases/:slug', destination: '/:locale/work/:slug', permanent: true },
      { source: '/:locale(en|tr|ro)/blog', destination: '/:locale', permanent: false },
      { source: '/:locale(en|tr|ro)/blog/:slug', destination: '/:locale', permanent: false },
      { source: '/:locale(en|tr|ro)/customer-agent', destination: '/:locale/services#automation', permanent: true },
      { source: '/:locale(en|tr|ro)/demo/qr-menu', destination: '/demo/lavinia-bistro', permanent: false }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
