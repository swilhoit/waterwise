"use client"

import Link from 'next/link'
import { MapPin, Droplets, CloudRain, DollarSign, ArrowRight } from 'lucide-react'

interface LocationCTAProps {
  variant?: 'inline' | 'card' | 'banner'
  title?: string
  description?: string
}

const topStates = [
  { name: 'California', code: 'ca', rebates: '50+' },
  { name: 'Texas', code: 'tx', rebates: '30+' },
  { name: 'Arizona', code: 'az', rebates: '25+' },
  { name: 'Colorado', code: 'co', rebates: '15+' },
  { name: 'Oregon', code: 'or', rebates: '20+' },
]

export function LocationCTA({
  variant = 'card',
  title = 'Check Laws & Rebates in Your Area',
  description = 'Find out if greywater systems are legal in your state and discover available rebates'
}: LocationCTAProps) {
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-500">Check regulations:</span>
        {topStates.slice(0, 4).map((state) => (
          <Link
            key={state.code}
            href={`/${state.code}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
          >
            {state.name}
          </Link>
        ))}
        <Link
          href="/ca"
          className="text-gray-500 hover:text-emerald-600"
        >
          All States →
        </Link>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-100 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Rebates may be available in your area</p>
              <p className="text-sm text-gray-600">Check your state for greywater & rainwater incentives</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {topStates.slice(0, 3).map((state) => (
              <Link
                key={state.code}
                href={`/${state.code}`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
              >
                {state.name}
              </Link>
            ))}
            <Link
              href="/ca"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              All States
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Default: card variant
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <MapPin className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <div className="space-y-2">
        {topStates.map((state) => (
          <Link
            key={state.code}
            href={`/${state.code}`}
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900 group-hover:text-emerald-700">{state.name}</span>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Droplets className="h-3 w-3" />
                <CloudRain className="h-3 w-3" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-600 font-medium">{state.rebates} rebates</span>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/ca"
        className="block mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
      >
        Browse all 50 states →
      </Link>
    </div>
  )
}

export function LocationBanner() {
  return <LocationCTA variant="banner" />
}

export function LocationInline() {
  return <LocationCTA variant="inline" />
}
