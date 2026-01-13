"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  DollarSign, ExternalLink, ChevronDown, ChevronUp,
  Home, Building2, Clock, FileText, ClipboardList,
  Wrench, Timer, BadgeCheck
} from 'lucide-react'
import { PageTheme, getThemeColors } from './PageLayout'

// ============================================================================
// TYPES
// ============================================================================

export interface IncentiveProgram {
  program_name: string
  incentive_type?: string
  resource_type?: string
  program_subtype?: string
  incentive_amount_min?: number
  incentive_amount_max?: number
  incentive_per_unit?: string
  incentive_url?: string
  program_description?: string
  water_utility?: string
  residential_eligible?: boolean
  commercial_eligible?: boolean
  eligibility_details?: string
  how_to_apply?: string
  documentation_required?: string
  installation_requirements?: string
  property_requirements?: string
  income_requirements?: string
  pre_approval_required?: boolean
  inspection_required?: boolean
  contractor_requirements?: string
  product_requirements?: string
  timeline_to_complete?: string
  reimbursement_process?: string
  restrictions?: string
  steps_to_apply?: string
  processing_time?: string
  stacking_allowed?: boolean
  stacking_details?: string
  contact_email?: string
  contact_phone?: string
  coverage_area?: string
  deadline_info?: string
  program_end_date?: string
  jurisdiction_level?: string
}

type ProgramType = 'rebate' | 'loan' | 'tax_credit' | 'tax_exemption' | 'subsidy' | 'free_installation' | 'permit_waiver' | 'education' | 'various'

// ============================================================================
// BADGE COMPONENTS
// ============================================================================

function ProgramTypeBadge({ type }: { type: ProgramType }) {
  const config: Record<ProgramType, { label: string; className: string }> = {
    rebate: { label: 'Rebate', className: 'bg-ocean-100 text-ocean-800' },
    loan: { label: 'Loan', className: 'bg-blue-100 text-blue-800' },
    tax_credit: { label: 'Tax Credit', className: 'bg-purple-100 text-purple-800' },
    tax_exemption: { label: 'Tax Exempt', className: 'bg-purple-100 text-purple-800' },
    subsidy: { label: 'Subsidy', className: 'bg-ocean-100 text-ocean-800' },
    free_installation: { label: 'Free Install', className: 'bg-ocean-100 text-ocean-800' },
    permit_waiver: { label: 'Permit Waiver', className: 'bg-amber-100 text-amber-800' },
    education: { label: 'Education', className: 'bg-ocean-100 text-ocean-800' },
    various: { label: 'Various', className: 'bg-sand-100 text-sand-800' }
  }
  const { label, className } = config[type] || config.various
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${className}`}>{label}</span>
}

function JurisdictionLevelBadge({ level }: { level?: string }) {
  if (!level) return null
  const config: Record<string, { label: string; className: string }> = {
    city: { label: 'City', className: 'bg-ocean-50 text-ocean-700 border-ocean-200' },
    county: { label: 'County', className: 'bg-terra-50 text-terra-700 border-terra-200' },
    state: { label: 'State', className: 'bg-purple-50 text-purple-700 border-purple-200' }
  }
  const { label, className } = config[level] || { label: level, className: 'bg-sand-50 text-sand-700 border-sand-200' }
  return <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${className}`}>{label}</span>
}

function EligibilityBadges({ residential, commercial }: { residential?: boolean; commercial?: boolean }) {
  return (
    <div className="flex gap-1">
      {residential && (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium" title="Residential eligible">
          <Home className="h-2.5 w-2.5" />
        </span>
      )}
      {commercial && (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded text-[10px] font-medium" title="Commercial eligible">
          <Building2 className="h-2.5 w-2.5" />
        </span>
      )}
    </div>
  )
}

// ============================================================================
// INCENTIVES TABLE COMPONENT
// ============================================================================

interface IncentivesTableProps {
  incentives: IncentiveProgram[]
  theme?: PageTheme
  title?: string
  subtitle?: string
  emptyMessage?: string
  showJurisdictionLevel?: boolean
  locationName?: string
  stateName?: string
  countyName?: string
  cityName?: string
  className?: string
}

export function IncentivesTable({
  incentives,
  theme = 'ocean',
  title = 'Rebates & Incentives',
  subtitle,
  emptyMessage = 'No rebate programs found for this location.',
  showJurisdictionLevel = true,
  locationName,
  className = 'mt-8'
}: IncentivesTableProps) {
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())
  const colors = getThemeColors(theme)

  const toggleProgram = (programId: string) => {
    setExpandedPrograms(prev => {
      const next = new Set(prev)
      if (next.has(programId)) {
        next.delete(programId)
      } else {
        next.add(programId)
      }
      return next
    })
  }

  if (incentives.length === 0) {
    return (
      <div className="bg-sand-50 border border-sand-200 rounded-xl p-6 text-center">
        <DollarSign className="h-8 w-8 text-sand-400 mx-auto mb-2" />
        <p className="text-sand-600">{emptyMessage}</p>
      </div>
    )
  }

  const maxRebate = Math.max(...incentives.map(i => i.incentive_amount_max || 0), 0)

  return (
    <div id="rebates" className={`bg-white border border-sand-200 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`${colors.bgGradient} border-b ${colors.border} px-5 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${colors.icon} rounded-xl flex items-center justify-center`}>
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-semibold text-sand-900">{title}</h2>
              <p className="text-xs text-sand-500">
                {subtitle || (locationName
                  ? `Available programs in ${locationName}`
                  : `${incentives.length} programs • Up to $${maxRebate.toLocaleString()} available`
                )}
              </p>
            </div>
          </div>
          <span className={`${colors.badge} px-3 py-1 rounded-full text-sm font-medium`}>
            {incentives.length} Available
          </span>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-3">
        {incentives.map((program, idx) => {
          const programId = `mobile-${idx}-${program.program_name}`
          const isExpanded = expandedPrograms.has(programId)
          const hasDetails = !!(
            program.eligibility_details ||
            program.how_to_apply ||
            program.documentation_required ||
            program.installation_requirements
          )

          return (
            <div
              key={programId}
              className="bg-sand-50 rounded-xl p-4 border border-sand-100"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <ProgramTypeBadge type={(program.incentive_type as ProgramType) || 'rebate'} />
                  {showJurisdictionLevel && <JurisdictionLevelBadge level={program.jurisdiction_level} />}
                  <EligibilityBadges
                    residential={program.residential_eligible}
                    commercial={program.commercial_eligible}
                  />
                </div>
              </div>

              <h3 className="font-semibold text-sand-900 mb-1">{program.program_name}</h3>

              {program.water_utility && (
                <p className="text-xs text-sand-500 mb-2">{program.water_utility}</p>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-sand-200">
                <div>
                  {program.incentive_amount_max ? (
                    <>
                      <span className="text-lg font-bold text-ocean-600">
                        ${program.incentive_amount_max.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        {program.incentive_per_unit || 'max'}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-sand-500">Varies</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {hasDetails && (
                    <button
                      onClick={() => toggleProgram(programId)}
                      className="text-xs text-sand-500 hover:text-sand-700 flex items-center gap-1"
                    >
                      {isExpanded ? 'Less' : 'More'}
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  )}
                  {program.incentive_url && (
                    <a
                      href={program.incentive_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1.5 ${colors.button} text-xs font-medium rounded-lg flex items-center gap-1`}
                    >
                      Apply <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && hasDetails && (
                <ProgramDetails program={program} theme={theme} />
              )}
            </div>
          )
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sand-50 border-b border-sand-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-sand-600 uppercase tracking-wider">Program</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-sand-600 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-sand-600 uppercase tracking-wider">Eligible</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-sand-600 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-sand-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {incentives.map((program, idx) => {
              const programId = `table-${idx}-${program.program_name}`
              const isExpanded = expandedPrograms.has(programId)
              const hasDetails = !!(
                program.eligibility_details ||
                program.how_to_apply ||
                program.documentation_required ||
                program.installation_requirements
              )

              return (
                <React.Fragment key={programId}>
                  <tr className="hover:bg-sand-50/50">
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sand-900">{program.program_name}</span>
                        {program.deadline_info && (
                          <span className="text-xs text-amber-600 font-medium">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {program.deadline_info}
                          </span>
                        )}
                        {program.water_utility && (
                          <span className="text-xs text-sand-500">{program.water_utility}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <ProgramTypeBadge type={(program.incentive_type as ProgramType) || 'rebate'} />
                        {showJurisdictionLevel && <JurisdictionLevelBadge level={program.jurisdiction_level} />}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <EligibilityBadges
                        residential={program.residential_eligible}
                        commercial={program.commercial_eligible}
                      />
                    </td>
                    <td className="px-4 py-4 text-right">
                      {program.incentive_amount_max ? (
                        <div>
                          <span className="font-semibold text-ocean-600">
                            ${program.incentive_amount_max.toLocaleString()}
                          </span>
                          {program.incentive_per_unit && (
                            <span className="text-xs text-gray-400 block">
                              {program.incentive_per_unit}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Varies</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {hasDetails && (
                          <button
                            onClick={() => toggleProgram(programId)}
                            className="text-xs text-sand-500 hover:text-sand-700 flex items-center gap-1"
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        )}
                        {program.incentive_url && (
                          <a
                            href={program.incentive_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-3 py-1.5 ${colors.button} text-xs font-medium rounded-lg flex items-center gap-1`}
                          >
                            Apply <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                  {/* Expanded Row */}
                  {isExpanded && hasDetails && (
                    <tr>
                      <td colSpan={5} className="px-4 py-4 bg-sand-50/50">
                        <ProgramDetails program={program} theme={theme} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================================
// PROGRAM DETAILS - Expanded view for program details
// ============================================================================

function ProgramDetails({ program, theme = 'ocean' }: { program: IncentiveProgram; theme?: PageTheme }) {
  const colors = getThemeColors(theme)

  return (
    <div className="mt-4 pt-4 border-t border-sand-200 space-y-4">
      {program.program_description && (
        <p className="text-sm text-sand-600">{program.program_description}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {program.eligibility_details && (
          <div>
            <h4 className="text-xs font-semibold text-sand-700 mb-1 flex items-center gap-1">
              <BadgeCheck className="h-3 w-3" /> Eligibility
            </h4>
            <p className="text-xs text-sand-600">{program.eligibility_details}</p>
          </div>
        )}
        {program.how_to_apply && (
          <div>
            <h4 className="text-xs font-semibold text-sand-700 mb-1 flex items-center gap-1">
              <ClipboardList className="h-3 w-3" /> How to Apply
            </h4>
            <p className="text-xs text-sand-600">{program.how_to_apply}</p>
          </div>
        )}
        {program.documentation_required && (
          <div>
            <h4 className="text-xs font-semibold text-sand-700 mb-1 flex items-center gap-1">
              <FileText className="h-3 w-3" /> Documentation
            </h4>
            <p className="text-xs text-sand-600">{program.documentation_required}</p>
          </div>
        )}
        {program.installation_requirements && (
          <div>
            <h4 className="text-xs font-semibold text-sand-700 mb-1 flex items-center gap-1">
              <Wrench className="h-3 w-3" /> Installation Requirements
            </h4>
            <p className="text-xs text-sand-600">{program.installation_requirements}</p>
          </div>
        )}
        {program.processing_time && (
          <div>
            <h4 className="text-xs font-semibold text-sand-700 mb-1 flex items-center gap-1">
              <Timer className="h-3 w-3" /> Processing Time
            </h4>
            <p className="text-xs text-sand-600">{program.processing_time}</p>
          </div>
        )}
      </div>

      {(program.contact_email || program.contact_phone) && (
        <div className="pt-2 border-t border-sand-200">
          <p className="text-xs text-sand-500">
            Contact: {program.contact_email && <a href={`mailto:${program.contact_email}`} className={`${colors.text} hover:underline`}>{program.contact_email}</a>}
            {program.contact_email && program.contact_phone && ' • '}
            {program.contact_phone && <a href={`tel:${program.contact_phone}`} className={`${colors.text} hover:underline`}>{program.contact_phone}</a>}
          </p>
        </div>
      )}
    </div>
  )
}
