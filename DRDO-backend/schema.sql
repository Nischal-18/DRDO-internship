-- ============================================
-- DRDO PORTAL - ORACLE XE DATABASE SCHEMA
-- Connect: sqlplus system@//127.0.0.1:1521/freepdb1
-- ============================================

-- ============================================
-- 1. USERS TABLE
-- Stores all users: applicants, admins, reviewers
-- ============================================
CREATE TABLE users (
    user_id        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name      VARCHAR2(100)  NOT NULL,
    email          VARCHAR2(150)  NOT NULL UNIQUE,
    password_hash  VARCHAR2(255)  NOT NULL,
    phone          VARCHAR2(15),
    role           VARCHAR2(20)   DEFAULT 'applicant' NOT NULL,
    -- role can be: applicant, admin, reviewer
    is_active      NUMBER(1)      DEFAULT 1 NOT NULL,
    created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    last_login     TIMESTAMP,
    CONSTRAINT chk_role CHECK (role IN ('applicant', 'admin', 'reviewer')),
    CONSTRAINT chk_active CHECK (is_active IN (0, 1))
);

-- ============================================
-- 2. PROGRAMS TABLE
-- Stores all DRDO programs (Apprenticeship, Training, etc.)
-- ============================================
CREATE TABLE programs (
    program_id     NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name           VARCHAR2(200)  NOT NULL,
    category       VARCHAR2(50)   NOT NULL,
    -- category: apprenticeship, training, graduate, skill_development
    description    CLOB,
    eligibility    CLOB,
    duration       VARCHAR2(100),
    seats          NUMBER,
    is_active      NUMBER(1)      DEFAULT 1,
    created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_program_category CHECK (category IN ('apprenticeship', 'training', 'graduate', 'skill_development'))
);

-- ============================================
-- 3. APPLICATIONS TABLE
-- Stores all user applications for programs
-- ============================================
CREATE TABLE applications (
    application_id   NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id          NUMBER         NOT NULL,
    program_id       NUMBER         NOT NULL,
    status           VARCHAR2(20)   DEFAULT 'pending' NOT NULL,
    -- status: pending, under_review, approved, rejected
    applied_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    reviewed_at      TIMESTAMP,
    reviewed_by      NUMBER,        -- user_id of the reviewer/admin
    remarks          CLOB,          -- admin notes/feedback
    updated_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_app_user    FOREIGN KEY (user_id)      REFERENCES users(user_id),
    CONSTRAINT fk_app_program FOREIGN KEY (program_id)   REFERENCES programs(program_id),
    CONSTRAINT fk_app_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(user_id),
    CONSTRAINT chk_app_status CHECK (status IN ('pending', 'under_review', 'approved', 'rejected'))
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_email        ON users(email);
CREATE INDEX idx_apps_user_id       ON applications(user_id);
CREATE INDEX idx_apps_status        ON applications(status);

-- ============================================
-- DEFAULT ADMIN USER
-- Password: Admin@123 (you must hash this in backend)
-- This is just a placeholder hash
-- ============================================
INSERT INTO users (full_name, email, password_hash, role)
VALUES ('DRDO Admin', 'admin@drdo.gov.in', 'PLACEHOLDER_HASH_CHANGE_THIS', 'admin');

COMMIT;

-- ============================================
-- SAMPLE PROGRAMS DATA
-- ============================================
INSERT INTO programs (name, category, description, duration, seats)
VALUES ('Graduate Apprenticeship', 'apprenticeship', 'Apprenticeship program for engineering graduates', '1 Year', 100);

INSERT INTO programs (name, category, description, duration, seats)
VALUES ('Technical Training Program', 'training', 'Hands-on technical training for diploma holders', '6 Months', 50);

INSERT INTO programs (name, category, description, duration, seats)
VALUES ('Research Fellowship', 'graduate', 'Research program for post-graduate students', '2 Years', 30);

INSERT INTO programs (name, category, description, duration, seats)
VALUES ('Skill Development Course', 'skill_development', 'Short-term skill development for ITI students', '3 Months', 200);

COMMIT;

PROMPT Schema created successfully!
PROMPT Tables: users, programs, applications
