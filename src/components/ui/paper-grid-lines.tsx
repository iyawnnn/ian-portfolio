// One shared, page-level Paper background rhythm, extracted from Hero's own
// vertical column-guide technique (hero.tsx's `[data-hero="grid"]`). Every
// Paper section mounts its own instance of this component directly on its
// own full-width root element (not inside any inner padded/max-w content
// container), always at the same DEFAULT_COLS — so every instance divides
// the same 100vw reference and lands on identical x-positions, regardless
// of section content. That's what makes them read as one continuous
// architectural framework rather than N separate, independently-tuned
// grids: the pattern is purely vertical (Y-invariant), so several
// perfectly-aligned instances are visually indistinguishable from one
// shared element, without the risk of threading a single background layer
// behind a GSAP-pinned section (see selected-work.tsx). Only `opacity`
// should vary per section, per the visual-hierarchy guidance in each call
// site's own comment — never the column count, which would make the lines
// read as that section's own content grid instead of the page's.
//
// Purely a CSS background-image on an absolutely-positioned, aria-hidden
// div — no JS, no extra DOM beyond this one element, identical server-
// rendered.
type PaperGridLinesProps = {
  cols?: string;
  opacity?: number;
  className?: string;
};

const DEFAULT_COLS = "[--grid-cols:3] sm:[--grid-cols:5] lg:[--grid-cols:8]";

export function PaperGridLines({
  cols = DEFAULT_COLS,
  opacity = 0.05,
  className = "inset-0",
}: PaperGridLinesProps) {
  return (
    <div
      aria-hidden="true"
      data-paper-grid="lines"
      className={`pointer-events-none absolute ${className} ${cols}`}
      style={{
        backgroundImage: `repeating-linear-gradient(to right, rgba(17,17,15,${opacity}) 0, rgba(17,17,15,${opacity}) 1px, transparent 1px, transparent calc(100% / var(--grid-cols)))`,
      }}
    />
  );
}
