import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

// Cache for hierarchy data to reduce BigQuery calls
let hierarchyCache: { [key: string]: { data: any[], timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
        // Query all states from greywater_laws table
        const stateQuery = `
          SELECT
            state_code,
            state_name,
            jurisdiction_id,
            legal_status
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
          ORDER BY state_name
        `;

        try {
          const [stateRows] = await bigquery.query({
            query: stateQuery,
            location: 'US'
          }) as any;

          console.log('BigQuery returned', stateRows.length, 'states from greywater_laws table');

          // Check which states have active programs
          const programQuery = `
            SELECT DISTINCT
              SPLIT(jurisdiction_id, '_')[OFFSET(0)] as state_code
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\`
            WHERE LENGTH(SPLIT(jurisdiction_id, '_')[OFFSET(0)]) = 2
              AND REGEXP_CONTAINS(SPLIT(jurisdiction_id, '_')[OFFSET(0)], r'^[A-Z]{2}$')
          `;

          let statesWithPrograms = new Set<string>();
          try {
            const [programRows] = await bigquery.query({
              query: programQuery,
              location: 'US'
            }) as any;

            statesWithPrograms = new Set(programRows.map((row: any) => row.state_code));
            console.log('States with programs:', statesWithPrograms.size);
          } catch (error) {
            console.error('Error querying programs:', error);
          }

          // Query to count counties and cities per state
          const countsQuery = `
            SELECT
              SPLIT(jurisdiction_id, '_')[OFFSET(0)] as state_code,
              COUNTIF(jurisdiction_id LIKE '%_COUNTY_%') as county_count,
              COUNTIF(jurisdiction_id LIKE '%_CITY_%') as city_count
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\`
            WHERE LENGTH(SPLIT(jurisdiction_id, '_')[OFFSET(0)]) = 2
              AND REGEXP_CONTAINS(SPLIT(jurisdiction_id, '_')[OFFSET(0)], r'^[A-Z]{2}$')
            GROUP BY state_code
          `;

          let stateCounts = new Map<string, {county_count: number, city_count: number}>();
          try {
            const [countRows] = await bigquery.query({
              query: countsQuery,
              location: 'US'
            }) as any;

            countRows.forEach((row: any) => {
              stateCounts.set(row.state_code, {
                county_count: parseInt(row.county_count) || 0,
                city_count: parseInt(row.city_count) || 0
              });
            });
            console.log('State counts calculated for', stateCounts.size, 'states');
          } catch (error) {
            console.error('Error querying state counts:', error);
          }

          data = stateRows.map((row: any) => {
            const counts = stateCounts.get(row.state_code) || { county_count: 0, city_count: 0 };
            return {
              state_jurisdiction_id: row.jurisdiction_id,
              state_name: row.state_name,
              state_code: row.state_code,
              legal_status: row.legal_status,
              county_count: counts.county_count,
              city_count: counts.city_count,
              has_programs: statesWithPrograms.has(row.state_code)
            };
          });

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
        const countyQuery = `
          SELECT DISTINCT
            m.county_jurisdiction_id,
            m.county_name,
            COUNT(DISTINCT m.city_jurisdiction_id) as city_count,
            COUNT(DISTINCT CASE WHEN p.jurisdiction_id IS NOT NULL THEN m.city_jurisdiction_id END) as cities_with_programs
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\` m
          LEFT JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` p
            ON m.city_jurisdiction_id = p.jurisdiction_id
          WHERE m.state_code = '${stateCode}'
          GROUP BY m.county_jurisdiction_id, m.county_name
          ORDER BY m.county_name
        `;

        try {
          const [countyRows] = await bigquery.query({
            query: countyQuery,
            location: 'US'
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
              cities_with_programs: parseInt(row.cities_with_programs) || 0
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
          // Show ALL cities in the county, not just those with programs
          cityQuery = `
            SELECT DISTINCT
              m.city_jurisdiction_id,
              m.city_name,
              m.county_name,
              m.state_code,
              CASE WHEN p.jurisdiction_id IS NOT NULL THEN TRUE ELSE FALSE END as has_programs
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\` m
            LEFT JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` p
              ON m.city_jurisdiction_id = p.jurisdiction_id
            WHERE m.county_jurisdiction_id = '${parentId}'
            ORDER BY m.city_name
          `;
        } else if (isStateParent) {
          // Query all cities in a state
          // Show cities with programs, and optionally add all other cities
          const cityStateCode = parentId.replace('_STATE', '');
          cityQuery = `
            SELECT DISTINCT
              m.city_jurisdiction_id,
              m.city_name,
              m.county_name,
              m.state_code,
              CASE WHEN p.jurisdiction_id IS NOT NULL THEN TRUE ELSE FALSE END as has_programs
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\` m
            LEFT JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` p
              ON m.city_jurisdiction_id = p.jurisdiction_id
            WHERE m.state_code = '${cityStateCode}'
            ORDER BY has_programs DESC, m.city_name
            LIMIT 100
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
            location: 'US'
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
    
    return NextResponse.json({
      status: 'success',
      data
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
      error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : 'Unknown error'
    }, { status: 500 });
  }
}