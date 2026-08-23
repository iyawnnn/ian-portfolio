// Single source of truth for project metadata. Consumed by the /projects
// index and by the V2 homepage Selected Work reel.
export type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  // Purpose-made square artwork for the V2 homepage Selected Work reel,
  // distinct from `image` (the raw cover screenshot used by /projects and
  // project detail pages). Only set on the projects currently featured in
  // that gallery.
  galleryImage?: string;
  video: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    title: "UA LabSign — Laboratory Attendance System",
    description:
      "A zero-trust web and mobile laboratory attendance platform combining device-bound cryptographic signatures, instant geofencing, and role-based academic workflows.",
    link: "/projects/ua-attendance",
    image: "/projects/ua-attendance/ua-attendance-cover.webp",
    galleryImage: "/projects/ua-attendance/ua-labsign-gallery.webp",
    video: "/projects/ua-attendance/ua-attendance-demo.mp4",
    tags: ["Next.js", "PostgreSQL", "React Native", "Expo"],
  },
  {
    title:
      "AC-CORE (Angeles City Center for Operational Reporting and Engineering)",
    description:
      "A proactive GovTech platform for Angeles City featuring Geospatial Signal Routing (GSR) to predict flooding risks and a Paved Paradox algorithm to prioritize infrastructure repairs.",
    image: "/projects/ac-core/accore-cover.webp",
    galleryImage: "/projects/ac-core/ac-core-gallery.webp",
    video: "/projects/ac-core/accore-demo.mp4",
    link: "/projects/ac-core",
    tags: ["MEAN Stack", "Leaflet.js", "Zoneless", "GeoJSON"],
  },
  {
    title: "Grit",
    description:
      "An intelligent career management platform utilizing Groq AI to score resumes against job descriptions, featuring dynamic Kanban application boards and mock interviews.",
    tags: ["Laravel 11", "Livewire 3", "Groq AI", "Neon Postgres"],
    link: "/projects/grit",
    image: "/projects/grit/grit-cover.webp",
    galleryImage: "/projects/grit/grit-gallery.webp",
    video: "/projects/grit/grit-demo.mp4",
  },
  {
    title: "KodaSync",
    description:
      "A professional intelligence hub combining a Monaco Editor with RAG-powered AI agents for a searchable, neural knowledge base.",
    tags: ["Next.js 15", "FastAPI", "Groq SDK", "pgvector"],
    link: "/projects/kodasync",
    image: "/projects/kodasync/kodasync-cover.webp",
    galleryImage: "/projects/kodasync/kodasync-gallery.webp",
    video: "/projects/kodasync/kodasync-demo.mp4",
  },
  {
    title: "SubVantage",
    description:
      "A secure financial dashboard for tracking subscriptions, fortified with Two-Factor Authentication (2FA) and powered by a high-performance serverless Neon PostgreSQL architecture.",
    tags: ["Next.js 15", "Neon Postgres", "Prisma", "2FA Security"],
    link: "/projects/subvantage",
    image: "/projects/subvantage/subvantage-cover.webp",
    galleryImage: "/projects/subvantage/subvantage-gallery.webp",
    video: "/projects/subvantage/subvantage-demo.mp4",
  },
  {
    title: "Mama R's",
    description:
      "A secure Inventory and Sales Operations Dashboard featuring real-time stock tracking, printable receipts, and end-of-day financial reconciliation.",
    tags: ["TypeScript", "MERN Stack", "Tailwind CSS"],
    link: "/projects/mamars",
    image: "/projects/mamars/mamars-cover.webp",
    video: "/projects/mamars/mamars-demo.mp4",
  },
  {
    title: "ClimaPH",
    description:
      "A specialized weather  platform tailored for the Philippines, integrating real-time forecasts with lifestyle metrics.",
    tags: ["Next.js 16", "TypeScript", "API", "MapLibreGL"],
    link: "/projects/climaph",
    image: "/projects/climaph/climaph-cover.webp",
    video: "/projects/climaph/climaph-demo.mp4",
  },
  {
    title: "Thryve",
    description:
      "A unified health and fitness application tracking workouts, meals, and sleep with personalized analytics and achievement goals.",
    tags: ["MEVN Stack", "PrimeVue", "Pinia"],
    link: "/projects/thryve",
    image: "/projects/thryve/thryve-cover.webp",
    video: "/projects/thryve/thryve-demo.mp4",
  },
  {
    title: "MovieLoom",
    description:
      "A cinematic discovery interface allowing users to explore detailed movie metadata, cast profiles, and filmographies via the TMDb API.",
    tags: ["React", "Vite", "API", "CSS3"],
    link: "/projects/movieloom",
    image: "/projects/movieloom/movieloom-cover.webp",
    video: "/projects/movieloom/movieloom-demo.mp4",
  },
];
