"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, ChevronDown, ExternalLink, Phone, Building2,
  CloudRain, DollarSign, Check, AlertTriangle, Home,
  FileText, Gauge, ArrowRight, Droplet, MapPin, Users, ClipboardList,
  Wrench, Timer, BadgeCheck, AlertCircle, Leaf
} from 'lucide-react'

interface RainwaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  nonPotableUses?: string[]
  taxIncentives?: string
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  summary?: string
}

interface AgencyData {
  name?: string
  phone?: string
  website?: string
}

interface IncentiveProgram {
  program_name: string
  incentive_type?: string
  resource_type?: string
  program_subtype?: string
  incentive_amount_min?: number
  incentive_amount_max?: number
  incentive_per_unit?: string
  incentive_url?: string
  program_description?: string
  water_utility?: string
  residential_eligible?: boolean | string
  commercial_eligible?: boolean | string
  eligibility_details?: string
  property_requirements?: string
  income_requirements?: string
  how_to_apply?: string
  steps_to_apply?: string
  documentation_required?: string
  pre_approval_required?: boolean | string
  processing_time?: string
  installation_requirements?: string
  contractor_requirements?: string
  product_requirements?: string
  inspection_required?: boolean | string
  timeline_to_complete?: string
  reimbursement_process?: string
  restrictions?: string
  stacking_allowed?: boolean | string
  stacking_details?: string
  contact_email?: string
  contact_phone?: string
  coverage_area?: string
  deadline_info?: string
  program_end_date?: string
  jurisdiction_id?: string
  jurisdiction_level?: 'state' | 'county' | 'city' | 'other'
}

type ProgramType = 'rebate' | 'loan' | 'tax_credit' | 'tax_exemption' | 'subsidy' | 'free_installation' | 'permit_waiver' | 'education' | 'various'

const ProgramTypeBadge = ({ type }: { type: ProgramType }) => {
  const config: Record<ProgramType, { label: string; className: string }> = {
    rebate: { label: 'Rebate', className: 'bg-green-100 text-green-800' },
    loan: { label: 'Loan', className: 'bg-blue-100 text-blue-800' },
    tax_credit: { label: 'Tax Credit', className: 'bg-indigo-100 text-indigo-800' },
    tax_exemption: { label: 'Tax Exemption', className: 'bg-indigo-100 text-indigo-800' },
    subsidy: { label: 'Subsidy', className: 'bg-amber-100 text-amber-800' },
    free_installation: { label: 'Free Install', className: 'bg-pink-100 text-pink-800' },
    permit_waiver: { label: 'Permit Waiver', className: 'bg-gray-100 text-gray-800' },
    education: { label: 'Education', className: 'bg-sky-100 text-sky-800' },
    various: { label: 'Multiple', className: 'bg-gray-100 text-gray-700' }
  }
  const { label, className } = config[type] || { label: type, className: 'bg-gray-100 text-gray-700' }
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${className}`}>
      {label}
    </span>
  )
}

const JurisdictionLevelBadge = ({ level }: {
  level?: 'state' | 'county' | 'city' | 'other'
  stateName?: string
  countyName?: string
  cityName?: string
}) => {
  if (!level) return null

  const config: Record<string, { label: string; className: string }> = {
    state: { label: 'State', className: 'bg-purple-50 text-purple-700 border-purple-200' },
    county: { label: 'County', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    city: { label: 'City', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    other: { label: 'District', className: 'bg-blue-50 text-blue-700 border-blue-200' }
  }

  const { label, className } = config[level] || config.other

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap ${className}`}>
      {label}
    </span>
  )
}

const EligibilityBadges = ({ residential, commercial }: { residential?: boolean | string; commercial?: boolean | string }) => {
  const isResidential = residential === true || residential === 'true'
  const isCommercial = commercial === true || commercial === 'true'
  if (!isResidential && !isCommercial) return null
  return (
    <div className="flex gap-1">
      {isResidential && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
          Residential
        </span>
      )}
      {isCommercial && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-50 text-orange-700 border border-orange-200">
          Commercial
        </span>
      )}
    </div>
  )
}

interface LocalRegulation {
  regulationSummary?: string
}

interface WaterUtilityData {
  name: string
  programCount?: number
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
  localRegulation?: LocalRegulation | null
}

// State regulation URLs
const stateRegulationUrls: Record<string, string> = {
  'CA': 'https://www.hcd.ca.gov/building-standards/state-housing-law/wildfire-702-greywater',
  'AZ': 'https://www.azdeq.gov/permits/water-permits/reclaimed-water',
  'TX': 'https://www.tceq.texas.gov/permitting/water_quality/rainwater-greywater-water-reuse',
  'NM': 'https://www.srca.nm.gov/water-resources/',
  'CO': 'https://cdphe.colorado.gov/graywater',
  'OR': 'https://www.oregon.gov/oha/ph/healthyenvironments/drinkingwater/pages/graywater.aspx',
  'WA': 'https://ecology.wa.gov/water-shorelines/water-supply/water-recovery-reuse',
  'NV': 'https://ndep.nv.gov/water/water-reuse-program',
  'UT': 'https://deq.utah.gov/water-quality/water-reuse',
}

export default function RainwaterSpokeView({
  level,
  stateName,
  stateCode,
  cityName,
  countyName,
  rainwater,
  agency,
  incentives,
  localRegulation
}: RainwaterSpokeViewProps) {
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())

  const toggleProgram = (programId: string) => {
    setExpandedPrograms(prev => {
      const next = new Set(prev)
      if (next.has(programId)) {
        next.delete(programId)
      } else {
        next.add(programId)
      }
      return next
    })
  }

  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  // Filter rainwater-specific incentives, excluding grants (case-insensitive)
  const rainwaterIncentives = incentives.filter(i => {
    const type = (i.incentive_type || '').toLowerCase()
    const isNotGrant = type !== 'grant' && !type.includes('grant')
    return i.resource_type === 'rainwater' && isNotGrant
  })

  const getLegalStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-700'
    const lower = status.toLowerCase()
    if (lower.includes('legal') || lower === 'l' || lower === 'unrestricted') return 'bg-cyan-100 text-cyan-700'
    if (lower.includes('regulated') || lower === 'r' || lower.includes('restricted')) return 'bg-amber-100 text-amber-700'
    if (lower.includes('prohibited') || lower.includes('illegal')) return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-cyan-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <Link href={`/${stateCode.toLowerCase()}`} className="text-gray-500 hover:text-cyan-600">
            {stateName}
          </Link>
          {level === 'city' && cityName && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-300" />
              <Link href={basePath} className="text-gray-500 hover:text-cyan-600">
                {cityName}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900 font-medium">Rainwater Harvesting</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-100/50 rounded-2xl border border-cyan-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center">
              <CloudRain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {locationName} Rainwater Harvesting
              </h1>
              <p className="text-gray-600">
                Collection laws, permits, and incentives in {level === 'city' ? `${cityName}, ${stateCode}` : stateName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getLegalStatusColor(rainwater?.legalStatus)}`}>
              <CloudRain className="h-4 w-4" />
              Rainwater Collection {rainwater?.legalStatus || 'Legal'}
            </span>
            {rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0 ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-gray-700 border border-gray-200">
                <Gauge className="h-4 w-4" />
                Limit: {rainwater.collectionLimitGallons.toLocaleString()} gallons
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                <Check className="h-4 w-4" />
                No Collection Limit
              </span>
            )}
          </div>
        </div>

        {/* Tax Incentives Alert */}
        {rainwater?.taxIncentives && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-emerald-800">Tax Incentives Available</p>
                <p className="text-sm text-emerald-700 mt-1">{rainwater.taxIncentives}</p>
              </div>
            </div>
          </div>
        )}

        {/* Local Regulation Summary */}
        {localRegulation?.regulationSummary && (
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-cyan-800">Local Rainwater Regulations</p>
                <p className="text-sm text-cyan-700 mt-1">{localRegulation.regulationSummary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Water Utilities */}
        {(() => {
          const utilitiesFromIncentives = Array.from(
            rainwaterIncentives.reduce((acc, i) => {
              if (i.water_utility && i.water_utility.trim()) {
                const name = i.water_utility.trim()
                if (!acc.has(name)) {
                  acc.set(name, { name, programCount: 1 })
                } else {
                  acc.get(name)!.programCount = (acc.get(name)!.programCount || 0) + 1
                }
              }
              return acc
            }, new Map<string, WaterUtilityData>())
          ).map(([, v]) => v).sort((a, b) => (b.programCount || 0) - (a.programCount || 0))

          if (utilitiesFromIncentives.length === 0) return null

          return (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <Droplet className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-800 mb-2">
                    Water {utilitiesFromIncentives.length === 1 ? 'Utility' : 'Utilities'} with Rainwater Programs
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {utilitiesFromIncentives.map((utility, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-blue-200"
                      >
                        <span className="text-sm font-medium text-blue-800">{utility.name}</span>
                        {utility.programCount && utility.programCount > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                            {utility.programCount} program{utility.programCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Rainwater Harvesting Overview</h2>
              </div>
              <div className="p-6">
                {rainwater?.summary && (
                  <p className="text-gray-600 mb-6">{rainwater.summary}</p>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Droplet className="h-4 w-4" />
                      Collection Limit
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0
                        ? `${rainwater.collectionLimitGallons.toLocaleString()} gal`
                        : 'Unlimited'
                      }
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0
                        ? 'Maximum collection capacity'
                        : 'No restrictions on collection amount'
                      }
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <FileText className="h-4 w-4" />
                      Permit Required
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {rainwater?.permitRequired || 'No'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      For residential rainwater systems
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-lg ${rainwater?.potableUseAllowed ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-600'}`}>
                      <p className="text-xs uppercase tracking-wide mb-1">Potable Use</p>
                      <p className="font-semibold">{rainwater?.potableUseAllowed ? 'Allowed' : 'Non-potable Only'}</p>
                    </div>
                  </div>
                </div>

                {rainwater?.governingCode && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Governing Code</p>
                    {stateRegulationUrls[stateCode] ? (
                      <a
                        href={stateRegulationUrls[stateCode]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group"
                      >
                        {rainwater.governingCode}
                        <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <p className="text-gray-900">{rainwater.governingCode}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Approved Uses */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-cyan-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Check className="h-5 w-5 text-cyan-600" />
                  Approved Uses
                </h2>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {(rainwater?.approvedUses || [
                    'Landscape irrigation',
                    'Garden watering',
                    'Car washing',
                    'Toilet flushing',
                    'Laundry (non-potable)',
                    'Pool/fountain filling'
                  ]).slice(0, 6).map((use, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                      <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-cyan-600" />
                      </div>
                      <span className="text-gray-700">{use}</span>
                    </div>
                  ))}
                </div>
                {rainwater?.potableUseAllowed && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-emerald-700">
                      <strong>Potable use allowed:</strong> With proper treatment and permits, rainwater can be used for drinking water in {locationName}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Restrictions */}
            {rainwater?.keyRestrictions && rainwater.keyRestrictions.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-amber-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Key Restrictions
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {rainwater.keyRestrictions.map((restriction, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-amber-700">{idx + 1}</span>
                        </div>
                        <span className="text-gray-600">{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agency Card */}
            {agency?.name && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Water Agency</h3>
                    <p className="text-xs text-gray-500">{agency.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {agency.phone && (
                    <a href={`tel:${agency.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600">
                      <Phone className="h-4 w-4" />
                      {agency.phone}
                    </a>
                  )}
                  {agency.website && (
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600">
                      <ExternalLink className="h-4 w-4" />
                      Official Website
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Related Links */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Related Resources</h3>
              <div className="space-y-2">
                <Link
                  href={`${basePath}/greywater`}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-emerald-700">Greywater Laws</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                </Link>
                <Link
                  href={basePath}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-cyan-700">All {locationName} Programs</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-cyan-500" />
                </Link>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-cyan-50 rounded-2xl p-5 border border-cyan-100">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  Rain barrels are legal in {locationName}
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  Most systems don't require permits
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  First flush diverters recommended
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full-Width Incentives Section */}
        {rainwaterIncentives.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-8">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-cyan-600" />
                  Rainwater Harvesting Rebates & Incentives
                </h2>
                <span className="text-sm bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium">
                  {rainwaterIncentives.length} programs
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Available rebates and incentives for rainwater harvesting systems in {locationName}
              </p>
            </div>

            {/* Programs Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8"></th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell w-28">Level</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Program</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Provider</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rainwaterIncentives.map((program, idx) => {
                    const programId = `rw-${idx}-${program.program_name}`
                    const isExpanded = expandedPrograms.has(programId)
                    const hasDetails = !!(
                      program.program_description ||
                      program.eligibility_details ||
                      program.how_to_apply ||
                      program.steps_to_apply ||
                      program.documentation_required ||
                      program.installation_requirements ||
                      program.contractor_requirements ||
                      program.property_requirements ||
                      program.reimbursement_process ||
                      program.restrictions ||
                      program.stacking_details ||
                      program.contact_email ||
                      program.contact_phone
                    )

                    return (
                      <React.Fragment key={idx}>
                        {/* Main Row */}
                        <tr
                          className={`${hasDetails ? 'cursor-pointer' : ''} hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-cyan-50' : ''}`}
                          onClick={() => hasDetails && toggleProgram(programId)}
                        >
                          {/* Expand Icon */}
                          <td className="px-4 py-4">
                            {hasDetails && (
                              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-cyan-600' : ''}`} />
                            )}
                          </td>

                          {/* Jurisdiction Level */}
                          <td className="px-4 py-4 hidden sm:table-cell">
                            <JurisdictionLevelBadge
                              level={program.jurisdiction_level}
                              stateName={stateName}
                              countyName={countyName}
                              cityName={cityName}
                            />
                          </td>

                          {/* Program Name */}
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-gray-900">{program.program_name}</span>
                                {/* Mobile-only badges */}
                                <span className="md:hidden">
                                  <ProgramTypeBadge type={(program.incentive_type as ProgramType) || 'rebate'} />
                                </span>
                                <span className="sm:hidden">
                                  <JurisdictionLevelBadge
                                    level={program.jurisdiction_level}
                                    stateName={stateName}
                                    countyName={countyName}
                                    cityName={cityName}
                                  />
                                </span>
                              </div>
                              {program.deadline_info && (
                                <span className="text-xs text-amber-600 font-medium">⏰ {program.deadline_info}</span>
                              )}
                            </div>
                          </td>

                          {/* Program Type (Rebate/Tax Credit) */}
                          <td className="px-4 py-4 hidden md:table-cell">
                            <ProgramTypeBadge type={(program.incentive_type as ProgramType) || 'rebate'} />
                          </td>

                          {/* Provider */}
                          <td className="px-4 py-4 hidden lg:table-cell">
                            <span className="text-sm text-gray-600">{program.water_utility || '—'}</span>
                          </td>

                          {/* Amount */}
                          <td className="px-4 py-4 text-right">
                            {program.incentive_amount_max ? (
                              <div>
                                <span className="font-semibold text-cyan-600">${program.incentive_amount_max.toLocaleString()}</span>
                                {program.incentive_per_unit && (
                                  <p className="text-xs text-gray-400">{program.incentive_per_unit}</p>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>

                          {/* Apply Button */}
                          <td className="px-4 py-4 text-center">
                            {program.incentive_url ? (
                              <a
                                href={program.incentive_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
                              >
                                Apply <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">—</span>
                            )}
                          </td>
                        </tr>

                        {/* Expanded Details Row */}
                        {isExpanded && hasDetails && (
                          <tr className="bg-gray-50">
                            <td colSpan={7} className="px-4 py-0">
                              <div className="py-4 border-t border-gray-100">
                                {/* Description */}
                                {program.program_description && (
                                  <p className="text-sm text-gray-600 mb-4">{program.program_description}</p>
                                )}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {program.eligibility_details && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <Users className="h-3.5 w-3.5 text-blue-600" />
                                        Who's Eligible
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.eligibility_details}</p>
                                    </div>
                                  )}
                                  {(program.how_to_apply || program.steps_to_apply) && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <ClipboardList className="h-3.5 w-3.5 text-cyan-600" />
                                        How to Apply
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.steps_to_apply || program.how_to_apply}</p>
                                    </div>
                                  )}
                                  {program.documentation_required && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <FileText className="h-3.5 w-3.5 text-indigo-600" />
                                        Documentation Required
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.documentation_required}</p>
                                    </div>
                                  )}
                                  {program.property_requirements && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <Home className="h-3.5 w-3.5 text-purple-600" />
                                        Property Requirements
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.property_requirements}</p>
                                    </div>
                                  )}
                                  {program.installation_requirements && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <Wrench className="h-3.5 w-3.5 text-orange-600" />
                                        Installation Requirements
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.installation_requirements}</p>
                                    </div>
                                  )}
                                  {program.contractor_requirements && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <BadgeCheck className="h-3.5 w-3.5 text-teal-600" />
                                        Contractor Requirements
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.contractor_requirements}</p>
                                    </div>
                                  )}
                                  {(program.processing_time || program.timeline_to_complete) && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <Timer className="h-3.5 w-3.5 text-amber-600" />
                                        Timeline
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.processing_time || program.timeline_to_complete}</p>
                                    </div>
                                  )}
                                  {program.reimbursement_process && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <DollarSign className="h-3.5 w-3.5 text-green-600" />
                                        Reimbursement Process
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.reimbursement_process}</p>
                                    </div>
                                  )}
                                  {program.restrictions && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                                        Restrictions
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.restrictions}</p>
                                    </div>
                                  )}
                                  {program.stacking_details && (
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                      <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                        <Leaf className="h-3.5 w-3.5 text-cyan-600" />
                                        Stacking Programs
                                      </h4>
                                      <p className="text-sm text-gray-600">{program.stacking_details}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Footer with Contact & Badges */}
                                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
                                  <div className="flex flex-wrap items-center gap-3">
                                    {(program.pre_approval_required === true || program.pre_approval_required === 'true') && (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                                        ⚠️ Pre-approval required
                                      </span>
                                    )}
                                    {(program.inspection_required === true || program.inspection_required === 'true') && (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                        🔍 Inspection required
                                      </span>
                                    )}
                                    {program.coverage_area && (
                                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                                        📍 {program.coverage_area}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4">
                                    {program.contact_phone && (
                                      <a href={`tel:${program.contact_phone}`} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-cyan-600">
                                        <Phone className="h-4 w-4" />
                                        {program.contact_phone}
                                      </a>
                                    )}
                                    {program.contact_email && (
                                      <a href={`mailto:${program.contact_email}`} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-cyan-600">
                                        <ExternalLink className="h-4 w-4" />
                                        {program.contact_email}
                                      </a>
                                    )}
                                    {program.incentive_url && (
                                      <a
                                        href={program.incentive_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                                      >
                                        Apply Now <ArrowRight className="h-4 w-4" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-cyan-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Start Harvesting Rainwater Today
          </h3>
          <p className="text-cyan-100 mb-6 max-w-xl mx-auto">
            From simple rain barrels to complete cistern systems, we can help you collect and use rainwater in {locationName}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-700 font-medium rounded-lg hover:bg-cyan-50 transition-colors"
            >
              View Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
