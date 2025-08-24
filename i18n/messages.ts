import en from '../messages/en.json';
import tr from '../messages/tr.json';

// Locales supported by the app
export const LOCALES = ['tr', 'en'] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'tr';

// Inferred message schema from the Turkish source of truth
export type Messages = typeof tr;

// Runtime map for messages
const MESSAGES: Record<Locale, Messages> = {
  tr,
  en,
};

export function isLocale(input: string | undefined | null): input is Locale {
  return input === 'tr' || input === 'en';
}

export function getMessages(locale: Locale = DEFAULT_LOCALE): Messages {
  return MESSAGES[locale] ?? tr;
}

export function getDefaultMessages(): Messages {
  return tr;
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
