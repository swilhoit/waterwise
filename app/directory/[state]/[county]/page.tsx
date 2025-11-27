import SimpleDirectoryView from '@/components/directory/SimpleDirectoryView'
import { getStateNameFromCode } from '@/lib/state-utils'
import { Metadata } from 'next'
import { getBigQueryClient } from '@/lib/bigquery'

interface PageProps {
  params: Promise<{ state: string; county: string }>
}

function formatCountyName(county: string): string {
  return county
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, county } = await params
  const stateName = getStateNameFromCode(state)
  const countyName = formatCountyName(county)

  return {
    title: `${countyName} County, ${stateName} Greywater Regulations | Permits & Rebates`,
    description: `Find greywater rules and rebates in ${countyName} County, ${stateName}. Search cities for local requirements.`,
    keywords: `${countyName} County greywater, ${countyName} water rebates, ${stateName} ${countyName} greywater permits`
  }
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

async function getStatesData() {
  try {
    const bigquery = getBigQueryClient()

    const stateQuery = `
      SELECT
        s.state_code,
        s.state_name,
        s.jurisdiction_id,
        s.legal_status,
        COALESCE(c.county_count, 0) as county_count,
        COALESCE(c.city_count, 0) as city_count
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\` s
      LEFT JOIN (
        SELECT
          state_code,
          COUNT(DISTINCT county_jurisdiction_id) as county_count,
          COUNT(DISTINCT city_jurisdiction_id) as city_count
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\`
        GROUP BY state_code
      ) c ON s.state_code = c.state_code
      ORDER BY s.state_name
    `

    const [stateRows] = await bigquery.query({
      query: stateQuery,
      location: 'US',
      useQueryCache: true
    }) as any

    return stateRows.map((row: any) => ({
      state_jurisdiction_id: row.jurisdiction_id,
      state_name: row.state_name,
      state_code: row.state_code,
      legalStatus: row.legal_status === 'L' ? 'Legal' : row.legal_status === 'R' ? 'Regulated' : 'Varies',
      county_count: parseInt(row.county_count) || 0,
      city_count: parseInt(row.city_count) || 0
    }))
  } catch (error) {
    console.error('Error fetching states data at build time:', error)
    return []
  }
}

export default async function CountyPage({ params }: PageProps) {
  const { state, county } = await params
  const statesData = await getStatesData()
  return <SimpleDirectoryView initialState={state.toUpperCase()} initialCounty={county} initialData={statesData} />
}