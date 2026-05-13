import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs, applications } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireAdmin(request);
  if (err) return err;

  const { id } = await params;
  const appId  = parseInt(id, 10);
  if (isNaN(appId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const rows = await db
      .select({
        id:                 applications.id,
        jobId:              applications.jobId,
        fullName:           applications.fullName,
        email:              applications.email,
        phone:              applications.phone,
        resumeFilename:     applications.resumeFilename,
        resumeOriginalName: applications.resumeOriginalName,
        resumeSize:         applications.resumeSize,
        resumeMimetype:     applications.resumeMimetype,
        status:             applications.status,
        adminNotes:         applications.adminNotes,
        createdAt:          applications.createdAt,
        jobTitle:           jobs.title,
        location:           jobs.location,
      })
      .from(applications)
      .innerJoin(jobs, eq(applications.jobId, jobs.id))
      .where(eq(applications.id, appId))
      .limit(1);

    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ application: rows[0] });
  } catch (e) {
    console.error('[Admin] GET /applications/[id]:', e);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}

const VALID_STATUSES = ['pending', 'reviewed', 'shortlisted', 'rejected'] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireAdmin(request);
  if (err) return err;

  const { id } = await params;
  const appId  = parseInt(id, 10);
  if (isNaN(appId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const body = await request.json();
    if (body.status && !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updates: Partial<typeof applications.$inferInsert> = {};
    if (body.status      !== undefined) updates.status     = body.status;
    if (body.admin_notes !== undefined) updates.adminNotes = body.admin_notes;

    if (!Object.keys(updates).length) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    await db.update(applications).set(updates).where(eq(applications.id, appId));
    return NextResponse.json({ message: 'Updated' });
  } catch (e) {
    console.error('[Admin] PATCH /applications/[id]:', e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
