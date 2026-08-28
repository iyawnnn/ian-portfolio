"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CIRCLE_LABEL_TOP = "VIEW";
const CIRCLE_LABEL_BOTTOM = "PROJECT";

const REVEAL_HIDDEN = "circle(0% at 50% 50%)";
const REVEAL_COVERED = "circle(72% at 50% 50%)";
const REVEAL_SHOWN = "circle(142% at 50% 50%)";

export function ProjectHoverLayer({ hasReveal = false }: { hasReveal?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const circle = circleRef.current;
      if (!root || !circle) return;

      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealImage = hasReveal
        ? root.parentElement?.querySelector<HTMLElement>('[data-hover-reveal="image"]')
        : null;

      gsap.set(circle, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.8 });
      if (revealImage) {
        gsap.set(revealImage, { clipPath: REVEAL_HIDDEN, opacity: 0.85, scale: 1.025 });
      }

      const circleX = gsap.quickTo(circle, "x", {
        duration: reducedMotion ? 0 : 0.3,
        ease: "power3.out",
      });
      const circleY = gsap.quickTo(circle, "y", {
        duration: reducedMotion ? 0 : 0.3,
        ease: "power3.out",
      });

      let revealTimeline: gsap.core.Timeline | null = null;

      const onMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        circleX(event.clientX - rect.left);
        circleY(event.clientY - rect.top);
      };

      const onEnter = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        gsap.set(circle, { x: event.clientX - rect.left, y: event.clientY - rect.top });
        document.documentElement.setAttribute("data-cursor-suppressed", "true");
        gsap.to(circle, {
          opacity: 1,
          scale: 1,
          duration: reducedMotion ? 0.01 : 0.28,
          ease: "power2.out",
        });

        if (!revealImage) return;

        revealTimeline?.kill();
        revealTimeline = gsap.timeline();

        if (reducedMotion) {
          revealTimeline.to(revealImage, {
            clipPath: REVEAL_SHOWN,
            opacity: 1,
            scale: 1,
            duration: 0.01,
          });
          return;
        }

        revealTimeline.to(
          revealImage,
          {
            clipPath: REVEAL_COVERED,
            duration: 0.68,
            ease: "power2.out",
          },
          0,
        );
        revealTimeline.to(
          revealImage,
          {
            opacity: 1,
            scale: 1,
            duration: 0.82,
            ease: "power2.out",
          },
          0,
        );
        revealTimeline.to(
          revealImage,
          {
            clipPath: REVEAL_SHOWN,
            duration: 0.14,
            ease: "power2.out",
          },
          0.68,
        );
      };

      const onLeave = () => {
        document.documentElement.removeAttribute("data-cursor-suppressed");
        gsap.to(circle, {
          opacity: 0,
          scale: 0.8,
          duration: reducedMotion ? 0.01 : 0.22,
          ease: "power2.inOut",
        });

        if (!revealImage) return;

        revealTimeline?.kill();
        revealTimeline = gsap.timeline().to(revealImage, {
          clipPath: REVEAL_HIDDEN,
          opacity: 0.85,
          scale: 1.025,
          duration: reducedMotion ? 0.01 : 0.68,
          ease: "power2.inOut",
        });
      };

      root.addEventListener("pointerenter", onEnter);
      root.addEventListener("pointerleave", onLeave);
      root.addEventListener("pointermove", onMove, { passive: true });

      return () => {
        root.removeEventListener("pointerenter", onEnter);
        root.removeEventListener("pointerleave", onLeave);
        root.removeEventListener("pointermove", onMove);
        document.documentElement.removeAttribute("data-cursor-suppressed");
        revealTimeline?.kill();
        gsap.killTweensOf(circle);
        if (revealImage) gsap.killTweensOf(revealImage);
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-project-hover="root" className="absolute inset-0 z-10">
      <div
        ref={circleRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 flex h-[92px] w-[92px] scale-80 flex-col items-center justify-center rounded-full border border-ink bg-paper/20 text-center font-sans text-[9px] font-medium uppercase leading-[1.3] tracking-[0.1em] text-ink opacity-0"
      >
        <span>{CIRCLE_LABEL_TOP}</span>
        <span>{CIRCLE_LABEL_BOTTOM}</span>
      </div>
    </div>
  );
}
