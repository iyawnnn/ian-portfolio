"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X as XIcon } from "@phosphor-icons/react/ssr";
import { TechIcon } from "@/components/home/tech-icon";
import { WORKING_SET, type TechZone } from "@/components/home/working-set-data";

// Matches the portfolio's own max-w-[1600px] content container (see
// working-set.tsx) — the sheet's black background stays full-bleed, but
// its content lines up with the same width the rest of the section uses.
const PANEL_CONTAINER =
  "mx-auto w-full max-w-[1600px] px-5 min-[768px]:px-8 min-[1024px]:px-10 min-[1280px]:px-11 min-[1600px]:px-12";

// `flex flex-wrap justify-center` (not CSS grid) is what centers a
// trailing partial row for free, at every breakpoint — `justify-content`
// is applied per flex-line when wrapping, so the last (short) line centers
// itself with no special-casing needed. `heroMaxWidth` only matters at the
// `lg:` tier, where Frontend/Backend's grid cell is wide enough to fit far
// more than the intended ~5-6 items per row unless capped; narrower
// breakpoints (and the compact bottom-row categories) are naturally
// width-constrained already, so they wrap organically without a cap.
function CategoryBlock({
  zone,
  className = "",
  heroMaxWidth,
}: {
  zone: TechZone;
  className?: string;
  heroMaxWidth?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div data-toolkit-group-label className="flex items-baseline gap-2">
        <span className="font-sans text-[13px] font-semibold tracking-[0.02em] text-oxblood lg:text-[14px]">
          {zone.number}
        </span>
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.02em] text-paper/85 lg:text-[14px]">
          / {zone.title}
        </span>
      </div>

      <ul className={`mx-auto mt-5 flex flex-wrap justify-center gap-x-5 gap-y-6 lg:mt-6 ${heroMaxWidth ?? ""}`}>
        {zone.items.map((item) => (
          <li
            key={item.name}
            data-toolkit-item
            className="flex w-[70px] flex-col items-center gap-2 text-center lg:w-[78px]"
          >
            <span className="flex h-8 w-8 items-center justify-center lg:h-9 lg:w-9">
              <TechIcon Icon={item.Icon} iconSrc={item.iconSrc} opticalScale={item.opticalScale} className="text-paper/70" />
            </span>
            <span className="font-sans text-[11px] leading-tight text-paper/70 lg:text-[12px]">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ToolkitPanelProps {
  visible: boolean;
  onClose: () => void;
}

export function ToolkitPanel({ visible, onClose }: ToolkitPanelProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstRun = useRef(true);

  // Body scroll lock — mirrors chat-panel.tsx's existing pattern exactly
  // (fixed-position technique that preserves and restores scroll offset)
  // rather than introducing a second scroll-lock approach.
  useEffect(() => {
    if (!visible) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollY}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    if (!panel || !backdrop) return;

    const targets = content
      ? Array.from(content.querySelectorAll<HTMLElement>("[data-toolkit-item], [data-toolkit-group-label]"))
      : [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Skip animating on the very first mount while closed — the panel's
    // own default classes already render it off-screen/transparent, so
    // there's nothing to tween into on load.
    if (firstRun.current) {
      firstRun.current = false;
      if (!visible) {
        gsap.set(panel, { y: "100%" });
        gsap.set(backdrop, { opacity: 0 });
        return;
      }
    }

    if (reduced) {
      gsap.set(backdrop, { opacity: visible ? 1 : 0 });
      gsap.set(panel, { y: visible ? 0 : "100%" });
      gsap.set(targets, { opacity: visible ? 1 : 0, y: 0 });
      if (visible) closeButtonRef.current?.focus();
      return;
    }

    const tl = gsap.timeline();
    if (visible) {
      gsap.set(targets, { opacity: 0, y: 14 });
      tl.to(backdrop, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0)
        .to(panel, { y: 0, duration: 0.85, ease: "power3.out" }, 0)
        .to(targets, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.018 }, 0.28);
      closeButtonRef.current?.focus();
    } else {
      tl.to(targets, { opacity: 0, duration: 0.2, ease: "power1.in" }, 0)
        .to(panel, { y: "100%", duration: 0.5, ease: "power2.in" }, 0)
        .to(backdrop, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.05);
    }

    return () => {
      tl.kill();
    };
  }, [visible]);

  const [frontend, backend, database, testing, infra] = WORKING_SET;

  // `template.tsx` wraps every page in a `.page-enter` div carrying a
  // (fill-mode: both) transform animation, which makes that div a
  // containing block for `position: fixed` descendants — a fixed panel
  // rendered inline would sit relative to that wrapper instead of the
  // viewport. Portaling straight to `document.body` sidesteps it. This
  // module is only ever loaded client-side (see toolkit-reveal.tsx's
  // `dynamic(..., { ssr: false })`), so `document` is always defined here —
  // same pattern as nav-island.tsx's portal.
  return createPortal(
    <>
      <div
        ref={backdropRef}
        aria-hidden="true"
        onClick={onClose}
        inert={!visible}
        className={`fixed inset-0 z-40 bg-ink/15 opacity-0 ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="toolkit-panel-title"
        id="toolkit-panel"
        data-cursor-theme="dark"
        inert={!visible}
        className={`fixed inset-x-0 bottom-0 z-50 flex h-[88svh] translate-y-full flex-col rounded-t-3xl bg-ink text-paper min-[768px]:h-auto min-[768px]:max-h-[64vh] min-[768px]:rounded-t-[32px] ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="relative shrink-0 pt-7 lg:pt-8">
          <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/20" />
          <div className={`flex items-center justify-between ${PANEL_CONTAINER}`}>
            <h2
              id="toolkit-panel-title"
              className="font-sans text-[20px] font-semibold uppercase tracking-[0.02em] text-paper min-[768px]:text-[22px] lg:text-[24px]"
            >
              Full Toolkit
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="group/close -m-3 inline-flex items-center gap-2 appearance-none border-0 bg-transparent p-3 font-sans text-[12px] uppercase tracking-[0.08em] text-paper/70 transition-colors duration-300 hover:text-oxblood"
            >
              Close
              <XIcon
                className="size-4 transition-transform duration-300 ease-out group-hover/close:rotate-45"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto pt-8 pb-6 min-[768px]:pt-9 min-[768px]:pb-8 lg:pt-10 lg:pb-10">
          <div className={PANEL_CONTAINER}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 min-[768px]:grid-cols-2 lg:gap-x-14">
              <CategoryBlock zone={frontend} heroMaxWidth="lg:max-w-[600px]" />
              <CategoryBlock zone={backend} heroMaxWidth="lg:max-w-[520px]" />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-9 min-[768px]:grid-cols-2 lg:mt-12 lg:grid-cols-3">
              <CategoryBlock zone={database} />
              <CategoryBlock zone={testing} />
              <CategoryBlock zone={infra} className="min-[768px]:col-span-2 lg:col-span-1" />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
