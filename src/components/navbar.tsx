"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
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
                    <Link href="/showcase">Showcase</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/docs">Docs</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/blog">Blog</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/analytics">Analytics</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/templates">Templates</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/enterprise">Enterprise</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <div className="relative max-w-sm w-full mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search documentation..."
                className="pl-9 h-9 bg-gray-50 border-gray-300"
                aria-label="Search documentation"
              />
            </div>
          </div>

          {/* Mobile search and menu buttons */}
          <div className="md:hidden flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Search">
              <Search />
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
              {/* Mobile Navigation Links */}
              <Link
                href="/showcase"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Showcase
              </Link>
              <Link
                href="/docs"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/analytics"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Analytics
              </Link>
              <Link
                href="/templates"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="/enterprise"
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Enterprise
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="">
              <div className="flex items-center justify-between h-14 md:h-16">
                <div className="flex-1 mr-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search documentation..."
                      className="pl-9 w-full h-9"
                      autoFocus
                      aria-label="Search documentation"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <X />
                </Button>
              </div>
            </div>

            {/* Search Results/Suggestions Area */}
            <div className="py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-4 px-3 py-">Popular searches</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">Getting started</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">Components</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">Installation</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
