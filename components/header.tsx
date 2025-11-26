"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, ChevronDown, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-context"
import { CartSheet } from "./cart-sheet"
import { SimpleNav } from "./simple-nav"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const { totalItems } = useCart()

  const navItems = [
    {
      label: "How it Works",
      dropdown: [
        { title: "What is Greywater?", href: "/what-is-greywater", description: "Learn the basics of greywater recycling" },
        { title: "How Systems Work", href: "/how-it-works", description: "Understanding greywater system mechanics" },
        { title: "Tiny House Systems", href: "/tiny-house-systems", description: "Specialized solutions for tiny homes" },
        { title: "State Laws", href: "/greywater-laws", description: "Legal requirements by state" },
        { title: "Compliance Directory", href: "/directory", description: "Browse regulations by location" }
      ]
    },
    {
      label: "Products",
      dropdown: [
        { title: "Aqua2use GWDD", href: "/products/aqua2use-gwdd", description: "Gravity-fed system for most homes" },
        { title: "GWDD with Pump", href: "/products/aqua2use-gwdd-pump", description: "Pump system for uphill irrigation" },
        { title: "Replacement Filters", href: "/products/replacement-filters", description: "Keep your system running smoothly" },
        { title: "Replacement Pumps", href: "/products/replacement-pumps", description: "Pumps and parts for repairs" },
        { title: "View All Products", href: "/products" }
      ]
    },
    {
      label: "Solutions",
      dropdown: [
        { title: "Residential Homes", href: "/solutions/residential", description: "Complete home greywater systems" },
        { title: "RVs & Trailers", href: "/solutions/rvs", description: "Mobile greywater solutions" },
        { title: "Tiny Homes", href: "/solutions/tiny-homes", description: "Compact, efficient systems" },
        { title: "Cabins & Cottages", href: "/solutions/cabins", description: "Off-grid greywater solutions" },
        { title: "Sustainable Developments", href: "/solutions/developments", description: "Community-scale systems" }
      ]
    },
    { label: "Customer Stories", href: "/customer-stories" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" }
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100" suppressHydrationWarning>
      <div className="container mx-auto px-4" suppressHydrationWarning>
        <div className="flex h-16 items-center justify-between" suppressHydrationWarning>
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo-water-wise-group.png"
              alt="Water Wise Group"
              width={150}
              height={40}
              className="h-9 w-auto"
              suppressHydrationWarning
            />
          </Link>

          {/* Desktop Navigation */}
          <SimpleNav items={navItems} />

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <CartSheet>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </CartSheet>
            
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-4 border-b border-gray-100">
                  <Image
                    src="/images/logo-water-wise-group.png"
                    alt="Water Wise Group"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
                
                {/* Mobile Nav */}
                <nav className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item) => (
                    <div key={item.label} className="px-2">
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setExpandedSection(expandedSection === item.label ? null : item.label)}
                            className="flex items-center justify-between w-full text-left px-3 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {item.label}
                            <ChevronDown 
                              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                expandedSection === item.label ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedSection === item.label && (
                            <div className="ml-3 mt-1 mb-2 border-l-2 border-gray-100 pl-3 space-y-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="block py-2 px-3 text-[14px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href!}
                          className="block px-3 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                
                {/* Mobile Footer Actions */}
                <div className="p-4 border-t border-gray-100 space-y-3">
                  <CartSheet>
                    <button className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-2 text-[14px] font-medium">
                        <ShoppingCart className="h-4 w-4" />
                        Shopping Cart
                      </span>
                      {totalItems > 0 && (
                        <span className="bg-emerald-600 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </button>
                  </CartSheet>
                  
                  <Link 
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-medium rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
