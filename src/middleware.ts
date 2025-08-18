import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Login page: redirect authenticated users
    if (pathname.startsWith("/login")) {
      if (token?.authenticated && token?.mfaVerified) {
        // Fully authenticated - go to dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      if (token?.authenticated && !token?.mfaVerified) {
        // Authenticated but no MFA - go to MFA page
        return NextResponse.redirect(new URL("/mfa", req.url))
      }
      // Not authenticated - allow access to login
      return NextResponse.next()
    }

    // MFA page: requires authenticated=true
    if (pathname.startsWith("/mfa")) {
      if (!token?.authenticated) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      // If already MFA verified, redirect to dashboard
      if (token?.mfaVerified) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // Dashboard: requires authenticated=true AND mfaVerified=true
    if (pathname.startsWith("/dashboard")) {
      if (!token?.authenticated) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      if (!token?.mfaVerified) {
        return NextResponse.redirect(new URL("/mfa", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Always allow access to public routes and auth API
        if (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/api")) {
          return true
        }

        // For protected routes, require a valid token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/login/:path*", "/mfa/:path*", "/dashboard/:path*"],
}

/*
Secure Security Levels:

Flow:
- Unauthenticated → /login
- Authenticated but no MFA → /mfa  
- Fully authenticated → /dashboard
*/
