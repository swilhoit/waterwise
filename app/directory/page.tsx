import DirectoryView from '@/components/directory/DirectoryView'
import { Metadata } from 'next'
import { getBigQueryClient } from '@/lib/bigquery'

export const metadata: Metadata = {
  title: 'Water Conservation Programs by State | Greywater & Rainwater Rebates Directory',
  description: 'Find greywater, rainwater harvesting, and water conservation rebates, grants, and programs across all 50 US states. Search by state, county, or city for local incentives.',
  keywords: 'greywater rebates, rainwater harvesting grants, water conservation programs, state water rebates, water efficiency incentives'
}

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

async function getStatesData() {
  try {
    const bigquery = getBigQueryClient()

    // Optimized query: JOIN states with counts in a single query
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
      legal_status: row.legal_status,
      county_count: parseInt(row.county_count) || 0,
      city_count: parseInt(row.city_count) || 0,
      has_programs: false
    }))
  } catch (error) {
    console.error('Error fetching states data at build time:', error)
    return [] // Return empty array on error, component will fetch from API
  }
}

export default async function DirectoryPage() {
  // Fetch states data at build time
  const initialStatesData = await getStatesData()

  return <DirectoryView level="states" initialData={initialStatesData} />
}