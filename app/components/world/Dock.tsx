"use client";

import { STATIONS } from "@/app/lib/stations";

// The persistent station dock — always-available "where am I / how do I get back".
// Click a pill → fly there. Active pill is lit. This is the wayfinding that keeps
// the explorable room from trapping users at an object (the #1 genre pitfall).

export default function Dock({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  return (
    <nav className="vk-dock" aria-label="Studio map">
      {STATIONS.map((s) => (
        <button
          key={s.id}
          className={`vk-dock-pill${active === s.id ? " is-active" : ""}`}
          aria-current={active === s.id ? "true" : undefined}
          onClick={() => onPick(s.id)}
        >
          {s.pill}
        </button>
      ))}
    </nav>
  );
}
