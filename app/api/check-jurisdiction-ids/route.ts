import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

export async function GET() {
  try {
    const query = `
      SELECT DISTINCT
        jurisdiction_id,
        program_name
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
      WHERE LOWER(program_status) = 'active'
      ORDER BY jurisdiction_id
    `;
    
    const [rows] = await bigquery.query(query);
    
    return NextResponse.json({
      status: 'success',
      jurisdictions: rows,
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