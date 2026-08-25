"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  INTRO_COMPLETED_FLAG,
  INTRO_COMPLETE_EVENT,
} from "@/lib/portfolio-intro-events";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PAPER = "#F2F0E9";
const WORD_MUTED_OPACITY = 0.26;
const SIGNATURE_DURATION = 3.25;
const SIGNATURE_GAP = 0.05;
const SIGNATURE_SPEED = [1, 1, 1, 1, 1.2];
const SIGNATURE_COMPLETION_DURATION = 0.1;
// A round linecap on a dash of exactly zero length can still rasterize as a
// faint dot at that endpoint in some browsers. Pushing the hidden offset a
// few units past the path's real length keeps that cap off the renderable
// path entirely — imperceptible against a ~600-1150 unit path, but the tiny
// dot at the "far end" (the flourish's tip, in practice) disappears.
const SIGNATURE_HIDE_MARGIN = 6;

export function AboutManifestoMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-about-manifesto="root"]');
    if (!root) return;

    const portrait = root.querySelector('[data-about-manifesto="portrait"]');
    const signature = root.querySelector<SVGSVGElement>(
      '[data-about-manifesto="signature"]',
    );
    const words = Array.from(root.querySelectorAll<HTMLElement>("[data-about-word]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const signatureGuides = Array.from(
      signature?.querySelectorAll<SVGPathElement>("[data-signature-guide]") ?? [],
    );
    const signatureCompletion =
      signature?.querySelector<SVGRectElement>("[data-signature-completion]") ?? null;
    let signatureTimeline: gsap.core.Timeline | null = null;

    const signatureLengths = signatureGuides.map((path) => path.getTotalLength());
    signatureGuides.forEach((path, index) => {
      gsap.set(path, {
        opacity: reducedMotion ? 1 : 0,
        strokeDasharray: signatureLengths[index],
        strokeDashoffset: reducedMotion ? 0 : signatureLengths[index] + SIGNATURE_HIDE_MARGIN,
      });
    });
    gsap.set(signatureCompletion, { opacity: reducedMotion ? 1 : 0 });

    const drawSignature = () => {
      if (signatureTimeline || signatureGuides.length === 0) return;

      const weighted = signatureLengths.map((length, index) => length * (SIGNATURE_SPEED[index] ?? 1));
      const totalWeighted = weighted.reduce((sum, value) => sum + value, 0) || 1;
      const timeBudget = SIGNATURE_DURATION - SIGNATURE_GAP * (signatureGuides.length - 1);
      const durations = weighted.map((value) => (value / totalWeighted) * timeBudget);

      // Each path stays opacity:0 (baked into the markup) until the exact
      // instant its own turn starts, at which point .set() flips it to 1
      // instantly (never faded) in the same timeline position as its
      // .to() dashoffset tween. This is what actually stops a future
      // path's stroke from leaking a pixel early — an opacity-0 path
      // can't reveal anything through the mask no matter its dash state
      // or round linecap, unlike a dashoffset safety margin alone. Using
      // an explicit running `cursor` (not GSAP's "+=" relative position)
      // because two relative inserts in a row — one for .set, one for
      // .to — would each independently add to the previous item's end,
      // doubling the gap between paths.
      let cursor = 0;
      const tl = gsap.timeline();
      signatureGuides.forEach((path, index) => {
        if (index > 0) cursor += SIGNATURE_GAP;
        tl.set(path, { opacity: 1 }, cursor);
        tl.to(
          path,
          { strokeDashoffset: 0, duration: durations[index], ease: "power1.inOut" },
          cursor,
        );
        cursor += durations[index];
      });
      // Narrow guide strokes can leave a few uncovered antialiased edge
      // pixels even once every path finishes — this quick, near-instant
      // fade closes that residual gap without visibly redrawing anything.
      tl.to(
        signatureCompletion,
        { opacity: 1, duration: SIGNATURE_COMPLETION_DURATION, ease: "power1.out" },
        cursor + SIGNATURE_GAP,
      );
      signatureTimeline = tl;
    };

    if (reducedMotion) {
      gsap.set(words, { opacity: 1, y: 0, color: PAPER });
      gsap.set(portrait, { clearProps: "opacity,transform" });
      return;
    }

    gsap.set(portrait, { opacity: 0, y: 18, scale: 0.985 });
    gsap.set(words, { opacity: WORD_MUTED_OPACITY, color: PAPER });

    const revealLeft = () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(portrait, { opacity: 1, y: 0, scale: 1, duration: 0.95 }, 0)
        .call(drawSignature, undefined, 0.14);
    };

    // Portrait + signature reveal once, the first time the section is
    // approached — this is intentionally one-shot and does not replay.
    let signatureTrigger: ScrollTrigger | null = null;
    const createSignatureTrigger = () => {
      if (signatureTrigger) return;
      signatureTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top 92%",
        once: true,
        onEnter: revealLeft,
      });
    };

    const introAlreadyComplete =
      document.documentElement.dataset[INTRO_COMPLETED_FLAG] === "true";
    if (introAlreadyComplete) {
      createSignatureTrigger();
    } else {
      window.addEventListener(INTRO_COMPLETE_EVENT, createSignatureTrigger, {
        once: true,
      });
    }

    // Manifesto word reveal: one GSAP timeline, directly scrubbed by scroll
    // position. No latched/monotonic state — scrolling up reverses it.
    //
    // The trigger geometry has to differ by breakpoint: below 768px the
    // About grid stacks (portrait, then copy), so `root`'s total height is
    // several viewport-heights tall — the desktop trigger's one-viewport
    // entrance distance ("top bottom" -> "top top" on root) reaches
    // progress 1 long before the manifesto text has even scrolled into
    // view, which is exactly why words were already full Paper on mobile
    // before the user saw them. >=768px switches to the side-by-side 30/70
    // composition, where root's height stays close to one viewport, so the
    // original root-based trigger is still the correct mapping there.
    // gsap.matchMedia() scopes each branch to its breakpoint and reverts
    // the inactive one automatically (killing its ScrollTrigger and
    // restoring pre-tween inline styles) when the breakpoint changes.
    const mm = gsap.matchMedia();

    if (words.length > 0) {
      mm.add("(min-width: 768px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "top top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).fromTo(
          words,
          { opacity: WORD_MUTED_OPACITY, y: 2 },
          { opacity: 1, y: 0, duration: 1, ease: "none", stagger: 0.65 },
        );
      });

      mm.add("(max-width: 767.98px)", () => {
        const copy = root.querySelector('[data-about-manifesto="copy"]');
        if (!copy) return;
        // Anchored to the copy block's own top edge (not "bottom", and not
        // root) so the required scroll distance doesn't depend on the
        // copy block's height or the page's total scrollable length —
        // About is the last section on the page, so there's a hard ceiling
        // on how far down this can ask the user to scroll.
        gsap.timeline({
          scrollTrigger: {
            trigger: copy,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).fromTo(
          words,
          { opacity: WORD_MUTED_OPACITY, y: 2 },
          { opacity: 1, y: 0, duration: 1, ease: "none", stagger: 0.65 },
        );
      });
    }

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, createSignatureTrigger);
      signatureTrigger?.kill();
      mm.revert();
      signatureTimeline?.kill();
    };
  }, []);

  return null;
}
