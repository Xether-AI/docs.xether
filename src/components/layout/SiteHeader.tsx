"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { SearchInput } from "../ui/Search";
import Button from "@/components/ui/Button";

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
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
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <SearchInput 
                className="w-64 lg:w-80"
                placeholder="Search documentation... (⌘K)"
              />
            </div>
            
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <SearchIcon className="h-4 w-4" />
            </button>

            <Button
              text="Join our community"
              href="https://discord.gg/xether-ai"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="container mx-auto px-4 pt-20">
            <SearchInput 
              className="w-full"
              placeholder="Search documentation..."
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground"
            >
              Press Escape to close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
