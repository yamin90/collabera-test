/**
 * In-memory storage for authentication state
 * In production, this would be replaced with Redis or a database
 */

interface SecureWordSession {
  username: string
  secureWord: string
  issuedAt: number
  attempts: number
}

interface MFASession {
  username: string
  attempts: number
  issuedAt: number
}

// In-memory storage maps - using username as key
export const secureWordSessions = new Map<string, SecureWordSession>()
export const mfaSessions = new Map<string, MFASession>()

// Constants
export const SECURE_WORD_EXPIRY = 60 * 1000 // 60 seconds
export const RATE_LIMIT_WINDOW = 10 * 1000 // 10 seconds
export const MAX_MFA_ATTEMPTS = 3
export const SECRET_KEY = process.env.AUTH_SECRET || "default-secret-key-for-development"
