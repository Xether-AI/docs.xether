"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackData {
  page: string;
  helpful: boolean;
  comment?: string;
  timestamp: Date;
}

interface PageAnalytics {
  page: string;
  total: number;
  helpful: number;
  notHelpful: number;
  helpfulPercentage: number;
  comments: number;
}

export function FeedbackAnalytics() {
  const [analytics, setAnalytics] = useState<PageAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = () => {
      try {
        const feedbackData = JSON.parse(localStorage.getItem('docs_feedback') || '[]');
        
        // Group feedback by page
        const pageMap = new Map<string, FeedbackData[]>();
        
        feedbackData.forEach((feedback: FeedbackData) => {
          if (!pageMap.has(feedback.page)) {
            pageMap.set(feedback.page, []);
          }
          pageMap.get(feedback.page)!.push(feedback);
        });

        // Calculate analytics for each page
        const pageAnalytics: PageAnalytics[] = Array.from(pageMap.entries()).map(([page, feedbacks]) => {
          const total = feedbacks.length;
          const helpful = feedbacks.filter(f => f.helpful).length;
          const notHelpful = feedbacks.filter(f => !f.helpful).length;
          const comments = feedbacks.filter(f => f.comment && f.comment.trim()).length;
          const helpfulPercentage = total > 0 ? Math.round((helpful / total) * 100) : 0;

          return {
            page,
            total,
            helpful,
            notHelpful,
            helpfulPercentage,
            comments,
          };
        });

        // Sort by total feedback count (descending)
        pageAnalytics.sort((a, b) => b.total - a.total);
        
        setAnalytics(pageAnalytics);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (analytics.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No feedback data available yet.</p>
      </div>
    );
  }

  const totalFeedback = analytics.reduce((sum, page) => sum + page.total, 0);
  const totalHelpful = analytics.reduce((sum, page) => sum + page.helpful, 0);
  const overallHelpfulPercentage = totalFeedback > 0 ? Math.round((totalHelpful / totalFeedback) * 100) : 0;
  const totalComments = analytics.reduce((sum, page) => sum + page.comments, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Total Feedback</span>
          </div>
          <div className="text-2xl font-bold">{totalFeedback}</div>
        </div>
        
        <div className="border rounded-lg p-4" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Helpful</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{totalHelpful}</div>
        </div>
        
        <div className="border rounded-lg p-4" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium">Not Helpful</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{totalFeedback - totalHelpful}</div>
        </div>
        
        <div className="border rounded-lg p-4" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Comments</span>
          </div>
          <div className="text-2xl font-bold">{totalComments}</div>
        </div>
      </div>

      {/* Overall Helpfulness */}
      <div className="border rounded-lg p-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-lg font-semibold mb-2">Overall Helpfulness</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className={cn(
                  "h-4 rounded-full transition-all duration-300",
                  overallHelpfulPercentage >= 70 ? "bg-green-600" :
                  overallHelpfulPercentage >= 50 ? "bg-yellow-600" : "bg-red-600"
                )}
                style={{ width: `${overallHelpfulPercentage}%` }}
              ></div>
            </div>
          </div>
          <span className="text-lg font-bold">{overallHelpfulPercentage}%</span>
        </div>
      </div>

      {/* Page-by-Page Analytics */}
      <div className="border rounded-lg p-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-lg font-semibold mb-4">Page Analytics</h3>
        <div className="space-y-3">
          {analytics.map((page) => (
            <div key={page.page} className="border-b pb-3 last:border-b-0" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{page.page}</span>
                  <span className="text-xs text-muted-foreground">({page.total} responses)</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600">{page.helpful} helpful</span>
                  <span className="text-red-600">{page.notHelpful} not helpful</span>
                  {page.comments > 0 && (
                    <span className="text-muted-foreground">{page.comments} comments</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        page.helpfulPercentage >= 70 ? "bg-green-600" :
                        page.helpfulPercentage >= 50 ? "bg-yellow-600" : "bg-red-600"
                      )}
                      style={{ width: `${page.helpfulPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs font-medium w-12 text-right">{page.helpfulPercentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
