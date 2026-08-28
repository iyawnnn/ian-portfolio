"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import type { PostMeta } from "@/lib/mdx";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, useGSAP);

const ROTATION_MAX = 2;
const ROTATION_FACTOR = 0.05;
const ROTATION_IDLE_MS = 120;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type PreviewPost = Pick<PostMeta, "slug" | "coverImage">;

/* ── CTA liquid sweep ──────────────────────────────────────────────────
   The exact same mechanism toolkit-reveal.tsx uses for "View toolkit" — a
   translating <g> plus a path that morphs through a few intermediate wave
   shapes via MorphSVGPlugin — rotated 90°: toolkit's liquid rises
   bottom-to-top (its wave varies in Y as a function of X, the group
   translates in Y); this one sweeps left-to-right (the wave varies in X as
   a function of Y, the group translates in X). Every variant below shares
   the same M/C/C/L/L/Z command structure for the same reason toolkit's do:
   MorphSVG interpolates intentionally between matched paths instead of
   guessing at mismatched ones.

   The `L-120,* L-120,* Z` tail is the "always filled" body, standing in
   for toolkit's own "always extends 20 units past the bottom" body — and
   the -120 value matters: toolkit's body only has to outrun a translation
   range calibrated against its 40-tall viewBox. This viewBox is 100 wide,
   and the fill has to travel the full width plus a small overscan on each
   side (~106 units total, see CTA_HIDDEN_X/CTA_FILLED_X below). A body
   that only reached to -20 (an earlier version of this file did) is
   *shorter* than that travel distance, so at the fully-filled position its
   own far edge slides back into the visible 0–100 window — the fill
   collapsed to a thin sliver at the right edge instead of covering the
   pill. -120 comfortably outruns the full travel range the same way
   toolkit's 60 outruns its own, smaller one. */
const CTA_WAVE_SETTLED = "M6,0 C6,13.3 6,13.3 6,26.7 C6,26.7 6,26.7 6,40 L-120,40 L-120,0 Z";
const CTA_WAVE_A = "M8,0 C2,8 2,12 7,20 C11,26 9,32 6,40 L-120,40 L-120,0 Z";
const CTA_WAVE_B = "M7,0 C11,6 12,12 8,20 C4,27.2 3,34 7,40 L-120,40 L-120,0 Z";
const CTA_WAVE_C = "M6.5,0 C5,8 4.5,14 6,20 C7.5,24.8 7,32 6.2,40 L-120,40 L-120,0 Z";
// Pushes the x=6 baseline left past the viewBox's x=0 edge (hidden) or
// right past its x=100 edge (fully filled) — the horizontal analogue of
// toolkit's own HIDDEN_Y/FILLED_Y overscan.
const CTA_HIDDEN_X = -10;
const CTA_FILLED_X = 96;

// Orchestrates the Writing section's entrance, its desktop floating
// preview, and the header CTA's liquid sweep. Every target is found via
// the `data-field-notes` attributes already present on the static markup
// in field-notes.tsx, which stands on its own without this file — the
// typography, preview thumbnails and row hover/focus colors all work with
// plain CSS, so this is purely progressive enhancement.
export function FieldNotesMotion({ posts }: { posts: PreviewPost[] }) {
  const [mounted, setMounted] = useState(false);
  // Deferred into a rAF callback rather than called synchronously in the
  // effect body — this repo's react-hooks/set-state-in-effect lint rule
  // flags the latter as a cascading-render risk; a callback fired one tick
  // later is the accepted escape hatch, and the delay is imperceptible
  // against a hidden portal that only exists to be queried by the
  // interaction effect below.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── Entrance ────────────────────────────────────────────────────────
     No eyebrow label — the statement's own lines open the section, the CTA
     resolves in beside them, then each row assembles (number in from the
     left, title clip-reveals up, date in from the right) before the
     section goes still. The row/closing hairlines are plain static
     `border-top` CSS (see field-notes.tsx) rather than an animated
     GSAP draw-in — they are present from first paint, not something this
     timeline reveals. Runs once, independent of the preview (which has no
     entrance of its own — it stays invisible until a row actually
     activates it) and of the CTA's own hover sweep. */
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-field-notes="root"]');
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const q = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(sel);
    const qa = <T extends HTMLElement = HTMLElement>(sel: string) =>
      Array.from(root.querySelectorAll<T>(sel));

    const headerCta = q('[data-field-notes="header-cta"]');
    const lines = qa('[data-field-notes="statement-line"]');
    const accent = q('[data-field-notes="statement-accent"]');
    const titleInners = qa('[data-field-notes="title-inner"]');
    const numbers = qa('[data-field-notes="number"]');
    const dates = qa('[data-field-notes="date"]');

    // If the visitor lands or resizes below the section it has already
    // "happened" — skip the hidden initial states entirely rather than
    // arming a trigger whose start point is behind us.
    if (root.getBoundingClientRect().top < window.innerHeight * 0.75) return;

    gsap.set(headerCta, { opacity: 0, y: 10 });
    gsap.set(lines, { yPercent: 105 });
    gsap.set(accent, { opacity: 0, x: -16 });
    gsap.set(titleInners, { yPercent: 105 });
    gsap.set(numbers, { opacity: 0, x: -14 });
    gsap.set(dates, { opacity: 0, x: 14 });

    const ROW_STAGGER = 0.07;
    const rowsStartAt = 0.68;

    ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0)
          .to(accent, { opacity: 1, x: 0, duration: 0.5 }, 0.5)
          .to(headerCta, { opacity: 1, y: 0, duration: 0.5 }, 0.45)
          .to(numbers, { opacity: 1, x: 0, duration: 0.6, stagger: ROW_STAGGER }, rowsStartAt)
          .to(
            titleInners,
            { yPercent: 0, duration: 0.8, stagger: ROW_STAGGER, ease: "power2.inOut" },
            rowsStartAt,
          )
          .to(dates, { opacity: 1, x: 0, duration: 0.6, stagger: ROW_STAGGER }, rowsStartAt + 0.05);
      },
    });
  }, []);

  /* ── CTA liquid sweep ──────────────────────────────────────────────
     Unconditional, like toolkit-reveal.tsx's own button — no matchMedia
     gate, since keyboard focus must trigger it regardless of pointer type,
     and a touch tap firing the hover state harmlessly is exactly what
     toolkit already accepts. */
  useGSAP(() => {
    const cta = document.querySelector<HTMLElement>('[data-field-notes="header-cta"]');
    const group = cta?.querySelector<SVGGElement>('[data-field-notes="cta-fill-group"]');
    const path = cta?.querySelector<SVGPathElement>('[data-field-notes="cta-fill-path"]');
    if (!cta || !group || !path) return;

    gsap.set(group, { x: CTA_HIDDEN_X });
    gsap.set(path, { attr: { d: CTA_WAVE_SETTLED } });

    let hovered = false;
    let focused = false;

    const settle = (filled: boolean) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Kill whatever's in flight first — a new tween on the same target
      // starts from its live current value, not a hardcoded start, so
      // rapid enter/leave/focus toggles never snap or fight each other.
      gsap.killTweensOf([group, path]);

      if (reduced) {
        gsap.to(group, { x: filled ? CTA_FILLED_X : CTA_HIDDEN_X, duration: 0.15, ease: "none" });
        gsap.set(path, { attr: { d: CTA_WAVE_SETTLED } });
        return;
      }

      const tl = gsap.timeline();
      if (filled) {
        tl.to(group, { x: CTA_FILLED_X, duration: 0.8, ease: "power2.inOut" }, 0)
          .to(path, { morphSVG: CTA_WAVE_A, duration: 0.24, ease: "sine.inOut" }, 0)
          .to(path, { morphSVG: CTA_WAVE_B, duration: 0.26, ease: "sine.inOut" }, 0.2)
          .to(path, { morphSVG: CTA_WAVE_C, duration: 0.22, ease: "sine.inOut" }, 0.42)
          .to(path, { morphSVG: CTA_WAVE_SETTLED, duration: 0.24, ease: "sine.inOut" }, 0.62);
      } else {
        tl.to(path, { morphSVG: CTA_WAVE_C, duration: 0.18, ease: "sine.inOut" }, 0)
          .to(group, { x: CTA_HIDDEN_X, duration: 0.7, ease: "power2.inOut" }, 0.05)
          .to(path, { morphSVG: CTA_WAVE_B, duration: 0.22, ease: "sine.inOut" }, 0.15)
          .to(path, { morphSVG: CTA_WAVE_SETTLED, duration: 0.2, ease: "sine.inOut" }, 0.5);
      }
    };

    const updateIntent = () => settle(hovered || focused);

    const onEnter = () => {
      hovered = true;
      updateIntent();
    };
    const onLeave = () => {
      hovered = false;
      updateIntent();
    };
    // Gated the same way toolkit's own CTA is (`:focus-visible` only) — a
    // mouse click already sends the visitor to /blog, so this only matters
    // for keyboard focus.
    const onFocus = () => {
      focused = cta.matches(":focus-visible");
      updateIntent();
    };
    const onBlur = () => {
      focused = false;
      updateIntent();
    };

    cta.addEventListener("pointerenter", onEnter);
    cta.addEventListener("pointerleave", onLeave);
    cta.addEventListener("focus", onFocus);
    cta.addEventListener("blur", onBlur);

    return () => {
      cta.removeEventListener("pointerenter", onEnter);
      cta.removeEventListener("pointerleave", onLeave);
      cta.removeEventListener("focus", onFocus);
      cta.removeEventListener("blur", onBlur);
      gsap.killTweensOf([group, path]);
    };
  }, []);

  /* ── Floating preview ──────────────────────────────────────────────
     Portaled straight to `document.body`, not rendered in place. Root
     cause of the "renders behind the text" bug: every route is wrapped by
     `src/app/template.tsx`'s `.page-enter` div, which carries a permanent
     `animation: page-enter … both` and therefore a non-"none" `transform`
     on that ancestor forever after. Per the CSS spec, ANY non-none
     transform on an ancestor becomes the containing block for that
     ancestor's `position: fixed` descendants AND establishes a new
     stacking context for its whole subtree — `nav-island.tsx`'s own
     comments already document exactly this trap for the containing-block
     half of it. Declaring the preview `position: fixed` inside the
     section (as an earlier pass here did, before converting to
     section-local `absolute` coordinates to solve a since-reversed
     "behind the text" requirement) would have both (a) silently scrolled
     it away from the viewport instead of tracking the cursor, since its
     effective containing block becomes `.page-enter`'s own box, and
     (b) trapped it inside `.page-enter`'s stacking context, where its own
     z-index can only ever out-rank other elements *inside that same
     subtree* — including the row text, but never in the deterministic,
     z-index-value-independent way "always render above everything in this
     section" needs, since row `<a>` elements are themselves positioned
     with `z-index: auto` and any ties within that subtree are broken by
     DOM order, not stacking intent. Increasing the preview's own z-index
     cannot fix either of those: it is a coordinate-system problem and a
     containing-block problem, not a "not high enough number" problem.
     `nav-island.tsx` and `toolkit-panel.tsx` both solve the identical trap
     the identical way — a portal to `document.body` — which escapes
     `.page-enter`'s subtree entirely, so `position: fixed` resolves
     against the true viewport again, and the portaled node becomes a
     `position: fixed`, explicitly z-indexed *sibling* of `.page-enter`
     rather than an auto-z-index descendant of it: a positioned element
     with an explicit z-index always paints above `z-index: auto` content
     at the same comparison level, regardless of DOM order, so it now
     reliably renders above the entire section — content and typography —
     without depending on any z-index arms race inside the section itself.

     `mounted` exists only because `document.body` doesn't exist during
     SSR — the portal renders nothing until the first client paint. */
  useGSAP(() => {
    if (!mounted) return;

    const preview = document.querySelector<HTMLElement>('[data-field-notes="preview"]');
    const previewInner = preview?.querySelector<HTMLElement>('[data-field-notes="preview-inner"]');
    const images = Array.from(
      preview?.querySelectorAll<HTMLImageElement>('[data-field-notes="preview-image"]') ?? [],
    );
    const stageArea = document.querySelector<HTMLElement>('[data-field-notes="stage-area"]');
    if (!preview || !previewInner || !stageArea || images.length < 2) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1120px) and (hover: hover) and (pointer: fine)", () => {
      const rows = Array.from(stageArea.querySelectorAll<HTMLElement>('[data-field-notes="row"]'));
      if (rows.length === 0) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Reduced motion keeps every transition below as opacity-only: both
      // settle to 0, so the y-translate components become no-ops while
      // opacity still communicates state.
      const settleY = reducedMotion ? 0 : 10;
      const rowShiftY = reducedMotion ? 0 : 14;
      const restScale = reducedMotion ? 1 : 0.88;

      gsap.set(preview, { xPercent: -50, yPercent: -50 });
      gsap.set(previewInner, { opacity: 0, scale: restScale, y: settleY });
      // Every hidden image rests at the same offset, so an incoming tween is
      // always rowShiftY -> 0 and an outgoing one the reverse, regardless of
      // where it was interrupted — that is what lets `overwrite: "auto"`
      // retarget mid-flight instead of restarting from a fixed `from` state.
      gsap.set(images.slice(1), { opacity: 0, y: rowShiftY });

      const xTo = gsap.quickTo(preview, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.4, ease: "power3" });
      const rotateTo = gsap.quickTo(preview, "rotation", { duration: 0.3, ease: "power2" });

      let lastClientX = 0;
      let idleTimer: number | undefined;
      let active = 0;
      let visible = false;

      const reveal = () => {
        if (visible) return;
        visible = true;
        document.documentElement.setAttribute("data-cursor-suppressed", "true");
        gsap.to(previewInner, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.26,
          ease: "power3.out",
          overwrite: "auto",
        });
      };
      const hide = () => {
        if (!visible) return;
        visible = false;
        document.documentElement.removeAttribute("data-cursor-suppressed");
        gsap.to(previewInner, {
          opacity: 0,
          scale: restScale,
          y: settleY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
        rotateTo(0);
        window.clearTimeout(idleTimer);
      };

      const setActiveImage = (next: number) => {
        if (next === active || !images[next]) return;
        const outgoing = images[active];
        const incoming = images[next];
        active = next;

        // Incoming enters from below while outgoing moves up and out —
        // never a hard `src` swap and never an empty frame between them.
        // Both stay under 350ms because sweeping the index repeats this
        // constantly and anything slower reads as lag. The active image
        // always settles at a full, solid opacity: 1 — a lower resting
        // value here previously made pale source art (the map cover) read
        // as faded against Paper, which was a wrong opacity target, not a
        // property of the artwork.
        gsap.to(incoming, {
          opacity: 1,
          y: 0,
          duration: 0.34,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(outgoing, {
          opacity: 0,
          y: -rowShiftY,
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      // Viewport-relative, and only ever this — no local/section/scroll
      // conversion of any kind, since `position: fixed` on a body-portaled
      // element already resolves against the true viewport.
      const place = (clientX: number, clientY: number, snap: boolean) => {
        if (snap || reducedMotion) {
          gsap.set(preview, { x: clientX, y: clientY });
        } else {
          xTo(clientX);
          yTo(clientY);
        }
      };

      const onAreaEnter = (event: PointerEvent) => {
        lastClientX = event.clientX;
        place(event.clientX, event.clientY, true);
        reveal();
      };

      const onAreaMove = (event: PointerEvent) => {
        if (reducedMotion) return;
        const dx = event.clientX - lastClientX;
        lastClientX = event.clientX;
        place(event.clientX, event.clientY, false);

        rotateTo(clamp(dx * ROTATION_FACTOR, -ROTATION_MAX, ROTATION_MAX));
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => rotateTo(0), ROTATION_IDLE_MS);
      };

      const onAreaLeave = () => hide();

      const onRowEnter = (event: PointerEvent) => {
        const target = (event.currentTarget as HTMLElement).dataset.noteIndex;
        if (target !== undefined) setActiveImage(Number(target));
      };

      // Keyboard focus gets the same preview with no cursor to drive it: pin
      // it deterministically against the focused row's own viewport rect
      // instead of leaving it wherever the pointer last was.
      const onRowFocus = (event: FocusEvent) => {
        const row = event.currentTarget as HTMLElement;
        if (!row.matches(":focus-visible")) return;
        const target = row.dataset.noteIndex;
        if (target === undefined) return;

        const rowRect = row.getBoundingClientRect();
        place(rowRect.right, rowRect.top + rowRect.height / 2, true);
        setActiveImage(Number(target));
        reveal();
      };

      const onAreaFocusOut = (event: FocusEvent) => {
        if (!stageArea.contains(event.relatedTarget as Node | null)) hide();
      };

      stageArea.addEventListener("pointerenter", onAreaEnter);
      stageArea.addEventListener("pointermove", onAreaMove);
      stageArea.addEventListener("pointerleave", onAreaLeave);
      stageArea.addEventListener("focusout", onAreaFocusOut);
      rows.forEach((row) => {
        row.addEventListener("pointerenter", onRowEnter);
        row.addEventListener("focus", onRowFocus);
      });

      return () => {
        stageArea.removeEventListener("pointerenter", onAreaEnter);
        stageArea.removeEventListener("pointermove", onAreaMove);
        stageArea.removeEventListener("pointerleave", onAreaLeave);
        stageArea.removeEventListener("focusout", onAreaFocusOut);
        rows.forEach((row) => {
          row.removeEventListener("pointerenter", onRowEnter);
          row.removeEventListener("focus", onRowFocus);
        });
        window.clearTimeout(idleTimer);
        document.documentElement.removeAttribute("data-cursor-suppressed");
        gsap.killTweensOf([preview, previewInner, ...images]);
        gsap.set(preview, { clearProps: "x,y,rotation,xPercent,yPercent" });
        gsap.set(previewInner, { clearProps: "opacity,scale,y" });
        gsap.set(images, { clearProps: "opacity,y" });
      };
    });

    return () => mm.revert();
  }, [mounted]);

  if (!mounted) return null;

  // Hidden below 1120px (no pointer to drive it there) and always
  // `pointer-events-none` so it can never intercept the row it happens to
  // be floating over, keeping every article link fully clickable. `preview`
  // only ever receives x/y/rotation from GSAP; `preview-inner` only ever
  // receives the reveal/hide opacity+scale+y — kept on separate elements so
  // position and presence never fight over the same transform.
  return createPortal(
    <div
      aria-hidden="true"
      data-field-notes="preview"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden aspect-square w-[clamp(180px,15vw,250px)] min-[1120px]:block"
    >
      <div
        data-field-notes="preview-inner"
        className="relative h-full w-full overflow-hidden bg-ink/5 opacity-0 shadow-[0_8px_30px_rgba(17,17,15,0.06),0_2px_8px_rgba(17,17,15,0.04)]"
      >
        {posts.map((post, index) =>
          post.coverImage ? (
            <Image
              key={post.slug}
              src={post.coverImage}
              alt=""
              fill
              sizes="250px"
              loading="lazy"
              data-field-notes="preview-image"
              data-note-index={index}
              // The active (first) image settles at full opacity; every
              // other layer starts fully hidden. Pale source art (e.g. the
              // map cover) is expected to still read as pale — that is the
              // artwork, not a translucency bug.
              className={`object-cover ${index === 0 ? "opacity-100" : "opacity-0"}`}
            />
          ) : null,
        )}
      </div>
    </div>,
    document.body,
  );
}
