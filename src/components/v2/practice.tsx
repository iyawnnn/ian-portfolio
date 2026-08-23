import Image from "next/image";
import { PracticeMotion } from "@/components/v2/practice-motion";

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

// Breakpoint strategy for this section only: mobile < 768 (base) · tablet /
// narrow laptop 768-1119 (min-[768px]:, min-[900px]: for the wider half of
// that range) — full-width stacked modules sharing the headline's left
// edge, not a centered column · desktop 3-column grid >= 1120
// (min-[1120px]:, deliberately custom — 1024 left each column too narrow)
// · decor grows again from 1440 (min-[1440px]:).
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
      className="relative bg-paper px-5 py-24 min-[768px]:px-8 min-[768px]:py-28 min-[900px]:px-11 min-[1120px]:px-[clamp(24px,3vw,40px)] min-[1120px]:py-32 min-[1280px]:px-16 min-[1280px]:py-36 min-[1536px]:px-20"
    >
      <div className="mx-auto w-full max-w-[1600px] text-ink">
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

        {/* Three practice areas — each module is text above a square
            image, no vertical separators (whitespace + the shared row
            grid below do the structural work). Below 1120px it's a
            full-width stack of modules sharing the section's left gutter
            (not centered); from 1120px it's a real 3-column grid where
            each article is a 2-row subgrid
            (copy, image) sharing row tracks with its siblings, so the
            images' top edges line up exactly no matter how each module's
            copy wraps. */}
        <div className="mt-12 grid grid-cols-1 gap-0 min-[1120px]:mt-[clamp(2.75rem,3vw,3.75rem)] min-[1120px]:grid-cols-3 min-[1120px]:grid-rows-[auto_auto] min-[1120px]:gap-x-[clamp(2rem,2.4vw,3rem)] min-[1120px]:gap-y-0">
          {PRACTICE_ITEMS.map((item) => (
            <article
              key={item.id}
              data-practice-item={item.id}
              className="min-w-0 w-full border-t border-ink/[0.07] pt-16 first:border-t-0 first:pt-0 min-[1120px]:grid min-[1120px]:max-w-none min-[1120px]:grid-rows-subgrid min-[1120px]:row-span-2 min-[1120px]:border-t-0 min-[1120px]:pt-0"
            >
              <div
                data-practice="item-text"
                className="min-w-0 min-[768px]:max-w-[560px] min-[900px]:max-w-[640px] min-[1120px]:max-w-none"
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

              <PracticeImage src={item.image} alt={item.alt} />
            </article>
          ))}
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

function PracticeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      data-practice="item-visual"
      className="group relative mt-8 aspect-square w-full min-w-0 max-w-full overflow-hidden shadow-[0_18px_50px_rgba(17,17,15,0.07)] transition-shadow duration-500 motion-safe:hover:shadow-[0_22px_60px_rgba(17,17,15,0.1)] min-[768px]:max-w-[540px] min-[900px]:max-w-[620px] min-[1120px]:mt-10 min-[1120px]:max-w-none"
    >
      <div
        data-practice="visual-hover-scale"
        className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1120px) 30vw, (min-width: 900px) 620px, (min-width: 768px) 540px, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
