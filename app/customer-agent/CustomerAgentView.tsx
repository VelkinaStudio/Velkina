import React from 'react';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import {whatsappHref, CONTACT} from '../../lib/contact';

export type CustomerAgentViewProps = {
  messages?: Messages;
  locale?: Locale;
};

type CardItem = {title: string; description: string};

export default function CustomerAgentView({messages, locale}: CustomerAgentViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const common = (t('common') as any) ?? {};
  const ca = (t('customerAgent' as any) as any) ?? {};

  const hero = ca.hero ?? {};
  const useCases = ca.useCases ?? {};
  const processSection = ca.process ?? {};
  const included = ca.included ?? {};
  const notForThis = ca.notForThis ?? {};
  const why = ca.why ?? {};
  const cta = ca.cta ?? {};

  const useCaseItems: CardItem[] = Array.isArray(useCases.items) ? useCases.items : [];
  const processSteps: CardItem[] = Array.isArray(processSection.steps) ? processSection.steps : [];
  const includedItems: string[] = Array.isArray(included.items) ? included.items : [];

  const scheduleHref = CONTACT.scheduleUrl;
  const whatsapp = whatsappHref(common?.whatsappPrefill);

  return (
    <div className="pt-4">
      {/* Hero */}
      <section className="vk-hero relative overflow-hidden">
        {/* Soft amber-tinted gradient orb — replaces Turkish-specific HeroShapes canvas */}
        <div
          aria-hidden="true"
          className="absolute -inset-24 blur-3xl opacity-70 pointer-events-none"
          style={{
            background:
              'radial-gradient(620px 320px at 18% 12%, rgba(255, 176, 64, 0.30), transparent 65%), radial-gradient(560px 280px at 82% 78%, rgba(255, 138, 32, 0.18), transparent 65%)',
          }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-16 grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.18em] text-vkaccent/90 mb-4">
              Velkina · AI agents
            </span>
            <h1 className="font-heading text-4xl md:text-5xl leading-tight">{hero.title}</h1>
            <p className="text-white/80 max-w-2xl mt-4 text-base md:text-lg">{hero.description}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a
                href={scheduleHref}
                target="_blank"
                rel="noopener noreferrer"
                className="vk-button vk-button-primary"
              >
                {hero.primaryCta}
              </a>
              <a href="#use-cases" className="vk-button vk-button-outline">
                {hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* Decorative slowly-rotating gradient orb — CSS only, no JS */}
          <div className="relative min-h-[220px] md:min-h-[360px] flex items-center justify-center" aria-hidden="true">
            <div
              role="img"
              aria-label={hero.canvasAriaLabel}
              className="vk-agent-orb"
            >
              <div className="vk-agent-orb__core"></div>
              <div className="vk-agent-orb__ring vk-agent-orb__ring--1"></div>
              <div className="vk-agent-orb__ring vk-agent-orb__ring--2"></div>
            </div>
          </div>
        </div>

        <style>{`
          .vk-agent-orb {
            position: relative;
            width: min(360px, 80%);
            aspect-ratio: 1 / 1;
          }
          .vk-agent-orb__core {
            position: absolute;
            inset: 22%;
            border-radius: 9999px;
            background: radial-gradient(circle at 35% 30%, rgba(255, 200, 110, 0.95), rgba(255, 138, 32, 0.55) 55%, rgba(180, 70, 0, 0.0) 75%);
            box-shadow: 0 0 80px rgba(255, 160, 60, 0.35), inset 0 0 60px rgba(255, 220, 160, 0.18);
            filter: saturate(1.05);
          }
          .vk-agent-orb__ring {
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            border: 1px solid rgba(255, 176, 64, 0.20);
            animation: vk-orb-spin 18s linear infinite;
          }
          .vk-agent-orb__ring--1 {
            inset: 6%;
            border-color: rgba(255, 200, 120, 0.16);
            animation-duration: 24s;
          }
          .vk-agent-orb__ring--2 {
            inset: 14%;
            border-color: rgba(255, 176, 64, 0.10);
            animation-duration: 32s;
            animation-direction: reverse;
          }
          @keyframes vk-orb-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .vk-agent-orb__ring { animation: none; }
          }
        `}</style>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-3">{useCases.heading}</h2>
          {useCases.description ? (
            <p className="text-white/70 max-w-3xl mb-10">{useCases.description}</p>
          ) : null}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCaseItems.map((item, i) => (
              <div
                key={i}
                className="bg-black/25 p-6 rounded-lg border border-white/10 hover:border-vkaccent/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-vkaccent/15 text-vkaccent text-xs font-heading">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-lg">{item.title}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — 4 steps */}
      <section className="py-16 md:py-24 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-3">{processSection.heading}</h2>
          {processSection.description ? (
            <p className="text-white/70 max-w-3xl mb-10">{processSection.description}</p>
          ) : null}
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <li
                key={i}
                className="relative p-6 rounded-lg border border-white/10 bg-black/20"
              >
                <div className="text-vkaccent font-heading text-2xl mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-heading text-lg mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-8">{included.heading}</h2>
          <ul className="space-y-4">
            {includedItems.map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-white/85">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-vkaccent shrink-0"
                ></span>
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* When AI agents don't make sense — honest section */}
      <section className="py-16 md:py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="border border-vkaccent/25 rounded-lg p-6 md:p-8 bg-black/30">
            <h2 className="font-heading text-2xl md:text-3xl mb-4 text-vkaccent">
              {notForThis.heading}
            </h2>
            <p className="text-white/80 leading-relaxed">{notForThis.body}</p>
          </div>
        </div>
      </section>

      {/* Why Velkina */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">{why.heading}</h2>
          <p className="text-white/80 leading-relaxed text-base md:text-lg">{why.body}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-black/0 to-black/40">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">{cta.heading}</h2>
          {cta.description ? (
            <p className="text-white/75 max-w-2xl mx-auto mb-8">{cta.description}</p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={scheduleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-button vk-button-primary"
            >
              {cta.primary}
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="vk-button vk-button-outline">
              {cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
