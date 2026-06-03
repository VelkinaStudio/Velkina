"use client";

import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  return (
    <nav className="vk-nav vk-nav--comic" aria-label="Primary">
      <a href="#top" className="vk-nav-logo">VELKINA</a>
      <div className="vk-nav-links">
        <a href="#work" className="vk-nav-hide-sm">{t.nav.work}</a>
        <a href="#ai" className="vk-nav-hide-sm">{t.nav.studio}</a>
        <a href="#team" className="vk-nav-hide-sm">{t.nav.team}</a>
        <a href="#contact">{t.nav.contact}</a>
        <button
          className="vk-lang-toggle"
          onClick={() => setLang(lang === "en" ? "tr" : "en")}
          aria-label={lang === "en" ? "Türkçe'ye geç" : "Switch to English"}
        >
          {lang === "en" ? "TR" : "EN"}
        </button>
      </div>
    </nav>
  );
}
