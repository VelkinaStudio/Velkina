import Link from 'next/link';
import tr from '../../messages/tr.json';

export default function ContactPage(props) {
  const m = props?.messages?.contact ?? tr.contact;
  const nav = props?.messages?.nav ?? tr.nav;
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <h1 className="font-heading text-3xl md:text-4xl mb-2">{m.title}</h1>
      <p className="text-white/80 mb-6">{m.subtitle}</p>

      <div className="grid gap-4">
        <a href="mailto:hello@velkina.com" className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition">
          <div className="font-heading">{m.email}</div>
          <div className="text-white/80">{m.emailAddress}</div>
        </a>
        <a href="#" className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition">
          <div className="font-heading">{m.whatsapp}</div>
          <div className="text-white/80">{m.whatsappDesc}</div>
        </a>
        <a href="#" className="vk-glass border border-white/10 rounded-xl p-5 shadow-soft hover:shadow-strong hover:-translate-y-0.5 transition">
          <div className="font-heading">{m.schedule}</div>
          <div className="text-white/80">{m.scheduleDesc}</div>
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link href={`${props?.locale ? '/' + props.locale : ''}/#cta`} className="inline-flex items-center px-5 py-3 rounded-xl bg-vkpink text-black font-mono shadow-strong">
          {nav.startProject ?? 'Start project'}
        </Link>
      </div>
    </div>
  );
}
