import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

const CACHE_HEADERS = {
  "Cache-Control": "private, max-age=10, stale-while-revalidate=20",
};

type SpotifySong = {
  is_playing: boolean;
  progress_ms: number;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: { spotify: string };
    duration_ms: number;
  } | null;
};

function json(data: object, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: CACHE_HEADERS,
  });
}

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return json({ isPlaying: false });
    }

    const song = (await response.json()) as SpotifySong;

    if (!song.item) {
      return json({ isPlaying: false });
    }

    return json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((artist) => artist.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls.spotify,
      progressMs: song.progress_ms,
      durationMs: song.item.duration_ms,
    });
  } catch {
    return json({ isPlaying: false });
  }
}
