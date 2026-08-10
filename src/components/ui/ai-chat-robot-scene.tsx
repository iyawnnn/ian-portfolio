"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Bounds, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_PATH = "/models/ai-robot.glb";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

function Robot({ hovered, reducedMotion }: { hovered: boolean; reducedMotion: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const { robot, visorMaterial, eyeMaterial } = useMemo(() => {
    const clonedScene = scene.clone(true);
    const cleanVisor = new THREE.MeshStandardMaterial({
      color: "#050505",
      metalness: 0,
      roughness: 0.35,
    });
    const cleanEyes = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      emissive: "#ffffff",
      emissiveIntensity: 1.1,
      metalness: 0,
      roughness: 0.4,
    });
    cleanEyes.toneMapped = false;

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const meshName = child.name.toLowerCase();
      if (meshName.includes("subtle_visor_highlight")) {
        child.visible = false;
      } else if (meshName.includes("black_glass_front_visor")) {
        child.material = cleanVisor;
      } else if (meshName.includes("eye")) {
        child.material = cleanEyes;
      }
    });

    return {
      robot: clonedScene,
      visorMaterial: cleanVisor,
      eyeMaterial: cleanEyes,
    };
  }, [scene]);
  const group = useRef<THREE.Group>(null);
  const targetScale = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    return () => {
      visorMaterial.dispose();
      eyeMaterial.dispose();
    };
  }, [eyeMaterial, visorMaterial]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;
    const breathingScale = reducedMotion ? 0 : Math.sin(time * 1.2) * 0.015;
    const scale = (hovered ? 1.07 : 1) + breathingScale;
    const smoothness = 1 - Math.exp(-delta * 8);
    group.current.scale.lerp(targetScale.setScalar(scale), smoothness);

    if (reducedMotion) {
      group.current.position.y = 0;
      group.current.rotation.set(0, 0, 0);
      return;
    }

    group.current.position.y = Math.sin(time * 1.2) * 0.03;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(time * 0.8) * 0.06 + state.pointer.x * 0.08,
      smoothness * 0.35,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(time * 0.7) * 0.035 - state.pointer.y * 0.05,
      smoothness * 0.35,
    );
  });

  return (
    <group ref={group}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={1}>
        <primitive object={robot} />
      </group>
    </group>
  );
}

function RobotLoadingShape() {
  return (
    <mesh>
      <icosahedronGeometry args={[0.65, 1]} />
      <meshStandardMaterial color="#737373" wireframe />
    </mesh>
  );
}

export default function AiChatRobotScene() {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      className="size-full"
      camera={{ position: [0, 0, 4], fov: 34 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-3, 1, 2]} intensity={0.7} />
      <Suspense fallback={<RobotLoadingShape />}>
        <Bounds fit clip observe margin={1.05}>
          <Robot hovered={hovered} reducedMotion={reducedMotion} />
        </Bounds>
      </Suspense>
    </Canvas>
  );
}

// TODO: Keep this path in sync if public/models/ai-robot.glb is replaced.
useGLTF.preload(MODEL_PATH);
