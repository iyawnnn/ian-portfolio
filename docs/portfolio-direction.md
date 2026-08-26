# Portfolio Redesign Direction

Planning source of truth for the v2 redesign (`src/components/v2/`). This is a living document, not permission to implement everything at once — check the implementation order below before starting new work.

## Design direction

The portfolio should feel: **technical × editorial**, **systems × interfaces**, **structured × expressive**, **warm × precise** — modern and premium without becoming overdesigned.

Avoid: generic SaaS/agency styling, excessive decoration, unnecessary complexity, spectacle-driven animation.

**Core palette**
| Name | Hex |
|---|---|
| Warm Black / Ink | `#11110F` |
| Warm Off-White / Paper | `#F2F0E9` |
| Oxblood / Burgundy | `#6E1E24` |

**Rules**
- Do not use the Ian mark repeatedly as decoration.
- Do not introduce decorative section index labels (`03 / 07`).

## Section architecture

Treat the page as chapter-based, not a sequence of unrelated sections.

| # | Section | Surface |
|---|---|---|
| 1 | Loader | Warm Black |
| 2 | Hero | Paper |
| 3 | About | Warm Black |
| 4 | Practice | Warm Black |
| — | **Major transition: Warm Black → Paper** | |
| 5 | Projects | Paper |
| 6 | Text Loop | Oxblood |
| 7 | Tech Stack | Paper |
| 8 | GitHub Contributions | Paper |
| 9 | Writing / Blog | Paper |
| — | **Major transition: Paper → Warm Black** | |
| 10 | Contact | Warm Black |
| 11 | Footer | Warm Black |

**Chapters**
- Opening / identity — Loader, Hero
- Dark identity/practice — About, Practice (must stay visually connected as one continuous Warm Black chapter)
- Work / systems / writing — Projects, Text Loop, Tech Stack, GitHub Contributions, Writing
- Closing — Contact, Footer

Text Loop is **not** the Warm Black → Paper transition — it stays a standalone oxblood banner/interstitial, placed after Projects.

## Major section transitions

Reserve large transition effects for a small number of important chapter changes only.

### Practice → Projects (main dark → light transition)
- Reference: the chapter transitions in the Devian reference site.
- Paper should feel like the next section rises upward over the dark chapter (drawer/sheet-like), not a flat CSS background swap.
- Background may also interpolate/fade Warm Black → Paper.
- Should feel spatial and continuous; the real next section participates in the transition rather than a decorative overlay sitting on top of it.
- **Not implemented yet** — build only after Projects' new layout is finalized (see implementation order).

### Writing → Contact (closing transition)
- Second major Paper → Warm Black transition.
- Does not need to duplicate the Practice → Projects treatment — final approach TBD.

## Projects redesign

Reference: HAOQI portfolio layout. Redesign happens *before* the Practice → Projects transition is built.

```
[ LARGE PROJECT IMAGE ]

Project Title                         Short Metadata
```

- Image is the main visual subject.
- Title bottom-left under the image; metadata bottom-right, similar visual weight/length to the title (e.g. `Full-stack / 2026`, `Web app / Thesis`, `Design + Dev`).
- Generous spacing between projects; editorial presentation, not cards.
- No index counters (`01 / 04`), no repeated Ian marks, no tech-logo walls, no excessive metadata, no card chrome.

**Later motion (not now):** restrained image reveal, subtle scroll movement, modest hover scale, small title/metadata entrance. No heavy pinned-scroll or WebGL unless strongly justified.

**Implemented** (`src/components/v2/selected-work.tsx`) — 8 of the 9 `PROJECTS` entries render directly in this grid, no "view all projects" CTA. **ClimaPH is excluded from this homepage showcase only** — its data, `/projects/climaph` page, and every other reference stay untouched; it's still reachable from `/projects` and elsewhere.

Fixed desktop composition (a 12-column grid used purely as an **alignment system**, not a mandate to consume all 12 columns — row spans never sum to 12, negative space is permanent):

- **Row 1** — AC-CORE alone, top-left, large landscape (16/9) but contained at 6/12, never centered or full-width.
- **Row 2** — UA LabSign + SubVantage, two medium landscape rectangles (4/3 and 16/9), distributed across the row with a gap between.
- **Row 3** — Grit + Mama R's, two small horizontal rectangles (3/2 and 16/10) grouped toward the **right** side — the row's left ~7 columns are deliberately empty, an art-directed void, not a bug.
- **Row 4** — KodaSync (portrait, 3/4) + Thryve (square) + MovieLoom (square), evenly spaced left/center/right.

Project sizing stays restrained throughout — AC-CORE, UA LabSign, and SubVantage must never be scaled back up to fill their row; Grit and Mama R's must read as genuinely small, not "medium squeezed narrower." Every item's position is explicit (`lg:col-start`/`lg:col-span`/`lg:row-start`), not grid auto-placement. Caption typography is one restrained small editorial label scale for every project regardless of image size (`font-medium`, ~0.78–0.82rem) — no separate oversized/compact split. Vertical rhythm is a single shared `gap-y` (`lg:gap-y-9`) — no per-item margin or offset exceptions. Tablet collapses to a 2-column auto-flow grid (Grit/Mama R's become a normal pair, not right-offset; KodaSync/Thryve/MovieLoom land as 2+1); mobile is a single column in the order AC-CORE → UA LabSign → SubVantage → Grit → Mama R's → KodaSync → Thryve → MovieLoom, varied aspect ratios preserved.

**Row-composition rule to keep**: after the hero, every row holds 2–3 items sized well under the row's full width, and negative space must be distributed across the canvas rather than clustered — avoid several consecutive rows whose content all terminates around the same column.

## Practice section

Do not redesign yet — current imagery is a placeholder pending final video assets. Only preserve its role as the second Warm Black section after About. Revisit once video is available.

## Text Loop

Stays its own oxblood banner. Tentative placement: **Projects → Text Loop → Tech Stack**. Acts as a visual reset after Projects, not the page's dark→light transition.

## Paper-section visual language

Paper sections shouldn't read as an empty flat canvas, but avoid solving this with decorative clutter. Use restrained editorial accents instead: thin rules, structural vertical/horizontal lines, subtle grid/alignment motifs, small oxblood accents, oversized cropped typography where justified. The Hero's vertical-line treatment is the model for "small graphic detail, meaningful impact." One strong visual idea per section — don't force every motif into every section.

## Motion system

1. **Major chapter transitions** — rare, memorable (Practice → Projects, Writing → Contact).
2. **Section entrances** — typography rising slightly, masked/clipped reveals, rules extending, image reveals, metadata staggering.
3. **Scroll effects** — only where they improve composition (Projects image movement, Tech Stack progressive reveal, GitHub grid entrance, Contact typography with closing chapter). Avoid excessive pinning/parallax.
4. **Hover/pointer** — prefer lightweight CSS: image scale, horizontal CTA movement, arrow movement, rule/underline animation, cursor/image preview where appropriate.

## Scroll stack

Keep Lenis + GSAP + ScrollTrigger. Don't replace Lenis or reintroduce Framer Motion without a strong technical reason. If investigating why a reference site feels smoother, check: Lenis init/settings, GSAP ticker integration, ScrollTrigger sync, easing/durations, expensive scroll listeners. Don't just crank up scroll inertia — target smooth *and* responsive, not floaty/laggy.

## Performance constraints

Prefer CSS transforms, opacity, overflow/masking, careful `clip-path`, CSS variables, GSAP only for real sequencing/scroll-driven motion.

Avoid unless strongly justified: WebGL, Three.js, canvas effects, heavy blur filters, large continuous animations, excessive ScrollTriggers, layout-thrashing animation, new animation libraries, unnecessary dependencies.

Respect `prefers-reduced-motion`.

## Implementation order

1. Lock section architecture and chapter structure (this document).
2. Redesign Projects (HAOQI-inspired layout).
3. Validate Projects: spacing, typography, responsive behavior, basic hover.
4. Build the Practice → Projects Warm Black → Paper transition, now that Projects' top/layout is known.
5. Inspect and tune global Lenis/GSAP scroll feel.
6. Continue through Text Loop, Tech Stack, GitHub Contributions, Writing.
7. Design the Paper → Warm Black transition into Contact.
8. Finish Contact and Footer.
9. Return to Practice once the final video asset is available.
10. Final responsive, reduced-motion, and performance polish.
