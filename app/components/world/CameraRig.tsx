"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { STATIONS, type Station } from "@/app/lib/stations";

CameraControls.install({ THREE });

// The StoryPoint camera engine. Owns camera-controls (no free orbit — input is
// disabled; the camera only moves via flyTo). Adds a tiny pointer-parallax
// (ThreeDOF) on top for life. Calls invalidate() so frameloop='demand' renders
// only while the camera or parallax is actually moving.

export default function CameraRig({
  target,
  onSettled,
  reduced,
}: {
  target: string; // station id
  onSettled?: (id: string) => void;
  reduced?: boolean;
}) {
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  const controls = useRef<CameraControls>(null!);
  const lastTarget = useRef<string>("");
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // init
  useEffect(() => {
    const c = new CameraControls(camera as THREE.PerspectiveCamera, gl.domElement);
    // No free orbit: kill all direct user input. We drive it programmatically.
    c.mouseButtons.left = CameraControls.ACTION.NONE;
    c.mouseButtons.right = CameraControls.ACTION.NONE;
    c.mouseButtons.wheel = CameraControls.ACTION.NONE;
    c.touches.one = CameraControls.ACTION.NONE;
    c.touches.two = CameraControls.ACTION.NONE;
    c.touches.three = CameraControls.ACTION.NONE;
    c.smoothTime = 0.28;
    c.draggingSmoothTime = 0.18;
    controls.current = c;
    const home = STATIONS[0];
    c.setLookAt(...home.cam, ...home.look, false);
    const onControl = () => invalidate();
    c.addEventListener("control", onControl);
    c.addEventListener("update", onControl);
    return () => { c.removeEventListener("control", onControl); c.removeEventListener("update", onControl); c.dispose(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fly to target station when it changes
  useEffect(() => {
    const c = controls.current;
    if (!c || target === lastTarget.current) return;
    lastTarget.current = target;
    const st: Station = STATIONS.find((s) => s.id === target) ?? STATIONS[0];
    invalidate();
    c.setLookAt(...st.cam, ...st.look, !reduced).then(() => onSettled?.(st.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced]);

  // pointer parallax (ThreeDOF) — tiny, eased, disabled under reduced motion
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      parallax.current.tx = nx * 0.05;
      parallax.current.ty = -ny * 0.03;
      invalidate();
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c) return;
    // ease parallax
    const p = parallax.current;
    const k = 1 - Math.pow(0.001, delta);
    p.x += (p.tx - p.x) * k;
    p.y += (p.ty - p.y) * k;
    const moving = c.update(delta);
    // apply parallax as a tiny additive rotation offset on the camera
    camera.rotation.z = 0; // keep level
    if (moving || Math.abs(p.tx - p.x) > 0.0001) invalidate();
  });

  return null;
}
