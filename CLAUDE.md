# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Ian Macabulos, built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. Package manager is **pnpm** (see `pnpm-workspace.yaml` / `pnpm-lock.yaml` — do not use npm/yarn).

## Commands

```bash
pnpm dev      # start dev server (next dev)
pnpm build    # production build (next build)
pnpm start    # run production build
pnpm lint     # eslint
```

There is no test suite configured in this repo.

## Architecture

### Routing & content
- Standard Next.js App Router under `src/app`. Each route that needs page-specific `<head>` metadata (title/OG tags) uses a co-located `layout.tsx` exporting a `metadata` object, with the actual page content in `page.tsx` — see any `src/app/projects/*/layout.tsx` for the pattern to copy when adding a new project page.
- Blog posts are MDX files in `src/content/blog/*.mdx` with frontmatter (title, description, date, coverImage, icon). `src/lib/mdx.ts` reads them from the filesystem with `gray-matter` and exposes `getPostBySlug` / `getAllPostsMeta`, both wrapped in React's `cache()`. `src/app/blog/[slug]/page.tsx` renders them via `next-mdx-remote/rsc`, computes reading time from word count, and renders comments through Giscus.
- `src/app/sitemap.ts` hardcodes the static route list and project slugs, then appends blog routes from `getAllPostsMeta()`. **When adding a new project or top-level route, update this file's `staticRoutes` array manually** — it is not auto-derived from the filesystem.
- Layout shell (`src/components/layout/layout-wrapper.tsx`, a client component) renders a collapsible desktop sidebar (`src/components/app-sidebar`) driven by `useSidebar()` (`src/hooks/use-sidebar.tsx`), a mobile header + bottom nav on small screens, and a persistent footer. Global overlays (`CommandMenu`, `ChatWidget`, Vercel `Analytics`) are mounted once in `src/app/layout.tsx` outside the themed layout tree.

### The AI chat widget
- `src/app/api/chat/route.ts` is an edge route using the Vercel AI SDK (`streamText`) against Groq (`openai/gpt-oss-120b`, falling back to `qwen/qwen3.6-27b` on error). It rate-limits by IP via Upstash Redis (`Ratelimit.slidingWindow(5, "1 m")`), rejects messages over 500 chars, and does a simple keyword blocklist check before calling the model.
- The system prompt is **not static** — `src/lib/ai-config.ts`'s `buildDynamicPrompt(userMessage)` fuzzy-matches (Levenshtein-based typo tolerance) the incoming message against topic keyword sets (projects, blog, contact, resume, hobbies, etc.) and concatenates only the matching prompt sections onto a base persona prompt. The persona is scripted to speak *as* Ian in first person, never admit to being an AI, and only reference facts/links explicitly written into this file.
- When asked to add/update project or blog descriptions the chatbot can discuss, edit the relevant section in `ai-config.ts` directly — descriptions and links are hardcoded per project/post, not derived from `src/content/blog` or a projects data file.

### External integrations (all server-side, keyed off env vars in `.env.local`)
- **Upstash Redis** (`src/lib/redis.ts`): shared client used for chat rate-limiting and blog view counts.
- **View counter**: `src/app/api/views/[slug]/route.ts` hashes `ip + slug` (SHA-256) to dedupe a visitor for 24h via `SETNX`, then increments a Redis counter; `src/components/ui/view-counter.tsx` reads it through `unstable_cache` (60s revalidate) and is rendered inside a `Suspense` boundary on the blog post page.
- **Spotify** (`src/lib/spotify.ts` + `src/app/api/spotify/route.ts`): refresh-token OAuth flow to fetch "now playing" for the spotify card component; fetch results are cached with `next: { revalidate: 30 }`.
- **WakaTime** (`src/lib/wakatime.ts`): fetches last-7-days coding stats, cached with `next: { revalidate: 60 }`; returns `null` on missing key or failed fetch rather than throwing.
- **Resend** (`src/app/actions/sendEmail.ts`): a `"use server"` action used by the contact form. Validates fields/email format, then sends two emails in parallel (a styled notification to the site owner with `replyTo` set to the sender, and an auto-reply confirmation to the sender) with inline HTML email templates.
- **Giscus**: comments on blog posts, configured entirely through `NEXT_PUBLIC_GISCUS_*` env vars.

### Env vars
Required in `.env.local` (see that file for the full list of names): `GROQ_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`, `UPSTASH_REDIS_REST_URL`/`TOKEN`, `SPOTIFY_CLIENT_ID`/`SECRET`/`REFRESH_TOKEN`, `WAKATIME_API_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_SENDER_EMAIL`, `NEXT_PUBLIC_RECEIVER_EMAIL`, `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_GISCUS_*`.

### UI components
- `src/components/ui/` mixes shadcn/ui-generated primitives (button, dialog, sheet, sidebar, avatar, etc. — see `components.json` for the shadcn config: New York style, zinc base, RSC-enabled, path aliases `@/components`, `@/lib`, `@/hooks`) with bespoke portfolio components (spotify-card, wakatime-card, hover-video-card, animated-backgrounds, typewriter-effect, etc.). When adding shadcn primitives, follow the existing aliasing rather than hand-rolling equivalents.
- Path alias `@/*` maps to `./src/*` (see `tsconfig.json`).

## Frontend design and motion guidance

This repository is an existing personal portfolio redesign. Preserve the established visual identity and architecture unless a redesign task explicitly requires changing them.

### Skill usage

Use the smallest relevant skill set for the task. Do not invoke every frontend/design skill by default.

- `design-taste-frontend`
  - Use for redesign exploration, anti-generic layout thinking, and proposing alternative compositions.
  - Best when a section feels predictable, templated, or overly AI-generated.
  - Treat it as an exploration tool, not the final design authority.

- `impeccable`
  - Use as the primary critique and refinement skill for hierarchy, typography, spacing, composition, responsiveness, accessibility, and final visual polish.
  - Prefer it when an existing direction already exists and needs improvement rather than replacement.

- `emil-design-eng`
  - Use primarily for animation and interaction quality: easing, durations, transitions, hover/pointer behavior, scroll interactions, micro-interactions, interruption behavior, and perceived responsiveness.
  - Do not substantially redesign a section during a motion-only pass.

- `frontend-design`
  - Use only when broader visual direction needs exploration and the current design direction is insufficient.
  - Do not automatically combine it with `design-taste-frontend`.

- `redesign-skill`
  - Use only for deliberate large-scale redesign audits.
  - Avoid invoking it for small styling or component changes.

- `gpt-tasteskill`
  - Do not use by default in Claude Code.
  - Reserve it for explicitly experimental, GSAP-heavy motion/layout exploration.

- `soft-skill`, `minimalist-skill`, and `brutalist-skill`
  - Use only when that specific visual direction is explicitly requested or clearly relevant.

- `imagegen-frontend-web`
  - Use only when visual reference generation is explicitly requested.
  - Do not generate reference images during normal implementation tasks.

### Design workflow

For unclear design problems:
1. Use Superpowers brainstorming to clarify the section's purpose and possible directions.
2. Use `design-taste-frontend` when useful to challenge predictable solutions.
3. Use `impeccable` to critique and refine the selected direction.
4. Implement using the existing project architecture and conventions.
5. Use `emil-design-eng` for the dedicated motion/interaction pass.
6. Use `impeccable` again for final polish when appropriate.

Do not combine these stages unnecessarily for small changes.

### Visual direction

Favor:
- editorial composition
- contemporary developer-portfolio aesthetics
- strong typography and hierarchy
- intentional asymmetry when appropriate
- restrained but distinctive visual details
- generous negative space
- designs that feel authored rather than template-generated

Avoid:
- generic bento-grid layouts unless structurally justified
- excessive cards
- glassmorphism
- gradient blobs
- floating decorative pills
- unnecessary glow effects
- generic SaaS landing-page aesthetics
- repetitive centered section layouts
- decoration that does not support hierarchy or meaning

### Motion direction

Motion should communicate hierarchy, continuity, spatial relationships, or interaction.

Prefer:
- purposeful GSAP/ScrollTrigger effects where they materially improve the experience
- subtle micro-interactions
- deliberate easing and timing
- transform/opacity animation where appropriate
- responsive interruption behavior
- restrained motion density
- reduced-motion support

Avoid:
- applying the same fade-up entrance to every section
- arbitrary parallax
- excessive staggering
- animation added only because an element enters the viewport
- scroll-jacking
- effects that make content harder to read or interact with
- `transition-all` when specific properties are sufficient

Project instructions and the existing portfolio design language take precedence over generic recommendations from installed design skills.