import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  iconColor?: string
  iconBgColor?: string
}

interface FeatureGridProps {
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  centered?: boolean
  variant?: 'default' | 'cards'
}

export function FeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
  centered = true,
  variant = 'default'
}: FeatureGridProps) {
  const gridCols = {
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

        <div className={`grid ${gridCols[columns]} gap-8 max-w-7xl mx-auto`}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon
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

