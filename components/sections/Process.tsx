import Reveal from "@/components/Reveal";
import { STUDIO } from "@/lib/content";

export default function Process() {
  return (
    <section className="vk-section vk-container" aria-label="How we work">
      <Reveal>
        <span className="vk-eyebrow">How it works</span>
        <h2 className="vk-work-title" style={{ marginTop: "1rem" }}>
          Talk. Plan. Build. Ship.
        </h2>
      </Reveal>
      <div className="vk-proc">
        {STUDIO.process.map((s, i) => (
          <Reveal key={s.step} className="vk-proc-step" delay={i * 70}>
            <div className="vk-proc-num">{s.step}</div>
            <h3 className="vk-proc-title">{s.title}</h3>
            <p className="vk-proc-line">{s.line}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
