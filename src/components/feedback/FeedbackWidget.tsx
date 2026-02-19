"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface FeedbackData {
  page: string;
  helpful: boolean | null;
  comment?: string;
  timestamp: Date;
}

export function FeedbackWidget() {
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pathname = usePathname();

  const handleFeedback = (helpful: boolean) => {
    setFeedback(helpful);
    setShowCommentBox(true);
  };

  const handleSubmit = async () => {
    if (!feedback) return;

    setIsSubmitting(true);
    
    const feedbackData: FeedbackData = {
      page: pathname,
      helpful: feedback,
      comment: comment.trim() || undefined,
      timestamp: new Date(),
    };

    try {
      // Store feedback in localStorage for demo purposes
      const existingFeedback = JSON.parse(localStorage.getItem('docs_feedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('docs_feedback', JSON.stringify(existingFeedback));
      
      // In a real app, this would send to an API
      console.log('Feedback submitted:', feedbackData);
      
      setSubmitted(true);
      setShowCommentBox(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
        <span>Thank you for your feedback!</span>
      </div>
    );
  }

  return (
    <div className="border-t pt-6 mt-8" style={{ borderColor: "var(--border)" }}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Was this helpful?</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleFeedback(true)}
            disabled={feedback !== null}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
              "border hover:bg-accent/10",
              feedback === true
                ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800/50 dark:text-green-400"
                : "border-border hover:border-primary/50",
              feedback !== null && "opacity-50 cursor-not-allowed"
            )}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Yes</span>
          </button>
          
          <button
            onClick={() => handleFeedback(false)}
            disabled={feedback !== null}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
              "border hover:bg-accent/10",
              feedback === false
                ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-800/50 dark:text-red-400"
                : "border-border hover:border-primary/50",
              feedback !== null && "opacity-50 cursor-not-allowed"
            )}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>No</span>
          </button>
        </div>

        {showCommentBox && (
          <div className="flex flex-col gap-3 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {feedback ? "What did you like?" : "What could be improved?"}
              </span>
            </div>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional: Share your thoughts..."
              className="w-full px-3 py-2 text-sm border rounded-md resize-none h-20"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)"
              }}
            />
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
              </button>
              
              <button
                onClick={() => setShowCommentBox(false)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
