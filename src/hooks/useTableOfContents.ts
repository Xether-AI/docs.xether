"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const extractHeadings = () => {
      const headings = document.querySelectorAll(
        "#main-content h2, #main-content h3"
      );

      const tocItems: TocItem[] = Array.from(headings).map((heading) => {
        // Ensure heading has an ID
        if (!heading.id) {
          const id = heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || "";
          heading.id = id;
        }

        return {
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.substring(1)),
        };
      });

      return tocItems;
    };

    // Use MutationObserver to watch for content changes
    const observer = new MutationObserver(() => {
      const newItems = extractHeadings();
      setItems(newItems);
    });

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      // Defer initial extraction to avoid synchronous setState in effect
      requestAnimationFrame(() => {
        const initialItems = extractHeadings();
        setItems(initialItems);
      });

      // Watch for changes
      observer.observe(mainContent, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, []);

  return items;
}
