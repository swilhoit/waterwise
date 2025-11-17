import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

// GET water regulations for a jurisdiction
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const waterType = searchParams.get('waterType'); // GREYWATER, RAINWATER, or ALL

    if (!state) {
      return NextResponse.json({
        status: 'error',
        message: 'State parameter is required'
      }, { status: 400 });
    }

    const bigquery = getBigQueryClient();
    const stateJurisdictionId = `${state.toUpperCase()}_STATE`;

    let query = `
      SELECT
        wr.*,
        wt.water_type_name,
        wt.description as water_type_description
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.water_regulations\` wr
      JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.lookup_water_types\` wt
        ON wr.water_type_id = wt.water_type_id
      WHERE wr.jurisdiction_id = @jurisdictionId
    `;

    const queryParams: any = {
      jurisdictionId: stateJurisdictionId
    };

    // Filter by water type if specified
    if (waterType && waterType !== 'ALL') {
      query += ` AND wr.water_type_id = @waterType`;
      queryParams.waterType = waterType;
    }

    query += ` ORDER BY wr.water_type_id`;

    const [rows] = await bigquery.query({
      query,
      params: queryParams,
      location: 'US'
    });

    // Group regulations by water type
    const regulations: { [key: string]: any } = {};

    rows.forEach((row: any) => {
      regulations[row.water_type_id] = {
        water_type_id: row.water_type_id,
        water_type_name: row.water_type_name,
        water_type_description: row.water_type_description,
        jurisdiction_id: row.jurisdiction_id,
        legal_status: row.legal_status,
        governing_code: row.governing_code,
        permit_required: row.permit_required,
        permit_threshold: row.permit_threshold,
        approved_uses: row.approved_uses || [],
        key_restrictions: row.key_restrictions || [],
        summary: row.summary,
        regulatory_classification: row.regulatory_classification
      };
    });

    return NextResponse.json({
      status: 'success',
      state_code: state.toUpperCase(),
      jurisdiction_id: stateJurisdictionId,
      regulations,
      available_types: Object.keys(regulations),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Water regulations query error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to query water regulations',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
