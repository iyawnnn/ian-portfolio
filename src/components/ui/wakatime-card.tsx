import React from "react";
import { Terminal, Code as CodeXml, ArrowUpRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Card } from "@/components/ui/card";

async function fetchWakaTimeData() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      },
      // ISR: Cache the result and revalidate silently every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;
    const json = await response.json();
    
    return {
      total: json.data.human_readable_total,
      language: json.data.languages?.[0]?.name || "Unknown",
    };
  } catch {
    return null;
  }
}

export async function WakaTimeCard() {
  const data = await fetchWakaTimeData();

  return (
    <Link href="https://wakatime.com/@iyawn" target="_blank" rel="noopener noreferrer" className="block group outline-none">
      <Card className="relative flex flex-col h-[160px] w-full p-6 bg-card border border-border/50 hover:border-border transition-colors overflow-hidden shadow-sm transform-gpu">
        
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none will-change-[opacity] transform-gpu" />

        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-2">
            <CodeXml className="w-4 h-4 text-foreground" />
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Dev Metrics</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Last 7 Days</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75 will-change-transform transform-gpu"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 z-10 mt-auto w-full">
          <div className="relative flex items-center justify-center h-16 w-16 shrink-0 rounded-md overflow-hidden border border-border/50 shadow-md bg-secondary/50 group-hover:bg-secondary transition-colors transform-gpu">
            <Terminal className="h-6 w-6 text-foreground" />
          </div>
          
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-base font-bold text-foreground truncate leading-tight">
              {data?.total || "0 hrs"}
            </h3>
            <p className="text-sm font-medium text-muted-foreground truncate mt-0.5">Logged</p>
            <p className="text-[10px] text-muted-foreground truncate mt-1">
              Top: {data?.language || "Unknown"}
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full border border-border/50 bg-secondary group-hover:bg-foreground group-hover:text-background text-foreground transition-colors transform-gpu">
             <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
