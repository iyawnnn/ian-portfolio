"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import {
  ArrowLeft,
  ArrowSquareOut as ExternalLink,
  Stack as Layers,
  Briefcase,
  Cpu,
  Globe,
  Layout,
  RocketLaunch as Rocket,
} from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MovieLoomPage() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.iansebastian.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://www.iansebastian.dev/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "MovieLoom",
        item: "https://www.iansebastian.dev/projects/movieloom",
      },
    ],
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {/* --- BACK NAVIGATION --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />  
      <div>
        <Link
          href="/projects"
          className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All Projects
        </Link>
      </div>

      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-[650] tracking-[-0.025em] text-foreground">
            MovieLoom
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Cinematic Discovery Engine
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          MovieLoom is a dynamic movie and TV show discovery platform designed
          to provide users with an immersive browsing experience. It features
          comprehensive databases for films, actors, and genres, allowing users
          to explore trending titles, search for favorites, and dive deep into
          cast filmographies—all wrapped in a fully responsive, custom-styled
          interface.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Vite</Badge>
          <Badge variant="secondary">CSS3</Badge>
          <Badge variant="secondary">TMDB API</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/movieloom/movieloom-demo.mp4"
          poster="/projects/movieloom/movieloom-cover.webp"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      {/* --- DEMO & CODE CARD --- */}
      <div className="rounded-xl border border-border/50 bg-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Project Links</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Explore the live application or review the codebase on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-medium">
            <Link href="https://movieloom.iansebastian.dev/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-medium"
          >
            <Link href="https://github.com/iyawnnn/MovieLoom" target="_blank">
              <Github className="mr-2 h-4 w-4" /> Source Code
            </Link>
          </Button>
        </div>
      </div>

      {/* --- DETAILED CONTENT --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* LEFT COLUMN (Main Content) */}
        <div className="xl:col-span-2 space-y-12">
          {/* Core Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-[-0.015em] flex items-center gap-2">
              <Layout className="w-6 h-6 text-primary" /> Core Features
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Extensive Database
                </h3>
                <p className="text-muted-foreground text-sm">
                  Access to thousands of movies and TV shows with detailed
                  metadata, including ratings, release dates, and plot summaries
                  sourced via API.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Smart Search & Filtering
                </h3>
                <p className="text-muted-foreground text-sm">
                  Robust search functionality allows users to find specific
                  titles, while genre-based filtering helps discover new content
                  based on mood.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Cast & Crew Insights
                </h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated pages for actors and directors (People Page)
                  displaying biographies and known-for credits, linking the
                  entire cinematic universe.
                </p>
              </div>
            </div>
          </section>

          {/* Development Process */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-[-0.015em] flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" /> Development Process
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                The primary challenge was managing the vast amount of data from
                the API and presenting it in a visually consistent manner
                without relying on CSS frameworks. Maintaining responsive grid
                layouts for movie posters across different screen sizes using
                only custom CSS required precise media query management.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Modular CSS:</strong> I adopted a modular CSS
                  approach, creating separate stylesheets for each page (e.g.,
                  `HomePage.css`, `PersonDetailsPage.css`) to maintain clean and
                  maintainable styles.
                </li>
                <li>
                  <strong>Efficient Routing:</strong> Leveraged React Router to
                  handle dynamic routes for Movie IDs and Person IDs, ensuring a
                  seamless single-page application (SPA) experience.
                </li>
                <li>
                  <strong>API Abstraction:</strong> Created a centralized
                  `api.js` utility using Axios to handle requests, simplifying
                  data fetching logic across components.
                </li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-[-0.015em] flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              MovieLoom honed my skills in vanilla CSS layout techniques
              (Flexbox & Grid) and interacting with complex third-party REST
              APIs. It demonstrated the importance of component reusability when
              building content-heavy applications.
            </p>
          </section>
        </div>

        {/* RIGHT COLUMN (Tech Stack & Meta) */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 xl:flex xl:flex-col xl:gap-8">
          {/* Tech Stack Widget */}
          <Card className="border-border/50 shadow-sm bg-card/50 md:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="w-5 h-5 text-primary" /> Tech Stack
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Vite</Badge>
                  <Badge variant="outline">CSS3</Badge>
                  <Badge variant="outline">React Router</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Data & API
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">TMDB API</Badge>
                  <Badge variant="outline">Axios</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">ESLint</Badge>
                  <Badge variant="outline">Vercel</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Context Widget */}
          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-primary" /> Context
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Type</span>
                <span className="font-medium text-foreground">
                  Personal Project
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Timeline</span>
                <span className="font-medium text-foreground">June 2025</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground">
                  Frontend Developer
                </span>
              </div>
            </div>
          </Card>

          {/* Deployment Widget */}
          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Rocket className="w-5 h-5 text-primary" /> Deployment
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Platform</span>
                <span className="font-medium text-foreground">Vercel</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Version</span>
                <span className="font-medium text-foreground">v1.0.0</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>API</span>
                <span className="font-medium text-foreground">TMDB</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
