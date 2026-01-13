'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, CloudRain, Droplets, Truck, Shield, ChevronRight, Leaf, ArrowRight, Package } from 'lucide-react'
import { formatPriceDisplay } from '@/lib/price-utils'
import { AddToCartButton } from '@/app/products/[handle]/add-to-cart-button'

interface RainwaterTemplateProps {
  product: any
  productContent: any
  handle: string
}

export function RainwaterTemplate({ product, productContent, handle }: RainwaterTemplateProps) {
  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ocean-50 via-sand-50 to-sand-50">
        <div className="container mx-auto px-4 py-12 lg:py-16 relative">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-sand-500 mb-8">
              <Link href="/products" className="hover:text-ocean-600 transition-colors">Shop</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-ocean-600 font-medium">Rainwater Harvesting</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sand-900">{product.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-white border-2 border-ocean-100 shadow-xl shadow-ocean-100/50">
                  {product.images?.edges?.[0] ? (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-contain p-8"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <CloudRain className="h-24 w-24 text-ocean-200" />
                    </div>
                  )}
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-ocean-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                  <CloudRain className="h-4 w-4" />
                  Rainwater Collection
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-display text-sand-900 mb-4 leading-tight">
                    {product.title}
                  </h1>

                  {/* Price */}
                  {product.priceRange?.minVariantPrice && (
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-bold text-ocean-600">
                        {formatPriceDisplay(product.priceRange.minVariantPrice.amount)}
                      </span>
                      <div className="flex items-center gap-2 bg-sand-100 px-3 py-1.5 rounded-full border border-sand-200">
                        <Truck className="h-4 w-4 text-sand-600" />
                        <span className="text-sm font-medium text-sand-700">Free Shipping</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-lg text-sand-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="bg-white rounded-2xl p-6 border border-sand-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-sand-500 uppercase tracking-wider mb-4">
                    Key Features
                  </h3>
                  <div className="grid gap-3">
                    {productContent.features?.slice(0, 5).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-ocean-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3.5 w-3.5 text-ocean-600" />
                        </div>
                        <span className="text-sand-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <AddToCartButton product={product} />

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-sand-200">
                  <div className="flex items-center gap-2 text-sm text-sand-600">
                    <Shield className="h-4 w-4 text-ocean-500" />
                    Quality Guaranteed
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sand-600">
                    <Leaf className="h-4 w-4 text-ocean-500" />
                    Eco-Friendly
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sand-600">
                    <Package className="h-4 w-4 text-sand-500" />
                    Easy Setup
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Collect Rainwater Section */}
      <section className="py-16 bg-ocean-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-waves opacity-10" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display mb-4">
              Why Harvest Rainwater?
            </h2>
            <p className="text-xl text-ocean-100 mb-12 max-w-2xl mx-auto">
              Save money, conserve water, and create a sustainable garden
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold mb-2">600+</div>
                <div className="text-ocean-100">Gallons per inch of rain on 1,000 sq ft roof</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-ocean-100">Natural, chlorine-free water for plants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CloudRain className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold mb-2">30%</div>
                <div className="text-ocean-100">Average reduction in outdoor water use</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {productContent.specifications && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-display text-sand-900 mb-8 text-center">
                Specifications
              </h2>

              <div className="bg-sand-50 rounded-2xl p-6 border border-sand-200">
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(productContent.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 px-4 bg-white rounded-xl border border-sand-100">
                      <span className="text-sand-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-semibold text-sand-900">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {productContent.faq && productContent.faq.length > 0 && (
        <section className="py-16 bg-sand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-display text-sand-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {productContent.faq.map((item: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-sand-200 shadow-sm">
                    <h3 className="font-semibold text-sand-900 mb-2">{item.question}</h3>
                    <p className="text-sand-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-white border-t border-sand-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display text-sand-900 mb-4">
            Ready to Start Collecting Rainwater?
          </h2>
          <p className="text-sand-600 mb-6 max-w-xl mx-auto">
            Have questions about installation or which system is right for you?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
