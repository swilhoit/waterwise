import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationHubView from '@/components/directory/LocationHubView'
import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'
import { FAQSchema } from '@/components/schema-markup'

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

async function getCityData(stateCode: string, citySlug: string) {
  try {
    const bigquery = getBigQueryClient()
    const cityName = formatCityName(citySlug)

    // Get city info and county
    const cityQuery = `
      SELECT
        city_name,
        county_name,
        city_jurisdiction_id
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\`
      WHERE state_code = @stateCode
        AND LOWER(REPLACE(city_name, ' ', '-')) = @citySlug
      LIMIT 1
    `

    const [cityRows] = await bigquery.query({
      query: cityQuery,
      params: { stateCode: stateCode.toUpperCase(), citySlug: citySlug.toLowerCase() }
    }) as any

    if (!cityRows || cityRows.length === 0) {
      // Try fuzzy match
      const fuzzyQuery = `
        SELECT city_name, county_name, city_jurisdiction_id
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\`
        WHERE state_code = @stateCode
          AND LOWER(city_name) = @cityName
        LIMIT 1
      `
      const [fuzzyRows] = await bigquery.query({
        query: fuzzyQuery,
        params: { stateCode: stateCode.toUpperCase(), cityName: cityName.toLowerCase() }
      }) as any

      if (!fuzzyRows || fuzzyRows.length === 0) return null
      return fuzzyRows[0]
    }

    return cityRows[0]
  } catch (error) {
    console.error('Error fetching city data:', error)
    return null
  }
}

async function getStateRegulations(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()

    // Try unified table
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
        rainwater_legal_status,
        rainwater_collection_limit_gallons,
        rainwater_potable_allowed,
        rainwater_permit_required,
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
        greywater: {
          legalStatus: row.greywater_legal_status === 'L' ? 'Legal' : row.greywater_legal_status === 'R' ? 'Regulated' : row.greywater_legal_status || 'Varies',
          permitRequired: row.greywater_permit_required,
          permitThresholdGpd: row.greywater_permit_threshold,
          indoorUseAllowed: row.greywater_indoor_allowed,
          outdoorUseAllowed: row.greywater_outdoor_allowed,
          governingCode: row.greywater_governing_code,
          approvedUses: row.greywater_approved_uses ? row.greywater_approved_uses.split(',').map((s: string) => s.trim()) : [],
          keyRestrictions: row.greywater_key_restrictions ? row.greywater_key_restrictions.split(',').map((s: string) => s.trim()) : []
        },
        rainwater: {
          legalStatus: row.rainwater_legal_status || 'Legal',
          collectionLimitGallons: row.rainwater_collection_limit_gallons,
          potableUseAllowed: row.rainwater_potable_allowed,
          permitRequired: row.rainwater_permit_required || 'No'
        },
        agency: {
          name: row.primary_agency,
          phone: row.agency_phone,
          website: row.government_website
        },
        lastUpdated: row.last_updated
      }
    }

    // Fallback to greywater_laws
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
        greywater: {
          legalStatus: row.legal_status === 'L' ? 'Legal' : row.legal_status === 'R' ? 'Regulated' : 'Varies',
          permitRequired: row.permit_required,
          permitThresholdGpd: row.permit_threshold_gpd,
          indoorUseAllowed: row.indoor_use_allowed,
          outdoorUseAllowed: row.outdoor_use_allowed,
          governingCode: row.governing_code,
          approvedUses: row.approved_uses ? row.approved_uses.split(',').map((s: string) => s.trim()) : [],
          keyRestrictions: row.key_restrictions ? row.key_restrictions.split(',').map((s: string) => s.trim()) : []
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
        lastUpdated: null
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching state regulations:', error)
    return null
  }
}

async function getCityIncentives(stateCode: string, cityName: string, countyName: string) {
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

function generateCityFAQs(cityName: string, stateName: string, stateCode: string, regulations: any, incentives: any[]) {
  const greywater = regulations?.greywater
  const rainwater = regulations?.rainwater

  const greywaterStatus = greywater?.legalStatus || 'varies by jurisdiction'
  const rainwaterStatus = rainwater?.legalStatus || 'legal'
  const rebateCount = incentives.length

  return [
    {
      question: `Is greywater legal in ${cityName}, ${stateCode}?`,
      answer: `Yes, greywater is ${greywaterStatus.toLowerCase()} in ${cityName}, ${stateName}. ${
        greywater?.permitThresholdGpd
          ? `Simple systems under ${greywater.permitThresholdGpd} gallons per day typically don't require a permit.`
          : 'Check local requirements for permit details.'
      }`
    },
    {
      question: `Is rainwater harvesting legal in ${cityName}?`,
      answer: `Rainwater harvesting is ${rainwaterStatus.toLowerCase()} in ${cityName}, ${stateName}. ${
        rainwater?.collectionLimitGallons
          ? `Collection is limited to ${rainwater.collectionLimitGallons.toLocaleString()} gallons.`
          : 'There are no collection limits for residential use.'
      }`
    },
    {
      question: `Are there water rebates available in ${cityName}?`,
      answer: rebateCount > 0
        ? `Yes! There ${rebateCount === 1 ? 'is' : 'are'} ${rebateCount} rebate program${rebateCount !== 1 ? 's' : ''} available for ${cityName} residents, including greywater systems, rainwater harvesting, and water conservation incentives.`
        : `Check with your local water utility in ${cityName} for current rebate programs.`
    },
    {
      question: `What can I use greywater for in ${cityName}?`,
      answer: `In ${cityName}, greywater is typically approved for ${
        greywater?.outdoorUseAllowed ? 'outdoor landscape irrigation' : ''
      }${greywater?.outdoorUseAllowed && greywater?.indoorUseAllowed ? ' and ' : ''}${
        greywater?.indoorUseAllowed ? 'indoor toilet flushing with proper treatment' : ''
      }. Kitchen sink water with food waste is generally not allowed.`
    }
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) return { title: 'Location Not Found' }

  const stateName = STATE_NAMES[stateCode]
  const cityData = await getCityData(stateCode, city)
  const cityName = cityData?.city_name || formatCityName(city)

  const regulations = await getStateRegulations(stateCode)
  const incentives = await getCityIncentives(stateCode, cityName, cityData?.county_name || '')

  const greyStatus = regulations?.greywater?.legalStatus || 'varies'
  const rainStatus = regulations?.rainwater?.legalStatus || 'legal'
  const rebateCount = incentives.length
  const maxRebate = Math.max(...incentives.map(i => i.incentive_amount_max || 0), 0)

  return {
    title: `${cityName}, ${stateCode} Water Conservation | Greywater, Rainwater & Rebates`,
    description: `Complete water conservation guide for ${cityName}, ${stateName}. Greywater: ${greyStatus.toLowerCase()}. Rainwater: ${rainStatus.toLowerCase()}. ${rebateCount} rebate programs${maxRebate > 0 ? `, up to $${maxRebate.toLocaleString()}` : ''}.`,
    keywords: [
      `${cityName} greywater`,
      `${cityName} rainwater harvesting`,
      `${cityName} water rebates`,
      `${cityName} water conservation`,
      `is greywater legal in ${cityName}`,
      `${cityName} greywater permit`,
      `${cityName} rain barrel`
    ].join(', '),
    openGraph: {
      title: `Water Conservation in ${cityName}, ${stateCode}`,
      description: `Greywater laws, rainwater harvesting rules, and ${rebateCount} rebate programs in ${cityName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600

export default async function CityHubPage({ params }: PageProps) {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]
  const cityData = await getCityData(stateCode, city)

  if (!cityData) {
    // Create page anyway with formatted city name
    const cityName = formatCityName(city)
    const regulations = await getStateRegulations(stateCode)
    const incentives = await getCityIncentives(stateCode, cityName, '')

    const faqs = generateCityFAQs(cityName, stateName, stateCode, regulations, incentives)

    return (
      <>
        <FAQSchema faqs={faqs} />
        <LocationHubView
          level="city"
          stateName={stateName}
          stateCode={stateCode}
          cityName={cityName}
          greywater={regulations?.greywater || null}
          rainwater={regulations?.rainwater || null}
          agency={regulations?.agency || null}
          incentives={incentives}
          lastUpdated={regulations?.lastUpdated}
        />
      </>
    )
  }

  const cityName = cityData.city_name
  const countyName = cityData.county_name

  const [regulations, incentives] = await Promise.all([
    getStateRegulations(stateCode),
    getCityIncentives(stateCode, cityName, countyName)
  ])

  const faqs = generateCityFAQs(cityName, stateName, stateCode, regulations, incentives)

  return (
    <>
      <FAQSchema faqs={faqs} />
      <LocationHubView
        level="city"
        stateName={stateName}
        stateCode={stateCode}
        cityName={cityName}
        countyName={countyName}
        greywater={regulations?.greywater || null}
        rainwater={regulations?.rainwater || null}
        agency={regulations?.agency || null}
        incentives={incentives}
        lastUpdated={regulations?.lastUpdated}
      />
    </>
  )
}
