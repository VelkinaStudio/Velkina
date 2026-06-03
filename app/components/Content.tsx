"use client";

import { useState } from "react";
import { useLang } from "@/app/lib/LangProvider";
import { PROJECTS } from "@/app/lib/data/projects";
import { REPOS } from "@/app/lib/data/opensource";

// DOM-first content — the full site as plain, crawlable, accessible HTML.
// This is the source of truth for all readable text, the SEO layer, AND the
// reduced-motion / no-WebGL / low-end fallback. It is designed to be good on
// its own. The 3D room mounts ON TOP of this (visually); this stays in the DOM.
//
// `embedded` = rendered beneath the canvas (visually hidden but indexable);
// `standalone` = the real page shown when 3D is off.

export default function Content({ variant = "standalone" }: { variant?: "standalone" | "embedded" }) {
  const { t, lang } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? PROJECTS.find((p) => p.id === openId) ?? null : null;
  const cls = variant === "embedded" ? "vk-content vk-content--seo" : "vk-content";

  return (
    <main className={cls} id="content">
      {/* HERO */}
      <header className="vk-c-hero">
        <p className="vk-c-eyebrow">Velkina · {t.contact.location}</p>
        <h1 className="vk-c-h1">{t.hero.h1}</h1>
        <p className="vk-c-sub">{t.hero.sub}</p>
      </header>

      {/* WHAT WE MAKE */}
      <section className="vk-c-sec" id="studio" aria-labelledby="what-h">
        <h2 className="vk-c-label" id="what-h">{t.whatWeDo.label}</h2>
        <p className="vk-c-intro">{t.whatWeDo.intro}</p>
        <dl className="vk-c-what">
          {t.whatWeDo.items.map((it) => (
            <div className="vk-c-what-row" key={it.k}>
              <dt>{it.k}</dt>
              <dd>{it.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* SELECTED WORK */}
      <section className="vk-c-sec" id="work" aria-labelledby="work-h">
        <h2 className="vk-c-label" id="work-h">{t.work.label}</h2>
        <p className="vk-c-intro">{t.work.intro}</p>
        <ul className="vk-c-work">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <article className="vk-c-card">
                <button className="vk-c-card-head" aria-expanded={openId === p.id} onClick={() => setOpenId(openId === p.id ? null : p.id)}>
                  <span className="vk-c-card-name">{p.name}{p.flagship && <span className="vk-c-star" aria-hidden> ★</span>}</span>
                  <span className="vk-c-card-line">{p.oneLiner[lang]}</span>
                  <span className="vk-c-card-stack">{p.stack.slice(0, 3).join(" · ")}</span>
                  <span className="vk-c-card-toggle" aria-hidden>{openId === p.id ? "–" : "+"}</span>
                </button>
                {openId === p.id && (
                  <div className="vk-c-card-body">
                    {p.image && <div className="vk-c-card-shot" style={{ backgroundImage: `url('${p.image}')` }} role="img" aria-label={`${p.name} screenshot`} />}
                    <dl>
                      <dt>{t.work.brief}</dt><dd>{p.brief[lang]}</dd>
                      <dt>{t.work.decision}</dt><dd>{p.process[lang]}</dd>
                      <dt>{t.work.outcome}</dt><dd>{p.outcome[lang]}</dd>
                    </dl>
                    {p.live && <a className="vk-c-visit" href={p.live} target="_blank" rel="noopener noreferrer">{t.work.visit} ↗</a>}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* THE TWO OF US */}
      <section className="vk-c-sec" id="team" aria-labelledby="team-h">
        <h2 className="vk-c-label" id="team-h">{t.team.label}</h2>
        <div className="vk-c-team">
          {[t.team.omer, t.team.baha].map((person) => (
            <div className="vk-c-person" key={person.name}>
              <h3>{person.name}</h3>
              <p className="vk-c-role">{person.role}</p>
              <p className="vk-c-pline">{person.line}</p>
            </div>
          ))}
        </div>
        <p className="vk-c-closing">{t.team.closing}</p>
      </section>

      {/* OPEN SOURCE */}
      <section className="vk-c-sec" id="opensource" aria-labelledby="oss-h">
        <h2 className="vk-c-label" id="oss-h">{t.oss.label}</h2>
        <p className="vk-c-intro">{t.oss.intro}</p>
        <ul className="vk-c-oss">
          {REPOS.map((r) => (
            <li key={r.slug}>
              <a className="vk-c-oss-card" href={r.url} target="_blank" rel="noopener noreferrer">
                <span className="vk-c-oss-top"><span className="vk-c-oss-name">{r.name}</span><span className="vk-c-oss-kind">{r.kind[lang]}</span></span>
                <span className="vk-c-oss-blurb">{r.blurb[lang]}</span>
                <span className="vk-c-oss-lang">{r.lang}</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="vk-c-oss-all" href="https://github.com/VelkinaStudio" target="_blank" rel="noopener noreferrer">{t.oss.all} ↗</a>
      </section>

      {/* CONTACT */}
      <section className="vk-c-sec vk-c-contact" id="contact" aria-labelledby="contact-h">
        <h2 className="vk-c-label" id="contact-h">{t.contact.label}</h2>
        <p className="vk-c-contact-h">{t.contact.heading}</p>
        <p className="vk-c-intro">{t.contact.body}</p>
        <a className="vk-c-email" href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
        <p className="vk-c-loc">{t.contact.location}</p>
      </section>

      <footer className="vk-c-footer">Velkina — {t.contact.location} · hand-built, no template</footer>
    </main>
  );
}
