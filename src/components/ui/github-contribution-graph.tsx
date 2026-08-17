"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Day = { date: string; contributionCount: number };
type ContributionWeek = { contributionDays: Day[] };
type Data = {
  totalContributions: number;
  weeks: ContributionWeek[];
};
type ApiResponse = Data | { error: string };

const FULL_YEAR_WEEK_COUNT = 53;

const fetcher = async (url: string): Promise<Data> => {
  const response = await fetch(url);
  const payload = (await response.json()) as ApiResponse;

  if (!response.ok || "error" in payload) {
    throw new Error("Unable to load GitHub contributions.");
  }

  return payload;
};

function intensity(count: number) {
  if (count === 0) {
    return "border-zinc-200 bg-zinc-100 dark:border-white/5 dark:bg-black";
  }
  if (count <= 3) {
    return "border-zinc-300 bg-zinc-300 dark:border-white/5 dark:bg-zinc-800";
  }
  if (count <= 6) {
    return "border-zinc-500 bg-zinc-500 dark:border-white/5 dark:bg-zinc-600";
  }
  if (count <= 9) {
    return "border-zinc-700 bg-zinc-700 dark:border-white/5 dark:bg-zinc-400";
  }
  return "border-zinc-900 bg-zinc-900 dark:border-white/5 dark:bg-white";
}

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function contributionLabel(day: Day) {
  return `${dateLabel(day.date)}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`;
}

function graphMetrics(width: number) {
  if (width >= 720) return { cellSize: 12, gap: 4 };
  if (width >= 360) return { cellSize: 10, gap: 4 };
  return { cellSize: 9, gap: 3 };
}

function useGraphLayout(totalWeeks: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = (width: number) => {
      const nextWidth = Math.floor(width);
      setContainerWidth((currentWidth) =>
        currentWidth === nextWidth ? currentWidth : nextWidth,
      );
    };

    updateWidth(element.getBoundingClientRect().width);

    const observer = new ResizeObserver(([entry]) => {
      updateWidth(entry.contentRect.width);
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return useMemo(() => {
    const { cellSize, gap } = graphMetrics(containerWidth);
    const visibleWeekCount = containerWidth
      ? Math.max(
          1,
          Math.min(
            totalWeeks,
            Math.floor((containerWidth + gap) / (cellSize + gap)),
          ),
        )
      : 0;

    return { containerRef, cellSize, gap, visibleWeekCount };
  }, [containerWidth, totalWeeks]);
}

function ContributionGrid({
  weeks,
  label,
  cellSize,
  gap,
}: {
  weeks: ContributionWeek[];
  label?: string;
  cellSize: number;
  gap: number;
}) {
  return (
    <div>
      {label && (
        <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      )}
      <div
        className="grid w-full grid-flow-col items-start justify-between"
        style={{ columnGap: gap }}
        role="grid"
        aria-label={
          label
            ? `GitHub contribution calendar, ${label.toLowerCase()}`
            : "GitHub contribution calendar"
        }
      >
        {weeks.map((week, weekIndex) => (
          <div
            key={`${week.contributionDays[0]?.date ?? "week"}-${weekIndex}`}
            className="grid grid-rows-7"
            style={{ rowGap: gap }}
          >
            {week.contributionDays.map((day) => (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    role="gridcell"
                    aria-label={contributionLabel(day)}
                    className={`rounded-[2px] border transition-transform focus-visible:z-10 focus-visible:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${intensity(day.contributionCount)}`}
                    style={{ width: cellSize, height: cellSize }}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-md border border-border bg-card px-2.5 py-2 text-left text-xs text-card-foreground shadow-lg"
                >
                  <p className="font-medium">{dateLabel(day.date)}</p>
                  <p className="mt-0.5 text-muted-foreground">
                    {day.contributionCount} contribution
                    {day.contributionCount === 1 ? "" : "s"}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingGrid({
  weeks,
  cellSize,
  gap,
}: {
  weeks: number;
  cellSize: number;
  gap: number;
}) {
  return (
    <div
      className="grid w-full grid-flow-col items-start justify-between animate-pulse"
      style={{ columnGap: gap }}
    >
      {Array.from({ length: weeks }, (_, weekIndex) => (
        <div
          key={weekIndex}
          className="grid grid-rows-7"
          style={{ rowGap: gap }}
        >
          {Array.from({ length: 7 }, (_, dayIndex) => (
            <span
              key={dayIndex}
              className="rounded-[2px] bg-muted"
              style={{ width: cellSize, height: cellSize }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function GitHubContributionGraph() {
  const { data, error, isLoading } = useSWR<Data>(
    "/api/github-contributions",
    fetcher,
    { revalidateOnFocus: false },
  );
  const totalWeeks = data?.weeks.length ?? FULL_YEAR_WEEK_COUNT;
  const { containerRef, cellSize, gap, visibleWeekCount } =
    useGraphLayout(totalWeeks);
  const isTruncated = visibleWeekCount > 0 && visibleWeekCount < totalWeeks;
  const visibleWeeks = data?.weeks.slice(-visibleWeekCount) ?? [];

  return (
    <section
      aria-labelledby="github-contributions-title"
      className="min-w-0 rounded-xl border border-border/50 bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            GitHub activity
          </p>
          <h2
            id="github-contributions-title"
            className="mt-1 text-lg font-bold tracking-tight sm:text-xl"
          >
            Contribution graph
          </h2>
        </div>
        {data && (
          <p className="text-sm font-medium text-muted-foreground">
            {data.totalContributions.toLocaleString()} contributions in the last
            year
          </p>
        )}
      </div>

      <div ref={containerRef} className="min-w-0 w-full">
        {isLoading && visibleWeekCount > 0 && (
          <div aria-label="Loading GitHub contributions">
            {isTruncated && (
              <div className="mb-2 h-3 w-24 animate-pulse rounded bg-muted" />
            )}
            <LoadingGrid
              weeks={visibleWeekCount}
              cellSize={cellSize}
              gap={gap}
            />
          </div>
        )}

        {error && (
          <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 px-4 text-center text-sm text-muted-foreground">
            GitHub contributions are temporarily unavailable.
          </div>
        )}

        {data && visibleWeekCount > 0 && (
          <ContributionGrid
            weeks={visibleWeeks}
            label={isTruncated ? "Recent activity" : undefined}
            cellSize={cellSize}
            gap={gap}
          />
        )}
      </div>

      <div className="mt-4 flex min-w-0 items-center justify-end gap-1 text-[9px] font-mono uppercase tracking-wider text-muted-foreground sm:gap-1.5 sm:text-[10px]">
        <span>Less</span>
        {[0, 1, 4, 7, 10].map((count) => (
          <span
            key={count}
            className={`size-2.5 rounded-[2px] border sm:size-3 ${intensity(count)}`}
          />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
