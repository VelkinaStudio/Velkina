type Locale = 'en' | 'tr' | 'ro';

export default function TermsView({ messages }: { messages: any; locale: Locale }) {
  const t = messages.terms;
  return (
    <section className="vk-section" style={{paddingTop: '4rem'}}>
      <div className="vk-container" style={{maxWidth: '720px'}}>
        <span className="vk-eyebrow">{t.updated}</span>
        <h1 className="vk-h1 mt-5">{t.title}</h1>
        <p className="mt-6" style={{lineHeight: 1.75}}>{t.body}</p>
      </div>
    </section>
  );
}
