"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-context"
import { CartSheet } from "./cart-sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md">
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

          <nav className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>How it Works</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] bg-white  border rounded-lg">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/what-is-greywater" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">What is Greywater?</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/how-it-works" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">How Greywater Systems Work</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/tiny-house-systems" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Tiny House Systems</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/greywater-laws" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Greywater State Laws</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-screen max-w-6xl mx-auto bg-white border rounded-lg shadow-lg">
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                          <NavigationMenuLink asChild>
                            <Link href="/products/aqua2use-gwdd" className="group block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-gray-50 hover:shadow-md">
                              <div className="flex flex-col items-center text-center space-y-3">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src="/images/gwdd-gravity.jpg"
                                    alt="Aqua2use GWDD"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900 mb-1">Aqua2use GWDD</div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    Gravity-fed system for most homes
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <Link href="/products/aqua2use-gwdd-pump" className="group block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-gray-50 hover:shadow-md">
                              <div className="flex flex-col items-center text-center space-y-3">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src="/images/gwdd-ug.jpg"
                                    alt="GWDD with Pump"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900 mb-1">GWDD with Pump</div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    Pump system for uphill irrigation
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <Link href="/products/replacement-filters" className="group block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-gray-50 hover:shadow-md">
                              <div className="flex flex-col items-center text-center space-y-3">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src="/images/aqua2use-greywater-recycling-sytem.png"
                                    alt="Replacement Filters"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900 mb-1">Replacement Filters</div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    Keep your system running smoothly
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <Link href="/products/replacement-pumps" className="group block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-gray-50 hover:shadow-md">
                              <div className="flex flex-col items-center text-center space-y-3">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src="/images/gwdd-gravity.jpg"
                                    alt="Replacement Pumps"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900 mb-1">Replacement Pumps</div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    Pumps and parts for repairs
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </div>

                        <div className="border-t pt-4">
                          <NavigationMenuLink asChild>
                            <Link href="/products" className="inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                              <span>View All Products</span>
                              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] bg-white border rounded-lg">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/solutions/residential" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Residential</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Home greywater systems for gardens
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/solutions/rvs" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">RVs & Trailers</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Mobile solutions for RV parks
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/solutions/tiny-homes" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Tiny Homes</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Compact systems for tiny living
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="border-t pt-2">
                        <NavigationMenuLink asChild>
                          <Link href="/solutions" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none text-blue-600">View All Solutions →</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/customer-stories" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Customer Stories
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/blog" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
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
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/how-it-works" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  How it Works
                </Link>
                <Link href="/products" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
                <Link href="/solutions" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Solutions
                </Link>
                <Link href="/greywater-laws" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Greywater Laws
                </Link>
                <Link href="/customer-stories" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Customer Stories
                </Link>
                <Link href="/blog" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Blog
                </Link>
                <Button asChild className="mt-4 bg-black hover:bg-gray-800 text-white">
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}