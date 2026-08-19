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
  Pulse as Activity,
  ShieldCheck,
  Cloud,
  NavigationArrow as Navigation,
} from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AcCorePage() {
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
        name: "AC-CORE",
        item: "https://www.iansebastian.dev/projects/ac-core",
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
            AC-CORE (Angeles City Center for Operational Reporting and Engineering)
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Municipal Maintenance & Incident Reporting System
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          AC-CORE replaces reactive legacy infrastructure management with a proactive digital platform. Engineered for the local government of Angeles City, it connects everyday citizens directly with engineering departments to report hazards like clogged drains and road erosion. The system utilizes geospatial mapping and live environmental syncing to predict and prevent severe downstream flooding.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Angular 18</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">MongoDB</Badge>
          <Badge variant="secondary">Leaflet.js</Badge>
          <Badge variant="secondary">Cloudinary</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/ac-core/accore-demo.mp4"
          poster="/projects/ac-core/accore-cover.webp"
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
            Explore the live production application or review the codebase on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-medium">
            <Link href="https://ac-core.vercel.app/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Platform
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-medium"
          >
            <Link href="https://github.com/MMPA-Works/AC-CORE" target="_blank">
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
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Frictionless Reporting & Tracker
                </h3>
                <p className="text-muted-foreground text-sm">
                  Allows citizens to log emergencies quickly using a Guest Reporting mode. The system utilizes Auto-Detect GPS for precision and includes a visual status timeline (the Pizza Tracker) so users can see exactly when their report is resolved.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-primary" /> Live Environmental Syncing
                </h3>
                <p className="text-muted-foreground text-sm">
                  Integrated the OpenWeatherMap API to automatically attach real-time rainfall and temperature data to every hazard report. This provides city engineers with immediate environmental context during monsoon storms.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" /> LGU Command Center
                </h3>
                <p className="text-muted-foreground text-sm">
                  A desktop dashboard featuring an interactive Leaflet map with MarkerCluster. Administrators can view active hazards, access the integrated 24/7 emergency directory, and export CSV reports for urban planning.
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
                The primary challenge was designing a robust geospatial tracking application within a strict one-week academic sprint. The system needed to process high-resolution photo evidence and plot thousands of map markers without crashing browser threads on low-memory mobile devices.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Zoneless Architecture:</strong> Utilized the modern Angular 18 Zoneless architecture with Signals. This allowed the application to update specific screen components instead of scanning the entire page, drastically reducing battery drain.
                </li>
                <li>
                  <strong>Cloud Visual Evidence:</strong> Integrated Cloudinary to handle all image uploads securely. This offloads heavy image processing from the local server to maintain fast response times.
                </li>
                <li>
                  <strong>Geospatial Logic:</strong> Engineered a Paved Paradox algorithm to automatically prioritize infrastructure reports from heavily paved commercial zones, preventing economic bottlenecks and accidents.
                </li>
              </ul>
            </div>
          </section>

          {/* Performance & Security */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-[-0.015em] flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> Security & Performance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Because this platform is designed to handle sensitive municipal data and emergency spikes, security and speed were heavily prioritized during development:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Strict Authentication
                </h4>
                <p className="text-sm text-muted-foreground">
                  The admin portal is secured using JSON Web Tokens (JWT) and Bcrypt password hashing. Citizens can access the portal seamlessly using secure Google OAuth 2.0 integration.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  API Protection
                </h4>
                <p className="text-sm text-muted-foreground">
                  Implemented Express Rate Limiting and Helmet middleware on the Node.js backend to protect the municipal database from malicious spam reporting and external attacks.
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-[-0.015em] flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Leading the development of AC-CORE demonstrated my ability to architect complex full-stack solutions under extreme time pressure. Translating a real-world bureaucratic problem into a highly optimized, map-driven application proved the direct impact that thoughtful software engineering has on public safety and infrastructure.
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
                  <Badge variant="outline">Angular 18</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Spartan UI</Badge>
                  <Badge variant="outline">Leaflet.js</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend & Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Express.js</Badge>
                  <Badge variant="outline">Cloudinary</Badge>
                  <Badge variant="outline">OpenWeather API</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Database & Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">MongoDB</Badge>
                  <Badge variant="outline">Mongoose</Badge>
                  <Badge variant="outline">JWT Auth</Badge>
                  <Badge variant="outline">Zod Validation</Badge>
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
                  Academic (1-Week Sprint)
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Timeline</span>
                <span className="font-medium text-foreground">Mar 2026</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground text-right max-w-[140px]">
                  Lead Full-Stack
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
                <span>Frontend</span>
                <span className="font-medium text-foreground">Vercel</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Backend</span>
                <span className="font-medium text-foreground">Render</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Database</span>
                <span className="font-medium text-foreground">MongoDB</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
