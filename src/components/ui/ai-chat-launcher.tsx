"use client";

import { Robot as Bot } from "@phosphor-icons/react/ssr";

export function AiChatLauncher({
  onClick,
  hidden,
}: {
  onClick: () => void;
  hidden: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`fixed right-[max(1.5rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 hidden min-h-12 items-center gap-2 rounded-full border border-white/10 bg-zinc-950/95 px-4 text-sm font-medium text-white shadow-[0_12px_32px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-zinc-900 hover:shadow-[0_16px_36px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-100 motion-reduce:transform-none motion-reduce:transition-none lg:flex ${
        hidden ? "invisible pointer-events-none" : "visible"
      }`}
    >
      <Bot aria-hidden="true" className="size-4" />
      <span>Chat with AI</span>
    </button>
  );
}

