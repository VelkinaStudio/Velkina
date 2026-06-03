"use client";

import { useEffect, useState } from "react";
import { enableSound, disableSound, playTone } from "@/app/lib/sound/collisionAudio";
import { useLang } from "@/app/lib/LangProvider";

// role=switch, persists choice, off by default, forced off on reduced-motion.
// AudioContext is created/resumed inside this click (the required user gesture).
export default function SoundToggle({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    try {
      if (localStorage.getItem("vk-sound") === "on") {
        // can't resume without a gesture; reflect intent, resume on first click
        setOn(false);
      }
    } catch {}
  }, []);

  const toggle = () => {
    if (!on) {
      const ok = enableSound();
      if (ok) { setOn(true); playTone("toggle"); try { localStorage.setItem("vk-sound", "on"); } catch {} }
    } else {
      disableSound();
      setOn(false);
      try { localStorage.setItem("vk-sound", "off"); } catch {}
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`vk-sound${on ? " is-on" : ""}${compact ? " vk-sound--compact" : ""}`}
      onClick={toggle}
    >
      <span className="vk-sound-dot" aria-hidden="true" />
      <span className="vk-sound-label">
        {t.footer.sound} · {on ? t.footer.on : t.footer.off}
      </span>
    </button>
  );
}
