"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface MfaFormProps {
  username?: string
}

export function MfaForm({ username = "user" }: MfaFormProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [attemptsRemaining, setAttemptsRemaining] = useState(3)
  const [validCode, setValidCode] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  // Generate initial MFA code when component mounts
  useEffect(() => {
    const generateCode = async () => {
      try {
        const response = await fetch(`/api/verifyMfa?username=${encodeURIComponent(username)}`)
        const result = await response.json()
        if (result.success) {
          setValidCode(result.data.code)
          console.log(`MFA Code for testing: ${result.data.code}`)
        }
      } catch (error) {
        console.error("Error generating MFA code:", error)
      }
    }
    generateCode()
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code || code.length !== 6) {
      setError("Please enter a 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/verifyMfa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          code,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Sign in again with MFA verified to update the JWT token
        const signInResult = await signIn("credentials", {
          username,
          authenticated: "true",
          mfaVerified: "true",
          redirect: false,
        })

        if (signInResult?.ok) {
          // Redirect to dashboard after session update
          router.push("/dashboard")
        } else {
          setError("Failed to update session")
        }
      } else {
        setError(result.message || "Invalid code")

        let newAttemptsRemaining = attemptsRemaining
        if (result.attemptsRemaining !== undefined) {
          newAttemptsRemaining = result.attemptsRemaining
          setAttemptsRemaining(newAttemptsRemaining)
        }

        // If max attempts exceeded, logout and redirect to login
        if (result.error === "MAX_ATTEMPTS_EXCEEDED" || newAttemptsRemaining === 0) {
          setAttemptsRemaining(0)
          setIsRedirecting(true)
          await signOut({ redirect: false })
          setTimeout(() => {
            router.push("/login")
          }, 3000)
        }

        // Clear the code input
        setCode("")
      }
    } catch (error) {
      console.error("Error verifying MFA:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length <= 6) {
      setCode(value)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Security Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-800">
                For security, you have {attemptsRemaining} attempts remaining to enter the correct
                code.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* MFA Code Input */}
        {!isRedirecting && (
          <div>
            <label htmlFor="mfa-code" className="block text-sm font-medium text-gray-700 mb-2">
              Authentication Code
            </label>
            <Input
              id="mfa-code"
              name="mfaCode"
              type="text"
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              className="mt-1 text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              autoComplete="one-time-code"
              disabled={isLoading || isRedirecting}
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
        )}

        {/* Attempts Counter */}
        {!isRedirecting && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Attempts remaining:{" "}
              <span className="font-medium text-red-600">{attemptsRemaining}</span>
            </p>
          </div>
        )}

        {isRedirecting ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600">Redirecting to login...</p>
          </div>
        ) : (
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !code || code.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        )}

        {/* Development Helper */}
        {validCode && (
          <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
            <p className="text-sm text-primary/80">
              <strong>Development Mode:</strong> Valid code is{" "}
              <code className="font-mono bg-primary/10 px-1 rounded">{validCode}</code>
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
