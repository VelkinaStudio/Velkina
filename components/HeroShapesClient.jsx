"use client";

import { useEffect } from 'react';

export default function HeroShapesClient() {
  useEffect(() => {
    const canvas = document.getElementById('vk-hero-shapes');
    if (!canvas) return;
    // Instance ownership guard to prevent multiple concurrent WebGL loops
    const instanceId = String(Date.now()) + Math.random().toString(36).slice(2);
    canvas.dataset.shapesInstance = instanceId;

    let THREE;
    let renderer, scene, camera, group, points;
    let animId = 0;    // continuous rotation loop
    let fadeId = 0;    // crossfade transition loop
    let handleResize = null;
    let resizeObserver = null;
    let onContextLost = null;
    let cancelled = false; // abort async init on unmount

    const init = async () => {
      try { console.debug('[HeroShapes] init() start'); } catch {}
      try {
        const mod = await import('three');
        THREE = mod.default ?? mod;
      } catch {
        return; // three not available
      }
      if (cancelled) return; // component unmounted during dynamic import

      // Lightweight mode detection
      const body = document.body || null;
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
      const isLight = prefersReduced || (body && body.dataset && body.dataset.anim === 'light');

      scene = new THREE.Scene();
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      // Robust context acquisition to avoid failures
      const ctxAttrs = { alpha: true, antialias: true, powerPreference: 'high-performance' };
      let gl = null;
      try {
        gl = canvas.getContext && (canvas.getContext('webgl2', ctxAttrs) || canvas.getContext('webgl', ctxAttrs) || canvas.getContext('experimental-webgl', ctxAttrs));
      } catch {}
      if (!gl) {
        // Gracefully bail if WebGL is unavailable
        return;
      }
      try {
        renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return;
      }
      try { console.debug('[HeroShapes] renderer created'); } catch {}
      renderer.setPixelRatio(DPR);

      // Handle WebGL context lost to prevent default page behavior
      onContextLost = (e) => {
        try { e.preventDefault(); } catch {}
      };
      canvas.addEventListener('webglcontextlost', onContextLost, false);

      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 7);

      group = new THREE.Group();
      scene.add(group);

      const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.85 });

      // One persistent Points cloud that morphs its positions
      const POINT_COUNT = isLight ? 1600 : 3500;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(POINT_COUNT * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      points = new THREE.Points(geometry, material);
      group.add(points);

      // Utilities
      const phi = (1 + Math.sqrt(5)) / 2;
      const fract = (x) => x - Math.floor(x);
      const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const copyInto = (dst, src) => { dst.set(src); };

      // Deterministic pseudo-random in [0,1)
      const rand = (i, seed = 0.0) => {
        const s = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
        return s - Math.floor(s);
      };

      // Creative shape samplers (return Float32Array length N*3)
      const genDiscoverSphere = (N) => {
        const out = new Float32Array(N * 3);
        const ga = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
          const y = 1 - (i / (N - 1)) * 2; // [-1,1]
          const r = Math.sqrt(Math.max(0, 1 - y * y));
          const theta = i * ga;
          const x = Math.cos(theta) * r;
          const z = Math.sin(theta) * r;
          out[3 * i] = x * 2.2;
          out[3 * i + 1] = y * 2.2;
          out[3 * i + 2] = z * 2.2;
        }
        return out;
      };

      const genDesignTorus = (N) => {
        const out = new Float32Array(N * 3);
        const R = 1.8, r = 0.55;
        for (let i = 0; i < N; i++) {
          const a = 2 * Math.PI * (i / N);
          const b = 2 * Math.PI * fract(i * phi);
          const cx = R + r * Math.cos(b);
          const x = cx * Math.cos(a);
          const y = r * Math.sin(b);
          const z = cx * Math.sin(a);
          out[3 * i] = x;
          out[3 * i + 1] = y;
          out[3 * i + 2] = z;
        }
        return out;
      };

      const genBuildCubeLattice = (N) => {
        const out = new Float32Array(N * 3);
        const g = Math.max(7, Math.round(Math.cbrt(N))); // grid resolution
        const scale = 3.0; // overall size
        for (let i = 0; i < N; i++) {
          const ix = i % g;
          const iy = Math.floor(i / g) % g;
          const iz = Math.floor(i / (g * g)) % g;
          const x = (ix / (g - 1) - 0.5) * scale;
          const y = (iy / (g - 1) - 0.5) * scale;
          const z = (iz / (g - 1) - 0.5) * scale;
          out[3 * i] = x;
          out[3 * i + 1] = y;
          out[3 * i + 2] = z;
        }
        return out;
      };

      const genLaunchRocket = (N) => {
        const out = new Float32Array(N * 3);
        // Cartoon-ish proportions
        const h = 3.0;         // body height
        const rb = 0.85;       // body radius
        const hn = 0.9;        // spherical nose height
        const yTop = h / 2;
        const yBot = -h / 2;

        // Budgets
        const nBody = Math.floor(N * 0.40);
        const nTopCap = Math.floor(N * 0.10);
        const nFins = Math.floor(N * 0.18);
        const nWindow = Math.floor(N * 0.06);
        const nStripe = Math.floor(N * 0.06);
        const nFlame = N - nBody - nTopCap - nFins - nWindow - nStripe;

        let k = 0;
        // Capsule body (cylinder surface)
        for (let i = 0; i < nBody; i++, k++) {
          const u = 2 * Math.PI * fract(i * phi);
          const v = fract(i * (phi * 0.7));
          const y = yBot + v * h;
          out[3 * k] = Math.cos(u) * rb;
          out[3 * k + 1] = y;
          out[3 * k + 2] = Math.sin(u) * rb;
        }
        // Hemispherical nose cap
        for (let i = 0; i < nTopCap; i++, k++) {
          const vv = i / Math.max(1, nTopCap - 1); // [0,1]
          const theta = Math.PI * 0.5 * vv; // 0..pi/2
          const r = rb * Math.cos(theta);
          const y = yTop + Math.sin(theta) * hn;
          const u = 2 * Math.PI * fract(i * phi);
          out[3 * k] = Math.cos(u) * r;
          out[3 * k + 1] = y;
          out[3 * k + 2] = Math.sin(u) * r;
        }
        // Fins (3 big curved fins)
        const finCount = 3;
        for (let i = 0; i < nFins; i++, k++) {
          const j = i % finCount;
          const baseAngle = (j / finCount) * 2 * Math.PI;
          const s = fract(i * phi); // out from body
          const t = fract(i * (phi * 0.5)); // upward along fin
          const len = 1.3;
          const baseY = yBot + 0.2;
          const r = rb + Math.pow(s, 1.2) * len;
          const y = baseY + t * 0.9;
          const bend = 0.15 * s * s;
          const x = (r * Math.cos(baseAngle)) + bend * Math.cos(baseAngle + Math.PI / 2);
          const z = (r * Math.sin(baseAngle)) + bend * Math.sin(baseAngle + Math.PI / 2);
          out[3 * k] = x;
          out[3 * k + 1] = y;
          out[3 * k + 2] = z;
        }
        // Window ring near upper body
        const yWin = yTop - 0.6;
        const rw = 0.30;
        for (let i = 0; i < nWindow; i++, k++) {
          const a = 2 * Math.PI * (i / nWindow);
          const r = rb - 0.08;
          const px = Math.cos(a) * (r + Math.cos(a) * rw * 0.15);
          const pz = Math.sin(a) * (r + Math.sin(a) * rw * 0.15);
          out[3 * k] = px;
          out[3 * k + 1] = yWin + 0.02 * Math.sin(3 * a);
          out[3 * k + 2] = pz;
        }
        // Stripe band around lower body
        const yStripe = yBot + 0.8;
        for (let i = 0; i < nStripe; i++, k++) {
          const a = 2 * Math.PI * (i / nStripe);
          out[3 * k] = Math.cos(a) * rb;
          out[3 * k + 1] = yStripe + 0.05 * Math.sin(4 * a);
          out[3 * k + 2] = Math.sin(a) * rb;
        }
        // Flame (soft plume cone)
        const rflame = 1.05, hflame = 1.4;
        for (let i = 0; i < nFlame; i++, k++) {
          const a = 2 * Math.PI * (i / nFlame);
          const t = fract(i * phi);
          const rad = rflame * Math.pow(1 - t, 0.65);
          const y = yBot - t * hflame;
          const jitter = 0.10 * (rand(i, 11) - 0.5);
          out[3 * k] = Math.cos(a) * rad + jitter;
          out[3 * k + 1] = y + jitter * 0.6;
          out[3 * k + 2] = Math.sin(a) * rad + jitter;
        }
        return out;
      };

      const genEvolveDNA = (N) => {
        const out = new Float32Array(N * 3);
        // Overall proportions
        const turns = 4.0;      // number of helix turns
        const radius = 1.05;    // backbone radius
        const height = 4.0;     // total height
        const rungSubdiv = 10;  // segments per base-pair rung (curved)

        // Budget points: ~28% rungs, rest split evenly across two strands
        const nRungs = Math.max(14, Math.floor((N * 0.28) / rungSubdiv));
        const nBackbone = Math.max(2, N - nRungs * rungSubdiv);
        const perStrand = Math.max(2, Math.floor(nBackbone / 2));

        let k = 0;

        // Helper to push a point with subtle jitter for organic feel
        const push = (x, y, z, iSeed) => {
          const j = 0.006; // very small jitter
          const jx = (rand(iSeed, 31) - 0.5) * j;
          const jy = (rand(iSeed, 37) - 0.5) * j;
          const jz = (rand(iSeed, 41) - 0.5) * j;
          out[3 * k] = x + jx;
          out[3 * k + 1] = y + jy;
          out[3 * k + 2] = z + jz;
          k++;
        };

        // Minor/major groove modulation across the rotation
        const groove = (ang) => 1 + 0.08 * Math.cos(2 * ang);

        // Strand 0 (phase 0)
        for (let i = 0; i < perStrand; i++) {
          const t = i / Math.max(1, perStrand - 1);
          const a = t * turns * 2 * Math.PI;
          const y = (t - 0.5) * height;
          const rr = radius * groove(a);
          const x = Math.cos(a) * rr;
          const z = Math.sin(a) * rr;
          push(x, y, z, i * 3 + 1);
        }

        // Strand 1 (phase PI)
        for (let i = 0; i < perStrand; i++) {
          const t = i / Math.max(1, perStrand - 1);
          const a = t * turns * 2 * Math.PI + Math.PI;
          const y = (t - 0.5) * height;
          const rr = radius * groove(a);
          const x = Math.cos(a) * rr;
          const z = Math.sin(a) * rr;
          push(x, y, z, i * 3 + 2);
        }

        // Curved rungs connecting the strands with a slight bow/tilt
        for (let r = 0; r < nRungs; r++) {
          const t = (r + 0.5) / Math.max(1, nRungs); // center between samples
          const y = (t - 0.5) * height;
          const aMid = t * turns * 2 * Math.PI;

          // Endpoints on each strand (slightly inset for a cleaner look)
          const inset = 0.94;
          const p0 = [Math.cos(aMid) * radius * inset, y, Math.sin(aMid) * radius * inset];
          const p1 = [Math.cos(aMid + Math.PI) * radius * inset, y, Math.sin(aMid + Math.PI) * radius * inset];

          // Direction across the rung and a normal vector for bowing
          const dir = [p1[0] - p0[0], 0, p1[2] - p0[2]];
          const len = Math.hypot(dir[0], dir[2]) || 1;
          const nx = -dir[2] / len; // simple perpendicular in XZ plane
          const nz = dir[0] / len;

          // Bow amplitude and alternating tilt for visual richness
          const bow = 0.07;
          const tilt = 0.22 * Math.sin(3 * aMid);

          for (let s = 0; s < rungSubdiv; s++) {
            const u = s / Math.max(1, rungSubdiv - 1);
            // Base linear interpolation
            let x = p0[0] + (p1[0] - p0[0]) * u;
            let z = p0[2] + (p1[2] - p0[2]) * u;
            // Bow outward with a smooth arch and a small tilt along XZ normal
            const w = Math.sin(Math.PI * (u - 0.5)); // -1..1 arch
            x += nx * bow * w + nx * tilt * (u - 0.5);
            z += nz * bow * w + nz * tilt * (u - 0.5);
            push(x, y, z, r * 97 + s);
          }
        }
        return out;
      };

      const generators = [genDiscoverSphere, genDesignTorus, genBuildCubeLattice, genLaunchRocket, genEvolveDNA];
      const reduceMotion = prefersReduced;

      const morphToStep = (stepIdx) => {
        // If another instance took over, ignore morph requests
        if (canvas.dataset.shapesInstance !== instanceId) return;
        try { console.debug('[HeroShapes] morphToStep()', { stepIdx }); } catch {}
        const idx = ((stepIdx ?? 0) + generators.length) % generators.length;
        const target = generators[idx](POINT_COUNT);
        const attr = points.geometry.getAttribute('position');

        // Cancel any in-flight morph
        if (fadeId) cancelAnimationFrame(fadeId);

        if (reduceMotion) {
          copyInto(attr.array, target);
          attr.needsUpdate = true;
          renderer.render(scene, camera);
          return;
        }

        const start = new Float32Array(attr.array); // snapshot
        const duration = 800; // ms
        let t0 = performance.now();
        const step = (now) => {
          if (canvas.dataset.shapesInstance !== instanceId) {
            if (fadeId) cancelAnimationFrame(fadeId);
            return;
          }
          const a = Math.min(1, (now - t0) / duration);
          const e = easeInOut(a);
          const arr = attr.array;
          for (let i = 0; i < arr.length; i++) {
            arr[i] = start[i] + (target[i] - start[i]) * e;
          }
          attr.needsUpdate = true;
          renderer.render(scene, camera);
          if (a < 1) {
            fadeId = requestAnimationFrame(step);
          } else {
            // ensure exact target at end
            copyInto(arr, target);
            attr.needsUpdate = true;
            renderer.render(scene, camera);
          }
        };
        fadeId = requestAnimationFrame(step);
      };

      const setSize = () => {
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(200, Math.floor(rect.width));
        const h = Math.max(160, Math.floor(rect.height));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      handleResize = () => {
        setSize();
        if (points) renderer.render(scene, camera);
      };
      window.addEventListener('resize', handleResize);
      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(canvas);
      }

      setSize();
      // Initialize with first step's shape
      morphToStep(0);

      const animate = () => {
        // Stop animation if ownership moved to a newer instance
        if (canvas.dataset.shapesInstance !== instanceId) {
          if (animId) cancelAnimationFrame(animId);
          return;
        }
        // Subtle motion in light mode; fuller motion otherwise
        const ry = isLight ? 0.0006 : 0.0025;
        const rx = isLight ? 0.00035 : 0.0015;
        group.rotation.y += ry;
        group.rotation.x += rx;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      if (!reduceMotion && !cancelled) animId = requestAnimationFrame(animate);

      const onStep = (e) => {
        if (canvas.dataset.shapesInstance !== instanceId) return;
        const { index } = (e && e.detail) || {};
        try { console.debug('[HeroShapes] onStep', { index }); } catch {}
        if (typeof index === 'number') morphToStep(index);
      };
      window.addEventListener('vk-hero-step', onStep);

      // Defensive: pause/stop loops on visibility and page lifecycle changes
      const stopLoops = () => {
        try { console.debug('[HeroShapes] stopLoops()', { hadAnim: Boolean(animId), hadFade: Boolean(fadeId) }); } catch {}
        if (animId) { cancelAnimationFrame(animId); animId = 0; }
        if (fadeId) { cancelAnimationFrame(fadeId); fadeId = 0; }
      };
      const onVisibility = () => {
        try { console.debug('[HeroShapes] visibilitychange', { hidden: document.hidden }); } catch {}
        if (document.hidden) {
          stopLoops();
        } else if (!reduceMotion && canvas.dataset.shapesInstance === instanceId) {
          if (!animId) animId = requestAnimationFrame(animate);
        }
      };
      const onPageHide = () => { stopLoops(); };
      const onBeforeUnload = () => { stopLoops(); };
      document.addEventListener('visibilitychange', onVisibility);
      window.addEventListener('pagehide', onPageHide);
      window.addEventListener('beforeunload', onBeforeUnload);

      // Cleanup registration function
      return () => {
        window.removeEventListener('vk-hero-step', onStep);
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('pagehide', onPageHide);
        window.removeEventListener('beforeunload', onBeforeUnload);
      };
    };

    let unregister = null;
    init().then((fn) => { try { console.debug('[HeroShapes] init() done'); } catch {} unregister = fn; });

    return () => {
      cancelled = true;
      try { console.debug('[HeroShapes] cleanup start', { hadAnim: Boolean(animId), hadFade: Boolean(fadeId) }); } catch {}
      try { if (unregister) unregister(); } catch {}
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      try { if (onContextLost) canvas.removeEventListener('webglcontextlost', onContextLost, false); } catch {}
      if (animId) cancelAnimationFrame(animId);
      if (fadeId) cancelAnimationFrame(fadeId);
      try {
        if (points) {
          try { group && group.remove(points); } catch {}
          try { points.geometry && points.geometry.dispose(); } catch {}
          try { points.material && points.material.dispose && points.material.dispose(); } catch {}
        }
        if (group && scene) {
          try { scene.remove(group); } catch {}
        }
        if (renderer) renderer.dispose();
      } catch {}
      // Release ownership if still held by this instance
      if (canvas && canvas.dataset && canvas.dataset.shapesInstance === instanceId) {
        try { delete canvas.dataset.shapesInstance; } catch {}
      }
      try { console.debug('[HeroShapes] cleanup done'); } catch {}
    };
  }, []);

  return null;
}
