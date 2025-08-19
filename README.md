# Aeon Credit Management System

A modern Next.js 14 application implementing a secure authentication flow and credit management dashboard for Collabera technical assessment.

## 🎯 Project Overview

This application demonstrates three key challenges:

1. **Responsive Collapsible Navbar** - Mobile-first design with search functionality
2. **Multi-Step Authentication Flow** - Secure username → secure word → password → MFA workflow
3. **Protected Dashboard** - Transaction history with sorting and filtering

## 🛠️ Tech Stack

### Core Framework

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with Server Components
- **TypeScript** - Type-safe development

### UI & Styling

- **shadcn/ui** - Modern component library (Radix UI)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Forms & Validation

- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation

### Authentication

- **NextAuth.js v4** - Complete authentication solution
- **Web Crypto API** - Client-side password hashing
- **Node.js Crypto** - Server-side HMAC generation

### Development Tools

- **Biome** - Fast linter and formatter
- **pnpm** - Efficient package manager
- **VS Code** - Recommended IDE

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aeon-credit-collabera

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm type-check   # Run TypeScript checks
```

## 🔐 Authentication Flow

**Phase 1: Multi-Step Login**
1. Username → Secure Word → Password (single page)
2. HMAC-generated secure word with 60s timer
3. Client-side password hashing

**Phase 2: MFA Verification**
1. 6-digit TOTP with 3-attempt limit
2. Account lockout after failed attempts
3. Complete session activation

## 🎨 Features

- **Responsive Design** - Mobile-first with collapsible navigation
- **Secure Authentication** - Multi-step flow with MFA
- **Transaction Dashboard** - Sortable data tables
- **Modern UI** - shadcn/ui components with Tailwind CSS

## 🚀 Deployment

### Live Demo

🌐 **[View Live Application](https://collabera-test-3cusd0nkj-yamin90s-projects.vercel.app/)**

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables

Create `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```
