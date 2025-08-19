"use client"

import { MfaForm } from "@/features/auth/components/mfa-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MFAPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session?.user || !session.user.authenticated) {
      // No session or not authenticated - go to login
      router.replace("/login")
      return
    }

    if (session.user.mfaVerified) {
      // Already MFA verified - go to dashboard
      router.replace("/dashboard")
      return
    }
  }, [session, status, router])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Multi-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code to complete your login
          </p>
        </div>

        <MfaForm username={session?.user?.name || "user"} />

        <div className="text-center">
          <p className="text-xs text-gray-500">Protected by secured-grade security</p>
        </div>
      </div>
    </div>
  )
}
