# Aeon Credit Management System - Implementation Plan

## Overview
Build a modern Next.js 14 application implementing three key challenges using feature-based architecture and domain-driven design principles for the Aeon Credit Management System.

## Tech Stack Selection
- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui components (Radix UI) 
- **Styling**: TailwindCSS v3.4
- **State Management**: React Context + Server Components (No Redux)
- **Forms**: React Hook Form + Zod validation
- **Auth**: NextAuth.js v4
- **Linting**: Biome + ESLint Next.js
- **Database**: In-memory storage for demo (Map objects)
- **Architecture**: Feature-based (Domain-Driven Design)

## Priority Breakdown

### Phase 1: Architecture Setup (Priority 1) ✅
1. **Feature-Based Project Structure**
   - Migrate to src/ directory for better organization
   - Create feature modules (auth/, dashboard/, shared/)
   - Set up domain-driven architecture
   - Configure path aliases for features (@/features, @/lib, etc.)

2. **Next.js Configuration**
   - Update tsconfig.json with new path structure
   - Configure next.config.js for feature modules
   - Set up proper imports and exports
   - Maintain existing shadcn/ui and TailwindCSS setup

### Phase 2: Challenge 1 - Navbar (Priority 2)
3. **Collapsible Navbar Component**
   - Create responsive navbar with hamburger menu
   - Include search input field (non-functional)
   - Toggle between hamburger and X icon
   - Login button that navigates to Challenge 2
   - Mobile-first responsive design

### Phase 3: Challenge 2 - Authentication Flow (Priority 3)
4. **Login Page - Multi-Step Authentication (Single Page)**
   - Username input with validation
   - Server Action to generate secure word (HMAC-based)
   - Secure word display with 60-second timer
   - Password input (client-side hashing with Web Crypto API)
   - Server Action to validate complete login
   - React state management for step progression
   - No browser navigation between auth steps

5. **Secure Word Generation & Validation (Server Side)**
   - Server Action: generateSecureWord()
   - HMAC-based secure word with crypto.createHmac()
   - In-memory Map storage: userId → {secureWord, timestamp, attempts}
   - 60-second expiry validation
   - 10-second rate limiting per user
   - Integrated with login validation

6. **Login Validation (Server Action)**
   - Server Action: validateLogin()
   - Validate secure word hasn't expired
   - Mock password validation against stored hash
   - Create NextAuth session with partial authentication
   - Session state: {authenticated: true, mfaVerified: false}
   - Redirect to MFA page

7. **MFA Implementation (Separate Protected Page)**
   - Separate /mfa route protected by middleware
   - Requires authenticated session (but not MFA verified)
   - 6-digit code input form with React Hook Form
   - Mock TOTP generation with crypto.randomInt()
   - Server Action: verifyMFA()
   - 3 attempt limit with Map storage
   - Update session to: {authenticated: true, mfaVerified: true}
   - Redirect to dashboard

8. **Banking-Grade Session Management (NextAuth + Middleware)**
   - NextAuth session with custom session strategy
   - Two-tier authentication: authenticated + mfaVerified
   - Protected route middleware for different access levels
   - MFA page: requires authenticated=true
   - Dashboard: requires authenticated=true AND mfaVerified=true
   - Automatic redirects based on session state

### Phase 4: Challenge 3 - Dashboard (Priority 4)
11. **Transaction History Dashboard (Server Component)**
    - Server Component to fetch mock transaction data
    - shadcn/ui Table with built-in sorting
    - Protected route with NextAuth middleware
    - Responsive table design

### Phase 5: Integration & Testing (Priority 5)
12. **NextAuth Configuration**
    - Configure NextAuth.js v5 with credentials provider
    - Create auth middleware for protected routes
    - Session management and callbacks

13. **Final Integration & Testing**
    - End-to-end flow testing
    - Mobile responsive verification
    - Performance optimization
    - Linting and type checking

## Feature-Based Architecture Structure
```
src/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Route group for authentication
│   │   └── login/           # Multi-step login (username → secure word → password)
│   ├── mfa/                 # Separate MFA page (post-login)
│   ├── dashboard/           # Protected transaction dashboard
│   ├── layout.tsx           # Root layout with navbar
│   ├── page.tsx             # Landing page
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/route.ts  # NextAuth config
│   ├── middleware.ts        # Banking-grade route protection
│   └── globals.css          # TailwindCSS styles
├── features/                # Domain-driven feature modules
│   ├── auth/
│   │   ├── components/      # Auth-specific components
│   │   │   ├── username-step.tsx
│   │   │   ├── secure-word-step.tsx
│   │   │   ├── password-step.tsx
│   │   │   ├── login-form.tsx      # Main multi-step form container
│   │   │   └── mfa-form.tsx        # Separate MFA form
│   │   ├── actions/         # Server Actions for auth
│   │   │   ├── validate-login.ts   # Combined login validation
│   │   │   └── verify-mfa.ts       # MFA verification
│   │   ├── types/           # Auth type definitions
│   │   └── utils/           # Auth utilities (crypto, validation)
│   ├── dashboard/
│   │   ├── components/      # Dashboard components
│   │   │   └── transaction-table.tsx
│   │   ├── actions/         # Transaction data actions
│   │   └── types/           # Transaction types
│   └── shared/
│       ├── components/      # Reusable UI components
│       │   └── navbar.tsx   # Challenge 1 - Collapsible navbar
│       ├── lib/             # Shared utilities
│       └── types/           # Global types
├── lib/                     # Core utilities and configurations
│   ├── auth.ts             # NextAuth configuration
│   ├── storage.ts          # In-memory data storage
│   └── utils.ts            # General utilities
└── components/             # shadcn/ui components
    └── ui/                 # Generated shadcn/ui components
        ├── button.tsx
        ├── input.tsx
        ├── form.tsx
        └── table.tsx
```

## Server Actions (Banking-Secure Organization)
```typescript
// features/auth/actions/validate-login.ts  
// Combined secure word generation and login validation
export async function generateSecureWord(username: string)
export async function validateLogin(username: string, hashedPassword: string, secureWord: string)

// features/auth/actions/verify-mfa.ts
// Post-authentication MFA verification
export async function verifyMFA(username: string, code: string)

// features/dashboard/actions/get-transactions.ts
export async function getTransactionHistory()
```

## Feature Module Benefits
- **Domain Isolation**: Each feature is self-contained
- **Scalability**: Easy to add new features without affecting others
- **Team Collaboration**: Different teams can work on different features
- **Testing**: Each feature can be tested independently
- **Maintenance**: Easier to locate and update feature-specific code

## Key Next.js Features Used
- **App Router**: File-based routing
- **Server Components**: Default, faster rendering  
- **Server Actions**: Form submissions without API routes
- **Middleware**: Route protection
- **Built-in**: Image optimization, fonts, etc.

## Clean Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0", 
    "react-dom": "^18.0.0",
    "next-auth": "^5.0.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "@radix-ui/react-*": "latest",
    "lucide-react": "latest",
    "tailwindcss": "^3.3.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.4.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

## Security Implementation
- **Server-side validation**: All auth logic on server
- **HMAC secure words**: crypto.createHmac() 
- **Rate limiting**: In-memory Map with timestamps
- **Session security**: NextAuth httpOnly cookies
- **Input validation**: Zod schemas on server
- **CSRF protection**: Built into Next.js forms

## Success Criteria
- All three challenges implemented and functional
- Responsive design works on mobile and desktop
- All existing tools (Biome, TailwindCSS, shadcn/ui) preserved
- TypeScript strict mode maintained
- All linting and type checking passes