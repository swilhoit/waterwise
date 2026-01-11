import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RainwaterSpokeView from '@/components/directory/RainwaterSpokeView'
import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'

interface PageProps {
  params: Promise<{ state: string }>
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

async function getRainwaterData(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()

    // Try unified table first
    const query = `
      SELECT
        state_code,
        state_name,
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
        stateCode: row.state_code,
        stateName: row.state_name,
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

    // Fallback: get agency info from greywater_laws
    const fallbackQuery = `
      SELECT
        state_code,
        state_name,
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
        stateName: row.state_name,
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
  } catch (error) {
    console.error('Error fetching rainwater data:', error)
    return null
  }
}

async function getRainwaterIncentives(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()
    const stateJurisdictionId = `${stateCode.toUpperCase()}_STATE`

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
        AND pjl.jurisdiction_id = @jurisdictionId
        AND p.resource_type = 'rainwater'
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

  if (!stateCode) return { title: 'State Not Found' }

  const stateName = STATE_NAMES[stateCode]
  const data = await getRainwaterData(stateCode)
  const incentives = await getRainwaterIncentives(stateCode)

  const status = data?.rainwater?.legalStatus || 'legal'
  const limit = data?.rainwater?.collectionLimitGallons
  const potable = data?.rainwater?.potableUseAllowed

  return {
    title: `${stateName} Rainwater Harvesting Laws | Collection Rules & Rebates`,
    description: `Rainwater harvesting is ${status.toLowerCase()} in ${stateName}. ${limit ? `Limit: ${limit.toLocaleString()} gallons.` : 'No collection limits.'} ${potable ? 'Potable use allowed.' : 'Non-potable use.'} ${incentives.length} rebate programs.`,
    keywords: [
      `${stateName} rainwater harvesting`,
      `${stateName} rainwater collection`,
      `is rainwater harvesting legal in ${stateName}`,
      `${stateName} rain barrel`,
      `${stateName} rainwater rebates`,
      `${stateName} cistern laws`
    ].join(', '),
    openGraph: {
      title: `${stateName} Rainwater Harvesting Laws`,
      description: `Complete guide to rainwater collection rules and ${incentives.length} rebate programs in ${stateName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600

export default async function StateRainwaterPage({ params }: PageProps) {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]

  const [data, incentives] = await Promise.all([
    getRainwaterData(stateCode),
    getRainwaterIncentives(stateCode)
  ])

  return (
    <RainwaterSpokeView
      level="state"
      stateName={stateName}
      stateCode={stateCode}
      rainwater={data?.rainwater || null}
      agency={data?.agency || null}
      incentives={incentives}
    />
  )
}
