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

// Static editorial grid — five featured projects, curated 3-4 item core
// stack per project (frontend framework, backend framework/runtime,
// language, primary database), not the full tag list from /projects.
// Implementation details, feature flags (2FA), SDKs, and hosting providers
// (Neon, Supabase) are dropped in favor of the underlying technology
// (PostgreSQL). This intentionally diverges from `project.tags` (the
// richer /projects-page metadata, left untouched) rather than corrupting
// it, per confirmed stacks in each project's own /projects/<slug> page.
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
// Reused verbatim in field-notes.tsx so both galleries read as the same
// artwork surface treatment.
const ARTWORK_SHADOW =
  "shadow-[0_8px_30px_rgba(17,17,15,0.06),0_2px_8px_rgba(17,17,15,0.04)]";

export function SelectedWork() {
  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-statement"
      data-selected-work="root"
      className="relative bg-paper px-5 pt-[clamp(64px,9vw,100px)] pb-[clamp(72px,10vw,112px)] min-[768px]:px-8 min-[900px]:px-11 min-[1120px]:px-[clamp(24px,3vw,40px)] min-[1280px]:px-16 min-[1536px]:px-20"
    >
      {/* Shared, page-level Paper background rhythm (see
          paper-grid-lines.tsx). */}
      <PaperGridLines opacity={0.032} />

      <div className="mx-auto w-full max-w-[1600px] text-ink">
        {/* Header — mirrors field-notes.tsx's own header structure (stacked
            statement + pill CTA below 1120px, shared row above it) so the
            two galleries read as one system despite their different
            interaction modes. */}
        <header
          data-selected-work="header"
          className="flex flex-col items-start gap-5 min-[1120px]:flex-row min-[1120px]:items-start min-[1120px]:justify-between min-[1120px]:gap-10"
        >
          <h2
            id="selected-work-statement"
            data-selected-work="statement"
            className="max-w-[16ch] font-display text-[clamp(2.4rem,11vw,3.4rem)] font-medium uppercase leading-[1.0] tracking-[-0.02em] min-[768px]:max-w-[20ch] min-[768px]:text-[clamp(3.25rem,6.5vw,4.75rem)] min-[1120px]:max-w-none min-[1120px]:min-w-0 min-[1120px]:flex-1 min-[1120px]:text-[clamp(3.6rem,4.6vw,5.4rem)]"
          >
            <span className="block overflow-hidden">
              <span data-selected-work="statement-line" className="block pb-[0.08em]">
                Selected work,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-selected-work="statement-line" className="block pb-[0.08em]">
                <span className="font-editorial lowercase italic text-oxblood">shipped.</span>
              </span>
            </span>
          </h2>

          <Link
            href="/projects"
            data-selected-work="header-cta"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink px-3 py-1.5 text-ink transition-colors duration-300 hover:border-oxblood hover:text-oxblood focus:outline-none focus-visible:border-oxblood focus-visible:text-oxblood focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper sm:gap-2 sm:px-4 sm:py-2 min-[1120px]:mt-2"
          >
            <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.1em] sm:text-[0.7rem] sm:tracking-[0.16em]">
              View all projects
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
            />
          </Link>
        </header>

        {/* Editorial grid — single column on mobile, two columns from
            768px up through desktop. Square artwork first, metadata below:
            index + core stack, then the large title, then an optional
            short description straight from the project data. */}
        <div
          data-selected-work="grid"
          className="mt-[clamp(52px,7vw,84px)] grid grid-cols-1 gap-x-10 gap-y-16 min-[768px]:grid-cols-2 min-[768px]:gap-x-12 min-[768px]:gap-y-20 lg:gap-x-16 lg:gap-y-24"
        >
          {featured.map((project, index) => (
            <Link
              key={project.link}
              href={project.link}
              data-selected-work="card"
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            >
              <div className={`relative aspect-square w-full overflow-hidden bg-ink/5 ${ARTWORK_SHADOW}`}>
                <Image
                  src={project.galleryImage ?? project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="font-display text-[0.8rem] font-medium text-ink/50 transition-colors duration-300 group-hover:text-oxblood group-focus-visible:text-oxblood">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px w-5 shrink-0 bg-ink/20" />
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  {project.tech.map((tag) => {
                    const Icon = TAG_ICONS[tag];
                    return (
                      <li
                        key={tag}
                        className="flex items-center gap-1.5 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-ink/60"
                      >
                        {Icon ? <Icon aria-hidden className="h-3.5 w-3.5" /> : null}
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <h3 className="mt-3 font-display text-[clamp(1.6rem,4.2vw,2.5rem)] font-medium uppercase leading-[1.05] tracking-tight text-ink transition-colors duration-300 group-hover:text-oxblood group-focus-visible:text-oxblood">
                <span className="inline-flex items-center gap-2">
                  {shortTitle(project.title)}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-[0.65em] w-[0.65em] shrink-0 -translate-x-1 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  />
                </span>
              </h3>

              <p className="mt-3 max-w-[54ch] font-sans text-[0.95rem] leading-relaxed text-ink/60 line-clamp-2">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <SelectedWorkMotion />
    </section>
  );
}
