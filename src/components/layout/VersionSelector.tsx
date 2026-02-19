"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Version {
  label: string;
  value: string;
  current?: boolean;
}

const versions: Version[] = [
  { label: "v1.0.0", value: "v1.0.0", current: true },
  { label: "v0.9.0", value: "v0.9.0" },
  { label: "v0.8.0", value: "v0.8.0" },
];

export function VersionSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const currentVersion = versions.find(v => v.current) || versions[0];

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
            "absolute top-full left-0 mt-1 min-w-[120px]",
            "bg-background border rounded-md shadow-lg z-20",
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
                  "w-full px-3 py-1.5 text-left text-sm",
                  "hover:bg-accent/10 transition-colors",
                  version.current && "text-primary font-medium"
                )}
              >
                {version.label}
                {version.current && (
                  <span className="ml-2 text-xs text-muted-foreground">
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
