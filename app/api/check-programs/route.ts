import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

export async function GET() {
  try {
    // Get all programs grouped by jurisdiction type
    const query = `
      SELECT 
        jurisdiction_id,
        program_name,
        program_status,
        incentive_amount_max
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
      WHERE LOWER(program_status) = 'active'
      ORDER BY jurisdiction_id
    `;
    
    const [rows] = await bigquery.query(query);
    
    // Group programs by type
    const cityPrograms = rows.filter(r => r.jurisdiction_id?.includes('CITY'));
    const countyPrograms = rows.filter(r => r.jurisdiction_id?.includes('COUNTY'));
    const statePrograms = rows.filter(r => r.jurisdiction_id?.includes('STATE'));
    const mwdPrograms = rows.filter(r => r.jurisdiction_id === 'MWD_SERVICE_AREA');
    
    return NextResponse.json({
      status: 'success',
      summary: {
        total: rows.length,
        city: cityPrograms.length,
        county: countyPrograms.length,
        state: statePrograms.length,
        mwd: mwdPrograms.length
      },
      programs: {
        city: cityPrograms,
        county: countyPrograms,
        state: statePrograms,
        mwd: mwdPrograms
      }
    });
  } catch (error) {
    console.error('Query error:', error);
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}