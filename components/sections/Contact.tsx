import Reveal from "@/components/Reveal";
import { CONTACT, STUDIO } from "@/lib/content";

const LINKS = [
  CONTACT.whatsapp,
  CONTACT.cal,
  CONTACT.emailNalba,
  CONTACT.emailBaha,
];

export default function Contact() {
  return (
    <section id="contact" className="vk-section vk-container vk-contact" aria-label="Contact">
      <Reveal>
        <span className="vk-eyebrow">Let&apos;s talk</span>
        <h2 className="vk-contact-h" style={{ marginTop: "1rem" }}>
          Three links.
          <br />
          No form.
        </h2>
        <p className="vk-contact-sub">
          We answer within a business day. Tell us what you&apos;re launching —
          we&apos;ll tell you honestly if we&apos;re the right two people for it.
        </p>
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
