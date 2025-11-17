import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface CTAButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

interface CTASectionProps {
  title: string
  description?: string
  buttons?: CTAButton[]
  stats?: Array<{
    value: string
    label: string
    sublabel?: string
  }>
  variant?: 'blue' | 'gradient'
  children?: ReactNode
}

export function CTASection({
  title,
  description,
  buttons = [],
  stats,
  variant = 'blue',
  children
}: CTASectionProps) {
  const bgClass = variant === 'gradient' 
    ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
    : 'bg-gradient-to-br from-blue-600 to-blue-800'

  return (
    <section className={`py-24 ${bgClass} text-white relative overflow-hidden`}>
      {variant === 'blue' && (
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 animate-fade-in">
            {title}
          </h2>
          
          {description && (
            <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-50">
              {description}
            </p>
          )}

          {stats && stats.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg font-medium">{stat.label}</div>
                  {stat.sublabel && (
                    <div className="text-sm text-blue-100 mt-1">{stat.sublabel}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  className={
                    button.variant === 'secondary'
                      ? 'bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all'
                      : 'bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all'
                  }
                  asChild
                >
                  <Link href={button.href}>{button.label}</Link>
                </Button>
              ))}
            </div>
          )}

          {children}
          
          {buttons.length > 0 && (
            <p className="mt-8 text-sm text-blue-100">
              No obligation • Expert consultation • Same-day response
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

