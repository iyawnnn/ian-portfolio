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
    const asteriskSpin = root.querySelector<HTMLElement>(
      '[data-hero="decor-asterisk-spin"]',
    );
    const decorOutline = root.querySelector('[data-hero="decor-outline"]');
    const roleText = root.querySelector('[data-hero="role-annotation-text"]');
    const roleUnderline = root.querySelector(
      '[data-hero="role-underline-path"]',
    );

    // The headline renders three complete, separately-marked-up
    // compositions (desktop/tablet/mobile-lg/mobile — see hero.tsx), only
    // one of which is visible at a time via CSS. Scope every
    // headline-line/pill query to whichever group is actually on screen
    // right now, so we never animate (or even touch) the three hidden,
    // inert duplicates. mobile-lg (550–639px) is a headline-composition-only
    // tier — every other breakpoint-branched value below (motionScale,
    // outlineMotion, asterisk spin duration) deliberately treats it the
    // same as "mobile" rather than adding a fourth branch everywhere, since
    // nothing outside the headline itself needed a distinct value here.
    const activeBreakpoint = window.matchMedia("(min-width: 1024px)").matches
      ? "desktop"
      : window.matchMedia("(min-width: 640px)").matches
        ? "tablet"
        : window.matchMedia("(min-width: 550px)").matches
          ? "mobile-lg"
          : "mobile";
    const activeGroup = root.querySelector(
      `[data-hero-bp="${activeBreakpoint}"]`,
    );
    const lineWraps = activeGroup
      ? activeGroup.querySelectorAll('[data-hero="headline-line"]')
      : [];
    const lines = Array.from(lineWraps);
    const pills = activeGroup
      ? activeGroup.querySelectorAll<HTMLElement>('[data-hero="image"]')
      : root.querySelectorAll<HTMLElement>('[data-hero="image"]');
    // The outer, non-interactive wrapper PortraitPill renders around its
    // Link — the sole target for the initial pop-in entrance below. Kept
    // separate from `pills` (the inner Link), which stays the target for
    // pointer-parallax and hover/focus, so the two animation systems never
    // write to the same element's transform.
    const pillOuters = activeGroup
      ? activeGroup.querySelectorAll<HTMLElement>('[data-hero="pill-outer"]')
      : root.querySelectorAll<HTMLElement>('[data-hero="pill-outer"]');
    // Purely presentational capsule-shape layer between pillOuters (real
    // layout width, entrance-owned) and the interactive Link (hover/focus,
    // untouched) — never read/written by hover, so entrance can freely
    // animate its opacity/scale for the "pop" without any risk of
    // colliding with the hover timeline in portrait-pill.tsx, which
    // targets a different element (imageWrapRef) entirely.
    const pillClips = activeGroup
      ? activeGroup.querySelectorAll<HTMLElement>('[data-hero="pill-clip"]')
      : root.querySelectorAll<HTMLElement>('[data-hero="pill-clip"]');
    const bottomRail = root.querySelector('[data-hero="bottom-rail"]');

    const allTargets = [
      grid,
      ...Array.from(bgFields),
      decorStarburst,
      decorAsterisk,
      asteriskSpin,
      decorOutline,
      roleText,
      roleUnderline,
      ...lines,
      ...Array.from(pills),
      ...Array.from(pillOuters),
      ...Array.from(pillClips),
      bottomRail,
    ].filter(Boolean);

    if (reducedMotion) {
      // Final resting state, no motion at all.
      gsap.set(allTargets, { clearProps: "all" });
      // The role text's clip-path and the underline's stroke-dashoffset are
      // baked as static inline styles in hero.tsx (not written by a prior
      // GSAP call), so clearProps can't be relied on to know about them —
      // reset them explicitly to their fully-revealed state.
      gsap.set([roleText, roleUnderline].filter(Boolean), {
        clipPath: "none",
        strokeDashoffset: 0,
      });
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
    const motionScale =
      activeBreakpoint === "desktop" ? 1 : activeBreakpoint === "tablet" ? 0.7 : 0.35;
    const m = (n: number) => n * motionScale;

    // The outline is now visible at every breakpoint (previously hidden
    // below sm), but at its much smaller mobile footprint the generic
    // motionScale still reads as a large relative swing, so mobile gets its
    // own near-static, fixed (not scaled) travel distances instead.
    const outlineMotion =
      activeBreakpoint === "mobile"
        ? { entranceX: 5, entranceY: 5, scrollX: -5, scrollY: -5, scrollRotate: -0.5 }
        : { entranceX: m(85), entranceY: m(40), scrollX: m(-50), scrollY: m(-24), scrollRotate: -2 };

    // The pill's true layout width is em-based (relative to the active
    // headline's font-size), so it can't be hardcoded — measure each
    // pillOuter's CSS-resolved width (still fully intact at this point,
    // nothing has touched it yet) before hiding anything, and animate the
    // real inline `width` style from 0 up to exactly that captured px
    // value. This is what makes "BUILD FOR THE WEB," etc. actually reflow
    // around the growing pill instead of a transform:scale() that would
    // leave the surrounding text untouched. Margin is no longer part of
    // this at all — it's a static em-based value baked directly into
    // portrait-pill.tsx's className (mx-[0.15em]), the single spacing
    // source around the pill, present unchanged both before and after
    // this animation.
    const pillFinalWidths = Array.from(pillOuters).map(
      (el) => el.getBoundingClientRect().width,
    );

    gsap.set(grid, { opacity: 0 });
    gsap.set(lines, { yPercent: 110 });
    // overflow:hidden here is temporary — needed only while width is
    // animating from 0, so the growing capsule doesn't visually poke out
    // past its own still-narrower box. It gets removed (see the width
    // tween below) once the entrance settles, specifically so it can never
    // clip the hover label afterward — that clipping was the root cause of
    // "About me" getting cut off on its right edge.
    gsap.set(pillOuters, { width: 0, overflow: "hidden" });
    gsap.set(pillClips, { opacity: 0, scale: 0.82 });
    gsap.set(bottomRail, { opacity: 0 });
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
      x: outlineMotion.entranceX,
      y: outlineMotion.entranceY,
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
      // Pills insert into the sentence noticeably after the headline/role
      // text have started appearing — like the images are dropped into
      // typography that's already there, not part of the initial
      // wordmark/grid/headline wave. stagger:0.2 with two elements lands
      // pill 1 at t=1.1 and pill 2 at t=1.3. Width is a real layout
      // property, so this single tween is what makes the surrounding
      // headline words physically slide over as each pill grows — a
      // transform:scaleX() alone would not affect layout at all.
      .to(
        pillOuters,
        {
          width: (i) => pillFinalWidths[i],
          duration: 0.75,
          ease: "power3.inOut",
          stagger: 0.2,
        },
        1.1,
      )
      // The capsule's own visual pop (opacity/scale) rides on the
      // presentational clip layer only — never the outer (layout) or the
      // interactive Link (hover/parallax) — so it can't fight either.
      .to(
        pillClips,
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.3)",
          stagger: 0.2,
        },
        1.1,
      )
      // Hands control of width back to the CSS class in portrait-pill.tsx
      // once the insertion settles, so both pills stay correctly
      // responsive to any later viewport change instead of being frozen at
      // the px value measured on mount — and releases the temporary
      // overflow:hidden at the same moment, so the outer wrapper can never
      // clip the interactive pill's hover label afterward (that permanent
      // clipping was the root cause of "About me" getting cut off). The
      // pill-clip layer's own overflow-hidden/rounded-full underneath is
      // untouched and stays permanent — that one's job is the actual
      // capsule shape for the portrait/oxblood-fill layers, not entrance
      // containment. Positioned at the exact end of the *second*
      // (staggered, later-finishing) pill's width tween specifically —
      // using ">" here would instead resolve to the end of the pillClips
      // tween above, which finishes earlier and would clear pill 2's
      // inline width while its own tween was still running, leaving it
      // re-written and never actually handed back to CSS.
      .set(
        pillOuters,
        { clearProps: "width,overflow" },
        1.1 + 0.2 + 0.75,
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
      // Role annotation "handwriting": the visible glyphs never change —
      // only a clip-path sweeps left to right, revealing the already-set
      // Pinyon Script text underneath. The from/to polygons keep the same
      // ~15pt gap between their top/bottom x-values throughout the tween,
      // so the reveal edge stays a pronounced diagonal slant (like a pen
      // nib cutting across connected cursive) rather than a flat
      // rectangular wipe. Starts shortly after the headline begins
      // revealing (0.15) so the two feel like one continuous entrance.
      .fromTo(
        roleText,
        { clipPath: "polygon(0% 0%, -3% 0%, -15% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 115% 0%, 103% 100%, 0% 100%)",
          duration: 1.4,
          ease: "power3.out",
        },
        0.3,
      )
      // The underline starts once the phrase reveal is ~84% complete
      // (0.3 + 1.4 * 0.84) rather than waiting for it to fully finish, so
      // it reads as the pen sweeping under the tail end of the same
      // stroke rather than a separate, later beat.
      .to(
        roleUnderline,
        { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" },
        0.3 + 1.4 * 0.84,
      )
      .to(bottomRail, { opacity: 1, duration: 0.4 }, 0.9);

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
          .to(bottomRail, { opacity: 0 }, 0);

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
            {
              x: outlineMotion.scrollX,
              y: outlineMotion.scrollY,
              rotate: `-=${Math.abs(outlineMotion.scrollRotate)}`,
              scale: 0.97,
            },
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
        // Exception: the asterisk's inner spin element (a separate DOM node
        // from decorAsterisk, which still only ever gets the entrance/scroll
        // writes above) gets one continuous, transform-only 360deg loop,
        // starting only once entrance is fully settled.
        if (asteriskSpin) {
          gsap.to(asteriskSpin, {
            rotate: 360,
            duration:
              activeBreakpoint === "mobile" || activeBreakpoint === "mobile-lg"
                ? 26
                : 20,
            repeat: -1,
            ease: "none",
          });
        }
      });
    }

    // --- Pointer parallax (desktop/tablet, fine-pointer only) --------------
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    // Explicit breakpoint gate on top of the hover/pointer media query:
    // a narrow *touch* device already fails canHover, but a real mouse in a
    // narrowed browser window wouldn't — "mobile/touch: disable entirely"
    // means gating on the active breakpoint too, not just pointer type.
    const parallaxEnabled =
      canHover &&
      (activeBreakpoint === "desktop" || activeBreakpoint === "tablet");

    if (parallaxEnabled && pills.length) {
      // Reduced and hard-clamped so pointer drift can never visually reach
      // the edge of the pill's own centered slot (see portrait-pill.tsx) —
      // the slot's spare room on each side is what needs to absorb this
      // motion without crowding the adjacent text.
      const xLimit = activeBreakpoint === "desktop" ? 2 : 1.5;
      const yLimit = activeBreakpoint === "desktop" ? 1.5 : 1.2;
      const clamp = gsap.utils.clamp(-xLimit, xLimit);
      const clampY = gsap.utils.clamp(-yLimit, yLimit);
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
          x(clamp(nx * xLimit * 2 * depth));
          y(clampY(ny * yLimit * 2 * depth));
          rotate(nx * 1 * depth);
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
