"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { COPY, type Lang, type Copy } from "./copy";

interface Ctx {
  lang: Lang;
  t: Copy;
  setLang: (l: Lang) => void;
}

const LangCtx = createContext<Ctx>({ lang: "en", t: COPY.en, setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Server + first client paint render English so SSR markup matches; then we
  // upgrade to the browser/stored preference in an effect (no hydration clash).
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let initial: Lang = "en";
    try {
      const stored = localStorage.getItem("vk-lang") as Lang | null;
      if (stored === "en" || stored === "tr") initial = stored;
      else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("tr"))
        initial = "tr";
    } catch {}
    if (initial !== "en") setLangState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("vk-lang", l);
    } catch {}
    document.documentElement.lang = l;
  };

  return <LangCtx.Provider value={{ lang, t: COPY[lang], setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
