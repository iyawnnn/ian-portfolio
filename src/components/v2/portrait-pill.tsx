"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Shared portrait source — swap this constant when a production crop is
// ready. Any /public-relative path or static import works here.
const HERO_IMAGE_SRC = "/images/hero/ian-portrait.webp";

export function PortraitPill({
  href,
  label,
  ariaLabel,
  className,
  focusClassName,
}: {
  href: string;
  label: string;
  ariaLabel: string;
  className: string;
  focusClassName: string;
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
        .to(labelRef.current, { yPercent: 0 }, reducedMotion ? 0 : 0.04);

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
      className={`relative inline-block shrink-0 overflow-hidden rounded-full align-middle ${className}`}
    >
      <div ref={imageWrapRef} className="absolute inset-0">
        <Image
          src={HERO_IMAGE_SRC}
          alt=""
          fill
          sizes="160px"
          className={`object-cover ${focusClassName}`}
        />
      </div>
      <div ref={fillRef} aria-hidden className="absolute inset-0 bg-oxblood" />
      <span
        ref={labelRef}
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-2 font-editorial text-[11px] font-normal not-italic normal-case tracking-normal text-paper sm:text-xs sm:italic"
      >
        {label}
      </span>
    </Link>
  );
}
