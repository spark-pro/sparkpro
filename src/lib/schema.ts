import {
  pgSchema,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

export const sparkSchema = pgSchema('spark');

export const applicationStatusEnum = sparkSchema.enum('application_status', [
  'pending', 'reviewed', 'shortlisted', 'rejected',
]);

export const jobs = sparkSchema.table('jobs', {
  id:           serial('id').primaryKey(),
  title:        varchar('title',        { length: 255 }).notNull(),
  location:     varchar('location',     { length: 150 }).notNull(),
  experience:   varchar('experience',   { length: 100 }).notNull(),
  salaryRange:  varchar('salary_range', { length: 100 }),
  description:  text('description').notNull(),
  requirements: jsonb('requirements').$type<string[]>().notNull().default([]),
  benefits:     jsonb('benefits').$type<string[]>().default([]),
  isActive:     boolean('is_active').notNull().default(true),
  createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdateFn(() => new Date()),
});

export const applications = sparkSchema.table('applications', {
  id:                 serial('id').primaryKey(),
  jobId:              integer('job_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  fullName:           varchar('full_name',            { length: 100 }).notNull(),
  email:              varchar('email',                { length: 255 }).notNull(),
  phone:              varchar('phone',                { length: 25  }).notNull(),
  resumeFilename:     text('resume_filename'),
  resumeOriginalName: varchar('resume_original_name', { length: 255 }),
  resumeSize:         integer('resume_size'),
  resumeMimetype:     varchar('resume_mimetype',      { length: 100 }),
  status:             applicationStatusEnum('status').notNull().default('pending'),
  adminNotes:         text('admin_notes'),
  createdAt:          timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Job            = typeof jobs.$inferSelect;
export type NewJob         = typeof jobs.$inferInsert;
export type Application    = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

// "Request Your HR Independence Check" form submissions (Contact page).
// Dropdown answers are stored as plain text (the option label the visitor saw).
export const hrChecks = sparkSchema.table('hr_checks', {
  id:               serial('id').primaryKey(),
  name:             varchar('name',              { length: 150 }).notNull(),
  company:          varchar('company',           { length: 200 }).notNull(),
  companySize:      text('company_size').notNull(),
  email:            varchar('email',             { length: 255 }).notNull(),
  phone:            varchar('phone',             { length: 25 }),
  businessStage:    text('business_stage').notNull(),
  primaryChallenge: text('primary_challenge').notNull(),
  message:          text('message'),
  status:           varchar('status',            { length: 20 }).notNull().default('new'),
  adminNotes:       text('admin_notes'),
  createdAt:        timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type HrCheck    = typeof hrChecks.$inferSelect;
export type NewHrCheck = typeof hrChecks.$inferInsert;

// Insights (HR articles) managed from the admin panel and shown on /insights.
// `content` holds sanitized HTML. Extra fields (author, category, featured image...)
// can be added later without touching existing columns.
export const insights = sparkSchema.table('insights', {
  id:          serial('id').primaryKey(),
  title:       varchar('title', { length: 255 }).notNull(),
  slug:        varchar('slug',  { length: 300 }).notNull().unique(),
  content:     text('content').notNull(),
  status:      varchar('status', { length: 20 }).notNull().default('draft'), // 'draft' | 'published'
  createdAt:   timestamp('created_at',   { withTimezone: true }).defaultNow().notNull(),
  updatedAt:   timestamp('updated_at',   { withTimezone: true }).defaultNow().notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
});

export type Insight    = typeof insights.$inferSelect;
export type NewInsight = typeof insights.$inferInsert;
