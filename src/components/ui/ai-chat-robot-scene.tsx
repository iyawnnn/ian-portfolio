"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODEL_PATH = "/models/ai-robot.glb";
const IDLE_VISOR_COLOR = new THREE.Color("#050505");
const HOVER_VISOR_COLOR = new THREE.Color("#101010");

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

function Robot({ hovered, reducedMotion, dragging, onReady }: { hovered: boolean; reducedMotion: boolean; dragging: boolean; onReady: () => void }) {
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

    const leftArm = clonedScene.getObjectByName("left_soft_arm_down");
    const authoredRightArm = clonedScene.getObjectByName("right_soft_waving_arm");

    if (authoredRightArm) authoredRightArm.visible = false;
    if (leftArm?.parent) {
      const mirroredRightArm = leftArm.clone();
      mirroredRightArm.name = "right_soft_arm_down";
      mirroredRightArm.position.x *= -1;
      mirroredRightArm.rotation.y *= -1;
      mirroredRightArm.rotation.z *= -1;
      mirroredRightArm.scale.x *= -1;
      leftArm.parent.add(mirroredRightArm);
    }

    return { robot: clonedScene, visorMaterial: cleanVisor, eyeMaterial: cleanEyes };
  }, [scene]);
  const group = useRef<THREE.Group>(null);
  const visorMaterialRef = useRef(visorMaterial);
  const eyeMaterialRef = useRef(eyeMaterial);
  const targetScale = useMemo(() => new THREE.Vector3(), []);
  const hoverScale = useRef(1);
  const hoverLift = useRef(0);

  useEffect(() => {
    return () => {
      visorMaterial.dispose();
      eyeMaterial.dispose();
    };
  }, [eyeMaterial, visorMaterial]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;
    const breathingScale = reducedMotion ? 0 : Math.sin(time * 1.5) * 0.01;
    hoverScale.current = THREE.MathUtils.damp(
      hoverScale.current,
      reducedMotion ? 1 : hovered ? 1.04 : 1,
      5.5,
      delta,
    );
    hoverLift.current = THREE.MathUtils.damp(
      hoverLift.current,
      reducedMotion ? 0 : hovered ? 0.03 : 0,
      5.5,
      delta,
    );
    const scale = hoverScale.current + breathingScale;
    const smoothness = 1 - Math.exp(-delta * 7);
    group.current.scale.lerp(targetScale.setScalar(scale), smoothness);

    const eyeMaterialInstance = eyeMaterialRef.current;
    eyeMaterialInstance.emissiveIntensity = THREE.MathUtils.lerp(
      eyeMaterialInstance.emissiveIntensity,
      hovered
        ? 1.38
        : 1.12 + (reducedMotion ? 0 : Math.sin(time * 1.4) * 0.05),
      1 - Math.exp(-delta * 5),
    );
    visorMaterialRef.current.color.lerp(
      hovered ? HOVER_VISOR_COLOR : IDLE_VISOR_COLOR,
      1 - Math.exp(-delta * 5),
    );

    if (reducedMotion) {
      group.current.position.y = 0;
      group.current.rotation.set(0, 0, 0);
      return;
    }

    group.current.position.y =
      -0.015 + Math.sin(time * 1.35) * 0.038 + hoverLift.current;
    if (!dragging) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(time * 0.75) * 0.02,
        smoothness * 0.35,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        Math.sin(time * 1.0) * 0.02,
        smoothness * 0.35,
      );
    }

  });

  return (
    <group ref={group}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={1}>
        <primitive object={robot} />
      </group>
    </group>
  );
}

export default function AiChatRobotScene({ onReady }: { onReady: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      className="size-full"
      camera={{ position: [0, 0, 4.25], fov: 34 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-3, 1, 2]} intensity={0.7} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.14}>
          <Robot hovered={hovered} reducedMotion={reducedMotion} dragging={dragging} onReady={onReady} />
        </Bounds>
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.1}
        minAzimuthAngle={-0.45}
        maxAzimuthAngle={0.45}
        minPolarAngle={Math.PI / 2 - 0.18}
        maxPolarAngle={Math.PI / 2 + 0.18}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />
    </Canvas>
  );
}

// TODO: Keep this path in sync if public/models/ai-robot.glb is replaced.
useGLTF.preload(MODEL_PATH);
