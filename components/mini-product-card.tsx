import Image from "next/image"
import Link from "next/link"
import { formatPriceDisplay } from "@/lib/price-utils"

interface MiniProductCardProps {
  title: string
  handle: string
  image: string
  price: string
  compareAtPrice?: string
}

export function MiniProductCard({ title, handle, image, price, compareAtPrice }: MiniProductCardProps) {
  return (
    <Link 
      href={`/products/${handle}`}
      className="block group hover:bg-gray-50 rounded-lg transition-colors p-3"
    >
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-green-600 text-sm">
              {price?.startsWith('From') || price?.startsWith('$') ? price : formatPriceDisplay(price)}
            </span>
            {compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price) && (
              <span className="text-xs text-gray-500 line-through">
                {formatPriceDisplay(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}