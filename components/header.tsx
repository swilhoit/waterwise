"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, ChevronDown, ArrowRight, Droplets, Home, Building2, Caravan, TreePine, Shirt, BookOpen, Scale, Sparkles, Play } from "lucide-react"
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
      label: "Learn",
      dropdown: [
        { title: "What is Greywater?", href: "/blog/what-is-greywater", description: "The basics of greywater recycling" },
        { title: "Greywater Benefits", href: "/blog/greywater-benefits", description: "How greywater helps the environment" },
        { title: "How Greywater Systems Work", href: "/blog/how-can-i-use-greywater", description: "System mechanics and usage" }
      ]
    },
    {
      label: "Laws & Rebates",
      dropdown: [
        { title: "California", href: "/ca", description: "CA greywater & rainwater laws" },
        { title: "Texas", href: "/tx", description: "TX water regulations & rebates" },
        { title: "Arizona", href: "/az", description: "AZ water conservation laws" },
        { title: "Colorado", href: "/co", description: "CO rainwater & greywater rules" },
        { title: "Oregon", href: "/or", description: "OR water recycling regulations" },
        { title: "All States", href: "/directory", description: "Browse all 50 states" }
      ]
    },
    {
      label: "Products",
      dropdown: [
        { title: "Aqua2use Systems", href: "/products/aqua2use", description: "Residential to commercial solutions" },
        { title: "Replacement Filters", href: "/products/replacement-filters", description: "Keep your system running" },
        { title: "Replacement Pumps", href: "/products/replacement-pumps", description: "Pumps and parts" },
        { title: "View All Products", href: "/products" }
      ]
    },
    {
      label: "Solutions",
      dropdown: [
        { title: "Residential Homes", href: "/solutions/residential", description: "Complete home greywater systems" },
        { title: "Tiny Homes", href: "/solutions/tiny-homes", description: "Compact, efficient systems" },
        { title: "RVs & Trailers", href: "/solutions/rvs", description: "Mobile greywater solutions" },
        { title: "Laundry-to-Landscape", href: "/solutions/laundry-to-landscape", description: "Start with laundry water" },
        { title: "Cabins & Cottages", href: "/solutions/cabins", description: "Off-grid greywater solutions" }
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

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
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

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
            <SheetContent side="right" className="w-[340px] p-0 overflow-hidden">
              <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
                {/* Mobile Header */}
                <div className="p-5 border-b border-gray-100 bg-white">
                  <Image
                    src="/images/logo-water-wise-group.png"
                    alt="Water Wise Group"
                    width={130}
                    height={34}
                    className="h-9 w-auto"
                  />
                </div>

                {/* Mobile Nav */}
                <nav className="flex-1 overflow-y-auto py-3">
                  {navItems.map((item) => {
                    const iconMap: Record<string, React.ElementType> = {
                      "Learn": BookOpen,
                      "Laws & Rebates": Scale,
                      "Products": Droplets,
                      "Solutions": Home,
                      "Customer Stories": Sparkles,
                      "Blog": BookOpen,
                      "About": Building2
                    }
                    const Icon = iconMap[item.label] || Droplets

                    return (
                      <div key={item.label} className="px-3">
                        {item.dropdown ? (
                          <div>
                            <button
                              onClick={() => setExpandedSection(expandedSection === item.label ? null : item.label)}
                              className="flex items-center justify-between w-full text-left px-4 py-3.5 text-[15px] font-semibold text-gray-900 hover:bg-white rounded-xl transition-all"
                            >
                              <span className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                                  <Icon className="h-4 w-4" />
                                </span>
                                {item.label}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                                  expandedSection === item.label ? 'rotate-180 text-emerald-600' : ''
                                }`}
                              />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${
                              expandedSection === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="ml-4 mt-1 mb-3 pl-4 border-l-2 border-emerald-100 space-y-0.5">
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className="flex flex-col py-2.5 px-3 text-gray-600 hover:text-emerald-700 hover:bg-white rounded-lg transition-all"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span className="text-[14px] font-medium">{subItem.title}</span>
                                    {subItem.description && (
                                      <span className="text-[12px] text-gray-400 mt-0.5">{subItem.description}</span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href!}
                            className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold text-gray-900 hover:bg-white rounded-xl transition-all"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="p-2 rounded-lg bg-gray-100 text-gray-600">
                              <Icon className="h-4 w-4" />
                            </span>
                            {item.label}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </nav>

                {/* Mobile Footer Actions */}
                <div className="p-4 border-t border-gray-100 bg-white space-y-3">
                  <CartSheet>
                    <button className="flex items-center justify-between w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="flex items-center gap-3 text-[14px] font-semibold">
                        <ShoppingCart className="h-5 w-5 text-gray-500" />
                        Shopping Cart
                      </span>
                      {totalItems > 0 && (
                        <span className="bg-emerald-600 text-white text-[11px] font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-sm">
                          {totalItems}
                        </span>
                      )}
                    </button>
                  </CartSheet>

                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[15px] font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25"
                    onClick={() => setIsOpen(false)}
                  >
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="text-center p-3 rounded-xl bg-emerald-50">
                      <div className="text-lg font-bold text-emerald-700">40%</div>
                      <div className="text-[10px] text-emerald-600 font-medium">Water Savings</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-blue-50">
                      <div className="text-lg font-bold text-blue-700">50+ gal</div>
                      <div className="text-[10px] text-blue-600 font-medium">Saved Daily</div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
