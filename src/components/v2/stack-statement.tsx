import { StackStatementMotion } from "@/components/v2/stack-statement-motion";

// Shared sizing/tracking so the outline and fill layers of "THE STANDARD"
// stay pixel-identical — only color/text-stroke differ between them, never
// font-size/leading/tracking, or the fill would drift out of registration
// with the outline underneath it. The static phrases reuse the same sizing
// tokens so every line measures identically regardless of animation.
const STATEMENT_TYPE =
  "font-display font-medium uppercase leading-[0.93] tracking-[-0.035em] text-[clamp(2.7rem,12vw,4.5rem)] min-[1024px]:text-[clamp(4rem,6.4vw,7.2rem)]";
const SANS_OUTLINE = `${STATEMENT_TYPE} text-transparent [-webkit-text-stroke:1.25px_#11110F]`;
const SANS_FILL = `${STATEMENT_TYPE} text-ink`;
const SERIF_TYPE = "font-editorial italic text-[1.05em]";
const SERIF_FILL = `${SERIF_TYPE} text-oxblood`;

// A phrase that is never animated — rendered solid from the very first
// frame, no JS/scroll dependency. Used for "THE STACK CHANGES." (already
// true) and "doesn't." (the statement's invariant).
function StaticPhrase({ text, className }: { text: string; className: string }) {
  return <span className={`inline-block align-baseline ${className}`}>{text}</span>;
}

// "THE STANDARD" only: a real, always-fully-visible outlined copy (the
// accessible text — it never depends on scroll to become readable) with an
// `aria-hidden` solid duplicate stacked exactly on top of it via
// `absolute inset-0` (so it inherits the outline span's own content box —
// no independent measurement needed for pixel-perfect registration). The
// duplicate's `clip-path` is animated by stack-statement-motion.tsx to
// wipe from transparent outline to solid fill, left to right, in place —
// the glyphs themselves never move. This is the section's one conceptual
// animation: the standard resolving from outline to solid while the stack
// (already solid) and "doesn't." (already oxblood) stay put.
function StandardPhrase({ text }: { text: string }) {
  return (
    <span className="relative inline-block align-baseline">
      <span className={SANS_OUTLINE}>{text}</span>
      <span
        aria-hidden="true"
        data-stack-statement="fill-standard"
        className={`absolute inset-0 ${SANS_FILL}`}
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        {text}
      </span>
    </span>
  );
}

// A short visual/editorial pause between Selected Work and the future
// Tools/Working Set section. The statement is legible from the very first
// frame — "THE STACK CHANGES." and "doesn't." render solid immediately;
// only "THE STANDARD" resolves from outline to solid as the user scrolls,
// reinforcing the line's meaning. Background is plain Warm Paper — no
// decoration — pending the next visual treatment.
export function StackStatement() {
  return (
    <section
      id="stack-statement"
      aria-label="Statement: the stack changes, the standard doesn't"
      data-stack-statement="root"
      className="relative flex items-center justify-center overflow-hidden bg-paper px-5 py-28 min-[1024px]:h-screen min-[1024px]:py-0"
    >
      <h2
        id="stack-statement-heading"
        data-stack-statement="statement"
        className="relative z-10 max-w-[1400px] text-center text-ink"
      >
        <span className="block">
          <StaticPhrase text="THE STACK CHANGES." className={SANS_FILL} />
        </span>
        <span className="block">
          <StandardPhrase text="THE STANDARD" />{" "}
          <StaticPhrase text="doesn’t." className={SERIF_FILL} />
        </span>
      </h2>

      <StackStatementMotion />
    </section>
  );
}
