"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function PortraitPill({
  href,
  label,
  ariaLabel,
  className,
  focusClassName,
  imageSrc,
  imageScale = 1,
}: {
  href: string;
  label: string;
  ariaLabel: string;
  className: string;
  focusClassName: string;
  imageSrc: string;
  /** Per-image "zoom out" (< 1) so a tightly-cropped source photo can show
   * more of itself inside the same fixed pill. Implemented as an inner box
   * inset by (1 - imageScale)/2 on every side — object-cover fits the photo
   * to that smaller box (less magnification = more of the source visible),
   * then a matching `scale(1/imageScale)` transform blows the whole box
   * back up to fill the pill exactly, so there's never a blank edge. Lives
   * on its own inner div rather than imageWrapRef (the GSAP hover-scale
   * target) so the hover tween's `scale: 1.06` keeps setting an absolute
   * value on imageWrapRef without ever clobbering this base zoom. */
  imageScale?: number;
}) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);
  const resetTlRef = useRef<gsap.core.Timeline | null>(null);

  // Everything GSAP creates lives inside this one scoped effect (including
  // the parallax-reset timeline used on hover-start) so useGSAP's automatic
  // context revert cleans it all up on unmount — no ad-hoc gsap.to() calls
  // from event handlers are needed.
  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(fillRef.current, { opacity: 0 });
      gsap.set(labelRef.current, { yPercent: 100 });

      hoverTlRef.current = gsap
        .timeline({
          paused: true,
          defaults: reducedMotion
            ? { duration: 0.01 }
            : { duration: 0.4, ease: "power3.out" },
        })
        .to(imageWrapRef.current, { scale: 1.06, opacity: 0.16, y: 4 }, 0)
        .to(fillRef.current, { opacity: 1 }, 0)
        .to(
          labelRef.current,
          { opacity: 1, yPercent: 0 },
          reducedMotion ? 0 : 0.04,
        );

      resetTlRef.current = gsap.timeline({ paused: true }).to(rootRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    },
    { scope: rootRef },
  );

  // Pointer-parallax (in hero-motion.tsx) is paused while a pill is
  // hovered/focused, via this data attribute, so the two motions never
  // fight for the same element's transform.
  const handleEnter = () => {
    if (rootRef.current) rootRef.current.dataset.parallaxPaused = "true";
    resetTlRef.current?.restart();
    hoverTlRef.current?.play();
  };

  const handleLeave = () => {
    if (rootRef.current) delete rootRef.current.dataset.parallaxPaused;
    hoverTlRef.current?.reverse();
  };

  return (
    // Three layers, each with one job, so text reflow, pointer-follow, and
    // hover never touch the same element:
    //  - OUTER (this span, data-hero="pill-outer"): a fixed-width, centered
    //    inline SLOT — a hair wider than the visible pill on every side,
    //    not padding-driven. Its explicit em-based width (w-[0.95em] /
    //    1.17em / 1.56em mobile/tablet/desktop, ~0.05/0.06/0.08em spare on
    //    each side of the visible pill) is what hero-motion.tsx measures
    //    and animates 0 → final, so surrounding headline text physically
    //    reflows — not a transform:scale() that would leave it untouched.
    //    inline-flex + items-center + justify-center keeps the visible pill
    //    mathematically centered inside that slot at every instant,
    //    including mid-entrance while the slot itself is still growing.
    //    `overflow-hidden` is intentionally NOT baked in here — applied
    //    only as a temporary inline style for the width entrance
    //    (hero-motion.tsx), then removed once it settles, so it never
    //    clips the fully-expanded interactive pill afterward.
    //  - MIDDLE (data-hero="pill-motion"): the approved, UNCHANGED fixed
    //    pill dimensions (the `className` prop) — the visible pill's true
    //    size, centered inside the outer slot, never itself animated.
    //    Pointer parallax moves the INNER Link inside this fixed-size box,
    //    so its few px of drift is absorbed by the slot's own spare room
    //    on either side rather than crowding the adjacent text.
    //  - Link (rootRef): the hover/focus AND pointer-parallax target,
    //    sized to fill pill-motion exactly. Two children with deliberately
    //    DIFFERENT clipping: pill-clip (rounded-full/overflow-hidden) wraps
    //    ONLY the portrait image + oxblood fill — those genuinely need to
    //    stay circular. The label is a SIBLING outside that clip boundary:
    //    measured, "About me" needs ~68-72px at mobile/tablet sizes while
    //    the pill itself is only ~43-62px there — clipping it to the
    //    circle would cut it off regardless of the outer wrapper's
    //    overflow. pointer-events-none on the label means it never becomes
    //    its own hover target — the Link's circular hit-area is still what
    //    triggers show/hide.
    // mx-[0.1em] is the ONE spacing source on each side of the pill,
    // static margin never touched by hero-motion.tsx's width/overflow
    // entrance calls — present unchanged whether the slot is at width:0 or
    // fully expanded. Previously this was mr-[0.2em] only (right side),
    // which read as unbalanced next to the slot's own small, separate
    // left-side width overhang — splitting the same total (0.2em) evenly
    // across both sides instead makes the visible pill read as optically
    // centered in the surrounding text's gap. Text fragments after each
    // pill in hero.tsx still carry NO leading space of their own (a plain
    // space there collapsed to zero width as a flex-item's own leading
    // whitespace — the historic "BUILDFOR" bug mechanism in this file; a
    // non-breaking space avoided that but became a second, stacked spacing
    // source once this margin also existed). This margin is the only
    // spacing source, full stop — no text space, no parent gap.
    <span
      data-hero="pill-outer"
      className="mx-[0.1em] inline-flex h-[0.85em] w-[0.95em] shrink-0 items-center justify-center align-middle sm:h-[0.8em] sm:w-[1.17em] lg:h-[0.85em] lg:w-[1.56em]"
    >
      <span data-hero="pill-motion" className={`relative block ${className}`}>
        <Link
          ref={rootRef}
          href={href}
          aria-label={ariaLabel}
          prefetch={false}
          data-hero="image"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onFocus={handleEnter}
          onBlur={handleLeave}
          className="relative block h-full w-full"
        >
          <span
            data-hero="pill-clip"
            className="absolute inset-0 block overflow-hidden rounded-full"
          >
            <div ref={imageWrapRef} className="absolute inset-0 z-0">
              <div
                className="absolute"
                style={{
                  inset: `${((1 - imageScale) / 2) * 100}%`,
                  transform: `scale(${1 / imageScale})`,
                }}
              >
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  sizes="160px"
                  className={`object-cover ${focusClassName}`}
                />
              </div>
            </div>
            <div
              ref={fillRef}
              aria-hidden
              className="absolute inset-0 z-10 bg-oxblood opacity-0"
            />
          </span>
          <span
            ref={labelRef}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center whitespace-nowrap px-2 font-editorial text-[13px] font-normal not-italic normal-case tracking-tight text-paper opacity-0 sm:text-sm sm:italic sm:tracking-normal"
          >
            {label}
          </span>
        </Link>
      </span>
    </span>
  );
}
