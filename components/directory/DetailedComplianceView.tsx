"use client"

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Building,
  Home,
  Droplets,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  User,
  Info,
  Check,
  X,
  AlertTriangle,
  ExternalLink,
  MapPin,
  Scale,
  Layers,
  Banknote,
  ClipboardList,
  Sparkles
} from 'lucide-react'
import CollapsibleSection, { InlineCollapsible } from './CollapsibleSection'
import EffectivePolicyView from './EffectivePolicyView'

interface HierarchyItem {
  state_jurisdiction_id?: string
  state_name?: string
  state_code?: string
  county_jurisdiction_id?: string
  county_name?: string
  city_jurisdiction_id?: string
  city_name?: string
  population?: number
  has_greywater_policy?: boolean | number
  has_incentives?: boolean | number
  permit_types?: string
  permit_fee?: number
  max_rebate_amount?: number
  regulation_summary?: string
  county_count?: number
  city_count?: number
}

interface RegulationDetail {
  allowed_sources?: string
  prohibited_sources?: string
  treatment_requirements?: string
  system_size_limits?: string
  setback_requirements?: string
  inspection_required?: boolean
}

interface ProgramTier {
  tier_name: string
  tier_number: number
  min_amount: number
  max_amount: number
  requirements?: string
  typical_applicants?: string
  processing_time?: string
  user_types?: string[]
}

interface IncentiveProgram {
  program_name?: string
  incentive_type?: string
  incentive_amount_min?: number
  incentive_amount_max?: number
  rebate_percentage?: number
  eligibility_requirements?: string
  incentive_url?: string
  program_status?: string
  funding_available?: boolean
  program_description?: string
  application_deadline?: string
  max_funding_per_application?: number
  residential_eligibility?: boolean
  commercial_eligibility?: boolean
  installation_requirements?: string
  documentation_required?: string
  incentive_processing_time?: number
  tiers?: ProgramTier[]
  program_contact_email?: string
  program_contact_phone?: string
  water_types?: string
}

interface GreywaterLaws {
  legal_status?: string
  governing_code?: string
  permit_threshold_gpd?: number
  permit_required?: string
  indoor_use_allowed?: boolean
  outdoor_use_allowed?: boolean
  approved_uses?: string[]
  key_restrictions?: string[]
  recent_changes?: string
  primary_agency?: string
  agency_contact?: string
  agency_phone?: string
  government_website?: string
  regulatory_classification?: string
}

interface ComplianceData {
  compliance_level?: string
  state_code?: string
  state_name?: string
  county_name?: string
  city_name?: string
  jurisdiction_id?: string
  greywater_allowed?: boolean
  permit_required?: boolean
  permit_type?: string
  permit_fee?: number
  annual_fee?: number
  regulation_summary?: string
  allowed_sources?: string
  prohibited_sources?: string
  treatment_requirements?: string
  system_size_limits?: string
  setback_requirements?: string
  inspection_required?: boolean
  documentation_url?: string
  incentives?: IncentiveProgram[]
  permits_details?: any[]
  max_incentive?: number
  incentive_count?: number
  permit_count?: number
  regulations?: RegulationDetail
  laws?: GreywaterLaws | null
}

interface DetailedComplianceViewProps {
  selectedState?: HierarchyItem | null
  selectedCounty?: HierarchyItem | null
  selectedCity?: HierarchyItem | null
  complianceData?: {
    state?: ComplianceData | null
    county?: ComplianceData | null
    city?: ComplianceData | null
    effective?: ComplianceData | null
  }
  sectorView?: 'residential' | 'commercial'
}

export default function DetailedComplianceView({
  selectedState,
  selectedCounty,
  selectedCity,
  complianceData,
  sectorView = 'residential'
}: DetailedComplianceViewProps) {
  const [userType, setUserType] = useState<string>('homeowner')

  // Compute stats for quick overview
  const stats = useMemo(() => {
    const allPrograms = [
      ...(complianceData?.state?.incentives || []),
      ...(complianceData?.county?.incentives || []),
      ...(complianceData?.city?.incentives || [])
    ]

    const sectorPrograms = allPrograms.filter(p =>
      sectorView === 'residential'
        ? p.residential_eligibility !== false
        : p.commercial_eligibility === true
    )

    const maxIncentive = Math.max(...sectorPrograms.map(p => p.incentive_amount_max || 0), 0)
    const totalPotential = sectorPrograms.reduce((sum, p) => sum + (p.incentive_amount_max || 0), 0)

    return {
      programCount: sectorPrograms.length,
      maxIncentive,
      totalPotential,
      hasLaws: !!complianceData?.state?.laws,
      hasRegulations: !!(complianceData?.effective?.regulations?.allowed_sources ||
                        complianceData?.effective?.regulations?.treatment_requirements),
      hasCityPolicy: selectedCity?.has_greywater_policy === 1,
      hasCountyPolicy: selectedCounty?.has_greywater_policy === 1
    }
  }, [complianceData, sectorView, selectedCity, selectedCounty])

  const userTypeOptions = sectorView === 'residential'
    ? [
        { value: 'homeowner', label: 'Homeowner' },
        { value: 'small_farm', label: 'Small Farm' },
        { value: 'nonprofit', label: 'Nonprofit' }
      ]
    : [
        { value: 'business', label: 'Business' },
        { value: 'agricultural', label: 'Agricultural' },
        { value: 'affordable_housing', label: 'Affordable Housing' },
        { value: 'industrial', label: 'Industrial' }
      ]

  if (selectedCity) {
    return (
      <div className="mb-8 space-y-4">
        {/* Hero Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <span>{selectedCounty?.county_name} County, {selectedState?.state_name}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {selectedCity.city_name}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-teal-50 text-teal-700 border border-teal-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Greywater Allowed
            </Badge>
            {stats.hasCityPolicy && (
              <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
                City Ordinance
              </Badge>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <QuickStat label="Incentive Programs" value={stats.programCount} />
            <QuickStat label="Max Single Rebate" value={stats.maxIncentive > 0 ? `$${stats.maxIncentive.toLocaleString()}` : '-'} />
            <QuickStat label="Total Potential" value={stats.totalPotential > 0 ? `$${stats.totalPotential.toLocaleString()}` : '-'} />
            <QuickStat label="Policy Source" value={stats.hasCityPolicy ? 'City' : stats.hasCountyPolicy ? 'County' : 'State'} />
          </div>
        </div>

        {/* User Type Selector */}
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 bg-slate-100 rounded-lg">
              <User className="h-4 w-4 text-slate-600" />
            </div>
            <span className="text-slate-700 font-medium">Viewing as:</span>
          </div>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 bg-white font-medium text-gray-700"
          >
            {userTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Effective Policy - Always visible */}
        <EffectivePolicyView
          complianceData={complianceData}
          jurisdictionName={selectedCity.city_name || ''}
        />

        {/* Policy Hierarchy */}
        <CollapsibleSection
          title="Policy Hierarchy"
          icon={Layers}
          accentColor="slate"
          summary={`${selectedState?.state_name} → ${selectedCounty?.county_name} County → ${selectedCity.city_name}`}
          defaultOpen={false}
        >
          <div className="space-y-3 pt-4">
            <PolicyLevelCard
              level="State"
              name={selectedState?.state_name || ''}
              hasPolicy={!!selectedState?.has_greywater_policy}
              programCount={complianceData?.state?.incentive_count}
              summary={selectedState?.regulation_summary}
            />
            <PolicyLevelCard
              level="County"
              name={`${selectedCounty?.county_name} County` || ''}
              hasPolicy={selectedCounty?.has_greywater_policy === 1}
              programCount={complianceData?.county?.incentive_count}
              summary={selectedCounty?.regulation_summary}
            />
            <PolicyLevelCard
              level="City"
              name={selectedCity.city_name || ''}
              hasPolicy={selectedCity.has_greywater_policy === 1}
              programCount={complianceData?.city?.incentive_count}
              summary={selectedCity.regulation_summary}
            />
          </div>
        </CollapsibleSection>

        {/* Greywater Laws */}
        {stats.hasLaws && complianceData?.state?.laws && (
          <CollapsibleSection
            title="State Greywater Laws"
            icon={FileText}
            accentColor="slate"
            badge={
              <Badge className={getLegalStatusBadgeClass(complianceData.state.laws.legal_status)}>
                {complianceData.state.laws.legal_status}
              </Badge>
            }
            summary={complianceData.state.laws.governing_code}
            defaultOpen={false}
          >
            <GreywaterLawsContent laws={complianceData.state.laws} />
          </CollapsibleSection>
        )}

        {/* Requirements */}
        {stats.hasRegulations && (
          <CollapsibleSection
            title={`${sectorView === 'residential' ? 'Residential' : 'Commercial'} Requirements`}
            icon={sectorView === 'residential' ? Home : Building}
            accentColor="slate"
            summary="Allowed sources, treatment, setbacks & more"
            defaultOpen={false}
          >
            <RequirementsContent
              regulations={complianceData?.effective?.regulations}
              sectorView={sectorView}
            />
          </CollapsibleSection>
        )}

        {/* Incentive Programs - Primary section, always open */}
        {stats.programCount > 0 && (
          <CollapsibleSection
            title="Incentive Programs"
            icon={DollarSign}
            accentColor="slate"
            badge={
              <Badge className="bg-teal-50 text-teal-700 border-teal-200">
                {stats.programCount} Available
              </Badge>
            }
            summary={`Up to $${stats.maxIncentive.toLocaleString()} per program`}
            defaultOpen={true}
          >
            <IncentiveProgramsContent
              complianceData={complianceData}
              sectorView={sectorView}
              stats={stats}
            />
          </CollapsibleSection>
        )}

        {/* Permit Requirements */}
        <CollapsibleSection
          title="Permit Requirements"
          icon={ClipboardList}
          accentColor="slate"
          summary="Simple, Standard & Complex system permits"
          defaultOpen={false}
        >
          <PermitRequirementsContent permitFee={selectedCity?.permit_fee} />
        </CollapsibleSection>
      </div>
    )
  }

  // County-level view
  if (selectedCounty) {
    return <CountyLevelView
      selectedState={selectedState}
      selectedCounty={selectedCounty}
      complianceData={complianceData}
      sectorView={sectorView}
    />
  }

  // State-level view
  if (selectedState) {
    return <StateLevelView
      selectedState={selectedState}
      complianceData={complianceData}
      sectorView={sectorView}
    />
  }

  return null
}

// Quick stat component for hero section
function QuickStat({
  label,
  value
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="text-center">
      <p className="font-bold text-xl text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

// Policy level card for hierarchy
function PolicyLevelCard({
  level,
  name,
  hasPolicy,
  programCount,
  summary
}: {
  level: string
  name: string
  hasPolicy: boolean
  programCount?: number
  summary?: string
}) {
  return (
    <div className="border-l-4 border-l-gray-300 bg-gray-50/50 rounded-r-xl p-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{level}</span>
          <p className="font-semibold text-gray-800">{name}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {hasPolicy ? (
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-xs">
              Active Policy
            </Badge>
          ) : (
            <Badge variant="outline" className="text-gray-500 border-gray-300 text-xs">
              Follows {level === 'City' ? 'County/State' : 'State'}
            </Badge>
          )}
          {programCount && programCount > 0 && (
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-xs">
              {programCount} Programs
            </Badge>
          )}
        </div>
      </div>
      {summary && (
        <p className="text-sm text-gray-600 mt-2">{summary}</p>
      )}
    </div>
  )
}

// Greywater laws content
function GreywaterLawsContent({ laws }: { laws: GreywaterLaws }) {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Permit Required</h4>
          <p className="text-sm text-slate-600">{laws.permit_required || 'Varies by system'}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Use Permissions</h4>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              Indoor: {laws.indoor_use_allowed ? <Check className="h-4 w-4 text-gray-600" /> : <X className="h-4 w-4 text-gray-400" />}
            </span>
            <span className="flex items-center gap-1.5">
              Outdoor: {laws.outdoor_use_allowed ? <Check className="h-4 w-4 text-gray-600" /> : <X className="h-4 w-4 text-gray-400" />}
            </span>
          </div>
        </div>
      </div>

      {laws.approved_uses && laws.approved_uses.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Check className="h-4 w-4 text-gray-500" />
            Approved Uses
          </h4>
          <ul className="text-sm text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {laws.approved_uses.map((use, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                {use}
              </li>
            ))}
          </ul>
        </div>
      )}

      {laws.key_restrictions && laws.key_restrictions.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-gray-500" />
            Key Restrictions
          </h4>
          <ul className="text-sm text-gray-600 space-y-1.5">
            {laws.key_restrictions.map((restriction, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                {restriction}
              </li>
            ))}
          </ul>
        </div>
      )}

      {laws.governing_code && (
        <div className="bg-slate-100 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-1">Governing Code</h4>
          <p className="text-sm text-slate-600">{laws.governing_code}</p>
        </div>
      )}

      {laws.recent_changes && (
        <div className="border-l-2 border-gray-300 pl-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-gray-400" />
            Recent Changes
          </h4>
          <p className="text-sm text-gray-600">{laws.recent_changes}</p>
        </div>
      )}

      {laws.government_website && (
        <a
          href={laws.government_website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium"
        >
          <ExternalLink className="h-4 w-4" />
          Visit Official Website
        </a>
      )}
    </div>
  )
}

// Requirements content
function RequirementsContent({
  regulations,
  sectorView
}: {
  regulations?: RegulationDetail
  sectorView: 'residential' | 'commercial'
}) {
  if (!regulations) {
    return (
      <p className="text-sm text-slate-500 pt-4">
        Detailed requirements vary by jurisdiction. Contact local authorities for specifics.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
      <RegulationCard title="Allowed Sources" content={regulations.allowed_sources} icon={Check} color="emerald" />
      <RegulationCard title="Prohibited Sources" content={regulations.prohibited_sources} icon={X} color="red" />
      <RegulationCard title="Treatment Requirements" content={regulations.treatment_requirements} icon={Droplets} color="slate" />
      <RegulationCard title="System Size Limits" content={regulations.system_size_limits} icon={Scale} color="slate" />
      <RegulationCard title="Setback Requirements" content={regulations.setback_requirements} icon={MapPin} color="slate" />
      <RegulationCard
        title="Inspection Required"
        content={regulations.inspection_required ? 'Yes' : 'Varies by system size'}
        icon={ClipboardList}
        color="amber"
      />
    </div>
  )
}

// Regulation card component
function RegulationCard({
  title,
  content,
  icon: Icon,
  color
}: {
  title: string
  content?: string | null
  icon: any
  color: 'emerald' | 'red' | 'slate' | 'amber'
}) {
  if (!content) return null

  const colorClasses = {
    emerald: 'bg-gray-50 border-gray-200 text-gray-700',
    red: 'bg-gray-50 border-gray-200 text-gray-700',
    slate: 'bg-gray-50 border-gray-200 text-gray-700',
    amber: 'bg-gray-50 border-gray-200 text-gray-700'
  }

  const items = content.split(/;|,|\|/).map(item => item.trim()).filter(Boolean)

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200">
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold mb-2 ${colorClasses[color]}`}>
        <Icon className="h-3 w-3" />
        {title}
      </div>
      {items.length === 1 ? (
        <p className="text-sm text-slate-600">{items[0]}</p>
      ) : (
        <ul className="text-sm text-slate-600 space-y-1">
          {items.slice(0, 3).map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">•</span>
              {item}
            </li>
          ))}
          {items.length > 3 && (
            <InlineCollapsible label={`${items.length - 3} more`}>
              <ul className="space-y-1">
                {items.slice(3).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </InlineCollapsible>
          )}
        </ul>
      )}
    </div>
  )
}

// Incentive programs content
function IncentiveProgramsContent({
  complianceData,
  sectorView,
  stats
}: {
  complianceData: any
  sectorView: 'residential' | 'commercial'
  stats: { programCount: number; maxIncentive: number; totalPotential: number }
}) {
  const filterBySector = (programs: IncentiveProgram[] | undefined) => {
    if (!programs) return []
    return programs.filter(p =>
      sectorView === 'residential'
        ? p.residential_eligibility !== false
        : p.commercial_eligibility === true
    )
  }

  const statePrograms = filterBySector(complianceData?.state?.incentives)
  const countyPrograms = filterBySector(complianceData?.county?.incentives)
  const cityPrograms = filterBySector(complianceData?.city?.incentives)

  return (
    <div className="space-y-4 pt-4">
      {statePrograms.length > 0 && (
        <IncentiveLevelSection level="State" programs={statePrograms} />
      )}
      {countyPrograms.length > 0 && (
        <IncentiveLevelSection level="County" programs={countyPrograms} />
      )}
      {cityPrograms.length > 0 && (
        <IncentiveLevelSection level="City" programs={cityPrograms} />
      )}

      {/* Summary Card */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats.programCount}</p>
            <p className="text-xs text-gray-500">Programs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-700">${stats.maxIncentive.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Max Single</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-700">${stats.totalPotential.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Combined Total</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Programs may not be combinable. Check eligibility requirements.
        </p>
      </div>
    </div>
  )
}

// Incentive level section
function IncentiveLevelSection({
  level,
  programs
}: {
  level: string
  programs: IncentiveProgram[]
}) {
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          {level} Programs ({programs.length})
        </Badge>
      </h4>
      <div className="space-y-2">
        {programs.map((program, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors border-l-4 border-l-teal-400">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">{program.program_name || `${level} Program`}</p>
                {program.program_description && (
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{program.program_description}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-700 text-lg">
                  {renderIncentiveAmount(program)}
                </p>
                {program.incentive_url && (
                  <a
                    href={program.incentive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium mt-1"
                  >
                    Apply <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Permit requirements content
function PermitRequirementsContent({ permitFee }: { permitFee?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Check className="h-4 w-4 text-gray-600" />
          </div>
          <h4 className="font-semibold text-gray-800">Simple Systems</h4>
        </div>
        <div className="space-y-1.5 text-sm text-gray-700">
          <p><span className="font-medium">Permit:</span> Usually not required</p>
          <p><span className="font-medium">Limit:</span> Under 250 gal/day</p>
          <p><span className="font-medium">Example:</span> Laundry-to-landscape</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FileText className="h-4 w-4 text-gray-600" />
          </div>
          <h4 className="font-semibold text-gray-800">Standard Systems</h4>
        </div>
        <div className="space-y-1.5 text-sm text-gray-700">
          <p><span className="font-medium">Permit:</span> Required</p>
          <p><span className="font-medium">Fee:</span> ${permitFee || '150-500'}</p>
          <p><span className="font-medium">Time:</span> 2-4 weeks</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <ClipboardList className="h-4 w-4 text-gray-600" />
          </div>
          <h4 className="font-semibold text-gray-800">Complex Systems</h4>
        </div>
        <div className="space-y-1.5 text-sm text-gray-700">
          <p><span className="font-medium">Permit:</span> Required + Plans</p>
          <p><span className="font-medium">Fee:</span> $500-2000+</p>
          <p><span className="font-medium">Time:</span> 4-8 weeks</p>
        </div>
      </div>
    </div>
  )
}

// County level view
function CountyLevelView({
  selectedState,
  selectedCounty,
  complianceData,
  sectorView
}: {
  selectedState?: HierarchyItem | null
  selectedCounty: HierarchyItem
  complianceData: any
  sectorView: 'residential' | 'commercial'
}) {
  return (
    <div className="mb-8 space-y-4">
      {/* Hero Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8">
        <div className="text-gray-500 text-sm mb-2">
          {selectedState?.state_name}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {selectedCounty.county_name} County
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-teal-50 text-teal-700 border border-teal-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Greywater Allowed
          </Badge>
          {selectedCounty.city_count && (
            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
              {selectedCounty.city_count} Cities
            </Badge>
          )}
        </div>
      </div>

      {/* Policy Framework */}
      <CollapsibleSection
        title="Policy Framework"
        icon={Layers}
        accentColor="slate"
        defaultOpen={true}
      >
        <div className="space-y-3 pt-4">
          <PolicyLevelCard
            level="State"
            name={selectedState?.state_name || ''}
            hasPolicy={!!selectedState?.has_greywater_policy}
            programCount={complianceData?.state?.incentive_count}
            summary={selectedState?.regulation_summary}
          />
          <PolicyLevelCard
            level="County"
            name={`${selectedCounty.county_name} County` || ''}
            hasPolicy={selectedCounty.has_greywater_policy === 1}
            programCount={complianceData?.county?.incentive_count}
            summary={selectedCounty.regulation_summary}
          />
        </div>
      </CollapsibleSection>

      {/* Compliance by Sector */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-2">Residential</h3>
          <p className="text-sm text-gray-600">
            {selectedCounty.has_greywater_policy === 1
              ? 'County-specific residential requirements apply'
              : 'Follows state residential guidelines'}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-2">Commercial</h3>
          <p className="text-sm text-gray-600">
            Commercial systems require county review and approval
          </p>
        </div>
      </div>
    </div>
  )
}

// State level view
function StateLevelView({
  selectedState,
  complianceData,
  sectorView
}: {
  selectedState: HierarchyItem
  complianceData: any
  sectorView: 'residential' | 'commercial'
}) {
  return (
    <div className="mb-8 space-y-4">
      {/* Hero Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {selectedState.state_name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {selectedState.has_greywater_policy ? (
            <Badge className="bg-teal-50 text-teal-700 border border-teal-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              State Policy Active
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
              No State Framework
            </Badge>
          )}
          {selectedState.county_count && (
            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
              {selectedState.county_count} Counties
            </Badge>
          )}
          {selectedState.city_count && (
            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
              {selectedState.city_count} Cities
            </Badge>
          )}
        </div>
      </div>

      {/* State Policy Framework */}
      <CollapsibleSection
        title="State Policy Framework"
        icon={Scale}
        accentColor="slate"
        defaultOpen={true}
      >
        <div className="pt-4">
          <PolicyLevelCard
            level="State"
            name={selectedState.state_name || ''}
            hasPolicy={!!selectedState.has_greywater_policy}
            programCount={complianceData?.state?.incentive_count}
            summary={selectedState.regulation_summary}
          />
          <p className="text-xs text-gray-500 mt-4">
            Local jurisdictions may have additional or more restrictive requirements
          </p>
        </div>
      </CollapsibleSection>

      {/* Compliance by Sector */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-2">Residential Framework</h3>
          <p className="text-sm text-gray-600">
            {selectedState.has_greywater_policy
              ? 'Statewide standards for residential greywater systems'
              : 'No statewide standards - varies by local jurisdiction'}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-2">Commercial Framework</h3>
          <p className="text-sm text-gray-600">
            Large commercial systems may require state-level review
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getLegalStatusBadgeClass(status?: string) {
  // Using teal accent for status badges
  return 'bg-teal-50 text-teal-700 border-teal-200'
}

function renderIncentiveAmount(program: IncentiveProgram) {
  if (program.incentive_amount_min && program.incentive_amount_max) {
    return `$${program.incentive_amount_min.toLocaleString()} - $${program.incentive_amount_max.toLocaleString()}`
  } else if (program.incentive_amount_max) {
    return `Up to $${program.incentive_amount_max.toLocaleString()}`
  } else if (program.rebate_percentage) {
    return `${program.rebate_percentage}% rebate`
  }
  return 'Varies'
}
