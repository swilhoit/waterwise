"use client"

import React from 'react'
import Link from 'next/link'
import {
  Building2, Home, ExternalLink, MapPin, Droplets
} from 'lucide-react'
import {
  getJurisdictionUrls,
  getUtilityUrl
} from '@/data/jurisdiction-urls'

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
  compact?: boolean
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

  return (
    <div className={`space-y-${compact ? '3' : '4'}`}>
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
