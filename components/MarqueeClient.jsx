'use client';

import { useMemo } from 'react';

/**
 * A serif marquee strip. Pauses on hover/focus. Decorative.
 */
export default function MarqueeClient({ items }) {
  const list = items || [];
  const seq = useMemo(() => [...list, ...list], [list]);

  return (
    <section className="relative overflow-hidden border-y border-white/10" aria-hidden="true">
      <div
        className="ticker py-7 md:py-9 whitespace-nowrap"
        data-ticker
        style={{ animationDuration: '46s' }}
      >
        {seq.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-10 font-display text-[clamp(28px,4.6vw,64px)] leading-none tracking-[-.02em] text-white/85"
          >
            <span className="italic">{label}</span>
            <i className="text-vkcyan text-[.5em] not-italic" aria-hidden>✺</i>
          </span>
        ))}
      </div>
    </section>
  );
}
