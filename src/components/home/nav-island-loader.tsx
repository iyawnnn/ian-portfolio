"use client";

import dynamic from "next/dynamic";

// dynamic(..., { ssr: false }) is only allowed from inside a Client
// Component — page.tsx (which renders this) is a Server Component, so the
// ssr:false import has to live in its own small client wrapper, same
// pattern as command-menu-loader.tsx.
const NavIsland = dynamic(
  () => import("./nav-island").then((m) => m.NavIsland),
  { ssr: false },
);

export function NavIslandLoader() {
  return <NavIsland />;
}
