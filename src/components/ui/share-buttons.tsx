"use client";

import { Twitter, Linkedin } from "lucide-react";
import { Link as LinkIcon, Check } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  slug: string;
  title: string;
}

export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const postUrl = `${baseUrl}/blog/${slug}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Share this article:</span>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={copyToClipboard} aria-label="Copy link">
          {copied ? <Check className="h-4 w-4 text-white-500" /> : <LinkIcon className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}