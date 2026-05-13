type Locale = 'en' | 'tr' | 'ro';

export default function PrivacyView({ messages }: { messages: any; locale: Locale }) {
  const p = messages.privacy;
  return (
    <section className="vk-section" style={{paddingTop: '4rem'}}>
      <div className="vk-container" style={{maxWidth: '720px'}}>
        <span className="vk-eyebrow">{p.updated}</span>
        <h1 className="vk-h1 mt-5">{p.title}</h1>
        <p className="mt-6" style={{lineHeight: 1.75}}>{p.body}</p>
      </div>
    </section>
  );
}
