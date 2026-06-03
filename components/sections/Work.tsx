"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { PROJECTS, type Project } from "@/lib/content";
import { useLang } from "@/lib/i18n";

function WorkCard({ p }: { p: Project }) {
  const { t } = useLang();
  const [imgOk, setImgOk] = useState(true);
  const isLive = p.kind === "client" && !!p.live;
  const kindLabel = p.kind === "client" ? t.work.client : p.kind === "product" ? t.work.product : "Demo";
  const inner = (
    <>
      <div className="vk-work-card-media">
        {p.image && imgOk ? (
          <Image
            src={p.image}
            alt={`${p.name} — ${p.tag}`}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            onError={() => setImgOk(false)}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="vk-work-card-media-fallback">{p.name}</div>
        )}
      </div>
      <div className="vk-work-card-body">
        <div className="vk-work-card-top">
          <span className="vk-work-card-name">{p.name}</span>
          <span className="vk-chip" data-live={p.kind === "client" ? "true" : undefined}>
            {kindLabel}
          </span>
        </div>
        <span className="vk-work-card-tag">{p.tag}</span>
        <p className="vk-work-card-blurb">{p.blurb}</p>
        <div className="vk-work-card-stack">
          {p.stack.map((t) => (
            <span key={t} className="vk-chip">
              {t}
            </span>
          ))}
        </div>
        {isLive && (
          <div className="vk-work-card-foot">
            <span className="vk-work-card-live">{t.work.visit}</span>
          </div>
        )}
      </div>
    </>
  );

  if (isLive) {
    return (
      <a className="vk-work-card" href={p.live} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <div className="vk-work-card">{inner}</div>;
}

export default function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="vk-section vk-container" aria-label="Selected work">
      <div className="vk-work-header">
        <Reveal>
          <span className="vk-eyebrow">{t.work.eyebrow}</span>
          <h2 className="vk-work-title" style={{ marginTop: "1rem" }}>
            {t.work.title1}
            <br />
            {t.work.title2}
          </h2>
        </Reveal>
        <Reveal as="p" className="vk-mono vk-dim" delay={100}>
          <span style={{ maxWidth: "32ch", display: "block", fontSize: "0.84rem", lineHeight: 1.6 }}>
            {t.work.note}
          </span>
        </Reveal>
      </div>

      <div className="vk-work-grid">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 80}>
            <WorkCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
