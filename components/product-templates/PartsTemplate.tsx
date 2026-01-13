'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Wrench, Truck, Shield, ChevronRight, Settings, ArrowRight, Zap, Package, Clock } from 'lucide-react'
import { formatPriceDisplay } from '@/lib/price-utils'
import { AddToCartButton } from '@/app/products/[handle]/add-to-cart-button'

interface PartsTemplateProps {
  product: any
  productContent: any
  handle: string
}

export function PartsTemplate({ product, productContent, handle }: PartsTemplateProps) {
  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-terra-50 via-sand-50 to-sand-50">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-sand-500 mb-8">
              <Link href="/products" className="hover:text-ocean-600 transition-colors">Shop</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-terra-600 font-medium">Parts & Accessories</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sand-900">{product.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-white border-2 border-terra-100 shadow-xl shadow-terra-100/30">
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
                      <Wrench className="h-24 w-24 text-sand-300" />
                    </div>
                  )}
                </div>

                {/* Badge */}
                <div className="absolute -top-3 -right-3 bg-terra-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Quality Part
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-terra-100 border border-terra-200 text-terra-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                    <Wrench className="h-3.5 w-3.5" />
                    Parts & Accessories
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-display text-sand-900 mb-4 leading-tight">
                    {product.title}
                  </h1>

                  {/* Price */}
                  {product.priceRange?.minVariantPrice && (
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-bold text-terra-600">
                        {formatPriceDisplay(product.priceRange.minVariantPrice.amount)}
                      </span>
                      <div className="flex items-center gap-2 bg-sand-100 px-3 py-1.5 rounded-full border border-sand-200">
                        <Truck className="h-4 w-4 text-sand-500" />
                        <span className="text-sm font-medium text-sand-600">Free Shipping</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-lg text-sand-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Quick Specs Grid */}
                {productContent.specifications && (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(productContent.specifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-xl p-4 border border-sand-200">
                        <div className="text-xs text-sand-400 uppercase tracking-wider mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sand-900 font-semibold">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="pt-2">
                  <AddToCartButton product={product} />
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-sand-200">
                  <div className="flex items-center gap-2 text-sm text-sand-600">
                    <Shield className="h-4 w-4 text-terra-500" />
                    Quality Guaranteed
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sand-600">
                    <Clock className="h-4 w-4 text-sand-400" />
                    Ships in 1-2 Days
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sand-600">
                    <Package className="h-4 w-4 text-sand-400" />
                    Easy Install
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Specs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Features List */}
              <div>
                <h2 className="text-2xl font-display text-sand-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-terra-100 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-terra-600" />
                  </div>
                  Product Features
                </h2>

                <div className="space-y-3">
                  {productContent.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-sand-50 rounded-xl border border-sand-100 hover:border-terra-200 transition-colors">
                      <CheckCircle className="h-5 w-5 text-terra-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sand-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              {productContent.specifications && (
                <div>
                  <h2 className="text-2xl font-display text-sand-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-sand-100 rounded-xl flex items-center justify-center">
                      <Settings className="h-5 w-5 text-sand-600" />
                    </div>
                    Full Specifications
                  </h2>

                  <div className="bg-sand-50 rounded-2xl overflow-hidden border border-sand-200">
                    <div className="divide-y divide-sand-200">
                      {Object.entries(productContent.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center px-5 py-4 hover:bg-sand-100/50 transition-colors">
                          <span className="text-sand-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-semibold text-sand-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Notice */}
      <section className="py-12 bg-terra-50 border-y border-terra-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-terra-100 text-terra-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Compatibility Guaranteed
            </div>
            <h3 className="text-xl font-display text-sand-900 mb-2">
              Works With Your System
            </h3>
            <p className="text-sand-600">
              This part is designed to work with Aqua2use greywater systems and compatible rainwater setups.
              Contact us if you need help verifying compatibility with your specific setup.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {productContent.faq && productContent.faq.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-display text-sand-900 mb-8 text-center">
                Common Questions
              </h2>

              <div className="space-y-4">
                {productContent.faq.map((item: any, index: number) => (
                  <div key={index} className="bg-sand-50 rounded-xl p-5 border border-sand-200">
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
      <section className="py-12 bg-terra-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display mb-4">
            Need Help Finding the Right Part?
          </h2>
          <p className="text-terra-100 mb-6 max-w-xl mx-auto">
            Our team can help you identify the exact parts you need for your system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-terra-600 px-6 py-3 rounded-full font-semibold hover:bg-terra-50 transition-colors">
              Get Help
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors">
              Browse All Parts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
