'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Filter, Truck, Shield, ChevronRight, Droplets, ArrowRight, RefreshCw, Clock } from 'lucide-react'
import { formatPriceDisplay } from '@/lib/price-utils'
import { AddToCartButton } from '@/app/products/[handle]/add-to-cart-button'

interface FiltrationTemplateProps {
  product: any
  productContent: any
  handle: string
}

export function FiltrationTemplate({ product, productContent, handle }: FiltrationTemplateProps) {
  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero Section - Clean/Medical */}
      <section className="bg-gradient-to-b from-ocean-50 to-sand-50">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-sand-500 mb-8">
              <Link href="/products" className="hover:text-ocean-600 transition-colors">Shop</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-ocean-600 font-medium">Filtration</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sand-900">{product.title}</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Product Image - Smaller for filters */}
              <div className="lg:col-span-2">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-ocean-100 shadow-lg shadow-ocean-100/30">
                  {product.images?.edges?.[0] ? (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-contain p-6"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Filter className="h-20 w-20 text-ocean-200" />
                    </div>
                  )}
                </div>

                {/* Quick replacement info */}
                <div className="mt-4 bg-ocean-50 rounded-xl p-4 border border-ocean-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                      <RefreshCw className="h-5 w-5 text-ocean-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-sand-900">Easy Replacement</div>
                      <div className="text-xs text-sand-500">Tool-free cartridge swap</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:col-span-3 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Filter className="h-3.5 w-3.5" />
                    Water Filtration
                  </div>

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

                {/* Key Specs Highlight */}
                <div className="grid grid-cols-3 gap-4">
                  {productContent.specifications?.filtration && (
                    <div className="text-center p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                      <div className="text-2xl font-bold text-ocean-600">
                        {productContent.specifications.filtration}
                      </div>
                      <div className="text-xs text-sand-500 mt-1">Filtration</div>
                    </div>
                  )}
                  {productContent.specifications?.maxFlow && (
                    <div className="text-center p-4 bg-sand-100 rounded-xl border border-sand-200">
                      <div className="text-2xl font-bold text-sand-700">
                        {productContent.specifications.maxFlow}
                      </div>
                      <div className="text-xs text-sand-500 mt-1">Max Flow</div>
                    </div>
                  )}
                  {productContent.specifications?.cartridgeLife && (
                    <div className="text-center p-4 bg-sand-100 rounded-xl border border-sand-200">
                      <div className="text-2xl font-bold text-sand-700">
                        {productContent.specifications.cartridgeLife}
                      </div>
                      <div className="text-xs text-sand-500 mt-1">Cartridge Life</div>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="bg-white rounded-xl p-5 border border-sand-200">
                  <h3 className="text-sm font-semibold text-sand-500 uppercase tracking-wider mb-4">
                    Features
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {productContent.features?.slice(0, 6).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-ocean-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sand-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <AddToCartButton product={product} />

                {/* Trust */}
                <div className="flex items-center gap-6 pt-4 border-t border-sand-200 text-sm text-sand-500">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-ocean-500" />
                    Quality Assured
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-sand-400" />
                    Ships in 1-2 Days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Filtration Works */}
      <section className="py-16 bg-white border-y border-sand-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-display text-sand-900 mb-4">
              Clean Water, Simple Maintenance
            </h2>
            <p className="text-sand-600 mb-10 max-w-2xl mx-auto">
              Our filters use proven technology to remove contaminants and keep your water system running smoothly.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-sand-50 rounded-xl p-6 border border-sand-200 text-left">
                <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-ocean-600" />
                </div>
                <h3 className="font-semibold text-sand-900 mb-2">Captures Particles</h3>
                <p className="text-sm text-sand-600">
                  Multi-layer filtration catches sediment, debris, and contaminants before they reach your system.
                </p>
              </div>
              <div className="bg-sand-50 rounded-xl p-6 border border-sand-200 text-left">
                <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-ocean-600" />
                </div>
                <h3 className="font-semibold text-sand-900 mb-2">Protects Equipment</h3>
                <p className="text-sm text-sand-600">
                  Extends the life of pumps, irrigation emitters, and other downstream components.
                </p>
              </div>
              <div className="bg-sand-50 rounded-xl p-6 border border-sand-200 text-left">
                <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center mb-4">
                  <RefreshCw className="h-6 w-6 text-ocean-600" />
                </div>
                <h3 className="font-semibold text-sand-900 mb-2">Easy to Maintain</h3>
                <p className="text-sm text-sand-600">
                  Quick cartridge replacement with no special tools required. Clear housing shows when it's time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      {productContent.specifications && (
        <section className="py-16 bg-sand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-display text-sand-900 mb-8 text-center">
                Technical Specifications
              </h2>

              <div className="divide-y divide-sand-200 border border-sand-200 rounded-xl overflow-hidden bg-white">
                {Object.entries(productContent.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-4 px-5 hover:bg-sand-50 transition-colors">
                    <span className="text-sand-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-semibold text-sand-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {productContent.faq && productContent.faq.length > 0 && (
        <section className="py-16 bg-ocean-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-display text-sand-900 mb-8 text-center">
                Questions & Answers
              </h2>

              <div className="space-y-4">
                {productContent.faq.map((item: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-5 border border-ocean-100">
                    <h3 className="font-semibold text-sand-900 mb-2">{item.question}</h3>
                    <p className="text-sand-600 text-sm leading-relaxed">{item.answer}</p>
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
          <h2 className="text-xl font-display text-sand-900 mb-3">
            Need Help Choosing a Filter?
          </h2>
          <p className="text-sand-600 mb-6 max-w-lg mx-auto text-sm">
            Not sure which filter is right for your system? We're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="btn-secondary">
              All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
