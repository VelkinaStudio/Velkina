// ============================================================================
// Velkina — real projects (single source of truth).
// Shared by the server DOM layer (SEO + a11y), the Matter physics bodies, and
// the SelectedWork panels. Honest: real briefs, real process, real outcomes,
// NO fabricated metrics. `mass` encodes editorial pride — the flagship is the
// heaviest card and literally resists the throw.
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
  /** real screenshot under /public, or undefined → typographic card */
  image?: string;
  live?: string;
  /** physics: higher = heavier to throw. Flagship work earns more mass. */
  mass: number;
  flagship?: boolean;
  /** card accent for the typographic (image-less) cards */
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
      en: "We built the full product: creator and buyer accounts, Stripe Connect payouts, an automated review pipeline that screens every submission, and programmatic pages so the catalog is findable in search.",
      tr: "Ürünün tamamını kurduk: üretici ve alıcı hesapları, Stripe Connect ödemeleri, her gönderiyi tarayan otomatik inceleme hattı ve katalogun aramada bulunmasını sağlayan programatik sayfalar.",
    },
    outcome: {
      en: "A working marketplace where a creator can publish a ruleset, get reviewed, and receive payouts — end to end, in their own name.",
      tr: "Bir üreticinin kural seti yayımlayıp incelemeden geçebildiği ve ödeme alabildiği, uçtan uca çalışan bir pazar yeri.",
    },
    stack: ["Next.js", "Prisma", "Stripe Connect", "Postgres"],
    mass: 1.0,
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
      en: "Running many Meta ad campaigns by hand meant checking dashboards all day and reacting late to what was working or wasting money.",
      tr: "Çok sayıda Meta kampanyasını elle yönetmek, gün boyu panolara bakmak ve neyin çalışıp neyin para yaktığına geç tepki vermek demekti.",
    },
    process: {
      en: "We built rules that watch performance and act — pause, scale, or alert — across every campaign, with a live dashboard so the decisions are visible.",
      tr: "Performansı izleyip her kampanyada aksiyon alan kurallar kurduk — durdur, ölçekle veya uyar — ve kararların görünür olması için canlı bir pano ekledik.",
    },
    outcome: {
      en: "Campaigns that respond to their own numbers instead of waiting for someone to notice. Less time in dashboards, faster reactions.",
      tr: "Birinin fark etmesini beklemek yerine kendi sayılarına tepki veren kampanyalar. Panolarda daha az zaman, daha hızlı tepki.",
    },
    stack: ["Next.js", "Meta API", "Automation", "Railway"],
    mass: 0.85,
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
      en: "An automation-parts business needed a real online store its own team could run, not a template it would outgrow.",
      tr: "Bir otomasyon-parçaları işletmesi, kısa sürede dar gelecek bir şablon değil, kendi ekibinin yürütebileceği gerçek bir çevrimiçi mağaza istiyordu.",
    },
    process: {
      en: "We built a custom Shopify theme in Liquid, set up the catalog and checkout, and wired the operational automation so day-to-day work doesn't depend on us.",
      tr: "Liquid ile özel bir Shopify teması kurduk, katalog ve ödeme akışını ayarladık ve günlük işin bize bağlı kalmaması için operasyonel otomasyonu bağladık.",
    },
    outcome: {
      en: "A store the owner edits without touching code, built to convert and to grow with the business.",
      tr: "Sahibinin koda dokunmadan düzenlediği, dönüşüm için kurulmuş ve işle birlikte büyüyecek bir mağaza.",
    },
    stack: ["Shopify", "Liquid", "Automation"],
    mass: 0.8,
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
      en: "Each location kept a printed menu updated by hand, in two languages. Every change cost a day and tourists couldn't read it.",
      tr: "Her şube basılı menüsünü elle ve iki dilde güncelliyordu. Her değişiklik bir gün alıyor, turistler menüyü okuyamıyordu.",
    },
    process: {
      en: "We built one dashboard where a non-technical owner edits photos, allergen and dietary tags, and four languages — with a QR code per table.",
      tr: "Teknik olmayan bir sahibin fotoğrafları, alerjen ve diyet etiketlerini ve dört dili düzenlediği tek bir pano kurduk — masa başına bir QR kod ile.",
    },
    outcome: {
      en: "Menu changes that take a minute instead of a day, readable by every guest in their own language.",
      tr: "Bir gün yerine bir dakika süren menü değişiklikleri; her misafirin kendi dilinde okuyabildiği bir menü.",
    },
    stack: ["Next.js", "Postgres", "i18n", "Vercel"],
    image: "/portfolio-screenshots/lavinia-bistro-qr-menu.webp",
    live: "https://velkina.com/demo/lavinia-bistro",
    mass: 0.7,
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
      en: "The firm relied on phone-only intake and didn't fully own its hosting or code.",
      tr: "Büro yalnızca telefonla gelen başvurulara dayanıyordu ve barındırma ile kodun tamamına sahip değildi.",
    },
    process: {
      en: "We built a fast, credible site and moved the infrastructure onto AWS, set up so the firm owns its domain, hosting, and code outright.",
      tr: "Hızlı ve güven veren bir site kurduk ve altyapıyı AWS'ye taşıdık; büro alan adına, barındırmasına ve koduna tam sahip olacak şekilde ayarladık.",
    },
    outcome: {
      en: "A practice that can be found and contacted online, on infrastructure it controls.",
      tr: "Çevrimiçi bulunup iletişime geçilebilen ve kendi kontrol ettiği altyapıda çalışan bir büro.",
    },
    stack: ["Next.js", "AWS", "SEO"],
    image: "/portfolio-screenshots/ataravci-law-firm.webp",
    live: "https://ataravci.com.tr",
    mass: 0.6,
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
      en: "A thermoplastics manufacturer exporting across several markets needed its catalog presentable and consistent in multiple languages.",
      tr: "Birkaç pazara ihracat yapan bir termoplastik üreticisi, katalogunun birden çok dilde sunulabilir ve tutarlı olmasını istiyordu.",
    },
    process: {
      en: "We built a data pipeline that turns the product catalog into structured data, and a multilingual export-facing site that reads from it.",
      tr: "Ürün katalogunu yapılandırılmış veriye çeviren bir hat ve bundan beslenen çok dilli, ihracata dönük bir site kurduk.",
    },
    outcome: {
      en: "A single catalog source feeding a clean, multilingual site that buyers in different markets can actually use.",
      tr: "Farklı pazarlardaki alıcıların gerçekten kullanabildiği, temiz ve çok dilli bir siteyi besleyen tek bir katalog kaynağı.",
    },
    stack: ["Next.js", "Data pipeline", "Multilingual"],
    image: "/portfolio-screenshots/tp-thermoplast-b2b.webp",
    live: "https://tpthermoplast.com",
    mass: 0.6,
    tone: "ink",
    category: { en: "B2B + Data", tr: "B2B + Veri" },
  },
];
