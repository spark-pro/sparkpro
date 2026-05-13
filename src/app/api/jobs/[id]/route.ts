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
      .where(and(eq(jobs.id, jobId), eq(jobs.isActive, 1)))
      .limit(1);

    if (!rows.length) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    const job = rows[0];
    const parsed = {
      ...job,
      requirements: safeParseJSON(job.requirements),
      benefits:     safeParseJSON(job.benefits),
    };
    return NextResponse.json({ job: parsed });
  } catch (err) {
    console.error('[API] GET /api/jobs/[id]:', err);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

function safeParseJSON(val: string | null | undefined): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}
