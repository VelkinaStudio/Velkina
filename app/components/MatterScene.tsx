"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { PROJECTS, type Project } from "@/app/lib/data/projects";
import { CARD, FLAGSHIP_DENSITY_MULT, WALL, ENGINE, DROP_STAGGER_MS } from "@/app/lib/physics/config";
import { isSoundEnabled, playCollision } from "@/app/lib/sound/collisionAudio";
import { useLang } from "@/app/lib/LangProvider";

// The toy. Matter runs the simulation on invisible bodies; we sync real HTML
// cards (screenshots + type) to each body's transform every frame. The canvas
// itself is never shown — DOM cards are crisp, accessible, and themeable.
//
// Architecture notes (the known traps, handled):
//  - Engine/Runner/bodies live in refs; React mounts this once (empty deps).
//  - Cleanup stops the runner, clears the world, removes listeners — no zombies.
//  - Reduced-motion: render one composed resting frame and never start the runner.
//  - Drag via Pointer Events + setPointerCapture; the rest of the page scrolls.

interface CardDom {
  el: HTMLDivElement;
  body: Matter.Body;
  w: number;
  h: number;
}

// Deterministic resting layout (used for the static / reduced-motion frame and
// as drop targets). Fractions of the stage box. Hand-composed, not emergent.
const REST: { x: number; y: number; rot: number }[] = [
  { x: 0.30, y: 0.40, rot: -0.06 },
  { x: 0.62, y: 0.34, rot: 0.05 },
  { x: 0.46, y: 0.62, rot: -0.02 },
  { x: 0.74, y: 0.66, rot: 0.07 },
  { x: 0.20, y: 0.70, rot: 0.03 },
  { x: 0.84, y: 0.46, rot: -0.05 },
];

export default function MatterScene({ onOpen }: { onOpen: (id: string) => void }) {
  const { lang } = useLang();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(() => {});
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const layer = cardsLayerRef.current;
    if (!stage || !layer) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rect = stage.getBoundingClientRect();
    let W = rect.width;
    let H = rect.height;
    const isMobile = W < 760;

    // Card sizing scales with stage; mobile gets smaller cards.
    const baseW = isMobile ? Math.min(W * 0.62, 230) : Math.min(W * 0.26, 320);
    const cardW = baseW;
    const cardH = Math.round(baseW * 0.62);

    const cardEls: CardDom[] = [];

    // Place a card's DOM element at body transform.
    const place = (c: CardDom) => {
      const { x, y } = c.body.position;
      const a = c.body.angle;
      c.el.style.transform = `translate(${x - c.w / 2}px, ${y - c.h / 2}px) rotate(${a}rad)`;
    };

    // ---- Build the DOM cards (always rendered; physics optional) ----
    PROJECTS.forEach((p, i) => {
      const el = document.createElement("div");
      el.className = `vk-card vk-card--${p.tone ?? "ink"}${p.flagship ? " vk-card--flagship" : ""}`;
      el.style.width = `${cardW}px`;
      el.style.height = `${cardH}px`;
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", `${p.name} — ${p.oneLiner[lang]}`);
      el.innerHTML = cardInner(p, lang);
      layer.appendChild(el);

      // open detail on click/tap if it wasn't a drag, or on keyboard
      let downX = 0, downY = 0, moved = false;
      el.addEventListener("pointerdown", (e) => {
        downX = e.clientX; downY = e.clientY; moved = false;
      });
      el.addEventListener("pointermove", (e) => {
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 8) moved = true;
      });
      el.addEventListener("pointerup", () => { if (!moved) onOpen(p.id); });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p.id); }
      });

      // placeholder body; real body added below (or static placement if reduced)
      cardEls.push({ el, body: null as unknown as Matter.Body, w: cardW, h: cardH });
    });

    // ---- Reduced-motion / static path: compose the resting frame, no runner ----
    if (prefersReduced) {
      setReduced(true);
      cardEls.forEach((c, i) => {
        const r = REST[i % REST.length];
        c.el.style.transform = `translate(${r.x * W - c.w / 2}px, ${r.y * H - c.h / 2}px) rotate(${r.rot}rad)`;
        c.el.style.touchAction = "auto";
        c.el.style.cursor = "pointer";
      });
      cleanupRef.current = () => { cardEls.forEach((c) => c.el.remove()); };
      return;
    }

    // ---- Physics path ----
    const { Engine, Runner, World, Bodies, Body, Mouse, MouseConstraint, Events, Composite } = Matter;

    const engine = Engine.create();
    engine.gravity.y = ENGINE.gravityY;
    engine.enableSleeping = ENGINE.enableSleeping;

    // Walls: floor, ceiling, left, right — thick so throws can't tunnel out.
    const t = WALL.thickness;
    const wallOpts = { isStatic: true, restitution: WALL.restitution, friction: WALL.friction, render: { visible: false } };
    const walls = [
      Bodies.rectangle(W / 2, H + t / 2, W + t * 2, t, wallOpts), // floor
      Bodies.rectangle(W / 2, -t / 2 - H, W + t * 2, t, wallOpts), // high ceiling (room to drop)
      Bodies.rectangle(-t / 2, H / 2, t, H * 3, wallOpts), // left
      Bodies.rectangle(W + t / 2, H / 2, t, H * 3, wallOpts), // right
    ];
    World.add(engine.world, walls);

    // Create card bodies (start above the stage for the drop entrance).
    cardEls.forEach((c, i) => {
      const p = PROJECTS[i];
      const r = REST[i % REST.length];
      const startX = r.x * W;
      const body = Bodies.rectangle(startX, -cardH - i * 40, c.w, c.h, {
        chamfer: { radius: CARD.chamfer },
        density: CARD.density * (p.flagship ? FLAGSHIP_DENSITY_MULT : 1),
        friction: CARD.friction,
        frictionAir: CARD.frictionAir,
        restitution: CARD.restitution,
      });
      c.body = body;
    });

    // Staggered drop entrance (The Drop folded into The Pile).
    const dropTimers: number[] = [];
    cardEls.forEach((c, i) => {
      const id = window.setTimeout(() => {
        World.add(engine.world, c.body);
      }, i * DROP_STAGGER_MS);
      dropTimers.push(id);
    });

    // Drag: MouseConstraint scoped to the stage element only (never window).
    const mouse = Mouse.create(stage);
    // remove Matter's wheel handlers so the page still scrolls over the toy
    // @ts-expect-error internal handlers
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    // @ts-expect-error internal handlers
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.9, damping: 0.15, render: { visible: false } },
    });
    World.add(engine.world, mc);

    // Collision sound (only if opted-in).
    const onCollide = (ev: Matter.IEventCollision<Matter.Engine>) => {
      if (!isSoundEnabled()) return;
      for (const pair of ev.pairs) {
        const rv = pair.collision?.depth ?? 0;
        const a = pair.bodyA.velocity, b = pair.bodyB.velocity;
        const speed = Math.hypot(a.x - b.x, a.y - b.y);
        if (speed > 1.5) playCollision(speed);
      }
    };
    Events.on(engine, "collisionStart", onCollide);

    // Runner + render loop (we draw nothing on a canvas; we sync DOM).
    const runner = Runner.create({ delta: ENGINE.fixedDelta });
    let rafId = 0;
    let running = true;
    const sync = () => {
      for (const c of cardEls) if (c.body) place(c);
      // grab/grabbing cursor feedback
      const dragged = (mc.body as Matter.Body | null);
      for (const c of cardEls) {
        c.el.classList.toggle("is-grabbed", dragged === c.body);
      }
      if (running) rafId = requestAnimationFrame(sync);
    };

    const start = () => {
      if (running) return;
      running = true;
      Runner.run(runner, engine);
      rafId = requestAnimationFrame(sync);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      Runner.stop(runner);
      cancelAnimationFrame(rafId);
    };

    Runner.run(runner, engine);
    rafId = requestAnimationFrame(sync);

    // Pause when offscreen or tab hidden (battery + perf).
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? start() : stop(); },
      { threshold: 0.05 }
    );
    io.observe(stage);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    // Resize: rebuild walls + clamp cards into the new box.
    let resizeTO = 0;
    const onResize = () => {
      window.clearTimeout(resizeTO);
      resizeTO = window.setTimeout(() => {
        const r2 = stage.getBoundingClientRect();
        W = r2.width; H = r2.height;
        Body.setPosition(walls[0], { x: W / 2, y: H + t / 2 });
        Body.setPosition(walls[3], { x: W + t / 2, y: H / 2 });
        Body.setPosition(walls[1], { x: W / 2, y: -t / 2 - H });
        for (const c of cardEls) {
          if (!c.body) continue;
          const px = Math.min(Math.max(c.body.position.x, c.w), W - c.w);
          Body.setPosition(c.body, { x: px, y: Math.min(c.body.position.y, H - c.h) });
        }
      }, 150);
    };
    window.addEventListener("resize", onResize);

    cleanupRef.current = () => {
      stop();
      dropTimers.forEach((id) => window.clearTimeout(id));
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      Events.off(engine, "collisionStart", onCollide);
      World.clear(engine.world, false);
      Engine.clear(engine);
      cardEls.forEach((c) => c.el.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render card text when language changes (cheap: update labels in place).
  useEffect(() => {
    const layer = cardsLayerRef.current;
    if (!layer) return;
    const els = layer.querySelectorAll<HTMLElement>(".vk-card");
    els.forEach((el, i) => {
      const p = PROJECTS[i];
      if (p) el.innerHTML = cardInner(p, lang);
    });
  }, [lang]);

  useEffect(() => () => cleanupRef.current(), []);

  return (
    <div
      ref={stageRef}
      className={`vk-stage${reduced ? " vk-stage--static" : ""}`}
      aria-hidden="true"
    >
      <div ref={cardsLayerRef} className="vk-cards-layer" />
    </div>
  );
}

function cardInner(p: Project, lang: "en" | "tr") {
  const img = p.image
    ? `<div class="vk-card-media" style="background-image:url('${p.image}')"></div>`
    : "";
  return `
    ${img}
    <div class="vk-card-body">
      <div class="vk-card-name">${p.name}</div>
      <div class="vk-card-line">${p.oneLiner[lang]}</div>
      <div class="vk-card-stack">${p.stack.slice(0, 3).map((s) => `<span>${s}</span>`).join("")}</div>
    </div>`;
}
