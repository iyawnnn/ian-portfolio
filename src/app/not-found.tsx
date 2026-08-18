import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 relative">
      {/* Centered Background 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden h-full w-full">
        <span className="text-[25vw] font-bold text-primary/[0.03] select-none leading-none">
          404
        </span>
      </div>

      <div className="max-w-md w-full text-center relative">
        <div
          className="page-enter relative z-10 space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Error 404
            </h1>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Lost in space.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed pt-2">
              The page you are looking for does not exist. It might have been
              moved or the link is simply broken.
            </p>
          </div>

          <div className="pt-4">
            <Button
              asChild
              variant="outline"
              className="rounded-md px-10 h-12 border-border bg-background hover:bg-secondary transition-all hover:px-12 group"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
