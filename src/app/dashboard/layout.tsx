import { ProtectedNavbar } from "@/components/protected-navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProtectedNavbar />
      <main>{children}</main>
    </div>
  )
}
