"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

export default function Statement() {
  const { t } = useLang();
  return (
    <section className="vk-statement vk-statement--comic" aria-label="What Velkina is">
      <div className="vk-container">
        <Reveal as="p" className="vk-statement-text">
          {t.statement.pre} <em>{t.statement.em1}</em>{t.statement.mid}{" "}
          <em>{t.statement.em2}</em>
        </Reveal>
      </div>
    </section>
  );
}
