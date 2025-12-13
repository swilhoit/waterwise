'use client'

import {
  Droplets,
  Leaf,
  DollarSign,
  Shield,
  Zap,
  CheckCircle,
  Home,
  Settings,
  Truck,
  Star,
  LucideIcon
} from 'lucide-react'

// Map icon names to actual components
const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Leaf,
  DollarSign,
  Shield,
  Zap,
  CheckCircle,
  Home,
  Settings,
  Truck,
  Star,
}

interface BuilderFeature {
  icon: string
  title: string
  description: string
  iconColor?: string
  iconBgColor?: string
}

interface BuilderFeatureGridProps {
  title?: string
  subtitle?: string
  features: BuilderFeature[]
  columns?: string | number
  centered?: boolean
  variant?: 'default' | 'cards'
}

export function BuilderFeatureGrid({
  title,
  subtitle,
  features,
  columns = '3',
  centered = true,
  variant = 'default'
}: BuilderFeatureGridProps) {
  // Handle both string and number columns for Builder.io compatibility
  const colNum = typeof columns === 'string' ? parseInt(columns, 10) : columns
  const gridCols: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[colNum] || gridCols[3]} gap-8 max-w-7xl mx-auto`}>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || CheckCircle
            const iconColor = feature.iconColor || 'text-blue-600'
            const iconBgColor = feature.iconBgColor || 'bg-blue-100'

            if (variant === 'cards') {
              return (
                <div
                  key={index}
                  className="bg-white border rounded-lg p-6 hover:border-blue-300 transition-colors"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${iconBgColor} rounded-lg mb-4`}>
                    <IconComponent className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            }

            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${iconBgColor} rounded-full mb-4`}>
                  <IconComponent className={`h-8 w-8 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
