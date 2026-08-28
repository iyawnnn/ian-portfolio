import { PortraitPill } from "@/components/home/portrait-pill";
import { HeroClock } from "@/components/home/hero-clock";

export function Hero() {
  return (
    <section
      data-hero="root"
      className="relative flex min-h-[100svh] flex-col overflow-clip bg-paper px-6 py-5 text-ink sm:px-10 sm:py-6"
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
          className="absolute left-[-4%] top-[30%] w-[136px] opacity-[0.32] sm:left-[-7%] sm:top-[26%] sm:w-[190px] sm:opacity-[0.42] lg:left-[-3%] lg:top-[30%] lg:w-[240px] lg:opacity-[0.55]"
        />
        {/* Two-layer wrapper: the outer div (decor-asterisk) is the same
            entrance/scroll target as before (position, scale, its own
            one-time entrance rotation) — untouched by this change. The
            inner img (decor-asterisk-spin) is a separate element that only
            ever receives one tween: a continuous 360deg loop, so it can
            never fight the outer element's rotation writes on the same
            transform. */}
        <div
          data-hero="decor-asterisk"
          className="absolute left-[62%] top-[13%] w-[54px] opacity-[0.65] sm:top-[9%] sm:w-[66px] sm:opacity-[0.75] lg:top-[13%] lg:w-20 lg:opacity-[0.85]"
        >
          <img
            src="/images/hero/decor/asterisk-oxblood.svg"
            alt=""
            data-hero="decor-asterisk-spin"
            className="block h-auto w-full"
          />
        </div>
        <img
          src="/images/hero/decor/outline-shape-charcoal.svg"
          alt=""
          data-hero="decor-outline"
          className="absolute -right-[26%] -bottom-[16%] block w-[310px] opacity-[0.07] sm:-right-[14%] sm:-bottom-[16%] sm:w-[380px] sm:opacity-[0.07] lg:-right-[14%] lg:-bottom-[16%] lg:w-[680px] lg:opacity-[0.08]"
        />
      </div>

      {/* Top bar — temporarily empty. All visible header content (wordmark,
          role/location metadata, nav links) is removed for now; the role is
          now carried by the handwritten annotation over the headline below,
          and the rest will return as a dynamic-island component later. Kept
          as a plain sized spacer (no grid/content needed while empty) so
          removing the content doesn't shift the hero's vertical rhythm —
          the user manually corrected that alignment and it must not move. */}
      <div className="h-8 shrink-0 sm:h-9 lg:h-10" />

      {/* Headline — three fully separate, deterministic compositions (one
          per breakpoint), toggled via plain CSS display. Earlier this used
          one shared line set with a flex `basis-full` marker to force
          breaks at narrower widths; that broke because JSX strips the
          whitespace immediately adjacent to a tag, so once that marker
          was `display:none` its two text-node neighbors had nothing
          between them and silently merged ("BUILDFOR"). Separate,
          complete compositions per breakpoint avoid that failure mode by
          construction — no line ever has a conditionally-hidden sibling
          inside it. */}
      {/* justify-center here centers within the main flex-1 area (between
          the shrink-0 header and shrink-0 bottom rail), not the full
          viewport. pt on mobile/tablet nudges the true center down slightly
          (mobile: subtly below center; tablet: visibly lower, closer to
          optical center against the taller header) — pb would do the
          opposite, shrinking the box from the bottom and pushing content
          up. Desktop's pb-20 (with no pt) is unchanged. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-4 pb-0 sm:pt-12 sm:pb-0 lg:pt-0">
        <h1 className="relative mx-auto max-w-[1480px] text-center font-display font-medium leading-[0.92] tracking-tight text-ink">
          {/* Editorial role annotation — a handwritten-style stand-in for
              the header's old role line, now living directly over the
              headline instead of in the (now-empty) top bar. Anchored to
              this h1 (not the viewport): bottom-full puts its own bottom
              edge flush with the h1's top edge; a small NEGATIVE
              translate-y then pulls it back UP off that edge, opening a
              clean breakpoint-specific gap instead of the overlap this
              element used to have — it now sits entirely above the
              headline, never covering any letters. Horizontally it's
              dead-centered on the h1 itself (left-1/2 -translate-x-1/2) at
              every breakpoint — no left/right nudging. translate-y/rotate
              here are Tailwind's standalone `translate`/`rotate`
              properties (not `transform`), so they composite cleanly with
              GSAP's transform-based clip-path reveal in hero-motion.tsx
              rather than fighting it. z-30 is kept (harmless with no
              overlap now, but still correct — this should always render
              above the headline group's explicit z-0 regardless). */}
          <div
            data-hero="role-annotation"
            className="pointer-events-none absolute bottom-full left-1/2 z-30 -translate-x-1/2 -translate-y-[9px] -rotate-[1deg] sm:-translate-y-[12px] sm:-rotate-[1.5deg] lg:-translate-y-[13px] lg:-rotate-[2deg]"
          >
            {/* clipPath is baked here (not left to GSAP's useLayoutEffect
                timing) so the very first paint already shows the phrase
                fully unwritten — no flash of complete text before the
                reveal animation starts. hero-motion.tsx only ever animates
                *toward* full visibility from this exact shape. py-2 gives
                Pinyon Script's tall ascenders/descenders room inside the
                clip box so the reveal polygon (which clips to the box's own
                0–100% edges) never cuts into the glyphs themselves. No
                text-shadow anymore — with the overlap removed, the script
                only ever sits against the paper background, where the
                plain oxblood fill already reads cleanly on its own. */}
            <span
              data-hero="role-annotation-text"
              style={{
                clipPath: "polygon(-1% 0%, -3% 0%, -15% 100%, -1% 100%)",
              }}
              className="block whitespace-nowrap py-2 font-script text-[26px] text-oxblood sm:text-[34px] lg:text-[54px]"
            >
              Full-Stack Developer
            </span>
            {/* Hand-drawn underline: one asymmetric sweep that starts just
                inside the phrase's left edge and ends with a slight upward
                kick well before the right edge — not a centered, symmetric
                rule — sitting close enough to the text to feel like the
                same pen stroke rather than a separate decoration. Plain
                solid oxblood stroke, no gradient/fade. vector-effect
                "non-scaling-stroke" is what actually fixes the
                faint/pixelated look: preserveAspectRatio="none" stretches
                width and height by DIFFERENT factors, so without it a
                stroke drawn at a constant width in viewBox-space rendered
                visibly uneven (thicker one direction, thinner the other,
                antialiasing poorly). With it, the stroke always renders at
                its declared width in real screen pixels regardless of that
                non-uniform geometry scale — so the responsive stroke-width
                classes below (set via an arbitrary CSS-property class,
                since the SVG `stroke-width` attribute itself can't take
                Tailwind breakpoints) now render exactly as specified at
                each breakpoint. stroke-dasharray/dashoffset are baked to a
                fixed value safely larger than the path's real length so it
                renders fully hidden from first paint with no JS
                measurement dependency — plain stroke-dash animation, no
                DrawSVGPlugin. */}
            <svg
              data-hero="role-underline"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="mx-auto -mt-0.5 h-[0.16em] w-[80%]"
            >
              <path
                data-hero="role-underline-path"
                d="M18,8 C55,13 90,11 122,9 C142,7.5 156,7 168,3"
                fill="none"
                stroke="#6E1E24"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="[stroke-width:1.85px] sm:[stroke-width:2.1px] lg:[stroke-width:2.4px]"
                style={{
                  strokeDasharray: 260,
                  strokeDashoffset: 262,
                  opacity: 0,
                }}
              />
            </svg>
          </div>

          {/* Desktop (>=1024px) — approved composition, unchanged. Only the
              spacing MECHANISM around each pill changed (see the note on
              the tablet group below) — the words/line-breaks themselves are
              untouched. relative z-0 makes the headline's stacking level
              explicit and lower than the role annotation's z-30, rather
              than depending on the (already-correct, but implicit) default
              rule that positioned z-indexed elements paint over static
              ones. */}
          <div
            data-hero-bp="desktop"
            className="relative z-0 hidden [&>div]:[clip-path:inset(0_0_1rem_0)] lg:block"
          >
            <div className="overflow-clip -mb-4 px-20 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-nowrap items-center justify-center text-[clamp(3rem,6.4vw,6.5rem)]"
              >
                I
                <PortraitPill
                  href="/about"
                  imageSrc="/images/hero/ian-sunglasses.webp"
                  label="About me"
                  ariaLabel="About"
                  className="h-[0.85em] w-[1.4em]"
                  focusClassName="object-[50%_33%]"
                  imageScale={0.86}
                />
                {"BUILD FOR THE WEB,"}
              </span>
            </div>
            <div className="overflow-clip -mb-4 px-20 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-nowrap items-center justify-center text-[clamp(3rem,6.4vw,6.5rem)]"
              >
                SHIP WHAT
                <PortraitPill
                  href="/projects"
                  imageSrc="/images/hero/keyboard-hero.webp"
                  label="Work"
                  ariaLabel="Selected Work"
                  className="h-[0.85em] w-[1.4em]"
                  focusClassName="object-center"
                />
                {"MATTERS,"}
              </span>
            </div>
            <div className="overflow-clip -mb-4 px-20 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(3rem,6.4vw,6.5rem)]"
              >
                FIX WHAT BREAKS.
              </span>
            </div>
          </div>

          {/* Tablet (640–1023px) — 6 explicit lines, same structure as the
              mobile-lg tier below (just its own font/pill size): "I [PILL]
              BUILD" / "FOR THE WEB," / "SHIP WHAT" / "[PILL] MATTERS," /
              "FIX WHAT" / "BREAKS." — none of this relies on browser
              wrapping. The second pill sits directly beside "MATTERS,"
              (its own line, pill-first) rather than trailing "SHIP WHAT".
              "FIX WHAT BREAKS." splits into two lines at every width below
              the approved >=1024px desktop composition — desktop alone
              keeps it on one line.

              Spacing architecture, applies to every pill on this page: the
              text fragment right after each pill (e.g. `{"MATTERS,"}`)
              carries NO leading space of its own — the one word gap there
              comes entirely from a static `mr-[0.2em]` on the pill's own
              outer wrapper (portrait-pill.tsx), present unchanged whether
              the pill is at width 0 or fully expanded. This replaced an
              earlier non-breaking-space approach: a plain leading space
              collapsed to zero width as a flex-item's own leading
              whitespace (the exact mechanism behind the historic
              "BUILDFOR" bug in this file), and a non-breaking space fixed
              that but became a second, stacked spacing source once the
              pill's own wrapper also carried a margin. This margin is now
              the ONLY spacing source on the right; the left side is
              intentionally untouched (its balance already comes from the
              pill's own centered slot width, not a margin). */}
          <div
            data-hero-bp="tablet"
            className="relative z-0 hidden [&>div]:[clip-path:inset(0_0_1rem_0)] sm:block lg:hidden"
          >
            <div className="overflow-clip -mb-2 px-16 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-nowrap items-center justify-center text-[clamp(3.5rem,7.6vw,4.875rem)]"
              >
                I
                <PortraitPill
                  href="/about"
                  imageSrc="/images/hero/ian-sunglasses.webp"
                  label="About me"
                  ariaLabel="About"
                  className="h-[0.8em] w-[1.05em]"
                  focusClassName="object-[50%_33%]"
                  imageScale={0.86}
                />
                {"BUILD"}
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-16 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(3.5rem,7.6vw,4.875rem)]"
              >
                FOR THE WEB,
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-16 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(3.5rem,7.6vw,4.875rem)]"
              >
                SHIP WHAT
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-16 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-nowrap items-center justify-center text-[clamp(3.5rem,7.6vw,4.875rem)]"
              >
                <PortraitPill
                  href="/projects"
                  imageSrc="/images/hero/keyboard-hero.webp"
                  label="Work"
                  ariaLabel="Selected Work"
                  className="h-[0.8em] w-[1.05em]"
                  focusClassName="object-center"
                />
                {"MATTERS,"}
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-16 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(3.5rem,7.6vw,4.875rem)]"
              >
                FIX WHAT
              </span>
            </div>
            <div className="overflow-clip -mb-4 px-16 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(3.5rem,7.6vw,4.875rem)]"
              >
                BREAKS.
              </span>
            </div>
          </div>

          {/* "Large mobile" / small-tablet tier, 550–639px — narrower than
              the 640px `sm:` breakpoint has an explicit tier of its own
              (min-[550px]: arbitrary variant, since Tailwind has no default
              breakpoint here). Second pill stays beside "MATTERS," — same
              pill-first pattern as tablet, same spacing architecture (no
              pill margin, leading space lives on the following text). */}
          <div
            data-hero-bp="mobile-lg"
            className="relative z-0 hidden [&>div]:[clip-path:inset(0_0_1rem_0)] min-[550px]:block sm:hidden"
          >
            <div className="overflow-clip -mb-4 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-nowrap items-center justify-center text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                I
                <PortraitPill
                  href="/about"
                  imageSrc="/images/hero/ian-sunglasses.webp"
                  label="About me"
                  ariaLabel="About"
                  className="h-[0.85em] w-[0.85em]"
                  focusClassName="object-[50%_33%]"
                  imageScale={0.86}
                />
                {"BUILD"}
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                FOR THE WEB,
              </span>
            </div>
            <div className="overflow-clip -mb-4 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                SHIP WHAT
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-nowrap items-center justify-center text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                <PortraitPill
                  href="/projects"
                  imageSrc="/images/hero/keyboard-hero.webp"
                  label="Work"
                  ariaLabel="Selected Work"
                  className="h-[0.85em] w-[0.85em]"
                  focusClassName="object-center"
                />
                {"MATTERS,"}
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                FIX WHAT
              </span>
            </div>
            <div className="overflow-clip -mb-4 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                BREAKS.
              </span>
            </div>
          </div>

          {/* Mobile (<550px) — approved small-mobile composition. "FIX WHAT
              BREAKS." now splits into two lines here too, matching every
              other sub-1024px tier — desktop alone keeps it on one line.
              Threshold moved from the old implicit "<640px" down to
              "<550px" now that the 550–639px range has its own explicit
              tier above. */}
          <div
            data-hero-bp="mobile"
            className="relative z-0 block [&>div]:[clip-path:inset(0_0_1rem_0)] min-[550px]:hidden"
          >
            <div className="overflow-clip -mb-4 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-wrap items-center justify-center text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                I
                <PortraitPill
                  href="/about"
                  imageSrc="/images/hero/ian-sunglasses.webp"
                  label="About me"
                  ariaLabel="About"
                  className="h-[0.85em] w-[0.85em]"
                  focusClassName="object-[50%_33%]"
                  imageScale={0.86}
                />
                {"BUILD"}
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                FOR THE WEB,
              </span>
            </div>
            <div className="overflow-clip -mb-4 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                SHIP WHAT
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="flex flex-wrap items-center justify-center text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                <PortraitPill
                  href="/projects"
                  imageSrc="/images/hero/keyboard-hero.webp"
                  label="Work"
                  ariaLabel="Selected Work"
                  className="h-[0.85em] w-[0.85em]"
                  focusClassName="object-center"
                />
                {"MATTERS,"}
              </span>
            </div>
            <div className="overflow-clip -mb-2 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                FIX WHAT
              </span>
            </div>
            <div className="overflow-clip -mb-4 px-8 pb-4">
              <span
                data-hero="headline-line"
                className="block text-[clamp(2.375rem,10vw,3.125rem)]"
              >
                BREAKS.
              </span>
            </div>
          </div>
        </h1>
      </div>

      {/* Bottom utility rail — shares the header's editorial grid (same
          3/5/8 column breakpoints, sm+) so it stays aligned to the same
          vertical lines; below sm the container itself switches to a plain
          flex row (justify-between). The Dynamic Island owns nav/social
          access, so this rail is just quiet copyright + local-time +
          location metadata: no links, no buttons. All three zones stay on
          one line at every width (each shortens under 375px rather than
          wrapping). */}
      <div
        data-hero="bottom-rail"
        className="relative z-10 flex shrink-0 items-center justify-between gap-x-2 pb-[env(safe-area-inset-bottom)] font-sans text-[9px] uppercase tracking-[0.12em] text-ink/50 sm:grid sm:grid-cols-5 sm:gap-x-2 sm:text-[10px] sm:tracking-[0.14em] lg:grid-cols-8 lg:tracking-[0.16em]"
      >
        <span className="shrink-0 whitespace-nowrap sm:col-start-1">
          <span className="max-[374px]:hidden">© 2026 Ian Macabulos</span>
          <span className="hidden max-[374px]:inline">© 2026 Ian</span>
        </span>

        <span className="shrink-0 whitespace-nowrap text-center sm:col-start-2 sm:col-span-2 sm:block lg:col-start-4 lg:col-span-2">
          <HeroClock />
        </span>

        <span className="shrink-0 whitespace-nowrap text-right sm:col-start-4 sm:col-span-2 sm:block lg:col-start-6 lg:col-span-3">
          <span className="max-[374px]:hidden">Based in Philippines</span>
          <span className="hidden max-[374px]:inline">Philippines</span>
        </span>
      </div>
    </section>
  );
}
