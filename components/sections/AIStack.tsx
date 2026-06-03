import Reveal from "@/components/Reveal";
import { AI_STACK } from "@/lib/content";

export default function AIStack() {
  return (
    <section id="ai" className="vk-ai" aria-label="AI and frontier stack">
      <div className="vk-section vk-container">
        <Reveal>
          <span className="vk-eyebrow">On the frontier</span>
          <h2 className="vk-work-title" style={{ marginTop: "1rem" }}>
            We build with the
            <br />
            tools we build <em style={{ color: "var(--vk-volt)", fontStyle: "normal" }}>with</em>.
          </h2>
          <p className="vk-lead vk-muted" style={{ marginTop: "1.25rem", maxWidth: "54ch" }}>
            Agentic coding, automation pipelines and fine-tuned models are how we
            ship more than a two-person studio should be able to. This very site is
            hand-built on that same frontier stack.
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
