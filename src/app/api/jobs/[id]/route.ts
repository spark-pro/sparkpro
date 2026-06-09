import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { and, eq } from 'drizzle-orm';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jobId  = parseInt(id, 10);
  if (isNaN(jobId)) return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });

  try {
    const rows = await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, jobId), eq(jobs.isActive, true)))
      .limit(1);

    if (!rows.length) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    return NextResponse.json({ job: rows[0] });
  } catch (err) {
    console.error('[API] GET /api/jobs/[id]:', err);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}
