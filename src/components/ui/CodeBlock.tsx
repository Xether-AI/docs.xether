"use client";

import { useState } from "react";
import { Check, Copy, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  className?: string;
  tabs?: { name: string; code: string; language: string }[];
  diff?: {
    old: string;
    new: string;
    language?: string;
  };
}

export function CodeBlock({
  code,
  language = "text",
  filename,
  highlightLines = [],
  className,
  tabs,
  diff,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleCopy = async (textToCopy?: string) => {
    const content = textToCopy || (tabs ? tabs[activeTab].code : diff ? diff.new : code);
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCodeContent = (content: string, lang: string, highlights: number[] = []) => {
    const lines = content.split('\n');
    
    return (
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className={`language-${lang}`}>
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = highlights.includes(lineNumber);
            
            return (
              <div
                key={index}
                className={cn(
                  "block",
                  isHighlighted && "bg-primary/10 border-l-2 border-primary pl-3 -ml-3"
                )}
                style={{
                  backgroundColor: isHighlighted ? "var(--primary)/0.1" : undefined,
                }}
              >
                {line || ' '}
              </div>
            );
          })}
        </code>
      </pre>
    );
  };

  const renderDiff = () => {
    const oldLines = diff!.old.split('\n');
    const newLines = diff!.new.split('\n');
    
    return (
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className={`language-${diff!.language || 'diff'}`}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-mono mb-2 text-red-400">Old Version</div>
              {oldLines.map((line, index) => (
                <div key={index} className="text-red-400">
                  {line || ' '}
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-mono mb-2 text-green-400">New Version</div>
              {newLines.map((line, index) => (
                <div key={index} className="text-green-400">
                  {line || ' '}
                </div>
              ))}
            </div>
          </div>
        </code>
      </pre>
    );
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
          {diff ? (
            <div className="flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5" style={{ color: "var(--muted-foreground)" }} />
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: "var(--muted-foreground)" }}
              >
                Diff
              </span>
            </div>
          ) : tabs && tabs.length > 0 ? (
            <div className="flex items-center gap-1">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "px-2 py-1 text-xs font-mono rounded transition-all",
                    activeTab === index
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          ) : (
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: "var(--muted-foreground)" }}
            >
              {filename || language}
            </span>
          )}
        </div>
        <button
          onClick={() => handleCopy()}
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
      {diff ? (
        renderDiff()
      ) : tabs && tabs.length > 0 ? (
        renderCodeContent(tabs[activeTab].code, tabs[activeTab].language, highlightLines)
      ) : (
        renderCodeContent(code, language, highlightLines)
      )}
    </div>
  );
}
