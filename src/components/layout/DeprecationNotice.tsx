"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getVersionByPath } from "@/config/versions";

interface DeprecationNoticeProps {
  className?: string;
}

export function DeprecationNotice({ className }: DeprecationNoticeProps) {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  
  const currentVersion = getVersionByPath(pathname);
  
  if (!isVisible || !currentVersion?.deprecated) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-md",
        "dark:bg-amber-950/20 dark:border-amber-800/50",
        className
      )}
    >
      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          Version {currentVersion.label} is deprecated
        </p>
        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
          {currentVersion.deprecationMessage}
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
      >
        <X className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      </button>
    </div>
  );
}
