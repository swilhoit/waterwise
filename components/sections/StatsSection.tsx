interface Stat {
  value: string
  label: string
  sublabel?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'gray'
}

interface StatsSectionProps {
  title?: string
  subtitle?: string
  stats: Stat[]
  variant?: 'default' | 'compact'
  bgColor?: 'white' | 'gray'
}

export function StatsSection({
  title,
  subtitle,
  stats,
  variant = 'default',
  bgColor = 'gray'
}: StatsSectionProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    gray: 'bg-gray-100 text-gray-600'
  }

  const bgClass = bgColor === 'gray' ? 'bg-gray-50' : 'bg-white'

  return (
    <section className={`py-16 lg:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
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

        <div className={`grid ${stats.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-8 max-w-5xl mx-auto`}>
          {stats.map((stat, index) => {
            const colorClass = colorClasses[stat.color || 'blue']
            
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{stat.label}</h3>
                {stat.sublabel && (
                  <p className="text-sm text-gray-600">{stat.sublabel}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

