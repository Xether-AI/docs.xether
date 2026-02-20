"use client";

import React, { useState, useEffect } from "react";
import { DocsSidebar } from "./DocsSidebar";
import { Breadcrumbs } from "./Breadcrumbs";
import { DocNavigation } from "./DocNavigation";
import { VersionSelector } from "./VersionSelector";
import { DeprecationNotice } from "./DeprecationNotice";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { EditOnGitHub } from "@/components/feedback/EditOnGitHub";

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
        {/* Deprecation notice */}
        <DeprecationNotice className="mb-6" />
        
        {/* Version selector and page header */}
        <div className="flex items-center justify-between py-4 border-b mb-6" style={{ borderColor: "var(--border)" }}>
          <VersionSelector />
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)_220px] lg:gap-10">
          {/* Sidebar */}
          <aside aria-label="Documentation navigation">
            <DocsSidebar />
          </aside>

          {/* Main content */}
          <main id="main-content" className="relative py-8 min-w-0" role="main" aria-label="Main content">
            <Breadcrumbs />
            <article className="prose-doc max-w-none">{children}</article>

            {/* Feedback Widget */}
            <FeedbackWidget />

            {/* Prev / Next navigation */}
            <DocNavigation />

            {/* Edit on GitHub */}
            <EditOnGitHub />
          </main>

          {/* Right TOC column — rendered per-page via layout slot */}
          <aside className="hidden lg:block" aria-label="Table of contents">
            <div className="sticky top-20 py-8">
              {/* TOC is injected per-page */}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
