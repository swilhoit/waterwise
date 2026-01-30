import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationHubView from '@/components/directory/LocationHubView'
import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'
import { normalizeLegalStatus } from '@/lib/directory-data'

interface PageProps {
  params: Promise<{ state: string }>
}

// Convert slug to state code (e.g., "california" -> "CA")
function getStateCodeFromSlug(slug: string): string | null {
  const normalized = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  // Check if it's a state name
  if (STATE_CODES[normalized]) {
    return STATE_CODES[normalized]
  }

  // Check if it's already a state code
  const upperSlug = slug.toUpperCase()
  if (STATE_NAMES[upperSlug]) {
    return upperSlug
  }

  return null
}

// Fetch state data from BigQuery
async function getStateData(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()

    // Join greywater and rainwater rows from state_water_regulations table
    const stateQuery = `
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
        r.summary as rainwater_summary
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\` g
      LEFT JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\` r
        ON g.state_code = r.state_code AND r.resource_type = 'rainwater'
      WHERE g.state_code = @stateCode
        AND g.resource_type = 'greywater'
      LIMIT 1
    `

    const [stateRows] = await bigquery.query({
      query: stateQuery,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

    if (!stateRows || stateRows.length === 0) {
      return null
    }

    const row = stateRows[0]
    const hasRainwaterData = row.rainwater_legal_status != null

    return {
      stateCode: row.state_code,
      stateName: row.state_name,
      greywater: {
        legalStatus: normalizeLegalStatus(row.greywater_legal_status),
        permitRequired: row.greywater_permit_required,
        permitThresholdGpd: row.greywater_permit_threshold,
        indoorUseAllowed: row.greywater_indoor_allowed,
        outdoorUseAllowed: row.greywater_outdoor_allowed,
        governingCode: row.greywater_governing_code,
        governingCodeUrl: row.greywater_governing_code_url,
        // Data is now ARRAY<STRING> from BigQuery
        approvedUses: row.greywater_approved_uses || [],
        keyRestrictions: row.greywater_key_restrictions || [],
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
        keyRestrictions: row.rainwater_key_restrictions || [],
        approvedUses: row.rainwater_approved_uses || [],
        indoorUseAllowed: row.rainwater_indoor_allowed,
        outdoorUseAllowed: row.rainwater_outdoor_allowed,
        summary: row.rainwater_summary
      } : null,
      agency: {
        name: row.primary_agency,
        phone: row.agency_phone,
        website: row.government_website
      },
      lastUpdated: null
    }
  } catch (error) {
    console.error('Error fetching state data:', error)
    return null
  }
}

// Fetch incentives for the state
async function getStateIncentives(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()
    const stateJurisdictionId = `${stateCode.toUpperCase()}_STATE`

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
        AND pjl.jurisdiction_id = @jurisdictionId
      ORDER BY p.incentive_amount_max DESC NULLS LAST
    `

    const [rows] = await bigquery.query({
      query,
      params: { jurisdictionId: stateJurisdictionId }
    }) as any

    return rows || []
  } catch (error) {
    console.error('Error fetching incentives:', error)
    return []
  }
}

// Fetch state permit details
async function getStatePermitDetails(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()

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
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.state_permit_details\`
      WHERE state_code = @stateCode
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

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
      exemptions: row.permit_exemptions || [],
      requirements: row.statewide_requirements || [],
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

// Fetch cities for the state
async function getStateCities(stateCode: string) {
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

// Generate static params for all states
export async function generateStaticParams() {
  return Object.values(STATE_CODES).map(code => ({
    state: code.toLowerCase()
  })).concat(
    Object.keys(STATE_CODES).map(name => ({
      state: name.toLowerCase().replace(/\s+/g, '-')
    }))
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) {
    return { title: 'State Not Found' }
  }

  const stateName = STATE_NAMES[stateCode]
  const stateData = await getStateData(stateCode)
  const incentives = await getStateIncentives(stateCode)

  const greyStatus = stateData?.greywater?.legalStatus || 'varies by jurisdiction'
  const rainStatus = stateData?.rainwater?.legalStatus || 'legal'
  const rebateCount = incentives.length

  return {
    title: `${stateName} Water Regulations | Greywater, Rainwater & Rebates`,
    description: `Complete guide to ${stateName} water conservation: Greywater is ${greyStatus.toLowerCase()}, rainwater harvesting is ${rainStatus.toLowerCase()}. ${rebateCount} rebate programs available. Permits, laws & incentives.`,
    keywords: [
      `${stateName} greywater`,
      `${stateName} greywater laws`,
      `${stateName} rainwater harvesting`,
      `${stateName} water rebates`,
      `${stateName} water conservation`,
      `is greywater legal in ${stateName}`,
      `${stateName} water recycling`
    ].join(', '),
    openGraph: {
      title: `${stateName} Water Conservation Guide`,
      description: `Greywater laws, rainwater harvesting rules, and ${rebateCount} rebate programs in ${stateName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function StateHubPage({ params }: PageProps) {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) {
    notFound()
  }

  const stateName = STATE_NAMES[stateCode]

  // Fetch all data in parallel
  const [stateData, incentives, cities, permitDetails] = await Promise.all([
    getStateData(stateCode),
    getStateIncentives(stateCode),
    getStateCities(stateCode),
    getStatePermitDetails(stateCode)
  ])

  return (
    <LocationHubView
      level="state"
      stateName={stateName}
      stateCode={stateCode}
      greywater={stateData?.greywater || null}
      rainwater={stateData?.rainwater || null}
      agency={stateData?.agency || null}
      incentives={incentives}
      cities={cities}
      lastUpdated={stateData?.lastUpdated || undefined}
      permitData={permitDetails}
    />
  )
}
