import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
// import { authOptions } from '@/lib/auth'

export default async function LoginPage() {
  // Mock session check - redirect if already authenticated
  // const session = await getServerSession(authOptions)
  // if (session?.user) {
  //   redirect('/dashboard')
  // }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
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

        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* TODO: Multi-step login form container */}
          <div className="space-y-6">
            {/* Step 1: Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your username"
              />
            </div>

            {/* Step 2: Secure Word Display (hidden initially) */}
            <div className="hidden">
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">Your secure word is:</p>
                <p className="text-2xl font-bold text-blue-900">MOCK_WORD</p>
                <p className="text-xs text-blue-600">Expires in: 60 seconds</p>
              </div>
            </div>

            {/* Step 3: Password */}
            <div className="hidden">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">Secured by multi-factor authentication</p>
        </div>
      </div>
    </div>
  )
}
