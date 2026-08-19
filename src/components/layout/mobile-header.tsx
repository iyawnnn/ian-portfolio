"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Robot as Bot, Sun, Moon, MagnifyingGlass as Search } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

export function MobileHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const openAiChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <header className="flex h-auto w-full items-center justify-between border-b border-sidebar-border/60 bg-sidebar/80 px-6 py-3 backdrop-blur-md">
      {/* Left: Profile (Logo + Name) */}
      <div className="flex items-center gap-4">
        {/* --- CHANGED: LOGO SWITCHING LOGIC --- */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/10 bg-background shadow-sm">
          {/* 1. Light Mode Logo: Visible by default, HIDDEN in dark mode */}
          <Image
            src="/logo/personal-logo-black.png"
            alt="Ian Macabulos"
            fill
            sizes="48px"
            priority
            className="block dark:hidden object-cover"
          />

          {/* 2. Dark Mode Logo: Hidden by default, VISIBLE in dark mode */}
          <Image
            src="/logo/personal-logo-white.png"
            alt="Ian Macabulos"
            fill
            sizes="48px"
            priority
            className="hidden dark:block object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-base font-semibold leading-none tracking-[-0.01em]">
            Ian Macabulos
          </h1>
          <p className="text-xs font-normal text-muted-foreground">
            Full-Stack Developer
          </p>
        </div>
      </div>

      {/* Right: Actions (Chat + Theme Toggle) */}
      {/* Right: Actions (Chat + Search + Theme Toggle) */}
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          className="h-10 w-10 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Open Command Palette</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Chat with AI"
          onClick={openAiChat}
          className="h-10 w-10 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <Bot className="h-5 w-5" />
          <span className="sr-only">Open AI Chat</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted &&
            (theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            ))}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}