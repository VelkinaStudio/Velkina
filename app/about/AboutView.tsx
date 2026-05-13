import Link from 'next/link';
import { whatsappHref } from '../../lib/contact';

type Locale = 'en' | 'tr' | 'ro';

export default function AboutView({ messages, locale }: { messages: any; locale: Locale }) {
  const a = messages.about;
  const common = messages.common;

  return (
    <div>
      <section className="vk-section" style={{paddingTop: '4rem'}}>
        <div className="vk-container">
          <span className="vk-eyebrow">{a.hero.eyebrow}</span>
          <h1 className="vk-display mt-5" style={{maxWidth: '16ch'}}>
            {a.hero.headingLead}{' '}
            <span className="vk-italic">{a.hero.headingItalic}</span>{' '}
            {a.hero.headingTail}
          </h1>
        </div>
      </section>

      <hr className="vk-rule" />

      <section className="vk-section">
        <div className="vk-container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="vk-eyebrow">{a.story.heading}</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 space-y-5">
              {a.story.body.map((p: string, i: number) => (
                <p key={i} className="vk-lead" style={{fontSize: '1.0625rem', lineHeight: 1.65}}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="vk-rule" />

      <section className="vk-section">
        <div className="vk-container">
          <h2 className="vk-h2" style={{maxWidth: '16ch'}}>{a.values.heading}</h2>
          <div className="grid gap-6 mt-8 sm:grid-cols-2">
            {a.values.items.map((v: any, i: number) => (
              <div key={i} className="vk-card">
                <div className="font-mono text-xs uppercase tracking-widest vk-muted">{String(i + 1).padStart(2, '0')}</div>
                <div className="vk-h3 mt-2">{v.title}</div>
                <p className="vk-muted mt-2" style={{lineHeight: 1.6}}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="vk-rule" />

      <section className="vk-section">
        <div className="vk-container">
          <a
            href={whatsappHref(common.whatsappPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="vk-btn vk-btn-primary"
          >
            {messages.home.cta.whatsapp}
          </a>
        </div>
      </section>
    </div>
  );
}
