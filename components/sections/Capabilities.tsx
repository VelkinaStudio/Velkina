import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/content";

export default function Capabilities() {
  return (
    <section id="services" className="vk-section vk-container" aria-label="What we do">
      <div className="vk-cap-header">
        <Reveal>
          <span className="vk-eyebrow">What we do</span>
          <h2 className="vk-cap-title" style={{ marginTop: "1rem" }}>
            Nine things,
            <br />
            one team.
          </h2>
        </Reveal>
        <Reveal as="p" className="vk-mono vk-dim" delay={100}>
          <span style={{ maxWidth: "30ch", display: "block", fontSize: "0.84rem", lineHeight: 1.6 }}>
            Design and engineering at one desk. The storefront, the campaigns and
            the agent come out of one room.
          </span>
        </Reveal>
      </div>

      <div className="vk-cap-list">
        {SERVICES.map((s, i) => (
          <Reveal key={s.num} className="vk-cap-row" delay={i * 40}>
            <span className="vk-cap-num">{s.num}</span>
            <span className="vk-cap-name">{s.title}</span>
            <span className="vk-cap-line">{s.detail}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
