import {
  mysqlTable,
  int,
  varchar,
  text,
  tinyint,
  timestamp,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

export const jobs = mysqlTable('jobs', {
  id:           int('id').autoincrement().primaryKey(),
  title:        varchar('title',        { length: 255 }).notNull(),
  location:     varchar('location',     { length: 150 }).notNull(),
  experience:   varchar('experience',   { length: 100 }).notNull(),
  salaryRange:  varchar('salary_range', { length: 100 }),
  description:  text('description').notNull(),
  requirements: text('requirements').notNull(), // JSON array stored as TEXT
  benefits:     text('benefits'),               // JSON array stored as TEXT
  isActive:     tinyint('is_active').notNull().default(1),
  createdAt:    timestamp('created_at').defaultNow(),
  updatedAt:    timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const applications = mysqlTable('applications', {
  id:                 int('id').autoincrement().primaryKey(),
  jobId:              int('job_id').notNull(),
  fullName:           varchar('full_name',           { length: 100 }).notNull(),
  email:              varchar('email',               { length: 255 }).notNull(),
  phone:              varchar('phone',               { length: 25  }).notNull(),
  resumeFilename:     varchar('resume_filename',     { length: 255 }),
  resumeOriginalName: varchar('resume_original_name',{ length: 255 }),
  resumeSize:         int('resume_size'),
  resumeMimetype:     varchar('resume_mimetype',     { length: 100 }),
  status:             mysqlEnum('status', ['pending', 'reviewed', 'shortlisted', 'rejected'])
                        .notNull().default('pending'),
  adminNotes:         text('admin_notes'),
  createdAt:          timestamp('created_at').defaultNow(),
});

export type Job         = typeof jobs.$inferSelect;
export type NewJob      = typeof jobs.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
