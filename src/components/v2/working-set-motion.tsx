"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Single scroll-triggered entrance for the whole section — one
// ScrollTrigger, no per-icon triggers. Targets are found via
// `data-working-set` attributes on markup that already stands on its
// own without it: the outline layer is the real, always-legible text,
// and the fill duplicate is baked in JSX at `clip-path: inset(0 100% 0
// 0)` (fully hidden) so there's no flash of solid text before this
// runs.
export function WorkingSetMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-working-set="root"]');
    if (!root) return;

    const fillMask = root.querySelector<HTMLElement>('[data-working-set="headline-fill-mask"]');
    const doesnt = root.querySelector<HTMLElement>('[data-working-set="headline-doesnt"]');
    const dividerLines = Array.from(root.querySelectorAll<HTMLElement>('[data-working-set="divider-line"]'));
    const dividerMark = root.querySelector<HTMLElement>('[data-working-set="divider-mark"]');
    const zones = Array.from(root.querySelectorAll<HTMLElement>('[data-working-set="zone"]'));
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-working-set="tech-item"]'));

    const targets = [fillMask, doesnt, ...dividerLines, dividerMark, ...zones, ...items];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (fillMask) gsap.set(fillMask, { clipPath: "inset(0 0% 0 0)" });
      gsap.set(targets.filter((t) => t !== fillMask), { clearProps: "all" });
      return;
    }

    gsap.set(dividerLines, { scaleX: 0 });
    gsap.set(dividerMark, { opacity: 0 });
    gsap.set(zones, { opacity: 0, y: 18 });
    gsap.set(items, { opacity: 0, y: 12, scale: 0.97 });
    if (doesnt) gsap.set(doesnt, { opacity: 0, y: 10, rotate: -1 });
    // fillMask's clip-path starting state is already baked into the JSX
    // (inset(0 100% 0 0)) — no gsap.set needed for it, and skipping it
    // avoids a redundant style write on an element GSAP is about to
    // animate anyway.

    ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        // Outline -> fill: the solid Warm Black duplicate wipes in left
        // to right by animating its own clip-path inset, not a color
        // tween — "the printed headline being filled in."
        if (fillMask) {
          tl.to(fillMask, { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "power2.inOut" }, 0);
        }
        if (doesnt) {
          tl.to(doesnt, { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: "power3.out" }, 0.45);
        }
        tl.to(dividerLines, { scaleX: 1, duration: 0.6 }, 0.85)
          .to(dividerMark, { opacity: 1, duration: 0.4 }, 1.1)
          .to(zones, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 1.15)
          .to(items, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.035 }, 1.35);
      },
    });
  }, []);

  return null;
}
