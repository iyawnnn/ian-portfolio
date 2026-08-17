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
  Bot,
  Code,
  TestTube,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function KodaSyncPage() {
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
        name: "KodaSync",
        item: "https://www.iansebastian.dev/projects/kodasync",
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
            KodaSync
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Neural Code & Knowledge Engine
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          KodaSync is a professional intelligence hub designed to centralize
          technical knowledge for software engineers. It solves the "lost
          context" problem in modern development by utilizing high-dimensional
          vector embeddings to understand the underlying intent of your code. It
          combines a high-performance <strong>Monaco Editor</strong> with
          contextual AI agents to transform scattered snippets into a
          searchable, neural knowledge base.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Next.js 15</Badge>
          <Badge variant="secondary">FastAPI</Badge>
          <Badge variant="secondary">Groq SDK</Badge>
          <Badge variant="secondary">pgvector</Badge>
          <Badge variant="secondary">Docker</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/kodasync/kodasync-demo.mp4"
          poster="/projects/kodasync/kodasync-cover.webp"
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
            Experience the neural research assistant live or inspect the
            architecture on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-bold">
            <Link href="https://kodasync.iansebastian.dev/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/KodaSync" target="_blank">
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
                  <Bot className="w-4 h-4 text-primary" /> Neural Chat Interface
                </h3>
                <p className="text-muted-foreground text-sm">
                  An AI workspace using{" "}
                  <strong>Retrieval Augmented Generation (RAG)</strong> to
                  provide project-specific answers. It automatically retrieves
                  relevant notes from your library to provide context-aware
                  solutions.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" /> The Studio
                </h3>
                <p className="text-muted-foreground text-sm">
                  A full-featured code editor built with the{" "}
                  <strong>Monaco Editor</strong> engine (VS Code core). It
                  includes AI actions to Scan Security, Generate Tests, and
                  Document code instantly.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" /> Semantic Knowledge
                  Engine
                </h3>
                <p className="text-muted-foreground text-sm">
                  Uses <strong>FastEmbed</strong> (384-dimension vectors) to
                  enable natural language search. Includes a Knowledge Scraper
                  to import technical documentation directly from URLs.
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
                The main challenge was orchestrating the "Hybrid Architecture"
                between a modern Next.js frontend and a high-performance Python
                backend. I needed to ensure that heavy vector processing and AI
                inference didn't block the UI, while maintaining a real-time
                editing experience in the Monaco Editor.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Async-First Backend:</strong> Built the API with
                  FastAPI and <strong>SlowAPI</strong> rate limiting to handle
                  high concurrency.
                </li>
                <li>
                  <strong>Neural Search:</strong> Implemented{" "}
                  <strong>pgvector</strong> for efficient vector storage and
                  retrieval, allowing the AI to "remember" project-specific
                  context.
                </li>
                <li>
                  <strong>Background Tasking:</strong> Offloaded tag generation
                  and embedding calculations to background threads, keeping the
                  UI responsive during complex data ingestion.
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
              To ensure the neural engine remains reliable, I implemented a
              comprehensive testing strategy that validates both the API logic
              and the AI's streaming capabilities:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Integration Testing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Using <strong>Pytest</strong> and <strong>TestClient</strong>,
                  I wrote tests covering auth flows, vector search, and RAG
                  logic. I specifically mocked AI streams to validate chat
                  responses without calling expensive external APIs.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  CI/CD Pipeline
                </h4>
                <p className="text-sm text-muted-foreground">
                  A robust <strong>GitHub Actions</strong> workflow that spins
                  up ephemeral Docker containers for{" "}
                  <strong>PostgreSQL (pgvector)</strong> and{" "}
                  <strong>Redis</strong>. This ensures the full integration
                  suite runs successfully on every push before deployment.
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
              KodaSync pushed my boundaries in Full-Stack Engineering,
              specifically in bridging the gap between application logic and AI
              infrastructure. Mastering <strong>Docker</strong> for
              containerization and implementing a real-time <strong>RAG</strong>{" "}
              pipeline gave me the tools to build production-grade AI
              applications.
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
                  <Badge variant="outline">Monaco Editor</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Shadcn UI</Badge>
                  <Badge variant="outline">Axios</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend & AI
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">FastAPI</Badge>
                  <Badge variant="outline">Groq SDK</Badge>
                  <Badge variant="outline">Llama 3</Badge>
                  <Badge variant="outline">SQLModel</Badge>
                  <Badge variant="outline">FastEmbed</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Infrastructure
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="outline">GitHub Actions</Badge>
                  <Badge variant="outline">Supabase</Badge>
                  <Badge variant="outline">Upstash Redis</Badge>
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
                <span className="font-medium text-foreground">Jan 2026</span>
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
                <span className="font-medium text-foreground">Supabase</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Redis</span>
                <span className="font-medium text-foreground">Upstash</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
