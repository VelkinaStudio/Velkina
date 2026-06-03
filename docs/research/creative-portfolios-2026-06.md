# Creative-Genius DUO Portfolio — Reference Research (2026-06)

**Date:** 2026-06-02
**For:** Velkina — Ömer + Baha, two young creative devs/designers. A portfolio that wins SOTD/FWA energy AND doubles as a designer master's-degree application + job site. Aesthetic target: Spider-Verse / Arcane painterly, bubbly glossy type, sci-fi / puzzle / music / Jane-Austen sensibility. Reference taste: clown3d.com (the user's own playful colorful 3D site), Childish Gambino, music.
**This is NOT an agency pitch.** No pricing, no "our services," no sales funnel. It ends human.
**Method:** 13+ WebSearches (varied phrasings) + WebFetches of Awwwards case studies, Codrops 2025 year-in-review + Ponpon Mania case study, and primary portfolios. URLs cited inline.
**Sibling files:** `award-portfolio-2026-06.md` (the *studio/agency* WebGPU-TSL angle — read it for tech stack, but its "self-as-demo-reel / pitch" framing is the WRONG register for THIS site). `design-creativity-2026-05.md` (type/canvas foundation — banned fonts, weight extremes). This file is the *narrative + personality + playful-3D-taste* layer.

---

## BOTTOM LINE

The portfolios that make people screenshot and say "this person is a genius" in 2024-2026 are NOT the ones with the most effects — they're the ones with **one committed world and a personal point of view carried through every pixel**. The single most on-brief reference for Velkina is **Ponpon Mania** by Patrick Heng + Justine Soulié — a real designer+developer DUO who built an interactive WebGL comic about a megalomaniac sheep who dreams of being a DJ, with **navigation that works like a music player (chapters = albums, panels = songs)** and selective color that blooms only at emotional peaks ([Codrops case study](https://tympanus.net/codrops/2025/10/07/ponpon-mania-how-webgl-and-gsap-bring-a-comic-sheeps-dream-to-life/)). That is the proof that painterly + music + narrative + duo can win SOTD. For the master's/job dual-use: spectacle gets the door open, but **process, captions, and a "why" behind one project** are what admissions and senior hirers actually read (Yale, Parsons, SVA all say this explicitly — see §6). Build a world; back it with substance.

---

## 1. REFERENCE PORTFOLIOS (with signature moves)

Ranked roughly by relevance to the Velkina brief (playful / illustrative / 3D / narrative first; minimalist craft last). Each: **URL · signature move · structure · what's reusable.**

### A — The most on-brief (illustrative / narrative / music / duo)

**1. Ponpon Mania — Patrick Heng (dev) + Justine Soulié (illustration/AD)** · https://www.awwwards.com/sites/ponpon-mania · case study: https://tympanus.net/codrops/2025/10/07/ponpon-mania-how-webgl-and-gsap-bring-a-comic-sheeps-dream-to-life/
- **Signature move:** an animated WebGL *comic* that breathes — a sheep dreaming of being a DJ. **Navigation IS a music player**: chapters behave like albums, each panel like a song. Color is mostly black-and-white and **blooms into full color only when Ponpon dreams of DJing** — color used as emotional punctuation, not decoration.
- **Structure:** linear scroll-narrative (a story, not a grid). Justine drew every scene in Illustrator; Patrick rebuilt them as WebGL scenes driven by GSAP timelines + ScrollTrigger. Hover/clickable elements invite exploration *without interrupting the story flow*.
- **Reusable for Velkina:** This is the literal proof-of-concept for "painterly illustration + music + duo." Steal: (1) **selective color** — desaturate the world, let your accent palette bloom only at the hero moment of each project; (2) **music-player navigation grammar** (chapters/tracks) for a music-loving duo; (3) **draw-then-rebuild-in-WebGL pipeline** so the 3D inherits a hand-made painterly soul instead of looking like default Three.js. Credit split (illustration vs. dev) is itself the duo's story.

**2. Aurel's Grand Theater** · referenced in Codrops 2025 year-in-review: https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/
- **Signature move:** the portfolio framed as a *theater* — theatrical motion and narrative sequencing, curtain-raise pacing "from design to code."
- **Reusable:** a **framing metaphor** (theater, here; a "puzzle box," a "graphic novel," a "record" for Velkina) gives a portfolio a spine. Pick ONE world-metaphor and let it govern transitions, section names, and the loader.

**3. Warhol Arts** · Codrops year-in-review (link above)
- **Signature move:** "Digital Playground of Pop, Pixels, and Pure Motion" — vibrant, kinetic pop-art language.
- **Reusable:** proof that **loud color + kinetic type can read as art-directed rather than childish** when committed to a single pop-art reference. The discipline is *one* reference world, fully committed.

**4. Cyd Stumpel** · https://cydstumpel.nl/ · SOTD: https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025
- **Signature move:** buttery **View Transitions + scroll-driven animations** — home→work-detail morphs where the project image flies into place; a refined periwinkle (#8082F8) on cream (#FFF5EE) two-color system. Won SOTD + Developer Award; she's an Awwwards juror, so this is "what the judges themselves build."
- **Structure:** name-as-hero (her name repeated big) → roles → work cards (with flip/"turn card" interactions) → "I'm a creative developer & teacher from Amsterdam" personality line → contact. The About page itself is a celebrated transition moment.
- **Reusable:** the **View Transitions API** is now the cheap-to-build, expensive-to-look way to get seamless home↔detail morphs without a heavy WebGL router. Two-color discipline. The flip-card as a tactile micro-interaction.

**5. Thibault Introvigne — "Space Gamefolio"** · https://www.thibault-introvigne.com/ · FWA SOTD Oct 2025
- **Signature move:** you **control a spaceman exploring a colorful 3D world**; 10 collectibles are scattered through the scene and each one unlocks a past job or a Three.js/R3F project. The portfolio IS the game.
- **Reusable:** the **collectible = project** mechanic is a brilliant way to make "browsing my work" feel like discovery instead of a résumé. For a puzzle-loving duo: collectibles could be *puzzle pieces* that assemble into the studio logo on completion. CAUTION: gamified portfolios bury content behind interaction — provide a "skip to work" escape hatch (see §4 Pitfalls).

**6. Martin Laxenaire '25** · https://www.martin-laxenaire.fr/ · case study: https://www.webgpu.com/showcase/martin-laxenaire-portfolio-webgpu-game-gpu-curtains/
- **Signature move:** the site is a **WebGPU video game on his own engine (gpu-curtains)**; content gates behind interaction. The genius touch is **personal-data toys**: one scene maps *all 174 invoices of his freelance career* as spheres; another turns his GitHub stats into a **confetti cannon**.
- **Reusable:** **turn your own data into the playground** — commits, all-nighters, songs listened to while coding, puzzles solved. This is the single best "a real human with a sense of humor made this" signal, and it's uniquely yours so it passes the swap test automatically.

**7. Henry Heffernan — 3D OS portfolio** · https://os.henryheffernan.com/ · main: https://henryheffernan.com/
- **Signature move:** a **fully interactive 3D recreation of a retro computer/OS** — you sit at a desk, the monitor boots a fake operating system, and his projects live *inside* the OS as apps/windows you open. Background as artist + game dev shows in the polish (camera controls, CRT video overlay).
- **Reusable:** the **diegetic container** (an object you operate that contains the work) is the most memorable portfolio archetype. For Velkina it could be a painterly **puzzle box / music console / illustrated desk** you manipulate. Note this is *very* high-effort; reserve for the hero, keep the rest fast.

**8. Bruno Simon** · https://bruno-simon.com/ · the canonical playable 3D portfolio
- **Signature move:** you **drive a toy car** around a low-poly 3D world to reach his projects; physics (Rapier/Cannon) make it genuinely fun. The reference every creative-dev portfolio is measured against.
- **Reusable:** the *bar* for "playable portfolio." Lesson for us: it works because the car physics are tight and the world is tiny and legible — **fun requires polish, not scope.** Don't ship a janky 3D world; a small perfect one beats a big loose one.

### B — Craft / motion / shader virtuosos (substance for the master's angle)

**9. Patrick Heng (personal site)** · https://patrickheng.com/ · SOTD: https://www.awwwards.com/sites/patrick-heng-portfolio-1
- **Signature move:** restrained WebGL experiments + UI animation; the *quiet* counterpart to his loud Ponpon work — shows range.
- **Reusable:** proves a creative can hold both a maximalist project (Ponpon) AND a disciplined personal site. For a duo, **one loud signature project + a calm frame around it** is the mature move.

**10. Maxime Heckel** · https://maximeheckel.com/ · blog: https://blog.maximeheckel.com/
- **Signature move:** the portfolio is a *shader research lab* — dithering, Moebius-style post-processing, raymarched clouds, volumetric effects, all hand-written GLSL/TSL, each documented in a deep interactive article.
- **Reusable:** the **"I can explain HOW" layer**. This is exactly what a master's committee wants (process, rigor, teaching ability). Velkina should pair the spectacle with 1-2 short "how we built it" notes — not a full blog, just enough to show the craft is real and not a template.

**11. Keita Yamada (p5aholic)** · https://p5aholic.me/
- **Signature move:** shader-driven animated background + **light/dark/monospaced viewing modes**, and a brutally honest **"Copycats" section** documenting six people who stole his code (with evidence).
- **Structure:** projects as a chronological gateway list (date · discipline · collaborator credits), trusting you to click out. Minimal self-promotion.
- **Reusable:** the **viewing-mode toggle** as a craft flex; **collaborator credits on every project** (great for a duo — show who did what); and the **personality-through-honesty** move (the Copycats page is more memorable than any animation).

**12. Jesper Landberg** · https://jesperlandberg.dev/ · FWA: https://thefwa.com/cases/jesper-landberg
- **Signature move:** silky scroll + cursor-following hover distortions on project thumbnails; he's the person whose *scroll/hover physics tutorials* the rest of the field copies.
- **Reusable:** the **hover-distortion thumbnail** (image warps/lags toward the cursor) is a high-ROI micro-interaction — small code, big "premium" read. Pairs with the painterly aesthetic if the distortion is subtle (think paint smear, not glitch).

**13. Olivier Larose** · https://blog.olivierlarose.com/
- **Signature move:** not a flashy site itself, but the **best open library of "recreate this Awwwards transition" tutorials** (Next.js + Framer Motion / GSAP): text-mask reveals, page transitions, sticky-scroll galleries.
- **Reusable:** the **build manual** for the transitions in this whole list. When we want a specific named effect, his tutorials are the fastest path. Cite for implementation, not inspiration.

### C — Personality-forward / experimental (mood references)

**14. Stas Bondar '25** · https://tympanus.net/codrops/2025/03/25/stas-bondar-25-the-code-techniques-behind-a-next-level-portfolio/
- **Signature move:** maximalist "next-level" portfolio with documented advanced animation architecture — the Codrops case study is a teardown of how a top-tier personal site is engineered.
- **Reusable:** read it as the **engineering blueprint** for a heavy site that still performs.

**15. Adrián Gubrica** · https://www.gubrica.com/ · https://www.awwwards.com/sites/adrian-gubrica
- **Signature move:** UI/UX designer-developer hybrid; clean 3D accents on a designer-grade layout — proof you can be *both* designer and dev without the site looking like a tech demo.
- **Reusable:** the **designer-first, 3D-second** balance is the right register for a master's application (committees are wary of pure tech-demo sites with no design thinking).

**16. Phantom.land** · Codrops year-in-review (link above)
- **Signature move:** interactive grid + **3D face particle system** (faces dissolve into particles and reform).
- **Reusable:** the **particle-portrait** is a tasteful way to put the two founders' faces on the site without a corny headshot grid — your faces, made of paint-flecks or puzzle pieces or musical notes.

**Also noted (not detailed):** Robin Payot (robinpayot.com — senior R3F freelance), Aristide Benoist (motion/interaction), Lorenzo Bocchi (lorenzobocchi.com), Bruno Arizio (brunoarizio.com), Daiki Fujita ("Abstract Feelings, Concrete Forms"), Clay Boan (GSAP 3D playground), Eloy Benoffi (brutalist/glitch Webflow). Sources: Codrops 2025 year-in-review + creativedevjobs roundup (https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025).

---

## 2. NARRATIVE BLUEPRINT FOR VELKINA

A creative-genius portfolio is a **story with a beginning, a middle, and a human ending** — not a homepage with sections. Here's the spine, synthesized from the references above (Ponpon's music-narrative, Aurel's theater framing, Cyd's morph-flow, Henry's diegetic container).

**The frame (pick ONE world-metaphor and commit):**
Given the brief (Spider-Verse painterly + puzzle + music + Jane-Austen + sci-fi), the strongest single frame is a **painterly graphic-novel / "issue"** OR a **puzzle-box that assembles as you scroll**. Either one lets two people each have a "character," lets music drive transitions, and gives projects a place to live. Do not mix three metaphors — that's the clutter line (§4).

**0. Loader (5-15s, earns trust):** Not a spinner. A painterly **ink-bleed or brush-stroke wipe**, or puzzle pieces snapping into the logo, or a needle dropping on a record. Show a real % only if load is long. The loader is the first proof a human made this. (Ref: Aimee's Papercraft loader, Ponpon's title-card entrance.)

**1. Open — the world, not the résumé.** First screen = your signature move at full volume: the painterly hero, the duo's two characters, the accent color blooming. NO nav-bar of links yet. Cyd opens with her name huge; Henry drops you at the desk; Ponpon opens on a title card. **One sentence of who you are** can sit here, but the *image* does the talking. The squint test: at 0.5s a stranger should feel "two artists who code," not "a dev template."

**2. The hook line (one human sentence).** Right after the hero: a single, specific, un-generic line. Not "we build immersive digital experiences." Something like "Two friends who make sci-fi, puzzles, and music — and occasionally a website." Voice = Childish Gambino / Jane Austen wit, not agency-speak. This line is doing the swap-test work.

**3. Work — as discovery, not a grid.** Each project is a *scene/track/issue*, revealed on scroll with the selective-color bloom (Ponpon). For each project, the genius portfolios always show: **(a) one hero visual that moves, (b) a one-line "what it is," (c) a tiny "how/why" you can expand** (this is the master's-application substance — see §6), (d) **credit split** ("Ömer: art direction · Baha: engine"). 3-6 projects max, curated hard. Quality of curation IS the portfolio. Half should be from the last 12 months (admissions rule, §6).

**4. A craft/process beat (the substance moment).** One short "how we built X" — a shader note, a sketch→final, a sound-design breakdown. Maxime Heckel and Keita Yamada both win on this. It signals the spectacle isn't a bought template. For the master's app this is the *most-read* part.

**5. The personality moment (the "about", reimagined).** NOT a corporate "About Us." This is where the duo becomes human: the two of you as illustrated characters, a "things we love" wall (Childish Gambino, Arcane, Austen, the specific puzzles), the **personal-data toy** (Laxenaire's invoices-as-spheres → your commits / songs / all-nighters as a playable visual). Inside jokes welcome. This is the screenshot moment.

**6. End human — not a sales CTA.** Close on warmth, not "Hire us / Get a quote." A hand-written sign-off, the two characters waving, an email written like a note ("say hi, send us a puzzle"), the playlist that scored the site, a credits roll like a film. **It ends like the last page of a graphic novel, not a contact form.**

**Cross-cutting:** the canvas/scene **persists between sections** (no white flash reloads) — this is the #1 thing separating award sites from template sites (Active Theory, Cyd's View Transitions, the Codrops persistent-canvas pattern in `award-portfolio-2026-06.md`).

---

## 3. PERSONALITY & CRAFT CHECKLIST

The small touches that read "a real creative made this with love." Pick 6-8 and execute them *perfectly*; do not do all of them (the toy line, §4).

- **Custom cursor with intent** — not just a dot. A paintbrush, a glowing orb that the painterly bloom follows, a cursor that distorts thumbnails toward it (Jesper Landberg's hover-warp). Must degrade gracefully on touch.
- **A loader that's a tiny film** — ink bleed / puzzle assembly / record drop (§2.0). Never a default spinner.
- **Selective-color reveal** — desaturated world, accent palette blooms on hover or at each project's emotional peak (Ponpon). The single highest-impact painterly move.
- **Hover-distortion thumbnails** — image lags/warps toward cursor (paint-smear, not glitch). High ROI, small code (Jesper Landberg / Olivier Larose tutorials).
- **Music-player navigation** — chapters/tracks instead of "Section 1, 2, 3" (Ponpon). On-brief for a music-loving duo.
- **A real easter egg** — Konami code, a hidden puzzle that unlocks a secret scene, a clickable object that plays a sound. Laxenaire's GitHub-confetti is this. Make it *yours* (a puzzle, since you love puzzles).
- **A characterful 404** — the duo's characters lost in the painterly world, "this page got snapped out of the Spider-Verse," a mini-game. 404s are free personality real estate; almost nobody does them well.
- **Viewing-mode toggle** — light/dark/"sketch mode" that shows the line-art under the paint (Keita Yamada). Doubles as a craft flex.
- **Collaborator/role credits on every project** — who did art, who did code (Keita Yamada). Essential for a duo; also reads as honest to hirers.
- **Personal-data toy** — your commits/songs/puzzles solved as an interactive visual (Laxenaire). The strongest "human with humor" signal.
- **Hand-drawn / imperfect elements** — a wobble in the underline, a hand-lettered sign-off, a doodle in the margin. Imperfection is the antidote to "AI-generated template" (the Aura Bora / Milkjar doodle balance, https://reallygooddesigns.com/3d-websites/).
- **Sound on micro-interactions** (see §5) — a soft note on hover, a page-turn on transition. Off by default, toggle to enable.

---

## 5. SOUND & MUSIC DONE WELL (since the user loves music)

The line between "immersive" and "annoying" is **consent and restraint**. Awwwards has a whole [Sound Design collection](https://www.awwwards.com/awwwards/collections/sound-design/) and a [Web Audio API / visualization collection](https://www.awwwards.com/awwwards/collections/web-audio-api-and-adio-visualization/) — patterns that win:

- **Always start muted; offer an obvious, beautiful toggle.** Autoplaying audio is an instant bounce (and an accessibility fail). The toggle itself can be a signature object (an equalizer that animates, a vinyl that spins when on).
- **Sound as punctuation, not soundtrack-by-default** — soft notes on hover, a page-turn/whoosh on transition, a chord when the puzzle completes. Subtle, short, low-volume. (Patatap is the canonical "every interaction is a sound" toy: https://www.awwwards.com/sites/arkade-london-audio-reactive-art for the audio-reactive-art reference.)
- **One audio-reactive hero, optional.** If music is core to the brand, let *one* scene react to a signature track — the painterly bloom pulsing to the beat, particles dancing. Gate it behind the sound-on toggle so it's a reward, not an ambush. (Web Audio API spatialization patterns: https://www.awwwards.com/sound-design-for-web-experiences.html.)
- **Tie it to the music-player frame (§2).** If navigation already reads as a music player (Ponpon), sound belongs there natively — each "track"/project can have its own short motif.
- **Respect `prefers-reduced-motion` and provide a global mute.** Senior hirers and committees often browse on mute in open offices; the site must be fully legible silent.

**Velkina move:** a vinyl/equalizer sound-toggle as a persistent signature object; soft brush/ink sounds on transitions; the playlist-that-scored-the-build as the literal ending (§2.6). Music as the *connective tissue* of the narrative, never the autoplay ambush.

---

## 4. PITFALLS — keeping playful-3D tasteful, not childish (the genius/toy line)

The references that *win* and the ones that read as "cluttered toy" differ on these axes:

- **ONE world, fully committed — not three.** Warhol Arts is pop-art *all the way through*; the amateur version mixes claymorphism + glitch + neon + paper in one scroll. **Pick one reference (Spider-Verse painterly) and let it govern everything.** Mixing metaphors is the #1 childish tell.
- **Restraint is what makes maximalism read as art.** Obys: "you can break the grid only if you understand it; distort typography only if you respect it" (`award-portfolio-2026-06.md`). The loud move works because *everything around it is disciplined*. One signature explosion per section, not constant noise.
- **Color discipline beats color quantity.** Ponpon is mostly black-and-white with color blooming at peaks — that's why the color *means* something. A site that's rainbow everywhere has no peaks. Desaturate the baseline; spend color like currency.
- **Glossy + handmade, together.** Reallygooddesigns notes the tasteful balance: "glossy 3D elements work in concert with illustration that has handmade, imperfect qualities" (https://reallygooddesigns.com/3d-websites/). Pure glossy = toy. Glossy *plus* a hand-drawn wobble = crafted. Keep one imperfect, human layer over the polish.
- **Don't bury the work behind the game.** Thibault/Bruno/Laxenaire gate content behind play — fun, but risky for a *master's/job* site where a tired admissions reviewer may not "play." **Always provide a "skip to work" / "list view" escape hatch.** Spectacle for the curious, substance one click away for the busy.
- **Performance is taste.** A janky 60→24fps 3D world reads as amateur instantly. Bruno Simon's car works because physics are *tight* and the world is *small*. **A small perfect world beats a big loose one.** Target 60fps; respect `prefers-reduced-motion`; lazy-load heavy scenes.
- **Animations as the star = case studies as the victim.** From the field (reallygooddesigns interactive roundup): "you risk making the animations the star rather than your actual case studies." The work must survive the spectacle being turned off.
- **Bubbly/glossy type needs a backbone.** One display face for the bubble/gloss personality, paired with a quiet, legible body face. Do NOT set body copy in the bubbly face. (Foundation rules: `design-creativity-2026-05.md` — banned default kits.)
- **The swap test, every screen.** If a generic template could replace the screen and nobody'd notice, it defaulted — redo it. The duo's specific loves (Austen, Arcane, the exact puzzles, the actual playlist) are the un-swappable material; lean on them.

---

## 6. WHAT ADMISSIONS COMMITTEES & SENIOR HIRERS ACTUALLY RESPOND TO

The site is dual-use (master's applications + jobs). Spectacle opens the door; **substance is what they grade.** From primary admissions sources:

- **A URL is supplemental, not the portfolio itself.** Parsons/SVA/RIT: "providing the URL is NOT a substitute for the portfolio requirements... reviewed when needed at the discretion of the committee" ([Parsons](https://www.newschool.edu/parsons/portfolio-requirements-graduate/), [SVA MFA Design](https://sva.edu/academics/graduate/mfa-design/apply)). **Implication:** the site is your *charisma layer*, but you still need a clean PDF/sequence of work. Build the site so individual projects are also exportable/linkable cleanly.
- **Process beats polish.** They want "iterative studies, sketches, photographs that show how you arrived at a solution" + "short text describing why, where, how you created it, and what you learned or questioned" ([Parsons](https://www.newschool.edu/parsons/portfolio-requirements-graduate/)). **→ This is exactly §2.4 (the craft beat) and §3 (per-project "how/why").** Show the sketch→paint→WebGL pipeline, not just the final.
- **Reflect deeply on ONE project.** Yale designates a single "representative work"; SVA asks you to "choose ONE project and reflect on how you use research, process, and critique" ([Yale](https://www.art.yale.edu/apply/graduate-admission/portfolio-requirements), [SVA](https://sva.edu/academics/graduate/mfa-design/apply)). **→ Velkina should have one flagship project with a real written reflection — the master's reviewer's primary read.**
- **Recency matters.** "At least half the works should be from the last twelve months; only work from the last three years" ([Parsons](https://www.newschool.edu/parsons/portfolio-requirements-graduate/)). **→ Curate for recent, not greatest-hits-from-2021.**
- **Legibility over density.** "The committee strongly prefers legible portfolios in which the work is not crowded" ([Parsons](https://www.newschool.edu/parsons/portfolio-requirements-graduate/)). **→ The escape-hatch list view (§4) and breathing room around each project directly serve this.**
- **Personally-driven, norm-challenging work is the goal.** "Of particular interest is work that is personally-driven and challenges norms of conventional professional practice" ([Parsons](https://www.newschool.edu/parsons/portfolio-requirements-graduate/)). **→ The Spider-Verse-painterly-music-puzzle identity IS the asset here. The personality moment (§2.5) is not fluff to a committee — it's evidence of a point of view, which is what they select for.**
- **A designer statement of intent.** SVA: a statement that "addresses your objectives and goals as a designer in the context of current issues in design practice" ([SVA](https://sva.edu/academics/graduate/mfa-design/apply)). **→ The hook line (§2.2) + personality moment should hint at this; the full statement lives in the application, but the site should be consistent with it.**

**For senior design hirers (jobs):** the same substance bias plus — they're checking *can this person ship and explain decisions*. The craft beat (§2.4) and role-credits (§3) answer "what did each of you actually do." The performance/escape-hatch discipline (§4) answers "do they understand users, or just effects." A genius-looking site with no process and no legible work reads to a senior as "junior who found a template" — the exact failure mode to avoid.

---

## SOURCES (with credibility notes)

**Primary (case studies / official / the makers themselves):**
- [Ponpon Mania — Codrops case study](https://tympanus.net/codrops/2025/10/07/ponpon-mania-how-webgl-and-gsap-bring-a-comic-sheeps-dream-to-life/) — primary, by the makers (Heng + Soulié). The keystone reference.
- [Ponpon Mania — Awwwards SOTD](https://www.awwwards.com/sites/ponpon-mania)
- [Codrops — 2025: A Very Special Year in Review](https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/) — primary curation; source for Aurel's Theater, Warhol Arts, Phantom.land, Laxenaire, Daiki Fujita, Clay Boan, etc.
- [Cyd Stumpel — SOTD (Awwwards, with jury scores)](https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025) · [her site](https://cydstumpel.nl/) — juror-built, View Transitions reference.
- [Martin Laxenaire — WebGPU game portfolio case study](https://www.webgpu.com/showcase/martin-laxenaire-portfolio-webgpu-game-gpu-curtains/) · [site](https://www.martin-laxenaire.fr/) — personal-data-toy reference.
- [Thibault Introvigne — Space Gamefolio](https://www.thibault-introvigne.com/) — FWA, collectible=project reference.
- [Henry Heffernan — 3D OS](https://os.henryheffernan.com/) · [main](https://henryheffernan.com/) — diegetic-container reference.
- [Bruno Simon](https://bruno-simon.com/) — the playable-portfolio benchmark.
- [Maxime Heckel](https://maximeheckel.com/) · [blog](https://blog.maximeheckel.com/) — shader-craft / "how" substance reference.
- [Keita Yamada / p5aholic](https://p5aholic.me/) — viewing-modes, credits, honesty (Copycats) reference.
- [Patrick Heng](https://patrickheng.com/) · [Jesper Landberg](https://jesperlandberg.dev/) ([FWA](https://thefwa.com/cases/jesper-landberg)) · [Adrián Gubrica](https://www.gubrica.com/) — craft/motion references.
- [Olivier Larose tutorials](https://blog.olivierlarose.com/) — implementation manual for the named transitions.
- [Stas Bondar '25 — Codrops teardown](https://tympanus.net/codrops/2025/03/25/stas-bondar-25-the-code-techniques-behind-a-next-level-portfolio/) — engineering blueprint.
- Admissions (PRIMARY, official): [Parsons graduate portfolio requirements](https://www.newschool.edu/parsons/portfolio-requirements-graduate/) · [Yale School of Art portfolio](https://www.art.yale.edu/apply/graduate-admission/portfolio-requirements) · [SVA MFA Design apply](https://sva.edu/academics/graduate/mfa-design/apply) · [RIT portfolio requirements](https://www.rit.edu/admissions/graduate/portfolio-requirements).
- Sound: [Awwwards Sound Design collection](https://www.awwwards.com/awwwards/collections/sound-design/) · [Web Audio API collection](https://www.awwwards.com/awwwards/collections/web-audio-api-and-adio-visualization/) · [Sound Design for Web Experiences](https://www.awwwards.com/sound-design-for-web-experiences.html) · [Arkade London audio-reactive SOTD](https://www.awwwards.com/sites/arkade-london-audio-reactive-art).

**Secondary (used for names/leads only, NOT technique claims):**
- [creativedevjobs — best Three.js portfolios 2026](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025) — roundup, surfaced WoraWork, Aimee's Papercraft, names cross-checked against Awwwards.
- [reallygooddesigns — 3D websites](https://reallygooddesigns.com/3d-websites/) · [interactive portfolios](https://reallygooddesigns.com/interactive-portfolio-examples/) — used for the glossy+handmade balance quote and Aura Bora / Milkjar doodle examples.

## CAVEATS / GAPS

- **JS-rendered sites can't be deep-fetched.** Most of these (Thibault, Cyd, p5aholic) are client-rendered WebGL; WebFetch returns only metadata. Descriptions of *those* sites lean on Awwwards/Codrops case-study text + the search-engine summaries, not a full DOM read. Before building, the team should **visit each live and screenshot** — treat this file as the shortlist, not a substitute for looking.
- **Spider-Verse/Arcane "painterly web" has no single canonical award site yet** — it's an aesthetic to *assemble* from Ponpon (narrative+selective color), Warhol Arts (committed pop world), and a draw-then-WebGL pipeline. That gap is an opportunity: nobody's nailed painterly-comic + music + duo on the web yet. That's the white space Velkina can own.
- **Admissions specifics vary by program.** The quotes are from Parsons/Yale/SVA/RIT (strong US design programs); a specific target school's exact rules must be checked on its own page before applying. The *direction* (process, recency, one deep reflection, legibility, personal point of view) is consistent across all of them.
- **clown3d.com not directly analyzed** (user's own reference) — assumed as the playful-colorful-3D baseline taste; the §4 taste-line guidance is written to keep that energy while clearing the master's/job bar.
