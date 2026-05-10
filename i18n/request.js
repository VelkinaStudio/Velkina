import {getRequestConfig} from 'next-intl/server';

const SUPPORTED = ['en', 'tr', 'ro'];

export default getRequestConfig(async ({requestLocale}) => {
  const localeFromRequest = (await requestLocale) ?? 'en';
  const safeLocale = SUPPORTED.includes(localeFromRequest) ? localeFromRequest : 'en';
  const messages = (await import(`../messages/${safeLocale}.json`)).default;
  return {messages, locale: safeLocale};
});
