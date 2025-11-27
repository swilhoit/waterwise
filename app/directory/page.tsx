import SimpleDirectoryView from '@/components/directory/SimpleDirectoryView'
import { Metadata } from 'next'
import { getBigQueryClient } from '@/lib/bigquery'

export const metadata: Metadata = {
  title: 'Greywater Regulations by State | Find Rebates & Requirements',
  description: 'Find greywater rules and rebates for your location. Search by state and city for local permit requirements and available incentives.',
  keywords: 'greywater rebates, greywater regulations, water conservation, state greywater laws, greywater permits'
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

export default async function DirectoryPage() {
  const initialStatesData = await getStatesData()
  return <SimpleDirectoryView initialData={initialStatesData} />
}