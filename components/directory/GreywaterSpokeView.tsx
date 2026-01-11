"use client"

import Link from 'next/link'
import {
  ChevronRight, ExternalLink, Phone, Building2,
  Droplets, DollarSign, Check, X, AlertTriangle,
  FileText, Gauge, MapPin, ArrowRight
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
  incentive_amount_min?: number
  incentive_amount_max?: number
  incentive_url?: string
  program_description?: string
  water_utility?: string
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
}

export default function GreywaterSpokeView({
  level,
  stateName,
  stateCode,
  cityName,
  countyName,
  greywater,
  agency,
  incentives
}: GreywaterSpokeViewProps) {
  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  // Filter greywater-specific incentives
  const greywaterIncentives = incentives.filter(i =>
    i.resource_type === 'greywater' || !i.resource_type
  )

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
            {/* Rebates Card */}
            {greywaterIncentives.length > 0 && (
              <div className="bg-white rounded-2xl border border-emerald-200 overflow-hidden">
                <div className="bg-emerald-50 px-5 py-4 border-b border-emerald-100">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    Greywater Rebates
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {greywaterIncentives.slice(0, 3).map((incentive, idx) => (
                    <div key={idx} className="p-4">
                      <p className="font-medium text-gray-900 text-sm">{incentive.program_name}</p>
                      {incentive.incentive_amount_max && (
                        <p className="text-lg font-bold text-emerald-600 mt-1">
                          Up to ${incentive.incentive_amount_max.toLocaleString()}
                        </p>
                      )}
                      {incentive.incentive_url && (
                        <a
                          href={incentive.incentive_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 mt-2"
                        >
                          Apply Now <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                {greywaterIncentives.length > 3 && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <Link
                      href={basePath}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      View all {greywaterIncentives.length} rebates
                    </Link>
                  </div>
                )}
              </div>
            )}

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
