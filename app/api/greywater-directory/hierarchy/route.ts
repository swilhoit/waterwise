import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

// Cache for hierarchy data to reduce BigQuery calls
let hierarchyCache: { [key: string]: { data: any[], timestamp: number } } = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour (states/counties don't change often)

// GET hierarchy data from BigQuery only - no fallback data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const level = searchParams.get('level') || 'states';
    const parentId = searchParams.get('parentId');
    const parentType = searchParams.get('parentType');
    
    // Check cache first
    const cacheKey = `${level}-${parentId || 'all'}-${parentType || 'none'}`;
    const cached = hierarchyCache[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION && cached.data.length > 0) {
      return NextResponse.json({
        status: 'success',
        data: cached.data,
        cached: true
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        }
      });
    }

    let data: any[] = [];
    let bigquery;
    try {
      bigquery = getBigQueryClient();
      console.log('BigQuery client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize BigQuery client:', error);
      return NextResponse.json({
        status: 'error',
        message: 'Failed to initialize BigQuery client',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    // Map state codes to full names
    const stateNames: {[key: string]: string} = {
      'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
      'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
      'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
      'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
      'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
      'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
      'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
      'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
      'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
      'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
      'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
      'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
      'WI': 'Wisconsin', 'WY': 'Wyoming'
    };

    switch (level) {
      case 'states':
        // Optimized query: JOIN states with counts in a single query
        // Filter by resource_type='greywater' to avoid duplicates (table has rows for greywater and rainwater)
        const stateQuery = `
          SELECT
            s.state_code,
            s.state_name,
            s.jurisdiction_id,
            s.legal_status,
            COALESCE(c.county_count, 0) as county_count,
            COALESCE(c.city_count, 0) as city_count,
            COALESCE(p.program_count, 0) as program_count
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\` s
          LEFT JOIN (
            SELECT
              state_code,
              COUNT(DISTINCT county_jurisdiction_id) as county_count,
              COUNT(DISTINCT city_jurisdiction_id) as city_count
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\`
            GROUP BY state_code
          ) c ON s.state_code = c.state_code
          LEFT JOIN (
            SELECT
              SUBSTR(jurisdiction_id, 1, 2) as state_code,
              COUNT(DISTINCT program_id) as program_count
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\`
            GROUP BY SUBSTR(jurisdiction_id, 1, 2)
          ) p ON s.state_code = p.state_code
          WHERE s.resource_type = 'greywater'
          ORDER BY s.state_name
        `;

        try {
          const [stateRows] = await bigquery.query({
            query: stateQuery,
            location: 'US',
            useQueryCache: true // Enable BigQuery query caching
          }) as any;

          console.log('BigQuery returned', stateRows.length, 'states (optimized single query)');

          data = stateRows.map((row: any) => ({
            state_jurisdiction_id: row.jurisdiction_id,
            state_name: row.state_name,
            state_code: row.state_code,
            legal_status: row.legal_status,
            county_count: parseInt(row.county_count) || 0,
            city_count: parseInt(row.city_count) || 0,
            has_programs: (parseInt(row.program_count) || 0) > 0,
            program_count: parseInt(row.program_count) || 0
          }));

          console.log('Returning all', data.length, 'states from directory');
        } catch (error) {
          console.error('Error executing state query:', error);
          throw new Error('Failed to fetch state data from BigQuery');
        }
        break;

      case 'counties':
        if (!parentId) {
          return NextResponse.json({
            status: 'error',
            message: 'parentId (state_code) is required for counties'
          }, { status: 400 });
        }

        // Extract state code from parentId (e.g., "CA_STATE" -> "CA")
        const stateCode = parentId.replace('_STATE', '');

        // Query for ALL counties in a state from the city_county_mapping table
        // Also join with program_jurisdiction_link to get program counts
        const countyQuery = `
          SELECT
            m.county_jurisdiction_id,
            m.county_name,
            COUNT(DISTINCT m.city_jurisdiction_id) as city_count,
            COALESCE(p.program_count, 0) as program_count
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\` m
          LEFT JOIN (
            SELECT
              jurisdiction_id,
              COUNT(DISTINCT program_id) as program_count
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\`
            GROUP BY jurisdiction_id
          ) p ON m.county_jurisdiction_id = p.jurisdiction_id
          WHERE m.state_code = '${stateCode}'
          GROUP BY m.county_jurisdiction_id, m.county_name, p.program_count
          ORDER BY m.county_name
        `;

        try {
          const [countyRows] = await bigquery.query({
            query: countyQuery,
            location: 'US',
            useQueryCache: true // Enable BigQuery query caching
          }) as any;

          console.log('County query returned', countyRows.length, 'rows');

          data = countyRows
            .filter((row: any) => row.county_name)
            .map((row: any) => ({
              county_jurisdiction_id: row.county_jurisdiction_id,
              county_name: row.county_name,
              state_code: stateCode,
              state_name: stateNames[stateCode] || stateCode,
              city_count: parseInt(row.city_count) || 0,
              has_programs: (parseInt(row.program_count) || 0) > 0,
              program_count: parseInt(row.program_count) || 0
            }));
        } catch (error) {
          console.error('Error executing county query:', error);
          throw new Error('Failed to fetch county data from BigQuery');
        }
        break;

      case 'cities':
        if (!parentId) {
          return NextResponse.json({
            status: 'error',
            message: 'parentId is required for cities'
          }, { status: 400 });
        }

        // Determine if parent is a state or county based on parentId format
        const isCountyParent = parentId.includes('_COUNTY_');
        const isStateParent = parentId.includes('_STATE') || parentType === 'state';

        let cityQuery = '';

        if (isCountyParent) {
          // Query cities for a specific county using the mapping table
          // Show ALL cities in the county
          cityQuery = `
            SELECT DISTINCT
              m.city_jurisdiction_id,
              m.city_name,
              m.county_name,
              m.state_code
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\` m
            WHERE m.county_jurisdiction_id = '${parentId}'
            ORDER BY m.city_name
          `;
        } else if (isStateParent) {
          // Query all cities in a state
          // Handle both STATE_CA and CA_STATE formats
          let cityStateCode = parentId;
          if (parentId.startsWith('STATE_')) {
            cityStateCode = parentId.replace('STATE_', '');
          } else if (parentId.endsWith('_STATE')) {
            cityStateCode = parentId.replace('_STATE', '');
          }
          cityQuery = `
            SELECT DISTINCT
              m.city_jurisdiction_id,
              m.city_name,
              m.county_name,
              m.state_code
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\` m
            WHERE m.state_code = '${cityStateCode}'
            ORDER BY m.city_name
          `;
        } else {
          return NextResponse.json({
            status: 'error',
            message: 'Invalid parentId format for cities query'
          }, { status: 400 });
        }

        try {
          const [cityRows] = await bigquery.query({
            query: cityQuery,
            location: 'US',
            useQueryCache: true // Enable BigQuery query caching
          }) as any;

          console.log('City query returned', cityRows.length, 'rows for parent:', parentId);

          data = cityRows.map((row: any) => ({
            city_jurisdiction_id: row.city_jurisdiction_id,
            city_name: row.city_name,
            county_name: row.county_name,
            state_code: row.state_code,
            state_name: stateNames[row.state_code] || row.state_code,
            population: null
          }));
        } catch (error) {
          console.error('Error executing city query:', error);
          throw new Error('Failed to fetch city data from BigQuery');
        }
        break;

      case 'water_districts':
        // Return empty for water districts for now
        data = [];
        break;

      default:
        return NextResponse.json({
          status: 'error',
          message: 'Invalid level parameter'
        }, { status: 400 });
    }
    
    // Cache the successful result only if we have data
    if (data.length > 0) {
      hierarchyCache[cacheKey] = {
        data,
        timestamp: Date.now()
      };
    }

    // Return with cache headers for CDN/browser caching
    return NextResponse.json({
      status: 'success',
      data
    }, {
      headers: {
        // Cache for 1 hour in browser/CDN, revalidate in background
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    });
  } catch (error) {
    console.error('Hierarchy API Error:', error);
    
    let errorMessage = 'Failed to query hierarchy data';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({
      status: 'error',
      message: errorMessage,
      error: process.env.NODE_ENV === 'development'
        ? (error instanceof Error ? { name: error.name, message: error.message } : 'Unknown error')
        : 'An internal error occurred'
    }, { status: 500 });
  }
}