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

/* ── Tech item cell ───────────────────────────────────────────── */
function TechItemCell({ item }: { item: TechItem }) {
  const Icon = item.Icon;
  const scale = item.opticalScale ?? 1;
  return (
    <li
      data-working-set="tech-item"
      className="flex flex-col items-center gap-1.5 text-center min-w-0 sm:gap-2"
    >
      <span className="flex h-[22px] w-[22px] items-center justify-center min-[430px]:h-6 min-[430px]:w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9">
        {Icon ? (
          <Icon
            aria-hidden="true"
            style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
            className="text-ink/70"
          />
        ) : item.iconSrc ? (
          <span
            aria-hidden="true"
            style={{
              ...maskStyle(item.iconSrc),
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
            }}
            className="bg-ink/70"
          />
        ) : null}
      </span>
      <span className="font-display text-[0.68rem] leading-tight text-ink sm:text-[0.78rem] lg:text-[0.85rem]">
        {item.name}
      </span>
    </li>
  );
}

const TECH_GRID =
  "grid grid-cols-6 gap-x-2 gap-y-7 min-[430px]:gap-x-3 min-[768px]:grid-cols-8 min-[768px]:gap-x-4 min-[768px]:gap-y-8 lg:gap-x-5 lg:gap-y-10";

const DESKTOP_GRID: Record<TechZone["number"], string> = {
  "01": "lg:grid-cols-8",
  "02": "lg:grid-cols-5",
  "03": "lg:grid-cols-4",
  "04": "lg:grid-cols-5",
};

function itemPlacement(
  index: number,
  itemCount: number,
  zoneNumber: TechZone["number"],
): string {
  const mobileRemainder = itemCount % 3;
  const tabletRemainder = itemCount % 4;
  const isLast = index === itemCount - 1;
  const isPenultimate = index === itemCount - 2;
  const isFrontend = zoneNumber === "01";

  return [
    `col-span-2 min-w-0 ${isFrontend ? "lg:col-span-2" : "lg:col-span-1"}`,
    mobileRemainder === 1 && isLast ? "max-[767px]:col-start-3" : "",
    mobileRemainder === 2 && isPenultimate ? "max-[767px]:col-start-2" : "",
    tabletRemainder === 1 && isLast
      ? "min-[768px]:max-[1023px]:col-start-4"
      : "",
    tabletRemainder === 2 && isPenultimate
      ? "min-[768px]:max-[1023px]:col-start-3"
      : "",
    isFrontend && index === 4 ? "lg:col-start-2" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/* ── Zone ─────────────────────────────────────────────────────── */
function Zone({ zone }: { zone: TechZone }) {
  return (
    <div
      data-working-set="zone"
      className="min-w-0 py-5 min-[768px]:py-6 lg:py-6"
    >
      {/* ── Heading ── */}
      <div className="flex items-baseline gap-[7px] lg:gap-[10px]">
        <span className="font-display text-[9px] font-medium leading-none tracking-[0.02em] text-oxblood lg:text-[10px]">
          {zone.number}
        </span>
        <h3 className="min-w-0 font-display text-[14px] font-medium uppercase leading-[1.05] tracking-normal text-ink min-[768px]:text-[16px] lg:text-[18px] lg:leading-none">
          {zone.title}
        </h3>
      </div>

      {/* ── Breakpoint-scoped tech grid ── */}
      <div
        className={`mt-5 min-[768px]:mt-6 lg:mt-6 ${TECH_GRID} ${DESKTOP_GRID[zone.number]}`}
      >
        {zone.items.map((item, index) => (
          <div
            key={item.name}
            className={itemPlacement(index, zone.items.length, zone.number)}
          >
            <TechItemCell item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Headline ─────────────────────────────────────────────────── */
const HEADLINE_TYPE =
  "font-display font-medium uppercase leading-[0.92] tracking-[-0.02em] text-[clamp(2rem,8vw,3rem)] sm:text-[clamp(2.5rem,6.5vw,4.5rem)] lg:text-[clamp(3.25rem,5.5vw,6.5rem)]";

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

/* ── Section ──────────────────────────────────────────────────── */
export function WorkingSet() {
  return (
    <section
      id="working-set"
      aria-label="Working set: technologies I use"
      data-working-set="root"
      className="relative bg-paper px-4 pt-14 pb-12 sm:px-6 sm:pt-16 sm:pb-16 lg:px-12 lg:pt-20 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Headline */}
        <div className="mx-auto max-w-[1400px] text-center text-ink">
          <Headline />
        </div>

        {/* Headline → Divider: tightened gap */}
        <div className="mx-auto mt-7 flex max-w-[680px] items-center justify-center sm:mt-9 lg:mt-11">
          <span
            data-working-set="divider-line"
            className="h-px flex-1 origin-right"
            style={{ backgroundColor: "rgba(17,17,15,0.12)" }}
          />
          <span
            aria-hidden="true"
            data-working-set="divider-mark"
            className="mx-3 h-2.5 w-2.5 shrink-0 bg-oxblood sm:mx-4 sm:h-[10px] sm:w-[10px]"
            style={maskStyle(IAN_MARK_SRC)}
          />
          <span
            data-working-set="divider-line"
            className="h-px flex-1 origin-left"
            style={{ backgroundColor: "rgba(17,17,15,0.12)" }}
          />
        </div>

        {/* Divider → Grid: balanced gap */}
        <div className="relative mt-6 grid grid-cols-1 gap-y-0 min-[768px]:mt-7 lg:mt-8 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden -translate-x-1/2 lg:block"
            style={{ width: "1px", backgroundColor: "rgba(17,17,15,0.08)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            style={{ height: "1px", backgroundColor: "rgba(17,17,15,0.08)" }}
          />

          {WORKING_SET.map((zone) => (
            <Zone key={zone.number} zone={zone} />
          ))}
        </div>
      </div>

      <WorkingSetMotion />
    </section>
  );
}
