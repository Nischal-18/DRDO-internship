# DRDO Institutional Portal
## Technical Design & Specification Document

**Version:** 1.0  
**Date:** February 16, 2026  
**Project Type:** Internship Task  
**Document Status:** In Progress

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Reference Analysis](#2-reference-analysis)
3. [Technology Stack](#3-technology-stack)
4. [System Architecture](#4-system-architecture)
5. [Project Structure](#5-project-structure)
6. [Next Steps](#6-next-steps)

---

## 1. Project Overview

### 1.1 Purpose
Build a DRDO-style institutional website that combines:
- **Layout structure** from old IIT Guwahati multi-page website
- **Animation behavior** exactly matching ICANN 2025 IITG site
- **Content categories** specific to DRDO organization
- **Backend database** using Oracle Database (mandatory requirement)

### 1.2 Key Constraints

| Constraint | Description |
|------------|-------------|
| **Multi-Page Architecture** | NOT a Single Page Application (SPA) - separate pages with navigation |
| **Animation Standard** | Must exactly replicate ICANN 2025 scroll-triggered animations |
| **Database** | Oracle Database is mandatory |
| **Single Super User** | Exactly ONE Super User in the entire system |
| **Content** | All displayed text must be Lorem Ipsum (no real data) |
| **RBAC** | Role-Based Access Control enforced at all levels |
| **Audit Logs** | Comprehensive audit logging required |

### 1.3 User Roles

#### SUPER_USER (Only One)
- Full system access
- Create/delete editors
- Assign roles
- Manage all content
- View audit logs
- Database control

#### CONTENT_EDITOR
- Manage all content modules
- Cannot manage users
- Cannot view audit logs

#### PUBLIC
- Read-only access
- View all public pages
- No authentication required

---

## 2. Reference Analysis

### 2.1 Animation Reference
**Source:** https://event.iitg.ac.in/icann2025/index.php#header

**Must Replicate:**
- Scroll-triggered fade-in effects
- Vertical translate entrance animations
- Smooth easing curves
- Section reveal on viewport entry
- Navbar smooth scrolling behavior
- Card hover transitions with lift effect

**Technical Requirements:**
- IntersectionObserver API for scroll detection
- CSS transforms for movement
- Timing and easing must match reference site

### 2.2 Layout Reference
**Source:** Old IIT Guwahati multi-page website structure

**Key Features:**
- Separate HTML pages (not single-page)
- Header with horizontal navigation bar
- Department-style content blocks
- Footer with institutional links
- Traditional academic website structure

---

## 3. Technology Stack

### 3.1 Decision Rationale

**Why JavaScript Full-Stack?**
- Single language across frontend and backend
- Modern, in-demand skill set
- Oracle officially supports Node.js via `oracledb` package
- Faster development compared to Java/Spring Boot
- Easier for learning and internship timeline

**Why These Specific Tools?**
Each technology was chosen for being **industry-standard** with **zero experimental risk**.

### 3.2 Frontend Stack

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **React** | 18.x | UI Framework | Industry standard, component-based, most popular |
| **Vite** | 5.x | Build Tool | Modern, fast, excellent DX |
| **React Router** | 6.x | Routing | Standard for multi-page navigation in React |
| **GSAP** | 3.x | Animations | Professional animation library, matches ICANN style |
| **Axios** | 1.x | HTTP Client | Standard for API calls |
| **CSS** | - | Styling | Plain CSS or Tailwind (TBD) |

**Alternative Considered:** Vanilla JavaScript
- **Rejected because:** Complex admin dashboard would be harder to maintain

### 3.3 Backend Stack

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **Node.js** | 20.x LTS | Runtime | JavaScript on server, LTS for stability |
| **Express.js** | 4.x | Web Framework | Most popular, simple, battle-tested |
| **oracledb** | 6.x | Database Driver | Official Oracle driver for Node.js |
| **jsonwebtoken** | 9.x | JWT Auth | Standard JWT implementation |
| **bcryptjs** | 2.x | Password Hashing | Industry standard for password security |
| **express-validator** | 7.x | Input Validation | Express-specific validation middleware |
| **dotenv** | 16.x | Config Management | Standard for environment variables |
| **morgan** | 1.x | HTTP Logging | Standard Express logging middleware |
| **cors** | 2.x | CORS Handling | Required for frontend-backend communication |

### 3.4 Database

| Technology | Version | Purpose |
|------------|---------|---------|
| **Oracle Database** | 19c+ | Data Persistence |

**Note:** Oracle is a mandatory requirement from the internship specification.

### 3.5 Development Tools

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **Postman** | API testing |
| **Oracle SQL Developer** | Database management |
| **VS Code** | IDE |

---

## 4. System Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │   React Frontend (Vite)                          │  │
│  │   - Public Pages (11 pages)                      │  │
│  │   - Admin Dashboard (10 management pages)        │  │
│  │   - GSAP Animations (ICANN-style)                │  │
│  │   - React Router (multi-page navigation)         │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         │ HTTPS / REST API
                         │ (JWT in httpOnly cookies)
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Node.js + Express Backend                   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API Layer (REST Endpoints)                      │  │
│  │  - Public APIs (read-only, no auth)              │  │
│  │  - Auth APIs (login, logout)                     │  │
│  │  - Admin APIs (CRUD with auth)                   │  │
│  └──────────────────────────────────────────────────┘  │
│                         │                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Middleware Layer (Request Pipeline)             │  │
│  │  - JWT Verification                               │  │
│  │  - RBAC Authorization                             │  │
│  │  - Request Validation                             │  │
│  │  - Audit Logging                                  │  │
│  │  - Error Handling                                 │  │
│  └──────────────────────────────────────────────────┘  │
│                         │                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Business Logic Layer (Services)                 │  │
│  │  - Auth Service (login, JWT generation)          │  │
│  │  - User Service (CRUD users, roles)              │  │
│  │  - Content Services (Research, Labs, etc.)       │  │
│  │  - Audit Service (log all actions)               │  │
│  └──────────────────────────────────────────────────┘  │
│                         │                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Data Access Layer                                │  │
│  │  - Database Connection Pool (HikariCP-style)     │  │
│  │  - SQL Query Execution                            │  │
│  │  - Transaction Management                         │  │
│  │  - Prepared Statements (SQL injection prevention)│  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         │ oracledb driver
                         │ (Oracle Instant Client)
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Oracle Database 19c+                    │
│                                                          │
│  Tables:                                                 │
│  - USERS (authentication & roles)                        │
│  - PAGES (dynamic page content)                          │
│  - RESEARCH (R&D information)                            │
│  - LABS (laboratory details)                             │
│  - TECHNOLOGY (technology areas)                         │
│  - PROJECTS (project information)                        │
│  - NEWS (news & announcements)                           │
│  - CAREERS (job postings)                                │
│  - TENDERS (tender information)                          │
│  - AUDIT_LOG (comprehensive audit trail)                 │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Architecture Pattern

**Pattern:** Three-Tier Architecture (Industry Standard)

#### Tier 1: Presentation Layer (Frontend)
- **Responsibility:** User interface and user experience
- **Technology:** React + GSAP
- **Communication:** REST API calls via Axios

#### Tier 2: Business Logic Layer (Backend)
- **Responsibility:** Business rules, authentication, authorization, data processing
- **Technology:** Node.js + Express
- **Communication:** SQL queries to database

#### Tier 3: Data Layer (Database)
- **Responsibility:** Data persistence and retrieval
- **Technology:** Oracle Database
- **Communication:** SQL via oracledb driver

### 4.3 Key Architectural Decisions

#### 4.3.1 Stateless Backend
- **Decision:** JWT-based authentication (no server sessions)
- **Rationale:** 
  - Horizontally scalable
  - No session storage needed
  - Industry best practice for REST APIs
- **Implementation:** JWT stored in httpOnly cookies

#### 4.3.2 Connection Pooling
- **Decision:** Reuse database connections via connection pool
- **Rationale:**
  - Reduces connection overhead
  - Improves performance
  - Standard practice with Oracle
- **Configuration:** Min 5, Max 20 connections (configurable)

#### 4.3.3 Middleware Pipeline
- **Decision:** All requests pass through security middleware
- **Rationale:**
  - Centralized security enforcement
  - Consistent authorization checks
  - Audit logging at one point
- **Flow:** Request → CORS → JWT Check → RBAC → Validation → Controller

#### 4.3.4 Role-Based Access Control (RBAC)
- **Decision:** Middleware enforces roles at API level
- **Rationale:**
  - Security in depth
  - Cannot bypass via frontend manipulation
  - Audit trail of access attempts
- **Implementation:** Each route tagged with required role

---

## 5. Project Structure

### 5.1 Backend Structure

```
drdo-portal-backend/
├── src/
│   ├── config/
│   │   ├── database.js              # Oracle connection pool setup
│   │   ├── config.js                 # Application configuration
│   │   └── constants.js              # App-wide constants
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js        # JWT token verification
│   │   ├── rbac.middleware.js        # Role-based access control
│   │   ├── validator.middleware.js   # Input validation
│   │   ├── audit.middleware.js       # Audit logging
│   │   └── error.middleware.js       # Global error handler
│   │
│   ├── routes/
│   │   ├── auth.routes.js            # Login, logout endpoints
│   │   ├── public.routes.js          # Public read-only APIs
│   │   ├── admin/                    # Admin CRUD routes
│   │   │   ├── research.routes.js
│   │   │   ├── labs.routes.js
│   │   │   ├── technology.routes.js
│   │   │   ├── projects.routes.js
│   │   │   ├── news.routes.js
│   │   │   ├── careers.routes.js
│   │   │   ├── tenders.routes.js
│   │   │   ├── pages.routes.js
│   │   │   └── users.routes.js       # Super User only
│   │   └── index.js                  # Route aggregator
│   │
│   ├── controllers/
│   │   ├── auth.controller.js        # Login, logout logic
│   │   ├── research.controller.js    # Research CRUD
│   │   ├── labs.controller.js        # Labs CRUD
│   │   ├── technology.controller.js  # Technology CRUD
│   │   ├── projects.controller.js    # Projects CRUD
│   │   ├── news.controller.js        # News CRUD
│   │   ├── careers.controller.js     # Careers CRUD
│   │   ├── tenders.controller.js     # Tenders CRUD
│   │   ├── pages.controller.js       # Pages CRUD
│   │   ├── users.controller.js       # User management
│   │   └── audit.controller.js       # Audit log retrieval
│   │
│   ├── services/
│   │   ├── auth.service.js           # Authentication logic
│   │   ├── user.service.js           # User management logic
│   │   ├── content.service.js        # Generic content operations
│   │   └── audit.service.js          # Audit logging logic
│   │
│   ├── models/
│   │   └── queries.js                # SQL query definitions
│   │
│   ├── utils/
│   │   ├── jwt.utils.js              # JWT generation/verification
│   │   ├── hash.utils.js             # Password hashing (bcrypt)
│   │   ├── response.utils.js         # Standard response format
│   │   └── validation.utils.js       # Custom validators
│   │
│   └── app.js                         # Express app configuration
│
├── .env                               # Environment variables (not in git)
├── .env.example                       # Environment template
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                          # Application entry point
```

### 5.2 Frontend Structure

```
drdo-portal-frontend/
├── public/
│   ├── assets/
│   │   └── images/                   # Static images
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── common/                   # Shared components
│   │   │   ├── Navbar.jsx            # Main navigation
│   │   │   ├── Footer.jsx            # Footer with links
│   │   │   ├── AnimatedSection.jsx   # ICANN-style animation wrapper
│   │   │   ├── Loader.jsx            # Loading spinner
│   │   │   └── ErrorBoundary.jsx     # Error handling
│   │   │
│   │   ├── admin/                    # Admin-specific components
│   │   │   ├── Sidebar.jsx           # Admin navigation
│   │   │   ├── DataTable.jsx         # Reusable data table
│   │   │   ├── Form.jsx              # Generic form component
│   │   │   └── Modal.jsx             # Modal dialog
│   │   │
│   │   └── public/                   # Public page components
│   │       ├── HeroSection.jsx       # Hero banner
│   │       ├── Card.jsx              # Content card
│   │       └── ContentBlock.jsx      # Text content block
│   │
│   ├── pages/
│   │   ├── public/                   # 11 Public Pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── VisionMission.jsx
│   │   │   ├── Research.jsx
│   │   │   ├── Laboratories.jsx
│   │   │   ├── TechnologyAreas.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── News.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── Tenders.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── admin/                    # 10 Admin Management Pages
│   │   │   ├── Dashboard.jsx         # Admin home
│   │   │   ├── PageManager.jsx
│   │   │   ├── ResearchManager.jsx
│   │   │   ├── LabManager.jsx
│   │   │   ├── TechnologyManager.jsx
│   │   │   ├── ProjectManager.jsx
│   │   │   ├── NewsManager.jsx
│   │   │   ├── CareerManager.jsx
│   │   │   ├── TenderManager.jsx
│   │   │   ├── UserManager.jsx       # Super User only
│   │   │   └── AuditLogs.jsx         # Super User only
│   │   │
│   │   └── auth/
│   │       └── Login.jsx             # Login page
│   │
│   ├── services/
│   │   ├── api.service.js            # Axios instance configuration
│   │   ├── auth.service.js           # Auth API calls
│   │   ├── content.service.js        # Content API calls
│   │   └── admin.service.js          # Admin API calls
│   │
│   ├── hooks/
│   │   ├── useAuth.js                # Authentication hook
│   │   ├── useAnimation.js           # ICANN animation hook
│   │   └── useFetch.js               # Data fetching hook
│   │
│   ├── context/
│   │   └── AuthContext.jsx           # Global auth state
│   │
│   ├── utils/
│   │   ├── animations.js             # GSAP animation functions
│   │   ├── constants.js              # App constants
│   │   └── helpers.js                # Utility functions
│   │
│   ├── styles/
│   │   ├── global.css                # Global styles
│   │   ├── animations.css            # Animation keyframes
│   │   └── variables.css             # CSS variables
│   │
│   ├── router.jsx                    # React Router configuration
│   ├── App.jsx                       # Root component
│   └── main.jsx                      # React entry point
│
├── .env                               # Environment variables
├── .env.example
├── .gitignore
├── index.html                         # HTML entry
├── package.json
├── package-lock.json
└── vite.config.js                     # Vite configuration
```

### 5.3 Folder Organization Principles

#### Backend
- **Separation by Concern:** Routes → Controllers → Services → Database
- **Middleware Pipeline:** All cross-cutting concerns centralized
- **Config Centralization:** All configuration in `/config`
- **Reusability:** Services can be called from multiple controllers

#### Frontend
- **Component-Based:** Reusable UI components
- **Page-Level Routing:** Each page is a separate route
- **Shared Logic:** Hooks for reusable stateful logic
- **Service Layer:** API calls abstracted from components

---

## 6. Next Steps

### 6.1 Remaining Design Sections

The following sections need to be completed:

1. ✅ **Tech Stack** - COMPLETED
2. ✅ **Architecture** - COMPLETED
3. ✅ **Project Structure** - COMPLETED
4. ⏳ **Database Schema Design** - PENDING
   - Detailed table structures
   - Primary/foreign keys
   - Indexes
   - Constraints
   - Relationships
5. ⏳ **API Endpoint Specification** - PENDING
   - All REST endpoints
   - Request/response formats
   - Authentication requirements
   - Error codes
6. ⏳ **Authentication & Authorization Flow** - PENDING
   - Login flow diagram
   - JWT lifecycle
   - Role enforcement
   - Session management
7. ⏳ **Security Implementation** - PENDING
   - SQL injection prevention
   - XSS protection
   - CSRF protection
   - Rate limiting
8. ⏳ **Audit Logging Specification** - PENDING
   - What to log
   - Log format
   - Retention policy
9. ⏳ **Animation Implementation Guide** - PENDING
   - GSAP configuration
   - ICANN animation breakdown
   - Performance optimization
10. ⏳ **Development & Deployment Plan** - PENDING
    - Setup instructions
    - Environment configuration
    - Build process
    - Deployment strategy

### 6.2 Implementation Phases

After design completion, implementation will proceed in phases:

**Phase 1: Setup & Infrastructure**
- Initialize projects (backend + frontend)
- Configure Oracle database
- Set up development environment

**Phase 2: Backend Core**
- Database schema creation
- Authentication system
- Basic CRUD APIs

**Phase 3: Admin Dashboard**
- Admin UI
- Content management
- User management (Super User)

**Phase 4: Public Frontend**
- Public pages
- ICANN animations
- Content display

**Phase 5: Testing & Refinement**
- API testing
- Security testing
- Animation polish
- Bug fixes

**Phase 6: Documentation & Deployment**
- User manual
- API documentation
- Deployment

---

---

## 7. Database Schema Design

### 7.1 Schema Overview

The database consists of 10 tables organized into three categories:

**Authentication & Authorization:**
- USERS (user accounts and roles)

**Content Management:**
- PAGES (dynamic page content)
- RESEARCH (R&D information)
- LABS (laboratory details)
- TECHNOLOGY (technology areas)
- PROJECTS (project information)
- NEWS (news & announcements)
- CAREERS (job postings)
- TENDERS (tender information)

**Audit & Compliance:**
- AUDIT_LOG (comprehensive audit trail)

### 7.2 Detailed Table Definitions

#### 7.2.1 USERS Table

**Purpose:** Store user authentication credentials and role information

```sql
CREATE TABLE USERS (
    user_id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username        VARCHAR2(50) NOT NULL UNIQUE,
    password_hash   VARCHAR2(255) NOT NULL,
    role            VARCHAR2(20) NOT NULL CHECK (role IN ('SUPER_USER', 'CONTENT_EDITOR', 'PUBLIC')),
    is_active       NUMBER(1) DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Constraint: Only ONE Super User allowed (critical requirement)
CREATE UNIQUE INDEX idx_single_super_user 
ON USERS (CASE WHEN role = 'SUPER_USER' THEN 1 END);

-- Performance indexes
CREATE INDEX idx_users_username ON USERS(username);
CREATE INDEX idx_users_role ON USERS(role);
```

**Key Fields:**
- `user_id`: Auto-generated primary key
- `username`: Unique login identifier
- `password_hash`: BCrypt hashed password (never store plain text)
- `role`: One of three roles (SUPER_USER, CONTENT_EDITOR, PUBLIC)
- `is_active`: Soft delete flag (0=disabled, 1=active)

**Critical Constraint:** The unique partial index `idx_single_super_user` ensures only ONE user can have role='SUPER_USER' in the entire system.

---

#### 7.2.2 PAGES Table

**Purpose:** Store dynamic page content (About, Vision/Mission, Contact, etc.)

```sql
CREATE TABLE PAGES (
    page_id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug            VARCHAR2(100) NOT NULL UNIQUE,
    title           VARCHAR2(200) NOT NULL,
    content         CLOB,
    meta_description VARCHAR2(500),
    is_published    NUMBER(1) DEFAULT 1 CHECK (is_published IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_pages_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_pages_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_pages_slug ON PAGES(slug);
CREATE INDEX idx_pages_published ON PAGES(is_published);
```

**Key Fields:**
- `slug`: URL-friendly identifier (e.g., "about-organisation", "vision-mission")
- `content`: Large text field (CLOB) for page content (Lorem Ipsum)
- `meta_description`: SEO meta description
- `is_published`: Draft vs published status

---

#### 7.2.3 RESEARCH Table

**Purpose:** Store Research & Development information

```sql
CREATE TABLE RESEARCH (
    research_id     NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title           VARCHAR2(200) NOT NULL,
    description     CLOB NOT NULL,
    domain          VARCHAR2(100),
    display_order   NUMBER DEFAULT 0,
    is_published    NUMBER(1) DEFAULT 1 CHECK (is_published IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_research_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_research_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_research_domain ON RESEARCH(domain);
CREATE INDEX idx_research_published ON RESEARCH(is_published);
CREATE INDEX idx_research_order ON RESEARCH(display_order);
```

**Key Fields:**
- `domain`: Research category (e.g., "Aeronautics", "Electronics", "Missiles")
- `display_order`: Controls sequence on frontend (lower numbers appear first)

---

#### 7.2.4 LABS Table

**Purpose:** Store laboratory information

```sql
CREATE TABLE LABS (
    lab_id          NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name            VARCHAR2(200) NOT NULL,
    overview        CLOB,
    capabilities    CLOB,
    location        VARCHAR2(200),
    display_order   NUMBER DEFAULT 0,
    is_published    NUMBER(1) DEFAULT 1 CHECK (is_published IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_labs_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_labs_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_labs_name ON LABS(name);
CREATE INDEX idx_labs_published ON LABS(is_published);
CREATE INDEX idx_labs_order ON LABS(display_order);
```

**Key Fields:**
- `capabilities`: Detailed lab capabilities (Lorem Ipsum)
- `location`: Lab location (Lorem Ipsum city)

---

#### 7.2.5 TECHNOLOGY Table

**Purpose:** Store technology area information

```sql
CREATE TABLE TECHNOLOGY (
    tech_id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name            VARCHAR2(200) NOT NULL,
    description     CLOB NOT NULL,
    category        VARCHAR2(100),
    display_order   NUMBER DEFAULT 0,
    is_published    NUMBER(1) DEFAULT 1 CHECK (is_published IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_technology_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_technology_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_technology_category ON TECHNOLOGY(category);
CREATE INDEX idx_technology_published ON TECHNOLOGY(is_published);
CREATE INDEX idx_technology_order ON TECHNOLOGY(display_order);
```

**Key Fields:**
- `category`: Technology grouping for filtering

---

#### 7.2.6 PROJECTS Table

**Purpose:** Store project information

```sql
CREATE TABLE PROJECTS (
    project_id      NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title           VARCHAR2(200) NOT NULL,
    summary         CLOB NOT NULL,
    status          VARCHAR2(50) NOT NULL CHECK (status IN ('ONGOING', 'COMPLETED', 'PLANNED', 'ON_HOLD')),
    start_date      DATE,
    end_date        DATE,
    display_order   NUMBER DEFAULT 0,
    is_published    NUMBER(1) DEFAULT 1 CHECK (is_published IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_projects_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_projects_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_projects_status ON PROJECTS(status);
CREATE INDEX idx_projects_published ON PROJECTS(is_published);
CREATE INDEX idx_projects_order ON PROJECTS(display_order);
```

**Key Fields:**
- `status`: Project lifecycle status (ONGOING, COMPLETED, PLANNED, ON_HOLD)
- `start_date/end_date`: Project timeline

---

#### 7.2.7 NEWS Table

**Purpose:** Store news and announcements

```sql
CREATE TABLE NEWS (
    news_id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    headline        VARCHAR2(300) NOT NULL,
    body            CLOB NOT NULL,
    publish_date    DATE NOT NULL,
    category        VARCHAR2(100),
    is_featured     NUMBER(1) DEFAULT 0 CHECK (is_featured IN (0, 1)),
    is_published    NUMBER(1) DEFAULT 1 CHECK (is_published IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_news_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_news_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_news_publish_date ON NEWS(publish_date DESC);
CREATE INDEX idx_news_category ON NEWS(category);
CREATE INDEX idx_news_featured ON NEWS(is_featured);
CREATE INDEX idx_news_published ON NEWS(is_published);
```

**Key Fields:**
- `is_featured`: Flag for homepage featured news
- `publish_date`: Controls when news becomes visible
- Index on `publish_date DESC` for efficient "latest news" queries

---

#### 7.2.8 CAREERS Table

**Purpose:** Store job posting information

```sql
CREATE TABLE CAREERS (
    career_id       NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    position        VARCHAR2(200) NOT NULL,
    description     CLOB NOT NULL,
    qualifications  CLOB,
    responsibilities CLOB,
    location        VARCHAR2(200),
    employment_type VARCHAR2(50) CHECK (employment_type IN ('FULL_TIME', 'CONTRACT', 'INTERNSHIP')),
    closing_date    DATE NOT NULL,
    is_active       NUMBER(1) DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_careers_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_careers_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_careers_closing_date ON CAREERS(closing_date);
CREATE INDEX idx_careers_active ON CAREERS(is_active);
CREATE INDEX idx_careers_type ON CAREERS(employment_type);
```

**Key Fields:**
- `employment_type`: Job type (FULL_TIME, CONTRACT, INTERNSHIP)
- `closing_date`: Application deadline
- Can auto-deactivate postings after closing_date

---

#### 7.2.9 TENDERS Table

**Purpose:** Store tender information

```sql
CREATE TABLE TENDERS (
    tender_id       NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title           VARCHAR2(300) NOT NULL,
    details         CLOB NOT NULL,
    tender_number   VARCHAR2(100) UNIQUE,
    category        VARCHAR2(100),
    estimated_value VARCHAR2(100),
    deadline        DATE NOT NULL,
    is_active       NUMBER(1) DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_by      NUMBER NOT NULL,
    updated_by      NUMBER,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_tenders_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id),
    CONSTRAINT fk_tenders_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
);

CREATE INDEX idx_tenders_deadline ON TENDERS(deadline);
CREATE INDEX idx_tenders_active ON TENDERS(is_active);
CREATE INDEX idx_tenders_category ON TENDERS(category);
CREATE INDEX idx_tenders_number ON TENDERS(tender_number);
```

**Key Fields:**
- `tender_number`: Official reference number (unique)
- `estimated_value`: Tender estimated value (as string for flexibility)
- `deadline`: Submission deadline

---

#### 7.2.10 AUDIT_LOG Table

**Purpose:** Comprehensive audit trail for all system actions

```sql
CREATE TABLE AUDIT_LOG (
    log_id          NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         NUMBER NOT NULL,
    action_type     VARCHAR2(50) NOT NULL CHECK (action_type IN (
        'LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'FAILED_LOGIN'
    )),
    table_name      VARCHAR2(50),
    record_id       NUMBER,
    old_value       CLOB,
    new_value       CLOB,
    ip_address      VARCHAR2(50),
    user_agent      VARCHAR2(500),
    timestamp       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE INDEX idx_audit_user ON AUDIT_LOG(user_id);
CREATE INDEX idx_audit_timestamp ON AUDIT_LOG(timestamp DESC);
CREATE INDEX idx_audit_action ON AUDIT_LOG(action_type);
CREATE INDEX idx_audit_table ON AUDIT_LOG(table_name);
```

**Key Fields:**
- `action_type`: Type of action (LOGIN, CREATE, UPDATE, DELETE, etc.)
- `table_name`: Which table was affected
- `record_id`: ID of the affected record
- `old_value/new_value`: Before/after JSON for UPDATE actions
- `ip_address/user_agent`: Request metadata for security analysis

**Audit Strategy:**
- Every CREATE/UPDATE/DELETE operation is logged
- Every LOGIN/LOGOUT is logged
- Failed login attempts are logged
- Super User can view all logs
- Logs are never deleted (compliance requirement)

---

### 7.3 Entity Relationship Diagram

```
                    ┌─────────────────┐
                    │     USERS       │
                    │  PK: user_id    │
                    │                 │
                    │  - username     │
                    │  - password_hash│
                    │  - role         │
                    │  - is_active    │
                    └────────┬────────┘
                             │
                             │ Creates/Updates (Foreign Keys)
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   RESEARCH    │    │     LABS      │    │  TECHNOLOGY   │
│ PK: research_id│    │  PK: lab_id   │    │  PK: tech_id  │
│ FK: created_by│    │ FK: created_by│    │ FK: created_by│
│ FK: updated_by│    │ FK: updated_by│    │ FK: updated_by│
└───────────────┘    └───────────────┘    └───────────────┘

        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   PROJECTS    │    │     NEWS      │    │   CAREERS     │
│ PK: project_id│    │  PK: news_id  │    │ PK: career_id │
│ FK: created_by│    │ FK: created_by│    │ FK: created_by│
│ FK: updated_by│    │ FK: updated_by│    │ FK: updated_by│
└───────────────┘    └───────────────┘    └───────────────┘

        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   TENDERS     │    │     PAGES     │    │  AUDIT_LOG    │
│ PK: tender_id │    │  PK: page_id  │    │  PK: log_id   │
│ FK: created_by│    │ FK: created_by│    │ FK: user_id   │
│ FK: updated_by│    │ FK: updated_by│    │               │
└───────────────┘    └───────────────┘    └───────────────┘
```

**Relationship Type:** One-to-Many
- One USER can create/update many records in all content tables
- AUDIT_LOG references USER for tracking who performed actions

---

### 7.4 Common Field Patterns

All content tables follow a standard pattern for consistency:

#### Audit Trail Fields
```sql
created_by      NUMBER NOT NULL              -- Who created this record
updated_by      NUMBER                       -- Who last updated
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP

CONSTRAINT fk_xxx_created_by FOREIGN KEY (created_by) REFERENCES USERS(user_id)
CONSTRAINT fk_xxx_updated_by FOREIGN KEY (updated_by) REFERENCES USERS(user_id)
```

#### Display Control Fields
```sql
is_published    NUMBER(1) DEFAULT 1         -- 1=published, 0=draft
display_order   NUMBER DEFAULT 0            -- For frontend ordering
```

#### Soft Delete Pattern
```sql
is_active       NUMBER(1) DEFAULT 1         -- 1=active, 0=deleted
-- Or is_published for publishable content
```

**Rationale:** Soft deletes preserve audit trail and allow "undelete" functionality

---

### 7.5 Indexing Strategy

**Index Categories:**

| Purpose | Tables | Indexed Columns | Rationale |
|---------|--------|----------------|-----------|
| **Primary Key** | All tables | ID columns | Auto-created with PK, ensures uniqueness |
| **Unique Lookups** | USERS, PAGES, TENDERS | username, slug, tender_number | Fast unique lookups |
| **Status Filtering** | All content tables | is_published, is_active | Common WHERE clause |
| **Date Sorting** | NEWS, CAREERS, TENDERS | publish_date, closing_date, deadline | DESC sorting for "latest" queries |
| **Category Filtering** | RESEARCH, TECHNOLOGY, NEWS, TENDERS | domain, category | Filtering by type |
| **Audit Queries** | AUDIT_LOG | user_id, timestamp, action_type | Fast audit trail queries |
| **Display Order** | Most content tables | display_order | Frontend sorting |

**Performance Considerations:**
- Composite indexes not needed (simple queries)
- All indexes are single-column for simplicity
- DESC indexes on date fields for "latest items" queries
- Covering indexes not used (table row count expected to be small)

---

### 7.6 Database Constraints & Business Rules

#### 7.6.1 Single Super User Enforcement

**Requirement:** System must have exactly ONE Super User at all times

**Implementation:**
```sql
CREATE UNIQUE INDEX idx_single_super_user 
ON USERS (CASE WHEN role = 'SUPER_USER' THEN 1 END);
```

**How It Works:**
1. Only rows with role='SUPER_USER' get indexed with value 1
2. Index is UNIQUE, so only one row can have value 1
3. Database rejects INSERT/UPDATE that would create second Super User
4. Application layer doesn't need to check this (database enforces it)

**Testing:**
```sql
-- First Super User: SUCCESS
INSERT INTO USERS (username, password_hash, role) 
VALUES ('admin', '$2a$10$...', 'SUPER_USER');

-- Second Super User: FAILS with unique constraint violation
INSERT INTO USERS (username, password_hash, role) 
VALUES ('admin2', '$2a$10$...', 'SUPER_USER');
-- ORA-00001: unique constraint (idx_single_super_user) violated
```

#### 7.6.2 Auto-Update Timestamp

**Requirement:** Track when records are modified

**Implementation:** Database trigger on each table
```sql
CREATE OR REPLACE TRIGGER trg_users_update
BEFORE UPDATE ON USERS
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

-- Repeat for all tables with updated_at field:
-- PAGES, RESEARCH, LABS, TECHNOLOGY, PROJECTS, NEWS, CAREERS, TENDERS
```

**Benefit:** Application doesn't need to set updated_at manually

#### 7.6.3 Referential Integrity

All foreign keys enforce ON DELETE behavior:

**Strategy:** Default (RESTRICT)
- Cannot delete a USER if they created/updated content
- Must transfer ownership first, then delete
- Prevents orphaned records

**Alternative (if needed):**
```sql
-- Could use ON DELETE SET NULL
CONSTRAINT fk_xxx_created_by 
    FOREIGN KEY (created_by) 
    REFERENCES USERS(user_id) 
    ON DELETE SET NULL
```

**Current Decision:** Use default RESTRICT for data integrity

#### 7.6.4 CHECK Constraints

Enforce valid values at database level:

```sql
-- Role must be one of three values
CHECK (role IN ('SUPER_USER', 'CONTENT_EDITOR', 'PUBLIC'))

-- Boolean flags (Oracle doesn't have BOOLEAN type)
CHECK (is_active IN (0, 1))
CHECK (is_published IN (0, 1))
CHECK (is_featured IN (0, 1))

-- Project status enum
CHECK (status IN ('ONGOING', 'COMPLETED', 'PLANNED', 'ON_HOLD'))

-- Employment type enum
CHECK (employment_type IN ('FULL_TIME', 'CONTRACT', 'INTERNSHIP'))

-- Audit action types
CHECK (action_type IN ('LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'FAILED_LOGIN'))
```

**Benefit:** Database rejects invalid data even if application has bugs

---

### 7.7 Database Initialization Script

Complete setup sequence:

```sql
-- ============================================
-- DRDO Portal Database Initialization Script
-- Oracle Database 19c+
-- ============================================

-- Step 1: Create all tables
-- (Execute all CREATE TABLE statements from 7.2)

-- Step 2: Create auto-update triggers
CREATE OR REPLACE TRIGGER trg_users_update
BEFORE UPDATE ON USERS FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_pages_update
BEFORE UPDATE ON PAGES FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_research_update
BEFORE UPDATE ON RESEARCH FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_labs_update
BEFORE UPDATE ON LABS FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_technology_update
BEFORE UPDATE ON TECHNOLOGY FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_projects_update
BEFORE UPDATE ON PROJECTS FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_news_update
BEFORE UPDATE ON NEWS FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_careers_update
BEFORE UPDATE ON CAREERS FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

CREATE OR REPLACE TRIGGER trg_tenders_update
BEFORE UPDATE ON TENDERS FOR EACH ROW
BEGIN :NEW.updated_at := CURRENT_TIMESTAMP; END;
/

-- Step 3: Insert the ONE Super User
-- Password: 'Admin@123' (example - change in production)
INSERT INTO USERS (username, password_hash, role, is_active) 
VALUES (
    'admin',
    '$2a$10$rXQHs8bkFGZHRvYPLvHVAeN9K5wYqH8zLZnJHvHGh3zVvYPLvHVAe', 
    'SUPER_USER',
    1
);

-- Step 4: Insert sample Lorem Ipsum data (optional for development)

-- Sample Pages
INSERT INTO PAGES (slug, title, content, created_by) VALUES
('about-organisation', 'About Organisation', 'Lorem ipsum dolor sit amet...', 1),
('vision-mission', 'Vision & Mission', 'Lorem ipsum dolor sit amet...', 1),
('contact', 'Contact Us', 'Lorem ipsum dolor sit amet...', 1);

-- Sample Research
INSERT INTO RESEARCH (title, description, domain, display_order, created_by) VALUES
('Advanced Aerodynamics', 'Lorem ipsum dolor sit amet...', 'Aeronautics', 1, 1),
('Missile Guidance Systems', 'Lorem ipsum dolor sit amet...', 'Missiles', 2, 1),
('Radar Technology', 'Lorem ipsum dolor sit amet...', 'Electronics', 3, 1);

-- Sample Labs
INSERT INTO LABS (name, overview, capabilities, location, display_order, created_by) VALUES
('Aeronautics Research Lab', 'Lorem ipsum...', 'Wind tunnel testing, CFD analysis...', 'Bangalore', 1, 1),
('Electronics Lab', 'Lorem ipsum...', 'Signal processing, Embedded systems...', 'Hyderabad', 2, 1);

-- Sample Technology
INSERT INTO TECHNOLOGY (name, description, category, display_order, created_by) VALUES
('Stealth Technology', 'Lorem ipsum dolor sit amet...', 'Defense', 1, 1),
('Quantum Computing', 'Lorem ipsum dolor sit amet...', 'Computing', 2, 1);

-- Sample Projects
INSERT INTO PROJECTS (title, summary, status, start_date, display_order, created_by) VALUES
('Project Alpha', 'Lorem ipsum dolor sit amet...', 'ONGOING', DATE '2024-01-01', 1, 1),
('Project Beta', 'Lorem ipsum dolor sit amet...', 'COMPLETED', DATE '2023-06-01', 2, 1);

-- Sample News
INSERT INTO NEWS (headline, body, publish_date, category, is_featured, created_by) VALUES
('New Research Facility Inaugurated', 'Lorem ipsum dolor sit amet...', SYSDATE, 'Infrastructure', 1, 1),
('International Collaboration Announced', 'Lorem ipsum dolor sit amet...', SYSDATE-5, 'Partnerships', 0, 1);

-- Sample Careers
INSERT INTO CAREERS (position, description, qualifications, employment_type, closing_date, created_by) VALUES
('Senior Scientist', 'Lorem ipsum dolor sit amet...', 'PhD in relevant field...', 'FULL_TIME', DATE '2026-03-31', 1),
('Research Intern', 'Lorem ipsum dolor sit amet...', 'Pursuing Masters/PhD...', 'INTERNSHIP', DATE '2026-04-15', 1);

-- Sample Tenders
INSERT INTO TENDERS (title, details, tender_number, category, deadline, created_by) VALUES
('Supply of Laboratory Equipment', 'Lorem ipsum dolor sit amet...', 'DRDO/2026/LAB/001', 'Procurement', DATE '2026-03-20', 1),
('IT Infrastructure Setup', 'Lorem ipsum dolor sit amet...', 'DRDO/2026/IT/002', 'IT Services', DATE '2026-04-10', 1);

-- Commit all changes
COMMIT;

-- Verify setup
SELECT 'Users' as table_name, COUNT(*) as count FROM USERS
UNION ALL
SELECT 'Pages', COUNT(*) FROM PAGES
UNION ALL
SELECT 'Research', COUNT(*) FROM RESEARCH
UNION ALL
SELECT 'Labs', COUNT(*) FROM LABS
UNION ALL
SELECT 'Technology', COUNT(*) FROM TECHNOLOGY
UNION ALL
SELECT 'Projects', COUNT(*) FROM PROJECTS
UNION ALL
SELECT 'News', COUNT(*) FROM NEWS
UNION ALL
SELECT 'Careers', COUNT(*) FROM CAREERS
UNION ALL
SELECT 'Tenders', COUNT(*) FROM TENDERS;

-- Verify Super User constraint
SELECT username, role FROM USERS WHERE role = 'SUPER_USER';
-- Should return exactly 1 row
```

---

### 7.8 Backup & Recovery Strategy

**Backup Schedule:**
- **Daily:** Full database backup at 2:00 AM (off-peak hours)
- **Hourly:** Archive log backups
- **Weekly:** Export to flat files for archival

**Oracle RMAN Backup Commands:**
```sql
-- Full backup
RMAN> BACKUP DATABASE PLUS ARCHIVELOG;

-- Incremental backup
RMAN> BACKUP INCREMENTAL LEVEL 1 DATABASE;
```

**Recovery Point Objective (RPO):** 1 hour maximum data loss  
**Recovery Time Objective (RTO):** 4 hours maximum downtime

**Retention Policy:**
- Daily backups: Keep for 30 days
- Weekly backups: Keep for 1 year
- Audit logs: Never delete (compliance)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 16, 2026 | Design Team | Initial design document covering tech stack, architecture, and project structure |
| 1.1 | Feb 16, 2026 | Design Team | Added complete database schema design section |

---

## Approval Status

| Role | Name | Status | Date |
|------|------|--------|------|
| Intern | - | Draft | - |
| Mentor | - | Pending | - |

---

---

## 8. API Endpoint Specification

### 8.1 API Design Principles

**RESTful Standards:**
- Resource-based URLs (nouns, not verbs)
- HTTP methods indicate action (GET, POST, PUT, DELETE)
- Stateless communication
- JSON request/response format
- Consistent error handling

**Naming Conventions:**
- Plural nouns for collections: `/api/research`, `/api/labs`
- Lowercase with hyphens: `/api/technology-areas` (if needed)
- Version prefix: `/api/v1/...` (future-proofing)

**Status Codes:**
- `200 OK` - Successful GET, PUT
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server error

---

### 8.2 Response Format Standard

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2026-02-16T10:30:00Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  },
  "timestamp": "2026-02-16T10:30:00Z"
}
```

**Paginated Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  },
  "timestamp": "2026-02-16T10:30:00Z"
}
```

---

### 8.3 Authentication Endpoints

#### POST /api/auth/login
**Description:** Authenticate user and issue JWT token

**Access:** Public

**Request:**
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": 1,
      "username": "admin",
      "role": "SUPER_USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Invalid username or password"
  }
}
```

**Implementation Notes:**
- Set JWT in httpOnly cookie: `Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict`
- Also return token in response body (for mobile apps)
- Log login attempt in AUDIT_LOG
- Rate limit: 5 attempts per 15 minutes per IP

---

#### POST /api/auth/logout
**Description:** Invalidate user session

**Access:** Authenticated users

**Headers:**
```
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Implementation Notes:**
- Clear httpOnly cookie: `Set-Cookie: token=; Max-Age=0`
- Log logout in AUDIT_LOG
- Token becomes invalid (add to blacklist if using token revocation)

---

#### GET /api/auth/me
**Description:** Get current user information

**Access:** Authenticated users

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "admin",
    "role": "SUPER_USER",
    "isActive": true
  }
}
```

---

### 8.4 Public Content Endpoints (No Authentication Required)

#### GET /api/public/pages/:slug
**Description:** Get page content by slug

**Access:** Public

**Example:** `GET /api/public/pages/about-organisation`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "pageId": 1,
    "slug": "about-organisation",
    "title": "About Organisation",
    "content": "Lorem ipsum dolor sit amet...",
    "metaDescription": "Learn about DRDO",
    "updatedAt": "2026-02-15T14:30:00Z"
  }
}
```

---

#### GET /api/public/research
**Description:** Get all published research items

**Access:** Public

**Query Parameters:**
- `domain` (optional): Filter by domain
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:** `GET /api/public/research?domain=Aeronautics&page=1&limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "researchId": 1,
      "title": "Advanced Aerodynamics",
      "description": "Lorem ipsum dolor sit amet...",
      "domain": "Aeronautics",
      "createdAt": "2026-01-10T10:00:00Z"
    },
    {
      "researchId": 2,
      "title": "Missile Guidance Systems",
      "description": "Lorem ipsum dolor sit amet...",
      "domain": "Missiles",
      "createdAt": "2026-01-12T11:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

---

#### GET /api/public/labs
**Description:** Get all published laboratories

**Access:** Public

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "labId": 1,
      "name": "Aeronautics Research Lab",
      "overview": "Lorem ipsum...",
      "capabilities": "Wind tunnel testing, CFD analysis...",
      "location": "Bangalore"
    }
  ]
}
```

---

#### GET /api/public/technology
**Description:** Get all published technology areas

**Access:** Public

**Query Parameters:**
- `category` (optional): Filter by category

---

#### GET /api/public/projects
**Description:** Get all published projects

**Access:** Public

**Query Parameters:**
- `status` (optional): Filter by status (ONGOING, COMPLETED, etc.)

---

#### GET /api/public/news
**Description:** Get all published news

**Access:** Public

**Query Parameters:**
- `featured` (optional): Only featured news (true/false)
- `category` (optional): Filter by category
- `page`, `limit`: Pagination

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "newsId": 1,
      "headline": "New Research Facility Inaugurated",
      "body": "Lorem ipsum dolor sit amet...",
      "publishDate": "2026-02-16",
      "category": "Infrastructure",
      "isFeatured": true
    }
  ],
  "pagination": { ... }
}
```

---

#### GET /api/public/careers
**Description:** Get all active job postings

**Access:** Public

**Query Parameters:**
- `employmentType` (optional): Filter by type
- `page`, `limit`: Pagination

---

#### GET /api/public/tenders
**Description:** Get all active tenders

**Access:** Public

**Query Parameters:**
- `category` (optional): Filter by category
- `page`, `limit`: Pagination

---

### 8.5 Admin CRUD Endpoints (Authentication Required)

All admin endpoints require authentication and appropriate role.

**Common Headers:**
```
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

#### Research Management

**GET /api/admin/research**
**Access:** CONTENT_EDITOR, SUPER_USER

Get all research items (including unpublished)

**Query Parameters:**
- `page`, `limit`: Pagination
- `isPublished` (optional): Filter by status

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "researchId": 1,
      "title": "Advanced Aerodynamics",
      "description": "Lorem ipsum...",
      "domain": "Aeronautics",
      "displayOrder": 1,
      "isPublished": true,
      "createdBy": {
        "userId": 1,
        "username": "admin"
      },
      "createdAt": "2026-01-10T10:00:00Z",
      "updatedAt": "2026-02-15T14:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

**GET /api/admin/research/:id**
**Access:** CONTENT_EDITOR, SUPER_USER

Get single research item by ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "researchId": 1,
    "title": "Advanced Aerodynamics",
    "description": "Lorem ipsum dolor sit amet...",
    "domain": "Aeronautics",
    "displayOrder": 1,
    "isPublished": true,
    "createdBy": { ... },
    "updatedBy": { ... },
    "createdAt": "2026-01-10T10:00:00Z",
    "updatedAt": "2026-02-15T14:30:00Z"
  }
}
```

---

**POST /api/admin/research**
**Access:** CONTENT_EDITOR, SUPER_USER

Create new research item

**Request:**
```json
{
  "title": "Quantum Computing Research",
  "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit...",
  "domain": "Computing",
  "displayOrder": 5,
  "isPublished": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "researchId": 15,
    "title": "Quantum Computing Research",
    ...
  },
  "message": "Research created successfully"
}
```

**Validation Errors (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      },
      {
        "field": "description",
        "message": "Description must be at least 10 characters"
      }
    ]
  }
}
```

---

**PUT /api/admin/research/:id**
**Access:** CONTENT_EDITOR, SUPER_USER

Update existing research item

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description...",
  "domain": "Electronics",
  "displayOrder": 2,
  "isPublished": false
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Research updated successfully"
}
```

---

**DELETE /api/admin/research/:id**
**Access:** CONTENT_EDITOR, SUPER_USER

Delete research item (soft delete - sets isPublished=false)

**Success Response (204):**
No content

**Implementation Note:** Perform soft delete by setting `isPublished=0` instead of hard delete

---

#### Labs Management

Same CRUD pattern as Research:
- `GET /api/admin/labs`
- `GET /api/admin/labs/:id`
- `POST /api/admin/labs`
- `PUT /api/admin/labs/:id`
- `DELETE /api/admin/labs/:id`

**Access:** CONTENT_EDITOR, SUPER_USER

---

#### Technology Management

Same CRUD pattern:
- `GET /api/admin/technology`
- `GET /api/admin/technology/:id`
- `POST /api/admin/technology`
- `PUT /api/admin/technology/:id`
- `DELETE /api/admin/technology/:id`

**Access:** CONTENT_EDITOR, SUPER_USER

---

#### Projects Management

Same CRUD pattern:
- `GET /api/admin/projects`
- `GET /api/admin/projects/:id`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`

**Access:** CONTENT_EDITOR, SUPER_USER

**Additional Fields in POST/PUT:**
```json
{
  "title": "Project Omega",
  "summary": "Lorem ipsum...",
  "status": "ONGOING",
  "startDate": "2026-03-01",
  "endDate": "2027-02-28"
}
```

---

#### News Management

Same CRUD pattern:
- `GET /api/admin/news`
- `GET /api/admin/news/:id`
- `POST /api/admin/news`
- `PUT /api/admin/news/:id`
- `DELETE /api/admin/news/:id`

**Access:** CONTENT_EDITOR, SUPER_USER

**Additional Fields:**
```json
{
  "headline": "Major Breakthrough in Defense Tech",
  "body": "Lorem ipsum...",
  "publishDate": "2026-02-20",
  "category": "Research",
  "isFeatured": true
}
```

---

#### Careers Management

Same CRUD pattern:
- `GET /api/admin/careers`
- `GET /api/admin/careers/:id`
- `POST /api/admin/careers`
- `PUT /api/admin/careers/:id`
- `DELETE /api/admin/careers/:id`

**Access:** CONTENT_EDITOR, SUPER_USER

---

#### Tenders Management

Same CRUD pattern:
- `GET /api/admin/tenders`
- `GET /api/admin/tenders/:id`
- `POST /api/admin/tenders`
- `PUT /api/admin/tenders/:id`
- `DELETE /api/admin/tenders/:id`

**Access:** CONTENT_EDITOR, SUPER_USER

---

#### Pages Management

Same CRUD pattern:
- `GET /api/admin/pages`
- `GET /api/admin/pages/:id`
- `POST /api/admin/pages`
- `PUT /api/admin/pages/:id`
- `DELETE /api/admin/pages/:id`

**Access:** CONTENT_EDITOR, SUPER_USER

---

### 8.6 User Management Endpoints (Super User Only)

#### GET /api/admin/users
**Access:** SUPER_USER only

Get all users

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "userId": 1,
      "username": "admin",
      "role": "SUPER_USER",
      "isActive": true,
      "createdAt": "2026-01-01T00:00:00Z"
    },
    {
      "userId": 2,
      "username": "editor1",
      "role": "CONTENT_EDITOR",
      "isActive": true,
      "createdAt": "2026-02-05T10:30:00Z"
    }
  ]
}
```

**Note:** Password hashes are never returned in responses

---

#### POST /api/admin/users
**Access:** SUPER_USER only

Create new user (editor only - cannot create another Super User)

**Request:**
```json
{
  "username": "editor2",
  "password": "SecurePass123!",
  "role": "CONTENT_EDITOR"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "userId": 3,
    "username": "editor2",
    "role": "CONTENT_EDITOR",
    "isActive": true
  },
  "message": "User created successfully"
}
```

**Validation:**
- Username: 3-50 characters, alphanumeric + underscore
- Password: Minimum 8 characters, must include uppercase, lowercase, number, special char
- Role: Only CONTENT_EDITOR allowed (cannot create SUPER_USER via API)

---

#### PUT /api/admin/users/:id
**Access:** SUPER_USER only

Update user (change password, activate/deactivate)

**Request:**
```json
{
  "password": "NewPassword123!",
  "isActive": false
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "User updated successfully"
}
```

**Restrictions:**
- Cannot change role of Super User
- Cannot deactivate Super User
- Cannot change own role

---

#### DELETE /api/admin/users/:id
**Access:** SUPER_USER only

Delete user (soft delete - sets isActive=false)

**Success Response (204):**
No content

**Restrictions:**
- Cannot delete Super User
- Cannot delete self
- User's content remains (created_by references stay valid)

---

### 8.7 Audit Log Endpoints

#### GET /api/admin/audit-logs
**Access:** SUPER_USER only

Get audit log entries

**Query Parameters:**
- `userId` (optional): Filter by user
- `actionType` (optional): Filter by action (LOGIN, CREATE, UPDATE, etc.)
- `tableName` (optional): Filter by affected table
- `startDate` (optional): From date
- `endDate` (optional): To date
- `page`, `limit`: Pagination

**Example:** `GET /api/admin/audit-logs?userId=2&actionType=UPDATE&page=1&limit=50`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "logId": 1523,
      "user": {
        "userId": 2,
        "username": "editor1"
      },
      "actionType": "UPDATE",
      "tableName": "RESEARCH",
      "recordId": 5,
      "oldValue": "{\"title\":\"Old Title\",\"description\":\"...\"}",
      "newValue": "{\"title\":\"New Title\",\"description\":\"...\"}",
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2026-02-16T10:30:45Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1523,
    "totalPages": 31
  }
}
```

**Implementation Notes:**
- Logs are read-only (no DELETE endpoint)
- Logs are automatically created by audit middleware
- `oldValue` and `newValue` contain JSON strings of record state
- Useful for compliance, security analysis, debugging

---

### 8.8 Error Response Codes

| HTTP Status | Error Code | Description | Example |
|-------------|------------|-------------|---------|
| 400 | VALIDATION_ERROR | Invalid input data | Missing required field |
| 401 | UNAUTHORIZED | Not authenticated | Missing or invalid JWT |
| 401 | AUTH_FAILED | Login failed | Wrong username/password |
| 403 | FORBIDDEN | Insufficient permissions | Editor trying to access user management |
| 404 | NOT_FOUND | Resource doesn't exist | Research ID doesn't exist |
| 409 | CONFLICT | Resource conflict | Username already exists |
| 409 | SUPER_USER_EXISTS | Super User constraint | Trying to create 2nd Super User |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests | Too many login attempts |
| 500 | INTERNAL_ERROR | Server error | Database connection failed |

---

### 8.9 API Security Headers

All API responses include security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

---

### 8.10 Rate Limiting

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 5 requests | 15 minutes |
| Public Read | 100 requests | 1 minute |
| Admin Write | 30 requests | 1 minute |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1708084800
```

**Rate Limit Exceeded Response (429):**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "retryAfter": 45
  }
}
```

---

### 8.11 Complete Endpoint Summary

#### Authentication (3 endpoints)
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

#### Public Content (8 endpoint groups)
- `GET /api/public/pages/:slug`
- `GET /api/public/research`
- `GET /api/public/labs`
- `GET /api/public/technology`
- `GET /api/public/projects`
- `GET /api/public/news`
- `GET /api/public/careers`
- `GET /api/public/tenders`

#### Admin Content Management (8 CRUD groups × 5 endpoints each = 40 endpoints)
- Research: GET (all), GET (one), POST, PUT, DELETE
- Labs: GET (all), GET (one), POST, PUT, DELETE
- Technology: GET (all), GET (one), POST, PUT, DELETE
- Projects: GET (all), GET (one), POST, PUT, DELETE
- News: GET (all), GET (one), POST, PUT, DELETE
- Careers: GET (all), GET (one), POST, PUT, DELETE
- Tenders: GET (all), GET (one), POST, PUT, DELETE
- Pages: GET (all), GET (one), POST, PUT, DELETE

#### Admin User Management (4 endpoints - SUPER_USER only)
- `GET /api/admin/users`
- `POST /api/admin/users`
- `PUT /api/admin/users/:id`
- `DELETE /api/admin/users/:id`

#### Audit Logs (1 endpoint - SUPER_USER only)
- `GET /api/admin/audit-logs`

**Total: ~56 endpoints**

---

---

## 9. Authentication & Authorization Flow

### 9.1 Authentication Flow Diagram

```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │
       │ 1. POST /api/auth/login
       │    { username, password }
       ▼
┌──────────────────────────────────────────┐
│          Express Backend                  │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Auth Controller                    │ │
│  │ 1. Receive credentials             │ │
│  │ 2. Query USERS table               │ │
│  │ 3. Compare password hash           │ │
│  └────────┬───────────────────────────┘ │
│           │                               │
│           ▼                               │
│  ┌────────────────────────────────────┐ │
│  │ JWT Service                        │ │
│  │ 1. Generate JWT token              │ │
│  │    - Payload: { userId, role }     │ │
│  │    - Sign with SECRET_KEY          │ │
│  │    - Expiry: 24 hours              │ │
│  └────────┬───────────────────────────┘ │
└───────────┼───────────────────────────────┘
            │
            │ 2. Response:
            │    - JWT in httpOnly cookie
            │    - User data in body
            ▼
┌─────────────────────────────────────────┐
│   Browser (stores cookie automatically) │
└─────────────────────────────────────────┘
```

### 9.2 JWT Token Structure

**Payload:**
```json
{
  "userId": 1,
  "username": "admin",
  "role": "SUPER_USER",
  "iat": 1708084800,
  "exp": 1708171200
}
```

**Token Configuration:**
- **Algorithm:** HS256 (HMAC with SHA-256)
- **Secret:** Stored in environment variable `JWT_SECRET`
- **Expiry:** 24 hours (86400 seconds)
- **Issuer:** "drdo-portal"

**Token Storage:**
- **Primary:** httpOnly cookie (secure, not accessible via JavaScript)
- **Secondary:** Response body (for mobile apps)

---

### 9.3 Authorization Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 3. GET /api/admin/research
       │    Cookie: token=eyJhbGc...
       ▼
┌───────────────────────────────────────────────┐
│          Express Middleware Pipeline          │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ 1. Auth Middleware                      │ │
│  │    - Extract JWT from cookie            │ │
│  │    - Verify signature                   │ │
│  │    - Check expiry                       │ │
│  │    - Decode payload                     │ │
│  │    - Attach user to req.user            │ │
│  └─────────────┬───────────────────────────┘ │
│                │                               │
│                │ JWT Valid?                    │
│                ├─── No ──> 401 Unauthorized    │
│                │                               │
│                ▼ Yes                           │
│  ┌─────────────────────────────────────────┐ │
│  │ 2. RBAC Middleware                      │ │
│  │    - Read required role from route      │ │
│  │    - Compare with req.user.role         │ │
│  │    - Check permission matrix            │ │
│  └─────────────┬───────────────────────────┘ │
│                │                               │
│                │ Authorized?                   │
│                ├─── No ──> 403 Forbidden       │
│                │                               │
│                ▼ Yes                           │
│  ┌─────────────────────────────────────────┐ │
│  │ 3. Controller                           │ │
│  │    - Execute business logic             │ │
│  │    - Return data                        │ │
│  └─────────────┬───────────────────────────┘ │
└────────────────┼───────────────────────────────┘
                 │
                 │ 4. Response: 200 OK with data
                 ▼
┌─────────────────────────────────────────────┐
│   Browser (displays data)                   │
└─────────────────────────────────────────────┘
```

---

### 9.4 Role-Based Access Control Matrix

| Endpoint | PUBLIC | CONTENT_EDITOR | SUPER_USER |
|----------|--------|----------------|------------|
| **Authentication** |
| POST /api/auth/login | ✅ | ✅ | ✅ |
| POST /api/auth/logout | ✅ | ✅ | ✅ |
| GET /api/auth/me | ✅ | ✅ | ✅ |
| **Public Content** |
| GET /api/public/* | ✅ | ✅ | ✅ |
| **Admin Content Management** |
| GET /api/admin/research | ❌ | ✅ | ✅ |
| POST /api/admin/research | ❌ | ✅ | ✅ |
| PUT /api/admin/research/:id | ❌ | ✅ | ✅ |
| DELETE /api/admin/research/:id | ❌ | ✅ | ✅ |
| *(Same for labs, technology, projects, news, careers, tenders, pages)* |
| **User Management** |
| GET /api/admin/users | ❌ | ❌ | ✅ |
| POST /api/admin/users | ❌ | ❌ | ✅ |
| PUT /api/admin/users/:id | ❌ | ❌ | ✅ |
| DELETE /api/admin/users/:id | ❌ | ❌ | ✅ |
| **Audit Logs** |
| GET /api/admin/audit-logs | ❌ | ❌ | ✅ |

---

### 9.5 Middleware Implementation Details

#### Auth Middleware (jwt.middleware.js)
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from httpOnly cookie
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check expiry (redundant but good practice)
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Token has expired'
        }
      });
    }
    
    // Attach user to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token'
      }
    });
  }
};

module.exports = authMiddleware;
```

#### RBAC Middleware (rbac.middleware.js)
```javascript
const rbacMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    }
    
    // Check if user role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions'
        }
      });
    }
    
    next();
  };
};

// Usage in routes:
// router.get('/admin/research', 
//   authMiddleware, 
//   rbacMiddleware(['CONTENT_EDITOR', 'SUPER_USER']), 
//   researchController.getAll
// );

module.exports = rbacMiddleware;
```

---

### 9.6 Session Management

**Stateless Architecture:**
- No server-side session storage
- All state in JWT token
- Scales horizontally without shared session store

**Token Refresh Strategy:**
- Current: No refresh tokens (24-hour expiry)
- Future Enhancement: Implement refresh token rotation if needed

**Token Revocation:**
- Current: Tokens valid until expiry (blacklist not implemented)
- Logout: Client deletes cookie (token still technically valid)
- Future Enhancement: Redis blacklist for revoked tokens

---

### 9.7 Password Security

**Hashing Algorithm:** BCrypt with salt rounds = 10

**Password Policy:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

**Implementation:**
```javascript
const bcrypt = require('bcryptjs');

// Hash password
const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

// Verify password
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
```

**Storage:** Only hashed passwords stored in USERS table (never plain text)

---

## 10. Security Implementation

### 10.1 Security Checklist

| Security Measure | Implementation | Status |
|------------------|----------------|--------|
| **Authentication** | JWT with httpOnly cookies | ✅ Required |
| **Password Hashing** | BCrypt (10 rounds) | ✅ Required |
| **SQL Injection** | Parameterized queries | ✅ Required |
| **XSS Protection** | Content Security Policy headers | ✅ Required |
| **CSRF Protection** | SameSite cookies | ✅ Required |
| **HTTPS Only** | Force HTTPS in production | ✅ Required |
| **Rate Limiting** | Express rate limit middleware | ✅ Required |
| **Input Validation** | express-validator | ✅ Required |
| **Audit Logging** | All CUD operations logged | ✅ Required |
| **CORS** | Whitelist allowed origins | ✅ Required |

---

### 10.2 SQL Injection Prevention

**Never use string concatenation for SQL queries**

**❌ Vulnerable Code:**
```javascript
// NEVER DO THIS
const query = `SELECT * FROM USERS WHERE username = '${username}'`;
```

**✅ Secure Code (Parameterized Query):**
```javascript
const query = `SELECT * FROM USERS WHERE username = :username`;
const binds = { username: username };
const result = await connection.execute(query, binds);
```

**Oracle Bind Variables:**
- Always use bind variables (`:paramName`)
- oracledb driver automatically escapes values
- Prevents SQL injection attacks

---

### 10.3 Cross-Site Scripting (XSS) Prevention

**Content Security Policy (CSP):**
```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});
```

**Input Sanitization:**
- All user inputs validated before processing
- React automatically escapes JSX content
- CLOB fields store Lorem Ipsum (not user HTML)

---

### 10.4 Cross-Site Request Forgery (CSRF) Prevention

**Primary Defense:** SameSite Cookies
```javascript
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'strict', // Prevents CSRF
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
```

**SameSite=Strict:** Browser won't send cookie on cross-origin requests

**Additional Measure (if needed):** CSRF tokens for state-changing operations

---

### 10.5 HTTPS Enforcement

**Production Configuration:**
```javascript
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
  });
}
```

**Security Headers:**
```javascript
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

---

### 10.6 Rate Limiting

**Implementation:**
```javascript
const rateLimit = require('express-rate-limit');

// Auth endpoints: 5 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many login attempts'
    }
  }
});

app.use('/api/auth/login', authLimiter);

// Public endpoints: 100 requests per minute
const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
});

app.use('/api/public', publicLimiter);

// Admin endpoints: 30 requests per minute
const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
});

app.use('/api/admin', adminLimiter);
```

---

### 10.7 Input Validation

**Using express-validator:**
```javascript
const { body, validationResult } = require('express-validator');

// Validation middleware for creating research
const validateResearch = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  
  body('domain')
    .optional()
    .isLength({ max: 100 }).withMessage('Domain must be max 100 characters'),
  
  body('isPublished')
    .optional()
    .isBoolean().withMessage('isPublished must be boolean'),
  
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array()
        }
      });
    }
    next();
  }
];

// Use in route:
router.post('/admin/research', 
  authMiddleware, 
  rbacMiddleware(['CONTENT_EDITOR', 'SUPER_USER']),
  validateResearch,
  researchController.create
);
```

**Validation Rules:**
- All string inputs: trim whitespace
- Required fields: check for presence
- Length limits: enforce max lengths
- Data types: validate booleans, dates, enums
- SQL-safe: no need for manual escaping (parameterized queries handle it)

---

### 10.8 CORS Configuration

**Development:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true // Allow cookies
}));
```

**Production:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL, // https://drdo-portal.gov.in
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### 10.9 Environment Variables Security

**Never commit sensitive data to git**

**.env.example (committed to git):**
```
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Oracle Database (fill in your values)
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_CONNECT_STRING=localhost:1521/ORCLPDB1

# JWT Secret (generate a strong random string)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=24h

# Audit
AUDIT_ENABLED=true
```

**.env (NOT committed, in .gitignore):**
```
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

DB_USER=drdo_admin
DB_PASSWORD=SecureP@ssw0rd123
DB_CONNECT_STRING=localhost:1521/ORCLPDB1

JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
JWT_EXPIRY=24h

AUDIT_ENABLED=true
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 10.10 Audit Logging Implementation

**Audit Middleware:**
```javascript
const auditMiddleware = (action) => {
  return async (req, res, next) => {
    // Store original res.json
    const originalJson = res.json.bind(res);
    
    // Override res.json to capture response
    res.json = function(data) {
      // Log successful operations
      if (data.success && req.user) {
        const logEntry = {
          userId: req.user.userId,
          actionType: action,
          tableName: req.baseUrl.split('/').pop().toUpperCase(),
          recordId: req.params.id || null,
          oldValue: req.oldRecord ? JSON.stringify(req.oldRecord) : null,
          newValue: data.data ? JSON.stringify(data.data) : null,
          ipAddress: req.ip,
          userAgent: req.get('user-agent')
        };
        
        // Insert into AUDIT_LOG (fire and forget - don't block response)
        insertAuditLog(logEntry).catch(console.error);
      }
      
      // Call original res.json
      return originalJson(data);
    };
    
    next();
  };
};

// Usage:
router.post('/admin/research', 
  authMiddleware,
  rbacMiddleware(['CONTENT_EDITOR', 'SUPER_USER']),
  validateResearch,
  auditMiddleware('CREATE'),
  researchController.create
);
```

**What Gets Logged:**
- LOGIN / LOGOUT events
- CREATE / UPDATE / DELETE operations
- Failed login attempts
- User info, IP address, timestamp
- Old and new values for UPDATE operations

---

## 11. Animation Implementation Guide

### 11.1 ICANN 2025 Animation Analysis

**Key Animations from Reference Site:**

1. **Scroll-Triggered Fade In**
   - Elements fade from opacity 0 to 1
   - Triggered when element enters viewport
   
2. **Vertical Translate**
   - Elements move from below (translateY: 50px) to original position
   - Combined with fade in
   
3. **Smooth Easing**
   - Easing function: ease-out or custom cubic-bezier
   - Duration: ~0.6s to 0.8s
   
4. **Staggered Animation**
   - Multiple elements animate in sequence
   - Delay between each: ~0.1s

5. **Navbar Smooth Scroll**
   - Clicking nav links scrolls smoothly to section
   - Scroll behavior: smooth

6. **Card Hover Effects**
   - Scale: 1.02
   - Box shadow increases
   - Transition: 0.3s

---

### 11.2 GSAP Implementation

**Installation:**
```bash
npm install gsap
```

**Scroll Trigger Setup:**
```javascript
// src/utils/animations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade in from bottom
export const fadeInUp = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%', // Start animation when element is 80% down viewport
        toggleActions: 'play none none none'
      }
    }
  );
};

// Staggered animation for multiple elements
export const staggerFadeIn = (elements) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1, // 0.1s delay between each element
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%'
      }
    }
  );
};

// Smooth scroll to element
export const smoothScrollTo = (targetId) => {
  const target = document.getElementById(targetId);
  if (target) {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 70 }, // 70px offset for fixed navbar
      ease: 'power2.inOut'
    });
  }
};
```

---

### 11.3 React Component Implementation

**Animated Section Component:**
```jsx
// src/components/common/AnimatedSection.jsx
import { useEffect, useRef } from 'react';
import { fadeInUp } from '../../utils/animations';

const AnimatedSection = ({ children, delay = 0 }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current, delay);
    }
  }, [delay]);
  
  return (
    <div ref={sectionRef} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
};

export default AnimatedSection;
```

**Usage in Page:**
```jsx
// src/pages/public/Research.jsx
import AnimatedSection from '../../components/common/AnimatedSection';

const Research = () => {
  return (
    <div>
      <AnimatedSection delay={0}>
        <h1>Research & Development</h1>
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <p>Lorem ipsum dolor sit amet...</p>
      </AnimatedSection>
      
      <div className="research-grid">
        {researchItems.map((item, index) => (
          <AnimatedSection key={item.id} delay={0.3 + index * 0.1}>
            <ResearchCard data={item} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};
```

---

### 11.4 Card Hover Animation (CSS)

```css
/* src/styles/animations.css */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Smooth scroll for entire page */
html {
  scroll-behavior: smooth;
}

/* Fade in animation class (fallback) */
.fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### 11.5 Navbar Smooth Scroll

```jsx
// src/components/common/Navbar.jsx
import { smoothScrollTo } from '../../utils/animations';

const Navbar = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };
  
  return (
    <nav className="navbar">
      <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
      <a href="#research" onClick={(e) => handleNavClick(e, 'research')}>Research</a>
      <a href="#labs" onClick={(e) => handleNavClick(e, 'labs')}>Labs</a>
    </nav>
  );
};
```

---

### 11.6 Performance Optimization

**Best Practices:**

1. **will-change CSS property:**
```css
.animated-element {
  will-change: opacity, transform;
}
```

2. **Lazy load animations:**
   - Only animate elements in/near viewport
   - GSAP ScrollTrigger handles this automatically

3. **Reduce animation on mobile:**
```javascript
export const fadeInUp = (element, delay = 0) => {
  // Reduce animation duration on mobile
  const duration = window.innerWidth < 768 ? 0.4 : 0.8;
  
  gsap.fromTo(element, {...}, { duration, ... });
};
```

4. **Cleanup on unmount:**
```jsx
useEffect(() => {
  const animation = fadeInUp(ref.current);
  
  return () => {
    animation?.kill(); // Clean up GSAP animation
  };
}, []);
```

---

## 12. Development & Deployment Plan

### 12.1 Development Environment Setup

#### Prerequisites
- Node.js 20.x LTS
- Oracle Database 19c+ (local or remote)
- Oracle Instant Client
- Git

#### Backend Setup
```bash
# 1. Clone repository
git clone <repo-url>
cd drdo-portal-backend

# 2. Install dependencies
npm install

# 3. Install Oracle Instant Client
# Download from: https://www.oracle.com/database/technologies/instant-client/downloads.html
# Extract and set environment variable:
export LD_LIBRARY_PATH=/path/to/instantclient_19_8:$LD_LIBRARY_PATH

# 4. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 5. Initialize database
# Run SQL scripts from section 7.7

# 6. Start development server
npm run dev
```

#### Frontend Setup
```bash
# 1. Navigate to frontend directory
cd drdo-portal-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Set VITE_API_URL=http://localhost:3000

# 4. Start development server
npm run dev
```

---

### 12.2 Project Configuration Files

**Backend package.json:**
```json
{
  "name": "drdo-portal-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "oracledb": "^6.0.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "express-validator": "^7.0.1",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "cookie-parser": "^1.4.6",
    "morgan": "^1.10.0",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

**Frontend package.json:**
```json
{
  "name": "drdo-portal-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "axios": "^1.6.2",
    "gsap": "^3.12.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

**vite.config.js:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
```

---

### 12.3 Database Connection Configuration

**src/config/database.js:**
```javascript
const oracledb = require('oracledb');

// Configure connection pool
async function initializeConnectionPool() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
      poolMin: 5,
      poolMax: 20,
      poolIncrement: 2,
      poolTimeout: 60 // seconds
    });
    console.log('Oracle connection pool created successfully');
  } catch (err) {
    console.error('Error creating connection pool:', err);
    process.exit(1);
  }
}

// Get connection from pool
async function getConnection() {
  try {
    return await oracledb.getConnection();
  } catch (err) {
    console.error('Error getting connection from pool:', err);
    throw err;
  }
}

// Close pool
async function closePool() {
  try {
    await oracledb.getPool().close(10);
    console.log('Oracle connection pool closed');
  } catch (err) {
    console.error('Error closing connection pool:', err);
  }
}

module.exports = {
  initializeConnectionPool,
  getConnection,
  closePool
};
```

---

### 12.4 Build & Deployment

#### Backend Deployment (Node.js Server)
```bash
# 1. Build (if using TypeScript - N/A for plain JS)

# 2. Set environment to production
export NODE_ENV=production

# 3. Install production dependencies only
npm install --production

# 4. Start with PM2 (process manager)
npm install -g pm2
pm2 start server.js --name drdo-portal-backend

# 5. Configure PM2 to restart on boot
pm2 startup
pm2 save
```

#### Frontend Deployment (Static Files)
```bash
# 1. Build for production
npm run build
# Creates /dist folder with optimized files

# 2. Deploy to web server (e.g., Nginx)
# Copy dist/* to /var/www/drdo-portal/

# 3. Configure Nginx
server {
    listen 80;
    server_name drdo-portal.gov.in;
    
    root /var/www/drdo-portal;
    index index.html;
    
    # Route all requests to index.html (for React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### 12.5 Testing Strategy

**Unit Testing (Backend):**
- Framework: Jest
- Test services and utilities
- Mock database connections

**Integration Testing (Backend):**
- Test API endpoints
- Use test database
- Test authentication & authorization

**Frontend Testing:**
- Framework: React Testing Library
- Test component rendering
- Test user interactions

**Manual Testing Checklist:**
- [ ] Login/logout functionality
- [ ] Role-based access control
- [ ] CRUD operations for all content types
- [ ] Animations on all public pages
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Form validation
- [ ] Error handling
- [ ] Audit logging

---

### 12.6 Monitoring & Maintenance

**Logging:**
- Use Morgan for HTTP request logging
- Use Winston for application logging
- Store logs in `/var/log/drdo-portal/`

**Database Backups:**
- Automated daily backups via Oracle RMAN
- Retention: 30 days
- Test recovery quarterly

**Monitoring:**
- PM2 for process monitoring
- Oracle Enterprise Manager for database monitoring
- Set up alerts for:
  - Server downtime
  - High error rates
  - Database connection failures

**Updates:**
- Security patches: Monthly
- Dependency updates: Quarterly
- Major version updates: Annually (with testing)

---

## 13. Implementation Timeline

### Phase 1: Setup & Infrastructure (Week 1)
- [ ] Initialize Git repositories
- [ ] Set up development environment
- [ ] Configure Oracle database
- [ ] Create database schema
- [ ] Set up backend project structure
- [ ] Set up frontend project structure

### Phase 2: Backend Core (Week 2-3)
- [ ] Implement database connection
- [ ] Create authentication system (JWT)
- [ ] Implement RBAC middleware
- [ ] Build public API endpoints
- [ ] Build admin CRUD APIs
- [ ] Implement audit logging
- [ ] API testing with Postman

### Phase 3: Admin Dashboard (Week 4)
- [ ] Build admin layout
- [ ] Create user management interface (Super User)
- [ ] Create content management interfaces
- [ ] Implement forms with validation
- [ ] Build audit log viewer
- [ ] Admin functionality testing

### Phase 4: Public Frontend (Week 5-6)
- [ ] Build public page layout
- [ ] Implement all 11 public pages
- [ ] Integrate ICANN-style animations
- [ ] Implement navbar with smooth scroll
- [ ] Add card hover effects
- [ ] Responsive design (mobile/tablet)

### Phase 5: Testing & Refinement (Week 7)
- [ ] Integration testing
- [ ] Security testing
- [ ] Performance optimization
- [ ] Animation polish
- [ ] Bug fixes
- [ ] User acceptance testing

### Phase 6: Documentation & Deployment (Week 8)
- [ ] API documentation
- [ ] User manual
- [ ] Deployment to production server
- [ ] Database backup setup
- [ ] Monitoring setup
- [ ] Handover documentation

**Total Duration: 8 weeks**

---

## 14. Conclusion

This document provides a complete technical specification for the DRDO Institutional Portal using industry-standard, proven technologies and practices.

**Key Highlights:**
- ✅ JavaScript full-stack (React + Node.js + Express)
- ✅ Oracle Database integration via official `oracledb` package
- ✅ JWT-based authentication with httpOnly cookies
- ✅ Role-Based Access Control (RBAC)
- ✅ Single Super User enforcement at database level
- ✅ Comprehensive audit logging
- ✅ ICANN 2025-style animations with GSAP
- ✅ Multi-page architecture (not SPA)
- ✅ RESTful API design
- ✅ Security best practices (SQL injection prevention, XSS, CSRF, HTTPS)
- ✅ Complete database schema with constraints
- ✅ 56 API endpoints fully specified
- ✅ Animation implementation guide
- ✅ Development and deployment plan

**Architecture Validation:**
- Three-tier architecture (proven enterprise pattern)
- Stateless backend (horizontally scalable)
- Connection pooling (efficient resource usage)
- Middleware pipeline (security in depth)
- Zero experimental technologies (all industry-standard)

**Ready for Implementation:**
All technical decisions finalized, database designed, APIs specified, security measures defined, and development plan established. This design can be directly implemented without ambiguity.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 16, 2026 | Design Team | Initial design: tech stack, architecture, project structure |
| 1.1 | Feb 16, 2026 | Design Team | Added complete database schema design |
| 2.0 | Feb 16, 2026 | Design Team | **FINAL VERSION** - Added API endpoints, authentication flow, security, animations, deployment plan |

---

## Approval Status

| Role | Name | Status | Date |
|------|------|--------|------|
| Intern | - | ✅ Ready for Review | Feb 16, 2026 |
| Mentor | - | Pending Approval | - |

---

**END OF DOCUMENT**

**Total Sections Completed: 14**
**Total Pages: ~60**
**Status: COMPREHENSIVE & IMPLEMENTATION-READY**
