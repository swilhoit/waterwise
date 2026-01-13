"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, Search, ExternalLink, Phone, Building2,
  Droplets, CloudRain, ArrowRight
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

interface WaterUtilityData {
  name: string
  website?: string
  phone?: string
  programCount?: number
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
  const INITIAL_CITIES = 30

  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  // Get jurisdiction URLs for linking to official code documentation
  const jurisdictionUrls = getJurisdictionUrls(stateCode, stateName, countyName, cityName)

  // Filter cities
  const filteredCities = cities.filter(c =>
    c.city_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => (a.city_name || '').localeCompare(b.city_name || ''))

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

        {/* Hero Header - Streamlined */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {level === 'city'
              ? `${cityName}, ${stateCode} Water Conservation`
              : `${stateName} Water Regulations`
            }
          </h1>
          <p className="text-gray-500 text-sm">
            {level === 'city'
              ? `Greywater & rainwater laws, permits, and rebates`
              : `State greywater laws, rainwater harvesting, and water conservation programs`
            }
          </p>
        </div>


        {/* Quick Summary Cards - Greywater and Rainwater */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Greywater Summary Card */}
          <Link
            href={`${basePath}/greywater`}
            className="group bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-5 py-4 border-b border-emerald-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Greywater Regulations</h2>
                    <p className="text-sm text-gray-600">{level === 'city' ? `${cityName}, ${stateCode}` : stateName}</p>
                  </div>
                </div>
                {greywater?.legalStatus && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    greywater.legalStatus === 'Legal' ? 'bg-emerald-100 text-emerald-700' :
                    greywater.legalStatus === 'Regulated' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {greywater.legalStatus}
                  </span>
                )}
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-4 mb-4">
                {greywater?.permitThresholdGpd && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Permit-Free Under</p>
                    <p className="text-xl font-bold text-emerald-700">{greywater.permitThresholdGpd} GPD</p>
                  </div>
                )}
                {greywater?.permitRequired && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Permit</p>
                    <p className="text-xl font-bold text-gray-900">{greywater.permitRequired}</p>
                  </div>
                )}
              </div>
              {greywater?.summary && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{greywater.summary}</p>
              )}
              <div className="flex items-center gap-2 text-emerald-600 group-hover:text-emerald-700 font-medium text-sm">
                View Full Details
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Rainwater Summary Card */}
          {rainwater && (
            <Link
              href={`${basePath}/rainwater`}
              className="group bg-white rounded-xl border border-gray-200 hover:border-cyan-300 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-5 py-4 border-b border-cyan-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center">
                      <CloudRain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Rainwater Harvesting</h2>
                      <p className="text-sm text-gray-600">{level === 'city' ? `${cityName}, ${stateCode}` : stateName}</p>
                    </div>
                  </div>
                  {rainwater?.legalStatus && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rainwater.legalStatus === 'Legal' ? 'bg-cyan-100 text-cyan-700' :
                      rainwater.legalStatus === 'Regulated' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {rainwater.legalStatus}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-4 mb-4">
                  {rainwater?.collectionLimitGallons !== undefined && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Collection Limit</p>
                      <p className="text-xl font-bold text-cyan-700">
                        {rainwater.collectionLimitGallons ? `${rainwater.collectionLimitGallons.toLocaleString()} gal` : 'No Limit'}
                      </p>
                    </div>
                  )}
                  {rainwater?.permitRequired && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Permit</p>
                      <p className="text-xl font-bold text-gray-900">{rainwater.permitRequired}</p>
                    </div>
                  )}
                </div>
                {rainwater?.summary && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{rainwater.summary}</p>
                )}
                <div className="flex items-center gap-2 text-cyan-600 group-hover:text-cyan-700 font-medium text-sm">
                  View Full Details
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          )}
        </div>


        {/* Incentives Section - Using shared IncentivesTable component */}
        {relevantIncentives.length > 0 && (
          <IncentivesTable
            incentives={relevantIncentives as unknown as SharedIncentiveProgram[]}
            theme="emerald"
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
