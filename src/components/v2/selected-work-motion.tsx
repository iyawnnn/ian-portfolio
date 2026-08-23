"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Pins the Selected Work reel and converts vertical scroll into horizontal
// track movement. Renders nothing — targets are found via the
// `data-selected-work` attributes on the static markup in selected-work.tsx,
// which stands on its own without this: below 1024px (and under
// prefers-reduced-motion) the same markup is a native horizontal
// overflow/snap gallery, so nothing here runs. The 1024px threshold
// matches selected-work.tsx's own `lg:` activation classes — below it,
// cards are sized against viewport width (native scroll, natural
// height); at/above it, this pin takes over and cards size against
// viewport height (h-screen pinned section).
//
// Scroll position comes from the shared Lenis instance in smooth-scroll.tsx
// (it already drives ScrollTrigger.update) — no second smooth-scroll or
// nested scroll container is created here.
export function SelectedWorkMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-selected-work="root"]');
    const viewport = root?.querySelector<HTMLElement>('[data-selected-work="viewport"]');
    const track = root?.querySelector<HTMLElement>('[data-selected-work="track"]');
    if (!root || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // Travel is measured from the real rendered track, so responsive card
      // widths, the gaps and the leading/trailing padding are all accounted
      // for; invalidateOnRefresh re-runs these functions on resize.
      const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${travel()}`,
          pin: true,
          // Every route is wrapped by `src/app/template.tsx`'s
          // `.page-enter` div, whose page-enter CSS animation
          // (globals.css) leaves a non-"none" `transform` on that
          // ancestor permanently via fill-mode "both". Any transformed
          // ancestor changes the containing block for `position:fixed`
          // descendants, so ScrollTrigger's default "fixed" pinType
          // pins relative to `.page-enter` instead of the real viewport
          // — its per-frame `top` compensation then pushes the pinned
          // section off-screen as the page scrolls (observed: the
          // section renders blank and the horizontal reel appears to
          // skip straight past project 1). Forcing "transform" pins via
          // a plain translate instead of `position:fixed`, which is
          // immune to ancestor transforms.
          pinType: "transform",
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-selected-work="card"], [data-selected-work="cta-card"]',
      );
      const entrance = gsap.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      return () => {
        entrance.scrollTrigger?.kill();
        tween.scrollTrigger?.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
