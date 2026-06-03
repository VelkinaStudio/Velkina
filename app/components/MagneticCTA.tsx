"use client";

import { useRef, useEffect } from "react";

// Cursor-as-force on the CTA: lerp 0.15, pull 0.12, scale 1.02, snappy
// spring-back on leave. Disabled when there's no fine pointer (touch).
export default function MagneticCTA({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0, active = false;

    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate(${cx}px, ${cy}px) scale(${active ? 1.02 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      tx = dx * 0.12; ty = dy * 0.12; active = true;
    };
    const onLeave = () => { tx = 0; ty = 0; active = false; };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={`vk-cta ${className}`}>
      <span className="vk-cta-inner">{children}</span>
    </a>
  );
}
