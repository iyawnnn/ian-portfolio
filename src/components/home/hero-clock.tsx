"use client";

import { useEffect, useState } from "react";

function formatManilaTime(date: Date) {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `GMT+8 · ${time}`;
}

// Asia/Manila is UTC+8 year-round (no DST), so the "GMT+8" half is a static
// label — only the time itself needs to stay live. Updated once a minute via
// setInterval (no seconds, no RAF) since that's the finest granularity shown.
export function HeroClock() {
  const [label, setLabel] = useState(() => formatManilaTime(new Date()));

  useEffect(() => {
    const tick = () => setLabel(formatManilaTime(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
