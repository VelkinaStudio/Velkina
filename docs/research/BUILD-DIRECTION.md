# Velkina Rebuild — Locked Direction (2026-06-02)

Source of truth synthesizing the 3 research files + content audit. Read this first.

## Decisions (from Nalba)
- Build fresh in `D:/Velkina` (salvage real content + assets, rebuild code clean).
- Content = real projects from memory + AI/automation capabilities, CLEARLY separated (no fabrication).
- 3D throughout, maximalist. Fight for 60fps; degrade gracefully on mobile.
- Aesthetic: BOLD, EXPERIMENTAL, award-site energy (Awwwards/FWA ceiling).
- Most-creative / optimized rendering: study experimental student work, bleeding-edge text + animation.

## THE SIGNATURE MOVE (un-clonable, on-brand)
**Bespoke MSDF text-as-physics / text-as-particles hero on the WebGPU + TSL compute path**, skinned in ONE committed post-process look (pick: dithering OR ASCII OR halftone — choose ONE). This is what AI-generated sites can't trivially clone, and using the frontier WebGPU/TSL stack IS the message for an AI-dev studio.
- Text dissolve into dust/petals (Codrops "Gommage", MSDF + TSL compute + selective bloom).
- Interactive text destruction: cursor pushes 3D text vertices via TSL compute + per-vertex spring physics (u_spring≈0.05, u_friction≈0.9). VELOCITY drives the magic, not position.
- Cheapest high-impact type move sitewide: variable-font proximity morph (GSAP SplitText + font-variation-settings, no WebGL).

## Tech stack (locked)
- Next.js 15 App Router + React 19. R3F **v9** (v8 is NOT React-19 compatible). `three` pinned.
- `@react-three/fiber@9`, `@react-three/drei`, `@react-three/postprocessing`, `gsap`+ScrollTrigger(+SplitText, now free), `lenis`, `motion`, `tunnel-rat`.
- **Global persistent canvas** (react-three-next pattern): ONE `<Canvas>` + `<View>` + tunnel-rat + gl.scissor. Scenes morph across routes. NOT per-section canvases (WebGL context limit).
- Canvas modules: `'use client'` + `next/dynamic { ssr:false }`.
- Scroll: **Lenis ticked from gsap.ticker + GSAP ScrollTrigger** (NOT drei ScrollControls — conflicts with ScrollTrigger pin). `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t=>lenis.raf(t*1000))`, `lagSmoothing(0)`, `autoRaf={false}`.
- WebGPU renderer with automatic WebGL2 fallback (10–100× particle perf via compute; signals frontier).

## Perf governor (60fps)
- `frameloop="demand"` + `invalidate()`; `dpr={[1,2]}`; drei `AdaptiveDpr`/`AdaptiveEvents`/`PerformanceMonitor`.
- `useDetectGPU` → static fallback for tier ≤1 / mobile. IntersectionObserver toggles off-screen scenes to frameloop 'never'.
- InstancedMesh/BatchedMesh (<100 draw calls desktop, <50 mobile), Draco, KTX2, dispose assets.
- `prefers-reduced-motion` + saveData → skip heavy scenes (static poster instead).
- Dithering: ordered/Bayer + blue-noise are GPU-parallel (live OK). Floyd-Steinberg/error-diffusion is sequential — BAKE it, never per-frame.

## Color / canvas (avoid AI cliché)
- NO purple-gradient-on-white. Verified premium = near-monochrome/dark + ONE high-voltage accent.
- Pick a CONCEPT canvas with a POV, not "a gradient." (Decide in Phase 2.)

## Motion values (from research)
- 150–250ms hover, 300–450ms layout, 1–3s cinematic reveals.
- power1.out/power2.out for UI; power2.inOut/power3.out/expo.out for expressive; NO springy default eases.

## CONTENT TRUTH-MAP (critical — do not fabricate)
**Real clients (3, confirmed):** Lavinia Bistro (QR menu, 4 bistros Bucharest), Atar Avcı Law (ataravci.com.tr), TP Thermoplast (B2B, tpthermoplast.com).
**Real internal products (3):** RuleSell (AI-config marketplace, Stripe Connect), MegVax (Meta Ads automation SaaS), Customer-Agent (5-lang AI support).
**DO NOT REUSE fabricated:** home metrics (120 projects/95% CSAT/etc — deleted), all per-project ROAS/uptime/% numbers (unverified), invented persona names in public/people/*.jpg, "since 2018 vs 2021" (unresolved), 47-projects claim. 13 of 16 portfolio "clients" are demo/aspirational — label as demos or capability showcases, NOT real clients, unless Nalba confirms.
**Team:** Ömer Can Nalbant (Nalba) — frontend, brand, marketing, Istanbul, nalba@velkina.com. Baha Taşkın (Baha) — backend, infra, ops, Bucharest, baha@velkina.com. "Two operators on every project." "Velkina is two people, not a department."
**Real contact (safe):** +90 532 336 00 51, wa.me/905323360051, cal.com/velkina, offices Istanbul (Üsküdar) + Bucharest (Calea Victoriei).
**Services (real, from llms.txt):** Websites/web apps, Shopify e-commerce, Restaurant QR menus, Google Ads, Meta Ads, Cloud/DevOps (AWS/GCP/Azure/Vercel/Cloudflare), AI automation & agents, Mobile apps, SEO, Branding/design systems.
**Reusable assets:** public/food/*.jpg (12, restaurant), public/context/*.jpg (6, industry shots), public/brands/*.svg (8 tech logos), public/portfolio-screenshots/*.webp (7 real screenshots incl 3 real clients).

## 12 reference portfolios to study (signature moves)
Patrick Heng, Robin Payot (Wind Waker.js), Roman Jean-Elie (scroll-velocity vertex stretch), Justine Soulié, Adrián Gubrica, Bruno Simon, Lusion, Active Theory, shader.se, Obys, basement.studio, Exat (Studio Size). See creative-rendering-2026-06.md for notes.
