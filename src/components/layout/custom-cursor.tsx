"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { INTRO_COMPLETE_EVENT } from "@/lib/portfolio-intro-events";

const INK = "#11110F";
const PAPER = "#F2F0E9";
const INTERACTIVE_SELECTOR = 'a, button, [role="button"]';

// Mounted once near the app root. Fully self-contained: reads pointer
// position via refs/GSAP quickTo (no React state per move), toggles the
// `has-custom-cursor` class on <html>, and lets CSS (globals.css) decide
// visibility against the existing `data-intro-active` attribute — so this
// component never needs to know about the intro loader directly.
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", {
      duration: reducedMotion ? 0 : 0.1,
      ease: "power3.out",
    });
    const dotY = gsap.quickTo(dot, "y", {
      duration: reducedMotion ? 0 : 0.1,
      ease: "power3.out",
    });
    const ringX = gsap.quickTo(ring, "x", {
      duration: reducedMotion ? 0 : 0.25,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(ring, "y", {
      duration: reducedMotion ? 0 : 0.25,
      ease: "power3.out",
    });

    let hoverScale = 1;
    let themeFrameQueued = false;
    let currentColor = INK;

    const applyTheme = (x: number, y: number) => {
      themeFrameQueued = false;
      const el = document.elementFromPoint(x, y);
      const isDarkSection =
        el?.closest("[data-cursor-theme]")?.getAttribute(
          "data-cursor-theme",
        ) === "dark";
      const color = isDarkSection ? PAPER : INK;
      if (color === currentColor) return;
      currentColor = color;
      // Tweened, not an instant style write — a hard color snap between
      // Paper and Warm Black sections read as a glitch; GSAP's core
      // CSSPlugin interpolates color properties natively (no extra plugin).
      const colorDuration = reducedMotion ? 0 : 0.28;
      gsap.to(ring, { borderColor: color, duration: colorDuration, ease: "power2.out", overwrite: "auto" });
      gsap.to(dot, { backgroundColor: color, duration: colorDuration, ease: "power2.out", overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!themeFrameQueued) {
        themeFrameQueued = true;
        requestAnimationFrame(() => applyTheme(e.clientX, e.clientY));
      }
    };

    const onOver = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(INTERACTIVE_SELECTOR)) return;
      hoverScale = 1.25;
      gsap.to(ring, { scale: hoverScale, duration: 0.25, ease: "power3.out" });
    };
    const onOut = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(INTERACTIVE_SELECTOR)) return;
      hoverScale = 1;
      gsap.to(ring, { scale: hoverScale, duration: 0.25, ease: "power3.out" });
    };
    const onDown = () => {
      gsap.to(ring, {
        scale: hoverScale * 0.88,
        duration: 0.08,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    };

    const start = () => {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerout", onOut, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.classList.add("has-custom-cursor");
    };
    const stop = () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.killTweensOf([ring, dot]);
    };

    // Skip animating anything for as long as the intro is up — CSS already
    // keeps the cursor invisible then, so tracking pointer moves during it
    // would just be wasted work.
    if (document.documentElement.hasAttribute("data-intro-active")) {
      window.addEventListener(INTRO_COMPLETE_EVENT, start, { once: true });
      return () => window.removeEventListener(INTRO_COMPLETE_EVENT, start);
    }

    start();
    return stop;
  }, []);

  return (
    <div
      aria-hidden="true"
      data-custom-cursor-root
      className="pointer-events-none fixed inset-0 z-[200] opacity-0"
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border"
        style={{ borderColor: INK }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-[7px] w-[7px] rounded-full"
        style={{ backgroundColor: INK }}
      />
    </div>
  );
}
