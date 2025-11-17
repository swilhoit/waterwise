import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

/**
 * GET /api/greywater-directory/hierarchy
 * 
 * Fetches hierarchical greywater compliance data from BigQuery
 * 
 * Query parameters:
 * - level: 'states' | 'counties' | 'cities'
 * - parentId: ID of parent jurisdiction (required for counties and cities)
 * - parentType: 'state' | 'county' (optional hint for parsing parentId)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const level = searchParams.get('level');
    const parentId = searchParams.get('parentId');
    const parentType = searchParams.get('parentType');

    console.log(`[Hierarchy API] Request: level=${level}, parentId=${parentId}, parentType=${parentType}`);

    // Validate required parameters
    if (!level) {
      return NextResponse.json({ 
        error: 'Missing required parameter: level',
        usage: 'Valid levels are: states, counties, cities'
      }, { status: 400 });
    }

    const bigquery = getBigQueryClient();
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const datasetId = 'greywater_compliance';
    
    let data: any[] = [];

    switch (level.toLowerCase()) {
      case 'states':
        const statesQuery = `
          SELECT
            j.jurisdiction_id,
            j.state_code,
            j.state_name,
            j.population,
            j.website,
            j.contact_phone,
            j.contact_email,
            -- Count counties
            (SELECT COUNT(DISTINCT county_name)
             FROM \`${projectId}.${datasetId}.jurisdictions_master\`
             WHERE state_code = j.state_code AND jurisdiction_type = 'county') as county_count,
            -- Count cities
            (SELECT COUNT(*)
             FROM \`${projectId}.${datasetId}.jurisdictions_master\`
             WHERE state_code = j.state_code AND jurisdiction_type = 'city') as city_count,
            -- State regulations
            STRING_AGG(DISTINCT r.regulation_name, '; ') as state_regulations,
            STRING_AGG(DISTINCT r.system_allowance, ', ') as state_allowance,
            -- Count active programs
            (SELECT COUNT(DISTINCT prog.program_id)
             FROM \`${projectId}.${datasetId}.program_jurisdiction_link\` pjl
             JOIN \`${projectId}.${datasetId}.incentive_programs\` prog
               ON pjl.program_id = prog.program_id
             WHERE pjl.jurisdiction_id = j.jurisdiction_id
               AND prog.program_status = 'active') as active_program_count
          FROM \`${projectId}.${datasetId}.jurisdictions_master\` j
          LEFT JOIN \`${projectId}.${datasetId}.regulations_master\` r
            ON j.jurisdiction_id = r.jurisdiction_id
          WHERE j.jurisdiction_type = 'state'
          GROUP BY
            j.jurisdiction_id, j.state_code, j.state_name, j.population,
            j.website, j.contact_phone, j.contact_email
          ORDER BY j.state_name
        `;

        try {
          const [rows] = await bigquery.query({
            query: statesQuery,
            location: 'US'
          });
          data = rows;
          console.log(`[Hierarchy API] States query returned ${data.length} results`);
        } catch (error) {
          console.error('[Hierarchy API] States query error:', error);
          throw error;
        }
        break;

      case 'counties':
        if (!parentId) {
          return NextResponse.json({ 
            error: 'Missing required parameter: parentId',
            usage: 'For counties level, provide parentId (e.g., CA_STATE or CA)'
          }, { status: 400 });
        }

        // Extract state code from parentId (e.g., "CA_STATE" -> "CA")
        const stateCodeForCounties = parentId.replace('_STATE', '').substring(0, 2);
        
        const countiesQuery = `
          WITH county_cities AS (
            SELECT
              county_name,
              COUNT(DISTINCT city_name) as city_count,
              SUM(population) as total_population
            FROM \`${projectId}.${datasetId}.jurisdictions_master\`
            WHERE state_code = @stateCode
              AND jurisdiction_type = 'city'
              AND population > 0
            GROUP BY county_name
          )
          SELECT
            j.jurisdiction_id,
            j.jurisdiction_name,
            j.county_name,
            j.state_code,
            j.state_name,
            j.population,
            j.website,
            j.contact_phone,
            j.contact_email,
            COALESCE(cc.city_count, 0) as city_count,
            COALESCE(cc.total_population, 0) as total_city_population,
            -- County-specific regulations (LOCAL only, not state)
            STRING_AGG(DISTINCT
              CASE WHEN r.regulation_type IN ('county_ordinance', 'local_ordinance')
              THEN r.regulation_name END, '; ') as local_regulations,
            STRING_AGG(DISTINCT
              CASE WHEN r.regulation_type IN ('county_ordinance', 'local_ordinance')
              THEN r.system_allowance END, ', ') as county_allowance,
            -- Permit data
            MIN(p.base_fee) as base_permit_fee,
            MIN(p.processing_time_days) as processing_time_days,
            STRING_AGG(DISTINCT p.application_url, '; ') as application_url,
            -- Count of active incentive programs
            (SELECT COUNT(DISTINCT prog.program_id)
             FROM \`${projectId}.${datasetId}.program_jurisdiction_link\` pjl
             JOIN \`${projectId}.${datasetId}.jurisdictions_master\` j2
               ON pjl.jurisdiction_id = j2.jurisdiction_id
             JOIN \`${projectId}.${datasetId}.incentive_programs\` prog
               ON pjl.program_id = prog.program_id
             WHERE (pjl.jurisdiction_id = j.jurisdiction_id
                    OR (j2.county_name = j.county_name AND j2.jurisdiction_type IN ('water_district', 'county')))
               AND prog.program_status = 'active') as active_program_count
          FROM \`${projectId}.${datasetId}.jurisdictions_master\` j
          LEFT JOIN county_cities cc ON j.county_name = cc.county_name
          LEFT JOIN \`${projectId}.${datasetId}.regulations_master\` r
            ON j.jurisdiction_id = r.jurisdiction_id
          LEFT JOIN \`${projectId}.${datasetId}.permits_master\` p
            ON j.jurisdiction_id = p.jurisdiction_id
          WHERE j.state_code = @stateCode
            AND j.jurisdiction_type = 'county'
          GROUP BY 
            j.jurisdiction_id, j.jurisdiction_name, j.county_name,
            j.state_code, j.state_name, j.population, j.website,
            j.contact_phone, j.contact_email, cc.city_count, cc.total_population
          ORDER BY j.county_name
        `;

        try {
          const [rows] = await bigquery.query({
            query: countiesQuery,
            params: { stateCode: stateCodeForCounties },
            location: 'US'
          });
          data = rows;
          console.log(`[Hierarchy API] Counties query for ${stateCodeForCounties} returned ${data.length} results`);
        } catch (error) {
          console.error('[Hierarchy API] Counties query error:', error);
          throw error;
        }
        break;

      case 'cities':
        if (!parentId) {
          return NextResponse.json({ 
            error: 'Missing required parameter: parentId',
            usage: 'For cities level, provide parentId (state code or county ID)'
          }, { status: 400 });
        }

        // Determine if parentId is a state or county
        let stateCodeForCities: string;
        let countyName: string | null = null;
        
        if (parentType === 'state' || parentId.includes('_STATE')) {
          // Parent is a state
          stateCodeForCities = parentId.replace('_STATE', '').substring(0, 2);
        } else {
          // Parent might be a county ID (e.g., "CA_COUNTY_LOS_ANGELES")
          const parts = parentId.split('_');
          if (parts.length >= 3 && parts[1] === 'COUNTY') {
            stateCodeForCities = parts[0];
            countyName = parts.slice(2).join(' ');
          } else {
            // Assume it's a state code
            stateCodeForCities = parentId.substring(0, 2);
          }
        }
        
        const citiesQuery = `
          SELECT
            j.jurisdiction_id,
            j.city_name,
            j.county_name,
            j.state_code,
            j.state_name,
            j.population,
            j.website,
            j.contact_phone,
            j.contact_email,
            -- Only LOCAL city regulations (not county/state inherited)
            STRING_AGG(DISTINCT
              CASE WHEN r.regulation_type IN ('municipal_code', 'city_ordinance')
              THEN r.regulation_name END, '; ') as local_city_regulations,
            STRING_AGG(DISTINCT
              CASE WHEN r.regulation_type IN ('municipal_code', 'city_ordinance')
              THEN r.system_allowance END, ', ') as city_allowance,
            STRING_AGG(DISTINCT
              CASE WHEN r.regulation_type IN ('municipal_code', 'city_ordinance')
              THEN r.use_restrictions END, '; ') as city_use_restrictions,
            -- Permit info (city-specific)
            MIN(p.base_fee) as city_permit_fee,
            MIN(p.processing_time_days) as processing_days,
            MAX(r.professional_installation_required) as pro_required,
            -- Incentives
            (SELECT STRING_AGG(DISTINCT prog.program_name, '; ')
             FROM \`${projectId}.${datasetId}.program_jurisdiction_link\` pjl
             JOIN \`${projectId}.${datasetId}.incentive_programs\` prog
               ON pjl.program_id = prog.program_id
             WHERE pjl.jurisdiction_id = j.jurisdiction_id
               AND prog.program_status = 'active') as incentives,
            -- Count of active programs
            (SELECT COUNT(DISTINCT prog.program_id)
             FROM \`${projectId}.${datasetId}.program_jurisdiction_link\` pjl
             JOIN \`${projectId}.${datasetId}.incentive_programs\` prog
               ON pjl.program_id = prog.program_id
             WHERE pjl.jurisdiction_id = j.jurisdiction_id
               AND prog.program_status = 'active') as active_program_count,
            -- Flag: does city have LOCAL regulations different from county?
            MAX(CASE WHEN r.regulation_type IN ('municipal_code', 'city_ordinance') THEN 1 ELSE 0 END) as has_local_rules
          FROM \`${projectId}.${datasetId}.jurisdictions_master\` j
          LEFT JOIN \`${projectId}.${datasetId}.regulations_master\` r
            ON j.jurisdiction_id = r.jurisdiction_id
          LEFT JOIN \`${projectId}.${datasetId}.permits_master\` p
            ON j.jurisdiction_id = p.jurisdiction_id
          WHERE j.state_code = @stateCode
            AND j.jurisdiction_type = 'city'
            ${countyName ? 'AND j.county_name = @countyName' : ''}
          GROUP BY
            j.jurisdiction_id, j.city_name, j.county_name,
            j.state_code, j.state_name, j.population, j.website,
            j.contact_phone, j.contact_email
          ORDER BY j.population DESC, j.city_name
        `;

        const citiesParams: any = { stateCode: stateCodeForCities };
        if (countyName) {
          citiesParams.countyName = countyName;
        }

        try {
          const [rows] = await bigquery.query({
            query: citiesQuery,
            params: citiesParams,
            location: 'US'
          });
          data = rows;
          console.log(`[Hierarchy API] Cities query for ${stateCodeForCities}${countyName ? `/${countyName}` : ''} returned ${data.length} results`);
        } catch (error) {
          console.error('[Hierarchy API] Cities query error:', error);
          throw error;
        }
        break;

      default:
        return NextResponse.json({ 
          error: `Invalid level: ${level}`,
          usage: 'Valid levels are: states, counties, cities'
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      level,
      parentId,
      count: data.length,
      data
    });

  } catch (error) {
    console.error('[Hierarchy API] Error:', error);
    
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
