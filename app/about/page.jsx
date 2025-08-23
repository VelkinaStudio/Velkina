import Link from 'next/link';
import tr from '../../messages/tr.json';

export const metadata = {
  title: 'About — Velkina',
  description: 'Who we are, how we work, and why teams partner with Velkina.'
};

export default function AboutPage({messages, locale} = {}) {
  const m = messages?.about ?? tr.about;
  const nav = messages?.nav ?? tr.nav;
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <header className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl">{m.title}</h1>
        <p className="text-white/80 mt-2 max-w-3xl">{m.desc}</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft lg:col-span-2">
          <h2 className="font-heading text-xl mb-2">{m.principlesTitle}</h2>
          <ul className="space-y-2 text-white/80">
            {m.principles?.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-vkcyan" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </article>
        <aside className="vk-glass border border-white/10 rounded-xl p-6 shadow-soft">
          <h2 className="font-heading text-xl mb-2">{m.quickFactsTitle}</h2>
          <ul className="text-white/80 space-y-1">
            {m.facts?.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </aside>
      </section>

      <div className="mt-10 text-center">
        <Link href={`${locale ? '/' + locale : ''}/#cta`} className="inline-flex items-center px-5 py-3 rounded-xl bg-vkpink text-black font-mono shadow-strong">
          {nav.startProject ?? 'Start project'}
        </Link>
      </div>
    </div>
  );
}
