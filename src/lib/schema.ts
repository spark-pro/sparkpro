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
  createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdateFn(() => new Date()),
});

export const applications = pgTable('applications', {
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
