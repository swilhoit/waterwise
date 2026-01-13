"use client"

import React from 'react'
import Link from 'next/link'
import {
  ChevronRight, ExternalLink, CloudRain, DollarSign,
  Check, AlertTriangle, FileText, Gauge, Droplet
} from 'lucide-react'
import LocationContextCard from './LocationContextCard'
import PermitSection from './PermitSection'
import {
  HeroSection,
  HeroBadge,
  CTASection,
  AgencySidebar,
  RelatedLinks,
  IncentivesTable,
  RegulationCard,
  ListSection,
  SidebarCard,
  type IncentiveProgram
} from './shared'

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

  // Build related links for sidebar
  const relatedLinks = [
    { label: 'Greywater Laws', href: `${basePath}/greywater` },
    { label: `All ${locationName} Programs`, href: basePath }
  ]

  // Default approved uses if not provided
  const approvedUses = rainwater?.approvedUses || [
    'Landscape irrigation',
    'Garden watering',
    'Car washing',
    'Toilet flushing',
    'Laundry (non-potable)',
    'Pool/fountain filling'
  ]

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

        {/* Hero Section */}
        <HeroSection
          title={`${locationName} Rainwater Harvesting`}
          subtitle={`Collection laws, permits, and incentives in ${level === 'city' ? `${cityName}, ${stateCode}` : stateName}`}
          theme="cyan"
          icon={CloudRain}
          badges={
            <>
              <HeroBadge className={getLegalStatusColor(rainwater?.legalStatus)}>
                <CloudRain className="h-4 w-4" />
                Rainwater Collection {rainwater?.legalStatus || 'Legal'}
              </HeroBadge>
              {rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0 ? (
                <HeroBadge className="bg-white text-gray-700 border border-gray-200">
                  <Gauge className="h-4 w-4" />
                  Limit: {rainwater.collectionLimitGallons.toLocaleString()} gallons
                </HeroBadge>
              ) : (
                <HeroBadge className="bg-cyan-100 text-cyan-700">
                  <Check className="h-4 w-4" />
                  No Collection Limit
                </HeroBadge>
              )}
            </>
          }
        />

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

        {/* Location Context Card - Local Regulations, Hierarchy, Utilities */}
        <div className="mb-8">
          <LocationContextCard
            level={level}
            stateName={stateName}
            stateCode={stateCode}
            cityName={cityName}
            countyName={countyName}
            incentives={rainwaterIncentives}
            localRegulation={localRegulation}
          />
        </div>

        {/* Permit Section - Rainwater permit requirements */}
        {rainwater && (
          <div className="mb-8">
            <PermitSection
              level={level}
              locationName={level === 'city' ? cityName! : stateName}
              stateCode={stateCode}
              stateName={stateName}
              waterType="rainwater"
              permitData={{
                permitRequired: rainwater.permitRequired,
                collectionLimitGallons: rainwater.collectionLimitGallons,
                potableUseAllowed: rainwater.potableUseAllowed,
                keyRestrictions: rainwater.keyRestrictions,
                permitFramework: rainwater.governingCode
              }}
              stateBaseline={{
                permitFramework: rainwater.governingCode,
                collectionLimitGallons: rainwater.collectionLimitGallons,
                keyRestrictions: rainwater.keyRestrictions
              }}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <RegulationCard
              title="Rainwater Harvesting Overview"
              icon={CloudRain}
              theme="cyan"
              summary={rainwater?.summary}
              infoBoxes={[
                {
                  label: 'Collection Limit',
                  value: rainwater?.collectionLimitGallons && rainwater.collectionLimitGallons > 0
                    ? `${rainwater.collectionLimitGallons.toLocaleString()} gal`
                    : 'Unlimited',
                  highlight: !rainwater?.collectionLimitGallons || rainwater.collectionLimitGallons === 0
                },
                {
                  label: 'Permit Required',
                  value: rainwater?.permitRequired || 'No'
                }
              ]}
            >
              {/* Potable Use Status */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className={`px-4 py-2 rounded-lg ${rainwater?.potableUseAllowed ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-600'}`}>
                  <p className="text-xs uppercase tracking-wide mb-1">Potable Use</p>
                  <p className="font-semibold">{rainwater?.potableUseAllowed ? 'Allowed' : 'Non-potable Only'}</p>
                </div>
              </div>

              {/* Governing Code */}
              {rainwater?.governingCode && (
                <div className="mt-4 pt-4 border-t border-gray-100">
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
            </RegulationCard>

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
                  {approvedUses.slice(0, 6).map((use, idx) => (
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
                  <ListSection
                    title=""
                    items={rainwater.keyRestrictions}
                    variant="number"
                    theme="cyan"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agency Card */}
            <AgencySidebar
              name={agency?.name}
              phone={agency?.phone}
              website={agency?.website}
              theme="cyan"
            />

            {/* Related Links */}
            <RelatedLinks
              title="Related Resources"
              links={relatedLinks}
              theme="cyan"
            />

            {/* Quick Tips */}
            <SidebarCard title="Quick Tips" theme="cyan" className="bg-cyan-50 border-cyan-100">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  Rain barrels are legal in {locationName}
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  Most systems don&apos;t require permits
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  First flush diverters recommended
                </li>
              </ul>
            </SidebarCard>
          </div>
        </div>

        {/* Full-Width Incentives Section */}
        {rainwaterIncentives.length > 0 && (
          <IncentivesTable
            incentives={rainwaterIncentives}
            theme="cyan"
            title="Rainwater Harvesting Rebates & Incentives"
            showJurisdictionLevel={true}
            locationName={locationName || stateName}
          />
        )}

        {/* CTA Section */}
        <CTASection
          title="Start Harvesting Rainwater Today"
          description={`From simple rain barrels to complete cistern systems, we can help you collect and use rainwater in ${locationName}.`}
          primaryButton={{ label: 'View Products', href: '/products' }}
          secondaryButton={{ label: 'Get a Quote', href: '/contact' }}
          theme="cyan"
        />
      </div>
    </div>
  )
}
