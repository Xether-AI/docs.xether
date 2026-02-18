import React from "react";
import { DocsSidebar } from "./DocsSidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">{children}</div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 pt-4">
              {/* Table of Contents will go here */}
              <div className="space-y-4">
                <h4 className="font-medium">On This Page</h4>
                <div className="text-muted-foreground">TOC Items...</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
