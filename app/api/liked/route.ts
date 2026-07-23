import { NextResponse } from 'next/server';

/**
 * GET /api/liked?page=1&limit=12
 *
 * Fetches paginated liked/saved repositories from the backend.
 * Proxies to:  GET {BACKEND_URL}/liked?page={page}&limit={limit}
 *
 * Expected backend response shape:
 *   { data: [...repos], hasMore: boolean }
 *
 * If the backend is unreachable or errors, returns an empty list
 * so the frontend can fall back to the Reload (localStorage) flow.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '12';

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  try {
    const response = await fetch(
      `${backendUrl}/liked?page=${page}&limit=${limit}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error('Backend /liked GET responded with:', response.status);
      return NextResponse.json(
        { data: [], hasMore: false },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Liked GET error:', error);
    return NextResponse.json(
      { data: [], hasMore: false },
      { status: 503 }
    );
  }
}

/**
 * POST /api/liked
 *
 * Syncs the user's liked projects to the backend for persistence.
 * Proxies to:  POST {BACKEND_URL}/liked
 *
 * Expected request body:
 *   { projects: [ { id, title, author, description, stars, forks, topics, link }, ... ] }
 *
 * The backend should store/upsert these projects so they can be
 * retrieved later via GET /liked.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

    const response = await fetch(`${backendUrl}/liked`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Backend /liked POST responded with:', response.status);
      return NextResponse.json(
        { success: false, message: 'Backend sync failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error('Liked POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not reach backend' },
      { status: 503 }
    );
  }
}

/**
 * DELETE /api/liked
 *
 * Removes a single saved project from the backend.
 * Proxies to:  DELETE {BACKEND_URL}/liked
 *
 * Expected request body:
 *   { id: number }
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const projectId = body.id;

    if (!projectId) {
      return NextResponse.json(
        { success: false, message: 'Missing project id' },
        { status: 400 }
      );
    }

    const response = await fetch(`${backendUrl}/liked/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Backend /liked DELETE responded with:', response.status);
      return NextResponse.json(
        { success: false, message: 'Backend delete failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error('Liked DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not reach backend' },
      { status: 503 }
    );
  }
}
