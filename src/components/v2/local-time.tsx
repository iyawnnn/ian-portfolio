"use client";

import { useEffect, useState } from "react";

function formatManilaTime(): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date());
}

export function LocalTime() {
  const [time, setTime] = useState(formatManilaTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(formatManilaTime()), 30000);
    return () => clearInterval(interval);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}
