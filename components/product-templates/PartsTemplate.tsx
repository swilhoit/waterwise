'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Wrench, Truck, Shield, ChevronRight, Settings, ArrowRight, Zap, Package } from 'lucide-react'
import { formatPriceDisplay } from '@/lib/price-utils'
import { AddToCartButton } from '@/app/products/[handle]/add-to-cart-button'

interface PartsTemplateProps {
  product: any
  productContent: any
  handle: string
}

export function PartsTemplate({ product, productContent, handle }: PartsTemplateProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section - Industrial/Functional */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-amber-400 font-medium">Parts & Accessories</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{product.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="relative order-2 lg:order-1">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm">
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
                      <Wrench className="h-24 w-24 text-slate-600" />
                    </div>
                  )}
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                  <Settings className="h-4 w-4" />
                  OEM Quality
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6 order-1 lg:order-2">
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Wrench className="h-3.5 w-3.5" />
                    Replacement Part
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {product.title}
                  </h1>

                  {/* Price */}
                  {product.priceRange?.minVariantPrice && (
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-bold text-amber-400">
                        {formatPriceDisplay(product.priceRange.minVariantPrice.amount)}
                      </span>
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                        <Truck className="h-4 w-4 text-slate-300" />
                        <span className="text-sm text-slate-300">Free Shipping</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-lg text-slate-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Quick Specs Grid */}
                {productContent.specifications && (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(productContent.specifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-white font-semibold">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Features List */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-amber-600" />
                  </div>
                  Product Features
                </h2>

                <div className="space-y-3">
                  {productContent.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              {productContent.specifications && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Settings className="h-5 w-5 text-slate-600" />
                    </div>
                    Full Specifications
                  </h2>

                  <div className="bg-slate-900 rounded-2xl overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(productContent.specifications).map(([key, value], index) => (
                          <tr key={key} className={index % 2 === 0 ? 'bg-slate-800/50' : ''}>
                            <td className="px-5 py-4 text-slate-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className="px-5 py-4 text-white font-medium text-right">
                              {String(value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Notice */}
      <section className="py-12 bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Compatibility Guaranteed
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Works With Your System
            </h3>
            <p className="text-slate-600">
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
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Common Questions
              </h2>

              <div className="space-y-4">
                {productContent.faq.map((item: any, index: number) => (
                  <details key={index} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-slate-900 hover:bg-slate-100 transition-colors">
                      {item.question}
                      <ChevronRight className="h-5 w-5 text-slate-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need Help Finding the Right Part?
          </h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Our team can help you identify the exact parts you need for your system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-400 transition-colors">
              Get Help
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors">
              Browse All Parts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
