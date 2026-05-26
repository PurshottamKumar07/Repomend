import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

    const response = await fetch(`${backendUrl}/reset`, {
      method: 'POST',
    });

    if (!response.ok) {
      console.error('Backend reset responded with:', response.status);
      return NextResponse.json(
        { error: 'Failed to reset backend' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error('Reset API error:', error);
    return NextResponse.json(
      { error: 'Could not reach backend' },
      { status: 503 }
    );
  }
}
