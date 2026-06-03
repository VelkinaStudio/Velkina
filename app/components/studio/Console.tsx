"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { KnobValues } from "./StudioScene";
import { useLang } from "@/app/lib/LangProvider";

// dynamic(ssr:false) must live in a client component, not the server page.
const StudioScene = dynamic(() => import("./StudioScene"), {
  ssr: false,
  loading: () => <div className="vk-studio-skeleton" aria-hidden />,
});

// The render console: the studio scene + the live shader knobs that drive it.
// Dragging a knob re-renders the room. The whole thing is the engine's demo and
// the proof it's real.

const PRESET_RESTING: KnobValues = { dotScale: 1.3, levels: 5, chroma: 1.4, onTwos: true, mode: "cmyk" };

function Slider({ label, value, min, max, step, fmt, onChange }: any) {
  return (
    <label className="vk-knob">
      <span className="vk-knob-row">
        <span className="vk-knob-label">{label}</span>
        <span className="vk-knob-val">{fmt(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
      />
    </label>
  );
}

export default function Console({ onProject }: { onProject?: (id: string) => void }) {
  const { t } = useLang();
  const [knobs, setKnobs] = useState<KnobValues>(PRESET_RESTING);
  const set = (patch: Partial<KnobValues>) => setKnobs((k) => ({ ...k, ...patch }));

  return (
    <div className="vk-studio">
      <StudioScene knobs={knobs} onProject={onProject} />

      {/* HUD top-left */}
      <div className="vk-hud" aria-hidden>
        <span className="vk-hud-dot" /> inkwell · rendering: the studio
      </div>

      {/* the knob rail */}
      <div className="vk-rail" role="group" aria-label={t.studio.consoleLabel}>
        <div className="vk-rail-title">{t.studio.consoleLabel}</div>
        <Slider label="DOT SIZE" value={knobs.dotScale} min={0.6} max={3.5} step={0.05} fmt={(v: number) => v.toFixed(2)} onChange={(v: number) => set({ dotScale: v })} />
        <Slider label="POSTERIZE" value={knobs.levels} min={2} max={8} step={1} fmt={(v: number) => `${v} bands`} onChange={(v: number) => set({ levels: v })} />
        <Slider label="CHROMA" value={knobs.chroma} min={0} max={6} step={0.1} fmt={(v: number) => v.toFixed(1)} onChange={(v: number) => set({ chroma: v })} />
        <button
          className={`vk-toggle${knobs.onTwos ? " is-on" : ""}`}
          role="switch"
          aria-checked={knobs.onTwos}
          onClick={() => set({ onTwos: !knobs.onTwos })}
        >
          <span className="vk-toggle-dot" /> ON-TWOS {knobs.onTwos ? "✓" : "—"}
        </button>
        <button
          className={`vk-toggle${knobs.mode === "mono" ? " is-on" : ""}`}
          role="switch"
          aria-checked={knobs.mode === "mono"}
          onClick={() => set({ mode: knobs.mode === "cmyk" ? "mono" : "cmyk" })}
        >
          <span className="vk-toggle-dot" /> {knobs.mode === "cmyk" ? "CMYK" : "MONO"}
        </button>
        <button className="vk-rail-reset" onClick={() => setKnobs(PRESET_RESTING)}>{t.studio.reset}</button>
      </div>

      <p className="vk-studio-caption" aria-hidden>{t.studio.caption}</p>
    </div>
  );
}
