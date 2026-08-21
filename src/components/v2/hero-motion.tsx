"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Orchestrates the hero's entrance, first-scroll parallax, and pointer
// parallax. Renders nothing — it locates its targets via the `data-hero`
// attributes already present on the static markup in hero.tsx, so the hero
// itself can stay a plain server component.
export function HeroMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-hero="root"]');
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const grid = root.querySelector('[data-hero="grid"]');
    const bgFields = root.querySelectorAll('[data-hero="bg-field"]');
    const decorStarburst = root.querySelector('[data-hero="decor-starburst"]');
    const decorAsterisk = root.querySelector('[data-hero="decor-asterisk"]');
    const decorOutline = root.querySelector('[data-hero="decor-outline"]');
    const wordmark = root.querySelector('[data-hero="wordmark"]');
    const metadata = root.querySelectorAll('[data-hero="metadata"]');
    const nav = root.querySelector('[data-hero="nav"]');
    const headerItems = [wordmark, ...metadata, nav].filter(Boolean);
    const lineWraps = root.querySelectorAll('[data-hero="headline-line"]');
    const lines = Array.from(lineWraps);
    const pills = root.querySelectorAll<HTMLElement>('[data-hero="image"]');
    const scrollCue = root.querySelector('[data-hero="scroll-cue"]');

    const allTargets = [
      grid,
      ...Array.from(bgFields),
      decorStarburst,
      decorAsterisk,
      decorOutline,
      ...headerItems,
      ...lines,
      ...Array.from(pills),
      scrollCue,
    ].filter(Boolean);

    if (reducedMotion) {
      // Final resting state, no motion at all.
      gsap.set(allTargets, { clearProps: "all" });
      return;
    }

    // --- Entrance ---------------------------------------------------------
    // The decor SVGs' resting opacity is set responsively via Tailwind
    // classes in hero.tsx (mobile gets a lower value than desktop). Capture
    // whatever's currently resolved for the active breakpoint before
    // hiding them, so the entrance animates back to the *correct* value
    // instead of a single hardcoded number that would fight the
    // responsive classes (inline styles always win over media-queried
    // classes, breakpoint or not).
    const starburstOpacity = decorStarburst
      ? getComputedStyle(decorStarburst).opacity
      : "1";
    const asteriskOpacity = decorAsterisk
      ? getComputedStyle(decorAsterisk).opacity
      : "1";
    const outlineOpacity = decorOutline
      ? getComputedStyle(decorOutline).opacity
      : "1";

    // Decor travel distances scale down on small screens so the motion
    // stays proportional (and can't push anything toward the edge of the
    // overflow-clip boundary) without needing a second set of hand-tuned
    // values.
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const motionScale = isMobile ? 0.6 : 1;
    const m = (n: number) => n * motionScale;

    gsap.set(grid, { opacity: 0 });
    gsap.set(headerItems, { opacity: 0, y: -10 });
    gsap.set(lines, { yPercent: 110 });
    gsap.set(pills, { opacity: 0, scale: 0.88 });
    gsap.set(scrollCue, { opacity: 0 });
    gsap.set(decorStarburst, {
      opacity: 0,
      scale: 0.62,
      rotate: -21,
      x: m(-75),
      y: m(32),
    });
    gsap.set(decorAsterisk, {
      opacity: 0,
      scale: 0.32,
      rotate: -40,
      y: m(-12),
    });
    gsap.set(decorOutline, {
      opacity: 0,
      scale: 1.15,
      rotate: 3,
      x: m(85),
      y: m(40),
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(grid, { opacity: 1, duration: 0.6 }, 0)
      .to(
        decorOutline,
        {
          opacity: outlineOpacity,
          scale: 1,
          rotate: 0,
          x: 0,
          y: 0,
          duration: 1.8,
          ease: "expo.out",
        },
        0,
      )
      .to(
        headerItems,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
        0.05,
      )
      .to(
        decorStarburst,
        {
          opacity: starburstOpacity,
          scale: 1,
          rotate: -3,
          x: 0,
          y: 0,
          duration: 1.55,
          ease: "back.out(1.4)",
        },
        0.15,
      )
      .to(lines, { yPercent: 0, duration: 0.7, stagger: 0.1 }, 0.15)
      .to(
        pills,
        { opacity: 1, scale: 1, duration: 0.55, stagger: 0.12, ease: "power2.out" },
        0.35,
      )
      .to(
        decorAsterisk,
        {
          opacity: asteriskOpacity,
          scale: 1,
          rotate: 0,
          y: 0,
          duration: 1,
          ease: "back.out(1.8)",
        },
        0.6,
      )
      .to(scrollCue, { opacity: 1, duration: 0.4 }, 0.9);

    // --- First-scroll parallax --------------------------------------------
    // Deferred until the entrance timeline finishes: activating a scrubbed
    // ScrollTrigger immediately would fight the entrance tween for any
    // property they both touch (a scrub timeline re-renders its "from"
    // state on every tick, even at rest — which was overwriting the
    // entrance animation's yPercent on line 2 every frame and made it look
    // like it never appeared). Only x/y drift is used here; lines are never
    // faded, so all three stay fully readable through the transition.
    const [line1, line2, line3] = lines;
    if (line1 && line2 && line3) {
      tl.eventCallback("onComplete", () => {
        const scrollTl = gsap.timeline({ defaults: { ease: "none" } });
        scrollTl
          .to(line1, { xPercent: -4 }, 0)
          .to(line2, { xPercent: 4 }, 0)
          .to(line3, { xPercent: -2 }, 0)
          .to(headerItems, { opacity: 0.4, y: -8 }, 0)
          .to(scrollCue, { opacity: 0 }, 0);

        // The blurred atmosphere fields are static — no scroll or
        // Lenis-driven motion on them, by design (they caused noticeable
        // scroll jank when animated previously). The decor SVGs get only a
        // tiny transform-only nudge here; each is a plain <img>/opacity
        // change, never blur/filter/width/height/top/left.
        if (decorStarburst) {
          scrollTl.to(
            decorStarburst,
            { x: m(24), y: m(30), rotate: "+=10", scale: 1.04 },
            0,
          );
        }
        if (decorAsterisk) {
          scrollTl.to(
            decorAsterisk,
            { x: m(-6), y: m(28), rotate: "+=12", scale: 1.03 },
            0,
          );
        }
        if (decorOutline) {
          scrollTl.to(
            decorOutline,
            { x: m(-50), y: m(-24), rotate: "-=2", scale: 0.97 },
            0,
          );
        }

        // End extended from the original 45% so the larger decor travel
        // distances above have enough scroll distance to read as smooth,
        // slow-scrubbed motion rather than a rushed snap. This is still the
        // one shared hero ScrollTrigger — no fake scroll height was added,
        // just a larger progress window mapped onto whatever scroll the
        // document already has.
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "+=60%",
          scrub: 0.6,
          animation: scrollTl,
        });

        // No idle/looping animation after entrance — the decorations stay
        // alive through scroll only, per the final intended behavior.
      });
    }

    // --- Pointer parallax (desktop, fine-pointer only) ---------------------
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (canHover && pills.length) {
      const depths = [1, 0.75];
      const setters = Array.from(pills).map((pill, i) => ({
        pill,
        x: gsap.quickTo(pill, "x", { duration: 0.6, ease: "power3.out" }),
        y: gsap.quickTo(pill, "y", { duration: 0.6, ease: "power3.out" }),
        rotate: gsap.quickTo(pill, "rotate", {
          duration: 0.6,
          ease: "power3.out",
        }),
        depth: depths[i] ?? 0.6,
      }));

      const handlePointerMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        setters.forEach(({ pill, x, y, rotate, depth }) => {
          // A pill hovered/focused pauses this loop for itself (see
          // portrait-pill.tsx) so its hover transition never fights the
          // ambient parallax for the same transform.
          if (pill.dataset.parallaxPaused === "true") return;
          x(nx * 12 * depth);
          y(ny * 8 * depth);
          rotate(nx * 1.5 * depth);
        });
      };

      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () =>
        window.removeEventListener("pointermove", handlePointerMove);
    }
  }, []);

  return null;
}
