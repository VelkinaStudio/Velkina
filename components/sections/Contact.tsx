"use client";

import Reveal from "@/components/Reveal";
import { CONTACT, STUDIO } from "@/lib/content";
import { useLang } from "@/lib/i18n";

// Human ending — "say hi", not a sales funnel. WhatsApp + email + Cal.
const LINKS = [CONTACT.whatsapp, CONTACT.emailNalba, CONTACT.emailBaha, CONTACT.cal];

export default function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="vk-section vk-container vk-contact" aria-label="Contact">
      <Reveal>
        <span className="vk-eyebrow">{t.contact.eyebrow}</span>
        <h2 className="vk-contact-h" style={{ marginTop: "1rem" }}>
          {t.contact.title1}
          <br />
          {t.contact.title2}
        </h2>
        <p className="vk-contact-sub">{t.contact.sub}</p>
      </Reveal>

      <div className="vk-contact-links">
        {LINKS.map((l, i) => (
          <Reveal key={l.href}>
            <a
              className="vk-contact-link"
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <span className="vk-contact-link-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="vk-contact-link-label">{l.label}</span>
              <span className="vk-contact-link-val">{l.value}</span>
            </a>
          </Reveal>
        ))}
      </div>

      <p className="vk-mono vk-dim" style={{ marginTop: "2.5rem", fontSize: "0.78rem" }}>
        {STUDIO.bases.join("   ·   ")}
      </p>
    </section>
  );
}
