import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RainwaterSpokeView from '@/components/directory/RainwaterSpokeView'
import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'
import { getLocalRegulations, normalizeLegalStatus } from '@/lib/directory-data'

interface PageProps {
  params: Promise<{ state: string; city: string }>
}

function getStateCodeFromSlug(slug: string): string | null {
  const normalized = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  if (STATE_CODES[normalized]) return STATE_CODES[normalized]
  const upperSlug = slug.toUpperCase()
  if (STATE_NAMES[upperSlug]) return upperSlug
  return null
}

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

async function getCityInfo(stateCode: string, citySlug: string) {
  try {
    const bigquery = getBigQueryClient()
    const cityName = formatCityName(citySlug)

    const query = `
      SELECT city_name, county_name
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

    return rows && rows.length > 0 ? rows[0] : { city_name: cityName, county_name: null }
  } catch {
    return { city_name: formatCityName(citySlug), county_name: null }
  }
}

async function getRainwaterData(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()

    // Get rainwater data from state_water_regulations where resource_type = 'rainwater'
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
        primary_agency,
        agency_phone,
        government_website
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
      WHERE state_code = @stateCode
        AND resource_type = 'rainwater'
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

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
          keyRestrictions: row.key_restrictions || []
        },
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        }
      }
    }

    // Fallback
    const fallbackQuery = `
      SELECT primary_agency, agency_phone, government_website
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
      // No rainwater data available - return null for rainwater
      // The UI should handle this by showing "Data not available" instead of false "Legal"
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
  } catch {
    return null
  }
}

async function getRainwaterIncentives(stateCode: string, cityName: string, countyName: string | null) {
  try {
    const bigquery = getBigQueryClient()

    const stateJurisdictionId = `${stateCode.toUpperCase()}_STATE`
    const countyJurisdictionId = countyName
      ? `${stateCode.toUpperCase()}_COUNTY_${countyName.toUpperCase().replace(/\s+/g, '_')}`
      : ''
    const cityJurisdictionId = `${stateCode.toUpperCase()}_CITY_${cityName.toUpperCase().replace(/\s+/g, '_')}`

    const jurisdictionIds = [stateJurisdictionId]
    if (countyJurisdictionId) jurisdictionIds.push(countyJurisdictionId)
    jurisdictionIds.push(cityJurisdictionId)

    // Get full program details with jurisdiction level tracking
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
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
        JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
          ON p.program_id = pjl.program_id
        WHERE LOWER(p.program_status) = 'active'
          AND pjl.jurisdiction_id IN UNNEST(@jurisdictionIds)
          AND p.resource_type = 'rainwater'
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
    }) as any

    return rows || []
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) return { title: 'Location Not Found' }

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo.city_name

  const data = await getRainwaterData(stateCode)
  const incentives = await getRainwaterIncentives(stateCode, cityName, cityInfo.county_name)

  const status = data?.rainwater?.legalStatus || 'legal'
  const limit = data?.rainwater?.collectionLimitGallons

  return {
    title: `${cityName}, ${stateCode} Rainwater Harvesting | Collection Laws & Rebates`,
    description: `Rainwater harvesting is ${status.toLowerCase()} in ${cityName}, ${stateName}. ${limit ? `Limit: ${limit.toLocaleString()} gallons.` : 'No collection limits.'} ${incentives.length} rebate programs available.`,
    keywords: [
      `${cityName} rainwater harvesting`,
      `${cityName} rainwater collection`,
      `${cityName} rain barrel`,
      `is rainwater harvesting legal in ${cityName}`,
      `${cityName} cistern`,
      `${cityName} rainwater rebates`
    ].join(', '),
    openGraph: {
      title: `${cityName} Rainwater Harvesting Laws`,
      description: `Rainwater collection rules and ${incentives.length} rebate programs in ${cityName}, ${stateName}.`
    }
  }
}

export const revalidate = 3600

export default async function CityRainwaterPage({ params }: PageProps) {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo.city_name

  const [data, incentives, localRegs] = await Promise.all([
    getRainwaterData(stateCode),
    getRainwaterIncentives(stateCode, cityName, cityInfo.county_name),
    getLocalRegulations(stateCode, cityName, cityInfo.county_name)
  ])

  return (
    <RainwaterSpokeView
      level="city"
      stateName={stateName}
      stateCode={stateCode}
      cityName={cityName}
      countyName={cityInfo.county_name}
      rainwater={data?.rainwater || null}
      agency={data?.agency || null}
      incentives={incentives}
    />
  )
}
