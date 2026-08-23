import { CurvedLoop } from "@/components/v2/curved-loop";
import { WorkTransitionMotion } from "@/components/v2/work-transition-motion";

const MARQUEE_TEXT = "SYSTEM TO SCREEN     SELECTED WORK     ";
const MARK_SRC = "/brand/ian-mark.svg";
const CYCLE_SECONDS = 27;

export function WorkTransition() {
  return (
    <section
      aria-label="Transition: System to screen, into Selected Work"
      data-work-transition="root"
      className="relative overflow-hidden bg-paper py-10 sm:py-12 lg:py-14"
    >
      <span className="sr-only">System to screen — Selected Work</span>

      <div
        aria-hidden="true"
        data-work-transition="ribbon"
        className="relative h-[190px] w-full md:h-[220px] lg:h-[250px] xl:h-[280px]"
      >
        <div className="block h-full w-full md:hidden">
          <CurvedLoop
            marqueeText={MARQUEE_TEXT}
            gapSpaceCount={6}
            markSrc={MARK_SRC}
            viewBoxWidth={420}
            viewBoxHeight={160}
            fontSize={32}
            curveAmount={44}
            cycleSeconds={CYCLE_SECONDS}
            className="fill-ink font-display font-medium"
          />
        </div>

        <div className="hidden h-full w-full md:block lg:hidden">
          <CurvedLoop
            marqueeText={MARQUEE_TEXT}
            gapSpaceCount={6}
            markSrc={MARK_SRC}
            viewBoxWidth={900}
            viewBoxHeight={175}
            fontSize={40}
            curveAmount={70}
            cycleSeconds={CYCLE_SECONDS}
            className="fill-ink font-display font-medium"
          />
        </div>

        <div className="hidden h-full w-full lg:block xl:hidden">
          <CurvedLoop
            marqueeText={MARQUEE_TEXT}
            gapSpaceCount={6}
            markSrc={MARK_SRC}
            viewBoxWidth={1150}
            viewBoxHeight={185}
            fontSize={52}
            curveAmount={110}
            cycleSeconds={CYCLE_SECONDS}
            className="fill-ink font-display font-medium"
          />
        </div>

        <div className="hidden h-full w-full xl:block">
          <CurvedLoop
            marqueeText={MARQUEE_TEXT}
            gapSpaceCount={6}
            markSrc={MARK_SRC}
            viewBoxWidth={1400}
            viewBoxHeight={210}
            fontSize={68}
            curveAmount={180}
            cycleSeconds={CYCLE_SECONDS}
            className="fill-ink font-display font-medium"
          />
        </div>

      </div>

      <WorkTransitionMotion />
    </section>
  );
}
