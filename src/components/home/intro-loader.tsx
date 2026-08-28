"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  INTRO_COMPLETED_FLAG,
  INTRO_COMPLETE_EVENT,
  NAV_START_DISPATCHED_FLAG,
} from "@/lib/portfolio-intro-events";

gsap.registerPlugin(useGSAP);

const WORD_CLASS_NAME =
  "whitespace-nowrap font-display text-[clamp(3.5rem,16vw,5rem)] font-bold leading-[0.8] tracking-normal md:text-[clamp(5rem,13vw,7.5rem)] lg:text-[clamp(7rem,10vw,10.5rem)]";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const word = wordRef.current;
      const fill = fillRef.current;
      if (!root || !word || !fill) return;

      delete document.documentElement.dataset[INTRO_COMPLETED_FLAG];
      delete document.documentElement.dataset[NAV_START_DISPATCHED_FLAG];

      // Scroll was locked from first paint via data-intro-active (see
      // globals.css) so a scrollbar/gutter could never appear during the
      // intro at all. removeAttribute here restores it — always run this,
      // even if the component unmounts some other way, so a mid-intro
      // unmount can never leave scrolling permanently locked.
      const restoreScroll = () =>
        document.documentElement.removeAttribute("data-intro-active");

      const finishIntro = () => {
        document.documentElement.dataset[INTRO_COMPLETED_FLAG] = "true";
        window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
        restoreScroll();
        setVisible(false);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishIntro();
        return;
      }
      const anticipation =
        window.innerWidth < 768 ? -8 : window.innerWidth < 1024 ? -10 : -14;
      // Scroll is locked for the whole intro (data-intro-active), so there's
      // no scrollbar and no width discrepancy to account for — clientWidth
      // and innerWidth are the same value here. `inset:0` sizes this fixed
      // element to exactly that width, so translating by exactly one
      // width's worth of pixels moves its left edge to where its right edge
      // started: fully clear, no overshoot, no correction tween needed.
      const exitDistance = document.documentElement.clientWidth;

      gsap.set(root, { x: 0, willChange: "transform" });
      gsap.set(word, { y: 5, scale: 0.985 });

      const timeline = gsap.timeline({
        onComplete: finishIntro,
      });

      timeline
        .to(word, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power4.out",
        }, 0.3)
        .to(fill, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.85,
          ease: "power4.inOut",
        }, 0.75)
        .to(root, {
          x: anticipation,
          duration: 0.22,
          ease: "power2.inOut",
        }, 2.1)
        .to(root, {
          x: exitDistance,
          duration: 0.66,
          ease: "expo.inOut",
        }, 2.32);

      return () => {
        timeline.kill();
        restoreScroll();
      };
    },
    { scope: rootRef },
  );

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      data-intro-loader-root
      aria-hidden="true"
      // template.tsx wraps every route in a page-transition div whose
      // `page-enter` animation leaves a non-"none" computed `transform` on
      // that ancestor permanently (animation-fill-mode: both) — per spec,
      // that makes it the containing block for any `position: fixed`
      // descendant nested inside it, sizing `inset: 0` against that
      // ancestor's full document-height content box instead of the true
      // viewport. An explicit `height: 100dvh` (a viewport-relative unit,
      // not a percentage of the containing block) resolves this: with top,
      // bottom (from inset-0), AND height all specified, the box model is
      // over-constrained and `bottom` is dropped per the CSS2.1 §10.6.4
      // algorithm — the box ends up sized from `top` + `height`, i.e. the
      // real viewport height, regardless of the broken containing block.
      // This keeps IntroLoader fully server-rendered (no portal, no
      // ssr:false) so it stays inside the exact same Suspense-boundary
      // swap as Hero (see loading.tsx) and can never be visible a frame
      // after Hero — the two always arrive in the same DOM mutation.
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-[#11110F]"
      style={{
        height: "100dvh",
        boxShadow: "15px 0 0 #11110F",
      }}
    >
      <div
        data-intro-word-positioner
        className="absolute left-1/2 top-1/2 -translate-x-1/2 [--intro-word-optical-offset:clamp(14px,calc(1vh_+_1vw),26px)] translate-y-[calc(-50%_-_var(--intro-word-optical-offset))]"
      >
        <div
          ref={wordRef}
          data-intro-word
          className="[--intro-stroke:1px] md:[--intro-stroke:1.5px] lg:[--intro-stroke:1.75px]"
          style={{ opacity: 0 }}
        >
          <div className="relative">
            <div
              data-intro-outline
              className={`${WORD_CLASS_NAME} text-transparent`}
              style={{ WebkitTextStroke: "var(--intro-stroke) #F2F0E9" }}
            >
              IYAWN
            </div>

            <div
              ref={fillRef}
              data-intro-fill
              className="absolute inset-0 overflow-hidden text-[#F2F0E9] will-change-[clip-path]"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <div className={WORD_CLASS_NAME}>IYAWN</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
