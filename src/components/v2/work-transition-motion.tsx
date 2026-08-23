"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Entirely local to this section: queries only within
// `[data-work-transition="root"]` and never touches other timelines.
export function WorkTransitionMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-work-transition="root"]');
    if (!root) return;

    const ribbon = root.querySelector<HTMLElement>('[data-work-transition="ribbon"]');
    if (!ribbon) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(ribbon, { clearProps: "all" });
      return;
    }

    gsap.set(ribbon, { opacity: 0, y: 32 });

    ScrollTrigger.create({
      trigger: root,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(ribbon, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
      },
    });
  }, []);

  return null;
}
