"use client"

import { useEffect, useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Building,
  Home,
  DollarSign,
  CheckCircle,
  MapPin,
  Layers,
  ExternalLink,
  Building2,
  FileText
} from 'lucide-react'
import CollapsibleSection from './CollapsibleSection'
import EffectivePolicyView from './EffectivePolicyView'

interface CountyDetailViewProps {
  countyData: any
  stateCode: string
  countyName: string
  complianceData?: any
  sectorView?: 'residential' | 'commercial' | 'both'
}

export default function CountyDetailView({
  countyData,
  stateCode,
  countyName,
  complianceData,
  sectorView = 'residential'
}: CountyDetailViewProps) {
  const [localCompliance, setLocalCompliance] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (complianceData) {
      setLocalCompliance(complianceData)
    } else {
      fetchCompliance()
    }
  }, [countyName, stateCode, complianceData])

  const fetchCompliance = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/greywater-directory/compliance?state=${stateCode}&county=${countyName}`)
      const result = await response.json()
      if (result.status === 'success') {
        setLocalCompliance(result.compliance)
      }
    } catch (error) {
      console.error('Failed to fetch county compliance:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats
  const stats = useMemo(() => {
    const stateIncentives = localCompliance?.state?.incentives || []
    const countyIncentives = localCompliance?.county?.incentives || []

    const filterBySector = (programs: any[]) => {
      if (sectorView === 'both') return programs
      return programs.filter(p =>
        sectorView === 'residential'
          ? p.residential_eligibility !== false
          : p.commercial_eligibility === true
      )
    }

    const filteredState = filterBySector(stateIncentives)
    const filteredCounty = filterBySector(countyIncentives)
    const allPrograms = [...filteredState, ...filteredCounty]
    const maxAmount = Math.max(...allPrograms.map(p => p.incentive_amount_max || 0), 0)

    return {
      stateCount: filteredState.length,
      countyCount: filteredCounty.length,
      totalCount: allPrograms.length,
      maxAmount,
      hasCountyPolicy: countyData?.has_greywater_policy === 1
    }
  }, [localCompliance, sectorView, countyData])

  const countyCompliance = localCompliance?.county || localCompliance?.effective

  if (loading) {
    return (
      <div className="mb-8 space-y-4">
        <div className="bg-white border rounded-lg p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Compact Header */}
      <div className="bg-white border rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{stateCode}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-gray-600 flex-shrink-0" />
              {countyName} County
            </h2>
            {countyData?.city_count && (
              <p className="text-sm text-gray-500 mt-1">
                {countyData.city_count} cities
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Greywater Allowed
            </Badge>
            {stats.hasCountyPolicy && (
              <Badge variant="outline" className="text-gray-700 border-gray-300">
                County Policy
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t">
          <QuickStat
            label="Cities"
            value={countyData?.city_count || 0}
            icon={Home}
            color="text-green-600"
          />
          <QuickStat
            label="Incentive Programs"
            value={stats.totalCount}
            icon={DollarSign}
            color="text-green-600"
          />
          <QuickStat
            label="Max Rebate"
            value={stats.maxAmount > 0 ? `$${stats.maxAmount.toLocaleString()}` : '-'}
            icon={DollarSign}
            color="text-green-600"
          />
        </div>
      </div>

      {/* Effective Policy View */}
      <EffectivePolicyView
        complianceData={localCompliance}
        jurisdictionName={`${countyName} County`}
      />

      {/* Policy Framework */}
      <CollapsibleSection
        title="Policy Framework"
        icon={Layers}
        iconColor="text-gray-600"
        summary={`State + ${stats.hasCountyPolicy ? 'County policy' : 'Follows state'}`}
        defaultOpen={true}
      >
        <div className="space-y-3 pt-3">
          {/* State Level */}
          <PolicyLevelCard
            level="State"
            name={stateCode}
            hasPolicy={true}
            programCount={stats.stateCount}
            summary={localCompliance?.state?.regulation_summary}
          />

          {/* County Level */}
          <PolicyLevelCard
            level="County"
            name={`${countyName} County`}
            hasPolicy={stats.hasCountyPolicy}
            programCount={stats.countyCount}
            summary={countyCompliance?.regulation_summary}
          />
        </div>
      </CollapsibleSection>

      {/* Compliance by Sector */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
            <Home className="h-4 w-4 text-gray-600" />
            Residential
          </h3>
          <p className="text-sm text-gray-600">
            {stats.hasCountyPolicy
              ? 'County-specific residential requirements apply'
              : 'Follows state residential guidelines'}
          </p>
          {countyData?.max_rebate_amount && countyData.max_rebate_amount > 0 && (
            <p className="text-sm text-green-700 font-semibold mt-2">
              Up to ${countyData.max_rebate_amount.toLocaleString()} in county rebates
            </p>
          )}
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
            <Building className="h-4 w-4 text-gray-600" />
            Commercial
          </h3>
          <p className="text-sm text-gray-600">
            Commercial systems require county review and approval
          </p>
          <ul className="text-xs text-gray-500 mt-2 space-y-1">
            <li>• Health department approval may be required</li>
            <li>• Environmental review for large systems</li>
          </ul>
        </div>
      </div>

      {/* Incentive Programs */}
      {stats.totalCount > 0 && (
        <CollapsibleSection
          title="Available Incentives"
          icon={DollarSign}
          iconColor="text-green-600"
          badge={
            <Badge className="bg-green-100 text-green-800">
              {stats.totalCount} Programs
            </Badge>
          }
          summary={stats.maxAmount > 0 ? `Up to $${stats.maxAmount.toLocaleString()}` : undefined}
          defaultOpen={true}
        >
          <div className="space-y-4 pt-3">
            {/* State Programs */}
            {stats.stateCount > 0 && (
              <IncentiveSection
                level="State"
                programs={localCompliance?.state?.incentives || []}
                sectorView={sectorView}
                color="emerald"
              />
            )}

            {/* County Programs */}
            {stats.countyCount > 0 && (
              <IncentiveSection
                level="County"
                programs={localCompliance?.county?.incentives || []}
                sectorView={sectorView}
                color="emerald"
              />
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* No Incentives Message */}
      {stats.totalCount === 0 && (
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">
              No {sectorView !== 'both' ? sectorView : ''} incentive programs found. Check individual cities for local programs.
            </span>
          </div>
        </div>
      )}

      {/* Compliance Summary */}
      {countyCompliance?.regulation_summary && (
        <CollapsibleSection
          title="Compliance Summary"
          icon={FileText}
          iconColor="text-gray-600"
          defaultOpen={false}
        >
          <p className="text-sm text-gray-600 leading-relaxed pt-3">
            {countyCompliance.regulation_summary}
          </p>
        </CollapsibleSection>
      )}
    </div>
  )
}

// Quick stat component
function QuickStat({
  label,
  value,
  icon: Icon,
  color
}: {
  label: string
  value: string | number
  icon: any
  color: string
}) {
  return (
    <div className="text-center">
      <div className={`flex items-center justify-center gap-1 ${color} mb-0.5`}>
        <Icon className="h-3.5 w-3.5" />
        <span className="font-bold text-lg">{value}</span>
      </div>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

// Policy level card
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
    <div className="border-l-4 border-l-gray-300 bg-gray-50/30 rounded-r-lg p-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-xs font-medium text-gray-500 uppercase">{level}</span>
          <p className="font-medium text-gray-900">{name}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {hasPolicy ? (
            <Badge variant="outline" className="text-emerald-700 border-emerald-300 text-xs">
              Active Policy
            </Badge>
          ) : (
            <Badge variant="outline" className="text-gray-500 text-xs">
              Follows State
            </Badge>
          )}
          {programCount && programCount > 0 && (
            <Badge className="bg-emerald-100 text-emerald-800 text-xs">
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

// Incentive section
function IncentiveSection({
  level,
  programs,
  sectorView,
  color
}: {
  level: string
  programs: any[]
  sectorView: string
  color: 'emerald'
}) {
  const filtered = sectorView === 'both' ? programs : programs.filter(p =>
    sectorView === 'residential'
      ? p.residential_eligibility !== false
      : p.commercial_eligibility === true
  )

  if (filtered.length === 0) return null

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          {level} Programs ({filtered.length})
        </Badge>
      </h4>
      <div className="space-y-2">
        {filtered.map((program: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors border-l-4 border-l-emerald-400">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm">
                  {program.program_name || `${level} Program`}
                </p>
                {program.program_description && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {program.program_description}
                  </p>
                )}
                <div className="flex gap-1 mt-1">
                  {program.residential_eligibility && (
                    <Badge variant="outline" className="text-xs py-0">Residential</Badge>
                  )}
                  {program.commercial_eligibility && (
                    <Badge variant="outline" className="text-xs py-0">Commercial</Badge>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-emerald-700 text-sm">
                  {program.incentive_amount_max
                    ? `Up to $${program.incentive_amount_max.toLocaleString()}`
                    : program.rebate_percentage
                    ? `${program.rebate_percentage}% rebate`
                    : 'Varies'}
                </p>
                {program.incentive_url && (
                  <a
                    href={program.incentive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 justify-end mt-1"
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
