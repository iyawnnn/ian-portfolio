import { ScrollRestoration } from "@/components/ui/scroll-restoration";
import { Hero } from "@/components/v2/hero";
import { HeroMotion } from "@/components/v2/hero-motion";
import { AboutManifesto } from "@/components/v2/about-manifesto";
import { NavIslandLoader } from "@/components/v2/nav-island-loader";
import { SmoothScroll } from "@/components/v2/smooth-scroll";

// Below-hero sections (Projects Overview, GitHub activity, Spotify/WakaTime,
// blog preview, Stack/Resume cards) are temporarily not rendered on "/"
// while the V2 hero is being built out full-viewport. Nothing was deleted —
// see git history for the previous version of this file to restore them.
export default function ExplorePage() {
  return (
    <>
      <ScrollRestoration />
      <NavIslandLoader />
      <Hero />
      <AboutManifesto />
      <SmoothScroll />
      <HeroMotion />
    </>
  );
}
