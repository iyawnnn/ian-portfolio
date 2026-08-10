"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ErrorInfo, type PointerEvent, type ReactNode } from "react";
import { Bot } from "lucide-react";

const RobotScene = dynamic(() => import("./ai-chat-robot-scene"), {
  ssr: false,
  loading: () => null,
});

function RobotFallback() {
  return (
    <span className="flex size-full items-center justify-center" aria-hidden="true">
      <Bot className="size-10 text-foreground sm:size-12" strokeWidth={1.35} />
    </span>
  );
}

class RobotErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError();
    console.error("Unable to render the AI robot:", error, info);
  }

  render() {
    return this.state.hasError ? <RobotFallback /> : this.props.children;
  }
}

export function AiChatRobotButton({ onClick }: { onClick: () => void }) {
  const pointerStart = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);
  const [showMascot, setShowMascot] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [hasModelError, setHasModelError] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const updateVisibility = () => {
      setShowMascot(query.matches);
      if (!query.matches) {
        setIsModelReady(false);
        setHasModelError(false);
      }
    };
    updateVisibility();
    query.addEventListener("change", updateVisibility);
    return () => query.removeEventListener("change", updateVisibility);
  }, []);

  useEffect(() => {
    if (!showMascot || !isModelReady) return;

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
  }, [isModelReady, showMascot]);

  const handleModelReady = useCallback(() => {
    setIsModelReady(true);
    setHasModelError(false);
  }, []);

  const handleModelError = useCallback(() => {
    setHasModelError(true);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
  };
  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y) > 6) dragged.current = true;
  };

  if (!showMascot) return null;

  return (
    <div className="group fixed isolate overflow-visible right-[max(1rem,env(safe-area-inset-right))] bottom-[max(5rem,calc(env(safe-area-inset-bottom)+1rem))] z-50 lg:right-[max(1.5rem,env(safe-area-inset-right))] lg:bottom-[max(1.5rem,env(safe-area-inset-bottom))]">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 z-0 size-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.28] blur-[34px] transition-[transform,background-color,filter,opacity] duration-500 ease-out group-hover:scale-110 group-hover:bg-black/[0.36] group-hover:blur-[38px] group-focus-within:scale-110 group-focus-within:bg-black/[0.36] group-focus-within:blur-[38px] dark:bg-white/[0.18] dark:group-hover:bg-white/[0.24] dark:group-focus-within:bg-white/[0.24] motion-reduce:transition-none ${
          isModelReady || hasModelError ? "opacity-100" : "opacity-0"
        }`}
      />
      {isModelReady && (
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
      )}
      <button
        type="button"
        aria-label="Chat with AI"
        disabled={!isModelReady && !hasModelError}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onClick={() => {
          if (!dragged.current) onClick();
          dragged.current = false;
        }}
        className={`relative z-10 flex size-[92px] touch-none rounded-full border border-transparent bg-transparent drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] ring-offset-background transition-[filter,opacity] duration-500 ease-out hover:drop-shadow-[0_18px_34px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_16px_28px_rgba(255,255,255,0.10)] dark:hover:drop-shadow-[0_18px_34px_rgba(255,255,255,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 motion-reduce:transition-none sm:size-28 ${
          isModelReady || hasModelError
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <RobotErrorBoundary onError={handleModelError}>
          <RobotScene onReady={handleModelReady} />
        </RobotErrorBoundary>
      </button>
    </div>
  );
}
