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
