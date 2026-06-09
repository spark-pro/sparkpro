import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const rows = await db
      .select({
        id:          jobs.id,
        title:       jobs.title,
        location:    jobs.location,
        experience:  jobs.experience,
        salaryRange: jobs.salaryRange,
        description: jobs.description,
        createdAt:   jobs.createdAt,
      })
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt));

    return NextResponse.json({ jobs: rows });
  } catch (err) {
    console.error('[API] GET /api/jobs:', err);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
