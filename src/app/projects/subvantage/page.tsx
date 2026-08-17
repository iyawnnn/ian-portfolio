"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Briefcase,
  Cpu,
  Globe,
  Layout,
  Rocket,
  TrendingUp,
  Shield,
  Database,
  TestTube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubVantagePage() {
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
        name: "SubVantage",
        item: "https://www.iansebastian.dev/projects/subvantage",
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
            SubVantage
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Intelligent Subscription Manager & Tracker
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          SubVantage is a comprehensive financial tool built to help users regain control over their recurring expenses. Recently hardened with enterprise-grade security features, the platform utilizes strict API rate-limiting, secure HTTP headers, and Two-Factor Authentication (2FA). The dynamic dashboard calculates monthly burn and annual forecasts in real-time, all powered by a lightning-fast serverless PostgreSQL database.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Next.js 15</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Neon Postgres</Badge>
          <Badge variant="secondary">Prisma</Badge>
          <Badge variant="secondary">2FA Security</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/subvantage/subvantage-demo.mp4"
          poster="/projects/subvantage/subvantage-cover.webp"
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
            <Link href="https://subvantage.iansebastian.dev/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/SubVantage" target="_blank">
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
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Financial Pulse
                </h3>
                <p className="text-muted-foreground text-sm">
                  A real-time dashboard displaying Monthly Burn, Annual Forecasts, and Total Saved amounts. Interactive Recharts visualize spending velocity so users can identify heavy payment cycles effortlessly.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Advanced Security Architecture
                </h3>
                <p className="text-muted-foreground text-sm">
                  Protects sensitive financial data using Time-based One-Time Password (TOTP) Two-Factor Authentication. The application is secured against common vulnerabilities with strict API rate-limiting and enforced HTTP security headers.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" /> Serverless Data Management
                </h3>
                <p className="text-muted-foreground text-sm">
                  Powered by a Neon Serverless PostgreSQL database and Prisma ORM. This architecture provides highly efficient connection pooling to ensure instant data retrieval when users modify their subscription portfolios.
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
                As the application scaled, the primary challenge evolved from building the frontend UI to overhauling the backend architecture. Migrating the primary database to Neon while simultaneously implementing rigorous security measures (like 2FA and edge-level rate-limiting) required careful orchestration to prevent data loss or service disruption for existing users.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Database Migration:</strong> Seamlessly transitioned to Neon Postgres with Prisma, establishing a robust relational structure capable of handling high-volume currency conversions and state updates.
                </li>
                <li>
                  <strong>Security Hardening:</strong> Engineered a secure authentication pipeline incorporating 2FA verification steps, reinforced by Content Security Policies (CSP) and HTTP Strict Transport Security (HSTS).
                </li>
                <li>
                  <strong>Transactional Emails:</strong> Continued leveraging the Resend API to handle critical transactional emails (like trial expiry warnings and OTP codes) with high deliverability, fully decoupled from the main application thread.
                </li>
              </ul>
            </div>
          </section>

          {/* Testing & QA */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <TestTube className="w-6 h-6 text-primary" /> Quality Assurance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To guarantee that the newly secured endpoints and database connections functioned flawlessly, I expanded the application's testing suite:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Unit & Integration Testing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Using <strong>Vitest</strong>, I wrote extensive tests covering critical utility functions, ensuring currency math, security validations, and date logic remained 100% accurate post-migration.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  End-to-End (E2E) Testing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Utilized <strong>Playwright</strong> to simulate complete user journeys, testing the full lifecycle from signing up and passing 2FA verification to adding subscriptions and viewing dynamic chart updates.
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Upgrading SubVantage drastically improved my understanding of production-level security and database management. Executing a live migration to <strong>Neon Postgres</strong> and enforcing <strong>2FA protocols</strong> taught me how to architect applications that prioritize data integrity and user trust without sacrificing frontend performance.
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
                  <Badge variant="outline">Next.js 15</Badge>
                  <Badge variant="outline">React 19</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Shadcn UI</Badge>
                  <Badge variant="outline">Recharts</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend & Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Neon Postgres</Badge>
                  <Badge variant="outline">Prisma ORM</Badge>
                  <Badge variant="outline">Resend</Badge>
                  <Badge variant="outline">2FA Auth</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Testing & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Vitest</Badge>
                  <Badge variant="outline">Playwright</Badge>
                  <Badge variant="outline">Git</Badge>
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
                <span className="font-medium text-foreground">Dec 2025</span>
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
                <span>Platform</span>
                <span className="font-medium text-foreground">Vercel</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Version</span>
                <span className="font-medium text-foreground">v2.0.0</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Database</span>
                <span className="font-medium text-foreground">Neon</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
