"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docsConfig } from "@/config/docs";
import { NavItem } from "@/config/docs";
import { cn } from "@/lib/utils";

interface DocNavigationProps {
  className?: string;
}

export function DocNavigation({ className }: DocNavigationProps) {
  const pathname = usePathname();

  // Find current page and get next/previous
  const findNavigation = () => {
    const allItems: (NavItem & { category: string })[] = [];
    
    docsConfig.sidebarNav.forEach(category => {
      category.items?.forEach(item => {
        allItems.push({ ...item, category: category.title });
      });
    });

    const currentIndex = allItems.findIndex(item => item.href === pathname);
    
    if (currentIndex === -1) {
      return { prev: null, next: null };
    }

    return {
      prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
      next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
    };
  };

  const { prev, next } = findNavigation();

  if (!prev && !next) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-12 flex items-center justify-between border-t pt-6",
        className
      )}
      style={{ borderColor: "var(--border)" }}
    >
      {prev?.href ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <div className="text-left">
            <div className="text-xs font-normal text-muted-foreground/70">
              Previous
            </div>
            <div>{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next?.href ? (
        <Link
          href={next.href}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="text-right">
            <div className="text-xs font-normal text-muted-foreground/70">
              Next
            </div>
            <div>{next.title}</div>
          </div>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
