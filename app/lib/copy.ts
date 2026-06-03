// Velkina — site copy, EN + TR. Warm, plain, spoken. We say what we ARE, not
// what we're not. No defensive framing, no hype words, no fabricated metrics.

export type Lang = "en" | "tr";

const en = {
  nav: { work: "Work", studio: "Studio", team: "Us", contact: "Say hi" },
  hero: {
    h1: "Come in. This is our studio.",
    sub: "We're Velkina — Ömer and Baha, two people building software, websites, and stores out of Istanbul. Have a look around; everything in here is something we actually made.",
    prompt: "Tap a desk to look around",
    enter: "Look around",
  },
  whatWeDo: {
    label: "What we make",
    intro: "You talk to the two people who build it. Nothing gets passed down a chain.",
    items: [
      { k: "Software", v: "Web apps and the systems a business actually runs on, day to day." },
      { k: "Websites", v: "Sites and landing pages that load fast and read clearly." },
      { k: "Stores", v: "Custom Shopify stores the owner can run alone — add products, change prices, edit pages without emailing us." },
      { k: "AI & automation", v: "Things that keep working after launch: watching ad campaigns, moving data, answering in four languages." },
      { k: "Brand", v: "The name, the look, and the visual system around the product." },
    ],
  },
  work: {
    label: "Selected work",
    intro: "A few things we shipped and still look after. Tap any object in the room — or any card here — for the story.",
    brief: "The problem",
    decision: "What we decided",
    outcome: "What changed",
    visit: "Visit the live site",
    open: "Open",
    close: "Close",
  },
  team: {
    label: "The two of us",
    omer: {
      name: "Ömer Can Nalbant",
      role: "Front-end, design, business",
      line: "Built this room by hand instead of buying a template. He'll cut a feature before he'll ship a slow page.",
    },
    baha: {
      name: "Baha Taşkın",
      role: "Back-end, infrastructure, ops",
      line: "Wrote the Stripe payouts behind RuleSell and the rules engine that pauses Meta campaigns on their own numbers. He'd rather delete code than add it.",
    },
    closing: "Two people, a few projects at a time. We pick what we say yes to, so nothing sits in a queue.",
  },
  contact: {
    label: "Say hi",
    heading: "Tell us what you're building.",
    body: "A few sentences is plenty. We'll tell you honestly if we're the right fit — and if we're not, who is.",
    email: "hello@velkina.com",
    copy: "Copy email",
    copied: "Copied",
    location: "Istanbul",
  },
  oss: {
    label: "Open source",
    intro: "Small tools we built for our own work and put out for anyone — dependency-light, MIT-licensed.",
    view: "View on GitHub",
    all: "All repositories",
  },
  ui: {
    home: "Back to the room",
    reduceMotion: "Reduce motion",
    loading: "Tidying the studio…",
    soundOn: "sound on",
    soundOff: "sound off",
  },
};

export type Copy = typeof en;

const tr: Copy = {
  nav: { work: "İşler", studio: "Stüdyo", team: "Biz", contact: "Merhaba de" },
  hero: {
    h1: "Buyur, gir. Burası stüdyomuz.",
    sub: "Biz Velkina’yız — Ömer ve Baha. İstanbul’dan yazılım, web sitesi ve mağaza yapan iki kişi. Etrafa bir bak; buradaki her şeyi gerçekten biz yaptık.",
    prompt: "Etrafa bakmak için bir masaya dokun",
    enter: "Etrafa bak",
  },
  whatWeDo: {
    label: "Ne yapıyoruz",
    intro: "İşi yapan iki kişiyle konuşursun. Hiçbir şey elden ele dolaşmaz.",
    items: [
      { k: "Yazılım", v: "Web uygulamaları ve bir işin her gün üzerinde döndüğü sistemler." },
      { k: "Web siteleri", v: "Hızlı açılan, net okunan siteler ve landing sayfaları." },
      { k: "Mağaza", v: "Sahibinin tek başına yönetebileceği özel Shopify mağazaları — ürün ekler, fiyat değiştirir, sayfayı bize yazmadan düzenler." },
      { k: "Yapay zekâ & otomasyon", v: "Yayından sonra da çalışan şeyler: reklam kampanyalarını izlemek, veri taşımak, dört dilde yanıt vermek." },
      { k: "Marka", v: "Ürünün etrafındaki isim, görünüm ve görsel sistem." },
    ],
  },
  work: {
    label: "Seçili işler",
    intro: "Yayına alıp hâlâ baktığımız birkaç şey. Odadaki herhangi bir nesneye — ya da buradaki bir karta — dokun, hikâyesini gör.",
    brief: "Problem",
    decision: "Ne karar verdik",
    outcome: "Ne değişti",
    visit: "Canlı siteyi gör",
    open: "Aç",
    close: "Kapat",
  },
  team: {
    label: "Biz iki kişiyiz",
    omer: {
      name: "Ömer Can Nalbant",
      role: "Front-end, tasarım, iş",
      line: "Bu odayı şablon almak yerine elle kurdu. Yavaş bir sayfa yayınlamaktansa bir özelliği keser.",
    },
    baha: {
      name: "Baha Taşkın",
      role: "Back-end, altyapı, operasyon",
      line: "RuleSell’in arkasındaki Stripe ödemelerini ve Meta kampanyalarını kendi sayılarıyla durduran kural motorunu yazdı. Kod eklemektense silmeyi sever.",
    },
    closing: "İki kişi, aynı anda birkaç proje. Neye evet diyeceğimizi biz seçeriz; hiçbir iş sırada beklemez.",
  },
  contact: {
    label: "Merhaba de",
    heading: "Ne kurduğunu anlat.",
    body: "Birkaç cümle yeter. Doğru ekip miyiz dürüstçe söyleriz — değilsek, kimin olduğunu da.",
    email: "hello@velkina.com",
    copy: "E-postayı kopyala",
    copied: "Kopyalandı",
    location: "İstanbul",
  },
  oss: {
    label: "Açık kaynak",
    intro: "Kendi işimiz için yapıp herkese açtığımız küçük araçlar — az bağımlılıklı, MIT lisanslı.",
    view: "GitHub’da gör",
    all: "Tüm repolar",
  },
  ui: {
    home: "Odaya dön",
    reduceMotion: "Hareketi azalt",
    loading: "Stüdyo toparlanıyor…",
    soundOn: "ses açık",
    soundOff: "ses kapalı",
  },
};

export const COPY: Record<Lang, Copy> = { en, tr };
