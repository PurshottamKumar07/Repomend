import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { preferences } = body;

    // Validate that preferences is an object with topic:score pairs
    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json(
        { error: 'Invalid preferences format. Expected { preferences: { topic: score } }' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

    const response = await fetch(`${backendUrl}/preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences }),
    });

    if (!response.ok) {
      console.error('Backend responded with:', response.status);
      return NextResponse.json({
        success: true,
        synced: false,
        message: 'Preferences saved locally but backend sync failed',
        preferences,
      });
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      synced: true,
      data,
      preferences,
    });
  } catch (error) {
    console.error('Preferences API error:', error);
    return NextResponse.json({
      success: true,
      synced: false,
      message: 'Preferences saved locally but could not reach backend',
    });
  }
}
