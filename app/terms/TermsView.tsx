import React from 'react';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';

export type TermsViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function TermsView({messages}: TermsViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const m = t('terms') as any;
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <h1 className="font-heading text-3xl md:text-4xl mb-3">{m?.title ?? 'Terms'}</h1>
      <p className="text-white/80">{m?.desc ?? 'Terms and conditions.'}</p>
      {m?.lastUpdated && (
        <p className="text-white/50 text-sm mt-2">{`${m?.lastUpdatedLabel ?? 'Last updated'}: ${m.lastUpdated}`}</p>
      )}

      {Array.isArray(m?.sections) && m.sections.length > 0 && (
        <div className="mt-8 space-y-8">
          {m.sections.map((sec: any, idx: number) => (
            <section key={idx} className="space-y-3">
              {sec?.title && (
                <h2 className="font-heading text-xl md:text-2xl">{sec.title}</h2>
              )}
              {Array.isArray(sec?.body) && sec.body.map((p: string, i: number) => (
                <p key={i} className="text-white/80 leading-relaxed">{p}</p>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
