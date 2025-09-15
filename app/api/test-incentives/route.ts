import { NextRequest, NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

export async function GET(request: NextRequest) {
  try {
    // First, let's see what columns exist in the incentives_master table
    const schemaQuery = `
      SELECT column_name, data_type
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.INFORMATION_SCHEMA.COLUMNS\`
      WHERE table_name = 'incentives_master'
      ORDER BY ordinal_position
    `;
    
    const [schemaRows] = await bigquery.query(schemaQuery);
    
    // Now let's get a sample of actual data
    const dataQuery = `
      SELECT *
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
      LIMIT 5
    `;
    
    const [dataRows] = await bigquery.query(dataQuery);
    
    // Check for any city-specific incentives
    const cityQuery = `
      SELECT *
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
      WHERE jurisdiction_id LIKE '%Pasadena%'
         OR jurisdiction_id LIKE '%Santa%Monica%'
         OR jurisdiction_id LIKE '%CITY%'
         OR program_name LIKE '%Pasadena%'
         OR program_name LIKE '%Santa%Monica%'
      LIMIT 20
    `;
    
    let cityRows = [];
    try {
      [cityRows] = await bigquery.query(cityQuery);
    } catch (e) {
      console.log('City query failed:', e);
    }
    
    // Get ALL programs to see what's actually in the table
    const allProgramsQuery = `
      SELECT jurisdiction_id, program_name, program_status
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
    `;
    
    let allPrograms = [];
    try {
      [allPrograms] = await bigquery.query(allProgramsQuery);
    } catch (e) {
      console.log('All programs query failed:', e);
    }
    
    return NextResponse.json({
      status: 'success',
      schema: schemaRows,
      sampleData: dataRows,
      cityData: cityRows,
      allPrograms: allPrograms,
      totalColumns: schemaRows.length
    });
  } catch (error) {
    console.error('Test query error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to query data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}