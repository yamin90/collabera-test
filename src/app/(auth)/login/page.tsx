"use client"

import { LoginForm } from "@/features/auth/components/login-form"
import { ChevronLeft } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (session?.user) {
      // Check authentication state and redirect accordingly
      if (session.user.authenticated && session.user.mfaVerified) {
        // Fully authenticated - go to dashboard
        router.replace("/dashboard")
      } else if (session.user.authenticated && !session.user.mfaVerified) {
        // Partially authenticated - go to MFA
        router.replace("/mfa")
      }
    }
  }, [session, status, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-4">
        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Secure Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Multi-step authentication for your security
          </p>
        </div>

        <LoginForm />

        <div className="text-center">
          <p className="text-xs text-gray-500">Secured by multi-factor authentication</p>
        </div>
      </div>
    </div>
  )
}
