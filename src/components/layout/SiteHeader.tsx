import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import Button from "@/components/ui/Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-tight">
              Xether <span className="text-primary">AI</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs/getting-started/introduction"
              className="hover:text-primary transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/api"
              className="hover:text-primary transition-colors text-muted-foreground"
            >
              API
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button
            text="Join our community"
            href="https://discord.gg/xether-ai"
            variant="primary"
            size="sm"
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
