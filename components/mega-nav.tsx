"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronDown, BookOpen, Settings, Home, Scale, ShoppingCart } from "lucide-react"
import { MiniProductCard } from "./mini-product-card"

interface DropdownItem {
  title: string
  description?: string
  href?: string
  handle?: string
  icon?: React.ReactNode
  image?: string
  featuredImage?: { url?: string }
  images?: {
    edges?: Array<{
      node?: {
        url?: string
        altText?: string
      }
    }>
  }
  price?: string
  variants?: any[]
  priceRange?: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

interface MegaNavProps {
  items: {
    label: string
    href?: string
    dropdown?: DropdownItem[]
  }[]
  isScrolled?: boolean
  onDropdownChange?: (isOpen: boolean) => void
  isHomePage?: boolean
}

export function MegaNav({ items, isScrolled = false, onDropdownChange, isHomePage = true }: MegaNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setActiveDropdown(label)
    onDropdownChange?.(true)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null)
      onDropdownChange?.(false)
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
              className={`inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground' 
                  : 'bg-transparent text-white hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <button className={`inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              isScrolled 
                ? 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground' 
                : 'bg-transparent text-white hover:bg-white/10 hover:text-white'
            }`}>
              {item.label}
              <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''} ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`} />
            </button>
          )}

          {item.dropdown && activeDropdown === item.label && (
            <div 
              className={`${isScrolled || !isHomePage ? 'fixed' : 'absolute'} left-0 w-screen z-[30]`}
              style={{
                top: (isScrolled || !isHomePage) ? '80px' : '144px', // 80px for scrolled, 80px + 64px for hero state
                transition: 'top 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <div 
                className="w-full border-b shadow-lg overflow-hidden"
                style={{
                  backgroundColor: '#F4F1E9',
                  animation: 'slideDown 350ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
                  transformOrigin: 'top'
                }}>
                <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in-delayed">
                <div className={item.label === "Products" ? "block" : `grid gap-6 ${
                  item.dropdown.length <= 4 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
                    : item.dropdown.length <= 6 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {item.label === "Products" ? (
                    // Special handling for products with MiniProductCard
                    <div className="col-span-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {item.dropdown.map((dropdownItem) => {
                          const derivedImage = dropdownItem.image 
                            || dropdownItem.images?.edges?.[0]?.node?.url 
                            || dropdownItem.featuredImage?.url 
                            || '/images/gwdd-gravity.jpg'
                          return (
                            <MiniProductCard
                              key={dropdownItem.handle || dropdownItem.href}
                              title={dropdownItem.title}
                              handle={dropdownItem.handle || dropdownItem.href?.split('/').pop() || ''}
                              image={derivedImage}
                              price={dropdownItem.priceRange?.minVariantPrice?.amount || dropdownItem.price || '0'}
                              compareAtPrice={dropdownItem.variants?.[0]?.compareAtPrice?.amount}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    // Original handling for non-product items
                    item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href || '#'}
                        className="group block select-none rounded-lg leading-none no-underline outline-none transition-all"
                      >
                        {dropdownItem.image ? (
                          // Card design with text overlay for items with images - full height
                          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 transition-all min-h-[16rem]">
                            <Image
                              src={dropdownItem.image}
                              alt={dropdownItem.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            {/* Text overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <h3 className="text-sm font-bold mb-1 leading-tight">{dropdownItem.title}</h3>
                              <p className="text-xs opacity-90 line-clamp-2 leading-tight">
                                {dropdownItem.description}
                              </p>
                            </div>
                          </div>
                        ) : (
                          // Original design for items with icons
                          <div className="flex flex-col items-center text-center space-y-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              {dropdownItem.icon}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900 mb-1">{dropdownItem.title}</div>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {dropdownItem.description || ''}
                              </p>
                            </div>
                          </div>
                        )}
                      </Link>
                    ))
                  )}
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
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}