import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { buildDynamicPrompt } from "@/lib/ai-config";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "edge";
export const maxDuration = 30;

const PRIMARY_MODEL = "openai/gpt-oss-120b";
const FALLBACK_MODEL = "qwen/qwen3.6-27b";
const CHAT_UNAVAILABLE_MESSAGE =
  "I am currently experiencing an unusually high volume of messages. If you need an immediate response, please feel free to reach out directly through my contact page.";

// Initialize explicitly to guarantee the key is read
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

function logGroqError(model: string, error: unknown) {
  const details: Record<string, unknown> = { model };

  if (error instanceof Error) {
    details.name = error.name;
    details.message = error.message;
  } else {
    details.message = "Unknown Groq error";
  }

  if (typeof error === "object" && error !== null) {
    if ("statusCode" in error) details.statusCode = error.statusCode;
    if ("isRetryable" in error) details.isRetryable = error.isRetryable;
  }

  console.error("Groq chat request failed", details);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response(
      CHAT_UNAVAILABLE_MESSAGE,
      {
        status: 429,
      },
    );
  }

  const { messages } = await req.json();
  const latestMessage = messages[messages.length - 1]?.content || "";

  if (latestMessage.length > 500) {
    return new Response("Message exceeds maximum allowed length.", {
      status: 400,
    });
  }

  // STRICT SECURITY ONLY: Block jailbreaks at the server level to save API tokens
  const blockedKeywords = ["ignore previous instructions", "system prompt", "bypass", "python script", "write code"];
  
  if (blockedKeywords.some((word) => latestMessage.toLowerCase().includes(word))) {
    return new Response(
      "Nice try! But I am programmed to strictly discuss my web development portfolio.", 
      { status: 400 }
    );
  }

  const dynamicSystemPrompt = buildDynamicPrompt(latestMessage);

  try {
    const result = await streamText({
      model: groq(PRIMARY_MODEL),
      system: dynamicSystemPrompt,
      messages,
      onError: ({ error }) => logGroqError(PRIMARY_MODEL, error),
    });

    return result.toTextStreamResponse();
  } catch (primaryError: unknown) {
    logGroqError(PRIMARY_MODEL, primaryError);
    console.warn(`Falling back to Groq model ${FALLBACK_MODEL}`);

    try {
      const fallbackResult = await streamText({
        model: groq(FALLBACK_MODEL),
        system: dynamicSystemPrompt,
        messages,
        onError: ({ error }) => logGroqError(FALLBACK_MODEL, error),
      });

      return fallbackResult.toTextStreamResponse();
    } catch (fallbackError: unknown) {
      logGroqError(FALLBACK_MODEL, fallbackError);
      return new Response(CHAT_UNAVAILABLE_MESSAGE, { status: 503 });
    }
  }
}
