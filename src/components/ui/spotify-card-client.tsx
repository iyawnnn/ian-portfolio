"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MusicNote as Music, ArrowUpRight, Disc as Disc3 } from "@phosphor-icons/react/ssr";
import { Card } from "@/components/ui/card";
import useSWR from "swr";

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02h.061zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2h.001zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3h-.001z" />
  </svg>
);

export type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SpotifyCardClient() {
  const { data } = useSWR<SpotifyData>("/api/spotify", fetcher, {
    refreshInterval: 10000, 
    revalidateOnFocus: true,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!data?.isPlaying || !data.progressMs || !data.durationMs) return;

    let currentProgress = data.progressMs;
    const duration = data.durationMs;
    const initialFrame = requestAnimationFrame(() => {
      setProgress((currentProgress / duration) * 100);
    });

    const interval = setInterval(() => {
      currentProgress = Math.min(currentProgress + 1000, duration);
      setProgress((currentProgress / duration) * 100);
    }, 1000);

    return () => {
      cancelAnimationFrame(initialFrame);
      clearInterval(interval);
    };
  }, [data]);

  if (!data) {
    return (
      <Card
        className="flex h-[160px] w-full animate-pulse flex-col border-border/50 bg-card p-6"
        aria-label="Loading Spotify activity"
      >
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="mt-auto flex items-center gap-4">
          <div className="size-16 rounded-md bg-muted" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
      </Card>
    );
  }

  if (!data?.isPlaying) {
    return (
      <Card className="relative flex flex-col h-[160px] w-full p-6 bg-card border-dashed border-border/60 transition-colors overflow-hidden">
        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-2">
            <SpotifyIcon className="w-5 h-5 text-muted-foreground opacity-50" />
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">System Idle</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-auto w-full z-10">
          <div className="h-16 w-16 shrink-0 rounded-md border border-dashed border-border/50 flex items-center justify-center bg-muted/20">
            <Music className="w-6 h-6 text-muted-foreground/50" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-base font-semibold text-muted-foreground truncate">Spotify Offline</h3>
            <p className="text-xs text-muted-foreground/50 truncate mt-1">No active network playback</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-border/30" />
      </Card>
    );
  }

  return (
    <Link href={data.songUrl!} target="_blank" rel="noopener noreferrer" className="block group outline-none">
      <Card className="relative flex flex-col h-[160px] w-full p-6 bg-card border border-border/50 hover:border-border transition-colors overflow-hidden shadow-sm">
        
        <style>{`
          @keyframes equalize {
            0%, 100% { transform: scaleY(0.2); }
            25% { transform: scaleY(1); }
            50% { transform: scaleY(0.3); }
            75% { transform: scaleY(0.8); }
          }
        `}</style>

        <div className="absolute -right-12 -top-12 opacity-[0.04] group-hover:opacity-[0.12] transition-opacity duration-700 blur-2xl pointer-events-none will-change-[opacity]">
          <Image src={data.albumImageUrl!} height={200} width={200} sizes="200px" quality={10} alt="" />
        </div>

        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-2">
            <SpotifyIcon className="w-4 h-4 text-foreground" />
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Now Playing</span>
          </div>
          <div className="flex items-end gap-[3px] h-4 overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-[3px] h-full bg-foreground rounded-t-sm will-change-transform"
                style={{ 
                  transformOrigin: "bottom", 
                  animation: `equalize 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 z-10 mt-auto w-full">
          <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden border border-border/50 shadow-md will-change-transform">
            <Image src={data.albumImageUrl!} fill sizes="64px" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" alt={`Album art for ${data.album}`} />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               <Disc3 className="h-6 w-6 text-white animate-spin" />
            </div>
          </div>
          
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-base font-semibold text-foreground truncate leading-tight">{data.title}</h3>
            <p className="text-sm font-medium text-muted-foreground truncate mt-0.5">{data.artist}</p>
            <p className="text-[10px] text-muted-foreground truncate mt-1">{data.album}</p>
          </div>

          <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full border border-border/50 bg-secondary group-hover:bg-foreground group-hover:text-background text-foreground transition-colors">
             <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary overflow-hidden">
          <div 
            className="h-full w-full origin-left bg-foreground/80 transition-transform duration-1000 ease-linear"
            style={{ transform: "scaleX(" + progress / 100 + ")" }}
          />
        </div>
      </Card>
    </Link>
  );
}
