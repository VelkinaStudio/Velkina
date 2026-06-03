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
      // The portfolio lives at the root (app/page.tsx, comic world). The old
      // editorial agency routes (services / work / about / contact / legal +
      // their locale roots) are retired — they carried the rejected agency
      // funnel and stale "Istanbul · Bucharest · Berlin" framing. Bounce every
      // /en /tr /ro editorial path to the homepage. /demo/* stays — those are
      // the live interactive demos the Work section links to.
      { source: '/:locale(en|tr|ro)', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/use-cases/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/blog/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/work/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/services/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/about/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/contact/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/customer-agent/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/terms/:path*', destination: '/', permanent: false },
      { source: '/:locale(en|tr|ro)/privacy/:path*', destination: '/', permanent: false }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
