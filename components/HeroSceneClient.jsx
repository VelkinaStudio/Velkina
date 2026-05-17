'use client';

/**
 * Hero 3D scene — wireframe icosahedron with a slow particle field.
 * Uses three (already a dependency) via dynamic import so SSR is happy.
 * Gracefully degrades on prefers-reduced-motion or load failure.
 */
import { useEffect, useRef } from 'react';

export default function HeroSceneClient() {
  const mountRef = useRef(null);

  useEffect(() => {
    let alive = true;
    let raf = 0;
    let cleanup = () => {};

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    (async () => {
      try {
        const THREE = await import('three');
        if (!alive || !mountRef.current) return;
        const mount = mountRef.current;

        const w = () => mount.clientWidth || window.innerWidth;
        const h = () => mount.clientHeight || window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, w() / h(), 0.1, 100);
        camera.position.set(0, 0, 6.5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w(), h());
        renderer.setClearColor(0x000000, 0);
        mount.innerHTML = '';
        mount.appendChild(renderer.domElement);

        // ── Wireframe icosahedron ──
        const geom = new THREE.IcosahedronGeometry(1.55, 1);
        const wire = new THREE.WireframeGeometry(geom);
        const mat = new THREE.LineBasicMaterial({
          color: 0xECE9E2,
          transparent: true,
          opacity: 0.55,
        });
        const lines = new THREE.LineSegments(wire, mat);
        scene.add(lines);

        // Inner glow sphere
        const glowMat = new THREE.MeshBasicMaterial({
          color: 0x00FFFF,
          transparent: true,
          opacity: 0.08,
        });
        const glow = new THREE.Mesh(new THREE.SphereGeometry(1.05, 24, 24), glowMat);
        scene.add(glow);

        // ── Particle field ──
        const pCount = 380;
        const positions = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const r = 6 + Math.random() * 4;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          positions[i*3 + 0] = r * Math.sin(phi) * Math.cos(theta);
          positions[i*3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i*3 + 2] = r * Math.cos(phi);
        }
        const pGeom = new THREE.BufferGeometry();
        pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pMat = new THREE.PointsMaterial({
          color: 0xECE9E2,
          size: 0.018,
          transparent: true,
          opacity: 0.65,
          sizeAttenuation: true,
        });
        const points = new THREE.Points(pGeom, pMat);
        scene.add(points);

        // ── Mouse parallax ──
        let mx = 0, my = 0, tmx = 0, tmy = 0;
        const onMove = (e) => {
          const r = mount.getBoundingClientRect();
          tmx = ((e.clientX - r.left) / r.width - 0.5);
          tmy = ((e.clientY - r.top) / r.height - 0.5);
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        const onResize = () => {
          camera.aspect = w() / h();
          camera.updateProjectionMatrix();
          renderer.setSize(w(), h());
        };
        window.addEventListener('resize', onResize);

        const start = performance.now();
        const tick = () => {
          if (!alive) return;
          const t = (performance.now() - start) / 1000;

          mx += (tmx - mx) * 0.06;
          my += (tmy - my) * 0.06;

          lines.rotation.x = t * 0.22 + my * 0.6;
          lines.rotation.y = t * 0.30 + mx * 0.6;
          lines.rotation.z = Math.sin(t * 0.4) * 0.05;

          glow.rotation.copy(lines.rotation);
          glow.scale.setScalar(1 + Math.sin(t * 1.3) * 0.03);

          points.rotation.y = t * 0.04 + mx * 0.2;
          points.rotation.x = my * 0.2;

          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('resize', onResize);
          renderer.dispose();
          geom.dispose();
          wire.dispose();
          mat.dispose();
          pGeom.dispose();
          pMat.dispose();
          glowMat.dispose();
          if (mount.firstChild) mount.removeChild(mount.firstChild);
        };
      } catch (err) {
        // silent — the page works without the 3D layer
        console.warn('Hero scene unavailable:', err);
      }
    })();

    return () => { alive = false; cleanup(); };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
  );
}
