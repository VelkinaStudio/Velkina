const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // One three.js + postprocessing instance across the app and the vendored
    // inkwell render engine (lib/inkwell, committed in-repo). Bare
    // @velkina/inkwell specifiers resolve to the vendored source.
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
    // The old editorial /en /tr /ro agency routes are gone. Anything that still
    // points at them lands on the single-page portfolio.
    return [
      { source: '/:locale(en|tr|ro)', destination: '/', permanent: true },
      { source: '/:locale(en|tr|ro)/:path*', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
