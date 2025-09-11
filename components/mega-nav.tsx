"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown, BookOpen, Settings, Home, Scale, ShoppingCart } from "lucide-react"

interface DropdownItem {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  image?: string
}

interface MegaNavProps {
  items: {
    label: string
    href?: string
    dropdown?: DropdownItem[]
  }[]
}

export function MegaNav({ items }: MegaNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
    setTimeoutId(id)
  }

  const handleDropdownMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
  }

  return (
    <nav className="hidden lg:flex items-center gap-6 relative">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          {item.href ? (
            <Link
              href={item.href}
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <button className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              {item.label}
              <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
            </button>
          )}

          {item.dropdown && activeDropdown === item.label && (
            <div className="fixed left-0 top-16 w-screen border-b shadow-lg z-50"
                 style={{
                   backgroundColor: '#F4F1E9',
                   animation: 'fadeIn 200ms ease-out'
                 }}
                 onMouseEnter={handleDropdownMouseEnter}
                 onMouseLeave={handleMouseLeave}>
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className={`grid gap-6 ${
                  item.dropdown.length <= 4 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
                    : item.dropdown.length <= 6 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href}
                      className="group block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-gray-50 hover:shadow-md"
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        {dropdownItem.image ? (
                          <div className="relative w-40 h-32 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={dropdownItem.image}
                              alt={dropdownItem.title}
                              width={160}
                              height={128}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            {dropdownItem.icon}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-gray-900 mb-1">{dropdownItem.title}</div>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {dropdownItem.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {item.label === "Products" && (
                  <div className="border-t pt-4 mt-6">
                    <Link href="/products" className="inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <span>View All Products</span>
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}

                {item.label === "Solutions" && (
                  <div className="border-t pt-4 mt-6">
                    <Link href="/solutions" className="inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <span>Explore All Solutions</span>
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}

                {item.label === "Customer Stories" && (
                  <div className="border-t pt-4 mt-6">
                    <Link href="/customer-stories" className="inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <span>View All Customer Stories</span>
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}

                {item.label === "Blog" && (
                  <div className="border-t pt-4 mt-6">
                    <Link href="/blog" className="inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <span>View All Blog Posts</span>
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}