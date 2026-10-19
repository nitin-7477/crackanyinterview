# Crack Any Interview — Next.js 16 Web App

A full-stack, responsive web application for frontend technical interview preparation — built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

---

## Tech Stack

- **Framework**: [Next.js 16.4.2](https://nextjs.org/) (App Router + Turbopack)
- **UI Library**: React 19.3.1
- **Language**: TypeScript
- **Database & ORM**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Styling**: Vanilla CSS Design System with Google Fonts (`Inter`, `IBM Plex Mono`)
- **Authentication**: Backend API Route Handlers with bcrypt password hashing + Client Context fallback

---

## Features

- **Next.js 16 App Router**: Server Components, Client Components, dynamic parameters `[topicId]` and `[topicId]/day/[day]`.
- **Full Backend API Route Handlers**:
  - `/api/auth/signup`: Registers users in PostgreSQL with bcrypt password hashing.
  - `/api/auth/login`: Authenticates users and returns user profile.
  - `/api/progress`: Syncs and queries day-by-day reading and quiz progress.
  - `/api/bookmarks`: Saves and removes bookmarked questions in database.
- **Prisma Schema & PostgreSQL**:
  - Models: `User`, `Progress`, `Bookmark`, `Activity`, `CustomNote`.
- **Offline / Local Fallback**: Seamlessly works with client-side state if PostgreSQL is not yet connected.
- **Interactive Quizzes & Practice**: Timed mock interview quizzes with score gates to unlock subsequent days.
- **Rich Dashboard**: Overall completion rate, daily targets, subject progress, and recent activity feed.

---

## Folder Structure

```
crackanyinterview/
├── prisma/
│   └── schema.prisma         # Prisma schema configured for PostgreSQL
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout with fonts, metadata & providers
│   │   ├── page.tsx          # Root redirect logic
│   │   ├── login/page.tsx    # Sign in view
│   │   ├── signup/page.tsx   # Sign up view
│   │   ├── forgot/page.tsx   # Password reset view
│   │   ├── dashboard/page.tsx# Dashboard & stats
│   │   ├── progress/page.tsx # Tracking across all days
│   │   ├── bookmarks/page.tsx# Saved questions
│   │   ├── settings/page.tsx # Account & goal preferences
│   │   ├── mock/page.tsx     # Mock interviews
│   │   ├── [topicId]/page.tsx# Dynamic topic learning
│   │   ├── [topicId]/day/[day]/page.tsx # Day-specific reading & practice
│   │   └── api/              # Backend API Route Handlers
│   │       ├── auth/signup/route.ts
│   │       ├── auth/login/route.ts
│   │       ├── progress/route.ts
│   │       └── bookmarks/route.ts
│   ├── components/           # Reusable UI components (AppHeader, HomeLayout, TopicView, etc.)
│   ├── context/              # AuthContext and StudyContext state providers
│   ├── lib/                  # Prisma client singleton, auth helpers, catalog helpers
│   ├── data/                 # Seed Q&A data for JavaScript, React, React Native, and Output
│   └── css/styles.css        # Clean design system styles
├── .env.example              # Environment variables template
├── next.config.mjs           # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies & scripts
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database (PostgreSQL)
Create your local or hosted PostgreSQL database (e.g. Supabase, Neon, or local Postgres), then set your connection string in `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/crackanyinterview?schema=public"
AUTH_SECRET="your_secret_key_here"
```

Generate Prisma Client and push migration:
```bash
npm run prisma:generate
npm run prisma:migrate
```

*(Optional: open Prisma Studio to view database tables)*:
```bash
npm run prisma:studio
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
