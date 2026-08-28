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
| 6 | Tech Stack | Paper |
| 7 | GitHub Contributions | Paper |
| 8 | Writing / Blog | Paper |
| — | **Major transition: Paper → Warm Black** | |
| 9 | Contact | Warm Black |
| 10 | Footer | Warm Black |

**Chapters**
- Opening / identity — Loader, Hero
- Dark identity/practice — About, Practice (must stay visually connected as one continuous Warm Black chapter)
- Work / systems / writing — Projects, Tech Stack, GitHub Contributions, Writing
- Closing — Contact, Footer

Text Loop is currently excluded from the homepage flow. Keep the component available for possible later reuse, but do not treat it as an active section or chapter transition.

## Major section transitions

Reserve large transition effects for a small number of important chapter changes only.

### Practice → Projects (main dark → light transition)
- Reference: the chapter transitions in the Devian reference site.
- Use a Devian-inspired layered handoff: the real Projects section rises from below while the end of Practice remains briefly visible behind it.
- Projects stays fully opaque on Paper. Page-level movement and the short section overlap create the depth; do not fade in the entire Paper surface.
- A restrained gradient attached to Projects' moving top edge softens the temporary boundary and disappears as Projects settles.
- Do not add a standalone transition spacer, duplicate Projects, or substitute a decorative Paper panel for the real incoming section.
- Keep the transition in normal document flow with one dedicated ScrollTrigger and no pinning unless a later direction explicitly justifies it.

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

**Motion direction:** retain restrained section entrances and the clean circular secondary-image hover reveal. Captions remain static. No heavy pinned-scroll or WebGL unless strongly justified.

**Implemented** (`src/components/v2/selected-work.tsx`) — 8 of the 9 `PROJECTS` entries render directly in this grid, no "view all projects" CTA. **ClimaPH is excluded from this homepage showcase only** — its data, `/projects/climaph` page, and every other reference stay untouched; it's still reachable from `/projects` and elsewhere.

Fixed desktop composition (a 12-column grid used purely as an **alignment system**, not a mandate to consume all 12 columns — negative space is permanent):

- **Row 1** — AC-CORE alone, top-right, landscape (16/9), starting at column 5 and spanning 8 columns.
- **Row 2** — UA LabSign and SubVantage, matching landscape rectangles (16/9), each spanning 5 columns from columns 1 and 7. Both retain the approved slight 16px width extension.
- **Row 3** — Grit and Mama R's, matching small horizontal rectangles (3/2), each spanning 3 columns from columns 5 and 10 with the approved leftward 96px extension.
- **Row 4** — KodaSync (portrait, 3/4), Thryve (square), and MovieLoom (square), each based on a 3-column span at columns 1, 5, and 9 with their approved 32px width extensions.

Every desktop position remains explicit (`lg:col-start`/`lg:col-span`/`lg:row-start`), not grid auto-placement. Captions use one restrained uppercase editorial label treatment (`font-medium`, approximately 0.85–0.9rem for titles) and remain static on hover. Desktop vertical rhythm uses `lg:gap-y-24` (96px); Row 2's `lg:mt-4` is the only intentional row-spacing exception. Tablet collapses to a 2-column auto-flow grid; mobile is a single column in the order AC-CORE → UA LabSign → SubVantage → Grit → Mama R's → KodaSync → Thryve → MovieLoom, with the approved aspect ratios preserved.

**Implemented hover direction:** projects with a secondary image use a clean circular reveal from the exact center with a restrained opacity/scale blend. The experimental pixel-edge treatment was abandoned. The outlined `VIEW PROJECT` pointer remains; hover styling may be revisited later without changing the grid.

**Row-composition rule to keep**: after the hero, every row holds 2–3 items sized well under the row's full width, and negative space must be distributed across the canvas rather than clustered — avoid several consecutive rows whose content all terminates around the same column.

## Practice section

Practice shares the exact Warm Black surface with About, forming one continuous dark chapter. Its current imagery and internal composition remain placeholders pending final video assets; this phase only adapts the surface and text colors. Revisit the content treatment once video is available.

## Text Loop

Currently excluded from the homepage sequence. Keep the implementation available for possible later reconsideration; do not replace it with another separator between Projects and Tech Stack.

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
4. Maintain the implemented Practice → Projects layered handoff now that Projects' top/layout is known.
5. Inspect and tune global Lenis/GSAP scroll feel.
6. Continue through Tech Stack, GitHub Contributions, Writing.
7. Design the Paper → Warm Black transition into Contact.
8. Finish Contact and Footer.
9. Return to Practice once the final video asset is available.
10. Final responsive, reduced-motion, and performance polish.
