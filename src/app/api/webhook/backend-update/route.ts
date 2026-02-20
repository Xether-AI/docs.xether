import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { APIClient } from '@/lib/api-client';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'default-secret';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('x-webhook-signature');
    const body = await request.text();
    
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    
    // Validate payload structure
    if (!payload.type || payload.type !== 'backend.update') {
      return NextResponse.json({ error: 'Invalid webhook type' }, { status: 400 });
    }

    // Revalidate API reference pages
    revalidatePath('/docs/api-reference');
    
    // If version is specified, revalidate version-specific pages
    if (payload.version) {
      revalidatePath(`/docs/api-reference?version=${payload.version}`);
    }

    // Optionally fetch and cache new API spec
    if (payload.fetchNewSpec) {
      try {
        const apiClient = new APIClient(payload.version);
        await apiClient.fetchOpenAPISpec();
      } catch (error) {
        console.error('Failed to fetch new API spec:', error);
        // Don't fail the webhook, just log the error
      }
    }

    return NextResponse.json({ 
      message: 'Documentation updated successfully',
      revalidated: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Backend update webhook endpoint',
    usage: 'POST with x-webhook-signature header and backend.update payload'
  });
}
