/**
 * Centralized type definitions for the directory/regulations system
 * All directory-related types should be defined here and imported from this file
 */

// =============================================================================
// LEGAL STATUS
// =============================================================================

export type LegalStatus = 'Legal' | 'Regulated' | 'Restricted' | 'Prohibited' | 'Unknown'

// =============================================================================
// GREYWATER TYPES
// =============================================================================

export interface GreywaterData {
  legalStatus: LegalStatus | string
  governingCode?: string
  governingCodeUrl?: string
  permitRequired?: string
  permitThresholdGpd?: number
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses: string[]
  keyRestrictions: string[]
  recentChanges?: string | null
  summary?: string
}

// =============================================================================
// RAINWATER TYPES
// =============================================================================

export interface RainwaterData {
  legalStatus: LegalStatus | string
  governingCode?: string
  governingCodeUrl?: string
  permitRequired?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  taxIncentives?: string
  approvedUses: string[]
  keyRestrictions: string[]
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  // Storage types
  cisternAllowed?: boolean
  rainBarrelAllowed?: boolean
  undergroundAllowed?: boolean
  // Stub-out / preplumbing requirements
  stubOutRequired?: boolean
  stubOutDetails?: string
}

// =============================================================================
// AGENCY TYPES
// =============================================================================

export interface AgencyData {
  name?: string
  contact?: string
  phone?: string
  website?: string
}

// =============================================================================
// PREPLUMBING / LOCAL REGULATION TYPES
// =============================================================================

export interface PreplumbingData {
  hasMandate: boolean
  details?: string
  buildingTypes?: string
  thresholdSqft?: number
  codeReference?: string
}

export interface LocalRegulation {
  jurisdictionId: string
  jurisdictionName: string
  regulationSummary?: string
  permitRequired?: boolean
  preplumbing: PreplumbingData
  allowedSources?: string
  restrictions?: string
  documentationUrl?: string
}

// =============================================================================
// INCENTIVE TYPES
// =============================================================================

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
  jurisdiction_id?: string
  jurisdiction_level?: 'state' | 'county' | 'city' | 'other'
}

export interface IncentiveSummary {
  total: number
  greywater: number
  rainwater: number
  conservation: number
  maxRebate: number
}

// =============================================================================
// PERMIT TYPES
// =============================================================================

export interface StatePermitDetails {
  permitAuthority?: string
  permitFramework?: string
  thresholdGpd?: number
  laundryToLandscapeAllowed?: boolean
  branchedDrainAllowed?: boolean
  surgeTankAllowed?: boolean
  indoorReuseAllowed?: boolean
  exemptions: string[]
  requirements: string[]
  permitType?: string
  typicalFees?: string
  processingDays?: number
  diyAllowed?: boolean
  applicationUrl?: string
  notes?: string
  tips?: string
}

export interface CityPermitDetails {
  permitType?: string
  permitRequired?: boolean
  thresholdGpd?: number
  laundryToLandscapeAllowed?: boolean
  branchedDrainAllowed?: boolean
  surgeTankAllowed?: boolean
  indoorReuseAllowed?: boolean
  applicationUrl?: string
  applicationMethod?: string
  requiredDocuments: string[]
  feeMin?: number
  feeMax?: number
  processingDays?: number
  diyAllowed?: boolean
  licensedPlumberRequired?: boolean
  licensedContractorRequired?: boolean
  inspectionsRequired: string[]
  departmentName?: string
  departmentPhone?: string
  departmentAddress?: string
  departmentHours?: string
  departmentUrl?: string
  exemptions: string[]
  specialRequirements: string[]
  tips?: string
  notes?: string
  dataConfidence?: string
  dataVerifiedDate?: string
}

// =============================================================================
// LOCATION / CITY TYPES
// =============================================================================

export interface CityInfo {
  city_name: string
  county_name?: string
  city_jurisdiction_id?: string
}

export interface WaterUtility {
  name: string
  website?: string
  phone?: string
  serviceType?: string
}

// =============================================================================
// STATE DATA TYPES (Combined)
// =============================================================================

export interface StateData {
  stateCode: string
  stateName: string
  greywater: GreywaterData | null
  rainwater: RainwaterData | null
  agency: AgencyData | null
  lastUpdated?: string | null
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  status: 'success' | 'error'
  data?: T
  message?: string
}

export interface StateDataApiResponse {
  state_code: string
  state_name: string
  greywater: GreywaterData | null
  rainwater: RainwaterData | null
  conservation: {
    hasRegulations: boolean
    message: string
    incentiveCount: number
  }
  agency: AgencyData | null
  incentives: IncentiveSummary
}

// =============================================================================
// FAQ TYPES
// =============================================================================

export interface FAQ {
  question: string
  answer: string
}

// =============================================================================
// VIEW PROPS TYPES
// =============================================================================

export interface LocationHubViewProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  greywater: GreywaterData | null
  rainwater: RainwaterData | null
  agency: AgencyData | null
  incentives: IncentiveProgram[]
  cities?: CityInfo[]
  lastUpdated?: string
  preplumbing?: PreplumbingData | null
  localRegulation?: {
    regulationSummary?: string
    permitRequired?: boolean
  } | null
  permitData?: StatePermitDetails | CityPermitDetails | null
  waterUtilities?: WaterUtility[]
}

export interface GreywaterSpokeViewProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  greywater: GreywaterData | null
  agency: AgencyData | null
  incentives: IncentiveProgram[]
  preplumbing?: PreplumbingData | null
  permitDetails?: CityPermitDetails | null
}

export interface RainwaterSpokeViewProps {
  level: 'state' | 'city'
  stateName: string
  stateCode: string
  cityName?: string
  countyName?: string
  rainwater: RainwaterData | null
  agency: AgencyData | null
  incentives: IncentiveProgram[]
}
