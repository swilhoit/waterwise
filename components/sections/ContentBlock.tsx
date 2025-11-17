import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { ReactNode } from 'react'

interface ContentBlockProps {
  title: string
  description?: string
  features?: string[]
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  imagePosition?: 'left' | 'right'
  variant?: 'default' | 'featured'
  bgColor?: 'white' | 'gray'
  children?: ReactNode
}

export function ContentBlock({
  title,
  description,
  features = [],
  image,
  imagePosition = 'right',
  variant = 'default',
  bgColor = 'white',
  children
}: ContentBlockProps) {
  const bgClass = bgColor === 'gray' ? 'bg-gray-50' : 'bg-white'
  const isImageLeft = imagePosition === 'left'

  return (
    <section className={`py-16 lg:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content Side */}
          <div className={`animate-fade-in ${isImageLeft ? 'lg:order-2' : ''}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            
            {description && (
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {description}
              </p>
            )}
            
            {features.length > 0 && (
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.split(':')[0]}</h4>
                      {feature.includes(':') && (
                        <p className="text-gray-600">{feature.split(':')[1]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {children}
          </div>

          {/* Image Side */}
          {image && (
            <div className={`relative animate-slide-in-right ${isImageLeft ? 'lg:order-1' : ''}`}>
              {variant === 'featured' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-2xl opacity-20" />
              )}
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 600}
                height={image.height || 400}
                className="rounded-lg relative z-10 w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

