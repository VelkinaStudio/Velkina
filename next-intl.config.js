module.exports = {
  locales: ['tr', 'en'],
  // Use English for all non‑Turkish visitors (Turkish browsers will be detected via middleware)
  defaultLocale: 'en',
  // Ensures locale is always prefixed in URLs like /tr/... and /en/...
  localePrefix: 'always'
};
