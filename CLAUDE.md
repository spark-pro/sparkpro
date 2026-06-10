# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Spark Pro — a corporate marketing site (Next.js App Router) with a public careers/jobs flow and a private admin dashboard for managing job postings and reviewing applications.

## Commands

```bash
npm run dev      # local dev server (next dev)
npm run build    # drizzle-kit push (sync schema to DB) THEN next build
npm run start    # production server (next start)
```

No test runner or linter is configured. `npm run build` is the de-facto type/integration check — note it pushes the Drizzle schema to whatever DB `POSTGRES_URL`/`DATABASE_URL` points at before building, so don't run it casually against production.

Drizzle workflow: `schema.ts` is the source of truth. `drizzle-kit push` (run by `build`) syncs it directly; `drizzle-kit generate` writes SQL migrations into `database/migrations/`. Config: `drizzle.config.ts` (reads `.env.local`).

## Architecture

**Stack:** Next.js 16 (App Router), React 18, TypeScript (strict), Drizzle ORM + PostgreSQL (Supabase, via `postgres.js`), Tailwind v4, MUI + Radix/shadcn UI, Vercel Blob for file storage. Path alias `@/*` → `src/*`.

**Page pattern:** Files in `src/app/**/page.tsx` are thin Server Components that only set `metadata` and `await params`, then delegate all UI to a `'use client'` component in `src/components/pages/*.tsx` (e.g. `careers/[id]/page.tsx` → `JobDetail`). When adding a page, follow this split — put logic/state in the `components/pages` component, not the route file. Client components fetch data from the API routes (they do not query the DB directly).

**Data layer:** Two files only — `src/lib/db.ts` (single `postgres.js` client + Drizzle instance) and `src/lib/schema.ts` (tables `jobs`, `applications`, the `application_status` pgEnum, and inferred `Job`/`Application` types). `requirements`/`benefits` are `jsonb` string arrays; `is_active` is a native boolean. API routes import `db` and the schema tables and run Drizzle queries directly — keep all DB access inside `src/app/api/**/route.ts`.

**Admin auth (`src/lib/auth.ts`):** Credentials are env-based, not in the DB — `ADMIN_USERNAME` + `ADMIN_PASSWORD_HASH` (bcrypt). Login issues a JWT stored in the `spark_admin_session` HttpOnly cookie (8h TTL). Every protected route guards with `requireAdmin(request)` at the top, which returns a 401 `Response` (return it directly) or `null` to continue. There is no middleware; the guard is per-route.

**Layout:** `app/layout.tsx` forces `className="dark"` and renders `ClientLayout`, which hides the public Header/Footer on `/admin-sparkpro*` routes. Global CSS entry is `src/styles/globals.css`, which imports `fonts`, `tailwind`, `theme`, `cosmos` in order. `src/components/ui/` is shadcn/Radix primitives — reuse these.

**Resume uploads:** Applicants POST multipart to `/api/applications`; the file goes to **Vercel Blob with `access: 'private'`** (blob name embeds applicant name + timestamp + uuid), and the returned URL is stored in `applications.resumeFilename`. Admins download via `/api/admin/resume/[filename]` which auth-checks then proxies the private blob using `BLOB_READ_WRITE_TOKEN`. Allowed types: PDF/DOC/DOCX, max 5 MB.

## Routes

- Public pages: `/`, `/about`, `/services`, `/services/[id]`, `/careers`, `/careers/[id]`, `/contact`
- Admin UI: `/admin-sparkpro` (noindex)
- Public API: `GET /api/jobs`, `GET /api/jobs/[id]`, `POST /api/applications`
- Admin API (all behind `requireAdmin`): `/api/admin/login`, `/api/admin/logout`, `/api/admin/jobs[/[id]]`, `/api/admin/applications[/[id]]`, `/api/admin/stats`, `/api/admin/resume/[filename]`

## Environment

Set in `.env.local` (gitignored): `POSTGRES_URL` (or `DATABASE_URL`), `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and `BLOB_READ_WRITE_TOKEN` (Vercel Blob). The DB connection requires SSL (`ssl: 'require'`).
