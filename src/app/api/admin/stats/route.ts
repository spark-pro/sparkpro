import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs, applications } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { count, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    const [
      [{ total_jobs }],
      [{ active_jobs }],
      [{ total_applications }],
      [{ pending_applications }],
      [{ shortlisted }],
    ] = await Promise.all([
      db.select({ total_jobs:           count() }).from(jobs),
      db.select({ active_jobs:          count() }).from(jobs).where(eq(jobs.isActive, true)),
      db.select({ total_applications:   count() }).from(applications),
      db.select({ pending_applications: count() }).from(applications).where(eq(applications.status, 'pending')),
      db.select({ shortlisted:          count() }).from(applications).where(eq(applications.status, 'shortlisted')),
    ]);

    return NextResponse.json({ stats: { total_jobs, active_jobs, total_applications, pending_applications, shortlisted } });
  } catch (e) {
    console.error('[Admin] GET /stats:', e);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
