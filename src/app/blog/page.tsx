export const revalidate = 60;

import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllPostsMeta, PostMeta } from "@/lib/mdx";
import { ViewCounter } from "@/components/ui/view-counter";

export const metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, minimalist design, and the occasional realization that I overcomplicated a simple function.",
};

const POSTS_PER_PAGE = 3;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function Views({ slug }: { slug: string }) {
  return (
    <Suspense
      fallback={<span className="h-4 w-14 animate-pulse rounded bg-muted" />}
    >
      <ViewCounter slug={slug} />
    </Suspense>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const requestedPage = Number((await searchParams).page) || 1;
  const posts = getAllPostsMeta().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 p-4 pt-8 font-sans md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      <header className="flex w-full max-w-4xl flex-col gap-4">
        <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Localhost Tales
        </h1>
        <p className="w-full text-lg leading-relaxed text-muted-foreground md:text-xl">
          Thoughts on code, design, and why I spent three hours fixing a single
          semicolon.
        </p>
      </header>

      <section aria-label="Blog articles" className="border-t border-border/60">
        {pagePosts.map((post: PostMeta, index) => (
          <article
            key={post.slug}
            className="group border-b border-border/50 transition-colors duration-300 hover:border-border hover:bg-muted/20"
          >
            <div className="grid min-w-0 gap-4 px-1 py-7 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-4 sm:px-3 sm:py-9 md:grid-cols-[3rem_minmax(0,1fr)_10rem] md:gap-6 lg:px-4">
              <span className="hidden pt-1 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground/60 sm:block">
                {String(startIndex + index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-3 sm:hidden">
                  <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground/60">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-border" />
                </div>

                <h2 className="text-xl font-semibold leading-snug tracking-tight text-foreground/90 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-foreground sm:text-2xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground md:hidden">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 opacity-70" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <Views slug={post.slug} />
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                >
                  Read Article
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="hidden pt-1 text-right text-xs font-medium leading-relaxed text-muted-foreground md:flex md:flex-col md:items-end md:gap-1.5 lg:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 opacity-70" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span>
                  <Views slug={post.slug} />
                </span>
              </div>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No system logs available yet. Check back later.
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 pt-2"
        >
          <div className="min-w-0">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                aria-label={`Go to page ${currentPage - 1}`}
                className="group inline-flex items-center text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                scroll={false}
                prefetch
              >
                <ChevronLeft className="mr-1 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
                Previous
              </Link>
            )}
          </div>

          <span className="whitespace-nowrap rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground sm:px-4 sm:text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <div className="min-w-0 text-right">
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                aria-label={`Go to page ${currentPage + 1}`}
                className="group inline-flex items-center text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                scroll={false}
                prefetch
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}