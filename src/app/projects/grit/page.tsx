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
  Shield,
  Robot as Bot,
  Kanban as KanbanSquare,
  Chat as MessageSquare,
  PenNib as PenTool,
  Lightning as Zap,
} from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GritPage() {
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
        name: "Grit",
        item: "https://www.iansebastian.dev/projects/grit",
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
            Grit
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            AI-Powered Job Application Tracker & Career Copilot
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          Grit is a comprehensive career management platform engineered to automate and optimize the job search process. Built on the highly scalable TALL stack (Tailwind, Alpine.js, Laravel, Livewire), it utilizes lightning-fast Groq AI models to generate tailored cover letters, format messy job descriptions, and conduct interactive mock interviews. The platform is fortified with strict rate limiting, robust caching layers, and a secure serverless Neon PostgreSQL database deployed on Render.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Laravel 11</Badge>
          <Badge variant="secondary">Livewire 3</Badge>
          <Badge variant="secondary">Groq AI</Badge>
          <Badge variant="secondary">Neon Postgres</Badge>
          <Badge variant="secondary">Cloudinary</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/grit/grit-demo.mp4"
          poster="/projects/grit/grit-cover.webp"
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
            Explore the live application or review the robust backend architecture on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-bold">
            <Link href="https://grit.iansebastian.dev/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/Grit" target="_blank">
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
              <Layout className="w-6 h-6 text-primary" /> Comprehensive Feature Suite
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" /> AI Match Analysis & Action Plans
                </h3>
                <p className="text-muted-foreground text-sm">
                  The engine evaluates user resumes against specific job descriptions to calculate precise match scores. It then generates step-by-step Action Plans to help users bridge critical skill gaps before applying.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-primary" /> Job Description Formatting & Cover Letters
                </h3>
                <p className="text-muted-foreground text-sm">
                  Integrated a custom GroqFormatterService to automatically clean and restructure messy job description inputs into standardized formats. The system then uses this parsed data to generate highly tailored cover letters targeting the exact requirements of the role.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Interactive Mock Interviews
                </h3>
                <p className="text-muted-foreground text-sm">
                  Provides a simulated interview environment utilizing the GroqMockInterviewService. The AI acts as a recruiter, asking highly specific questions based on the user's uploaded CV and the targeted role.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <KanbanSquare className="w-4 h-4 text-primary" /> Live Application Board
                </h3>
                <p className="text-muted-foreground text-sm">
                  A dynamic, drag-and-drop Kanban board powered natively by Livewire 3. Users can visually track their application lifecycle from the initial submission to final offers without ever reloading the page.
                </p>
              </div>
            </div>
          </section>

          {/* Development Process & Architecture */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" /> Development & Architecture
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Running multiple AI tasks (parsing PDFs, generating cover letters, and simulating interviews) simultaneously creates massive server strain. The core challenge was preventing frontend timeouts, managing API rate limits from Groq, and ensuring the UI remained perfectly responsive while the backend processed heavy text generation.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Asynchronous Queue Jobs:</strong> Completely offloaded all heavy AI generation and document parsing to Laravel Redis queues. This guarantees that the user interface never freezes while complex career reports are being written.
                </li>
                <li>
                  <strong>Reactive TALL Stack:</strong> Utilized Alpine.js and Laravel Livewire to construct a Single Page Application (SPA) feel, keeping all core business logic secure on the server while delivering instant visual feedback.
                </li>
                <li>
                  <strong>Prompt Engineering:</strong> Designed heavily constrained instruction sets for the Groq integration to eliminate AI hallucinations, ensuring the generated data and action plans remain strictly factual and actionable.
                </li>
              </ul>
            </div>
          </section>

          {/* Security & Performance */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" /> Security & Performance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Because Grit manages highly sensitive career histories and relies on external API tokens, the infrastructure required enterprise-level protection and caching strategies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Intelligent Caching
                </h4>
                <p className="text-sm text-muted-foreground">
                  Engineered a robust caching layer to store previous AI analyses and match scores. This drastically reduces redundant API calls to Groq, saving token costs and dropping load times to near zero for returning queries.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Strict Rate Limiting
                </h4>
                <p className="text-sm text-muted-foreground">
                  Configured strict Laravel API throttling and rate-limiting middleware to protect the server from DDoS attacks and prevent abuse of the expensive AI generation endpoints.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Content Security Policies
                </h4>
                <p className="text-sm text-muted-foreground">
                  Implemented a custom CSP policy class to strictly define trusted external assets, completely neutralizing Cross-Site Scripting (XSS) and injection vulnerabilities.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Secure Data Vaults
                </h4>
                <p className="text-sm text-muted-foreground">
                  PDF resumes are encrypted and vaulted via Cloudinary integrations, while relational user data is strictly guarded inside the serverless Neon PostgreSQL database.
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
              Building Grit proved my ability to architect a full-scale AI SaaS platform. Mastering Laravel's job queues, enforcing strict API rate limits, and implementing caching layers taught me exactly how to manage computing costs and maintain high performance in a production environment.
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
                  <Badge variant="outline">Livewire 3</Badge>
                  <Badge variant="outline">Alpine.js</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Filament</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend & AI
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Laravel 11</Badge>
                  <Badge variant="outline">PHP 8</Badge>
                  <Badge variant="outline">Groq SDK</Badge>
                  <Badge variant="outline">Laravel Queues</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Infrastructure & Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Neon Postgres</Badge>
                  <Badge variant="outline">Cloudinary</Badge>
                  <Badge variant="outline">Redis Caching</Badge>
                  <Badge variant="outline">Render</Badge>
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
                <span className="font-medium text-foreground">Feb 2026</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground text-right max-w-[140px]">
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
                <span className="font-medium text-foreground">Render</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Version</span>
                <span className="font-medium text-foreground">v1.0.0</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Database</span>
                <span className="font-medium text-foreground">Neon Postgres</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
