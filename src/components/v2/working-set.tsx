import { ToolkitReveal } from "@/components/v2/toolkit-reveal";
import { WorkingSetMotion } from "@/components/v2/working-set-motion";
import { maskStyle } from "@/lib/icon-mask";

const IAN_MARK_SRC = "/brand/ian-mark.svg";

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

        {/* Divider → Toolkit rails + full-toolkit reveal */}
        <div className="mt-10 min-[768px]:mt-12 lg:mt-14">
          <ToolkitReveal />
        </div>
      </div>

      <WorkingSetMotion />
    </section>
  );
}
