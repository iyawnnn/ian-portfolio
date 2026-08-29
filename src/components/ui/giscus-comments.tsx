"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="h-40 w-full animate-pulse bg-muted rounded-xl" />;
  }

  return (
    <div className="mt-12 w-full border-t border-border/50 pt-8">
      <Giscus
        id="comments"
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
        mapping="pathname"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}