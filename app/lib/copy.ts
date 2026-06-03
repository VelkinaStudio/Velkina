// Velkina site copy — EN + TR. Plain, professional, modest voice. No hype,
// no fabricated metrics, no persona nicknames. "We are Velkina."

export type Lang = "en" | "tr";

const en = {
    nav: { work: "Work", oss: "Open source", studio: "Studio", contact: "Contact" },
    hero: {
      h1: "We are Velkina.",
      subhead:
        "A two-person studio in Istanbul. We build software, websites, and stores — one project at a time, no account manager in between.",
      selectLabel: "The arsenal",
      selectCta: "Open",
    },
    whatWeDo: {
      label: "What we do",
      intro: "We're small on purpose. You brief the two people who build it — nothing gets handed down a chain.",
      items: [
        { k: "Software", v: "Web apps, internal tools, and the platforms a business actually runs on." },
        { k: "Websites", v: "Marketing sites, portfolios, and landing pages that load fast and read well." },
        { k: "E-commerce", v: "Custom Shopify themes the owner can run — edit products, prices, and pages without emailing us." },
        { k: "AI", v: "Automation and integrations that run unattended: watching campaigns, moving data, answering in four languages. Things that stay on after launch." },
        { k: "Brand", v: "Identity, naming, and the visual system around the product." },
      ],
    },
    work: {
      label: "Selected work",
      intro: "Six projects we shipped and still maintain. Open any one for the brief, what we built, and what changed.",
      brief: "The problem",
      process: "What we did",
      outcome: "What changed",
      visit: "Visit",
      open: "Open",
      close: "Close",
    },
    oss: {
      label: "Open source",
      intro: "Tools we built for our own work and put out for anyone. Small, dependency-light, MIT-licensed.",
      view: "View on GitHub",
      all: "All repositories",
    },
    team: {
      label: "The two of us",
      people: [
        {
          name: "Ömer Can Nalbant",
          role: "Front-end, design, and business",
          line: "Designs and writes the front end. Built this site by hand instead of buying a template. Would rather cut a feature than ship a slow page.",
        },
        {
          name: "Baha Taşkın",
          role: "Back-end, infrastructure, and operations",
          line: "Builds the backends. Shipped the Stripe Connect payouts behind RuleSell and the rules engine that pauses Meta campaigns on their own numbers. Would rather delete code than add it.",
        },
      ],
      closing: "Two people, three projects at a time. We pick what we say yes to, so nothing sits in a queue.",
    },
    contact: {
      label: "Contact",
      heading: "Tell us what you're building.",
      body: "Send a few sentences about the project. We'll tell you honestly whether we're the right fit — and if we're not, who is.",
      cta: "Start a project",
      email: "hello@velkina.com",
      location: "Istanbul",
    },
    footer: {
      identity: "Velkina — Istanbul",
      note: "Hand-built in Istanbul. No template, no stock.",
      sound: "Sound",
      reduce: "Reduce motion",
      on: "on",
      off: "off",
    },
};

export type Copy = typeof en;

const tr: Copy = {
    nav: { work: "İşler", oss: "Açık kaynak", studio: "Stüdyo", contact: "İletişim" },
    hero: {
      h1: "Biz Velkina’yız.",
      subhead:
        "İstanbul’da iki kişilik bir stüdyo. Yazılım, web sitesi ve mağaza kuruyoruz — aynı anda tek proje, araya giren bir müşteri temsilcisi yok.",
      selectLabel: "Cephanelik",
      selectCta: "Aç",
    },
    whatWeDo: {
      label: "Ne yapıyoruz",
      intro: "Bilerek küçüğüz. İşi yapan iki kişiye anlatırsınız — hiçbir şey bir zincirin alt kademesine devredilmez.",
      items: [
        { k: "Yazılım", v: "Web uygulamaları, iç araçlar ve bir işin gerçekten üzerinde çalıştığı sistemler." },
        { k: "Web siteleri", v: "Hızlı açılan ve iyi okunan tanıtım siteleri, portfolyolar ve landing sayfaları." },
        { k: "E-ticaret", v: "Sahibinin kendi yönetebileceği özel Shopify temaları — ürünü, fiyatı ve sayfayı bize yazmadan düzenler." },
        { k: "Yapay zekâ", v: "Arka planda tek başına çalışan otomasyon ve entegrasyonlar: kampanyaları izler, veriyi taşır, dört dilde yanıt verir. Yayından sonra da çalışmaya devam eder." },
        { k: "Marka", v: "Kimlik, isimlendirme ve ürünün etrafındaki görsel sistem." },
      ],
    },
    work: {
      label: "Seçili işler",
      intro: "Yayına alıp bakımını sürdürdüğümüz altı proje. Herhangi birini aç; brief’i, ne kurduğumuzu ve neyin değiştiğini gör.",
      brief: "Problem",
      process: "Ne yaptık",
      outcome: "Ne değişti",
      visit: "Siteye git",
      open: "Aç",
      close: "Kapat",
    },
    oss: {
      label: "Açık kaynak",
      intro: "Kendi işimiz için yapıp herkese açtığımız araçlar. Küçük, az bağımlılıklı, MIT lisanslı.",
      view: "GitHub'da gör",
      all: "Tüm repolar",
    },
    team: {
      label: "Biz iki kişiyiz",
      people: [
        {
          name: "Ömer Can Nalbant",
          role: "Front-end, tasarım ve iş geliştirme",
          line: "Ön yüzü tasarlar ve yazar. Bu siteyi şablon almak yerine elle kurdu. Yavaş bir sayfa yayınlamaktansa bir özelliği keser.",
        },
        {
          name: "Baha Taşkın",
          role: "Back-end, altyapı ve operasyon",
          line: "Arka uçları kurar. RuleSell’in arkasındaki Stripe Connect ödemelerini ve Meta kampanyalarını kendi sayılarıyla durduran kural motorunu yazdı. Kod eklemektense silmeyi tercih eder.",
        },
      ],
      closing: "İki kişi, aynı anda üç proje. Neye evet diyeceğimizi biz seçeriz; böylece hiçbir iş sırada beklemez.",
    },
    contact: {
      label: "İletişim",
      heading: "Ne inşa ettiğinizi anlatın.",
      body: "Proje hakkında birkaç cümle gönderin. Doğru ekip miyiz dürüstçe söyleriz — değilsek, kimin olduğunu da.",
      cta: "Projeye başlayın",
      email: "hello@velkina.com",
      location: "İstanbul",
    },
    footer: {
      identity: "Velkina — İstanbul",
      note: "İstanbul’da elle yapıldı. Şablon yok, stok yok.",
      sound: "Ses",
      reduce: "Hareketi azalt",
      on: "açık",
      off: "kapalı",
    },
};

export const COPY: Record<Lang, Copy> = { en, tr };
