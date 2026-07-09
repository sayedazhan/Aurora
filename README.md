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
- Supabase Integration

## 🚧 In Progress

- Shared Expenses
- Aurora Assist

## ⬜ Planned

- Settlements
- Payments
- Merchant Payments

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
Expenses
    ↓
Settlements
    ↓
Payments
```

---

# Project Structure

```text
src/

features/
├── dashboard/
├── spaces/
├── expenses/

services/
├── auth.ts
├── profile.ts
├── space.service.ts
├── member.service.ts
├── activity.service.ts

hooks/

lib/
└── supabase/
```

---

# Current MVP Progress

Overall Progress

███████████░░░░░░░░░░ 55%

Completed

- ✅ Marketing Website
- ✅ Authentication
- ✅ Workspace
- ✅ Financial Spaces
- ✅ Member System
- ✅ Activity Timeline

Next Milestone

- 🚧 Expense Engine

---

# Roadmap

## Sprint 6 – Expenses

- Add Expense
- Equal Split
- Custom Split
- Percentage Split
- Receipt Upload
- Outstanding Balances
- Expense Timeline

## Sprint 7 – Settlements

- Settlement Engine
- Payment Requests
- Debt Simplification

## Sprint 8 – Payments

- Australian Payment Integration
- QR Payments
- Merchant Payments

---

# Long-Term Vision

Aurora is **not a bank**.

Aurora is the collaborative operating system for shared financial life.

It helps people organise, split, settle and manage money together with transparency, automation and intelligent assistance.

---

# Contributing

Aurora is currently under active development using a sprint-based approach.

Each sprint is documented in:

- `CHANGELOG.md`
- `000_PROJECT_BIBLE.md`

---

Built with ❤️ using Next.js, Supabase, PostgreSQL and TypeScript.