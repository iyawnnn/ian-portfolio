"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { LogoLoop } from "@/components/v2/logo-loop";
import { RAIL_ONE, RAIL_TWO } from "@/components/v2/working-set-data";

gsap.registerPlugin(MorphSVGPlugin);

// ToolkitPanel portals to document.body (see its own comment) — ssr:false
// keeps it out of the server render entirely, same pattern as
// nav-island-loader.tsx. Allowed directly here since this file is already
// a Client Component.
const ToolkitPanel = dynamic(
  () => import("@/components/v2/toolkit-panel").then((m) => m.ToolkitPanel),
  { ssr: false },
);

const COLOR_TRANSITION = "transition-colors duration-700 ease-[cubic-bezier(0.45,0,0.15,1)] motion-reduce:transition-none";

// Liquid surface states, viewBox 0-100 wide / 0-40 tall. The body always
// extends to y=60 (well below the viewBox), so *level* is controlled
// entirely by translating the <g> — these paths only ever describe the
// *shape* of the waterline. Every variant shares the same M/C/C/L/L/Z
// structure (same anchor and control-point count) so MorphSVG interpolates
// intentionally between them instead of auto-equalizing mismatched paths.
const WAVE_SETTLED = "M0,6 C25,6 25,6 50,6 C75,6 75,6 100,6 L100,60 L0,60 Z";
const WAVE_A = "M0,8 C20,2 30,2 50,7 C65,11 80,9 100,6 L100,60 L0,60 Z"; // crest left of center
const WAVE_B = "M0,7 C15,11 30,12 50,8 C68,4 85,3 100,7 L100,60 L0,60 Z"; // crest shifts right, left drops
const WAVE_C = "M0,6.5 C20,5 35,4.5 50,6 C62,7.5 80,7 100,6.2 L100,60 L0,60 Z"; // smaller counter-wave, returning to center

// Pushes the y=6 baseline down past the 40-tall viewBox — fully below the
// pill, invisible.
const HIDDEN_Y = 34;

// The settled target: y=0 alone would leave the waterline's own y=6
// baseline uncovered (an 85%-full pill, visible as a Paper strip at the
// top). Overscanning 8 units up pushes the baseline 2 units past the
// viewBox's top edge, guaranteeing full bottom-to-top coverage; the pill's
// existing `overflow-hidden` clips the overscan for free.
const FILLED_Y = -8;

export function ToolkitReveal() {
  const [visible, setVisible] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const visibleRef = useRef(false);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const intentRef = useRef<"empty" | "filled">("empty");
  const updateIntentRef = useRef<() => void>(() => {});

  const close = () => {
    setVisible(false);
    ctaRef.current?.focus();
  };

  // One-time setup: initial liquid state, hover/focus listeners, and the
  // fill/drain sequences. Runs once so listeners aren't torn down and
  // rebuilt on every `visible` toggle.
  useEffect(() => {
    const button = ctaRef.current;
    const group = groupRef.current;
    const path = pathRef.current;
    if (!button || !group || !path) return;

    gsap.set(group, { y: HIDDEN_Y });
    gsap.set(path, { attr: { d: WAVE_SETTLED } });

    const settle = (filled: boolean) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Kill whatever's in flight first — a new tween on the same target
      // starts from its live current value, not a hardcoded start, so
      // rapid enter/leave/focus toggles never snap or fight each other.
      gsap.killTweensOf([group, path]);

      if (reduced) {
        gsap.to(group, { y: filled ? FILLED_Y : HIDDEN_Y, duration: 0.15, ease: "none" });
        gsap.set(path, { attr: { d: WAVE_SETTLED } });
        return;
      }

      const tl = gsap.timeline();
      if (filled) {
        // Level rise (gentle ease-in-out = controlled accel, smooth
        // middle, gradual settle) concurrent with an overlapping
        // wave-left → wave-right → smaller counter-wave → settle morph
        // sequence, so the surface is visibly flowing while it climbs.
        tl.to(group, { y: FILLED_Y, duration: 0.8, ease: "power2.inOut" }, 0)
          .to(path, { morphSVG: WAVE_A, duration: 0.24, ease: "sine.inOut" }, 0)
          .to(path, { morphSVG: WAVE_B, duration: 0.26, ease: "sine.inOut" }, 0.2)
          .to(path, { morphSVG: WAVE_C, duration: 0.22, ease: "sine.inOut" }, 0.42)
          .to(path, { morphSVG: WAVE_SETTLED, duration: 0.24, ease: "sine.inOut" }, 0.62);
      } else {
        // Dedicated drain, not a mechanical reverse: a small shallow wave
        // first, then the level recedes while the surface shifts and
        // flattens as it disappears below the pill.
        tl.to(path, { morphSVG: WAVE_C, duration: 0.18, ease: "sine.inOut" }, 0)
          .to(group, { y: HIDDEN_Y, duration: 0.7, ease: "power2.inOut" }, 0.05)
          .to(path, { morphSVG: WAVE_B, duration: 0.22, ease: "sine.inOut" }, 0.15)
          .to(path, { morphSVG: WAVE_SETTLED, duration: 0.2, ease: "sine.inOut" }, 0.5);
      }
    };

    const updateIntent = () => {
      const shouldFill = hoveredRef.current || focusedRef.current || visibleRef.current;
      const next = shouldFill ? "filled" : "empty";
      if (next === intentRef.current) return;
      intentRef.current = next;
      settle(shouldFill);
    };
    updateIntentRef.current = updateIntent;

    const onEnter = () => { hoveredRef.current = true; updateIntent(); };
    const onLeave = () => { hoveredRef.current = false; updateIntent(); };
    // Gated the same way the CSS text/border transition is (`focus-visible`
    // only) — a mouse click already opens the panel via `visible`, so this
    // only matters for keyboard focus.
    const onFocus = () => { focusedRef.current = button.matches(":focus-visible"); updateIntent(); };
    const onBlur = () => { focusedRef.current = false; updateIntent(); };

    button.addEventListener("pointerenter", onEnter);
    button.addEventListener("pointerleave", onLeave);
    button.addEventListener("focus", onFocus);
    button.addEventListener("blur", onBlur);

    return () => {
      button.removeEventListener("pointerenter", onEnter);
      button.removeEventListener("pointerleave", onLeave);
      button.removeEventListener("focus", onFocus);
      button.removeEventListener("blur", onBlur);
      gsap.killTweensOf([group, path]);
    };
  }, []);

  useEffect(() => {
    visibleRef.current = visible;
    updateIntentRef.current();
  }, [visible]);

  return (
    <div>
      <div data-working-set="rails" className="flex flex-col gap-6 min-[768px]:gap-7 lg:gap-8">
        <div data-working-set="rail">
          <LogoLoop
            items={RAIL_ONE}
            direction="left"
            speed={42}
            mobileSpeed={32}
            ariaLabel="Featured toolkit technologies, sequence one"
          />
        </div>
        <div data-working-set="rail">
          <LogoLoop
            items={RAIL_TWO}
            direction="right"
            speed={42}
            mobileSpeed={32}
            ariaLabel="Featured toolkit technologies, sequence two"
          />
        </div>

        <div className="mt-8 flex justify-center min-[768px]:mt-9 lg:mt-11">
          <button
            ref={ctaRef}
            type="button"
            data-working-set="cta"
            aria-expanded={visible}
            aria-controls="toolkit-panel"
            onClick={() => setVisible(true)}
            className={`group/cta relative inline-flex h-[38px] items-center justify-center overflow-hidden rounded-full border px-6 font-sans text-[13px] font-semibold uppercase tracking-[0.03em] active:scale-[0.985] lg:h-10 lg:px-7 min-[768px]:text-[14px] lg:text-[15px] ${COLOR_TRANSITION} hover:border-oxblood focus-visible:border-oxblood ${
              visible ? "border-oxblood" : "border-ink"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <g ref={groupRef}>
                <path ref={pathRef} fill="var(--color-oxblood)" />
              </g>
            </svg>

            <span
              className={`relative z-10 ${COLOR_TRANSITION} ${
                visible ? "text-paper" : "text-ink"
              } group-hover/cta:text-paper group-focus-visible/cta:text-paper`}
            >
              View toolkit
            </span>
          </button>
        </div>
      </div>

      <ToolkitPanel visible={visible} onClose={close} />
    </div>
  );
}
