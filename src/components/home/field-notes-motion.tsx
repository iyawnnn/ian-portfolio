"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, useGSAP);

/* ── CTA liquid sweep ──────────────────────────────────────────────────
   The exact same mechanism toolkit-reveal.tsx uses for "View toolkit" — a
   translating <g> plus a path that morphs through a few intermediate wave
   shapes via MorphSVGPlugin — rotated 90°: toolkit's liquid rises
   bottom-to-top (its wave varies in Y as a function of X, the group
   translates in Y); this one sweeps left-to-right (the wave varies in X as
   a function of Y, the group translates in X). Every variant below shares
   the same M/C/C/L/L/Z command structure for the same reason toolkit's do:
   MorphSVG interpolates intentionally between matched paths instead of
   guessing at mismatched ones.

   The `L-120,* L-120,* Z` tail is the "always filled" body, standing in
   for toolkit's own "always extends 20 units past the bottom" body — and
   the -120 value matters: toolkit's body only has to outrun a translation
   range calibrated against its 40-tall viewBox. This viewBox is 100 wide,
   and the fill has to travel the full width plus a small overscan on each
   side (~106 units total, see CTA_HIDDEN_X/CTA_FILLED_X below). A body
   that only reached to -20 (an earlier version of this file did) is
   *shorter* than that travel distance, so at the fully-filled position its
   own far edge slides back into the visible 0–100 window — the fill
   collapsed to a thin sliver at the right edge instead of covering the
   pill. -120 comfortably outruns the full travel range the same way
   toolkit's 60 outruns its own, smaller one. */
const CTA_WAVE_SETTLED = "M6,0 C6,13.3 6,13.3 6,26.7 C6,26.7 6,26.7 6,40 L-120,40 L-120,0 Z";
const CTA_WAVE_A = "M8,0 C2,8 2,12 7,20 C11,26 9,32 6,40 L-120,40 L-120,0 Z";
const CTA_WAVE_B = "M7,0 C11,6 12,12 8,20 C4,27.2 3,34 7,40 L-120,40 L-120,0 Z";
const CTA_WAVE_C = "M6.5,0 C5,8 4.5,14 6,20 C7.5,24.8 7,32 6.2,40 L-120,40 L-120,0 Z";
// Pushes the x=6 baseline left past the viewBox's x=0 edge (hidden) or
// right past its x=100 edge (fully filled) — the horizontal analogue of
// toolkit's own HIDDEN_Y/FILLED_Y overscan.
const CTA_HIDDEN_X = -10;
const CTA_FILLED_X = 96;

// Orchestrates the Writing section's entrance, its horizontal-scroll pin,
// and the header CTA's liquid sweep. Every target is found via the
// `data-field-notes` attributes already present on the static markup in
// field-notes.tsx, which stands on its own without this — the typography
// and cards all work with plain CSS, this is purely progressive
// enhancement.
export function FieldNotesMotion() {
  /* ── Header entrance ────────────────────────────────────────────────
     The statement's own lines open the section, the CTA resolves in
     beside them. Runs once, independent of the horizontal pin below and
     of the CTA's own hover sweep. */
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-field-notes="root"]');
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const headerCta = root.querySelector<HTMLElement>('[data-field-notes="header-cta"]');
    const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-field-notes="statement-line"]'));
    const accent = root.querySelector<HTMLElement>('[data-field-notes="statement-accent"]');

    // If the visitor lands or resizes below the section it has already
    // "happened" — skip the hidden initial states entirely rather than
    // arming a trigger whose start point is behind us.
    if (root.getBoundingClientRect().top < window.innerHeight * 0.75) return;

    gsap.set(headerCta, { opacity: 0, y: 10 });
    gsap.set(lines, { yPercent: 105 });
    gsap.set(accent, { opacity: 0, x: -16 });

    ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0)
          .to(accent, { opacity: 1, x: 0, duration: 0.5 }, 0.5)
          .to(headerCta, { opacity: 1, y: 0, duration: 0.5 }, 0.45);
      },
    });
  }, []);

  /* ── Horizontal browse pin ──────────────────────────────────────────
     Moved from selected-work-motion.tsx: pins `viewport` and converts
     vertical scroll into horizontal `track` movement. Below 1024px (and
     under prefers-reduced-motion) the markup in field-notes.tsx already
     stands on its own as a native horizontal overflow/snap gallery, so
     nothing here runs. Scroll position comes from the shared Lenis
     instance in smooth-scroll.tsx (it already drives ScrollTrigger.update)
     — no second smooth-scroll or nested scroll container is created here. */
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-field-notes="root"]');
    const viewport = root?.querySelector<HTMLElement>('[data-field-notes="viewport"]');
    const track = root?.querySelector<HTMLElement>('[data-field-notes="track"]');
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
          // section off-screen as the page scrolls. Forcing "transform"
          // pins via a plain translate instead of `position:fixed`,
          // which is immune to ancestor transforms.
          pinType: "transform",
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>('[data-field-notes="card"]');
      const entrance = gsap.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: viewport, start: "top 90%", once: true },
      });

      return () => {
        entrance.scrollTrigger?.kill();
        tween.scrollTrigger?.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  /* ── CTA liquid sweep ──────────────────────────────────────────────
     Unconditional, like toolkit-reveal.tsx's own button — no matchMedia
     gate, since keyboard focus must trigger it regardless of pointer type,
     and a touch tap firing the hover state harmlessly is exactly what
     toolkit already accepts. */
  useGSAP(() => {
    const cta = document.querySelector<HTMLElement>('[data-field-notes="header-cta"]');
    const group = cta?.querySelector<SVGGElement>('[data-field-notes="cta-fill-group"]');
    const path = cta?.querySelector<SVGPathElement>('[data-field-notes="cta-fill-path"]');
    if (!cta || !group || !path) return;

    gsap.set(group, { x: CTA_HIDDEN_X });
    gsap.set(path, { attr: { d: CTA_WAVE_SETTLED } });

    let hovered = false;
    let focused = false;

    const settle = (filled: boolean) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Kill whatever's in flight first — a new tween on the same target
      // starts from its live current value, not a hardcoded start, so
      // rapid enter/leave/focus toggles never snap or fight each other.
      gsap.killTweensOf([group, path]);

      if (reduced) {
        gsap.to(group, { x: filled ? CTA_FILLED_X : CTA_HIDDEN_X, duration: 0.15, ease: "none" });
        gsap.set(path, { attr: { d: CTA_WAVE_SETTLED } });
        return;
      }

      const tl = gsap.timeline();
      if (filled) {
        tl.to(group, { x: CTA_FILLED_X, duration: 0.8, ease: "power2.inOut" }, 0)
          .to(path, { morphSVG: CTA_WAVE_A, duration: 0.24, ease: "sine.inOut" }, 0)
          .to(path, { morphSVG: CTA_WAVE_B, duration: 0.26, ease: "sine.inOut" }, 0.2)
          .to(path, { morphSVG: CTA_WAVE_C, duration: 0.22, ease: "sine.inOut" }, 0.42)
          .to(path, { morphSVG: CTA_WAVE_SETTLED, duration: 0.24, ease: "sine.inOut" }, 0.62);
      } else {
        tl.to(path, { morphSVG: CTA_WAVE_C, duration: 0.18, ease: "sine.inOut" }, 0)
          .to(group, { x: CTA_HIDDEN_X, duration: 0.7, ease: "power2.inOut" }, 0.05)
          .to(path, { morphSVG: CTA_WAVE_B, duration: 0.22, ease: "sine.inOut" }, 0.15)
          .to(path, { morphSVG: CTA_WAVE_SETTLED, duration: 0.2, ease: "sine.inOut" }, 0.5);
      }
    };

    const updateIntent = () => settle(hovered || focused);

    const onEnter = () => {
      hovered = true;
      updateIntent();
    };
    const onLeave = () => {
      hovered = false;
      updateIntent();
    };
    // Gated the same way toolkit's own CTA is (`:focus-visible` only) — a
    // mouse click already sends the visitor to /blog, so this only matters
    // for keyboard focus.
    const onFocus = () => {
      focused = cta.matches(":focus-visible");
      updateIntent();
    };
    const onBlur = () => {
      focused = false;
      updateIntent();
    };

    cta.addEventListener("pointerenter", onEnter);
    cta.addEventListener("pointerleave", onLeave);
    cta.addEventListener("focus", onFocus);
    cta.addEventListener("blur", onBlur);

    return () => {
      cta.removeEventListener("pointerenter", onEnter);
      cta.removeEventListener("pointerleave", onLeave);
      cta.removeEventListener("focus", onFocus);
      cta.removeEventListener("blur", onBlur);
      gsap.killTweensOf([group, path]);
    };
  }, []);

  return null;
}