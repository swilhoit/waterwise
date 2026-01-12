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
}

export interface PreplumbingData {
  hasMandate: boolean
  details?: string
  buildingTypes?: string
  thresholdSqft?: number
  codeReference?: string
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
 * Fetch state-level regulations from BigQuery
 */
export async function getStateData(stateCode: string): Promise<StateData | null> {
  try {
    const bigquery = getBigQueryClient()

    // Try unified table first
    const query = `
      SELECT
        state_code,
        state_name,
        legal_status as greywater_legal_status,
        permit_required as greywater_permit_required,
        permit_threshold_gpd as greywater_permit_threshold,
        indoor_use_allowed as greywater_indoor_allowed,
        outdoor_use_allowed as greywater_outdoor_allowed,
        governing_code as greywater_governing_code,
        approved_uses as greywater_approved_uses,
        key_restrictions as greywater_key_restrictions,
        recent_changes as greywater_recent_changes,
        rainwater_legal_status,
        rainwater_collection_limit_gallons,
        rainwater_potable_allowed,
        rainwater_permit_required,
        rainwater_governing_code,
        rainwater_tax_incentives,
        primary_agency,
        agency_phone,
        government_website,
        last_updated
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.state_water_regulations\`
      WHERE state_code = @stateCode
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

    if (rows && rows.length > 0) {
      const row = rows[0]
      return {
        stateCode: row.state_code,
        stateName: row.state_name || STATE_NAMES[stateCode.toUpperCase()],
        greywater: {
          legalStatus: row.greywater_legal_status === 'L' ? 'Legal' : row.greywater_legal_status === 'R' ? 'Regulated' : row.greywater_legal_status || 'Varies',
          permitRequired: row.greywater_permit_required,
          permitThresholdGpd: row.greywater_permit_threshold,
          indoorUseAllowed: row.greywater_indoor_allowed,
          outdoorUseAllowed: row.greywater_outdoor_allowed,
          governingCode: row.greywater_governing_code,
          approvedUses: row.greywater_approved_uses ? row.greywater_approved_uses.split(',').map((s: string) => s.trim()) : [],
          keyRestrictions: row.greywater_key_restrictions ? row.greywater_key_restrictions.split(',').map((s: string) => s.trim()) : [],
          recentChanges: row.greywater_recent_changes
        },
        rainwater: {
          legalStatus: row.rainwater_legal_status || 'Legal',
          collectionLimitGallons: row.rainwater_collection_limit_gallons,
          potableUseAllowed: row.rainwater_potable_allowed,
          permitRequired: row.rainwater_permit_required || 'No',
          governingCode: row.rainwater_governing_code,
          taxIncentives: row.rainwater_tax_incentives
        },
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        },
        lastUpdated: row.last_updated
      }
    }

    // Fallback to greywater_laws table
    const fallbackQuery = `
      SELECT
        state_code,
        state_name,
        legal_status,
        permit_required,
        permit_threshold_gpd,
        indoor_use_allowed,
        outdoor_use_allowed,
        governing_code,
        approved_uses,
        key_restrictions,
        recent_changes,
        primary_agency,
        agency_phone,
        government_website
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
      WHERE state_code = @stateCode
      LIMIT 1
    `

    const [fallbackRows] = await bigquery.query({
      query: fallbackQuery,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

    if (fallbackRows && fallbackRows.length > 0) {
      const row = fallbackRows[0]
      return {
        stateCode: row.state_code,
        stateName: row.state_name || STATE_NAMES[stateCode.toUpperCase()],
        greywater: {
          legalStatus: row.legal_status === 'L' ? 'Legal' : row.legal_status === 'R' ? 'Regulated' : row.legal_status || 'Varies',
          permitRequired: row.permit_required,
          permitThresholdGpd: row.permit_threshold_gpd,
          indoorUseAllowed: row.indoor_use_allowed,
          outdoorUseAllowed: row.outdoor_use_allowed,
          governingCode: row.governing_code,
          approvedUses: row.approved_uses ? row.approved_uses.split(',').map((s: string) => s.trim()) : [],
          keyRestrictions: row.key_restrictions ? row.key_restrictions.split(',').map((s: string) => s.trim()) : [],
          recentChanges: row.recent_changes
        },
        rainwater: {
          legalStatus: 'Legal',
          collectionLimitGallons: null,
          potableUseAllowed: false,
          permitRequired: 'No'
        },
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        },
        lastUpdated: undefined
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
        has_preplumbing_mandate,
        preplumbing_threshold_sqft,
        preplumbing_building_types,
        preplumbing_details,
        preplumbing_code_reference
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
      return {
        jurisdictionId: row.jurisdiction_id,
        jurisdictionName: row.jurisdiction_name,
        regulationSummary: row.regulation_summary,
        permitRequired: row.permit_required,
        allowedSources: row.allowed_uses,
        restrictions: row.restrictions,
        documentationUrl: row.documentation_url,
        preplumbing: {
          hasMandate: row.has_preplumbing_mandate || false,
          details: row.preplumbing_details,
          buildingTypes: row.preplumbing_building_types,
          thresholdSqft: row.preplumbing_threshold_sqft,
          codeReference: row.preplumbing_code_reference
        }
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
        p.commercial_eligible
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
      JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
        ON p.program_id = pjl.program_id
      WHERE LOWER(p.program_status) = 'active'
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
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
        WHERE state_code IS NOT NULL
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
      legalStatus: row.legal_status === 'L' ? 'Legal' : row.legal_status === 'R' ? 'Regulated' : 'Varies',
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
