import { NextRequest, NextResponse } from "next/server";

export interface FeedbackRequest {
  page: string;
  helpful: boolean;
  comment?: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

export async function POST(request: NextRequest) {
  try {
    const feedback: FeedbackRequest = await request.json();
    
    // Validate the request
    if (!feedback.page || typeof feedback.helpful !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid feedback data' },
        { status: 400 }
      );
    }

    // Add additional metadata
    const enrichedFeedback = {
      ...feedback,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown',
      timestamp: new Date().toISOString(),
    };

    // In a real application, you would:
    // 1. Store this in a database (PostgreSQL, MongoDB, etc.)
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Trigger notifications for negative feedback
    // 4. Store in a queue for processing
    
    // For demo purposes, we'll just log it
    console.log('Feedback received:', enrichedFeedback);
    
    // Simulate database storage
    // await db.feedback.create({ data: enrichedFeedback });
    
    // Simulate analytics tracking
    // await analytics.track('docs_feedback', enrichedFeedback);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Feedback submitted successfully',
        id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    // In a real application, you would query your database
    // For demo purposes, we'll return mock data
    
    const mockAnalytics = {
      total: 42,
      helpful: 35,
      notHelpful: 7,
      helpfulPercentage: 83,
      recentComments: [
        {
          page: '/docs/getting-started/introduction',
          helpful: true,
          comment: 'Great introduction!',
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          page: '/docs/api-reference/authentication',
          helpful: false,
          comment: 'Could use more examples',
          timestamp: '2024-01-15T09:15:00Z'
        }
      ]
    };
    
    if (page) {
      // Filter analytics for specific page
      const pageAnalytics = {
        ...mockAnalytics,
        total: Math.floor(Math.random() * 20) + 5,
        helpful: Math.floor(Math.random() * 15) + 3,
        notHelpful: Math.floor(Math.random() * 5) + 1,
      };
      pageAnalytics.helpfulPercentage = Math.round((pageAnalytics.helpful / pageAnalytics.total) * 100);
      
      return NextResponse.json(pageAnalytics);
    }
    
    return NextResponse.json(mockAnalytics);
    
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
