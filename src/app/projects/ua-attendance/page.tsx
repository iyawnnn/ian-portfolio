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
  DeviceMobile,
  Globe,
  Layout,
  RocketLaunch as Rocket,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const liveSite = "https://labsign.ua-cit.com/";
const webRepository = "https://github.com/iyawnnn/UA-LabSign";
const mobileRepository = "https://github.com/iyawnnn/UA-LabSign-Mobile";

export default function UAAttendancePage() {
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
        name: "UA LabSign — Laboratory Attendance System",
        item: "https://www.iansebastian.dev/projects/ua-attendance",
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
          <ArrowLeft
            aria-hidden="true"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          />
          All Projects
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            UA LabSign — Laboratory Attendance System
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Zero-Trust Laboratory Attendance Tracking System
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          UA LabSign is a centralized web and mobile laboratory attendance
          system designed to prevent proxy attendance and strengthen record
          integrity. It combines device-bound ECDSA P-256 signatures, instant
          GPS-based geofencing, institutional Google authentication, and
          time-sensitive session PINs to verify identity, an authorized device,
          physical presence, and active class context. Dedicated Student,
          Faculty, and Administrator workflows support live attendance
          monitoring, device recovery and revocation, schedule management,
          reporting, and auditable system activity.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">PostgreSQL</Badge>
          <Badge variant="secondary">Prisma</Badge>
          <Badge variant="secondary">React Native</Badge>
          <Badge variant="secondary">Expo</Badge>
        </div>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          aria-hidden="true"
          tabIndex={-1}
          src="/projects/ua-attendance/ua-attendance-demo.mp4"
          poster="/projects/ua-attendance/ua-attendance-cover.webp"
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
            Open the live platform or inspect the coordinated web/backend and
            mobile applications.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto flex-wrap">
          <Button asChild className="flex-1 md:flex-none font-bold">
            <Link
              href={liveSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" />
              Live Site
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link
              href={webRepository}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github aria-hidden="true" className="mr-2 h-4 w-4" />
              Web Repository
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link
              href={mobileRepository}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github aria-hidden="true" className="mr-2 h-4 w-4" />
              Mobile Repository
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Layout aria-hidden="true" className="w-6 h-6 text-primary" />
              Coordinated Architecture
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Globe aria-hidden="true" className="w-4 h-4 text-primary" />
                  Web Portal & Backend
                </h3>
                <p className="text-muted-foreground text-sm">
                  A Next.js App Router application built with React and
                  TypeScript. Prisma manages the PostgreSQL data model on Neon,
                  while the backend handles authentication, attendance
                  verification, reporting, administrative workflows, and shared
                  student APIs.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <DeviceMobile
                    aria-hidden="true"
                    className="w-4 h-4 text-primary"
                  />
                  Mobile Application
                </h3>
                <p className="text-muted-foreground text-sm">
                  A React Native and Expo client using TypeScript, Expo
                  Location, Expo Secure Store, Google Sign-In, and native
                  cryptographic support. It connects to the shared backend for
                  registration, recovery, device status, attendance check-in,
                  and attendance history.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="w-6 h-6 text-primary"
              />
              Zero-Trust Check-In Flow
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Each attendance submission must pass five independent verification
              gates before it is recorded.
            </p>
            <ol className="divide-y divide-border/50 border-y border-border/50">
              {[
                [
                  "1",
                  "University Identity",
                  "Approved institutional @ua.edu.ph Google account.",
                ],
                [
                  "2",
                  "Authorized Device",
                  "The account must be bound to the currently registered device.",
                ],
                [
                  "3",
                  "Valid ECDSA P-256 Signature",
                  "The backend verifies the signed attendance payload against the registered public key.",
                ],
                [
                  "4",
                  "Physical Presence / Geofence",
                  "Foreground GPS confirms the student is inside the configured campus/laboratory geofence.",
                ],
                [
                  "5",
                  "Active Class Session / PIN",
                  "The laboratory session must be active with a valid, unexpired instructor-generated PIN.",
                ],
              ].map(([step, title, description]) => (
                <li key={step} className="flex gap-4 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {step}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Cpu aria-hidden="true" className="w-6 h-6 text-primary" />
              Security & Operations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Device-Bound Signing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Each client generates an ECDSA P-256 key pair. The private key
                  stays on the authorized device, while the registered public
                  key lets the backend verify each signed attendance payload.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Privacy-Preserving Location Check
                </h4>
                <p className="text-sm text-muted-foreground">
                  GPS is evaluated as a foreground check during the attendance
                  flow. UA LabSign does not require continuous background
                  location tracking.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Recovery & Revocation
                </h4>
                <p className="text-sm text-muted-foreground">
                  Students can recover or transfer an account to a new device,
                  while administrators can revoke a registered device and force
                  reauthorization when needed.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Reports & Auditability
                </h4>
                <p className="text-sm text-muted-foreground">
                  Faculty and administrators can filter attendance records,
                  export structured reports, and review system activity through
                  dedicated audit trails.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase aria-hidden="true" className="w-6 h-6 text-primary" />
              Project Scope
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              UA LabSign replaces fragmented paper-based laboratory attendance
              with coordinated web and mobile workflows designed to support
              hundreds of students, 20+ faculty members, university
              administrators, and multiple academic programs.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 xl:flex xl:flex-col xl:gap-8">
          <Card className="border-border/50 shadow-sm bg-card/50 md:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers aria-hidden="true" className="w-5 h-5 text-primary" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Web Portal & Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Mobile Application
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React Native</Badge>
                  <Badge variant="outline">Expo</Badge>
                  <Badge variant="outline">Expo Location</Badge>
                  <Badge variant="outline">Expo Secure Store</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Data & Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Prisma</Badge>
                  <Badge variant="outline">Neon</Badge>
                  <Badge variant="outline">ECDSA P-256</Badge>
                  <Badge variant="outline">Web Crypto API</Badge>
                  <Badge variant="outline">bcrypt</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe aria-hidden="true" className="w-5 h-5 text-primary" />
                Context
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Type</span>
                <span className="font-medium text-foreground text-right">
                  University System
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Clients</span>
                <span className="font-medium text-foreground text-right">
                  Web + Android
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Scope</span>
                <span className="font-medium text-foreground text-right">
                  Laboratory Attendance
                </span>
              </div>
            </div>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Rocket aria-hidden="true" className="w-5 h-5 text-primary" />
                Deployment
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Web</span>
                <span className="font-medium text-foreground">Vercel</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Database</span>
                <span className="font-medium text-foreground">Neon</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Mobile</span>
                <span className="font-medium text-foreground">
                  Expo / Android
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
