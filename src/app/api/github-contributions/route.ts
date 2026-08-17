import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
};

const query = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}`;

type Response = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              color: string;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

function json(data: object, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: CACHE_HEADERS,
  });
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return json(
      { error: "GitHub contributions are not configured." },
      503,
    );
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      cache: "no-store",
    });

    if (!response.ok) {
      return json({ error: "Unable to load GitHub contributions." }, 502);
    }

    const result = (await response.json()) as Response;
    const calendar =
      result.data?.user?.contributionsCollection.contributionCalendar;

    if (result.errors?.length || !calendar) {
      return json({ error: "Unable to load GitHub contributions." }, 502);
    }

    return json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        contributionDays: week.contributionDays.map(
          ({ date, contributionCount }) => ({ date, contributionCount }),
        ),
      })),
    });
  } catch {
    return json({ error: "Unable to load GitHub contributions." }, 502);
  }
}
