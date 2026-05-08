# CLAUDE.md

## Project Overview

This project is a modern, production-grade food ordering & discovery web application built with cutting-edge frontend technologies.

The goal is:
- premium UI/UX
- extremely smooth performance
- scalable architecture
- mobile-first responsive design
- modern animations
- SEO optimized
- accessible
- production-ready code quality

The application should feel comparable to:
- Uber Eats
- DoorDash
- Deliveroo
- Foodora

---

# Core Stack

## Framework
- Next.js (latest stable App Router)
- React (latest stable)
- TypeScript strict mode

## Styling
- Tailwind CSS
- shadcn/ui
- Framer Motion
- clsx
- tailwind-merge

## State Management
- Zustand

## Data Fetching
- TanStack Query (React Query)

## Forms
- React Hook Form
- Zod validation

## Icons
- Lucide React

## Animations
- Framer Motion
- smooth micro-interactions
- page transitions
- skeleton loading states

---

# Architecture Rules

## Folder Structure

Use scalable enterprise architecture.

Example:

src/
├── app/
├── components/
│   ├── ui/
│   ├── shared/
│   ├── sections/
│   └── animations/
├── features/
│   ├── auth/
│   ├── cart/
│   ├── restaurant/
│   ├── checkout/
│   └── profile/
├── hooks/
├── lib/
├── services/
├── store/
├── types/
├── utils/
├── styles/
└── constants/

---

# Frontend Requirements

## UI/UX

The design must feel:
- modern
- premium
- clean
- cinematic
- highly polished

Use:
- glassmorphism carefully
- soft shadows
- large rounded corners
- smooth hover states
- subtle gradients
- premium typography hierarchy
- spacing consistency

Avoid:
- outdated UI
- crowded layouts
- bootstrap-like appearance
- generic templates

---

# Design System

## Colors
Use semantic color tokens.

Example:
- primary
- secondary
- accent
- success
- warning
- destructive
- muted

Never hardcode colors repeatedly.

## Typography
Use:
- responsive typography
- clear hierarchy
- balanced line heights
- readable font scaling

Recommended fonts:
- Inter
- Geist
- Satoshi

---

# Performance Rules

Must prioritize performance.

## Requirements
- lazy loading
- skeletons
- dynamic imports
- optimized images
- server components by default
- minimize client components
- avoid unnecessary re-renders
- memoization where beneficial
- route-level code splitting
- proper caching strategies

## Next.js Rules
- use App Router
- use Server Actions when appropriate
- use Metadata API
- use optimized Image component
- use Suspense boundaries
- streaming when beneficial

---

# Accessibility

All components must:
- support keyboard navigation
- have aria labels
- proper semantic HTML
- sufficient color contrast
- focus-visible states

Accessibility is NOT optional.

---

# Code Quality

## TypeScript
- strict mode enabled
- avoid any
- proper typing everywhere
- reusable interfaces/types

## Component Rules
- components must be reusable
- avoid giant components
- separate logic from presentation
- use composition patterns
- avoid prop drilling

## Naming
Use clear naming conventions:
- PascalCase for components
- camelCase for functions
- kebab-case for folders

---

# API Rules

## Networking
Use:
- typed API layer
- centralized fetch utilities
- proper error handling
- loading states
- optimistic updates when useful

## Validation
All forms and API inputs must use Zod.

---

# Animation Rules

Animations should feel:
- smooth
- expensive
- natural

Avoid:
- excessive motion
- distracting effects
- slow animations

Use:
- spring animations
- stagger effects
- layout transitions
- skeleton loaders

---

# SEO

Must include:
- metadata optimization
- Open Graph tags
- Twitter cards
- semantic structure
- sitemap
- robots.txt

---

# Mobile First

The entire app must be:
- mobile-first
- touch optimized
- responsive on all screen sizes

Priority order:
1. Mobile
2. Tablet
3. Desktop

---

# Recommended Integrations

## Auth
- Clerk or Auth.js

## Payments
- Stripe

## Database
- PostgreSQL
- Prisma ORM

## Storage
- Cloudinary

## Analytics
- PostHog
- Vercel Analytics

---

# Developer Experience

## Tooling
Use:
- ESLint
- Prettier
- Husky
- lint-staged

## Git Hooks

IMPORTANT:
Before EVERY push:
1. run typecheck
2. run lint
3. run tests
4. run production build

Push MUST fail if build fails.

Required commands:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "prepare": "husky install"
  }
}