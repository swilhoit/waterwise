import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GreywaterSpokeView from '@/components/directory/GreywaterSpokeView'
import { getBigQueryClient } from '@/lib/bigquery'
import { STATE_NAMES, STATE_CODES } from '@/lib/state-utils'
import { getLocalRegulations } from '@/lib/directory-data'

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

// Fetch city-specific permit details
async function getCityPermitDetails(stateCode: string, cityName: string) {
  try {
    const bigquery = getBigQueryClient()

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
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_permit_details\`
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
    }) as any

    if (!rows || rows.length === 0) return null

    const row = rows[0]
    // Serialize BigQuery date objects to strings for client component compatibility
    if (row.data_verified_date?.value) {
      row.data_verified_date = row.data_verified_date.value
    }
    return row
  } catch (error) {
    console.error('Error fetching city permit details:', error)
    return null
  }
}

async function getGreywaterIncentives(stateCode: string, cityName: string, countyName: string | null) {
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
          AND (p.resource_type = 'greywater' OR p.resource_type IS NULL)
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

  const data = await getGreywaterData(stateCode)
  const incentives = await getGreywaterIncentives(stateCode, cityName, cityInfo.county_name)

  const status = data?.greywater?.legalStatus || 'varies'
  const permitInfo = data?.greywater?.permitRequired || 'varies'
  const threshold = data?.greywater?.permitThresholdGpd

  return {
    title: `${cityName}, ${stateCode} Greywater Laws & Permits | Is Greywater Legal?`,
    description: `Greywater is ${status.toLowerCase()} in ${cityName}, ${stateName}. Permit: ${permitInfo}${threshold ? `. No permit under ${threshold} GPD` : ''}. ${incentives.length} rebate programs. Complete local regulations guide.`,
    keywords: [
      `${cityName} greywater`,
      `${cityName} greywater laws`,
      `${cityName} greywater permit`,
      `is greywater legal in ${cityName}`,
      `${cityName} laundry to landscape`,
      `${cityName} greywater rebates`
    ].join(', '),
    openGraph: {
      title: `${cityName} Greywater Laws & Permits`,
      description: `Greywater regulations and ${incentives.length} rebate programs in ${cityName}, ${stateName}.`
    }
  }
}

export const revalidate = 3600

export default async function CityGreywaterPage({ params }: PageProps) {
  const { state, city } = await params
  const stateCode = getStateCodeFromSlug(state)

  if (!stateCode) notFound()

  const stateName = STATE_NAMES[stateCode]
  const cityInfo = await getCityInfo(stateCode, city)
  const cityName = cityInfo.city_name

  const [data, incentives, localRegs, permitDetails] = await Promise.all([
    getGreywaterData(stateCode),
    getGreywaterIncentives(stateCode, cityName, cityInfo.county_name),
    getLocalRegulations(stateCode, cityName, cityInfo.county_name),
    getCityPermitDetails(stateCode, cityName)
  ])

  return (
    <GreywaterSpokeView
      level="city"
      stateName={stateName}
      stateCode={stateCode}
      cityName={cityName}
      countyName={cityInfo.county_name}
      greywater={data?.greywater || null}
      agency={data?.agency || null}
      incentives={incentives}
      preplumbing={localRegs?.preplumbing || null}
      permitDetails={permitDetails}
    />
  )
}
