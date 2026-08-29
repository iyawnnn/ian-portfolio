import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

import { getAllPostsMeta } from "@/lib/mdx";
import { FieldNotesMotion } from "@/components/home/field-notes-motion";
import { PaperGridLines } from "@/components/ui/paper-grid-lines";

const NOTE_COUNT = 4;

// Reused verbatim from selected-work.tsx so the per-row thumbnails read as
// the same artwork surface as the project reel, not as an elevated card.
const ARTWORK_SHADOW =
  "shadow-[0_8px_30px_rgba(17,17,15,0.06),0_2px_8px_rgba(17,17,15,0.04)]";

// Same hairline value working-set.tsx uses for its own divider. Applied
// directly as a `border-top` on each row's own `<a>` (not an absolutely
// positioned span with a compensating negative margin): since the index
// no longer has any width sub-cap, the row already spans the exact same
// horizontal bounds as the header/CTA above it, so a plain border needs no
// breakout trick to land on the right edges — the row's own box *is* the
// shared content measure. `hover:`/`focus-visible:` apply directly (not
// `group-hover:`) because the bordered element and the interactive
// element are the same `<a>`.
const ROW_RULE =
  "border-t border-t-[rgba(17,17,15,0.12)] transition-colors duration-300 hover:border-t-[rgba(17,17,15,0.32)] focus-visible:border-t-[rgba(17,17,15,0.32)]";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function FieldNotes() {
  const posts = getAllPostsMeta()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, NOTE_COUNT);

  if (posts.length === 0) return null;

  return (
    <section
      id="writing"
      aria-labelledby="writing-statement"
      data-field-notes="root"
      // More top padding than working-set.tsx's own bottom padding: Tech Stack
      // ends centered, kinetic and symmetric, and this opens left-aligned,
      // structured and interactive. The change of axis carries the transition,
      // so nothing decorative sits at the seam.
      className="relative bg-paper px-5 pt-[clamp(88px,12vw,140px)] pb-[clamp(80px,10vw,128px)] min-[768px]:px-8 min-[900px]:px-11 min-[1120px]:px-[clamp(24px,3vw,40px)] min-[1280px]:px-16 min-[1536px]:px-20"
    >
      {/* Shared, page-level Paper background rhythm (see
          paper-grid-lines.tsx) — same column positions as every other
          Paper section, kept low enough to sit underneath this section's
          own horizontal hairline row-rules (ROW_RULE above) without
          competing with them. */}
      <PaperGridLines opacity={0.03} />

      <div className="mx-auto w-full max-w-[1600px] text-ink">
        {/* Header. No separate eyebrow — the statement itself is both the
            section's heading and its visual introduction. Below `1120px`
            the CTA stacks under the statement (there isn't reliable room
            beside a 2-line display headline at those sizes without
            squeezing either); at `1120px`+ they share one row, the pill
            nudged down slightly so it reads as aligned with the first
            line's cap-height rather than glued to the block's exact top
            pixel. */}
        <header
          data-field-notes="header"
          className="flex flex-col items-start gap-5 min-[1120px]:flex-row min-[1120px]:items-start min-[1120px]:justify-between min-[1120px]:gap-10"
        >
          <h2
            id="writing-statement"
            data-field-notes="statement"
            className="max-w-[16ch] font-display text-[clamp(2.4rem,11vw,3.4rem)] font-medium uppercase leading-[1.0] tracking-[-0.02em] min-[768px]:max-w-[20ch] min-[768px]:text-[clamp(3.25rem,6.5vw,4.75rem)] min-[1120px]:max-w-none min-[1120px]:min-w-0 min-[1120px]:flex-1 min-[1120px]:text-[clamp(3.6rem,4.6vw,5.4rem)]"
          >
            <span className="block overflow-hidden">
              <span data-field-notes="statement-line" className="block pb-[0.08em]">
                I write things down
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-field-notes="statement-line" className="block pb-[0.08em]">
                when they{" "}
                <span
                  data-field-notes="statement-accent"
                  className="font-editorial lowercase italic text-oxblood"
                >
                  break.
                </span>
              </span>
            </span>
          </h2>

          {/* Pill CTA. The fill is an SVG liquid sweep driven by GSAP +
              MorphSVGPlugin in the motion leaf — the same mechanism and
              choreography the Tech Stack "View toolkit" pill already uses
              (a translating group plus a morphing wavy edge), rotated 90°:
              toolkit's liquid rises bottom-to-top, this one sweeps
              left-to-right. Text/border color are plain CSS transitions on
              `group-hover`/`group-focus-visible`, matching toolkit's own
              split between a GSAP-driven fill shape and a CSS-driven color
              swap. No `d` on the path — it starts empty until the motion
              leaf sets it, same as toolkit's own path. */}
          <Link
            href="/blog"
            data-field-notes="header-cta"
            className="group relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-ink px-3 py-1.5 text-ink transition-colors duration-700 ease-[cubic-bezier(0.45,0,0.15,1)] hover:border-oxblood focus:outline-none focus-visible:border-oxblood focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper motion-reduce:transition-none sm:gap-2 sm:px-4 sm:py-2 min-[1120px]:mt-2"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <g data-field-notes="cta-fill-group">
                <path data-field-notes="cta-fill-path" fill="var(--color-oxblood)" />
              </g>
            </svg>
            <span className="relative z-10 inline-flex items-center gap-1.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.1em] transition-colors duration-700 ease-[cubic-bezier(0.45,0,0.15,1)] group-hover:text-paper group-focus-visible:text-paper motion-reduce:transition-none sm:gap-2 sm:text-[0.7rem] sm:tracking-[0.16em]">
              View all writing
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              />
            </span>
          </Link>
        </header>

        {/* Index. `stage-area` is purely an event boundary (row hover/focus
            + the interaction-area enter/leave that drives the preview and
            the custom-cursor handoff); it holds no positioning role. The
            `<ol>` shares the header's own full width — no sub-cap — so
            every row's own `border-top` (see ROW_RULE) lands on exactly
            the same left/right edges as the CTA above it, with no
            breakout margin needed: the row's box already is the shared
            content measure. */}
        <div data-field-notes="stage-area" className="mt-[clamp(52px,7vw,84px)]">
          <ol data-field-notes="index">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  data-field-notes="row"
                  data-note-index={index}
                  className={`group grid grid-cols-[minmax(0,1fr)_72px] items-start gap-x-5 py-[clamp(26px,3.2vw,40px)] focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper min-[768px]:grid-cols-[minmax(0,1fr)_104px] min-[768px]:gap-x-8 min-[1120px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1120px]:gap-x-10 ${ROW_RULE}`}
                >
                  {/* `contents` at >=1120 promotes the number and the date out
                      of this compact metadata line and into their own grid
                      columns, so neither has to be rendered twice. */}
                  <div
                    data-field-notes="meta"
                    className="col-start-1 row-start-1 flex items-center gap-3 min-[1120px]:contents"
                  >
                    <span
                      data-field-notes="number"
                      className="font-display text-[0.8rem] font-medium text-ink/65 transition-colors duration-300 group-hover:text-oxblood group-focus-visible:text-oxblood min-[1120px]:col-start-1 min-[1120px]:row-start-1 min-[1120px]:pt-[0.55rem] min-[1120px]:text-[0.9rem]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="h-px w-5 bg-ink/20 min-[1120px]:hidden" />
                    <time
                      dateTime={post.date}
                      data-field-notes="date"
                      className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-ink/65 transition-colors duration-300 group-hover:text-ink/85 group-focus-visible:text-ink/85 min-[1120px]:col-start-3 min-[1120px]:row-start-1 min-[1120px]:pt-[0.7rem] min-[1120px]:text-right min-[1120px]:text-[0.7rem]"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>

                  {/* Sentence case, not the uppercase used for the statement
                      above: these titles run to sixteen words, and setting
                      them in caps at this scale would be a wall rather than an
                      index. The uppercase statement and the sentence-case
                      titles are the section's two registers.

                      `overflow-hidden` turns this into the entrance mask: the
                      motion leaf translates the inner span up from below,
                      the same vertical-reveal language the statement lines
                      above use. The hover/focus shift is a separate, plain
                      CSS transform on this outer box, so it composes
                      independently of whatever transform GSAP leaves on the
                      inner span once the entrance settles. */}
                  <h3
                    data-field-notes="title"
                    className="col-start-1 row-start-2 mt-3 min-w-0 overflow-hidden font-display text-[clamp(1.4rem,5.8vw,1.8rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[8px] group-focus-visible:translate-x-[8px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0 min-[768px]:text-[1.95rem] min-[1120px]:col-start-2 min-[1120px]:row-start-1 min-[1120px]:mt-0 min-[1120px]:text-[clamp(2rem,3vw,3.4rem)]"
                  >
                    <span data-field-notes="title-inner" className="block">
                      {post.title}
                    </span>
                  </h3>

                  {post.coverImage ? (
                    <div
                      data-field-notes="thumb"
                      className={`relative col-start-2 row-start-1 row-span-2 aspect-square w-full overflow-hidden bg-ink/5 ${ARTWORK_SHADOW} min-[1120px]:hidden`}
                    >
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 104px, 72px"
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Closing rule — the fifth and final one (a `border-top` before
            article 01 lives on every row already; this is the rule after
            article 04). Same width as every row above it for the same
            reason: this div sits in the same unconstrained content
            wrapper, no sub-cap, no breakout margin. Nothing renders inside
            it — the section's own bottom padding is the intentional
            whitespace before the next section. */}
        <div
          data-field-notes="close"
          className="border-t border-t-[rgba(17,17,15,0.12)] pt-[clamp(26px,3.2vw,40px)]"
        />
      </div>

      <FieldNotesMotion posts={posts.map((post) => ({ slug: post.slug, coverImage: post.coverImage }))} />
    </section>
  );
}
