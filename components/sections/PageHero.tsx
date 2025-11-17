import { ReactNode } from 'react'

interface PageHeroProps {
  title: string | ReactNode
  description?: string
  variant?: 'default' | 'gradient' | 'white' | 'blue'
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
  children?: ReactNode
}

export function PageHero({
  title,
  description,
  variant = 'gradient',
  size = 'lg',
  centered = true,
  children
}: PageHeroProps) {
  const variants = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-blue-50/30',
    white: 'bg-white',
    blue: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white'
  }

  const sizes = {
    sm: 'py-12 lg:py-16',
    md: 'py-16 lg:py-24',
    lg: 'py-20 lg:py-32'
  }

  const titleSizes = {
    sm: 'text-3xl lg:text-4xl',
    md: 'text-4xl lg:text-5xl',
    lg: 'text-4xl lg:text-6xl'
  }

  const textColor = variant === 'blue' ? 'text-white' : 'text-gray-900'
  const descColor = variant === 'blue' ? 'text-blue-50' : 'text-gray-600'

  return (
    <section className={`relative ${variants[variant]} ${sizes[size]} overflow-hidden`}>
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      )}
      
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
          <h1 className={`${titleSizes[size]} font-bold ${textColor} mb-6 leading-tight animate-fade-in`}>
            {title}
          </h1>
          
          {description && (
            <p className={`text-xl ${descColor} mb-8 leading-relaxed animate-slide-up`}>
              {description}
            </p>
          )}
          
          {children}
        </div>
      </div>
    </section>
  )
}

