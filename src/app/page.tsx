import { ScrollRestoration } from "@/components/ui/scroll-restoration";
import { Hero } from "@/components/home/hero";
import { HeroMotion } from "@/components/home/hero-motion";
import { AboutManifesto } from "@/components/home/about-manifesto";
import { Practice } from "@/components/home/practice";
import { PracticeProjectsHandoff } from "@/components/home/practice-projects-handoff";
import { SelectedWork } from "@/components/home/selected-work";
import { WorkingSet } from "@/components/home/working-set";
import { FieldNotes } from "@/components/home/field-notes";
import { NavIslandLoader } from "@/components/home/nav-island-loader";
import { SmoothScroll } from "@/components/home/smooth-scroll";
import { IntroLoader } from "@/components/home/intro-loader";

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
