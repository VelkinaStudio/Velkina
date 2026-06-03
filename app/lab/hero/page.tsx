"use client";
import dynamic from "next/dynamic";
const ComicHero = dynamic(() => import("@/components/three/ComicHero"), { ssr: false });

export default function Page() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#f4efe3" }}>
      <ComicHero quality={1} />
    </div>
  );
}
