"use client";

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

function ContributionGrid({
  weeks,
  label,
}: {
  weeks: ContributionWeek[];
  label?: string;
}) {
  return (
    <div>
      {label && (
        <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      )}
      <div
        className="flex w-full items-start justify-between"
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
            className="grid grid-rows-7 gap-1"
          >
            {week.contributionDays.map((day) => (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    role="gridcell"
                    aria-label={contributionLabel(day)}
                    className={`size-2.5 rounded-[2px] border transition-transform focus-visible:z-10 focus-visible:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-2.5 lg:size-3 ${intensity(day.contributionCount)}`}
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

function LoadingGrid({ weeks }: { weeks: number }) {
  return (
    <div className="flex w-full items-start justify-between animate-pulse">
      {Array.from({ length: weeks }, (_, weekIndex) => (
        <div key={weekIndex} className="grid grid-rows-7 gap-1">
          {Array.from({ length: 7 }, (_, dayIndex) => (
            <span
              key={dayIndex}
              className="size-2.5 rounded-[2px] bg-muted lg:size-3"
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

  return (
    <section
      aria-labelledby="github-contributions-title"
      className="overflow-hidden rounded-xl border border-border/50 bg-card p-5 shadow-sm sm:p-6"
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
            {data.totalContributions.toLocaleString()} contributions in the last year
          </p>
        )}
      </div>

      {isLoading && (
        <div aria-label="Loading GitHub contributions">
          <div className="block sm:hidden">
            <LoadingGrid weeks={20} />
          </div>
          <div className="hidden sm:block">
            <LoadingGrid weeks={53} />
          </div>
        </div>
      )}

      {error && (
        <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 px-4 text-center text-sm text-muted-foreground">
          GitHub contributions are temporarily unavailable.
        </div>
      )}

      {data && (
        <>
          <div className="block sm:hidden">
            <ContributionGrid
              weeks={data.weeks.slice(-20)}
              label="Recent activity"
            />
          </div>
          <div className="hidden sm:block">
            <ContributionGrid weeks={data.weeks} />
          </div>
        </>
      )}

      <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <span>Less</span>
        {[0, 1, 4, 7, 10].map((count) => (
          <span
            key={count}
            className={`size-2.5 rounded-[2px] border lg:size-3 ${intensity(count)}`}
          />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
