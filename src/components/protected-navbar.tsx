"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LogOut, Menu, User, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function ProtectedNavbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/",
    })
    router.push("/")
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/dashboard"
              className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              AEON
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 ml-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/transactions">Transactions</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/reports">Reports</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/settings">Settings</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{session?.user?.name || "User"}</p>
                <p className="text-xs text-gray-500">
                  {session?.user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile user and menu buttons */}
          <div className="md:hidden flex items-center space-x-1">
            <Button onClick={handleLogout} variant="ghost" size="icon" aria-label="Logout">
              <LogOut />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-3 bg-white">
              {/* User Info */}
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{session?.user?.name || "User"}</p>
                    <p className="text-sm text-gray-500">
                      {session?.user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Transactions
              </Link>
              <Link
                href="/reports"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Reports
              </Link>
              <Link
                href="/settings"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
