import { ProtectedLayoutClient } from "@/components/protected-layout-client"
import { ProtectedNavbar } from "@/components/protected-navbar"
import { authOptions } from "@/lib/auth-config"
import type { Session } from "next-auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side session check for initial load/SSR
  const session = (await getServerSession(authOptions)) as Session | null
  if (!session?.user?.authenticated) redirect("/login")
  if (!session?.user?.mfaVerified) redirect("/mfa")

  return (
    <ProtectedLayoutClient>
      <div className="min-h-screen bg-gray-50">
        <ProtectedNavbar />
        <main>{children}</main>
      </div>
    </ProtectedLayoutClient>
  )
}
