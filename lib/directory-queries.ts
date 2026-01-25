/**
 * Centralized BigQuery data fetching functions for the directory system
 * All directory-related database queries should be defined here
 */

import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES } from '@/lib/state-utils'
import {
  StateData,
  GreywaterData,
  RainwaterData,
  AgencyData,
  CityInfo,
  IncentiveProgram,
  LocalRegulation,
  StatePermitDetails,
  CityPermitDetails,
  WaterUtility,
  LegalStatus
} from '@/lib/directory-types'

// =============================================================================
// LEGAL STATUS NORMALIZATION
// =============================================================================

/**
 * Normalize legal status values to a consistent enum
 * Standard values: 'Legal', 'Regulated', 'Restricted', 'Prohibited', 'Unknown'
 */
export function normalizeLegalStatus(status: string | null | undefined): LegalStatus {
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
    return normalized as LegalStatus
  }

  return 'Unknown'
}

// =============================================================================
// ARRAY FIELD PARSING
// =============================================================================

/**
 * Safely parse array fields from BigQuery
 * BigQuery returns ARRAY<STRING> directly, but we handle legacy string format too
 */
export function parseArrayField(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.map((s) => String(s).trim()).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((s) => s.trim()).filter(Boolean)
  return []
}

// =============================================================================
// STATE DATA QUERIES
// =============================================================================

/**
 * Fetch combined state-level greywater and rainwater data
 */
export async function getStateData(stateCode: string): Promise<StateData | null> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

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
        g.governing_code_url as greywater_governing_code_url,
        g.approved_uses as greywater_approved_uses,
        g.key_restrictions as greywater_key_restrictions,
        g.recent_changes as greywater_recent_changes,
        g.summary as greywater_summary,
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
        r.governing_code_url as rainwater_governing_code_url,
        r.tax_incentives as rainwater_tax_incentives,
        r.key_restrictions as rainwater_key_restrictions,
        r.approved_uses as rainwater_approved_uses,
        r.indoor_use_allowed as rainwater_indoor_allowed,
        r.outdoor_use_allowed as rainwater_outdoor_allowed,
        -- Storage types
        r.cistern_allowed as rainwater_cistern_allowed,
        r.rain_barrel_allowed as rainwater_rain_barrel_allowed,
        r.underground_storage_allowed as rainwater_underground_allowed,
        -- Stub-out requirements
        r.stub_out_required as rainwater_stub_out_required,
        r.stub_out_details as rainwater_stub_out_details
      FROM \`${projectId}.greywater_compliance.state_water_regulations\` g
      LEFT JOIN \`${projectId}.greywater_compliance.state_water_regulations\` r
        ON g.state_code = r.state_code AND r.resource_type = 'rainwater'
      WHERE g.state_code = @stateCode
        AND g.resource_type = 'greywater'
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as [any[], unknown]

    if (!rows || rows.length === 0) {
      return null
    }

    const row = rows[0]
    const hasRainwaterData = row.rainwater_legal_status != null

    return {
      stateCode: row.state_code,
      stateName: row.state_name || STATE_NAMES[stateCode.toUpperCase()],
      greywater: {
        legalStatus: normalizeLegalStatus(row.greywater_legal_status),
        permitRequired: row.greywater_permit_required,
        permitThresholdGpd: row.greywater_permit_threshold ?? undefined,
        indoorUseAllowed: row.greywater_indoor_allowed,
        outdoorUseAllowed: row.greywater_outdoor_allowed,
        governingCode: row.greywater_governing_code,
        governingCodeUrl: row.greywater_governing_code_url,
        approvedUses: parseArrayField(row.greywater_approved_uses),
        keyRestrictions: parseArrayField(row.greywater_key_restrictions),
        recentChanges: row.greywater_recent_changes,
        summary: row.greywater_summary
      },
      rainwater: hasRainwaterData ? {
        legalStatus: normalizeLegalStatus(row.rainwater_legal_status),
        collectionLimitGallons: row.rainwater_collection_limit_gallons,
        potableUseAllowed: row.rainwater_potable_allowed,
        permitRequired: row.rainwater_permit_required || undefined,
        governingCode: row.rainwater_governing_code,
        governingCodeUrl: row.rainwater_governing_code_url,
        taxIncentives: row.rainwater_tax_incentives,
        keyRestrictions: parseArrayField(row.rainwater_key_restrictions),
        approvedUses: parseArrayField(row.rainwater_approved_uses),
        indoorUseAllowed: row.rainwater_indoor_allowed,
        outdoorUseAllowed: row.rainwater_outdoor_allowed,
        cisternAllowed: row.rainwater_cistern_allowed,
        rainBarrelAllowed: row.rainwater_rain_barrel_allowed,
        undergroundAllowed: row.rainwater_underground_allowed,
        stubOutRequired: row.rainwater_stub_out_required,
        stubOutDetails: row.rainwater_stub_out_details
      } : null,
      agency: {
        name: row.primary_agency,
        phone: row.agency_phone,
        website: row.government_website
      },
      lastUpdated: row.updated_at
    }
  } catch (error) {
    console.error('Error fetching state data:', error)
    return null
  }
}

/**
 * Fetch greywater-only data for a state
 */
export async function getGreywaterData(stateCode: string): Promise<{
  greywater: GreywaterData
  agency: AgencyData
} | null> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

    const query = `
      SELECT
        legal_status,
        permit_required,
        permit_threshold_gpd,
        indoor_use_allowed,
        outdoor_use_allowed,
        governing_code,
        governing_code_url,
        approved_uses,
        key_restrictions,
        recent_changes,
        summary,
        primary_agency,
        agency_phone,
        government_website
      FROM \`${projectId}.greywater_compliance.state_water_regulations\`
      WHERE state_code = @stateCode AND resource_type = 'greywater'
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as [any[], unknown]

    if (!rows || rows.length === 0) return null

    const row = rows[0]

    return {
      greywater: {
        legalStatus: normalizeLegalStatus(row.legal_status),
        permitRequired: row.permit_required || 'Varies',
        permitThresholdGpd: row.permit_threshold_gpd ?? undefined,
        indoorUseAllowed: row.indoor_use_allowed,
        outdoorUseAllowed: row.outdoor_use_allowed,
        governingCode: row.governing_code,
        governingCodeUrl: row.governing_code_url,
        approvedUses: parseArrayField(row.approved_uses),
        keyRestrictions: parseArrayField(row.key_restrictions),
        recentChanges: row.recent_changes,
        summary: row.summary
      },
      agency: {
        name: row.primary_agency,
        phone: row.agency_phone,
        website: row.government_website
      }
    }
  } catch (error) {
    console.error('Error fetching greywater data:', error)
    return null
  }
}

/**
 * Fetch rainwater-only data for a state
 */
export async function getRainwaterData(stateCode: string): Promise<{
  rainwater: RainwaterData | null
  agency: AgencyData
} | null> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

    const query = `
      SELECT
        legal_status,
        collection_limit_gallons,
        potable_use_allowed,
        permit_required,
        governing_code,
        governing_code_url,
        tax_incentives,
        key_restrictions,
        approved_uses,
        indoor_use_allowed,
        outdoor_use_allowed,
        cistern_allowed,
        rain_barrel_allowed,
        underground_storage_allowed,
        stub_out_required,
        stub_out_details,
        primary_agency,
        agency_phone,
        government_website
      FROM \`${projectId}.greywater_compliance.state_water_regulations\`
      WHERE state_code = @stateCode
        AND resource_type = 'rainwater'
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as [any[], unknown]

    if (rows && rows.length > 0) {
      const row = rows[0]
      return {
        rainwater: {
          legalStatus: normalizeLegalStatus(row.legal_status),
          collectionLimitGallons: row.collection_limit_gallons,
          potableUseAllowed: row.potable_use_allowed,
          permitRequired: row.permit_required || undefined,
          governingCode: row.governing_code,
          governingCodeUrl: row.governing_code_url,
          taxIncentives: row.tax_incentives,
          keyRestrictions: parseArrayField(row.key_restrictions),
          approvedUses: parseArrayField(row.approved_uses),
          indoorUseAllowed: row.indoor_use_allowed,
          outdoorUseAllowed: row.outdoor_use_allowed,
          cisternAllowed: row.cistern_allowed,
          rainBarrelAllowed: row.rain_barrel_allowed,
          undergroundAllowed: row.underground_storage_allowed,
          stubOutRequired: row.stub_out_required,
          stubOutDetails: row.stub_out_details
        },
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        }
      }
    }

    // Fallback: try to get agency info from greywater data
    const fallbackQuery = `
      SELECT primary_agency, agency_phone, government_website
      FROM \`${projectId}.greywater_compliance.state_water_regulations\`
      WHERE state_code = @stateCode AND resource_type = 'greywater'
      LIMIT 1
    `

    const [fallbackRows] = await bigquery.query({
      query: fallbackQuery,
      params: { stateCode: stateCode.toUpperCase() }
    }) as [any[], unknown]

    if (fallbackRows && fallbackRows.length > 0) {
      const row = fallbackRows[0]
      return {
        rainwater: null,
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching rainwater data:', error)
    return null
  }
}

// =============================================================================
// INCENTIVES QUERIES
// =============================================================================

/**
 * Build jurisdiction IDs for incentive queries
 */
export function buildJurisdictionIds(
  stateCode: string,
  cityName?: string,
  countyName?: string
): string[] {
  const ids = [`${stateCode.toUpperCase()}_STATE`]

  if (countyName) {
    ids.push(`${stateCode.toUpperCase()}_COUNTY_${countyName.toUpperCase().replace(/\s+/g, '_')}`)
  }

  if (cityName) {
    ids.push(`${stateCode.toUpperCase()}_CITY_${cityName.toUpperCase().replace(/\s+/g, '_')}`)
  }

  return ids
}

/**
 * Fetch incentive programs for state level only
 */
export async function getStateIncentives(stateCode: string): Promise<IncentiveProgram[]> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const jurisdictionId = `${stateCode.toUpperCase()}_STATE`

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
      FROM \`${projectId}.greywater_compliance.programs_master\` p
      JOIN \`${projectId}.greywater_compliance.program_jurisdiction_link\` pjl
        ON p.program_id = pjl.program_id
      WHERE LOWER(p.program_status) = 'active'
        AND pjl.jurisdiction_id = @jurisdictionId
      ORDER BY p.incentive_amount_max DESC NULLS LAST
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionId }
    }) as [any[], unknown]

    return rows || []
  } catch (error) {
    console.error('Error fetching state incentives:', error)
    return []
  }
}

/**
 * Fetch incentive programs filtered by resource type
 */
export async function getIncentivesByType(
  stateCode: string,
  resourceType: 'greywater' | 'rainwater',
  cityName?: string,
  countyName?: string
): Promise<IncentiveProgram[]> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const jurisdictionIds = buildJurisdictionIds(stateCode, cityName, countyName)

    const query = `
      WITH ranked_programs AS (
        SELECT
          p.program_id,
          p.program_name,
          p.program_type as incentive_type,
          p.resource_type,
          p.program_subtype,
          p.incentive_amount_min,
          p.incentive_amount_max,
          p.incentive_per_unit,
          p.application_url as incentive_url,
          p.program_description,
          p.water_utility,
          p.residential_eligible,
          p.commercial_eligible,
          p.eligibility_details,
          p.how_to_apply,
          p.documentation_required,
          p.installation_requirements,
          p.property_requirements,
          p.income_requirements,
          p.pre_approval_required,
          p.inspection_required,
          p.contractor_requirements,
          p.product_requirements,
          p.timeline_to_complete,
          p.reimbursement_process,
          p.restrictions,
          p.steps_to_apply,
          p.processing_time,
          p.stacking_allowed,
          p.stacking_details,
          p.contact_email,
          p.contact_phone,
          p.coverage_area,
          p.deadline_info,
          p.program_end_date,
          pjl.jurisdiction_id,
          CASE
            WHEN pjl.jurisdiction_id LIKE '%_CITY_%' THEN 'city'
            WHEN pjl.jurisdiction_id LIKE '%_COUNTY_%' THEN 'county'
            WHEN pjl.jurisdiction_id LIKE '%_STATE' THEN 'state'
            ELSE 'other'
          END as jurisdiction_level,
          ROW_NUMBER() OVER (PARTITION BY p.program_id ORDER BY
            CASE
              WHEN pjl.jurisdiction_id LIKE '%_CITY_%' THEN 3
              WHEN pjl.jurisdiction_id LIKE '%_COUNTY_%' THEN 2
              WHEN pjl.jurisdiction_id LIKE '%_STATE' THEN 1
              ELSE 0
            END DESC
          ) as rn
        FROM \`${projectId}.greywater_compliance.programs_master\` p
        JOIN \`${projectId}.greywater_compliance.program_jurisdiction_link\` pjl
          ON p.program_id = pjl.program_id
        WHERE LOWER(p.program_status) = 'active'
          AND pjl.jurisdiction_id IN UNNEST(@jurisdictionIds)
          AND (p.resource_type = @resourceType OR p.resource_type IS NULL)
      )
      SELECT * EXCEPT(rn, program_id)
      FROM ranked_programs
      WHERE rn = 1
      ORDER BY incentive_amount_max DESC NULLS LAST
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionIds, resourceType },
      types: { jurisdictionIds: ['STRING'] }
    }) as [any[], unknown]

    return rows || []
  } catch (error) {
    console.error('Error fetching incentives by type:', error)
    return []
  }
}

/**
 * Fetch all incentive programs for a city (all resource types)
 */
export async function getCityIncentives(
  stateCode: string,
  cityName: string,
  countyName?: string
): Promise<IncentiveProgram[]> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const jurisdictionIds = buildJurisdictionIds(stateCode, cityName, countyName)

    const query = `
      WITH ranked_programs AS (
        SELECT
          p.program_id,
          p.program_name,
          p.program_type as incentive_type,
          p.resource_type,
          p.program_subtype,
          p.incentive_amount_min,
          p.incentive_amount_max,
          p.incentive_per_unit,
          p.application_url as incentive_url,
          p.program_description,
          p.water_utility,
          p.residential_eligible,
          p.commercial_eligible,
          p.eligibility_details,
          p.how_to_apply,
          p.documentation_required,
          p.installation_requirements,
          p.property_requirements,
          p.income_requirements,
          p.pre_approval_required,
          p.inspection_required,
          p.contractor_requirements,
          p.product_requirements,
          p.timeline_to_complete,
          p.reimbursement_process,
          p.restrictions,
          p.steps_to_apply,
          p.processing_time,
          p.stacking_allowed,
          p.stacking_details,
          p.contact_email,
          p.contact_phone,
          p.coverage_area,
          p.deadline_info,
          p.program_end_date,
          pjl.jurisdiction_id,
          CASE
            WHEN pjl.jurisdiction_id LIKE '%_CITY_%' THEN 'city'
            WHEN pjl.jurisdiction_id LIKE '%_COUNTY_%' THEN 'county'
            WHEN pjl.jurisdiction_id LIKE '%_STATE' THEN 'state'
            ELSE 'other'
          END as jurisdiction_level,
          ROW_NUMBER() OVER (PARTITION BY p.program_id ORDER BY
            CASE
              WHEN pjl.jurisdiction_id LIKE '%_CITY_%' THEN 3
              WHEN pjl.jurisdiction_id LIKE '%_COUNTY_%' THEN 2
              WHEN pjl.jurisdiction_id LIKE '%_STATE' THEN 1
              ELSE 0
            END DESC
          ) as rn
        FROM \`${projectId}.greywater_compliance.programs_master\` p
        JOIN \`${projectId}.greywater_compliance.program_jurisdiction_link\` pjl
          ON p.program_id = pjl.program_id
        WHERE LOWER(p.program_status) = 'active'
          AND pjl.jurisdiction_id IN UNNEST(@jurisdictionIds)
      )
      SELECT * EXCEPT(rn, program_id)
      FROM ranked_programs
      WHERE rn = 1
      ORDER BY incentive_amount_max DESC NULLS LAST
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionIds },
      types: { jurisdictionIds: ['STRING'] }
    }) as [any[], unknown]

    return rows || []
  } catch (error) {
    console.error('Error fetching city incentives:', error)
    return []
  }
}

// =============================================================================
// CITY / LOCATION QUERIES
// =============================================================================

/**
 * Fetch city info from city_county_mapping
 */
export async function getCityInfo(stateCode: string, citySlug: string): Promise<CityInfo> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const cityName = formatCityName(citySlug)

    const query = `
      SELECT city_name, county_name, city_jurisdiction_id
      FROM \`${projectId}.greywater_compliance.city_county_mapping\`
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
    }) as [any[], unknown]

    if (rows && rows.length > 0) {
      return rows[0]
    }

    return { city_name: cityName, county_name: undefined }
  } catch {
    return { city_name: formatCityName(citySlug), county_name: undefined }
  }
}

/**
 * Fetch all cities for a state
 */
export async function getStateCities(stateCode: string): Promise<CityInfo[]> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

    const query = `
      SELECT DISTINCT
        city_name,
        county_name,
        city_jurisdiction_id
      FROM \`${projectId}.greywater_compliance.city_county_mapping\`
      WHERE state_code = @stateCode
        AND city_name IS NOT NULL
      ORDER BY city_name
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as [any[], unknown]

    return rows || []
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}

// =============================================================================
// LOCAL REGULATION QUERIES
// =============================================================================

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
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

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
      FROM \`${projectId}.greywater_compliance.local_regulations\`
      WHERE jurisdiction_id = @jurisdictionId
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionId }
    }) as [any[], unknown]

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

// =============================================================================
// PERMIT QUERIES
// =============================================================================

/**
 * Fetch state permit details
 */
export async function getStatePermitDetails(stateCode: string): Promise<StatePermitDetails | null> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

    const query = `
      SELECT
        permit_authority,
        permit_framework,
        statewide_threshold_gpd,
        laundry_to_landscape_allowed,
        branched_drain_allowed,
        surge_tank_allowed,
        indoor_reuse_allowed,
        permit_exemptions,
        statewide_requirements,
        typical_permit_type,
        typical_fee_range,
        typical_processing_days,
        diy_generally_allowed,
        state_guidance_url,
        state_code_url,
        notes,
        tips_for_residents
      FROM \`${projectId}.greywater_compliance.state_permit_details\`
      WHERE state_code = @stateCode
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as [any[], unknown]

    if (!rows || rows.length === 0) return null

    const row = rows[0]

    return {
      permitAuthority: row.permit_authority,
      permitFramework: row.permit_framework,
      thresholdGpd: row.statewide_threshold_gpd,
      laundryToLandscapeAllowed: row.laundry_to_landscape_allowed,
      branchedDrainAllowed: row.branched_drain_allowed,
      surgeTankAllowed: row.surge_tank_allowed,
      indoorReuseAllowed: row.indoor_reuse_allowed,
      exemptions: parseArrayField(row.permit_exemptions),
      requirements: parseArrayField(row.statewide_requirements),
      permitType: row.typical_permit_type,
      typicalFees: row.typical_fee_range,
      processingDays: row.typical_processing_days,
      diyAllowed: row.diy_generally_allowed,
      applicationUrl: row.state_guidance_url,
      notes: row.notes,
      tips: row.tips_for_residents
    }
  } catch (error) {
    console.error('Error fetching state permit details:', error)
    return null
  }
}

/**
 * Fetch city permit details
 */
export async function getCityPermitDetails(
  stateCode: string,
  cityName: string
): Promise<CityPermitDetails | null> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

    const query = `
      SELECT
        permit_type,
        permit_required,
        permit_required_threshold_gpd,
        laundry_to_landscape_allowed,
        branched_drain_allowed,
        surge_tank_system_allowed,
        indoor_reuse_allowed,
        application_url,
        application_method,
        required_documents,
        pre_approval_required,
        permit_fee_min,
        permit_fee_max,
        plan_check_fee,
        inspection_fee,
        fee_notes,
        inspections_required,
        inspection_scheduling_url,
        inspection_scheduling_phone,
        licensed_plumber_required,
        licensed_contractor_required,
        diy_allowed,
        professional_requirements_notes,
        typical_processing_days,
        expedited_available,
        expedited_fee,
        department_name,
        department_address,
        department_phone,
        department_email,
        department_hours,
        department_url,
        hoa_approval_note,
        special_requirements,
        exemptions,
        data_source,
        data_verified_date,
        data_confidence,
        notes,
        tips_for_residents
      FROM \`${projectId}.greywater_compliance.city_permit_details\`
      WHERE state_code = @stateCode
        AND LOWER(city_name) = @cityName
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: {
        stateCode: stateCode.toUpperCase(),
        cityName: cityName.toLowerCase()
      }
    }) as [any[], unknown]

    if (!rows || rows.length === 0) return null

    const row = rows[0]

    // Serialize BigQuery date objects to strings
    const dataVerifiedDate = row.data_verified_date?.value
      ? row.data_verified_date.value
      : row.data_verified_date

    return {
      permitType: row.permit_type,
      permitRequired: row.permit_required,
      thresholdGpd: row.permit_required_threshold_gpd,
      laundryToLandscapeAllowed: row.laundry_to_landscape_allowed,
      branchedDrainAllowed: row.branched_drain_allowed,
      surgeTankAllowed: row.surge_tank_system_allowed,
      indoorReuseAllowed: row.indoor_reuse_allowed,
      applicationUrl: row.application_url,
      applicationMethod: row.application_method,
      requiredDocuments: parseArrayField(row.required_documents),
      feeMin: row.permit_fee_min,
      feeMax: row.permit_fee_max,
      processingDays: row.typical_processing_days,
      diyAllowed: row.diy_allowed,
      licensedPlumberRequired: row.licensed_plumber_required,
      licensedContractorRequired: row.licensed_contractor_required,
      inspectionsRequired: parseArrayField(row.inspections_required),
      departmentName: row.department_name,
      departmentPhone: row.department_phone,
      departmentAddress: row.department_address,
      departmentHours: row.department_hours,
      departmentUrl: row.department_url,
      exemptions: parseArrayField(row.exemptions),
      specialRequirements: parseArrayField(row.special_requirements),
      tips: row.tips_for_residents,
      notes: row.notes,
      dataConfidence: row.data_confidence,
      dataVerifiedDate
    }
  } catch (error) {
    console.error('Error fetching city permit details:', error)
    return null
  }
}

// =============================================================================
// WATER UTILITY QUERIES
// =============================================================================

/**
 * Fetch water utilities serving a city
 */
export async function getCityWaterUtilities(
  stateCode: string,
  cityName: string
): Promise<WaterUtility[]> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const cityJurisdictionId = buildJurisdictionId(stateCode, 'city', cityName)

    const query = `
      SELECT
        u.utility_id,
        u.utility_name,
        u.utility_type,
        u.website,
        u.phone,
        usa.service_type
      FROM \`${projectId}.greywater_compliance.utility_service_areas\` usa
      JOIN \`${projectId}.greywater_compliance.water_utilities\` u
        ON usa.utility_id = u.utility_id
      WHERE usa.jurisdiction_id = @jurisdictionId
      ORDER BY
        CASE WHEN usa.service_type = 'primary' THEN 0 ELSE 1 END,
        u.utility_name
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionId: cityJurisdictionId }
    }) as [any[], unknown]

    return (rows || []).map((row: any) => ({
      name: row.utility_name,
      website: row.website,
      phone: row.phone,
      serviceType: row.service_type
    }))
  } catch (error) {
    console.error('Error fetching water utilities:', error)
    return []
  }
}

// =============================================================================
// ALL STATES QUERY
// =============================================================================

/**
 * Get all states with basic info for directory listing
 */
export async function getAllStates(): Promise<Array<{
  stateCode: string
  stateName: string
  legalStatus?: string
  incentiveCount: number
}>> {
  try {
    const bigquery = getBigQueryClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID

    const query = `
      WITH state_incentives AS (
        SELECT
          SUBSTR(pjl.jurisdiction_id, 1, 2) as state_code,
          COUNT(DISTINCT p.program_id) as incentive_count
        FROM \`${projectId}.greywater_compliance.programs_master\` p
        JOIN \`${projectId}.greywater_compliance.program_jurisdiction_link\` pjl
          ON p.program_id = pjl.program_id
        WHERE LOWER(p.program_status) = 'active'
        GROUP BY 1
      ),
      unique_states AS (
        SELECT DISTINCT
          state_code,
          state_name,
          legal_status
        FROM \`${projectId}.greywater_compliance.state_water_regulations\`
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

    const [rows] = await bigquery.query({ query }) as [any[], unknown]

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
 * Format city slug to city name
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
