"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on the main docs page
  if (pathname === "/docs" || pathname === "/docs/") {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  
  // Remove "docs" from segments for cleaner display
  const segments = pathSegments[0] === "docs" ? pathSegments.slice(1) : pathSegments;

  const breadcrumbItems = [
    { label: "Documentation", href: "/docs" },
    ...segments.map((segment, index) => {
      const href = "/docs/" + segments.slice(0, index + 1).join("/");
      const label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      return { label, href };
    })
  ];

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-muted-foreground/50">/</span>
          )}
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "hover:text-foreground transition-colors",
                "hover:underline underline-offset-2"
              )}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
