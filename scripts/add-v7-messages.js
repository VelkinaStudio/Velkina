/* one-shot: add home.v7 namespace to all three locale JSONs */
const fs = require('fs');

const ENG_V7 = {
  drag: 'DRAG TO SEE MORE →',
  recentRibbon: 'RECENT LEDGER · LAST 90 DAYS',
  descriptions: {
    'Lavinia Bistro': "A 30-cover restaurant in Kadıköy wanted a QR menu that read like an editorial site, not a PDF. We shipped one in 4 weeks. Orders held steady through table-turn.",
    'Rain Group': "Outdoor-gear retailer in Antalya, scaling ad spend without bleeding margin. Shopify replatform plus Meta Ads run by the people who built the product page.",
    'Nova Health': "Tele-health platform on legacy hosting that fell over at peak. We moved them to AWS with zero downtime over a single weekend; 99.97% uptime since.",
    'EduTurkia': "Student-recruitment site that needed to rank in three languages without losing the warmth. Editorial CMS, weekly content sprints, 60% organic lift in 90 days.",
    'Atar Avcı Law': "Cloud migration off a 3.4k-per-month hosting bill. Same uptime, lower invoice, faster admin. The kind of work no agency advertises.",
    'TP Thermoplast': "Industrial-pipes manufacturer needed a B2B data pipeline across 6 markets — pricing, stock, dealer portals, the lot. Live in production. Quietly running."
  },
  taglineLead: 'Two operators.',
  taglineMid: 'Real software.',
  taglineEnd: 'Recent ledger above.',
  operatorIntro: 'Velkina is two people, not a department.',
  nalbaRole: 'frontend · design · business',
  bahaRole: 'backend · infrastructure · ops',
  servicesEyebrow: 'WORK PAIRS',
  servicesHeading: 'What we do, proven by what we shipped.',
  servicePairs: [
    { service: 'Websites', proof: 'Lavinia Bistro · QR menu platform · 2026-05' },
    { service: 'E-commerce', proof: 'Rain Group · Shopify + Meta Ads · 2026-04' },
    { service: 'Cloud / DevOps', proof: 'Nova Health · AWS migration · 2026-04' },
    { service: 'AI agents', proof: 'EduTurkia · multilingual editorial CMS · 2026-03' },
    { service: 'Mobile apps', proof: 'TP Thermoplast · B2B dealer pipeline · 2026-02' }
  ],
  bigNumberEyebrow: 'LEDGER · SINCE 2018',
  bigNumberValue: '47',
  bigNumberCaption: 'PROJECTS SHIPPED SINCE 2018',
  bigNumberFootnote: 'Eight years. Two operators. Real client invoices, not slide-deck math.',
  voiceEyebrow: 'OPERATORS',
  voiceHeading: 'Who you actually talk to.',
  nalbaVoice: "I run the frontend, the design and the client conversation. The Lavinia Bistro QR menu is mine end-to-end — pixel placement, copy, the small editorial decisions. If the site feels considered, it is because I considered it.",
  bahaVoice: "I handle the servers, the data pipelines, the migrations nobody wants to schedule. Nova Health came off legacy hosting over a single weekend; the Atar Avcı bill is down 3.4k a month. The infrastructure shows up when you do not have to think about it.",
  contactEyebrow: 'CONTACT',
  contactHeading: 'Three links. No form.',
  contactSub: 'Email, WhatsApp, or pick a 20-minute slot. We answer within a business day.',
  contactEmail: 'Email',
  contactWhatsapp: 'WhatsApp',
  contactSchedule: 'Book 20 min'
};

const TR_V7 = {
  drag: 'DAHA FAZLASI İÇİN SÜRÜKLE →',
  recentRibbon: 'GÜNCEL DEFTER · SON 90 GÜN',
  descriptions: {
    'Lavinia Bistro': "Kadıköy'de 30 masalı bir restoran, PDF gibi değil, dergi gibi okunan bir QR menü istedi. 4 haftada teslim ettik. Servis hızı korundu.",
    'Rain Group': "Antalyalı outdoor markası — marjı bozmadan reklam harcamasını büyütmek istedi. Shopify yeniden platform + Meta Ads, ürün sayfasını yapan ekibin elinden.",
    'Nova Health': "Eski hostingi tepe yükte çöken bir tele-sağlık platformu. Bir hafta sonunda sıfır kesintiyle AWS'ye taşıdık; 99,97% uptime sürüyor.",
    'EduTurkia': "Üç dilde sıralanması gereken bir öğrenci platformu — sıcaklığını kaybetmeden. Editöryal CMS, haftalık içerik sprintleri, 90 günde +%60 organik.",
    'Atar Avcı Hukuk': "Aylık 3,4 bin €'luk hosting faturasından çıkış. Aynı uptime, düşen fatura, hızlanan operasyon. Kimsenin reklamını yapmadığı iş.",
    'TP Thermoplast': "Endüstriyel boru üreticisi — 6 pazarda fiyat, stok, bayi portalı için B2B veri hattı. Üretimde, sessizce çalışıyor."
  },
  taglineLead: 'İki operatör.',
  taglineMid: 'Gerçek yazılım.',
  taglineEnd: 'Yukarıdaki defter de gerçek.',
  operatorIntro: 'Velkina iki kişidir, departman değil.',
  nalbaRole: 'frontend · tasarım · iş',
  bahaRole: 'backend · altyapı · operasyon',
  servicesEyebrow: 'İŞ ÇİFTLERİ',
  servicesHeading: 'Ne yaptığımızı, neyi teslim ettiğimiz kanıtlıyor.',
  servicePairs: [
    { service: 'Web siteleri', proof: 'Lavinia Bistro · QR menü platformu · 2026-05' },
    { service: 'E-ticaret', proof: 'Rain Group · Shopify + Meta Ads · 2026-04' },
    { service: 'Cloud / DevOps', proof: 'Nova Health · AWS geçişi · 2026-04' },
    { service: 'AI ajanları', proof: 'EduTurkia · çok dilli editöryal CMS · 2026-03' },
    { service: 'Mobil uygulamalar', proof: 'TP Thermoplast · B2B bayi hattı · 2026-02' }
  ],
  bigNumberEyebrow: "DEFTER · 2018'DEN BERİ",
  bigNumberValue: '47',
  bigNumberCaption: "2018'DEN BU YANA TESLİM EDİLEN PROJE",
  bigNumberFootnote: 'Sekiz yıl. İki operatör. Gerçek müşteri faturaları, sunum matematiği değil.',
  voiceEyebrow: 'OPERATÖRLER',
  voiceHeading: 'Gerçekten konuştuğunuz iki kişi.',
  nalbaVoice: "Frontend, tasarım ve müşteri iletişimi benim. Lavinia Bistro QR menü baştan sona benim elimden çıktı — piksel yerleşimi, metin, küçük editöryal kararlar. Site özenli hissettiriyorsa, onu özenle düşündüm.",
  bahaVoice: "Sunucular, veri hatları, kimsenin planlamak istemediği geçişler bende. Nova Health bir hafta sonunda eski hostingten çıktı; Atar Avcı faturası aylık 3,4 bin € düştü. Altyapı, düşünmek zorunda kalmadığınızda iyi çalışmıştır.",
  contactEyebrow: 'İLETİŞİM',
  contactHeading: 'Üç bağlantı. Form yok.',
  contactSub: 'E-posta, WhatsApp veya 20 dakikalık takvim. Bir iş günü içinde cevap.',
  contactEmail: 'E-posta',
  contactWhatsapp: 'WhatsApp',
  contactSchedule: '20 dk randevu'
};

const RO_V7 = {
  drag: 'TRAGE PENTRU MAI MULT →',
  recentRibbon: 'REGISTRU RECENT · ULTIMELE 90 DE ZILE',
  descriptions: {
    'Lavinia Bistro': "Un bistrou de 30 de locuri din Kadıköy a vrut un meniu QR care să se citească precum o revistă, nu un PDF. Livrat în 4 săptămâni. Viteza de servire s-a păstrat.",
    'Rain Group': "Retailer de echipament outdoor în Antalya — crește bugetul de reclamă fără să rupă marja. Replatformare Shopify plus Meta Ads, rulate de echipa care a construit pagina de produs.",
    'Nova Health': "Platformă tele-medicală pe hosting vechi care cădea la trafic de vârf. Migrare AWS într-un singur weekend, zero downtime; 99,97% uptime de atunci.",
    'EduTurkia': "Site de recrutare studenți, trebuia să ranking-uiască în trei limbi fără să își piardă căldura. CMS editorial, sprinturi săptămânale de conținut, +60% organic în 90 de zile.",
    'Atar Avcı Law': "Migrare dintr-o factură de hosting de 3,4 mii €/lună. Același uptime, factură mai mică, admin mai rapid. Tipul de muncă pe care nicio agenție nu îl promovează.",
    'TP Thermoplast': "Producător de țevi industriale — pipeline B2B de date pentru 6 piețe, cu prețuri, stoc și portaluri pentru dealeri. În producție, rulând în liniște."
  },
  taglineLead: 'Doi operatori.',
  taglineMid: 'Software real.',
  taglineEnd: 'Registrul de mai sus e real.',
  operatorIntro: 'Velkina înseamnă două persoane, nu un departament.',
  nalbaRole: 'frontend · design · business',
  bahaRole: 'backend · infrastructură · ops',
  servicesEyebrow: 'PERECHI DE LUCRU',
  servicesHeading: 'Ce facem, dovedit prin ce am livrat.',
  servicePairs: [
    { service: 'Site-uri web', proof: 'Lavinia Bistro · platformă meniu QR · 2026-05' },
    { service: 'E-commerce', proof: 'Rain Group · Shopify + Meta Ads · 2026-04' },
    { service: 'Cloud / DevOps', proof: 'Nova Health · migrare AWS · 2026-04' },
    { service: 'Agenți AI', proof: 'EduTurkia · CMS editorial multilingv · 2026-03' },
    { service: 'Aplicații mobile', proof: 'TP Thermoplast · pipeline B2B pentru dealeri · 2026-02' }
  ],
  bigNumberEyebrow: 'REGISTRU · DIN 2018',
  bigNumberValue: '47',
  bigNumberCaption: 'PROIECTE LIVRATE DIN 2018',
  bigNumberFootnote: 'Opt ani. Doi operatori. Facturi reale de la clienți, nu matematică de slide.',
  voiceEyebrow: 'OPERATORI',
  voiceHeading: 'Cu cine vorbești de fapt.',
  nalbaVoice: "Eu mă ocup de frontend, design și conversația cu clientul. Meniul QR Lavinia Bistro e al meu cap-coadă — așezarea pixelilor, textul, deciziile editoriale mici. Dacă site-ul pare gândit, e pentru că l-am gândit.",
  bahaVoice: "Eu mă ocup de servere, pipeline-uri de date și migrările pe care nimeni nu vrea să le programeze. Nova Health a ieșit de pe hosting vechi într-un weekend; factura Atar Avcı a scăzut cu 3,4 mii €/lună. Infrastructura iese în evidență când nu mai trebuie să te gândești la ea.",
  contactEyebrow: 'CONTACT',
  contactHeading: 'Trei link-uri. Fără formular.',
  contactSub: 'Email, WhatsApp sau alegeți un slot de 20 de minute. Răspundem într-o zi lucrătoare.',
  contactEmail: 'Email',
  contactWhatsapp: 'WhatsApp',
  contactSchedule: 'Rezervă 20 min'
};

function add(file, v7) {
  const p = 'D:/Velkina/messages/' + file;
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.home.v7 = v7;
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8');
  console.log('updated', file);
}

add('en.json', ENG_V7);
add('tr.json', TR_V7);
add('ro.json', RO_V7);
console.log('done');
