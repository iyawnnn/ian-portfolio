"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Entrance-only: the statement lines clip-reveal up and the grid cards
// fade/rise in on scroll. No pin, no scrub — the horizontal-scroll/pin
// mechanism that used to live here moved to field-notes-motion.tsx, which
// now owns the Blog section's horizontal browse. Renders nothing — targets
// are found via the `data-selected-work` attributes on the static markup
// in selected-work.tsx, which stands on its own without this.
export function SelectedWorkMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-selected-work="root"]');
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-selected-work="statement-line"]'));
    const headerCta = root.querySelector<HTMLElement>('[data-selected-work="header-cta"]');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-selected-work="card"]'));

    if (root.getBoundingClientRect().top < window.innerHeight * 0.75) return;

    gsap.set(lines, { yPercent: 105 });
    gsap.set(headerCta, { opacity: 0, y: 10 });
    gsap.set(cards, { y: 28, opacity: 0 });

    ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0).to(
          headerCta,
          { opacity: 1, y: 0, duration: 0.5 },
          0.45,
        );
      },
    });

    ScrollTrigger.create({
      trigger: root,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(cards, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 });
      },
    });
  }, []);

  return null;
}
