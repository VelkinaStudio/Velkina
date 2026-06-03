import Reveal from "@/components/Reveal";
import { STUDIO } from "@/lib/content";

export default function Statement() {
  return (
    <section className="vk-statement vk-container" aria-label="What Velkina is">
      <Reveal as="p" className="vk-statement-text">
        We design, build and ship <em>real software</em> — websites, e-commerce,
        mobile apps and AI automation. A small team. <em>No slide decks.</em>
      </Reveal>
    </section>
  );
}
