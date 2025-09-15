import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

export async function GET(request: NextRequest) {
  try {
    const bigquery = getBigQueryClient();
    
    // Test jurisdictions_master query
    const query = `
      SELECT DISTINCT
        state_code,
        state_name,
        COUNT(DISTINCT county_name) as county_count,
        COUNT(DISTINCT city_name) as city_count
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.jurisdictions_master\`
      WHERE state_code IS NOT NULL
      GROUP BY state_code, state_name
      ORDER BY state_name
      LIMIT 10
    `;
    
    const [rows] = await bigquery.query({
      query,
      location: 'US'
    });
    
    return NextResponse.json({
      status: 'success',
      test: 'BigQuery connection successful',
      result: rows[0],
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      hasCredentials: !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    });
  } catch (error) {
    console.error('BigQuery test error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'BigQuery connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      hasCredentials: !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    }, { status: 500 });
  }
}