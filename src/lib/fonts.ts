import localFont from "next/font/local";
import { Pinyon_Script } from "next/font/google";

export const neueMontreal = localFont({
  src: [
    {
      path: "../assets/fonts/neue-montreal/neuemontreal-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/neue-montreal/neuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/neue-montreal/neuemontreal-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const bradford = localFont({
  src: [
    {
      path: "../assets/fonts/bradford/BradfordLLWeb-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/bradford/BradfordLLWeb-Italic.woff",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-bradford",
  display: "swap",
  preload: false,
});

// Single-purpose exception: used ONLY for the "Full-stack developer" hero
// role annotation, which needs a genuinely connected cursive silhouette
// that Bradford Italic (an editorial italic serif, not true script) can't
// give. Not applied anywhere else in the site.
export const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon-script",
  display: "swap",
  preload: false,
});
