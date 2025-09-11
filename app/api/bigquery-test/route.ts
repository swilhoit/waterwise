import { NextRequest, NextResponse } from 'next/server';
import { greywater } from '@/lib/bigquery';

export async function GET() {
  try {
    // Test the BigQuery connection
    const isConnected = await greywater.testConnection();
    
    if (isConnected) {
      return NextResponse.json({ 
        status: 'success',
        message: 'Successfully connected to greywater BigQuery project',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({ 
        status: 'error',
        message: 'Failed to connect to BigQuery project'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('BigQuery connection error:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'BigQuery connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, params } = body;

    if (!query) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Query is required'
      }, { status: 400 });
    }

    const results = await greywater.query(query, params);
    
    return NextResponse.json({ 
      status: 'success',
      data: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('BigQuery query error:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Query execution failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}