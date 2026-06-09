# MySQL → PostgreSQL (Supabase) Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the MySQL/mysql2 database layer with PostgreSQL on Supabase using postgres.js and drizzle-orm/pg-core, with schema upgrades (boolean, jsonb, pgEnum).

**Architecture:** Drop-in dialect swap — `src/lib/db.ts` and `src/lib/schema.ts` are the only structural changes. All API routes need targeted fixes for MySQL-specific values (tinyint booleans, JSON.stringify, insertId). No data migration — fresh schema push to Supabase via `drizzle-kit push`.

**Tech Stack:** Next.js 15, Drizzle ORM 0.45, postgres.js, Supabase (PostgreSQL), drizzle-kit

---

## Task 1: Swap Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove mysql2, add postgres**

Run in the project root:

```bash
npm uninstall mysql2
npm install postgres
```

- [ ] **Step 2: Verify install**

Run:
```bash
node -e "require('postgres'); console.log('postgres.js ok')"
```
Expected output: `postgres.js ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap mysql2 for postgres.js"
```

---

## Task 2: Rewrite Schema (`src/lib/schema.ts`)

**Files:**
- Modify: `src/lib/schema.ts`

- [ ] **Step 1: Replace the entire file contents**

```typescript
import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core';

export const applicationStatusEnum = pgEnum('application_status', [
  'pending', 'reviewed', 'shortlisted', 'rejected',
]);

export const jobs = pgTable('jobs', {
  id:           serial('id').primaryKey(),
  title:        varchar('title',        { length: 255 }).notNull(),
  location:     varchar('location',     { length: 150 }).notNull(),
  experience:   varchar('experience',   { length: 100 }).notNull(),
  salaryRange:  varchar('salary_range', { length: 100 }),
  description:  text('description').notNull(),
  requirements: jsonb('requirements').$type<string[]>().notNull().default([]),
  benefits:     jsonb('benefits').$type<string[]>().default([]),
  isActive:     boolean('is_active').notNull().default(true),
  createdAt:    timestamp('created_at').defaultNow(),
  updatedAt:    timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});

export const applications = pgTable('applications', {
  id:                 serial('id').primaryKey(),
  jobId:              integer('job_id').notNull(),
  fullName:           varchar('full_name',            { length: 100 }).notNull(),
  email:              varchar('email',                { length: 255 }).notNull(),
  phone:              varchar('phone',                { length: 25  }).notNull(),
  resumeFilename:     varchar('resume_filename',      { length: 255 }),
  resumeOriginalName: varchar('resume_original_name', { length: 255 }),
  resumeSize:         integer('resume_size'),
  resumeMimetype:     varchar('resume_mimetype',      { length: 100 }),
  status:             applicationStatusEnum('status').notNull().default('pending'),
  adminNotes:         text('admin_notes'),
  createdAt:          timestamp('created_at').defaultNow(),
});

export type Job            = typeof jobs.$inferSelect;
export type NewJob         = typeof jobs.$inferInsert;
export type Application    = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors (or only pre-existing unrelated errors).

- [ ] **Step 3: Commit**

```bash
git add src/lib/schema.ts
git commit -m "feat: migrate schema to pg-core (boolean, jsonb, pgEnum, serial)"
```

---

## Task 3: Rewrite DB Connection (`src/lib/db.ts`)

**Files:**
- Modify: `src/lib/db.ts`

- [ ] **Step 1: Replace the entire file contents**

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/db.ts
git commit -m "feat: switch db connection to postgres.js with DATABASE_URL"
```

---

## Task 4: Update Drizzle Config (`drizzle.config.ts`)

**Files:**
- Modify: `drizzle.config.ts`

- [ ] **Step 1: Replace the entire file contents**

```typescript
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema:    './src/lib/schema.ts',
  out:       './database/migrations',
  dialect:   'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

- [ ] **Step 2: Commit**

```bash
git add drizzle.config.ts
git commit -m "chore: update drizzle config to postgresql dialect"
```

---

## Task 5: Update `.env.local` with Supabase DATABASE_URL

**Files:**
- Modify: `.env.local` (not committed — manual step)

- [ ] **Step 1: Get your Supabase connection string**

In Supabase dashboard:
1. Go to your project → **Settings** → **Database**
2. Under **Connection string**, select **URI** tab
3. Copy the string — it looks like:
   `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
   
   Use the **Session mode** pooler string (port 6543) for Next.js serverless compatibility.

- [ ] **Step 2: Update `.env.local`**

Remove these lines:
```
DB_HOST=...
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
DB_SSL=true
```

Add this line:
```
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

Replace `[password]` with your actual Supabase database password.

> Note: `.env.local` is gitignored — do not commit it.

---

## Task 6: Push Schema to Supabase

**Files:** None (drizzle-kit operation)

- [ ] **Step 1: Run schema push**

```bash
npm run db:push
```

Expected output (Drizzle will prompt to confirm):
```
[✓] Changes applied:
  - Created table `jobs`
  - Created table `applications`
  - Created enum `application_status`
```

If prompted "Are you sure?", type `yes`.

- [ ] **Step 2: Verify tables in Supabase**

In Supabase dashboard → **Table Editor** — you should see `jobs` and `applications` tables with correct columns.

---

## Task 7: Fix Public API Routes (Boolean + jsonb)

**Files:**
- Modify: `src/app/api/jobs/route.ts`
- Modify: `src/app/api/jobs/[id]/route.ts`
- Modify: `src/app/api/applications/route.ts`

- [ ] **Step 1: Update `src/app/api/jobs/route.ts`**

Change line 21 — replace `eq(jobs.isActive, 1)` with `eq(jobs.isActive, true)`:

```typescript
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
```

- [ ] **Step 2: Update `src/app/api/jobs/[id]/route.ts`**

Boolean fix + remove `safeParseJSON` (jsonb returns arrays natively):

```typescript
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
```

- [ ] **Step 3: Update `src/app/api/applications/route.ts`**

Change line 36 — replace `eq(jobs.isActive, 1)` with `eq(jobs.isActive, true)`:

```typescript
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
const MAX_SIZE = 5 * 1024 * 1024;

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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/jobs/route.ts src/app/api/jobs/[id]/route.ts src/app/api/applications/route.ts
git commit -m "fix: update public routes for postgres boolean and jsonb"
```

---

## Task 8: Fix Admin Jobs Routes

**Files:**
- Modify: `src/app/api/admin/jobs/route.ts`
- Modify: `src/app/api/admin/jobs/[id]/route.ts`

- [ ] **Step 1: Update `src/app/api/admin/jobs/route.ts`**

Changes: boolean, remove `JSON.stringify`, use `.returning()` for insert ID:

```typescript
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
      requirements: Array.isArray(requirements) ? requirements : [],
      benefits:     Array.isArray(benefits)     ? benefits     : [],
      isActive:     Boolean(is_active),
    }).returning({ id: jobs.id });

    return NextResponse.json({ message: 'Job created', id: result[0].id }, { status: 201 });
  } catch (e) {
    console.error('[Admin] POST /jobs:', e);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Update `src/app/api/admin/jobs/[id]/route.ts`**

Changes: boolean, remove `JSON.stringify`, remove `safeParseJSON` (jsonb returns arrays natively):

```typescript
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

    return NextResponse.json({ job: rows[0] });
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
      requirements: Array.isArray(requirements) ? requirements : [],
      benefits:     Array.isArray(benefits)     ? benefits     : [],
      isActive:     Boolean(is_active),
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
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/jobs/route.ts src/app/api/admin/jobs/[id]/route.ts
git commit -m "fix: update admin jobs routes for postgres (boolean, jsonb, returning)"
```

---

## Task 9: Fix Admin Stats Route

**Files:**
- Modify: `src/app/api/admin/stats/route.ts`

- [ ] **Step 1: Update `src/app/api/admin/stats/route.ts`**

Change `eq(jobs.isActive, 1)` → `eq(jobs.isActive, true)`:

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/stats/route.ts
git commit -m "fix: update stats route for postgres boolean"
```

---

## Task 10: Update Reference SQL File

**Files:**
- Modify: `database/schema.sql`

- [ ] **Step 1: Replace the entire file with Postgres DDL**

```sql
-- ============================================================
--  Spark Pro Database Schema — PostgreSQL (Supabase)
--  For reference only. Schema is managed via drizzle-kit push.
-- ============================================================

CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'rejected');

CREATE TABLE IF NOT EXISTS jobs (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  location     VARCHAR(150) NOT NULL,
  experience   VARCHAR(100) NOT NULL,
  salary_range VARCHAR(100),
  description  TEXT         NOT NULL,
  requirements JSONB        NOT NULL DEFAULT '[]',
  benefits     JSONB                 DEFAULT '[]',
  is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMP             DEFAULT NOW(),
  updated_at   TIMESTAMP             DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id                   SERIAL PRIMARY KEY,
  job_id               INTEGER      NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  full_name            VARCHAR(100) NOT NULL,
  email                VARCHAR(255) NOT NULL,
  phone                VARCHAR(25)  NOT NULL,
  resume_filename      VARCHAR(255),
  resume_original_name VARCHAR(255),
  resume_size          INTEGER,
  resume_mimetype      VARCHAR(100),
  status               application_status NOT NULL DEFAULT 'pending',
  admin_notes          TEXT,
  created_at           TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_active   ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_apps_job      ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_apps_status   ON applications(status);
CREATE INDEX IF NOT EXISTS idx_apps_email    ON applications(email);
```

- [ ] **Step 2: Commit**

```bash
git add database/schema.sql
git commit -m "docs: update schema.sql to postgres DDL"
```

---

## Task 11: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```
Expected: server starts on `http://localhost:3000` with no startup errors in terminal.

- [ ] **Step 3: Verify public jobs API**

Open in browser or run:
```bash
curl http://localhost:3000/api/jobs
```
Expected: `{ "jobs": [...] }` — returns array (empty `[]` is fine if no jobs added yet).

- [ ] **Step 4: Verify admin login and dashboard**

1. Navigate to `http://localhost:3000/admin-sparkpro`
2. Log in with admin credentials
3. Admin dashboard loads — stats show zeros (fresh DB)
4. Create a job via the admin UI — should succeed and appear in the list
5. Open the job — `requirements` and `benefits` fields should render as arrays correctly
6. Navigate to `http://localhost:3000/careers` — new job should appear

- [ ] **Step 5: Verify job application submission**

1. Click on the job in the careers page
2. Fill in the application form and submit
3. Check admin Applications tab — application appears with status "pending"
4. Update status to "shortlisted" — should save correctly

- [ ] **Step 6: Verify stats**

Admin dashboard stats should show:
- `total_jobs: 1`, `active_jobs: 1` (or whatever you created)
- `total_applications: 1`, `pending_applications: 0`, `shortlisted: 1`
