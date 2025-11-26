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
        {/* Hero Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 rounded-2xl p-5 sm:p-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          <div className="relative">
            <div className="flex items-center gap-2 text-teal-200 text-sm mb-2">
              <MapPin className="h-4 w-4" />
              <span>{selectedCounty?.county_name} County, {selectedState?.state_name}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {selectedCity.city_name}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 backdrop-blur-sm">
                <CheckCircle className="h-3 w-3 mr-1" />
                Greywater Allowed
              </Badge>
              {stats.hasCityPolicy && (
                <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                  City Ordinance
                </Badge>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              <QuickStat
                label="Incentive Programs"
                value={stats.programCount}
                icon={Banknote}
              />
              <QuickStat
                label="Max Single Rebate"
                value={stats.maxIncentive > 0 ? `$${stats.maxIncentive.toLocaleString()}` : '-'}
                icon={DollarSign}
              />
              <QuickStat
                label="Total Potential"
                value={stats.totalPotential > 0 ? `$${stats.totalPotential.toLocaleString()}` : '-'}
                icon={Sparkles}
              />
              <QuickStat
                label="Policy Source"
                value={stats.hasCityPolicy ? 'City' : stats.hasCountyPolicy ? 'County' : 'State'}
                icon={Scale}
              />
            </div>
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
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white font-medium text-slate-700"
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
          accentColor="blue"
          summary={`${selectedState?.state_name} → ${selectedCounty?.county_name} → ${selectedCity.city_name}`}
          defaultOpen={false}
        >
          <div className="space-y-3 pt-4">
            <PolicyLevelCard
              level="State"
              name={selectedState?.state_name || ''}
              color="blue"
              hasPolicy={!!selectedState?.has_greywater_policy}
              programCount={complianceData?.state?.incentive_count}
              summary={selectedState?.regulation_summary}
            />
            <PolicyLevelCard
              level="County"
              name={selectedCounty?.county_name || ''}
              color="purple"
              hasPolicy={selectedCounty?.has_greywater_policy === 1}
              programCount={complianceData?.county?.incentive_count}
              summary={selectedCounty?.regulation_summary}
            />
            <PolicyLevelCard
              level="City"
              name={selectedCity.city_name || ''}
              color="teal"
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
            accentColor={sectorView === 'residential' ? 'teal' : 'purple'}
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
            accentColor="emerald"
            badge={
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
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
          accentColor="amber"
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
  value,
  icon: Icon
}: {
  label: string
  value: string | number
  icon: any
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1.5 text-white mb-0.5">
        <Icon className="h-4 w-4 text-teal-200" />
        <span className="font-bold text-xl">{value}</span>
      </div>
      <p className="text-xs text-teal-200">{label}</p>
    </div>
  )
}

// Policy level card for hierarchy
function PolicyLevelCard({
  level,
  name,
  color,
  hasPolicy,
  programCount,
  summary
}: {
  level: string
  name: string
  color: 'blue' | 'purple' | 'teal'
  hasPolicy: boolean
  programCount?: number
  summary?: string
}) {
  const colorClasses = {
    blue: 'border-l-blue-500 bg-blue-50/50',
    purple: 'border-l-purple-500 bg-purple-50/50',
    teal: 'border-l-teal-500 bg-teal-50/50'
  }

  return (
    <div className={`border-l-4 ${colorClasses[color]} rounded-r-xl p-4`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{level}</span>
          <p className="font-semibold text-slate-800">{name}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {hasPolicy ? (
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
              Active Policy
            </Badge>
          ) : (
            <Badge variant="outline" className="text-slate-500 border-slate-300 text-xs">
              Follows {level === 'City' ? 'County/State' : 'State'}
            </Badge>
          )}
          {programCount && programCount > 0 && (
            <Badge className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
              {programCount} Programs
            </Badge>
          )}
        </div>
      </div>
      {summary && (
        <p className="text-sm text-slate-600 mt-2">{summary}</p>
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
              Indoor: {laws.indoor_use_allowed ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-red-500" />}
            </span>
            <span className="flex items-center gap-1.5">
              Outdoor: {laws.outdoor_use_allowed ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-red-500" />}
            </span>
          </div>
        </div>
      </div>

      {laws.approved_uses && laws.approved_uses.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500" />
            Approved Uses
          </h4>
          <ul className="text-sm text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {laws.approved_uses.map((use, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                {use}
              </li>
            ))}
          </ul>
        </div>
      )}

      {laws.key_restrictions && laws.key_restrictions.length > 0 && (
        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200">
          <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Key Restrictions
          </h4>
          <ul className="text-sm text-amber-900 space-y-1.5">
            {laws.key_restrictions.map((restriction, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
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
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            Recent Changes
          </h4>
          <p className="text-sm text-blue-700">{laws.recent_changes}</p>
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
      <RegulationCard title="Treatment Requirements" content={regulations.treatment_requirements} icon={Droplets} color="blue" />
      <RegulationCard title="System Size Limits" content={regulations.system_size_limits} icon={Scale} color="slate" />
      <RegulationCard title="Setback Requirements" content={regulations.setback_requirements} icon={MapPin} color="purple" />
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
  color: 'emerald' | 'red' | 'blue' | 'slate' | 'purple' | 'amber'
}) {
  if (!content) return null

  const colorClasses = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    slate: 'bg-slate-50 border-slate-200 text-slate-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700'
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
        <IncentiveLevelSection level="State" programs={statePrograms} color="blue" />
      )}
      {countyPrograms.length > 0 && (
        <IncentiveLevelSection level="County" programs={countyPrograms} color="purple" />
      )}
      {cityPrograms.length > 0 && (
        <IncentiveLevelSection level="City" programs={cityPrograms} color="teal" />
      )}

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
        <h4 className="font-semibold text-slate-800 mb-4">Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-800">{stats.programCount}</p>
            <p className="text-xs text-slate-500">Programs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">${stats.maxIncentive.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Max Single</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">${stats.totalPotential.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Combined Total</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          Programs may not be combinable. Check eligibility requirements.
        </p>
      </div>
    </div>
  )
}

// Incentive level section
function IncentiveLevelSection({
  level,
  programs,
  color
}: {
  level: string
  programs: IncentiveProgram[]
  color: 'blue' | 'purple' | 'teal'
}) {
  const colorClasses = {
    blue: { badge: 'bg-blue-100 text-blue-700 border-blue-200', border: 'border-l-blue-400' },
    purple: { badge: 'bg-purple-100 text-purple-700 border-purple-200', border: 'border-l-purple-400' },
    teal: { badge: 'bg-teal-100 text-teal-700 border-teal-200', border: 'border-l-teal-400' }
  }

  return (
    <div>
      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
        <Badge className={colorClasses[color].badge}>
          {level} Programs ({programs.length})
        </Badge>
      </h4>
      <div className="space-y-2">
        {programs.map((program, idx) => (
          <div key={idx} className={`bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors border-l-4 ${colorClasses[color].border}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">{program.program_name || `${level} Program`}</p>
                {program.program_description && (
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{program.program_description}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-emerald-600 text-lg">
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
      <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Check className="h-4 w-4 text-emerald-600" />
          </div>
          <h4 className="font-semibold text-emerald-800">Simple Systems</h4>
        </div>
        <div className="space-y-1.5 text-sm text-emerald-900">
          <p><span className="font-medium">Permit:</span> Usually not required</p>
          <p><span className="font-medium">Limit:</span> Under 250 gal/day</p>
          <p><span className="font-medium">Example:</span> Laundry-to-landscape</p>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <h4 className="font-semibold text-blue-800">Standard Systems</h4>
        </div>
        <div className="space-y-1.5 text-sm text-blue-900">
          <p><span className="font-medium">Permit:</span> Required</p>
          <p><span className="font-medium">Fee:</span> ${permitFee || '150-500'}</p>
          <p><span className="font-medium">Time:</span> 2-4 weeks</p>
        </div>
      </div>
      <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <ClipboardList className="h-4 w-4 text-amber-600" />
          </div>
          <h4 className="font-semibold text-amber-800">Complex Systems</h4>
        </div>
        <div className="space-y-1.5 text-sm text-amber-900">
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
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl p-5 sm:p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="relative">
          <div className="flex items-center gap-2 text-purple-200 text-sm mb-2">
            <MapPin className="h-4 w-4" />
            <span>{selectedState?.state_name}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {selectedCounty.county_name} County
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 backdrop-blur-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              Greywater Allowed
            </Badge>
            {selectedCounty.city_count && (
              <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                {selectedCounty.city_count} Cities
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Policy Framework */}
      <CollapsibleSection
        title="Policy Framework"
        icon={Layers}
        accentColor="purple"
        defaultOpen={true}
      >
        <div className="space-y-3 pt-4">
          <PolicyLevelCard
            level="State"
            name={selectedState?.state_name || ''}
            color="blue"
            hasPolicy={!!selectedState?.has_greywater_policy}
            programCount={complianceData?.state?.incentive_count}
            summary={selectedState?.regulation_summary}
          />
          <PolicyLevelCard
            level="County"
            name={selectedCounty.county_name || ''}
            color="purple"
            hasPolicy={selectedCounty.has_greywater_policy === 1}
            programCount={complianceData?.county?.incentive_count}
            summary={selectedCounty.regulation_summary}
          />
        </div>
      </CollapsibleSection>

      {/* Compliance by Sector */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <Home className="h-4 w-4 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-800">Residential</h3>
          </div>
          <p className="text-sm text-slate-600">
            {selectedCounty.has_greywater_policy === 1
              ? 'County-specific residential requirements apply'
              : 'Follows state residential guidelines'}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Building className="h-4 w-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800">Commercial</h3>
          </div>
          <p className="text-sm text-slate-600">
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
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-5 sm:p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {selectedState.state_name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {selectedState.has_greywater_policy ? (
              <Badge className="bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 backdrop-blur-sm">
                <CheckCircle className="h-3 w-3 mr-1" />
                State Policy Active
              </Badge>
            ) : (
              <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <XCircle className="h-3 w-3 mr-1" />
                No State Framework
              </Badge>
            )}
            {selectedState.county_count && (
              <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                {selectedState.county_count} Counties
              </Badge>
            )}
            {selectedState.city_count && (
              <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                {selectedState.city_count} Cities
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* State Policy Framework */}
      <CollapsibleSection
        title="State Policy Framework"
        icon={Scale}
        accentColor="blue"
        defaultOpen={true}
      >
        <div className="pt-4">
          <PolicyLevelCard
            level="State"
            name={selectedState.state_name || ''}
            color="blue"
            hasPolicy={!!selectedState.has_greywater_policy}
            programCount={complianceData?.state?.incentive_count}
            summary={selectedState.regulation_summary}
          />
          <p className="text-xs text-slate-500 mt-4">
            Local jurisdictions may have additional or more restrictive requirements
          </p>
        </div>
      </CollapsibleSection>

      {/* Compliance by Sector */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <Home className="h-4 w-4 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-800">Residential Framework</h3>
          </div>
          <p className="text-sm text-slate-600">
            {selectedState.has_greywater_policy
              ? 'Statewide standards for residential greywater systems'
              : 'No statewide standards - varies by local jurisdiction'}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Building className="h-4 w-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800">Commercial Framework</h3>
          </div>
          <p className="text-sm text-slate-600">
            Large commercial systems may require state-level review
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getLegalStatusBadgeClass(status?: string) {
  switch (status?.toLowerCase()) {
    case 'legal':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 'regulated':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'highly regulated':
      return 'bg-amber-100 text-amber-700 border-amber-200'
    case 'limited/unclear':
    case 'prohibited':
      return 'bg-red-100 text-red-700 border-red-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
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
