// Static markup — no interactive state, so this stays the rest of the
// v2 sections' convention: a plain server component, with all motion
// delegated to WorkingSetMotion (client, scroll-triggered entrance
// only). Hover is pure CSS, no JS.
import type { CSSProperties } from "react";
import { WorkingSetMotion } from "@/components/v2/working-set-motion";
import { WORKING_SET, type TechItem, type TechZone } from "@/components/v2/working-set-data";

const IAN_MARK_SRC = "/brand/ian-mark.svg";

function maskStyle(src: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
}

// Icon-above-name index entry. Not a button/link — these technologies
// don't navigate anywhere, so per accessibility guidance this is plain
// list markup with a decorative (aria-hidden) icon and real visible
// name text; no fake focus/interactive semantics on a non-interactive
// element.
function TechItemCell({ item }: { item: TechItem }) {
  const Icon = item.Icon;
  const scale = item.opticalScale ?? 1;
  // Every item gets a `--brand` custom property — the real brand hex
  // when reliably known, Oxblood otherwise — so both the react-icons
  // and the mask-based (Playwright) render paths can share one
  // `group-hover:[color/background-color:var(--brand)]` class instead
  // of branching Tailwind classes per item.
  const brandVar = { "--brand": item.color ?? "var(--color-oxblood)" } as CSSProperties;
  return (
    <li
      data-working-set="tech-item"
      className="group flex flex-col items-center gap-2.5 text-center"
      style={brandVar}
    >
      <span className="flex h-7 w-7 items-center justify-center sm:h-8 sm:w-8 lg:h-9 lg:w-9">
        {Icon ? (
          <Icon
            aria-hidden="true"
            style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
            className="text-ink/75 transition-[color,transform] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:-translate-y-[3px] motion-safe:group-hover:scale-[1.06] motion-safe:group-hover:[color:var(--brand)]"
          />
        ) : item.iconSrc ? (
          <span
            aria-hidden="true"
            style={{
              ...maskStyle(item.iconSrc),
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
            }}
            className="bg-ink/75 transition-[background-color,transform] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:-translate-y-[3px] motion-safe:group-hover:scale-[1.06] motion-safe:group-hover:[background-color:var(--brand)]"
          />
        ) : null}
      </span>
      <span className="relative font-sans text-[0.78rem] leading-tight text-ink transition-[color,transform] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:-translate-y-[2px] motion-safe:group-hover:text-oxblood sm:text-[0.86rem] lg:text-[0.92rem]">
        {item.name}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-oxblood transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      </span>
    </li>
  );
}

// Shared by every subgroup row in every zone — a fixed, item-count-
// independent responsive column scheme rather than per-zone tuning, so
// the layout never needs a redesign as the data list grows. CSS Grid's
// own wrap (not hardcoded coordinates) decides how many items land on
// each row.
const TECH_GRID =
  "grid list-none grid-cols-2 gap-x-5 gap-y-7 min-[430px]:grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 lg:gap-y-8";

function Zone({ zone, className }: { zone: TechZone; className?: string }) {
  return (
    <div data-working-set="zone" className={`min-w-0 pb-8 ${className ?? ""}`}>
      <div className="flex items-baseline gap-2.5">
        <span className="font-sans text-[0.7rem] text-oxblood">{zone.number}</span>
        <h3 className="font-display text-[0.9rem] font-medium uppercase tracking-[0.04em] text-ink sm:text-[1rem]">
          {zone.title}
        </h3>
      </div>

      <div className="mt-6 space-y-7 sm:mt-7 lg:mt-8">
        {zone.subgroups.map((sub, i) => (
          <div key={sub.label ?? i}>
            {sub.label ? (
              <p className="mb-3 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-ink/40">{sub.label}</p>
            ) : null}
            <ul className={TECH_GRID}>
              {sub.items.map((item) => (
                <TechItemCell key={item.name} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const HEADLINE_TYPE =
  "font-display font-medium uppercase leading-[0.96] tracking-[-0.015em] text-[clamp(2.25rem,9vw,4.25rem)] sm:text-[clamp(3rem,7vw,5.5rem)] lg:text-[clamp(3.6rem,6vw,7rem)]";

// Two pixel-stacked layers, not a color tween: the REAL accessible text
// (screen readers get plain text regardless of visual treatment) always
// renders as a thin Warm Black outline on transparent fill — legible
// from the very first frame, no JS/scroll dependency. An aria-hidden
// solid-fill duplicate sits exactly on top via `absolute inset-0`
// (inherits the real text's own content box) and is revealed left to
// right by animating its `clip-path` inset — working-set-motion.tsx
// does the animating, this only bakes the starting (fully clipped)
// state so there's no flash of solid text before JS runs.
// "doesn't." is never outlined or duplicated solid: it's real oxblood
// text in the base layer, and the fill duplicate leaves that word's
// space `invisible` so the real oxblood copy underneath keeps reading
// correctly at every point in the wipe.
function Headline() {
  return (
    <h2 className={`relative mx-auto max-w-[1400px] text-center text-ink ${HEADLINE_TYPE}`}>
      <span
        data-working-set="headline-outline"
        className="block text-transparent [-webkit-text-stroke:1px_#11110F]"
      >
        THE TOOLS CHANGE.
      </span>
      <span
        data-working-set="headline-outline"
        className="block text-transparent [-webkit-text-stroke:1px_#11110F]"
      >
        THE WAY I BUILD{" "}
        <span
          data-working-set="headline-doesnt"
          className="font-editorial lowercase italic text-oxblood [-webkit-text-stroke:0]"
        >
          doesn&rsquo;t.
        </span>
      </span>

      <div
        aria-hidden="true"
        data-working-set="headline-fill-mask"
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        <span className="block text-ink">THE TOOLS CHANGE.</span>
        <span className="block text-ink">
          THE WAY I BUILD{" "}
          <span className="invisible font-editorial lowercase italic">doesn&rsquo;t.</span>
        </span>
      </div>
    </h2>
  );
}

export function WorkingSet() {
  return (
    <section
      id="working-set"
      aria-label="Working set: technologies I use"
      data-working-set="root"
      className="relative bg-paper px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1650px]">
        <div className="mx-auto max-w-[1400px] text-center text-ink">
          <Headline />
        </div>

        {/* Divider — two half-rules that grow outward from a centered
            Ian mark (GSAP: scaleX 0 -> 1, mirrored transform-origins). */}
        <div className="mx-auto mt-10 flex max-w-[720px] items-center justify-center sm:mt-12 lg:mt-14">
          <span
            data-working-set="divider-line"
            className="h-px flex-1 origin-right bg-[rgba(17,17,15,0.14)]"
          />
          <span
            aria-hidden="true"
            data-working-set="divider-mark"
            className="mx-4 h-[10px] w-[10px] shrink-0 bg-oxblood"
            style={maskStyle(IAN_MARK_SRC)}
          />
          <span
            data-working-set="divider-line"
            className="h-px flex-1 origin-left bg-[rgba(17,17,15,0.14)]"
          />
        </div>

        {/* Four zones — 2x2 on desktop (Frontend/Backend top row,
            Data&Testing/Infrastructure+Workflow+Mobile bottom row), one
            column per row from 768-1023, single stacked column below
            that. `items-start`: grid's default `items-stretch` was
            forcing every zone in a row to the row's tallest height,
            leaving dead space inside the shorter zone's own box (its
            content just sat at the top, unstretched, inside an
            artificially taller container) — that dead space, not the
            row gap itself, was the "giant empty area" under Frontend
            and Data & Testing. `lg:gap-y-0`: rows are already separated
            by the border-t divider below, so a separate row gap on top
            of it just doubled the space — each zone's own `pb-8`
            (Zone, above) is the only spacing between a row's content
            and the next row's divider now. */}
        <div className="mt-12 grid grid-cols-1 items-start gap-y-2 sm:mt-14 lg:mt-16 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0 xl:grid-cols-[1fr_1.1fr] xl:gap-x-20">
          {WORKING_SET.map((zone, index) => {
            const isRightColumn = index % 2 === 1;
            const isBottomRow = index >= 2;
            return (
              <Zone
                key={zone.number}
                zone={zone}
                className={[
                  isBottomRow ? "lg:border-t lg:border-ink/10 lg:pt-10" : "",
                  isRightColumn ? "lg:border-l lg:border-ink/10 lg:pl-12 xl:pl-16" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            );
          })}
        </div>
      </div>

      <WorkingSetMotion />
    </section>
  );
}
