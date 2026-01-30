import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

export async function GET() {
  try {
    const bigquery = new BigQuery({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    // Active tables used by the application
    const keyTables = [
      // Primary data tables
      { dataset: 'greywater_compliance', table: 'greywater_laws' },
      { dataset: 'greywater_compliance', table: 'city_county_mapping' },
      { dataset: 'greywater_compliance', table: 'local_regulations' },
      // Programs/incentives tables
      { dataset: 'greywater_compliance', table: 'programs_master' },
      { dataset: 'greywater_compliance', table: 'program_jurisdiction_link' },
      // Permit details
      { dataset: 'greywater_compliance', table: 'city_permit_details' },
      { dataset: 'greywater_compliance', table: 'state_permit_details' }
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

    // Analyze hierarchy relationships from active tables
    const hierarchyQuery = `
      SELECT
        COUNT(DISTINCT state_code) as states,
        COUNT(DISTINCT county_name) as counties,
        COUNT(DISTINCT city_name) as cities
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.city_county_mapping\`
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
        primaryTables: {
          regulations: 'greywater_compliance.greywater_laws',
          geography: 'greywater_compliance.city_county_mapping',
          programs: 'greywater_compliance.programs_master'
        },
        note: 'greywater_laws contains both greywater and rainwater data (use resource_type filter)'
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