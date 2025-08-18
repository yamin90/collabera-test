"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PasswordStep } from "./password-step"
import { SecureWordStep } from "./secure-word-step"
import { UsernameStep } from "./username-step"

type LoginStep = "username" | "secure-word" | "password"

interface SecureWordData {
  secureWord: string
  expiresAt: number
}

export function LoginForm() {
  const [currentStep, setCurrentStep] = useState<LoginStep>("username")
  const [username, setUsername] = useState("")
  const [secureWordData, setSecureWordData] = useState<SecureWordData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleUsernameSubmit = async (usernameInput: string) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/getSecureWord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameInput }),
      })

      const result = await response.json()

      if (result.success) {
        setUsername(usernameInput)
        setSecureWordData({
          secureWord: result.data.secureWord,
          expiresAt: result.data.expiresAt,
        })
        setCurrentStep("secure-word")
      } else {
        setError(result.message || "Failed to generate secure word")
      }
    } catch (error) {
      console.error("Error generating secure word:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSecureWordContinue = () => {
    setCurrentStep("password")
  }

  const handlePasswordSubmit = async (hashedPassword: string) => {
    setIsLoading(true)
    setError("")

    if (!secureWordData) {
      setError("Session expired. Please start over.")
      return
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          hashedPassword,
          secureWord: secureWordData.secureWord,
        }),
      })

      const result = await response.json()

      if (result.success && result.data.createSession) {
        // Create NextAuth session with partial authentication
        const signInResult = await signIn("credentials", {
          username,
          authenticated: result.data.authenticated.toString(),
          mfaVerified: result.data.mfaVerified.toString(),
          redirect: false,
        })

        if (signInResult?.ok) {
          // Redirect to MFA page (now protected)
          router.push("/mfa")
        } else {
          setError("Failed to create session")
        }
      } else {
        setError(result.message || "Login failed")

        // If session expired or not found, restart the process
        if (result.error === "SESSION_EXPIRED" || result.error === "SESSION_NOT_FOUND") {
          handleStartOver()
        }
      }
    } catch (error) {
      console.error("Error during login:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartOver = () => {
    setCurrentStep("username")
    setUsername("")
    setSecureWordData(null)
    setError("")
    setIsLoading(false)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span className={currentStep === "username" ? "text-blue-600 font-medium" : ""}>
            1. Username
          </span>
          <span className={currentStep === "secure-word" ? "text-blue-600 font-medium" : ""}>
            2. Secure Word
          </span>
          <span className={currentStep === "password" ? "text-blue-600 font-medium" : ""}>
            3. Password
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{
              width:
                currentStep === "username" ? "33%" : currentStep === "secure-word" ? "66%" : "100%",
            }}
          />
        </div>
      </div>

      {/* Step content */}
      {currentStep === "username" && (
        <UsernameStep onSubmit={handleUsernameSubmit} isLoading={isLoading} error={error} />
      )}

      {currentStep === "secure-word" && secureWordData && (
        <SecureWordStep
          secureWord={secureWordData.secureWord}
          expiresAt={secureWordData.expiresAt}
          onContinue={handleSecureWordContinue}
          onExpired={handleStartOver}
        />
      )}

      {currentStep === "password" && secureWordData && (
        <PasswordStep
          username={username}
          secureWord={secureWordData.secureWord}
          expiresAt={secureWordData.expiresAt}
          onSubmit={handlePasswordSubmit}
          isLoading={isLoading}
          error={error}
          onExpired={handleStartOver}
        />
      )}
    </div>
  )
}
