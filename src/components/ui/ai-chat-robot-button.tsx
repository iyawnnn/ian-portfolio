"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Bot } from "lucide-react";

const RobotScene = dynamic(() => import("./ai-chat-robot-scene"), {
  ssr: false,
  loading: () => <RobotFallback />,
});

function RobotFallback() {
  return (
    <span className="flex size-full items-center justify-center" aria-hidden="true">
      <Bot className="size-8 text-foreground sm:size-9" strokeWidth={1.5} />
    </span>
  );
}

class RobotErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unable to render the AI robot:", error, info);
  }

  render() {
    return this.state.hasError ? <RobotFallback /> : this.props.children;
  }
}

export function AiChatRobotButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(5rem,calc(env(safe-area-inset-bottom)+1rem))] z-50 lg:right-[max(1.5rem,env(safe-area-inset-right))] lg:bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
      <span role="tooltip" className="pointer-events-none absolute right-0 bottom-full mb-2.5 whitespace-nowrap rounded-md border border-border bg-background/95 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-within:-translate-y-0.5 group-focus-within:opacity-100 motion-reduce:transition-none">
        Chat with AI
      </span>
      <button
        type="button"
        aria-label="Chat with AI"
        onClick={onClick}
        className="relative flex size-[60px] overflow-hidden rounded-2xl border border-border/80 bg-background/90 shadow-xl ring-offset-background transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none sm:size-[72px] sm:rounded-[22px]"
      >
        <RobotErrorBoundary>
          <RobotScene />
        </RobotErrorBoundary>
      </button>
    </div>
  );
}
