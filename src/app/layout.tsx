import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { ChatWidget } from "@/components/layout/chat-widget";
import { CommandMenuLoader } from "@/components/layout/command-menu-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev",
  ),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Ian Macabulos",
    template: "%s | Ian Macabulos",
  },
  description:
    "A Full-Stack Developer based in the Philippines, crafting accessible and high-performance web applications with Next.js, TypeScript, and Node.js.",
  keywords: [
    "Ian Macabulos",
    "Ian Sebastian Macabulos",
    "Full-Stack Developer",
    "Web Developer Philippines",
    "Next.js Developer",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Ian Macabulos",
    description:
      "Building scalable, high-performance web applications with the modern tech stack.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev",
    siteName: "Ian Macabulos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Macabulos",
    description: "Full-Stack Developer based in the Philippines.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Ian Macabulos",
        url: "https://www.iansebastian.dev",
        alternateName: ["Ian Sebastian Macabulos", "Ian Macabulos Portfolio"],
      },
      {
        "@type": "Person",
        name: "Ian Macabulos",
        url: "https://www.iansebastian.dev",
        jobTitle: "Full-Stack Developer",
        image: "https://www.iansebastian.dev/about/ian-macabulos-2026.webp",
        sameAs: [
          "https://www.linkedin.com/in/ianmacabulos/",
          "https://github.com/iyawnnn",
          "https://peerlist.io/iannmacabulos",
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </SidebarProvider>
        </ThemeProvider>
        <CommandMenuLoader />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
