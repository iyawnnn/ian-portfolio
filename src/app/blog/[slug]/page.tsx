export const revalidate = 60;

import { getPostBySlug, getAllPostsMeta } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { CustomLink } from "@/components/mdx/preview-link";
import { ViewCounter } from "@/components/ui/view-counter";
import { ShareButtons } from "@/components/ui/share-buttons";
import { GiscusComments } from "@/components/ui/giscus-comments";
import { ReportView } from "@/components/ui/report-view";
import { Suspense } from "react"; // 1. IMPORT SUSPENSE

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

// Dynamic OpenGraph Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta } = getPostBySlug(resolvedParams.slug);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev";
  const ogImageUrl = meta.coverImage ? `${baseUrl}${meta.coverImage}` : `${baseUrl}/opengraph-image.png`;
  
  return {
    title: `${meta.title} | Blog | Ian Macabulos`,
    description: meta.description,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/blog/${resolvedParams.slug}`,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta, content } = getPostBySlug(resolvedParams.slug);

  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col px-6 sm:px-8 lg:px-12 pt-8 md:pt-12 pb-16 font-sans">
      
      <ReportView slug={resolvedParams.slug} />

      <div className="mb-6 md:mb-10">
        <Link href="/blog" className="group inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Articles
        </Link>
      </div>

      <article className="w-full flex flex-col">
        <div className="flex flex-col mb-8 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[650] tracking-[-0.025em] text-foreground font-sans leading-[1.05]">
            {meta.title}
          </h1>
          
          <div className="flex items-center gap-3 mt-6 sm:mt-8">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden bg-muted border border-border/50 shadow-sm shrink-0">
              <Image src="/about/ian-macabulos-2026.webp" alt="Portrait of Ian Macabulos" fill sizes="44px" className="object-cover" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-sm sm:text-base leading-none mb-1 sm:mb-1.5">
                Ian Macabulos
              </span>
              
              <div className="flex flex-row flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground font-medium">
                <time dateTime={meta.date}>{meta.date}</time>
                <span className="text-[8px] sm:text-[10px] opacity-50">●</span>
                <span>{readingTime} min read</span>
                <span className="text-[8px] sm:text-[10px] opacity-50">●</span>
                
                {/* 2. WRAP IN SUSPENSE WITH A SKELETON FALLBACK */}
                <Suspense fallback={<div className="h-4 w-12 bg-muted animate-pulse rounded" />}>
                  <ViewCounter slug={resolvedParams.slug} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {meta.coverImage && (
          <div className="relative w-full aspect-video md:aspect-[21/9] mb-8 md:mb-12 overflow-hidden rounded-xl md:rounded-2xl border border-border/50 bg-muted/20 shadow-sm">
            <Image src={meta.coverImage} alt={`Cover visual for the article: ${meta.title}`} fill sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover" priority />
          </div>
        )}
        
        <div className="prose prose-neutral dark:prose-invert max-w-none w-full
          prose-headings:font-sans prose-p:font-sans prose-a:font-sans
          prose-headings:font-semibold prose-headings:tracking-[-0.015em] prose-headings:text-foreground
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-[1.05rem]
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
          prose-img:rounded-xl sm:prose-img:rounded-2xl prose-img:border prose-img:border-border/50
          prose-blockquote:border-l-[3px] prose-blockquote:border-foreground prose-blockquote:bg-muted/80 dark:prose-blockquote:bg-muted/20 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:py-3 sm:prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:text-sm sm:prose-blockquote:text-base
          prose-code:text-foreground prose-code:bg-muted/80 dark:prose-code:bg-muted/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm sm:prose-code:text-base prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#111111] dark:prose-pre:bg-muted/20 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl prose-pre:text-sm">
          
          <MDXRemote source={content} components={{ a: CustomLink }} />
        </div>

        <div className="mt-12 flex justify-between items-center border-t border-border/50 pt-8">
          <ShareButtons slug={resolvedParams.slug} title={meta.title} />
        </div>

        <GiscusComments />
      </article>
    </div>
  );
}