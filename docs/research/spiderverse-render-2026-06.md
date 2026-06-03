# Spider-Verse / Arcane Render Pipeline on the Web — Engineering Spec (2026-06)

**Date:** 2026-06-02
**For:** Velkina's own reusable real-time render library — "3D that reads as ART, not AI slop."
**Stack target:** WebGL2 (`@react-three/postprocessing` / GLSL) primary, with TSL/WebGPU notes where it matters.
**Sibling files (assume them, don't repeat):**
- [`creative-rendering-2026-06.md`](./creative-rendering-2026-06.md) — text-as-physics, dithering, ASCII, post-FX-as-aesthetic, WebGPU/TSL field guide.
- [`r3f-tech-2026-06.md`](./r3f-tech-2026-06.md) — R3F/Next architecture, GPU-tier gating, scroll wiring.

**Method:** 11 WebSearches (varied phrasings) + 8 deep WebFetches of primary technical writeups (Maxime Heckel's blog ×2, Codrops sketchy-pencil tutorial, fxguide Spider-Verse production feature, lettier 3D-game-shaders, threejsroadmap, two GitHub Spider-Verse repos, threejs.org docs). Every formula below traces to a specific URL with the actual function/uniform names where the source gave them. Two sources are *production-history* (fxguide, garagefarm Blender) used to anchor intent; everything algorithmic traces to a shader source.

---

## BOTTOM LINE

The Spider-Verse / Arcane web look is **not one shader — it's a fixed-order post-process stack on top of a quantized (toon-banded) base render**, plus **selective stepped-time on character animation only**. The canonical pass order, confirmed by the most complete open implementation ([nmagarino/Spiderverse-Styled-Rendering](https://github.com/nmagarino/Spiderverse-Styled-Rendering)), is:

```
Base render (toon-banded lighting)
  → 1. Toon/posterize  (discretize luminance into N bands)
  → 2. Ben-Day / halftone dots  (dot radius from luminance, CMYK-rotated grids)
  → 3. Chromatic aberration  (radial RGB offset scaled by depth/distance-from-focus)
  → 4. Ink outline  (Sobel on normal+depth buffers, hand-jitter via noise UV displacement)
  → 5. Grain / paper texture  (overlay, last)
```

Arcane's painterly variant swaps the hard halftone for a **Kuwahara/anisotropic-Kuwahara painterly pass + paper/canvas overlay + cross-hatch in shadow bands** but keeps the same outline + posterize spine.

The single thing that makes this read as **art not slop**: the base render is *already stylized* (flat toon bands, exaggerated/non-photoreal), the post-stack is *coherent and ordered* (not stacked at random), and **character motion holds on twos while camera/FX stay smooth** — the temporal signature AI image-gen literally cannot fake.

---

## PASS 0 — BASE RENDER: TOON / POSTERIZE (do this BEFORE any post)

The Spider-Verse look starts at the material, not in post. The base scene is rendered with **discretized (banded) diffuse lighting** so that everything downstream (halftone, outline) has clean tonal regions to work with. Halftone-on-top-of-a-photoreal-render looks wrong; halftone on top of 3-5 flat bands looks printed.

### Diffuse banding (the core of cel/toon)
`NdotL = dot(normal, lightDir)` then quantize. Two idioms, both valid:

```glsl
// Hard floor banding — N discrete tones (use for crisp comic)
float bands = 4.0;
float toon = floor(NdotL * bands) / bands;

// smoothstep cut — single sharp light/shadow terminator (Spider-Verse "core shadow")
float lightIntensity = smoothstep(0.0, 0.01, NdotL * shadow);
```

The `smoothstep(0.0, 0.01, ...)` idiom is from Maya Ndljk's three.js toon shader — it gives the hard-edged terminator between lit and core-shadow. Full material also layers banded **specular** (`pow(NdotH * lightIntensity, 1000.0/uGlossiness)` then `smoothstep(0.05,0.1,...)`) and a **fresnel rim** (`rimDot = 1.0 - dot(viewDir, normal)`; `smoothstep(0.59,0.61, rimDot * pow(NdotL,0.2))`). Source GLSL: [maya-ndljk.com/blog/threejs-basic-toon-shader](https://www.maya-ndljk.com/blog/threejs-basic-toon-shader).

The Blender-node Spider-Verse recreations do the same with a `Shader to RGB → ColorRamp` to quantize tonal ranges into discrete steps ([garagefarm breakdown](https://garagefarm.net/blog/recreating-the-spider-verse-look-in-the-blender-node-editor)).

**As a post-pass instead** (when you can't touch materials): posterize in screen space —
```glsl
vec3 posterize(vec3 c, float n) { return floor(c * (n - 1.0) + 0.5) / (n - 1.0); }
```
(per-channel quantization; same formula used in the dithering work — see creative-rendering sibling). nmagarino's pipeline does exactly this as **post-pass #1: "Discretizes colors into 5 bands based on luminance."**

> **Why first:** every later pass keys off luminance/tone. Posterize first → halftone dots map to clean bands, outlines sit on clean color boundaries.

---

## PASS 1 — BEN-DAY / HALFTONE DOTS

### The math (single-channel, the 80% case)
Halftone is **"snap to cell, sample once, draw a dot whose radius encodes luminance."** Not drawing shapes — a *sampling strategy*.

```glsl
// 1. luminance (Rec. 709)
float luma = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));

// 2. build the grid: tile UV into cells of pixelSize
vec2 normalizedPixelSize = pixelSize / resolution;
vec2 cellUV  = fract(uv / normalizedPixelSize);      // 0..1 inside each cell
vec2 distToCenter = cellUV - 0.5;

// 3. dot radius from coverage — sqrt because dot AREA must scale linearly with ink
float coverage = 1.0 - luma;          // dark = more ink = bigger dot
float r = dotSize * sqrt(clamp(coverage, 0.0, 1.0));   // r = maxRadius * sqrt(coverage)

// 4. CRISP edge via fwidth (resolution-independent AA — DO use this, not a fixed epsilon)
float d  = length(distToCenter);
float aa = fwidth(d);
float dot = 1.0 - smoothstep(r - aa, r + aa, d);
```

**The two non-obvious bits that separate correct from amateur:**
- **`r = maxRadius * sqrt(coverage)`** — radius from the *square root* of coverage, because a dot's perceived ink is its *area* (πr²). Linear radius-from-luma posterizes the tone curve. (Maxime Heckel, *Shades of Halftone*.)
- **`fwidth()`-driven AA** — `aa = fwidth(d); smoothstep(r-aa, r+aa, d)` keeps dots crisp at any zoom and kills temporal shimmer. A hardcoded `smoothstep(r-0.01, r+0.01, d)` shimmers when the camera moves.

### CMYK rotation (the real Spider-Verse "printed" look, multi-channel)
To avoid the single-color flatness and get the authentic 4-color-print feel, run **four rotated grids**, one per CMYK channel, at the canonical print angles. Rotating each grid is what kills Moiré.

```glsl
mat2 rotate(float a){ float s=sin(a),c=cos(a); return mat2(c,-s,s,c); }

// canonical print angles (minimise Moiré):  C=15  M=75  Y=0  K=45  (degrees)
vec2 toGridUV(vec2 uv, float angleDeg){
  return rotate(radians(angleDeg)) * (uv * resolution) / pixelSize;
}
vec2 getCellCenterUV(vec2 uv, float angleDeg){
  vec2 g = toGridUV(uv, angleDeg);
  vec2 cellCenter = floor(g) + 0.5;
  vec2 screen = rotate(-radians(angleDeg)) * cellCenter * pixelSize;  // rotate back
  return screen / resolution;
}
float halftoneDot(vec2 uv, float angleDeg, float coverage){
  vec2 g = toGridUV(uv, angleDeg);
  vec2 distToCenter = fract(g) - 0.5;
  float r  = dotSize * sqrt(clamp(coverage, 0.0, 1.0));
  float d  = length(distToCenter);
  float aa = fwidth(d);
  return 1.0 - smoothstep(r - aa, r + aa, d);
}

vec4 RGBtoCMYK(vec3 c){
  float k = min(1.0 - c.r, min(1.0 - c.g, 1.0 - c.b));
  float ik = 1.0 - k;
  vec3 cmy = ik != 0.0 ? (1.0 - c - k) / ik : vec3(0.0);
  return clamp(vec4(cmy, k), 0.0, 1.0);
}

// compose: subtractive (start white, each channel SUBTRACTS its complementary)
vec3 outColor = vec3(1.0);
float dotC = halftoneDot(uv, 15.0, cmykC.x);   // sample tone at each channel's ROTATED cell center
float dotM = halftoneDot(uv, 75.0, cmykM.y);
float dotY = halftoneDot(uv,  0.0, cmykY.z);
float dotK = halftoneDot(uv, 45.0, cmykK.w);
outColor.r *= (1.0 - CYAN_STRENGTH    * dotC);
outColor.g *= (1.0 - MAGENTA_STRENGTH * dotM);
outColor.b *= (1.0 - YELLOW_STRENGTH  * dotY);
outColor   *= (1.0 - BLACK_STRENGTH   * dotK);
```

**Order of operations:** (1) for each channel, sample the source at *that channel's rotated cell center* (`getCellCenterUV`); (2) `RGBtoCMYK`; (3) compute each channel's dot mask on its own rotated grid; (4) subtractive multiply from a white baseline. Full code: [Maxime Heckel — *Shades of Halftone*](https://blog.maximeheckel.com/posts/shades-of-halftone/).

**Spider-Verse-specific touch:** nmagarino reports the printed-misregistration artifact is faked by *"offsetting the dots based on the color value"* — i.e. a small per-channel CMYK-driven positional jitter so the dots don't perfectly register, exactly the comic-misprint look. The film's own team used "a mixture of cross hatch inking and half-tone dots to add texture" over 4-color-print color (Danny Dimian / fxguide).

**Spider-Verse shadow-as-dots:** halftone is applied *on top of subtle toon shading* so the **dots appear in shadow/midtone and vanish in highlights** — driving `coverage` from the *banded shadow value*, not raw image luma. (threejs.org HalftoneShader note; Three.js Journey's halftone lesson teaches exactly this — paywalled, but the technique is the `coverage = 1 - shadowBand` substitution.)

**Reference repos:**
- [neftale99/halftone-shader](https://github.com/neftale99/halftone-shader) — standalone, explicitly "inspired by Spider-Man: Into the Spider-Verse."
- [nmagarino/Spiderverse-Styled-Rendering](https://github.com/nmagarino/Spiderverse-Styled-Rendering) — full pipeline; Ben-Day = "grid of adjustable size, draw dots within cells, radii increase in darker tones, vanish in lightest tones."
- Stock baseline: [three.js RGB halftone example](https://threejs.org/examples/webgl_postprocessing_rgb_halftone.html), [three.js HalftoneShader docs](https://threejs.org/docs/pages/module-HalftoneShader.html) (`HalftonePass`).

---

## PASS 2 — CHROMATIC ABERRATION (the "interpupillary" / misprint double-vision)

Spider-Verse explicitly **replaced depth-of-field with chromatic offset**: VFX sup Danny Dimian — *"sometimes in printing comic books, the color offsets were not aligned properly and this looked like the image was out of focus,"* so they "offset the image in a way that is similar to a misprinted comic book page" instead of lens blur ([fxguide](https://www.fxguide.com/fxfeatured/why-spider-verse-has-the-most-inventive-visuals-youll-see-this-year/)). **Key insight: the offset is NOT uniform — it scales with how far a region is from the focal plane.** Out-of-focus = more RGB split.

### Radial, focus-driven offset (the correct version)
```glsl
uniform vec2  focusPoint;     // screen-space focal point (or derive from focal DEPTH)
uniform float redOffset;      // e.g.  0.009
uniform float greenOffset;    // e.g.  0.006
uniform float blueOffset;     // e.g. -0.006

vec2 texCoord  = gl_FragCoord.xy / resolution;
vec2 direction = texCoord - focusPoint;        // radiates out from focal point

fragColor.r  = texture(tDiffuse, texCoord + direction * redOffset ).r;
fragColor.g  = texture(tDiffuse, texCoord + direction * greenOffset).g;
fragColor.ba = texture(tDiffuse, texCoord + direction * blueOffset ).ba;
```
Source: [lettier — 3D Game Shaders For Beginners / Chromatic Aberration](https://lettier.github.io/3d-game-shaders-for-beginners/chromatic-aberration.html). The `direction = texCoord - focusPoint` makes the split radiate outward and grow with distance from focus — exactly the comic-misprint defocus.

### Drive it by DEPTH (Spider-Verse's actual trick)
Replace the constant per-channel offset with one scaled by depth distance from the focal plane:
```glsl
float depth      = texture(tDepth, texCoord).r;        // linearised
float coc        = abs(depth - focalDepth) * aberrationStrength;  // "circle of confusion"
vec2  dir        = normalize(texCoord - 0.5);          // or screen-radial
fragColor.r = texture(tDiffuse, texCoord + dir * coc *  1.0).r;
fragColor.g = texture(tDiffuse, texCoord).g;
fragColor.b = texture(tDiffuse, texCoord + dir * coc * -1.0).b;
```
nmagarino's pipeline does precisely this: **"Chromatic Aberration — color separation scaled by camera distance."** That's the depth-driven, *not* uniform, version. Drive `aberrationStrength` up on motion for the speed-line/impact moments.

> **Why after halftone, before outline:** you want the dots to fringe (sells the print misregistration), but you do NOT want the crisp ink lines to fringe into mush — so outline comes *after* and is drawn last over the top. (nmagarino order: toon → dots → aberration → outline.)

three.js stock: [ChromaticAberrationNode (TSL)](https://threejs.org/docs/pages/ChromaticAberrationNode.html) for the WebGPU path. Community thread with gkjohnson's depth approach: [threejs forum #20044](https://discourse.threejs.org/t/chromatic-aberation/20044).

---

## PASS 3 — INK OUTLINE (variable-width, anti-aliased, hand-jittered)

Two competing methods. **For this library use the post-process Sobel-on-buffers method** (more control, interior lines, variable width); keep inverted-hull as a cheap fallback.

### Method A — Sobel on normal + depth buffers (USE THIS)
Render the scene's **normals** (and depth) into separate render targets, then Sobel-edge-detect them in a post pass. Edges in the **normal** buffer catch creases/interior lines; edges in the **depth** buffer catch silhouettes. Sampling both in an X around each pixel gives consistent outlines (nmagarino: *"both the normal and depth buffer… neighbouring pixels sampled in an X shape"*).

```glsl
// Sobel kernels
const mat3 Gx = mat3(-1,-2,-1, 0,0,0, 1,2,1);
const mat3 Gy = mat3(-1,0,1, -2,0,2, -1,0,1);

// per-sample value = weighted blend of diffuse-edge + normal-edge
float diffuseValue(int x,int y){ return valueAtPoint(tDiffuse, vUv, texel, vec2(x,y)) * 0.6; }
float normalValue (int x,int y){ return valueAtPoint(uNormals, vUv, texel, vec2(x,y)) * 0.3; }
float getValue    (int x,int y){ return diffuseValue(x,y) + normalValue(x,y); }

// convolve 3x3, combine gradients
float G = sqrt(valueGx*valueGx + valueGy*valueGy);

// line width + crispness
float line = smoothstep(0.01, 0.03, G);   // widen/narrow via this range
if (line > 0.1) gl_FragColor = lineColor;
```

**Variable-width, hand-drawn (NOT aliased) — the part that matters:** displace the *sampling UV* of the normal buffer by a noise texture before convolving. This wobbles the line like a brush stroke while the smoothstep keeps it AA'd:
```glsl
float n = clamp(texture(uTexture, vUv).r, 0.0, 50.0)/50.0 - 0.01;  // cloud/IQ-noise tex
return valueAtPoint(uNormals, vUv + n, texel, vec2(x,y)) * 0.3;     // displace, then sample
```
This *"displaces sampling coordinates rather than drawing positions, preserving smooth line quality while creating squiggled visual character."* Modulating the smoothstep threshold by the same noise gives **variable line weight** (thick-to-thin ink). Full GLSL + pass setup: [Codrops — Sketchy Pencil Effect with Three.js Post-Processing](https://tympanus.net/codrops/2022/11/29/sketchy-pencil-effect-with-three-js-post-processing/) (uniforms: `tDiffuse`, `uNormals`, `uTexture`, `uResolution`; pass: `RenderPass → PencilLinesPass → screen`). Normal buffer = re-render scene with `MeshNormalMaterial` into an `RGBA / HalfFloat / nearest` target.

Stock baseline: [three.js Sobel example](https://threejs.org/examples/webgl_postprocessing_sobel.html) (`SobelOperatorShader`), [threejs forum — edge detection with normal+depth #7929](https://discourse.threejs.org/t/edge-detection-with-normal-and-depth/7929). Tip from that thread: apply Sobel to the **depth** buffer to outline objects *without* outlining cast shadows.

### Method B — Inverted-hull (cheap silhouette fallback)
Vertex-shader push backfaces out along normals, render them flat dark, front faces normally:
```glsl
// in the OUTLINE material's vertex shader (rendered with side: BackSide)
vec3 inflated = position + normal * uOutlineWidth;
gl_Position = projectionMatrix * modelViewMatrix * vec4(inflated, 1.0);
```
Cheap, but: uniform width only, no interior lines, breaks on hard edges/non-watertight meshes. Maya Ndljk's tutorial covers the toon material but *not* inverted-hull — use Method A as the primary. (Confirmed: that tutorial has no backface-hull outline.)

> **Why outline is drawn near-last:** ink must sit cleanly on top of dots + aberration. If you halftone the outline it disintegrates; if you aberrate it, it doubles. Draw crisp ink over the printed/fringed color.

---

## PASS 4 — PAINTERLY (Arcane variant): KUWAHARA + PAPER + CROSS-HATCH

For the **Arcane oil/gouache** look instead of (or layered under) hard halftone. Replaces "printed dots" with "painted brush regions + canvas."

### Kuwahara filter (the painterly core)
Center a box on a pixel, split into **4 sectors** (8 for the circular/Papari version), compute **average color + variance** per sector, output the average of the **lowest-variance sector**. This flattens regions into brush-like patches while preserving edges.

```glsl
// per sector: accumulate color and color² → variance
// variance = (Σcolor²/n) - (avg*avg), then collapse to luma:
float variance = dot(varianceRGB, vec3(0.299, 0.587, 0.114));
// pick the sector with min variance, output its avgColor
```
Key functions (Maxime Heckel naming): `getSectorVarianceAndAverageColor(offset, boxSize, out avgColor, out variance)`; Papari circular version takes `(angle, radius, ...)`; weighting via `gaussianWeight(dist, sigma) = exp(-(d*d)/(2σ²))` or the faster `polynomialWeight(x,y,eta,lambda) = max(0, ((x+eta) - lambda*y*y)²)`.

### Anisotropic Kuwahara (the *good* Arcane look — but expensive)
Adapt the kernel to local edge direction via a **structure tensor** (Sobel-derived `Jxx, Jyy, Jxy`), then squeeze + rotate the sampling kernel along the dominant gradient — "like a real painter adapting brush flow." Function: `computeStructureTensor(inputTexture, uv)`. Source for both: [Maxime Heckel — *On Crafting Painterly Shaders*](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/). Library impls: [LYGIA `filter/kuwahara`](https://lygia.xyz/filter/kuwahara), Shadertoy [td3BzX](https://www.shadertoy.com/view/td3BzX) / [DtKczW](https://www.shadertoy.com/view/DtKczW).

> **Performance reality (verify, don't assume):** anisotropic Kuwahara uses nested loops and is described by multiple sources as *"not really meant for real time"* / *"can take seconds per frame."* For 60fps web: (a) run it at **half/quarter resolution**, (b) cap box radius small (3-4px), (c) prefer the **polynomial weight** over gaussian, (d) consider **baking** it for static hero backgrounds and only running live on the focal subject. This is the heaviest pass in the whole stack — gate it behind GPU tier.

### Paper / canvas + cross-hatch overlay
- **Paper/canvas:** sample a tiling paper-grain texture, overlay with `multiply` (or soft-light) at low opacity over the final composite — the cheapest, highest-impact "not-AI" tell. (Spider-Verse used hand-painted textures + paper feel per fxguide; garagefarm Blender does a texture overlay as the final composite layer.)
- **Cross-hatch in shadow bands:** in the *darkest* toon band only, multiply in 2-3 rotated line patterns (`step(0.5, fract((uv.x*cos θ + uv.y*sin θ) * freq))`) keyed to the band so hatching appears only in core shadow — Spider-Verse used "cross hatch inking" alongside dots (fxguide / Dimian).

---

## PASS 5 — GRAIN (always last)

Film/print grain or blue-noise overlay as the final pass unifies the whole frame into one "captured" image. Per-frame animated grain (`hash(uv + uTime)`) at very low amplitude (0.02-0.05). Keep it last so it dusts *everything* equally — that shared grain is what fuses the separate passes into one cohesive illustrated plate. (Blue-noise specifics in the dithering sibling file.)

---

## STEPPED TIME — "ANIMATE ON TWOS" (the temporal signature)

**This is the single most-overlooked, most-differentiating piece.** Spider-Verse animated **characters on twos (12fps) — sometimes threes — while camera and effects stayed smooth (24fps)**. Dimian: *"step down animation… sometimes it's two, sometimes it's on threes"* ([fxguide](https://www.fxguide.com/fxfeatured/why-spider-verse-has-the-most-inventive-visuals-youll-see-this-year/)). The hold-on-frames + smooth-background contrast is the look's heartbeat. AI image generators cannot reproduce a *deliberate, selective* temporal cadence — this is the un-fakeable handmade signal.

**No off-the-shelf "on-twos" helper exists** (confirmed: r/threejs, R3F docs, and the threejs forum have no built-in — you build it). Implementation patterns:

### Per-object quantized clock (R3F)
Quantize *only the character's* animation time; leave camera/FX on the real clock.
```js
// in useFrame — character on 12fps, world on 60fps
const FPS = 12;
useFrame((state) => {
  const t = state.clock.elapsedTime;
  const stepped = Math.floor(t * FPS) / FPS;        // hold each frame for 1/12s
  mixer.setTime(stepped);                            // drive the AnimationMixer with stepped time
  // camera, particles, post uniforms keep using the raw `t`
});
```
- Drive an `AnimationMixer` / morph targets / skeletal pose with `stepped`, not `t`.
- Per-object: give each character its own FPS (hero 12, secondary 8) for a layered cadence.
- **In a shader:** pass `uSteppedTime = floor(uTime * 12.0)/12.0` as a *separate uniform* from `uTime`, and use it only for the displacement/pose terms, never for camera or grain.
- **Easing inside the hold:** to avoid pure snap, some pipelines interpolate 80% then hold (smear), matching the film's "smear the geometry + speed lines" anti-strobe approach (fxguide).

Closest community references (no canonical repo — flagged as a GAP): R3F `useFrame` + `Math.floor(t*fps)/fps` quantization is the agreed pattern across [R3F basic-animations docs](https://r3f.docs.pmnd.rs/tutorials/basic-animations) and forum threads, but I found **no published Spider-Verse-style on-twos R3F demo** — this is original library territory for Velkina.

---

## COMPOSITING ORDER — THE FULL STACK (canonical)

Confirmed against [nmagarino/Spiderverse-Styled-Rendering](https://github.com/nmagarino/Spiderverse-Styled-Rendering) (toon → dots → aberration → outline) and the garagefarm Blender composite (contrast → ink modulo → subtract → mix → Freestyle lines on top):

```
[ Scene materials ]
  toon-banded lighting + banded spec + fresnel rim     ← PASS 0 (in-material, best)
        │
        ▼  (render to target; also render Normal + Depth targets for the outline pass)
1. POSTERIZE / TOON         discretize luminance → N bands (4–5)
2. HALFTONE / BEN-DAY       dot radius = dotSize*sqrt(1-luma); CMYK grids @15/75/0/45°
3. CHROMATIC ABERRATION     radial RGB offset scaled by depth-from-focus
4. INK OUTLINE              Sobel(normal+depth) + noise-UV jitter for variable hand line
   (+ Arcane variant: KUWAHARA painterly + cross-hatch in shadow band, replaces/under #2)
5. PAPER/CANVAS overlay     multiply low-opacity grain texture
6. GRAIN                    final animated blue-noise dust, unifies the frame
```

**Why this order is correct, not arbitrary:**
- **Posterize first** so dots/outlines key off clean tonal regions.
- **Dots before aberration** so the dots themselves fringe (sells misregistration).
- **Outline after aberration** so crisp ink isn't doubled/blurred.
- **Paper + grain last** so the texture dusts *everything* equally → one plate, not stacked layers.

---

## GLOSSY / BUBBLY 3D TYPE (the "clown3d" candy look)

For inflated, candy-gloss dimensional headlines. Three independent levers — combine them:

### 1. Geometry: real volume + inflation
- Use **extruded `TextGeometry` / drei `<Text3D>`** when you need true volume/bevel and per-vertex inflation (troika/MSDF stay flat — see creative-rendering sibling's text decision table). Cost: vertex-count bound; keep headlines short.
- **Inflate along normals** in the vertex shader for the puffy/balloon swell:
  ```glsl
  vec3 inflated = position + normal * uInflate;   // uInflate ~0.02–0.1
  // organic puff: + normal * noise(position*scale + uTime) * amp
  ```
  **Recompute normals after displacement** or lighting breaks (forum: [#16989](https://discourse.threejs.org/t/calculating-vertex-normals-after-displacement-in-the-vertex-shader/16989)). Source pattern: `newPosition = position + normal * displacement` ([Aerotwist shaders pt.2](https://aerotwist.com/tutorials/an-introduction-to-shaders-part-2/), [Three.js Journey — Modified Materials](https://threejs-journey.com/lessons/modified-materials) via `onBeforeCompile`).

### 2. Material: MatCap = instant candy gloss (cheapest, best ROI)
MatCap bakes light + material into a sphere texture; you fetch UVs from the **view-space normal**, getting expensive-looking gloss for ~free (no real lights).
```glsl
// matcap UV from view-space normal
vec3 n = normalize(viewNormal);
vec2 matcapUV = n.xy * 0.5 + 0.5;
vec3 col = texture2D(uMatcap, matcapUV).rgb;
```
Use `MeshMatcapMaterial` (drei) or roll the shader. Pick a glossy/wet matcap for the clown-candy look. Libraries: [nidorx/matcaps](https://github.com/nidorx/matcaps) (organized by color), [kchapelier/matcap-studio](https://github.com/kchapelier/matcap-studio) (tweak + add fresnel rim), [threejs matcap example](https://threejs.org/examples/webgl_materials_matcap.html). Explainer: [clicktorelease — spherical env mapping](https://www.clicktorelease.com/blog/creating-spherical-environment-mapping-shader.html).

### 3. Fresnel rim (the wet glossy edge-glow)
Add over matcap or PBR for the candy edge light:
```glsl
float fresnel = pow(1.0 - dot(viewDir, normal), uRimPower);   // rimPower ~2–5
vec3  rim     = fresnel * uRimIntensity * uRimColor;
gl_FragColor.rgb += rim;
```
Uniforms `uRimColor / uRimPower / uRimIntensity`. The fresnel inverts the view·normal dot so faces-on go dark, edges glow. Sources: [threejsroadmap — Rim Lighting Shader](https://threejsroadmap.com/blog/rim-lighting-shader), [otanodesignco/Fresnel-Shader-Material](https://github.com/otanodesignco/Fresnel-Shader-Material), [Maxime Heckel — Study of Shaders with R3F](https://blog.maximeheckel.com/posts/the-study-of-shaders-with-react-three-fiber/).

### 4. PBR alternative (most physically glossy)
`MeshPhysicalMaterial` with high `clearcoat` + low `clearcoatRoughness` for the wet-candy coat; or `MeshTransmissionMaterial` (drei) for the jelly/gummy translucent version ([Codrops — glass & plastic in three.js](https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js/)). Heavier than matcap; use when the type is the hero, matcap for everything else.

**Recommendation for the library:** `<Text3D>` + normal-inflation vertex shader + glossy **MatCap** + **fresnel rim** is the best gloss-per-millisecond combo. Reserve `MeshTransmissionMaterial` for one hero word.

---

## PERFORMANCE — KEEPING THE STACK AT 60FPS

**1. Merge passes into one fragment shader.** `@react-three/postprocessing`'s `EffectPass` **bakes multiple `Effect`s into a single shader**, "minimizing render operations" and rendering with a **single fullscreen triangle** (not a quad — avoids redundant fragments on the diagonal). Author posterize+halftone+aberration+grain as `Effect` instances so they compile into ONE pass. Caveat: toggling an effect at runtime forces a **shader recompile** (stutter) — pre-bake the variants you need. Source: [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing), [react-postprocessing docs](https://react-postprocessing.docs.pmnd.rs/).

**2. Half-res buffers for expensive passes.** Halftone, Kuwahara, and aberration tolerate half/quarter-resolution render targets — the dots/brush patches are large relative to a pixel, so downsampling is nearly invisible and ~4× cheaper. Outline + final grain stay full-res for crispness. (Standard post-FX practice; the dots' cell size >> pixel, so half-res is free visually.)

**3. Sobel outline needs Normal + Depth targets** — render those once with `MeshNormalMaterial` override + depth, not per-pass. `HalfFloat / nearest` filtering. Reuse the depth target for aberration too (one depth render feeds both).

**4. Kuwahara is the budget killer.** Half-res + small radius + polynomial weight, or **bake static backgrounds** and only run it live on the focal subject. Multiple sources flag anisotropic Kuwahara as *not real-time-safe at full res* — measure FPS with a Chrome DevTools trace, don't assume.

**5. Bake what doesn't move.** Static hero backdrops → render the full stack once to a texture. Only the animated character + camera-reactive aberration need the live stack. (Spider-Verse-style: world is mostly held, character moves.)

**6. Gate by GPU tier + reduced-motion.** Per `r3f-tech-2026-06.md`: `useDetectGPU` → drop Kuwahara → halftone-only → flat toon on low tier; respect `prefers-reduced-motion` (also freeze the on-twos stepping there).

**7. WebGPU/TSL path:** the same stack ports to TSL (`ChromaticAberrationNode` exists stock); Kuwahara as a TSL/WebGPU **compute** pass is the real unlock for full-res painterly at 60fps — flagged as build-time R&D (no published web demo found yet).

---

## REFERENCE REPOS / SOURCES TO STUDY (build-time)

| Repo / source | What it gives you |
|---|---|
| [nmagarino/Spiderverse-Styled-Rendering](https://github.com/nmagarino/Spiderverse-Styled-Rendering) | **Canonical full pipeline** — toon(5 bands)→Ben-Day→aberration(depth-scaled)→outline(normal+depth, X-sample). UE `.usf` but the algorithm ports 1:1. |
| [neftale99/halftone-shader](https://github.com/neftale99/halftone-shader) | Standalone Spider-Verse halftone, three.js. |
| [Codrops — Sketchy Pencil Effect](https://tympanus.net/codrops/2022/11/29/sketchy-pencil-effect-with-three-js-post-processing/) | **Outline pass** full GLSL — Sobel on diffuse+normal, noise-UV jitter for hand lines. |
| [Maxime Heckel — Shades of Halftone](https://blog.maximeheckel.com/posts/shades-of-halftone/) | **Full CMYK halftone GLSL** — rotation matrix, RGBtoCMYK, sqrt-coverage, subtractive compose. |
| [Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) | **Kuwahara + anisotropic** — sectors, variance, structure tensor, weight fns. |
| [maya-ndljk.com — three.js toon shader](https://www.maya-ndljk.com/blog/threejs-basic-toon-shader) | **Toon base material GLSL** — banded diffuse, banded spec, fresnel rim, shadow. |
| [lettier — Chromatic Aberration](https://lettier.github.io/3d-game-shaders-for-beginners/chromatic-aberration.html) | **Radial focus-driven RGB offset** GLSL. |
| [threejsroadmap — Rim Lighting](https://threejsroadmap.com/blog/rim-lighting-shader) + [otanodesignco/Fresnel-Shader-Material](https://github.com/otanodesignco/Fresnel-Shader-Material) | **Fresnel rim** for glossy type. |
| [LYGIA filter/kuwahara](https://lygia.xyz/filter/kuwahara) · [Shadertoy td3BzX](https://www.shadertoy.com/view/td3BzX) / [DtKczW](https://www.shadertoy.com/view/DtKczW) | Drop-in Kuwahara variants. |
| [three.js Sobel](https://threejs.org/examples/webgl_postprocessing_sobel.html) · [RGB halftone](https://threejs.org/examples/webgl_postprocessing_rgb_halftone.html) · [HalftoneShader docs](https://threejs.org/docs/pages/module-HalftoneShader.html) | Stock baselines to fork. |
| [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) | `EffectPass` auto-merge — the perf backbone. |

**Production-history anchors (intent, not code):** [fxguide — Why Spider-Verse has the most inventive visuals](https://www.fxguide.com/fxfeatured/why-spider-verse-has-the-most-inventive-visuals-youll-see-this-year/) (Dimian on chromatic-misprint focus, on-twos, hand-drawn FX, cross-hatch+dots), [Sony Imageworks Spider-Verse page](https://www.imageworks.com/our-craft/feature-animation/movies/spider-man-spider-verse), [garagefarm — Spider-Verse in Blender nodes](https://garagefarm.net/blog/recreating-the-spider-verse-look-in-the-blender-node-editor) (node-level compositing order).

---

## EVIDENCE QUALITY

- **Established (primary shader source, code quoted):** halftone CMYK (Heckel), chromatic aberration radial+depth (lettier + nmagarino), Sobel outline + noise jitter (Codrops sketchy-pencil), toon banding + fresnel rim (maya-ndljk), Kuwahara basic+structure-tensor (Heckel), full 4-pass order (nmagarino README), `EffectPass` merge + single-triangle (pmndrs). High confidence — each fetched, function/uniform names quoted.
- **Established (production history):** Spider-Verse used chromatic-misprint instead of DoF, dots + cross-hatch, on-twos/threes, hand-drawn smoke/sparks — Danny Dimian via fxguide, corroborated by Sony Imageworks + befores&afters. Confirms *intent + cadence*, not web code.
- **Likely:** "shadow-as-dots" (coverage from banded shadow not raw luma) — stated by threejs HalftoneShader note + Three.js Journey lesson framing; the paywalled lesson means I quote the *technique*, not its exact paywalled GLSL.
- **Gap:** **No published Spider-Verse-style on-twos R3F/three.js demo exists** — the `Math.floor(t*fps)/fps` per-object quantization is the agreed-correct pattern (R3F docs + forum) but assembling selective on-twos for characters-only is original library work. Anisotropic Kuwahara real-time-at-full-res on web is unproven (sources say "not real-time"); the WebGPU-compute path to fix that is R&D, not a cited demo.

## CAVEATS / WHAT I DID NOT VERIFY

- **I executed none of this code and screenshotted no demo.** All GLSL is quoted from the writeups/repos — re-confirm against the actual repos at build time (especially Heckel's CMYK `getCellCenterUV` rotate-back step and the sketchy-pencil `0.6/0.3` diffuse/normal weights, which are taste-tunable).
- **nmagarino is Unreal (`.usf`), not three.js** — the algorithm and pass order port directly, but there's no drop-in three.js file there; you reimplement.
- **Three.js Journey halftone lesson is paywalled** ($95) — I have the surrounding technique (halftone-over-toon-shadow) from free framing + Heckel's free equivalent, but not Bruno Simon's exact lesson GLSL. If buying the course, that lesson is the single best "halftone tied to lighting bands" reference.
- **Kuwahara perf claims** ("seconds per frame at full res", "not real-time") come from ReShade/Shadertoy commentary + Heckel — directionally reliable, but YOUR fps depends on radius/resolution/GPU; **measure with a Chrome DevTools performance trace before committing it to a live hero** (per visual-work-discipline). Half-res + bake-static is the safe default.
- **Knowledge cutoff Jan 2026** — fxguide/Imageworks/Heckel/Codrops pages here are from live search and current; the production facts are stable history. Re-verify any URL before quoting in a public pitch.

## SOURCES (credibility)

**Primary shader code (fetched, highest trust):**
- [Maxime Heckel — Shades of Halftone](https://blog.maximeheckel.com/posts/shades-of-halftone/) — full CMYK halftone GLSL. Senior creative-dev, primary.
- [Maxime Heckel — On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/) — Kuwahara/anisotropic, structure tensor.
- [Codrops — Sketchy Pencil Effect with Three.js Post-Processing](https://tympanus.net/codrops/2022/11/29/sketchy-pencil-effect-with-three-js-post-processing/) — Sobel normal+depth outline, hand-jitter.
- [maya-ndljk.com — Custom Toon Shader in Three.js](https://www.maya-ndljk.com/blog/threejs-basic-toon-shader) — toon base GLSL.
- [lettier — 3D Game Shaders / Chromatic Aberration](https://lettier.github.io/3d-game-shaders-for-beginners/chromatic-aberration.html) — radial focus offset.
- [threejsroadmap — Rim Lighting Shader](https://threejsroadmap.com/blog/rim-lighting-shader) — fresnel rim.

**Reference implementations (repos):**
- [nmagarino/Spiderverse-Styled-Rendering](https://github.com/nmagarino/Spiderverse-Styled-Rendering) — canonical 4-pass pipeline + README technical description.
- [neftale99/halftone-shader](https://github.com/neftale99/halftone-shader) — three.js Spider-Verse halftone.
- [otanodesignco/Fresnel-Shader-Material](https://github.com/otanodesignco/Fresnel-Shader-Material) · [nidorx/matcaps](https://github.com/nidorx/matcaps) · [kchapelier/matcap-studio](https://github.com/kchapelier/matcap-studio) — glossy type.
- [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) + [react-postprocessing](https://react-postprocessing.docs.pmnd.rs/) — EffectPass merge.
- [LYGIA filter/kuwahara](https://lygia.xyz/filter/kuwahara) · [Shadertoy td3BzX](https://www.shadertoy.com/view/td3BzX) · [Shadertoy DtKczW](https://www.shadertoy.com/view/DtKczW).

**three.js stock / docs:**
- [Sobel example](https://threejs.org/examples/webgl_postprocessing_sobel.html) · [RGB halftone example](https://threejs.org/examples/webgl_postprocessing_rgb_halftone.html) · [HalftoneShader docs](https://threejs.org/docs/pages/module-HalftoneShader.html) · [ChromaticAberrationNode (TSL)](https://threejs.org/docs/pages/ChromaticAberrationNode.html) · [matcap example](https://threejs.org/examples/webgl_materials_matcap.html)
- [threejs forum — edge detection normal+depth #7929](https://discourse.threejs.org/t/edge-detection-with-normal-and-depth/7929) · [chromatic aberration #20044](https://discourse.threejs.org/t/chromatic-aberation/20044) · [vertex normals after displacement #16989](https://discourse.threejs.org/t/calculating-vertex-normals-after-displacement-in-the-vertex-shader/16989)
- [R3F basic-animations docs](https://r3f.docs.pmnd.rs/tutorials/basic-animations) (on-twos pattern basis)

**Production history (intent/cadence, not code):**
- [fxguide — Why Spider-Verse has the most inventive visuals](https://www.fxguide.com/fxfeatured/why-spider-verse-has-the-most-inventive-visuals-youll-see-this-year/) — Danny Dimian, primary VFX-press.
- [Sony Pictures Imageworks — Spider-Verse](https://www.imageworks.com/our-craft/feature-animation/movies/spider-man-spider-verse) · [befores & afters — Across the Spider-Verse VFX breakdown](https://beforesandafters.com/2024/02/21/watch-the-brand-new-vfx-breakdown-for-spider-man-across-the-spider-verse-from-imageworks/) · [garagefarm — Spider-Verse in Blender nodes](https://garagefarm.net/blog/recreating-the-spider-verse-look-in-the-blender-node-editor)

**Painterly/Arcane reference (secondary, technique-corroborating):** [LYGIA](https://lygia.xyz/filter/kuwahara) + Shadertoy impls + [Godot Kuwahara shader](https://godotshaders.com/shader/kuwahara-shader/).
</content>
</invoke>
