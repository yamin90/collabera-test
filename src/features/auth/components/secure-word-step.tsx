"use client"

import { Button } from "@/components/ui/button"
import { SecureWordDisplay } from "./secure-word-display"

interface SecureWordStepProps {
  secureWord: string
  expiresAt: number
  onContinue: () => void
  onExpired?: () => void
}

export function SecureWordStep({
  secureWord,
  expiresAt,
  onContinue,
  onExpired,
}: SecureWordStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Secure Word</h3>
        <p className="text-sm text-gray-600">Please complete your login before this word expires</p>
      </div>

      <SecureWordDisplay secureWord={secureWord} expiresAt={expiresAt} onExpired={onExpired} />

      <Button onClick={onContinue} className="w-full">
        Continue to Password
      </Button>
    </div>
  )
}
