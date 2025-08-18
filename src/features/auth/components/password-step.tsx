"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { useState } from "react"
import { SecureWordDisplay } from "./secure-word-display"

interface PasswordStepProps {
  username: string
  secureWord: string
  expiresAt: number
  onSubmit: (password: string) => void
  isLoading?: boolean
  error?: string
  onExpired?: () => void
}

export function PasswordStep({
  username,
  secureWord,
  expiresAt,
  onSubmit,
  isLoading,
  error,
  onExpired,
}: PasswordStepProps) {
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) return

    // Hash password using Web Crypto API (client-side)
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(password)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

      // Secure word is automatically included in payload by parent component
      onSubmit(hashedPassword)
    } catch (error) {
      console.error("Error hashing password:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Your Password</h3>
        <p className="text-sm text-gray-600">
          Username: <span className="font-medium">{username}</span>
        </p>
      </div>

      <SecureWordDisplay secureWord={secureWord} expiresAt={expiresAt} onExpired={onExpired} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
            className="w-full"
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={!password || isLoading}>
          {isLoading ? "Validating..." : "Login"}
        </Button>
      </form>
    </div>
  )
}
