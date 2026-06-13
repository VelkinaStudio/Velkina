import React from 'react';
import HeroShapesClient from '../../components/HeroShapesClient';
import type {Locale, Messages} from '../../i18n/messages';
import {createT, getDefaultMessages} from '../../i18n/messages';
import Link from 'next/link';
import {mailHref, whatsappHref} from '../../lib/contact';

export type CustomerAgentViewProps = {
  messages?: Messages;
  locale?: Locale;
};

export default function CustomerAgentView({messages, locale}: CustomerAgentViewProps) {
  const t = createT(messages ?? getDefaultMessages());
  const common = (t('common') as any) ?? {};
  const isEnglish = locale === 'en';

  // Türkçe ve İngilizce içerik
  const content = {
    title: isEnglish ? 'Turkish Customer Service Agents' : 'Türkçe Müşteri Hizmetleri Ajanları',
    heroDesc: isEnglish 
      ? 'Enhance your customer service with AI agents fluent in Turkish. Provide 24/7 support, reduce response times, and improve customer satisfaction.'
      : 'Türkçe akıcı yapay zeka ajanlarıyla müşteri hizmetlerinizi geliştirin. 7/24 destek sağlayın, yanıt sürelerini azaltın ve müşteri memnuniyetini artırın.',
    overview: isEnglish ? 'Overview' : 'Genel Bakış',
    overviewText: isEnglish
      ? 'Our Turkish Customer Service Agents are designed to handle customer inquiries, provide product information, and resolve issues in fluent Turkish. These AI agents understand cultural nuances and can communicate effectively with Turkish-speaking customers.'
      : 'Türkçe Müşteri Hizmetleri Ajanlarımız, müşteri sorularını yanıtlamak, ürün bilgisi sağlamak ve sorunları akıcı Türkçe ile çözmek için tasarlanmıştır. Bu yapay zeka ajanları kültürel nüansları anlar ve Türkçe konuşan müşterilerle etkili bir şekilde iletişim kurabilir.',
    features: isEnglish ? 'Key Features' : 'Temel Özellikler',
    featuresList: [
      {
        title: isEnglish ? '24/7 Availability' : '7/24 Erişilebilirlik',
        description: isEnglish 
          ? 'Provide round-the-clock customer support without staffing concerns.'
          : 'Personel endişeleri olmadan kesintisiz müşteri desteği sağlayın.'
      },
      {
        title: isEnglish ? 'Natural Turkish Language' : 'Doğal Türkçe Dil',
        description: isEnglish 
          ? 'Our agents understand and respond in fluent, natural-sounding Turkish.'
          : 'Ajanlarımız akıcı, doğal sesli Türkçe ile anlar ve yanıt verir.'
      },
      {
        title: isEnglish ? 'Cultural Understanding' : 'Kültürel Anlayış',
        description: isEnglish 
          ? 'Agents are trained to understand Turkish cultural context and communication styles.'
          : 'Ajanlar, Türk kültürel bağlamını ve iletişim tarzlarını anlamak üzere eğitilmiştir.'
      },
      {
        title: isEnglish ? 'Multi-Channel Support' : 'Çok Kanallı Destek',
        description: isEnglish 
          ? 'Deploy on websites, messaging apps, and social media platforms.'
          : 'Web sitelerinde, mesajlaşma uygulamalarında ve sosyal medya platformlarında kullanın.'
      },
      {
        title: isEnglish ? 'Continuous Learning' : 'Sürekli Öğrenme',
        description: isEnglish 
          ? 'Agents improve over time by learning from interactions and feedback.'
          : 'Ajanlar, etkileşimlerden ve geri bildirimlerden öğrenerek zamanla gelişir.'
      },
      {
        title: isEnglish ? 'Seamless Escalation' : 'Sorunsuz Yükseltme',
        description: isEnglish 
          ? 'When needed, agents can smoothly transfer complex issues to human agents.'
          : 'Gerektiğinde, ajanlar karmaşık sorunları insan ajanlara sorunsuz bir şekilde aktarabilir.'
      }
    ],
    benefits: isEnglish ? 'Benefits' : 'Faydalar',
    benefitsList: [
      {
        title: isEnglish ? 'Cost Reduction' : 'Maliyet Azaltma',
        description: isEnglish 
          ? 'Reduce operational costs while maintaining high-quality customer service.'
          : 'Yüksek kaliteli müşteri hizmetlerini korurken operasyonel maliyetleri azaltın.'
      },
      {
        title: isEnglish ? 'Improved Response Times' : 'Geliştirilmiş Yanıt Süreleri',
        description: isEnglish 
          ? 'Instant responses to customer inquiries, eliminating wait times.'
          : 'Müşteri sorularına anında yanıtlar, bekleme sürelerini ortadan kaldırır.'
      },
      {
        title: isEnglish ? 'Consistent Service Quality' : 'Tutarlı Hizmet Kalitesi',
        description: isEnglish 
          ? 'Deliver the same high-quality service to every customer, every time.'
          : 'Her müşteriye, her seferinde aynı yüksek kaliteli hizmeti sunun.'
      },
      {
        title: isEnglish ? 'Scalability' : 'Ölçeklenebilirlik',
        description: isEnglish 
          ? 'Easily handle fluctuating customer service demands without hiring challenges.'
          : 'İşe alım zorlukları olmadan dalgalanan müşteri hizmeti taleplerini kolayca karşılayın.'
      },
      {
        title: isEnglish ? 'Data Insights' : 'Veri İçgörüleri',
        description: isEnglish 
          ? 'Gain valuable insights from customer interactions to improve products and services.'
          : 'Ürün ve hizmetleri geliştirmek için müşteri etkileşimlerinden değerli içgörüler elde edin.'
      },
      {
        title: isEnglish ? 'Customer Satisfaction' : 'Müşteri Memnuniyeti',
        description: isEnglish 
          ? 'Increase customer satisfaction with prompt, accurate, and helpful responses.'
          : 'Hızlı, doğru ve yardımcı yanıtlarla müşteri memnuniyetini artırın.'
      }
    ],
    useCases: isEnglish ? 'Use Cases' : 'Kullanım Senaryoları',
    useCasesList: [
      {
        title: isEnglish ? 'E-commerce Support' : 'E-ticaret Desteği',
        description: isEnglish 
          ? 'Handle order inquiries, product questions, and return requests for online stores.'
          : 'Çevrimiçi mağazalar için sipariş sorguları, ürün soruları ve iade taleplerini yönetin.'
      },
      {
        title: isEnglish ? 'Banking & Finance' : 'Bankacılık & Finans',
        description: isEnglish 
          ? 'Provide account information, transaction support, and financial guidance.'
          : 'Hesap bilgisi, işlem desteği ve finansal rehberlik sağlayın.'
      },
      {
        title: isEnglish ? 'Travel & Hospitality' : 'Seyahat & Konaklama',
        description: isEnglish 
          ? 'Assist with bookings, travel information, and accommodation requests.'
          : 'Rezervasyonlar, seyahat bilgileri ve konaklama talepleriyle ilgili yardım sağlayın.'
      },
      {
        title: isEnglish ? 'Telecommunications' : 'Telekomünikasyon',
        description: isEnglish 
          ? 'Support customers with service inquiries, technical issues, and billing questions.'
          : 'Müşterilere hizmet sorguları, teknik sorunlar ve fatura sorularıyla ilgili destek sağlayın.'
      },
      {
        title: isEnglish ? 'Healthcare' : 'Sağlık Hizmetleri',
        description: isEnglish 
          ? 'Provide appointment scheduling, medical information, and patient support.'
          : 'Randevu planlama, tıbbi bilgi ve hasta desteği sağlayın.'
      },
      {
        title: isEnglish ? 'Government Services' : 'Devlet Hizmetleri',
        description: isEnglish 
          ? 'Help citizens with information about public services, forms, and procedures.'
          : 'Vatandaşlara kamu hizmetleri, formlar ve prosedürler hakkında bilgi sağlayın.'
      }
    ],
    implementation: isEnglish ? 'Implementation Process' : 'Uygulama Süreci',
    implementationSteps: [
      {
        title: isEnglish ? 'Needs Assessment' : 'İhtiyaç Değerlendirmesi',
        description: isEnglish 
          ? 'We analyze your customer service needs and identify opportunities for AI assistance.'
          : 'Müşteri hizmeti ihtiyaçlarınızı analiz eder ve yapay zeka yardımı için fırsatları belirleriz.'
      },
      {
        title: isEnglish ? 'Knowledge Base Creation' : 'Bilgi Tabanı Oluşturma',
        description: isEnglish 
          ? 'We develop a comprehensive knowledge base in Turkish for your specific industry and products.'
          : 'Belirli sektörünüz ve ürünleriniz için Türkçe kapsamlı bir bilgi tabanı geliştiririz.'
      },
      {
        title: isEnglish ? 'Agent Training' : 'Ajan Eğitimi',
        description: isEnglish 
          ? 'We train the AI agents using your data and Turkish language resources.'
          : 'Yapay zeka ajanlarını verileriniz ve Türkçe dil kaynaklarını kullanarak eğitiriz.'
      },
      {
        title: isEnglish ? 'Integration' : 'Entegrasyon',
        description: isEnglish 
          ? 'We integrate the agents with your existing customer service channels.'
          : 'Ajanları mevcut müşteri hizmetleri kanallarınızla entegre ederiz.'
      },
      {
        title: isEnglish ? 'Testing & Refinement' : 'Test & İyileştirme',
        description: isEnglish 
          ? 'We thoroughly test the agents and refine their responses based on feedback.'
          : 'Ajanları kapsamlı bir şekilde test eder ve geri bildirimlere dayalı olarak yanıtlarını iyileştiririz.'
      },
      {
        title: isEnglish ? 'Deployment & Monitoring' : 'Dağıtım & İzleme',
        description: isEnglish 
          ? 'We deploy the agents and continuously monitor their performance.'
          : 'Ajanları dağıtır ve performanslarını sürekli olarak izleriz.'
      }
    ],
    cta: isEnglish ? 'Ready to enhance your Turkish customer service?' : 'Türkçe müşteri hizmetlerinizi geliştirmeye hazır mısınız?',
    ctaButton: isEnglish ? 'Contact Us' : 'Bize Ulaşın',
    ctaWhatsapp: isEnglish ? 'Message on WhatsApp' : 'WhatsApp\'tan yazın',
    ctaEmail: isEnglish ? 'Send an Email' : 'E‑posta gönderin',
    ctaSchedule: isEnglish ? 'Schedule a Meeting' : 'Görüşme planlayın'
  };

  return (
    <div className="pt-4">
      {/* Hero */}
      <section className="vk-hero relative overflow-hidden">
        <div
          className="absolute -inset-24 blur-3xl opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px 300px at 20% 10%, rgba(162,89,255,.35), transparent 60%), radial-gradient(600px 300px at 80% 80%, rgba(0,255,255,.25), transparent 60%)',
          }}
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-14 grid gap-10 sm:grid-cols-2 items-center">
          {/* Left column: title + copy */}
          <div>
            <h1 className="font-heading text-4xl md:text-5xl">{content.title}</h1>
            <p className="text-white/80 max-w-2xl mt-3">{content.heroDesc}</p>
          </div>
          {/* Right column: animation canvas */}
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <canvas id="vk-hero-shapes" className="absolute inset-0 w-full h-full" role="img" aria-label="Türkçe Müşteri Hizmetleri Ajanları görselleştirme"></canvas>
          </div>
        </div>
        {/* Wire shapes */}
        <HeroShapesClient />
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">{content.overview}</h2>
          <p className="text-white/80 max-w-3xl text-lg">{content.overviewText}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{content.features}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.featuresList.map((feature, index) => (
              <div key={index} className="bg-black/20 p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <h3 className="font-heading text-xl mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{content.benefits}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.benefitsList.map((benefit, index) => (
              <div key={index} className="p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <h3 className="font-heading text-xl mb-3">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{content.useCases}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.useCasesList.map((useCase, index) => (
              <div key={index} className="bg-black/20 p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <h3 className="font-heading text-xl mb-3">{useCase.title}</h3>
                <p className="text-white/70">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">{content.implementation}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.implementationSteps.map((step, index) => (
              <div key={index} className="p-6 rounded-lg border border-white/10 hover:border-vkcyan/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-vkcyan/20 flex items-center justify-center mr-3">
                    <span className="font-heading">{index + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl">{step.title}</h3>
                </div>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black/0 to-black/30">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">{content.cta}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href={`/${locale}/contact`} className="vk-button vk-button-primary">
              {content.ctaButton}
            </Link>
            <a href={whatsappHref(common?.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="vk-button vk-button-outline">
              {content.ctaWhatsapp}
            </a>
            <a href={mailHref(common?.emailSubject)} className="vk-button vk-button-outline">
              {content.ctaEmail}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}