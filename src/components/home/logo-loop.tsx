"use client";

import { useEffect, useRef, useState } from "react";
import { TechIcon } from "@/components/home/tech-icon";
import type { TechItem } from "@/components/home/working-set-data";

// Adapted from React Bits' LogoLoop: rAF + translate3d marquee, duplicated
// sequences for a seamless wrap, ResizeObserver-driven copy count, and a
// reduced-motion freeze. Icon-only — no names, no separators — styled as
// moving graphic symbols rather than a logo directory.
//
// The outer div is the ONLY element carrying both `overflow-hidden` and
// the edge-fade mask. The mask is a horizontal-only gradient ("to right"),
// so adding vertical padding here gives a hover-scaled icon slack to grow
// into without exposing a seam — it doesn't touch the fade at all. Before
// this padding existed, the icon box's own height *was* the container's
// full height (flex `items-center` row, zero slack), so any hover
// `scale > 1` pushed the SVG past the clip boundary and got cut off top
// and bottom. Verified against the tallest/widest marks (PostgreSQL, AWS,
// Angular, React, TypeScript, Node.js).

const MOBILE_BREAKPOINT = 768;

interface LogoLoopProps {
  items: readonly TechItem[];
  direction: "left" | "right";
  speed: number;
  mobileSpeed: number;
  ariaLabel: string;
}

export function LogoLoop({ items, direction, speed, mobileSpeed, ariaLabel }: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  // Sequence width can no longer be read off one wrapping element (the
  // track is now one flat row — see the render comment below), so it's
  // measured as the live distance between the first item and the first
  // item of the next repeat. `getBoundingClientRect` already accounts for
  // `track`'s transform, so this distance stays constant regardless of
  // the marquee's current scroll offset.
  const firstItemRef = useRef<HTMLLIElement>(null);
  const nextCopyStartRef = useRef<HTMLLIElement>(null);
  const [copies, setCopies] = useState(2);

  const measureSeqWidth = () => {
    const first = firstItemRef.current;
    const next = nextCopyStartRef.current;
    if (!first || !next) return 0;
    return next.getBoundingClientRect().left - first.getBoundingClientRect().left;
  };

  // Enough duplicated sequences to cover the viewport twice over, so the
  // modulo wrap below never exposes a gap on wide screens.
  useEffect(() => {
    const container = containerRef.current;
    const first = firstItemRef.current;
    if (!container || !first) return;

    const measure = () => {
      const seqWidth = measureSeqWidth();
      const containerWidth = container.getBoundingClientRect().width;
      if (seqWidth <= 0) return;
      setCopies(Math.max(2, Math.ceil((containerWidth * 2) / seqWidth) + 1));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(first);
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !firstItemRef.current || !nextCopyStartRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.transform = "translate3d(0,0,0)";
      return;
    }

    let x = 0;
    let raf = 0;
    let last = performance.now();
    let factor = 1;
    let hoverTarget = 1;
    const sign = direction === "left" ? -1 : 1;

    // Slow rather than stop on hover — "gently emphasize," not freeze.
    const onEnter = () => { hoverTarget = 0.45; };
    const onLeave = () => { hoverTarget = 1; };
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      // Lerp toward the target factor instead of snapping — a smooth
      // ease in/out of the hover slowdown, not a hard cut.
      factor += (hoverTarget - factor) * Math.min(1, dt * 4);
      const px = window.innerWidth < MOBILE_BREAKPOINT ? mobileSpeed : speed;
      const seqWidth = measureSeqWidth() || 1;
      x = (x + sign * px * factor * dt) % seqWidth;
      if (x > 0) x -= seqWidth;
      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
    };
  }, [direction, speed, mobileSpeed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-1.5 min-[768px]:py-2 lg:py-2.5"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      {/* One continuous flex row, not per-copy <ul> siblings — `gap` only
          applies between children of the SAME flex container, so splitting
          copies into separate <ul>s left a zero-gap seam at every repeat
          boundary (the reported Laravel→TypeScript / Express→Node
          collisions). A single row with one `gap-x` guarantees identical
          spacing everywhere, including the wrap seam. */}
      <ul
        ref={trackRef}
        aria-label={ariaLabel}
        className="flex w-max list-none items-center gap-x-[36px] will-change-transform min-[768px]:gap-x-[48px] lg:gap-x-[60px]"
      >
        {Array.from({ length: copies }).map((_, copyIndex) =>
          items.map((item, itemIndex) => (
            <li
              key={`${copyIndex}-${item.name}`}
              ref={
                copyIndex === 0 && itemIndex === 0
                  ? firstItemRef
                  : copyIndex === 1 && itemIndex === 0
                    ? nextCopyStartRef
                    : undefined
              }
              aria-hidden={copyIndex > 0 || undefined}
              className="group/item flex shrink-0"
            >
              <span className="flex h-9 w-9 items-center justify-center min-[768px]:h-11 min-[768px]:w-11 lg:h-[52px] lg:w-[52px]">
                <TechIcon
                  Icon={item.Icon}
                  iconSrc={item.iconSrc}
                  opticalScale={item.opticalScale}
                  className="text-ink/55 transition-[transform,color] duration-300 ease-out group-hover/item:scale-[1.05] group-hover/item:text-ink"
                />
              </span>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
