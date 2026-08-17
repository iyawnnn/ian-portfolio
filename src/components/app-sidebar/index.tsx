"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FaTiktok } from "react-icons/fa6";
import {
  Home,
  User,
  Briefcase,
  CodeXml,
  FileText,
  Mail,
  BookOpen,
  Linkedin,
  Github,
  Sun,
  Moon,
  ArrowUpRight,
  ChevronLeft,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";

const PeerlistIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 7a5 5 0 0 0-5-5H7v18" />
    <path d="M7 12h7a5 5 0 0 0 0-10" />
  </svg>
);

const MAIN_LINKS = [
  { title: "Explore", href: "/", icon: Home, shortcut: "1" },
  { title: "About", href: "/about", icon: User, shortcut: "2" },
  { title: "Projects", href: "/projects", icon: Briefcase, shortcut: "3" },
  { title: "Stack", href: "/stack", icon: CodeXml, shortcut: "4" },
  { title: "Resume", href: "/resume", icon: FileText, shortcut: "5" },
  { title: "Blog", href: "/blog", icon: BookOpen, shortcut: "6" },
] as const;

const CONNECT_LINKS = [
  { title: "Contact", href: "/contact", icon: Mail, shortcut: "C" },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ianmacabulos/",
    icon: Linkedin,
    isExternal: true,
  },
  {
    title: "Github",
    href: "https://github.com/iyawnnn",
    icon: Github,
    isExternal: true,
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@iyawn.ts",
    icon: FaTiktok,
    isExternal: true,
  },
  {
    title: "Peerlist",
    href: "https://peerlist.io/iannmacabulos",
    icon: PeerlistIcon,
    isExternal: true,
  },
] as const;

function NavSection({
  title,
  links,
  isCollapsed,
  pathname,
}: {
  title: string;
  links: typeof MAIN_LINKS | typeof CONNECT_LINKS;
  isCollapsed: boolean;
  pathname: string;
}) {
  return (
    <section className="w-full">
      {!isCollapsed && (
        <h2 className="mb-3 px-3 text-[10px] font-bold uppercase text-sidebar-foreground/50 transition-opacity duration-300 tracking-widest">
          {title}
        </h2>
      )}
      <ul className="space-y-1 w-full">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const isExternal = "isExternal" in link && link.isExternal;

          return (
            <li key={link.title} className="w-full">
              <Link
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                prefetch={false}
                className={cn(
                  "group flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 border",
                  isCollapsed ? "justify-center px-2" : "justify-between px-3",
                  isActive
                    ? "bg-sidebar-accent border-sidebar-border/50 text-sidebar-foreground shadow-sm"
                    : "border-transparent text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <div
                  className={cn(
                    "flex items-center transition-all",
                    isCollapsed ? "gap-0" : "gap-3",
                  )}
                >
                  <link.icon
                    className={cn(
                      "h-4 w-4 stroke-2 transition-colors duration-200",
                      isActive
                        ? "text-sidebar-foreground"
                        : "text-muted-foreground group-hover:text-sidebar-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "transition-all duration-300 overflow-hidden whitespace-nowrap",
                      isCollapsed
                        ? "w-0 opacity-0 invisible"
                        : "w-auto opacity-100 visible",
                    )}
                  >
                    {link.title}
                  </span>
                </div>

                <div
                  className={cn(
                    "hidden md:flex transition-all duration-300 overflow-hidden",
                    isCollapsed
                      ? "w-0 opacity-0 invisible"
                      : "w-auto opacity-100 visible",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border text-[10px] transition-all duration-200",
                      isActive
                        ? "border-sidebar-border bg-background shadow-sm text-foreground font-semibold"
                        : "border-sidebar-border/60 bg-sidebar-accent/30 text-muted-foreground group-hover:border-sidebar-border/80 group-hover:bg-background group-hover:text-foreground group-hover:shadow-sm font-medium",
                    )}
                  >
                    {"shortcut" in link ? (
                      link.shortcut
                    ) : (
                      <ArrowUpRight className="h-3 w-3" />
                    )}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();

  React.useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const allLinks = [...MAIN_LINKS, ...CONNECT_LINKS];
      const target = allLinks.find(
        (link) =>
          "shortcut" in link &&
          link.shortcut?.toLowerCase() === e.key.toLowerCase(),
      );
      if (target) {
        e.preventDefault();
        router.push(target.href);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <aside
      className={cn(
        "relative z-50 flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300",
        isCollapsed ? "px-3 pb-3 pt-5 items-center" : "p-5",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className={cn(
          "absolute -right-3 top-8 z-50 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm hover:bg-sidebar-accent",
          isCollapsed ? "rotate-180" : "",
        )}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <header
        className={cn(
          "mb-10 flex items-center transition-all duration-300",
          isCollapsed ? "justify-center px-0 gap-0" : "gap-4 px-1",
        )}
      >
        <div
          className={cn(
            "relative shrink-0 flex items-center justify-center overflow-hidden rounded-full border border-sidebar-foreground/20 shadow-sm transition-all",
            isCollapsed ? "h-10 w-10" : "h-12 w-12",
          )}
        >
          <Image
            src="/logo/personal-logo-black.png"
            alt="Ian Macabulos"
            fill
            sizes="(max-width: 768px) 48px, 48px"
            priority
            className="block dark:hidden object-cover"
          />
          <Image
            src="/logo/personal-logo-white.png"
            alt="Ian Macabulos"
            fill
            sizes="(max-width: 768px) 48px, 48px"
            priority
            className="hidden dark:block object-cover"
          />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col min-w-0 space-y-0 transition-all duration-300 overflow-hidden",
            isCollapsed
              ? "w-0 opacity-0 invisible"
              : "w-auto opacity-100 visible",
          )}
        >
          <h1 className="truncate text-base font-bold leading-none tracking-tight">
            Ian Macabulos
          </h1>
          <p className="whitespace-nowrap text-[12px] font-medium text-muted-foreground mt-1">
            Full-Stack Developer
          </p>
        </div>
      </header>

      <nav className="flex flex-1 flex-col space-y-8 overflow-y-auto overflow-x-hidden w-full no-scrollbar">
        <NavSection
          title="Main"
          links={MAIN_LINKS}
          isCollapsed={isCollapsed}
          pathname={pathname}
        />
        <NavSection
          title="Connect"
          links={CONNECT_LINKS}
          isCollapsed={isCollapsed}
          pathname={pathname}
        />
      </nav>

      <footer
        className={cn(
          "mt-auto border-t border-sidebar-border pt-4 pb-1 w-full transition-all",
          isCollapsed ? "flex flex-col items-center gap-2" : "px-3",
        )}
      >
        <div
          className={cn(
            "flex w-full gap-2 transition-all duration-300",
            isCollapsed ? "flex-col items-center" : "flex-row items-center",
          )}
        >
          <Button
            variant="outline"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            className={cn(
              "bg-background/50 text-muted-foreground shadow-sm hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all border-sidebar-border/60 rounded-xl h-10",
              isCollapsed
                ? "w-10 p-0 justify-center shrink-0"
                : "flex-1 justify-between px-3",
            )}
          >
            {isCollapsed ? (
              <Search className="h-4 w-4" />
            ) : (
              <>
                <span className="flex items-center gap-2 font-normal text-sm">
                  <Search className="h-4 w-4 shrink-0" />
                  Search...
                </span>
                <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-sidebar-border/50 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-[10px]">⌘</span>K
                </kbd>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "shrink-0 rounded-xl border-sidebar-border/60 bg-background/50 text-foreground shadow-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all h-10 w-10",
              isCollapsed ? "" : "",
            )}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-4 w-4 stroke-2" />
              ) : (
                <Moon className="h-4 w-4 stroke-2" />
              ))}
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </div>
      </footer>
    </aside>
  );
}
