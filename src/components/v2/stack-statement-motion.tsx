"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FILLED = "inset(0 0% 0 0)";
const UNFILLED = "inset(0 100% 0 0)";

// Entirely local to this section: queries only within
// `[data-stack-statement="root"]`. The statement itself never moves —
// "THE STACK CHANGES." and "doesn't." render solid from the first frame;
// only "THE STANDARD" resolves from outline to solid fill as the user
// scrolls. Below `1024px` (matching Selected Work's own desktop
// threshold) there's no pin: the same fill just tracks scroll as the
// section crosses the viewport naturally.
export function StackStatementMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-stack-statement="root"]');
    if (!root) return;

    const standard = root.querySelector<HTMLElement>('[data-stack-statement="fill-standard"]');
    if (!standard) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(standard, { clipPath: FILLED });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(standard, { clipPath: UNFILLED });

      const tween = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          // ~80vh — the fill responds directly to scroll, no dead time.
          end: () => `+=${window.innerHeight * 0.8}`,
          pin: true,
          // `src/app/template.tsx`'s `.page-enter` wrapper carries a
          // permanent (identity but non-"none") `transform` via its
          // page-enter CSS animation's fill-mode "both", which changes
          // the containing block for `position:fixed` descendants —
          // ScrollTrigger's default "fixed" pinType renders a pinned
          // section off-screen under it (same root cause fixed in
          // Selected Work's pin). "transform" pins via a plain translate
          // instead, which is immune to ancestor transforms.
          pinType: "transform",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tween
        .to(standard, { clipPath: FILLED, duration: 0.5 }, 0.2)
        // Inert padding tween — forces total timeline duration to 1 so
        // scroll progress 90%→100% is a brief, deliberate hold on the
        // finished composition instead of releasing the instant the last
        // real tween ends.
        .to(root, { duration: 0 }, 1);

      return () => {
        tween.scrollTrigger?.kill();
        gsap.set(standard, { clearProps: "all" });
      };
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(standard, { clipPath: UNFILLED });

      const tween = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tween.to(standard, { clipPath: FILLED, duration: 0.5 }, 0.2);

      return () => {
        tween.scrollTrigger?.kill();
        gsap.set(standard, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
