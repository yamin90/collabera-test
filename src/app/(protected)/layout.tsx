import Navbar from "@/components/navbar"

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
