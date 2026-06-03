// Velkina open source — every entry is a REAL public repo on github.com/VelkinaStudio.
// Honest: only public repos, real URLs, plain descriptions. No invented stars.

export interface Repo {
  slug: string;
  name: string;
  kind: { en: string; tr: string }; // "Claude Code skill" / "CLI" / "Agent" / etc.
  blurb: { en: string; tr: string };
  lang: string;
  url: string;
}

const GH = "https://github.com/VelkinaStudio";

export const REPOS: Repo[] = [
  // --- Claude Code artifacts (agents / skills / workflow / MCP) ---
  {
    slug: "skill-forge",
    name: "skill-forge",
    kind: { en: "Claude Code skill", tr: "Claude Code skill" },
    blurb: {
      en: "Scaffolds and lints Claude Code skills against Anthropic's authoring rules, so a SKILL.md actually gets discovered and loaded.",
      tr: "Claude Code skill'lerini Anthropic'in yazım kurallarına göre iskeletliyor ve denetliyor; böylece bir SKILL.md gerçekten keşfedilip yükleniyor.",
    },
    lang: "JavaScript",
    url: `${GH}/skill-forge`,
  },
  {
    slug: "pr-storyteller",
    name: "pr-storyteller",
    kind: { en: "Claude Code skill", tr: "Claude Code skill" },
    blurb: {
      en: "Writes a PR description from the actual diff — grouped by intent, with a risk section and a list of what wasn't tested.",
      tr: "Bir PR açıklamasını gerçek diff'ten yazar — niyete göre gruplanmış, risk bölümü ve test edilmeyenlerin listesiyle.",
    },
    lang: "JavaScript",
    url: `${GH}/pr-storyteller`,
  },
  {
    slug: "n8n-flow-auditor",
    name: "n8n-flow-auditor",
    kind: { en: "Agent", tr: "Agent" },
    blurb: {
      en: "Reads an exported n8n workflow and names exactly where it will silently fail in production — missing error branches, unauthenticated webhooks, data drift.",
      tr: "Dışa aktarılmış bir n8n akışını okur ve üretimde sessizce nerede çökeceğini tam olarak söyler — eksik hata dalları, kimliksiz webhook'lar, veri kayması.",
    },
    lang: "Markdown",
    url: `${GH}/n8n-flow-auditor`,
  },
  {
    slug: "shopify-liquid-reviewer",
    name: "shopify-liquid-reviewer",
    kind: { en: "Agent", tr: "Agent" },
    blurb: {
      en: "Reviews Shopify Liquid themes for the performance, accessibility, and OS 2.0 mistakes that quietly hurt conversion.",
      tr: "Shopify Liquid temalarını dönüşümü sessizce düşüren performans, erişilebilirlik ve OS 2.0 hataları için inceler.",
    },
    lang: "Markdown",
    url: `${GH}/shopify-liquid-reviewer`,
  },
  {
    slug: "release-radar",
    name: "release-radar",
    kind: { en: "Workflow", tr: "Workflow" },
    blurb: {
      en: "Turns a git tag range into a categorized changelog, a draft GitHub release, and a short announcement — in one run.",
      tr: "Bir git etiket aralığını tek seferde kategorize edilmiş bir changelog'a, taslak GitHub sürümüne ve kısa bir duyuruya çevirir.",
    },
    lang: "JavaScript",
    url: `${GH}/release-radar`,
  },
  {
    slug: "shopify-metafield-mcp",
    name: "shopify-metafield-mcp",
    kind: { en: "MCP server", tr: "MCP sunucusu" },
    blurb: {
      en: "An MCP server that lets Claude read and diff a Shopify store's metafield definitions, so theme work stops guessing namespaces and keys.",
      tr: "Claude'un bir Shopify mağazasının metafield tanımlarını okuyup karşılaştırmasını sağlayan MCP sunucusu; böylece tema işi namespace ve key'leri tahmin etmeyi bırakır.",
    },
    lang: "JavaScript",
    url: `${GH}/shopify-metafield-mcp`,
  },

  // --- Developer tools (CLIs / SDK) ---
  {
    slug: "retry-ladder",
    name: "retry-ladder",
    kind: { en: "Library", tr: "Kütüphane" },
    blurb: {
      en: "A tiny zero-dependency retry library that tells a rate limit from a timeout from a bug, and only retries what's worth retrying.",
      tr: "Bir rate limit'i bir zaman aşımından, bir hatadan ayıran küçük ve bağımsız bir retry kütüphanesi; sadece denemeye değeni dener.",
    },
    lang: "JavaScript",
    url: `${GH}/retry-ladder`,
  },
  {
    slug: "polyglot-parity",
    name: "polyglot-parity",
    kind: { en: "CLI", tr: "CLI" },
    blurb: {
      en: "Fails your build when translation files drift apart — the dropped placeholders and broken plurals that key-counting tools miss.",
      tr: "Çeviri dosyaları birbirinden kaydığında derlemeni durdurur — anahtar sayan araçların kaçırdığı düşen placeholder'lar ve bozuk çoğullar.",
    },
    lang: "JavaScript",
    url: `${GH}/polyglot-parity`,
  },
  {
    slug: "utm-lint",
    name: "utm-lint",
    kind: { en: "CLI", tr: "CLI" },
    blurb: {
      en: "Lints ad campaign names and tracking URLs, catching the casing and delimiter mismatches that split one traffic source into five in GA4.",
      tr: "Reklam kampanya adlarını ve takip URL'lerini denetler; GA4'te tek bir trafik kaynağını beşe bölen büyük/küçük harf ve ayraç uyumsuzluklarını yakalar.",
    },
    lang: "JavaScript",
    url: `${GH}/utm-lint`,
  },
  {
    slug: "schema-guard",
    name: "schema-guard",
    kind: { en: "CLI", tr: "CLI" },
    blurb: {
      en: "Extracts every JSON-LD block from your HTML and fails CI when a Product or Article is missing the fields Google needs for rich results.",
      tr: "HTML'inizdeki her JSON-LD bloğunu çıkarır ve bir Product veya Article, Google'ın zengin sonuçlar için istediği alanları kaçırdığında CI'ı durdurur.",
    },
    lang: "JavaScript",
    url: `${GH}/schema-guard`,
  },
  {
    slug: "licensescan",
    name: "licensescan",
    kind: { en: "CLI", tr: "CLI" },
    blurb: {
      en: "Classifies every installed npm package's license and flags copyleft or unknown risk for your project type, as a CI gate.",
      tr: "Kurulu her npm paketinin lisansını sınıflandırır ve proje türünüz için copyleft veya bilinmeyen riski bir CI kapısı olarak işaretler.",
    },
    lang: "JavaScript",
    url: `${GH}/licensescan`,
  },
  {
    slug: "altpilot",
    name: "altpilot",
    kind: { en: "CLI + library", tr: "CLI + kütüphane" },
    blurb: {
      en: "Audits HTML/JSX/Vue/Svelte files or a live URL for image alt-text accessibility (WCAG 1.1.1), with a CI fail gate.",
      tr: "HTML/JSX/Vue/Svelte dosyalarını veya canlı bir URL'yi görsel alt-metin erişilebilirliği (WCAG 1.1.1) için denetler; CI durdurma kapısıyla.",
    },
    lang: "JavaScript",
    url: `${GH}/altpilot`,
  },
  {
    slug: "hueshift",
    name: "hueshift",
    kind: { en: "CLI + library", tr: "CLI + kütüphane" },
    blurb: {
      en: "Turns one seed color into a full accessible palette with WCAG contrast guarantees baked in — usable from the CLI or in code.",
      tr: "Tek bir tohum renkten, WCAG kontrast garantileri yerleşik tam ve erişilebilir bir palet üretir — CLI'dan veya kod içinde kullanılır.",
    },
    lang: "JavaScript",
    url: `${GH}/hueshift`,
  },

  // --- Bigger builds ---
  {
    slug: "inkwell",
    name: "inkwell",
    kind: { en: "Render toolkit", tr: "Render araç seti" },
    blurb: {
      en: "A three.js / React Three Fiber toolkit for the comic-print look — halftone CMYK dots, ink outlines, posterize bands, and stepped 'on-twos' timing.",
      tr: "Çizgi-roman baskısı görünümü için bir three.js / React Three Fiber araç seti — halftone CMYK noktaları, mürekkep konturları, posterize bantları ve 'on-twos' zamanlama.",
    },
    lang: "JavaScript",
    url: `${GH}/inkwell`,
  },
  {
    slug: "lumen-theme",
    name: "lumen-theme",
    kind: { en: "Shopify theme", tr: "Shopify teması" },
    blurb: {
      en: "A small, dependency-free Shopify Online Store 2.0 theme in clean Liquid and vanilla Web Components — built to be read end to end.",
      tr: "Temiz Liquid ve sade Web Components ile yazılmış, bağımlılıksız küçük bir Shopify Online Store 2.0 teması — baştan sona okunmak için yapıldı.",
    },
    lang: "Liquid",
    url: `${GH}/lumen-theme`,
  },
];
