import Reveal from "@/components/Reveal";
import { OPERATORS } from "@/lib/content";

export default function Operators() {
  return (
    <section id="team" className="vk-section vk-container" aria-label="The two operators">
      <Reveal>
        <span className="vk-eyebrow">Two operators, not a department</span>
        <h2 className="vk-work-title" style={{ marginTop: "1rem", marginBottom: "3rem" }}>
          The whole team
          <br />
          is on your project.
        </h2>
      </Reveal>

      <div className="vk-ops">
        {OPERATORS.map((op, i) => (
          <Reveal key={op.handle} className="vk-op" delay={i * 120}>
            <h3 className="vk-op-name">
              {op.name} <span className="vk-op-handle">/ {op.handle}</span>
            </h3>
            <div className="vk-op-role">{op.role}</div>
            <p className="vk-op-bio">{op.bio}</p>
            <div className="vk-op-meta">
              <span>{op.base}</span>
              <a href={`mailto:${op.email}`}>{op.email}</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
