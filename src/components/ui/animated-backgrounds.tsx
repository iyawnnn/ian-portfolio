"use client";

import { useEffect, useState } from "react";

// EFFECT 1: Moving Dots (Good visibility, calm float)
export const MovingDots = () => {
  const [dots, setDots] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    // Use requestIdleCallback or a small timeout to let the page finish loading first
    const timer = setTimeout(() => {
      const newDots = new Array(15).fill(null).map(() => ({
        left: `${Math.random() * 100}%`,
        bottom: "-20px",
        width: `${Math.random() * 8 + 4}px`,
        height: `${Math.random() * 8 + 4}px`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 10}s`,
      }));
      setDots(newDots);
    }, 100); // 100ms delay gives the UI time to breath

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none transform-gpu">
      {dots.map((style, idx) => (
        <span
          key={idx}
          // ADDED: will-change-transform
          className="absolute bg-primary/30 rounded-full animate-float backdrop-blur-[1px] shadow-sm will-change-transform"
          style={style}
        />
      ))}
    </div>
  );
};

// EFFECT 2: Minimalist Radar (3 Waves, Slower, Thinner)
export const Radar = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Position: Bottom-Right Corner */}
      <div className="absolute -bottom-12 -right-12 h-64 w-64 flex items-center justify-center">
        {/* Wave 1 */}
        {/* Changed: border-2 -> border (1px), primary/40 -> primary/20 */}
        <div
          className="absolute h-full w-full rounded-full border border-primary/20 animate-ripple"
          style={{ animationDuration: "4s" }}
        />

        {/* Wave 2 */}
        <div
          className="absolute h-full w-full rounded-full border border-primary/20 animate-ripple"
          style={{ animationDelay: "1.2s", animationDuration: "4s" }}
        />

        {/* Wave 3 */}
        <div
          className="absolute h-full w-full rounded-full border border-primary/20 animate-ripple"
          style={{ animationDelay: "2.4s", animationDuration: "4s" }}
        />

        {/* Center Glow (Softer) */}
        <div className="absolute h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      </div>
    </div>
  );
};
