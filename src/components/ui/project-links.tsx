"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { CustomLink } from "@/components/mdx/preview-link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectLinksProps {
  caseStudyUrl: string;
  liveSiteUrl?: string;
  githubUrl?: string;
}

export function ProjectLinks({
  caseStudyUrl,
  liveSiteUrl,
  githubUrl,
}: ProjectLinksProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground font-sans">
      {/* Primary Action
        Uses existing CustomLink. If caseStudyUrl exists in previewMap, 
        it automatically renders the rich image tooltip.
      */}
      <CustomLink href={caseStudyUrl}>
        <span className="font-medium text-foreground hover:text-primary transition-colors">
          Read Case Study
        </span>
      </CustomLink>

      {(liveSiteUrl || githubUrl) && (
        <span className="select-none text-border">&bull;</span>
      )}

      {/* Secondary Actions using lightweight text tooltips */}
      <TooltipProvider delayDuration={100}>
        <div className="flex items-center gap-3">
          {liveSiteUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={liveSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors group"
                >
                  Visit Live Site
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="border-border/50">
                <p>Launch production deployment</p>
              </TooltipContent>
            </Tooltip>
          )}

          {liveSiteUrl && githubUrl && (
            <span className="select-none text-border">&bull;</span>
          )}

          {githubUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors group"
                >
                  View GitHub
                  <Github className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="border-border/50">
                <p>View source code</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}