"use client";

import { useLang } from "@/app/lib/LangProvider";
import SoundToggle from "./SoundToggle";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  return (
    <nav className="vk-nav" aria-label="Primary">
      <a href="#top" className="vk-logo">Velkina</a>
      <div className="vk-nav-right">
        <a href="#work" className="vk-nav-link">{t.nav.work}</a>
        <a href="#opensource" className="vk-nav-link">{t.nav.oss}</a>
        <a href="#studio" className="vk-nav-link">{t.nav.studio}</a>
        <a href="#contact" className="vk-nav-link">{t.nav.contact}</a>
        <SoundToggle compact />
        <button
          className="vk-lang"
          onClick={() => setLang(lang === "en" ? "tr" : "en")}
          aria-label={lang === "en" ? "Türkçe'ye geç" : "Switch to English"}
        >
          {lang === "en" ? "TR" : "EN"}
        </button>
      </div>
    </nav>
  );
}
