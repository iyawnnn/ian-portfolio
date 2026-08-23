"use client";

import { useEffect, useId, useMemo, useRef, useState, type FC } from "react";

interface CurvedLoopProps {
  marqueeText: string;
  gapSpaceCount: number;
  markSrc: string;
  className?: string;
  curveAmount: number;
  cycleSeconds?: number;
  fontSize: number;
  viewBoxHeight: number;
  viewBoxWidth: number;
}

// Closely follows React Bits' CurvedLoop: one measured string is repeated
// inside one textPath, and startOffset wraps by exactly that string's width.
export const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText,
  gapSpaceCount,
  markSrc,
  className,
  curveAmount,
  cycleSeconds = 27,
  fontSize,
  viewBoxHeight,
  viewBoxWidth,
}) => {
  const text = useMemo(() => {
    const separatorGap = "\u00A0".repeat(gapSpaceCount);
    const content = marqueeText.trim().replace(/ {2,}/g, separatorGap);
    return `${content}${separatorGap}`;
  }, [gapSpaceCount, marqueeText]);

  const gapPrefixes = useMemo(() => {
    const matches = Array.from(text.matchAll(/(?: {2,}|\u00A0{2,})/g));
    return matches.slice(0, 2).map((match) => text.slice(0, (match.index ?? 0) + match[0].length / 2));
  }, [text]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const gapMeasureRefs = useRef<(SVGTextElement | null)[]>([]);
  const markRefs = useRef<(SVGImageElement | null)[]>([]);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [markOffsets, setMarkOffsets] = useState<number[]>([]);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const baseline = viewBoxHeight * 0.24;
  const pathD = `M-100,${baseline} Q${viewBoxWidth * 0.42},${baseline + curveAmount} ${viewBoxWidth + 100},${baseline}`;
  const markSize = fontSize * 0.75;

  const repeatCount = spacing ? Math.ceil((viewBoxWidth + 400) / spacing) + 2 : 1;
  const totalText = spacing
    ? Array(repeatCount)
        .fill(text)
        .join("")
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (!cancelled && measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
        setMarkOffsets(
          gapMeasureRefs.current.map((element) => element?.getComputedTextLength() ?? 0),
        );
      }
    };

    if (document.fonts?.status === "loaded") measure();
    else document.fonts?.ready.then(measure).catch(measure);

    return () => {
      cancelled = true;
    };
  }, [text, gapPrefixes, className, fontSize]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    textPathRef.current.setAttribute("startOffset", `${-spacing}px`);
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready || !textPathRef.current) return;

    const updateMarks = (offset: number) => {
      const path = pathRef.current;
      if (!path) return;

      const pathLength = path.getTotalLength();
      markRefs.current.forEach((mark, index) => {
        if (!mark) return;

        const unitIndex = Math.floor(index / markOffsets.length);
        const markIndex = index % markOffsets.length;
        const distance = offset + unitIndex * spacing + markOffsets[markIndex];

        if (distance < 0 || distance > pathLength) {
          mark.setAttribute("visibility", "hidden");
          return;
        }

        const point = path.getPointAtLength(distance);
        const tangentStart = path.getPointAtLength(Math.max(0, distance - 0.5));
        const tangentEnd = path.getPointAtLength(Math.min(distance + 0.5, pathLength));
        const tangentX = tangentEnd.x - tangentStart.x;
        const tangentY = tangentEnd.y - tangentStart.y;
        const tangentLength = Math.hypot(tangentX, tangentY) || 1;
        const normalX = -tangentY / tangentLength;
        const normalY = tangentX / tangentLength;
        const angle = (Math.atan2(tangentY, tangentX) * 180) / Math.PI;
        const opticalOffset = markSize * 0.45;
        const centerX = point.x - normalX * opticalOffset;
        const centerY = point.y - normalY * opticalOffset;

        mark.setAttribute("x", `${centerX - markSize / 2}`);
        mark.setAttribute("y", `${centerY - markSize / 2}`);
        mark.setAttribute("transform", `rotate(${angle} ${centerX} ${centerY})`);
        mark.setAttribute("visibility", "visible");
      });
    };

    updateMarks(-spacing);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previousTime: number | null = null;

    const step = (time: number) => {
      const textPath = textPathRef.current;
      if (textPath && previousTime !== null) {
        const elapsedSeconds = Math.min((time - previousTime) / 1000, 0.1);
        const currentOffset = Number.parseFloat(textPath.getAttribute("startOffset") || "0");
        let nextOffset = currentOffset - (spacing / cycleSeconds) * elapsedSeconds;

        if (nextOffset <= -spacing) nextOffset += spacing;
        textPath.setAttribute("startOffset", `${nextOffset}px`);
        updateMarks(nextOffset);
      }

      previousTime = time;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [cycleSeconds, markOffsets, markSize, ready, spacing]);

  return (
    <div className="flex h-full w-full items-center justify-center" style={{ visibility: ready ? "visible" : "hidden" }}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="block h-full w-full select-none overflow-visible uppercase leading-none"
      >
        <text
          ref={measureRef}
          className={className}
          fontSize={fontSize}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>

        {gapPrefixes.map((prefix, index) => (
          <text
            key={prefix}
            ref={(element) => {
              gapMeasureRefs.current[index] = element;
            }}
            className={className}
            fontSize={fontSize}
            xmlSpace="preserve"
            style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
          >
            {prefix}
          </text>
        ))}

        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {ready && (
          <text className={className} fontSize={fontSize} xmlSpace="preserve">
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={`${-spacing}px`} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}

        {ready &&
          Array.from({ length: repeatCount * markOffsets.length }, (_, index) => (
            <image
              key={index}
              ref={(element) => {
                markRefs.current[index] = element;
              }}
              href={markSrc}
              width={markSize}
              height={markSize}
              visibility="hidden"
              pointerEvents="none"
            />
          ))}
      </svg>
    </div>
  );
};
