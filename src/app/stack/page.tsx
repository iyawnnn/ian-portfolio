"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, RotateCcw, TestTube, ChevronLeft, ChevronRight } from "lucide-react";
import {
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiBootstrap,
  SiPython,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiVercel,
  SiPostman,
  SiFigma,
  SiGithub,
  SiGit,
  SiDart,
  SiFlutter,
  SiNetlify,
  SiAmazon,
  SiWordpress,
  SiNestjs,
  SiPostgresql,
  SiVitest,
  SiGithubactions,
  SiPytest, 
  SiFastapi,
  SiLaravel,
  SiRender,
  SiSqlite,
  SiExpo,
  SiRust
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ToolIcon = React.ComponentType<{
  className?: string;
  "aria-label"?: string;
}>;

interface Tool {
  name: string;
  description: string;
  icon: ToolIcon;
  tags: string[];
}

interface ToolCategory {
  category: string;
  items: Tool[];
}

function ToolLogo({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <Icon
      className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
      aria-label={tool.name + " logo"}
    />
  );
}

const toolsData: ToolCategory[] = [
  {
    category: "Frontend Development",
    items: [
      {
        name: "Next.js 15",
        description: "The React Framework for the Web.",
        icon: SiNextdotjs,
        tags: ["React", "SSR", "RSC"],
      },
      {
        name: "React",
        description: "Library for building user interfaces.",
        icon: SiReact,
        tags: ["UI", "Components"],
      },
      {
        name: "TypeScript",
        description: "Strongly typed superset of JavaScript.",
        icon: SiTypescript,
        tags: ["Language", "Type Safety"],
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid UI.",
        icon: SiTailwindcss,
        tags: ["CSS", "Styling"],
      },
      {
        name: "Vue.js",
        description: "The Progressive JavaScript Framework.",
        icon: SiVuedotjs,
        tags: ["Framework", "UI"],
      },
      {
        name: "Angular",
        description: "Platform for building scalable web apps.",
        icon: SiAngular,
        tags: ["Framework", "Google"],
      },
      {
        name: "Bootstrap",
        description: "Feature-packed frontend toolkit.",
        icon: SiBootstrap,
        tags: ["CSS", "Framework"],
      },
    ],
  },
  {
    category: "Backend Development",
    items: [
      {
        name: "Node.js",
        description: "JavaScript runtime on Chrome's V8 engine.",
        icon: SiNodedotjs,
        tags: ["Runtime", "Backend"],
      },
      {
        name: "Laravel",
        description: "The PHP Framework for Web Artisans.",
        icon: SiLaravel,
        tags: ["Framework", "PHP"],
      },
      {
        name: "Express.js",
        description: "Fast, minimalist web framework.",
        icon: SiExpress,
        tags: ["Framework", "API"],
      },
      {
        name: "FastAPI",
        description: "High-performance Python API framework.",
        icon: SiFastapi,
        tags: ["Python", "API"],
      },
      {
        name: "NestJS",
        description: "A progressive Node.js framework for scalable server-side applications.",
        icon: SiNestjs,
        tags: ["Framework", "Node.js"],
      },
      {
        name: "Python",
        description: "Versatile language for rapid development.",
        icon: SiPython,
        tags: ["Language", "Data"],
      },
      {
        name: "Java",
        description: "Robust, object-oriented language.",
        icon: FaJava,
        tags: ["Language", "OOP"],
      },
      {
        name: "PHP",
        description: "Popular server-side scripting language.",
        icon: SiPhp,
        tags: ["Language", "Server-side"],
      },
      {
        name: "Rust",
        description: "Systems language focused on speed and safety.",
        icon: SiRust,
        tags: ["Language", "Systems"],
      },
    ],
  },
  {
    category: "Databases",
    items: [
      {
        name: "PostgreSQL",
        description: "Advanced open source relational database.",
        icon: SiPostgresql,
        tags: ["Database", "SQL"],
      },
      {
        name: "MongoDB",
        description: "Modern application data platform.",
        icon: SiMongodb,
        tags: ["Database", "NoSQL"],
      },
      {
        name: "MySQL",
        description: "World's most popular open source DB.",
        icon: SiMysql,
        tags: ["Database", "SQL"],
      },
      {
        name: "SQLite",
        description: "Small, fast, self-contained SQL database engine.",
        icon: SiSqlite,
        tags: ["Database", "SQL"],
      },
    ],
  },
  {
    category: "Testing & QA",
    items: [
      {
        name: "Vitest",
        description: "Blazing fast Vite-native unit testing.",
        icon: SiVitest,
        tags: ["Testing", "Unit"],
      },
      {
        name: "Pytest",
        description: "Mature full-featured Python testing tool.",
        icon: SiPytest,
        tags: ["Testing", "Python"],
      },
      {
        name: "Playwright",
        description: "Reliable E2E testing for modern apps.",
        icon: TestTube,
        tags: ["Testing", "E2E"],
      },
      {
        name: "Postman",
        description: "Platform for building and using APIs.",
        icon: SiPostman,
        tags: ["API", "Testing"],
      },
    ],
  },
  {
    category: "DevOps & Deployment",
    items: [
      {
        name: "Vercel",
        description: "Develop, Preview, Ship frontends fast.",
        icon: SiVercel,
        tags: ["Deployment", "Hosting"],
      },
      {
        name: "Render",
        description: "Cloud hosting for apps and databases.",
        icon: SiRender,
        tags: ["Deployment", "Hosting"],
      },
      {
        name: "Amazon Web Services",
        description: "Comprehensive cloud computing platform.",
        icon: SiAmazon,
        tags: ["Cloud", "Infrastructure"],
      },
      {
        name: "Netlify",
        description: "The fastest way to build modern sites.",
        icon: SiNetlify,
        tags: ["Deployment", "CDN"],
      },
      {
        name: "GitHub Actions",
        description: "Automate software workflows with CI/CD.",
        icon: SiGithubactions,
        tags: ["CI/CD", "Automation"],
      },
    ],
  },
  {
    category: "Tools & Workflow",
    items: [
      {
        name: "Git",
        description: "Distributed version control system.",
        icon: SiGit,
        tags: ["Version Control"],
      },
      {
        name: "GitHub",
        description: "Platform for code hosting and collaboration.",
        icon: SiGithub,
        tags: ["Collaboration", "Git"],
      },
      {
        name: "Figma",
        description: "Collaborative interface design tool.",
        icon: SiFigma,
        tags: ["Design", "UI/UX"],
      },
      {
        name: "WordPress",
        description: "Open source CMS for beautiful websites.",
        icon: SiWordpress,
        tags: ["CMS", "PHP"],
      },
    ],
  },
  {
    category: "Mobile Development",
    items: [
      {
        name: "Flutter",
        description: "UI toolkit for natively compiled apps.",
        icon: SiFlutter,
        tags: ["Mobile", "Cross-platform"],
      },
      {
        name: "Dart",
        description: "Client-optimized language for fast apps.",
        icon: SiDart,
        tags: ["Language", "Mobile"],
      },
      {
        name: "React Native",
        description: "Build native apps using React.",
        icon: SiReact,
        tags: ["Mobile", "Cross-platform"],
      },
      {
        name: "Expo",
        description: "Framework and platform for universal React apps.",
        icon: SiExpo,
        tags: ["Mobile", "Tooling"],
      },
    ],
  },
];

export default function StackPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = ["All", ...toolsData.map((data) => data.category)];

  const filteredTools = toolsData
    .filter((category) => activeCategory === "All" || category.category === activeCategory)
    .map((category) => {
      const filteredItems = category.items.filter((item) => {
        const searchLower = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      });

      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((category) => category.items.length > 0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10); 
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; 
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24 min-w-0">
      
      <div className="flex flex-col gap-6 w-full min-w-0">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            My Development Arsenal
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground w-full break-words">
            The languages, frameworks, databases, and tools that keep me
            coding, caffeinated, and occasionally questioning my life choices.
            These are the technologies I trust to make sure projects ship.
          </p>
        </div>

        <div className="space-y-5 pt-4 min-w-0">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-12 lg:h-14 w-full bg-secondary/30 border-border hover:border-primary/50 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl text-base transition-all duration-300 placeholder:text-muted-foreground/70"
            />
          </div>
          
          <div className="relative w-full flex items-center h-12 rounded-full min-w-0">
            
            <div 
              className={`absolute left-0 z-20 flex items-center justify-start h-full w-24 pl-1 bg-gradient-to-r from-background via-background/90 to-transparent transition-opacity duration-300 ${
                canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } hidden md:flex`}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="h-8 w-8 rounded-full shadow-sm bg-background border-border text-foreground hover:bg-secondary hover:text-primary transition-all shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div 
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex items-center w-full overflow-x-auto gap-2 scroll-smooth snap-x snap-mandatory px-1 h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-5 h-9 text-sm font-medium rounded-full whitespace-nowrap transition-colors outline-none shrink-0 snap-start flex items-center justify-center ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent hover:border-border/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-filter-pill"
                        className="absolute inset-0 bg-primary shadow-sm rounded-full"
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>

            <div 
              className={`absolute right-0 z-20 flex items-center justify-end h-full w-24 pr-1 bg-gradient-to-l from-background via-background/90 to-transparent transition-opacity duration-300 ${
                canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } hidden md:flex`}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="h-8 w-8 rounded-full shadow-sm bg-background border-border text-foreground hover:bg-secondary hover:text-primary transition-all shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col relative w-full min-w-0">
        {filteredTools.length > 0 ? (
          <div className="space-y-10 lg:space-y-16">
            {filteredTools.map((category, idx) => (
              <section key={idx} className="space-y-4 lg:space-y-6 min-w-0">
                <h2 className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                  {category.category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                  {category.items.map((tool, toolIdx) => (
                    <Card
                      key={toolIdx}
                      className="group border-border bg-card py-1 lg:py-2 hover:border-primary/50 hover:shadow-sm transition-all duration-200 min-w-0"
                    >
                      <CardContent className="p-4 lg:p-5 flex items-start gap-4 min-w-0">
                        <div className="p-2 bg-secondary rounded-lg border border-border group-hover:border-primary/20 transition-colors shrink-0">
                          <ToolLogo tool={tool} />
                        </div>
                        <div className="space-y-2 w-full min-w-0">
                          <div className="space-y-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-lg truncate">
                              {tool.name}
                            </h3>
                            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed line-clamp-2 break-words">
                              {tool.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1 min-w-0">
                            {tool.tags.map((tag, tagIdx) => (
                              <Badge
                                key={tagIdx}
                                variant="secondary"
                                className="font-normal text-[10px] lg:text-xs px-2 py-0.5 border-border"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center py-12">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
                <div className="relative bg-background border border-border w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <Search className="w-10 h-10 text-muted-foreground/40" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold tracking-tight">
                  No results found
                </h3>
                <p className="text-muted-foreground text-base px-6">
                  We couldn't find any tools matching{" "}
                  <span className="text-foreground font-semibold italic">
                    "{query}"
                  </span>
                  . Try adjusting your search or category.
                </p>
              </div>

              <Button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                variant="outline"
                className="rounded-md px-8 h-11 border-border bg-background hover:bg-secondary transition-colors"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}