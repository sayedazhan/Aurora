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

Sprint 5 establishes Aurora's collaborative foundation and prepares the platform for the Expenses engine.

---

# Current MVP Progress

Overall Progress

███████████░░░░░░░░░░ 55%

Completed

- ✅ Marketing Website
- ✅ Authentication
- ✅ Workspace
- ✅ Financial Spaces
- ✅ Member Management
- ✅ Activity Timeline

In Progress

- 🚧 Expenses

Planned

- ⬜ Settlements
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
Expenses
    ↓
Settlements
    ↓
Payments
```

---

# Roadmap

## Sprint 6 – Expenses

- Add Expense
- Equal Split
- Custom Split
- Percentage Split
- Receipt Upload
- Expense Timeline
- Outstanding Balances

---

## Sprint 7 – Settlements

- Settlement Engine
- Payment Requests
- Debt Simplification
- Settlement History

---

## Sprint 8 – Payments

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

_Last Updated: August 2026_