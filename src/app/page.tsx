import { ScrollRestoration } from "@/components/ui/scroll-restoration";
import { Hero } from "@/components/v2/hero";
import { HeroMotion } from "@/components/v2/hero-motion";
import { AboutManifesto } from "@/components/v2/about-manifesto";
import { Practice } from "@/components/v2/practice";
import { PracticeProjectsHandoff } from "@/components/v2/practice-projects-handoff";
import { SelectedWork } from "@/components/v2/selected-work";
import { WorkingSet } from "@/components/v2/working-set";
import { FieldNotes } from "@/components/v2/field-notes";
import { NavIslandLoader } from "@/components/v2/nav-island-loader";
import { SmoothScroll } from "@/components/v2/smooth-scroll";
import { IntroLoader } from "@/components/v2/intro-loader";

// Below-hero sections (Projects Overview, GitHub activity, Spotify/WakaTime,
// blog preview, Stack/Resume cards) are temporarily not rendered on "/"
// while the V2 hero is being built out full-viewport. Nothing was deleted —
// see git history for the previous version of this file to restore them.
export default function ExplorePage() {
  return (
    <>
      <IntroLoader />
      <ScrollRestoration />
      <NavIslandLoader />
      <Hero />
      <AboutManifesto />
      <PracticeProjectsHandoff practice={<Practice />} projects={<SelectedWork />} />
      <WorkingSet />
      <FieldNotes />
      <SmoothScroll />
      <HeroMotion />
    </>
  );
}
