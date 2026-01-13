"use client"

import React from 'react'
import Link from 'next/link'
import {
  ChevronRight, CloudRain, Check, AlertTriangle, Droplet, Gauge, Phone, ExternalLink
} from 'lucide-react'
import {
  IncentivesTable,
  CTASection,
  type IncentiveProgram
} from './shared'

interface RainwaterData {
  legalStatus?: string
  governingCode?: string
  governingCodeUrl?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  permitRequired?: string
  taxIncentives?: string
  keyRestrictions?: string[]
  approvedUses?: string[]
  summary?: string
}

interface AgencyData {
  name?: string
  phone?: string
  website?: string
}

interface RainwaterSpokeViewProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  rainwater: RainwaterData | null
  agency: AgencyData | null
  incentives: IncentiveProgram[]
}

export default function RainwaterSpokeView({
  level,
  stateName,
  stateCode,
  cityName,
  countyName,
  rainwater,
  agency,
  incentives
}: RainwaterSpokeViewProps) {
  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  const rainwaterIncentives = incentives.filter(i => {
    const type = (i.incentive_type || '').toLowerCase()
    const isNotGrant = type !== 'grant' && !type.includes('grant')
    return (i.resource_type === 'rainwater' || !i.resource_type) && isNotGrant
  })

  const approvedUses = rainwater?.approvedUses || [
    'Landscape irrigation',
    'Garden watering',
    'Car washing',
    'Toilet flushing',
    'Laundry (non-potable)'
  ]

  const hasLimit = rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-cyan-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <Link href={`/${stateCode.toLowerCase()}`} className="text-gray-500 hover:text-cyan-600">{stateName}</Link>
          {level === 'city' && cityName && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-300" />
              <Link href={basePath} className="text-gray-500 hover:text-cyan-600">{cityName}</Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900 font-medium">Rainwater</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center">
              <CloudRain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{locationName} Rainwater Harvesting</h1>
              <p className="text-gray-600">{level === 'city' ? `${cityName}, ${stateCode}` : stateName}</p>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              rainwater?.legalStatus?.toLowerCase().includes('legal') || rainwater?.legalStatus?.toLowerCase() === 'unrestricted'
                ? 'bg-cyan-100 text-cyan-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {rainwater?.legalStatus || 'Legal'}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${hasLimit ? 'bg-amber-100 text-amber-700' : 'bg-cyan-100 text-cyan-700'}`}>
              {hasLimit ? `Limit: ${rainwater?.collectionLimitGallons?.toLocaleString()} gal` : 'No Limit'}
            </span>
            {rainwater?.potableUseAllowed && (
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                Potable Use Allowed
              </span>
            )}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          {/* Summary */}
          {rainwater?.summary && (
            <div className="px-6 py-5 border-b border-gray-100">
              <p className="text-gray-700 leading-relaxed">{rainwater.summary}</p>
            </div>
          )}

          {/* Key Info Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            <div className="bg-white p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Collection Limit</p>
              <p className={`text-xl font-bold ${hasLimit ? 'text-amber-700' : 'text-cyan-700'}`}>
                {hasLimit ? `${rainwater?.collectionLimitGallons?.toLocaleString()} gal` : 'Unlimited'}
              </p>
            </div>
            <div className="bg-white p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Permit Required</p>
              <p className="text-xl font-bold text-gray-900">
                {rainwater?.permitRequired || 'No'}
              </p>
            </div>
            <div className="bg-white p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Potable Use</p>
              <p className={`text-xl font-bold ${rainwater?.potableUseAllowed ? 'text-emerald-700' : 'text-gray-500'}`}>
                {rainwater?.potableUseAllowed ? 'Allowed' : 'Non-potable Only'}
              </p>
            </div>
          </div>

          <div className="p-6">
            {/* Two columns: Approved Uses + Restrictions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-cyan-600" /> Approved Uses
                </h3>
                <ul className="space-y-1">
                  {approvedUses.map((use, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full" /> {use}
                    </li>
                  ))}
                </ul>
              </div>
              {rainwater?.keyRestrictions && rainwater.keyRestrictions.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" /> Restrictions
                  </h3>
                  <ul className="space-y-1">
                    {rainwater.keyRestrictions.map((r, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Governing Code */}
            {rainwater?.governingCode && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Governing Code:</span>{' '}
                  {rainwater.governingCodeUrl ? (
                    <a
                      href={rainwater.governingCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:text-cyan-700 hover:underline inline-flex items-center gap-1"
                    >
                      {rainwater.governingCode}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    rainwater.governingCode
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Contact Footer */}
          {agency?.name && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900 text-sm">{agency.name}</p>
                {agency.phone && (
                  <a href={`tel:${agency.phone}`} className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {agency.phone}
                  </a>
                )}
              </div>
              {agency.website && (
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700"
                >
                  Official Website <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Incentives */}
        {rainwaterIncentives.length > 0 && (
          <IncentivesTable
            incentives={rainwaterIncentives}
            theme="cyan"
            title="Rebates & Incentives"
            showJurisdictionLevel={true}
            locationName={locationName || stateName}
          />
        )}

        {/* CTA */}
        <CTASection
          title="Start Harvesting Rainwater Today"
          description={`From rain barrels to cisterns, we can help you collect rainwater in ${locationName}.`}
          primaryButton={{ label: 'View Products', href: '/products' }}
          theme="cyan"
        />
      </div>
    </div>
  )
}
