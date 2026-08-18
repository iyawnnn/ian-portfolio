"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { CircleNotch as LoaderCircle } from "@phosphor-icons/react/ssr";
import { AiChatLauncher } from "@/components/ui/ai-chat-launcher";

const ChatPanel = dynamic(
  () => import("./chat-panel").then((module) => module.ChatPanel),
  {
    ssr: false,
    loading: () => <ChatPanelLoading />,
  },
);

function ChatPanelLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex h-[100dvh] items-center justify-center overflow-hidden bg-background shadow-2xl lg:inset-auto lg:bottom-6 lg:right-6 lg:h-[600px] lg:w-[400px] lg:rounded-2xl lg:border"
      role="status"
      aria-label="Loading AI chat"
    >
      <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, [openChat]);

  return (
    <>
      <AiChatLauncher onClick={openChat} hidden={isOpen} />
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
    </>
  );
}
