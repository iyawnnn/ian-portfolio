"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

function useDocumentVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return isVisible;
}

function Robot({ hovered, reducedMotion, dragging, onReady }: { hovered: boolean; reducedMotion: boolean; dragging: boolean; onReady: () => void }) {
  const { scene } = useGLTF(MODEL_PATH);
  const { robot, visorMaterial, eyeMaterial, rightArmPivot, rightArmRestPosition } = useMemo(() => {
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

    let rightArmPivot: THREE.Group | null = null;
    let rightArmRestPosition: THREE.Vector3 | null = null;

    if (authoredRightArm) authoredRightArm.visible = false;
    if (leftArm?.parent) {
      const mirroredRightArm = leftArm.clone();
      mirroredRightArm.name = "right_soft_arm_down";
      mirroredRightArm.position.x *= -1;
      mirroredRightArm.rotation.y *= -1;
      mirroredRightArm.rotation.z *= -1;
      mirroredRightArm.scale.x *= -1;

      const armParent = leftArm.parent;
      armParent.add(mirroredRightArm);
      clonedScene.updateMatrixWorld(true);

      rightArmPivot = new THREE.Group();
      rightArmPivot.position.set(0.6, 0, 0.06);
      armParent.add(rightArmPivot);
      rightArmPivot.updateWorldMatrix(true, false);
      rightArmPivot.attach(mirroredRightArm);
      rightArmRestPosition = rightArmPivot.position.clone();
    }

    return {
      robot: clonedScene,
      visorMaterial: cleanVisor,
      eyeMaterial: cleanEyes,
      rightArmPivot,
      rightArmRestPosition,
    };
  }, [scene]);
  const group = useRef<THREE.Group>(null);
  const visorMaterialRef = useRef(visorMaterial);
  const eyeMaterialRef = useRef(eyeMaterial);
  const targetScale = useMemo(() => new THREE.Vector3(), []);
  const hoverScale = useRef(1);
  const hoverLift = useRef(0);
  const rightArmPivotRef = useRef(rightArmPivot);
  const rightArmRestPositionRef = useRef(rightArmRestPosition);
  const armWaveBlend = useRef(0);
  const bodyLean = useRef(0);
  const bodyYaw = useRef(0);

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
    const scale = hoverScale.current;
    const smoothness = 1 - Math.exp(-delta * 7);
    group.current.scale.lerp(targetScale.setScalar(scale), smoothness);

    const eyeMaterialInstance = eyeMaterialRef.current;
    eyeMaterialInstance.emissiveIntensity = THREE.MathUtils.lerp(
      eyeMaterialInstance.emissiveIntensity,
      hovered
        ? 1.38
        : 1.12,
      1 - Math.exp(-delta * 5),
    );
    visorMaterialRef.current.color.lerp(
      hovered ? HOVER_VISOR_COLOR : IDLE_VISOR_COLOR,
      1 - Math.exp(-delta * 5),
    );

    const armPivot = rightArmPivotRef.current;
    const armRestPosition = rightArmRestPositionRef.current;
    if (armPivot && armRestPosition) {
      if (reducedMotion) {
        armWaveBlend.current = 0;
        armPivot.rotation.set(0, 0, 0);
        armPivot.position.copy(armRestPosition);
      } else {
        armWaveBlend.current = THREE.MathUtils.damp(
          armWaveBlend.current,
          hovered ? 1 : 0,
          4.2,
          delta,
        );
        const blend = armWaveBlend.current;
        const raiseProgress = THREE.MathUtils.smoothstep(blend, 0.08, 0.9);
        const waveEnvelope = THREE.MathUtils.smoothstep(blend, 0.68, 0.96);
        const wave = Math.sin(time * 5.7) * 0.4 * waveEnvelope;
        const secondaryTwist =
          Math.sin(time * 5.7 + 0.7) * 0.1 * waveEnvelope;

        armPivot.rotation.y = THREE.MathUtils.damp(
          armPivot.rotation.y,
          -1.85 * raiseProgress + wave,
          7,
          delta,
        );
        armPivot.rotation.z = THREE.MathUtils.damp(
          armPivot.rotation.z,
          -0.07 * raiseProgress + secondaryTwist,
          7,
          delta,
        );
        armPivot.position.y = THREE.MathUtils.damp(
          armPivot.position.y,
          armRestPosition.y - raiseProgress * 0.085,
          7,
          delta,
        );
      }
    }

    if (reducedMotion) {
      bodyLean.current = 0;
      bodyYaw.current = 0;
      group.current.position.y = 0;
      group.current.rotation.set(0, 0, 0);
      return;
    }

    bodyLean.current = THREE.MathUtils.damp(
      bodyLean.current,
      hovered ? 0.16 : 0,
      6,
      delta,
    );
    bodyYaw.current = THREE.MathUtils.damp(
      bodyYaw.current,
      hovered ? -0.075 : 0,
      6,
      delta,
    );

    group.current.position.y = hoverLift.current;
    if (!dragging) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        bodyYaw.current,
        smoothness * 0.35,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        bodyLean.current,
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

function InvalidateWhenShown({ visible }: { visible: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (visible) invalidate();
  }, [invalidate, visible]);

  return null;
}

export default function AiChatRobotScene({
  onReady,
  visible,
}: {
  onReady: () => void;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const reducedMotion = useReducedMotion();
  const isDocumentVisible = useDocumentVisibility();

  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const beginContinuousRendering = () => {
    clearTimeout(settleTimer.current);
    setIsSettling(true);
  };
  const finishContinuousRendering = () => {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setIsSettling(false), 900);
  };

  useEffect(
    () => () => {
      clearTimeout(settleTimer.current);
    },
    [],
  );

  const frameloop = !visible || !isDocumentVisible
    ? "never"
    : hovered || dragging || isSettling
      ? "always"
      : "demand";

  return (
    <Canvas
      frameloop={frameloop}
      className="size-full"
      camera={{ position: [0, 0, 4.25], fov: 34 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onPointerEnter={() => {
        beginContinuousRendering();
        setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
        if (!dragging) finishContinuousRendering();
      }}
    >
      <InvalidateWhenShown visible={visible} />
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
        onStart={() => {
          beginContinuousRendering();
          setDragging(true);
        }}
        onEnd={() => {
          setDragging(false);
          if (!hovered) finishContinuousRendering();
        }}
      />
    </Canvas>
  );
}
