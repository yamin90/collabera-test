# Aeon Credit Management System

A modern Next.js 14 application implementing a secure authentication flow and credit management dashboard for Collabera technical assessment.

## 🎯 Project Overview

This application demonstrates three key challenges:

1. **Responsive Collapsible Navbar** - Mobile-first design with search functionality
2. **Multi-Step Authentication Flow** - Secure username → secure word → password → MFA workflow
3. **Protected Dashboard** - Transaction history with sorting and filtering

## 🏗️ Architecture

### Feature-Based Architecture (Domain-Driven Design)

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Route group for authentication
│   │   ├── login/         # Username input step
│   │   ├── secure-word/   # Display secure word with timer
│   │   ├── password/      # Password input step
│   │   └── mfa/           # Multi-factor authentication
│   ├── dashboard/         # Protected transaction dashboard
│   ├── layout.tsx         # Root layout with navbar
│   └── page.tsx           # Landing page
├── components/            # Shared UI components
│   ├── ui/               # shadcn/ui base components (Button, Input, etc.)
│   └── navbar.tsx        # Custom shared components
├── features/              # Domain-driven feature modules
│   ├── auth/
│   │   ├── components/    # Auth-specific components
│   │   ├── actions/       # Server Actions for auth
│   │   ├── types/         # Auth type definitions
│   │   └── utils/         # Auth utilities (crypto, validation)
│   └── dashboard/
│       ├── components/    # Dashboard components
│       ├── actions/       # Transaction data actions
│       └── types/         # Transaction types
├── lib/                   # All utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── storage.ts        # In-memory data storage
│   └── utils.ts          # General utilities (cn, etc.)
├── types/                 # Global type definitions
└── styles/               # Global styles
```

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
pnpm lint:fix     # Fix linting issues
pnpm format       # Format code
pnpm format:fix   # Format and fix code
pnpm type-check   # Run TypeScript checks
```

## 🔐 Authentication Flow

### Multi-Step Security Process

1. **Username Input**
   - Form validation with Zod schema
   - Server Action generates secure word using HMAC

2. **Secure Word Display**
   - 60-second expiration timer
   - Rate limiting (10-second cooldown)
   - Real-time countdown with React state

3. **Password Input**
   - Client-side hashing with Web Crypto API
   - Masked input for security
   - Server-side validation

4. **Multi-Factor Authentication**
   - 6-digit TOTP simulation
   - 3-attempt limit
   - Session creation with NextAuth

### Security Features

- **Server-side validation** - All auth logic on server
- **HMAC secure words** - Cryptographically secure tokens
- **Rate limiting** - In-memory storage with timestamps
- **Session security** - HTTPOnly cookies via NextAuth
- **Input validation** - Zod schemas on all inputs
- **CSRF protection** - Built into Next.js Server Actions

## 📊 Dashboard Features

- **Protected Route** - Middleware-based authentication
- **Server Components** - Fast server-side rendering
- **Transaction Table** - Sortable columns with shadcn/ui
- **Responsive Design** - Mobile-optimized layout
- **Mock Data** - Realistic transaction history

## 🎨 Design System

### Component Library
Built with shadcn/ui components:
- `Button` - Interactive buttons with variants
- `Input` - Form inputs with validation states
- `Form` - React Hook Form integration
- `Table` - Data tables with sorting
- `Dialog` - Modal components
- `Toast` - Notification system

### Styling Approach
- **Mobile-first** responsive design
- **CSS Variables** for theming
- **Consistent spacing** with Tailwind utilities
- **Accessible** components with ARIA support

## 🧪 Development Notes

### Server Actions
Leveraging Next.js Server Actions instead of API routes for:
- Form submissions
- Authentication logic
- Data mutations
- Better type safety and performance

### State Management
- **Server Components** for data fetching
- **React Context** for client-side state
- **In-memory storage** for demo purposes (Map objects)

### Testing Strategy
- Component testing with Jest
- E2E testing with Playwright
- Type checking with TypeScript
- Linting with Biome

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### Key Features
- Collapsible navigation menu
- Touch-friendly interfaces
- Optimized layouts per device
- Fast loading on all devices

## 🚀 Deployment

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

### Recommended Platforms
- **Vercel** - Optimal for Next.js applications
- **Netlify** - Good alternative with build optimization
- **Railway** - Simple deployment with database support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a technical assessment for Collabera.

## 📞 Support

For questions or issues, please contact the development team or create an issue in the repository.

---

Built with ❤️ using Next.js 14 and modern web technologies.