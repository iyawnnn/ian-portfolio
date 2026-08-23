"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Orchestrates the Practice section's headline reveal and per-item entrance.
// Renders nothing — targets are located via `data-practice` attributes
// already present on the static markup in practice.tsx. Layout itself is
// pure CSS (grid/subgrid); everything here is progressive enhancement —
// the section works identically without it, just without the entrance
// motion, and `prefers-reduced-motion` renders it that way on purpose.
//
// This only drives the *Practice* instance of the reused Hero asterisk
// asset — it queries exclusively within `[data-practice="root"]`, never
// touches Hero's own `[data-hero]`-scoped elements or timeline, and Hero's
// GSAP/ScrollTrigger setup (hero-motion.tsx) is untouched.
export function PracticeMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-practice="root"]');
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-practice="headline-line"]'));
    const between = root.querySelector<HTMLElement>('[data-practice="headline-between"]');
    const decor = root.querySelector<HTMLElement>('[data-practice="brand-geometry"]');
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-practice-item]"));

    // The ambient spin below is created asynchronously (inside a
    // ScrollTrigger's onEnter, after the entrance timeline completes), so
    // it isn't automatically swept up by useGSAP's context revert the way
    // synchronously-created tweens are. Kill it explicitly on cleanup.
    let ambientSpin: gsap.core.Tween | null = null;

    if (reducedMotion) {
      gsap.set([...lines, decor, ...items], { clearProps: "all" });
      return;
    }

    gsap.set(lines, { yPercent: 105 });
    gsap.set(between, { opacity: 0, x: -20 });

    // The decor is hidden below "min-[1120px]" (see practice.tsx) — skip
    // animating it entirely there.
    const decorVisible = window.matchMedia("(min-width: 1120px)").matches && !!decor;
    if (decorVisible) {
      gsap.set(decor, { opacity: 0, rotation: -18, scale: 0.82 });
    }

    ScrollTrigger.create({
      trigger: root,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(lines, { yPercent: 0, duration: 0.95, stagger: 0.12 }, 0).to(
          between,
          { opacity: 1, x: 0, duration: 0.6 },
          0.42,
        );

        if (decorVisible) {
          tl.to(decor, { opacity: 1, rotation: 0, scale: 1, duration: 1.1, ease: "power3.out" }, 0.5);

          // Mirrors Hero's own asterisk motion language (see
          // hero-motion.tsx's `asteriskSpin`): a slow, continuous,
          // transform-only rotation that keeps running while the page is
          // stationary — not the scroll-scrubbed nudge Hero also applies
          // to its asterisk's outer wrapper, which only moves while
          // scrolling and was dropped here in favor of this single
          // always-on tween, per feedback that two rotation sources on
          // one property were unnecessary. Deferred until the entrance
          // timeline fully completes so it never fights that tween for
          // ownership of `rotation`.
          tl.eventCallback("onComplete", () => {
            ambientSpin = gsap.to(decor, {
              rotation: "+=360",
              duration: 28,
              repeat: -1,
              ease: "none",
            });
          });
        }
      },
    });

    items.forEach((item) => {
      const textParts = Array.from(item.querySelectorAll<HTMLElement>('[data-practice="text-part"]'));
      const visual = item.querySelector<HTMLElement>('[data-practice="item-visual"]');
      const visualScaleTarget = item.querySelector<HTMLElement>('[data-practice="visual-hover-scale"]');

      gsap.set(textParts, { opacity: 0, y: 32 });
      if (visual) gsap.set(visual, { clipPath: "inset(100% 0 0 0)" });
      if (visualScaleTarget) gsap.set(visualScaleTarget, { scale: 1.06 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(textParts, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0);
          if (visual) {
            tl.to(visual, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.out" }, 0.15);
          }
          if (visualScaleTarget) {
            tl.to(visualScaleTarget, { scale: 1, duration: 1.1, ease: "power3.out" }, 0.15)
              // Hands control back to the CSS hover scale class once the
              // entrance settles, so hovering the visual afterward isn't
              // fighting a leftover GSAP inline transform.
              .set(visualScaleTarget, { clearProps: "transform" });
          }
        },
      });
    });

    return () => {
      ambientSpin?.kill();
    };
  }, []);

  return null;
}
