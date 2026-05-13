import { CONTACT, mailHref, whatsappHref, telHref } from '../../lib/contact';

type Locale = 'en' | 'tr' | 'ro';

export default function ContactView({ messages, locale }: { messages: any; locale: Locale }) {
  const c = messages.contact;
  const common = messages.common;

  return (
    <div>
      <section className="vk-section" style={{paddingTop: '4rem'}}>
        <div className="vk-container">
          <span className="vk-eyebrow">{c.hero.eyebrow}</span>
          <h1 className="vk-h1 mt-5" style={{maxWidth: '20ch'}}>{c.hero.heading}</h1>
          <p className="vk-lead vk-muted mt-5" style={{maxWidth: '52ch'}}>{c.hero.sub}</p>
        </div>
      </section>

      <hr className="vk-rule" />

      {/* Channels */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={whatsappHref(common.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-card block"
              style={{textDecoration: 'none'}}
            >
              <div className="vk-label">{c.channels.whatsapp.label}</div>
              <div className="vk-h3 mt-2">{c.channels.whatsapp.value}</div>
              <div className="vk-muted text-sm mt-2">{c.channels.whatsapp.note}</div>
            </a>
            <a
              href={mailHref(common.emailSubject)}
              className="vk-card block"
              style={{textDecoration: 'none'}}
            >
              <div className="vk-label">{c.channels.email.label}</div>
              <div className="vk-h3 mt-2" style={{wordBreak: 'break-all'}}>{c.channels.email.value}</div>
              <div className="vk-muted text-sm mt-2">{c.channels.email.note}</div>
            </a>
            <a
              href={telHref}
              className="vk-card block"
              style={{textDecoration: 'none'}}
            >
              <div className="vk-label">{c.channels.phone.label}</div>
              <div className="vk-h3 mt-2">{c.channels.phone.value}</div>
              <div className="vk-muted text-sm mt-2">{c.channels.phone.note}</div>
            </a>
            <a
              href={CONTACT.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-card block"
              style={{textDecoration: 'none'}}
            >
              <div className="vk-label">{c.channels.schedule.label}</div>
              <div className="vk-h3 mt-2">{c.channels.schedule.value}</div>
              <div className="vk-muted text-sm mt-2">{c.channels.schedule.note}</div>
            </a>
          </div>
        </div>
      </section>

      <hr className="vk-rule" />

      {/* Form (mailto) */}
      <section className="vk-section">
        <div className="vk-container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="vk-h2" style={{maxWidth: '14ch'}}>{c.form.heading}</h2>
              <p className="vk-muted mt-3" style={{maxWidth: '36ch'}}>{c.form.note}</p>
            </div>
            <form
              method="POST"
              action={mailHref(common.emailSubject)}
              className="lg:col-span-7 space-y-5"
              encType="text/plain"
            >
              <div>
                <label className="vk-label" htmlFor="name">{c.form.name}</label>
                <input id="name" name="name" required className="vk-input" autoComplete="name" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="vk-label" htmlFor="company">{c.form.company}</label>
                  <input id="company" name="company" className="vk-input" autoComplete="organization" />
                </div>
                <div>
                  <label className="vk-label" htmlFor="email">{c.form.email}</label>
                  <input id="email" name="email" type="email" required className="vk-input" autoComplete="email" />
                </div>
              </div>
              <div>
                <label className="vk-label" htmlFor="budget">{c.form.budget}</label>
                <select id="budget" name="budget" className="vk-input">
                  {c.form.budgetOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="vk-label" htmlFor="message">{c.form.message}</label>
                <textarea id="message" name="message" required className="vk-input"></textarea>
              </div>
              <button type="submit" className="vk-btn vk-btn-primary">
                {c.form.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      <hr className="vk-rule" />

      <section className="vk-section">
        <div className="vk-container">
          <h2 className="vk-eyebrow">{c.office.heading}</h2>
          <div className="grid gap-6 mt-4 sm:grid-cols-2">
            {c.office.items.map((o: any, i: number) => (
              <div key={i}>
                <div className="vk-h3">{o.city}</div>
                <div className="vk-muted mt-1">{o.address}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
