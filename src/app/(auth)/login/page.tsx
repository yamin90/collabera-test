import { LoginForm } from "@/features/auth/components/login-form"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function LoginPage() {
  // Mock session check - redirect if already authenticated
  // const session = await getServerSession(authOptions)
  // if (session?.user) {
  //   redirect('/dashboard')
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-4">
        {/* Back Button */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
