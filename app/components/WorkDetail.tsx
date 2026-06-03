"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { type Project, artFor } from "@/app/lib/data/projects";
import { useLang } from "@/app/lib/LangProvider";

// Tap a project → this panel springs in. Snappy spring (400/35), never elastic.
// Focus moves in, Tab is trapped, Esc closes, focus returns to the trigger.
// Shows the real shipped-UI screenshot via next/image where one exists, else
// the arsenal art; an "at a glance" row; and the decision-led case copy.
export default function WorkDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, lang } = useLang();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab") {
        const f = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
        );
        if (!f || f.length === 0) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      trigger?.focus?.(); // return focus to whatever opened the dialog
    };
  }, [onClose]);

  const media = project.image ?? artFor(project.id);
  const isReal = !!project.image;

  return (
    <motion.div
      className="vk-detail-scrim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        className="vk-detail"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 35, mass: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="vk-detail-close" onClick={onClose} aria-label={t.work.close}>
          ✕
        </button>

        <div className={`vk-detail-media${isReal ? "" : " vk-detail-media--art"}`}>
          <Image
            src={media}
            alt={isReal ? `${project.name} — shipped UI` : project.name}
            fill
            sizes="(max-width: 680px) 100vw, 620px"
            style={{ objectFit: isReal ? "cover" : "contain" }}
          />
        </div>

        <div className="vk-detail-body">
          <span className="vk-detail-cat">{project.category[lang]}</span>
          <h3 className="vk-detail-name">{project.name}</h3>
          <p className="vk-detail-line">{project.oneLiner[lang]}</p>

          <dl className="vk-detail-dl">
            <dt>{t.work.brief}</dt>
            <dd>{project.brief[lang]}</dd>
            <dt>{t.work.process}</dt>
            <dd>{project.process[lang]}</dd>
            <dt>{t.work.outcome}</dt>
            <dd>{project.outcome[lang]}</dd>
          </dl>

          <div className="vk-detail-stack">
            {project.stack.map((s) => (
              <span key={s} className="vk-tag">{s}</span>
            ))}
          </div>

          {project.live && (
            <a className="vk-detail-visit" href={project.live} target="_blank" rel="noopener noreferrer">
              {t.work.visit} ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
