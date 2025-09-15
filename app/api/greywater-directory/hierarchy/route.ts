import { NextRequest, NextResponse } from 'next/server';

// GET hierarchy data - hardcoded for now to avoid BigQuery issues
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const level = searchParams.get('level') || 'states';
    const parentId = searchParams.get('parentId');
    const parentType = searchParams.get('parentType');

    switch (level) {
      case 'states':
        // Return hardcoded California data
        return NextResponse.json({
          status: 'success',
          data: [
            {
              state_jurisdiction_id: 'CA',
              state_name: 'California',
              state_code: 'CA',
              county_count: 58,
              city_count: 482
            }
          ]
        });

      case 'counties':
        // Get counties for a specific state
        if (!parentId) {
          return NextResponse.json({
            status: 'error',
            message: 'parentId (state_code) is required for counties'
          }, { status: 400 });
        }
        
        // Return hardcoded LA County data for California
        if (parentId === 'CA') {
          return NextResponse.json({
            status: 'success',
            data: [
              {
                county_jurisdiction_id: 'Los Angeles',
                county_name: 'Los Angeles',
                state_code: 'CA',
                state_name: 'California',
                city_count: 88
              }
            ]
          });
        }
        
        return NextResponse.json({
          status: 'success',
          data: []
        });

      case 'cities':
        // Get cities for a county or state
        if (!parentId) {
          return NextResponse.json({
            status: 'error',
            message: 'parentId is required for cities'
          }, { status: 400 });
        }
        
        // Return hardcoded cities for Los Angeles County
        if (parentId === 'Los Angeles' && parentType === 'county') {
          return NextResponse.json({
            status: 'success',
            data: [
              {
                city_jurisdiction_id: 'Pasadena',
                city_name: 'Pasadena',
                county_name: 'Los Angeles',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'Santa Monica',
                city_name: 'Santa Monica',
                county_name: 'Los Angeles',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'Long Beach',
                city_name: 'Long Beach',
                county_name: 'Los Angeles',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'Glendale',
                city_name: 'Glendale',
                county_name: 'Los Angeles',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'Burbank',
                city_name: 'Burbank',
                county_name: 'Los Angeles',
                state_code: 'CA',
                state_name: 'California'
              }
            ]
          });
        }
        
        // Return cities for state view
        if (parentId === 'CA' && parentType === 'state') {
          return NextResponse.json({
            status: 'success',
            data: [
              {
                city_jurisdiction_id: 'Los Angeles',
                city_name: 'Los Angeles',
                county_name: 'Los Angeles',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'San Francisco',
                city_name: 'San Francisco',
                county_name: 'San Francisco',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'San Diego',
                city_name: 'San Diego',
                county_name: 'San Diego',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'San Jose',
                city_name: 'San Jose',
                county_name: 'Santa Clara',
                state_code: 'CA',
                state_name: 'California'
              },
              {
                city_jurisdiction_id: 'Sacramento',
                city_name: 'Sacramento',
                county_name: 'Sacramento',
                state_code: 'CA',
                state_name: 'California'
              }
            ]
          });
        }
        
        return NextResponse.json({
          status: 'success',
          data: []
        });

      case 'water_districts':
        // Return empty for water districts for now
        return NextResponse.json({
          status: 'success',
          data: []
        });

      default:
        return NextResponse.json({
          status: 'error',
          message: 'Invalid level parameter'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Hierarchy query error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to query hierarchy data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}