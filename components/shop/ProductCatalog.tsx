'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Droplets, Waves, CloudRain, Wrench, Filter, ChevronDown } from 'lucide-react'

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
  const [showFilters, setShowFilters] = useState(false)

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
        // Keep original order for 'featured'
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

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-white border border-sand-200 rounded-2xl p-4 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Droplets
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-ocean-600 text-white'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>

          {/* Filter Toggle (Mobile) & Sort */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-sand-100 text-sand-700 hover:bg-sand-200"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-sand-100 text-sand-700 px-4 py-2 pr-10 rounded-full text-sm font-medium cursor-pointer hover:bg-sand-200 focus:outline-none focus:ring-2 focus:ring-ocean-500"
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
        </div>

        {/* Expandable Filters (Price Range) */}
        <div className={`mt-4 pt-4 border-t border-sand-200 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-sand-600 font-medium">Price:</span>
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setActivePriceRange(range.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activePriceRange === range.id
                    ? 'bg-ocean-100 text-ocean-700 border border-ocean-300'
                    : 'bg-sand-50 text-sand-600 border border-sand-200 hover:border-sand-300'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sand-600">
          Showing <span className="font-medium text-sand-900">{filteredProducts.length}</span> products
        </p>
        {(activeCategory !== 'all' || activePriceRange !== 'all') && (
          <button
            onClick={() => {
              setActiveCategory('all')
              setActivePriceRange('all')
            }}
            className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  )
}
