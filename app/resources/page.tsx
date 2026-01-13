import { Metadata } from 'next'
import Link from 'next/link'
import { getAllStates } from '@/lib/directory-data'
import { STATE_NAMES } from '@/lib/state-utils'
import { MapPin, Droplets, ChevronRight, Search, DollarSign } from 'lucide-react'
import { LegalStatusBadge } from '@/components/directory/badges'

export const metadata: Metadata = {
  title: 'Water Conservation Directory | Greywater & Rainwater Laws by State',
  description: 'Find greywater laws, rainwater harvesting regulations, and water conservation rebates for all 50 US states. Search by state to find local permits, incentives, and requirements.',
  keywords: 'greywater laws by state, rainwater harvesting laws, water conservation rebates, greywater regulations, rainwater collection laws, state water laws'
}

export const revalidate = 3600

export default async function DirectoryPage() {
  const states = await getAllStates()

  // Group states by region
  const regions: Record<string, string[]> = {
    'West': ['CA', 'OR', 'WA', 'NV', 'AZ', 'NM', 'CO', 'UT', 'HI', 'AK'],
    'Southwest': ['TX', 'OK'],
    'Midwest': ['IL', 'IN', 'IA', 'KS', 'MI', 'MN', 'MO', 'NE', 'ND', 'OH', 'SD', 'WI'],
    'Southeast': ['AL', 'AR', 'FL', 'GA', 'KY', 'LA', 'MS', 'NC', 'SC', 'TN', 'VA', 'WV'],
    'Northeast': ['CT', 'DE', 'ME', 'MD', 'MA', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT', 'DC'],
    'Mountain': ['ID', 'MT', 'WY']
  }

  const statesByRegion = Object.entries(regions).map(([region, codes]) => ({
    region,
    states: states.filter(s => codes.includes(s.stateCode)).sort((a, b) => a.stateName.localeCompare(b.stateName))
  })).filter(r => r.states.length > 0)

  // States not in any region
  const allRegionCodes = Object.values(regions).flat()
  const otherStates = states.filter(s => !allRegionCodes.includes(s.stateCode))
  if (otherStates.length > 0) {
    statesByRegion.push({ region: 'Other', states: otherStates })
  }

  const totalIncentives = states.reduce((sum, s) => sum + s.incentiveCount, 0)

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-sand-500 hover:text-ocean-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-sand-300" />
          <span className="text-sand-900 font-medium">Directory</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-ocean-50 to-sand-50 rounded-2xl border border-ocean-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-sand-900 mb-3">
                Water Conservation Directory
              </h1>
              <p className="text-sand-600 text-lg mb-4">
                Find greywater laws, rainwater harvesting regulations, and water rebates for your state
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm text-sand-600 border border-sand-200">
                  <MapPin className="h-4 w-4 text-ocean-600" />
                  {states.length} States
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm text-sand-600 border border-sand-200">
                  <DollarSign className="h-4 w-4 text-ocean-600" />
                  {totalIncentives}+ Rebate Programs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick search hint */}
        <div className="bg-sand-50 rounded-xl p-4 mb-8 flex items-center gap-3">
          <Search className="h-5 w-5 text-sand-400" />
          <p className="text-sm text-sand-600">
            <strong>Tip:</strong> Use <kbd className="px-1.5 py-0.5 bg-white border border-sand-200 rounded text-xs font-mono">Ctrl+F</kbd> (or <kbd className="px-1.5 py-0.5 bg-white border border-sand-200 rounded text-xs font-mono">Cmd+F</kbd> on Mac) to quickly find your state
          </p>
        </div>

        {/* States by region */}
        <div className="space-y-8">
          {statesByRegion.map(({ region, states: regionStates }) => (
            <div key={region}>
              <h2 className="text-xl font-display font-semibold text-sand-900 mb-4 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-ocean-600" />
                {region}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {regionStates.map((state) => (
                  <Link
                    key={state.stateCode}
                    href={`/${state.stateCode.toLowerCase()}`}
                    className="group bg-white rounded-xl border border-sand-200 p-4 hover:border-ocean-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sand-900 group-hover:text-ocean-700 truncate">
                            {state.stateName}
                          </p>
                          <span className="text-xs text-sand-400">{state.stateCode}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <LegalStatusBadge status={state.legalStatus} />
                          {state.incentiveCount > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-ocean-50 text-ocean-700 rounded-full">
                              <DollarSign className="h-3 w-3" />
                              {state.incentiveCount} rebates
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-sand-300 group-hover:text-ocean-500 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-ocean-900 to-ocean-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Ready to Start Conserving Water?
          </h3>
          <p className="text-ocean-100 mb-6 max-w-2xl mx-auto">
            Our greywater and rainwater systems help you save thousands of gallons per year while potentially qualifying for rebates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="btn-accent"
            >
              Browse Systems
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Get Expert Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
