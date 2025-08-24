import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const localeFromRequest = (await requestLocale) ?? 'tr';
  // Fallback to 'tr' if an unexpected locale is encountered
  const safeLocale = ['tr', 'en'].includes(localeFromRequest) ? localeFromRequest : 'tr';
  const messages = (await import(`../messages/${safeLocale}.json`)).default;
  return {messages, locale: safeLocale};
});
