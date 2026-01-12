"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, ChevronDown, ExternalLink, Phone, Building2,
  Droplets, DollarSign, Check, AlertTriangle, Home,
  FileText, Gauge, MapPin, ArrowRight, Users, ClipboardList,
  Wrench, Timer, BadgeCheck, AlertCircle, Leaf
} from 'lucide-react'

interface GreywaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  permitExplanation?: string
  permitThresholdGpd?: number | null
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
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

const JurisdictionLevelBadge = ({ level, stateName, countyName, cityName }: {
  level?: 'state' | 'county' | 'city' | 'other'
  stateName?: string
  countyName?: string
  cityName?: string
}) => {
  if (!level) return null

  const config: Record<string, { label: string; icon: string; className: string }> = {
    state: { label: stateName || 'State', icon: '🏛️', className: 'bg-purple-50 text-purple-700 border-purple-200' },
    county: { label: countyName ? `${countyName} County` : 'County', icon: '🏢', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    city: { label: cityName || 'City', icon: '🏠', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    other: { label: 'Regional', icon: '📍', className: 'bg-gray-50 text-gray-700 border-gray-200' }
  }

  const { label, icon, className } = config[level] || config.other

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${className}`}>
      <span>{icon}</span>
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

interface WaterUtilityData {
  name: string
  programCount?: number
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
  localRegulation?: LocalRegulation | null
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
  localRegulation
}: GreywaterSpokeViewProps) {
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

  // Filter greywater-specific incentives, excluding grants (case-insensitive)
  const greywaterIncentives = incentives.filter(i => {
    const type = (i.incentive_type || '').toLowerCase()
    const isNotGrant = type !== 'grant' && !type.includes('grant')
    return (i.resource_type === 'greywater' || !i.resource_type) && isNotGrant
  })

  const getLegalStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-700'
    const lower = status.toLowerCase()
    if (lower.includes('legal') || lower === 'l') return 'bg-emerald-100 text-emerald-700'
    if (lower.includes('regulated') || lower === 'r') return 'bg-amber-100 text-amber-700'
    if (lower.includes('prohibited')) return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <Link href={`/${stateCode.toLowerCase()}`} className="text-gray-500 hover:text-emerald-600">
            {stateName}
          </Link>
          {level === 'city' && cityName && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-300" />
              <Link href={basePath} className="text-gray-500 hover:text-emerald-600">
                {cityName}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-gray-900 font-medium">Greywater</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center">
              <Droplets className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {locationName} Greywater Laws
              </h1>
              <p className="text-gray-600">
                {level === 'city' ? `${cityName}, ${stateCode}` : stateName} regulations and permits
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getLegalStatusColor(greywater?.legalStatus)}`}>
              <Droplets className="h-4 w-4" />
              Greywater {greywater?.legalStatus || 'Status Varies'}
            </span>
            {greywater?.permitRequired && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-gray-700 border border-gray-200">
                <FileText className="h-4 w-4" />
                Permit: {greywater.permitRequired}
              </span>
            )}
            {greywaterIncentives.length > 0 && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full font-medium">
                <DollarSign className="h-4 w-4" />
                {greywaterIncentives.length} Rebate{greywaterIncentives.length !== 1 ? 's' : ''} Available
              </span>
            )}
          </div>
        </div>

        {/* Recent Changes Alert */}
        {greywater?.recentChanges && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Recent Changes</p>
                <p className="text-sm text-amber-700 mt-1">{greywater.recentChanges}</p>
              </div>
            </div>
          </div>
        )}

        {/* Local Regulation Summary */}
        {localRegulation?.regulationSummary && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-emerald-800">Local Greywater Regulations</p>
                <p className="text-sm text-emerald-700 mt-1">{localRegulation.regulationSummary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Water Utilities */}
        {(() => {
          const utilitiesFromIncentives = Array.from(
            greywaterIncentives.reduce((acc, i) => {
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
                <Droplets className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-800 mb-2">
                    Water {utilitiesFromIncentives.length === 1 ? 'Utility' : 'Utilities'} with Greywater Programs
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

        {/* Pre-Plumbing Mandate Alert */}
        {preplumbing?.hasMandate && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-purple-800">Pre-Plumbing Mandate</p>
                <p className="text-sm text-purple-700 mt-1">
                  {preplumbing.details || 'New construction must include greywater-ready plumbing.'}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  {preplumbing.buildingTypes && (
                    <p className="text-xs text-purple-600">
                      <strong>Applies to:</strong> {preplumbing.buildingTypes}
                    </p>
                  )}
                  {preplumbing.thresholdSqft && (
                    <p className="text-xs text-purple-600">
                      <strong>Threshold:</strong> {preplumbing.thresholdSqft.toLocaleString()}+ sqft
                    </p>
                  )}
                </div>
                {preplumbing.codeReference && (
                  <p className="text-xs text-purple-500 mt-1">{preplumbing.codeReference}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Greywater Overview</h2>
              </div>
              <div className="p-6">
                {greywater?.summary && (
                  <p className="text-gray-600 mb-6">{greywater.summary}</p>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Gauge className="h-4 w-4" />
                      Permit Threshold
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {greywater?.permitThresholdGpd && greywater.permitThresholdGpd > 0
                        ? `${greywater.permitThresholdGpd} GPD`
                        : 'Varies'
                      }
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Systems below this may not need a permit
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      Allowed Uses
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${greywater?.outdoorUseAllowed ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
                        Outdoor
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${greywater?.indoorUseAllowed ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
                        Indoor
                      </span>
                    </div>
                  </div>
                </div>

                {greywater?.governingCode && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Governing Code</p>
                    <p className="text-gray-900">{greywater.governingCode}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Approved Uses */}
            {greywater?.approvedUses && greywater.approvedUses.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-600" />
                    Approved Greywater Uses
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {greywater.approvedUses.map((use, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-gray-700">{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Key Restrictions */}
            {greywater?.keyRestrictions && greywater.keyRestrictions.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-amber-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Key Restrictions & Requirements
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {greywater.keyRestrictions.map((restriction, idx) => (
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
                    <h3 className="font-semibold text-gray-900 text-sm">Regulatory Agency</h3>
                    <p className="text-xs text-gray-500">{agency.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {agency.phone && (
                    <a href={`tel:${agency.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600">
                      <Phone className="h-4 w-4" />
                      {agency.phone}
                    </a>
                  )}
                  {agency.website && (
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600">
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
                  href={`${basePath}/rainwater`}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-cyan-700">Rainwater Harvesting</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-cyan-500" />
                </Link>
                <Link
                  href={basePath}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-emerald-700">All {locationName} Programs</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Incentives Section */}
        {greywaterIncentives.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-8">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  Greywater Rebates & Incentives
                </h2>
                <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  {greywaterIncentives.length} programs
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Available rebates and incentives for greywater systems in {locationName}
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
                  {greywaterIncentives.map((program, idx) => {
                    const programId = `gw-${idx}-${program.program_name}`
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
                          className={`${hasDetails ? 'cursor-pointer' : ''} hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-emerald-50' : ''}`}
                          onClick={() => hasDetails && toggleProgram(programId)}
                        >
                          {/* Expand Icon */}
                          <td className="px-4 py-4">
                            {hasDetails && (
                              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
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
                                        <ClipboardList className="h-3.5 w-3.5 text-emerald-600" />
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

        {/* CTA */}
        <div className="mt-12 bg-emerald-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Install a Greywater System?
          </h3>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Our greywater recycling systems are designed to meet {locationName} regulations and help you save water.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
          >
            View Greywater Systems
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
