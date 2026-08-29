import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiLaravel,
  SiLivewire,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

import { PROJECTS } from "@/lib/projects";
import { SelectedWorkMotion } from "@/components/home/selected-work-motion";
import { PaperGridLines } from "@/components/ui/paper-grid-lines";

// The curved ribbon above (work-transition.tsx) already reads
// "SYSTEM TO SCREEN — SELECTED WORK", so this section deliberately carries
// no heading, eyebrow or intro copy — the work enters straight from the
// ribbon.
//
// The gallery shows a *curated* 3-4 item core stack per project (frontend
// framework, backend framework/runtime, language, primary database), not
// the full tag list from /projects — implementation details, feature
// flags (2FA), SDKs, and hosting providers (Neon, Supabase) are dropped
// in favor of the underlying technology (PostgreSQL). This intentionally
// diverges from `project.tags` (the richer /projects-page metadata, left
// untouched) rather than corrupting it, per confirmed stacks in each
// project's own /projects/<slug> page.
const FEATURED: { link: string; tech: string[] }[] = [
  { link: "/projects/ac-core", tech: ["Angular", "Node.js", "Express", "MongoDB"] },
  { link: "/projects/ua-attendance", tech: ["Next.js", "PostgreSQL", "React Native", "Expo"] },
  { link: "/projects/grit", tech: ["Laravel", "Livewire", "PostgreSQL"] },
  { link: "/projects/subvantage", tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"] },
  { link: "/projects/kodasync", tech: ["Next.js", "FastAPI", "Python", "PostgreSQL"] },
];

const featured = FEATURED.map(({ link, tech }) => {
  const project = PROJECTS.find((p) => p.link === link);
  return project ? { ...project, tech } : null;
}).filter((p): p is NonNullable<typeof p> => p !== null);

// Only technologies with a real matching icon get one; everything else
// renders as plain text. Nothing here adds a technology a project doesn't
// actually use.
const TAG_ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  PostgreSQL: SiPostgresql,
  "React Native": SiReact,
  Expo: SiExpo,
  Angular: SiAngular,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Laravel: SiLaravel,
  Livewire: SiLivewire,
  FastAPI: SiFastapi,
  Python: SiPython,
  TypeScript: SiTypescript,
  Prisma: SiPrisma,
};

// Display title: the /projects titles carry long parenthetical/em-dash
// subtitles that would overflow the square — keep the leading name only.
function shortTitle(title: string) {
  return title.split(/\s+—\s+| \(/)[0];
}

// Very subtle diffuse separation from the warm off-white page background —
// deliberately soft/low-opacity, not an elevated dashboard-card shadow.
// Shared by every project square and the closing CTA slide so the whole
// row reads as one consistent surface treatment.
const ARTWORK_SHADOW =
  "shadow-[0_8px_30px_rgba(17,17,15,0.06),0_2px_8px_rgba(17,17,15,0.04)]";

// Shared responsive footprint for every horizontal-track item (the five
// project squares and the closing CTA slide), so travel distance stays
// visually even and everything lines up on the shared `items-center` row.
//
// The GSAP pinned mode (see selected-work-motion.tsx) only activates at
// `lg` (1024px) and up, where cards are sized against viewport *height*
// (vh) because the section is pinned to a full 100vh viewport. Below
// that — mobile and tablet alike — this is a native horizontal scroller
// with no forced height, so cards are sized against viewport *width*
// (vw) instead: one large dominant card with a deliberate peek of the
// next, never two cards squeezed evenly into frame (the previous bug —
// the `md:` tier here used to size against `vh` while the gallery was
// still in un-pinned, natural-height layout, so the card had nothing
// meaningful to size against and rendered far too narrow).
const SLIDE_WIDTH =
  "w-[min(84vw,430px)] md:w-[clamp(440px,74vw,620px)] lg:w-[min(58vh,500px)] xl:w-[min(62vh,560px)] 2xl:w-[min(62vh,620px)]";

export function SelectedWork() {
  return (
    <section
      id="selected-work"
      aria-label="Selected work"
      data-selected-work="root"
      // Deliberate breathing room around the native (<lg) horizontal
      // scroller only — reset to 0 at `lg`, where the section is pinned
      // to a full h-screen viewport (see selected-work-motion.tsx) and
      // the GSAP pin geometry already owns the section's vertical
      // rhythm, unchanged from before this pass.
      className="relative bg-paper pt-[clamp(48px,10vw,64px)] pb-[clamp(56px,10vw,72px)] md:pt-[clamp(64px,9vw,88px)] md:pb-[clamp(72px,9vw,96px)] lg:pt-0 lg:pb-0"
    >
      {/* Shared, page-level Paper background rhythm (see
          paper-grid-lines.tsx). Mounted on this section's own root, not
          inside `viewport`/`track` — deliberately never moves with the
          horizontal-scroll track. It doesn't need to live inside the
          GSAP-pinned `viewport` either: the pattern is purely vertical
          (Y-invariant), so it looks identical whether it scrolls normally
          with `root` or stays fixed on screen with the pin — there's
          nothing in it that scrolling could visibly desync. Mounting it
          here keeps this section consistent with every other Paper
          section instead of a one-off gutter-matched treatment. */}
      <PaperGridLines opacity={0.032} />

      <div
        data-selected-work="viewport"
        // `scroll-ps-*` matches the track's own leading `px-*` below. Without
        // it, the browser's initial scroll-snap layout pass snaps straight to
        // AC-CORE's `snap-start` edge and ignores the track's own padding
        // (padding on a scroll container isn't part of any element's snap
        // area unless the container's own `scroll-padding` reserves it), so
        // the page loaded with the gutter already scrolled out of view and
        // the first card flush against the edge.
        className="no-scrollbar flex snap-x snap-mandatory items-center overflow-x-auto scroll-ps-[clamp(16px,4vw,20px)] [-webkit-overflow-scrolling:touch] md:scroll-ps-[clamp(24px,3vw,32px)] lg:snap-none lg:motion-safe:h-screen lg:motion-safe:overflow-hidden"
      >
        <div
          data-selected-work="track"
          className="flex w-max items-center gap-[clamp(24px,3vw,56px)] px-[clamp(16px,4vw,20px)] md:px-[clamp(24px,3vw,32px)] lg:px-[clamp(20px,6vw,120px)]"
        >
          {featured.map((project, index) => (
            <Link
              key={project.link}
              href={project.link}
              data-selected-work="card"
              className={`group relative block ${SLIDE_WIDTH} shrink-0 snap-start ${ARTWORK_SHADOW} lg:snap-align-none focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-ink/5">
                <Image
                  src={project.galleryImage ?? project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 767px) 82vw, 620px"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
                />

                {/* Ink scrim + metadata. Always visible below the `lg`
                    GSAP-pinned breakpoint (mobile and tablet alike, both
                    touch-first), hover/focus-revealed from `lg` up. */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-5 text-paper transition-opacity duration-500 ease-out lg:p-7 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                  <span className="absolute left-5 top-5 font-sans text-[0.7rem] tracking-[0.18em] text-paper/70 lg:left-7 lg:top-7">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="block overflow-hidden">
                    <span className="block translate-y-full font-display text-[1.35rem] font-medium uppercase leading-tight tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 max-lg:translate-y-0 lg:text-[1.6rem]">
                      {shortTitle(project.title)}
                    </span>
                  </span>

                  <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {project.tech.map((tag, tagIndex) => {
                      const Icon = TAG_ICONS[tag];
                      return (
                        <li
                          key={tag}
                          style={{ transitionDelay: `${120 + tagIndex * 60}ms` }}
                          className="flex items-center gap-1.5 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-paper/75 transition-[opacity,transform] duration-500 ease-out lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100"
                        >
                          {Icon ? <Icon aria-hidden className="h-4 w-4" /> : null}
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Link>
          ))}

          {/* Closing item of the horizontal sequence, not project "06" —
              deliberately not a `[data-selected-work="card"]` (no number,
              no image, no hover-reveal metadata, no card shadow/dimensions)
              but tagged `cta-card` so it still counts toward GSAP's
              track-width travel calculation and the entrance stagger. The
              reserved `SLIDE_WIDTH` is layout-only — no background, border,
              or shadow renders it as a container, so it floats directly on
              the section's own `bg-paper`. */}
          <Link
            href="/projects"
            aria-label="View all projects"
            data-selected-work="cta-card"
            className={`group relative flex ${SLIDE_WIDTH} shrink-0 snap-start flex-col items-center justify-center gap-7 py-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper lg:snap-align-none`}
          >
            <span className="text-center font-editorial text-[clamp(2.5rem,9vw,3.5rem)] leading-[0.92] tracking-tight text-ink transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:group-hover:translate-y-0 md:text-[clamp(3.25rem,5vw,5.75rem)]">
              View all
              <br />
              Projects
            </span>

            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ink/25 text-ink transition-colors duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-oxblood group-hover:bg-oxblood group-hover:text-paper group-focus-visible:border-oxblood group-focus-visible:bg-oxblood group-focus-visible:text-paper md:h-14 md:w-14 lg:h-16 lg:w-16">
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 md:h-6 md:w-6"
              />
            </span>
          </Link>
        </div>
      </div>

      <SelectedWorkMotion />
    </section>
  );
}
