import { WorkTransitionWave } from "@/components/v2/curved-loop";
import { WorkTransitionMotion } from "@/components/v2/work-transition-motion";

// The two phrases only — WorkTransitionWave (client) joins them with a
// real Ian mark in between, using the same gap width it reserves for
// TextLoop's own auto-appended between-repeats mark (`markGapChars`).
// Previously this file pre-joined the phrases with a hardcoded 2-space
// gap around a literal MARK_TOKEN; that gap didn't track
// `markGapChars`, so widening the reserved separator width for mobile
// (curved-loop.tsx) fixed the *auto-appended* mark but left this
// *embedded* one exactly as narrow as before — it was still colliding
// with "SELECTED" at mobile sizes.
const PHRASE_1 = "SYSTEM TO SCREEN";
const PHRASE_2 = "SELECTED WORK";

export function WorkTransition() {
  return (
    <section
      aria-label="Transition: System to screen, into Selected Work"
      data-work-transition="root"
      // <600: compact "transition strip" gap (matches curved-loop.tsx's
      // `mobileGapPx`, which backs out how much height is left for the
      // ribbon itself from this same value — keep the two in sync).
      // >=600 (approved): unchanged — `min-[600px]:` (not `sm:`, which
      // is 640) so the exact 600 boundary keeps its previously-approved
      // value instead of picking up the new mobile tier for 600-639.
      className="relative overflow-hidden bg-paper py-[clamp(24px,6vw,32px)] min-[600px]:py-[clamp(32px,8vw,48px)] sm:py-[clamp(40px,7vw,56px)] md:py-[clamp(48px,6vw,64px)] lg:py-6"
    >
      <span className="sr-only">System to screen — Selected Work</span>

      {/* True full-bleed: the section itself is never inside a padded/
          max-width ancestor (confirmed — `main` is plain `w-full`), so
          `w-full` here already reaches both viewport edges with no vw/
          calc breakout needed. `WorkTransitionWave` (curved-loop.tsx)
          measures this box's own rendered width and derives both the
          SVG-unit props it hands TextLoop and the ribbon's own height
          from it — nothing sized here directly. */}
      <div aria-hidden="true" data-work-transition="ribbon" className="w-full">
        <WorkTransitionWave phrase1={PHRASE_1} phrase2={PHRASE_2} />
      </div>

      <WorkTransitionMotion />
    </section>
  );
}
