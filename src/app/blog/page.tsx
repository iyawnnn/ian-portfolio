export const revalidate = 60;

import Link from "next/link";
import { getAllPostsMeta, PostMeta } from "@/lib/mdx";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { ViewCounter } from "@/components/ui/view-counter";
import { Suspense } from "react"; // 1. IMPORT SUSPENSE

export const metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, minimalist design, and the occasional realization that I overcomplicated a simple function.",
};

const POSTS_PER_PAGE = 3;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;

  const posts = getAllPostsMeta().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24 font-sans">
      <div className="flex flex-col gap-4 w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Localhost Tales
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground w-full">
          Thoughts on code, design, and why I spent three hours fixing a single
          semicolon.
        </p>
      </div>

      <section className="flex flex-col">
        {paginatedPosts.map((post: PostMeta) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-x-6 md:py-8 border-b border-border/50 transition-colors hover:bg-muted/30 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl">
              <div className="flex min-w-0 flex-col gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:opacity-80">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl">
                  {post.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-muted-foreground mt-1 transition-colors group-hover:text-foreground">
                  Read Article{" "}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <div className="flex flex-row items-center gap-3 text-sm font-medium text-muted-foreground md:min-w-[120px] md:flex-col md:items-end md:gap-1.5 md:pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 opacity-70" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>

                <Suspense fallback={<div className="h-4 w-12 bg-muted animate-pulse rounded" />}>
                  <ViewCounter slug={post.slug} />
                </Suspense>
              </div>
            </article>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground border-t border-border/50 mt-4">
            No system logs available yet. Check back later.
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <div className="flex items-center justify-between w-full pt-4">
          <div className="flex w-24 sm:w-32">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                scroll={false}
                prefetch={true} // Add aggressive prefetching
              >
                <ChevronLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
                Previous
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground bg-muted/30 px-3 sm:px-4 py-1.5 rounded-full border border-border/50">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex w-24 sm:w-32 justify-end">
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                scroll={false}
                prefetch={true} 
              >
                Next{" "}
                <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
