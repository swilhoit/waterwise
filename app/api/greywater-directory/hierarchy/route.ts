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
    
    // Check cache first (temporarily disabled for debugging)
    const cacheKey = `${level}-${parentId || 'all'}-${parentType || 'none'}`;
    // const cached = hierarchyCache[cacheKey];
    // if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    //   return NextResponse.json({
    //     status: 'success',
    //     data: cached.data,
    //     cached: true
    //   });
    // }

    let data: any[] = [];
    const bigquery = getBigQueryClient();
    
    switch (level) {
      case 'states':
        // Query for all states with greywater data
        const stateQuery = `
          SELECT DISTINCT
            state_code,
            state_name,
            COUNT(DISTINCT county_name) as county_count,
            COUNT(DISTINCT city_name) as city_count
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.jurisdictions_master\`
          WHERE state_code IS NOT NULL
          GROUP BY state_code, state_name
          ORDER BY state_name
        `;
        
        try {
          const [stateRows] = await bigquery.query({
            query: stateQuery,
            location: 'US'
          }) as any;
          
          console.log('State query returned', stateRows.length, 'rows');
          
          data = stateRows.map((row: any) => ({
          state_jurisdiction_id: row.state_code,
          state_name: row.state_name,
          state_code: row.state_code,
          county_count: row.county_count || 0,
          city_count: row.city_count || 0
        }));
        } catch (queryError) {
          console.error('State query failed:', queryError);
          throw queryError;
        }
        break;

      case 'counties':
        if (!parentId) {
          return NextResponse.json({
            status: 'error',
            message: 'parentId (state_code) is required for counties'
          }, { status: 400 });
        }
        
        // Query for all counties in a state
        const countyQuery = `
          SELECT DISTINCT
            county_name,
            state_code,
            state_name,
            COUNT(DISTINCT city_name) as city_count
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.jurisdictions_master\`
          WHERE state_code = @stateCode
            AND county_name IS NOT NULL
          GROUP BY county_name, state_code, state_name
          ORDER BY county_name
        `;
        
        const [countyRows] = await bigquery.query({
          query: countyQuery,
          params: { stateCode: parentId },
          location: 'US'
        }) as any;
        
        data = countyRows.map((row: any) => ({
          county_jurisdiction_id: row.county_name,
          county_name: row.county_name,
          state_code: row.state_code,
          state_name: row.state_name,
          city_count: row.city_count || 0
        }));
        break;

      case 'cities':
        if (!parentId) {
          return NextResponse.json({
            status: 'error',
            message: 'parentId is required for cities'
          }, { status: 400 });
        }
        
        let cityQuery = '';
        let queryParams: any = {};
        
        if (parentType === 'county') {
          // Query for cities in a specific county
          cityQuery = `
            SELECT DISTINCT
              city_name,
              county_name,
              state_code,
              state_name,
              population
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.jurisdictions_master\`
            WHERE county_name = @countyName
              AND state_code = @stateCode
              AND city_name IS NOT NULL
            ORDER BY city_name
          `;
          
          // Extract state code from the request or default to CA
          const stateCode = searchParams.get('stateCode') || 'CA';
          queryParams = { 
            countyName: parentId,
            stateCode: stateCode
          };
        } else if (parentType === 'state') {
          // Query for all cities in a state
          cityQuery = `
            SELECT DISTINCT
              city_name,
              county_name,
              state_code,
              state_name,
              population
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.jurisdictions_master\`
            WHERE state_code = @stateCode
              AND city_name IS NOT NULL
            ORDER BY population DESC
            LIMIT 100
          `;
          queryParams = { stateCode: parentId };
        }
        
        const [cityRows] = await bigquery.query({
          query: cityQuery,
          params: queryParams,
          location: 'US'
        }) as any;
        
        data = cityRows.map((row: any) => ({
          city_jurisdiction_id: row.city_name,
          city_name: row.city_name,
          county_name: row.county_name,
          state_code: row.state_code,
          state_name: row.state_name,
          population: row.population
        }));
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
    
    // Cache the successful result
    hierarchyCache[cacheKey] = {
      data,
      timestamp: Date.now()
    };
    
    return NextResponse.json({
      status: 'success',
      data
    });
  } catch (error) {
    console.error('Hierarchy query error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to query hierarchy data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}