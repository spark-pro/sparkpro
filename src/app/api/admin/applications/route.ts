import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs, applications } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { and, desc, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    const { searchParams } = new URL(request.url);
    const jobIdParam = searchParams.get('job_id');
    const statusParam = searchParams.get('status');

    

    const conditions = [];
    if (jobIdParam) conditions.push(eq(applications.jobId, parseInt(jobIdParam, 10)));
    if (statusParam) conditions.push(eq(applications.status, statusParam as 'pending' | 'reviewed' | 'shortlisted' | 'rejected'));

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
        status:             applications.status,
        adminNotes:         applications.adminNotes,
        createdAt:          applications.createdAt,
        jobTitle:           jobs.title,
      })
      .from(applications)
      .innerJoin(jobs, eq(applications.jobId, jobs.id))
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(applications.createdAt));

    return NextResponse.json({ applications: rows });
  } catch (e) {
    console.error('[Admin] GET /applications:', e);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
