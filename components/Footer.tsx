"use client";

import { CONTACT } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="vk-footer vk-container">
      <div className="vk-footer-row">
        <span>© {new Date().getFullYear()} Velkina — {t.footer.tag}</span>
        <span style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={CONTACT.cal.href} target="_blank" rel="noopener noreferrer">{t.nav.contact}</a>
        </span>
      </div>
      <p className="vk-mono vk-dim" style={{ marginTop: "1.5rem", fontSize: "0.72rem" }}>
        {t.footer.build}
      </p>
    </footer>
  );
}
