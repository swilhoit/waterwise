/**
 * Shared data fetching utilities for directory pages
 * Consolidates duplicate code across state/city/spoke pages
 */

import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'

// =============================================================================
// TYPES
// =============================================================================

export interface GreywaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  permitThresholdGpd?: number | null
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  approvedUses?: string[]
  keyRestrictions?: string[]
  recentChanges?: string | null
  summary?: string
}

export interface RainwaterData {
  legalStatus?: string
  governingCode?: string
  permitRequired?: string
  collectionLimitGallons?: number | null
  potableUseAllowed?: boolean
  taxIncentives?: string
  approvedUses?: string[]
  keyRestrictions?: string[]
  summary?: string
  // Use types
  indoorUseAllowed?: boolean
  outdoorUseAllowed?: boolean
  // Storage types
  cisternAllowed?: boolean
  rainBarrelAllowed?: boolean
  undergroundAllowed?: boolean
  // Stub-out / preplumbing
  stubOutRequired?: boolean
  stubOutDetails?: string
}

// =============================================================================
// PREPLUMBING TYPES
// =============================================================================

/**
 * Valid threshold types for preplumbing mandates
 */
export type PreplumbingThresholdType = 
  | 'sqft'                  // Square footage threshold
  | 'value'                 // Project value threshold (USD)
  | 'gpd'                   // Gallons per day capacity
  | 'all_new_construction'  // Applies to all new construction
  | 'none'                  // No threshold (encouraged only)

/**
 * Valid mandate types indicating strength of requirement
 */
export type PreplumbingMandateType = 
  | 'required'    // Mandatory compliance
  | 'encouraged'  // Recommended but not mandatory
  | 'reach_code'  // Local code exceeding state baseline
  | 'baseline'    // State-level baseline (e.g., CALGreen)

/**
 * Standard building type classifications
 */
export type PreplumbingBuildingType = 
  | 'single_family'
  | 'duplex'
  | 'multi_family'
  | 'commercial'
  | 'mixed_use'
  | 'industrial'
  | 'institutional'
  | 'all_residential'

/**
 * Standard fixture type classifications
 */
export type PreplumbingFixtureType = 
  | 'clothes_washer'
  | 'shower'
  | 'bathtub'
  | 'bathroom_sink'
  | 'kitchen_sink'
  | 'all'

/**
 * Data confidence levels for verification status
 */
export type DataConfidence = 'verified' | 'partial' | 'unverified'

/**
 * Enhanced preplumbing mandate data structure
 * Supports both legacy fields and new structured fields
 */
export interface PreplumbingData {
  // Core mandate info
  hasMandate: boolean
  details?: string
  codeReference?: string
  
  // Resource-specific flags (solves conflation issue)
  greywaterRequired?: boolean
  rainwaterRequired?: boolean
  
  // Threshold information
  thresholdType?: PreplumbingThresholdType
  thresholdValue?: number
  thresholdUnit?: string  // 'sqft', 'USD', 'GPD'
  /** @deprecated Use thresholdValue with thresholdType='sqft' instead */
  thresholdSqft?: number
  
  // Mandate classification
  mandateType?: PreplumbingMandateType
  
  // Building scope
  buildingTypesArray?: PreplumbingBuildingType[]
  /** @deprecated Use buildingTypesArray instead */
  buildingTypes?: string
  appliesToRenovations?: boolean
  
  // Specific requirements
  requiredFixtures?: PreplumbingFixtureType[]
  dualPlumbingRequired?: boolean
  stubOutRequired?: boolean
  stubOutLocation?: string
  
  // Timeline
  effectiveDate?: string
  
  // Verification
  dataConfidence?: DataConfidence
  lastVerified?: string
  sourceUrl?: string
}

/**
 * Helper to get human-readable threshold description
 */
export function formatThreshold(preplumbing: PreplumbingData): string | null {
  if (!preplumbing.thresholdType || preplumbing.thresholdType === 'all_new_construction') {
    return 'All new construction'
  }
  if (preplumbing.thresholdType === 'none') {
    return null // Encouraged, no threshold
  }
  if (!preplumbing.thresholdValue) {
    return null
  }
  
  switch (preplumbing.thresholdType) {
    case 'sqft':
      return `Buildings ${preplumbing.thresholdValue.toLocaleString()}+ sqft`
    case 'value':
      return `Projects $${preplumbing.thresholdValue.toLocaleString()}+`
    case 'gpd':
      return `Systems ${preplumbing.thresholdValue.toLocaleString()}+ GPD`
    default:
      return null
  }
}

/**
 * Helper to get human-readable mandate type label
 */
export function getMandateTypeLabel(type?: PreplumbingMandateType): string {
  switch (type) {
    case 'required': return 'Required'
    case 'encouraged': return 'Encouraged'
    case 'reach_code': return 'Reach Code'
    case 'baseline': return 'State Baseline'
    default: return 'Required'
  }
}

/**
 * Helper to format building types for display
 */
export function formatBuildingTypes(types?: PreplumbingBuildingType[]): string {
  if (!types || types.length === 0) return 'New construction'
  
  const labels: Record<PreplumbingBuildingType, string> = {
    single_family: 'Single-family',
    duplex: 'Duplex',
    multi_family: 'Multi-family',
    commercial: 'Commercial',
    mixed_use: 'Mixed-use',
    industrial: 'Industrial',
    institutional: 'Institutional',
    all_residential: 'All residential'
  }
  
  return types.map(t => labels[t] || t).join(', ')
}

export interface AgencyData {
  name?: string
  phone?: string
  website?: string
}

export interface IncentiveProgram {
  program_name: string
  incentive_type?: string
  resource_type?: string
  program_subtype?: string
  incentive_amount_min?: number
  incentive_amount_max?: number
  incentive_url?: string
  program_description?: string
  water_utility?: string
  residential_eligible?: boolean
  commercial_eligible?: boolean
  // Status and verification fields
  program_status?: 'active' | 'inactive' | 'seasonal' | 'waitlist' | 'on-hold' | 'unverified'
  verified_date?: string
}

export interface CityInfo {
  city_name: string
  county_name?: string
  city_jurisdiction_id?: string
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

export interface StateData {
  stateCode: string
  stateName: string
  greywater: GreywaterData | null
  rainwater: RainwaterData | null
  agency: AgencyData | null
  lastUpdated?: string
}

// =============================================================================
// URL HELPERS
// =============================================================================

/**
 * Convert URL slug to state code (e.g., "california" -> "CA")
 */
export function getStateCodeFromSlug(slug: string): string | null {
  const normalized = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  if (STATE_CODES[normalized]) return STATE_CODES[normalized]
  const upperSlug = slug.toUpperCase()
  if (STATE_NAMES[upperSlug]) return upperSlug
  return null
}

/**
 * Convert URL slug to properly formatted city name
 */
export function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Convert city name to URL slug
 */
export function cityToSlug(cityName: string): string {
  return cityName.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Build jurisdiction ID from components
 */
export function buildJurisdictionId(
  stateCode: string,
  type: 'state' | 'county' | 'city',
  name?: string
): string {
  const state = stateCode.toUpperCase()
  if (type === 'state') return `${state}_STATE`
  if (!name) return ''
  const formattedName = name.toUpperCase().replace(/\s+/g, '_')
  return `${state}_${type.toUpperCase()}_${formattedName}`
}

// =============================================================================
// DATA FETCHING
// =============================================================================

/**
 * Normalize legal status values to a consistent enum
 * Standard values: 'Legal', 'Regulated', 'Restricted', 'Prohibited', 'Unknown'
 */
export function normalizeLegalStatus(status: string | null | undefined): string {
  if (!status) return 'Unknown'

  const s = status.toLowerCase().trim()

  // Abbreviations
  if (s === 'l') return 'Legal'
  if (s === 'r') return 'Regulated'

  // Legal variants
  if (s.includes('legal') && !s.includes('limit')) return 'Legal'

  // Regulated/Permitted variants
  if (s.includes('regulated') || s.includes('permitted') || s.includes('comprehensive')) return 'Regulated'

  // Restricted/Limited variants
  if (s.includes('restricted') || s.includes('limited') || s.includes('unclear')) return 'Restricted'

  // Prohibited variants
  if (s.includes('prohibited') || s.includes('illegal') || s.includes('not allowed')) return 'Prohibited'

  // No clear status
  if (s.includes('no formal') || s.includes('no specific') || s.includes('varies')) return 'Unknown'

  // Default to the original value if it's already one of our standards
  const normalized = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  if (['Legal', 'Regulated', 'Restricted', 'Prohibited', 'Unknown'].includes(normalized)) {
    return normalized
  }

  return 'Unknown'
}

/**
 * Fetch state-level regulations from BigQuery (unified table)
 */
export async function getStateData(stateCode: string): Promise<StateData | null> {
  try {
    const bigquery = getBigQueryClient()

    // Query unified state_water_regulations table (greywater + rainwater in one query)
    const query = `
      SELECT
        g.state_code,
        g.state_name,
        -- Greywater fields
        g.legal_status as greywater_legal_status,
        g.permit_required as greywater_permit_required,
        g.permit_threshold_gpd as greywater_permit_threshold,
        g.indoor_use_allowed as greywater_indoor_allowed,
        g.outdoor_use_allowed as greywater_outdoor_allowed,
        g.governing_code as greywater_governing_code,
        g.approved_uses as greywater_approved_uses,
        g.key_restrictions as greywater_key_restrictions,
        g.recent_changes as greywater_recent_changes,
        g.primary_agency,
        g.agency_phone,
        g.government_website,
        g.updated_at,
        -- Rainwater fields (from joined row)
        r.legal_status as rainwater_legal_status,
        r.collection_limit_gallons as rainwater_collection_limit_gallons,
        r.potable_use_allowed as rainwater_potable_allowed,
        r.permit_required as rainwater_permit_required,
        r.governing_code as rainwater_governing_code,
        r.tax_incentives as rainwater_tax_incentives,
        r.key_restrictions as rainwater_key_restrictions,
        r.approved_uses as rainwater_approved_uses,
        r.indoor_use_allowed as rainwater_indoor_allowed,
        r.outdoor_use_allowed as rainwater_outdoor_allowed
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.state_water_regulations\` g
      LEFT JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.state_water_regulations\` r
        ON g.state_code = r.state_code AND r.resource_type = 'rainwater'
      WHERE g.state_code = @stateCode
        AND g.resource_type = 'greywater'
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

    if (rows && rows.length > 0) {
      const row = rows[0]
      const hasRainwaterData = row.rainwater_legal_status != null

      return {
        stateCode: row.state_code,
        stateName: row.state_name || STATE_NAMES[stateCode.toUpperCase()],
        greywater: {
          legalStatus: normalizeLegalStatus(row.greywater_legal_status),
          permitRequired: row.greywater_permit_required,
          permitThresholdGpd: row.greywater_permit_threshold,
          indoorUseAllowed: row.greywater_indoor_allowed,
          outdoorUseAllowed: row.greywater_outdoor_allowed,
          governingCode: row.greywater_governing_code,
          // Data is now ARRAY<STRING> - no need to split
          approvedUses: row.greywater_approved_uses || [],
          keyRestrictions: row.greywater_key_restrictions || [],
          recentChanges: row.greywater_recent_changes
        },
        rainwater: hasRainwaterData ? {
          legalStatus: normalizeLegalStatus(row.rainwater_legal_status),
          collectionLimitGallons: row.rainwater_collection_limit_gallons,
          potableUseAllowed: row.rainwater_potable_allowed,
          permitRequired: row.rainwater_permit_required || undefined,
          governingCode: row.rainwater_governing_code,
          taxIncentives: row.rainwater_tax_incentives,
          keyRestrictions: row.rainwater_key_restrictions || [],
          approvedUses: row.rainwater_approved_uses || [],
          indoorUseAllowed: row.rainwater_indoor_allowed,
          outdoorUseAllowed: row.rainwater_outdoor_allowed
        } : null,
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        },
        lastUpdated: row.updated_at
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching state data:', error)
    return null
  }
}

/**
 * Fetch city info from city_county_mapping
 */
export async function getCityInfo(stateCode: string, citySlug: string): Promise<CityInfo> {
  try {
    const bigquery = getBigQueryClient()
    const cityName = formatCityName(citySlug)

    const query = `
      SELECT city_name, county_name, city_jurisdiction_id
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\`
      WHERE state_code = @stateCode
        AND (LOWER(REPLACE(city_name, ' ', '-')) = @citySlug OR LOWER(city_name) = @cityNameLower)
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: {
        stateCode: stateCode.toUpperCase(),
        citySlug: citySlug.toLowerCase(),
        cityNameLower: cityName.toLowerCase()
      }
    }) as any

    if (rows && rows.length > 0) {
      return rows[0]
    }

    return { city_name: cityName, county_name: undefined }
  } catch {
    return { city_name: formatCityName(citySlug), county_name: undefined }
  }
}

/**
 * Fetch local regulations for a specific jurisdiction
 * Returns enhanced preplumbing data with structured fields when available
 */
export async function getLocalRegulations(
  stateCode: string,
  cityName?: string,
  countyName?: string
): Promise<LocalRegulation | null> {
  try {
    const bigquery = getBigQueryClient()

    // Build jurisdiction ID for the most specific level
    let jurisdictionId: string
    if (cityName) {
      jurisdictionId = buildJurisdictionId(stateCode, 'city', cityName)
    } else if (countyName) {
      jurisdictionId = buildJurisdictionId(stateCode, 'county', countyName)
    } else {
      jurisdictionId = buildJurisdictionId(stateCode, 'state')
    }

    const query = `
      SELECT
        jurisdiction_id,
        jurisdiction_name,
        COALESCE(notes, permit_details) as regulation_summary,
        permit_required,
        allowed_uses,
        restrictions,
        website as documentation_url,
        -- Legacy preplumbing fields
        has_preplumbing_mandate,
        preplumbing_threshold_sqft,
        preplumbing_building_types,
        preplumbing_details,
        preplumbing_code_reference,
        -- Enhanced preplumbing fields (new schema)
        greywater_preplumbing_required,
        rainwater_preplumbing_required,
        preplumbing_threshold_type,
        preplumbing_threshold_value,
        preplumbing_threshold_unit,
        preplumbing_mandate_type,
        preplumbing_building_types_array,
        preplumbing_required_fixtures,
        preplumbing_applies_to_renovations,
        preplumbing_dual_plumbing_required,
        preplumbing_stub_out_required,
        preplumbing_stub_out_location,
        preplumbing_effective_date,
        preplumbing_data_confidence,
        preplumbing_last_verified,
        preplumbing_source_url
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.local_regulations\`
      WHERE jurisdiction_id = @jurisdictionId
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionId }
    }) as any

    if (rows && rows.length > 0) {
      const row = rows[0]
      
      // Build enhanced preplumbing data, preferring new fields with fallback to legacy
      const preplumbing: PreplumbingData = {
        // Core fields
        hasMandate: row.has_preplumbing_mandate || 
                    row.greywater_preplumbing_required || 
                    row.rainwater_preplumbing_required || 
                    false,
        details: row.preplumbing_details,
        codeReference: row.preplumbing_code_reference,
        
        // Resource-specific flags
        greywaterRequired: row.greywater_preplumbing_required ?? undefined,
        rainwaterRequired: row.rainwater_preplumbing_required ?? undefined,
        
        // Threshold info (prefer new fields, fall back to legacy)
        thresholdType: row.preplumbing_threshold_type ?? 
                      (row.preplumbing_threshold_sqft ? 'sqft' : 'all_new_construction'),
        thresholdValue: row.preplumbing_threshold_value ?? row.preplumbing_threshold_sqft ?? undefined,
        thresholdUnit: row.preplumbing_threshold_unit ?? 
                      (row.preplumbing_threshold_sqft ? 'sqft' : undefined),
        thresholdSqft: row.preplumbing_threshold_sqft ?? undefined, // Legacy field
        
        // Mandate classification
        mandateType: row.preplumbing_mandate_type ?? undefined,
        
        // Building scope (prefer array, fall back to string)
        buildingTypesArray: row.preplumbing_building_types_array ?? undefined,
        buildingTypes: row.preplumbing_building_types ?? undefined, // Legacy field
        appliesToRenovations: row.preplumbing_applies_to_renovations ?? undefined,
        
        // Specific requirements
        requiredFixtures: row.preplumbing_required_fixtures ?? undefined,
        dualPlumbingRequired: row.preplumbing_dual_plumbing_required ?? undefined,
        stubOutRequired: row.preplumbing_stub_out_required ?? true, // Default to true if mandate exists
        stubOutLocation: row.preplumbing_stub_out_location ?? undefined,
        
        // Timeline
        effectiveDate: row.preplumbing_effective_date?.value ?? undefined,
        
        // Verification
        dataConfidence: row.preplumbing_data_confidence ?? 'unverified',
        lastVerified: row.preplumbing_last_verified?.value ?? undefined,
        sourceUrl: row.preplumbing_source_url ?? undefined
      }
      
      return {
        jurisdictionId: row.jurisdiction_id,
        jurisdictionName: row.jurisdiction_name,
        regulationSummary: row.regulation_summary,
        permitRequired: row.permit_required,
        allowedSources: row.allowed_uses,
        restrictions: row.restrictions,
        documentationUrl: row.documentation_url,
        preplumbing
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching local regulations:', error)
    return null
  }
}

/**
 * Fetch incentive programs for given jurisdictions
 */
export async function getIncentives(
  stateCode: string,
  cityName?: string,
  countyName?: string,
  resourceType?: 'greywater' | 'rainwater' | 'all'
): Promise<IncentiveProgram[]> {
  try {
    const bigquery = getBigQueryClient()

    // Build list of jurisdiction IDs to match
    const jurisdictionIds = [buildJurisdictionId(stateCode, 'state')]
    if (countyName) {
      jurisdictionIds.push(buildJurisdictionId(stateCode, 'county', countyName))
    }
    if (cityName) {
      jurisdictionIds.push(buildJurisdictionId(stateCode, 'city', cityName))
    }

    const resourceFilter = resourceType && resourceType !== 'all'
      ? `AND (p.resource_type = '${resourceType}' OR p.resource_type IS NULL)`
      : ''

    const query = `
      SELECT DISTINCT
        p.program_name,
        p.program_type as incentive_type,
        p.resource_type,
        p.program_subtype,
        p.incentive_amount_min,
        p.incentive_amount_max,
        p.application_url as incentive_url,
        p.program_description,
        p.water_utility,
        p.residential_eligible,
        p.commercial_eligible,
        p.program_status,
        p.verified_date
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
      JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
        ON p.program_id = pjl.program_id
      WHERE LOWER(p.program_status) IN ('active', 'seasonal', 'waitlist')
        AND pjl.jurisdiction_id IN UNNEST(@jurisdictionIds)
        ${resourceFilter}
      ORDER BY p.incentive_amount_max DESC NULLS LAST
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionIds },
      types: { jurisdictionIds: ['STRING'] }
    }) as any

    return rows || []
  } catch (error) {
    console.error('Error fetching incentives:', error)
    return []
  }
}

/**
 * Fetch all cities for a state
 */
export async function getStateCities(stateCode: string): Promise<CityInfo[]> {
  try {
    const bigquery = getBigQueryClient()

    const query = `
      SELECT DISTINCT
        city_name,
        county_name,
        city_jurisdiction_id
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\`
      WHERE state_code = @stateCode
        AND city_name IS NOT NULL
      ORDER BY city_name
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

    return rows || []
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}

/**
 * Get all states with basic info
 */
export async function getAllStates(): Promise<Array<{
  stateCode: string
  stateName: string
  legalStatus?: string
  incentiveCount: number
}>> {
  try {
    const bigquery = getBigQueryClient()

    const query = `
      WITH state_incentives AS (
        SELECT
          SUBSTR(pjl.jurisdiction_id, 1, 2) as state_code,
          COUNT(DISTINCT p.program_id) as incentive_count
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
        JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
          ON p.program_id = pjl.program_id
        WHERE LOWER(p.program_status) = 'active'
        GROUP BY 1
      ),
      unique_states AS (
        SELECT DISTINCT
          state_code,
          state_name,
          legal_status
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.state_water_regulations\`
        WHERE state_code IS NOT NULL AND resource_type = 'greywater'
      )
      SELECT
        g.state_code,
        g.state_name,
        g.legal_status,
        COALESCE(si.incentive_count, 0) as incentive_count
      FROM unique_states g
      LEFT JOIN state_incentives si ON g.state_code = si.state_code
      ORDER BY g.state_name
    `

    const [rows] = await bigquery.query({ query }) as any

    return (rows || []).map((row: any) => ({
      stateCode: row.state_code,
      stateName: row.state_name,
      legalStatus: normalizeLegalStatus(row.legal_status),
      incentiveCount: row.incentive_count || 0
    }))
  } catch (error) {
    console.error('Error fetching all states:', error)
    return []
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate max rebate from incentives list
 */
export function getMaxRebate(incentives: IncentiveProgram[]): number {
  return Math.max(...incentives.map(i => i.incentive_amount_max || 0), 0)
}

/**
 * Count incentives by type
 */
export function countIncentivesByType(incentives: IncentiveProgram[]): {
  greywater: number
  rainwater: number
  conservation: number
  total: number
} {
  return {
    greywater: incentives.filter(i => i.resource_type === 'greywater').length,
    rainwater: incentives.filter(i => i.resource_type === 'rainwater').length,
    conservation: incentives.filter(i => i.resource_type === 'conservation' || !i.resource_type).length,
    total: incentives.length
  }
}
