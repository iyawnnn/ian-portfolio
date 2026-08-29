import Image from "next/image";
import { PracticeMotion } from "@/components/home/practice-motion";
import { PaperGridLines } from "@/components/ui/paper-grid-lines";

const PRACTICE_ITEMS = [
  {
    id: "interfaces",
    number: "01",
    title: "INTERFACES",
    italic: "The part people see and feel.",
    copy: "I care about interfaces that feel deliberate — shaped around the product instead of borrowed from the same familiar template.",
    image: "/images/practice/interfaces.webp",
    alt: "Close-up editorial view of a person interacting with a computer interface",
  },
  {
    id: "systems",
    number: "02",
    title: "SYSTEMS",
    italic: "The part I think about first.",
    copy: "Architecture, security and structure come early. I would rather prevent the problems I can already see than rebuild around them later.",
    image: "/images/practice/systems.webp",
    alt: "Editorial workspace showing system planning and architecture sketches",
  },
  {
    id: "experiments",
    number: "03",
    title: "EXPERIMENTS",
    italic: "The part nobody asked for.",
    copy: "Side projects keep me learning. Sometimes that means trying something new. Sometimes it means overengineering something that really did not need it.",
    image: "/images/practice/experiments.webp",
    alt: "Creative technology workspace showing an abstract motion experiment",
  },
] as const;

// Breakpoint strategy for this section only: mobile < 768 (base) — each
// principle stacks text above its square image (natural document flow,
// no grid) · tablet / compact desktop 768-1119 (min-[768px]:, min-[900px]:
// and min-[1024px]: for progressively larger image caps within that
// range) — each principle becomes a 2-column editorial row (~42% copy /
// ~58% image) that alternates image side per row via `order`, so column 2
// (SYSTEMS) reads image-left/copy-right against its odd/even siblings ·
// desktop 3-column grid >= 1120 (min-[1120px]:, deliberately custom — 1024
// left each column too narrow) · decor grows again from 1440
// (min-[1440px]:).
//
// Every breakpoint here is written as an arbitrary `min-[Npx]:` variant —
// none of Tailwind's named breakpoints (md/lg/xl) are used. Mixing a named
// breakpoint with a custom arbitrary one on the *same* CSS property has no
// guaranteed cascade order between the two variant kinds in Tailwind, and
// that's exactly what was causing INTERFACES to render higher than the
// other two modules: `md:pt-[...]` (tablet padding) and
// `min-[1120px]:pt-0` (its desktop cancellation) were racing for the same
// property, and only the first article's unconditional `first:pt-0`
// reliably won regardless of viewport. Every variant in this file is now
// an arbitrary min-width, which Tailwind sorts numerically, so a larger
// breakpoint's rule is always guaranteed to come later in the stylesheet
// and correctly override a smaller one.
export function Practice() {
  return (
    <section
      id="practice"
      data-practice="root"
      aria-labelledby="practice-heading"
      className="relative overflow-hidden bg-paper pt-24 text-ink min-[768px]:pt-28 min-[1120px]:pt-32 min-[1280px]:pt-36"
    >
      {/* Shared, page-level Paper background rhythm (see
          paper-grid-lines.tsx) — mounted directly on this section's own
          full-width root, at the same default column counts every other
          Paper section uses, so it continues the exact same page grid
          rather than this section's own 1/2/3-column item layout (the
          earlier version mounted it inside the padded max-w container
          below and tied its column count to that grid, which is why it
          read as card-column dividers instead of page architecture). */}
      <PaperGridLines opacity={0.035} />

      {/* Large, mostly-cropped echo of the same Ian asterisk mark used
          below in PracticeDecor (and by Hero) — reusing the existing
          asset rather than a new shape. Static, very low opacity, bottom-
          left as a quiet diagonal counterweight to the small spinning
          mark's top-right position. Purely decorative background filler
          for the otherwise-empty margin outside the max-w-[1600px]
          content column on wide viewports. */}
      <div
        aria-hidden="true"
        data-practice="decor-echo"
        className="pointer-events-none absolute -bottom-[18%] -left-[12%] hidden aspect-square w-[420px] opacity-[0.05] min-[1280px]:block min-[1536px]:w-[520px]"
      >
        <Image
          src="/images/hero/decor/asterisk-oxblood.svg"
          alt=""
          fill
          sizes="520px"
          className="object-contain"
        />
      </div>

      <div className="px-5 min-[768px]:px-8 min-[900px]:px-11 min-[1120px]:px-[clamp(24px,3vw,40px)] min-[1280px]:px-16 min-[1536px]:px-20">
        <div className="mx-auto w-full max-w-[1600px] pb-24 text-ink min-[768px]:pb-28 min-[1120px]:pb-32 min-[1280px]:pb-36">
          {/* Headline + decor */}
          <div className="grid grid-cols-1 min-[1120px]:grid-cols-[minmax(0,1fr)_auto] min-[1120px]:items-center min-[1120px]:gap-8">
            <h2
              id="practice-heading"
              className="min-w-0 font-display font-medium uppercase leading-[1.02] tracking-[-0.01em] text-[clamp(2.4rem,11vw,3.4rem)] min-[768px]:max-w-[900px] min-[768px]:text-[clamp(3.25rem,6.5vw,4.75rem)] min-[1120px]:max-w-none min-[1120px]:text-[clamp(3.6rem,4.6vw,5.4rem)] min-[1280px]:text-[clamp(4.5rem,5.5vw,6.5rem)]"
            >
              <span className="block overflow-hidden">
                <span data-practice="headline-line" className="block">
                  I LIKE MAKING THINGS
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-practice="headline-line" className="block">
                  THAT LIVE{" "}
                  <span
                    data-practice="headline-between"
                    className="font-editorial lowercase italic text-oxblood"
                  >
                    between
                  </span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-practice="headline-line" className="block">
                  DESIGN AND CODE.
                </span>
              </span>
            </h2>

            <PracticeDecor />
          </div>

        {/* Three practice areas.
            Mobile (<768): each module is text above a square image, plain
            document flow, no grid — spacing alone separates modules, no
            border/divider anywhere in the section.
            Tablet/compact desktop (768-1119): each module becomes a
            2-column editorial row (~42% copy / ~58% image, vertically
            centered). Image side alternates per module via *explicit grid
            placement* (`col-start-1`/`col-start-2` + a mirrored
            `grid-template-columns` for reversed rows), not `order`: with
            two explicit tracks, `order` changes which *track* an
            auto-placed item is assigned (i.e. which fr-share it gets),
            not just its paint position, so a reversed row's image was
            landing in the narrow 0.42fr copy-track instead of the wide
            0.58fr image-track — that's why INTERFACES/EXPERIMENTS (not
            reversed) rendered larger than SYSTEMS (reversed). Explicit
            placement keeps the image on the 0.58fr track regardless of
            which side of the row it's visually on, so 01/02/03 always
            resolve to the exact same size. DOM/reading order stays
            text-then-image throughout — only the mirrored template swaps
            which physical column is 0.58fr wide.
            Desktop (>=1120): a real 3-column grid where each article is a
            2-row subgrid (copy, image) sharing row tracks with its
            siblings, so the images' top edges line up exactly no matter
            how each module's copy wraps — entirely unchanged from before
            this pass. */}
          <div className="mt-12 grid grid-cols-1 gap-0 min-[1120px]:mt-[clamp(2.75rem,3vw,3.75rem)] min-[1120px]:grid-cols-3 min-[1120px]:grid-rows-[auto_auto] min-[1120px]:gap-x-[clamp(2rem,2.4vw,3rem)] min-[1120px]:gap-y-0">
            {PRACTICE_ITEMS.map((item, index) => {
              const isReversed = index % 2 === 1;
              return (
                <article
                  key={item.id}
                  data-practice-item={item.id}
                  className={`min-w-0 w-full pt-[clamp(64px,9vw,80px)] first:pt-0 min-[768px]:grid min-[768px]:items-center min-[768px]:gap-x-[clamp(24px,4vw,48px)] min-[768px]:pt-[clamp(72px,6vw,112px)] min-[1120px]:grid-cols-none min-[1120px]:items-stretch min-[1120px]:max-w-none min-[1120px]:grid-rows-subgrid min-[1120px]:row-span-2 min-[1120px]:pt-0 ${isReversed ? "min-[768px]:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]" : "min-[768px]:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"}`}
                >
                  <div
                    data-practice="item-text"
                    className={`min-w-0 min-[768px]:row-start-1 min-[1120px]:col-start-auto min-[1120px]:row-start-auto ${isReversed ? "min-[768px]:col-start-2" : "min-[768px]:col-start-1"}`}
                  >
                    <p data-practice="text-part" className="font-display text-[0.85rem] text-ink/40 min-[1120px]:text-[0.95rem]">
                      {item.number}
                    </p>
                    <h3
                      data-practice="text-part"
                      className="mt-3 font-display text-[1.5rem] font-medium uppercase tracking-tight min-[1120px]:text-[1.7rem]"
                    >
                      {item.title}
                    </h3>
                    <p
                      data-practice="text-part"
                      className="mt-3 font-editorial text-[1rem] italic text-oxblood"
                    >
                      {item.italic}
                    </p>
                    <p
                      data-practice="text-part"
                      className="mt-5 max-w-[40ch] font-sans text-[0.95rem] leading-[1.6] text-ink/65"
                    >
                      {item.copy}
                    </p>
                  </div>

                  <PracticeImage src={item.image} alt={item.alt} reversed={isReversed} />
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <PracticeMotion />
    </section>
  );
}

// Decorative only — reuses the exact Hero asterisk asset
// (public/images/hero/decor/asterisk-oxblood.svg) rather than
// reconstructing new geometry. The asset's fill is already hardcoded to
// Oxblood (#6E1E24), so no recoloring is needed and the shared file is
// never touched, leaving Hero's own usage completely unaffected.
function PracticeDecor() {
  return (
    <div
      aria-hidden="true"
      data-practice="brand-geometry"
      className="relative hidden aspect-square min-[1120px]:block min-[1120px]:w-[clamp(120px,11vw,150px)] min-[1440px]:w-[clamp(150px,11vw,180px)]"
    >
      <Image
        src="/images/hero/decor/asterisk-oxblood.svg"
        alt=""
        fill
        sizes="(min-width: 1440px) 12vw, 11vw"
        className="object-contain"
      />
    </div>
  );
}

function PracticeImage({ src, alt, reversed }: { src: string; alt: string; reversed: boolean }) {
  return (
    <div
      data-practice="item-visual"
      className={`group relative mt-8 aspect-square w-full max-w-[min(82vw,420px)] mx-auto min-w-0 overflow-hidden shadow-[0_18px_50px_rgba(17,17,15,0.07)] transition-shadow duration-500 motion-safe:hover:shadow-[0_22px_60px_rgba(17,17,15,0.1)] min-[768px]:mt-0 min-[768px]:mx-0 min-[768px]:row-start-1 min-[768px]:max-w-[360px] min-[900px]:max-w-[395px] min-[1024px]:max-w-[420px] min-[1120px]:mt-10 min-[1120px]:max-w-none min-[1120px]:col-start-auto min-[1120px]:row-start-auto min-[1120px]:justify-self-auto ${reversed ? "min-[768px]:col-start-1 min-[768px]:justify-self-start" : "min-[768px]:col-start-2 min-[768px]:justify-self-end"}`}
    >
      <div
        data-practice="visual-hover-scale"
        className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1120px) 30vw, (min-width: 1024px) 420px, (min-width: 900px) 395px, (min-width: 768px) 360px, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
