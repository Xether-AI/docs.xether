"use client";

import React, { useState, useEffect } from "react";
import { DocsSidebar } from "./DocsSidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
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
      <div className="container mx-auto px-4">
        <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)_220px] lg:gap-10">
          {/* Sidebar */}
          <DocsSidebar />

          {/* Main content */}
          <main className="relative py-8 min-w-0">
            <article className="prose-doc max-w-none">{children}</article>

            {/* Prev / Next navigation placeholder */}
            <div
              className="mt-12 flex items-center justify-between border-t pt-6"
              style={{ borderColor: "var(--border)" }}
            >
              <div />
              <div />
            </div>
          </main>

          {/* Right TOC column — rendered per-page via layout slot */}
          <div className="hidden lg:block">
            <div className="sticky top-20 py-8">
              {/* TOC is injected per-page */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
