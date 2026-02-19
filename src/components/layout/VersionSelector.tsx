"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { versions, getCurrentVersion, getVersionByPath } from "@/config/versions";

export function VersionSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const currentVersion = getVersionByPath(pathname) || getCurrentVersion();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md",
          "border transition-colors",
          "hover:bg-accent/10 hover:border-primary/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/20"
        )}
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
          color: "var(--foreground)"
        }}
      >
        <span className="font-medium">{currentVersion.label}</span>
        {currentVersion.deprecated && (
          <AlertTriangle className="h-3 w-3 text-amber-500" />
        )}
        <ChevronDown 
          className={cn(
            "h-3 w-3 transition-transform",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={cn(
            "absolute top-full left-0 mt-1 min-w-[200px]",
            "bg-background/95 backdrop-blur-sm border rounded-md shadow-lg z-20",
            "py-1"
          )} style={{ borderColor: "var(--border)" }}>
            {versions.map((version) => (
              <button
                key={version.value}
                onClick={() => {
                  setIsOpen(false);
                  // In a real app, this would handle version switching
                  console.log(`Switch to version: ${version.value}`);
                }}
                className={cn(
                  "w-full px-3 py-1.5 text-left text-sm cursor-pointer",
                  "hover:bg-accent/10 transition-colors",
                  version.current && "text-primary font-medium"
                )}
              >
                {version.label}
                {version.current && (
                  <span className="ml-2 text-xs text-muted-foreground cursor-pointer">
                    (current)
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
