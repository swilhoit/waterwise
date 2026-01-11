"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight, ChevronDown, Search, ExternalLink, Phone, Building2,
  Droplets, CloudRain, DollarSign, Leaf, MapPin,
  CheckCircle2, AlertCircle, HelpCircle, Clock, ArrowRight,
  FileText, ClipboardList, Wrench, Timer, Users, Home, BadgeCheck
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface GreywaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  permitThresholdGpd?: number | null
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  summary?: string
}

interface RainwaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  taxIncentives?: string
  approvedUses?: string[]
  keyRestrictions?: string[]
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
  // Eligibility details
  eligibility_details?: string
  property_requirements?: string
  income_requirements?: string
  // How to apply
  how_to_apply?: string
  steps_to_apply?: string
  documentation_required?: string
  pre_approval_required?: boolean | string
  processing_time?: string
  // Requirements
  installation_requirements?: string
  contractor_requirements?: string
  product_requirements?: string
  inspection_required?: boolean | string
  timeline_to_complete?: string
  // Reimbursement
  reimbursement_process?: string
  restrictions?: string
  // Stacking
  stacking_allowed?: boolean | string
  stacking_details?: string
  // Contact
  contact_email?: string
  contact_phone?: string
  coverage_area?: string
  deadline_info?: string
  program_end_date?: string
  // Jurisdiction tracking
  jurisdiction_id?: string
  jurisdiction_level?: 'state' | 'county' | 'city' | 'other'
}

interface CityItem {
  city_name: string
  county_name?: string
  city_jurisdiction_id?: string
}

interface PreplumbingData {
  hasMandate: boolean
  details?: string
  buildingTypes?: string
  thresholdSqft?: number
  codeReference?: string
}

interface LocalRegulation {
  regulationSummary?: string
  permitRequired?: boolean
}

interface WaterDistrictData {
  name: string
  website?: string
  phone?: string
  serviceArea?: string
}

interface LocationHubViewProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  greywater: GreywaterData | null
  rainwater: RainwaterData | null
  agency: AgencyData | null
  incentives: IncentiveProgram[]
  cities?: CityItem[]
  lastUpdated?: string
  preplumbing?: PreplumbingData | null
  localRegulation?: LocalRegulation | null
  waterDistrict?: WaterDistrictData | null
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

type DataConfidence = 'verified' | 'partial' | 'unknown'

const getDataConfidence = (data: GreywaterData | RainwaterData | null): DataConfidence => {
  if (!data) return 'unknown'
  const hasStatus = !!(data as any).legalStatus
  const hasPermit = (data as any).permitRequired !== undefined
  const hasCode = !!(data as any).governingCode
  const score = [hasStatus, hasPermit, hasCode].filter(Boolean).length
  if (score >= 2) return 'verified'
  if (score >= 1) return 'partial'
  return 'unknown'
}

const DataConfidenceBadge = ({ confidence }: { confidence: DataConfidence }) => {
  const config = {
    verified: { icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Verified' },
    partial: { icon: AlertCircle, className: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Partial Data' },
    unknown: { icon: HelpCircle, className: 'bg-gray-100 text-gray-600 border-gray-200', label: 'Not Verified' }
  }
  const { icon: Icon, className, label } = config[confidence]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

const ResourceTypeBadge = ({ type }: { type: 'greywater' | 'rainwater' | 'conservation' }) => {
  const config = {
    greywater: { icon: Droplets, label: 'Greywater', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    rainwater: { icon: CloudRain, label: 'Rainwater', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    conservation: { icon: Leaf, label: 'Conservation', className: 'bg-teal-50 text-teal-700 border-teal-200' }
  }
  const { icon: Icon, label, className } = config[type]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

type ProgramType = 'rebate' | 'loan' | 'tax_credit' | 'tax_exemption' | 'subsidy' | 'free_installation' | 'permit_waiver' | 'education' | 'various'

const ProgramTypeBadge = ({ type }: { type: ProgramType }) => {
  const config: Record<ProgramType, { label: string; className: string }> = {
    rebate: { label: 'Rebate', className: 'bg-green-100 text-green-800' },
    loan: { label: 'Low-Interest Loan', className: 'bg-blue-100 text-blue-800' },
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
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${className}`}>
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

const JurisdictionLevelBadge = ({ level, stateName, countyName, cityName }: {
  level?: 'state' | 'county' | 'city' | 'other'
  stateName?: string
  countyName?: string
  cityName?: string
}) => {
  if (!level) return null

  const config: Record<string, { label: string; icon: string; className: string }> = {
    state: {
      label: stateName || 'State',
      icon: '🏛️',
      className: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    county: {
      label: countyName ? `${countyName} County` : 'County',
      icon: '🏢',
      className: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    city: {
      label: cityName || 'City',
      icon: '🏠',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    other: {
      label: 'Regional',
      icon: '📍',
      className: 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const { label, icon, className } = config[level] || config.other

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${className}`}>
      <span>{icon}</span>
      {label}
    </span>
  )
}

const getProgramAmountLabel = (type?: string): string => {
  const typeMap: Record<string, string> = {
    rebate: 'max rebate',
    grant: 'max grant',
    loan: 'loan amount',
    tax_credit: 'tax credit',
    tax_exemption: 'exemption value',
    subsidy: 'max subsidy',
    free_installation: 'value',
    various: 'max amount'
  }
  return typeMap[type || 'rebate'] || 'max amount'
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LocationHubView({
  level,
  stateName,
  stateCode,
  cityName,
  countyName,
  greywater,
  rainwater,
  agency,
  incentives,
  cities = [],
  lastUpdated,
  preplumbing,
  localRegulation,
  waterDistrict
}: LocationHubViewProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllCities, setShowAllCities] = useState(false)
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())
  const INITIAL_CITIES = 30

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

  // Filter cities
  const filteredCities = cities.filter(c =>
    c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => (a.city_name || '').localeCompare(b.city_name || ''))

  // Count incentives by resource type
  const incentiveCounts = {
    greywater: incentives.filter(i => i.resource_type === 'greywater').length,
    rainwater: incentives.filter(i => i.resource_type === 'rainwater').length,
    conservation: incentives.filter(i => i.resource_type === 'conservation' || !i.resource_type).length,
    total: incentives.length
  }

  // Filter out grants - only show rebates for homeowners and small businesses
  const relevantIncentives = incentives.filter(i => i.incentive_type !== 'grant')

  // Max rebate amount
  const maxRebate = Math.max(...incentives.map(i => i.incentive_amount_max || 0), 0)

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
          {level === 'city' && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-300" />
              <Link href={`/${stateCode.toLowerCase()}`} className="text-gray-500 hover:text-emerald-600">
                {stateName}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900 font-medium">{locationName}</span>
        </nav>

        {/* Hero Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {level === 'city'
                ? `Water Conservation in ${cityName}, ${stateCode}`
                : `${stateName} Water Regulations`
              }
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            {level === 'city'
              ? `Complete guide to greywater, rainwater harvesting, and rebates in ${cityName}`
              : `Greywater laws, rainwater harvesting rules, and water conservation programs across ${stateName}`
            }
          </p>
          <div className="flex flex-wrap gap-2">
            <DataConfidenceBadge confidence={getDataConfidence(greywater)} />
            {lastUpdated && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-gray-500 bg-gray-100 border border-gray-200">
                <Clock className="h-3 w-3" />
                Updated {new Date(lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>

        {/* Local Regulation Summary */}
        {localRegulation?.regulationSummary && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-emerald-800 text-sm">Local Regulations</p>
                <p className="text-sm text-emerald-700">{localRegulation.regulationSummary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Regulatory Hierarchy Explanation - City Level Only */}
        {level === 'city' && (
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex flex-col items-center gap-0.5 flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🏛️</span>
                </div>
                <div className="w-0.5 h-3 bg-gray-300"></div>
                {countyName && (
                  <>
                    <div className="w-6 h-6 bg-amber-100 rounded flex items-center justify-center">
                      <span className="text-xs">🏢</span>
                    </div>
                    <div className="w-0.5 h-3 bg-gray-300"></div>
                  </>
                )}
                <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
                  <span className="text-xs">🏠</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Understanding Your Regulations</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Water regulations in {cityName} come from multiple government levels. {stateName} state law provides the baseline,
                  {countyName ? ` ${countyName} County may add local requirements,` : ''} and city ordinances can add further rules.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      🏛️ {stateName}
                    </span>
                    <span className="text-gray-500">State baseline</span>
                  </div>
                  {countyName && (
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        🏢 {countyName} County
                      </span>
                      <span className="text-gray-500">County additions</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      🏠 {cityName}
                    </span>
                    <span className="text-gray-500">City-specific</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Water District Info */}
        {waterDistrict && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-blue-900 text-sm">Water District</p>
                <p className="text-blue-800 font-medium">{waterDistrict.name}</p>
                {waterDistrict.serviceArea && (
                  <p className="text-xs text-blue-600 mt-1">Service Area: {waterDistrict.serviceArea}</p>
                )}
                <div className="flex flex-wrap gap-3 mt-2">
                  {waterDistrict.phone && (
                    <a href={`tel:${waterDistrict.phone}`} className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800">
                      <Phone className="h-3 w-3" />
                      {waterDistrict.phone}
                    </a>
                  )}
                  {waterDistrict.website && (
                    <a href={waterDistrict.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800">
                      <ExternalLink className="h-3 w-3" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Regulations Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Greywater Regulations */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-5 py-4 border-b border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Greywater Regulations</h2>
                    <p className="text-xs text-gray-500">{stateName} state law {level === 'city' ? '+ local rules' : ''}</p>
                  </div>
                </div>
                <Link
                  href={`${basePath}/greywater`}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  Full details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="p-5">
              {/* Status & Key Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Legal Status</p>
                  <p className={`font-semibold ${greywater?.legalStatus?.toLowerCase().includes('legal') ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {greywater?.legalStatus || 'Varies by jurisdiction'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Permit Required</p>
                  <p className="font-semibold text-gray-700">
                    {greywater?.permitThresholdGpd && greywater.permitThresholdGpd > 0
                      ? `Over ${greywater.permitThresholdGpd} GPD`
                      : greywater?.permitRequired || 'Varies'
                    }
                  </p>
                </div>
              </div>

              {/* Summary */}
              {greywater?.summary ? (
                <p className="text-sm text-gray-600 mb-4">{greywater.summary}</p>
              ) : (
                <p className="text-sm text-gray-500 mb-4 italic">
                  {level === 'city' && stateName === 'California'
                    ? 'California allows greywater systems under the Plumbing Code Chapter 15. Simple laundry-to-landscape systems under 250 GPD typically don\'t require a permit.'
                    : `Contact your local building department for specific greywater regulations in ${locationName}.`
                  }
                </p>
              )}

              {/* Allowed Uses */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${greywater?.outdoorUseAllowed !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {greywater?.outdoorUseAllowed !== false ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  Outdoor Irrigation
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${greywater?.indoorUseAllowed ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {greywater?.indoorUseAllowed ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  Indoor Use (Toilet Flushing)
                </span>
              </div>

              {/* Governing Code */}
              {greywater?.governingCode && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Governing Code
                  </p>
                  <p className="text-sm font-medium text-gray-700">{greywater.governingCode}</p>
                </div>
              )}

              {/* Approved Uses List */}
              {greywater?.approvedUses && greywater.approvedUses.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Approved Uses</p>
                  <div className="flex flex-wrap gap-1">
                    {greywater.approvedUses.slice(0, 4).map((use, idx) => (
                      <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                        {use}
                      </span>
                    ))}
                    {greywater.approvedUses.length > 4 && (
                      <span className="text-xs text-gray-500">+{greywater.approvedUses.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Key Restrictions */}
              {greywater?.keyRestrictions && greywater.keyRestrictions.length > 0 && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Key Restrictions
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {greywater.keyRestrictions.slice(0, 3).map((restriction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pre-Plumbing Mandate */}
              {preplumbing?.hasMandate && (
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-1">Pre-Plumbing Mandate</p>
                        <p className="text-xs text-purple-600 mb-2">
                          {preplumbing.details || 'New construction must include greywater-ready plumbing.'}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-purple-500">
                          {preplumbing.buildingTypes && (
                            <span><strong>Applies to:</strong> {preplumbing.buildingTypes}</span>
                          )}
                          {preplumbing.thresholdSqft && (
                            <span><strong>Threshold:</strong> {preplumbing.thresholdSqft.toLocaleString()}+ sqft</span>
                          )}
                        </div>
                        {preplumbing.codeReference && (
                          <p className="text-xs text-purple-400 mt-1">{preplumbing.codeReference}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rebates badge */}
              {incentiveCounts.greywater > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium">
                    <DollarSign className="h-3 w-3" />
                    {incentiveCounts.greywater} rebate{incentiveCounts.greywater !== 1 ? 's' : ''} available
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Rainwater Regulations */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100/50 px-5 py-4 border-b border-cyan-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center">
                    <CloudRain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Rainwater Harvesting</h2>
                    <p className="text-xs text-gray-500">{stateName} state law {level === 'city' ? '+ local rules' : ''}</p>
                  </div>
                </div>
                <Link
                  href={`${basePath}/rainwater`}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1"
                >
                  Full details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="p-5">
              {/* Status & Key Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Legal Status</p>
                  <p className={`font-semibold ${rainwater?.legalStatus?.toLowerCase().includes('legal') ? 'text-cyan-700' : 'text-gray-700'}`}>
                    {rainwater?.legalStatus || 'Legal in most areas'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Collection Limit</p>
                  <p className="font-semibold text-gray-700">
                    {rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0
                      ? `${rainwater.collectionLimitGallons.toLocaleString()} gallons`
                      : 'No limit'
                    }
                  </p>
                </div>
              </div>

              {/* Summary */}
              {rainwater?.summary ? (
                <p className="text-sm text-gray-600 mb-4">{rainwater.summary}</p>
              ) : (
                <p className="text-sm text-gray-500 mb-4 italic">
                  {level === 'city' && stateName === 'California'
                    ? 'California encourages rainwater harvesting with no permit required for residential collection. Rain barrels and cisterns are allowed without restriction on collection volume.'
                    : `Rainwater harvesting is generally encouraged in ${locationName}. Check local regulations for specific requirements.`
                  }
                </p>
              )}

              {/* Allowed Uses */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-cyan-100 text-cyan-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Outdoor Irrigation
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${rainwater?.potableUseAllowed ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'}`}>
                  {rainwater?.potableUseAllowed ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  Potable Use {rainwater?.potableUseAllowed ? '(with treatment)' : '(not allowed)'}
                </span>
              </div>

              {/* Governing Code */}
              {rainwater?.governingCode && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Governing Code
                  </p>
                  <p className="text-sm font-medium text-gray-700">{rainwater.governingCode}</p>
                </div>
              )}

              {/* Tax Incentives */}
              {rainwater?.taxIncentives && (
                <div className="bg-cyan-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-cyan-600 mb-1 flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> Tax Incentives
                  </p>
                  <p className="text-sm text-cyan-700">{rainwater.taxIncentives}</p>
                </div>
              )}

              {/* Approved Uses List */}
              {rainwater?.approvedUses && rainwater.approvedUses.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Approved Uses</p>
                  <div className="flex flex-wrap gap-1">
                    {rainwater.approvedUses.slice(0, 4).map((use, idx) => (
                      <span key={idx} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded">
                        {use}
                      </span>
                    ))}
                    {rainwater.approvedUses.length > 4 && (
                      <span className="text-xs text-gray-500">+{rainwater.approvedUses.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Key Restrictions */}
              {rainwater?.keyRestrictions && rainwater.keyRestrictions.length > 0 && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Key Restrictions
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {rainwater.keyRestrictions.slice(0, 3).map((restriction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{restriction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rebates badge */}
              {incentiveCounts.rainwater > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1 text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded font-medium">
                    <DollarSign className="h-3 w-3" />
                    {incentiveCounts.rainwater} rebate{incentiveCounts.rainwater !== 1 ? 's' : ''} available
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Incentives Section */}
        {incentives.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  Available Rebates & Incentives
                </h2>
                <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  {relevantIncentives.length} programs
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {level === 'city'
                  ? `Programs available to ${locationName} residents from state, ${countyName ? 'county, ' : ''}and city governments`
                  : `Rebates, tax credits, and other incentives for ${locationName} homeowners and small businesses`
                }
              </p>
            </div>

            {/* Programs Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8"></th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Eligibility</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Provider</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {relevantIncentives.map((program, idx) => {
                      const programId = `table-${idx}-${program.program_name}`
                      const isExpanded = expandedPrograms.has(programId)
                      const hasDetails = !!(
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
                            className={`${hasDetails ? 'cursor-pointer' : ''} hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-emerald-50' : ''}`}
                            onClick={() => hasDetails && toggleProgram(programId)}
                          >
                            {/* Expand Icon */}
                            <td className="px-4 py-4">
                              {hasDetails && (
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
                              )}
                            </td>

                            {/* Program Name & Description */}
                            <td className="px-4 py-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium text-gray-900">{program.program_name}</span>
                                  <ProgramTypeBadge type={(program.incentive_type as ProgramType) || 'rebate'} />
                                  <JurisdictionLevelBadge
                                    level={program.jurisdiction_level}
                                    stateName={stateName}
                                    countyName={countyName}
                                    cityName={cityName}
                                  />
                                </div>
                                {program.program_description && (
                                  <p className="text-sm text-gray-500 line-clamp-1 max-w-md">{program.program_description}</p>
                                )}
                                {program.deadline_info && (
                                  <span className="text-xs text-amber-600 font-medium">⏰ {program.deadline_info}</span>
                                )}
                                {/* Mobile-only badges */}
                                <div className="flex flex-wrap gap-1 md:hidden mt-1">
                                  <ResourceTypeBadge type={(program.resource_type as any) || 'conservation'} />
                                  <EligibilityBadges residential={program.residential_eligible} commercial={program.commercial_eligible} />
                                </div>
                              </div>
                            </td>

                            {/* Resource Type */}
                            <td className="px-4 py-4 hidden md:table-cell">
                              <ResourceTypeBadge type={(program.resource_type as any) || 'conservation'} />
                            </td>

                            {/* Eligibility */}
                            <td className="px-4 py-4 hidden lg:table-cell">
                              <EligibilityBadges residential={program.residential_eligible} commercial={program.commercial_eligible} />
                            </td>

                            {/* Provider */}
                            <td className="px-4 py-4 hidden lg:table-cell">
                              <span className="text-sm text-gray-600">{program.water_utility || '—'}</span>
                            </td>

                            {/* Amount */}
                            <td className="px-4 py-4 text-right">
                              {program.incentive_amount_max ? (
                                <div>
                                  <span className="font-semibold text-emerald-600">${program.incentive_amount_max.toLocaleString()}</span>
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
                                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
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
                                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Eligibility Details */}
                                    {program.eligibility_details && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Users className="h-3.5 w-3.5 text-blue-600" />
                                          Who's Eligible
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.eligibility_details}</p>
                                      </div>
                                    )}

                                    {/* How to Apply */}
                                    {(program.how_to_apply || program.steps_to_apply) && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <ClipboardList className="h-3.5 w-3.5 text-emerald-600" />
                                          How to Apply
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.steps_to_apply || program.how_to_apply}</p>
                                      </div>
                                    )}

                                    {/* Documentation */}
                                    {program.documentation_required && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <FileText className="h-3.5 w-3.5 text-indigo-600" />
                                          Documentation Required
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.documentation_required}</p>
                                      </div>
                                    )}

                                    {/* Property Requirements */}
                                    {program.property_requirements && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Home className="h-3.5 w-3.5 text-purple-600" />
                                          Property Requirements
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.property_requirements}</p>
                                      </div>
                                    )}

                                    {/* Installation Requirements */}
                                    {program.installation_requirements && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Wrench className="h-3.5 w-3.5 text-orange-600" />
                                          Installation Requirements
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.installation_requirements}</p>
                                      </div>
                                    )}

                                    {/* Contractor Requirements */}
                                    {program.contractor_requirements && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <BadgeCheck className="h-3.5 w-3.5 text-teal-600" />
                                          Contractor Requirements
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.contractor_requirements}</p>
                                      </div>
                                    )}

                                    {/* Timeline */}
                                    {(program.processing_time || program.timeline_to_complete) && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Timer className="h-3.5 w-3.5 text-amber-600" />
                                          Timeline
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.processing_time || program.timeline_to_complete}</p>
                                      </div>
                                    )}

                                    {/* Reimbursement */}
                                    {program.reimbursement_process && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <DollarSign className="h-3.5 w-3.5 text-green-600" />
                                          Reimbursement Process
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.reimbursement_process}</p>
                                      </div>
                                    )}

                                    {/* Restrictions */}
                                    {program.restrictions && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                                          Restrictions
                                        </h4>
                                        <p className="text-sm text-gray-600">{program.restrictions}</p>
                                      </div>
                                    )}

                                    {/* Stacking */}
                                    {program.stacking_details && (
                                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-1.5">
                                          <Leaf className="h-3.5 w-3.5 text-emerald-600" />
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
                                        <a href={`tel:${program.contact_phone}`} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600">
                                          <Phone className="h-4 w-4" />
                                          {program.contact_phone}
                                        </a>
                                      )}
                                      {program.contact_email && (
                                        <a href={`mailto:${program.contact_email}`} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600">
                                          <ExternalLink className="h-4 w-4" />
                                          {program.contact_email}
                                        </a>
                                      )}
                                      {program.incentive_url && (
                                        <a
                                          href={program.incentive_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
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

        {/* Agency Contact */}
        {agency?.name && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Regulatory Agency</h3>
                <p className="text-gray-600 mb-3">{agency.name}</p>
                <div className="flex flex-wrap gap-4">
                  {agency.phone && (
                    <a href={`tel:${agency.phone}`} className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                      <Phone className="h-4 w-4" />
                      {agency.phone}
                    </a>
                  )}
                  {agency.website && (
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                      <ExternalLink className="h-4 w-4" />
                      Official Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cities Browser (for state-level pages) */}
        {level === 'state' && cities.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Browse by City</h2>
                  <p className="text-sm text-gray-500 mt-1">Find regulations specific to your city</p>
                </div>
                <span className="text-sm text-gray-500">{cities.length} cities</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors text-sm"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {(showAllCities || searchTerm ? filteredCities : filteredCities.slice(0, INITIAL_CITIES)).map((city, idx) => (
                  <Link
                    key={`${city.city_name}-${idx}`}
                    href={`/${stateCode.toLowerCase()}/${city.city_name?.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-lg transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-emerald-700">{city.city_name}</p>
                      {city.county_name && (
                        <p className="text-xs text-gray-400">{city.county_name} County</p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500" />
                  </Link>
                ))}
              </div>
              {!showAllCities && !searchTerm && filteredCities.length > INITIAL_CITIES && (
                <button
                  onClick={() => setShowAllCities(true)}
                  className="w-full mt-4 py-3 text-center text-emerald-600 hover:text-emerald-700 text-sm font-medium border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
                >
                  Show all {filteredCities.length} cities
                </button>
              )}
              {filteredCities.length === 0 && searchTerm && (
                <p className="text-center text-gray-400 py-8 text-sm">No cities found matching "{searchTerm}"</p>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Start Your Water Conservation Project?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our greywater systems can help you save thousands of gallons of water per year.
            {maxRebate > 0 && ` Plus, you may qualify for up to $${maxRebate.toLocaleString()} in rebates.`}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Browse Systems
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Get Expert Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
