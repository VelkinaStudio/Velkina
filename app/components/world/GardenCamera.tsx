"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GARDEN, TILT } from "@/app/lib/garden";

// Scroll-as-playhead camera. The page scroll maps to t∈[0, N-1] across the
// garden waypoints; the camera eases toward the current segment's composed shot
// (position + lookAt + fov + dutch tilt). Motion → rest: it SETTLES into each
// frame. No free orbit. Smooth via frame-rate-independent exponential damping.

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

export default function GardenCamera({
  reduced,
  onArrive,
}: {
  reduced?: boolean;
  onArrive?: (id: string) => void;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const invalidate = useThree((s) => s.invalidate);
  const scrollT = useRef(0);          // target playhead in [0, N-1]
  const cur = useRef(0);              // eased playhead
  const curPos = useRef(new THREE.Vector3(...GARDEN[0].cam));
  const curLook = useRef(new THREE.Vector3(...GARDEN[0].look));
  const curFov = useRef(GARDEN[0].fov);
  const curRoll = useRef(0);
  const lastArrived = useRef("");

  // map page scroll → playhead. We use a tall scroll container in StudioWorld.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      scrollT.current = p * (GARDEN.length - 1);
      invalidate();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [invalidate]);

  useFrame((_, delta) => {
    // ease the playhead toward the scroll target (settle, with a dwell feel)
    const rate = reduced ? 1 : 1 - Math.pow(0.0009, delta);
    cur.current += (scrollT.current - cur.current) * rate;
    const t = cur.current;
    const i = Math.max(0, Math.min(GARDEN.length - 2, Math.floor(t)));
    const f = THREE.MathUtils.clamp(t - i, 0, 1);
    // ease within segment so it holds at each waypoint (smootherstep)
    const e = f * f * f * (f * (f * 6 - 15) + 10);
    const a = GARDEN[i], b = GARDEN[i + 1];

    tmpPos.set(...a.cam).lerp(tmpLook.set(...b.cam), e);
    const lookTarget = new THREE.Vector3(...a.look).lerp(new THREE.Vector3(...b.look), e);
    const fov = THREE.MathUtils.lerp(a.fov, b.fov, e);
    const roll = THREE.MathUtils.lerp(TILT[a.id] ?? 0, TILT[b.id] ?? 0, e);

    // frame-rate independent damp the camera toward the target shot
    const k = reduced ? 1 : 1 - Math.pow(0.0006, delta);
    curPos.current.lerp(tmpPos, k);
    curLook.current.lerp(lookTarget, k);
    curFov.current += (fov - curFov.current) * k;
    curRoll.current += (roll - curRoll.current) * k;

    camera.position.copy(curPos.current);
    camera.up.set(Math.sin(curRoll.current), Math.cos(curRoll.current), 0);
    camera.lookAt(curLook.current);
    if (Math.abs(camera.fov - curFov.current) > 0.01) { camera.fov = curFov.current; camera.updateProjectionMatrix(); }

    // arrival callback (open project on settle)
    const nearest = GARDEN[Math.round(t)];
    if (nearest && Math.abs(t - Math.round(t)) < 0.08 && nearest.id !== lastArrived.current) {
      lastArrived.current = nearest.id;
      onArrive?.(nearest.id);
    }

    // keep rendering while moving
    if (Math.abs(scrollT.current - cur.current) > 0.0005 || curPos.current.distanceTo(tmpPos) > 0.002) invalidate();
  });

  return null;
}
