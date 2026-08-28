import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiAmazonwebservices,
  SiAngular,
  SiBootstrap,
  SiDart,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiFastify,
  SiFlutter,
  SiGit,
  SiGithub,
  SiJest,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRust,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si";

export interface TechItem {
  name: string;
  /** react-icons/si component — used whenever an exact brand mark exists. */
  Icon?: IconType;
  /** Local SVG asset, mask-rendered (currentColor via CSS mask) —
   *  for items with no react-icons/si mark. Mutually exclusive with `Icon`. */
  iconSrc?: string;
  /** Optical size multiplier against the shared icon box. */
  opticalScale?: number;
}

export interface TechZone {
  number: string;
  title: string;
  items: readonly TechItem[];
}

/** Curated identity picks for the two LogoLoop rails — full-stack
 *  language/framework/db/cloud marks, not generic workflow tooling. The
 *  broader stack (including items dropped here) still lives in
 *  `WORKING_SET` below, surfaced through the full toolkit panel. */
export const RAIL_ONE: readonly TechItem[] = [
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact, opticalScale: 1.12 },
  { name: "Angular", Icon: SiAngular },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "AWS", Icon: SiAmazonwebservices, opticalScale: 0.88 },
  { name: "Tailwind CSS", Icon: SiTailwindcss, opticalScale: 1.08 },
  { name: "Laravel", Icon: SiLaravel },
];

export const RAIL_TWO: readonly TechItem[] = [
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Python", Icon: SiPython },
  { name: "Fastify", Icon: SiFastify },
  { name: "Java", Icon: FaJava, opticalScale: 0.92 },
  { name: "PHP", Icon: SiPhp },
  { name: "NestJS", Icon: SiNestjs },
  { name: "React Native", Icon: SiReact, opticalScale: 1.12 },
  { name: "Expo", Icon: SiExpo },
  { name: "Express.js", Icon: SiExpress },
];

// The full public toolkit — five categories, surfaced in the toolkit
// panel. Array order is meaningful: `ToolkitPanel` destructures this by
// position (Frontend, Backend, Database, Testing & Tools, Infrastructure).
export const WORKING_SET: readonly TechZone[] = [
  {
    number: "01",
    title: "FRONTEND",
    items: [
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact, opticalScale: 1.12 },
      { name: "Angular", Icon: SiAngular },
      { name: "Tailwind CSS", Icon: SiTailwindcss, opticalScale: 1.08 },
      { name: "Vue.js", Icon: SiVuedotjs },
      { name: "Bootstrap", Icon: SiBootstrap },
      { name: "React Native", Icon: SiReact, opticalScale: 1.12 },
      { name: "Expo", Icon: SiExpo },
      { name: "Flutter", Icon: SiFlutter },
      { name: "Dart", Icon: SiDart },
    ],
  },
  {
    number: "02",
    title: "BACKEND",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Laravel", Icon: SiLaravel },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Fastify", Icon: SiFastify },
      { name: "Express.js", Icon: SiExpress },
      { name: "Python", Icon: SiPython },
      { name: "FastAPI", Icon: SiFastapi },
      { name: "Java", Icon: FaJava, opticalScale: 0.92 },
      { name: "PHP", Icon: SiPhp },
      { name: "Rust", Icon: SiRust },
    ],
  },
  {
    number: "03",
    title: "DATABASE",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "MySQL", Icon: SiMysql },
      { name: "SQLite", Icon: SiSqlite },
    ],
  },
  {
    number: "04",
    title: "TESTING & TOOLS",
    items: [
      { name: "Vitest", Icon: SiVitest },
      { name: "Jest", Icon: SiJest },
      { name: "Playwright", iconSrc: "/logos/playwright.svg" },
      { name: "Postman", Icon: SiPostman },
    ],
  },
  {
    number: "05",
    title: "INFRASTRUCTURE & WORKFLOW",
    items: [
      { name: "AWS", Icon: SiAmazonwebservices, opticalScale: 0.88 },
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "WordPress", Icon: SiWordpress },
    ],
  },
] as const;
