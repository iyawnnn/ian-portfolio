"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  MapPin,
  ArrowRight,
  Target,
  Lightbulb,
  ArrowClockwise as RefreshCw,
  Clock,
  MagnifyingGlass as SearchCheck,
  Code as Code2,
  RocketLaunch as Rocket,
  MusicNote as Music,
  AirplaneTilt as Plane,
  Monitor,
  Lightning as Zap,
} from "@phosphor-icons/react/ssr";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function AboutPage() {
  const paragraph1 = `I’m a 4th-year Information Technology student at Holy Angel University, specializing in Web Development. I’m more of a web app guy. I enjoy turning ideas into actual systems people can use, not just pages that look nice and call it a day.`;

  const paragraph2 = `Most of what I know came from building, breaking, debugging, and rebuilding real projects. I like exploring modern tools, figuring out how things work beyond the classroom, and slowly becoming the kind of developer who can take an idea and turn it into something reliable and useful.`;

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {/* --- HERO SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Based in Philippines</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-[650] tracking-[-0.025em] lg:text-6xl text-foreground leading-[1.05]">
            About Me
          </h1>

          {/* Hero Section Intro */}
          <div className="space-y-4">
            <div className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              <TextGenerateEffect
                words={paragraph1}
                className="text-muted-foreground font-normal"
              />
            </div>
            <div className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              <TextGenerateEffect
                words={paragraph2}
                className="text-muted-foreground font-normal"
                delay={3.6}
              />
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="shrink-0 mx-auto md:mx-0">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl border border-border shadow-md sm:h-56 sm:w-56 md:h-64 md:w-64">
            <Image
              src="/about/ian-macabulos-2026.webp"
              alt="Ian Macabulos"
              fill
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
              quality={95}
              priority
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* --- GRID SECTIONS --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <Card className="h-full bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Career Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <Rocket className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Opportunities:</strong> Open to full-time opportunities, freelance projects, and teams where I can contribute to building real products.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Code2 className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Growth:</strong> I want to keep growing through challenging projects, stronger codebases, collaboration, and learning from experienced developers.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Monitor className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Impact:</strong> I want to build useful software that solves real problems, works reliably, and makes things easier for the people using it.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Brain className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Soft Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <SearchCheck className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Attention to Detail:</strong> I pay attention to the small things, from UI spacing and inconsistent behavior to edge cases that can affect the overall experience.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Time Management:</strong> I organize work into clear priorities and milestones so projects keep moving without rushing the parts that need more attention.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Adaptability:</strong> I am comfortable learning new tools, adjusting to changing requirements, and figuring things out when a project takes an unexpected turn.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lightbulb className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <Zap className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Web Applications:</strong> I enjoy building full-stack web applications and learning how to design complete systems beyond just the frontend.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Brain className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>AI-Assisted Development:</strong> I am exploring how AI can improve development workflows, help solve problems faster, and support smarter features inside applications.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Monitor className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Performance:</strong> I am always looking for ways to make applications faster, smoother, and more efficient while keeping the codebase maintainable.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Hobbies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Reading:</strong> I enjoy self-improvement and productivity books that help me improve my focus, habits, mindset, and approach to work.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Music className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Music:</strong> I usually have music playing while I code, relax after a long day, or pretend that one last bug can wait until tomorrow.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Plane className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Travel:</strong> I enjoy exploring new places, trying different food, and somehow always finding a coffee shop with decent Wi-Fi.
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* --- CALL TO ACTION --- */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-8 text-center shadow-sm md:p-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden [contain:paint]"
        >
          {/* Desktop clusters */}
          <svg
            viewBox="0 0 1000 260"
            preserveAspectRatio="none"
            className="about-cta-lines about-cta-lines-desktop-top absolute -left-[10%] -top-[22%] hidden h-[88%] w-[120%] overflow-visible text-foreground sm:block"
          >
            <path d="M-90 238 C 135 188, 260 8, 475 58 C 690 108, 815 22, 1090 -22" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.13" />
            <path d="M-95 258 C 130 202, 285 34, 492 76 C 712 121, 850 30, 1095 -8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.28" />
            <path d="M-100 276 C 120 226, 298 60, 510 97 C 735 136, 875 47, 1100 15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.19" />
            <path d="M-105 292 C 112 252, 320 92, 540 119 C 765 146, 900 70, 1105 42" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.1" />
          </svg>

          <svg
            viewBox="0 0 1000 250"
            preserveAspectRatio="none"
            className="about-cta-lines about-cta-lines-desktop-bottom absolute -left-[12%] -bottom-[28%] hidden h-[84%] w-[124%] overflow-visible text-foreground sm:block"
          >
            <path d="M-100 238 C 110 278, 250 86, 455 136 C 665 188, 820 54, 1110 92" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
            <path d="M-105 258 C 105 294, 270 112, 474 158 C 688 207, 850 77, 1115 116" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.25" />
            <path d="M-110 276 C 98 310, 292 143, 500 181 C 718 221, 878 108, 1120 142" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.16" />
          </svg>

          {/* Mobile clusters */}
          <svg
            viewBox="0 0 430 120"
            preserveAspectRatio="none"
            className="about-cta-lines about-cta-lines-mobile-top absolute -left-[16%] -top-[12%] h-[38%] w-[132%] overflow-visible text-foreground sm:hidden"
          >
            <path d="M-55 18 C 42 8, 96 82, 178 91 C 272 102, 346 34, 495 65" fill="none" stroke="currentColor" strokeWidth="0.85" opacity="0.15" />
            <path d="M-58 33 C 38 19, 104 96, 190 105 C 286 115, 362 48, 498 79" fill="none" stroke="currentColor" strokeWidth="1.35" opacity="0.23" />
            <path d="M-61 48 C 31 31, 112 111, 204 116 C 305 122, 379 66, 501 94" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.11" />
          </svg>

          <svg
            viewBox="0 0 430 105"
            preserveAspectRatio="none"
            className="about-cta-lines about-cta-lines-mobile-bottom absolute -bottom-[12%] -left-[18%] h-[38%] w-[136%] overflow-visible text-foreground sm:hidden"
          >
            <path d="M-65 102 C 38 122, 94 38, 184 30 C 278 21, 352 92, 505 54" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.14" />
            <path d="M-68 118 C 34 137, 105 55, 198 45 C 298 34, 376 108, 508 70" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.22" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Rocket className="h-6 w-6" />
          </div>

          <h2 className="text-2xl font-semibold tracking-[-0.015em] text-foreground sm:text-3xl">
            Let&rsquo;s build something awesome
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-base">
            Have an idea, a <strong>freelance project</strong> that needs another
            developer, or a <strong>team I could contribute to</strong>? I&rsquo;m
            always open to <strong>good opportunities</strong>, interesting
            problems, and building something worth shipping.
          </p>

          <div className="mt-10 flex justify-center">
            <Link href="/contact">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="flex cursor-pointer items-center space-x-2 bg-black px-8 py-4 font-semibold text-white transition-all hover:scale-105 active:scale-95"
              >
                <span>Work with me</span>
                <ArrowRight className="h-5 w-5" />
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}