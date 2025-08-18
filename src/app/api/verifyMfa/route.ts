import { MAX_MFA_ATTEMPTS, mfaSessions } from "@/lib/storage"
import { type NextRequest, NextResponse } from "next/server"

// Additional storage for valid MFA codes (in production, this would be generated server-side)
const mfaCodes = new Map<string, string>()

// Mock TOTP generation function
function generateMfaCode(secret: string): string {
  // Simple mock TOTP - in real app would use proper TOTP algorithm
  const timestamp = Math.floor(Date.now() / 30000) // 30-second window
  const hash = Buffer.from(`${secret}-${timestamp}`).toString("base64")
  const code = Number.parseInt(hash.slice(-6).replace(/[^0-9]/g, "1"))
    .toString()
    .padStart(6, "0")
  return code.slice(0, 6)
}

export async function POST(request: NextRequest) {
  try {
    const { username, code } = await request.json()

    // Validate request body
    if (!username || !code) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_REQUEST",
          message: "Username and code are required",
        },
        { status: 400 }
      )
    }

    const normalizedUsername = username.trim().toLowerCase()

    // Get or create MFA session
    let session = mfaSessions.get(normalizedUsername)
    if (!session) {
      const validCode = generateMfaCode(`secret-${normalizedUsername}`)
      session = {
        username: normalizedUsername,
        attempts: 0,
        issuedAt: Date.now(),
      }
      mfaSessions.set(normalizedUsername, session)
      mfaCodes.set(normalizedUsername, validCode)

      // For development, log the valid code
      console.log(`MFA Code for ${normalizedUsername}: ${validCode}`)
    }

    const providedCode = code.toString().padStart(6, "0")
    const validCode = mfaCodes.get(normalizedUsername)

    // Check if code is correct
    if (validCode === providedCode) {
      // Clean up session after successful verification
      mfaSessions.delete(normalizedUsername)
      mfaCodes.delete(normalizedUsername)

      return NextResponse.json({
        success: true,
        message: "MFA verification successful",
        data: {
          username: normalizedUsername,
          mfaVerified: true,
          nextStep: "/dashboard",
          // Signal to frontend to create NextAuth session
          createSession: true,
        },
      })
    }
    // Increment attempts
    session.attempts += 1

    if (session.attempts >= MAX_MFA_ATTEMPTS) {
      // Clean up session after max attempts
      mfaSessions.delete(normalizedUsername)
      mfaCodes.delete(normalizedUsername)

      return NextResponse.json(
        {
          success: false,
          error: "MAX_ATTEMPTS_EXCEEDED",
          message: "Too many failed attempts. Please log in again.",
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "INVALID_CODE",
        message: `Invalid code. ${MAX_MFA_ATTEMPTS - session.attempts} attempts remaining.`,
        attemptsRemaining: MAX_MFA_ATTEMPTS - session.attempts,
      },
      { status: 401 }
    )
  } catch (error) {
    console.error("MFA verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "SERVER_ERROR",
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}

// Helper endpoint to get a new MFA code (for development/testing)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ success: false, message: "Username required" }, { status: 400 })
  }

  const normalizedUsername = username.trim().toLowerCase()
  const validCode = generateMfaCode(`secret-${normalizedUsername}`)

  // Store the code for this user
  mfaSessions.set(normalizedUsername, {
    username: normalizedUsername,
    attempts: 0,
    issuedAt: Date.now(),
  })
  mfaCodes.set(normalizedUsername, validCode)

  return NextResponse.json({
    success: true,
    data: { code: validCode },
    message: "New MFA code generated",
  })
}
