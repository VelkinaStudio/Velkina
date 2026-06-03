"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { PROJECTS, type Project } from "@/lib/content";

function kindLabel(kind: Project["kind"]) {
  if (kind === "client") return "Client · Live";
  if (kind === "product") return "Velkina Product";
  return "Demo";
}

function WorkCard({ p }: { p: Project }) {
  const [imgOk, setImgOk] = useState(true);
  const isLive = p.kind === "client" && !!p.live;
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
            {kindLabel(p.kind)}
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
            <span className="vk-work-card-live">Visit live →</span>
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
  return (
    <section id="work" className="vk-section vk-container" aria-label="Selected work">
      <div className="vk-work-header">
        <Reveal>
          <span className="vk-eyebrow">Selected work</span>
          <h2 className="vk-work-title" style={{ marginTop: "1rem" }}>
            Real clients.
            <br />
            Real products.
          </h2>
        </Reveal>
        <Reveal as="p" className="vk-mono vk-dim" delay={100}>
          <span style={{ maxWidth: "32ch", display: "block", fontSize: "0.84rem", lineHeight: 1.6 }}>
            Three paying clients and three products we built ourselves. The cyan tag
            means it&apos;s live — go check.
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
