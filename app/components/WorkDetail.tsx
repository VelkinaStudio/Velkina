"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "@/app/lib/data/projects";
import { useLang } from "@/app/lib/LangProvider";

// Tap a card → this panel springs in. Snappy spring (stiffness 400/damping 35),
// never elastic. Focus-trapped, Esc to close, real screenshot, honest copy.
export default function WorkDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, lang } = useLang();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="vk-detail-scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          ref={panelRef}
          tabIndex={-1}
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
          <button className="vk-detail-close" onClick={onClose} aria-label={t.work.close}>
            ✕
          </button>

          {project.image && (
            <div className="vk-detail-media" style={{ backgroundImage: `url('${project.image}')` }} />
          )}

          <div className="vk-detail-body">
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
    </AnimatePresence>
  );
}
