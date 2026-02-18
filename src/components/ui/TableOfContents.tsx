"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%", threshold: 0.1 },
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--muted-foreground)" }}
      >
        On This Page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block py-1 text-sm transition-colors",
            item.level === 3 && "pl-4",
            activeId === item.id ? "font-medium" : "hover:opacity-80",
          )}
          style={{
            color:
              activeId === item.id
                ? "var(--primary)"
                : "var(--muted-foreground)",
          }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
