'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { ShoppingCart, Check } from 'lucide-react'
import { formatPrice } from '@/lib/price-utils'

interface Product {
  id: string
  title: string
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
      node: {
        id: string
        title: string
        priceV2: {
          amount: string
          currencyCode: string
        }
        availableForSale: boolean
      }
    }>
  }
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(
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
    setTimeout(() => setIsAdded(false), 2000) // Reset after 2 seconds
  }

  if (!selectedVariant) {
    return (
      <Button size="lg" className="w-full bg-gray-400 cursor-not-allowed" disabled>
        Out of Stock
      </Button>
    )
  }

  return (
    <div>
      {product.variants?.edges && product.variants.edges.length > 1 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Select Option:</h4>
          <div className="space-y-2">
            {product.variants.edges.map((edge) => (
              <button
                key={edge.node.id}
                onClick={() => setSelectedVariant(edge.node)}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  selectedVariant?.id === edge.node.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                disabled={!edge.node.availableForSale}
              >
                <div className="flex justify-between items-center">
                  <span className={edge.node.availableForSale ? '' : 'text-gray-500'}>
                    {edge.node.title}
                  </span>
                  <span className={`font-semibold ${edge.node.availableForSale ? '' : 'text-gray-500'}`}>
                    ${formatPrice(edge.node.priceV2.amount)}
                  </span>
                </div>
                {!edge.node.availableForSale && (
                  <span className="text-sm text-gray-500">Out of Stock</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button 
        size="lg" 
        className="w-full bg-green-600 hover:bg-green-700 text-white" 
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale || isAdded}
      >
        {isAdded ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart - ${formatPrice(selectedVariant.priceV2.amount)}
          </>
        )}
      </Button>
    </div>
  )
}