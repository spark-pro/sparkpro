# MySQL → PostgreSQL (Supabase) Migration Design

**Date:** 2026-06-09  
**Status:** Approved

---

## Overview

Migrate Spark Pro's database layer from MySQL (mysql2 + drizzle-orm/mysql-core) to PostgreSQL hosted on Supabase (postgres.js + drizzle-orm/pg-core). No data migration required — fresh schema push to Supabase. Three schema improvements are included: `is_active` becomes a native boolean, `requirements` and `benefits` become `jsonb`, and `updatedAt` uses `.$onUpdateFn` instead of the MySQL-only `.onUpdateNow()`.

---

## Architecture

No structural change to the application. The DB layer is isolated in `src/lib/db.ts` and `src/lib/schema.ts`. All changes stay within those two files and the API routes that contain MySQL-specific query values (`1`/`0` for booleans, `JSON.stringify`, `insertId`).

Connection: Single `DATABASE_URL` env var (Supabase connection string) replaces the 6 current MySQL env vars (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL`).

---

## Schema Changes (`src/lib/schema.ts`)

| Column | MySQL type | Postgres type | Reason |
|---|---|---|---|
| `jobs.id`, `applications.id` | `int().autoincrement()` | `serial()` | Postgres idiom for auto-increment PK |
| `jobs.is_active` | `tinyint` (0/1) | `boolean` | Native Postgres boolean |
| `jobs.requirements` | `text` (JSON string) | `jsonb` | Native JSON — no more stringify/parse |
| `jobs.benefits` | `text` (JSON string) | `jsonb` | Native JSON — no more stringify/parse |
| `jobs.updated_at` | `.onUpdateNow()` | `.$onUpdateFn(() => new Date())` | MySQL-only method; Drizzle's portable equivalent |
| `applications.status` | `mysqlEnum` | `pgEnum` | Postgres native enum type |

All imports switch from `drizzle-orm/mysql-core` → `drizzle-orm/pg-core`.

---

## Dependency Changes (`package.json`)

- **Remove:** `mysql2`
- **Add:** `postgres` (postgres.js — Supabase's recommended driver for Drizzle)

---

## Connection Layer (`src/lib/db.ts`)

```
Before: drizzle(mysql2.createPool({host, port, user, password, database, ...}))
After:  drizzle(postgres(process.env.DATABASE_URL!), { schema })
```

No pool configuration needed — postgres.js handles this automatically.

---

## Drizzle Config (`drizzle.config.ts`)

- `dialect: 'mysql'` → `dialect: 'postgresql'`
- Individual credential fields → `url: process.env.DATABASE_URL`

---

## API Route Changes

### Boolean fixes (6 places across 4 files)
`eq(jobs.isActive, 1)` → `eq(jobs.isActive, true)`  
`isActive: is_active ? 1 : 0` → `isActive: Boolean(is_active)`

Files: `api/jobs/route.ts`, `api/jobs/[id]/route.ts`, `api/applications/route.ts`, `api/admin/jobs/route.ts`, `api/admin/jobs/[id]/route.ts`, `api/admin/stats/route.ts`

### jsonb cleanup (3 places)
- Remove `JSON.stringify(requirements)` / `JSON.stringify(benefits)` — pass arrays directly
- Remove `safeParseJSON()` helpers and their call sites — `jsonb` columns return already-parsed arrays

Files: `api/admin/jobs/route.ts`, `api/admin/jobs/[id]/route.ts`, `api/jobs/[id]/route.ts`

### Insert return value (1 place)
MySQL `result[0].insertId` → Postgres `.returning({ id: jobs.id })` pattern  
File: `api/admin/jobs/route.ts`

---

## Environment Variables

Replace in `.env.local`:

```
# Remove these:
DB_HOST=...
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
DB_SSL=true

# Add this (from Supabase project → Settings → Database → Connection string):
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/[dbname]
```

---

## Database SQL Reference (`database/schema.sql`)

Rewrite as Postgres DDL (remove MySQL backticks, ENGINE=InnoDB, CHARSET, TINYINT, ENUM inline syntax). For documentation purposes only — actual schema is pushed via `drizzle-kit push`.

---

## Completion Criteria

- `npm run db:push` runs without error against Supabase
- All API routes return correct responses
- Admin dashboard loads jobs and applications
- Job application submission works end-to-end
- `is_active` filters work correctly with boolean values
- `requirements` and `benefits` return as arrays without manual parsing
