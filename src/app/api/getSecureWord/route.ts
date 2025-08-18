import { createHmac } from "node:crypto"
import {
  RATE_LIMIT_WINDOW,
  SECRET_KEY,
  SECURE_WORD_EXPIRY,
  secureWordSessions,
} from "@/lib/storage"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    // Validate request body
    if (!username || typeof username !== "string" || username.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_REQUEST",
          message: "Username is required",
        },
        { status: 400 }
      )
    }

    const normalizedUsername = username.trim().toLowerCase()
    const now = Date.now()

    // Check rate limiting
    const existingSession = secureWordSessions.get(normalizedUsername)
    if (existingSession && now - existingSession.issuedAt < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: "RATE_LIMITED",
          message: "Please wait before requesting a new secure word",
          retryAfter: Math.ceil((RATE_LIMIT_WINDOW - (now - existingSession.issuedAt)) / 1000),
        },
        { status: 429 }
      )
    }

    // Generate unique secure word using HMAC
    const timestamp = now.toString()
    const data = `${normalizedUsername}:${timestamp}:${Math.random()}`
    const hmac = createHmac("sha256", SECRET_KEY)
    hmac.update(data)
    const hash = hmac.digest("hex")

    // Take first 8 characters and make uppercase for readability
    const secureWord = hash.substring(0, 8).toUpperCase()

    // Store session data
    secureWordSessions.set(normalizedUsername, {
      username: normalizedUsername,
      secureWord,
      issuedAt: now,
      attempts: 0,
    })

    const expiresAt = now + SECURE_WORD_EXPIRY
    const expiresIn = Math.floor(SECURE_WORD_EXPIRY / 1000) // seconds

    return NextResponse.json({
      success: true,
      data: {
        secureWord,
        expiresAt,
        expiresIn,
        sessionId: normalizedUsername, // In real applications, this would be a UUID
      },
    })
  } catch (error) {
    console.error("Error in getSecureWord API:", error)

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Failed to generate secure word. Please try again.",
      },
      { status: 500 }
    )
  }
}
