"use client";

import Reveal from "@/components/Reveal";
import { AI_STACK } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function AIStack() {
  const { t } = useLang();
  return (
    <section id="ai" className="vk-ai" aria-label="AI and frontier stack">
      <div className="vk-section vk-container">
        <Reveal>
          <span className="vk-eyebrow">{t.ai.eyebrow}</span>
          <h2 className="vk-work-title" style={{ marginTop: "1rem" }}>
            {t.ai.title}
          </h2>
          <p className="vk-lead vk-muted" style={{ marginTop: "1.25rem", maxWidth: "54ch" }}>
            {t.ai.lead}
          </p>
        </Reveal>

        <div className="vk-ai-grid">
          {AI_STACK.map((col, i) => (
            <Reveal key={col.label} className="vk-ai-col" delay={i * 80}>
              <div className="vk-ai-col-label">{col.label}</div>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
