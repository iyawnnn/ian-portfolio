"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ErrorInfo, type PointerEvent, type ReactNode } from "react";
import { Bot } from "lucide-react";

const RobotScene = dynamic(() => import("./ai-chat-robot-scene"), {
  ssr: false,
  loading: () => <RobotFallback />,
});

function RobotFallback() {
  return (
    <span className="flex size-full items-center justify-center" aria-hidden="true">
      <Bot className="size-10 text-foreground sm:size-12" strokeWidth={1.35} />
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
  const pointerStart = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);
  const [showWhisper, setShowWhisper] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const showWhisperBriefly = () => {
      setShowWhisper(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setShowWhisper(false), 2500);
    };
    const initialTimer = setTimeout(showWhisperBriefly, 1500);
    const repeatTimer = setInterval(showWhisperBriefly, 24000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(repeatTimer);
    };
  }, []);
  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
  };
  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y) > 6) dragged.current = true;
  };

  return (
    <div className="group fixed overflow-visible right-[max(1rem,env(safe-area-inset-right))] bottom-[max(5rem,calc(env(safe-area-inset-bottom)+1rem))] z-50 lg:right-[max(1.5rem,env(safe-area-inset-right))] lg:bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 bottom-full mb-1.5 whitespace-nowrap rounded-full border border-white/15 bg-black/75 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/80 shadow-md backdrop-blur-sm transition-opacity duration-500 ease-out sm:right-full sm:top-[42%] sm:bottom-auto sm:mr-2 sm:mb-0 sm:-translate-y-1/2 ${
          showWhisper
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
        } motion-reduce:transition-none`}
      >
        Chat with me
      </span>
      <button
        type="button"
        aria-label="Chat with AI"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onClick={() => {
          if (!dragged.current) onClick();
          dragged.current = false;
        }}
        className="relative flex size-[92px] touch-none rounded-full border border-transparent bg-transparent drop-shadow-[0_10px_10px_rgba(255,255,255,0.10)] ring-offset-background transition-[filter] duration-500 ease-out hover:drop-shadow-[0_12px_11px_rgba(255,255,255,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 motion-reduce:transition-none sm:size-28"
      >
        <RobotErrorBoundary>
          <RobotScene />
        </RobotErrorBoundary>
      </button>
    </div>
  );
}
