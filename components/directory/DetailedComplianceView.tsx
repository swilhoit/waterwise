"use client"

import { useState } from 'react'
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
  Info
} from 'lucide-react'
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
  allowed_sources?: string;
  prohibited_sources?: string;
  treatment_requirements?: string;
  system_size_limits?: string;
  setback_requirements?: string;
  inspection_required?: boolean;
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
  // Add regulation details to each level
  regulations?: RegulationDetail;
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
  
  // User type options based on sector
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
  
  // Filter tiers based on user type
  const filterTiersByUserType = (tiers: ProgramTier[] | undefined) => {
    if (!tiers || tiers.length === 0) return tiers
    
    // Score each tier based on user type match
    return tiers.map(tier => {
      let score = 0
      let isMatch = false
      
      // Check if user type matches
      if (tier.user_types?.includes(userType)) {
        score = 100 // Perfect match
        isMatch = true
      } else if (tier.typical_applicants?.toLowerCase().includes(userType.replace('_', ' '))) {
        score = 75 // Good match
        isMatch = true
      } else if (sectorView === 'residential' && tier.typical_applicants?.toLowerCase().includes('resident')) {
        score = 50 // Sector match
        isMatch = true
      } else if (sectorView === 'commercial' && tier.typical_applicants?.toLowerCase().includes('business')) {
        score = 50 // Sector match
        isMatch = true
      }
      
      return { ...tier, matchScore: score, isMatch }
    }).filter(tier => tier.isMatch).sort((a, b) => b.matchScore - a.matchScore)
  }
  
  // Filter programs based on sector view
  const filterProgramsBySector = (programs: IncentiveProgram[]) => {
    if (!programs) return []
    return programs.filter(program => {
      if (sectorView === 'residential') {
        return program.residential_eligibility !== false
      } else {
        return program.commercial_eligibility === true
      }
    })
  }
  
  // Get counts and max amounts for residential and commercial programs
  const getProgramStats = (programs: IncentiveProgram[]) => {
    if (!programs) return { residential: { count: 0, max: 0 }, commercial: { count: 0, max: 0 } }
    
    const residential = programs.filter(p => p.residential_eligibility !== false)
    const commercial = programs.filter(p => p.commercial_eligibility === true)
    
    return {
      residential: {
        count: residential.length,
        max: Math.max(...residential.map(p => p.incentive_amount_max || 0), 0)
      },
      commercial: {
        count: commercial.length,
        max: Math.max(...commercial.map(p => p.incentive_amount_max || 0), 0)
      }
    }
  }
  
  // Helper function to render detailed incentive program
  const renderIncentiveProgram = (program: IncentiveProgram, level: string, color: string, index: number) => (
    <div key={`${level}-${program.program_name}-${index}`} className={`border rounded-lg p-4 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{program.program_name || `${level} Program`}</h4>
        <Badge className={`${level === 'State' ? 'bg-blue-100 text-blue-800' : 
                            level === 'County' ? 'bg-purple-100 text-purple-800' : 
                            'bg-green-100 text-green-800'}`}>
          {program.program_status || 'Active'}
        </Badge>
      </div>
      
      {program.program_description && (
        <p className="text-sm text-gray-600 mb-2">{program.program_description}</p>
      )}
      
      <div className="space-y-2">
        {/* Tier Information for State Programs */}
        {program.tiers && program.tiers.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              {filterTiersByUserType(program.tiers)?.length === program.tiers.length 
                ? 'Available Funding Tiers:' 
                : `Matching Tiers for ${userTypeOptions.find(opt => opt.value === userType)?.label}:`}
            </p>
            <div className="space-y-1">
              {(filterTiersByUserType(program.tiers) || program.tiers).map((tier: any, tierIdx: number) => (
                <div key={tierIdx} className={`border-l-2 ${tier.matchScore >= 75 ? 'border-green-500' : 'border-blue-300'} pl-3 py-1`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-800">{tier.tier_name}</span>
                      {tier.matchScore >= 100 && <Badge className="text-xs bg-green-100 text-green-700">Perfect Match</Badge>}
                      {tier.matchScore >= 75 && tier.matchScore < 100 && <Badge className="text-xs bg-blue-100 text-blue-700">Good Match</Badge>}
                    </div>
                    <span className="text-xs font-bold text-green-700">
                      ${tier.min_amount.toLocaleString()} - ${tier.max_amount.toLocaleString()}
                    </span>
                  </div>
                  {tier.typical_applicants && (
                    <p className="text-xs text-gray-600">For: {tier.typical_applicants}</p>
                  )}
                  {tier.processing_time && (
                    <p className="text-xs text-gray-500">Processing: {tier.processing_time}</p>
                  )}
                  {tier.requirements && (
                    <p className="text-xs text-gray-500 mt-1">Requirements: {tier.requirements}</p>
                  )}
                </div>
              ))}
              {filterTiersByUserType(program.tiers)?.length === 0 && (
                <p className="text-xs text-gray-500 italic">No matching tiers for your profile. Showing all available tiers above.</p>
              )}
            </div>
          </div>
        ) : (
          /* Original Amount Information for non-tiered programs */
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Incentive Amount:</span>
            <div className="text-right">
              {program.incentive_amount_min && program.incentive_amount_max ? (
                <p className="text-lg font-bold text-green-700">
                  ${program.incentive_amount_min?.toLocaleString()} - ${program.incentive_amount_max?.toLocaleString()}
                </p>
              ) : program.incentive_amount_max ? (
                <p className="text-lg font-bold text-green-700">
                  Up to ${program.incentive_amount_max?.toLocaleString()}
                </p>
              ) : program.rebate_percentage ? (
                <p className="text-lg font-bold text-green-700">
                  {program.rebate_percentage}% rebate
                </p>
              ) : (
                <p className="text-sm text-gray-500">Amount varies</p>
              )}
              {program.max_funding_per_application && (
                <p className="text-xs text-gray-500">
                  Max: ${program.max_funding_per_application.toLocaleString()} per application
                </p>
              )}
            </div>
          </div>
        )}

        {/* Eligibility */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-blue-500" />
            <span className={program.residential_eligibility ? 'text-green-700' : 'text-gray-400'}>
              Residential {program.residential_eligibility ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-purple-500" />
            <span className={program.commercial_eligibility ? 'text-green-700' : 'text-gray-400'}>
              Commercial {program.commercial_eligibility ? '✓' : '✗'}
            </span>
          </div>
        </div>

        {/* Requirements */}
        {program.eligibility_requirements && (
          <div>
            <p className="text-xs font-medium text-gray-700">Eligibility:</p>
            <p className="text-xs text-gray-600">{program.eligibility_requirements}</p>
          </div>
        )}

        {program.installation_requirements && (
          <div>
            <p className="text-xs font-medium text-gray-700">Installation Requirements:</p>
            <p className="text-xs text-gray-600">{program.installation_requirements}</p>
          </div>
        )}

        {/* Processing and Contact Info */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          {program.incentive_processing_time && (
            <div>Processing: {program.incentive_processing_time} days</div>
          )}
          {program.application_deadline && (
            <div>Deadline: {program.application_deadline}</div>
          )}
        </div>

        {/* Contact Information */}
        {(program.program_contact_email || program.program_contact_phone) && (
          <div className="text-xs text-gray-600 border-t pt-2 mt-2">
            {program.program_contact_email && (
              <div>Email: {program.program_contact_email}</div>
            )}
            {program.program_contact_phone && (
              <div>Phone: {program.program_contact_phone}</div>
            )}
          </div>
        )}

        {/* Application Link */}
        {program.incentive_url && (
          <div className="pt-2">
            <a 
              href={program.incentive_url} 
              className="text-xs text-blue-600 hover:text-blue-800 underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Apply Online →
            </a>
          </div>
        )}
      </div>
    </div>
  );
  if (selectedCity) {
    // Detailed City-Level View
    return (
      <div className="mb-8 space-y-6">
        {/* City Header */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCity.city_name}
              </h2>
              <p className="text-lg text-gray-600 mt-1">
                {selectedCounty?.county_name} County, {selectedState?.state_name}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Greywater Allowed
              </Badge>
              {complianceData?.city?.incentive_count && complianceData.city.incentive_count > 0 && (
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {complianceData.city.incentive_count} Incentive{complianceData.city.incentive_count > 1 ? 's' : ''} Available
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Effective Policy View */}
        <EffectivePolicyView 
          complianceData={complianceData}
          jurisdictionName={selectedCity.city_name || ''}
        />

        {/* User Type Selector for Tier Matching */}
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">I am a:</span>
              <div className="relative group">
                <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Select your profile to see personalized funding tier recommendations for state-level incentive programs.
                  <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                  </svg>
                </div>
              </div>
            </div>
            <select 
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {userTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Policy Hierarchy Breakdown */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-500" />
            Compliance Policy Hierarchy
          </h3>
          <div className="space-y-4">
            {/* State Level Policy */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">State Level ({selectedState?.state_name})</h4>
                {complianceData?.state?.incentive_count && complianceData.state.incentive_count > 0 ? (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    {complianceData.state.incentive_count} Program{complianceData.state.incentive_count > 1 ? 's' : ''}
                  </Badge>
                ) : selectedState?.has_greywater_policy ? (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    Active Policy
                  </Badge>
                ) : (
                  <Badge variant="outline">No State Policy</Badge>
                )}
              </div>
              {selectedState?.regulation_summary && (
                <p className="text-sm text-gray-600 mt-2">{selectedState.regulation_summary}</p>
              )}
              {complianceData?.state?.incentives && (() => {
                const stats = getProgramStats(complianceData.state.incentives)
                return (
                  <div className="mt-2 space-y-1">
                    {stats.residential.count > 0 && (
                      <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                        <Home className="h-3 w-3" />
                        Residential: {stats.residential.count} program{stats.residential.count > 1 ? 's' : ''} 
                        {stats.residential.max > 0 && ` • Up to $${stats.residential.max.toLocaleString()}`}
                      </p>
                    )}
                    {stats.commercial.count > 0 && (
                      <p className="text-sm text-purple-700 font-medium flex items-center gap-2">
                        <Building className="h-3 w-3" />
                        Commercial: {stats.commercial.count} program{stats.commercial.count > 1 ? 's' : ''}
                        {stats.commercial.max > 0 && ` • Up to $${stats.commercial.max.toLocaleString()}`}
                      </p>
                    )}
                  </div>
                )
              })()}
            </div>

            {/* County Level Policy */}
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">County Level ({selectedCounty?.county_name})</h4>
                {complianceData?.county?.incentive_count && complianceData.county.incentive_count > 0 ? (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    {complianceData.county.incentive_count} Program{complianceData.county.incentive_count > 1 ? 's' : ''}
                  </Badge>
                ) : selectedCounty?.has_greywater_policy === 1 ? (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    Active Policy
                  </Badge>
                ) : (
                  <Badge variant="outline">Follows State Policy</Badge>
                )}
              </div>
              {selectedCounty?.regulation_summary && (
                <p className="text-sm text-gray-600 mt-2">{selectedCounty.regulation_summary}</p>
              )}
              {complianceData?.county?.incentives && (() => {
                const stats = getProgramStats(complianceData.county.incentives)
                return (
                  <div className="mt-2 space-y-1">
                    {stats.residential.count > 0 && (
                      <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                        <Home className="h-3 w-3" />
                        Residential: {stats.residential.count} program{stats.residential.count > 1 ? 's' : ''} 
                        {stats.residential.max > 0 && ` • Up to $${stats.residential.max.toLocaleString()}`}
                      </p>
                    )}
                    {stats.commercial.count > 0 && (
                      <p className="text-sm text-purple-700 font-medium flex items-center gap-2">
                        <Building className="h-3 w-3" />
                        Commercial: {stats.commercial.count} program{stats.commercial.count > 1 ? 's' : ''}
                        {stats.commercial.max > 0 && ` • Up to $${stats.commercial.max.toLocaleString()}`}
                      </p>
                    )}
                  </div>
                )
              })()}
            </div>

            {/* City Level Policy */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">City Level ({selectedCity.city_name})</h4>
                {selectedCity.has_greywater_policy === 1 ? (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    City Ordinance
                  </Badge>
                ) : (
                  <Badge variant="outline">Follows County/State</Badge>
                )}
              </div>
              {selectedCity.regulation_summary && (
                <p className="text-sm text-gray-600 mt-2">{selectedCity.regulation_summary}</p>
              )}
              {complianceData?.city?.incentives && (() => {
                const stats = getProgramStats(complianceData.city.incentives)
                
                return (
                  <div className="mt-2 space-y-1">
                    {stats.residential.count > 0 && (
                      <p className="text-sm text-green-700 font-medium flex items-center gap-1">
                        <Home className="h-3 w-3" />
                        Residential: {stats.residential.count} program{stats.residential.count > 1 ? 's' : ''}
                        {stats.residential.max > 0 && ` • Up to $${stats.residential.max.toLocaleString()}`}
                      </p>
                    )}
                    {stats.commercial.count > 0 && (
                      <p className="text-sm text-blue-700 font-medium flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        Commercial: {stats.commercial.count} program{stats.commercial.count > 1 ? 's' : ''}
                        {stats.commercial.max > 0 && ` • Up to $${stats.commercial.max.toLocaleString()}`}
                      </p>
                    )}
                  </div>
                )
              })()}
            </div>
          </div>
        </div>

        {/* Requirements Section Based on Sector View */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            {sectorView === 'residential' ? (
              <>
                <Home className="h-5 w-5 text-blue-500" />
                Residential Requirements
              </>
            ) : (
              <>
                <Building className="h-5 w-5 text-purple-500" />
                Commercial Requirements
              </>
            )}
          </h3>
          <div className="space-y-4">
            {(complianceData?.effective?.regulations) ? (
              <>
                <RegulationItem title="Allowed Sources" content={complianceData.effective.regulations.allowed_sources} />
                <RegulationItem title="Prohibited Sources" content={complianceData.effective.regulations.prohibited_sources} />
                <RegulationItem title="Treatment Requirements" content={complianceData.effective.regulations.treatment_requirements} />
                <RegulationItem title="System Size Limits" content={complianceData.effective.regulations.system_size_limits} />
                <RegulationItem title="Setback Requirements" content={complianceData.effective.regulations.setback_requirements} />
                <RegulationItem title="Inspection Required" content={complianceData.effective.regulations.inspection_required ? 'Yes' : 'Varies by system size'} />
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Detailed requirements for {sectorView} systems are based on the effective jurisdiction's policy. Contact the local authority for specific guidelines.
              </p>
            )}
          </div>
        </div>

        {/* Enhanced Incentive Programs */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Available Incentive Programs
          </h3>
          
          {complianceData ? (
            <div className="space-y-6">
              <IncentiveSection level="State" programs={complianceData.state?.incentives} sectorView={sectorView} renderFunction={renderIncentiveProgram} />
              <IncentiveSection level="County" programs={complianceData.county?.incentives} sectorView={sectorView} renderFunction={renderIncentiveProgram} />
              <IncentiveSection level="City" programs={complianceData.city?.incentives} sectorView={sectorView} renderFunction={renderIncentiveProgram} />

              {/* Summary Statistics */}
              {complianceData.effective && (
                <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Incentive Summary for {sectorView === 'residential' ? 'Residential' : 'Commercial'} Applicants</h4>
                  
                  {(() => {
                    const allPrograms = [
                      ...(complianceData.state?.incentives || []),
                      ...(complianceData.county?.incentives || []),
                      ...(complianceData.city?.incentives || [])
                    ];
                    const sectorPrograms = filterProgramsBySector(allPrograms);
                    
                    if (sectorPrograms.length === 0) {
                      return (
                        <p className="text-sm text-gray-500">
                          No {sectorView} incentive programs found for this location.
                        </p>
                      )
                    }

                    const maxIncentive = Math.max(...sectorPrograms.map(p => p.incentive_amount_max || 0), 0);
                    const potentialTotal = sectorPrograms.reduce((sum, p) => sum + (p.incentive_amount_max || 0), 0);

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-600">Programs Available</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {sectorPrograms.length}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-600">Maximum Single Incentive</p>
                          <p className="text-2xl font-bold text-green-700">
                            ${maxIncentive.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-600">Potential Combined Total</p>
                          <p className="text-2xl font-bold text-green-700">
                            ${potentialTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )
                  })()}
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Note: Program eligibility requirements vary and incentives may not be combinable.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading incentive program details...</p>
            </div>
          )}
        </div>

        {/* Permit Requirements */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" />
            Permit Requirements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Simple Systems</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Permit Required:</span> No (under 250 gal/day)
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Inspection:</span> Not required
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Examples:</span> Laundry-to-landscape
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Standard Systems</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Permit Required:</span> Yes
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Permit Fee:</span> ${selectedCity?.permit_fee || '150-500'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Inspection:</span> Required
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Processing Time:</span> 2-4 weeks
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Complex Systems</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Permit Required:</span> Yes
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Engineering Plans:</span> Required
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Permit Fee:</span> $500-2000+
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Processing Time:</span> 4-8 weeks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (selectedCounty) {
    // Detailed County-Level View
    return (
      <div className="mb-8 space-y-6">
        {/* County Header */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCounty.county_name} County
              </h2>
              <p className="text-lg text-gray-600 mt-1">
                {selectedState?.state_name}
              </p>
              {selectedCounty.city_count && (
                <p className="text-sm text-gray-500 mt-1">
                  {selectedCounty.city_count} cities
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Greywater Allowed
              </Badge>
              {complianceData?.county?.incentive_count && complianceData.county.incentive_count > 0 && (
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {complianceData.county.incentive_count} Incentive{complianceData.county.incentive_count > 1 ? 's' : ''} Available
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Policy Hierarchy (State + County) */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-500" />
            Policy Framework
          </h3>
          <div className="space-y-4">
            {/* State Level */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">State Framework ({selectedState?.state_name})</h4>
                {complianceData?.state?.incentive_count && complianceData.state.incentive_count > 0 ? (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    {complianceData.state.incentive_count} Program{complianceData.state.incentive_count > 1 ? 's' : ''}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500 border-gray-300">
                    No Programs
                  </Badge>
                )}
              </div>
              {selectedState?.regulation_summary && (
                <p className="text-sm text-gray-600 mt-2">{selectedState.regulation_summary}</p>
              )}
            </div>

            {/* County Level */}
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">County Policy ({selectedCounty.county_name})</h4>
                {complianceData?.county?.incentive_count && complianceData.county.incentive_count > 0 ? (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    {complianceData.county.incentive_count} Program{complianceData.county.incentive_count > 1 ? 's' : ''}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500 border-gray-300">
                    No Programs
                  </Badge>
                )}
              </div>
              {selectedCounty.regulation_summary && (
                <p className="text-sm text-gray-600 mt-2">{selectedCounty.regulation_summary}</p>
              )}
            </div>
          </div>
        </div>

        {/* Residential vs Commercial */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-500" />
              Residential Compliance
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">County Requirements:</p>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCounty.has_greywater_policy === 1 
                    ? "County-specific residential requirements apply"
                    : "Follows state residential guidelines"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Permit Process:</p>
                <p className="text-sm text-gray-600 mt-1">
                  Applications processed at county level
                </p>
              </div>
              {selectedCounty.max_rebate_amount && selectedCounty.max_rebate_amount > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700">County Rebates:</p>
                  <p className="text-sm text-green-700 font-semibold mt-1">
                    Up to ${selectedCounty.max_rebate_amount.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              Commercial Compliance
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Review Process:</p>
                <p className="text-sm text-gray-600 mt-1">
                  All commercial systems require county review and approval
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Additional Requirements:</p>
                <ul className="text-sm text-gray-600 mt-1 ml-4 list-disc">
                  <li>Health department approval</li>
                  <li>Environmental review for large systems</li>
                  <li>Regular compliance monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Available Incentives */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            County Incentive Programs
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedState?.has_incentives === 1 && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-gray-900 mb-2">State Program</h4>
                <p className="text-lg font-bold text-green-700">
                  Up to ${selectedState.max_rebate_amount?.toLocaleString() || '500'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Available to all county residents
                </p>
              </div>
            )}
            
            {selectedCounty?.has_incentives === 1 && (
              <div className="border rounded-lg p-4 bg-purple-50">
                <h4 className="font-medium text-gray-900 mb-2">County Program</h4>
                <p className="text-lg font-bold text-green-700">
                  Up to ${selectedCounty.max_rebate_amount?.toLocaleString() || '250'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCounty.county_name} County additional rebate
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } else if (selectedState) {
    // Detailed State-Level View  
    return (
      <div className="mb-8 space-y-6">
        {/* State Header */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedState.state_name}
              </h2>
              <p className="text-lg text-gray-600 mt-1">
                State of {selectedState.state_name}
              </p>
              <div className="flex gap-4 text-sm text-gray-500 mt-1">
                {selectedState.county_count && (
                  <span>{selectedState.county_count} counties</span>
                )}
                {selectedState.city_count && (
                  <span>{selectedState.city_count} cities</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {selectedState?.has_greywater_policy ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  State Policy Active
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <XCircle className="h-4 w-4 mr-1" />
                  No State Framework
                </Badge>
              )}
              {selectedState?.has_incentives === 1 && (
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  <DollarSign className="h-4 w-4 mr-1" />
                  State Incentives
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* State Policy Framework */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-500" />
            State Policy Framework
          </h3>
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Statewide Regulations</h4>
              {selectedState.has_greywater_policy ? (
                <Badge variant="outline" className="text-green-700 border-green-700">
                  Active Statewide Policy
                </Badge>
              ) : (
                <Badge variant="outline">Local Jurisdictions Decide</Badge>
              )}
            </div>
            {selectedState.regulation_summary && (
              <p className="text-sm text-gray-600 mt-2">{selectedState.regulation_summary}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Local jurisdictions may have additional or more restrictive requirements
            </p>
          </div>
        </div>

        {/* Statewide Requirements */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-500" />
              Residential Framework
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">State Standards:</p>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedState.has_greywater_policy 
                    ? "Statewide standards for residential greywater systems"
                    : "No statewide standards - varies by local jurisdiction"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Local Authority:</p>
                <p className="text-sm text-gray-600 mt-1">
                  Counties and cities may implement additional requirements
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              Commercial Framework
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">State Oversight:</p>
                <p className="text-sm text-gray-600 mt-1">
                  Large commercial systems may require state-level review
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Environmental Review:</p>
                <p className="text-sm text-gray-600 mt-1">
                  Systems over 5,000 gallons/day typically require environmental assessment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* State Incentives */}
        {complianceData?.state?.incentive_count && complianceData.state.incentive_count > 0 && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              State Incentive Programs ({complianceData.state.incentive_count})
            </h3>
            {complianceData.state.max_incentive && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <p className="text-lg font-bold text-green-700">
                  Up to ${complianceData.state.max_incentive.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {complianceData.state.regulation_summary}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
  
  return null
}

const RegulationItem = ({ title, content }: { title: string, content?: string | null }) => {
  if (!content) return null;
  
  // Split content by common delimiters (;, |) and trim whitespace
  const items = content.split(/;|,|\|/).map(item => item.trim()).filter(Boolean);

  return (
    <div>
      <p className="text-sm font-medium text-gray-700">{title}:</p>
      <ul className="text-sm text-gray-600 mt-1 ml-4 list-disc space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const IncentiveSection = ({ level, programs, sectorView, renderFunction }: { level: string, programs: any[] | undefined, sectorView: 'residential' | 'commercial', renderFunction: Function }) => {
  const filterProgramsBySector = (programs: any[]) => {
    if (!programs) return []
    return programs.filter(program => {
      if (sectorView === 'residential') {
        return program.residential_eligibility !== false
      } else {
        return program.commercial_eligibility === true
      }
    })
  }

  const filteredPrograms = filterProgramsBySector(programs || []);

  if (filteredPrograms.length === 0) {
    return null;
  }
  
  const colors = {
    State: 'bg-blue-50 text-blue-700 border-blue-200',
    County: 'bg-purple-50 text-purple-700 border-purple-200',
    City: 'bg-green-50 text-green-700 border-green-200',
  }

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
        <Badge variant="outline" className={colors[level]}>
          {level} {sectorView === 'commercial' ? 'Commercial' : 'Residential'} Programs ({filteredPrograms.length})
        </Badge>
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPrograms.map((program, idx) => 
          renderFunction(program, level, `bg-${colors[level].split(' ')[0]}`, idx)
        )}
      </div>
    </div>
  )
}