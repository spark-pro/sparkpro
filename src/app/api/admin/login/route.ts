import { NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminToken, buildAuthCookie } from '@/lib/auth';

// POST /api/admin/login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body as { username: string; password: string };

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const valid = await verifyAdminCredentials(username, password);
    if (!valid) {
      // Consistent delay to prevent timing attacks
      await new Promise(r => setTimeout(r, 500));
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token  = createAdminToken(username);
    const cookie = buildAuthCookie(token);

    return new Response(
      JSON.stringify({ message: 'Login successful' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie,
        },
      }
    );
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
