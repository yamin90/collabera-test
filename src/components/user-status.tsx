"use client"

import { CheckCircle, Shield } from "lucide-react"
import { useSession } from "next-auth/react"

export function UserStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-10 w-10" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Shield className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">Authentication Status</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Authenticated</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">MFA Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">
                Welcome, {session?.user?.name || "User"}!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
