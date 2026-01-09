'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { ShoppingCart, Check, Droplets, Zap, Building, Home, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/price-utils'
import { Badge } from '@/components/ui/badge'

interface VariantSpecs {
  capacity?: string
  flow?: string
  solidRemoval?: string
  power?: string
}

interface VariantNode {
  id: string
  title: string
  priceV2: {
    amount: string
    currencyCode: string
  }
  availableForSale: boolean
  variantType?: string
  subtitle?: string
  specs?: VariantSpecs
  bestFor?: string
}

interface Product {
  id: string
  title: string
  handle?: string
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
  variants?: {
    edges: Array<{
      node: VariantNode
    }>
  }
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<VariantNode | null>(
    product.variants?.edges?.[0]?.node || null
  )

  const handleAddToCart = () => {
    if (!selectedVariant) return

    const price = parseFloat(selectedVariant.priceV2.amount)
    const image = product.images?.edges?.[0]?.node?.url

    addItem({
      id: product.id,
      variantId: selectedVariant.id,
      title: `${product.title} - ${selectedVariant.title}`,
      image,
      price,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (!selectedVariant) {
    return (
      <Button size="lg" className="w-full bg-gray-400 cursor-not-allowed" disabled>
        Out of Stock
      </Button>
    )
  }

  // Check if this is the unified aqua2use product with enhanced variant data
  const hasEnhancedVariants = product.variants?.edges?.some(e => e.node.specs || e.node.subtitle)
  const isAqua2use = product.handle === 'aqua2use'

  // Get icon for variant type
  const getVariantIcon = (variantType?: string) => {
    switch (variantType) {
      case 'gwdd-gravity':
        return <Droplets className="h-5 w-5 text-blue-600" />
      case 'gwdd-pump':
        return <Zap className="h-5 w-5 text-amber-600" />
      case 'pro':
        return <Building className="h-5 w-5 text-purple-600" />
      default:
        return <Home className="h-5 w-5 text-gray-600" />
    }
  }

  // Get badge for variant
  const getVariantBadge = (variantType?: string) => {
    switch (variantType) {
      case 'gwdd-gravity':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Entry Level</Badge>
      case 'gwdd-pump':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">Most Popular</Badge>
      case 'pro':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">Commercial</Badge>
      default:
        return null
    }
  }

  return (
    <div>
      {product.variants?.edges && product.variants.edges.length > 1 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-lg">Select Configuration:</h4>
          <div className="space-y-3">
            {product.variants.edges.map((edge) => {
              const variant = edge.node
              const isSelected = selectedVariant?.id === variant.id

              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${!variant.availableForSale ? 'opacity-60' : ''}`}
                  disabled={!variant.availableForSale}
                >
                  {/* Enhanced variant display */}
                  {(hasEnhancedVariants || isAqua2use) && variant.specs ? (
                    <div className="space-y-3">
                      {/* Header row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            {getVariantIcon(variant.variantType)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold text-base ${variant.availableForSale ? 'text-gray-900' : 'text-gray-500'}`}>
                                {variant.title}
                              </span>
                              {getVariantBadge(variant.variantType)}
                            </div>
                            {variant.subtitle && (
                              <span className="text-sm text-gray-500">{variant.subtitle}</span>
                            )}
                          </div>
                        </div>
                        <span className={`text-xl font-bold ${variant.availableForSale ? 'text-gray-900' : 'text-gray-500'}`}>
                          ${formatPrice(variant.priceV2.amount)}
                        </span>
                      </div>

                      {/* Specs grid */}
                      {variant.specs && (
                        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100">
                          {variant.specs.capacity && (
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Capacity</div>
                              <div className="text-sm font-medium">{variant.specs.capacity}</div>
                            </div>
                          )}
                          {variant.specs.flow && (
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Flow Rate</div>
                              <div className="text-sm font-medium">{variant.specs.flow}</div>
                            </div>
                          )}
                          {variant.specs.solidRemoval && (
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Filtration</div>
                              <div className="text-sm font-medium">{variant.specs.solidRemoval}</div>
                            </div>
                          )}
                          {variant.specs.power && (
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Power</div>
                              <div className="text-sm font-medium">{variant.specs.power}</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Best for */}
                      {variant.bestFor && (
                        <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Best for:</span> {variant.bestFor}
                          </span>
                        </div>
                      )}

                      {!variant.availableForSale && (
                        <span className="text-sm text-red-500 font-medium">Currently Out of Stock</span>
                      )}
                    </div>
                  ) : (
                    /* Simple variant display for non-aqua2use products */
                    <div className="flex justify-between items-center">
                      <span className={variant.availableForSale ? '' : 'text-gray-500'}>
                        {variant.title}
                      </span>
                      <span className={`font-semibold ${variant.availableForSale ? '' : 'text-gray-500'}`}>
                        ${formatPrice(variant.priceV2.amount)}
                      </span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <Button
        size="lg"
        className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg"
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale || isAdded}
      >
        {isAdded ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart - ${formatPrice(selectedVariant.priceV2.amount)}
          </>
        )}
      </Button>
    </div>
  )
}