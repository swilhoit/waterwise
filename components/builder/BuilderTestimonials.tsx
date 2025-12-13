'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  location?: string
  quote: string
  rating?: number
  avatar?: string
}

interface BuilderTestimonialsProps {
  title?: string
  testimonials: Testimonial[]
}

export function BuilderTestimonials({
  title = 'What Our Customers Say',
  testimonials
}: BuilderTestimonialsProps) {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            {title}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  {testimonial.location && (
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
