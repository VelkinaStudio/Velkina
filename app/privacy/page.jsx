import tr from '../../messages/tr.json';

export default function PrivacyPage(props){
  const m = props?.messages?.privacy ?? tr.privacy;
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <h1 className="font-heading text-3xl md:text-4xl mb-3">{m.title}</h1>
      <p className="text-white/80">{m.desc}</p>
    </div>
  );
}
