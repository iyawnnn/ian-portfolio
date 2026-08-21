import Link from "next/link";
import { PortraitPill } from "@/components/v2/portrait-pill";

const NAV_LINKS = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Hero() {
  return (
    <section
      data-hero="root"
      className="relative flex h-[100svh] flex-col overflow-clip bg-paper px-6 py-5 text-ink sm:px-10 sm:py-6"
    >
      {/* Editorial column grid */}
      <div
        aria-hidden
        data-hero="grid"
        className="pointer-events-none absolute inset-0 [--grid-cols:3] sm:[--grid-cols:5] lg:[--grid-cols:8]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(17,17,15,0.05) 0, rgba(17,17,15,0.05) 1px, transparent 1px, transparent calc(100% / var(--grid-cols)))",
        }}
      />

      {/* Atmosphere — soft, static color fields standing in for diffused
          light. Fully static (no scroll/Lenis-driven motion) and low
          opacity so typography and pills stay the focus; deliberately
          simple circle/ellipse forms rather than an irregular "blob"
          shape, which reads closer to a generic gradient background than
          editorial atmosphere. */}
      <div
        aria-hidden
        data-hero="bg-field"
        className="pointer-events-none absolute left-[-14%] top-[6%] h-[460px] w-[460px] rounded-full bg-oxblood/[0.11] blur-[80px] sm:h-[560px] sm:w-[560px]"
      />
      <div
        aria-hidden
        data-hero="bg-field"
        className="pointer-events-none absolute right-[-16%] top-[4%] h-[380px] w-[560px] rounded-full bg-slate-400/[0.15] blur-[85px] sm:h-[440px] sm:w-[680px]"
      />
      <div
        aria-hidden
        data-hero="bg-field"
        className="pointer-events-none absolute left-[42%] top-[62%] hidden h-[200px] w-[380px] -translate-x-1/2 rounded-full bg-burgundy/[0.05] blur-[70px] sm:block sm:h-[240px] sm:w-[440px]"
      />

      {/* Decorative graphic layer — sits behind all text/interactive content
          (default stacking, painted before the z-10 layers below) and in
          front of the atmosphere/grid. Purely visual: never intercepts
          pointer events, and each SVG's resting opacity is baked into its
          className so it renders correctly at its final look even without
          JS or under reduced motion (see hero-motion.tsx). Motion is
          entrance + scroll-linked only — no idle/looping animation. */}
      <div
        aria-hidden
        data-hero="decor"
        className="pointer-events-none absolute inset-0 overflow-clip"
      >
        <img
          src="/images/hero/decor/starburst-oxblood.svg"
          alt=""
          data-hero="decor-starburst"
          className="absolute left-[-4%] top-[30%] w-20 opacity-[0.13] sm:left-[-7%] sm:top-[26%] sm:w-[150px] sm:opacity-[0.2] lg:left-[-3%] lg:top-[30%] lg:w-[240px] lg:opacity-[0.24]"
        />
        <img
          src="/images/hero/decor/asterisk-oxblood.svg"
          alt=""
          data-hero="decor-asterisk"
          className="absolute left-[62%] top-[13%] w-9 opacity-[0.42] sm:top-[9%] sm:w-16 sm:opacity-[0.5] lg:top-[13%] lg:w-20"
        />
        <img
          src="/images/hero/decor/outline-shape-charcoal.svg"
          alt=""
          data-hero="decor-outline"
          className="absolute -right-[14%] -bottom-[16%] hidden w-[380px] opacity-[0.08] sm:block lg:w-[680px]"
        />
      </div>

      {/* Top bar — a real grid sharing the exact column count/breakpoints of
          the background grid above, so every group snaps to the same
          vertical lines instead of floating as separate labels. */}
      <div className="relative z-10 grid grid-cols-3 items-center sm:grid-cols-5 lg:grid-cols-8">
        {/* Temporary text wordmark — the raster ian-wordmark.png carries a
            baked-in cream backdrop that showed as a visible frame under
            every filter/mask treatment tried. Swap for the SVG wordmark
            when it exists; the asset itself is left untouched on disk. */}
        <span
          data-hero="wordmark"
          className="col-start-1 font-display text-lg font-bold text-ink sm:text-xl lg:text-2xl"
        >
          ian
        </span>

        <div
          data-hero="metadata"
          className="col-start-2 hidden text-[10px] uppercase tracking-[0.15em] text-ink/50 sm:col-span-2 sm:block lg:col-start-3 lg:col-span-2"
        >
          Full-Stack Web Developer
        </div>

        <div
          data-hero="metadata"
          className="col-start-4 hidden text-right text-[10px] uppercase tracking-[0.15em] text-ink/50 sm:col-span-2 sm:block lg:col-start-6 lg:col-span-2"
        >
          Based in Pampanga, Philippines
        </div>

        <nav
          data-hero="nav"
          className="col-start-8 hidden flex-col items-end gap-1.5 text-[10px] uppercase leading-none tracking-[0.15em] text-ink/60 lg:flex"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="transition-colors hover:text-oxblood"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pb-12 sm:pb-16 lg:pb-20">
        <h1 className="mx-auto max-w-[1480px] text-center font-display font-medium leading-[0.92] tracking-tight text-ink">
          <div className="overflow-clip -mb-4 px-12 pb-4 sm:px-16 lg:px-20">
            <span
              data-hero="headline-line"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[clamp(2.375rem,10vw,3.125rem)] sm:text-[clamp(3.5rem,7.6vw,4.875rem)] lg:flex-nowrap lg:text-[clamp(3rem,6.4vw,6.5rem)]"
            >
              I
              <PortraitPill
                href="/about"
                label="About me"
                ariaLabel="About"
                className="h-[0.85em] w-[0.85em] sm:h-[0.8em] sm:w-[1.05em] lg:h-[0.85em] lg:w-[1.4em]"
                focusClassName="object-[50%_32%]"
              />
              BUILD 
              {/* Forced line break, mobile only: keeps the tablet/desktop
                  reading of this line intact while giving mobile its own
                  intentional 2-row grouping instead of accidental reflow. */}
              <span aria-hidden className="block h-0 basis-full sm:hidden" />
               FOR THE WEB,
            </span>
          </div>
          <div className="overflow-clip -mb-4 px-12 pb-4 sm:px-16 lg:px-20">
            <span
              data-hero="headline-line"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[clamp(2.375rem,10vw,3.125rem)] sm:text-[clamp(3.5rem,7.6vw,4.875rem)] lg:flex-nowrap lg:text-[clamp(3rem,6.4vw,6.5rem)]"
            >
              SHIP WHAT
              {/* Forced line break, mobile + tablet: desktop keeps this as
                  one line. */}
              <span aria-hidden className="block h-0 basis-full lg:hidden" />
              <PortraitPill
                href="/projects"
                label="Work"
                ariaLabel="Selected Work"
                className="h-[0.85em] w-[0.85em] sm:h-[0.8em] sm:w-[1.05em] lg:h-[0.85em] lg:w-[1.4em]"
                focusClassName="object-[50%_55%]"
              />
              MATTERS,
            </span>
          </div>
          <div className="overflow-clip -mb-4 px-12 pb-4 sm:px-16 lg:px-20">
            <span
              data-hero="headline-line"
              className="block text-[clamp(2.375rem,10vw,3.125rem)] sm:text-[clamp(3.5rem,7.6vw,4.875rem)] lg:text-[clamp(3rem,6.4vw,6.5rem)]"
            >
              FIX WHAT BREAKS.
            </span>
          </div>
        </h1>
      </div>

      {/* Bottom bar */}
      <div
        data-hero="scroll-cue"
        className="relative z-10 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.15em] text-ink/50"
      >
        <span className="hidden sm:inline">Scroll</span>
        <span className="h-8 w-px bg-oxblood/60" />
      </div>
    </section>
  );
}
