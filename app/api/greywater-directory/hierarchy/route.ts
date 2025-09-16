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
          state_jurisdiction_id: `STATE_${row.state_code}`,
          state_name: row.state_name,
          state_code: row.state_code,
          county_count: row.county_count || 0,
          city_count: row.city_count || 0
        }));
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
        
        // Extract state code from parentId (e.g., "STATE_CA" -> "CA")
        const stateCode = parentId.startsWith('STATE_') ? parentId.substring(6) : parentId;
        
        // Query for all counties in a state
        const countyQuery = `
          SELECT DISTINCT
            county_name,
            county_jurisdiction_id,
            state_code,
            state_name,
            COUNT(DISTINCT city_name) as city_count
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.jurisdictions_master\`
          WHERE state_code = @stateCode
            AND county_name IS NOT NULL
          GROUP BY county_name, county_jurisdiction_id, state_code, state_name
          ORDER BY county_name
        `;
        
        try {
          const [countyRows] = await bigquery.query({
            query: countyQuery,
            params: { stateCode: stateCode },
            location: 'US'
          }) as any;
          
          console.log('County query returned', countyRows.length, 'rows');
          
          data = countyRows.map((row: any) => ({
          county_jurisdiction_id: row.county_jurisdiction_id || `COUNTY_${row.state_code}_${row.county_name.replace(/\s+/g, '_')}`,
          county_name: row.county_name,
          state_code: row.state_code,
          state_name: row.state_name,
          city_count: row.city_count || 0
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
        
        let cityQuery = '';
        let queryParams: any = {};
        
        if (parentType === 'county') {
          // Query for cities in a specific county
          cityQuery = `
            SELECT DISTINCT
              city_name,
              city_jurisdiction_id,
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
              city_jurisdiction_id,
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
        
        try {
          const [cityRows] = await bigquery.query({
            query: cityQuery,
            params: queryParams,
            location: 'US'
          }) as any;
          
          console.log('City query returned', cityRows.length, 'rows');
          
          data = cityRows.map((row: any) => ({
          city_jurisdiction_id: row.city_jurisdiction_id || `CITY_${row.state_code}_${row.county_name.replace(/\s+/g, '_')}_${row.city_name.replace(/\s+/g, '_')}`,
          city_name: row.city_name,
          county_name: row.county_name,
          state_code: row.state_code,
          state_name: row.state_name,
          population: row.population
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