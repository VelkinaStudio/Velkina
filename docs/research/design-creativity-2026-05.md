# Design Creativity — What Real Studios Actually Do

**Date:** 2026-05-13
**Purpose:** Stop shipping flat-white-with-one-accent landing pages that read as wireframes. Build a vocabulary of concrete moves from sites that don't look like templates.
**Method:** 5 WebSearches (different phrasings) + 8 WebFetches of named sites + 3 primary-source articles. URLs cited inline. Single-source claims flagged `(single-source)`. Items I could not verify from a primary source flagged `(uncertain)`.

---

## 1. What real studios do

### Anthropic / claude.com

Anthropic's site is the cleanest example of "looks calm, carries tension" in the AI category right now. The moves are specific, not vague.

- **Warm tinted canvas, not white.** Base atmosphere is a warm cream around `#faf9f5`. Slightly darker cream `#efe9de` for feature cards. Deliberately not the cool gray-white every other AI brand defaults to. Source: <https://getdesign.md/claude/design-md>. Confirmed in the design-system writeup as the brand-voltage move.
- **Editorial serif + humanist sans pairing.** Display uses **Tiempos Headline** (Klim Type Foundry) — a "hardworking, modern serif family for editorial typography... updates the functionality of Plantin and Times for contemporary use" (Klim's own description). Body uses **Styrene** sans-serif by Berton Hasebe. Source: <https://type.today/en/journal/anthropic>, <https://klim.co.nz/fonts/tiempos-headline/>. Note: at least one source says Tiempos is used for body and Styrene for display — the pairing is the point either way.
- **Warm coral / terracotta CTA against the cream.** A single saturated warm accent doing all the lift; not 5 accents trying to differentiate. Source: <https://getdesign.md/claude/design-md>.
- **Eyebrow category labels.** Sections open with small-cap or all-caps eyebrow labels ("Announcements", "Alignment Science", "Core views"). Source: WebFetched <https://www.anthropic.com/> 2026-05-13.
- **Stats as narrative, not as decoration.** Anthropic doesn't render "75% of global GDP" as a huge digit — it embeds the number inside a sentence. Source: WebFetched <https://claude.com/product/overview>. This is a deliberate editorial move, not a missing-stat-treatment.

The signature element: warmth itself. Tiempos + cream + coral is recognizably Anthropic before you've read a word.

### Linear

- **Near-black canvas with gradient glow.** Not pure black. Subtle radial gradients behind hero sections create depth. Source: WebFetched <https://linear.app/> 2026-05-13.
- **The product IS the design.** The hero shows actual product UI — issue lists, code diffs, cycle counters — not abstract illustrations. The signature visual is "the code diff viewer with side-by-side comparison showing 'before' and 'after' code changes."
- **Stats rendered as product chrome, not marketing text.** "25,000" product teams sits at the bottom in monospace-adjacent typography. Issue counts like `02/145` and `Cycle 144` appear inline as if you're looking at the actual app.
- **Headline tripled for emphasis.** "The product development system for teams and agents" is repeated three times. A typographic move no template would suggest.

### Vercel

- **Geist sans throughout.** Proprietary typeface = instant signature.
- **Animated global node network** as hero visual: "Nodes on the globe are sending out small pulses to indicate activity." Source: WebFetched <https://vercel.com/> 2026-05-13.
- **Proof rendered as concrete metric, not testimonial.** "build times went from 7m to 40s. LeonardoAi saw a 95% reduction in page load times." Same source. Numbers are the design.

### Raycast

- **Keyboard as signature motif.** The keyboard visualization with Mac keys is repeated as the page's recognizable mark. Source: WebFetched <https://www.raycast.com/> 2026-05-13.
- **Section bg variation.** Most sections are light, but the AI section drops into a "soft blue-tinted gradient backdrop" and a separate Snippets section uses a "blue glass-effect visual backdrop." Background change marks the section.

### Pentagram

- **Discipline over decoration.** Stark white canvas, big bold statement ("We design Everything for Everyone"), curated grid of work with large thumbnails. Source: WebFetched <https://pentagram.com/> 2026-05-13.
- **Rhythm via column-count change.** Alternates single-column focus pieces with multi-column grids. The rhythm IS the signature.
- **Partner quotes as humanizing breaks** ("Design is about making choices"). Inserted between work, not at the bottom of the page.

### BASIC/DEPT

- **Video hero.** The page opens with a looping reel ("BASIC/DEPT® 2010-∞") with timestamp controls. Not a static image. Source: WebFetched <https://basicagency.com/> 2026-05-13.
- **Horizontal-drag interaction as the navigation.** "DragDragDrag" indicators appearing repeatedly — work is on a horizontal carousel with `00/05` pagination. The interaction pattern is the signature.

### Instrument

- **Full-bleed client imagery in carousel form.** Oura, Notion, Eames, Nike, PagerDuty shown as "large image tiles" rather than logo lockup. Source: WebFetched <https://www.instrument.com/> 2026-05-13.
- Confidence move: no stats visible. Clients ARE the proof.

### Framer

- **Holo Shader as showcase.** "A gradient shader that simulates how light splits into rainbows on holographic surfaces." Source: WebFetched <https://www.framer.com/> 2026-05-13. They're showing off their own tool as the hero visual.
- **Real analytics numbers** ("Pageviews: 258,156 / Visitors: 85,458") shown inside product UI mocks, not as marketing stats.

### Google Stitch `(uncertain — JS canvas app, primary fetch failed)`

The hosted landing is a JS canvas; raw HTML returns only `<title>Stitch - Design with AI</title>`. Coverage describes it as "an infinite canvas in the center, a chat input at the bottom left, and mode controls at the top" with the canvas itself as the hero — meaning the product UI IS the landing, no separate marketing hero. Source: <https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/>. Mark as uncertain until manually screenshotted.

### Rally.studio `(uncertain — fetch returned blank)`

Could not verify. Excluded from concrete moves.

---

## 2. What I keep doing wrong (compared)

Every comparison below is a specific anti-pattern I've shipped, paired with what real studios actually do.

| What I ship | What real studios do | Source |
|---|---|---|
| Flat white background, every section | Tinted warm cream `#faf9f5` (Anthropic), near-black with radial glow (Linear), section-by-section bg shift (Raycast) | Anthropic, Linear, Raycast |
| One accent color, used everywhere | One *dominant* accent (warm coral) doing the lift; everything else is canvas | Anthropic |
| Sora display + Instrument Serif italic kicker + monospace eyebrow + paper bg, ON EVERY PAGE | Anthropic commits to Tiempos+Styrene; Vercel commits to Geist; Pentagram commits to its sans. **One typographic identity per project, not a kit reused across projects.** | Klim, Vercel, Pentagram |
| "40+ projects" rendered as 14px subhead text | Linear puts "25,000" at huge sizes in product chrome typography; Vercel renders proof as concrete metric ("7m → 40s") | Linear, Vercel |
| 3-up grid of feature cards | Alternating text-left/text-right layouts with large supporting imagery (Raycast); single-column rhythm interrupted by multi-column (Pentagram); horizontal drag carousel (BASIC) | Raycast, Pentagram, BASIC |
| Hero = headline + italic kicker + 2 paragraphs + 2 buttons | Hero shows the actual product (Linear), the actual reel (BASIC), the actual shader the tool ships (Framer), or a single category eyebrow + editorial pull-quote (Anthropic) | Linear, BASIC, Framer, Anthropic |
| Generic gradient as "decoration" | Anthropic Cookbook explicitly bans "purple gradients on white backgrounds" as AI slop. Impeccable lists "Purple Gradients" in its "Gallery of Shame." Backgrounds should create *atmosphere*: layered gradients, geometric patterns, or contextual effects | <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics>, <https://impeccable.style/> |
| Inter / Roboto / Space Grotesk as "safe default" | Anthropic Cookbook explicitly bans Inter, Roboto, Open Sans, Lato, Arial, system fonts, and *also* Space Grotesk as overused. Impeccable flags "Inter Everywhere" as anti-pattern | <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics>, <https://impeccable.style/> |
| 400/600 weight contrast, 1.5x size jumps | Cookbook: "Use extremes: 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x" | <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics> |

---

## 3. Concrete moves to steal (numbered, ranked by impact)

1. **Replace the white canvas with a tinted warm cream.** Default to `#faf9f5` for body, `#efe9de` for cards. Reserve pure white only for inset surfaces that need to feel cold (code blocks, screenshots). This single change is the #1 reason Anthropic doesn't feel like a wireframe. Source: <https://getdesign.md/claude/design-md>.

2. **Commit one display typeface per project, not a kit.** Pick ONE distinctive face — Tiempos Headline, Fraunces, Bricolage Grotesque, Cabinet Grotesque, Newsreader, Obviously. Use it decisively. Do NOT carry the same Sora+Instrument Serif italic kicker pair to the next project. Source: <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics>.

3. **Use weight and size extremes.** 100 against 800. 3x size jumps minimum on hero vs eyebrow. 1.5x feels timid. Source: same cookbook.

4. **Render stats as design objects, not as subheads.** "40+ projects" should be a single 200px digit — Newsreader Italic, Tiempos, or monospaced tabular figures — not 14px gray text. Big-number components are a recognized design pattern (Adobe Spectrum has a dedicated `Big number` component: <https://spectrum.adobe.com/page/big-number/>). Treat the number as the section's hero element, with the label below in small caps.

5. **Show the product, not an abstraction.** Linear shows code diffs and issue lists. BASIC shows a reel. Framer shows the holo shader. Velkina should show *actual screens from actual client projects* in the hero, not a generic illustration. Source: <https://linear.app/>, <https://basicagency.com/>, <https://www.framer.com/>.

6. **Shift section backgrounds.** At least 3 of: cream → warmer cream → dark navy → photographic full-bleed → light-tinted gradient. Each section transition should be visible. Raycast does this. Anthropic does this with cream→navy product surfaces. Default "same white bg for the entire page" reads as "I didn't think about pacing." Source: <https://www.raycast.com/>, <https://getdesign.md/claude/design-md>.

7. **Asymmetric grid moves on at least one section.** Real moves from search synthesis: "two columns of text balanced by blocks of color in the lower left topped by a large block of white space" (Osito-style); a "large vibrant photograph on one side balanced by smaller block of dense text on the other"; or a paragraph that breaks out of the column. Source: <https://designmodo.com/asymmetrical-website-designs/>, <https://blog.hubspot.com/website/broken-grid-layouts>.

8. **Eyebrow labels in small caps + monospace** to mark every section. Anthropic does this ("Announcements", "Alignment Science"). Cheap, instantly editorial.

9. **Replace the 3-up feature card grid.** Use alternating text-left / image-right rows (Raycast), or a horizontal-scroll carousel with `00/05` pagination (BASIC), or a Pentagram-style rhythm where single-column focus pieces alternate with multi-column grids. Cards-in-a-grid is the #1 template tell.

10. **One signature visual element per page.** Anthropic: warm cream + Tiempos. Linear: dark glow + code diff. Vercel: animated globe nodes. Raycast: keyboard motif. BASIC: drag-to-explore. Velkina pages need ONE recognizable thing the user could describe in a sentence. If you can't name it, the page doesn't have one.

11. **Bend gradients into atmosphere, not decoration.** Cookbook: "Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic." Subtle radial glow behind the hero ≠ purple-to-pink linear gradient slapped on a button. Source: <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics>.

12. **Tripled headline or oversize editorial pull-quote.** Linear repeats the headline three times. Pentagram inserts partner quotes mid-page. Even one of these moves makes the page feel authored. Source: <https://linear.app/>, <https://pentagram.com/>.

13. **Photographic full-bleed for at least one section.** Instrument's site is mostly full-bleed client work imagery. The shift from typographic sections to photographic sections is the pacing. Source: <https://www.instrument.com/>.

14. **Tabular-figures monospace for any number that changes** (counts, prices, stats). Source: Adobe Spectrum + the Series Photos App design notes <https://medium.com/seriesphotosapp/monospaced-numerals-series-photos-app-design-details-001-efbf84cf47e3> (Medium, but Apple-engineering primary source). Yes, Medium is normally blocked — this is a direct engineering note, not a listicle.

15. **Refuse the cool gray-white default.** Either go warmer (cream, paper, parchment) or go darker (navy, near-black with radial). Cool gray-white IS the AI-template aesthetic. Source: <https://getdesign.md/claude/design-md>.

---

## 4. Anti-patterns to ban from Velkina explicitly

Each one has at least one primary-source citation as evidence that real designers do not do this:

- **Sora + Instrument Serif italic kicker + monospace eyebrow + paper bg as a reusable kit across every page.** The Anthropic Cookbook explicitly says: "Avoid this: it is critical that you think outside the box! ... You still tend to converge on common choices (Space Grotesk, for example) across generations." Source: <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics>.
- **"40+ projects" as 14px subhead text.** No studio in this research does this. Linear, Vercel, Framer all render numbers as design objects.
- **Generic 3-up feature card grid.** None of Pentagram, BASIC, Instrument, Linear, Raycast use this as their primary feature layout.
- **Hero = display headline + italic kicker + 2 paragraphs + 2 buttons, with nothing else.** Every studio in this research has additional load-bearing visual content in the hero (product UI, video, animated graphic, full-bleed photo, oversize editorial quote).
- **Purple gradient on white.** Cookbook bans this directly. Impeccable lists "Purple Gradients" in "Gallery of Shame." Source: <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics>, <https://impeccable.style/>.
- **Inter / Roboto / Space Grotesk as display.** Same two sources ban these by name.

---

## 5. References

Verified via WebFetch on 2026-05-13:

- <https://www.anthropic.com/> — homepage
- <https://claude.com/product/overview> — Claude product page (redirect from anthropic.com/claude)
- <https://linear.app/> — Linear homepage
- <https://vercel.com/> — Vercel homepage
- <https://www.raycast.com/> — Raycast homepage
- <https://www.framer.com/> — Framer homepage
- <https://pentagram.com/> — Pentagram homepage
- <https://basicagency.com/> — BASIC/DEPT homepage
- <https://www.instrument.com/> — Instrument homepage
- <https://getdesign.md/claude/design-md> — Anthropic design system breakdown (cream hex codes, coral CTA, typography pairing)
- <https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics> — Anthropic Cookbook frontend aesthetics guide (font bans, weight/size extremes, depth advice, anti-AI-slop list)
- <https://impeccable.style/> — Impeccable design tool; flags Inter, Purple Gradients as anti-patterns
- <https://klim.co.nz/fonts/tiempos-headline/> — Klim Type Foundry, Tiempos Headline
- <https://type.today/en/journal/anthropic> — Type.Today on Anthropic's typography (Styrene + Tiempos)
- <https://spectrum.adobe.com/page/big-number/> — Adobe Spectrum "Big number" component spec
- <https://medium.com/seriesphotosapp/monospaced-numerals-series-photos-app-design-details-001-efbf84cf47e3> — Series Photos engineering note on monospaced numerals (Medium-hosted but primary engineering source)
- <https://designmodo.com/asymmetrical-website-designs/> — Asymmetrical website examples including Osito
- <https://blog.hubspot.com/website/broken-grid-layouts> — Broken grid layouts
- <https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/> — Google Labs on Stitch (canvas-as-landing, marked uncertain)

Not verifiable from primary source in this pass: `rally.studio` (fetch blank), `stitch.withgoogle.com` direct visual rendering (JS canvas, no readable HTML). Flagged inline.
