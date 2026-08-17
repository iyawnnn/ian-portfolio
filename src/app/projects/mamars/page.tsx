"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  Layers,
  Briefcase,
  Cpu,
  Globe,
  Layout,
  Rocket,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MamaRsPage() {
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
        name: "Mama R's Bakery",
        item: "https://www.iansebastian.dev/projects/mamars",
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
            Mama R's
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Inventory & Sales Operations Dashboard
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          Mama R's is a custom business administration tool engineered with the MERN stack. It was designed to help a local bakery transition from manual paper logs to a secure digital environment. The system allows the business owner to log orders, print physical receipts, monitor real-time stock levels, record operational expenses, and execute end-of-day cash reconciliation from a web browser.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">MongoDB</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
        </div>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/mamars/mamars-demo.mp4"
          poster="/projects/mamars/mamars-cover.webp"
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
            The live application operates strictly as a secured client portal for internal business use only. You can review the complete source code on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            disabled
            variant="secondary"
            className="flex-1 md:flex-none font-bold opacity-80 cursor-not-allowed"
          >
            <Lock className="mr-2 h-4 w-4" /> Client Portal
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/mamar-s" target="_blank">
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
                  Order Processing & Receipts
                </h3>
                <p className="text-muted-foreground text-sm">
                  Features a streamlined order entry sheet for rapid logging during business hours. The system automatically calculates totals and can generate formatted, printable receipts for customers.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Granular Stock Management
                </h3>
                <p className="text-muted-foreground text-sm">
                  Maintains a digital product catalog with real-time stock tracking. It actively warns the user with low-stock alerts, provides a restock modal for easy updates, and keeps an immutable stock history log to track all inventory movements over time.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Financial Dashboard & Reconciliation
                </h3>
                <p className="text-muted-foreground text-sm">
                  Visualizes sales data through category pie charts and monthly metrics. It includes a dedicated expense manager and an end-of-day reconciliation tool to ensure the digital database matches the physical cash register.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" /> Development Process
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                The initial application was built to simply log sales. However, the business requirements expanded rapidly to include expense tracking, printable receipts, and strict inventory logs. Managing complex financial states and preventing runtime errors required a more robust architecture.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>TypeScript Integration:</strong> Migrated the entire codebase to TypeScript. This introduced strict type definitions for orders, expenses, and stock logs, ensuring data integrity across the application.
                </li>
                <li>
                  <strong>Frontend Optimization:</strong> Rebuilt the user interface utilizing Vite and React. This update provided the high performance necessary for rapid order entry, while Tailwind CSS and Shadcn UI delivered a clean, professional aesthetic.
                </li>
                <li>
                  <strong>Modular API Architecture:</strong> Engineered a scalable Node and Express backend. The application features distinct API routes for authentication, dashboard metrics, expenses, and stock logs to keep data flow organized and secure.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This project provided extensive experience in translating evolving business needs into technical features. Implementing reconciliation tools and stock history logs taught me how to handle sensitive financial data and maintain accurate state across a full-stack application.
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
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Vite</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Shadcn UI</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Express.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Secure Authentication</Badge>
                  <Badge variant="outline">REST API</Badge>
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
                  Freelance Project
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Timeline</span>
                <span className="font-medium text-foreground">Apr 2025</span>
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
                <span>Frontend</span>
                <span className="font-medium text-foreground">Netlify</span>
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
