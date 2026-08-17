import { Suspense } from "react";
import Link from "next/link";
import { CodeXml, ArrowRight, FileText, Mail, User, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MovingDots, Radar } from "@/components/ui/animated-backgrounds";
import { GitHubContributionGraph } from "@/components/ui/github-contribution-graph";
import { SpotifyCard } from "@/components/ui/spotify-card";
import { WakaTimeCard } from "@/components/ui/wakatime-card";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Skeleton } from "@/components/ui/skeleton";

import { ScrollRestoration } from "@/components/ui/scroll-restoration";
import { HomeProjectCard } from "@/components/ui/home-project-card";

import { getAllPostsMeta } from "@/lib/mdx";

const HOME_PROJECTS = [
  {
    title: "University of Assumption Laboratory Attendance",
    description:
      "A zero-trust educational platform that eliminates proxy attendance fraud by utilizing strict browser geolocation APIs and Elliptic Curve Digital Signature Algorithm (ECDSA) cryptographic verification.",
    link: "/projects/ua-attendance",
    image: "/projects/ua-attendance/ua-attendance-cover.webp",
    video: "/projects/ua-attendance/ua-attendance-demo.mp4",
    tags: ["Next.js 15", "Aiven MySQL", "ECDSA", "Geolib"],
  },
  {
    title: "AC-CORE (Angeles City Center for Operational Reporting and Engineering)",
    description:
      "A proactive GovTech platform for Angeles City featuring Geospatial Signal Routing (GSR) to predict flooding risks and a Paved Paradox algorithm to prioritize infrastructure repairs.",
    link: "/projects/ac-core",
    image: "/projects/ac-core/accore-cover.webp",
    video: "/projects/ac-core/accore-demo.mp4",
    tags: ["MEAN Stack", "Leaflet.js", "Zoneless", "GeoJSON"],
  },
];

export default function ExplorePage() {
  const wordsLine1 = [
    { text: "Hey," },
    { text: "I’m" },
    { text: "Ian,", className: "text-foreground" },
  ];

  const wordsLine2Desktop = [
    { text: "A", className: "text-muted-foreground" },
    { text: "Full-Stack", className: "text-muted-foreground" },
    { text: "Developer.", className: "text-muted-foreground" },
  ];

  const wordsLine2Mobile = [
    { text: "A", className: "text-muted-foreground" },
    { text: "Full-Stack", className: "text-muted-foreground" },
  ];

  const wordsLine3Mobile = [
    { text: "Developer.", className: "text-muted-foreground" },
  ];

  const latestPosts = getAllPostsMeta()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-8 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      <ScrollRestoration />

      <section className="flex max-w-2xl flex-col gap-2 md:gap-4">
        <h1 className="sr-only">
          Ian Macabulos - Full-Stack Developer Philippines
        </h1>

        <div className="flex flex-col items-start justify-center min-h-[4em] sm:min-h-[2em] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.15]">
          <TypewriterEffectSmooth
            words={wordsLine1}
            className="p-0 m-0"
            cursorClassName="bg-primary"
            duration={1.5}
            hideCursorOnComplete={true}
          />

          <div className="hidden md:block mt-1 lg:mt-2">
            <TypewriterEffectSmooth
              words={wordsLine2Desktop}
              className="p-0"
              cursorClassName="bg-muted-foreground"
              delay={1.5}
              duration={1.5}
            />
          </div>

          <div className="block md:hidden flex flex-col items-start mt-0">
            <TypewriterEffectSmooth
              words={wordsLine2Mobile}
              className="p-0"
              cursorClassName="bg-muted-foreground"
              delay={1.5}
              duration={1.2}
              hideCursorOnComplete={true}
            />
            <TypewriterEffectSmooth
              words={wordsLine3Mobile}
              className="p-0 mt-1"
              cursorClassName="bg-muted-foreground"
              delay={2.7}
              duration={1.2}
            />
          </div>
        </div>

        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          I am a Full-Stack Developer based in the Philippines who builds web
          apps, learns new tech, and occasionally argues with my laptop
          (basically, I spend most of my time debugging my own decisions).
        </p>

        <div className="flex flex-wrap gap-3 mt-2">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-md border border-input bg-secondary/50 shadow-sm transition-all hover:bg-secondary hover:border-foreground/10 active:scale-95"
          >
            <Link href="/about" prefetch={false}>
              <User className="mr-2 h-4 w-4" /> About
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            <Link href="/contact" prefetch={false}>
              <Mail className="mr-2 h-4 w-4" /> Get in Touch
            </Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4 md:gap-6 mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Projects Overview
          </h2>
          <Link
            href="/projects"
            prefetch={false}
            className="flex items-center text-xs font-medium text-muted-foreground transition-colors hover:text-primary sm:text-sm"
          >
            <span className="hidden sm:inline">View all projects</span>
            <span className="sm:hidden">View all</span>
            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 items-start">
          {HOME_PROJECTS.map((project, index) => (
            <HomeProjectCard
              key={project.title}
              project={project}
              preloadImage={index === 0}
            />
          ))}
        </div>
      </section>

      <GitHubContributionGraph />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Suspense fallback={<Skeleton className="h-[160px] w-full rounded-xl bg-card border border-border/50 shadow-sm" />}>
          <SpotifyCard />
        </Suspense>
        
        <Suspense fallback={<Skeleton className="h-[160px] w-full rounded-xl bg-card border border-border/50 shadow-sm" />}>
          <WakaTimeCard />
        </Suspense>
      </section>

      <section className="w-full">
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md min-h-[300px]">
          
          <div className="relative flex flex-col justify-center p-8 lg:p-10 lg:w-2/5 overflow-hidden">
            <div className="relative z-10 flex flex-col max-w-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-3">
                Localhost Tales
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Deep dives into modern full-stack architecture, system optimization, and the realities of production-grade software.
              </p>
              <Button
                asChild
                variant="default"
                className="w-fit rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95"
              >
                <Link href="/blog" prefetch={false}>View All Articles</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:w-3/5 border-t lg:border-t-0 lg:border-l border-border/50 divide-y divide-border/50 bg-secondary/10">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="group flex flex-1 items-center justify-between p-6 lg:px-8 lg:py-0 transition-colors hover:bg-muted/40 active:bg-muted/60 min-h-[80px]"
              >
                <div className="flex flex-col gap-1.5 pr-4 py-4 lg:py-6">
                  <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                    {formatDate(post.date)}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:-rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden flex flex-col justify-between rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md">
          <div className="absolute inset-0 z-0 hidden md:block">
            <MovingDots />
          </div>
          <CardHeader className="relative z-10">
            <CodeXml className="h-8 w-8 text-primary mb-2 sm:h-10 sm:w-10" />
            <CardTitle className="text-lg sm:text-xl">Stack</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              The tech behind my projects.
            </CardDescription>
          </CardHeader>
          <CardFooter className="relative z-10 mt-8 md:mt-0">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full rounded-md border-input bg-background/50 backdrop-blur-sm shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95 md:w-auto md:h-10 md:px-4 md:py-2"
            >
              <Link href="/stack" prefetch={false}>View Stack</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden flex flex-col justify-between rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md">
          <div className="absolute inset-0 z-0 hidden md:block">
            <Radar />
          </div>
          <CardHeader className="relative z-10">
            <FileText className="h-8 w-8 text-primary mb-2 sm:h-10 sm:w-10" />
            <CardTitle className="text-lg sm:text-xl">Resume</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              My professional journey and qualifications.
            </CardDescription>
          </CardHeader>
          <CardFooter className="relative z-10 mt-8 md:mt-0">
            <Button
              asChild
              variant="default"
              size="sm"
              className="w-full rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95 md:w-auto md:h-10 md:px-4 md:py-2"
            >
              <Link href="/resume" prefetch={false}>View Resume</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
