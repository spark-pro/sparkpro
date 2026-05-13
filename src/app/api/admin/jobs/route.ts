import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs, applications } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { desc, eq, count } from 'drizzle-orm';

export async function GET(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    
    const rows = await db
      .select({
        id:               jobs.id,
        title:            jobs.title,
        location:         jobs.location,
        experience:       jobs.experience,
        salaryRange:      jobs.salaryRange,
        isActive:         jobs.isActive,
        createdAt:        jobs.createdAt,
        updatedAt:        jobs.updatedAt,
        applicationCount: count(applications.id),
      })
      .from(jobs)
      .leftJoin(applications, eq(applications.jobId, jobs.id))
      .groupBy(jobs.id)
      .orderBy(desc(jobs.createdAt));

    return NextResponse.json({ jobs: rows });
  } catch (e) {
    console.error('[Admin] GET /jobs:', e);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    const body = await request.json();
    const { title, location, experience, salary_range, description, requirements, benefits, is_active } = body;

    if (!title || !location || !experience || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.insert(jobs).values({
      title, location, experience,
      salaryRange:  salary_range || null,
      description,
      requirements: JSON.stringify(Array.isArray(requirements) ? requirements : []),
      benefits:     JSON.stringify(Array.isArray(benefits)     ? benefits     : []),
      isActive:     is_active ? 1 : 0,
    });

    return NextResponse.json({ message: 'Job created', id: result[0].insertId }, { status: 201 });
  } catch (e) {
    console.error('[Admin] POST /jobs:', e);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
