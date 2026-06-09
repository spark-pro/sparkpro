import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs, applications } from '@/lib/schema';
import { and, eq } from 'drizzle-orm';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const jobId    = parseInt(formData.get('job_id') as string, 10);
    const fullName = (formData.get('full_name') as string || '').trim();
    const email    = (formData.get('email')     as string || '').trim().toLowerCase();
    const phone    = (formData.get('phone')     as string || '').trim();

    if (!jobId || isNaN(jobId) || !fullName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const job = await db
      .select({ id: jobs.id })
      .from(jobs)
      .where(and(eq(jobs.id, jobId), eq(jobs.isActive, true)))
      .limit(1);

    if (!job.length) {
      return NextResponse.json({ error: 'Job not found or no longer active' }, { status: 404 });
    }

    // Resume upload
    let resumeFilename:     string | null = null;
    let resumeOriginalName: string | null = null;
    let resumeSize:         number | null = null;
    let resumeMimetype:     string | null = null;

    const file = formData.get('resume') as File | null;
    if (file && file.size > 0) {
      if (!ALLOWED_MIME.has(file.type)) {
        return NextResponse.json({ error: 'Resume must be PDF, DOC, or DOCX' }, { status: 400 });
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: 'Resume must be under 5 MB' }, { status: 400 });
      }
      const ext       = path.extname(file.name) || '.pdf';
      resumeFilename  = `${uuidv4()}${ext}`;
      const uploadDir = path.join(process.cwd(), 'private', 'resumes');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, resumeFilename), Buffer.from(await file.arrayBuffer()));
      resumeOriginalName = file.name;
      resumeSize         = file.size;
      resumeMimetype     = file.type;
    }

    await db.insert(applications).values({
      jobId, fullName, email, phone,
      resumeFilename, resumeOriginalName, resumeSize, resumeMimetype,
    });

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 201 });
  } catch (err) {
    console.error('[API] POST /api/applications:', err);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
