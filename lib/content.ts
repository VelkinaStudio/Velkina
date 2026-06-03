// ============================================================
// VELKINA — site content (single source of truth, HONEST)
// Derived from the content audit. Real clients + real products
// are clearly separated from capabilities. NO fabricated metrics.
// ============================================================

export type ProjectKind = "client" | "product" | "demo";

export interface Project {
  slug: string;
  name: string;
  kind: ProjectKind;          // client = paid real client; product = real internal product
  tag: string;                // short label, e.g. "QR Menu Platform"
  blurb: string;              // honest 1-2 sentence description, NO fabricated metrics
  stack: string[];
  live?: string;              // real live URL if it exists
  image?: string;             // path under /public
  year?: string;
}

// THE 6 TRUE PORTFOLIO PIECES — 3 real paying clients + 3 real internal products.
export const PROJECTS: Project[] = [
  {
    slug: "lavinia-bistro",
    name: "Lavinia Bistro",
    kind: "client",
    tag: "Multilingual QR Menu Platform",
    blurb:
      "A QR menu system running across four bistros in Bucharest — photos, allergen and dietary tags, four languages, and per-table QR codes, all editable by one non-technical owner from a single dashboard.",
    stack: ["Next.js", "Postgres", "i18n", "Vercel"],
    live: "https://velkina.com/demo/lavinia-bistro",
    image: "/portfolio-screenshots/lavinia-bistro-qr-menu.webp",
    year: "2025",
  },
  {
    slug: "ataravci-law",
    name: "Atar Avcı Law",
    kind: "client",
    tag: "Law Firm Site + AWS Migration",
    blurb:
      "A fast, credible website for a Turkish law practice, paired with an infrastructure migration onto AWS — built so the firm owns its domain, hosting and code outright.",
    stack: ["Next.js", "AWS", "SEO"],
    live: "https://ataravci.com.tr",
    image: "/portfolio-screenshots/ataravci-law-firm.webp",
    year: "2025",
  },
  {
    slug: "tp-thermoplast",
    name: "TP Thermoplast",
    kind: "client",
    tag: "B2B Export Site + Data Pipeline",
    blurb:
      "A B2B presence and product data pipeline for a thermoplastics manufacturer exporting across multiple markets — structured catalog data feeding a multilingual export-facing site.",
    stack: ["Next.js", "Data pipeline", "Multilingual"],
    live: "https://tpthermoplast.com",
    image: "/portfolio-screenshots/tp-thermoplast-b2b.webp",
    year: "2025",
  },
  {
    slug: "rulesell",
    name: "RuleSell",
    kind: "product",
    tag: "AI-Config Marketplace",
    blurb:
      "A marketplace for AI coding configurations — creators publish rulesets and skills, buyers install them. Full Stripe Connect payouts, creator dashboards, and an audit pipeline. A Velkina-built product.",
    stack: ["Next.js", "Prisma", "Stripe Connect", "Postgres"],
    image: "/projects/rulesell-marketplace.svg",
    year: "2026",
  },
  {
    slug: "megvax",
    name: "MegVax",
    kind: "product",
    tag: "Meta Ads Automation SaaS",
    blurb:
      "An automation engine for Meta Ads — rules that watch campaign performance and act on it (pause, scale, alert) across many campaigns, with a live dashboard. A Velkina-built product.",
    stack: ["Next.js", "Meta API", "Automation", "Railway"],
    image: "/projects/megvax-dashboard.svg",
    year: "2026",
  },
  {
    slug: "customer-agent",
    name: "Multilingual Support Agent",
    kind: "product",
    tag: "5-Language AI Support Agent",
    blurb:
      "An AI customer-support agent that answers in five languages from a business's own knowledge base — handling routine questions so a small team doesn't have to. A Velkina-built product.",
    stack: ["LLM", "RAG", "Next.js"],
    image: "/projects/customer-agent-multilingual.svg",
    year: "2026",
  },
];

// SERVICES — what Velkina does (real, from llms.txt). Capability, not client claims.
export interface Service {
  num: string;
  title: string;
  line: string;
  detail: string;
}

export const SERVICES: Service[] = [
  { num: "01", title: "Websites & Web Apps", line: "Fast, accessible, easy to edit.", detail: "Custom Next.js / React sites and landing pages — mobile-first, multilingual, sub-second loads." },
  { num: "02", title: "Shopify & E-commerce", line: "Stores your team can actually run.", detail: "Conversion-optimized Shopify — custom themes, multilingual, payments, email flows, GA4 + Meta CAPI." },
  { num: "03", title: "AI Automation & Agents", line: "Agents that work in your business, not on stage.", detail: "Custom AI agents on OpenAI / Anthropic for support, lead routing, document processing and internal Q&A." },
  { num: "04", title: "Cloud & DevOps", line: "Infrastructure that stays up and stays yours.", detail: "AWS, GCP, Azure, Vercel, Cloudflare — architecture, migration, CI/CD, monitoring, backups, recovery." },
  { num: "05", title: "Ads & Growth", line: "Run by the people who also build the site.", detail: "Google & Meta Ads — Pixel + Conversions API, audience research, weekly creative testing, honest reporting." },
  { num: "06", title: "Mobile Apps", line: "Shipped to the stores, not stuck in a repo.", detail: "React Native or native — store submission, push, deep links, crash reporting, OTA updates." },
  { num: "07", title: "Restaurant QR Menus", line: "One editor, every table, five languages.", detail: "Mobile-first QR menus — photos, allergen and dietary labels, per-table codes, call-waiter and request-bill." },
  { num: "08", title: "SEO & Content", line: "Findable in search and in AI answers.", detail: "Technical SEO audits, schema and structured data, keyword and topic research, across three languages." },
  { num: "09", title: "Branding & Design Systems", line: "An identity, with the tokens to ship it.", detail: "Logo directions, color and type system, voice guide, brand guidelines, design tokens in Figma + code." },
];

// AI / FRONTIER STACK — the capability story (separate from named client work).
export const AI_STACK: { label: string; items: string[] }[] = [
  { label: "Agentic development", items: ["Claude Code", "Codex", "Antigravity", "multi-agent orchestration"] },
  { label: "Automation", items: ["n8n", "custom pipelines", "API integrations", "webhook workflows"] },
  { label: "Models", items: ["LLM fine-tuning", "RAG", "OpenAI", "Anthropic"] },
  { label: "This very site", items: ["React Three Fiber", "WebGPU + TSL", "GSAP", "hand-built"] },
];

// THE TWO OPERATORS — real, honest.
export interface Operator {
  name: string;
  handle: string;
  role: string;
  base: string;
  email: string;
  bio: string;
}

export const OPERATORS: Operator[] = [
  {
    name: "Ömer Can Nalbant",
    handle: "Nalba",
    role: "Frontend · Brand · Marketing · AI",
    base: "Istanbul",
    email: "nalba@velkina.com",
    bio: "Frontend, brand and conversion-side marketing — plus the AI-development side: agentic coding, automation pipelines and the analytics that tie ad spend to outcomes. The person who turns a brief into a shipped, on-brand product.",
  },
  {
    name: "Baha Taşkın",
    handle: "Baha",
    role: "Backend · Infrastructure · Ops",
    base: "İstanbul",
    email: "baha@velkina.com",
    bio: "Backend, ad-platform integrations and infrastructure — the data pipelines, the cloud migrations, the automation engines and the payout systems. The person who makes sure it runs at 3am and stays the client's.",
  },
];

// POSITIONING — verbatim-safe, real.
export const STUDIO = {
  name: "Velkina",
  tagline: "Software and brand that ships.",
  descriptor: "We design, build and ship websites, e-commerce, mobile apps and AI automation. A small team. Real work. No slide decks.",
  oneLiner: "Two operators on every project. Velkina is two people, not a department.",
  longStatement:
    "Software, brand and ad infrastructure for founders launching internationally — built end-to-end so the storefront, the campaigns and the support agent come out of one room, not three vendors stitched together.",
  bases: ["İstanbul · Üsküdar"],
  process: [
    { step: "01", title: "Talk", line: "A real conversation, not a discovery deck. We answer within a business day." },
    { step: "02", title: "Plan", line: "Scope, timeline and a quote — usually inside 48 hours." },
    { step: "03", title: "Build", line: "Design and engineering at one desk. You see it as it grows." },
    { step: "04", title: "Ship", line: "Live, in your name. Code and accounts stay yours. Stop anytime." },
  ],
};

// CONTACT — real and safe.
export const CONTACT = {
  whatsapp: { label: "WhatsApp", value: "+90 532 336 00 51", href: "https://wa.me/905323360051" },
  cal: { label: "Book a call", value: "cal.com/velkina", href: "https://cal.com/velkina" },
  emailNalba: { label: "Email Nalba", value: "nalba@velkina.com", href: "mailto:nalba@velkina.com" },
  emailBaha: { label: "Email Baha", value: "baha@velkina.com", href: "mailto:baha@velkina.com" },
};
