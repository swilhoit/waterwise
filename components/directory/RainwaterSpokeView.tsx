"use client"

import Link from 'next/link'
import {
  ChevronRight, ExternalLink, Phone, Building2,
  CloudRain, DollarSign, Check, AlertTriangle,
  FileText, Gauge, ArrowRight, Droplet, MapPin
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
  incentive_amount_min?: number
  incentive_amount_max?: number
  incentive_url?: string
  program_description?: string
  water_utility?: string
}

interface LocalRegulation {
  regulationSummary?: string
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
  const locationName = level === 'city' ? cityName : stateName
  const basePath = level === 'city'
    ? `/${stateCode.toLowerCase()}/${cityName?.toLowerCase().replace(/\s+/g, '-')}`
    : `/${stateCode.toLowerCase()}`

  // Filter rainwater-specific incentives
  const rainwaterIncentives = incentives.filter(i =>
    i.resource_type === 'rainwater'
  )

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
            {rainwaterIncentives.length > 0 && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-full font-medium">
                <DollarSign className="h-4 w-4" />
                {rainwaterIncentives.length} Rebate{rainwaterIncentives.length !== 1 ? 's' : ''} Available
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
                    <p className="text-gray-900">{rainwater.governingCode}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Common Uses */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-cyan-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Check className="h-5 w-5 text-cyan-600" />
                  Common Rainwater Uses
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
                    Requirements & Restrictions
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
            {/* Rebates Card */}
            {rainwaterIncentives.length > 0 && (
              <div className="bg-white rounded-2xl border border-cyan-200 overflow-hidden">
                <div className="bg-cyan-50 px-5 py-4 border-b border-cyan-100">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-cyan-600" />
                    Rainwater Rebates
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {rainwaterIncentives.slice(0, 3).map((incentive, idx) => (
                    <div key={idx} className="p-4">
                      <p className="font-medium text-gray-900 text-sm">{incentive.program_name}</p>
                      {incentive.incentive_amount_max && (
                        <p className="text-lg font-bold text-cyan-600 mt-1">
                          Up to ${incentive.incentive_amount_max.toLocaleString()}
                        </p>
                      )}
                      {incentive.incentive_url && (
                        <a
                          href={incentive.incentive_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 mt-2"
                        >
                          Apply Now <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                {rainwaterIncentives.length > 3 && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <Link
                      href={basePath}
                      className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                    >
                      View all {rainwaterIncentives.length} rebates
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
