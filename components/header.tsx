"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, ChevronDown } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-water-wise-group.png"
              alt="Water Wise Group"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <SimpleNav items={navItems} />

          <div className="hidden lg:flex items-center gap-4">
            <CartSheet>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </CartSheet>
            
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => setExpandedSection(expandedSection === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full text-left text-lg font-medium py-2 hover:bg-gray-100 rounded-md px-2"
                        >
                          {item.label}
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform ${
                              expandedSection === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedSection === item.label && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block py-2 px-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
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
                        className="block text-lg font-medium py-2 px-2 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="mt-6 space-y-3 px-2">
                  <CartSheet>
                    <Button variant="outline" className="w-full justify-start">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Cart
                      {totalItems > 0 && (
                        <span className="ml-auto bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </CartSheet>
                  
                  <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                    <Link href="/contact">Get Quote</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}