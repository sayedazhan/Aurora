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
- Added:
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

- User profile service

## Authentication

Implemented

- Register
- Login
- Logout
- Protected Dashboard
- User profile loading

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

- Space service layer

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

# Sprint 4 – Workspace Redesign

**Status:** 🚧 In Progress

Completed

- Workspace Hero
- Continue Card
- Quick Actions
- Aurora Assist
- Recent Spaces
- Dashboard component architecture

Current Progress

- Dynamic Workspace
- Live Space loading
- Component library

---

# Product Vision

Aurora is the operating system for shared financial life.

Aurora helps people manage money together across:

- Homes
- Families
- Trips
- Clubs
- Communities
- Small Businesses

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

## Authentication

- Supabase Auth

## Hosting

- Vercel

---

# Architecture

```
Website
    ↓
Authentication
    ↓
Workspace
    ↓
Spaces
    ↓
Expenses
    ↓
Settlements
    ↓
Payments
```

---

# Roadmap

## Sprint 5

### Member System

- Invite Member
- Member Roles
- Member Cards
- Activity Timeline

---

## Sprint 6

### Expenses

- Add Expense
- Split Expense
- Expense Timeline
- Receipt Upload

---

## Sprint 7

### Settlement

- Outstanding Balances
- Settlement Engine
- Payment Requests

---

## Sprint 8

### Payments

- Australian Payment Integration
- QR Payments
- Merchant Payments

---

# Long-Term Vision

Aurora is not a banking application.

Aurora is a collaborative financial platform where people manage money together.

---

# Project Principles

- Product First
- Cloud Native
- AI First
- Mobile First
- Secure by Design
- Collaboration over Transactions

---

_Last Updated: July 2026_
# Sprint 5 – Member System

**Status:** 🚧 In Progress

## Completed

- Built Member Card component
- Built Member List component
- Built Invite Member button
- Built Invite Member dialog
- Added first name, last name, email and role invite flow
- Integrated Members section into Space Dashboard
- Connected member invitations to Supabase
- Added persistent pending invitations
- Updated `space_members` table with:
  - email
  - first_name
  - last_name
  - status
  - invited_by
- Fixed nullable `user_id` for pending invites
- Cleaned Dashboard so members live inside Spaces

## In Progress

- Member Actions menu
- Role management
- Activity timeline