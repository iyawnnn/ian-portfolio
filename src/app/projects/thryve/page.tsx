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

export default function ThryvePage() {
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
        name: "Thryve",
        item: "https://www.iansebastian.dev/projects/thryve",
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
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Thryve
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Unified Health & Productivity Ecosystem
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          Thryve is a full-stack health and fitness application built on the
          MEVN stack (MongoDB, Express, Vue.js, Node.js). It provides a unified
          platform for users to monitor workouts, nutritional intake, hydration,
          and sleep patterns. Beyond simple logging, Thryve gamifies the
          experience with achievement badges and daily streaks to promote
          consistent self-improvement.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Vue.js 3</Badge>
          <Badge variant="secondary">PrimeVue</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">MongoDB Atlas</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/thryve/thryve-demo.mp4"
          poster="/projects/thryve/thryve-cover.webp"
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
          <h3 className="text-lg font-bold">Project Links</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Explore the live application or review the codebase on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-bold">
            <Link href="https://thryvefitness.vercel.app/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/Thryve" target="_blank">
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
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Layout className="w-6 h-6 text-primary" /> Core Features
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Holistic Tracking
                </h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive logging for four key pillars: Workouts
                  (sets/reps), Nutrition (calories/macros), Sleep quality, and
                  Water intake.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Gamification Engine
                </h3>
                <p className="text-muted-foreground text-sm">
                  Integrated achievement system that awards digital badges for
                  milestones (e.g., "7-Day Streak", "1000 Calories Burned") to
                  drive user retention.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Visual Analytics
                </h3>
                <p className="text-muted-foreground text-sm">
                  Interactive dashboards powered by Chart.js visualize progress
                  over time, offering insights into weekly calorie deficits and
                  workout consistency.
                </p>
              </div>
            </div>
          </section>

          {/* Development Process */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" /> Development Process
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                The primary challenge was managing the state for multiple
                interconnected data streams. For example, deleting a workout
                needed to immediately update the user's daily progress bar,
                achievement eligibility, and dashboard charts without requiring
                a page reload.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Reactive State Management:</strong> Leveraged Pinia
                  stores to create a single source of truth for user data,
                  ensuring instantaneous UI updates across all components.
                </li>
                <li>
                  <strong>Modular Backend:</strong> Designed a clean REST API
                  structure with separate controllers for each domain (Meals,
                  Workouts, Sleep), kept DRY with reusable middleware for JWT
                  authentication.
                </li>
                <li>
                  <strong>Email Service:</strong> Integrated SendGrid to handle
                  secure password reset flows and welcome emails, improving the
                  user onboarding experience.
                </li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Thryve was a deep dive into the modern Vue ecosystem (Vue 3 +
              Composition API). It taught me the importance of scalable folder
              structures in full-stack apps and how to effectively model
              relationships in a cloud-based NoSQL database like MongoDB Atlas.
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
                  <Badge variant="outline">Vue.js 3</Badge>
                  <Badge variant="outline">PrimeVue</Badge>
                  <Badge variant="outline">CSS</Badge>
                  <Badge variant="outline">Pinia</Badge>
                  <Badge variant="outline">Chart.js</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Express.js</Badge>
                  <Badge variant="outline">MongoDB Atlas</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">JWT</Badge>
                  <Badge variant="outline">SendGrid</Badge>
                  <Badge variant="outline">Bcrypt</Badge>
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
                  School Project
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Timeline</span>
                <span className="font-medium text-foreground">Oct 2025</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground">
                  Full Stack Developer
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
                <span className="font-medium text-foreground">
                  MongoDB Atlas
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
