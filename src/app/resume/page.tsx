"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Medal as Award,
  MapPin,
  Envelope as Mail,
  User,
  Eye,
  ArrowUpRight,
} from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const CERTIFICATIONS = [
  {
    name: "AWS Academy Graduate - Cloud Foundations",
    org: "Amazon Web Services",
    icon: "/icons/aws.webp",
    imageClass: "p-2",
    date: "Apr 2026",
    link: "https://www.credly.com/badges/96846437-3bb4-48cd-95f2-a9b4540fb83e/public_url",
  },
  {
    name: "Back End Development and APIs",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Sep 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/back-end-development-and-apis",
  },
  {
    name: "CompTIA IT Fundamentals+ (ITF+)",
    org: "CompTIA",
    icon: "/icons/comptia-white.webp",
    imageClass: "",
    date: "Nov 2023",
    link: "https://www.credly.com/badges/82755364-a4a7-4272-a446-2d7d07662f48/linked_in_profile",
  },
  {
    name: "Legacy JavaScript Algorithms and Data Structures",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Mar 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/javascript-algorithms-and-data-structures",
  },
  {
    name: "Responsive Web Design",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Sep 2024",
    link: "https://www.freecodecamp.org/certification/iyawn/responsive-web-design",
  },
];

export default function ResumePage() {
  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-8 border-b border-border/40 pb-8 text-center md:text-left w-full"
      >
        <div className="flex flex-col items-center md:items-start space-y-4 w-full md:w-auto">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl">
              Ian Macabulos
            </h1>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 text-sm text-muted-foreground/80">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              <span>CSFP, Pampanga</span>
            </div>
            <div className="hidden sm:block text-border">|</div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-primary" />
              <span>iannmacabulos@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full md:w-auto shrink-0 mt-2 md:mt-0">
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-background text-foreground flex items-center space-x-2 px-6 py-3 font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <Eye className="h-4 w-4" />
              <span>View Resume</span>
            </HoverBorderGradient>
          </Link>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-border/40 mb-2">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Career Objective</h2>
        </div>
        
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
          Full-Stack Developer and Information Technology student with hands-on experience building web applications, backend services, and production-ready systems using modern technologies. Experienced across frontend and backend development, database design, API development, testing, deployment, and AI-assisted workflows. Open to entry-level software development roles and freelance opportunities where I can contribute to practical, reliable, and user-focused digital products.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-b border-border/40">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Professional Experience</h2>
        </div>

        <div className="relative border-l-2 border-border/50 ml-3 md:ml-4 space-y-9 md:space-y-10 pl-8 md:pl-10 py-2">
          
          <div className="relative">
            <span className="absolute -left-[41px] md:-left-[49px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Backend AI Engineer Intern
              </h3>
            </div>

            <div className="text-sm font-medium text-primary mb-3">
              FlyRank AI
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px] py-0 h-5">TypeScript</Badge>
              <Badge variant="outline" className="text-[10px] py-0 h-5">Fastify</Badge>
              <Badge variant="outline" className="text-[10px] py-0 h-5">PostgreSQL</Badge>
              <Badge variant="outline" className="text-[10px] py-0 h-5">Prisma</Badge>
              <Badge variant="outline" className="text-[10px] py-0 h-5">Stripe</Badge>
              <Badge variant="outline" className="text-[10px] py-0 h-5">Zod</Badge>
              <Badge variant="outline" className="text-[10px] py-0 h-5">Vitest</Badge>
            </div>

            <ul className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  Engineered a TypeScript/Fastify usage metering and billing service for LLM applications, implementing tenant quotas, token tracking, idempotent requests, and micro-cent usage pricing with PostgreSQL.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  Integrated Stripe test-mode billing and webhook processing, with automated tests covering quota enforcement, usage accounting, checkout flows, and billing events.
                </span>
              </li>
            </ul>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] md:-left-[49px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Web Developer Intern
              </h3>
            </div>

            <div className="text-sm font-medium text-primary mb-3">
              Sortr
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px] py-0 h-5">WordPress</Badge>
            </div>

            <ul className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  Redesigned and optimized WordPress production pages, improving responsive layouts, content structure, technical SEO, image delivery, and overall frontend performance.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  Built an internal IT service desk ticketing system that centralized hardware and software issue reporting, automated ticket routing and status tracking, and gave the IT team a structured workflow for managing support incidents from submission to resolution.
                </span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <span className="absolute -left-[41px] md:-left-[49px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Freelance Full-Stack Developer
              </h3>
            </div>

            <div className="text-sm font-medium text-primary mb-3">
              Independent Consultant
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className="text-[10px] py-0 h-5">Next.js</Badge>
                <Badge variant="outline" className="text-[10px] py-0 h-5">React</Badge>
                <Badge variant="outline" className="text-[10px] py-0 h-5">TypeScript</Badge>
                <Badge variant="outline" className="text-[10px] py-0 h-5">Node.js</Badge>
                <Badge variant="outline" className="text-[10px] py-0 h-5">PostgreSQL</Badge>
                <Badge variant="outline" className="text-[10px] py-0 h-5">MongoDB</Badge>
            </div>

            <ul className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  Built and deployed custom full-stack systems for local businesses and institutional clients, replacing manual workflows with web applications for operations, reporting, attendance, and data management.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  Delivered projects across React/Next.js, Node.js, PostgreSQL, MongoDB, and cloud platforms, handling application architecture, database design, authentication, testing, deployment, and client handoff.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-b border-border/40">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Education</h2>
        </div>

        <div className="space-y-6">
          <div className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">
                  Holy Angel University
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Bachelor of Science in Information Technology
                </p>
              </div>
              <Badge variant="secondary" className="w-fit h-fit py-1">
                2023 - Present
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                Major in Web Development
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-primary" />
                <span>
                  Consistent Dean&apos;s and President&apos;s Lister, A.Y. 2023 to 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-b border-border/40">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <a
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md flex items-center gap-4"
            >
              <div className="h-12 w-12 shrink-0 relative bg-neutral-950 rounded-lg border border-border/50 overflow-hidden flex items-center justify-center shadow-inner">
                <Image
                  src={cert.icon}
                  alt={cert.org}
                  fill
                  className={`object-contain transition-transform duration-300 group-hover:scale-110 ${cert.imageClass}`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {cert.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                  <span>{cert.org}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{cert.date}</span>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
