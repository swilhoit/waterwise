"use client"

import React from 'react'
import Link from 'next/link'
import {
  ChevronRight, ExternalLink, Phone, Building2,
  Droplets, Check, AlertTriangle, Home,
  FileText, Gauge, ArrowRight, AlertCircle
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

interface CityPermitDetails {
  permit_type?: string
  permit_required?: boolean
  permit_required_threshold_gpd?: number
  laundry_to_landscape_allowed?: boolean
  branched_drain_allowed?: boolean
  surge_tank_system_allowed?: boolean
  indoor_reuse_allowed?: boolean
  application_url?: string
  application_method?: string
  required_documents?: string[]
  pre_approval_required?: boolean
  permit_fee_min?: number
  permit_fee_max?: number
  plan_check_fee?: number
  inspection_fee?: number
  fee_notes?: string
  inspections_required?: string[]
  inspection_scheduling_url?: string
  inspection_scheduling_phone?: string
  licensed_plumber_required?: boolean
  licensed_contractor_required?: boolean
  diy_allowed?: boolean
  professional_requirements_notes?: string
  typical_processing_days?: number
  expedited_available?: boolean
  expedited_fee?: number
  department_name?: string
  department_address?: string
  department_phone?: string
  department_email?: string
  department_hours?: string
  department_url?: string
  hoa_approval_note?: string
  special_requirements?: string[]
  exemptions?: string[]
  data_source?: string
  data_verified_date?: string
  data_confidence?: string
  notes?: string
  tips_for_residents?: string
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
  permitDetails?: CityPermitDetails | null
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
  localRegulation,
  permitDetails
}: GreywaterSpokeViewProps) {
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

  // Build related links for sidebar
  const relatedLinks = [
    { label: 'Rainwater Harvesting', href: `${basePath}/rainwater` },
    { label: `All ${locationName} Programs`, href: basePath }
  ]

  // Build quick tips based on data
  const quickTips = [
    greywater?.legalStatus?.toLowerCase().includes('legal')
      ? `Greywater systems are legal in ${locationName}`
      : 'Check local rules before installing',
    greywater?.permitRequired === 'Tiered' || greywater?.permitRequired?.toLowerCase().includes('tier')
      ? "Simple systems often don't need permits"
      : greywater?.permitRequired?.toLowerCase() === 'no'
        ? "Most residential systems don't need permits"
        : 'Contact your building department for permits',
    'Laundry-to-landscape is the easiest system to start with'
  ]

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

        {/* Hero Section */}
        <HeroSection
          title={`${locationName} Greywater Laws`}
          subtitle={`${level === 'city' ? `${cityName}, ${stateCode}` : stateName} regulations and permits`}
          theme="emerald"
          icon={Droplets}
          badges={
            <>
              <HeroBadge className={getLegalStatusColor(greywater?.legalStatus)}>
                <Droplets className="h-4 w-4" />
                Greywater {greywater?.legalStatus || 'Status Varies'}
              </HeroBadge>
              {greywater?.permitRequired && (
                <HeroBadge className="bg-white text-gray-700 border border-gray-200">
                  <FileText className="h-4 w-4" />
                  Permit: {greywater.permitRequired}
                </HeroBadge>
              )}
            </>
          }
        />

        {/* Location Context Card - Local Regulations, Hierarchy, Utilities */}
        <div className="mb-8">
          <LocationContextCard
            level={level}
            stateName={stateName}
            stateCode={stateCode}
            cityName={cityName}
            countyName={countyName}
            incentives={greywaterIncentives}
            localRegulation={localRegulation}
          />
        </div>

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
            {/* Comprehensive Regulations Card */}
            <RegulationCard
              title="Greywater Regulations"
              subtitle={`${stateName} state law + local rules`}
              icon={Droplets}
              theme="emerald"
              infoBoxes={[
                {
                  label: 'Legal Status',
                  value: greywater?.legalStatus || 'Varies by jurisdiction',
                  highlight: greywater?.legalStatus?.toLowerCase().includes('legal')
                },
                {
                  label: 'Permit Required',
                  value: greywater?.permitRequired || 'Varies'
                }
              ]}
              summary={greywater?.summary}
              useBadges={[
                ...(greywater?.outdoorUseAllowed ? [{ label: 'Outdoor Irrigation', allowed: true }] : []),
                ...(greywater?.indoorUseAllowed ? [{ label: 'Indoor Use (Toilet Flushing)', allowed: true }] : []),
                ...(!greywater?.outdoorUseAllowed ? [{ label: 'Outdoor Use (check local rules)', allowed: false }] : [])
              ]}
              governingCode={greywater?.governingCode}
            >
              {/* Governing Code Link */}
              {greywater?.governingCode && stateRegulationUrls[stateCode] && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Governing Code
                  </p>
                  <a
                    href={stateRegulationUrls[stateCode]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 group"
                  >
                    {greywater.governingCode}
                    <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                  </a>
                </div>
              )}

              {/* Approved Uses */}
              {greywater?.approvedUses && greywater.approvedUses.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Approved Uses</p>
                  <div className="flex flex-wrap gap-2">
                    {greywater.approvedUses.slice(0, 4).map((use, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm border border-emerald-200">
                        {use}
                      </span>
                    ))}
                    {greywater.approvedUses.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{greywater.approvedUses.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Key Restrictions */}
              {greywater?.keyRestrictions && greywater.keyRestrictions.length > 0 && (
                <ListSection
                  title="Key Restrictions"
                  icon={AlertTriangle}
                  items={greywater.keyRestrictions}
                  variant="bullet"
                  theme="emerald"
                  className="pt-4 mt-4 border-t border-gray-100"
                />
              )}

              {/* Permit Threshold Info */}
              {greywater?.permitThresholdGpd && greywater.permitThresholdGpd > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <Gauge className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      Systems under <strong className="text-gray-900">{greywater.permitThresholdGpd} GPD</strong> may not require a permit
                    </span>
                  </div>
                </div>
              )}
            </RegulationCard>

            {/* Permit Section - Uses reusable PermitSection component */}
            {(permitDetails || greywater) && (
              <PermitSection
                level={level}
                locationName={level === 'city' ? cityName! : stateName}
                stateCode={stateCode}
                stateName={stateName}
                waterType="greywater"
                permitData={permitDetails ? {
                  permitType: permitDetails.permit_type,
                  permitRequired: permitDetails.permit_required,
                  thresholdGpd: permitDetails.permit_required_threshold_gpd || greywater?.permitThresholdGpd || undefined,
                  applicationUrl: permitDetails.application_url,
                  applicationMethod: permitDetails.application_method,
                  requiredDocuments: permitDetails.required_documents,
                  typicalFees: permitDetails.fee_notes,
                  feeMin: permitDetails.permit_fee_min ?? undefined,
                  feeMax: permitDetails.permit_fee_max ?? undefined,
                  processingDays: permitDetails.typical_processing_days,
                  laundryToLandscapeAllowed: permitDetails.laundry_to_landscape_allowed,
                  branchedDrainAllowed: permitDetails.branched_drain_allowed,
                  surgeTankAllowed: permitDetails.surge_tank_system_allowed,
                  indoorReuseAllowed: permitDetails.indoor_reuse_allowed,
                  diyAllowed: permitDetails.diy_allowed,
                  licensedPlumberRequired: permitDetails.licensed_plumber_required,
                  licensedContractorRequired: permitDetails.licensed_contractor_required,
                  inspectionsRequired: permitDetails.inspections_required,
                  departmentName: permitDetails.department_name,
                  departmentPhone: permitDetails.department_phone,
                  departmentAddress: permitDetails.department_address,
                  departmentHours: permitDetails.department_hours,
                  departmentUrl: permitDetails.department_url,
                  exemptions: permitDetails.exemptions,
                  specialRequirements: permitDetails.special_requirements,
                  tips: permitDetails.tips_for_residents,
                  notes: permitDetails.notes
                } : null}
                stateBaseline={greywater ? {
                  thresholdGpd: greywater.permitThresholdGpd || undefined,
                  permitFramework: greywater.governingCode,
                  exemptions: greywater.permitRequired === 'Tiered' ? ['Simple laundry-to-landscape systems under GPD threshold'] : undefined
                } : undefined}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agency Card */}
            <AgencySidebar
              name={agency?.name}
              phone={agency?.phone}
              website={agency?.website}
              theme="emerald"
            />

            {/* Related Links */}
            <RelatedLinks
              title="Related Resources"
              links={relatedLinks}
              theme="emerald"
            />

            {/* Quick Tips */}
            <SidebarCard title="Quick Tips" theme="emerald">
              <div className="space-y-3">
                {quickTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{tip}</span>
                  </div>
                ))}
              </div>
            </SidebarCard>
          </div>
        </div>

        {/* Full-Width Incentives Section */}
        {greywaterIncentives.length > 0 && (
          <IncentivesTable
            incentives={greywaterIncentives}
            theme="emerald"
            title="Greywater Rebates & Incentives"
            showJurisdictionLevel={true}
            locationName={locationName || stateName}
            stateName={stateName}
            countyName={countyName}
            cityName={cityName}
          />
        )}

        {/* CTA Section */}
        <CTASection
          title="Ready to Install a Greywater System?"
          description={`Our greywater recycling systems are designed to meet ${locationName} regulations and help you save water.`}
          primaryButton={{ label: 'View Greywater Systems', href: '/products' }}
          theme="emerald"
        />
      </div>
    </div>
  )
}
