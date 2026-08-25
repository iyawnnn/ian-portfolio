"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  NAV_START_DISPATCHED_FLAG,
  NAV_START_EVENT,
} from "@/lib/portfolio-intro-events";
import useSWR from "swr";
import { FaGithub, FaLinkedin, FaTiktok, FaEnvelope } from "react-icons/fa6";
import type { SpotifyData } from "@/components/ui/spotify-card-client";

// Reuses the existing Hero keyboard shot for the WakaTime / coding-activity
// state (swapped from the old wakatime-activity-badge.webp). One constant;
// changing the image later means changing only this line.
const WAKATIME_IMAGE_SRC = "/images/hero/keyboard-hero.webp";

// Route hrefs point at today's real, working routes. Once the homepage grows
// dedicated #work/#about/#writing/#contact sections, only these four href
// values need to change (to same-page anchors) — the rest of the component
// (layout, hover state, focus order) is anchor-vs-route agnostic. Dedicated
// project/blog detail routes are untouched by this and keep working as-is.
const NAV_ITEMS = [
  { label: "WORK", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "WRITING", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

// Same verified URLs already used elsewhere in the site (see
// src/components/app-sidebar/index.tsx's CONNECT_LINKS) — reused rather than
// re-typed so there's exactly one source of truth for each profile.
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/iyawnnn", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ianmacabulos/",
    icon: FaLinkedin,
  },
  { label: "TikTok", href: "https://www.tiktok.com/@iyawn.ts", icon: FaTiktok },
  { label: "Email", href: "mailto:iannmacabulos@gmail.com", icon: FaEnvelope },
] as const;

const EQ_BAR_DURATIONS = [0.9, 1.15, 0.8, 1.05];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// "2h 8m" / "12h 42m" / "42m" — deterministic, no decimals, no seconds.
function formatWeeklyDuration(totalSeconds: number): string {
  const totalMinutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

// Small vertical bars, CSS-driven (no canvas, no RAF). Reduced motion is
// handled purely in CSS (see the <style> block in NavIsland) via a
// [data-nav-eq-bar] media-query override, so this component itself never
// needs to know about the user's motion preference.
function Equalizer({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-3 shrink-0 items-end gap-[2px] ${className}`}
    >
      {EQ_BAR_DURATIONS.map((duration, i) => (
        <span
          key={i}
          data-nav-eq-bar
          className="w-[2px] origin-bottom rounded-full bg-paper"
          style={{
            height: "100%",
            animation: `nav-eq ${duration}s ease-in-out infinite`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </span>
  );
}

// Shared square-image primitive for both Spotify album art and the WakaTime
// badge — same role (collapsed small / expanded larger), fixed pixel size
// always (never derived from image dimensions), so a differently-shaped
// source image can never resize the shell. No spin/pulse/glow — restrained.
// Spreads extra props through (e.g. data-track-art) so the track-content
// transition effect can target Spotify's art specifically without needing
// an extra wrapper element.
function ActivityImage({
  src,
  size,
  className,
  ...rest
}: { src?: string; size: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`relative shrink-0 overflow-hidden rounded-md bg-paper/10 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {src && (
        <Image src={src} alt="" fill sizes={`${size}px`} className="object-cover" />
      )}
    </div>
  );
}

// Generic two-line "primary / secondary" text stack — Geist (font-sans),
// deliberately distinct from the editorial font-display used by nav labels.
// Shared by Spotify (title/artist) and WakaTime (duration/"coded this week").
// Same extra-props spread as ActivityImage, for data-track-meta.
function ActivityMeta({
  primary,
  secondary,
  size,
  className,
  ...rest
}: {
  primary: string;
  secondary: string;
  size: "sm" | "lg";
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`flex min-w-0 flex-1 flex-col justify-center leading-tight ${className ?? ""}`}
    >
      <span
        className={`truncate font-sans font-semibold text-paper ${size === "sm" ? "text-[13px]" : "text-lg sm:text-xl"}`}
      >
        {primary}
      </span>
      <span
        className={`truncate font-sans text-paper/55 ${size === "sm" ? "text-[11px]" : "text-sm"}`}
      >
        {secondary}
      </span>
    </span>
  );
}

// The expanded island's Spotify block — the sole activity block when
// Spotify is playing (never side-by-side with WakaTime). Content only (no
// <a>/<div> wrapper) so the caller can choose the right element for whether
// songUrl exists, without duplicating this markup. When valid WakaTime data
// also exists, `weeklyLabel` renders as small secondary text beneath the
// progress bar — never a badge, never its own row. data-track-art/
// data-track-meta are the targets the track-content transition effect
// (keyed by trackKey, NOT by activity type) animates on every track change.
function SpotifyExpandedContent({
  title,
  artist,
  albumImageUrl,
  percent,
  weeklyLabel,
}: {
  title: string;
  artist: string;
  albumImageUrl?: string;
  percent: number;
  weeklyLabel?: string;
}) {
  return (
    <>
      <ActivityImage data-track-art src={albumImageUrl} size={46} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-paper/45">
          Now Playing
        </p>
        <ActivityMeta data-track-meta primary={title} secondary={artist} size="lg" />
        {/* Thin oxblood progress rule — the only rule/line allowed in the
            expanded panel. */}
        <div className="mt-0.5 h-[2px] w-full overflow-hidden rounded-full bg-paper/15">
          <div
            className="h-full rounded-full bg-oxblood transition-[width] duration-700 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>
        {/* WakaTime secondary text — plain, no badge, no heading, no
            border/box. Only appears when real weekly data exists. */}
        {weeklyLabel && (
          <p className="mt-2 truncate font-sans text-[11px]">
            <span className="text-paper/75">{weeklyLabel}</span>{" "}
            <span className="text-paper/45">coded this week</span>
          </p>
        )}
      </div>
      {/* Equalizer stays part of the Spotify block itself, and is NOT a
          track-content target — it just keeps running through a track
          change ("remains in place"), never faded by the track transition. */}
      <Equalizer className="self-center" />
    </>
  );
}

// The expanded island's WakaTime block — used only when Spotify is NOT
// playing (WakaTime becomes the full activity header). Badge + duration +
// "coded this week" — intentionally just that. No decorative filler in the
// remaining space; the negative space is deliberate, not a gap to fill.
function WakaTimeExpandedContent({ weeklyLabel }: { weeklyLabel: string }) {
  return (
    <>
      <ActivityImage src={WAKATIME_IMAGE_SRC} size={36} />
      {/* `relative` + the accent bar positioned `absolute` keeps the accent
          out of this span's own content height, so `items-center` on the
          parent row (which centers this span against the 36px image) only
          ever measures the two text lines — previously the accent's extra
          ~10px (margin + bar) was counted too, so the row centered the
          *whole* 3-part group against the image instead of just the
          readable text, leaving the two lines visibly sitting above the
          image's true center. The accent still renders at the exact same
          spot relative to the text (anchored to this span's own bottom
          edge via `top-full`), just without skewing the centering math —
          and since it's excluded from flow, nothing here needs a
          breakpoint-specific pixel nudge to stay correct at every text
          size mobile through desktop. */}
      <span className="relative flex min-w-0 flex-1 flex-col justify-center text-center leading-tight">
        <span className="truncate font-sans text-lg font-semibold text-paper sm:text-xl">
          {weeklyLabel}
        </span>
        <span className="truncate font-sans text-sm text-paper/55">
          coded this week
        </span>
        <span
          data-wakatime-accent
          aria-hidden="true"
          className="absolute left-0 top-full mt-2 block h-[2px] w-14 origin-left scale-x-0 rounded-full bg-[#6E1E24]"
        />
      </span>
    </>
  );
}

// Mounted as a sibling of <Hero /> in page.tsx (fixed positioning), never
// inside it — hero.tsx stays untouched, and a fixed-position element nested
// inside the hero's overflow-clip/transform-bearing subtree would risk being
// clipped or repositioned relative to that ancestor instead of the viewport.
export function NavIsland() {
  const { data: spotify, isLoading: spotifyLoading } = useSWR<SpotifyData>(
    "/api/spotify",
    fetcher,
    { refreshInterval: 10000, revalidateOnFocus: true },
  );
  const { data: wakatime, isLoading: wakatimeLoading } = useSWR<{
    totalSeconds: number | null;
  }>("/api/wakatime", fetcher, { refreshInterval: 60000, revalidateOnFocus: true });

  // Real activity — computed ONLY from actual resolved data, no synthetic
  // in-between value. Always live/accurate: used directly for the expanded
  // panel so opening navigation always reflects current data. This is also
  // why Spotify starting/stopping propagates automatically on the next 10s
  // poll — `activity` is a plain derived value, not cached state.
  const isPlaying = spotify?.isPlaying === true;
  const weeklySeconds = wakatime?.totalSeconds;
  const weeklyDataExists = typeof weeklySeconds === "number" && weeklySeconds > 0;
  const hasWakaTime = !isPlaying && weeklyDataExists;
  const activity: "spotify" | "wakatime" | "idle" = isPlaying
    ? "spotify"
    : hasWakaTime
      ? "wakatime"
      : "idle";
  const weeklyLabel = weeklyDataExists ? formatWeeklyDuration(weeklySeconds!) : "";

  const musicHref = spotify?.songUrl;
  const percent =
    isPlaying && spotify?.durationMs
      ? Math.min(
          100,
          Math.max(0, ((spotify.progressMs ?? 0) / spotify.durationMs) * 100),
        )
      : 0;
  const musicAriaLabel = spotify?.title
    ? `Open ${spotify.title}${spotify.artist ? ` by ${spotify.artist}` : ""} on Spotify`
    : "Open track on Spotify";

  // Stable track identity — songUrl preferred (this API doesn't expose a
  // separate track id), falling back to a deterministic title/artist/album
  // composite. Deliberately excludes progressMs (which changes every poll
  // regardless of track) — that's the whole point: a track key must only
  // change when the SONG changes, never on ordinary polling. Only computed
  // while Spotify is genuinely the active state; null the rest of the time.
  const trackKey = isPlaying
    ? (musicHref ??
      (spotify?.title
        ? `${spotify.title}-${spotify.artist ?? ""}-${spotify.album ?? ""}`
        : null))
    : null;

  // Readiness — SWR's own isLoading is true only until each query's first
  // response ever arrives (success OR error; confirmed in swr's source:
  // isValidating/isLoading both get set to false unconditionally once a
  // fetch settles), then permanently false. So a failed request counts as
  // "settled," exactly as required, with no custom error-tracking needed.
  const initialDataResolved = !spotifyLoading && !wakatimeLoading;

  // Minimum activity-reveal timer — independent of the shell entrance below
  // and much shorter than a "loading state": this never changes the
  // collapsed shell's size or which activity is computed, it only delays
  // when the COLLAPSED PILL is allowed to show its content, so a very fast
  // response can't cause an instant pop before the shell has even finished
  // arriving. Both `minRevealElapsed` and `initialDataResolved` are
  // monotonic (false→true, never back), so their AND is too — once the
  // pill first shows content, it never hides again; later activity swaps
  // are handled by the activity-type transition effect, not this gate.
  const [minRevealElapsed, setMinRevealElapsed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMinRevealElapsed(true), 900);
    return () => clearTimeout(timer);
  }, []);
  const showActivity = minRevealElapsed && initialDataResolved;
  // Gates ONLY the collapsed pill's content — never the expanded panel,
  // which always reflects `activity` directly, so opening navigation always
  // shows current data immediately, never a stale/suppressed state.
  const collapsedActivity = showActivity ? activity : null;

  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const collapsedRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const barTopRef = useRef<HTMLSpanElement>(null);
  const barBottomRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasRevealedTrackRef = useRef(false);
  const hasRevealedWakaAccentRef = useRef(false);
  // One small paused timeline per nav item (built once, see effect F below),
  // played forward on hover/focus and reversed on leave — never rebuilt.
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSurface, setIsDarkSurface] = useState(false);
  // Portalled straight to <body> rather than rendered in place:
  // app/template.tsx wraps every route in a page-transition div that
  // carries a permanent `animation: page-enter ... both` — which sets a
  // (identity, but non-"none") `transform` on that ancestor. Per the CSS
  // spec, ANY transform on an ancestor makes it the containing block for
  // `position: fixed` descendants, so without the portal this island would
  // silently scroll away with the page instead of staying pinned to the
  // viewport. Safe to call unconditionally (no mount-gate needed) because
  // this component is loaded via next/dynamic with ssr:false in page.tsx,
  // so it only ever executes on the client.
  const isOpenRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Simple scroll-state class, not a ScrollTrigger — the island only needs
  // to know "past the hero's first stretch or not," so a threshold + CSS
  // transition on box-shadow is enough.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Surface-only theme detection. The observer's root is cropped to the
  // island's actual top-of-viewport strip, so the shell changes treatment
  // precisely when a marked dark section is physically behind it. This
  // state never participates in the entrance, activity, or open/close
  // timelines and therefore cannot replay or resize them.
  useEffect(() => {
    const islandRoot = rootRef.current;
    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-island-theme="dark"]'),
    );
    if (
      !islandRoot ||
      darkSections.length === 0 ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    let observer: IntersectionObserver | null = null;
    const activeSections = new Set<Element>();

    const observeIslandStrip = () => {
      observer?.disconnect();
      activeSections.clear();

      const islandBottom = Math.ceil(islandRoot.getBoundingClientRect().bottom);
      const croppedViewport = Math.max(0, window.innerHeight - islandBottom);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) activeSections.add(entry.target);
            else activeSections.delete(entry.target);
          });
          setIsDarkSurface(activeSections.size > 0);
        },
        {
          rootMargin: `0px 0px -${croppedViewport}px 0px`,
          threshold: 0,
        },
      );
      darkSections.forEach((section) => observer?.observe(section));
    };

    observeIslandStrip();
    window.addEventListener("resize", observeIslandStrip, { passive: true });

    return () => {
      window.removeEventListener("resize", observeIslandStrip);
      observer?.disconnect();
    };
  }, [scrolled]);

  // A. Island entrance — one-shot and signal-gated (empty dependency array,
  // so it can NEVER replay for any reason — not a track change, not an
  // activity switch, not a resize, not opening navigation). Targets only the
  // shell's opacity/y/scale. Never touches width/height/borderRadius (owned
  // exclusively by timeline B / effect E), so the two can never fight.
  useGSAP(
    () => {
      const box = boxRef.current;
      if (!box) return;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) {
        gsap.set(box, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.set(box, { opacity: 0, y: -10, scale: 0.96 });
      let entranceTween: gsap.core.Tween | undefined;
      let entranceDelay: gsap.core.Tween | undefined;
      let entranceStarted = false;

      const startEntrance = () => {
        if (entranceStarted) return;
        entranceStarted = true;
        entranceDelay = gsap.delayedCall(0.13, () => {
          entranceTween = gsap.to(box, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      };

      window.addEventListener(NAV_START_EVENT, startEntrance, { once: true });
      if (
        document.documentElement.dataset[NAV_START_DISPATCHED_FLAG] === "true"
      ) {
        startEntrance();
      }

      return () => {
        window.removeEventListener(NAV_START_EVENT, startEntrance);
        entranceDelay?.kill();
        entranceTween?.kill();
      };
    },
    { scope: rootRef, dependencies: [] },
  );

  // B. The main open/close morph timeline — built exactly ONCE, on mount,
  // from stable DOM refs. It has NO dependency on activity type, Spotify
  // data, WakaTime data, or the viewport — none of those may rebuild it.
  // Its collapsed/expanded size TARGETS are function-based GSAP values
  // (`() => el.offsetWidth/Height`), evaluated live at the moment the
  // timeline actually plays, so open()/close() always animate to whatever
  // is currently correct. The shell's RESTING geometry while idle (i.e.
  // outside of an active open/close play) is a separate concern, corrected
  // by effect E whenever the viewport changes — this timeline only owns the
  // MORPH itself.
  useGSAP(
    () => {
      const box = boxRef.current;
      const collapsed = collapsedRef.current;
      const expanded = expandedRef.current;
      const toggle = toggleRef.current;
      const barTop = barTopRef.current;
      const barBottom = barBottomRef.current;
      if (!box || !collapsed || !expanded || !toggle || !barTop || !barBottom) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // offsetWidth/offsetHeight, not getBoundingClientRect(): the shell
      // entrance effect (above) sets a `transform: scale(0.96)` on this
      // same `box` ancestor at mount, and getBoundingClientRect() reports
      // the PAINTED (transform-affected) box. offsetWidth/offsetHeight
      // reflect the element's own layout box and are immune to any
      // ancestor transform.
      const collapsedWidth = collapsed.offsetWidth;
      const collapsedHeight = collapsed.offsetHeight;
      const navRows = expanded.querySelectorAll("[data-nav-row]");
      const collapsedToggleTop = collapsedHeight / 2 - 18;

      gsap.set(box, { width: collapsedWidth, height: collapsedHeight, borderRadius: 999 });
      gsap.set(expanded, { opacity: 0, scale: 0.97, pointerEvents: "none" });
      gsap.set(collapsed, { opacity: 1, scale: 1, pointerEvents: "auto" });
      gsap.set(navRows, { opacity: 0, y: 10 });
      gsap.set(toggle, { top: collapsedToggleTop });
      gsap.set(barTop, { y: 0, rotate: 0 });
      gsap.set(barBottom, { y: 0, rotate: 0 });

      const tl = gsap.timeline({ paused: true });
      const expandedWidth = () => expanded.offsetWidth;
      const expandedHeight = () => expanded.offsetHeight;

      if (reducedMotion) {
        tl.set(box, { width: expandedWidth, height: expandedHeight, borderRadius: 30 })
          .set(collapsed, { opacity: 0, pointerEvents: "none" })
          .set(expanded, { opacity: 1, scale: 1, pointerEvents: "auto" })
          .set(navRows, { opacity: 1, y: 0 })
          .set(toggle, { top: 14 })
          .set(barTop, { y: 4, rotate: 45 })
          .set(barBottom, { y: -4, rotate: -45 });
      } else {
        // 1. collapsed activity content compresses/fades  2. shell width
        // expands  3. height follows  4. radius reduces  5. expanded
        // activity header appears  6. nav rows stagger in — the menu
        // glyph's two bars morph into an X across the same span as the
        // shell's own shape change.
        tl.to(collapsed, { opacity: 0, scale: 0.94, duration: 0.2, ease: "power2.out" }, 0)
          .set(collapsed, { pointerEvents: "none" })
          .to(box, { width: expandedWidth, duration: 0.35, ease: "power3.inOut" }, 0.05)
          .to(box, { height: expandedHeight, duration: 0.32, ease: "power3.inOut" }, 0.13)
          .to(box, { borderRadius: 30, duration: 0.4, ease: "power3.inOut" }, 0.05)
          .to(toggle, { top: 14, duration: 0.4, ease: "power3.inOut" }, 0.05)
          .to(barTop, { y: 4, rotate: 45, duration: 0.3, ease: "power2.inOut" }, 0.1)
          .to(barBottom, { y: -4, rotate: -45, duration: 0.3, ease: "power2.inOut" }, 0.1)
          .to(
            expanded,
            { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
            0.25,
          )
          .set(expanded, { pointerEvents: "auto" })
          .to(
            navRows,
            { opacity: 1, y: 0, duration: 0.28, stagger: 0.04, ease: "power2.out" },
            0.35,
          );
      }

      tlRef.current = tl;
    },
    { scope: rootRef, dependencies: [] },
  );

  // C. Activity TYPE transition — spotify ↔ wakatime ↔ idle only. Fires
  // whenever `activity` itself changes value, and once on the initial
  // reveal. Deliberately depends on nothing track-specific: `activity` is a
  // 3-value enum derived only from `isPlaying`/`weeklyDataExists`, so a
  // track changing (title/artist/album/art/songUrl/progressMs) can never
  // change `activity` and can never re-trigger this effect. Targets the
  // direct children of each [data-activity-reveal] group. Collapsed is
  // additionally gated by `showActivity`; expanded never is.
  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;
      const animateReveal = (root: Element | null) => {
        const reveal = root?.querySelector("[data-activity-reveal]");
        if (!reveal?.children.length) return;
        gsap.fromTo(
          reveal.children,
          { opacity: 0, y: 5, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", stagger: 0.07 },
        );
      };
      if (showActivity) animateReveal(collapsedRef.current);
      animateReveal(expandedRef.current);
    },
    { scope: rootRef, dependencies: [showActivity, activity] },
  );

  // D. Spotify TRACK CONTENT transition — completely separate from C above.
  // Depends ONLY on `trackKey`, never on `activity`. Targets just the art +
  // metadata (data-track-art / data-track-meta) in both the collapsed pill
  // and the expanded panel — never the shell, never the activity-reveal
  // wrapper's own opacity, never timeline A/B. The equalizer is
  // intentionally untouched here ("remains in place"). Skips its own first
  // invocation (effect C already owns the very first reveal) so a track
  // becoming visible for the first time isn't double-animated.
  useGSAP(
    () => {
      if (!trackKey) return;
      const isFirst = !hasRevealedTrackRef.current;
      hasRevealedTrackRef.current = true;
      if (isFirst) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      [collapsedRef.current, expandedRef.current].forEach((root) => {
        const art = root?.querySelector("[data-track-art]");
        const meta = root?.querySelector("[data-track-meta]");
        if (!art && !meta) return;
        if (reducedMotion) {
          gsap.set([art, meta].filter(Boolean), { opacity: 1, y: 0, scale: 1 });
          return;
        }
        const tl = gsap.timeline();
        if (art) {
          tl.fromTo(
            art,
            { opacity: 0.35, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" },
            0,
          );
        }
        if (meta) {
          tl.fromTo(
            meta,
            { opacity: 0.35, y: 4 },
            { opacity: 1, y: 0, duration: 0.26, ease: "power3.out" },
            0.02,
          );
        }
      });
    },
    { scope: rootRef, dependencies: [trackKey] },
  );

  // E. Responsive geometry — corrects the shell's JS-controlled width/
  // height/toggle-position whenever collapsedRef's or expandedRef's OWN
  // (purely CSS-driven) rendered size actually changes, e.g. crossing the
  // sm breakpoint. This is what fixes the stale-dimensions bug: timeline B
  // only ever measures once, at mount, and never again — after a resize its
  // baked-in collapsed width/height (and the derived toggle top) silently
  // drifted from collapsedRef's real current size. A ResizeObserver here
  // (not a raw per-pixel resize listener) watches the two elements whose
  // size is the actual source of truth, and re-applies box's resting/open
  // geometry to match — instantly while closed (the pill's size correcting
  // itself is not something a user is watching happen), smoothly while open
  // (per spec, ~300ms). Never replays timeline B, never touches nav stagger
  // or focus, never resets isOpen.
  useGSAP(
    () => {
      const box = boxRef.current;
      const collapsed = collapsedRef.current;
      const expanded = expandedRef.current;
      const toggle = toggleRef.current;
      if (!box || !collapsed || !expanded || !toggle) return;
      if (typeof ResizeObserver === "undefined") return;

      const applyGeometry = () => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (isOpenRef.current) {
          const width = expanded.offsetWidth;
          const height = expanded.offsetHeight;
          if (reducedMotion) {
            gsap.set(box, { width, height });
          } else {
            gsap.to(box, { width, height, duration: 0.3, ease: "power2.out" });
          }
        } else {
          gsap.set(box, {
            width: collapsed.offsetWidth,
            height: collapsed.offsetHeight,
          });
          gsap.set(toggle, { top: collapsed.offsetHeight / 2 - 18 });
        }
      };

      const observer = new ResizeObserver(() => applyGeometry());
      observer.observe(collapsed);
      observer.observe(expanded);

      return () => observer.disconnect();
    },
    { scope: rootRef, dependencies: [] },
  );

  // F. WakaTime accent reveal — one shot, when the expanded WakaTime header
  // first becomes visible. It never represents progress and never loops.
  useGSAP(
    () => {
      if (activity !== "wakatime" || !isOpen || hasRevealedWakaAccentRef.current) {
        return;
      }
      const accent = expandedRef.current?.querySelector("[data-wakatime-accent]");
      if (!accent) return;

      hasRevealedWakaAccentRef.current = true;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) {
        gsap.set(accent, { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        accent,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.52, delay: 0.2, ease: "power3.out" },
      );
    },
    { scope: rootRef, dependencies: [activity, isOpen] },
  );

  const open = () => {
    setIsOpen(true);
    tlRef.current?.play();
    requestAnimationFrame(() => firstLinkRef.current?.focus());
  };

  const close = () => {
    setIsOpen(false);
    tlRef.current?.reverse();
    toggleRef.current?.focus();
  };

  const toggleOpen = () => (isOpen ? close() : open());

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      close();
    }
  };

  return createPortal(
    <div
      ref={rootRef}
      data-nav-island="root"
      className={`fixed inset-x-0 z-50 flex justify-center pt-[env(safe-area-inset-top)] transition-[top] duration-300 ease-out ${scrolled ? "top-2 sm:top-3 md:top-4" : "top-3 sm:top-5 md:top-6"}`}
      onKeyDown={handleKeyDown}
    >
      <style>{`
        @keyframes nav-eq {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-nav-eq-bar] { animation: none !important; transform: scaleY(0.7) !important; }
          [data-wakatime-accent] { transform: scaleX(1) !important; }
          [data-nav-link], [data-nav-label], [data-nav-arrow] { transition-duration: 0.01ms !important; }
        }
        [data-nav-link] {
          transform: scale(1);
          transform-origin: left center;
          transition: opacity 300ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-nav-label] {
          transition: letter-spacing 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-nav-arrow] {
          opacity: 0;
          transform: translateX(-4px) rotate(-8deg);
          transition: opacity 300ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-nav-link]:focus-visible {
          transform: scale(1.018);
        }
        [data-nav-link]:focus-visible [data-nav-label] {
          letter-spacing: -0.01em;
        }
        [data-nav-link]:focus-visible [data-nav-arrow] {
          opacity: 1;
          transform: translateX(0) rotate(0);
        }
        @media (hover: hover) and (pointer: fine) {
          [data-nav-link]:hover {
            transform: scale(1.018);
          }
          [data-nav-link]:hover [data-nav-label] {
            letter-spacing: -0.01em;
          }
          [data-nav-link]:hover [data-nav-arrow] {
            opacity: 1;
            transform: translateX(0) rotate(0);
          }
          [data-nav-list]:has([data-nav-link]:hover) [data-nav-link]:not(:hover) {
            opacity: 0.83;
          }
        }
      `}</style>

      {/* Click-outside affordance: a full-viewport transparent layer only
          present while open, sitting behind the box (lower z, not a sibling
          overlay above it) so it never intercepts collapsed-state clicks. */}
      {isOpen && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={close}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      <div
        ref={boxRef}
        data-island-surface={isDarkSurface ? "dark" : "default"}
        data-cursor-theme="dark"
        className={`relative z-50 overflow-hidden text-paper transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isDarkSurface
            ? "bg-[#181816] shadow-[inset_0_0_0_1px_rgba(242,240,233,0.10),0_10px_30px_rgba(0,0,0,0.28)]"
            : `bg-ink ${scrolled ? "shadow-[0_4px_18px_rgba(17,17,15,0.22)]" : "shadow-[0_8px_30px_rgba(17,17,15,0.35)]"}`
        }`}
      >
        {/* Collapsed content — ONE constant shell size for every activity
            state (idle included). Nothing about incoming Spotify/WakaTime
            data, the initial-reveal timer, or track changes ever changes
            this className — that's what keeps the shell physically stable.
            The second grid track is a fixed 40px control column, so activity
            content can never collide with or shift the menu/close button. */}
        <div
          ref={collapsedRef}
          className="grid h-[50px] w-[min(88vw,320px)] grid-cols-[minmax(0,1fr)_40px] items-center pl-4 pr-3 sm:h-[52px] sm:w-[330px]"
        >
          <div className="min-w-0 pr-2.5">
          {collapsedActivity === "spotify" &&
            (musicHref ? (
              <a
                href={musicHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={musicAriaLabel}
                data-activity-reveal
                className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood"
              >
                <ActivityImage data-track-art src={spotify?.albumImageUrl} size={34} />
                <ActivityMeta
                  data-track-meta
                  primary={spotify?.title ?? "Unknown track"}
                  secondary={spotify?.artist ?? ""}
                  size="sm"
                />
                <Equalizer />
              </a>
            ) : (
              <div data-activity-reveal className="flex min-w-0 flex-1 items-center gap-2.5">
                <ActivityImage data-track-art src={spotify?.albumImageUrl} size={34} />
                <ActivityMeta
                  data-track-meta
                  primary={spotify?.title ?? "Unknown track"}
                  secondary={spotify?.artist ?? ""}
                  size="sm"
                />
                <Equalizer />
              </div>
            ))}

          {collapsedActivity === "wakatime" && (
            <div data-activity-reveal className="flex min-w-0 items-center gap-2.5">
              <ActivityImage src={WAKATIME_IMAGE_SRC} size={34} />
              <ActivityMeta
                primary={weeklyLabel}
                secondary="coded this week"
                size="sm"
                className="text-center"
              />
            </div>
          )}

          </div>
          <div aria-hidden="true" className="h-10 w-10" />

          {/* Idle (or still-settling): no label, no branding, no spinner —
              just breathing room. The persistent glyph button (below) is
              the only affordance, and it never depends on activity data. */}
        </div>

        {/* Expanded panel — same shell, morphed. Always reflects the real,
            live `activity` value directly (never `collapsedActivity`), so
            opening navigation during the brief initial-reveal window still
            shows correct current data instead of a stale/blank state.
            Width is a single min() expression (not a sm: breakpoint
            split): min(92vw, 500px) — inherently continuous across every
            viewport, no breakpoint jump to go stale in the first place.
            Height is intrinsic to content — idle skips the activity row
            entirely, which is what keeps it compact rather than a tall
            card. */}
        <div
          ref={expandedRef}
          id="nav-island-panel"
          role="region"
          aria-label="Site navigation"
          aria-hidden={!isOpen}
          inert={!isOpen ? true : undefined}
          className="absolute left-0 top-0 grid w-[min(92vw,500px)] grid-cols-[minmax(0,1fr)_40px] px-3 pb-6 pt-6 opacity-0"
        >
          <div className="col-start-1 min-w-0 pl-3 pr-2.5">
          {/* Activity block — a vertical hierarchy, never side-by-side
              columns. Spotify (when playing) is the sole visual identity;
              WakaTime — when it genuinely has data — appears only as small
              secondary text under Spotify's own progress bar, never its own
              badge/row. When Spotify isn't playing, WakaTime becomes the
              full activity header on its own, with no decorative filler. */}
          {activity === "spotify" &&
            (musicHref ? (
              <a
                href={musicHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={musicAriaLabel}
                data-activity-reveal
                className="mb-6 flex min-w-0 items-center gap-3.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood"
              >
                <SpotifyExpandedContent
                  title={spotify?.title ?? "Unknown track"}
                  artist={spotify?.artist ?? ""}
                  albumImageUrl={spotify?.albumImageUrl}
                  percent={percent}
                  weeklyLabel={weeklyDataExists ? weeklyLabel : undefined}
                />
              </a>
            ) : (
              <div
                data-activity-reveal
                className="mb-6 flex min-w-0 items-center gap-3.5"
              >
                <SpotifyExpandedContent
                  title={spotify?.title ?? "Unknown track"}
                  artist={spotify?.artist ?? ""}
                  albumImageUrl={spotify?.albumImageUrl}
                  percent={percent}
                  weeklyLabel={weeklyDataExists ? weeklyLabel : undefined}
                />
              </div>
            ))}

          {activity === "wakatime" && (
            <div
              data-activity-reveal
              className="mb-6 flex min-w-0 items-center gap-3"
            >
              <WakaTimeExpandedContent weeklyLabel={weeklyLabel} />
            </div>
          )}

          </div>
          <div aria-hidden="true" className="col-start-2 row-start-1 h-10 w-10" />

          {/* Idle: no activity row at all — compact top control row (the
              persistent menu/close button, already always rendered) is the
              only thing up there. Nav starts right under the panel's own
              padding instead of a tall empty media area. */}

          <nav className="col-span-2 px-3">
            {/* Equal-width two-column grid on sm+, single column below. The
                arrow is absolutely positioned, so hover/focus cannot shift
                the label or change the cell's layout. */}
            <ul data-nav-list className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} data-nav-row>
                  <Link
                    ref={(el) => {
                      if (i === 0) firstLinkRef.current = el;
                    }}
                    href={item.href}
                    onClick={close}
                    data-nav-link
                    className="relative block w-full py-1.5 pr-6 opacity-100 focus-visible:outline-none"
                  >
                    <span
                      data-nav-label
                      className="block font-display text-[28px] font-medium uppercase leading-none tracking-tight text-paper lg:text-[32px]"
                    >
                      {item.label}
                    </span>
                    <span
                      data-nav-arrow
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-sans text-sm font-medium text-paper"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social utility row — icons + labels, existing verified URLs
              (GitHub/LinkedIn/Email already used sitewide; TikTok reused
              from app-sidebar's CONNECT_LINKS). Centered, quiet: no button
              background, no underline, no oxblood fill. flex-wrap +
              justify-center means this row's own content can never widen
              the shell — it wraps instead. */}
          <div className="col-span-2 mx-3 mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.12em] text-paper/55 transition-colors duration-300 hover:text-paper focus-visible:text-paper focus-visible:outline-none"
              >
                <social.icon
                  aria-hidden="true"
                  className="h-[15px] w-[15px] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 sm:h-[13px] sm:w-[13px]"
                />
                {social.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Persistent menu/close control — a single glyph living outside
            both content layers so it never disappears (even mid-loading,
            mid-Spotify, mid-WakaTime, idle) and never gets duplicated. Its
            physical position depends only on timeline B / effect E — never
            on activity content width, never on a track change. Its two
            parallel strokes morph into an X via timeline B. Fixed 36px hit
            target (h-9 w-9), fixed at the panel's top-right corner. */}
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="nav-island-panel"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={toggleOpen}
          className="absolute right-[14px] z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood"
        >
          <span className="relative block h-4 w-4">
            <span
              ref={barTopRef}
              aria-hidden="true"
              className="absolute inset-x-0 top-1 h-[1.5px] rounded-full bg-paper"
            />
            <span
              ref={barBottomRef}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 h-[1.5px] rounded-full bg-paper"
            />
          </span>
        </button>
      </div>
    </div>,
    document.body,
  );
}
