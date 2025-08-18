import { SECURE_WORD_EXPIRY, secureWordSessions } from "@/lib/storage"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, hashedPassword, secureWord } = await request.json()

    // Validate request body
    if (!username || !hashedPassword || !secureWord) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_REQUEST",
          message: "Username, password, and secure word are required",
        },
        { status: 400 }
      )
    }

    const normalizedUsername = username.trim().toLowerCase()
    const session = secureWordSessions.get(normalizedUsername)

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "SESSION_NOT_FOUND",
          message: "No active session found. Please request a new secure word.",
        },
        { status: 404 }
      )
    }

    const now = Date.now()

    // Check if secure word has expired
    if (now - session.issuedAt > SECURE_WORD_EXPIRY) {
      secureWordSessions.delete(normalizedUsername)
      return NextResponse.json(
        {
          success: false,
          error: "SESSION_EXPIRED",
          message: "Secure word has expired. Please request a new one.",
        },
        { status: 410 }
      )
    }

    // Clean up session after successful validation
    secureWordSessions.delete(normalizedUsername)

    // Create NextAuth session with partial authentication (authenticated but not MFA verified)
    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        username: normalizedUsername,
        requiresMFA: true,
        nextStep: "/mfa",
        // Signal to frontend to create NextAuth session with partial auth
        createSession: true,
        authenticated: true,
        mfaVerified: false,
      },
    })
  } catch (error) {
    console.error("Error in login API:", error)

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Login validation failed. Please try again.",
      },
      { status: 500 }
    )
  }
}
