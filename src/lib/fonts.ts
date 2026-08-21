import localFont from "next/font/local";

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
