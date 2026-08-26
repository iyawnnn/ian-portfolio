"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Restrained section-entrance only (tier 2 of the site's motion system) —
// each project rises and fades in once as the section enters view. No
// pin, no scroll-driven horizontal travel: the static markup in
// selected-work.tsx is a plain grid that already stands on its own
// without this, and under prefers-reduced-motion nothing here runs at all.
export function SelectedWorkMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-selected-work="root"]');
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-selected-work="item"]');

      const tweens = items.map((item) =>
        gsap.from(item, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        }),
      );

      return () => tweens.forEach((tween) => tween.scrollTrigger?.kill());
    });

    return () => mm.revert();
  }, []);

  return null;
}
