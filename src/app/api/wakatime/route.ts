import { NextResponse } from "next/server";
import { getWakaTimeStats } from "@/lib/wakatime";

export const dynamic = "force-dynamic";

const CACHE_HEADERS = {
  "Cache-Control": "private, max-age=60, stale-while-revalidate=120",
};

// getWakaTimeStats() already hits the last_7_days endpoint (see lib/wakatime.ts)
// — it's a weekly aggregate, not a daily one — so no separate/expensive
// polling system is needed here. This route just exposes the one field the
// client actually needs (data.total_seconds) without shipping the API key.
export async function GET() {
  const stats = await getWakaTimeStats();
  const totalSeconds =
    typeof stats?.data?.total_seconds === "number" ? stats.data.total_seconds : null;

  return NextResponse.json({ totalSeconds }, { headers: CACHE_HEADERS });
}
