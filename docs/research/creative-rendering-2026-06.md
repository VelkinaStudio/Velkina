# Creative Text + Animation Rendering on the Web — The Deepest Pit (2026-06)

**Date:** 2026-06-02
**For:** Velkina portfolio — the creativity-injection layer that decides award-tier vs. templated. This is the "what to actually render and how" file. It sits ON TOP of two sibling files and assumes them:
- [`r3f-tech-2026-06.md`](./r3f-tech-2026-06.md) — the R3F/Next architecture, scroll wiring, perf API surface.
- [`award-portfolio-2026-06.md`](./award-portfolio-2026-06.md) — award-site signature moves, easing/duration, anti-patterns.
- [`design-creativity-2026-05.md`](./design-creativity-2026-05.md) — typography/canvas/brand fundamentals (Anthropic cream, weight extremes, banned fonts).

**Method:** 11 WebSearches (varied phrasings) + 8 deep WebFetches of primary technical writeups (Codrops 2025-2026 tutorials with their GitHub repos, Maxime Heckel's blog, named creative-dev portfolio breakdowns). Every technique below traces to a specific URL with the actual function/uniform names where I could extract them. Secondary/trend-listicle sources are used only for naming sites, never for technique claims, and flagged.

---

## BOTTOM LINE

The deepest, freshest pit of 2026 creative rendering has a clear center of gravity: **WebGPU + TSL compute shaders applied to TEXT.** The single most-screenshotted, hardest-to-clone class of work right now is *text that physically behaves* — MSDF glyphs that dissolve into dust and petals ([Codrops Gommage, Jan 2026](https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/)), 3D text whose vertices get shoved around by spring physics under your cursor ([Codrops Text Destruction, Jul 2025](https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/)), and variable fonts that morph weight/width per-letter by cursor proximity ([Exat microsite, Apr 2026](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/)). The second pit is **post-processing as the entire aesthetic** — real-time ASCII, ordered (Bayer) dithering, halftone, and pixel-pattern shaders that turn an ordinary scene into a signature ([Efecto, Jan 2026](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/); [Maxime Heckel — Post-Processing as a Creative Medium](https://blog.maximeheckel.com/posts/post-processing-as-a-creative-medium/)).

For Velkina, the un-clonable move is **one bespoke text-as-physics or text-as-particles hero built on the WebGPU/TSL compute path, wrapped in a single committed post-process look (dither OR ASCII OR halftone — pick one).** Everything below is the menu.

---

## PART 1 — BLEEDING-EDGE TEXT RENDERING

### 1.0 The text-rendering decision tree (MSDF vs troika vs SDF vs geometry)

There are four ways to put crisp text in WebGL, and the choice constrains every effect you can layer on top.

| Approach | What it is | Best for | The catch |
|---|---|---|---|
| **troika-three-text** (`<Text>` in drei) | SDF glyph atlas generated at runtime from any font URL; auto-layout, wrapping, accessibility | Fast to ship, responsive body/heading text, per-glyph effects via its shader hooks | **Not WebGPU/TSL compatible** at time of the Gommage tutorial — this is why bleeding-edge demos drop it. [Codrops note](https://tympanus.net/codrops/2025/06/05/how-to-create-responsive-and-seo-friendly-webgl-text/) |
| **MSDF (multi-channel SDF)** via `three-msdf-text-utils` / Léo Mouraire's `three-msdf-text` | Pre-baked multi-channel atlas (sharper corners than single-channel SDF); you feed it through a custom material | The freshest TSL/WebGPU text effects (dissolve, per-glyph UV tricks) | Atlas baked ahead of time with `msdf-bmfont`; one font, one weight per atlas |
| **`countertype/three-text`** | High-fidelity 3D font rendering + layout, adapters for p5.js, WebGPU, WebGL | When you need genuinely high-fidelity glyph geometry across renderers | Newer/less battle-tested; verify before committing |
| **Extruded geometry** (`TextGeometry` / drei `<Text3D>`) | Real 3D mesh from font JSON, has volume/bevel | Volumetric text, vertex-physics destruction (you need real vertices to shove) | Heavy; high-poly text = lots of vertices. Used by the Text Destruction demo *because* it needs vertices to deform |

**Performance ranking (crispness-per-byte, most → least performant):** troika SDF ≈ MSDF (both are textured quads, near-free) ≫ extruded geometry (vertex-count bound). Use SDF/MSDF for anything that stays "flat-ish"; only reach for geometry when the effect literally needs to move vertices in 3D.

Sources: [Codrops responsive WebGL text (troika)](https://tympanus.net/codrops/2025/06/05/how-to-create-responsive-and-seo-friendly-webgl-text/) · [troika-three-text docs](https://protectwise.github.io/troika/troika-three-text/) · [countertype/three-text](https://github.com/countertype/three-text) · [harfbuzzjs discussion #30 — robust realtime text in WebGL](https://github.com/harfbuzz/harfbuzzjs/discussions/30) (the canonical thread on why text in WebGL is hard).

---

### 1.1 ⭐ TEXT DISSOLVE — MSDF glyphs → dust + petals (the 2026 showpiece)

**The single freshest text technique I found.** MSDF text disintegrates over time, shedding dust and spinning flower petals as it fades — inspired by the "Gommage" effect from *Clair Obscur: Expedition 33*.

**How it actually works** (extracted from the writeup + repo):
- Text rendered with **`three-msdf-text-utils`**, baked via `msdf-bmfont` (font-size 64, distance-range 16, texture-padding 8). Material is `MSDFTextNodeMaterial` so TSL can customize the shader while staying WebGPU-compatible.
- **Dissolve mask:** sample a Perlin noise texture using `glyphUv` (per-letter UVs), `clamp()` to 0–1, then `step(uProgress, perlinRemap)` discards fragments progressively. A second color uniform desaturates as it dissolves.
- **Dust particles:** `InstancedMesh` of 0.02×0.02 planes, **capped at 100 instances** (WebGPU's 9 vertex-buffer-attribute ceiling). Attributes aggressively packed — `aBirthLifeSeedScale` stuffs birth time + lifetime + seed + scale into one `vec4`.
- **Petals:** GLTF model, ~400 instances, with `rotX/rotY/rotZ` matrices, bend via `bendWeight = pow(y, 3.0)`, time-driven spin, turbulence wobble from two Perlin samples offset by `vec2(13.37, 7.77)`.
- **Selective bloom via MRT (Multiple Render Targets):** materials write `bloomIntensity` to a separate buffer, multiplied before `BloomNode` — no full-screen bloom artifacts.
- Key uniforms: `uProgress` (0–1 timeline), `uWindStrength` 0.3, `uNoiseScale` 30, `uRiseSpeed` 0.1, `aLife` 4–6s. Depth-write disabled on particles to cut overdraw.

Demo: <https://tympanus.net/Tutorials/WebGPUGommage> · Repo: <https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops> · Writeup: [Codrops, Jan 2026](https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/).

**Performance:** Fully GPU-driven. The 100/400 instance caps are a WebGPU attribute-limit constraint, not a perf wall — this runs at 60fps.

---

### 1.2 ⭐ INTERACTIVE TEXT DESTRUCTION — vertex spring-physics on 3D text

3D extruded text ("NUEVOS") whose **vertices are individually pushed by your cursor and spring back**, driven entirely by a WebGPU/TSL compute shader.

- `TextGeometry` + `FontLoader` (size 1.0, depth 0.2, bevel), `MeshStandardMaterial`.
- Three GPU storage buffers per vertex: `initial_position`, `position_storage_at`, `velocity_storage_at`.
- Two compute functions: init (`position_storage_at.assign(initial_position)`) and `compute_update` each frame via `renderer.computeAsync(compute_update)`.
- **Spring physics per vertex:** `velocity += (target - current) * u_spring; velocity *= u_friction; current += velocity` with `u_spring=0.05`, `u_friction=0.9`.
- Cursor influence: `length(u_input_pos.sub(base_position))` within a 0.5-unit radius; `step(distance, 0.5).mul(1.5)` gates the effect.
- Flourish: `mx_noise_vec3` for directional chaos, `rotate()` for tumble, velocity-driven `hue()` shift with emissive ×5 (so the fast-moving bits bloom).

Demo: <https://tympanus.net/Tutorials/InteractiveTextDestruction/> · Repo: <https://github.com/armdz/tsl_elastic_vertex_destruction> · Writeup: [Codrops, Jul 2025](https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/).

**Why this reads award-tier:** the text is *alive under the cursor* and made of real geometry — AI image-gen can't fake interactive vertex physics. This is the "handmade" signal.

---

### 1.3 ⭐ KINETIC VARIABLE FONTS — per-letter weight/width morph by cursor proximity

The **Exat microsite** (Studio Size × RISE2) is the current reference for "typography as the interface itself," not decoration.

- **Proximity rings of influence:** Euclidean distance from cursor to each glyph center drives nested rings that progressively raise font *weight* and shift color from cool `#0000cb` → warm `#FF6200` → red `#FF0B00`.
- **Design-space morph:** hovering style names morphs the specimen text between weights AND widths in real time, continuous (no hard jumps) — this is the variable-font axis interpolation done live.
- **Scroll-reactive numerals:** large numbers drift in slow sine-wave patterns reacting to scroll *speed*, adding "temporal depth during pauses."
- Stack: **GSAP + ScrollTrigger + SplitText**, **Lenis**, **Splide.js** for marquees, variable fonts for the morph.

Demo: <https://exat.hottype.co/> · Writeup: [Codrops, Apr 2026](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/).

**Performance:** This is the *cheapest* of the showpieces — variable fonts + CSS/`font-variation-settings` + GSAP, no WebGL required. Best ROI for a secondary section. Variable fonts have officially crossed from "trend" to "best practice" in 2026 ([typography-trends sources, used for the trend claim only](https://www.theinkorporated.com/insights/future-of-typography/)).

---

### 1.4 TEXT-AS-PARTICLES / MORPH BETWEEN STRINGS (point-cloud typography)

Sample glyph shapes into a point cloud, then morph the cloud between strings (or explode/reform). Two paths:

- **GPGPU / FBO (WebGL2):** simulate positions in a fragment shader into a ping-pong render target, display as `<points>`. Canonical tutorial: [Codrops — Crafting a Dreamy Particle Effect with GPGPU (Dec 2024)](https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/) (repo: [DGFX/codrops-dreamy-particles](https://github.com/DGFX/codrops-dreamy-particles)).
- **TSL compute (WebGPU):** the modern replacement for FBO ping-pong — [Wawa Sensei — GPGPU particles with TSL & WebGPU](https://wawasensei.dev/courses/react-three-fiber/lessons/tsl-gpgpu).
- **Morph between target shapes:** [Three.js Journey — Particles Morphing Shader](https://threejs-journey.com/lessons/particles-morphing-shader) (lerp particle positions between two sampled targets, `uProgress`).
- **Gooey particles → MSDF text** community thread (the exact "particles reform into a word" effect): [three.js forum #76180](https://discourse.threejs.org/t/help-with-morphing-gooey-particles-into-msdf-text-effect/76180).

**Performance:** GPGPU/FBO hits a CPU bottleneck around ~50k particles when positions touch the CPU; TSL compute pushes to **millions** (see Part 3). For text-sized point clouds (tens of thousands) either is fine; for "a galaxy of letters" use TSL compute.

---

### 1.5 PER-LETTER SHADER ANIMATION (the cheaper kinetic-type win)

Split text into glyphs and run a GLSL/shader effect per character — wave reveals, scroll-velocity stretch, color sweeps. Featured in Codrops' 2025 review as "Animating Letters with Shaders." This is what most "kinetic type" award sites actually do, and it's far cheaper than 3D.
- **CSS + GSAP route (no WebGL):** SplitText into chars, stagger on a single timeline, drive `transform`/`font-variation-settings`. GSAP went **fully free in mid-2025 including SplitText and MorphSVG** ([Codrops 2025 Year in Review](https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/)) — no more license gate on the two plugins that matter for type.
- **Scroll-velocity vertex stretch:** Roman Jean-Elie's portfolio applies `sin(finalPosition.y / uViewportSizes.y * M_PI)` stretch driven by `uVelocity` so text taffy-stretches with scroll momentum ([Codrops breakdown](https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/), site: <https://www.romanjeanelie.com/>).

### 1.6 SVG STROKE / TEXT-ON-PATH / MORPH (the vector-native kinetic kit)

- **Self-drawing stroke:** `stroke-dasharray` + `stroke-dashoffset` animation — letters write themselves. [Codrops — Kinetic SVG Typography](https://tympanus.net/codrops/2023/01/31/bringing-letters-to-life-coding-a-kinetic-svg-typography-animation/).
- **Text on a path:** `<textPath>` + animate offset; GSAP forum has the canonical pen ([GreenSock pen VwjKPWV](https://codepen.io/GreenSock/pen/VwjKPWV)).
- **Shape morphing:** `MorphSVGPlugin` animates the `d` attribute (diamond → lightning in one line) — now free. [GSAP MorphSVG docs](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/).

**Performance:** SVG is the most accessible/SEO-friendly kinetic type (real text in the DOM, scalable). Best for logos, eyebrows, section markers — not for thousands of animated elements (DOM-bound).

---

## PART 2 — GENERATIVE / EXPERIMENTAL ANIMATION TECHNIQUES

### 2.1 ⭐ REAL-TIME ASCII RENDERING (procedural chars in GLSL, GPU-parallel)

The freshest non-text showpiece. Turn any scene into live ASCII — and the key insight is the characters are **generated procedurally in the fragment shader on a 5×7 grid, no bitmap font.**

- Divide screen into cells, sample color at cell center, compute luminance `dot(cellColor.rgb, vec3(0.299, 0.587, 0.114))`, map dark→dense chars (`@ # 8`) / light→sparse (`. :` space).
- Each char is a tiny function returning 1.0/0.0 per grid cell (e.g. colon = filled at `grid.x==2 && (grid.y==2 || grid.y==4)`).
- **Fully GPU-parallel** because each cell is independent — this is why ASCII runs great while error-diffusion dithering doesn't (next section).

Live tool: <https://efecto.app/> · Writeup: [Codrops — Efecto, Jan 2026](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/). GPU ASCII library: [emilwidlund/ASCII (THREE.js ASCII on the GPU)](https://github.com/emilwidlund/ASCII).

### 2.2 ⭐ DITHERING — ordered (Bayer) is the GPU-correct one; error-diffusion is NOT

Critical performance distinction that separates people who know shaders from people who don't:

- **Ordered / Bayer dithering — GPU-parallel, use this in real time.** Compare pixel luminance to a threshold from a 4×4 Bayer matrix:
  ```
  1/16 * [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]]
  ```
  indexed by `int(uv.x*res.x)%4`, `int(uv.y*res.y)%4`. [Maxime Heckel — The Art of Dithering](https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/).
- **Blue-noise dithering — best-looking, still GPU-cheap.** Sample a 128px blue-noise texture `texture2D(uNoise, gl_FragCoord.xy/128.0)`; "less repetitive than ordered, less random than white noise." Same Heckel article. Blue noise also kills banding in raymarched scenes by offsetting each pixel's ray-march start.
- **Floyd-Steinberg / Atkinson / Jarvis (error-diffusion) — DO NOT run per-frame in a fragment shader.** They're "inherently sequential — each pixel depends on previously processed pixels," so they're CPU-bound. Use them for a *static* baked look, not a live post-pass. Weights: FS spreads 7/16,3/16,5/16,1/16; Atkinson spreads only 75% (crunchier, higher contrast); Jarvis spreads to 12 neighbors (smoother). [Codrops Efecto](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/).
- **Color quantization / posterize:** `floor(color * (n-1) + 0.5)/(n-1)` per channel. Pairs with dithering for the retro/console look.

The dithering shader by **Niccolò Fanton** was a breakout Codrops hit of 2025 ([Year in Review](https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/)).

### 2.3 ⭐ PIXEL-PATTERN / HALFTONE / "PHYSICAL TEXTURE" POST-FX (Maxime Heckel's catalog)

The deepest single source on post-processing-as-aesthetic. The two foundational moves: **(1) remap/distort UVs, (2) shape individual cells into patterns.** Core snippet:
```glsl
vec2 normalizedPixelSize = pixelSize / resolution;
vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
vec2 cellUV = fract(uv / normalizedPixelSize);  // sculpt inside each cell
```
From there: LED panels, **crochet/woven fabric**, **Lego bricks**, fluted/frosted glass, receipt-bar rendering, halftone dots, progressive depixelation, a pixelating mouse trail. Patterns built procedurally, via SDFs (circles/crosses/triangles), threshold matrices, or sampled ASCII textures — plus Blinn-Phong (`dot(normalize(normal), lightDir)`) to fake 3D lighting on flat cells. Live demos: `r3f.maximeheckel.com/{pixel-statue, crochet, lego, fluted-glass, pixel-loading}`. [Maxime Heckel — Post-Processing as a Creative Medium](https://blog.maximeheckel.com/posts/post-processing-as-a-creative-medium/). Built on `@react-three/postprocessing` (auto-merges effects into minimal passes via `EffectPass`).

Three.js stock examples for the baseline versions: [pixelation pass](https://threejs.org/examples/webgl_postprocessing_pixel.html), [RGB halftone](https://threejs.org/examples/webgl_postprocessing_rgb_halftone.html).

### 2.4 RAYMARCHING — SDF scenes, volumetric clouds, liquid metaballs

The "painting with math" school — no geometry, the whole scene is a distance function in the fragment shader.
- Foundations: [Maxime Heckel — Painting with Math: A Gentle Study of Raymarching](https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/).
- Volumetric: [Real-time Cloudscapes with Volumetric Raymarching](https://blog.maximeheckel.com/posts/real-time-cloudscapes-with-volumetric-raymarching/) (blue-noise to kill banding), [On Rendering the Sky, Sunsets, and Planets](https://blog.maximeheckel.com/posts/on-rendering-the-sky-sunsets-and-planets/).
- Liquid metaballs in TSL: [Codrops — Liquid Raymarching with TSL](https://tympanus.net/codrops/2024/07/15/how-to-create-a-liquid-raymarching-scene-using-three-js-shading-language/).
- Learn-the-craft canon: [thebookofshaders.com](https://thebookofshaders.com/) + [Shadertoy](https://www.shadertoy.com/) + Inigo Quilez's SDF articles (named as the reference set by Codrops Efecto).

**Performance:** raymarching is per-pixel-loop-expensive; it's the #1 thing to gate behind GPU tier + cap fragment cost. Great hero, dangerous if uncapped on mobile.

### 2.5 GPGPU PARTICLES — flow fields, curl noise, attractors

- **FBO/ping-pong (WebGL2):** simulate position+velocity in fragment shaders into swapped render targets. Curl-noise flow fields and attractor sims are the classic generative-art look. [Maxime Heckel — Magical World of Particles](https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/).
- **TSL compute (WebGPU):** the modern path; init/positioning/attractors run as compute kernels, no CPU readback. [Wawa Sensei — GPGPU with TSL](https://wawasensei.dev/courses/react-three-fiber/lessons/tsl-gpgpu), [Three.js Roadmap — Interactive Galaxy with WebGPU Compute](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders).

### 2.6 FEEDBACK / TRAIL / PING-PONG STATE (reaction-diffusion, fluid, trails)

Anything "stateful" — the frame remembers the last frame. Two textures swap each frame; a fragment shader reads previous state and writes next.
- **The technique, explained cleanly:** [Olha Stefanishyna — Stateful Rendering with the Ping-Pong Technique](https://ostefani.dev/tech-notes/ping-pong-technique).
- **Reaction-diffusion as a WebGPU compute shader (the modern way):** [Codrops — Reaction-Diffusion Compute Shader in WebGPU (May 2024)](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/).
- **Recursive trail / render-to-texture feedback:** [three.js forum showcase #89718](https://discourse.threejs.org/t/recursive-trail-ping-pong-three-js-render-to-texture-feedback/89718).
- **Editor that ships 16 ping-pong compute sims (reaction-diffusion, swarms w/ trails):** [ShaderVine writeup](https://meditations.metavert.io/p/shadervine-a-webgpu-shader-editor).

### 2.7 p5.js 2.0 generative typography (the creative-coding lane)

If a section wants the openProcessing/creative-coding flavor rather than the slick-agency flavor: **p5.js 2.0 (2025) added multilingual text, improved layout, immersive 3D text transforms, dynamic point-based typography, and variable-font experiments** — there was a dedicated [OpenProcessing community curation for exactly this in 2025](https://openprocessing.org/curation/89576). Particle-text reference sketches: [seek-behavior word formation](https://openprocessing.org/sketch/377231/), [generative type](https://openprocessing.org/sketch/161047/). p5 renders to canvas (not WebGL-heavy) — use for a deliberately "sketchy/handmade" interlude, not the perf-critical hero.

---

## PART 3 — THE OPTIMIZED / MODERN WAY (WebGPU + TSL vs classic GLSL)

**Production status, 2026:** WebGPURenderer has zero-config setup with **automatic WebGL2 fallback** since three r171; ~95% of users have WebGPU-capable browsers, the other ~5% get WebGL2 automatically. TSL (Three Shading Language) is a JS-native graph that compiles to **either WGSL (WebGPU) or GLSL ES 3.0 (WebGL)** — write once, target both.

| You're doing... | Use | Why / number |
|---|---|---|
| Porting existing GLSL, exotic WebGL2 feature, team GLSL-fluent | **classic `ShaderMaterial` (GLSL)** | No rewrite; some WebGL2 tricks have no TSL equivalent yet |
| Particles / physics / any compute-heavy sim | **WebGPU + TSL compute** | **10–100× over CPU; CPU particle updates bottleneck ~50k, WebGPU compute pushes to millions** |
| Want one codebase that survives API deprecation + type-safety/IDE | **TSL / NodeMaterial** | Compiles to both backends; type-safe, refactorable, PBR pipeline via `MeshStandardNodeMaterial` |
| Draw-call-heavy or compute-heavy scene migration | **WebGPU** | Field reports of **2–10×** in those scenes |

**The caveats are real:** TSL has doc gaps, a `sampler()` quirk for textures, `instanceIndex` context-dependence, and the WebGPU 9-vertex-attribute ceiling (the Gommage demo's 100/400 instance caps came straight from this). Budget extra dev time vs GLSL and keep the WebGL fallback path *tested, not assumed*.

Sources: [Maxime Heckel — Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/) · [utsubo — Migrate Three.js to WebGPU (2026) checklist](https://www.utsubo.com/blog/webgpu-threejs-migration-guide) · [Three.js Roadmap — WebGL vs WebGPU](https://threejsroadmap.com/blog/webgl-vs-webgpu-explained) · [LearnWithHasan — GLSL/ShaderMaterial/TSL guide r184](https://learnwithhasan.com/threejs-guide/shaders/).

**Verdict for Velkina:** Build the text hero on **WebGPU + TSL compute**. It is the exact "we're on the frontier" signal an AI-dev studio wants, the fallback is automatic, and the text-physics/text-particles effects above were literally authored on this stack.

---

## PART 4 — REFERENCE PORTFOLIOS / DEMOS TO STUDY (12, with the signature move)

Visit each and watch the interaction — the feel does not survive a text summary. Signature = the thing that makes people screenshot it.

1. **Patrick Heng** — <https://patrickheng.com/> — Awwwards SOTD WebGL experiments + UI animation; restrained, technical, French creative-dev house style. [Awwwards](https://www.awwwards.com/sites/patrick-heng-portfolio-1)
2. **Robin Payot** — Codrops spotlight: <https://tympanus.net/codrops/2025/06/12/developer-spotlight-robin-payot/> — built **Wind Waker.js**; teaches WebGL; HETIC-trained. Signature: game-grade WebGL worlds as portfolio.
3. **Roman Jean-Elie** — <https://www.romanjeanelie.com/> — **scroll-velocity vertex stretch** on text + FBO portal scenes + character-driven page transitions; film-director background shows in the pacing. [Breakdown](https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/)
4. **Justine Soulié** — every illustration is a **live WebGL scene that reacts to drag/scroll velocity** (built on OGL, not three) — "illustrations are the interface." [webgpu.com showcase](https://www.webgpu.com/showcase/justine-soulie-portfolio-webgl-illustrations/)
5. **Adrián Gubrica** — Codrops feature on his **illusion-driven, heavily-optimized WebGL worlds**: <https://tympanus.net/codrops/2025/12/05/from-illusions-to-optimization-the-creative-webgl-worlds-of-adrian-gubrica/> — signature: optical-illusion scene tricks done cheap.
6. **Xianyao Wei (Weisdevice)** — a **playable island with a robot, knobs, gameboy pad, switches** (three.js + GLSL + Howler audio + GSAP). Signature: tactile playable hero. (named in [Show-HN/portfolio search](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025))
7. **Jordan Breton** — **floating sky-island** with grass/waterfall/fire/wind/butterflies, FWA SOTD Oct 2025. Signature: a living diorama.
8. **Quentin Hocdé** — Codrops spotlight: <https://tympanus.net/codrops/2025/01/31/developer-spotlight-quentin-hocde/> — interactive/creative-dev craft, Brussels.
9. **Rogier de Boevé** — Codrops spotlight: <https://tympanus.net/codrops/2025/05/23/developer-spotlight-rogier-de-boeve/> — ex-Dogstudio/Immersive Garden polish.
10. **Jorge Toloza** — Codrops spotlight: <https://tympanus.net/codrops/2025/03/27/developer-spotlight-jorge-toloza/> — DDS Studio co-founder; narrative WebGL.
11. **Bruno Simon** — <https://bruno-simon.com/> — the playable-3D-car-world benchmark, now on the WebGPU/TSL path. Signature: the whole portfolio is a drivable toy. (Caveat: fun, but converts poorly as a *business* pitch — keep as inspiration, not template.)
12. **Exat by Studio Size** — <https://exat.hottype.co/> — the **variable-font-as-interface** reference (per-letter proximity weight morph). Best pure-type signature on this list.

**Aggregators to mine continuously:** [Codrops Developer Spotlight tag](https://tympanus.net/codrops/) · [Codrops typography tag](https://tympanus.net/codrops/tag/typography/) · [luruke/awesome-casestudy](https://github.com/luruke/awesome-casestudy) · [Awwwards Three.js](https://www.awwwards.com/websites/three-js/) / [WebGL](https://www.awwwards.com/websites/webgl/) · [terkelg/awesome-creative-coding](https://github.com/terkelg/awesome-creative-coding) · [Shadertoy](https://www.shadertoy.com/) · [OpenProcessing](https://openprocessing.org/).

---

## PART 5 — WHAT SEPARATES "STUDENT WHO BLEW UP" FROM GENERIC

Recurring decisions across every breakout portfolio above, stated as rules:

1. **One bespoke asset/system the tutorial-kit can't produce.** Roman's fold-effect, Justine's per-illustration WebGL scenes, Exat's proximity-type, Bruno's drivable car. The generic Three.js kit (tunnel + drifting particles + orbit-controls hero) is now AI-commoditized and reads as a template — the [three.js forum itself](https://discourse.threejs.org/t/is-ai-taking-over-the-visual-portfolio-side-of-three-js-what-domains-still-need-real-3d-engineering/91159) treats "smooth animations + particle effects + interactive scenes" as standardized. Differentiation = a handmade concept, not "having 3D."
2. **A personal point of view leaks into the tech.** Roman's cinema background → character-driven transitions; the effect serves a story, not the reverse. The blew-up portfolios are *about* their maker.
3. **Interaction reveals structure, not decoration.** Exat's own stated thesis: interaction exists "to reveal structure, range, and behavior, not to decorate the page." The cursor *does something meaningful* (morphs type, destroys text, reacts to velocity) — it isn't a parallax gimmick.
4. **Velocity, not position, drives the magic.** Roman (scroll-velocity stretch), Justine (drag/scroll velocity), Exat (scroll-speed sine numerals). Reacting to *how fast* the user moves feels alive in a way position-only never does.
5. **One committed post-process look.** Pick dither OR ASCII OR halftone OR a pixel-pattern and commit — Maxime Heckel's whole point is the look comes from *combining UV-remap + cell-shaping consistently*, not stacking ten effects.
6. **Restraint + craft over effect-stacking.** Confirmed across the award-portfolio file: "direction over decoration." The student who blew up made *one* thing exceptional, not five things mediocre.
7. **They ship the make-of.** Every name here has a Codrops writeup, a YouTube tutorial, or an open repo. Showing the craft IS the marketing — and proves it's handmade.

---

## SYNTHESIS

### Established (multiple primary sources agree)
- WebGPU + TSL is production-ready (auto WebGL2 fallback, ~95% coverage); compute shaders give **10–100×** on particles/physics. TSL compiles to both backends.
- Ordered/Bayer + blue-noise dithering are GPU-parallel and correct for real-time; **error-diffusion (Floyd-Steinberg/Atkinson/Jarvis) is sequential → not fragment-shader-friendly**, bake it instead.
- Post-process aesthetic = (1) remap UVs, (2) shape cells. ASCII chars can be generated procedurally in GLSL, fully GPU.
- SDF/MSDF text ≫ extruded geometry for performance; use geometry only when an effect needs real vertices.
- GSAP SplitText + MorphSVG went fully free in mid-2025.
- "Velocity-driven, interaction-reveals-structure, one bespoke asset" is the breakout pattern.

### Freshest moves to steal (ranked for Velkina)
1. **MSDF text → dust/petals dissolve** on the WebGPU/TSL compute path (Gommage) — the showpiece, hardest to clone.
2. **Cursor vertex-physics text destruction** (spring/friction compute) — text alive under the pointer.
3. **Variable-font proximity morph** (Exat) — cheapest high-impact, no WebGL needed; ideal for a secondary type section.
4. **One committed post-FX skin** — ordered/blue-noise dither OR procedural ASCII OR a Heckel pixel-pattern (crochet/LED/halftone) over the whole site.
5. **Scroll-velocity vertex stretch on type** (Roman Jean-Elie) — turns ordinary headings into kinetic type for near-free.
6. **Text-as-particles morph** between strings via TSL compute for a galaxy-of-letters moment.

### Most-performant-modern approach (the build call)
- **Hero:** WebGPU + TSL. Text-as-physics OR text-as-particles. Automatic WebGL2 fallback. Gate behind `useDetectGPU` + reduced-motion (per `r3f-tech-2026-06.md`).
- **Skin:** ONE post-process look via `@react-three/postprocessing` — ordered/blue-noise dither or procedural ASCII (both GPU-parallel, cheap). Never error-diffusion live.
- **Secondary type:** variable-font proximity/velocity morph (GSAP SplitText + `font-variation-settings`, no WebGL) — keeps the perf budget for the hero.
- **Never:** extruded geometry for large text bodies; error-diffusion dithering per-frame; effect-stacking with no concept; the generic tunnel+particles+orbit kit.

### What makes Velkina's portfolio jaw-dropping (opinionated)
Build **one** text-as-physics hero on WebGPU/TSL where the studio name (or a project title) **dissolves into dust/petals or shatters under the cursor and reforms** — and make it **velocity-reactive** (faster scroll/cursor = more violent destruction). Skin the entire site in **one** committed post-process look (recommend ordered/blue-noise dither for a technical, frontier, anti-cute feel that matches the graphite-canvas + single-accent direction in the award file). Use **variable-font proximity morph** for the case-study headings so type carries narrative without more 3D. Then **ship the make-of** — a Codrops-style writeup or repo of the hero shader — because for an AI-dev studio, proving it's handmade IS the pitch. Swap test: if the hero could be a downloaded three.js particle template, you defaulted; a velocity-reactive TSL text-physics system built in-pipeline makes that swap impossible.

---

## EVIDENCE QUALITY

- **Established / primary-deep:** Gommage, Text Destruction, Efecto, Exat, Heckel dithering + post-processing + TSL field guide, Roman Jean-Elie breakdown — each fetched directly, with function/uniform names and GitHub repos. Highest confidence.
- **Likely (2+ sources, some second-hand):** WebGPU coverage ~95% and the 10–100× / 2–10× figures come from utsubo + threejsroadmap + Heckel agreeing — directionally solid, but treat exact multipliers as order-of-magnitude, not benchmarked-on-your-scene.
- **Named-only (verify by visiting):** portfolios in Part 4 sourced via Codrops spotlights, webgpu.com, and a creativedevjobs roundup — the *names and award facts* are reliable; I did NOT interactively test each site, so per-site "signature move" notes for #6/#7 lean on one source.
- **Trend-claim-only (not technique):** the "variable fonts are now best practice / kinetic type is 2026" framing came from typography-trend articles used solely to establish the trend, never for how-to.

## CAVEATS / WHAT I COULDN'T VERIFY
- **I did not run any of this code or screenshot the live demos.** Function/uniform names are quoted from the writeups/repos, not from executing them — re-confirm against the actual repos at build time (especially the WebGPU 9-attribute ceiling and the `step(uProgress, ...)` mask, which are version-sensitive in TSL).
- **TSL is moving fast and under-documented.** The Gommage instance caps (100/400) and `sampler()`/`instanceIndex` quirks are real friction; budget extra time and keep the WebGL2 fallback genuinely tested.
- **Reddit/HN deep-cut sourcing was thin** — r/creativecoding and "Show HN portfolio" searches returned aggregators, not specific viral threads. The portfolio list is sourced via Codrops/Awwwards/webgpu.com instead, which is higher-trust but less "underground." If you want the truly-underground student tier, mine OpenProcessing curations and the three.js-forum Showcase board directly.
- **Knowledge-cutoff note:** my training cutoff is Jan 2026; the Apr 2026 Exat article and any post-Jan-2026 demos here are from live search, not training — they're current, but re-verify URLs before citing publicly in a pitch.

---

## SOURCES (credibility)

**Primary deep-dives (fetched, highest trust):**
- [Codrops — WebGPU Gommage: MSDF text → dust/petals (Jan 2026)](https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/) + [repo](https://github.com/WallabyMonochrome/WebGPU-clair-obscur-gommage-codrops) + [demo](https://tympanus.net/Tutorials/WebGPUGommage)
- [Codrops — Interactive Text Destruction, WebGPU+TSL (Jul 2025)](https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/) + [repo](https://github.com/armdz/tsl_elastic_vertex_destruction) + [demo](https://tympanus.net/Tutorials/InteractiveTextDestruction/)
- [Codrops — Efecto: real-time ASCII + dithering (Jan 2026)](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/) + [tool](https://efecto.app/)
- [Codrops — The Exat Microsite (Apr 2026)](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/) + [demo](https://exat.hottype.co/)
- [Codrops — Letting the Creative Process Shape a WebGL Portfolio / Roman Jean-Elie (Nov 2025)](https://tympanus.net/codrops/2025/11/27/letting-the-creative-process-shape-a-webgl-portfolio/) + [site](https://www.romanjeanelie.com/)
- [Maxime Heckel — The Art of Dithering and Retro Shading](https://blog.maximeheckel.com/posts/the-art-of-dithering-and-retro-shading-web/)
- [Maxime Heckel — Post-Processing as a Creative Medium](https://blog.maximeheckel.com/posts/post-processing-as-a-creative-medium/)
- [Maxime Heckel — Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/)

**Primary supporting (text + technique):**
- [Codrops — Responsive & SEO-friendly WebGL Text (troika)](https://tympanus.net/codrops/2025/06/05/how-to-create-responsive-and-seo-friendly-webgl-text/) + [demo](https://tympanus.net/Tutorials/AccessibleWebGLText/)
- [troika-three-text docs](https://protectwise.github.io/troika/troika-three-text/) · [countertype/three-text](https://github.com/countertype/three-text) · [harfbuzzjs #30 — robust WebGL text](https://github.com/harfbuzz/harfbuzzjs/discussions/30)
- [Codrops — Dreamy GPGPU Particles (Dec 2024)](https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/) + [repo](https://github.com/DGFX/codrops-dreamy-particles)
- [Three.js Journey — Particles Morphing Shader](https://threejs-journey.com/lessons/particles-morphing-shader) · [Wawa Sensei — GPGPU with TSL & WebGPU](https://wawasensei.dev/courses/react-three-fiber/lessons/tsl-gpgpu) · [three.js forum — gooey particles → MSDF text](https://discourse.threejs.org/t/help-with-morphing-gooey-particles-into-msdf-text-effect/76180)
- [Codrops — Reaction-Diffusion Compute Shader in WebGPU](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/) · [Olha Stefanishyna — Ping-Pong Technique](https://ostefani.dev/tech-notes/ping-pong-technique) · [three.js forum — recursive trail ping-pong](https://discourse.threejs.org/t/recursive-trail-ping-pong-three-js-render-to-texture-feedback/89718)
- [Maxime Heckel — Painting with Math: Raymarching](https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/) · [Volumetric Cloudscapes](https://blog.maximeheckel.com/posts/real-time-cloudscapes-with-volumetric-raymarching/) · [Codrops — Liquid Raymarching TSL](https://tympanus.net/codrops/2024/07/15/how-to-create-a-liquid-raymarching-scene-using-three-js-shading-language/)
- [Codrops — WebGL for Designers (Unicorn Studio: SDF/noise/depth/bloom/flow)](https://tympanus.net/codrops/2026/03/04/webgl-for-designers-creating-interactive-shader-driven-graphics-directly-in-the-browser/)
- [Codrops — Kinetic SVG Typography](https://tympanus.net/codrops/2023/01/31/bringing-letters-to-life-coding-a-kinetic-svg-typography-animation/) · [GSAP MorphSVG docs](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/) · [GSAP text-on-path pen](https://codepen.io/GreenSock/pen/VwjKPWV)
- [emilwidlund/ASCII — GPU ASCII for three.js](https://github.com/emilwidlund/ASCII) · [three.js pixelation example](https://threejs.org/examples/webgl_postprocessing_pixel.html) · [three.js RGB halftone example](https://threejs.org/examples/webgl_postprocessing_rgb_halftone.html)
- [OpenProcessing — p5.js 2.0 typography curation (2025)](https://openprocessing.org/curation/89576) · [particle-text seek sketch](https://openprocessing.org/sketch/377231/)

**Perf / WebGPU-vs-GLSL:**
- [utsubo — Migrate Three.js to WebGPU (2026)](https://www.utsubo.com/blog/webgpu-threejs-migration-guide) · [Three.js Roadmap — WebGL vs WebGPU](https://threejsroadmap.com/blog/webgl-vs-webgpu-explained) · [Three.js Roadmap — WebGPU compute galaxy](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders) · [LearnWithHasan — GLSL/ShaderMaterial/TSL r184](https://learnwithhasan.com/threejs-guide/shaders/)

**Portfolios / spotlights (verify by visiting):**
- [Patrick Heng](https://patrickheng.com/) · [Robin Payot spotlight](https://tympanus.net/codrops/2025/06/12/developer-spotlight-robin-payot/) · [Quentin Hocdé spotlight](https://tympanus.net/codrops/2025/01/31/developer-spotlight-quentin-hocde/) · [Rogier de Boevé spotlight](https://tympanus.net/codrops/2025/05/23/developer-spotlight-rogier-de-boeve/) · [Jorge Toloza spotlight](https://tympanus.net/codrops/2025/03/27/developer-spotlight-jorge-toloza/) · [Adrián Gubrica feature](https://tympanus.net/codrops/2025/12/05/from-illusions-to-optimization-the-creative-webgl-worlds-of-adrian-gubrica/) · [Justine Soulié showcase](https://www.webgpu.com/showcase/justine-soulie-portfolio-webgl-illustrations/) · [Bruno Simon](https://bruno-simon.com/)

**Indexes / canon:**
- [Codrops 2025 Year in Review](https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/) · [thebookofshaders.com](https://thebookofshaders.com/) · [Shadertoy](https://www.shadertoy.com/) · [terkelg/awesome-creative-coding](https://github.com/terkelg/awesome-creative-coding) · [luruke/awesome-casestudy](https://github.com/luruke/awesome-casestudy) · [three.js forum — is AI taking over the portfolio side?](https://discourse.threejs.org/t/is-ai-taking-over-the-visual-portfolio-side-of-three-js-what-domains-still-need-real-3d-engineering/91159)

**Trend-only (NOT technique sources):**
- [theinkorporated — typography trends 2026](https://www.theinkorporated.com/insights/future-of-typography/) (used only to establish variable-fonts-as-best-practice framing).
</content>
</invoke>
