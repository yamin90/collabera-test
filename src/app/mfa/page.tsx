import { MfaForm } from "@/features/auth/components/mfa-form"

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

        <MfaForm username="user" />

        <div className="text-center">
          <p className="text-xs text-gray-500">Protected by secured-grade security</p>
        </div>
      </div>
    </div>
  )
}
