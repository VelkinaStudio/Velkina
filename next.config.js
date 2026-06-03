const withNextIntl = require('next-intl/plugin')();
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // One three.js + postprocessing instance across the app and the vendored
    // inkwell render engine (lib/inkwell, committed in-repo so Vercel builds
    // standalone — no file: link needed). Bare @velkina/inkwell specifiers
    // resolve to the vendored source here and in tsconfig paths.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      three: path.resolve(__dirname, 'node_modules/three'),
      postprocessing: path.resolve(__dirname, 'node_modules/postprocessing'),
      '@velkina/inkwell/react': path.resolve(__dirname, 'lib/inkwell/react.jsx'),
      '@velkina/inkwell': path.resolve(__dirname, 'lib/inkwell/index.js'),
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
