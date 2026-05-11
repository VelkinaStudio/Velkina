import React from 'react';
import HeroShapesClient from '../../components/HeroShapesClient';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import Link from 'next/link';
import {mailHref, whatsappHref} from '../../lib/contact';

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
  const overview = ca.overview ?? {};
  const features = ca.features ?? {};
  const benefits = ca.benefits ?? {};
  const useCases = ca.useCases ?? {};
  const implementation = ca.implementation ?? {};
  const cta = ca.cta ?? {};

  const featuresItems: CardItem[] = Array.isArray(features.items) ? features.items : [];
  const benefitsItems: CardItem[] = Array.isArray(benefits.items) ? benefits.items : [];
  const useCasesItems: CardItem[] = Array.isArray(useCases.items) ? useCases.items : [];
  const implementationItems: CardItem[] = Array.isArray(implementation.items) ? implementation.items : [];

  return (
    <div className="pt-4">
      {/* Hero */}
      <section className="vk-hero relative overflow-hidden">
        <div
          className="absolute -inset-24 blur-3xl opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px 300px at 20% 10%, rgba(162,89,255,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(0,255,255,.25), transparent 60%)',
          }}
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-14 grid gap-10 sm:grid-cols-2 items-center">
          {/* Left column: title + copy */}
          <div>
            <h1 className="font-heading text-4xl md:text-5xl">{hero.title}</h1>
            <p className="text-white/80 max-w-2xl mt-3">{hero.description}</p>
          </div>
          {/* Right column: animation canvas */}
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <canvas
              id="vk-hero-shapes"
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label={hero.canvasAriaLabel}
            ></canvas>
          </div>
        </div>
        {/* Wire shapes */}
        <HeroShapesClient />
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">{overview.heading}</h2>
          <p className="text-white/80 max-w-3xl text-lg">{overview.body}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{features.heading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresItems.map((feature, index) => (
              <div key={index} className="bg-black/20 p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <h3 className="font-heading text-xl mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{benefits.heading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitsItems.map((benefit, index) => (
              <div key={index} className="p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <h3 className="font-heading text-xl mb-3">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{useCases.heading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCasesItems.map((useCase, index) => (
              <div key={index} className="bg-black/20 p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <h3 className="font-heading text-xl mb-3">{useCase.title}</h3>
                <p className="text-white/70">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{implementation.heading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {implementationItems.map((step, index) => (
              <div key={index} className="p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-vkcyan/20 flex items-center justify-center mr-3">
                    <span className="font-heading">{index + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl">{step.title}</h3>
                </div>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black/0 to-black/30">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">{cta.heading}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href={`/${locale}/contact`} className="vk-button vk-button-primary">
              {cta.contactButton}
            </Link>
            <a href={whatsappHref(common?.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="vk-button vk-button-outline">
              {cta.whatsappButton}
            </a>
            <a href={mailHref(common?.emailSubject)} className="vk-button vk-button-outline">
              {cta.emailButton}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
