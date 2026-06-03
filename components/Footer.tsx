import { CONTACT } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="vk-footer vk-container">
      <div className="vk-footer-row">
        <span>© {new Date().getFullYear()} Velkina — Design + engineering studio.</span>
        <span style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={CONTACT.cal.href} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          <a href="/en">EN</a>
          <a href="/tr">TR</a>
          <a href="/ro">RO</a>
        </span>
      </div>
      <p className="vk-mono vk-dim" style={{ marginTop: "1.5rem", fontSize: "0.72rem" }}>
        Hand-built on Next.js · React Three Fiber · WebGL. The make-of is the proof.
      </p>
    </footer>
  );
}
