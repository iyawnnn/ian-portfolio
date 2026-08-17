"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProjectData {
  title: string;
  description: string;
  link: string;
  image: string;
  video: string;
  tags: string[];
}

export function HomeProjectCard({
  project,
  preloadImage = false,
}: {
  project: ProjectData;
  preloadImage?: boolean;
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        if (videoRef.current.readyState === 0) {
          videoRef.current.load();
        }

        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsVideoPlaying(true))
            .catch((error) => {
              if (error.name !== "AbortError") {
                console.error("Video playback failed:", error);
              }
            });
        }
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={project.link}
      prefetch={false}
      className="group block h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card className="h-full p-0 gap-2 overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 border border-border/50 bg-card flex flex-col">
        <div className="relative w-full aspect-video overflow-hidden border-b border-border/50 bg-muted/20">
          {isImageLoading && (
            <Skeleton className="absolute inset-0 h-full w-full z-10" />
          )}
          <Image
            src={project.image}
            alt={`Cover preview of ${project.title}`}
            fill
            preload={preloadImage}
            fetchPriority={preloadImage ? "high" : undefined}
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc((100vw - 5.5rem) / 2), (max-width: 1151px) calc((100vw - 8rem) / 2), 32rem"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 z-10 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsImageLoading(false)}
          />
          <video
            aria-hidden="true"
            tabIndex={-1}
            ref={videoRef}
            src={project.video}
            preload="none"
            muted
            playsInline
            loop
            className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 z-30" />
        </div>
        <CardHeader className="px-6 pt-3 pb-1">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm sm:text-base">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-2 mt-auto flex-wrap px-6 pb-4 pt-0">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-md group-hover:bg-background transition-colors">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
