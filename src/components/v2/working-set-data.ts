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
  SiVercel,
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

export const WORKING_SET: readonly TechZone[] = [
  {
    number: "01",
    title: "FRONTEND",
    items: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact, opticalScale: 1.12 },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss, opticalScale: 1.08 },
      { name: "Vue.js", Icon: SiVuedotjs },
      { name: "Angular", Icon: SiAngular },
      { name: "Bootstrap", Icon: SiBootstrap },
    ],
  },
  {
    number: "02",
    title: "BACKEND",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Laravel", Icon: SiLaravel },
      { name: "Express.js", Icon: SiExpress },
      { name: "Fastify", Icon: SiFastify },
      { name: "FastAPI", Icon: SiFastapi },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Python", Icon: SiPython },
      { name: "Java", iconSrc: "/logos/java.svg" },
      { name: "PHP", Icon: SiPhp },
      { name: "Rust", Icon: SiRust },
    ],
  },
  {
    number: "03",
    title: "DATABASE & TESTING",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "MySQL", Icon: SiMysql },
      { name: "SQLite", Icon: SiSqlite },
      { name: "Vitest", Icon: SiVitest },
      { name: "Jest", Icon: SiJest },
      { name: "Playwright", iconSrc: "/logos/playwright.svg" },
      { name: "Postman", Icon: SiPostman },
    ],
  },
  {
    number: "04",
    title: "INFRASTRUCTURE / WORKFLOW / MOBILE",
    items: [
      { name: "Vercel", Icon: SiVercel },
      { name: "AWS", Icon: SiAmazonwebservices, opticalScale: 0.88 },
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
      { name: "WordPress", Icon: SiWordpress },
      { name: "Flutter", Icon: SiFlutter },
      { name: "Dart", Icon: SiDart },
      { name: "React Native", Icon: SiReact, opticalScale: 1.12 },
      { name: "Expo", Icon: SiExpo },
    ],
  },
] as const;
