"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Clock } from "lucide-react"
import { useEffect, useState } from "react"

interface SecureWordDisplayProps {
  secureWord: string
  expiresAt: number
  onExpired?: () => void
}

export function SecureWordDisplay({ secureWord, expiresAt, onExpired }: SecureWordDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const remaining = Math.max(0, Math.ceil((expiresAt - now) / 1000))
      setTimeLeft(remaining)

      if (remaining === 0 && onExpired) {
        // Call expiry callback after a delay
        setTimeout(onExpired, 1000)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [expiresAt, onExpired])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-800 mb-2">Your secure word:</p>
        <div className="text-2xl font-bold text-blue-900 tracking-wider mb-2">{secureWord}</div>
        <div className={`text-sm ${timeLeft <= 10 ? "text-red-600" : "text-blue-600"}`}>
          {timeLeft > 0 ? (
            <>Expires in: {formatTime(timeLeft)}</>
          ) : (
            <span className="text-red-600 font-medium">EXPIRED</span>
          )}
        </div>
      </div>

      {timeLeft <= 10 && timeLeft > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your secure word expires in {timeLeft} seconds. Please complete your login quickly.
          </AlertDescription>
        </Alert>
      )}

      {timeLeft === 0 && (
        <Alert variant="destructive">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Your secure word has expired for security reasons. Please start over.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
