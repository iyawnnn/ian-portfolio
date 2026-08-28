"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PracticeProjectsHandoffProps = {
  practice: ReactNode;
  projects: ReactNode;
};

// Devian-style page-level handoff: Practice finishes normally, then a
// normal-flow fade band carries Warm Black into Paper before Projects
// begins. No overlap, no negative margins, no layer sits over Practice —
// the band is just the next element in document flow.
export function PracticeProjectsHandoff({
  practice,
  projects,
}: PracticeProjectsHandoffProps) {
  const fadeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fade = fadeRef.current;
      if (!fade) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          fade,
          { opacity: 0.85 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: fade,
              start: "top bottom",
              end: "top 55%",
              scrub: 0.5,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: fadeRef },
  );

  return (
    <>
      {practice}

      <div
        ref={fadeRef}
        aria-hidden="true"
        data-handoff="fade"
        className="h-[10svh] bg-[linear-gradient(to_bottom,#11110F_0%,#11110F_15%,rgba(17,17,15,0.92)_30%,rgba(17,17,15,0.72)_48%,rgba(17,17,15,0.42)_66%,rgba(17,17,15,0.16)_82%,rgba(242,240,233,0.78)_94%,#F2F0E9_100%)] min-[768px]:h-[14svh] min-[1120px]:h-[18svh]"
      />

      {projects}
    </>
  );
}
