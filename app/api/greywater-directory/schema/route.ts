import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

export async function GET() {
  try {
    const bigquery = new BigQuery({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    // Key tables for hierarchical structure
    const keyTables = [
      { dataset: 'greywater_compliance', table: 'complete_jurisdiction_hierarchy' },
      { dataset: 'greywater_compliance', table: 'jurisdiction_hierarchy_complete' },
      { dataset: 'greywater_compliance', table: 'jurisdictions_master' },
      { dataset: 'greywater_compliance', table: 'state_level_data' },
      { dataset: 'greywater_compliance', table: 'county_level_data' },
      { dataset: 'greywater_compliance', table: 'water_district_data' },
      { dataset: 'geography', table: 'cities' },
      { dataset: 'geography', table: 'counties' },
      { dataset: 'geography', table: 'water_districts' },
      { dataset: 'geography', table: 'city_county_mapping' },
      { dataset: 'greywater_compliance', table: 'incentives_master' },
      { dataset: 'greywater_compliance', table: 'permits_master' },
      { dataset: 'greywater_compliance', table: 'regulations_master' }
    ];

    const tableInfo = await Promise.all(
      keyTables.map(async ({ dataset, table }) => {
        try {
          // Get table metadata
          const tableRef = bigquery.dataset(dataset).table(table);
          const [metadata] = await tableRef.getMetadata();
          
          // Get sample data
          const query = `
            SELECT *
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${dataset}.${table}\`
            LIMIT 3
          `;
          const [rows] = await bigquery.query(query);

          // Get row count
          const countQuery = `
            SELECT COUNT(*) as total
            FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.${dataset}.${table}\`
          `;
          const [countResult] = await bigquery.query(countQuery);

          return {
            dataset,
            table,
            schema: metadata.schema?.fields?.map((field: any) => ({
              name: field.name,
              type: field.type,
              mode: field.mode || 'NULLABLE',
              description: field.description
            })),
            sampleData: rows,
            rowCount: countResult[0]?.total || 0,
            description: metadata.description
          };
        } catch (error) {
          return {
            dataset,
            table,
            error: error instanceof Error ? error.message : 'Failed to get table info'
          };
        }
      })
    );

    // Analyze hierarchy relationships
    const hierarchyQuery = `
      WITH hierarchy_check AS (
        SELECT 
          'complete_jurisdiction_hierarchy' as source_table,
          COUNT(DISTINCT state_name) as states,
          COUNT(DISTINCT county_name) as counties,
          COUNT(DISTINCT city_name) as cities,
          COUNT(DISTINCT water_district) as water_districts
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.complete_jurisdiction_hierarchy\`
      )
      SELECT * FROM hierarchy_check
    `;

    let hierarchyStats;
    try {
      const [hierarchyRows] = await bigquery.query(hierarchyQuery);
      hierarchyStats = hierarchyRows[0];
    } catch (error) {
      hierarchyStats = { error: 'Could not analyze hierarchy' };
    }

    return NextResponse.json({
      status: 'success',
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      tables: tableInfo,
      hierarchyStats,
      recommendation: {
        primaryHierarchyTable: 'greywater_compliance.complete_jurisdiction_hierarchy',
        geographyTables: {
          states: 'greywater_compliance.state_level_data',
          counties: 'greywater_compliance.county_level_data', 
          cities: 'geography.cities',
          waterDistricts: 'greywater_compliance.water_district_data'
        },
        complianceTables: {
          regulations: 'greywater_compliance.regulations_master',
          permits: 'greywater_compliance.permits_master',
          incentives: 'greywater_compliance.incentives_master'
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Schema exploration error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to explore table schemas',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}