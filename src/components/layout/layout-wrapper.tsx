"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar/index";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MobileHeader } from "@/components/layout/mobile-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  if (isHomepage) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <main className="flex flex-col min-h-screen w-full">
          {children}
          <SiteFooter />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* DESKTOP: Sidebar
          Added transform-gpu and will-change-transform to offload animation to the GPU.
          This prevents the browser from recalculating layout every frame.
      */}
      <aside
        className={cn(
          "hidden fixed top-0 bottom-0 left-0 h-full bg-background z-50 transition-all duration-300 ease-in-out lg:flex shrink-0 transform-gpu will-change-transform",
          isCollapsed ? "w-[70px]" : "w-64",
        )}
      >
        <AppSidebar />
      </aside>

      {/* MOBILE: Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <MobileHeader />
      </div>

      {/* MAIN CONTENT AREA
          Switched from margin (ml) to padding (pl) to prevent viewport blowout.
          Added min-w-0 to strictly enforce content wrapping boundaries.
      */}
      <main
        className={cn(
          "flex flex-col min-h-screen w-full pt-16 lg:pt-0 pb-24 lg:pb-0 transition-all duration-300 ease-in-out transform-gpu will-change-transform min-w-0",
          isCollapsed ? "lg:pl-[70px]" : "lg:pl-64",
        )}
      >
        {/* Page Content */}
        <div className="flex flex-col flex-1 w-full min-w-0">
          {children}
        </div>

        {/* FOOTER */}
        <SiteFooter />
      </main>

      {/* MOBILE: Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 border-t border-sidebar-border/60 bg-sidebar/85 backdrop-blur-xl z-50">
        <MobileBottomNav />
      </nav>
    </div>
  );
}