// Velkina site copy — EN + TR. Plain, professional, modest voice. No hype,
// no fabricated metrics, no persona nicknames. "We are Velkina."

export type Lang = "en" | "tr";

const en = {
    nav: { work: "Work", studio: "Studio", contact: "Contact" },
    hero: {
      h1: "We are Velkina.",
      subhead:
        "A two-person studio in Istanbul. We build and ship software, websites, e-commerce, AI, and brand.",
      pile: "Grab a card. Throw it.",
      pileHint: "Drag the work around — it has weight.",
      selectLabel: "The arsenal",
      selectCta: "Open",
    },
    whatWeDo: {
      label: "What we do",
      intro: "We are small on purpose. The two of us do the work you talk to us about.",
      items: [
        { k: "Software", v: "Web apps, internal tools, and the platforms a business runs on." },
        { k: "Websites", v: "Marketing sites, portfolios, and landing pages that load fast and read well." },
        { k: "E-commerce", v: "Shopify builds and store work, focused on conversion." },
        { k: "AI", v: "Automation, agents, and integrations that do real work, not demos." },
        { k: "Brand", v: "Identity, naming, and the visual system around the product." },
      ],
    },
    work: {
      label: "Selected work",
      intro: "A few projects we can talk about in detail. Each one is real, shipped, and ours.",
      brief: "The problem",
      process: "What we did",
      outcome: "What shipped",
      visit: "Visit",
      open: "Open",
      close: "Close",
    },
    team: {
      label: "The two of us",
      people: [
        {
          name: "Ömer Can Nalbant",
          role: "Front-end, design, and business",
          line: "How the product looks, how it reads, and how clients find us.",
        },
        {
          name: "Baha Taşkın",
          role: "Back-end, infrastructure, and operations",
          line: "The systems under the product, and keeping them running.",
        },
      ],
      closing: "Two people. You always talk to the ones building it.",
    },
    contact: {
      label: "Contact",
      heading: "Tell us what you're building.",
      body: "We reply to real emails from real people. Send a few sentences about the project and we'll tell you honestly whether we're the right fit.",
      cta: "Start a project",
      email: "hello@velkina.com",
      location: "Istanbul",
    },
    footer: {
      identity: "Velkina — Istanbul",
      note: "Hand-built. The cards are a real physics toy, not a video.",
      sound: "Card sounds",
      reduce: "Reduce motion",
      on: "on",
      off: "off",
    },
};

export type Copy = typeof en;

const tr: Copy = {
    nav: { work: "İşler", studio: "Stüdyo", contact: "İletişim" },
    hero: {
      h1: "Biz Velkina’yız.",
      subhead:
        "İstanbul’da iki kişilik bir stüdyo. Yazılım, web sitesi, e-ticaret, yapay zekâ ve marka işleri yapıp yayına alıyoruz.",
      pile: "Bir kartı tut. Fırlat.",
      pileHint: "İşleri sürükle — ağırlıkları var.",
      selectLabel: "Cephanelik",
      selectCta: "Aç",
    },
    whatWeDo: {
      label: "Ne yapıyoruz",
      intro: "Bilerek küçüğüz. Konuştuğunuz işi, işi yapan iki kişi yapar.",
      items: [
        { k: "Yazılım", v: "Web uygulamaları, iç araçlar ve bir işin üzerinde çalıştığı sistemler." },
        { k: "Web siteleri", v: "Hızlı açılan ve iyi okunan tanıtım siteleri, portfolyolar ve landing sayfaları." },
        { k: "E-ticaret", v: "Dönüşüme odaklı Shopify kurulumları ve mağaza işleri." },
        { k: "Yapay zekâ", v: "Demo değil, gerçekten iş yapan otomasyonlar, agent’lar ve entegrasyonlar." },
        { k: "Marka", v: "Kimlik, isimlendirme ve ürünün etrafındaki görsel sistem." },
      ],
    },
    work: {
      label: "Seçili işler",
      intro: "Ayrıntısıyla konuşabileceğimiz birkaç proje. Hepsi gerçek, yayında ve bizim.",
      brief: "Problem",
      process: "Ne yaptık",
      outcome: "Ne yayına çıktı",
      visit: "Siteye git",
      open: "Aç",
      close: "Kapat",
    },
    team: {
      label: "Biz iki kişiyiz",
      people: [
        {
          name: "Ömer Can Nalbant",
          role: "Front-end, tasarım ve iş geliştirme",
          line: "Ürünün nasıl göründüğü, nasıl okunduğu ve müşterilerin bizi nasıl bulduğu.",
        },
        {
          name: "Baha Taşkın",
          role: "Back-end, altyapı ve operasyon",
          line: "Ürünün altındaki sistemler ve onların çalışmaya devam etmesi.",
        },
      ],
      closing: "İki kişi. Her zaman işi yapanlarla konuşursunuz.",
    },
    contact: {
      label: "İletişim",
      heading: "Ne inşa ettiğinizi anlatın.",
      body: "Gerçek e-postalara gerçek insanlar olarak cevap veriyoruz. Proje hakkında birkaç cümle gönderin, doğru ekip miyiz dürüstçe söyleyelim.",
      cta: "Projeye başlayın",
      email: "hello@velkina.com",
      location: "İstanbul",
    },
    footer: {
      identity: "Velkina — İstanbul",
      note: "Elle yapıldı. Kartlar bir video değil, gerçek bir fizik oyuncağı.",
      sound: "Kart sesleri",
      reduce: "Hareketi azalt",
      on: "açık",
      off: "kapalı",
    },
};

export const COPY: Record<Lang, Copy> = { en, tr };
