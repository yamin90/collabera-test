import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
// import { authOptions } from '@/lib/auth'

export default async function MFAPage() {
  // Mock session check - redirect if not authenticated or already MFA verified
  // const session = await getServerSession(authOptions)
  // if (!session?.user) {
  //   redirect('/login')
  // }
  // if (session?.user.mfaVerified) {
  //   redirect('/dashboard')
  // }

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

        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* TODO: MFA verification form */}
          <div className="space-y-6">
            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-800">
                    For security, you have 3 attempts to enter the correct code.
                  </p>
                </div>
              </div>
            </div>

            {/* MFA Code Input */}
            <div>
              <label htmlFor="mfa-code" className="block text-sm font-medium text-gray-700">
                Authentication Code
              </label>
              <input
                id="mfa-code"
                name="mfaCode"
                type="text"
                maxLength={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-center text-2xl font-mono tracking-widest"
                placeholder="000000"
                autoComplete="one-time-code"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* Attempts Counter */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Attempts remaining: <span className="font-medium text-red-600">3</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Verify Code
            </button>

            <div className="text-center">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
                Resend code
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">Protected by banking-grade security</p>
        </div>
      </div>
    </div>
  )
}
