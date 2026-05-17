/* =============================================================
   THE STUDIO JOURNAL · interactions
   Vanilla JS. No frameworks.
   ============================================================= */
(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const isTouch = matchMedia("(hover: none)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------------------
     1. Cover (loader): fake counter to 48, then reveal
     -------------------------------------------------------------- */
  const cover  = $("#cover");
  const count  = $("#loadCount");
  const folio  = $(".folio");

  function reveal() {
    cover?.classList.add("is-hidden");
    document.body.classList.add("is-ready");
    folio?.classList.add("is-on");
    $$("[data-scene]").forEach(el => observer.observe(el));
    $(".page--cover")?.classList.add("is-visible");
  }

  if (reduced) {
    if (count) count.textContent = "48";
    setTimeout(reveal, 80);
  } else {
    let n = 0;
    const tick = () => {
      n += Math.random() * 7 + 2;
      if (n >= 48) n = 48;
      if (count) count.textContent = String(Math.floor(n)).padStart(2, "0");
      if (n < 48) setTimeout(tick, 60 + Math.random() * 80);
      else setTimeout(reveal, 220);
    };
    setTimeout(tick, 220);
  }

  /* --------------------------------------------------------------
     2. Year stamp
     -------------------------------------------------------------- */
  const yr = $("#yr");
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* --------------------------------------------------------------
     3. Custom cursor — soft lerp
     -------------------------------------------------------------- */
  const cursor = $("#cursor");
  if (cursor && !isTouch && !reduced) {
    let x = innerWidth / 2, y = innerHeight / 2;
    let cx = x, cy = y;
    addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; }, { passive: true });
    addEventListener("mousedown", () => cursor.classList.add("is-down"));
    addEventListener("mouseup",   () => cursor.classList.remove("is-down"));

    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();

    const sel = "a, button, [data-magnetic], .polaroid, .plate, input, textarea";
    document.addEventListener("mouseover", e => {
      if (e.target.closest(sel)) cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest(sel)) cursor.classList.remove("is-hover");
    });
  } else if (cursor) {
    cursor.style.display = "none";
  }

  /* --------------------------------------------------------------
     4. Magnetic on [data-magnetic]
     -------------------------------------------------------------- */
  if (!isTouch && !reduced) {
    $$("[data-magnetic]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.16;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.16;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* --------------------------------------------------------------
     5. Sticky masthead + Top button + cover plate parallax
     -------------------------------------------------------------- */
  const masthead = $("#masthead");
  const topBtn = $("#topBtn");
  const plateSvg = $(".cover-grid__plate .plate-svg");

  function onScroll() {
    masthead?.classList.toggle("is-stuck", scrollY > 24);
    topBtn?.classList.toggle("is-on", scrollY > innerHeight * 0.8);

    if (plateSvg && !reduced) {
      const t = Math.min(scrollY / innerHeight, 1.2);
      plateSvg.style.transform = `translateY(${t * -40}px) rotate(${t * 6}deg)`;
    }
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  topBtn?.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

  /* --------------------------------------------------------------
     6. Scene reveals
     -------------------------------------------------------------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });

  /* --------------------------------------------------------------
     7. Folio current-section spy
     -------------------------------------------------------------- */
  const folioLinks = $$("#folioList a");
  const sectionMap = new Map();
  folioLinks.forEach(a => {
    const id = a.getAttribute("href").slice(1);
    const sec = document.getElementById(id);
    if (sec) sectionMap.set(sec, a);
  });

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        folioLinks.forEach(l => l.classList.remove("is-current"));
        sectionMap.get(e.target)?.classList.add("is-current");
      }
    });
  }, { threshold: 0, rootMargin: "-40% 0px -55% 0px" });
  sectionMap.forEach((_, sec) => spy.observe(sec));

  /* --------------------------------------------------------------
     8. Polaroid grid — selected work
     -------------------------------------------------------------- */
  const projects = [
    {
      slug: "dr-sevim-aydin-beauty",
      cat: "Beauty · Growth",
      title: "Dr. Sevim Aydın Beauty",
      handTitle: "the beauty clinic",
      desc: "Trustworthy clinic site with online booking. SEO content drove +40% organic visibility.",
      url: "https://www.drsevimaydinbeauty.com",
      year: "2022",
    },
    {
      slug: "tp-thermoplast",
      cat: "Manufacturing · B2B",
      title: "TP Thermoplast",
      handTitle: "the factory",
      desc: "Multi-language B2B site for export buyers. 50% load-time reduction.",
      url: "https://tpthermoplast.com",
      year: "2023",
    },
    {
      slug: "rain-group",
      cat: "Home Décor · Brand",
      title: "Rain Group",
      handTitle: "the textiles brand",
      desc: "Identity and e-commerce foundation. SEO + social grew traffic 60%.",
      url: "https://www.raingroupas.com",
      year: "2023",
    },
    {
      slug: "eduturkia",
      cat: "Education · CRM",
      title: "EduTurkia",
      handTitle: "the school platform",
      desc: "Bilingual education-consultancy platform with admin records and tracked applications.",
      url: "https://www.eduturkia.com/",
      year: "2024",
    },
    {
      slug: "ali-cengiz-iscanli",
      cat: "Art · Portfolio",
      title: "Ali Cengiz İşcanlı",
      handTitle: "the painter",
      desc: "Gallery-first portfolio for a fine artist. Multi-lingual, optimized media.",
      url: "https://www.alicengiziscanli.com",
      year: "2023",
    },
    {
      slug: "clown3d",
      cat: "3D · Creative",
      title: "Clown3D",
      handTitle: "the 3D studio",
      desc: "Playful, animation-rich site for a 3D visualization studio.",
      url: "https://www.clown3d.com",
      year: "2023",
    },
    {
      slug: "atar-avci-hukuk-burosu",
      cat: "Law · Authority",
      title: "Atar Avcı Hukuk Bürosu",
      handTitle: "the law office",
      desc: "Authority-driven brand site with practice areas and local SEO foundation.",
      url: "https://www.ataravci.com.tr",
      year: "2022",
    },
  ];

  const grid = $("#polaroidGrid");
  if (grid) {
    grid.innerHTML = projects.map((p, i) => {
      const num = String(i + 1).padStart(2, "0");
      const thumb = `../projects/${p.slug}.svg`;
      const fallback = `../projects/placeholder.svg`;
      return `
        <a class="polaroid" href="${p.url}" target="_blank" rel="noopener" data-scene>
          <div class="polaroid__media">
            <span class="polaroid__live">Live</span>
            <span class="polaroid__num">Nº ${num} · ${p.year}</span>
            <object type="image/svg+xml" data="${thumb}" aria-label="${p.title}"
                    onerror="this.outerHTML='<img src=&quot;${fallback}&quot; alt=&quot;${p.title}&quot;>'"></object>
          </div>
          <div class="polaroid__caption">${p.handTitle}</div>
          <span class="polaroid__cat">${p.cat}</span>
          <span class="polaroid__hover">${p.desc}</span>
        </a>`;
    }).join("");

    $$(".polaroid").forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------
     9. Smooth in-page anchor with header offset
     -------------------------------------------------------------- */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + scrollY - 70;
    scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  });

})();
