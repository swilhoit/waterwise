import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

export async function GET(request: NextRequest) {
  try {
    const bigquery = getBigQueryClient();
    
    // Simple test query
    const query = `SELECT 1 as test, CURRENT_TIMESTAMP() as timestamp`;
    
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