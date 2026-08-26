import Image from "next/image";
import Link from "next/link";

import { PROJECTS } from "@/lib/projects";
import { SelectedWorkMotion } from "@/components/v2/selected-work-motion";

// The curved ribbon above (work-transition.tsx) already reads
// "SYSTEM TO SCREEN — SELECTED WORK", so this section deliberately carries
// no heading, eyebrow or intro copy — the work enters straight from the
// ribbon. 8 of the 9 entries in `PROJECTS` render here directly (no
// "view all" CTA) — ClimaPH is deliberately excluded from this homepage
// showcase only (its data stays in `src/lib/projects.ts` untouched, since
// it still needs to serve /projects and its own /projects/climaph page);
// this gallery is otherwise the full Projects experience on the homepage.
//
// A fixed, HAOQI-inspired 4-row desktop composition — a 12-column grid
// used purely as an alignment system, not a mandate to consume all 12
// columns (row spans deliberately never sum to 12; negative space is
// permanent, not something to optimize away):
//   Row 1 — AC-CORE alone, top-right, large but contained.
//   Row 2 — UA LabSign + SubVantage, two medium landscape rectangles.
//   Row 3 — Grit + Mama R's, two small horizontal rectangles grouped
//           toward the right, leaving the row's left half intentionally
//           open (an art-directed void, not a bug).
//   Row 4 — KodaSync (portrait) + Thryve (square) + MovieLoom (square).
// `col`/`row` per project are explicit grid coordinates (not auto-placed),
// so this exact composition is guaranteed rather than left to the grid's
// packing algorithm. `meta` is a concise, real "category / timeline"
// string pulled from each project's own /projects/<slug> detail page
// (Type + Timeline fields there) — not the richer `tags` list on
// `Project`, which stays untouched and keeps serving the /projects index.
const FEATURED: {
  link: string;
  meta: string;
  aspect: string;
  md: string;
  lg: string;
  sizes: string;
}[] = [
  {
    // Row 1 — the only solo row. Right-anchored (touches col 12, flush
    // with the gallery's right gutter) at 8/12 (~67% of usable width, the
    // "large HAOQI-reference" scale target), up from 7/12. Left margin
    // (cols 1–4, ~33%) stays intentional negative space.
    link: "/projects/ac-core",
    meta: "Academic / 2026",
    aspect: "aspect-[16/9]",
    md: "md:col-span-2",
    lg: "lg:col-start-5 lg:col-span-8 lg:row-start-1",
    sizes: "(min-width: 1024px) 67vw, (min-width: 768px) 100vw, 100vw",
  },
  {
    // Row 2, left — medium landscape, flush to col 1, span/position
    // unchanged (5/12, ~42%). `w-[calc(100%+16px)]` + `-ml-2` grows the
    // rendered box by a genuinely tiny 16px total (split 8px each side)
    // without touching the grid's own column allocation — CSS Grid items
    // are positioned by their line assignment, not by sibling box size,
    // so this overflow can't shift SubVantage or misalign the row.
    // `mt-4` (16px) is the only remaining per-row spacing override — on
    // top of the shared `gap-y` it's what makes Row 1→2 the most generous
    // gap in the gallery. The matching `mb-*` this used to carry was
    // removed: Row 2→3 is generous enough from the bigger shared gap
    // alone now, so a second stacked margin was just adding unpredictable
    // extra whitespace on top of it.
    link: "/projects/ua-attendance",
    meta: "Web + Android / Academic",
    aspect: "aspect-[16/9]",
    md: "md:col-span-1",
    lg: "lg:col-start-1 lg:col-span-5 lg:row-start-2 lg:mt-4 lg:-ml-2 lg:w-[calc(100%+16px)]",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    // Row 2, right — same tiny width bump as UA LabSign (identical
    // rendered size preserved). Start moved 8→7 (one column left): opens
    // a real, comfortable right-hand margin at col 12 without centering,
    // and leaves a real (if now single-column) gap to UA LabSign — not
    // touching, not huge.
    link: "/projects/subvantage",
    meta: "Personal / 2025",
    aspect: "aspect-[16/9]",
    md: "md:col-span-1",
    lg: "lg:col-start-7 lg:col-span-5 lg:row-start-2 lg:mt-4 lg:-ml-2 lg:w-[calc(100%+16px)]",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    // Row 3, right side — a reduced echo of Row 2's landscape treatment:
    // same span (3/12, ~25%) and same aspect as Mama R's below, so the two
    // "match each other in dimensions" exactly. `w-[calc(100%+96px)]` +
    // `-ml-24` grows the rendered box by a fixed 96px, entirely leftward —
    // the right edge stays exactly where the grid puts it. `col-start`
    // stays at 5, unchanged — only the growth amount has moved.
    link: "/projects/grit",
    meta: "Personal / 2026",
    aspect: "aspect-[3/2]",
    md: "md:col-span-1",
    lg: "lg:col-start-5 lg:col-span-3 lg:row-start-3 lg:-ml-24 lg:w-[calc(100%+96px)]",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    // Row 3, far right — identical span/aspect to Grit, and the same
    // leftward-only 96px growth technique, which is what keeps this one
    // exactly right-flush: growing only via `margin-left`/`width` leaves
    // the box's right edge pinned at grid line 13, the same line AC-CORE's
    // own col-span-8 (start 5) lands on — the two still share a right
    // anchor after the size bump.
    link: "/projects/mamars",
    meta: "Freelance / 2025",
    aspect: "aspect-[3/2]",
    md: "md:col-span-1",
    lg: "lg:col-start-10 lg:col-span-3 lg:row-start-3 lg:-ml-24 lg:w-[calc(100%+96px)]",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    // Row 4, left — the vertical/portrait item in the closing trio.
    // `w-[calc(100%+32px)]` with no margin grows it rightward only (its
    // grid-anchored left edge — col 1, the section's own gutter — stays
    // exactly where it is; the extra 32px overflows into the col-4 gap
    // toward Thryve, same modest step used for the other two below).
    link: "/projects/kodasync",
    meta: "Personal / 2026",
    aspect: "aspect-[3/4]",
    md: "md:col-span-1",
    lg: "lg:col-start-1 lg:col-span-3 lg:row-start-4 lg:w-[calc(100%+32px)]",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    // Row 4, center — square, balances MovieLoom. Has clearance on both
    // sides, so it grows symmetrically: `-ml-4` (half of the 32px total)
    // shifts the left edge out, the rest spills out the right — an even
    // 16px into each neighboring gap rather than favoring one side.
    link: "/projects/thryve",
    meta: "School / 2025",
    aspect: "aspect-square",
    md: "md:col-span-1",
    lg: "lg:col-start-5 lg:col-span-3 lg:row-start-4 lg:-ml-4 lg:w-[calc(100%+32px)]",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    // Row 4, right — square, balances Thryve. Grows rightward only (no
    // margin), into the col-12 margin that already existed before the
    // section's own right-side gutter — the actual gallery gutter is
    // untouched.
    link: "/projects/movieloom",
    meta: "Personal / 2025",
    aspect: "aspect-square",
    md: "md:col-span-1",
    lg: "lg:col-start-9 lg:col-span-3 lg:row-start-4 lg:w-[calc(100%+32px)]",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
];

const featured = FEATURED.map((entry) => {
  const project = PROJECTS.find((p) => p.link === entry.link);
  return project ? { ...entry, project } : null;
}).filter((p): p is NonNullable<typeof p> => p !== null);

// Display title: the /projects titles carry long parenthetical/em-dash
// subtitles that would overflow a single line here — keep the leading
// name only.
function shortTitle(title: string) {
  return title.split(/\s+—\s+| \(/)[0];
}

// Very subtle diffuse separation from the warm off-white page background —
// deliberately soft/low-opacity, not an elevated dashboard-card shadow.
// Reused verbatim in field-notes.tsx so its own row thumbnails read as the
// same artwork surface as this reel.
const ARTWORK_SHADOW =
  "shadow-[0_8px_30px_rgba(17,17,15,0.06),0_2px_8px_rgba(17,17,15,0.04)]";

export function SelectedWork() {
  return (
    <section
      id="selected-work"
      aria-label="Selected work"
      data-selected-work="root"
      className="relative bg-paper px-5 pt-[clamp(64px,9vw,96px)] pb-[clamp(72px,9vw,112px)] sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20"
    >
      {/* Single grid at every tier. Base: one plain column. md (tablet):
          2 columns, auto-placed (a span-2 item claims a full row; span-1
          items pair up — with 7 non-hero items this naturally lands as
          three pairs plus one leftover, i.e. Grit+Mama R's don't try to
          preserve the right-offset row, and KodaSync/Thryve/MovieLoom
          become a 2+1). lg (desktop): explicit 12-column placement per
          item above, none of which sum to a full 12 — the unclaimed
          columns are the point. `lg:gap-y-24` (96px) is the shared row
          gap every row boundary gets by default; Row 2's own `mt-4` (see
          its comment) is the only remaining exception, stacking on top
          to make Row 1→2 the most generous gap (~112px) while Row 2→3
          and Row 3→4 both land at a consistent ~96px. */}
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-16 lg:grid-cols-12 lg:gap-y-24">
        {featured.map(({ project, meta, aspect, md, lg, sizes }, index) => (
          <Link
            key={project.link}
            href={project.link}
            data-selected-work="item"
            className={`group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper ${md} ${lg}`}
          >
            <div className={`relative w-full overflow-hidden bg-ink/5 ${aspect} ${ARTWORK_SHADOW}`}>
              <Image
                src={project.galleryImage ?? project.image}
                alt={project.title}
                fill
                sizes={sizes}
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
              />
            </div>

            {/* Restrained editorial caption — a small UI/label scale, not
                a headline, one size for every project regardless of image
                size. Title is `font-display` (Neue Montreal, the same
                sans used for headings/UI throughout v2) — a brief Bradford
                serif experiment here didn't fit the section and was
                reverted; the size bump from that pass is kept (it stands
                on its own merit, unrelated to the typeface). Text is
                static on hover/focus by design — only the image itself
                (its own `group-hover:scale` above) reacts. */}
            <div className="mt-2.5 flex items-baseline justify-between gap-3 sm:mt-3">
              <span className="font-display font-medium text-[0.85rem] leading-snug tracking-[-0.01em] text-ink lg:text-[0.9rem]">
                {shortTitle(project.title)}
              </span>
              <span className="shrink-0 font-sans text-[0.62rem] uppercase tracking-[0.12em] text-ink/60">
                {meta}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <SelectedWorkMotion />
    </section>
  );
}
