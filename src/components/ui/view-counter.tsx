import { redis } from "@/lib/redis";
import { Eye } from "@phosphor-icons/react/ssr";
import { unstable_cache } from "next/cache";

export async function ViewCounter({ slug }: { slug: string }) {
  
  // 1. Wrap the live database call in Next.js's native cache
  const getCachedViews = unstable_cache(
    async () => {
      try {
        return (await redis.get<number>(`pageviews:blog:${slug}`)) ?? 0;
      } catch (error: any) {
        // 2. CRITICAL FIX: Never swallow Next.js internal build errors
        if (error.digest === 'DYNAMIC_SERVER_USAGE') {
          throw error;
        }
        console.error("Redis Error:", error);
        return 0;
      }
    },
    [`views-cache-${slug}`], // Unique cache key per article
    { revalidate: 60 }       // Keep it synced with the 60-second ISR
  );

  const views = await getCachedViews();

  return (
    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span>{views} {views === 1 ? 'view' : 'views'}</span>
    </div>
  );
}