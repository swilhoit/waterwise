'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Product {
  id: string
  title: string
  handle: string
  description?: string
  priceRange?: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images?: {
    edges: Array<{
      node: {
        url: string
        altText?: string
      }
    }>
  }
}

interface BuilderProductShowcaseProps {
  title?: string
  productHandles: Array<{ handle: string }>
  columns?: string | number
}

export function BuilderProductShowcase({
  title = 'Featured Products',
  productHandles,
  columns = '3'
}: BuilderProductShowcaseProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Handle both string and number columns for Builder.io compatibility
  const colNum = typeof columns === 'string' ? parseInt(columns, 10) : columns

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch products from your API or Shopify
        const res = await fetch('/api/products')
        if (res.ok) {
          const allProducts = await res.json()
          // Filter to only requested handles
          const handles = productHandles.map(p => p.handle)
          const filtered = allProducts.filter((p: Product) => handles.includes(p.handle))
          setProducts(filtered)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productHandles?.length > 0) {
      fetchProducts()
    } else {
      setLoading(false)
    }
  }, [productHandles])

  const gridCols: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className={`grid ${gridCols[colNum] || gridCols[3]} gap-8 max-w-6xl mx-auto`}>
            {[...Array(colNum)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            {title}
          </h2>
        )}

        <div className={`grid ${gridCols[colNum] || gridCols[3]} gap-8 max-w-6xl mx-auto`}>
          {products.map((product) => {
            const imageUrl = product.images?.edges?.[0]?.node?.url
            const price = product.priceRange?.minVariantPrice?.amount

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all">
                  {/* Product Image */}
                  <div className="aspect-square relative bg-gray-50">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>
                    {price && (
                      <p className="text-2xl font-bold text-emerald-600 mb-4">
                        ${parseFloat(price).toFixed(0)}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-300"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
