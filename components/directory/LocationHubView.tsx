"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, Search, ExternalLink, Phone, Building2,
  Droplets, CloudRain, ArrowRight, Droplet
} from 'lucide-react'
import {
  DataConfidenceBadge,
  ResourceTypeBadge,
  getDataConfidence
} from './badges'
import {
  getJurisdictionUrls as getUrls,
  getUtilityUrl
} from '@/data/jurisdiction-urls'
import {
  IncentivesTable,
  type IncentiveProgram as SharedIncentiveProgram
} from './shared'

// =============================================================================
// TYPES
// =============================================================================

interface GreywaterData {
  legalStatus?: string
  governingCode?: string
  governingCodeUrl?: string
  permitRequired?: string
  permitThresholdGpd?: number | null
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  summary?: string
  // System types allowed
  laundryToLandscapeAllowed?: boolean
  branchedDrainAllowed?: boolean
  surgeTankAllowed?: boolean
  indoorReuseAllowed?: boolean
  // Professional requirements
  diyAllowed?: boolean
  licensedPlumberRequired?: boolean
  // Stub-out/preplumbing
  stubOutRequired?: boolean
  stubOutDetails?: string
}

interface RainwaterData {
  legalStatus?: string
  governingCode?: string
  governingCodeUrl?: string
  permitRequired?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  taxIncentives?: string
  approvedUses?: string[]
  keyRestrictions?: string[]
  summary?: string
  // Use types
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  // Storage types
  cisternAllowed?: boolean
  rainBarrelAllowed?: boolean
  undergroundAllowed?: boolean
  // Stub-out / preplumbing
  stubOutRequired?: boolean
  stubOutDetails?: string
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

interface WaterUtilityData {
  name: string
  website?: string
  phone?: string
  programCount?: number
  serviceType?: string
}

interface PermitData {
  // Basic info
  permitType?: string
  permitRequired?: boolean
  thresholdGpd?: number
  permitAuthority?: string
  permitFramework?: string
  // Application
  applicationUrl?: string
  applicationMethod?: string
  requiredDocuments?: string[]
  typicalFees?: string
  feeMin?: number
  feeMax?: number
  processingDays?: number | string
  // System types
  laundryToLandscapeAllowed?: boolean
  branchedDrainAllowed?: boolean
  surgeTankAllowed?: boolean
  indoorReuseAllowed?: boolean
  // Installation
  diyAllowed?: boolean
  licensedPlumberRequired?: boolean
  licensedContractorRequired?: boolean
  inspectionsRequired?: string[]
  // Contact
  departmentName?: string
  departmentPhone?: string
  departmentAddress?: string
  departmentHours?: string
  departmentUrl?: string
  // Additional
  exemptions?: string[]
  requirements?: string[]
  specialRequirements?: string[]
  tips?: string
  notes?: string
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
  waterUtilities?: WaterUtilityData[]
  permitData?: PermitData | null
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

// Wrapper for jurisdiction URLs that matches old signature
const getJurisdictionUrls = (stateCode: string, _stateName: string, countyName?: string, cityName?: string) => {
  const urls = getUrls(stateCode, countyName, cityName)
  return {
    ...urls,
    getUtilityUrl
  }
}

// Badge components and helpers moved to shared/IncentivesTable

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
  waterUtilities = [],
  permitData
}: LocationHubViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllCities, setShowAllCities] = useState(false)
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null)
  const INITIAL_CITIES = 30

  // Get unique counties for filtering
  const uniqueCounties = Array.from(new Set(cities.map(c => c.county_name).filter(Boolean))).sort() as string[]

  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  // Get jurisdiction URLs for linking to official code documentation
  const jurisdictionUrls = getJurisdictionUrls(stateCode, stateName, countyName, cityName)

  // Filter cities by search term and county
  const filteredCities = cities.filter(c => {
    const matchesSearch = c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCounty = !selectedCounty || c.county_name === selectedCounty
    return matchesSearch && matchesCounty
  }).sort((a, b) => (a.city_name || '').localeCompare(b.city_name || ''))

  // Filter function to exclude grants
  const isNotGrant = (i: IncentiveProgram) => {
    const type = (i.incentive_type || '').toLowerCase()
    return type !== 'grant' && !type.includes('grant')
  }

  // Count incentives by resource type (excluding grants)
  const incentiveCounts = {
    greywater: incentives.filter(i => i.resource_type === 'greywater' && isNotGrant(i)).length,
    rainwater: incentives.filter(i => i.resource_type === 'rainwater' && isNotGrant(i)).length,
    conservation: incentives.filter(i => (i.resource_type === 'conservation' || !i.resource_type) && isNotGrant(i)).length,
    total: incentives.filter(isNotGrant).length
  }

  // Filter out grants - only show rebates for homeowners and small businesses
  const relevantIncentives = incentives.filter(isNotGrant)

  // Max rebate amount (excluding grants)
  const maxRebate = Math.max(...relevantIncentives.map(i => i.incentive_amount_max || 0), 0)

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-sand-500 hover:text-ocean-600">Home</Link>
          {level === 'city' && (
            <>
              <ChevronRight className="h-3 w-3 text-sand-300" />
              <Link href={`/${stateCode.toLowerCase()}`} className="text-sand-500 hover:text-ocean-600">
                {stateName}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-sand-300" />
          <span className="text-sand-900 font-medium">{locationName}</span>
        </nav>

        {/* Hero Header - Streamlined */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-sand-900 mb-2">
            {level === 'city'
              ? `${cityName}, ${stateCode} Water Conservation`
              : `${stateName} Water Regulations`
            }
          </h1>
          <p className="text-sand-500 text-sm">
            {level === 'city'
              ? `Greywater & rainwater laws, permits, and rebates`
              : `State greywater laws, rainwater harvesting, and water conservation programs`
            }
          </p>
        </div>


        {/* Quick Summary Cards - Greywater and Rainwater */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Greywater Summary Card */}
          <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
            <div className="bg-gradient-to-r from-ocean-50 to-green-50 px-5 py-4 border-b border-ocean-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ocean-600 rounded-xl flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sand-900">Greywater Regulations</h2>
                    <p className="text-sm text-sand-600">{level === 'city' ? `${cityName}, ${stateCode}` : stateName}</p>
                  </div>
                </div>
                {greywater?.legalStatus && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    greywater.legalStatus === 'Legal' ? 'bg-ocean-100 text-ocean-700' :
                    greywater.legalStatus === 'Regulated' ? 'bg-amber-100 text-amber-700' :
                    'bg-sand-100 text-sand-700'
                  }`}>
                    {greywater.legalStatus}
                  </span>
                )}
              </div>
            </div>
            <div className="p-5">
              {/* Key Stats Row */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {greywater?.permitThresholdGpd ? (
                  <div className="bg-ocean-50 rounded-lg p-3">
                    <p className="text-xs text-ocean-600 font-medium uppercase tracking-wide">Permit-Free Under</p>
                    <p className="text-2xl font-bold text-ocean-700">{greywater.permitThresholdGpd} <span className="text-sm font-medium">GPD</span></p>
                  </div>
                ) : greywater?.permitRequired && (
                  <div className="bg-sand-50 rounded-lg p-3">
                    <p className="text-xs text-sand-500 font-medium uppercase tracking-wide">Permit</p>
                    <p className="text-lg font-bold text-sand-900">{greywater.permitRequired}</p>
                  </div>
                )}
                {(permitData?.diyAllowed !== undefined || greywater?.diyAllowed !== undefined) && (
                  <div className={`rounded-lg p-3 ${(permitData?.diyAllowed ?? greywater?.diyAllowed) ? 'bg-ocean-50' : 'bg-amber-50'}`}>
                    <p className="text-xs text-sand-500 font-medium uppercase tracking-wide">DIY Installation</p>
                    <p className={`text-lg font-bold ${(permitData?.diyAllowed ?? greywater?.diyAllowed) ? 'text-ocean-700' : 'text-amber-700'}`}>
                      {(permitData?.diyAllowed ?? greywater?.diyAllowed) ? 'Allowed' : 'Professional Required'}
                    </p>
                  </div>
                )}
              </div>

              {/* System Types Allowed */}
              {(permitData?.laundryToLandscapeAllowed !== undefined ||
                permitData?.branchedDrainAllowed !== undefined ||
                permitData?.surgeTankAllowed !== undefined ||
                greywater?.laundryToLandscapeAllowed !== undefined) && (
                <div className="mb-4">
                  <p className="text-xs text-sand-500 font-medium uppercase tracking-wide mb-2">Allowed System Types</p>
                  <div className="flex flex-wrap gap-2">
                    {(permitData?.laundryToLandscapeAllowed ?? greywater?.laundryToLandscapeAllowed) && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                        ✓ Laundry-to-Landscape
                      </span>
                    )}
                    {(permitData?.branchedDrainAllowed ?? greywater?.branchedDrainAllowed) && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                        ✓ Branched Drain
                      </span>
                    )}
                    {(permitData?.surgeTankAllowed ?? greywater?.surgeTankAllowed) && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                        ✓ Surge Tank
                      </span>
                    )}
                    {(permitData?.indoorReuseAllowed ?? greywater?.indoorReuseAllowed) && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                        ✓ Indoor Reuse
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Stub-out / Preplumbing Info */}
              {(preplumbing?.hasMandate || greywater?.stubOutRequired) && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">New Construction</p>
                  <p className="text-sm text-blue-800 font-medium">Greywater stub-outs required</p>
                  {(preplumbing?.details || greywater?.stubOutDetails) && (
                    <p className="text-xs text-blue-600 mt-1">{preplumbing?.details || greywater?.stubOutDetails}</p>
                  )}
                </div>
              )}

              {/* Key Rules */}
              {greywater?.keyRestrictions && greywater.keyRestrictions.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-sand-500 font-medium uppercase tracking-wide mb-2">Key Rules</p>
                  <ul className="space-y-1">
                    {greywater.keyRestrictions.slice(0, 3).map((rule, idx) => (
                      <li key={idx} className="text-sm text-sand-600 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span className="line-clamp-1">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Summary */}
              {greywater?.summary && (
                <p className="text-sm text-sand-600 line-clamp-2 mb-4">{greywater.summary}</p>
              )}

              {/* CTA Link */}
              <Link
                href={`${basePath}/greywater`}
                className="group/link flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium text-sm"
              >
                View Full Greywater Guide
                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Rainwater Summary Card */}
          {rainwater && (
            <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
              <div className="bg-gradient-to-r from-ocean-50 to-blue-50 px-5 py-4 border-b border-ocean-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-ocean-600 rounded-xl flex items-center justify-center">
                      <CloudRain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sand-900">Rainwater Harvesting</h2>
                      <p className="text-sm text-sand-600">{level === 'city' ? `${cityName}, ${stateCode}` : stateName}</p>
                    </div>
                  </div>
                  {rainwater?.legalStatus && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rainwater.legalStatus === 'Legal' ? 'bg-ocean-100 text-ocean-700' :
                      rainwater.legalStatus === 'Regulated' ? 'bg-amber-100 text-amber-700' :
                      'bg-sand-100 text-sand-700'
                    }`}>
                      {rainwater.legalStatus}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                {/* Key Stats Row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-ocean-50 rounded-lg p-3">
                    <p className="text-xs text-ocean-600 font-medium uppercase tracking-wide">Collection Limit</p>
                    <p className="text-2xl font-bold text-ocean-700">
                      {rainwater?.collectionLimitGallons ? `${rainwater.collectionLimitGallons.toLocaleString()}` : 'No Limit'}
                      {rainwater?.collectionLimitGallons && <span className="text-sm font-medium ml-1">gal</span>}
                    </p>
                  </div>
                  <div className={`rounded-lg p-3 ${rainwater?.permitRequired === 'No' || !rainwater?.permitRequired ? 'bg-ocean-50' : 'bg-sand-50'}`}>
                    <p className="text-xs text-sand-500 font-medium uppercase tracking-wide">Permit Required</p>
                    <p className={`text-lg font-bold ${rainwater?.permitRequired === 'No' || !rainwater?.permitRequired ? 'text-ocean-700' : 'text-sand-900'}`}>
                      {rainwater?.permitRequired || 'No'}
                    </p>
                  </div>
                </div>

                {/* Collection Methods / Storage Types Allowed */}
                {(rainwater?.rainBarrelAllowed !== undefined ||
                  rainwater?.cisternAllowed !== undefined ||
                  rainwater?.undergroundAllowed !== undefined) && (
                  <div className="mb-4">
                    <p className="text-xs text-sand-500 font-medium uppercase tracking-wide mb-2">Collection Methods</p>
                    <div className="flex flex-wrap gap-2">
                      {rainwater?.rainBarrelAllowed && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                          Rain Barrels
                        </span>
                      )}
                      {rainwater?.cisternAllowed && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                          Cisterns
                        </span>
                      )}
                      {rainwater?.undergroundAllowed && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                          Underground Storage
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Permitted Uses */}
                {(rainwater?.outdoorUseAllowed !== undefined ||
                  rainwater?.indoorUseAllowed !== undefined ||
                  rainwater?.potableUseAllowed !== undefined) && (
                  <div className="mb-4">
                    <p className="text-xs text-sand-500 font-medium uppercase tracking-wide mb-2">Permitted Uses</p>
                    <div className="flex flex-wrap gap-2">
                      {rainwater?.outdoorUseAllowed && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                          Outdoor Irrigation
                        </span>
                      )}
                      {rainwater?.indoorUseAllowed && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                          Indoor Non-Potable
                        </span>
                      )}
                      {rainwater?.potableUseAllowed && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          Potable (with treatment)
                        </span>
                      )}
                      {rainwater?.potableUseAllowed === false && !rainwater?.indoorUseAllowed && !rainwater?.outdoorUseAllowed && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-sand-100 text-sand-600 text-xs font-medium rounded">
                          Non-Potable Only
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Approved Uses (from database array) - show if no boolean fields available */}
                {rainwater?.approvedUses && rainwater.approvedUses.length > 0 &&
                  (rainwater?.outdoorUseAllowed === undefined && rainwater?.indoorUseAllowed === undefined) && (
                  <div className="mb-4">
                    <p className="text-xs text-sand-500 font-medium uppercase tracking-wide mb-2">Approved Uses</p>
                    <div className="flex flex-wrap gap-2">
                      {rainwater.approvedUses.slice(0, 4).map((use, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 bg-ocean-50 text-ocean-700 text-xs rounded">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tax Incentives */}
                {rainwater?.taxIncentives && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide mb-1">Tax Incentives</p>
                    <p className="text-sm text-green-800">{rainwater.taxIncentives}</p>
                  </div>
                )}

                {/* Stub-out / Preplumbing Info (for rainwater) */}
                {rainwater?.stubOutRequired && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">New Construction</p>
                    <p className="text-sm text-blue-800 font-medium">Rainwater stub-outs required</p>
                    {rainwater?.stubOutDetails && (
                      <p className="text-xs text-blue-600 mt-1">{rainwater.stubOutDetails}</p>
                    )}
                  </div>
                )}

                {/* Key Restrictions / Requirements */}
                {rainwater?.keyRestrictions && rainwater.keyRestrictions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-sand-500 font-medium uppercase tracking-wide mb-2">Key Requirements</p>
                    <ul className="space-y-1">
                      {rainwater.keyRestrictions.slice(0, 3).map((rule, idx) => (
                        <li key={idx} className="text-sm text-sand-600 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">*</span>
                          <span className="line-clamp-1">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Summary */}
                {rainwater?.summary && (
                  <p className="text-sm text-sand-600 line-clamp-2 mb-4">{rainwater.summary}</p>
                )}

                {/* CTA Link */}
                <Link
                  href={`${basePath}/rainwater`}
                  className="group/link flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium text-sm"
                >
                  View Full Rainwater Guide
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>


        {/* Incentives Section - Using shared IncentivesTable component */}
        {relevantIncentives.length > 0 && (
          <IncentivesTable
            incentives={relevantIncentives as unknown as SharedIncentiveProgram[]}
            theme="ocean"
            title="Available Rebates & Incentives"
            subtitle={level === 'city'
              ? `Programs available to ${locationName} residents from state, ${countyName ? 'county, ' : ''}and city governments`
              : `Rebates, tax credits, and other incentives for ${locationName} homeowners and small businesses`
            }
            showJurisdictionLevel={true}
            locationName={locationName || stateName}
            className="mb-8"
          />
        )}


        {/* Water Utilities */}
        {waterUtilities && waterUtilities.length > 0 && (
          <div className="bg-white rounded-xl border border-sand-200 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Droplet className="h-6 w-6 text-ocean-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sand-900 mb-1">Water Utility</h3>
                <div className="space-y-3">
                  {waterUtilities.map((utility, idx) => (
                    <div key={idx} className={idx > 0 ? 'pt-3 border-t border-sand-100' : ''}>
                      <p className="text-sand-700 font-medium">{utility.name}</p>
                      {utility.serviceType && utility.serviceType !== 'primary' && (
                        <span className="text-xs text-sand-500">(partial service area)</span>
                      )}
                      <div className="flex flex-wrap gap-4 mt-1">
                        {utility.phone && (
                          <a href={`tel:${utility.phone}`} className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700">
                            <Phone className="h-4 w-4" />
                            {utility.phone}
                          </a>
                        )}
                        {utility.website && (
                          <a href={utility.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700">
                            <ExternalLink className="h-4 w-4" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agency Contact */}
        {agency?.name && (
          <div className="bg-white rounded-xl border border-sand-200 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-sand-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sand-900 mb-1">Regulatory Agency</h3>
                <p className="text-sand-600 mb-3">{agency.name}</p>
                <div className="flex flex-wrap gap-4">
                  {agency.phone && (
                    <a href={`tel:${agency.phone}`} className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700">
                      <Phone className="h-4 w-4" />
                      {agency.phone}
                    </a>
                  )}
                  {agency.website && (
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700">
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
          <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-sand-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-sand-900">Browse by City</h2>
                  <p className="text-sm text-sand-500 mt-1">Find regulations specific to your city</p>
                </div>
                <span className="text-sm text-sand-500">
                  {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'}
                  {selectedCounty && ` in ${selectedCounty} County`}
                </span>
              </div>

              {/* County Filter */}
              {uniqueCounties.length > 1 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCounty(null)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        !selectedCounty
                          ? 'bg-ocean-600 text-white'
                          : 'bg-sand-100 text-sand-600 hover:bg-sand-200'
                      }`}
                    >
                      All Counties
                    </button>
                    {uniqueCounties.map(county => (
                      <button
                        key={county}
                        onClick={() => setSelectedCounty(county === selectedCounty ? null : county)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                          selectedCounty === county
                            ? 'bg-ocean-600 text-white'
                            : 'bg-sand-100 text-sand-600 hover:bg-sand-200'
                        }`}
                      >
                        {county}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-sand-200 rounded-lg bg-white focus:outline-none focus:border-ocean-400 focus:ring-1 focus:ring-ocean-400 transition-colors text-sm"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {(showAllCities || searchTerm || selectedCounty ? filteredCities : filteredCities.slice(0, INITIAL_CITIES)).map((city, idx) => (
                  <div
                    key={`${city.city_name}-${idx}`}
                    className="p-3 bg-sand-50 hover:bg-ocean-50 border border-sand-200 hover:border-ocean-300 rounded-lg transition-colors group"
                  >
                    <Link
                      href={`/${stateCode.toLowerCase()}/${city.city_name?.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center justify-between"
                    >
                      <p className="font-medium text-sand-900 group-hover:text-ocean-700">{city.city_name}</p>
                      <ChevronRight className="h-4 w-4 text-sand-300 group-hover:text-ocean-500" />
                    </Link>
                    {city.county_name && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCounty(city.county_name === selectedCounty ? null : city.county_name!)
                        }}
                        className="text-xs text-sand-400 hover:text-ocean-600 hover:underline mt-0.5"
                      >
                        {city.county_name} County
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {!showAllCities && !searchTerm && !selectedCounty && filteredCities.length > INITIAL_CITIES && (
                <button
                  onClick={() => setShowAllCities(true)}
                  className="w-full mt-4 py-3 text-center text-ocean-600 hover:text-ocean-700 text-sm font-medium border border-sand-200 rounded-lg hover:border-ocean-300 transition-colors"
                >
                  Show all {filteredCities.length} cities
                </button>
              )}
              {filteredCities.length === 0 && (searchTerm || selectedCounty) && (
                <p className="text-center text-sand-400 py-8 text-sm">
                  No cities found{searchTerm && ` matching "${searchTerm}"`}{selectedCounty && ` in ${selectedCounty} County`}
                </p>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Start Your Water Conservation Project?
          </h3>
          <p className="text-sand-300 mb-6 max-w-2xl mx-auto">
            Our greywater systems can help you save thousands of gallons of water per year.
            {maxRebate > 0 && ` Plus, you may qualify for up to $${maxRebate.toLocaleString()} in rebates.`}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 text-white font-medium rounded-lg hover:bg-ocean-400 transition-colors"
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
