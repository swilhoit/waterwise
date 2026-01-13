import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GreywaterSpokeView from '@/components/directory/GreywaterSpokeView'
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

// Helper to safely parse comma-separated string or array
function parseArrayField(value: any): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.map((s: any) => String(s).trim()).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((s: string) => s.trim()).filter(Boolean)
  return []
}

async function getGreywaterData(stateCode: string) {
  try {
    const bigquery = getBigQueryClient()

    const query = `
      SELECT
        state_code,
        state_name,
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
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
      WHERE state_code = @stateCode
      LIMIT 1
    `

    const [rows] = await bigquery.query({
      query,
      params: { stateCode: stateCode.toUpperCase() }
    }) as any

    if (!rows || rows.length === 0) return null

    const row = rows[0]

    // Map legal status codes to readable names
    let legalStatus = row.legal_status
    if (legalStatus === 'L') legalStatus = 'Legal'
    else if (legalStatus === 'R') legalStatus = 'Regulated'
    else if (!legalStatus) legalStatus = 'Varies'

    return {
      stateCode: row.state_code,
      stateName: row.state_name,
      greywater: {
        legalStatus,
        permitRequired: row.permit_required || 'Varies',
        permitThresholdGpd: row.permit_threshold_gpd,
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

async function getGreywaterIncentives(stateCode: string) {
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
        AND (p.resource_type = 'greywater' OR p.resource_type IS NULL)
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
  const data = await getGreywaterData(stateCode)
  const incentives = await getGreywaterIncentives(stateCode)

  const status = data?.greywater?.legalStatus || 'varies'
  const permitInfo = data?.greywater?.permitRequired || 'varies by system size'
  const threshold = data?.greywater?.permitThresholdGpd

  return {
    title: `${stateName} Greywater Laws & Permits | Is Greywater Legal?`,
    description: `Greywater is ${status.toLowerCase()} in ${stateName}. Permit: ${permitInfo}${threshold ? `. No permit needed under ${threshold} GPD` : ''}. ${incentives.length} rebate programs available. Complete regulations guide.`,
    keywords: [
      `${stateName} greywater laws`,
      `${stateName} greywater permit`,
      `is greywater legal in ${stateName}`,
      `${stateName} greywater regulations`,
      `${stateName} greywater rebates`,
      `${stateName} laundry to landscape`
    ].join(', '),
    openGraph: {
      title: `${stateName} Greywater Laws & Regulations`,
      description: `Complete guide to greywater permits, regulations, and ${incentives.length} rebate programs in ${stateName}.`,
      type: 'website'
    }
  }
}

export const revalidate = 3600

export default async function StateGreywaterPage({ params }: PageProps) {
  const { state } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]

  const [data, incentives] = await Promise.all([
    getGreywaterData(stateCode),
    getGreywaterIncentives(stateCode)
  ])

  return (
    <GreywaterSpokeView
      level="state"
      stateName={stateName}
      stateCode={stateCode}
      greywater={data?.greywater || null}
      agency={data?.agency || null}
      incentives={incentives}
    />
  )
}
