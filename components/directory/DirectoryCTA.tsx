"use client"

import Link from 'next/link'
import { ShoppingBag, Users, ArrowRight, Droplets, CloudRain } from 'lucide-react'

interface DirectoryCTAProps {
  stateName?: string
  countyName?: string
  cityName?: string
}

export default function DirectoryCTA({ stateName, countyName, cityName }: DirectoryCTAProps) {
  // Build location string for display and query params
  const locationParts = [cityName, countyName, stateName].filter(Boolean)
  const displayLocation = locationParts.length > 0
    ? locationParts.slice(0, 2).join(', ')
    : 'your area'

  // Build query string for contact page
  const locationQuery = encodeURIComponent(locationParts.join(', '))

  return (
    <section className="mt-8 mb-4">
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-emerald-100/50 bg-white/40">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-emerald-600" />
            Ready to Start Saving Water?
          </h2>
          <p className="text-gray-600 mt-1">
            Explore our water recycling systems or connect with a local installer in {displayLocation}
          </p>
        </div>

        {/* CTA Cards Grid */}
        <div className="p-6 grid md:grid-cols-2 gap-4">
          {/* Shop Systems CTA */}
          <Link
            href="/products"
            className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  Shop Greywater Systems
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Browse our complete line of greywater and rainwater harvesting systems starting at $625
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">
                    <Droplets className="h-3 w-3" />
                    Greywater
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-50 text-cyan-700 rounded text-xs font-medium">
                    <CloudRain className="h-3 w-3" />
                    Rainwater
                  </span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </Link>

          {/* Find Installer / Get Quote CTA */}
          <Link
            href={`/contact?source=directory&propertyLocation=${locationQuery}`}
            className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                  Find a Local Installer
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get a free quote from certified installers serving {displayLocation}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium">
                    Free Quote
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    24hr Response
                  </span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="px-6 pb-5 pt-0">
          <p className="text-xs text-gray-500 text-center">
            We ship nationwide and partner with installers across the country. Professional installation recommended for complex systems.
          </p>
        </div>
      </div>
    </section>
  )
}
