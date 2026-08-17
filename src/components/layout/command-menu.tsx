"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Home,
  Briefcase,
  CodeXml,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  FileText,
  FolderDot,
  PenTool
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const ALL_PROJECTS = [
  { title: "UA Lab Attendance", href: "/projects/ua-attendance" },
  { title: "AC-CORE", href: "/projects/ac-core" },
  { title: "Grit", href: "/projects/grit" },
  { title: "KodaSync", href: "/projects/kodasync" },
  { title: "SubVantage", href: "/projects/subvantage" },
  { title: "Mama R's", href: "/projects/mamars" },
  { title: "ClimaPH", href: "/projects/climaph" },
  { title: "Thryve", href: "/projects/thryve" },
  { title: "MovieLoom", href: "/projects/movieloom" },
  { title: "KusinaGo", href: "/projects/kusinago" },
];

const ALL_BLOGS = [
  { title: "AC-CORE Insights", href: "/blog/ac-core-insights" },
  { title: "Architecting Lazada", href: "/blog/architecting-lazada" },
  { title: "Academic Reality Check", href: "/blog/academic-reality-check" },
  { title: "Quality Over Quantity", href: "/blog/quality-over-quantity" },
  { title: "Better Bacolod", href: "/blog/better-bacolod" },
];

export function CommandMenu({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = React.useState(initialOpen);
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleCustomEvent = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleCustomEvent);
    
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    setSearchQuery(""); // Reset search when closing
    command();
  }, []);

  const isSearching = searchQuery.length > 0;
  
  // Show a limited subset by default, but render everything when typing so the palette can filter it
  const visibleProjects = isSearching ? ALL_PROJECTS : ALL_PROJECTS.slice(0, 3);
  const visibleBlogs = isSearching ? ALL_BLOGS : ALL_BLOGS.slice(0, 2);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList className="no-scrollbar">
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/resume"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>View Resume</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Explore</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
            <User className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/stack"))}>
            <CodeXml className="mr-2 h-4 w-4" />
            <span>Stack</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {visibleProjects.map((project) => (
            <CommandItem key={project.href} onSelect={() => runCommand(() => router.push(project.href))}>
              <FolderDot className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{project.title}</span>
            </CommandItem>
          ))}
          {!isSearching && (
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>View All Projects...</span>
            </CommandItem>
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Writing">
          {visibleBlogs.map((blog) => (
            <CommandItem key={blog.href} onSelect={() => runCommand(() => router.push(blog.href))}>
              <PenTool className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{blog.title}</span>
            </CommandItem>
          ))}
          {!isSearching && (
            <CommandItem onSelect={() => runCommand(() => router.push("/blog"))}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>View All Articles...</span>
            </CommandItem>
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Connect">
          <CommandItem onSelect={() => runCommand(() => router.push("/contact"))}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact Form</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/iyawnnn", "_blank"))}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("https://www.linkedin.com/in/ianmacabulos/", "_blank"))}>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </CommandItem>
        </CommandGroup>

      </CommandList>
    </CommandDialog>
  );
}