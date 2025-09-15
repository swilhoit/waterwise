import { NextResponse } from 'next/server';
import { greywater } from '@/lib/bigquery';

export async function GET() {
  try {
    // First, let's get all tables in the dataset
    const tablesQuery = `
      SELECT table_name, table_type
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.INFORMATION_SCHEMA.TABLES\`
      ORDER BY table_name
    `;
    
    let tables;
    try {
      tables = await greywater.query(tablesQuery);
    } catch (error) {
      // If INFORMATION_SCHEMA doesn't work, try a different approach
      const dataset = greywater.getDataset();
      const [allTables] = await dataset.getTables();
      tables = allTables.map(table => ({ table_name: table.id }));
    }

    // Look for tables related to locations/policies
    const locationTables = tables.filter((t: any) => 
      t.table_name.toLowerCase().includes('state') ||
      t.table_name.toLowerCase().includes('county') ||
      t.table_name.toLowerCase().includes('city') ||
      t.table_name.toLowerCase().includes('water') ||
      t.table_name.toLowerCase().includes('district') ||
      t.table_name.toLowerCase().includes('policy') ||
      t.table_name.toLowerCase().includes('incentive') ||
      t.table_name.toLowerCase().includes('compliance') ||
      t.table_name.toLowerCase().includes('location')
    );

    // Get schema for each relevant table
    const tableSchemas = await Promise.all(
      locationTables.map(async (table: any) => {
        try {
          const schemaQuery = `
            SELECT column_name, data_type, is_nullable, column_default
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.INFORMATION_SCHEMA.COLUMNS\`
            WHERE table_name = @tableName
            ORDER BY ordinal_position
          `;
          
          let schema;
          try {
            schema = await greywater.query(schemaQuery, [table.table_name]);
          } catch {
            // Fallback to metadata approach
            const metadata = await greywater.getTableMetadata(table.table_name);
            schema = metadata.schema?.fields?.map((field: any) => ({
              column_name: field.name,
              data_type: field.type,
              is_nullable: field.mode !== 'REQUIRED',
            }));
          }

          // Get sample data
          const sampleQuery = `
            SELECT *
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.${table.table_name}\`
            LIMIT 5
          `;
          
          const sampleData = await greywater.query(sampleQuery);

          return {
            table_name: table.table_name,
            schema,
            sample_data: sampleData,
            row_count: sampleData.length
          };
        } catch (error) {
          console.error(`Error getting schema for ${table.table_name}:`, error);
          return {
            table_name: table.table_name,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    // Try to understand the hierarchical structure
    const hierarchyQuery = `
      -- Find relationships between location tables
      SELECT 
        'Check for state->county->city hierarchy' as analysis_type,
        COUNT(*) as record_count
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.INFORMATION_SCHEMA.TABLES\`
      WHERE table_name IN ('states', 'counties', 'cities', 'water_districts')
    `;

    let hierarchyInfo;
    try {
      hierarchyInfo = await greywater.query(hierarchyQuery);
    } catch (error) {
      hierarchyInfo = { error: 'Could not analyze hierarchy' };
    }

    return NextResponse.json({
      status: 'success',
      dataset: process.env.BIGQUERY_DATASET,
      project: process.env.GOOGLE_CLOUD_PROJECT_ID,
      all_tables: tables,
      location_tables: locationTables,
      table_schemas: tableSchemas,
      hierarchy_analysis: hierarchyInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('BigQuery exploration error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to explore BigQuery structure',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Query specific hierarchical data
export async function POST(request: Request) {
  try {
    const { level, parentId, parentType } = await request.json();

    let query = '';
    let params: any[] = [];

    // Build query based on hierarchy level
    switch (level) {
      case 'states':
        query = `
          SELECT DISTINCT
            state_id,
            state_name,
            state_code,
            has_greywater_policy,
            policy_summary,
            incentives_available,
            last_updated
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.states\`
          ORDER BY state_name
        `;
        break;

      case 'counties':
        query = `
          SELECT DISTINCT
            county_id,
            county_name,
            state_id,
            has_local_policy,
            policy_details,
            water_districts_count
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.counties\`
          WHERE state_id = @stateId
          ORDER BY county_name
        `;
        params = [parentId];
        break;

      case 'cities':
        query = `
          SELECT DISTINCT
            city_id,
            city_name,
            county_id,
            state_id,
            population,
            has_local_ordinance,
            permit_required,
            incentive_programs
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.cities\`
          WHERE ${parentType === 'county' ? 'county_id' : 'state_id'} = @parentId
          ORDER BY city_name
        `;
        params = [parentId];
        break;

      case 'water_districts':
        query = `
          SELECT DISTINCT
            district_id,
            district_name,
            coverage_area,
            rebate_programs,
            greywater_guidelines,
            contact_info
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_DATASET}.water_districts\`
          WHERE ${parentType === 'city' ? 'city_id' : parentType === 'county' ? 'county_id' : 'state_id'} = @parentId
          ORDER BY district_name
        `;
        params = [parentId];
        break;

      default:
        return NextResponse.json({
          status: 'error',
          message: 'Invalid hierarchy level'
        }, { status: 400 });
    }

    const results = await greywater.query(query, params);

    return NextResponse.json({
      status: 'success',
      level,
      parentId,
      data: results,
      count: results.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Hierarchy query error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to query hierarchical data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}