"use client";

import { Github, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface EditOnGitHubProps {
  className?: string;
}

export function EditOnGitHub({ className }: EditOnGitHubProps) {
  const pathname = usePathname();
  
  // Convert the current pathname to a GitHub file path
  // This assumes the docs are stored in a specific structure in the repo
  const getGitHubUrl = () => {
    // Remove the /docs prefix and add .md extension
    const docsPath = pathname.replace(/^\/docs\/?/, '');
    const versionPath = docsPath.startsWith('v') ? docsPath : `v1.0.0/${docsPath}`;
    const filePath = versionPath ? `${versionPath}.md` : 'index.md';
    
    // GitHub repo URL - replace with your actual repo
    const baseUrl = "https://github.com/your-org/xether-ai-docs";
    const branch = "main";
    const fullPath = `docs/src/content/${filePath}`;
    
    return `${baseUrl}/edit/${branch}/${fullPath}`;
  };

  const githubUrl = getGitHubUrl();

  return (
    <div className={cn("flex items-center justify-between py-4 border-t", className)} style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Github className="h-4 w-4" />
        <span>Found an issue? Want to contribute?</span>
      </div>
      
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:bg-accent/10 transition-colors"
        style={{
          borderColor: "var(--border)",
          color: "var(--foreground)"
        }}
      >
        <Github className="h-4 w-4" />
        <span>Edit on GitHub</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
