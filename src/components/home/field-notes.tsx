import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

import { getAllPostsMeta } from "@/lib/mdx";
import { FieldNotesMotion } from "@/components/home/field-notes-motion";
import { PaperGridLines } from "@/components/ui/paper-grid-lines";

const NOTE_COUNT = 4;

// Reused verbatim from selected-work.tsx so the story cards read as the
// same artwork surface as the (now static) project gallery.
const ARTWORK_SHADOW =
  "shadow-[0_8px_30px_rgba(17,17,15,0.06),0_2px_8px_rgba(17,17,15,0.04)]";

// Moved from selected-work.tsx, unchanged: the shared responsive footprint
// for every horizontal-track item. Below `lg` (1024px) this is a native
// horizontal scroller sized against viewport *width* (one dominant card,
// deliberate peek of the next); at/above it the GSAP pin in
// field-notes-motion.tsx takes over and cards size against viewport
// *height* (the section pins to a full 100vh viewport).
const SLIDE_WIDTH =
  "w-[min(84vw,430px)] md:w-[clamp(440px,74vw,620px)] lg:w-[min(58vh,500px)] xl:w-[min(62vh,560px)] 2xl:w-[min(62vh,620px)]";

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
      className="relative bg-paper px-5 pt-[clamp(88px,12vw,140px)] pb-[clamp(80px,10vw,128px)] min-[768px]:px-8 min-[900px]:px-11 min-[1120px]:px-[clamp(24px,3vw,40px)] min-[1280px]:px-16 min-[1536px]:px-20 lg:pb-0"
    >
      {/* Shared, page-level Paper background rhythm (see
          paper-grid-lines.tsx) — same column positions as every other
          Paper section. Mounted on this section's own root, not inside
          `viewport`/`track`: deliberately never moves with the horizontal-
          scroll track (see selected-work.tsx's own former comment on the
          same point — the pattern is purely vertical/Y-invariant, so it
          looks identical whether it scrolls normally or stays pinned). */}
      <PaperGridLines opacity={0.03} />

      <div className="mx-auto w-full max-w-[1600px] text-ink">
        {/* Header. No separate eyebrow — the statement itself is both the
            section's heading and its visual introduction. */}
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

        {/* Horizontal browse — moved from selected-work.tsx. Below `lg`
            (and under prefers-reduced-motion) this is a native
            overflow-x/snap gallery, same as the pinned mode's markup
            requires nothing from field-notes-motion.tsx to stand on its
            own; at/above `lg` field-notes-motion.tsx pins `viewport` and
            scrubs `track` on scroll, converting vertical scroll into
            horizontal card movement — the same mechanism (and the same
            `.page-enter` ancestor-transform fix) selected-work-motion.tsx
            used to run for the project reel. */}
        <div
          data-field-notes="viewport"
          className="no-scrollbar mt-[clamp(52px,7vw,84px)] flex snap-x snap-mandatory items-center overflow-x-auto scroll-ps-[clamp(16px,4vw,20px)] [-webkit-overflow-scrolling:touch] md:scroll-ps-[clamp(24px,3vw,32px)] lg:mt-0 lg:snap-none lg:motion-safe:h-screen lg:motion-safe:overflow-hidden"
        >
          <div
            data-field-notes="track"
            className="flex w-max items-center gap-[clamp(24px,3vw,56px)] px-[clamp(16px,4vw,20px)] md:px-[clamp(24px,3vw,32px)] lg:px-[clamp(20px,6vw,120px)]"
          >
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-field-notes="card"
                className={`group relative block ${SLIDE_WIDTH} shrink-0 snap-start ${ARTWORK_SHADOW} lg:snap-align-none focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 82vw, 620px"
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
                    />
                  ) : null}

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-6 text-paper lg:p-8">
                    <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper/70">
                      Field note
                    </span>

                    <h3 className="mt-3 font-display text-[1.5rem] font-medium leading-[1.1] tracking-tight lg:text-[1.85rem]">
                      {post.title}
                    </h3>

                    <time
                      dateTime={post.date}
                      className="mt-3 block font-sans text-[0.68rem] uppercase tracking-[0.14em] text-paper/70"
                    >
                      {formatDate(post.date)}
                    </time>

                    {post.description ? (
                      <p className="mt-3 hidden max-w-[42ch] font-sans text-[0.85rem] leading-relaxed text-paper/75 lg:line-clamp-2">
                        {post.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FieldNotesMotion />
    </section>
  );
}