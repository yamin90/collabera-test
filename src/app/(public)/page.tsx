import { Button } from "@/components/ui/button"
import { CreditCard, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-20">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Aeon Credit
          <span className="block text-blue-600">Management System</span>
        </h1>

        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Secure, modern credit management with advanced authentication flow and comprehensive
          transaction monitoring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 lg:mb-20">
          <Button asChild size="lg" className="px-8 py-6">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Security</h3>
          <p className="text-gray-600">
            Multi-factor authentication with HMAC-based secure words and client-side password
            hashing for maximum security.
          </p>
        </div>

        <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Transaction Management</h3>
          <p className="text-gray-600">
            Comprehensive dashboard for monitoring and managing credit transactions with real-time
            sorting and filtering.
          </p>
        </div>

        <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">User Experience</h3>
          <p className="text-gray-600">
            Mobile-first responsive design with intuitive navigation and seamless user experience
            across all devices.
          </p>
        </div>
      </div>
    </div>
  )
}
