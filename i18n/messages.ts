import en from '../messages/en.json';
import tr from '../messages/tr.json';
import ro from '../messages/ro.json';

// Locales supported by the app
export const LOCALES = ['en', 'tr', 'ro'] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'en';

// Inferred message schema from the English source of truth
export type Messages = typeof en;

// Runtime map for messages
const MESSAGES: Record<Locale, Messages> = {
  en,
  tr: tr as unknown as Messages,
  ro: ro as unknown as Messages,
};

export function isLocale(input: string | undefined | null): input is Locale {
  return input === 'en' || input === 'tr' || input === 'ro';
}

export function getMessages(locale: Locale = DEFAULT_LOCALE): Messages {
  return MESSAGES[locale] ?? en;
}

export function getDefaultMessages(): Messages {
  return en;
}

// Simple, typed accessor with up to 3 levels of nesting
export function createT(messages: Messages) {
  function t<K1 extends keyof Messages>(k1: K1): Messages[K1];
  function t<K1 extends keyof Messages, K2 extends keyof Messages[K1]>(
    k1: K1,
    k2: K2
  ): Messages[K1][K2];
  function t<
    K1 extends keyof Messages,
    K2 extends keyof Messages[K1],
    K3 extends keyof Messages[K1][K2]
  >(k1: K1, k2: K2, k3: K3): Messages[K1][K2][K3];
  function t(...args: any[]): any {
    let cur: any = messages;
    for (const part of args) {
      if (cur == null) return undefined;
      cur = cur[part as never];
    }
    return cur;
  }
  return t;
}
