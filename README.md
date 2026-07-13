# Aurora

> **The easiest way to send, split and settle money together.**

Aurora is a collaborative financial platform that helps friends, families, couples, housemates, clubs and small businesses manage shared money in one modern workspace.

Aurora combines collaboration, payments and AI assistance into a single experience.

---

# Product Vision

> Make shared money effortless.

---

# Mission

Help people manage money together with less friction, more transparency and intelligent assistance.

---

# Current Status

Aurora is currently in active MVP development.

## ✅ Completed

- Marketing Website
- Authentication
- User Profiles
- Workspace Dashboard
- Financial Spaces
- Space Dashboard
- Member Management
- Role Management
- Activity Timeline
- Shared Expense Engine
- Expense Details Dialog
- Equal Split Engine
- Outstanding Balances
- Settlement Progress UI
- Supabase Integration

## 🚧 In Progress

- Settlement Engine
- Aurora Assist

## ⬜ Planned

- Payments
- Merchant Payments
- Mobile Application

---

# MVP Features

Aurora Version 1 includes:

- Authentication
- Workspace
- Financial Spaces
- Member Management
- Activity Timeline
- Shared Expenses
- Settlements
- Payments
- Aurora Assist

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security (RLS)

## Hosting

- Vercel

---

# Current Architecture

```text
Website
    ↓
Authentication
    ↓
Workspace
    ↓
Financial Spaces
    ↓
Members
    ↓
Activity Timeline
    ↓
Expenses ✅
    ↓
Settlements 🚧
    ↓
Payments
```

---

# Project Structure

```text
src/

features/
├── dashboard/
├── expenses/
│   ├── components/
│   ├── services/
│   └── utils/
├── spaces/

services/
├── activity.service.ts
├── auth.ts
├── member.service.ts
├── profile.ts
├── space.service.ts

hooks/

lib/
└── supabase/
```

---

# Current MVP Progress

Overall Progress

███████████████░░░░░ 75%

Completed

- ✅ Marketing Website
- ✅ Authentication
- ✅ Workspace
- ✅ Financial Spaces
- ✅ Member Management
- ✅ Activity Timeline
- ✅ Shared Expense Engine

Current Sprint

- 🚧 Sprint 7 – Settlement Engine

---

# Sprint 6 Highlights

Completed

- Add Expense
- Equal Split Engine
- Accurate Split Rounding
- Expense Timeline
- Expense Details Dialog
- Outstanding Balances
- Paid By Member Names
- Settlement Progress
- Expense Status Badges
- Automatic Expense Refresh
- Expense Empty State
- Skeleton Loading
- Receipt Placeholder

---

# Roadmap

## Sprint 7 – Settlements

- Settlement Engine
- Balance Calculator
- Debt Simplification
- Settle Up Workflow
- Settlement History
- Live Balance Updates

## Sprint 8 – Payments

- Australian Payment Integration
- QR Payments
- Merchant Payments
- Payment Confirmation

---

# Long-Term Vision

Aurora is **not a bank**.

Aurora is the collaborative operating system for shared financial life.

It helps people organise, split, settle and manage money together with transparency, automation and intelligent assistance.

---

# Engineering Principles

- Feature-Based Architecture
- Service Layer Pattern
- Mobile First
- Cloud Native
- Type Safety
- Secure by Design
- Reusable Components
- Event-Driven Activity Logging

---

# Contributing

Aurora is developed using a sprint-based workflow.

Project documentation:

- `CHANGELOG.md`
- `000_PROJECT_BIBLE.md`

---

Built with ❤️ using Next.js, React, TypeScript, Supabase and PostgreSQL.

**Current Version:** MVP – Sprint 6 Completed