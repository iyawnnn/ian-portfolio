"use client";

// React Bits `TextLoop`, adapted minimally for this project:
//
// 1. Added the "use client" directive (Next.js App Router requires it for
//    a component using hooks/GSAP).
// 2. TextLoop.css applies the project's Neue Montreal family to
//    `.text-loop-text`/`.text-loop-measure` so the hidden measuring text
//    and the visible text always agree on font metrics.
// 3. Added optional `markSrc`/`markSize`/`markColor` props — a minimal,
//    additive extension (default-off, zero behavior change when omitted)
//    that lets a real SVG mark ride the same path as the text, in place
//    of a plain-string separator glyph. See the "Ian mark" block below
//    for how it works; nothing about `buildPath`, the head/tail
//    `<textPath>` loop technique, `getTotalLength`/`getComputedTextLength`
//    measurement, or the GSAP `startOffset` tween was changed to add it.
import { CSSProperties, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import "./TextLoop.css";
// Re-exported from its own non-"use client" module, not defined here —
// importing even a plain string constant from this client component into
// a server component (WorkTransition) makes Next.js treat it as an
// unresolved client reference. See mark-token.ts for the full story.
import { MARK_TOKEN } from "./mark-token";

export type TextLoopShape = "wave" | "circle" | "infinity" | "arch" | "line";
export type TextLoopDirection = "forward" | "reverse";

export interface TextLoopProps {
  text?: string;
  shape?: TextLoopShape;
  path?: string;
  speed?: number;
  direction?: TextLoopDirection;
  separator?: string;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  pauseOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
  /** SVG mark asset to ride the path in place of a plain-string
   *  separator. Embed `MARK_TOKEN` anywhere inside `text` to place one —
   *  one is also appended automatically between repeated units (mirroring
   *  where `separator` would normally go). Ignored (stock behavior) when
   *  omitted. */
  markSrc?: string;
  /** Defaults to `fontSize * 0.75`. */
  markSize?: number;
  /** Defaults to `color`. */
  markColor?: string;
  /** Regular spaces flanking `MARK_TOKEN` on each side of the mark —
   *  this is what the measurement layer (`getComputedTextLength`) and
   *  the repeat-density math see as the separator's reserved width, so
   *  it must be wide enough to fit the actual mark glyph plus breathing
   *  room. Defaults to 2 (original behavior); a caller rendering the
   *  mark at an unusually large size relative to the text may need
   *  more. */
  markGapChars?: number;
}

interface Metrics {
  length: number;
  reps: number;
}

const VIEW_W = 1200;
const VIEW_H = 520;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const EDGE_PAD = 6;

const buildPath = (shape: TextLoopShape, curviness: number, ribbonWidth: number): string => {
  const c = Math.max(0, curviness);
  const room = Math.max(20, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case "circle": {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${CX - r} ${CY} A ${r} ${r} 0 1 1 ${CX + r} ${CY} A ${r} ${r} 0 1 1 ${CX - r} ${CY} Z`;
    }
    case "infinity": {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r} ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r} ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        "Z",
      ].join(" ");
    }
    case "arch": {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise * 1.5} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case "line":
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
    case "wave":
    default: {
      const a = Math.min(c * 2.2, room * 2);
      return `M -320 ${CY} Q -160 ${CY - a} 0 ${CY} T 320 ${CY} T 640 ${CY} T 960 ${CY} T 1280 ${CY} T ${VIEW_W + 320} ${CY}`;
    }
  }
};

// Finds every `MARK_TOKEN` occurrence in `s`, returning its char offsets.
function findTokenOffsets(s: string): number[] {
  const offsets: number[] = [];
  let i = s.indexOf(MARK_TOKEN);
  while (i !== -1) {
    offsets.push(i);
    i = s.indexOf(MARK_TOKEN, i + 1);
  }
  return offsets;
}

const TextLoop = ({
  text = "React ✦ Bits",
  shape = "wave",
  path,
  speed = 90,
  direction = "forward",
  separator = "✦",
  curviness = 90,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = "#ffffff",
  ribbon = true,
  ribbonColor = "#5227FF",
  ribbonWidth = 86,
  pauseOnHover = true,
  className = "",
  style = {},
  markSrc,
  markSize,
  markColor,
  markGapChars = 2,
}: TextLoopProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const headRef = useRef<SVGTextPathElement | null>(null);
  const tailRef = useRef<SVGTextPathElement | null>(null);
  const headMarkRefs = useRef<(SVGForeignObjectElement | null)[]>([]);
  const tailMarkRefs = useRef<(SVGForeignObjectElement | null)[]>([]);

  const [metrics, setMetrics] = useState<Metrics>({ length: 0, reps: 1 });

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, "")}`;

  const d = useMemo(() => path || buildPath(shape, curviness, ribbonWidth), [path, shape, curviness, ribbonWidth]);

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    if (markSrc) {
      // The caller may already have embedded MARK_TOKEN inside `text`
      // (e.g. between two phrases); this only adds the one that plays
      // the role `separator` normally plays, between repeated units.
      const pad = " ".repeat(Math.max(0, markGapChars));
      return `${base}${pad}${MARK_TOKEN}${pad}`;
    }
    const gap = separator ? ` ${separator} ` : "   ";
    return `${base}${gap}`;
  }, [text, separator, uppercase, markSrc, markGapChars]);

  const textStyle = useMemo<CSSProperties>(
    () => ({ fontSize: `${fontSize}px`, fontWeight, letterSpacing: `${letterSpacing}px` }),
    [fontSize, fontWeight, letterSpacing],
  );

  const resolvedMarkSize = markSize ?? fontSize * 0.75;
  const resolvedMarkColor = markColor ?? color;

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    if (!pathEl || !measureEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length) return;

      const reps = unitWidth > 0 ? Math.max(1, Math.round(length / unitWidth)) : 1;
      setMetrics((prev) => (prev.length === length && prev.reps === reps ? prev : { length, reps }));
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [d, unit, fontSize, fontWeight, letterSpacing]);

  const loopText = unit.repeat(metrics.reps);
  const fitLength = metrics.length || undefined;

  // Every MARK_TOKEN's char-index within the full repeated `loopText` —
  // shared by both the head and tail copies (each copy renders identical
  // text, so the same index set applies to both).
  const markCharIndices = useMemo(() => {
    if (!markSrc) return [];
    const unitOffsets = findTokenOffsets(unit);
    if (!unitOffsets.length) return [];
    const indices: number[] = [];
    for (let rep = 0; rep < metrics.reps; rep++) {
      for (const offset of unitOffsets) indices.push(rep * unit.length + offset);
    }
    return indices;
  }, [markSrc, unit, metrics.reps]);

  useEffect(() => {
    const { length } = metrics;
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !length) return undefined;

    // A small forward nudge along the local tangent, centering the mark
    // on MARK_TOKEN's (zero-width) box rather than its leading edge —
    // the one "small optical correction" this extension makes, scaled to
    // the mark's own size rather than a hardcoded pixel value.
    const tangentNudge = resolvedMarkSize * 0.35;

    const positionMark = (
      textPathEl: SVGTextPathElement,
      markEl: SVGForeignObjectElement | null | undefined,
      charIndex: number,
    ) => {
      if (!markEl) return;
      try {
        const point = textPathEl.getStartPositionOfChar(charIndex);
        const rotationDeg = textPathEl.getRotationOfChar(charIndex);
        const rad = (rotationDeg * Math.PI) / 180;
        const cx = point.x + Math.cos(rad) * tangentNudge;
        const cy = point.y + Math.sin(rad) * tangentNudge;
        markEl.setAttribute("x", String(cx - resolvedMarkSize / 2));
        markEl.setAttribute("y", String(cy - resolvedMarkSize / 2));
        markEl.setAttribute("transform", `rotate(${rotationDeg} ${cx} ${cy})`);
        markEl.setAttribute("visibility", "visible");
      } catch {
        markEl.setAttribute("visibility", "hidden");
      }
    };

    const apply = (offset: number) => {
      const partner = offset >= 0 ? offset - length : offset + length;
      head.setAttribute("startOffset", String(offset));
      tail.setAttribute("startOffset", String(partner));

      if (markSrc) {
        markCharIndices.forEach((charIndex, i) => {
          positionMark(head, headMarkRefs.current[i], charIndex);
          positionMark(tail, tailMarkRefs.current[i], charIndex);
        });
      }
    };

    apply(0);

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || speed <= 0) return undefined;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === "reverse" ? -length : length,
      duration: length / speed,
      ease: "none",
      repeat: -1,
      onUpdate: () => apply(state.offset),
    });

    const root = rootRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();

    if (pauseOnHover && root) {
      root.addEventListener("pointerenter", pause);
      root.addEventListener("pointerleave", resume);
    }

    return () => {
      tween.kill();
      if (pauseOnHover && root) {
        root.removeEventListener("pointerenter", pause);
        root.removeEventListener("pointerleave", resume);
      }
    };
  }, [metrics, speed, direction, pauseOnHover, markSrc, markCharIndices, resolvedMarkSize]);

  const renderMarks = (refs: typeof headMarkRefs, keyPrefix: string) =>
    markCharIndices.map((_, i) => (
      <foreignObject
        key={`${keyPrefix}-${i}`}
        ref={(el) => {
          refs.current[i] = el;
        }}
        width={resolvedMarkSize}
        height={resolvedMarkSize}
        visibility="hidden"
        aria-hidden="true"
        style={{ pointerEvents: "none", overflow: "visible" }}
      >
        <div
          style={{
            width: resolvedMarkSize,
            height: resolvedMarkSize,
            backgroundColor: resolvedMarkColor,
            WebkitMaskImage: `url(${markSrc})`,
            maskImage: `url(${markSrc})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </foreignObject>
    ));

  return (
    <div ref={rootRef} className={`text-loop ${className}`.trim()} style={style}>
      <svg
        className="text-loop-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={ribbon ? ribbonColor : "none"}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text ref={measureRef} className="text-loop-measure" style={textStyle} aria-hidden="true">
          {unit}
        </text>

        <text className="text-loop-text" style={textStyle} fill={color} dominantBaseline="central" aria-hidden="true">
          <textPath ref={headRef} href={`#${pathId}`} startOffset={0} textLength={fitLength} lengthAdjust="spacing">
            {loopText}
          </textPath>
        </text>

        <text className="text-loop-text" style={textStyle} fill={color} dominantBaseline="central" aria-hidden="true">
          <textPath ref={tailRef} href={`#${pathId}`} startOffset={0} textLength={fitLength} lengthAdjust="spacing">
            {loopText}
          </textPath>
        </text>

        {markSrc && renderMarks(headMarkRefs, "head-mark")}
        {markSrc && renderMarks(tailMarkRefs, "tail-mark")}
      </svg>
    </div>
  );
};

export default TextLoop;
