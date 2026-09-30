import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hrChecks } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    const status = new URL(request.url).searchParams.get('status');
    const rows = await db
      .select()
      .from(hrChecks)
      .where(status ? eq(hrChecks.status, status) : undefined)
      .orderBy(desc(hrChecks.createdAt));
    return NextResponse.json({ hrChecks: rows });
  } catch (e) {
    console.error('[Admin] GET /hr-checks:', e);
    return NextResponse.json({ error: 'Failed to fetch HR check requests' }, { status: 500 });
  }
}
