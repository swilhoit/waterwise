'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Droplets, Waves, CloudRain, Wrench, Filter, ChevronDown, X } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  image: string
  price: string
  handle: string
  badge?: string
  badgeColor?: string
  category?: string
  application?: string
}

interface Category {
  id: string
  name: string
}

interface ProductCatalogProps {
  products: Product[]
  categories: Category[]
}

const priceRanges = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-100', label: 'Under $100', min: 0, max: 100 },
  { id: '100-300', label: '$100 - $300', min: 100, max: 300 },
  { id: '300-600', label: '$300 - $600', min: 300, max: 600 },
  { id: 'over-600', label: '$600+', min: 600, max: Infinity },
]

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Name: A to Z' },
]

function extractPrice(priceStr: string): number {
  const match = priceStr.match(/[\d,]+/)
  return match ? parseFloat(match[0].replace(',', '')) : 0
}

export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePriceRange, setActivePriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory)
    }

    // Filter by price range
    if (activePriceRange !== 'all') {
      const range = priceRanges.find(r => r.id === activePriceRange)
      if (range && range.min !== undefined) {
        filtered = filtered.filter(p => {
          const price = extractPrice(p.price)
          return price >= range.min! && price < range.max!
        })
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price))
        break
      case 'price-desc':
        filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price))
        break
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return filtered
  }, [products, activeCategory, activePriceRange, sortBy])

  const categoryIcons: Record<string, any> = {
    all: Droplets,
    greywater: Waves,
    rainwater: CloudRain,
    parts: Wrench,
    filtration: Filter,
  }

  // Get count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length }
    products.forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1
      }
    })
    return counts
  }, [products])

  const SidebarContent = () => (
    <>
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-sand-900 uppercase tracking-wider mb-4">Categories</h3>
        <div className="space-y-1">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Droplets
            const count = categoryCounts[cat.id] || 0
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-ocean-100 text-ocean-700'
                    : 'text-sand-600 hover:bg-sand-100 hover:text-sand-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-ocean-200 text-ocean-800' : 'bg-sand-200 text-sand-600'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-sand-900 uppercase tracking-wider mb-4">Price Range</h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setActivePriceRange(range.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activePriceRange === range.id
                  ? 'bg-ocean-100 text-ocean-700'
                  : 'text-sand-600 hover:bg-sand-100 hover:text-sand-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(activeCategory !== 'all' || activePriceRange !== 'all') && (
        <button
          onClick={() => {
            setActiveCategory('all')
            setActivePriceRange('all')
          }}
          className="w-full px-4 py-2.5 text-sm font-medium text-ocean-600 border border-ocean-200 rounded-lg hover:bg-ocean-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </>
  )

  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white border border-sand-200 rounded-2xl p-6">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Filter Button & Drawer */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-600 text-white rounded-full font-medium shadow-lg hover:bg-ocean-700 transition-colors"
        >
          <Filter className="h-5 w-5" />
          Filters
          {(activeCategory !== 'all' || activePriceRange !== 'all') && (
            <span className="w-2 h-2 bg-terra-400 rounded-full" />
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display text-sand-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-sand-500 hover:text-sand-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sand-600">
            <span className="font-medium text-sand-900">{filteredProducts.length}</span> products
          </p>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-sand-200 text-sand-700 px-4 py-2 pr-10 rounded-lg text-sm font-medium cursor-pointer hover:border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-500 pointer-events-none" />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group bg-white rounded-2xl border border-sand-200 overflow-hidden hover:border-ocean-200 transition-colors"
              >
                <div className="relative aspect-square bg-sand-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {product.badge && (
                    <span className={`absolute top-4 left-4 badge-${product.badgeColor || 'ocean'}`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-display text-sand-900 mb-2 group-hover:text-ocean-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-sm text-sand-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-sand-900">
                      {product.price}
                    </div>
                    <span className="text-ocean-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                      View <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-sand-100 rounded-2xl">
            <Droplets className="h-12 w-12 text-sand-400 mx-auto mb-4" />
            <h3 className="text-xl font-display text-sand-900 mb-2">No products found</h3>
            <p className="text-sand-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
            <button
              onClick={() => {
                setActiveCategory('all')
                setActivePriceRange('all')
              }}
              className="btn-primary"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
