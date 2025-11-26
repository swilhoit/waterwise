import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SectionCardProps {
  title: string
  description: string
  icon?: LucideIcon
  image?: string
  href?: string
  features?: string[]
  badge?: string
  variant?: 'icon' | 'image' | 'simple'
  children?: ReactNode
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  image,
  href,
  features = [],
  badge,
  variant = 'simple',
  children
}: SectionCardProps) {
  const cardContent = (
    <Card className={`h-full transition-all duration-300 ${href && !children ? 'hover:border-blue-400 cursor-pointer' : ''}`}>
      <CardHeader>
        {/* Icon Variant */}
        {variant === 'icon' && Icon && (
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        )}

        {/* Image Variant */}
        {variant === 'image' && image && (
          <div className="relative mb-4 h-48 -mx-6 -mt-6">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
            />
            {Icon && (
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
            )}
          </div>
        )}

        {badge && (
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
              {badge}
            </span>
          </div>
        )}

        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {children}

        {/* Only show button if we're NOT wrapping the whole card in a link */}
        {href && !children && (
          <div className="mt-4">
            <span className="text-blue-600 font-medium inline-flex items-center gap-2">
              Learn More 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return href && !children ? (
    <Link href={href} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}

interface SectionCardGridProps {
  cards: Array<Omit<SectionCardProps, 'children'>>
  columns?: 2 | 3 | 4
}

export function SectionCardGrid({ cards, columns = 3 }: SectionCardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {cards.map((card, index) => (
        <SectionCard key={index} {...card} />
      ))}
    </div>
  )
}

