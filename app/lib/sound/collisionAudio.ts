// Velocity-mapped collision audio. Muted by default and opt-in (browser
// autoplay policy + ethics + WCAG 2.2.2). The AudioContext is created/resumed
// only inside a user gesture (the sound toggle). Per collision: a short
// oscillator with an envelope so there's no "pop", pitch tracking impact speed.

let ctx: AudioContext | null = null;
let enabled = false;
let master: GainNode | null = null;
let lastHit = 0;

export function isSoundEnabled() {
  return enabled;
}

/** Must be called inside a user gesture (e.g. the toggle click). */
export function enableSound(): boolean {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    enabled = true;
    return true;
  } catch {
    return false;
  }
}

export function disableSound() {
  enabled = false;
}

/**
 * Play a collision tick. `speed` is the relative impact velocity (Matter units,
 * roughly 0–25). Pitch rises with speed; gain rises with speed. Cheap and
 * felt-more-than-heard.
 */
export function playCollision(speed: number) {
  if (!enabled || !ctx || !master) return;
  const now = ctx.currentTime;
  // throttle so a burst of contacts doesn't machine-gun
  if (now - lastHit < 0.018) return;
  lastHit = now;

  const v = Math.min(Math.max(speed, 0), 24) / 24; // 0..1
  if (v < 0.04) return; // ignore micro-jostles

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = v > 0.6 ? "triangle" : "sine";
  // 200–900Hz, harder = deeper baseline with a little upward jitter
  const base = 240 + (1 - v) * 520;
  const jitter = (Math.sin(now * 1000) * 0.5 + 0.5) * 40;
  osc.frequency.value = base + jitter;

  const peak = 0.05 + v * 0.1; // 0.05–0.15
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(peak, now + 0.003); // 3ms attack
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.03 + v * 0.02); // decay

  osc.connect(g);
  g.connect(master);
  osc.start(now);
  osc.stop(now + 0.08);
}

/** Discrete UI tones for success / error / toggle. */
export function playTone(kind: "success" | "error" | "toggle") {
  if (!enabled || !ctx || !master) return;
  const now = ctx.currentTime;
  const seq =
    kind === "success" ? [523, 784] : kind === "error" ? [330, 233] : [440];
  seq.forEach((f, i) => {
    const osc = ctx!.createOscillator();
    const g = ctx!.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    const start = now + i * 0.09;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.12, start + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
    osc.connect(g);
    g.connect(master!);
    osc.start(start);
    osc.stop(start + 0.2);
  });
}
