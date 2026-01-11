"use client"

import { useState, useEffect, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Building,
  Home,
  Droplets,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Phone,
  Globe,
  Mail,
  Info,
  TrendingUp,
  Building2,
  Scale,
  Shield,
  Calendar,
  Users,
  ExternalLink,
  MapPin,
  Layers,
  Banknote,
  AlertTriangle,
  Check,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import CollapsibleSection, { InlineCollapsible } from './CollapsibleSection'

interface StateData {
  legalStatus?: string
  governingCode?: string
  permitThresholdGpd?: number | null
  permitRequired?: string
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  primaryAgency?: string
  agencyContact?: string
  agencyPhone?: string | null
  governmentWebsite?: string
  regulatoryClassification?: string
  summary?: string
  state_name?: string
  state_code?: string
  county_count?: number
  city_count?: number
  has_greywater_policy?: boolean
  has_incentives?: boolean | number
  max_rebate_amount?: number
  incentives?: any[]
  allowed_sources?: string
  prohibited_sources?: string
  treatment_requirements?: string
  system_size_limits?: string
  setback_requirements?: string
  inspection_required?: boolean
}

interface StateDetailViewProps {
  stateData: StateData
  complianceData?: any
  onBack?: () => void
  showCountiesBelow?: boolean
}

export default function StateDetailView({
  stateData: initialStateData,
  complianceData,
  onBack,
  showCountiesBelow = true
}: StateDetailViewProps) {
  const [sectorView, setSectorView] = useState<'residential' | 'commercial'>('residential')
  const [stateData, setStateData] = useState(initialStateData)

  // Merge compliance data incentives into stateData
  useEffect(() => {
    if (complianceData?.state) {
      setStateData(prevData => ({
        ...prevData,
        incentives: complianceData.state.incentives,
        ...complianceData.state
      }))
    }
  }, [complianceData])

  // Calculate stats
  const stats = useMemo(() => {
    const residentialIncentives = stateData.incentives?.filter(i => i.residential_eligibility) || []
    const commercialIncentives = stateData.incentives?.filter(i => i.commercial_eligibility) || []
    const currentIncentives = sectorView === 'residential' ? residentialIncentives : commercialIncentives
    const maxAmount = Math.max(...currentIncentives.map(i => i.incentive_amount_max || 0), 0)

    return {
      residentialCount: residentialIncentives.length,
      commercialCount: commercialIncentives.length,
      currentCount: currentIncentives.length,
      maxAmount,
      hasRegulations: !!(stateData.allowed_sources || stateData.treatment_requirements),
      hasLaws: !!(stateData.legalStatus || stateData.governingCode),
      hasAgencyInfo: !!(stateData.primaryAgency || stateData.agencyPhone || stateData.governmentWebsite)
    }
  }, [stateData, sectorView])

  const residentialIncentives = stateData.incentives?.filter(i => i.residential_eligibility) || []
  const commercialIncentives = stateData.incentives?.filter(i => i.commercial_eligibility) || []
  const currentIncentives = sectorView === 'residential' ? residentialIncentives : commercialIncentives

  const getLegalStatusColor = () => {
    return 'bg-teal-50 text-teal-700 border-teal-200'
  }

  const getClassificationIcon = (classification?: string) => {
    if (classification?.includes('Progressive')) return <TrendingUp className="h-3 w-3" />
    if (classification?.includes('Comprehensive')) return <Shield className="h-3 w-3" />
    if (classification?.includes('Restrictive')) return <AlertTriangle className="h-3 w-3" />
    if (classification?.includes('Building Code')) return <Building2 className="h-3 w-3" />
    return <Info className="h-3 w-3" />
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Compact Header */}
      <div className="bg-white border rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building className="h-6 w-6 text-gray-600 flex-shrink-0" />
              {stateData.state_name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Comprehensive Greywater Regulations & Compliance
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                {stateData.county_count || 0} Counties
              </span>
              <span className="flex items-center gap-1">
                <Home className="h-3 w-3" />
                {stateData.city_count || 0} Cities
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {stateData.legalStatus && (
              <Badge className={`${getLegalStatusColor()}`}>
                {stateData.legalStatus}
              </Badge>
            )}
            {stateData.regulatoryClassification && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                {getClassificationIcon(stateData.regulatoryClassification)}
                {stateData.regulatoryClassification}
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t">
          <QuickStat
            label="Residential Programs"
            value={stats.residentialCount}
            icon={Home}
            color="text-gray-600"
          />
          <QuickStat
            label="Commercial Programs"
            value={stats.commercialCount}
            icon={Building}
            color="text-gray-600"
          />
          <QuickStat
            label="Max Rebate"
            value={stateData.max_rebate_amount ? `$${stateData.max_rebate_amount.toLocaleString()}` : '-'}
            icon={DollarSign}
            color="text-gray-600"
          />
          <QuickStat
            label="Permit Threshold"
            value={stateData.permitThresholdGpd ? `${stateData.permitThresholdGpd} GPD` : 'Varies'}
            icon={FileText}
            color="text-gray-600"
          />
        </div>

        {/* Summary */}
        {stateData.summary && (
          <div className="bg-gray-50/50 rounded-lg p-3 mt-4">
            <p className="text-sm text-gray-700 leading-relaxed">{stateData.summary}</p>
          </div>
        )}
      </div>

      {/* Sector Toggle */}
      <div className="flex items-center gap-2 border rounded-lg p-1.5 bg-white">
        <Button
          variant={sectorView === 'residential' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSectorView('residential')}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Home className="h-4 w-4" />
          Residential
          {stats.residentialCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {stats.residentialCount}
            </Badge>
          )}
        </Button>
        <Button
          variant={sectorView === 'commercial' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSectorView('commercial')}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Building className="h-4 w-4" />
          Commercial
          {stats.commercialCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {stats.commercialCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Requirements Section */}
      {stats.hasRegulations && (
        <CollapsibleSection
          title={`${sectorView === 'residential' ? 'Residential' : 'Commercial'} Requirements`}
          icon={sectorView === 'residential' ? Home : Building}
          iconColor="text-gray-600"
          summary="Permits, allowed sources, system limits"
          defaultOpen={true}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3">
            {/* Permit Card */}
            <div className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                Permits
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Required:</span>{' '}
                  {stateData.permitRequired || 'Varies by system'}
                </p>
                {stateData.permitThresholdGpd && (
                  <p>
                    <span className="font-medium">Threshold:</span>{' '}
                    {stateData.permitThresholdGpd} gal/day
                  </p>
                )}
              </div>
              {sectorView === 'residential' && (
                <p className="text-xs text-gray-400 italic mt-2">
                  Simple laundry-to-landscape often exempt
                </p>
              )}
            </div>

            {/* System Regulations Card */}
            <div className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Droplets className="h-4 w-4 text-gray-500" />
                System Regulations
              </h4>
              <div className="space-y-2 text-sm">
                {sectorView === 'residential' ? (
                  <>
                    <RegulationItem title="Allowed Sources" content={stateData.allowed_sources} />
                    <RegulationItem title="Size Limits" content={stateData.system_size_limits} />
                  </>
                ) : (
                  <>
                    <RegulationItem title="Treatment" content={stateData.treatment_requirements} />
                    <RegulationItem title="Setbacks" content={stateData.setback_requirements} />
                  </>
                )}
              </div>
            </div>

            {/* Use Permissions Card */}
            {(stateData.indoorUseAllowed !== undefined || stateData.outdoorUseAllowed !== undefined) && (
              <div className="border border-gray-100 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Check className="h-4 w-4 text-gray-500" />
                  Use Permissions
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Indoor Use:</span>
                    <span className="text-gray-900">{stateData.indoorUseAllowed ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Outdoor Use:</span>
                    <span className="text-gray-900">{stateData.outdoorUseAllowed ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* Incentive Programs */}
      {currentIncentives.length > 0 && (
        <CollapsibleSection
          title={`${sectorView === 'residential' ? 'Residential' : 'Commercial'} Incentives`}
          icon={DollarSign}
          iconColor="text-gray-500"
          badge={
            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
              {currentIncentives.length} Available
            </Badge>
          }
          summary={stats.maxAmount > 0 ? `Up to $${stats.maxAmount.toLocaleString()}` : undefined}
          defaultOpen={true}
        >
          <div className="space-y-2 pt-3">
            {currentIncentives.map((program, idx) => (
              <div key={idx} className="border border-gray-100 rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {program.program_name || 'State Program'}
                    </p>
                    {program.program_description && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {program.program_description}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-medium text-gray-900 text-sm">
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
                        className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-0.5 justify-end mt-1"
                      >
                        Apply
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* No incentives message */}
      {currentIncentives.length === 0 && (
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">
              No statewide {sectorView} incentives found. Local rebates may be available.
            </span>
          </div>
        </div>
      )}

      {/* Laws & Restrictions */}
      {(stateData.approvedUses?.length || stateData.keyRestrictions?.length) && (
        <CollapsibleSection
          title="Approved Uses & Restrictions"
          icon={Scale}
          iconColor="text-gray-600"
          summary={`${stateData.approvedUses?.length || 0} uses, ${stateData.keyRestrictions?.length || 0} restrictions`}
          defaultOpen={false}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            {stateData.approvedUses && stateData.approvedUses.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Check className="h-4 w-4 text-gray-500" />
                  Approved Uses
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {stateData.approvedUses.slice(0, 5).map((use, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      {use}
                    </li>
                  ))}
                  {stateData.approvedUses.length > 5 && (
                    <InlineCollapsible label={`${stateData.approvedUses.length - 5} more`}>
                      <ul className="text-sm text-gray-600 space-y-1 mt-1">
                        {stateData.approvedUses.slice(5).map((use, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            {use}
                          </li>
                        ))}
                      </ul>
                    </InlineCollapsible>
                  )}
                </ul>
              </div>
            )}

            {stateData.keyRestrictions && stateData.keyRestrictions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                  Key Restrictions
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {stateData.keyRestrictions.slice(0, 5).map((restriction, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      {restriction}
                    </li>
                  ))}
                  {stateData.keyRestrictions.length > 5 && (
                    <InlineCollapsible label={`${stateData.keyRestrictions.length - 5} more`}>
                      <ul className="text-sm text-gray-600 space-y-1 mt-1">
                        {stateData.keyRestrictions.slice(5).map((restriction, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </InlineCollapsible>
                  )}
                </ul>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* Regulatory Information */}
      {stats.hasAgencyInfo && (
        <CollapsibleSection
          title="Regulatory Agency"
          icon={Building2}
          iconColor="text-gray-600"
          summary={stateData.primaryAgency}
          defaultOpen={false}
        >
          <div className="space-y-3 pt-3">
            {stateData.governingCode && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Governing Code</h4>
                <p className="text-sm text-gray-600">{stateData.governingCode}</p>
              </div>
            )}

            {stateData.primaryAgency && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Primary Agency</h4>
                <p className="text-sm text-gray-600">{stateData.primaryAgency}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {stateData.agencyPhone && (
                <a
                  href={`tel:${stateData.agencyPhone}`}
                  className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                >
                  <Phone className="h-4 w-4" />
                  {stateData.agencyPhone}
                </a>
              )}

              {stateData.agencyContact && stateData.agencyContact.includes('@') && (
                <a
                  href={`mailto:${stateData.agencyContact}`}
                  className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              )}

              {stateData.governmentWebsite && (
                <a
                  href={stateData.governmentWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Recent Changes */}
      {stateData.recentChanges && (
        <div className="border-l-2 border-teal-400 pl-4">
          <h3 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            Recent Policy Changes
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{stateData.recentChanges}</p>
        </div>
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

// Regulation item component
function RegulationItem({ title, content }: { title: string; content?: string | boolean | null }) {
  if (content === null || content === undefined) return null

  let displayContent
  if (typeof content === 'boolean') {
    displayContent = <span>{content ? 'Yes' : 'No'}</span>
  } else {
    const items = content.split(/;|,|\|/).map(item => item.trim()).filter(Boolean)
    if (items.length === 0) return null
    displayContent = items.length === 1 ? (
      <span>{items[0]}</span>
    ) : (
      <ul className="ml-3 list-disc">
        {items.slice(0, 2).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        {items.length > 2 && (
          <li className="text-gray-500">+{items.length - 2} more</li>
        )}
      </ul>
    )
  }

  return (
    <div>
      <p className="text-xs font-medium text-gray-700 uppercase tracking-wider">{title}:</p>
      <div className="text-sm text-gray-600">{displayContent}</div>
    </div>
  )
}
