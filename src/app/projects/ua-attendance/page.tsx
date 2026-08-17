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
  MapPin,
  ShieldCheck,
  Key,
  Users,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        name: "University of Assumption Laboratory Attendance System",
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
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All Projects
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            University of Assumption Laboratory Attendance System
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Highly Secure Geolocation and Cryptographic Tracking Platform
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          This platform modernizes student tracking by replacing traditional paper logs with a zero-trust digital architecture. Designed as a freelance solution for the university, it eliminates proxy attendance fraud by utilizing strict browser geolocation APIs, time-sensitive session pins, and ECDSA cryptographic signatures. The system features isolated workflows for administrators, faculty members, and students using a strict Role-Based Access Control (RBAC) model.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Next.js 15</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Prisma ORM</Badge>
          <Badge variant="secondary">MySQL (Aiven)</Badge>
          <Badge variant="secondary">ECDSA</Badge>
          <Badge variant="secondary">RBAC</Badge>
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
            Explore the live production application or review the strict cryptographic access control protocols on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-bold">
            <Link href="https://ua-lab-attendance.vercel.app/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Platform
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/ua-laboratory-attendance" target="_blank">
              <Github className="mr-2 h-4 w-4" /> Source Code
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Layout className="w-6 h-6 text-primary" /> Core Authentication Features
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Geofence Verification
                </h3>
                <p className="text-muted-foreground text-sm">
                  The system calculates the exact physical distance between the student device and the laboratory coordinates using Geolib. It automatically blocks attendance attempts if the user is outside the strictly permitted radius.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" /> Dynamic OTP Sessions
                </h3>
                <p className="text-muted-foreground text-sm">
                  Teachers generate unique, time-expiring PIN codes for each class session. This forces students to be physically present in the room to view the projector and acquire the code before it expires.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Role-Based Access Control (RBAC)
                </h3>
                <p className="text-muted-foreground text-sm">
                  Features highly isolated interfaces. Administrators manage device registrations and global schedules, teachers monitor live attendance, and students interact exclusively with the secure check-in portal.
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
                The primary difficulty was eliminating proxy attendance entirely. Students frequently shared passcodes via messaging applications. The system required a method to mathematically prove the student was physically inside the designated laboratory room, during the exact start time of the class, using an authorized device.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Multi-Factor Verification:</strong> Combined coordinate-based geofencing with short-lived access pins and cryptographic signatures. A student must satisfy the location requirement, the time constraint, and the device verification simultaneously to generate a valid attendance log.
                </li>
                <li>
                  <strong>Client-Side Caching:</strong> Implemented IndexedDB to securely cache student credentials locally. This ensures fast check-ins without repetitive database querying for static user data.
                </li>
                <li>
                  <strong>Server Action Optimization:</strong> Utilized Next.js Server Actions to handle sensitive coordinate and signature validation entirely on the backend. This prevents technically adept students from spoofing their location via client-side manipulation.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> Security & Infrastructure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Because this platform handles official university records, strict data validation and rapid execution speeds were central to the architecture. The application is built upon a foundation of mathematical proof rather than simple conditional logic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-primary" /> ECDSA Signatures
                </h4>
                <p className="text-sm text-muted-foreground">
                  Integrated the Elliptic Curve Digital Signature Algorithm (ECDSA) to cryptographically sign every attendance submission. This mathematical proof guarantees that network payloads cannot be spoofed, reused, or intercepted in transit.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Aiven MySQL Integrity
                </h4>
                <p className="text-sm text-muted-foreground">
                  Constructed a deeply relational Prisma schema hosted on a secure Aiven MySQL instance. Compound unique constraints guarantee that a single student can never log multiple attendance records for the same laboratory schedule.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4 md:col-span-2">
                <h4 className="font-semibold text-foreground mb-2">
                  Bcrypt Credential Hashing
                </h4>
                <p className="text-sm text-muted-foreground">
                  All administrative and teacher credentials are mathematically salted and hashed using bcrypt prior to database insertion. This mitigates unauthorized system access and protects institutional data from brute-force vulnerabilities.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Developing this laboratory system as a freelance solution reinforced the importance of building zero-trust architectures in educational environments. Successfully combining modern web APIs like Geolocation with robust backend cryptographic validation resulted in a highly reliable institutional tool that solves a persistent administrative problem.
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
                  <Badge variant="outline">Next.js 15</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend & Logic
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Server Actions</Badge>
                  <Badge variant="outline">Geolib</Badge>
                  <Badge variant="outline">IndexedDB</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Database & Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">MySQL (Aiven)</Badge>
                  <Badge variant="outline">Prisma ORM</Badge>
                  <Badge variant="outline">ECDSA / ECC</Badge>
                  <Badge variant="outline">BcryptJS</Badge>
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
                  Freelance System
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Timeline</span>
                <span className="font-medium text-foreground">Apr 2026</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground text-right max-w-[140px]">
                  Full-Stack Developer
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
                <span>Application</span>
                <span className="font-medium text-foreground">Vercel</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Database</span>
                <span className="font-medium text-foreground">Aiven Platform</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>ORM Layer</span>
                <span className="font-medium text-foreground">Prisma Client</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
