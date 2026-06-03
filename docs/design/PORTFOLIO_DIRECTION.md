# Velkina Portfolio — Spider-Verse World (build direction, 2026-06-02)

NOT an agency site. A creative-genius DUO portfolio (Ömer + Baha). No services/pricing/
"book a call". Ends human ("say hi"). Used for master's + jobs too. Rendered with our
own engine (Inkwell) — that's the flex.

## The world (locked with Nalba)
Spider-Verse / Arcane painterly comic: halftone (Ben-Day dots), chromatic mis-print,
ink outlines, animate-on-twos. Bubbly/glossy type (clown3d energy). Sci-fi + puzzles +
Jane Austen + music sensibility. Smooth, concepty, "these people are geniuses."

## Engine status: Inkwell WORKS (verified /lab/inkwell)
- `ComicEffect` (posterize+halftone, one pass) = the comic look. Best on LIT objects / lighter canvas.
- `Halftone` (cmyk/mono), `Posterize`, `InkOutline` (depth+luma Sobel), `Misregister` (radial), `on-twos` time.
- Mount the effect ONCE (no key-remount) to avoid the first-frame blank.

## Canvas decision (revised for the comic world)
The old "Terminal Black/Voltage" dark particle hero is the WRONG canvas for a painterly
comic look (halftone needs light/lit content). NEW canvas:
- **Paper/bone base** (#f3efe6-ish) like a comic page, OR a bold saturated comic sky.
- Saturated comic inks: a hero red/orange, electric blue, the lime as one accent.
- Glossy 3D type for the name. Halftone + ink-outline + mis-print over lit 3D.
- Grain + paper texture. Panel/gutter motifs (comic page structure) as a layout device.

## Section blueprint (narrative, not a homepage — per creative-portfolios research, Ponpon Mania north star)
1. **Loader / open on the world** — a tiny moment, comic panel assembling (puzzle pieces clicking = the puzzle love).
2. **Hero** — VELKINA as glossy comic 3D type, halftone+ink rendered, alive on twos. One human hook line (wit, Austen/Gambino flavour — NOT agency-speak).
3. **The work** — the 6 real pieces (3 clients + 3 products) as comic panels / discovery, each with real screenshot framed in a panel. Honest.
4. **The two of us** — Ömer + Baha as characters (illustrated/comic treatment, NOT stock photos). Personalities, the duo. A data/personality touch.
5. **The engine** — show Inkwell off (a live /lab-style comic playground embedded, or a credit "rendered with our own engine") = the genius flex.
6. **Say hi** — human ending. Email/WhatsApp/Cal as a warm sign-off, not a sales CTA. Maybe a playlist nod (music love).
- Persistent canvas, no white-flash reloads. "Skip to work" escape hatch (admissions reviewers won't play).

## Keep / reuse
- lib/content.ts (honest truth-map). SmoothScroll (Lenis+GSAP). Real screenshots in public/portfolio-screenshots.
- Inkwell engine. The /lab/inkwell harness.
## Replace
- The dark Terminal canvas + agency framing (services/pricing/process/book-a-call sections).

## Build incrementally, verify each live in browser (Browser 1). Don't claim done without a screenshot.
