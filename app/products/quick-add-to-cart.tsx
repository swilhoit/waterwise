'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { ShoppingCart, Check } from 'lucide-react'

interface DefaultProduct {
  id: string
  title: string
  image: string
  price: string
  handle: string
}

interface QuickAddToCartProps {
  product: DefaultProduct
}

export function QuickAddToCart({ product }: QuickAddToCartProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    // Parse price from string like "From $1,999"
    const priceMatch = product.price.match(/\$([0-9,]+)/)
    const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : 0

    addItem({
      id: product.id,
      variantId: `default-${product.id}`,
      title: product.title,
      image: product.image,
      price,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000) // Reset after 2 seconds
  }

  return (
    <Button 
      variant="outline"
      size="sm"
      className="w-full" 
      onClick={handleAddToCart}
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-3 w-3" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-3 w-3" />
          Quick Add
        </>
      )}
    </Button>
  )
}