const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // One three.js instance if any demo route uses it.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      three: path.resolve(__dirname, 'node_modules/three'),
    };
    return config;
  },
  async redirects() {
    // The old editorial /en /tr /ro agency routes are gone. Anything that still
    // points at them lands on the single-page portfolio.
    return [
      { source: '/:locale(en|tr|ro)', destination: '/', permanent: true },
      { source: '/:locale(en|tr|ro)/:path*', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
