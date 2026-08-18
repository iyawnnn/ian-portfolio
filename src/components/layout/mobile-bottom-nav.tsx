"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, Github } from "lucide-react";
import {
  House as Home,
  User,
  Briefcase,
  Code as CodeXml,
  FileText,
  Envelope as Mail,
  BookOpen,
} from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

// --- CUSTOM ICONS ---
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
    {/* A stylized "P" to match Lucide's stroke style */}
    <path d="M19 7a5 5 0 0 0-5-5H7v18" />
    <path d="M7 12h7a5 5 0 0 0 0-10" />
  </svg>
);

const MOBILE_LINKS = [
  { href: "/", label: "Explore", icon: Home, isExternal: false },
  { href: "/about", label: "About", icon: User, isExternal: false },
  { href: "/projects", label: "Projects", icon: Briefcase, isExternal: false },
  { href: "/stack", label: "Stack", icon: CodeXml, isExternal: false },
  { href: "/resume", label: "Resume", icon: FileText, isExternal: false },
  { href: "/contact", label: "Contact", icon: Mail, isExternal: false },
  { href: "/blog", label: "Blog", icon: BookOpen, isExternal: false },
  {
    href: "https://www.linkedin.com/in/ianmacabulos/",
    label: "LinkedIn",
    icon: Linkedin,
    isExternal: true,
  },
  {
    href: "https://github.com/iyawnnn",
    label: "Github",
    icon: Github,
    isExternal: true,
  },
  {
    href: "https://peerlist.io/iannmacabulos",
    label: "Peerlist",
    icon: PeerlistIcon,
    isExternal: true,
  },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="h-full w-full">
      <div
        className="flex h-full w-full items-center overflow-x-auto overflow-y-hidden px-4 pb-2
        snap-x snap-mandatory 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        <div className="flex min-w-full w-fit mx-auto items-center justify-start gap-2 sm:gap-6 md:gap-8">
          {MOBILE_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                prefetch={false}
                className={cn(
                  "snap-center group flex min-w-[5rem] flex-col items-center justify-center gap-1 rounded-lg py-2 px-2 transition-all duration-300",
                  isActive
                    ? "bg-secondary text-primary shadow-sm"
                    : "bg-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <div className="relative flex items-center justify-center">
                  <link.icon
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive ? "stroke-[2px] scale-105" : "stroke-[1.5px]",
                    )}
                  />
                </div>

                <span
                  className={cn(
                    "text-[10px] font-medium leading-none tracking-tight transition-colors",
                    isActive ? "font-semibold" : "",
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}

          <div className="w-4 shrink-0 sm:hidden" />
        </div>
      </div>
    </div>
  );
}
