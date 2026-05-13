-- ============================================================
--  Spark Pro Database Schema
--  Run this on your Hostinger MySQL database via phpMyAdmin
--  or the Hostinger Database Manager
-- ============================================================

-- Jobs Table
CREATE TABLE IF NOT EXISTS `jobs` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `title`            VARCHAR(255) NOT NULL,
  `location`         VARCHAR(150) NOT NULL,
  `experience`       VARCHAR(100) NOT NULL,
  `salary_range`     VARCHAR(100) DEFAULT NULL,
  `description`      TEXT        NOT NULL,
  `requirements`     TEXT        NOT NULL COMMENT 'JSON array of strings',
  `benefits`         TEXT        DEFAULT NULL COMMENT 'JSON array of strings',
  `is_active`        TINYINT(1)  NOT NULL DEFAULT 1,
  `created_at`       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Applications Table
CREATE TABLE IF NOT EXISTS `applications` (
  `id`                  INT AUTO_INCREMENT PRIMARY KEY,
  `job_id`              INT          NOT NULL,
  `full_name`          VARCHAR(100) NOT NULL,
  `email`               VARCHAR(255) NOT NULL,
  `phone`               VARCHAR(25)  NOT NULL,
  `resume_filename`     VARCHAR(255) DEFAULT NULL  COMMENT 'Stored UUID-based filename',
  `resume_original_name` VARCHAR(255) DEFAULT NULL COMMENT 'Original file name from applicant',
  `resume_size`         INT          DEFAULT NULL  COMMENT 'File size in bytes',
  `resume_mimetype`     VARCHAR(100) DEFAULT NULL,
  `status`              ENUM('pending','reviewed','shortlisted','rejected') NOT NULL DEFAULT 'pending',
  `admin_notes`         TEXT         DEFAULT NULL,
  `created_at`          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_app_job` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Indexes for performance
CREATE INDEX idx_jobs_active    ON `jobs`(`is_active`);
CREATE INDEX idx_apps_job       ON `applications`(`job_id`);
CREATE INDEX idx_apps_status    ON `applications`(`status`);
CREATE INDEX idx_apps_email     ON `applications`(`email`);
