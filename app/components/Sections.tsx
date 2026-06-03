"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { PROJECTS } from "@/app/lib/data/projects";
import { REPOS } from "@/app/lib/data/opensource";
import { useLang } from "@/app/lib/LangProvider";
import WeaponSelect from "./WeaponSelect";
import WorkDetail from "./WorkDetail";
import MagneticCTA from "./MagneticCTA";
import SoundToggle from "./SoundToggle";

export default function Sections() {
  const { t, lang } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? PROJECTS.find((p) => p.id === openId) ?? null : null;
  const rootRef = useRef<HTMLElement>(null);

  // Reveal static sections on scroll. Hardened: reveals anything already in
  // view at mount, and a fallback ensures nothing stays hidden.
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".vk-section");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
      else io.observe(el);
    });
    const fallback = window.setTimeout(() => els.forEach((el) => el.classList.add("is-in")), 1400);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, []);

  return (
    <main id="top" ref={rootRef}>
      {/* HERO — the signature: text paints first, the pile is the toy */}
      <section className="vk-hero">
        <div className="vk-hero-head">
          <h1 className="vk-h1">{t.hero.h1}</h1>
          <p className="vk-hero-sub">{t.hero.subhead}</p>
        </div>

        <span className="vk-arsenal-label">{t.hero.selectLabel}</span>
        <WeaponSelect />

        <a href="#studio" className="vk-hero-scroll" aria-label="scroll">
          <span />
        </a>
      </section>

      {/* WHAT WE DO — quiet editorial list, no icon-card grid */}
      <section id="studio" className="vk-section vk-what">
        <span className="vk-label">{t.whatWeDo.label}</span>
        <p className="vk-what-intro">{t.whatWeDo.intro}</p>
        <dl className="vk-what-list">
          {t.whatWeDo.items.map((it) => (
            <div className="vk-what-row" key={it.k}>
              <dt className="vk-what-k">{it.k}</dt>
              <dd className="vk-what-v">{it.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* SELECTED WORK — the real, crawlable, accessible project list.
          Mirrors the pile cards; clicking opens the same detail panel. */}
      <section id="work" className="vk-section vk-work">
        <span className="vk-label">{t.work.label}</span>
        <p className="vk-work-intro">{t.work.intro}</p>
        <ul className="vk-work-list">
          {PROJECTS.map((p) => (
            <li key={p.id} className="vk-work-item">
              <button className="vk-work-trigger" onClick={() => setOpenId(p.id)}>
                <span className="vk-work-name">{p.name}</span>
                <span className="vk-work-line">{p.oneLiner[lang]}</span>
                <span className="vk-work-stack">{p.stack.slice(0, 3).join(" · ")}</span>
                <span className="vk-work-open">{t.work.open} →</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* OPEN SOURCE — real public repos, distinct from client work */}
      <section id="opensource" className="vk-section vk-oss">
        <span className="vk-label">{t.oss.label}</span>
        <p className="vk-oss-intro">{t.oss.intro}</p>
        <ul className="vk-oss-grid">
          {REPOS.map((r) => (
            <li key={r.slug}>
              <a className="vk-oss-card" href={r.url} target="_blank" rel="noopener noreferrer">
                <span className="vk-oss-top">
                  <span className="vk-oss-name">{r.name}</span>
                  <span className="vk-oss-kind">{r.kind[lang]}</span>
                </span>
                <span className="vk-oss-blurb">{r.blurb[lang]}</span>
                <span className="vk-oss-foot">
                  <span className="vk-oss-lang"><i className="vk-oss-dot" aria-hidden="true" />{r.lang}</span>
                  <span className="vk-oss-view">{t.oss.view} ↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a className="vk-oss-all" href="https://github.com/VelkinaStudio" target="_blank" rel="noopener noreferrer">
          {t.oss.all} ↗
        </a>
      </section>

      {/* THE TWO OF US — real names, real roles, no persona, no card chrome */}
      <section className="vk-section vk-team">
        <span className="vk-label">{t.team.label}</span>
        <div className="vk-team-grid">
          {t.team.people.map((person) => (
            <div className="vk-person" key={person.name}>
              <h3 className="vk-person-name">{person.name}</h3>
              <p className="vk-person-role">{person.role}</p>
              <p className="vk-person-line">{person.line}</p>
            </div>
          ))}
        </div>
        <p className="vk-team-closing">{t.team.closing}</p>
      </section>

      {/* CONTACT — one honest conversion point */}
      <section id="contact" className="vk-section vk-contact">
        <span className="vk-label">{t.contact.label}</span>
        <h2 className="vk-contact-h">{t.contact.heading}</h2>
        <p className="vk-contact-body">{t.contact.body}</p>
        <div className="vk-contact-actions">
          <MagneticCTA href={`mailto:${t.contact.email}`}>{t.contact.cta}</MagneticCTA>
          <a className="vk-contact-email" href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
        </div>
        <p className="vk-contact-loc">{t.contact.location}</p>
      </section>

      {/* FOOTER — quiet close, sound toggle */}
      <footer className="vk-footer">
        <span className="vk-footer-id">{t.footer.identity}</span>
        <span className="vk-footer-note">{t.footer.note}</span>
        <SoundToggle />
      </footer>

      <AnimatePresence>
        {open && <WorkDetail key={open.id} project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </main>
  );
}
