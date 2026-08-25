"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Enables smooth, native-document scrolling for the V2 homepage and keeps
// ScrollTrigger's internal measurements in sync with Lenis's virtual scroll
// position. Renders nothing — this is a side-effect-only component.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    const root = document.documentElement;
    const keepIntroAtTop = () => {
      if (root.dataset.introActive === "true" && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };
    const syncIntroScrollState = () => {
      if (root.dataset.introActive === "true") {
        lenis.stop();
        keepIntroAtTop();
      } else {
        lenis.start();
      }
    };
    const introStateObserver = new MutationObserver(syncIntroScrollState);

    introStateObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-intro-active"],
    });
    window.addEventListener("scroll", keepIntroAtTop, { passive: true });
    syncIntroScrollState();

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      introStateObserver.disconnect();
      window.removeEventListener("scroll", keepIntroAtTop);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
