import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationHubView from '@/components/directory/LocationHubView'
import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'

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

    // Fetch unified state data
    const stateQuery = `
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

    const [stateRows] = await bigquery.query({
      query: stateQuery,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

    if (!stateRows || stateRows.length === 0) {
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
          summary,
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

      if (!fallbackRows || fallbackRows.length === 0) {
        return null
      }

      const row = fallbackRows[0]

      return {
        stateCode: row.state_code,
        stateName: row.state_name,
        greywater: {
          legalStatus: row.legal_status === 'L' ? 'Legal' : row.legal_status === 'R' ? 'Regulated' : 'Varies',
          permitRequired: row.permit_required,
          permitThresholdGpd: row.permit_threshold_gpd,
          indoorUseAllowed: row.indoor_use_allowed,
          outdoorUseAllowed: row.outdoor_use_allowed,
          governingCode: row.governing_code,
          approvedUses: row.approved_uses ? (Array.isArray(row.approved_uses) ? row.approved_uses : row.approved_uses.split(',').map((s: string) => s.trim())) : [],
          keyRestrictions: row.key_restrictions ? (Array.isArray(row.key_restrictions) ? row.key_restrictions : row.key_restrictions.split(',').map((s: string) => s.trim())) : [],
          recentChanges: row.recent_changes,
          summary: row.summary
        },
        rainwater: null,
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        },
        lastUpdated: null
      }
    }

    const row = stateRows[0]

    return {
      stateCode: row.state_code,
      stateName: row.state_name,
      greywater: {
        legalStatus: row.greywater_legal_status === 'L' ? 'Legal' : row.greywater_legal_status === 'R' ? 'Regulated' : row.greywater_legal_status || 'Varies',
        permitRequired: row.greywater_permit_required,
        permitThresholdGpd: row.greywater_permit_threshold,
        indoorUseAllowed: row.greywater_indoor_allowed,
        outdoorUseAllowed: row.greywater_outdoor_allowed,
        governingCode: row.greywater_governing_code,
        approvedUses: row.greywater_approved_uses ? (Array.isArray(row.greywater_approved_uses) ? row.greywater_approved_uses : row.greywater_approved_uses.split(',').map((s: string) => s.trim())) : [],
        keyRestrictions: row.greywater_key_restrictions ? (Array.isArray(row.greywater_key_restrictions) ? row.greywater_key_restrictions : row.greywater_key_restrictions.split(',').map((s: string) => s.trim())) : [],
        recentChanges: row.greywater_recent_changes,
        summary: row.greywater_summary
      },
      rainwater: {
        legalStatus: row.rainwater_legal_status || 'Legal',
        collectionLimitGallons: row.rainwater_collection_limit_gallons,
        potableUseAllowed: row.rainwater_potable_allowed,
        permitRequired: row.rainwater_permit_required,
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
  const [stateData, incentives, cities] = await Promise.all([
    getStateData(stateCode),
    getStateIncentives(stateCode),
    getStateCities(stateCode)
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
      lastUpdated={stateData?.lastUpdated}
    />
  )
}
