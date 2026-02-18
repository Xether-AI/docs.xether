"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlock({
  code,
  language = "text",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative my-4 overflow-hidden rounded-lg border",
        className,
      )}
      style={{ borderColor: "var(--border)", background: "rgba(0,0,0,0.35)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          {filename ? (
            <span
              className="text-xs font-mono"
              style={{ color: "var(--muted-foreground)" }}
            >
              {filename}
            </span>
          ) : (
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: "var(--muted-foreground)" }}
            >
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-all"
          style={{
            color: copied ? "var(--primary)" : "var(--muted-foreground)",
          }}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
