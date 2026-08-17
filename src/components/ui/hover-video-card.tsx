"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface HoverVideoCardProps {
  posterSrc: string;
  videoSrc: string;
  alt: string;
}

export function HoverVideoCard({ posterSrc, videoSrc, alt }: HoverVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        if (videoRef.current.readyState === 0) {
          videoRef.current.load();
        }
        
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Video play interrupted:", error);
            });
        }
      }
    }, 200); 
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    setIsPlaying(false);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; 
    }
  };

  return (
    <div
      className="relative w-full aspect-video overflow-hidden border-b border-border/50 bg-muted/20 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={posterSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105 z-10"
      />

      <video
        aria-hidden="true"
        tabIndex={-1}
        ref={videoRef}
        src={videoSrc}
        preload="none"
        muted
        playsInline
        loop
        className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
      
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 z-30" />
    </div>
  );
}
