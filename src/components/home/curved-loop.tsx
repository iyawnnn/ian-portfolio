"use client";

// Responsive wrapper around the React Bits `TextLoop` component
// (src/components/ui/text-loop/TextLoop.tsx) — WorkTransition stays a
// server component; this is the isolated client boundary.
//
// TextLoop renders a fixed `viewBox="0 0 1200 520"` SVG at CSS
// `width: 100%`, so numeric props like `fontSize`/`ribbonWidth`/
// `curviness` are *viewBox units*, not CSS pixels — the same prop value
// renders ~5x larger on a 1920px-wide container than a 390px one (scale
// = renderedWidth / 1200). A fixed breakpoint→prop-value table (the
// previous approach) is fundamentally the wrong model: it either reads
// as tiny on phones or oversized on large desktops depending which end
// you tune for.
//
// This measures the actual rendered container width (ResizeObserver,
// since sizing genuinely depends on it — a `matchMedia` breakpoint
// can't distinguish a 1200px container from a 1900px one), defines
// target *rendered* CSS-pixel sizes as smooth (piecewise-linear,
// continuous — no breakpoint jump) functions of that width, and solves
// backward for the viewBox-unit prop values that produce them. Nothing
// in TextLoop.tsx/buildPath/textPath/GSAP changes — this file only
// decides what numbers to hand it.
//
// <600px runs a structurally different path (see `MOBILE_ZOOM` below) —
// see that block for why plain scale-down doesn't work at phone widths.
import { useLayoutEffect, useMemo, useRef, useState, type FC } from "react";
import TextLoop from "@/components/ui/text-loop/TextLoop";
import { MARK_TOKEN } from "@/components/ui/text-loop/mark-token";

const MARK_SRC = "/brand/ian-mark.svg";
// Non-breaking spaces (U+00A0), not plain " " — the SVG <text>/
// <textPath> elements here don't set `xml:space="preserve"`, so regular
// spaces collapse under default XML whitespace rules and a reserved gap
// built from them would silently shrink to nothing.
const NBSP = " ";

// Must mirror TextLoop's own (private) VIEW_W/VIEW_H constants — the
// fixed viewBox every scale calculation here is relative to.
const VIEW_W = 1200;
const VIEW_H = 520;
const MOBILE_BREAKPOINT = 600;

type Point = readonly [width: number, value: number];

// Piecewise-linear interpolation between keypoints, clamped flat outside
// the given range — this is what keeps every breakpoint transition
// smooth: the value at each junction is shared by the segments on both
// sides of it, so there is no jump, only a change in slope.
function interpolate(points: readonly Point[], x: number): number {
  const first = points[0];
  const last = points[points.length - 1];
  if (x <= first[0]) return first[1];
  if (x >= last[0]) return last[1];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (x >= x0 && x <= x1) {
      return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return last[1];
}

// ---------------------------------------------------------------------
// >=600px (approved, untouched). Same point tables/formulas as before —
// only ever evaluated at width >= 600, so the values below 600 in these
// tables are dead weight, kept only because the shared `interpolate`
// helper needs *some* left anchor and trimming them buys nothing.
// ---------------------------------------------------------------------
const TEXT_PX: readonly Point[] = [
  [600, 31], [768, 31.5], [1024, 33.5], [1280, 36], [1600, 38], [1920, 38],
] as const;
const RIBBON_PX: readonly Point[] = [
  [600, 72], [768, 76], [1024, 82], [1280, 89], [1600, 95], [1920, 95],
] as const;
const AMPLITUDE_PX: readonly Point[] = [
  [600, 50], [768, 54], [1024, 58.5], [1280, 65], [1600, 70], [1920, 70],
] as const;
const RIBBON_HEIGHT_PX: readonly Point[] = [
  [600, 217], [768, 240], [1024, 252], [1280, 277], [1600, 277], [1920, 277],
] as const;

// ---------------------------------------------------------------------
// <600px mobile mode.
//
// Root cause of the previous pass's failure: scaling the *entire*
// 1200-unit composition down to a 390px box means `fontSize`/
// `ribbonWidth` in viewBox units have to be divided by a tiny scale
// factor (390/1200 ≈ 0.33) to hit a real rendered pixel size — which
// inflates them to ~3x their desktop viewBox-unit values. Those
// inflated units all compete for the *same fixed* 520-unit-tall viewBox
// (`room = CY - ribbonWidth/2 - 6`), so a thick-enough ribbon eats most
// of the vertical budget and caps how much wave `curviness` can render
// before `buildPath`'s own ceiling clips it — the wave was rendering
// smaller than requested, not because the numbers were "too low," but
// because the geometry ran out of room. And because visible repeat
// density is just (container width) / (rendered phrase width in px),
// no amount of viewBox-unit juggling can change how many phrases fit
// across a 390px strip — only a *bigger rendered phrase* can.
//
// Fix: render TextLoop into an inner box `MOBILE_ZOOM`x wider than the
// visible container, then clip with `overflow: hidden` (both this file
// and TextLoop.css already center the SVG with
// `top-1/2 left-1/2 -translate-1/2`, so this crops symmetrically on all
// sides for free). That's a real optical zoom: the same 1200-unit
// viewBox now renders across `width * MOBILE_ZOOM` px instead of
// `width` px, so the *visible* slice through the crop window is only
// `VIEW_W / MOBILE_ZOOM` (=400) viewBox units wide — one strong phrase,
// not three — and the effective scale factor
// (`width * MOBILE_ZOOM / VIEW_W`) is ~3x bigger, so the viewBox-unit
// values needed to hit the same rendered px are ~3x *smaller*, leaving
// the wave's `room` budget mostly free again.
const MOBILE_ZOOM = 3;

// Rendered CSS-px targets, mid-to-upper of the brief's target bands so
// the derived amplitude below (which is room-constrained, see
// `waveBoxHeightPx`) lands inside its own target band too.
const MOBILE_TEXT_PX: readonly Point[] = [
  [320, 28], [390, 29.5], [459, 31], [579, 32], [599, 32.5],
] as const;
const MOBILE_RIBBON_PX: readonly Point[] = [
  [320, 66], [390, 72], [459, 76], [579, 78], [599, 79],
] as const;
// Upper bound of the brief's total-WorkTransition-height band at each
// width — ribbon + top/bottom gap must add up to this, not just the
// ribbon in isolation (see `waveBoxHeightPx`/`mobileGapPx` below).
const MOBILE_TOTAL_HEIGHT_PX: readonly Point[] = [
  [320, 190], [390, 220], [459, 230], [579, 240], [599, 242],
] as const;

// Must match WorkTransition's own `py-[clamp(24px,6vw,32px)]` mobile
// tier exactly (work-transition.tsx) — this file needs to know that gap
// to back out how much height is left over for the ribbon itself.
function mobileGapPx(width: number): number {
  return Math.min(32, Math.max(24, width * 0.06));
}

function useContainerWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

interface WorkTransitionWaveProps {
  phrase1: string;
  phrase2: string;
}

export const WorkTransitionWave: FC<WorkTransitionWaveProps> = ({ phrase1, phrase2 }) => {
  const [containerRef, measuredWidth] = useContainerWidth();
  // Falls back to a mid-range guess before the first ResizeObserver tick
  // (same-frame correction via useLayoutEffect, not a visible flash in
  // practice) rather than dividing by zero. >=600 so the fallback never
  // accidentally renders the mobile crop mode.
  const width = measuredWidth || 900;
  const isMobile = width < MOBILE_BREAKPOINT;
  // Gap chars reserved on each side of *both* the mark embedded between
  // the two phrases here and TextLoop's own auto-appended mark between
  // repeated units — the two must agree, or one gets fixed and the
  // other keeps colliding (exactly the bug that shipped last round: the
  // embedded mark used a hardcoded 2-space gap that didn't track
  // `markGapChars`).
  const markGapChars = isMobile ? 3 : 2;
  const markGap = NBSP.repeat(markGapChars);
  const text = useMemo(
    () => `${phrase1}${markGap}${MARK_TOKEN}${markGap}${phrase2}`,
    [phrase1, phrase2, markGap],
  );

  let fontSizePx: number;
  let ribbonWidthPx: number;
  let amplitudePx: number;
  let effectiveScale: number;
  let ribbonHeight: number;
  let innerWidthPx: number | null;

  if (isMobile) {
    fontSizePx = interpolate(MOBILE_TEXT_PX, width);
    ribbonWidthPx = interpolate(MOBILE_RIBBON_PX, width);
    const gapPx = mobileGapPx(width);
    const waveBoxHeightPx = interpolate(MOBILE_TOTAL_HEIGHT_PX, width) - gapPx * 2;
    // Room left over after the ribbon's own thickness, halved (wave
    // swings above *and* below center) with a small margin so the
    // ribbon's own stroke — not just the amplitude number — never
    // touches the crop edge.
    amplitudePx = Math.max(20, (waveBoxHeightPx - ribbonWidthPx) / 2 - 3);
    effectiveScale = (width * MOBILE_ZOOM) / VIEW_W;
    ribbonHeight = waveBoxHeightPx;
    innerWidthPx = width * MOBILE_ZOOM;
  } else {
    fontSizePx = interpolate(TEXT_PX, width);
    ribbonWidthPx = interpolate(RIBBON_PX, width);
    amplitudePx = interpolate(AMPLITUDE_PX, width);
    effectiveScale = width / VIEW_W;
    // Never taller than the SVG's own natural (width-driven) height,
    // and never cropped below what text-on-a-path glyphs rotated to
    // the steepest tangent points actually need — that safe minimum
    // was derived empirically (screenshotting a full animation cycle),
    // not from the bare curve-amplitude math alone, which undercounts
    // how far rotated glyphs can swing past the ribbon's own stroke
    // bounds.
    const naturalHeight = width / (VIEW_W / VIEW_H);
    const targetHeight = interpolate(RIBBON_HEIGHT_PX, width);
    const safeMinHeight = amplitudePx * 2 + ribbonWidthPx + fontSizePx * 1.2;
    ribbonHeight = Math.min(naturalHeight, Math.max(targetHeight, safeMinHeight));
    innerWidthPx = null;
  }

  const fontSize = fontSizePx / effectiveScale;
  const ribbonWidth = ribbonWidthPx / effectiveScale;
  // A real Warm Off-White CSS pixel of letter-spacing at every width,
  // not a fixed viewBox unit that would shrink to sub-pixel on phones
  // and balloon on large monitors like the rest of these props would
  // uncorrected.
  const letterSpacing = 1 / effectiveScale;
  // TextLoop's "wave" path amplitude is `min(curviness * 2.2, room * 2)`
  // in viewBox units; because it's built from quadratic Bézier curves,
  // which undershoot their control point's y by half at the curve's own
  // midpoint, the actual rendered peak-to-center deviation is close to
  // half of that nominal value — `curviness * 1.1`. Solving backward
  // from a desired *rendered* amplitude: curviness = desiredPx /
  // (effectiveScale * 1.1), capped at the same `room`-derived ceiling
  // buildPath itself enforces so this never asks for more curve than
  // the viewBox has vertical room for.
  const room = Math.max(20, VIEW_H / 2 - ribbonWidth / 2 - 6);
  const curviness = Math.min(amplitudePx / (effectiveScale * 1.1), (room * 2) / 2.2);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: measuredWidth ? ribbonHeight : undefined }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={innerWidthPx ? { width: innerWidthPx } : { width: "100%" }}
      >
        <TextLoop
          text={text}
          shape="wave"
          speed={90}
          direction="forward"
          curviness={curviness}
          fontSize={fontSize}
          fontWeight={700}
          letterSpacing={letterSpacing}
          uppercase
          color="#F2F0E9"
          ribbon
          ribbonColor="#6E1E24"
          ribbonWidth={ribbonWidth}
          pauseOnHover={false}
          markSrc={MARK_SRC}
          markSize={fontSize * 0.75}
          markColor="#F2F0E9"
          // The default 2-space gap each side of the mark (TextLoop's
          // own default) reserves less width than the mark's own
          // ~0.75em footprint plus breathing room — fine at desktop
          // sizes where absolute pixel slack is generous, but visibly
          // collides with adjacent words at mobile's much larger
          // relative mark size. Widening it is mobile-only (default
          // untouched for width>=600) since it changes the shared
          // component's measured unit width, and therefore repeat
          // density, for every consumer.
          markGapChars={markGapChars}
        />
      </div>
    </div>
  );
};
