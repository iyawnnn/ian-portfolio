"use client";

import React, { useState, useRef, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight } from "@phosphor-icons/react/ssr";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const PROJECTS = [
  {
    title: "University of Assumption Laboratory Attendance",
    description:
      "A zero-trust educational platform that eliminates proxy attendance fraud by utilizing strict browser geolocation APIs and Elliptic Curve Digital Signature Algorithm (ECDSA) cryptographic verification.",
    link: "/projects/ua-attendance",
    image: "/projects/ua-attendance/ua-attendance-cover.webp",
    video: "/projects/ua-attendance/ua-attendance-demo.mp4",
    tags: ["Next.js 15", "Aiven MySQL", "ECDSA", "Geolib"],
  },
  {
    title:
      "AC-CORE (Angeles City Center for Operational Reporting and Engineering)",
    description:
      "A proactive GovTech platform for Angeles City featuring Geospatial Signal Routing (GSR) to predict flooding risks and a Paved Paradox algorithm to prioritize infrastructure repairs.",
    image: "/projects/ac-core/accore-cover.webp",
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
    video: "/projects/grit/grit-demo.mp4",
  },
  {
    title: "KodaSync",
    description:
      "A professional intelligence hub combining a Monaco Editor with RAG-powered AI agents for a searchable, neural knowledge base.",
    tags: ["Next.js 15", "FastAPI", "Groq SDK", "pgvector"],
    link: "/projects/kodasync",
    image: "/projects/kodasync/kodasync-cover.webp",
    video: "/projects/kodasync/kodasync-demo.mp4",
  },
  {
    title: "SubVantage",
    description:
      "A secure financial dashboard for tracking subscriptions, fortified with Two-Factor Authentication (2FA) and powered by a high-performance serverless Neon PostgreSQL architecture.",
    tags: ["Next.js 15", "Neon Postgres", "Prisma", "2FA Security"],
    link: "/projects/subvantage",
    image: "/projects/subvantage/subvantage-cover.webp",
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

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const currentPage = Number(resolvedParams.page) || 1;

  const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = PROJECTS.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-10 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 w-full max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl text-foreground leading-[1.15]">
          Crafted Projects
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground w-full">
          A collection of side projects, freelance hustle, and school
          requirements that definitely didn't cause a mid-degree identity
          crisis.
        </p>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 items-start"
      >
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.ul>

      {totalPages > 1 && (
        <div className="flex items-center justify-between w-full pt-4">
          <div className="flex w-24 sm:w-32">
            {currentPage > 1 && (
              <Link
                href={`/projects?page=${currentPage - 1}`}
                className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                scroll={false}
                prefetch={true} // Add aggressive prefetching
              >
                <ChevronLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
                Previous
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground bg-muted/30 px-3 sm:px-4 py-1.5 rounded-full border border-border/50">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex w-24 sm:w-32 justify-end">
            {currentPage < totalPages && (
              <Link
                href={`/projects?page=${currentPage + 1}`}
                className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                scroll={false}
                prefetch={true} // Add aggressive prefetching
              >
                Next{" "}
                <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        if (videoRef.current.readyState === 0) {
          videoRef.current.load();
        }

        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsVideoPlaying(true))
            .catch((error) => {
              if (error.name !== "AbortError") {
                console.error("Video playback failed:", error);
              }
            });
        }
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setIsVideoPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={project.link}
      className="group block h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card className="h-full p-0 gap-2 overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 border border-border/50 bg-card flex flex-col">
        <div className="relative w-full aspect-video overflow-hidden border-b border-border/50 bg-muted/20">
          {isImageLoading && (
            <Skeleton className="absolute inset-0 h-full w-full z-10" />
          )}

          <Image
            src={project.image}
            alt={`Static cover preview of ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 z-10 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsImageLoading(false)}
          />

          <video
            aria-hidden="true"
            tabIndex={-1}
            ref={videoRef}
            src={project.video}
            preload="none"
            muted
            playsInline
            loop
            className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 z-30" />
        </div>

        <CardHeader className="px-6 pt-3 pb-1">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm sm:text-base">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="gap-2 mt-auto flex-wrap px-6 pb-4 pt-0">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-md group-hover:bg-background transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
