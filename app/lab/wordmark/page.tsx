"use client";
import dynamic from "next/dynamic";
const ComicWordmark = dynamic(() => import("@/components/three/ComicWordmark"), { ssr: false });
export default function Page() {
  return <div style={{ position: "fixed", inset: 0 }}><ComicWordmark withPost={true} /></div>;
}
