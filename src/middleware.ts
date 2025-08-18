import { getToken } from "next-auth/jwt"
import { type NextRequest, NextResponse } from "next/server"

// Define route patterns for different protection levels
const PUBLIC_ROUTES = ["/", "/api/auth"]
const AUTH_ROUTES = ["/login"]
const MFA_REQUIRED_ROUTES = ["/mfa"]
const FULLY_PROTECTED_ROUTES = ["/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // TODO: Get actual session token
  // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Mock session states for demonstration
  const mockSession = {
    authenticated: false, // Set to true after login
    mfaVerified: false, // Set to true after MFA
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute(pathname) && mockSession.authenticated) {
    return NextResponse.redirect(
      new URL(mockSession.mfaVerified ? "/dashboard" : "/mfa", request.url)
    )
  }

  // Protect MFA routes - require authentication but not MFA
  if (isMFARoute(pathname)) {
    if (!mockSession.authenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    if (mockSession.mfaVerified) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Protect fully secured routes - require both authentication and MFA
  if (isFullyProtectedRoute(pathname)) {
    if (!mockSession.authenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    if (!mockSession.mfaVerified) {
      return NextResponse.redirect(new URL("/mfa", request.url))
    }
    return NextResponse.next()
  }

  // Default: allow request
  return NextResponse.next()
}

// Route pattern helpers
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route))
}

function isMFARoute(pathname: string): boolean {
  return MFA_REQUIRED_ROUTES.some((route) => pathname.startsWith(route))
}

function isFullyProtectedRoute(pathname: string): boolean {
  return FULLY_PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes that don't require auth
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
}

/*
Banking-Grade Security Levels:

1. PUBLIC: No authentication required
   - Landing page (/)
   - Auth API endpoints (/api/auth)

2. AUTH_ONLY: Redirect if already authenticated  
   - Login page (/login)

3. MFA_PENDING: Requires authentication, but not MFA
   - MFA verification page (/mfa)

4. FULLY_SECURED: Requires both authentication AND MFA
   - Dashboard (/dashboard)
   - All other protected routes

Flow:
- Unauthenticated → /login
- Authenticated but no MFA → /mfa  
- Fully authenticated → /dashboard
*/
