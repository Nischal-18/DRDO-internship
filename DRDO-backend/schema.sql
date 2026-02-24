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
-- 4. DOCUMENTS TABLE
-- Stores documents uploaded by applicants
-- ============================================
CREATE TABLE documents (
    document_id      NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id          NUMBER         NOT NULL,
    application_id   NUMBER,        -- nullable: some docs are profile docs
    doc_type         VARCHAR2(50)   NOT NULL,
    -- doc_type: resume, id_proof, marksheet, photo, certificate
    file_name        VARCHAR2(255)  NOT NULL,
    file_path        VARCHAR2(500)  NOT NULL,  -- S3 or local path
    file_size        NUMBER,                   -- in bytes
    is_verified      NUMBER(1)      DEFAULT 0,
    uploaded_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doc_user FOREIGN KEY (user_id)        REFERENCES users(user_id),
    CONSTRAINT fk_doc_app  FOREIGN KEY (application_id) REFERENCES applications(application_id),
    CONSTRAINT chk_doc_type CHECK (doc_type IN ('resume', 'id_proof', 'marksheet', 'photo', 'certificate')),
    CONSTRAINT chk_doc_verified CHECK (is_verified IN (0, 1))
);

-- ============================================
-- 5. NEWS TABLE
-- Stores news articles and announcements
-- ============================================
CREATE TABLE news (
    news_id        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title          VARCHAR2(300)  NOT NULL,
    content        CLOB           NOT NULL,
    category       VARCHAR2(50)   DEFAULT 'general',
    -- category: general, announcement, result, notice
    author_id      NUMBER         NOT NULL,   -- admin user_id
    is_published   NUMBER(1)      DEFAULT 0,
    published_at   TIMESTAMP,
    created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_news_author CHECK (1=1),   -- will link to users
    CONSTRAINT chk_news_published CHECK (is_published IN (0, 1))
);

-- ============================================
-- 6. FAQS TABLE
-- Stores FAQ questions and answers
-- ============================================
CREATE TABLE faqs (
    faq_id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question       VARCHAR2(500)  NOT NULL,
    answer         CLOB           NOT NULL,
    category       VARCHAR2(50)   DEFAULT 'general',
    -- category: general, application, program_details, technical
    display_order  NUMBER         DEFAULT 0,
    is_active      NUMBER(1)      DEFAULT 1,
    created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_faq_category CHECK (category IN ('general', 'application', 'program_details', 'technical')),
    CONSTRAINT chk_faq_active CHECK (is_active IN (0, 1))
);

-- ============================================
-- 7. AUDIT_LOGS TABLE
-- Tracks all important actions in the system
-- ============================================
CREATE TABLE audit_logs (
    log_id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id        NUMBER,
    action         VARCHAR2(100)  NOT NULL,
    -- action: login, logout, application_submit, status_change, etc.
    table_name     VARCHAR2(50),
    record_id      NUMBER,
    old_value      CLOB,
    new_value      CLOB,
    ip_address     VARCHAR2(50),
    created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ============================================
-- 8. NOTIFICATIONS TABLE
-- Stores notifications for users
-- ============================================
CREATE TABLE notifications (
    notification_id  NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id          NUMBER         NOT NULL,
    title            VARCHAR2(200)  NOT NULL,
    message          CLOB           NOT NULL,
    is_read          NUMBER(1)      DEFAULT 0,
    created_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT chk_notif_read CHECK (is_read IN (0, 1))
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_email        ON users(email);
CREATE INDEX idx_apps_user_id       ON applications(user_id);
CREATE INDEX idx_apps_status        ON applications(status);
CREATE INDEX idx_docs_user_id       ON documents(user_id);
CREATE INDEX idx_docs_app_id        ON documents(application_id);
CREATE INDEX idx_news_published     ON news(is_published, published_at);
CREATE INDEX idx_audit_user_id      ON audit_logs(user_id);
CREATE INDEX idx_notif_user_id      ON notifications(user_id);

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
PROMPT Tables: users, programs, applications, documents, news, faqs, audit_logs, notifications
