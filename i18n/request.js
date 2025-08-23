import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Fallback to 'tr' if an unexpected locale is encountered
  const safeLocale = ['tr', 'en'].includes(locale) ? locale : 'tr';
  const messages = (await import(`../messages/${safeLocale}.json`)).default;
  return {messages, locale: safeLocale};
});
