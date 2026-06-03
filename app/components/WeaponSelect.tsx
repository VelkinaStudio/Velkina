"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROJECTS, artFor } from "@/app/lib/data/projects";
import { useLang } from "@/app/lib/LangProvider";
import { playTone, isSoundEnabled } from "@/app/lib/sound/collisionAudio";
import WorkDetail from "./WorkDetail";

// Weapon/loadout select. One project is "equipped" (large, centered); cycle the
// arsenal by swipe (touch), arrow keys, the side arrows, or the roster strip.
// Mobile-first: full-bleed equipped art, thumb-swipeable, big tap targets.
// "Open" reveals the real screenshot + brief/process/outcome (the proof).
export default function WeaponSelect() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const n = PROJECTS.length;
  const cur = PROJECTS[i];
  const open = openId ? PROJECTS.find((p) => p.id === openId) ?? null : null;

  const go = (dir: number) => {
    setI((p) => (p + dir + n) % n);
    if (isSoundEnabled()) playTone("toggle");
  };
  const select = (idx: number) => {
    setI(idx);
    if (isSoundEnabled()) playTone("toggle");
  };

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openId) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Enter") setOpenId(cur.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, cur.id]);

  // swipe
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  return (
    <div className="vk-arsenal" data-tone={cur.tone}>
      <div className="vk-arsenal-index" aria-hidden="true">
        <span className="vk-arsenal-cur">{String(i + 1).padStart(2, "0")}</span>
        <span className="vk-arsenal-sep">/</span>
        <span className="vk-arsenal-tot">{String(n).padStart(2, "0")}</span>
      </div>

      {/* Equipped — the big centered weapon */}
      <div
        className="vk-equipped"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="vk-arrow vk-arrow--prev" onClick={() => go(-1)} aria-label="previous">‹</button>

        <div key={cur.id} className="vk-equipped-card">
          <div className="vk-equipped-art">
            <Image
              src={artFor(cur.id)}
              alt={cur.name}
              fill
              sizes="(max-width: 760px) 80vw, 420px"
              priority={i === 0}
              style={{ objectFit: "contain" }}
            />
            {cur.flagship && <span className="vk-equipped-flag">★ flagship</span>}
          </div>
          <div className="vk-equipped-meta">
            <span className="vk-equipped-cat">{cur.category[lang]}</span>
            <h3 className="vk-equipped-name">{cur.name}</h3>
            <p className="vk-equipped-line">{cur.oneLiner[lang]}</p>
            <div className="vk-equipped-stack">
              {cur.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
            <button className="vk-equipped-open" onClick={() => setOpenId(cur.id)}>
              {t.hero.selectCta} →
            </button>
          </div>
        </div>

        <button className="vk-arrow vk-arrow--next" onClick={() => go(1)} aria-label="next">›</button>
      </div>

      {/* Roster strip — the full arsenal, tap to equip */}
      <div className="vk-roster" role="tablist" aria-label={t.hero.selectLabel}>
        {PROJECTS.map((p, idx) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={idx === i}
            className={`vk-roster-slot${idx === i ? " is-active" : ""}${p.flagship ? " is-flagship" : ""}`}
            onClick={() => select(idx)}
            aria-label={p.name}
          >
            <Image src={artFor(p.id)} alt="" width={68} height={68} style={{ objectFit: "contain" }} />
          </button>
        ))}
      </div>

      {open && <WorkDetail project={open} onClose={() => setOpenId(null)} />}
    </div>
  );
}
