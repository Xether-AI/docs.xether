"use client";

import { useState } from "react";
import { FeedbackAnalytics } from "@/components/feedback/FeedbackAnalytics";
import { BarChart3, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeedbackAnalyticsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // In a real app, this would fetch data from API and export as CSV/JSON
    const feedbackData = JSON.parse(localStorage.getItem('docs_feedback') || '[]');
    const dataStr = JSON.stringify(feedbackData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `feedback-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="h-8 w-8" />
            Feedback Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and analyze user feedback across all documentation pages
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm border rounded-md",
              "hover:bg-accent/10 transition-colors",
              "disabled:opacity-50"
            )}
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)"
            }}
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      <FeedbackAnalytics />
      
      <div className="mt-8 border rounded-lg p-6" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-xl font-semibold mb-4">About This Analytics</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            This analytics dashboard shows feedback collected from users across all documentation pages.
            The data helps identify which pages are most helpful and where improvements are needed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <strong>Green indicators (70%+):</strong> Pages that users find very helpful
            </div>
            <div>
              <strong>Yellow indicators (50-69%):</strong> Pages that need some improvement
            </div>
            <div>
              <strong>Red indicators (&lt;50%):</strong> Pages that need significant improvement
            </div>
            <div>
              <strong>Comments:</strong> Qualitative feedback from users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
