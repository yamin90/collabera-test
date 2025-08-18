import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Navbar from "@/components/navbar"
// import { authOptions } from '@/lib/auth'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Uncomment when NextAuth is configured
  // const session = await getServerSession(authOptions)
  // if (!session?.user?.mfaVerified) {
  //   redirect('/login')
  // }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}