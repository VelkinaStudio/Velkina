"use client";

import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { outlineMaterial } from "./Inked";

// InkAll — adds a bold inverted-hull ink outline to every mesh in its subtree,
// automatically. For each mesh it inserts a SIBLING outline mesh into the same
// parent, sharing the mesh's geometry and copying its local transform — so the
// outline tracks the mesh exactly (works for nested groups). One shared
// outline material. Runs after children mount.

export default function InkAll({ thickness = 3, color, children }: { thickness?: number; color?: string; children: React.ReactNode }) {
  const root = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const r = root.current;
    if (!r) return;
    const mat = outlineMaterial({ color, thickness, screenSpace: true });
    const added: THREE.Mesh[] = [];
    // collect first (don't mutate during traverse)
    const meshes: THREE.Mesh[] = [];
    r.traverse((o) => {
      const m = o as THREE.Mesh;
      if ((m as any).isMesh && m.geometry && !m.userData.__outline && !m.userData.__isOutline) {
        meshes.push(m);
      }
    });
    for (const m of meshes) {
      const shell = new THREE.Mesh(m.geometry, mat);
      shell.position.copy(m.position);
      shell.quaternion.copy(m.quaternion);
      shell.scale.copy(m.scale);
      shell.userData.__isOutline = true;
      m.userData.__outline = shell;
      m.parent?.add(shell);
      added.push(shell);
    }
    return () => {
      for (const s of added) s.parent?.remove(s);
      for (const m of meshes) delete m.userData.__outline;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thickness, color]);

  return <group ref={root}>{children}</group>;
}
