import Link from 'next/link';
import React from 'react';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import {CONTACT, telHref, mailHref, whatsappHref} from '../../lib/contact';

export type ContactViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function ContactView({messages, locale}: ContactViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const m = t('contact') as any;
  const nav = t('nav') as any;
  const common = t('common') as any;
  const prefix = locale ? `/${locale}` : '';

  const cardClass =
    'vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition';

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <h1 className="font-heading text-3xl md:text-4xl mb-2">{m?.title ?? 'Contact'}</h1>
      <p className="text-white/80 mb-6">{m?.subtitle ?? 'Quick contact with Velkina.'}</p>

      <div className="grid gap-4">
        <a href={mailHref(common?.emailSubject)} className={cardClass}>
          <div className="font-heading">{m?.email ?? 'Email'}</div>
          <div className="text-white/80">{CONTACT.email}</div>
        </a>
        <a href={telHref} className={cardClass}>
          <div className="font-heading">{m?.phone ?? 'Phone'}</div>
          <div className="text-white/80">{CONTACT.phoneDisplay}</div>
        </a>
        <a
          href={whatsappHref(common?.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <div className="font-heading">{m?.whatsapp ?? 'WhatsApp'}</div>
          <div className="text-white/80">{CONTACT.phoneDisplay}</div>
        </a>
        <a
          href={CONTACT.scheduleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <div className="font-heading">{m?.schedule ?? 'Schedule a call'}</div>
          <div className="text-white/80">{m?.scheduleDesc ?? 'Pick a time that works for you'}</div>
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`${prefix}/#cta`}
          className="inline-flex items-center px-5 py-3 rounded-xl bg-vkpink text-black font-mono shadow-strong"
        >
          {nav?.startProject ?? 'Start project'}
        </Link>
      </div>
    </div>
  );
}
