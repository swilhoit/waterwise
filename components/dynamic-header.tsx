"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, BookOpen, Settings, Home, Scale, Users, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "./cart-context"
import { CartSheet } from "./cart-sheet"
import { MegaNav } from "./mega-nav"
import { getBlogArticles } from "@/lib/shopify"

export function DynamicHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [blogArticles, setBlogArticles] = useState<any[]>([])
  const { totalItems } = useCart()

  useEffect(() => {
    async function loadBlogArticles() {
      try {
        const articles = await getBlogArticles()
        setBlogArticles(articles.slice(0, 6)) // Take top 6 articles for dropdown
      } catch (error) {
        console.error('Failed to load blog articles for navigation:', error)
        setBlogArticles([])
      }
    }
    loadBlogArticles()
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
      dropdown: [
        {
          title: "Aqua2use GWDD",
          description: "Gravity-fed system for most homes",
          href: "/products/aqua2use-gwdd",
          image: "/images/gwdd-gravity.jpg"
        },
        {
          title: "GWDD with Pump",
          description: "Pump system for uphill irrigation",
          href: "/products/aqua2use-gwdd-pump",
          image: "/images/gwdd-ug.jpg"
        },
        {
          title: "Replacement Filters",
          description: "Keep your system running smoothly",
          href: "/products/replacement-filters",
          image: "/images/aqua2use-greywater-recycling-sytem.png"
        },
        {
          title: "Replacement Pumps",
          description: "Pumps and parts for repairs",
          href: "/products/replacement-pumps",
          image: "/images/gwdd-gravity.jpg"
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="container mx-auto px-4 relative">
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

          <MegaNav items={navigationItems} />

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