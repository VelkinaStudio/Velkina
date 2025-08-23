---
description: Continue the Velkina Windsurf project (tokens, global scripts, components, CMS, animations, QA, deploy)
---

# Goal
Ship the Velkina site in Windsurf (No‑Code) with retro‑futuristic neon design, smooth animations, CMS, and great performance.

# Prereqs
- Use Heroicons for all icons (outline default; solid on active).
- Brand palette and typography per Velkina design system.

# Steps

1) Global Styles: Tokens
- Open global CSS/styles.
- Paste the CSS variables:

```css
:root {
  --vk-bg: #0D0D0D;
  --vk-cyan: #00FFFF;
  --vk-pink: #FF00CC;
  --vk-mint: #99FFCC;
  --vk-text: #F1F1F1;
  --vk-purple: #A259FF;

  --vk-radius-xs: 8px;
  --vk-radius-sm: 14px;
  --vk-radius-md: 20px;
  --vk-radius-lg: 28px;
  --vk-radius-xl: 40px;

  --vk-shadow-soft: 0 10px 30px rgba(162,89,255,0.15);
  --vk-shadow-strong: 0 20px 60px rgba(0,255,255,0.25);
  --vk-shadow-inset: inset 0 1px 0 rgba(255,255,255,0.06);

  --vk-glow-cyan: drop-shadow(0 0 12px rgba(0,255,255,0.6));
  --vk-glow-pink: drop-shadow(0 0 12px rgba(255,0,204,0.6));
  --vk-glass: rgba(255,255,255,0.06);

  --vk-space-1: 4px; --vk-space-2: 8px; --vk-space-3: 12px;
  --vk-space-4: 16px; --vk-space-6: 24px; --vk-space-8: 32px; --vk-space-12: 48px;

  --vk-grad-neon: radial-gradient(1200px 600px at 80% -10%, rgba(162,89,255,0.25), transparent 60%),
                  radial-gradient(1000px 500px at 10% 120%, rgba(0,255,255,0.18), transparent 60%);
}
```

2) Fonts
- In global Head, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Rajdhani:wght@600;700&family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
<style>
  .font-heading { font-family: "Orbitron","Rajdhani",system-ui,sans-serif; letter-spacing:.06em; text-transform:uppercase; }
  .font-body { font-family: "Inter","Space Grotesk",system-ui,sans-serif; }
  .font-mono { font-family: "Share Tech Mono",ui-monospace,monospace; letter-spacing:.04em; }
</style>
```

3) Global Scripts (Lenis, GSAP, ScrollTrigger, Init)
- Add to site Footer (or end of Body) in this order:

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/bundled/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script>
  const lenis = new Lenis({ smoothWheel: true, lerp: 0.08 });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf) } requestAnimationFrame(raf);
  gsap.registerPlugin(ScrollTrigger);
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!prefersReduced){
    document.querySelectorAll("[data-reveal]").forEach(el=>{
      gsap.from(el,{ y:30, opacity:0, duration:.8, ease:"power3.out",
        scrollTrigger:{ trigger: el, start:"top 85%" }});
    });
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) gsap.globalTimeline.pause(); else gsap.globalTimeline.resume();
  });
</script>
```

4) Sticky Navbar
- Create a fixed top nav wrapper with transparent bg.
- On scroll > 12px, add solid class.

```html
<script>
  const nav = document.querySelector("[data-nav]");
  const solidAt = 12; function onScroll(){ const s = window.scrollY > solidAt; nav?.classList.toggle("is-solid", s); }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
</script>
<style>
  [data-nav].is-solid { background: color-mix(in oklab, var(--vk-bg) 70%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,.08); box-shadow: var(--vk-shadow-soft); }
</style>
```

5) Hero Section
- Choose background:
  - A) Lottie neon morph (full-bleed absolute)
  - B) DotGrid background (use enhanced props: `pauseWhenHidden`, `interactive`, DPR/zoom aware)
  - C) Shader/WebGL (heavier)
- Add headline, subhead, and two CTAs. Use `[data-mag]` for magnetic on primary.

6) Magnetic Buttons (opt‑in)
```html
<script>
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!prefersReduced){
    document.querySelectorAll("[data-mag]").forEach(btn=>{
      let hovering=false;
      const move = e=>{
        if(!hovering) return;
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width/2);
        const my = e.clientY - (r.top + r.height/2);
        const d = Math.hypot(mx,my); const cap = Math.min(15, d*0.15);
        btn.style.transform = `translate(${(mx/d||0)*cap}px, ${(my/d||0)*cap}px)`;
      };
      btn.addEventListener("pointerenter",()=>{ hovering=true; });
      btn.addEventListener("pointermove",move);
      btn.addEventListener("pointerleave",()=>{ hovering=false; btn.style.transform=""; });
    });
  }
</script>
```

7) Services Grid
- Grid: `grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Card: `bg-[var(--vk-glass)] border border-white/10 rounded-lg p-5 shadow-soft hover:shadow-strong transition`
- Items (suggested): Web+Hosting, CRM/CMS, Middleware, IT Infra, Ads Mgmt, Funnels, Immersive Tours, Dashboards.
- Icons: Heroicons (code-bracket, squares-2x2, cube-transparent, server-stack, megaphone, funnel, photo/cube, presentation-chart-line).

8) Use Cases with Filters
- Filter pills with `data-filter` and cards with `data-case`.

```html
<script>
  const pills = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-case]");
  pills.forEach(p=>{
    p.addEventListener("click", ()=>{
      const f = p.dataset.filter;
      pills.forEach(x=>x.classList.remove("active"));
      p.classList.add("active");
      items.forEach(it=>{ const show = (f==="All") || it.dataset.case===f; it.style.display = show ? "" : "none"; });
    });
  });
</script>
<style>
  [data-filter].active{ color: var(--vk-bg); background: var(--vk-cyan); box-shadow: 0 0 0 1px rgba(255,255,255,.12), 0 10px 30px rgba(0,255,255,.2); }
</style>
```

9) Why Velkina (Icon Row)
- 4 items: Unified, Scalable, Custom, Managed. Add `[data-reveal]` for scroll animations.

10) Tech Stack Carousel (Ticker)
```html
<style>.ticker{ display:flex; gap:48px; will-change:transform; }</style>
<script>
  const track = document.querySelector("[data-ticker]");
  if(track){
    let x=0; let speed=0.4;
    function loop(){ x -= speed; if(Math.abs(x) > track.scrollWidth/2){ x=0; } track.style.transform = `translateX(${x}px)`; requestAnimationFrame(loop); }
    requestAnimationFrame(loop);
    track.addEventListener("pointerenter",()=>speed=0);
    track.addEventListener("pointerleave",()=>speed=0.4);
  }
</script>
```

11) Testimonials (Morph Carousel)
```html
<script>
  const slides = [...document.querySelectorAll("[data-testimonial]")];
  let i=0; setInterval(()=>{ slides[i]?.classList.remove("is-on"); i=(i+1)%slides.length; slides[i]?.classList.add("is-on"); }, 6000);
</script>
<style>
  [data-testimonial]{ opacity:.2; transform: scale(.98); transition: .6s; }
  [data-testimonial].is-on{ opacity:1; transform: scale(1); filter: drop-shadow(0 10px 30px rgba(162,89,255,.25)); }
</style>
```

12) CTA Panel
- Card: `bg-[var(--vk-glass)] rounded-xl p-8 md:p-12 border border-white/10 shadow-strong`
- Add blurred neon gradient ring behind using `--vk-grad-neon`.

13) Page Transitions (Wipe)
```html
<div id="vk-transition" style="position:fixed;inset:0;background:#0D0D0D;transform:scaleX(0);transform-origin:left;z-index:9999;pointer-events:none;"></div>
<script>
  function wipeIn(){ return gsap.to("#vk-transition",{ scaleX:1, duration:.4, ease:"power2.in"}); }
  function wipeOut(){ return gsap.to("#vk-transition",{ scaleX:0, duration:.5, ease:"power3.out", delay:.1}); }
  document.querySelectorAll("a[href]").forEach(a=>{
    if(a.target==="_blank") return;
    a.addEventListener("click", (e)=>{ e.preventDefault(); const href=a.href; wipeIn().then(()=>location.href=href); });
  });
  if(document.readyState!=="loading"){ wipeOut(); } else { window.addEventListener("DOMContentLoaded",wipeOut); }
</script>
```

14) CMS Collections
- Blog Posts: title, slug, excerpt, coverImage, content, category, tags[], author{name, avatar}, publishedAt, seo{title, desc, ogImage}
- Use Cases: title, slug, industry, summary, heroImage, gallery[], features[], body, ctaText, ctaLink
- Testimonials: name, role, company, avatar, rating (1–5), quote, featured

15) Bind CMS to Pages
- Blog page: list cards (filter by category/tags), detail template.
- Use Cases page: filterable grid; deep-dive template.
- Testimonials: pull featured into landing carousel.

16) Performance
- Fonts: preconnect + display=swap; limit weights.
- Images: AVIF/WebP, responsive sizes, lazy; blur-up placeholders.
- Lottie: load in viewport; fallback static when reduced-motion.
- GSAP: reduced-motion guards; pause on tab hidden.
- Budgets: TTI < 2.5s, LCP < 2.5s, CLS < 0.1, JS < 180KB gz.

17) Accessibility & SEO
- Landmarks, labels, keyboard navigation, focus-visible.
- Meta/OG/Twitter; JSON‑LD (Organization, BlogPosting); sitemap & robots.

18) Assets Checklist
- Lottie: hero morph + small loops for services.
- Logos: SVG monochrome (Google, Meta, Firebase, MongoDB, Vercel, Tailwind, Webflow, Wix).
- Avatars: compressed, consistent crop.
- Copy: final blurbs for services, use cases, testimonials.

19) Done Criteria
- Smooth sticky nav + hero with background motion and magnetic primary CTA.
- Service grid hover glow; use-case filters; tech carousel ticker; testimonial morph.
- CMS powering Blog, Use Cases, Testimonials.
- Lighthouse passing (Performance/Best Practices/SEO ≥ 90), a11y checks passing.
```
