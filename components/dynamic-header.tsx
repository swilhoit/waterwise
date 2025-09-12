"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, BookOpen, Settings, Home, Scale, Users, DollarSign, ChevronDown, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useCart } from "./cart-context"
import { CartSheet } from "./cart-sheet"
import { MegaNav } from "./mega-nav"
import { getBlogArticles, getProducts } from "@/lib/shopify"
import { MiniProductCard } from "./mini-product-card"

export function DynamicHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [blogArticles, setBlogArticles] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const { totalItems } = useCart()
  const pathname = usePathname()
  
  // Check if we're on the home page
  const isHomePage = pathname === '/'
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    async function loadData() {
      try {
        // Load blog articles
        const articles = await getBlogArticles()
        setBlogArticles(articles.slice(0, 6)) // Take top 6 articles for dropdown
        
        // Load products
        const productsData = await getProducts()
        setProducts(productsData.slice(0, 6)) // Take top 6 products for dropdown
      } catch (error) {
        console.error('Failed to load data for navigation:', error)
        setBlogArticles([])
        setProducts([])
      }
    }
    loadData()
  }, [])

  // Handle scroll events
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 100 // Increased threshold for smoother transition
          setIsScrolled(scrolled)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check initial scroll position
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    {
      label: "How it Works",
      dropdown: [
        {
          title: "What is Greywater?",
          description: "Learn the basics of greywater recycling",
          href: "/what-is-greywater",
          icon: <BookOpen className="h-6 w-6 text-blue-600" />
        },
        {
          title: "How Systems Work",
          description: "Understanding greywater system mechanics",
          href: "/how-it-works",
          icon: <Settings className="h-6 w-6 text-green-600" />
        },
        {
          title: "Tiny House Systems",
          description: "Specialized solutions for tiny homes",
          href: "/tiny-house-systems",
          icon: <Home className="h-6 w-6 text-purple-600" />
        },
        {
          title: "State Laws",
          description: "Legal requirements by state",
          href: "/greywater-laws",
          icon: <Scale className="h-6 w-6 text-amber-600" />
        }
      ]
    },
    {
      label: "Products",
      dropdown: products.length > 0 ? products : [
        {
          title: "Aqua2use GWDD",
          description: "Gravity-fed system for most homes",
          href: "/products/aqua2use-gwdd",
          image: "/images/gwdd-gravity.jpg",
          price: "From $1,295"
        },
        {
          title: "GWDD with Pump",
          description: "Pump system for uphill irrigation",
          href: "/products/aqua2use-gwdd-pump",
          image: "/images/gwdd-ug.jpg",
          price: "From $1,695"
        },
        {
          title: "Replacement Filters",
          description: "Keep your system running smoothly",
          href: "/products/replacement-filters",
          image: "/images/aqua2use-greywater-recycling-sytem.png",
          price: "From $89"
        }
      ]
    },
    {
      label: "Solutions",
      dropdown: [
        {
          title: "Residential Homes",
          description: "Complete home greywater systems for sustainable living",
          href: "/solutions/residential",
          image: "/images/solutions/homes-ai.jpg"
        },
        {
          title: "RVs & Trailers",
          description: "Mobile greywater solutions for travel and camping",
          href: "/solutions/rvs",
          image: "/images/solutions/rvs-ai.jpg"
        },
        {
          title: "Tiny Homes",
          description: "Compact, efficient systems for minimal living",
          href: "/solutions/tiny-homes",
          image: "/images/solutions/tiny-homes-ai.jpg"
        },
        {
          title: "Cabins & Retreats",
          description: "Off-grid water recycling for remote locations",
          href: "/solutions/cabins",
          image: "/images/solutions/cabins-ai.jpg"
        },
        {
          title: "Commercial Sites",
          description: "Large-scale systems for businesses and developments",
          href: "/solutions/remote-work-sites",
          image: "/images/solutions/situation-remote-ai.jpg"
        },
        {
          title: "Laundry to Landscape",
          description: "Simple washing machine water diversion systems",
          href: "/solutions/laundry-to-landscape",
          image: "/images/solutions/situation-drought-ai.jpg"
        }
      ]
    },
    {
      label: "Directory",
      dropdown: [
        {
          title: "State Laws",
          description: "Legal requirements and permits by state",
          href: "/greywater-laws",
          icon: <Scale className="h-6 w-6 text-amber-600" />
        },
        {
          title: "Find Installers",
          description: "Certified installers in your area",
          href: "/installers",
          icon: <Users className="h-6 w-6 text-blue-600" />
        },
        {
          title: "Rebates & Incentives",
          description: "Financial incentives and rebate programs",
          href: "/rebates",
          icon: <DollarSign className="h-6 w-6 text-green-600" />
        }
      ]
    },
    {
      label: "Customer Stories",
      dropdown: [
        {
          title: "California Homeowner",
          description: "How the Johnson family reduced their water bill by 45% in drought-stricken California",
          href: "/customer-stories/california-homeowner",
          image: "/images/customer-stories/california-family.jpg"
        },
        {
          title: "Arizona Desert Oasis",
          description: "Maintaining a desert oasis with 60% less water in Phoenix",
          href: "/customer-stories/arizona-desert-oasis",
          image: "/images/customer-stories/arizona-oasis.jpg"
        }
      ]
    },
    {
      label: "Blog",
      dropdown: blogArticles.length > 0 ? blogArticles.map((article: any) => ({
        title: article.title,
        description: article.summary_html ? 
          article.summary_html.replace(/<[^>]*>/g, '').substring(0, 100) + '...' :
          "Read this article from our blog",
        href: `/blog/${article.handle}`,
        image: article.image?.src || "/images/gwdd-gravity.jpg"
      })) : [
        {
          title: "Blog Loading...",
          description: "Our blog articles are loading",
          href: "/blog",
          image: "/images/gwdd-gravity.jpg"
        }
      ]
    }
  ]

  return (
    <>
      {/* Sliding background fill for hero dropdown state */}
      {isDropdownOpen && !isScrolled && isHomePage && (
        <div 
          className="fixed inset-x-0 z-[58]"
          style={{
            top: 0,
            height: '144px', // Covers from top to nav bottom (64px offset + 80px nav)
            backgroundColor: '#F4F1E9',
            animation: 'slideDownFromTop 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards'
          }}
        />
      )}
      
      <header className={`${isScrolled || !isHomePage ? 'fixed' : 'absolute'} z-[60] w-full transition-all duration-300 ${
        isScrolled || !isHomePage
          ? '' 
          : isDropdownOpen 
          ? '' 
          : 'bg-transparent'
      }`}
      style={{
        top: isScrolled || !isHomePage ? '0px' : '64px',
        backgroundColor: (isScrolled || isDropdownOpen || !isHomePage) ? '#F4F1E9' : undefined,
        animation: isScrolled && isHomePage ? 'slideDownNav 400ms cubic-bezier(0.4, 0, 0.2, 1)' : undefined,
        transition: 'top 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 400ms ease-in-out'
      }}>
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between" style={{
          height: '80px',
          transition: 'height 300ms ease-in-out'
        }}>
          <Link href="/" className="flex items-center">
            <div className="w-80 h-16 flex items-center">
              <Image
                src={isScrolled || isDropdownOpen || !isHomePage ? "/images/logo-water-wise-group.png" : "/images/ww-white-logo.png"}
                alt="Water Wise Group"
                width={320}
                height={85}
                className="w-auto h-16 transition-all duration-300"
                style={{
                  transform: isScrolled || isDropdownOpen || !isHomePage ? 'scale(0.75)' : 'scale(1)',
                  transformOrigin: 'left center'
                }}
              />
            </div>
          </Link>

          <MegaNav 
            items={navigationItems} 
            isScrolled={isScrolled || isDropdownOpen || !isHomePage} 
            onDropdownChange={setIsDropdownOpen}
            isHomePage={isHomePage}
          />

          <div className="flex items-center gap-4 h-10">
              <CartSheet>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 transition-colors duration-300">
                  <ShoppingCart className={`h-5 w-5 ${isScrolled || isDropdownOpen || !isHomePage ? 'text-gray-900' : 'text-white'}`} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </CartSheet>
              
              <Button asChild className={`h-10 px-4 transition-all duration-300 ${isScrolled || isDropdownOpen || !isHomePage ? "bg-black hover:bg-gray-800 text-white" : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"}`}>
                <Link href="/contact">Get Quote</Link>
              </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className={`h-5 w-5 transition-colors duration-300 ${isScrolled || isDropdownOpen || !isHomePage ? 'text-gray-900' : 'text-white'}`} />
          </Button>

          {/* Full Screen Mobile Overlay */}
          {isOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50 animate-fade-in"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl animate-slide-in-right">
                <div className="flex items-center justify-between p-4 border-b">
                  <Image
                    src="/images/logo-water-wise-group.png"
                    alt="Water Wise Group"
                    width={180}
                    height={48}
                    className="h-8 w-auto"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col p-4 space-y-2 h-full overflow-y-auto">
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      {item.dropdown ? (
                        <>
                          <button
                            className="flex items-center justify-between w-full p-3 text-left text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                          >
                            <span className="font-medium">{item.label}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${
                              activeSubmenu === item.label ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {activeSubmenu === item.label && (
                            <div className="pl-4 py-2 space-y-1 border-l-2 border-gray-100 ml-3">
                              {item.dropdown.map((subItem: any, subIndex: number) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href || '#'}
                                  className="block p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                  onClick={() => {
                                    setIsOpen(false)
                                    setActiveSubmenu(null)
                                  }}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : item.href ? (
                        <Link
                          href={item.href}
                          className="block p-3 font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : null}
                    </div>
                  ))}

                  {/* Mobile CTA and Cart */}
                  <div className="pt-6 border-t border-gray-100 space-y-3 mt-auto">
                    <CartSheet>
                      <Button variant="outline" className="w-full justify-start">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cart ({totalItems})
                      </Button>
                    </CartSheet>
                    <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                      <Link href="/contact">Get Quote</Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
    </>
  )
}