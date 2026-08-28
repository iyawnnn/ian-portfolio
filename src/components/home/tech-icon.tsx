import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { maskStyle } from "@/lib/icon-mask";

interface TechIconProps {
  Icon?: IconType;
  iconSrc?: string;
  opticalScale?: number;
  /** Color + transition classes only — a `text-*` utility drives both the
   *  react-icons `currentColor` fill and the masked-SVG `bg-current` fill. */
  className: string;
}

export function TechIcon({ Icon, iconSrc, opticalScale = 1, className }: TechIconProps) {
  const size: CSSProperties = { width: `${opticalScale * 100}%`, height: `${opticalScale * 100}%` };

  if (Icon) {
    return <Icon aria-hidden="true" style={size} className={className} />;
  }
  if (iconSrc) {
    return <span aria-hidden="true" style={{ ...maskStyle(iconSrc), ...size }} className={`bg-current ${className}`} />;
  }
  return null;
}
