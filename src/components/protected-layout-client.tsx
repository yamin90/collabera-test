"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ProtectedLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session?.user || !session.user.authenticated) {
      // No session or not authenticated - go to login
      router.replace("/login")
      return
    }

    if (!session.user.mfaVerified) {
      // Not MFA verified - go to MFA
      router.replace("/mfa")
      return
    }
  }, [session, status, router])

  // Show loading or content based on session status
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    )
  }

  // Only render children if properly authenticated
  if (session?.user?.authenticated && session?.user?.mfaVerified) {
    return <>{children}</>
  }

  // Return nothing while redirecting
  return null
}
