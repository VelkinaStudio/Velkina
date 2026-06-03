"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Lightweight TR/EN i18n for the single-page site. Detects the browser language
// (tr → Turkish, otherwise English), persists the choice, exposes a toggle.
// Real, natural Turkish copy — not machine-literal.

export type Lang = "en" | "tr";

type Dict = typeof EN;

export const EN = {
  nav: { work: "Work", studio: "Studio", team: "The Two of Us", contact: "Say Hi" },
  hero: {
    kicker: "Velkina — a two-person studio",
    line1: "We make software, brands & the occasional game —",
    line2: "and the tools we make them with.",
    sub: "Ömer & Baha · İstanbul",
    corner: "EST. 2024 · ISSUE 01",
    read: "READ ON",
  },
  statement: {
    pre: "We design, build and ship",
    em1: "real software",
    mid: " — websites, e-commerce, mobile apps and AI automation. A small team.",
    em2: "No slide decks.",
  },
  work: {
    eyebrow: "Selected work",
    title1: "Real clients.",
    title2: "Real products.",
    note: "Three paying clients and three products we built ourselves. The cyan tag means it’s live — go check.",
    client: "Client · Live", product: "Velkina Product", visit: "Visit live →",
  },
  team: {
    eyebrow: "Two people, not a department",
    title1: "The whole team",
    title2: "is on your project.",
  },
  ai: {
    eyebrow: "On the frontier",
    title: "We build with the tools we build with.",
    lead: "Agentic coding, automation pipelines and fine-tuned models are how two people ship like a studio. This very site is hand-built on that same frontier stack — with our own render engine.",
  },
  contact: {
    eyebrow: "Let’s talk",
    title1: "Say hi.",
    title2: "No forms.",
    sub: "We answer within a day. Tell us what you’re making — we’ll tell you honestly if we’re the right two people for it.",
  },
  footer: { tag: "Design + engineering, made in İstanbul.", build: "Hand-built on Next.js · React Three Fiber · our own comic render engine." },
};

export const TR: Dict = {
  nav: { work: "İşler", studio: "Stüdyo", team: "İkimiz", contact: "Merhaba De" },
  hero: {
    kicker: "Velkina — iki kişilik bir stüdyo",
    line1: "Yazılım, marka ve arada bir oyun yapıyoruz —",
    line2: "ve onları yaparken kullandığımız araçları da.",
    sub: "Ömer & Baha · İstanbul",
    corner: "2024’TEN BERİ · SAYI 01",
    read: "DEVAM ET",
  },
  statement: {
    pre: "Tasarlıyor, geliştiriyor ve yayına alıyoruz:",
    em1: "gerçek yazılım",
    mid: " — web siteleri, e-ticaret, mobil uygulamalar ve yapay zekâ otomasyonu. Küçük bir ekip.",
    em2: "Sunum yok.",
  },
  work: {
    eyebrow: "Seçili işler",
    title1: "Gerçek müşteriler.",
    title2: "Gerçek ürünler.",
    note: "Üç ödeyen müşteri ve kendi geliştirdiğimiz üç ürün. Camgöbeği etiket “canlı” demek — buyrun bakın.",
    client: "Müşteri · Canlı", product: "Velkina Ürünü", visit: "Canlıya git →",
  },
  team: {
    eyebrow: "Bir departman değil, iki kişi",
    title1: "Tüm ekip",
    title2: "senin projende.",
  },
  ai: {
    eyebrow: "Sınırda",
    title: "Kullandığımız araçları biz yapıyoruz.",
    lead: "Ajan tabanlı kodlama, otomasyon hatları ve ince ayarlı modeller — iki kişinin bir stüdyo gibi üretmesinin yolu. Bu site bile o sınır teknolojisiyle, kendi render motorumuzla elle yapıldı.",
  },
  contact: {
    eyebrow: "Konuşalım",
    title1: "Merhaba de.",
    title2: "Form yok.",
    sub: "Bir gün içinde yanıtlıyoruz. Ne yaptığını anlat — doğru iki kişi miyiz, dürüstçe söyleriz.",
  },
  footer: { tag: "Tasarım + mühendislik, İstanbul’da.", build: "Next.js · React Three Fiber · kendi çizgi-roman render motorumuzla elle yapıldı." },
};

const DICTS: Record<Lang, Dict> = { en: EN, tr: TR };

const LangCtx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({
  lang: "en", t: EN, setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("vk-lang")) as Lang | null;
    if (saved === "en" || saved === "tr") { setLangState(saved); return; }
    const nav = (navigator.language || "en").toLowerCase();
    setLangState(nav.startsWith("tr") ? "tr" : "en");
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("vk-lang", l); document.documentElement.lang = l; } catch {}
  };
  useEffect(() => { try { document.documentElement.lang = lang; } catch {} }, [lang]);
  return <LangCtx.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() { return useContext(LangCtx); }
