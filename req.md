# DRDO Institutional Portal  
## Software Requirements Specification (SRS)

---

## 1. Reference Websites (MANDATORY)

### Animation Reference (must be replicated exactly)

https://event.iitg.ac.in/icann2025/index.php#header

The following animation behaviors MUST match this site:

- Scroll-triggered fade-in
- Vertical translate entrance
- Smooth easing
- Section reveal on viewport entry
- Navbar smooth scrolling
- Card hover transitions

Timing, easing, and transform style must follow ICANN 2025.

---

### Layout Reference (overall website structure)

Old multi-page layout of IIT Guwahati:

- Separate pages
- Header + horizontal navigation
- Department-style content blocks
- Footer with institutional links

This project MUST NOT be single-page.

---

## 2. Project Overview

Build a DRDO-style institutional website where:

- Page structure follows IITG legacy website (multi-page)
- Animations behave exactly like ICANN 2025 IITG site
- All content categories follow DRDO
- Backend is Oracle Database
- All displayed text is Lorem Ipsum

This is NOT academic.

No:
- Faculty
- Courses
- Students

---

## 3. Core Rules (Hard Constraints)

- Animations must match ICANN 2025
- Pages must be separated (not SPA)
- Oracle mandatory
- Exactly ONE Super User
- DRDO properties only
- Lorem Ipsum only
- RBAC enforced
- Audit logs required

---

## 4. Website Pages (DRDO Structure)

Each item below is a SEPARATE PAGE:

- Home
- About Organisation
- Vision & Mission
- Research & Development
- Laboratories
- Technology Areas
- Projects
- News & Announcements
- Careers
- Tenders
- Contact

Every page uses ICANN-style animations on load/scroll.

---

## 5. Functional Modules

### Research & Development
- Title
- Description
- Domain

---

### Laboratories
- Lab Name
- Overview
- Capabilities

---

### Technology Areas
- Area Name
- Description

---

### Projects
- Project Title
- Summary
- Status

---

### News
- Headline
- Body
- Publish Date

---

### Careers
- Position
- Description
- Closing Date

---

### Tenders
- Title
- Details
- Deadline

(All fields filled with Lorem Ipsum)

---

## 6. User Roles

### SUPER_USER (ONLY ONE)

- Full system access
- Create/delete editors
- Assign roles
- Manage all content
- View audit logs
- Database control

---

### CONTENT_EDITOR

- Manage all modules except users

---

### PUBLIC

- Read-only

---

## 7. Admin Dashboard

Pages:

- Page Manager
- Research Manager
- Lab Manager
- Technology Manager
- Project Manager
- News Manager
- Careers Manager
- Tender Manager
- User Manager (Super User only)
- Audit Logs

---

## 8. Animation Requirements (Critical)

Every public page must include:

- IntersectionObserver-based reveal
- Fade + translateY entrance
- Smooth scroll
- Hover transitions
- Card lift effect

Must visually match ICANN 2025 behavior.

---

## 9. Technology Stack

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Spring Boot (Java)
- REST APIs

Database:
- Oracle 19c+

Authentication:
- JWT
- BCrypt

---

## 10. Database Entities

USERS  
- id  
- username  
- password_hash  
- role  
- active  

PAGES  
- id  
- slug  
- title  
- content  

RESEARCH  
- id  
- title  
- description  

LABS  
- id  
- name  
- overview  
- capabilities  

TECHNOLOGY  
- id  
- name  
- description  

PROJECTS  
- id  
- title  
- summary  
- status  

NEWS  
- id  
- headline  
- body  
- publish_date  

CAREERS  
- id  
- position  
- description  
- closing_date  

TENDERS  
- id  
- title  
- details  
- deadline  

AUDIT_LOG  
- id  
- user_id  
- action  
- timestamp  

---

## 11. Authorization

| Role | Content | Users | Logs |
|------|---------|-------|------|
| SUPER_USER | CRUD | CRUD | VIEW |
| EDITOR | CRUD | NO | NO |
| PUBLIC | READ | NO | NO |

---

## 12. Security

- HTTPS only
- Prepared SQL
- JWT expiration
- BCrypt passwords
- Role checks on every API
- Daily Oracle backups
- Mandatory audit logs

---

## 13. Non Functional

- Response < 500ms
- 200 concurrent users
- 99% uptime
- Modular backend
- REST compliant

---

## 14. Content Policy

- Lorem Ipsum ONLY
- No real names
- No real addresses
- No real credentials

---

## 15. Final Constraints

- ICANN animations mandatory
- IITG multi-page structure mandatory
- DRDO sections mandatory
- Oracle mandatory
- One Super User only
- Audit logging cannot be disabled

---

END OF REQUIREMENTS
