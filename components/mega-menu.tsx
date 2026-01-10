"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import {
  ChevronDown,
  Droplets,
  Home,
  Building2,
  Caravan,
  TreePine,
  Shirt,
  BookOpen,
  Scale,
  Sparkles,
  Filter,
  Wrench,
  ArrowRight,
  Play,
  CheckCircle2
} from "lucide-react"

interface MegaMenuProps {
  items: {
    label: string
    href?: string
    dropdown?: {
      title: string
      href: string
      description?: string
    }[]
  }[]
}

export function MegaMenu({ items }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (activeMenu !== label) {
      setIsAnimating(true)
      setActiveMenu(label)
      setTimeout(() => setIsAnimating(false), 50)
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Product items with images and details
  const productItems = [
    {
      title: "Aqua2use Systems",
      href: "/products/aqua2use",
      description: "Complete greywater recycling systems for every need",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223",
      badge: "Best Seller",
      variants: ["GWDD Gravity", "GWDD with Pump", "Pro Commercial"]
    },
    {
      title: "Replacement Filters",
      href: "/products/replacement-filters",
      description: "4-stage Matala filtration system",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368",
      price: "From $249"
    },
    {
      title: "Replacement Pumps",
      href: "/products/replacement-pumps",
      description: "Submersible pumps & controllers",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-pump.jpg?v=1719253734",
      price: "From $349"
    }
  ]

  // Solution items with icons and images
  const solutionItems = [
    {
      title: "Residential Homes",
      href: "/solutions/residential",
      description: "Complete home greywater systems for sustainable living",
      icon: Home,
      color: "emerald"
    },
    {
      title: "Tiny Homes",
      href: "/solutions/tiny-homes",
      description: "Compact, efficient systems for small spaces",
      icon: Sparkles,
      color: "cyan"
    },
    {
      title: "RVs & Trailers",
      href: "/solutions/rvs",
      description: "Mobile greywater solutions for life on the road",
      icon: Caravan,
      color: "blue"
    },
    {
      title: "Laundry-to-Landscape",
      href: "/solutions/laundry-to-landscape",
      description: "Start simple with laundry water recycling",
      icon: Shirt,
      color: "violet"
    },
    {
      title: "Cabins & Cottages",
      href: "/solutions/cabins",
      description: "Off-grid greywater solutions",
      icon: TreePine,
      color: "amber"
    },
    {
      title: "Commercial",
      href: "/solutions/commercial",
      description: "Large-scale systems for businesses",
      icon: Building2,
      color: "slate"
    }
  ]

  // Learn items with icons
  const learnItems = [
    {
      title: "What is Greywater?",
      href: "/blog/what-is-greywater",
      description: "The basics of greywater recycling",
      icon: Droplets
    },
    {
      title: "Greywater Benefits",
      href: "/blog/greywater-benefits",
      description: "How greywater helps the environment",
      icon: Sparkles
    },
    {
      title: "How Systems Work",
      href: "/blog/how-can-i-use-greywater",
      description: "System mechanics and usage",
      icon: Play
    },
    {
      title: "Laws in Your State",
      href: "/blog/laws-in-your-state",
      description: "State-by-state regulations",
      icon: Scale
    },
    {
      title: "Compliance Directory",
      href: "/directory",
      description: "Browse regulations by location",
      icon: BookOpen
    }
  ]

  const renderProductsMenu = () => (
    <div className="mega-menu-panel" onMouseEnter={() => handleMouseEnter("Products")} onMouseLeave={handleMouseLeave}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Featured Product - Large Card */}
          <div className="col-span-5">
            <Link href="/products/aqua2use" className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 p-1">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwZDlhOGQiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
                  <div className="flex">
                    <div className="w-1/2 p-6 flex flex-col justify-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full w-fit mb-3">
                        <Sparkles className="w-3 h-3" />
                        Best Seller
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        Aqua2use Systems
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        Complete greywater recycling systems for residential to commercial needs
                      </p>
                      <div className="space-y-1.5 mb-4">
                        {["GWDD Gravity — $599", "GWDD with Pump — $899", "Pro Commercial — $2,699"].map((variant, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            {variant}
                          </div>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 group-hover:gap-2.5 transition-all">
                        View All Configurations
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="w-1/2 relative">
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/50 z-10" />
                      <Image
                        src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223"
                        alt="Aqua2use System"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Products */}
          <div className="col-span-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4 pl-1">
              Parts & Accessories
            </h4>
            <div className="space-y-3">
              {[
                {
                  title: "Replacement Filters",
                  href: "/products/replacement-filters",
                  description: "4-stage Matala filtration",
                  image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368",
                  price: "$249",
                  icon: Filter
                },
                {
                  title: "Replacement Pumps",
                  href: "/products/replacement-pumps",
                  description: "Submersible pumps & controllers",
                  image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-pump.jpg?v=1719253734",
                  price: "$349",
                  icon: Wrench
                }
              ].map((product, i) => (
                <Link
                  key={i}
                  href={product.href}
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm">
                      {product.title}
                    </h5>
                    <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
                    <span className="text-sm font-bold text-emerald-600 mt-1 block">
                      From {product.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links & CTA */}
          <div className="col-span-3">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAuMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iMjAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9InVybCgjZ3JhZCkiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjIwIiByPSIzMCIgZmlsbD0idXJsKCNncmFkKSIvPjwvc3ZnPg==')] opacity-30" />
              <div className="relative">
                <Droplets className="w-8 h-8 mb-3 opacity-80" />
                <h4 className="font-bold text-lg mb-2">Save Up to 40% on Water</h4>
                <p className="text-sm text-emerald-100 mb-4 leading-relaxed">
                  Discover how much you can save with our water calculator
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <Link
              href="/products"
              className="flex items-center justify-between mt-4 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
            >
              <span className="font-medium text-gray-700 group-hover:text-emerald-700 text-sm">View All Products</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSolutionsMenu = () => (
    <div className="mega-menu-panel" onMouseEnter={() => handleMouseEnter("Solutions")} onMouseLeave={handleMouseLeave}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Solutions Grid */}
          <div className="col-span-8">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4 pl-1">
              Find Your Solution
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {solutionItems.map((solution, i) => {
                const Icon = solution.icon
                const colorClasses: Record<string, string> = {
                  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
                  cyan: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100",
                  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
                  violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
                  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
                  slate: "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                }
                return (
                  <Link
                    key={i}
                    href={solution.href}
                    className="group flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className={`p-2.5 rounded-xl transition-colors ${colorClasses[solution.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm">
                        {solution.title}
                      </h5>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                        {solution.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Featured Case Study */}
          <div className="col-span-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4 pl-1">
              Featured Story
            </h4>
            <Link href="/customer-stories" className="group block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                <Image
                  src="/images/solutions/homes-ai.jpg"
                  alt="Customer Story"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-2 block">
                    Customer Story
                  </span>
                  <h5 className="font-bold text-lg leading-tight mb-1.5">
                    "We save 150 gallons daily"
                  </h5>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    See how the Martinez family transformed their water usage
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/solutions"
              className="flex items-center justify-between mt-4 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
            >
              <span className="font-medium text-gray-700 group-hover:text-emerald-700 text-sm">All Solutions</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLearnMenu = () => (
    <div className="mega-menu-panel" onMouseEnter={() => handleMouseEnter("Learn")} onMouseLeave={handleMouseLeave}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Learn Links */}
          <div className="col-span-5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4 pl-1">
              Greywater Education
            </h4>
            <div className="space-y-1">
              {learnItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm">
                        {item.title}
                      </h5>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Video/Featured Content */}
          <div className="col-span-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4 pl-1">
              Watch & Learn
            </h4>
            <Link href="/blog/how-can-i-use-greywater" className="group block">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-how-it-works.jpg?v=1719253036"
                  alt="How Greywater Systems Work"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-blue-600 ml-1" />
                  </div>
                </div>
              </div>
              <h5 className="font-semibold text-gray-900 mt-3 group-hover:text-blue-700 transition-colors">
                How Greywater Systems Work
              </h5>
              <p className="text-sm text-gray-500 mt-1">3 minute overview</p>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="col-span-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <h4 className="font-bold text-lg mb-4">Did You Know?</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold">40%</div>
                    <div className="text-sm text-blue-200">of home water can be recycled</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm text-blue-200">gallons saved per person daily</div>
                  </div>
                </div>
                <Link
                  href="/blog/greywater-benefits"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white mt-4 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <nav className="hidden lg:flex items-center gap-1" ref={menuRef}>
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          {item.href && !item.dropdown ? (
            <Link
              href={item.href}
              className="inline-flex h-10 items-center justify-center px-4 py-2 text-[14px] font-medium text-gray-700 transition-colors hover:text-emerald-700 rounded-lg"
            >
              {item.label}
            </Link>
          ) : (
            <button
              className={`inline-flex h-10 items-center justify-center px-4 py-2 text-[14px] font-medium transition-all rounded-lg ${
                activeMenu === item.label
                  ? 'text-emerald-700'
                  : 'text-gray-700 hover:text-emerald-700'
              }`}
            >
              {item.label}
              <ChevronDown
                className={`ml-1 h-3.5 w-3.5 transition-transform duration-300 ${
                  activeMenu === item.label ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>
      ))}

      {/* Mega Menu Panels - Rendered at root level */}
      {activeMenu && (
        <div
          className={`fixed left-0 right-0 top-16 z-50 ${isAnimating ? '' : 'mega-menu-animate'}`}
          onMouseEnter={() => handleMouseEnter(activeMenu)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm mega-menu-backdrop" onClick={() => setActiveMenu(null)} />

          {/* Panel */}
          <div className="relative bg-white border-b border-gray-200 shadow-2xl">
            {activeMenu === "Products" && renderProductsMenu()}
            {activeMenu === "Solutions" && renderSolutionsMenu()}
            {activeMenu === "Learn" && renderLearnMenu()}
          </div>
        </div>
      )}

      <style jsx global>{`
        .mega-menu-animate {
          animation: megaMenuIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mega-menu-backdrop {
          animation: fadeIn 0.2s ease-out;
        }

        .mega-menu-panel {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes megaMenuIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  )
}
