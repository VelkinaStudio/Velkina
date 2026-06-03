// ============================================================================
// Velkina — projects (single source of truth).
// Shared by the server DOM layer (SEO + a11y), the weapon-select carousel, and
// the work detail panel. Honest: real briefs, a named decision per project,
// real outcomes, NO fabricated metrics. Every `process` names a choice we'd
// defend or a constraint we worked around — not just a list of what we built.
// ============================================================================

export interface Project {
  id: string;
  name: string;
  /** one honest line: what it is + who it's for */
  oneLiner: { en: string; tr: string };
  brief: { en: string; tr: string };
  process: { en: string; tr: string };
  outcome: { en: string; tr: string };
  stack: string[];
  /** real screenshot of the shipped UI under /public, or undefined */
  image?: string;
  live?: string;
  /** flagship → shown first, gets the star + accent treatment */
  flagship?: boolean;
  /** tile accent on the select screen */
  tone?: "ink" | "accent" | "clay";
  /** "weapon class" label shown on the select screen */
  category: { en: string; tr: string };
}

/** Generated arsenal art lives at /arsenal/<id>.webp (matches each project id). */
export const artFor = (id: string) => `/arsenal/${id}.webp`;

export const PROJECTS: Project[] = [
  {
    id: "rulesell",
    name: "RuleSell",
    oneLiner: {
      en: "A marketplace where people buy and sell AI coding configurations.",
      tr: "İnsanların yapay zekâ kodlama yapılandırmalarını alıp sattığı bir pazar yeri.",
    },
    brief: {
      en: "Developers were sharing AI rulesets and skills in scattered gists and repos, with no way to get paid or to trust what they installed.",
      tr: "Geliştiriciler yapay zekâ kural setlerini dağınık gist ve repolarda paylaşıyordu; ne ödeme alabiliyor ne de kurduklarına güvenebiliyordu.",
    },
    process: {
      en: "The hard part was trust — buyers won't install a config they can't vet. We chose an automated review gate over manual curation so submissions clear in minutes instead of days, and built payouts on Stripe Connect so creators get paid in their own name, not ours. Accounts, the review pipeline, and programmatic catalog pages for search sit on top of that.",
      tr: "Zor kısım güvendi — alıcılar inceleyemedikleri bir yapılandırmayı kurmaz. Manuel küratörlük yerine otomatik bir inceleme kapısı seçtik; böylece gönderiler günlerce değil dakikalar içinde geçiyor. Ödemeleri Stripe Connect üzerine kurduk ki üreticiler bizim değil, kendi adlarına ödeme alsın. Hesaplar, inceleme hattı ve arama için programatik katalog sayfaları bunun üstünde duruyor.",
    },
    outcome: {
      en: "A creator can publish a ruleset, clear review, and receive payouts end to end — without us in the loop on any of it.",
      tr: "Bir üretici kural setini yayımlayıp incelemeden geçebiliyor ve ödeme alabiliyor — hiçbir adımda biz devrede olmadan.",
    },
    stack: ["Next.js", "Prisma", "Stripe Connect", "Postgres"],
    flagship: true,
    tone: "accent",
    category: { en: "Marketplace", tr: "Pazar yeri" },
  },
  {
    id: "megvax",
    name: "MegVax",
    oneLiner: {
      en: "An automation engine that watches Meta ad campaigns and acts on them.",
      tr: "Meta reklam kampanyalarını izleyip onlara göre aksiyon alan bir otomasyon motoru.",
    },
    brief: {
      en: "Running many Meta campaigns by hand meant checking dashboards all day and reacting late — after the budget was already spent on a losing ad.",
      tr: "Çok sayıda Meta kampanyasını elle yönetmek, gün boyu panolara bakmak ve geç tepki vermek demekti — bütçe kötü bir reklama çoktan harcandıktan sonra.",
    },
    process: {
      en: "We could have built more reporting; instead we built rules that act. They watch each campaign and pause, scale, or alert on the numbers themselves, with a live dashboard so every automated decision is visible and reversible.",
      tr: "Daha fazla raporlama kurabilirdik; bunun yerine aksiyon alan kurallar kurduk. Her kampanyayı izleyip sayıların kendisine göre durduruyor, ölçekliyor veya uyarıyorlar; canlı bir panoyla her otomatik karar görünür ve geri alınabilir.",
    },
    outcome: {
      en: "Campaigns now pause a losing ad on their own, usually within the hour instead of the next morning. The operator checks the dashboard to confirm, not to babysit.",
      tr: "Kampanyalar artık kötü giden reklamı kendileri durduruyor; genelde ertesi sabah değil, bir saat içinde. Operatör panoya başında beklemek için değil, onaylamak için bakıyor.",
    },
    stack: ["Next.js", "Meta API", "Automation", "Railway"],
    tone: "ink",
    category: { en: "Automation", tr: "Otomasyon" },
  },
  {
    id: "bcb",
    name: "BCB Otomasyon",
    oneLiner: {
      en: "A Shopify store, theme, and the automation around running it.",
      tr: "Bir Shopify mağazası, teması ve onu yürütmenin etrafındaki otomasyon.",
    },
    brief: {
      en: "An automation-parts business needed a real online store its own team could run — not a template it would outgrow in a season.",
      tr: "Bir otomasyon-parçaları işletmesi, bir sezonda dar gelecek bir şablon değil, kendi ekibinin yürütebileceği gerçek bir çevrimiçi mağaza istiyordu.",
    },
    process: {
      en: "We built a custom Shopify theme in Liquid rather than skin a marketplace theme, so the catalog structure matched how they actually sell, and wired the operational automation so day-to-day work doesn't route back through us.",
      tr: "Hazır bir tema giydirmek yerine Liquid ile özel bir Shopify teması kurduk; böylece katalog yapısı gerçekte nasıl sattıklarıyla örtüştü. Operasyonel otomasyonu da günlük işin tekrar bize dönmeyeceği şekilde bağladık.",
    },
    outcome: {
      en: "The owner adds and re-prices products himself now. The repeat operational work that used to land in our inbox runs on its own.",
      tr: "Sahibi artık ürünleri kendisi ekliyor ve fiyatlandırıyor. Eskiden bizim gelen kutumuza düşen tekrar eden operasyonel iş artık kendi kendine yürüyor.",
    },
    stack: ["Shopify", "Liquid", "Automation"],
    tone: "clay",
    category: { en: "E-commerce", tr: "E-ticaret" },
  },
  {
    id: "lavinia",
    name: "Lavinia Bistro",
    oneLiner: {
      en: "A multilingual QR menu running across four bistros.",
      tr: "Dört bistroda çalışan çok dilli bir QR menü.",
    },
    brief: {
      en: "Each location updated a printed menu by hand, in two languages. Every change cost a day, and tourists couldn't read it at all.",
      tr: "Her şube basılı menüsünü elle ve iki dilde güncelliyordu. Her değişiklik bir gün alıyor, turistler menüyü hiç okuyamıyordu.",
    },
    process: {
      en: "We built one dashboard where a non-technical owner edits photos, allergen and dietary tags, and four languages, with a QR code per table. The constraint was the owner: if a change needed us, it would fail the same way the printed menu did.",
      tr: "Teknik olmayan bir sahibin fotoğrafları, alerjen ve diyet etiketlerini ve dört dili düzenlediği tek bir pano kurduk — masa başına bir QR kod ile. Kısıt sahibin kendisiydi: bir değişiklik bizi gerektirirse, basılı menünün düştüğü hataya düşerdi.",
    },
    outcome: {
      en: "Menu changes that take a minute instead of a day, readable by every guest in their own language.",
      tr: "Bir gün yerine bir dakika süren menü değişiklikleri; her misafirin kendi dilinde okuyabildiği bir menü.",
    },
    stack: ["Next.js", "Postgres", "i18n", "Vercel"],
    image: "/portfolio-screenshots/lavinia-bistro-qr-menu.webp",
    tone: "ink",
    category: { en: "Web app", tr: "Web uygulaması" },
  },
  {
    id: "ataravci",
    name: "Atar Avcı Law",
    oneLiner: {
      en: "A website and AWS migration for a Turkish law practice.",
      tr: "Bir Türk hukuk bürosu için web sitesi ve AWS taşıması.",
    },
    brief: {
      en: "The firm ran on phone-only intake and didn't fully own its hosting or its code — a risk it couldn't see until something broke.",
      tr: "Büro yalnızca telefonla gelen başvurularla yürüyordu ve barındırma ile koduna tam sahip değildi — bir şey bozulana kadar göremediği bir risk.",
    },
    process: {
      en: "We built a fast, credible site, but the real job was ownership: we moved the infrastructure onto AWS, set up so the firm holds its own domain, hosting, and code outright, with no dependency on us or a previous vendor.",
      tr: "Hızlı ve güven veren bir site kurduk, ama asıl iş sahiplikti: altyapıyı AWS'ye taşıdık; büro alan adına, barındırmasına ve koduna doğrudan sahip oluyor, bize veya önceki bir tedarikçiye bağımlı kalmıyor.",
    },
    outcome: {
      en: "A practice that can be found and contacted online, running on infrastructure it controls and can hand to anyone.",
      tr: "Çevrimiçi bulunup iletişime geçilebilen, kontrol ettiği ve istediğine devredebileceği bir altyapıda çalışan bir büro.",
    },
    stack: ["Next.js", "AWS", "SEO"],
    image: "/portfolio-screenshots/ataravci-law-firm.webp",
    live: "https://ataravci.com.tr",
    tone: "clay",
    category: { en: "Website + Cloud", tr: "Web sitesi + Bulut" },
  },
  {
    id: "tp-thermoplast",
    name: "TP Thermoplast",
    oneLiner: {
      en: "A B2B export site fed by a structured product data pipeline.",
      tr: "Yapılandırılmış bir ürün veri hattıyla beslenen B2B ihracat sitesi.",
    },
    brief: {
      en: "A thermoplastics manufacturer exporting across several markets kept its catalog in spreadsheets, so every language and every market drifted out of sync.",
      tr: "Birkaç pazara ihracat yapan bir termoplastik üreticisi katalogunu tablolarda tutuyordu; bu yüzden her dil ve her pazar birbirinden kayıyordu.",
    },
    process: {
      en: "Rather than build pages by hand per market, we built a data pipeline that turns the product catalog into one structured source, and a multilingual export site that reads from it — so a change is made once and shows up everywhere.",
      tr: "Her pazar için sayfaları elle kurmak yerine, ürün katalogunu tek bir yapılandırılmış kaynağa çeviren bir veri hattı ve bundan beslenen çok dilli bir ihracat sitesi kurduk — böylece bir değişiklik bir kez yapılıyor ve her yerde görünüyor.",
    },
    outcome: {
      en: "One catalog source feeding a clean, multilingual site that buyers in different markets can actually use, with no per-language re-keying.",
      tr: "Farklı pazarlardaki alıcıların gerçekten kullanabildiği, dil başına yeniden veri girişi gerektirmeyen, temiz ve çok dilli bir siteyi besleyen tek bir katalog kaynağı.",
    },
    stack: ["Next.js", "Data pipeline", "Multilingual"],
    image: "/portfolio-screenshots/tp-thermoplast-b2b.webp",
    live: "https://tpthermoplast.com",
    tone: "ink",
    category: { en: "B2B + Data", tr: "B2B + Veri" },
  },
];
