import { NextRequest, NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    
    // Simple direct query
    const query = `
      SELECT 
        jurisdiction_id,
        program_name,
        program_status
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
      WHERE 1=1
        ${city ? `AND (jurisdiction_id LIKE '%${city}%' OR program_name LIKE '%${city}%')` : ''}
      LIMIT 20
    `;
    
    console.log('Query:', query);
    const [rows] = await bigquery.query(query);
    
    return NextResponse.json({
      status: 'success',
      programs: rows,
      total: rows.length
    });
  } catch (error) {
    console.error('Query error:', error);
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}