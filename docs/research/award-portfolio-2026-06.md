# Award-Tier Portfolio Sites (2026) — Velkina Build Bible

**Date:** 2026-06-02
**For:** Velkina studio portfolio — Ömer Can Nalbant + Baha Taşkın. Bold, experimental, maximalist 3D (R3F/WebGL) + premium 2D motion (GSAP), award-site energy, kept clean and smooth.
**Method:** 8 WebSearches (different phrasings) + 10 WebFetches of named sites and primary technical writeups. URLs cited inline. This report is the technical/aesthetic layer; the typography/canvas foundation lives in the sibling file `design-creativity-2026-05.md` (Anthropic cream, weight/size extremes, banned fonts, stats-as-design) and should be read alongside this one.
**Sourcing note:** Codrops (tympanus.net), Awwwards case studies, webgpu.com, Maxime Heckel's blog, and the GSAP/Three.js docs are primary. The two listicle-style sources (metabole.studio, utsubo.com) are used only for site *names and award facts* that then point to verifiable Awwwards entries — not for technique claims.

---

## BOTTOM LINE

The 2026 award tier has moved past "throw particles and a tunnel at it." The dividing line between premium and cheap is now **art-directed restraint + a custom asset pipeline + one committed signature move**, not effect-stacking. The single loudest meta-pattern across every source: **"Direction over decoration"** — committed creative vision on every screen beats trend-stacking ([metabole.studio](https://metabole.studio/en/blog/immersive-website-examples)). For a 2-person AI-dev studio, the distinctive play is to make the site *itself the demo reel* (Shader.se, Active Theory, Lusion all do this), built on the **WebGPU + TSL** stack that is now production-ready and signals "we are on the frontier" — the exact message an AI-dev studio wants to send.

---

## 1. SIGNATURE MOVES (named site + the move)

These are the specific patterns that read as award-tier. Steal selectively — using all of them is the amateur tell.

### Self-as-demo-reel (the meta-move for a dev studio)
- **Shader.se** (Swedish real-time graphics studio) — the site opens like a 1987 corporate training tape: "chunky type and confident geometry," then quietly reveals it's running **Three.js on the WebGPU path with TSL doing the shader work.** The signature is **seamless scene transitions where "lighting, geometry, and post all shift together without the usual seams"** — dissolves that "only make sense on a modern GPU." It is "a studio site that is also, quietly, a demo reel." Source: [webgpu.com/showcase/shader-se](https://www.webgpu.com/showcase/shader-se-webgpu-tsl-studio-site/).
- **Lusion** — homepage is "a love letter to WebGL," an abstract 3D environment that responds to mouse and **morphs as you scroll, revealing project thumbnails organically** out of the scene rather than as a separate gallery. Source: [Awwwards Lusion case study](https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html).
- **Active Theory** — full-screen WebGL transitions *between project previews*; the agency site "functions as a pitch; execution quality matches campaign work." Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples), [webgpu.com showcase](https://www.webgpu.com/showcase/active-theory-portfolio/).

### Custom-asset / collaborative pipeline (the thing that actually wins)
- **Lusion** — the award-tier distinction is NOT a clever shader, it is the **pipeline**: cloth simulations baked in Houdini FX stored as **vertex animation textures** (position + normal maps as PNG) and **blended dynamically based on cursor position**. Matcap rendering with pre-baked normal/AO/thickness/illumination. Their own stated thesis: *"If the design team and the development team work together, they can do something far better."* Source: [Awwwards Lusion case study](https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html). **This is the single most important finding for Velkina: the winning move is a bespoke asset, not a downloaded effect.**

### Scroll-driven 3D camera / morph
- **Terminal Industries** (Awwwards SOTM Sep 2025) — **scroll transitions shift 3D visuals into wireframe**, monochromatic and restrained; "reveals technical rigor through suggestion." Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples).
- **Lando Norris** by OFF+BRAND (Awwwards Site of the Year 2025) — **rotating 3D helmet tracking with cinematic scroll sequences** + kinetic typography, lime-green accent. The lesson: a personal/small brand "becomes a complete universe through committed art direction." Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples).
- **Igloo.inc** — "fully immersive scroll-driven navigation redesign"; structural changes to navigation grammar outpace effect-based enhancements. Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples).

### Shader-driven cursor & reveal interactions (concrete, codeable)
From the Codrops GSAP-drives-shader-uniforms tutorial — these are the exact award-site interaction primitives, with the real uniform names and easings:
- **Click ripple** — raycast to UV, GSAP keyframes `uRippleProgress: [0,1,0]` over ~1.5s, vertex shader does `sin(-PI * 10.0 * (dist - uTime * 0.1))`. Needs a high-poly plane (50×50 segments min).
- **Cursor circular reveal** (color↔grayscale, or front↔back texture) — `smoothstep(uProgress - 0.1, uProgress, dist)` soft mask expanding from pointer; `mix()` between two textures; **`power2.inOut` / `power3.out`, 1.5–3s**.
- **Scroll/drag dynamic blur** — project each plane's world position to screen space, distance-from-center → Kawase blur strength `clamp(dist/maxDist * 5, 0, 5)`, tweened with **`power3.out`, ~1.5s**. Optimization: **round blur to nearest even number to avoid shader recompilation.**
- Source: [Codrops — Animate WebGL Shaders with GSAP](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/).

### Page transitions as a shader event
- **Scroll-revealed WebGL gallery** pattern — multi-page WebGL with **scroll-triggered shader reveals + seamless page transitions** orchestrated by GSAP + Three.js + Barba.js (or Astro view transitions). Source: [Codrops — Scroll-Revealed WebGL Gallery](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/). The award-tier feel is that **navigation never "reloads" — the canvas persists and the scene morphs between routes** (this is exactly what Active Theory and Lusion do).

### Kinetic typography as the 3D (no heavy geometry required)
- **Obys Agency** — "kinetic typography system; letters scale, split, and morph during scroll" — "typography can be the main character" for immersion without heavy 3D. Obys's stated philosophy: *"Structure is emotional. It creates rhythm, tension, and balance"* and *"You can break the grid only if you understand it. You can distort typography only if you respect it."* They use scroll-driven PNG-sequence animations (e.g., Glyphic) letting users pace narrative. Source: [Codrops — Obys feature](https://tympanus.net/codrops/2026/03/06/obys-the-small-studio-designing-big-digital-narratives/), [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples).

### Playable / physics-toy hero
- **Bruno Simon** (Awwwards SOTM Jan 2026) — playable 3D world navigation, Three.js + physics (Cannon/Rapier). Lesson: a specialized creator's portfolio "elevated to spectacle level." High effort, high signature; risky for a business pitch site (fun ≠ converts). Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples), [three.js forum showcase](https://discourse.threejs.org/t/my-3d-portfolio-as-a-creative-developper/76131).

---

## 2. LAYOUT & TYPOGRAPHY PATTERNS

- **Structure is the art direction, not an afterthought.** Obys treats sites "like editorial publications with deliberate pacing" — grid and type are "the invisible scaffolding," broken *only* with intent. The grid-break reads as confident precisely because the underlying grid is visibly rigorous elsewhere. Source: [Codrops — Obys](https://tympanus.net/codrops/2026/03/06/obys-the-small-studio-designing-big-digital-narratives/).
- **Kinetic / oversized display type as a primary surface.** Letters scale, split, and morph on scroll (Obys); kinetic type pairs with 3D objects (Lando Norris). Big committed display type at 3x+ size jumps, weight extremes 100↔900 — carried over from the foundation file [`design-creativity-2026-05.md`](./design-creativity-2026-05.md) and the [Anthropic Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics).
- **One display typeface, committed.** Repeated finding across the foundation research — do NOT reuse the Sora + Instrument-Serif-italic-kicker + mono-eyebrow kit. Pick one distinctive face and use it decisively (Shader.se commits to "chunky confident geometry"; Lando commits to a racing type language). Source: foundation file + [Anthropic Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics).
- **Grid-breaking earns its keep.** Asymmetry, broken columns, type that breaks out of its measure — but only against an otherwise disciplined system. The amateur version is chaos; the award version is *one* deliberate break per section.

---

## 3. COLOR / CANVAS DIRECTIONS for a "bold AI-dev studio"

Avoid the generic purple-gradient-on-white AI cliché (banned explicitly in the [Anthropic Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) and the foundation file). Verified award-tier directions:

- **Monochromatic + restraint = perceived premium.** Terminal Industries is monochromatic and restrained; "premium immersion emphasizes restraint and quality inference." A near-monochrome canvas with ONE saturated accent reads more expensive than a rainbow. Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples).
- **One committed accent against a dark/neutral field.** Lando Norris = lime-green on a dark racing world; Anthropic = warm coral on cream. The accent is the brand voltage; everything else is canvas. Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples), foundation file.
- **Conceptual canvas beats abstract gradient.** Shader.se commits to an *80s corporate-tape* world (chunky type, confident geometry) — a *concept* with a color logic, not "a gradient." Microsoft.ai uses **vegetal shaders, tone-on-tone textures, a soft palette that "resists tech's cold aesthetic."** The move is: pick an atmosphere with a point of view. Source: [webgpu.com/shader-se](https://www.webgpu.com/showcase/shader-se-webgpu-tsl-studio-site/), [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples).
- **Atmosphere via shader gradient/noise, not CSS linear-gradient.** A WebGL flowing gradient (noise-driven, depth-parallaxed) is a legitimate hero atmosphere — but it must be *deconstructed and intentional*, see [alexharri.com flowing WebGL gradient breakdown](https://alexharri.com/blog/webgl-gradients). This is the premium version of "a gradient."
- **Velkina-specific direction (recommendation, not a cited fact):** a near-black/graphite canvas with a single high-voltage accent, plus a WebGPU/TSL shader atmosphere as the hero — dark, technical, frontier-coded, anti-cute. Reads "AI infrastructure," not "AI toy." Avoid: purple→pink gradient, white-cool-gray default, neon-everything.

---

## 4. MOTION LANGUAGE (easing, duration, choreography)

Concrete, from the GSAP docs and the Codrops shader tutorial — use these exact values:

- **UI / responsiveness:** `power1.out` to `power2.out`. GSAP's own guidance: *"Ease out animations like `power1.out` are the best for UI transitions; they're fast to start which helps the UI feel responsive, and then ease out towards the end giving a natural feeling of friction."* Source: [GSAP Easing docs](https://gsap.com/resources/getting-started/Easing/).
- **Expressive reveals / shader uniforms:** `power2.inOut`, `power3.out`, `power3.inOut`, `expo.out` over **1.5–3s**. From the Codrops tutorial's effect table: ripple `power3.inOut` 1.5s, grayscale reveal `power2.inOut` 1.5s, texture mask `power3.out` 3s, blur `power3.out` 1.5s. Source: [Codrops shader+GSAP](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/).
- **Editorial curves over default browser eases** (from foundation discipline): prefer `cubic-bezier(0.22, 1, 0.36, 1)` (≈ expo.out) or `cubic-bezier(0.4, 0, 0.2, 1)`. Hover states 150–250ms; layout reveals 300–450ms; cinematic scroll moments 1–3s. The default `ease`/`ease-in-out`/springy bounce reads cheap. GSAP `CustomEase` (SVG-path eases) is "used heavily in product showcases, micro-interactions, and hero animations." Source: [GSAP Easing docs](https://gsap.com/resources/getting-started/Easing/), foundation visual-discipline rules.
- **Choreography = staggered timelines, not simultaneous fades.** Add each element to a single GSAP timeline with a calculated `stagger` based on index so things "rise into place sequentially" as they enter the viewport — not all at once. Source: [Codrops / GSAP+Lenis synthesis](https://gsap.com/community/forums/topic/45457-cinematic-scroll-controlled-experience-with-gsap-scrolltrigger-and-lenis), [Codrops infinite scroll](https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/).
- **Smooth scroll is table stakes — and it's a measurable win.** Lenis (≈3kB, Darkroom Engineering) + GSAP ScrollTrigger is *the* production pairing: Lenis runs its own rAF synced to GSAP's ticker; "Lenis handles momentum/easing, ScrollTrigger handles positional math." Bonus: **jank-free scroll directly improves INP, a Core Web Vital since March 2024.** Source: [Lenis GitHub](https://github.com/darkroomengineering/lenis), [Codrops infinite scroll](https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/).

---

## 5. ANTI-PATTERNS — what makes maximalist 3D feel cheap/janky

Each tied to a primary technical source. Treat this as the pre-ship checklist's "ban list."

**Aesthetic failure modes:**
- **Effect-stacking instead of direction.** The dominant 2026 verdict: "Direction over decoration — committed creative vision across every screen outperforms trend-stacking." A pile of effects with no concept = cheap. Source: [metabole.studio](https://metabole.studio/en/blog/immersive-website-examples).
- **The default Three.js portfolio kit.** The community itself treats "smooth animations, particle effects, interactive scenes, creative navigation" as *standardized/commoditized* — and now AI can generate scroll-driven animations + custom shaders + 3D models simultaneously, so the generic 3D portfolio no longer differentiates. Differentiation now comes from a bespoke concept/asset, not from "having 3D." Source: [three.js forum — is AI taking over the portfolio side?](https://discourse.threejs.org/t/is-ai-taking-over-the-visual-portfolio-side-of-three-js-what-domains-still-need-real-3d-engineering/91159).
- **Springy/bouncy default eases + wrong durations.** Sub-200ms feels jumpy; over 600ms for a hover feels slow; default `ease-in-out` reads template. Source: foundation visual-discipline rules + [GSAP Easing](https://gsap.com/resources/getting-started/Easing/).
- **Purple-gradient-on-white / Inter-everywhere / Space-Grotesk-as-display.** Banned by name. Source: [Anthropic Cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics), foundation file.

**Technical/jank failure modes** (these are what make a heavy scene *stutter*, the #1 "cheap" tell):
- **Ignoring DPR on high-res displays** — Retina/5x phones render 4–25x the pixels. Cap it: desktop ~1.0–2.0, mobile ~1.5–2.0, drop dynamically (`setDpr(dpr*0.8)`) under load. Source: [Codrops — Efficient Three.js Scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/).
- **Too many draw calls.** "Below 100 draw calls most devices hold 60fps; above 500 even powerful GPUs struggle." Mobile budget <50. Source: [utsubo 100 tips](https://www.utsubo.com/blog/threejs-best-practices-100-tips), [Codrops efficient scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/).
- **Rendering continuously when invisible / static.** Set `frameloop="demand"` for static scenes; `frameloop={document.hidden ? 'never' : 'always'}`. Source: [Codrops efficient scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/).
- **Memory leaks from undisposed assets.** "A single 4K texture uses 64MB+ VRAM." Always dispose geometries/materials/textures/render-targets. Source: [utsubo](https://www.utsubo.com/blog/threejs-best-practices-100-tips).
- **Indiscriminate post-processing + too many dynamic lights.** Limit active lights to ≤3; PointLight shadows cost 6× (cube faces); prefer environment maps/baked lightmaps over dynamic lights; disable shadow auto-update when nothing moves; disable AA/alpha/stencil/depth on the canvas when post-processing handles it. Source: [utsubo](https://www.utsubo.com/blog/threejs-best-practices-100-tips), [Codrops efficient scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/).
- **Auto-generated physics colliders matching visual geometry.** Use simple box/sphere colliders; reduce physics `timeStep` to ~1/30. Source: [Codrops efficient scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/).
- **Shader recompilation churn.** Rounding a tweened uniform (e.g. blur to nearest even) prevents excessive updates/recompiles. Source: [Codrops shader+GSAP](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/).

---

## 6. PERFORMANCE PATTERNS (named techniques for 60fps heavy WebGL)

The polished-vs-amateur split, from the two strongest technical sources ([utsubo 100 tips](https://www.utsubo.com/blog/threejs-best-practices-100-tips), [Codrops efficient scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/)):

| Technique | What it does | Target / number |
|---|---|---|
| **InstancedMesh / BatchedMesh** | 1,000 meshes → 1 draw call; BatchedMesh allows varied geometry | keep draw calls <100 (desktop), <50 (mobile) |
| **Draco compression** | geometry shrink | 90–95% smaller |
| **KTX2 + Basis (UASTC quality / ETC1S size)** | stays compressed on GPU | ~10× less VRAM than PNG/JPEG |
| **`gltfjsx -S -T -t`** | mesh-simplify + Draco in pipeline | ~90% asset reduction (real demo: 2.1MB total for 184 textures + 40k tris) |
| **LOD (THREE.LOD)** | swap to low-poly at distance | +30–40% FPS in large scenes |
| **DPR cap + dynamic DPR** | fewer pixels on Retina | desktop ≤1–2, mobile ≤1.5–2, `*0.8` under load |
| **`frameloop="demand"` / hidden-tab pause** | don't render static/invisible | saves battery, prevents monitor false-triggers |
| **PerformanceMonitor (drei) graceful degradation** | drop DPR + post-fx on slow frames | the polished-scene marker |
| **mediump on mobile, <3 varyings, `mix()`/`step()` over branches** | cheaper fragment shaders | ~2× faster than highp |
| **Environment maps / baked lightmaps over dynamic lights** | avoid per-light cost | ≤3 active lights |
| **Dispose everything** | no VRAM leak | 4K tex = 64MB+ |

**Forward-looking stack (strong recommendation for Velkina):** **WebGPU + TSL** is production-ready in Three.js (core renderer with **automatic WebGL2 fallback**, node materials, compute shaders). TSL = one JS-like shader codebase targeting both WebGPU and WebGL, so you don't lose work when APIs deprecate. Compute shaders are the headline win — **GPU-side particle init, instanced positioning, attractor sims**, eliminating CPU/FBO bottlenecks. Expect **2–10× gains** in draw-call-heavy and compute scenes. Caveats: WebGPU needs recent Safari/iOS (fallback covers it), `sampler()` quirk for textures, `instanceIndex` context-dependence, doc gaps. Source: [Maxime Heckel — Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/), [utsubo](https://www.utsubo.com/blog/threejs-best-practices-100-tips), [webgpu.com Shader.se](https://www.webgpu.com/showcase/shader-se-webgpu-tsl-studio-site/).

---

## SYNTHESIS

### Established patterns (multiple sources agree)
- Smooth scroll (Lenis) + GSAP ScrollTrigger is the baseline production pairing; staggered timelines, not simultaneous fades.
- `power.out`/`expo.out` editorial easing, 1.5–3s for expressive reveals, 150–250ms for hover.
- Draw-call discipline (<100 / <50 mobile via instancing), DPR caps, on-demand rendering, KTX2/Draco, dispose — the non-negotiable 60fps kit.
- "Direction over decoration" — a committed concept beats stacked effects. Restraint + monochrome + one accent reads premium.

### Signature moves to steal (ranked for Velkina)
1. **Site-as-demo-reel with persistent canvas + seamless route transitions** (Shader.se, Active Theory, Lusion) — the canvas never reloads; scenes morph between routes. This is THE move for a dev studio.
2. **One bespoke hero asset from a custom pipeline** (Lusion's Houdini→VAT→cursor-blend). A handmade asset is what AI can't trivially clone and what actually wins awards.
3. **Cursor-driven shader reveal** (circular grayscale↔color or texture A↔B, `smoothstep` mask, `power2.inOut`).
4. **Scroll-morphs-3D** (solid→wireframe like Terminal Industries; thumbnails emerging from the scene like Lusion).
5. **Kinetic display typography on scroll** (Obys) — cheaper than heavy 3D, equally distinctive; good for secondary sections.
6. **WebGPU/TSL compute-driven particle field** as ambient atmosphere — frontier-coded, on-brand for AI-dev.

### Anti-patterns to ban (put these in the swap-test gate)
- The generic Three.js kit (tunnel + drifting particles + orbit-controls hero) — now AI-commoditized, reads as a template.
- Effect-stacking with no concept; purple→pink gradient; Inter/Space-Grotesk as display; springy default eases.
- Uncapped DPR, >100 draw calls, continuous render on static scenes, undisposed assets, >3 dynamic lights, indiscriminate post-fx — the jank tells that make even pretty scenes feel cheap.
- Playable-physics-toy hero on a business pitch site — high signature but converts poorly; keep it to an easter egg if at all.

### What would make Velkina DISTINCTIVE (opinionated)
A 2-person AI-dev + design studio should make the **website prove the capability**, not describe it. Recommended distinctive frame:
1. **Concept canvas, not a gradient.** Pick an atmosphere with a point of view — a dark, graphite, "frontier infrastructure" world with ONE high-voltage accent. Anti-cute, anti-purple. (Shader.se's 80s-tape and Microsoft.ai's vegetal-tone-on-tone prove a *concept* beats an *effect*.)
2. **Persistent WebGPU/TSL canvas** that morphs between routes — the site is the demo reel. Compute-shader particle/attractor field as ambient hero, cursor-reactive, cheaply 60fps via compute.
3. **One bespoke signature asset** that encodes "AI" honestly — e.g., a generative/attractor system or a data-driven form that *is* the brand mark, built in-pipeline so it's un-clonable. This is the Lusion lesson applied.
4. **Editorial kinetic type** for the case-study sections (Obys discipline) so it's not 3D-for-3D's-sake — type carries the narrative, 3D carries the atmosphere.
5. **Two-person honesty as a feature:** small studio + console-grade execution is itself the pitch (Lando Norris, Bruno Simon prove a small subject + total art direction = "a complete universe"). Name Ömer and Baha; show the craft.
6. **Performance as a flex:** if it holds 60fps on a mid phone with a heavy WebGPU scene, *that's the proof* an AI-dev studio is competent. Build the PerformanceMonitor degradation in from day one and treat the Lighthouse/INP score as part of the portfolio.

The swap test for the whole build: *if you replaced Velkina's hero with a downloaded Three.js particle template and nobody could tell, you defaulted.* The bespoke asset + persistent-canvas concept is what makes that swap impossible.

---

## EVIDENCE QUALITY

- **Established (multi-source):** smooth-scroll stack, easing/duration values, draw-call/DPR/instancing performance kit, "direction over decoration," restraint=premium. Strong primary sources (Codrops, GSAP docs, three.js docs, Maxime Heckel).
- **Likely (2+ sources, some 2nd-hand):** specific award facts and signature moves for Lando Norris, Terminal Industries, Igloo.inc, Messenger, Scout Motors, Cartier — these come via the metabole.studio breakdown pointing to Awwwards. Site names + awards are verifiable on Awwwards; the per-site *technique descriptions* are that author's reading, so treat as Likely not Established. I did NOT independently fetch each of these sites (several are JS-canvas apps that don't return readable HTML).
- **Strongly sourced single-deep-dive:** Lusion (Awwwards case study), Shader.se (webgpu.com), Obys (Codrops feature), the four GSAP-shader effects (Codrops tutorial), TSL/WebGPU readiness (Maxime Heckel). These are primary and detailed.
- **Gaps:** I could not surface a high-quality forum/Reddit thread explicitly cataloguing "cheap vs premium WebGL" tells — that synthesis is assembled from the *performance* sources (the jank list) plus the three.js-forum AI-commoditization thread, not from a single canonical "anti-pattern" doc. The aesthetic anti-patterns lean on the Anthropic Cookbook + foundation file.

## CAVEATS / WHAT I COULDN'T VERIFY
- I did not screenshot or interactively test the named studio sites (Lusion, Active Theory, Shader.se, Obys, Lando Norris). Descriptions are from case studies/breakdowns, not direct observation. **Before locking the Velkina direction, manually visit lusion.co, the Active Theory portfolio, shader.se, and obys.agency and watch the actual transitions** — interaction feel doesn't survive text summary.
- metabole.studio and utsubo.com are studio blogs, not primary docs. I used metabole only for *which sites won what*, and utsubo only for *performance numbers that match the Codrops primary source*. Where they're the sole source for a claim, it's flagged Likely.
- Award timing: several "2025/2026 Site of the Year" facts are second-hand; verify on awwwards.com before citing publicly in a pitch.
- WebGPU/TSL is production-ready but the doc gaps and `instanceIndex`/`sampler()` quirks are real — budget extra dev time vs. classic GLSL, and keep the WebGL fallback path tested, not assumed.

---

## SOURCES (with credibility notes)

**Primary technical (high trust):**
- [Codrops — Animate WebGL Shaders with GSAP: ripples, reveals, blur](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/) — exact uniforms, easings, durations.
- [Codrops — Building Efficient Three.js Scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/) — DPR, instancing, on-demand, disposal, jank causes.
- [Codrops — Scroll-Revealed WebGL Gallery (GSAP/Three/Astro/Barba)](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/) — persistent-canvas page transitions.
- [Codrops — Infinite Scroll with GSAP & Lenis](https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/) — Lenis+GSAP, INP.
- [Codrops — WebGL for Designers (Unicorn Studio effects)](https://tympanus.net/codrops/2026/03/04/webgl-for-designers-creating-interactive-shader-driven-graphics-directly-in-the-browser/) — depth parallax, noise distortion, SDF, bloom, masking.
- [Codrops — Obys feature](https://tympanus.net/codrops/2026/03/06/obys-the-small-studio-designing-big-digital-narratives/) — structure-as-emotion, kinetic type, grid discipline.
- [GSAP — Easing docs](https://gsap.com/resources/getting-started/Easing/) — official ease guidance, power1.out for UI.
- [Maxime Heckel — Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/) — TSL/WebGPU readiness, compute shaders, caveats.
- [utsubo — 100 Three.js performance tips (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips) — draw-call budgets, KTX2/Draco, shadow/light costs. (Studio blog; numbers corroborated by Codrops.)
- [Lenis (Darkroom Engineering) GitHub](https://github.com/darkroomengineering/lenis) — the smooth-scroll standard.
- [luruke/awesome-casestudy](https://github.com/luruke/awesome-casestudy) — curated WebGL case-study index (Active Theory, Bruno Simon, Martin Laxenaire DOM-in-WebGL).
- [alexharri — A flowing WebGL gradient, deconstructed](https://alexharri.com/blog/webgl-gradients) — premium shader-gradient atmosphere.

**Award sites / case studies (high trust for the named site):**
- [Awwwards — Lusion case study (Site of the Month)](https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html) — Houdini VAT pipeline, matcap, file sizes.
- [Lusion studio](https://lusion.co/) / [projects](https://lusion.co/projects/).
- [webgpu.com — Shader.se (WebGPU+TSL studio site)](https://www.webgpu.com/showcase/shader-se-webgpu-tsl-studio-site/) — self-as-demo-reel, seamless transitions.
- [webgpu.com — Active Theory portfolio](https://www.webgpu.com/showcase/active-theory-portfolio/).
- [Awwwards — Best Three.js websites](https://www.awwwards.com/websites/three-js/) / [Best WebGL](https://www.awwwards.com/websites/webgl/) — live SOTD showcase to browse.
- [three.js forum — is AI taking over the portfolio side?](https://discourse.threejs.org/t/is-ai-taking-over-the-visual-portfolio-side-of-three-js-what-domains-still-need-real-3d-engineering/91159) — commoditization of the generic 3D portfolio.

**Secondary breakdowns (use for site names/awards only, technique claims flagged Likely):**
- [metabole.studio — Immersive Website Examples 2026](https://metabole.studio/en/blog/immersive-website-examples) — Lando Norris, Terminal Industries, Igloo.inc, Messenger, Scout Motors, Microsoft.ai, Cartier.

**Foundation (read alongside):**
- [`D:/Velkina/docs/research/design-creativity-2026-05.md`](./design-creativity-2026-05.md) — typography, cream/dark canvas, weight/size extremes, banned fonts, stats-as-design.
- [Anthropic Cookbook — frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) — font/gradient bans, weight/size extremes.
