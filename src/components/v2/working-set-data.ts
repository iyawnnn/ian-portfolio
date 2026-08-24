import type { IconType } from "react-icons";
import {
  SiAmazonwebservices,
  SiAngular,
  SiBootstrap,
  SiDart,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiFastify,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJest,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiPytest,
  SiReact,
  SiRender,
  SiRust,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVitest,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si";

export interface TechItem {
  name: string;
  /** react-icons/si component — used whenever an exact brand mark exists
   *  there (confirmed against the installed package, currently 5.5.0,
   *  and cross-checked against the 5.7.0 index and the upstream Simple
   *  Icons dataset directly — react-icons doesn't lag behind on this
   *  one, Simple Icons itself has no "playwright" slug). */
  Icon?: IconType;
  /** Local SVG asset, mask-rendered exactly like the site's Ian mark
   *  (currentColor via CSS mask, not the asset's own embedded colors) —
   *  for the one item with no react-icons/si mark at all: Playwright.
   *  Sourced directly from playwright.dev's own official logo asset
   *  (public/logos/playwright.svg), not fabricated. Mutually exclusive
   *  with `Icon`. */
  iconSrc?: string;
  /** Official brand hex, revealed on hover only when reliably known.
   *  Omitted (falls back to Oxblood on hover, see TechItemCell) for
   *  Java/OpenJDK and Playwright — inventing a brand color for either
   *  would be a guess the brief rules out. */
  color?: string;
  /** Optical size multiplier against the shared icon box — most icons
   *  read correctly at 1; a few (thin strokes, unusually wide/tall
   *  marks) need a nudge to look the same *weight* as their neighbors
   *  despite occupying the same box. Only set where genuinely needed. */
  opticalScale?: number;
}

export interface TechSubgroup {
  /** Small muted meta label above the row, e.g. "INFRASTRUCTURE" inside
   *  the combined zone 4. Omitted for zones that are a single flat list
   *  (Frontend, Backend) or where the brief explicitly said not to
   *  visually separate subgroups (Databases/Testing inside zone 3) —
   *  those get only a spacing break between subgroup rows. */
  label?: string;
  items: readonly TechItem[];
}

export interface TechZone {
  number: string;
  title: string;
  subgroups: readonly TechSubgroup[];
}

export const WORKING_SET: readonly TechZone[] = [
  {
    number: "01",
    title: "FRONTEND",
    subgroups: [
      {
        items: [
          { name: "Next.js 15", Icon: SiNextdotjs, color: "#000000" },
          { name: "React", Icon: SiReact, color: "#61DAFB", opticalScale: 1.12 },
          { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
          { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", opticalScale: 1.08 },
          { name: "Vue.js", Icon: SiVuedotjs, color: "#4FC08D" },
          { name: "Angular", Icon: SiAngular, color: "#DD0031" },
          { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
        ],
      },
    ],
  },
  {
    number: "02",
    title: "BACKEND",
    subgroups: [
      {
        items: [
          { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
          { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
          { name: "Express.js", Icon: SiExpress, color: "#000000" },
          { name: "Fastify", Icon: SiFastify, color: "#000000" },
          { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
          { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
          { name: "Python", Icon: SiPython, color: "#3776AB" },
          // No historic Java coffee-cup mark in Simple Icons (trademark
          // reasons) — OpenJDK is the reliable existing fallback per the
          // brief's own preferred hierarchy. Label stays "Java".
          { name: "Java", Icon: SiOpenjdk },
          { name: "PHP", Icon: SiPhp, color: "#777BB4" },
          { name: "Rust", Icon: SiRust, color: "#000000" },
        ],
      },
    ],
  },
  {
    number: "03",
    title: "DATA & TESTING",
    subgroups: [
      {
        items: [
          { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
          { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
          { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
          { name: "SQLite", Icon: SiSqlite, color: "#003B57" },
        ],
      },
      {
        items: [
          { name: "Vitest", Icon: SiVitest, color: "#6E9F18" },
          { name: "Jest", Icon: SiJest, color: "#C21325" },
          { name: "Pytest", Icon: SiPytest, color: "#0A9EDC" },
          { name: "Playwright", iconSrc: "/logos/playwright.svg" },
          { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
        ],
      },
    ],
  },
  {
    number: "04",
    title: "INFRASTRUCTURE / WORKFLOW / MOBILE",
    subgroups: [
      {
        label: "INFRASTRUCTURE",
        items: [
          { name: "Vercel", Icon: SiVercel, color: "#000000" },
          { name: "Render", Icon: SiRender, color: "#46E3B7" },
          { name: "Amazon Web Services", Icon: SiAmazonwebservices, color: "#FF9900", opticalScale: 0.88 },
          { name: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
          { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
        ],
      },
      {
        label: "WORKFLOW",
        items: [
          { name: "Git", Icon: SiGit, color: "#F05032" },
          { name: "GitHub", Icon: SiGithub, color: "#181717" },
          { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
          { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
        ],
      },
      {
        label: "MOBILE",
        items: [
          { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
          { name: "Dart", Icon: SiDart, color: "#0175C2" },
          // React Native has no separate brand mark in react-icons/si —
          // the React atom is the established icon convention for it
          // (there's no "reactnative" slug in Simple Icons to guess from).
          { name: "React Native", Icon: SiReact, color: "#61DAFB", opticalScale: 1.12 },
          { name: "Expo", Icon: SiExpo, color: "#000020" },
        ],
      },
    ],
  },
] as const;
