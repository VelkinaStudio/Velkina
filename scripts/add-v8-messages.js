#!/usr/bin/env node
/**
 * Adds home.v8 + work.v8Featured + work.tagLabels + useCase studies for
 * RuleSell / MegVax / Customer-Agent, in EN/TR/RO, while preserving all
 * existing keys. Idempotent: re-running overwrites the v8 namespace and
 * upserts the 3 new project entries by slug.
 *
 * Locale parity is the load-bearing invariant. Every key added to EN is
 * also added to TR and RO. No half-locale keys.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const MSG_DIR = path.join(ROOT, 'messages');

const NEW_PROJECTS = {
  en: [
    {
      slug: 'rulesell-marketplace',
      client: 'RuleSell',
      industry: 'Developer marketplace',
      service: 'Marketplace + Stripe Connect + audited listings',
      year: '2026',
      outcome: '212 listings live · 600 SEO pages',
      image: '/projects/rulesell-marketplace.svg',
      liveUrl: 'https://www.rulesell.com'
    },
    {
      slug: 'megvax-meta-ads',
      client: 'MegVax',
      industry: 'AdTech SaaS',
      service: 'Meta Ads automation platform',
      year: '2026',
      outcome: 'ROAS 3.4× across 14 campaigns',
      image: '/projects/megvax-dashboard.svg',
      liveUrl: ''
    },
    {
      slug: 'customer-agent-multilingual',
      client: 'Customer-Agent',
      industry: 'Operations · five languages',
      service: 'Multilingual AI customer service (EN/TR/RO/DE/ES)',
      year: '2026',
      outcome: '78% of tickets handled without human handoff',
      image: '/projects/customer-agent-multilingual.svg',
      liveUrl: '/customer-agent'
    }
  ],
  tr: [
    {
      slug: 'rulesell-marketplace',
      client: 'RuleSell',
      industry: 'Geliştirici pazaryeri',
      service: 'Pazaryeri + Stripe Connect + denetimli listeler',
      year: '2026',
      outcome: '212 yayında ürün · 600 SEO sayfası',
      image: '/projects/rulesell-marketplace.svg',
      liveUrl: 'https://www.rulesell.com'
    },
    {
      slug: 'megvax-meta-ads',
      client: 'MegVax',
      industry: 'Reklam SaaS',
      service: 'Meta Ads otomasyon platformu',
      year: '2026',
      outcome: '14 kampanyada 3,4× ROAS',
      image: '/projects/megvax-dashboard.svg',
      liveUrl: ''
    },
    {
      slug: 'customer-agent-multilingual',
      client: 'Customer-Agent',
      industry: 'Müşteri operasyonu · beş dil',
      service: 'Çok dilli yapay zekâ destek (EN/TR/RO/DE/ES)',
      year: '2026',
      outcome: 'Taleplerin %78\'i insan müdahalesi olmadan kapanıyor',
      image: '/projects/customer-agent-multilingual.svg',
      liveUrl: '/customer-agent'
    }
  ],
  ro: [
    {
      slug: 'rulesell-marketplace',
      client: 'RuleSell',
      industry: 'Piață pentru dezvoltatori',
      service: 'Piață + Stripe Connect + listări auditate',
      year: '2026',
      outcome: '212 listări active · 600 pagini SEO',
      image: '/projects/rulesell-marketplace.svg',
      liveUrl: 'https://www.rulesell.com'
    },
    {
      slug: 'megvax-meta-ads',
      client: 'MegVax',
      industry: 'AdTech SaaS',
      service: 'Platformă de automatizare Meta Ads',
      year: '2026',
      outcome: 'ROAS 3,4× pe 14 campanii',
      image: '/projects/megvax-dashboard.svg',
      liveUrl: ''
    },
    {
      slug: 'customer-agent-multilingual',
      client: 'Customer-Agent',
      industry: 'Operațiuni clienți · cinci limbi',
      service: 'Suport AI multilingv (EN/TR/RO/DE/ES)',
      year: '2026',
      outcome: '78% din tichete rezolvate fără intervenție umană',
      image: '/projects/customer-agent-multilingual.svg',
      liveUrl: '/customer-agent'
    }
  ]
};

// 3 deep case studies for the complex projects. Required keys per slug:
//   title, client, industry, service, year, problem, approach,
//   decisions[] (NEW for v8 — 4-6 specific engineering/design moves),
//   stack, timeline, outcome, metrics[] (NEW for v8 — small data row),
//   gallery[] (NEW for v8 — image+caption objects), image, liveUrl
const NEW_STUDIES = {
  en: {
    'rulesell-marketplace': {
      title: 'A marketplace for AI development configs',
      client: 'RuleSell',
      industry: 'Developer marketplace',
      service: 'Two-sided marketplace · Stripe Connect · audited listings',
      year: '2026',
      problem: 'AI configs are unreliable. Buyers had no way to know which Claude Code or Cursor rulesets were safe to install — quality ranged from a one-line tweak to a 500-line operational discipline, scattered across GitHub gists, blog posts and Discord threads. Creators had nowhere to monetise their work, and there was no canonical place to discover audited configurations. The client needed a marketplace where buyers could trust what they were installing and creators could get paid for what they published.',
      approach: 'Trust comes from a visible audit grade, not from review counts. Every submission gets an A/B/C audit grade backed by 42 automated checks (frontmatter validation, trigger-phrase quality, anti-pattern detection, license sanity, completeness). Buyers see the grade on the listing card before they click. Creators get a clear rubric to improve their score. Payments run through Stripe Connect so creators onboard without a separate dashboard.',
      decisions: [
        'Single Postgres for catalog + claims + payouts — no microservices until 100k MRR. Drizzle ORM with hand-written migration safety checks.',
        'Audit pipeline runs in a Vercel cron + queue, not synchronous on submission. Submissions go DRAFT → AUDITING → PUBLISHED, never silent-200 fail.',
        'Stripe Connect Express accounts so creators onboard without a separate dashboard. Payouts paid weekly with 7-day chargeback hold per Stripe risk default.',
        '600 programmatic SEO pages built off a (framework × use-case) matrix with hand-curated copy stubs, not template-generated filler. Every page has unique H1, unique meta, unique first 100 words.',
        'AI-citation strategy: llms.txt + structured data on every listing + a /docs/why-rulesell page targeting "what is rulesell" AI Overview queries.',
        'No user-generated reviews until 500 paid installs — review fraud is the marketplace killer. Audited badge does the trust work until volume justifies a review system.'
      ],
      stack: 'Next.js 16 · Postgres · Drizzle · Stripe Connect · Vercel · Sentry',
      timeline: '11 weeks · 2 operators',
      outcome: 'Marketplace launched with 212 audited listings and 600 programmatic SEO pages.',
      metrics: [
        { label: 'Listings at launch', value: '212' },
        { label: 'Audited creators', value: '47' },
        { label: 'Programmatic SEO pages', value: '600' },
        { label: 'Avg audit pass rate', value: '64%' }
      ],
      gallery: [
        { src: '/projects/rulesell-marketplace.svg', caption: 'Browse view — audited badge on every listing, no "trending" theatre.' }
      ],
      image: '/projects/rulesell-marketplace.svg',
      liveUrl: 'https://www.rulesell.com'
    },
    'megvax-meta-ads': {
      title: 'Stop bad campaigns at 3am without staying up to watch them',
      client: 'MegVax',
      industry: 'AdTech SaaS',
      service: 'Meta Ads automation · rule engine · multi-account dashboard',
      year: '2026',
      problem: 'A solo ad operator running 10-40 campaigns across 3-5 accounts cannot watch CPA every hour. Meta\'s native automated rules cap at simple triggers per campaign, so when a creative fatigues at 2am or an audience breaks overnight, the spend burns until morning. The operators needed account-wide rules ("pause anything with CPA above 12 euros, anywhere"), creative-refresh triggers, and the ability to reallocate spend between campaigns based on real-time ROAS — without writing the integration themselves.',
      approach: 'A rule engine and a dashboard built on top of Meta\'s Marketing API. Rules are added through a form, not YAML. Every 5 minutes the platform pulls fresh metrics from Meta and fires whatever matches: pause, scale, swap creative. Every action is logged so the operator can wake up at 9am and reconstruct what changed at 3am. Multi-account is the default — flip between client accounts in one click.',
      decisions: [
        'Bull queue with Redis on Railway for the rule runner. 5-minute tick is the Meta API rate-limit compromise — faster than that and we burn quota.',
        'Rules engine is a tagged-JSON tree, not a DSL. Operators add rules via a form, never edit YAML or write code. The compromise: less expressive than a real rule language, but operators actually use it.',
        'Postgres for everything: rules, fires, accounts, audit trail. Single DB cost discipline, BI lives off read replicas.',
        'Webhook ingestion for Meta lead events so the platform can attribute conversions to specific creative variants. This is the move that turns the ROAS chart from "Meta-told-us" into "we-counted-it".',
        'Multi-tenant via row-level security with a tenant_id discriminator. No shared-table per-tenant filtering, no cross-tenant leak possible.',
        'Sentry on every rule fire with structured tags (tenant, campaign, rule_id) so a 3am pause action that broke a campaign is reconstructible by 9am.'
      ],
      stack: 'Next.js · Postgres · Redis · Bull · Meta Marketing API · Railway · Sentry',
      timeline: '14 weeks · live beta with 4 operators',
      outcome: 'Operators reclaimed 8 hours/week per account and held ROAS at 3.4× through Q2.',
      metrics: [
        { label: 'Hours saved / op / week', value: '8' },
        { label: 'Sustained ROAS', value: '3.4×' },
        { label: 'Rules fired / day', value: '38' },
        { label: 'Median CPA reduction', value: '−18%' }
      ],
      gallery: [
        { src: '/projects/megvax-dashboard.svg', caption: 'Operator dashboard — spend vs revenue with the rules panel that fired 38 times in 24h.' }
      ],
      image: '/projects/megvax-dashboard.svg',
      liveUrl: ''
    },
    'customer-agent-multilingual': {
      title: 'Five-language customer support that does not hallucinate refund policies',
      client: 'Customer-Agent',
      industry: 'Customer operations',
      service: 'Multilingual AI agent · WhatsApp + email + web · review-before-send',
      year: '2026',
      problem: 'E-commerce and hospitality operators face the same 30 questions on three channels at any hour, in five languages — Romanian, Turkish, English, German and Spanish. Off-the-shelf chatbots fail on language detection, invent refund policies the brand never offered, and have no concept of "this one is delicate, hand it to a human". The client needed one inbox, replies in the customer\'s actual language, and a safety net against the agent inventing policy at 3am.',
      approach: 'A drafted reply, not an auto-send. The agent detects the language, matches the message to a hand-written playbook entry, drafts a reply using the order data, and waits for a human to approve. For safe intents (shipping status, store hours) the operator can flip auto-send on; for refunds over 100 euros, cancellations or anger signals, the agent pauses and pages a human. Five languages launched with playbooks the brand owns, not generated rules.',
      decisions: [
        'Language detect via fastText langid, not LLM call — cheaper, faster, and the 0.98 confidence floor is well-defined.',
        'Intent classification is a hand-curated playbook lookup, not zero-shot. Each client has 20-40 playbook entries; the agent matches against the closest one with cosine similarity over OpenAI text-embedding-3-small.',
        'Replies are drafted by Claude Opus 4.7 with the playbook entry as context, the customer\'s order data injected, and a system prompt that explicitly bans inventing policies.',
        'Review-before-send is the safety bar. Auto-send is opt-in per intent per client, with a daily cap and a kill-switch on any negative-sentiment detection.',
        'Channel adapters for WhatsApp Business API, IMAP email and a web widget — single inbox, single agent, language-agnostic at the conversation layer.',
        'Audit trail of every draft + approval + send, with model+latency+token cost per reply. The first thing the operator sees on a flagged conversation is "this is what the agent would have said, and this is the data it used".'
      ],
      stack: 'Next.js · Postgres · Claude Opus · OpenAI embeddings · WhatsApp Business API',
      timeline: '9 weeks · live across 3 clients',
      outcome: '78% of tickets resolved without escalation while keeping a human in the approval loop.',
      metrics: [
        { label: 'Auto-handled rate', value: '78%' },
        { label: 'Languages live', value: '5' },
        { label: 'Median draft latency', value: '1.8s' },
        { label: 'Hallucinated refund offers', value: '0' }
      ],
      gallery: [
        { src: '/projects/customer-agent-multilingual.svg', caption: 'Operator inbox — a Romanian refund request, a draft awaiting approval, and the agent inspector showing every signal.' }
      ],
      image: '/projects/customer-agent-multilingual.svg',
      liveUrl: '/customer-agent'
    }
  },
  tr: {
    'rulesell-marketplace': {
      title: 'Yapay zekâ geliştirme yapılandırmaları için pazaryeri',
      client: 'RuleSell',
      industry: 'Geliştirici pazaryeri',
      service: 'İki taraflı pazaryeri · Stripe Connect · denetimli listeler',
      year: '2026',
      problem: 'Yapay zekâ yapılandırmaları güvenilmez. Alıcılar hangi Claude Code veya Cursor kural setinin kurulmaya güvenli olduğunu bilmiyordu — kalite tek satırlık bir ayardan 500 satırlık bir operasyonel disipline kadar uzanıyordu; GitHub gist\'lerine, blog yazılarına ve Discord kanallarına dağılmıştı. Yaratıcılar emeğini paraya çeviremiyordu ve denetimli yapılandırmaları bulacak kanonik bir yer yoktu. Müşterinin ihtiyacı: alıcıların ne kurduklarına güvenebileceği ve yaratıcıların yayımladıkları için ödeme alabileceği bir pazaryeri.',
      approach: 'Güven, görünür bir denetim notundan gelir — yorum sayısından değil. Her gönderim 42 otomatik kontrolden (frontmatter doğrulama, tetik-cümle kalitesi, anti-pattern tespiti, lisans bütünlüğü, eksiksizlik) geçen bir A/B/C denetim notu alır. Alıcılar notu tıklamadan önce liste kartında görüyor. Yaratıcılar puanlarını yükseltmek için net bir rubrik alıyor. Ödemeler Stripe Connect üzerinden işliyor; yaratıcılar ayrı bir panele girmek zorunda kalmıyor.',
      decisions: [
        'Katalog + talep + ödeme için tek Postgres — 100k MRR\'a kadar mikroservis yok. Drizzle ORM ile elle yazılmış migrasyon güvenlik kontrolleri.',
        'Denetim hattı, gönderim anında değil bir Vercel cron + kuyrukta çalışır. Gönderimler DRAFT → AUDITING → PUBLISHED akışını izler, asla sessizce 200 dönmez.',
        'Stripe Connect Express hesapları yaratıcıların ayrı bir panel olmadan dahil olmasını sağlar. Ödemeler haftalık, Stripe risk varsayımıyla 7 günlük chargeback beklemesiyle yapılır.',
        '600 programatik SEO sayfası bir (framework × kullanım) matrisi üzerine kurulu, şablon doldurması değil elle yazılmış kopya parçaları ile. Her sayfanın benzersiz H1, meta ve ilk 100 sözcüğü vardır.',
        'AI-atıf stratejisi: llms.txt + her listede yapılandırılmış veri + "rulesell nedir" AI Overview sorgularını hedefleyen bir /docs/why-rulesell sayfası.',
        '500 ücretli kuruluma kadar kullanıcı yorumu yok — yorum dolandırıcılığı pazaryeri katilidir. Hacim bir yorum sistemini hak edene kadar güveni denetim rozeti taşır.'
      ],
      stack: 'Next.js 16 · Postgres · Drizzle · Stripe Connect · Vercel · Sentry',
      timeline: '11 hafta · 2 operatör',
      outcome: 'Pazaryeri 212 denetimli liste ve 600 programatik SEO sayfasıyla yayına alındı.',
      metrics: [
        { label: 'Lansmanda liste', value: '212' },
        { label: 'Denetimli yaratıcı', value: '47' },
        { label: 'Programatik SEO sayfası', value: '600' },
        { label: 'Ortalama denetim geçme', value: '%64' }
      ],
      gallery: [
        { src: '/projects/rulesell-marketplace.svg', caption: 'Gözat görünümü — her listenin denetim rozeti, "trend" tiyatrosu yok.' }
      ],
      image: '/projects/rulesell-marketplace.svg',
      liveUrl: 'https://www.rulesell.com'
    },
    'megvax-meta-ads': {
      title: 'Sabahın 3\'ünde kötü kampanyaları durdur — onları izlemek için uyanık kalmadan',
      client: 'MegVax',
      industry: 'Reklam SaaS',
      service: 'Meta Ads otomasyon · kural motoru · çok hesap paneli',
      year: '2026',
      problem: 'Tek başına çalışan bir reklam operatörü 3-5 hesapta 10-40 kampanyayı her saat CPA için izleyemez. Meta\'nın yerleşik otomatik kuralları kampanya başına basit tetiklerle sınırlı; bir kreatif gece 2\'de yorulduğunda veya bir kitle gece boyu bozulduğunda harcama sabaha kadar yanıyor. Operatörlerin ihtiyacı: hesap çapında kurallar ("herhangi bir yerde CPA 12€ üstüyse durdur"), kreatif yenileme tetikleri ve gerçek zamanlı ROAS\'a göre kampanyalar arası bütçe kaydırma — entegrasyonu kendileri yazmadan.',
      approach: 'Meta Marketing API\'sının üzerinde bir kural motoru ve bir panel. Kurallar bir form ile ekleniyor, YAML ile değil. Her 5 dakikada bir platform Meta\'dan yeni metrikleri çeker ve eşleşen ne varsa tetikler: durdur, ölçekle, kreatif değiştir. Her eylem kaydedilir; böylece operatör sabah 9\'da uyandığında gece 3\'te ne değiştiğini yeniden inşa edebilir. Çok hesaplı çalışma varsayılan — müşteri hesapları arasında tek tıkla geçiş.',
      decisions: [
        'Railway üzerinde Redis ile Bull kuyruğu kural koşucusu için. 5 dakikalık tik, Meta API hız limiti uzlaşmasıdır.',
        'Kural motoru bir etiketli-JSON ağacıdır, DSL değil. Operatörler kural ekler, YAML düzenlemez. Uzlaşma: gerçek bir kural diliyle daha az anlatımlı ama operatörler gerçekten kullanıyor.',
        'Her şey için Postgres: kurallar, atışlar, hesaplar, denetim izi. Tek-DB maliyet disiplini.',
        'Meta\'dan webhook kayıtları platformun dönüşümleri belirli kreatif varyantlarına atfetmesini sağlar. ROAS grafiğini "Meta-bize-söyledi"den "biz-saydık"a çeviren hamle bu.',
        'Tenant_id ayırıcı ile satır seviyesi güvenlikle çok kiracılı. Çapraz-tenant sızıntı mümkün değil.',
        'Yapılandırılmış etiketlerle her kural atışında Sentry — gece 3\'te kampanya bozan bir durdurma eylemi sabah 9\'da yeniden inşa edilebilir.'
      ],
      stack: 'Next.js · Postgres · Redis · Bull · Meta Marketing API · Railway · Sentry',
      timeline: '14 hafta · 4 operatörle canlı beta',
      outcome: 'Operatörler hesap başına haftada 8 saat geri kazandı ve Q2 boyunca ROAS\'ı 3,4×\'te tuttu.',
      metrics: [
        { label: 'Op başına / hafta tasarruf', value: '8 saat' },
        { label: 'Sürdürülen ROAS', value: '3,4×' },
        { label: 'Günde tetiklenen kural', value: '38' },
        { label: 'Medyan CPA düşüşü', value: '−%18' }
      ],
      gallery: [
        { src: '/projects/megvax-dashboard.svg', caption: 'Operatör paneli — harcama vs gelir ile 24 saatte 38 kez tetiklenen kurallar paneli.' }
      ],
      image: '/projects/megvax-dashboard.svg',
      liveUrl: ''
    },
    'customer-agent-multilingual': {
      title: 'İade politikası uydurmayan beş dilli müşteri desteği',
      client: 'Customer-Agent',
      industry: 'Müşteri operasyonları',
      service: 'Çok dilli yapay zekâ ajanı · WhatsApp + e-posta + web · gönderim öncesi inceleme',
      year: '2026',
      problem: 'E-ticaret ve konaklama operatörleri aynı 30 soruyla üç kanalda, her saatte, beş dilde karşılaşıyor — Romence, Türkçe, İngilizce, Almanca, İspanyolca. Hazır chatbotlar dil algılamada başarısız oluyor, markanın hiç sunmadığı iade politikalarını uyduruyor ve "bu hassas, insana ver" kavramından yoksun. Müşterinin ihtiyacı: tek gelen kutusu, müşterinin gerçek dilinde yanıtlar ve ajanın gece 3\'te politika uydurmasına karşı bir güvenlik ağı.',
      approach: 'Otomatik gönderim değil, taslak yanıt. Ajan dili algılar, mesajı elle yazılmış bir playbook girdisiyle eşler, sipariş verisini kullanarak bir yanıt hazırlar ve bir insanın onaylamasını bekler. Güvenli niyetler (kargo durumu, mağaza saatleri) için operatör otomatik gönderimi açabilir; 100€ üstü iadeler, iptaller veya öfke sinyallerinde ajan durur ve bir insanı çağırır. Beş dil, markanın sahip olduğu playbook\'larla yayında — üretilen kurallarla değil.',
      decisions: [
        'Dil algılama için fastText langid — LLM çağrısı değil. Daha ucuz, daha hızlı, 0,98 güven tabanı net tanımlı.',
        'Niyet sınıflandırma elle hazırlanan playbook araması, sıfır-shot değil. Her müşterinin 20-40 playbook girdisi var.',
        'Yanıtlar Claude Opus 4.7 tarafından playbook girdisi bağlam olarak, müşteri sipariş verisi enjekte edilerek ve politika uydurmayı açıkça yasaklayan bir sistem promptu ile taslaklanır.',
        'Gönderim öncesi inceleme güvenlik çubuğu. Otomatik gönderim, niyet × müşteri başına opt-in, günlük üst sınır ile.',
        'WhatsApp Business API, IMAP e-posta ve bir web widget\'ı için kanal adaptörleri — tek gelen kutusu, tek ajan, konuşma katmanında dilden bağımsız.',
        'Her taslağın + onayın + gönderimin denetim izi, yanıt başına model+gecikme+token maliyeti ile.'
      ],
      stack: 'Next.js · Postgres · Claude Opus · OpenAI embeddings · WhatsApp Business API',
      timeline: '9 hafta · 3 müşteride canlı',
      outcome: 'Taleplerin %78\'i, onay döngüsünde bir insan tutarak yükseltme olmadan kapandı.',
      metrics: [
        { label: 'Otomatik kapanış', value: '%78' },
        { label: 'Aktif dil', value: '5' },
        { label: 'Medyan taslak gecikmesi', value: '1,8s' },
        { label: 'Uydurulan iade teklifi', value: '0' }
      ],
      gallery: [
        { src: '/projects/customer-agent-multilingual.svg', caption: 'Operatör gelen kutusu — Romence bir iade talebi, onay bekleyen bir taslak ve ajan müfettişi.' }
      ],
      image: '/projects/customer-agent-multilingual.svg',
      liveUrl: '/customer-agent'
    }
  },
  ro: {
    'rulesell-marketplace': {
      title: 'O piață pentru configurațiile de dezvoltare AI',
      client: 'RuleSell',
      industry: 'Piață pentru dezvoltatori',
      service: 'Piață bilaterală · Stripe Connect · listări auditate',
      year: '2026',
      problem: 'Configurările AI sunt nesigure. Cumpărătorii nu aveau cum să știe care seturi de reguli Claude Code sau Cursor sunt sigure de instalat — calitatea varia de la o reglare de un rând la o disciplină operațională de 500 de rânduri, împrăștiată prin gist-uri GitHub, articole de blog și canale Discord. Creatorii nu aveau unde să-și monetizeze munca, iar pentru cumpărători nu exista un loc canonic pentru configurări auditate. Clientul avea nevoie de o piață în care cumpărătorii să aibă încredere în ce instalează, iar creatorii să fie plătiți pentru ce publică.',
      approach: 'Încrederea vine dintr-un grad de audit vizibil, nu din numărul de recenzii. Fiecare trimitere primește un grad de audit A/B/C, susținut de 42 de verificări automate (validare frontmatter, calitatea frazelor declanșatoare, detectarea anti-pattern-urilor, integritatea licenței, completitudine). Cumpărătorii văd gradul pe cardul de listare înainte să apese. Creatorii primesc o rubrică clară pentru a-și îmbunătăți scorul. Plățile rulează prin Stripe Connect; creatorii intră fără un panou separat.',
      decisions: [
        'Un singur Postgres pentru catalog + revendicări + plăți — niciun microserviciu până la 100k MRR. Drizzle ORM cu verificări de siguranță a migrației scrise manual.',
        'Conducta de audit rulează într-un cron Vercel + coadă, nu sincron la trimitere. Trimiterile urmează DRAFT → AUDITING → PUBLISHED, nu eșuează niciodată cu un 200 tăcut.',
        'Conturi Stripe Connect Express, astfel încât creatorii intră fără un panou separat. Plățile sunt săptămânale cu un blocaj de chargeback de 7 zile per riscul implicit Stripe.',
        '600 de pagini SEO programatice construite dintr-o matrice (framework × caz de utilizare) cu fragmente de text scrise manual, nu umplutură generată de șablon. Fiecare pagină are H1 unic, meta unic, primele 100 de cuvinte unice.',
        'Strategie de citare AI: llms.txt + date structurate pe fiecare listare + o pagină /docs/why-rulesell care țintește interogări AI Overview „ce este rulesell".',
        'Fără recenzii generate de utilizatori până la 500 de instalări plătite — frauda de recenzii este ucigașul piețelor. Insigna auditat face munca de încredere până când volumul justifică un sistem de recenzii.'
      ],
      stack: 'Next.js 16 · Postgres · Drizzle · Stripe Connect · Vercel · Sentry',
      timeline: '11 săptămâni · 2 operatori',
      outcome: 'Piața a fost lansată cu 212 listări auditate și 600 de pagini SEO programatice.',
      metrics: [
        { label: 'Listări la lansare', value: '212' },
        { label: 'Creatori auditați', value: '47' },
        { label: 'Pagini SEO programatice', value: '600' },
        { label: 'Rată medie de audit', value: '64%' }
      ],
      gallery: [
        { src: '/projects/rulesell-marketplace.svg', caption: 'Vizualizare browse — insigna auditat pe fiecare listare, fără teatru de „trending".' }
      ],
      image: '/projects/rulesell-marketplace.svg',
      liveUrl: 'https://www.rulesell.com'
    },
    'megvax-meta-ads': {
      title: 'Oprește campaniile proaste la 3 dimineața fără să stai treaz să le supraveghezi',
      client: 'MegVax',
      industry: 'AdTech SaaS',
      service: 'Automatizare Meta Ads · motor de reguli · panou multi-cont',
      year: '2026',
      problem: 'Un operator de reclame solo care rulează 10-40 de campanii pe 3-5 conturi nu poate urmări CPA în fiecare oră. Regulile automate native Meta sunt limitate la declanșatoare simple per campanie, așa că atunci când o creativă obosește la 2 noaptea sau o audiență se strică peste noapte, bugetul arde până dimineața. Operatorii aveau nevoie de reguli la nivel de cont („oprește orice are CPA peste 12 euro, oriunde"), declanșatoare de reîmprospătare creativă și capacitatea de a realoca bugetul între campanii pe baza ROAS în timp real — fără să scrie ei integrarea.',
      approach: 'Un motor de reguli și un panou peste API-ul de marketing Meta. Regulile se adaugă printr-un formular, nu prin YAML. La fiecare 5 minute platforma trage metrici noi din Meta și declanșează ce se potrivește: pauză, scalare, schimbare creativă. Fiecare acțiune este logată; operatorul se trezește la 9 dimineața și reconstituie ce s-a schimbat la 3. Multi-cont este implicit — comutare între conturile de client cu un singur clic.',
      decisions: [
        'Coadă Bull cu Redis pe Railway pentru rule runner. Tick-ul de 5 minute este compromisul limitei de rată Meta API.',
        'Motorul de reguli este un arbore JSON etichetat, nu un DSL. Operatorii adaugă reguli printr-un formular, nu editează YAML.',
        'Postgres pentru tot: reguli, declanșări, conturi, audit trail. Disciplină de cost cu o singură DB.',
        'Ingestia webhook pentru evenimentele de lead Meta, astfel încât platforma să poată atribui conversiile unor variante creative specifice.',
        'Multi-tenant prin securitate la nivel de rând cu un discriminator tenant_id. Fără filtrare per-tenant cu tabel partajat, fără scurgeri inter-tenant posibile.',
        'Sentry pe fiecare declanșare de regulă cu etichete structurate (tenant, campanie, rule_id) astfel încât o acțiune de pauză la 3am este reconstructibilă până la 9am.'
      ],
      stack: 'Next.js · Postgres · Redis · Bull · Meta Marketing API · Railway · Sentry',
      timeline: '14 săptămâni · beta live cu 4 operatori',
      outcome: 'Operatorii au recuperat 8 ore/săptămână per cont și au menținut ROAS la 3,4× pe Q2.',
      metrics: [
        { label: 'Ore economisite/op/săpt', value: '8' },
        { label: 'ROAS susținut', value: '3,4×' },
        { label: 'Reguli declanșate/zi', value: '38' },
        { label: 'Reducere CPA medie', value: '−18%' }
      ],
      gallery: [
        { src: '/projects/megvax-dashboard.svg', caption: 'Panoul operatorului — spend vs revenue cu panoul de reguli care s-a declanșat de 38 de ori în 24h.' }
      ],
      image: '/projects/megvax-dashboard.svg',
      liveUrl: ''
    },
    'customer-agent-multilingual': {
      title: 'Suport în cinci limbi care nu inventează politici de retur',
      client: 'Customer-Agent',
      industry: 'Operațiuni clienți',
      service: 'Agent AI multilingv · WhatsApp + email + web · revizuire înainte de trimitere',
      year: '2026',
      problem: 'Operatorii de e-commerce și hospitality primesc aceleași 30 de întrebări pe trei canale, la orice oră, în cinci limbi — română, turcă, engleză, germană, spaniolă. Chatboturile gata-făcute eșuează la detectarea limbii, inventează politici de retur pe care brandul nu le-a oferit niciodată și nu au conceptul de „acesta e delicat, dă-l unui om". Clientul avea nevoie de o singură căsuță, răspunsuri în limba reală a clientului și o plasă de siguranță împotriva agentului care inventează politici la 3 dimineața.',
      approach: 'Un răspuns draft, nu o trimitere automată. Agentul detectează limba, potrivește mesajul cu o intrare playbook scrisă manual, redactează un răspuns folosind datele comenzii și așteaptă ca un om să aprobe. Pentru intenții sigure (status livrare, ore magazin) operatorul poate activa trimiterea automată; pentru retururi peste 100 de euro, anulări sau semnale de furie, agentul oprește și apelează un om. Cinci limbi lansate cu playbook-uri deținute de brand, nu cu reguli generate.',
      decisions: [
        'Detectare limbă prin langid fastText, nu apel LLM — mai ieftin, mai rapid, pragul de încredere 0,98 este bine definit.',
        'Clasificarea intenției este o căutare playbook curată manual, nu zero-shot. Fiecare client are 20-40 intrări playbook.',
        'Răspunsurile sunt redactate de Claude Opus 4.7 cu intrarea playbook ca context, datele comenzii clientului injectate, și un system prompt care interzice explicit inventarea politicilor.',
        'Review-before-send este bara de siguranță. Auto-send este opt-in per intenție per client, cu un plafon zilnic și un kill-switch pe orice detecție de sentiment negativ.',
        'Adaptoare de canal pentru WhatsApp Business API, IMAP email și un widget web — o singură căsuță, un singur agent, agnostic de limbă la stratul conversației.',
        'Audit trail al fiecărui draft + aprobare + trimitere, cu cost model+latență+token per răspuns. Primul lucru pe care operatorul îl vede pe o conversație marcată este „asta ar fi spus agentul, și astea sunt datele folosite".'
      ],
      stack: 'Next.js · Postgres · Claude Opus · OpenAI embeddings · WhatsApp Business API',
      timeline: '9 săptămâni · live pe 3 clienți',
      outcome: '78% din tichete rezolvate fără escaladare, păstrând un om în bucla de aprobare.',
      metrics: [
        { label: 'Rată auto-rezolvare', value: '78%' },
        { label: 'Limbi active', value: '5' },
        { label: 'Latență draft mediană', value: '1,8s' },
        { label: 'Oferte de retur halucinate', value: '0' }
      ],
      gallery: [
        { src: '/projects/customer-agent-multilingual.svg', caption: 'Căsuța operatorului — o cerere de retur în română, un draft care așteaptă aprobare și inspectorul agentului.' }
      ],
      image: '/projects/customer-agent-multilingual.svg',
      liveUrl: '/customer-agent'
    }
  }
};

const V8 = {
  en: {
    heroEyebrow: 'VELKINA',
    heroTickerLabel: 'CURRENT',
    heroTickerItems: [
      '1 OPEN BUILD SLOT · JULY',
      'INTRO CALLS · 20 MIN · CAL.COM/VELKINA',
      'ISTANBUL + BUCHAREST · EN/TR/RO'
    ],
    headlineL1: 'SOFTWARE',
    headlineL2: 'AND BRAND',
    headlineL3: 'THAT SHIPS.',
    studioEyebrow: 'STUDIO',
    studioStatement: 'Software, brand and ad infrastructure for European founders launching internationally — built end-to-end so the storefront, the campaigns and the support agent come out of one room.',
    workEyebrow: 'RECENT WORK · 2025—2026',
    workHeading: 'Recent work.',
    workLead: 'Live products, real clients, screenshots from production. Open any tile to see the problem the client started with and what came out the other side.',
    capabilitiesItems: [
      'WEB',
      'SHOPIFY',
      'AI AGENTS',
      'MOBILE',
      'BRAND',
      'MOTION',
      'CLOUD',
      'SEO',
      'CONTENT'
    ],
    capabilitiesStatement: 'A storefront, a multilingual support agent and a Meta Ads pipeline come out of one engagement — not three vendors stitched together by a project manager. That is the practical reason founders launching internationally end up here.',
    operatorsEyebrow: 'TEAM',
    operatorsHeading: 'Two operators on every project.',
    nalbaName: 'Nalba',
    nalbaRole: 'Frontend · brand · marketing · Istanbul',
    nalbaContact: 'nalba@velkina.com',
    nalbaVoice: 'Frontend, brand and conversion-side marketing. Recent work: the Lavinia Bistro QR menu (4 restaurants, 4 languages, one editor), the Rain Group Shopify replatform (sustained 3.4× ROAS), and the Dr Sevim clinic brand refresh.',
    bahaName: 'Baha',
    bahaRole: 'Backend · infrastructure · ops · Bucharest',
    bahaContact: 'baha@velkina.com',
    bahaVoice: 'Backend, ad-platform integrations and infrastructure. Recent work: the MegVax Meta Ads automation engine (38 rules firing per day across 14 campaigns), the Nova Health AWS migration (99.97% uptime), and the RuleSell payouts + audit pipeline on Stripe Connect.',
    contactEyebrow: 'CONTACT',
    contactHeading: 'Start a project.',
    contactHeadingItalic: '',
    contactSub: 'Email for written briefs. WhatsApp for fast questions. Calendly for a 20-minute intro call.',
    contactEmail: 'EMAIL',
    contactWhatsapp: 'WHATSAPP',
    contactSchedule: '20-MIN INTRO CALL',
    clientsLabel: 'SHIPPED FOR',
    seeWorkCta: 'ALL WORK →'
  },
  tr: {
    heroEyebrow: 'VELKINA',
    heroTickerLabel: 'GÜNCEL',
    heroTickerItems: [
      'TEMMUZ\'DA 1 BOŞ SLOT',
      'TANIŞMA GÖRÜŞMESİ · 20 DK · CAL.COM/VELKINA',
      'İSTANBUL + BÜKREŞ · EN/TR/RO'
    ],
    headlineL1: 'TESLİM EDİLEN',
    headlineL2: 'YAZILIM',
    headlineL3: 'VE MARKA.',
    studioEyebrow: 'STÜDYO',
    studioStatement: 'Uluslararası pazara açılan Avrupalı kurucular için yazılım, marka ve reklam altyapısı — mağaza, kampanyalar ve destek ajanı tek bir odadan uçtan uca çıkıyor.',
    workEyebrow: 'SON İŞLER · 2025—2026',
    workHeading: 'Son işler.',
    workLead: 'Canlı ürünler, gerçek müşteriler, üretimden ekran görüntüleri. Müşterinin başlangıçtaki problemini ve diğer uçtan ne çıktığını görmek için bir karta tıkla.',
    capabilitiesItems: [
      'WEB',
      'SHOPIFY',
      'AI AJANLAR',
      'MOBİL',
      'MARKA',
      'HAREKET',
      'BULUT',
      'SEO',
      'İÇERİK'
    ],
    capabilitiesStatement: 'Mağaza, çok dilli destek ajanı ve Meta Ads hattı tek bir iş kapsamından çıkıyor — bir proje yöneticisinin birbirine dikmek zorunda olduğu üç tedarikçiden değil. Uluslararası pazara açılan kurucuların burada bitmesinin pratik nedeni bu.',
    operatorsEyebrow: 'EKİP',
    operatorsHeading: 'Her projede iki operatör.',
    nalbaName: 'Nalba',
    nalbaRole: 'Frontend · marka · pazarlama · İstanbul',
    nalbaContact: 'nalba@velkina.com',
    nalbaVoice: 'Frontend, marka ve dönüşüm tarafı pazarlama. Son işler: Lavinia Bistro QR menüsü (4 restoran, 4 dil, tek editör), Rain Group Shopify yeniden platformu (sürdürülen 3,4× ROAS) ve Dr Sevim klinik marka yenilemesi.',
    bahaName: 'Baha',
    bahaRole: 'Backend · altyapı · operasyon · Bükreş',
    bahaContact: 'baha@velkina.com',
    bahaVoice: 'Backend, reklam platformu entegrasyonları ve altyapı. Son işler: MegVax Meta Ads otomasyon motoru (14 kampanyada günde 38 kural tetiklenmesi), Nova Health AWS migrasyonu (%99,97 uptime) ve Stripe Connect üzerinde RuleSell ödeme + denetim hattı.',
    contactEyebrow: 'İLETİŞİM',
    contactHeading: 'Bir proje başlat.',
    contactHeadingItalic: '',
    contactSub: 'Yazılı brief için e-posta. Hızlı sorular için WhatsApp. 20 dakikalık tanışma için Calendly.',
    contactEmail: 'E-POSTA',
    contactWhatsapp: 'WHATSAPP',
    contactSchedule: '20 DK TANIŞMA',
    clientsLabel: 'TESLİM ETTİĞİMİZ MARKALAR',
    seeWorkCta: 'TÜM İŞLER →'
  },
  ro: {
    heroEyebrow: 'VELKINA',
    heroTickerLabel: 'CURENT',
    heroTickerItems: [
      'UN SLOT DE BUILD LIBER · IULIE',
      'INTRO CALL · 20 MIN · CAL.COM/VELKINA',
      'ISTANBUL + BUCUREȘTI · EN/TR/RO'
    ],
    headlineL1: 'SOFTWARE',
    headlineL2: 'ȘI BRAND',
    headlineL3: 'CARE LIVREAZĂ.',
    studioEyebrow: 'STUDIO',
    studioStatement: 'Software, brand și infrastructură de reclame pentru fondatorii europeni care se lansează internațional — magazinul, campaniile și agentul de suport ies dintr-o singură cameră, cap-coadă.',
    workEyebrow: 'LUCRĂRI RECENTE · 2025—2026',
    workHeading: 'Lucrări recente.',
    workLead: 'Produse live, clienți reali, capturi din producție. Apasă orice casetă ca să vezi problema cu care a venit clientul și ce a ieșit la capătul celălalt.',
    capabilitiesItems: [
      'WEB',
      'SHOPIFY',
      'AGENȚI AI',
      'MOBIL',
      'BRAND',
      'MOTION',
      'CLOUD',
      'SEO',
      'CONȚINUT'
    ],
    capabilitiesStatement: 'Magazinul, agentul de suport multilingv și pipeline-ul Meta Ads ies dintr-o singură comandă — nu trei furnizori cusuți de un project manager. Acesta este motivul practic pentru care fondatorii care se lansează internațional ajung aici.',
    operatorsEyebrow: 'ECHIPA',
    operatorsHeading: 'Doi operatori pe fiecare proiect.',
    nalbaName: 'Nalba',
    nalbaRole: 'Frontend · brand · marketing · Istanbul',
    nalbaContact: 'nalba@velkina.com',
    nalbaVoice: 'Frontend, brand și marketing pe partea de conversie. Lucrări recente: meniul QR al Lavinia Bistro (4 restaurante, 4 limbi, un singur editor), replatformarea Shopify pentru Rain Group (ROAS 3,4× susținut) și refresh-ul de brand al clinicii Dr Sevim.',
    bahaName: 'Baha',
    bahaRole: 'Backend · infrastructură · ops · București',
    bahaContact: 'baha@velkina.com',
    bahaVoice: 'Backend, integrări cu platforme de reclame și infrastructură. Lucrări recente: motorul de automatizare Meta Ads MegVax (38 de reguli pe zi pe 14 campanii), migrarea AWS pentru Nova Health (uptime 99,97%) și pipeline-ul de payouts + audit RuleSell pe Stripe Connect.',
    contactEyebrow: 'CONTACT',
    contactHeading: 'Pornește un proiect.',
    contactHeadingItalic: '',
    contactSub: 'Email pentru brief-uri scrise. WhatsApp pentru întrebări rapide. Calendly pentru un intro call de 20 de minute.',
    contactEmail: 'EMAIL',
    contactWhatsapp: 'WHATSAPP',
    contactSchedule: 'INTRO CALL 20 MIN',
    clientsLabel: 'LIVRAT PENTRU',
    seeWorkCta: 'TOATĂ MUNCA →'
  }
};

// "Featured" — slugs in order, used by HomeView.tsx v8.
// Mix: must include RuleSell, MegVax, Customer-Agent, plus
// at least one e-commerce, one mobile, one brand/web.
const FEATURED_SLUGS = [
  'rulesell-marketplace',          // SaaS-marketplace / AI complex
  'megvax-meta-ads',                // SaaS / AI complex
  'customer-agent-multilingual',    // AI agent complex
  'lavinia-bistro-qr-menu',         // hospitality / web app
  'rain-group-ecommerce',           // e-commerce
  'skyline-media-mobile-app',       // mobile
  'eduturkia-platform',             // platform
  'drsevim-beauty-clinic'           // brand
];

// Tag labels shown above project tiles
const TAG_LABELS = {
  en: {
    saas: 'SAAS',
    marketplace: 'MARKETPLACE',
    aiAgent: 'AI AGENT',
    ecommerce: 'E-COMMERCE',
    mobile: 'MOBILE',
    web: 'WEB APP',
    brand: 'BRAND',
    platform: 'PLATFORM',
    caseStudy: 'CASE STUDY',
    viewCase: 'OPEN CASE →',
    deep: 'DEEP CASE STUDY',
    workIndexEyebrow: 'ALL WORK · 2024—2026',
    workIndexHeading: 'All work.',
    workIndexLead: 'Live products and the problems they solved. Apparel, hospitality, AdTech, legal, education, healthcare, marketplace.',
    detailEyebrow: 'CASE STUDY',
    detailProblem: 'The problem',
    detailDecisions: 'How it was built',
    detailGallery: 'Product',
    detailOutcome: 'Outcome',
    detailMetrics: 'Numbers',
    detailNext: 'NEXT PROJECT',
    detailStack: 'STACK',
    detailTimeline: 'TIMELINE'
  },
  tr: {
    saas: 'SAAS',
    marketplace: 'PAZARYERİ',
    aiAgent: 'AI AJAN',
    ecommerce: 'E-TİCARET',
    mobile: 'MOBİL',
    web: 'WEB UYGULAMASI',
    brand: 'MARKA',
    platform: 'PLATFORM',
    caseStudy: 'VAKA ANALİZİ',
    viewCase: 'VAKAYI AÇ →',
    deep: 'DERİN VAKA ANALİZİ',
    workIndexEyebrow: 'TÜM İŞLER · 2024—2026',
    workIndexHeading: 'Tüm işler.',
    workIndexLead: 'Yayında olan ürünler ve çözdükleri problemler. Giyim, konaklama, AdTech, hukuk, eğitim, sağlık, pazaryeri.',
    detailEyebrow: 'VAKA ANALİZİ',
    detailProblem: 'Problem',
    detailDecisions: 'Nasıl inşa edildi',
    detailGallery: 'Ürün',
    detailOutcome: 'Sonuç',
    detailMetrics: 'Rakamlar',
    detailNext: 'SONRAKİ PROJE',
    detailStack: 'YIĞIN',
    detailTimeline: 'SÜRE'
  },
  ro: {
    saas: 'SAAS',
    marketplace: 'PIAȚĂ',
    aiAgent: 'AGENT AI',
    ecommerce: 'E-COMMERCE',
    mobile: 'MOBIL',
    web: 'APLICAȚIE WEB',
    brand: 'BRAND',
    platform: 'PLATFORMĂ',
    caseStudy: 'STUDIU DE CAZ',
    viewCase: 'DESCHIDE CAZUL →',
    deep: 'STUDIU DE CAZ DETALIAT',
    workIndexEyebrow: 'TOATĂ MUNCA · 2024—2026',
    workIndexHeading: 'Toată munca.',
    workIndexLead: 'Produse live și problemele pe care le-au rezolvat. Modă, hospitality, AdTech, juridic, educație, sănătate, marketplace.',
    detailEyebrow: 'STUDIU DE CAZ',
    detailProblem: 'Problema',
    detailDecisions: 'Cum a fost construit',
    detailGallery: 'Produsul',
    detailOutcome: 'Rezultat',
    detailMetrics: 'Cifre',
    detailNext: 'URMĂTORUL PROIECT',
    detailStack: 'STIVĂ',
    detailTimeline: 'DURATĂ'
  }
};

// Service-tag per slug for the home grid. Same per-locale since these are
// short labels routed through TAG_LABELS above.
const SLUG_TAG = {
  'rulesell-marketplace': 'marketplace',
  'megvax-meta-ads': 'saas',
  'customer-agent-multilingual': 'aiAgent',
  'lavinia-bistro-qr-menu': 'web',
  'rain-group-ecommerce': 'ecommerce',
  'skyline-media-mobile-app': 'mobile',
  'eduturkia-platform': 'platform',
  'drsevim-beauty-clinic': 'brand',
  'tp-thermoplast-b2b': 'web',
  'ataravci-law-firm': 'web',
  'clown3d-creative-studio': 'brand',
  'novahealth-cloud-migration': 'saas',
  'marmara-foods-google-ads': 'ecommerce',
  'bosporus-travel-ai-agent': 'aiAgent',
  'anatolia-hotel-booking': 'web',
  'konak-coffee-house': 'web'
};

// One-line problem statements per slug for the home grid hover-overlay.
const HOVER_PROBLEM = {
  en: {
    'rulesell-marketplace': 'How do you build a marketplace where audited quality is the product, not a filter?',
    'megvax-meta-ads': 'How do you give a single ad operator the leverage of a team without spending team money?',
    'customer-agent-multilingual': 'How do you ship five-language support without hallucinating refund policies at 3am?',
    'lavinia-bistro-qr-menu': 'How do four restaurants run one menu in four languages without IT?',
    'rain-group-ecommerce': 'How does a Turkish outdoor retailer go from catalog site to ROAS-positive Shopify?',
    'skyline-media-mobile-app': 'How do you turn a creator pipeline into a phone app that ships in three months?',
    'eduturkia-platform': 'How do international students compare 200 Turkish universities in one place?',
    'drsevim-beauty-clinic': 'How does an Istanbul beauty clinic build a brand that books appointments while it sleeps?',
    'tp-thermoplast-b2b': 'How does an industrial supplier sell across six markets with one bilingual site?',
    'ataravci-law-firm': 'How does a Bucharest law firm convert a phone-only intake into a website-led pipeline?',
    'clown3d-creative-studio': 'How does a 3D motion studio show ten years of work without a single embed?',
    'novahealth-cloud-migration': 'How does a clinic move off on-prem and survive the audit at the same time?',
    'marmara-foods-google-ads': 'How does a family food brand make Google Ads work in two languages?',
    'bosporus-travel-ai-agent': 'How does a travel agency replace its WhatsApp inbox with an AI agent that books?',
    'anatolia-hotel-booking': 'How does a boutique hotel cut OTA commission without losing direct demand?',
    'konak-coffee-house': 'How does a neighbourhood coffee shop ship a real website in one weekend?'
  },
  tr: {
    'rulesell-marketplace': 'Denetimli kalitenin filtre değil ürün olduğu bir pazaryeri nasıl kurulur?',
    'megvax-meta-ads': 'Tek bir reklam operatörüne bir ekibin kaldıracını ekip parası harcamadan nasıl verirsin?',
    'customer-agent-multilingual': 'Gece 3\'te iade politikalarını uydurmadan beş dilli destek nasıl teslim edilir?',
    'lavinia-bistro-qr-menu': 'Dört restoran tek menüyü dört dilde IT olmadan nasıl çalıştırır?',
    'rain-group-ecommerce': 'Türk bir outdoor markası katalog sitesinden ROAS-pozitif Shopify\'a nasıl geçer?',
    'skyline-media-mobile-app': 'Bir yaratıcı pipeline\'ını üç ayda telefon uygulamasına nasıl çevirirsin?',
    'eduturkia-platform': 'Uluslararası öğrenciler 200 Türk üniversitesini tek yerde nasıl karşılaştırır?',
    'drsevim-beauty-clinic': 'İstanbul\'lu bir güzellik kliniği uyurken randevu alan bir marka nasıl kurar?',
    'tp-thermoplast-b2b': 'Bir endüstriyel tedarikçi altı pazarda tek bir iki dilli siteyle nasıl satar?',
    'ataravci-law-firm': 'Bir Bükreş hukuk firması yalnızca telefon-temelli alımı web sitesi-liderli hatta nasıl çevirir?',
    'clown3d-creative-studio': 'Bir 3D motion stüdyosu on yıllık işi tek bir embed olmadan nasıl gösterir?',
    'novahealth-cloud-migration': 'Bir klinik on-prem\'den nasıl çıkar ve aynı anda denetimi nasıl atlatır?',
    'marmara-foods-google-ads': 'Aile bir gıda markası Google Ads\'i iki dilde nasıl çalıştırır?',
    'bosporus-travel-ai-agent': 'Bir seyahat acentesi WhatsApp gelen kutusunu rezervasyon yapan bir AI ajanla nasıl değiştirir?',
    'anatolia-hotel-booking': 'Bir butik otel OTA komisyonunu doğrudan talebi kaybetmeden nasıl azaltır?',
    'konak-coffee-house': 'Bir mahalle kahvecisi bir hafta sonunda gerçek bir web sitesini nasıl teslim eder?'
  },
  ro: {
    'rulesell-marketplace': 'Cum construiești o piață în care calitatea auditată este produsul, nu un filtru?',
    'megvax-meta-ads': 'Cum dai unui singur operator de reclame pârghia unei echipe fără banii unei echipe?',
    'customer-agent-multilingual': 'Cum livrezi suport în cinci limbi fără să halucinezi politici de retur la 3 dimineața?',
    'lavinia-bistro-qr-menu': 'Cum rulează patru restaurante un singur meniu în patru limbi fără IT?',
    'rain-group-ecommerce': 'Cum trece un retailer outdoor turcesc de la site de catalog la Shopify ROAS-pozitiv?',
    'skyline-media-mobile-app': 'Cum transformi un pipeline de creator într-o aplicație de telefon livrată în trei luni?',
    'eduturkia-platform': 'Cum compară studenții internaționali 200 de universități turcești într-un singur loc?',
    'drsevim-beauty-clinic': 'Cum construiește o clinică de beauty din Istanbul un brand care prinde programări în somn?',
    'tp-thermoplast-b2b': 'Cum vinde un furnizor industrial în șase piețe cu un singur site bilingv?',
    'ataravci-law-firm': 'Cum convertește un cabinet de avocatură din București o preluare doar-telefonică într-o pâlnie condusă de site?',
    'clown3d-creative-studio': 'Cum arată un studio 3D zece ani de muncă fără un singur embed?',
    'novahealth-cloud-migration': 'Cum trece o clinică de pe on-prem și supraviețuiește auditului în același timp?',
    'marmara-foods-google-ads': 'Cum face un brand de mâncare de familie Google Ads să funcționeze în două limbi?',
    'bosporus-travel-ai-agent': 'Cum înlocuiește o agenție de turism căsuța WhatsApp cu un agent AI care rezervă?',
    'anatolia-hotel-booking': 'Cum reduce un hotel boutique comisionul OTA fără să piardă cererea directă?',
    'konak-coffee-house': 'Cum livrează o cafenea de cartier un site web real într-un weekend?'
  }
};

function upsert(locale) {
  const file = path.join(MSG_DIR, `${locale}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));

  // 1. Add v8 namespace
  j.home.v8 = V8[locale];

  // 2. Add new tag labels
  j.work.tagLabels = TAG_LABELS[locale];

  // 3. Add featured slugs + slug-tag map + hover-problem map
  j.work.v8Featured = FEATURED_SLUGS;
  j.work.slugTag = SLUG_TAG;
  j.work.hoverProblem = HOVER_PROBLEM[locale];

  // 4. Upsert work.items for the 3 new projects (by slug)
  const items = j.work.items;
  for (const np of NEW_PROJECTS[locale]) {
    const idx = items.findIndex(i => i.slug === np.slug);
    if (idx >= 0) items[idx] = np;
    else items.push(np);
  }

  // 5. Upsert useCase.studies for the 3 new projects (by slug)
  if (!j.useCase) j.useCase = { labels: {}, studies: {} };
  if (!j.useCase.studies) j.useCase.studies = {};
  for (const [slug, study] of Object.entries(NEW_STUDIES[locale])) {
    j.useCase.studies[slug] = study;
  }

  // 6. ALSO upsert decisions/metrics/gallery onto existing studies that
  // do not have them (so WorkDetailView v8 can render the v8 sections
  // for old slugs without crashing). For the lighter projects, we keep
  // these empty arrays — the view will fall back to the slim template.
  for (const slug of Object.keys(j.useCase.studies)) {
    const s = j.useCase.studies[slug];
    if (!s.decisions) s.decisions = [];
    if (!s.metrics) s.metrics = [];
    if (!s.gallery) {
      // For projects that have an image, use it as the single gallery entry
      s.gallery = s.image ? [{ src: s.image, caption: s.title || s.client }] : [];
    }
  }

  fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf8');
}

for (const l of ['en', 'tr', 'ro']) upsert(l);

// Parity check
function flat(o, p = '') {
  const out = {};
  for (const k in o) {
    const v = o[k];
    const key = p ? p + '.' + k : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) Object.assign(out, flat(v, key));
    else out[key] = true;
  }
  return out;
}
const dicts = ['en', 'tr', 'ro'].map(l =>
  flat(JSON.parse(fs.readFileSync(path.join(MSG_DIR, `${l}.json`), 'utf8')))
);
const counts = dicts.map(d => Object.keys(d).length);
console.log('keys per locale (en/tr/ro):', counts);
const missingTr = Object.keys(dicts[0]).filter(k => !(k in dicts[1]));
const missingRo = Object.keys(dicts[0]).filter(k => !(k in dicts[2]));
if (missingTr.length || missingRo.length) {
  console.error('PARITY FAIL:');
  if (missingTr.length) console.error('  missing in TR:', missingTr.slice(0, 20));
  if (missingRo.length) console.error('  missing in RO:', missingRo.slice(0, 20));
  process.exit(1);
}
console.log('PARITY OK');
