# Aurora

> Internal Codename  
> **Mission:** Build Australia's collaborative financial platform.

---

# Changelog

All notable changes to Aurora will be documented in this file.

This project follows a sprint-based development approach.

---

# Sprint 1 – Foundation

**Status:** ✅ Completed

## Website

- Created Next.js application
- Configured Tailwind CSS
- Installed shadcn/ui
- Built marketing website
- Built responsive landing page

Added

- Hero
- Product
- AI
- Merchant
- Security
- FAQ
- Waitlist
- Footer

## Project

- Created GitHub repository
- Established project structure
- Configured development environment

---

# Sprint 2 – Authentication

**Status:** ✅ Completed

## Supabase

- Created Supabase project
- Connected Aurora to Supabase
- Configured environment variables

## Database

Created

- profiles

Enabled

- Row Level Security

Created

- User Profile Service

## Authentication

Implemented

- Register
- Login
- Logout
- Protected Dashboard
- User Profile Loading

---

# Sprint 3 – Financial Spaces

**Status:** ✅ Completed

## Database

Created

- spaces
- space_members

Enabled

- Row Level Security

Created

- Space Service Layer

## Workspace

Built

- Workspace Layout
- Sidebar
- Topbar
- User Menu

## Spaces

Implemented

- Create Space
- View Spaces
- Space Dashboard

Connected

- Supabase
- PostgreSQL

---

# Sprint 4 – Workspace Dashboard

**Status:** ✅ Completed

## Dashboard

Built

- Workspace Hero
- Continue Card
- Quick Actions
- Aurora Assist
- Recent Spaces
- Dashboard Component Architecture
- Dynamic Workspace
- Live Space Loading
- Component Library

---

# Sprint 5 – Member System

**Status:** ✅ Completed

## Database

Updated

- space_members
- space_activity

Added

- Member Service
- Activity Service

Configured

- Row Level Security
- Member Policies
- Activity Policies

## Members

Implemented

- Member Cards
- Member Statistics
- Invite Member Dialog
- Invite Member Button
- Member Actions Menu
- Remove Member
- Change Role
- Pending Invitations
- Empty States

Connected

- Supabase
- Persistent Members
- Persistent Invitations

## Activity

Implemented

- Activity Timeline
- Member Invite Events
- Member Removal Events
- Role Change Events

## UX Improvements

Added

- Professional Member Cards
- Quick Action Navigation
- Timeline Icons
- Timeline Empty State

Sprint 5 established Aurora's collaborative foundation and prepared the platform for the Expense Engine.

---

# Sprint 6 – Expenses

**Status:** ✅ Completed

## Database

Created

- expenses
- expense_splits

Updated

- Expense Service Layer
- Equal Split Engine
- Expense Relationships

## Expense Engine

Implemented

- Add Expense
- Equal Split Engine
- Accurate Split Rounding
- Expense Service Layer
- Expense Timeline
- Outstanding Balances
- Expense Details Dialog
- Settlement Progress
- Expense Status Badges
- Automatic Expense Status Calculation
- Automatic Expense Refresh
- Paid By Member Labels
- Member Name Resolution
- Receipt Placeholder

## User Experience

Added

- Professional Expense Cards
- Expense Empty State
- Expense Skeleton Loading
- Clickable Expense Details Dialog
- Pending Member Handling
- Real-Time Expense Refresh
- Professional Expense Layout

## Architecture

Improved

- Feature-Based Expense Module
- Service-Based Business Logic
- Split Engine Utilities
- Dialog-Based Expense Workflow
- Component Communication
- Type-Safe Expense Models

Sprint 6 completes Aurora's collaborative expense experience and prepares the platform for the Settlement Engine.

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
- ✅ Shared Expenses

In Progress

- 🚧 Settlements

Planned

- ⬜ Payments
- ⬜ Merchant Payments

---

# Technical Stack

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
- Row Level Security

## Authentication

- Supabase Auth

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

# Roadmap

## Sprint 6 – Expenses

✅ Completed

Delivered

- Add Expense
- Equal Split Engine
- Accurate Split Rounding
- Expense Service Layer
- Expense Timeline
- Outstanding Balances
- Expense Details Dialog
- Settlement Progress
- Expense Status Badges
- Expense Auto Refresh
- Receipt Placeholder

---

## Sprint 7 – Settlements

**Status:** 🚧 Next Sprint

Planned

- Settlement Engine
- Balance Calculator
- Debt Simplification
- Settle Up Workflow
- Settlement History
- Live Balance Updates

---

## Sprint 8 – Payments

Planned

- Australian Payment Integration
- QR Payments
- Merchant Payments
- Payment Confirmation

---

# Long-Term Vision

Aurora is not a banking application.

Aurora is a collaborative financial platform where people manage money together.

Aurora aims to become the operating system for shared financial life.

---

# Project Principles

- Product First
- Cloud Native
- AI First
- Mobile First
- Secure by Design
- Collaboration Over Transactions

---

_Last Updated: July 2026 — Sprint 6 Completed_

---

# Sprint 7 – Settlements

**Status:** 🚧 In Progress

## Settlement Foundation

Implemented

- Finance feature module
- Authoritative balance calculation engine
- Integer-cent financial calculations
- Member balance summary
- Settlement simplification algorithm
- Settlement suggestions component
- Space dashboard integration
- Automatic balance refresh after new expenses

## Database

Added

- space_balances table
- Balance refresh database function
- Balance read policy
- Concurrency-safe balance updates

## Data Integrity

Fixed

- Space owners are now added as active space members
- Existing owner membership data repaired
- Space creation workflow now creates the owner membership record

## Architecture

Improved

- Shared finance domain introduced
- Balance calculations separated from settlement UI
- Settlements consume the finance engine
- Expenses remain the source of truth for financial calculations

Sprint 7 is currently focused on balances, debt simplification, and settlement workflows.