"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  url: string;
  excerpt: string;
  category: string;
}

interface SearchProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SearchInput({ className, placeholder, autoFocus, isOpen, onOpenChange }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use external isOpen if provided, otherwise use internal state
  const currentIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setCurrentIsOpen = onOpenChange || setInternalIsOpen;

  // Mock search data - in production, this would come from an API
  const searchData = useMemo(() => [
    {
      title: "Getting Started",
      url: "/docs/getting-started/introduction",
      excerpt: "Learn what Xether AI is and how it helps you build AI-ready data pipelines.",
      category: "Getting Started"
    },
    {
      title: "Quickstart",
      url: "/docs/getting-started/quickstart",
      excerpt: "Get your first pipeline running in under 5 minutes.",
      category: "Getting Started"
    },
    {
      title: "API Reference",
      url: "/docs/api-reference/overview",
      excerpt: "Complete REST API documentation for Xether AI platform.",
      category: "API Reference"
    },
    {
      title: "Datasets API",
      url: "/docs/api-reference/datasets",
      excerpt: "Manage datasets, versions, and metadata through REST API.",
      category: "API Reference"
    },
    {
      title: "Pipelines API",
      url: "/docs/api-reference/pipelines",
      excerpt: "Create, manage, and execute data pipelines.",
      category: "API Reference"
    },
    {
      title: "Python SDK",
      url: "/docs/sdk/python",
      excerpt: "Complete Python SDK for Xether AI platform integration.",
      category: "SDK"
    },
    {
      title: "JavaScript SDK",
      url: "/docs/sdk/javascript",
      excerpt: "JavaScript/TypeScript SDK for web and Node.js applications.",
      category: "SDK"
    },
    {
      title: "Installation",
      url: "/docs/getting-started/installation",
      excerpt: "Complete installation guide for Xether AI platform and SDKs.",
      category: "Getting Started"
    },
    {
      title: "Troubleshooting",
      url: "/docs/getting-started/troubleshooting",
      excerpt: "Troubleshoot common issues with Xether AI platform and SDKs.",
      category: "Getting Started"
    }
  ], []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setCurrentIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCurrentIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setCurrentIsOpen]);

  // Derive loading state from query instead of setting state in effect
  const isLoading = useMemo(() => {
    return query.trim() !== "" && results.length === 0;
  }, [query, results]);

  // Derive results from query instead of setting state in effect
  const displayResults = useMemo(() => {
    if (query.trim() === "") {
      return [];
    }
    return results;
  }, [query, results]);

  useEffect(() => {
    if (query.trim() === "") {
      return;
    }

    // Simulate search delay
    const timer = setTimeout(() => {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query, searchData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && displayResults.length > 0) {
      window.location.href = displayResults[0].url;
    }
  };

  const handleResultClick = (url: string) => {
    // Use Next.js router for navigation
    window.open(url, '_blank');
  };

  const handleInputFocus = () => {
    setCurrentIsOpen(true);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/4 h-4 w-4 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Search documentation..."}
          className={cn(
            "w-full pl-10 pr-4 py-2 text-sm border rounded-lg transition-all",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            currentIsOpen ? "border-primary" : "border-border"
          )}
          autoFocus={autoFocus}
          style={{
            borderColor: currentIsOpen ? "var(--primary)" : undefined,
            backgroundColor: "var(--background)",
            color: "var(--foreground)"
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {currentIsOpen && (query.trim() !== "" || displayResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary/20 border-t-transparent border-r-transparent"></div>
              <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
            </div>
          ) : displayResults.length > 0 ? (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {displayResults.length} result{displayResults.length === 1 ? "" : "s"}
              </div>
              {displayResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full text-left p-3 hover:bg-muted transition-colors rounded-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {result.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.category}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {result.excerpt}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() !== "" ? (
            <div className="p-4 text-center">
              <div className="text-sm text-muted-foreground">
                No results found for &quot;{query}&quot;
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
