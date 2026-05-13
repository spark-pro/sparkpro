import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireAdmin(request);
  if (err) return err;

  const { id } = await params;
  const jobId  = parseInt(id, 10);
  if (isNaN(jobId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    
    const rows = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const job = rows[0];
    return NextResponse.json({
      job: {
        ...job,
        requirements: safeParseJSON(job.requirements),
        benefits:     safeParseJSON(job.benefits),
      },
    });
  } catch (e) {
    console.error('[Admin] GET /jobs/[id]:', e);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireAdmin(request);
  if (err) return err;

  const { id } = await params;
  const jobId  = parseInt(id, 10);
  if (isNaN(jobId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const body = await request.json();
    const { title, location, experience, salary_range, description, requirements, benefits, is_active } = body;

    if (!title || !location || !experience || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.update(jobs).set({
      title, location, experience,
      salaryRange:  salary_range || null,
      description,
      requirements: JSON.stringify(Array.isArray(requirements) ? requirements : []),
      benefits:     JSON.stringify(Array.isArray(benefits)     ? benefits     : []),
      isActive:     is_active ? 1 : 0,
    }).where(eq(jobs.id, jobId));

    return NextResponse.json({ message: 'Job updated' });
  } catch (e) {
    console.error('[Admin] PUT /jobs/[id]:', e);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireAdmin(request);
  if (err) return err;

  const { id } = await params;
  const jobId  = parseInt(id, 10);
  if (isNaN(jobId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    
    await db.delete(jobs).where(eq(jobs.id, jobId));
    return NextResponse.json({ message: 'Job deleted' });
  } catch (e) {
    console.error('[Admin] DELETE /jobs/[id]:', e);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}

function safeParseJSON(val: string | null | undefined): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}
