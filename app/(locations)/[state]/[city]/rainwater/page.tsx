import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RainwaterSpokeView from '@/components/directory/RainwaterSpokeView'
import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'

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

    // Try unified table
    const query = `
      SELECT
        rainwater_legal_status,
        rainwater_collection_limit_gallons,
        rainwater_potable_allowed,
        rainwater_permit_required,
        rainwater_governing_code,
        rainwater_tax_incentives,
        primary_agency,
        agency_phone,
        government_website
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
      return {
        rainwater: {
          legalStatus: 'Legal',
          collectionLimitGallons: null,
          potableUseAllowed: false,
          permitRequired: 'No',
          governingCode: null,
          taxIncentives: null
        },
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

    const query = `
      SELECT DISTINCT
        p.program_name,
        p.program_type as incentive_type,
        p.resource_type,
        p.incentive_amount_min,
        p.incentive_amount_max,
        p.application_url as incentive_url,
        p.program_description,
        p.water_utility
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
      JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
        ON p.program_id = pjl.program_id
      WHERE LOWER(p.program_status) = 'active'
        AND pjl.jurisdiction_id IN UNNEST(@jurisdictionIds)
        AND p.resource_type = 'rainwater'
      ORDER BY p.incentive_amount_max DESC NULLS LAST
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

  const [data, incentives] = await Promise.all([
    getRainwaterData(stateCode),
    getRainwaterIncentives(stateCode, cityName, cityInfo.county_name)
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
