CREATE TYPE "public"."application_status" AS ENUM('pending', 'reviewed', 'shortlisted', 'rejected');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(25) NOT NULL,
	"resume_filename" varchar(255),
	"resume_original_name" varchar(255),
	"resume_size" integer,
	"resume_mimetype" varchar(100),
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"admin_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"location" varchar(150) NOT NULL,
	"experience" varchar(100) NOT NULL,
	"salary_range" varchar(100),
	"description" text NOT NULL,
	"requirements" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"benefits" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;