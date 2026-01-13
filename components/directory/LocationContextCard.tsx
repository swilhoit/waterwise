"use client"

import React from 'react'
import Link from 'next/link'
import {
  Building2, Home, ExternalLink, MapPin, Droplets,
  DollarSign, ArrowRight
} from 'lucide-react'

interface WaterUtilityData {
  name: string
  website?: string
  programCount?: number
}

// Using flexible types to accept data from various calling components
interface LocationContextCardProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  incentives?: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localRegulation?: { regulationSummary?: string; permitRequired?: any } | null
  waterUtilities?: WaterUtilityData[]
  showRebateBanner?: boolean
  compact?: boolean
}

// State water regulation URLs
const stateUrls: Record<string, string> = {
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

// Known county water/building code URLs
const countyUrls: Record<string, string> = {
  'CA_LOS_ANGELES': 'https://pw.lacounty.gov/bsd/lib/BuildingCode/',
  'CA_SAN_DIEGO': 'https://www.sandiegocounty.gov/pds/bldg/',
  'CA_ORANGE': 'https://ocpublicworks.com/building',
  'CA_VENTURA': 'https://www.ventura.org/building-and-safety/',
  'CA_RIVERSIDE': 'https://rivcoeda.org/Building-and-Safety',
  'CA_SAN_BERNARDINO': 'https://sbcounty.gov/lus/building_and_safety/',
  'CA_SANTA_CLARA': 'https://www.sccgov.org/sites/dpd/Pages/dpd.aspx',
  'CA_ALAMEDA': 'https://www.acgov.org/cda/planning/',
  'CA_SAN_FRANCISCO': 'https://sfdbi.org/building-codes',
  'CA_CONTRA_COSTA': 'https://www.contracosta.ca.gov/6282/Building-Inspection',
  'CA_MARIN': 'https://www.marincounty.org/depts/cd/divisions/building-and-safety',
  'CA_SONOMA': 'https://sonomacounty.ca.gov/development-services/permit-sonoma/',
  'CA_KERN': 'https://kernpublicworks.com/building-and-development/',
  'CA_FRESNO': 'https://www.co.fresno.ca.us/departments/public-works-planning/development-services',
  'CA_SACRAMENTO': 'https://building.saccounty.gov/',
}

// Known city municipal code URLs
const cityUrls: Record<string, string> = {
  'CA_LOS_ANGELES': 'https://codelibrary.amlegal.com/codes/los_angeles/latest/lamc/0-0-0-1',
  'CA_SAN_DIEGO': 'https://www.sandiego.gov/development-services/codes-policies',
  'CA_SAN_FRANCISCO': 'https://codelibrary.amlegal.com/codes/san_francisco/latest/overview',
  'CA_SAN_JOSE': 'https://www.sanjoseca.gov/your-government/departments/planning-building-code-enforcement/building-code-enforcement',
  'CA_OAKLAND': 'https://www.oaklandca.gov/departments/planning-building',
  'CA_LONG_BEACH': 'https://www.longbeach.gov/lbds/',
  'CA_SANTA_MONICA': 'https://www.santamonica.gov/building-codes',
  'CA_PASADENA': 'https://www.cityofpasadena.net/building-and-safety/',
  'CA_BURBANK': 'https://www.burbankca.gov/departments/community-development/building-division',
  'CA_GLENDALE': 'https://www.glendaleca.gov/government/departments/community-development/building-safety',
  'CA_BAKERSFIELD': 'https://www.bakersfieldcity.us/184/Building-Division',
  'CA_FRESNO': 'https://www.fresno.gov/planning/building-and-safety/',
  'CA_SACRAMENTO': 'https://www.cityofsacramento.gov/community-development/building/building-codes',
}

// Known water utility URLs
const utilityUrls: Record<string, string> = {
  'LADWP': 'https://www.ladwp.com/ladwp/faces/ladwp/residential/r-savemoney/r-sm-rebatesandprograms',
  'MWD': 'https://www.bewaterwise.com/',
  'EBMUD': 'https://www.ebmud.com/water/conservation-and-rebates/',
  'SFPUC': 'https://sfpuc.org/programs/rebates',
  'Santa Clara Valley Water': 'https://www.valleywater.org/saving-water',
  'Valley Water': 'https://www.valleywater.org/saving-water',
  'San Diego County Water Authority': 'https://www.sdcwa.org/your-water/conservation/',
  'SDCWA': 'https://www.sdcwa.org/your-water/conservation/',
  'Eastern MWD': 'https://www.emwd.org/post/rebates',
  'EMWD': 'https://www.emwd.org/post/rebates',
  'IRWD': 'https://www.irwd.com/save-water/rebates',
  'Golden State Water': 'https://www.gswater.com/conservation',
  'Cal Water': 'https://www.calwater.com/conservation-rebates/',
  'California Water Service': 'https://www.calwater.com/conservation-rebates/',
  'CALWATER_BAK': 'https://www.calwater.com/conservation-rebates/',
}

// Helper to normalize names for key lookup
const normalize = (name: string) =>
  name?.toUpperCase().replace(/[^A-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || ''

function getJurisdictionUrls(stateCode: string, countyName?: string, cityName?: string) {
  const stateUrl = stateUrls[stateCode] || undefined
  const countyKey = countyName ? `${stateCode}_${normalize(countyName)}` : ''
  const countyUrl = countyUrls[countyKey] || undefined
  const cityKey = cityName ? `${stateCode}_${normalize(cityName)}` : ''
  const cityUrl = cityUrls[cityKey] || undefined

  return { stateUrl, countyUrl, cityUrl }
}

function getUtilityUrl(utilityName: string): string | undefined {
  return utilityUrls[utilityName] || utilityUrls[normalize(utilityName)] || undefined
}

export default function LocationContextCard({
  level,
  stateName,
  stateCode,
  cityName,
  countyName,
  incentives = [],
  localRegulation,
  waterUtilities = [],
  showRebateBanner = true,
  compact = false
}: LocationContextCardProps) {
  const jurisdictionUrls = getJurisdictionUrls(stateCode, countyName, cityName)

  // Extract unique water utilities from incentives if not provided
  const utilitiesFromIncentives: WaterUtilityData[] = waterUtilities.length > 0
    ? waterUtilities
    : Array.from(
        incentives.reduce((acc: Map<string, WaterUtilityData>, i) => {
          if (i.water_utility && i.water_utility.trim()) {
            const name = i.water_utility.trim() as string
            if (!acc.has(name)) {
              acc.set(name, { name, programCount: 1 })
            } else {
              const existing = acc.get(name)!
              existing.programCount = (existing.programCount || 0) + 1
            }
          }
          return acc
        }, new Map<string, WaterUtilityData>()).values()
      ).sort((a, b) => (b.programCount || 0) - (a.programCount || 0))

  const maxRebate = Math.max(...incentives.map(i => i.incentive_amount_max || 0), 0)

  return (
    <div className={`space-y-${compact ? '3' : '4'}`}>
      {/* Rebate Programs Banner */}
      {showRebateBanner && level === 'city' && incentives.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            <span className="font-semibold text-emerald-700">{incentives.length} rebate programs</span>
            <span className="text-gray-500">•</span>
            <span className="text-emerald-600">Up to ${maxRebate.toLocaleString()}</span>
          </div>
          <a
            href="#rebates"
            className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View Rebates
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* Local Regulation Summary */}
      {localRegulation?.regulationSummary && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
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

      {/* Regulatory Hierarchy - City Level Only */}
      {level === 'city' && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 text-sm mb-2">Regulatory Hierarchy</h3>
          <div className="grid grid-cols-3 gap-2">
            {/* State Law */}
            {jurisdictionUrls.stateUrl ? (
              <a
                href={jurisdictionUrls.stateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-purple-50/50 rounded-lg border border-purple-100 hover:bg-purple-100/50 hover:border-purple-200 transition-colors group"
              >
                <div className="w-7 h-7 bg-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs text-gray-900 group-hover:text-purple-700 flex items-center gap-1 truncate">
                    {stateName} State
                    <ExternalLink className="w-2.5 h-2.5 text-purple-400 flex-shrink-0" />
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">Baseline regulations</div>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-2 p-2 bg-purple-50/50 rounded-lg border border-purple-100">
                <div className="w-7 h-7 bg-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs text-gray-900 truncate">{stateName} State</div>
                  <div className="text-[10px] text-gray-500 truncate">Baseline regulations</div>
                </div>
              </div>
            )}

            {/* County */}
            {countyName && (
              jurisdictionUrls.countyUrl ? (
                <a
                  href={jurisdictionUrls.countyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100/50 hover:border-amber-200 transition-colors group"
                >
                  <div className="w-7 h-7 bg-amber-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs text-gray-900 group-hover:text-amber-700 flex items-center gap-1 truncate">
                      {countyName}
                      <ExternalLink className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">County rules</div>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-amber-50/50 rounded-lg border border-amber-100">
                  <div className="w-7 h-7 bg-amber-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs text-gray-900 truncate">{countyName}</div>
                    <div className="text-[10px] text-gray-500 truncate">County rules</div>
                  </div>
                </div>
              )
            )}

            {/* City */}
            {jurisdictionUrls.cityUrl ? (
              <a
                href={jurisdictionUrls.cityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 hover:bg-emerald-100/50 hover:border-emerald-200 transition-colors group"
              >
                <div className="w-7 h-7 bg-emerald-100 rounded-md flex items-center justify-center flex-shrink-0">
                  <Home className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs text-gray-900 group-hover:text-emerald-700 flex items-center gap-1 truncate">
                    {cityName}
                    <ExternalLink className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">City ordinances</div>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                <div className="w-7 h-7 bg-emerald-100 rounded-md flex items-center justify-center flex-shrink-0">
                  <Home className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs text-gray-900 truncate">{cityName}</div>
                  <div className="text-[10px] text-gray-500 truncate">City ordinances</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Water Utilities Section */}
      {utilitiesFromIncentives.length > 0 && (
        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 mr-1">
              <Droplets className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900 text-xs">Water Utilities:</span>
            </div>
            {utilitiesFromIncentives.map((utility, idx) => {
              const utilityUrl = utility.website || getUtilityUrl(utility.name)
              return utilityUrl ? (
                <a
                  key={idx}
                  href={utilityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded-md border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors group"
                >
                  <span className="text-xs font-medium text-blue-800 group-hover:text-blue-900">{utility.name}</span>
                  {utility.programCount && utility.programCount > 0 && (
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1 py-0.5 rounded">
                      {utility.programCount}
                    </span>
                  )}
                  <ExternalLink className="w-2.5 h-2.5 text-blue-400" />
                </a>
              ) : (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded-md border border-blue-200"
                >
                  <span className="text-xs font-medium text-blue-800">{utility.name}</span>
                  {utility.programCount && utility.programCount > 0 && (
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1 py-0.5 rounded">
                      {utility.programCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
