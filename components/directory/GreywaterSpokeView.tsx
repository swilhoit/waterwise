"use client"

import React from 'react'
import Link from 'next/link'
import {
  ChevronRight, Building2, ExternalLink, Phone,
  Droplets, Check, AlertTriangle, FileText, Home, Flower2
} from 'lucide-react'
import {
  IncentivesTable,
  CTASection,
  type IncentiveProgram
} from './shared'

interface GreywaterData {
  legalStatus?: string
  governingCode?: string
  governingCodeUrl?: string
  permitRequired?: string
  permitThresholdGpd?: number
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  summary?: string
}

interface AgencyData {
  name?: string
  phone?: string
  website?: string
}

interface PreplumbingData {
  hasMandate?: boolean
  details?: string
  buildingTypes?: string
  thresholdSqft?: number
  codeReference?: string
}

interface PermitDetails {
  permit_type?: string
  permit_required?: boolean
  permit_required_threshold_gpd?: number
  application_url?: string
  fee_notes?: string
  permit_fee_min?: number
  permit_fee_max?: number
  typical_processing_days?: number
  laundry_to_landscape_allowed?: boolean
  branched_drain_allowed?: boolean
  surge_tank_system_allowed?: boolean
  indoor_reuse_allowed?: boolean
  diy_allowed?: boolean
  licensed_plumber_required?: boolean
  department_name?: string
  department_phone?: string
  exemptions?: string[]
}

interface GreywaterSpokeViewProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  greywater: GreywaterData | null
  agency: AgencyData | null
  incentives: IncentiveProgram[]
  preplumbing?: PreplumbingData | null
  permitDetails?: PermitDetails | null
}

export default function GreywaterSpokeView({
  level,
  stateName,
  stateCode,
  cityName,
  countyName,
  greywater,
  agency,
  incentives,
  preplumbing,
  permitDetails
}: GreywaterSpokeViewProps) {
  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  const greywaterIncentives = incentives.filter(i => {
    const type = (i.incentive_type || '').toLowerCase()
    const isNotGrant = type !== 'grant' && !type.includes('grant')
    return (i.resource_type === 'greywater' || !i.resource_type) && isNotGrant
  })

  const threshold = permitDetails?.permit_required_threshold_gpd || greywater?.permitThresholdGpd
  const diyAllowed = permitDetails?.diy_allowed

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <Link href={`/${stateCode.toLowerCase()}`} className="text-gray-500 hover:text-emerald-600">{stateName}</Link>
          {level === 'city' && cityName && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-300" />
              <Link href={basePath} className="text-gray-500 hover:text-emerald-600">{cityName}</Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900 font-medium">Greywater</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{locationName} Greywater Laws</h1>
              <p className="text-gray-600">{level === 'city' ? `${cityName}, ${stateCode}` : stateName}</p>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              greywater?.legalStatus?.toLowerCase().includes('legal')
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {greywater?.legalStatus || 'Check Local Rules'}
            </span>
            {threshold && (
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                No permit under {threshold} GPD
              </span>
            )}
            {diyAllowed && (
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                DIY Allowed
              </span>
            )}
          </div>
        </div>

        {/* Pre-Plumbing Mandate */}
        {preplumbing?.hasMandate && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <p className="font-medium text-purple-800 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Pre-Plumbing Mandate
            </p>
            <p className="text-sm text-purple-700 mt-1">
              {preplumbing.details || 'New construction must include greywater-ready plumbing.'}
            </p>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          {/* Summary */}
          {greywater?.summary && (
            <div className="px-6 py-5 border-b border-gray-100">
              <p className="text-gray-700 leading-relaxed">{greywater.summary}</p>
            </div>
          )}

          {/* Key Info Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
            {threshold && (
              <div className="bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Permit Threshold</p>
                <p className="text-xl font-bold text-emerald-700">{threshold} GPD</p>
              </div>
            )}
            {(permitDetails?.permit_fee_min !== undefined || permitDetails?.fee_notes) && (
              <div className="bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Permit Fee</p>
                <p className="text-xl font-bold text-gray-900">
                  {permitDetails.fee_notes || (permitDetails.permit_fee_min === 0 ? 'Free' : `$${permitDetails.permit_fee_min}`)}
                </p>
              </div>
            )}
            {permitDetails?.typical_processing_days && (
              <div className="bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Processing</p>
                <p className="text-xl font-bold text-gray-900">{permitDetails.typical_processing_days} days</p>
              </div>
            )}
            {diyAllowed !== undefined && (
              <div className="bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">DIY Install</p>
                <p className={`text-xl font-bold ${diyAllowed ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {diyAllowed ? 'Allowed' : 'Pro Required'}
                </p>
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Use Types */}
            <div className="flex flex-wrap gap-2 mb-6">
              {greywater?.outdoorUseAllowed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                  <Flower2 className="h-4 w-4" /> Outdoor Irrigation
                </span>
              )}
              {greywater?.indoorUseAllowed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                  <Home className="h-4 w-4" /> Indoor (Toilet Flushing)
                </span>
              )}
            </div>

            {/* System Types */}
            {(permitDetails?.laundry_to_landscape_allowed || permitDetails?.branched_drain_allowed || permitDetails?.surge_tank_system_allowed) && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Allowed Systems</h3>
                <div className="flex flex-wrap gap-2">
                  {permitDetails.laundry_to_landscape_allowed && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      <Check className="h-3 w-3 text-emerald-600" /> Laundry-to-Landscape
                    </span>
                  )}
                  {permitDetails.branched_drain_allowed && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      <Check className="h-3 w-3 text-emerald-600" /> Branched Drain
                    </span>
                  )}
                  {permitDetails.surge_tank_system_allowed && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      <Check className="h-3 w-3 text-emerald-600" /> Surge Tank
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Two columns: Approved Uses + Restrictions */}
            <div className="grid md:grid-cols-2 gap-6">
              {greywater?.approvedUses && greywater.approvedUses.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" /> Approved Uses
                  </h3>
                  <ul className="space-y-1">
                    {greywater.approvedUses.map((use, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full" /> {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {greywater?.keyRestrictions && greywater.keyRestrictions.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" /> Restrictions
                  </h3>
                  <ul className="space-y-1">
                    {greywater.keyRestrictions.map((r, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Governing Code */}
            {greywater?.governingCode && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Governing Code:</span>{' '}
                  {greywater.governingCodeUrl ? (
                    <a
                      href={greywater.governingCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      {greywater.governingCode}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    greywater.governingCode
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Contact Footer */}
          {(agency?.name || permitDetails?.department_name || permitDetails?.application_url) && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                {(permitDetails?.department_name || agency?.name) && (
                  <p className="font-medium text-gray-900 text-sm">{permitDetails?.department_name || agency?.name}</p>
                )}
                {(permitDetails?.department_phone || agency?.phone) && (
                  <a href={`tel:${permitDetails?.department_phone || agency?.phone}`} className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {permitDetails?.department_phone || agency?.phone}
                  </a>
                )}
              </div>
              {permitDetails?.application_url && (
                <a
                  href={permitDetails.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
                >
                  Apply for Permit <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Incentives */}
        {greywaterIncentives.length > 0 && (
          <IncentivesTable
            incentives={greywaterIncentives}
            theme="emerald"
            title="Rebates & Incentives"
            showJurisdictionLevel={true}
            locationName={locationName || stateName}
            stateName={stateName}
            countyName={countyName}
            cityName={cityName}
          />
        )}

        {/* CTA */}
        <CTASection
          title="Ready to Install a Greywater System?"
          description={`Our systems are designed to meet ${locationName} regulations.`}
          primaryButton={{ label: 'View Systems', href: '/products' }}
          theme="emerald"
        />
      </div>
    </div>
  )
}
