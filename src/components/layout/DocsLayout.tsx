"use client";

import React from "react";
import { DocsSidebar } from "./DocsSidebar";
import { Breadcrumbs } from "./Breadcrumbs";
import { DocNavigation } from "./DocNavigation";
import { VersionSelector } from "./VersionSelector";
import { DeprecationNotice } from "./DeprecationNotice";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { EditOnGitHub } from "@/components/feedback/EditOnGitHub";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { useTableOfContents } from "@/hooks/useTableOfContents";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const tocItems = useTableOfContents();

  return (
    <>
      <div className="container mx-auto px-4">
        {/* Deprecation notice */}
        <DeprecationNotice className="mb-6" />
        
        {/* Version selector and page header */}
        <div className="flex items-center justify-end py-4 border-b mb-6" style={{ borderColor: "var(--border)" }}>
          <VersionSelector />
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-10">
          {/* Sidebar - Fixed positioning */}
          <div className="hidden md:block md:w-64 lg:w-65 shrink-0">
            <DocsSidebar />
          </div>

          {/* Main content - Takes remaining space */}
          <main id="main-content" className="flex-1 relative py-8 min-w-0" role="main" aria-label="Main content">
            <Breadcrumbs />
            <article className="prose-doc max-w-none">{children}</article>

            {/* Feedback Widget */}
            <FeedbackWidget />

            {/* Prev / Next navigation */}
            <DocNavigation />

            {/* Edit on GitHub */}
            <EditOnGitHub />
          </main>

          {/* Right TOC column */}
          <aside className="hidden lg:block w-56 shrink-0" aria-label="Table of contents">
            <div className="sticky top-20 py-8">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
