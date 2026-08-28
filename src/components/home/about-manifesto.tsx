import Image from "next/image";
import { AboutManifestoMotion } from "@/components/home/about-manifesto-motion";

const MANIFESTO_PARAGRAPHS = [
  "I turn complicated ideas into things people can actually use. I care about the details, probably more than I should, and I like building products that feel as good as they work.",
  "Most days, I’m somewhere between shipping something useful, fixing something I broke, and wondering why it worked yesterday.",
] as const;

export function AboutManifesto() {
  let globalWordIndex = 0;

  return (
    <section
      id="about"
      data-about-manifesto="root"
      data-island-theme="dark"
      data-cursor-theme="dark"
      aria-label="Personal manifesto"
      className="relative isolate min-h-svh overflow-clip bg-[#11110F] text-[#F2F0E9]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.82%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.72%27/%3E%3C/svg%3E")',
          backgroundSize: "180px 180px",
        }}
      />

      <div className="relative z-10 flex min-h-svh items-center px-5 py-28 sm:px-8 sm:py-32 md:px-10 md:py-28 lg:px-12 lg:py-0 xl:px-16 2xl:px-20">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-20 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:items-center md:gap-10 lg:translate-y-[2vh] lg:gap-12 xl:gap-16">
          <div className="mx-auto w-full max-w-[390px] md:mx-0">
            <div
              data-about-manifesto="portrait"
              className="relative aspect-[4/5] w-full origin-center overflow-visible"
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/hero/ian-portrait.webp"
                  alt="Portrait of Ian Macabulos"
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 28vw, 82vw"
                  className="object-cover object-[52%_48%]"
                />
              </div>
              <svg
                data-about-manifesto="signature"
                aria-hidden="true"
                viewBox="0 0 1140 462"
                className="pointer-events-none absolute -left-[10%] -top-[16%] z-10 block h-auto w-[92%] -rotate-[3deg] overflow-visible sm:-left-[12%] sm:-top-[17%] sm:w-[96%] md:-left-[15%] md:-top-[16%] md:w-[104%] lg:-left-[18%] lg:-top-[18%] lg:w-[118%] lg:-rotate-[4deg]"
              >
                <defs>
                  <mask id="about-signature-reveal" maskUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="1140" height="462" fill="black" />
                    {/*
                      Five narrow guide strokes tracing actual pen order (entry -> capital I
                      descender -> its decorative curl -> y-loop -> awn body -> flourish),
                      each hugging the real ink centerline instead of one wide brush. The
                      previous version used two wide strokes (130/100) that fully covered
                      the raster, but their reach was big enough to sweep across nearby
                      *future* ink while still animating an earlier segment — reading as
                      the capital I getting redrawn. Narrow strokes can't reach that far, so
                      nothing lights up until the pen's guide path actually gets there. A
                      short completion pass (see the rect below) mops up the residual
                      unrevealed edge pixels these narrower strokes don't quite reach.
                    */}
                    {/*
                      Two independent hidden mechanisms baked directly into
                      this markup (not applied later via useGSAP, so there's
                      no server-render-to-hydration flash):
                        - opacity={0}: the real hiding mechanism. An
                          opacity-0 path contributes nothing to the mask no
                          matter what its dash/cap state is, which is what
                          stops a future path's stroke from leaking a pixel
                          early — dash-offset margins alone can't guarantee
                          that, since a round linecap can still rasterize a
                          faint dot at an exactly-zero-length dash.
                        - strokeDasharray/strokeDashoffset=2000 (a
                          placeholder comfortably larger than any guide
                          path's real length): keeps the path visually
                          undrawn underneath, for the instant its opacity
                          flips to 1 at its own turn, before its dashoffset
                          tween has measured the real path length.
                      about-manifesto-motion.tsx replaces the dash values
                      with each path's precise measured length once mounted,
                      and flips opacity to 1 only exactly when that path's
                      turn in the timeline begins.
                    */}
                    <path
                      data-signature-guide="entry"
                      d="M180,78 Q280,45 375,45 C410,45 430,35 450,20"
                      fill="none"
                      stroke="white"
                      strokeWidth="65"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0}
                      strokeDasharray={2000}
                      strokeDashoffset={2000}
                    />
                    <path
                      data-signature-guide="i-diagonal"
                      d="M450,20 L380,44 L362,74 L344,100 L325,124 L303,154 L285,180 L271,200 L259,216 L241,240 L227,260 L213,266 L194,272 L178,278 L161,284 L145,290 L130,296 L115,302 L101,308 L87,314 L74,320 L61,326 L50,332 L40,338 L31,344 L23,350 L17,356 L14,362 L16,368 L20,371"
                      fill="none"
                      stroke="white"
                      strokeWidth="70"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0}
                      strokeDasharray={2000}
                      strokeDashoffset={2000}
                    />
                    <path
                      data-signature-guide="y-loop"
                      d="M375,250 C355,300 340,350 320,390 C300,420 270,440 240,448 C215,452 195,448 185,435 C178,420 185,400 200,380 C220,355 245,330 265,310 C285,290 300,275 310,265"
                      fill="none"
                      stroke="white"
                      strokeWidth="100"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0}
                      strokeDasharray={2000}
                      strokeDashoffset={2000}
                    />
                    <path
                      data-signature-guide="awn"
                      d="M390,290 C400,250 420,210 445,195 C465,183 480,195 470,220 C460,245 450,260 460,270 C480,290 520,240 545,205 C565,178 585,190 578,215 C570,240 560,255 570,265 C590,285 625,240 650,205 C670,178 690,190 683,215 C675,240 665,255 675,265 C695,285 730,245 760,210 C780,188 800,190 795,215 C788,240 778,255 790,262 C815,278 850,245 875,215"
                      fill="none"
                      stroke="white"
                      strokeWidth="75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0}
                      strokeDasharray={2000}
                      strokeDashoffset={2000}
                    />
                    <path
                      data-signature-guide="flourish"
                      d="M0,345 C80,320 150,300 220,300 C320,300 380,290 420,275 C500,255 600,255 700,258 C780,260 850,255 900,248 C950,240 990,230 1010,220 C1050,205 1090,205 1135,215"
                      fill="none"
                      stroke="white"
                      strokeWidth="65"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0}
                      strokeDasharray={2000}
                      strokeDashoffset={2000}
                    />
                    <rect
                      data-signature-completion
                      x="0"
                      y="0"
                      width="1140"
                      height="462"
                      fill="white"
                      opacity="0"
                    />
                  </mask>
                </defs>
                <image
                  href="/images/about/iyawn-signature.png"
                  x="0"
                  y="0"
                  width="1140"
                  height="462"
                  mask="url(#about-signature-reveal)"
                />
              </svg>
            </div>
          </div>

          <div data-about-manifesto="copy" className="min-w-0 md:pl-2 lg:pl-0">
            <div className="sr-only">
              {MANIFESTO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="max-w-[1080px] font-display text-[clamp(2.125rem,8.4vw,3rem)] font-normal leading-[1.055] tracking-[-0.015em] md:text-[clamp(2.25rem,4.4vw,2.875rem)] md:leading-[1.04] lg:text-[clamp(42px,4vw,68px)] lg:leading-[1.02]"
            >
              {MANIFESTO_PARAGRAPHS.map((paragraph, paragraphIndex) => (
                <p key={paragraph} className={paragraphIndex === 0 ? "" : "mt-[0.8em]"}>
                  {paragraph.split(" ").map((word, wordIndex) => {
                    const index = globalWordIndex++;
                    return (
                      <span
                        key={`${paragraphIndex}-${wordIndex}`}
                        data-about-word
                        data-word-index={index}
                        className="inline text-[#F2F0E9] opacity-[0.26]"
                      >
                        {word}
                        {wordIndex < paragraph.split(" ").length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AboutManifestoMotion />
    </section>
  );
}
