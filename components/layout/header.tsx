import { Music } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6" />
          <h1 className="text-lg font-bold tracking-tight">Piano Compass</h1>
        </div>
        <p className="text-muted-foreground hidden text-sm sm:block">
          Your guide through chords, scales, and cadences
        </p>
        <ThemeToggle />
      </div>
    </header>
  );
}
