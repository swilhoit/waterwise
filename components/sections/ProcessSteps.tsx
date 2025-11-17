import { LucideIcon } from 'lucide-react'

interface Step {
  number: number
  title: string
  description: string
  icon?: LucideIcon
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

interface ProcessStepsProps {
  title?: string
  subtitle?: string
  steps: Step[]
  variant?: 'default' | 'large'
}

export function ProcessSteps({
  title,
  subtitle,
  steps,
  variant = 'default'
}: ProcessStepsProps) {
  const colorClasses = {
    blue: 'bg-blue-100 group-hover:bg-blue-200 text-blue-600',
    green: 'bg-green-100 group-hover:bg-green-200 text-green-600',
    purple: 'bg-purple-100 group-hover:bg-purple-200 text-purple-600',
    orange: 'bg-orange-100 group-hover:bg-orange-200 text-orange-600'
  }

  const isLarge = variant === 'large'

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-16">
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

        <div className={`grid ${steps.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-8 max-w-6xl mx-auto`}>
          {steps.map((step, index) => {
            const Icon = step.icon
            const colorClass = colorClasses[step.color || 'blue']

            return (
              <div key={index} className="text-center group">
                <div className={`${isLarge ? 'w-24 h-24' : 'w-16 h-16'} ${colorClass} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}>
                  {Icon ? (
                    <Icon className={`${isLarge ? 'h-12 w-12' : 'h-8 w-8'}`} />
                  ) : (
                    <span className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-bold`}>
                      {step.number}
                    </span>
                  )}
                </div>
                <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-4`}>
                  {isLarge ? `${step.number}. ${step.title}` : step.title}
                </h3>
                <p className={`${isLarge ? 'text-lg' : 'text-base'} text-gray-600 leading-relaxed`}>
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

