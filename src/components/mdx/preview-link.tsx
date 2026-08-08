import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const previewMap: Record<string, string> = {
  // Project Previews
  "/projects/kodasync": "/projects/kodasync/kodasync-cover.webp",
  "/projects/subvantage": "/projects/subvantage/subvantage-cover.webp",
  "/projects/grit": "/projects/grit/grit-cover.webp",
  "/projects/climaph": "/projects/climaph/climaph-cover.webp",
  "/projects/ac-core": "/projects/ac-core/accore-cover.webp",
  "/projects/ua-attendance": "/blog/ua-labsign/ua-labsign-preview.webp",
  "https://labsign.ua-cit.com/": "/blog/ua-labsign/ua-labsign-preview.webp",
  "/projects/kusinago": "/projects/kusinago/kusinago-cover.webp",
  "/projects/mamars": "/projects/mamars/mamars-cover.webp",
  "/projects/movieloom": "/projects/movieloom/movieloom-cover.webp",
  "/projects/thryve": "/projects/thryve/thryve-cover.webp",

  // Blog Previews
  "/blog/ac-core-insights": "/blog/ac-core-insights/cover.webp",
  "/blog/academic-reality-check": "/blog/academic-reality-check/cover.webp",
  "/blog/architecting-lazada": "/blog/architecting-lazada/cover.webp",
  "/blog/better-bacolod": "/blog/better-bacolod/cover.webp",
  "/blog/quality-over-quantity": "/blog/quality-over-quantity/cover.webp",

  // Blog Previews: Architecting Lazada
  "https://www.credly.com/badges/96846437-3bb4-48cd-95f2-a9b4540fb83e/public_url": "/blog/architecting-lazada/aws-badge-preview.webp",
  
  // Blog Previews: AC-Core Insights
  "https://github.com/MMPA-Works": "/blog/ac-core-insights/mmpa-works-preview.webp",
  
  // Blog Previews: Better Bacolod
  "https://bettergov.ph/": "/blog/better-bacolod/better-gov-preview.webp",
  "https://betterbacolod.org/": "/blog/better-bacolod/better-bacolod-preview.webp",
  
  // Blog Previews: Academic Reality Check
  "https://gsap.com/": "/blog/academic-reality-check/gsap-preview.webp",
  "https://www.reactbits.dev/": "/blog/academic-reality-check/react-bits-preview.webp",
  "https://www.hau.edu.ph/": "/blog/academic-reality-check/hau-preview.webp",

  // Global Page Previews
  "/resume": "/preview-links/resume-preview-image.webp",
  "/contact": "/preview-links/contact-preview-image.webp",
  "/stack": "/preview-links/stack-preview-image.webp",
  "/about": "/preview-links/about-preview-image.webp",
  "/projects": "/preview-links/projects-preview-image.webp",
  "/blog": "/preview-links/blog-preview-image.webp",

  "https://www.instagram.com/blythe/": "/preview-links/andrea-preview-image.webp",
};

export const CustomLink = ({ href, children, ...props }: any) => {
  const isInternal = href && href.startsWith("/");
  const previewImage = previewMap[href];

  if (previewImage) {
    return (
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              href={href} 
              target={isInternal ? undefined : "_blank"}
              rel={isInternal ? undefined : "noopener noreferrer"}
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium font-sans inline-block cursor-pointer"
              {...props}
            >
              {children}
            </Link>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            sideOffset={8}
            className="p-0 border border-border/50 shadow-2xl rounded-xl overflow-hidden bg-transparent z-[100]"
          >
            <div className="w-64 sm:w-72 leading-none text-[0px]">
              <Image 
                src={previewImage} 
                alt={`Preview of ${href}`} 
                width={1920} 
                height={1080} 
                className="w-full h-auto block m-0 p-0" 
                priority
              />
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (isInternal) {
    return (
      <Link 
        href={href} 
        className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium font-sans"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium font-sans"
      {...props}
    >
      {children}
    </a>
  );
};