"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getDocsConfig } from "@/config/docs-manager";
import { getVersionByPath } from "@/config/versions";

export function DocsSidebar() {
  const pathname = usePathname();
  const currentVersion = getVersionByPath(pathname);
  const docsConfig = getDocsConfig(currentVersion?.value);

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
        <div className="flex flex-col gap-6">
          {docsConfig.sidebarNav.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h4 className="px-2 py-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                {item.title}
              </h4>
              <nav className="flex flex-col gap-1">
                {item.items?.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href || "#"}
                    className={cn(
                      "flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary",
                      pathname === subItem.href
                        ? "bg-accent/15 text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
