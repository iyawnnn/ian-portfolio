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
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ClimaPHPage() {
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
        name: "ClimaPH",
        item: "https://www.iansebastian.dev/projects/climaph",
      },
    ],
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
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
      
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            ClimaPH
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Comprehensive Weather Forecasting System for the Philippines
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          ClimaPH is a high-performance meteorological application built on the modern Next.js App Router ecosystem. Designed specifically for the Philippines, it delivers real-time weather monitoring, interactive MapLibre visualization layers, and highly accurate local forecasts. The platform is engineered with a strict focus on API security, type safety, and robust state management to ensure reliable data delivery.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Next.js 16</Badge>
          <Badge variant="secondary">Tailwind CSS v4</Badge>
          <Badge variant="secondary">Zustand</Badge>
          <Badge variant="secondary">MapLibre GL</Badge>
        </div>
      </div>
      
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/climaph/climaph-demo.mp4"
          poster="/projects/climaph/climaph-cover.webp"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="rounded-xl border border-border/50 bg-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Project Links</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Explore the live application or review the codebase on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-bold">
            <Link href="https://climaph.iansebastian.dev/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/ClimaPH" target="_blank">
              <Github className="mr-2 h-4 w-4" /> Source Code
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Layout className="w-6 h-6 text-primary" /> Core Features
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Interactive Mapping
                </h3>
                <p className="text-muted-foreground text-sm">
                  Integrated MapLibre GL and React Map GL to visualize dynamic meteorological layers, including temperature, cloud coverage, and wind patterns across the country.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Localized Forecasting
                </h3>
                <p className="text-muted-foreground text-sm">
                  Provides accurate 3-day weather predictions and detailed daily temperature tracking, breaking down conditions across morning, afternoon, evening, and night segments.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Location Management
                </h3>
                <p className="text-muted-foreground text-sm">
                  Features automatic geolocation, real-time city search, recent search history tracking, and a persistent favorite locations list.
                </p>
              </div>
            </div>
          </section>

          
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" /> Architecture & Implementation
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                The application required managing complex client state for mapping and user preferences while ensuring strict security protocols. Exposing external API credentials to the client browser was a critical vulnerability that needed to be addressed without compromising performance.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>State & Fetching:</strong> Implemented Zustand for streamlined global state management and SWR for reactive data synchronization across components.
                </li>
                <li>
                  <strong>Strict Environment Validation:</strong> Utilized @t3-oss/env-nextjs combined with Zod to enforce type-safe runtime validation of environment variables, ensuring server credentials never leak to the client.
                </li>
                <li>
                  <strong>API Obfuscation:</strong> Constructed secure Next.js Route Handlers to proxy all requests to OpenWeatherMap and OpenCage Data. These endpoints include sanitized error handling to prevent detailed stack traces from reaching the browser.
                </li>
              </ul>
            </div>
          </section>

          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> Security & Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This project demonstrates a rigorous approach to full-stack security and dynamic configuration. By isolating external dependencies behind proxy routes and validating configurations at runtime, the application is highly portable and resilient. It can be safely deployed in any environment while protecting service quotas.
            </p>
          </section>
        </div>

        
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 xl:flex xl:flex-col xl:gap-8">
          
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
                  <Badge variant="outline">Next.js 16</Badge>
                  <Badge variant="outline">React 19</Badge>
                  <Badge variant="outline">Tailwind v4</Badge>
                  <Badge variant="outline">Zustand</Badge>
                  <Badge variant="outline">SWR</Badge>
                  <Badge variant="outline">MapLibre GL</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend & Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Route Handlers</Badge>
                  <Badge variant="outline">Zod Validation</Badge>
                  <Badge variant="outline">env-nextjs</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  APIs
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">OpenWeatherMap</Badge>
                  <Badge variant="outline">OpenCage Data</Badge>
                </div>
              </div>
            </div>
          </Card>

          
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
                <span className="font-medium text-foreground">Aug 2025</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground">
                  Full Stack Developer
                </span>
              </div>
            </div>
          </Card>

          
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
                <span>Architecture</span>
                <span className="font-medium text-foreground">App Router</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
