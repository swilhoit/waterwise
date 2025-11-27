import { NextRequest, NextResponse } from 'next/server'
import { getBigQueryClient } from '@/lib/bigquery'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const resourceType = searchParams.get('resource_type') || 'greywater' // Default to greywater for backward compatibility

    // Validate resource_type
    const validTypes = ['greywater', 'rainwater', 'conservation', 'all']
    if (!validTypes.includes(resourceType)) {
      return NextResponse.json({
        status: 'error',
        message: `Invalid resource_type. Must be one of: ${validTypes.join(', ')}`
      }, { status: 400 })
    }

    const bigquery = getBigQueryClient()

    // Build WHERE clause based on resource_type
    const whereClause = resourceType === 'all'
      ? ''
      : `WHERE resource_type = '${resourceType}'`

    const query = `
      SELECT
        state_code,
        state_name,
        resource_type as resourceType,
        legal_status as legalStatus,
        governing_code as governingCode,
        permit_threshold_gpd as permitThresholdGpd,
        collection_limit_gallons as collectionLimitGallons,
        permit_required as permitRequired,
        permit_explanation as permitExplanation,
        permit_process as permitProcess,
        indoor_use_allowed as indoorUseAllowed,
        outdoor_use_allowed as outdoorUseAllowed,
        potable_use_allowed as potableUseAllowed,
        approved_uses as approvedUses,
        key_restrictions as keyRestrictions,
        recent_changes as recentChanges,
        primary_agency as primaryAgency,
        agency_contact as agencyContact,
        agency_phone as agencyPhone,
        government_website as governmentWebsite,
        regulatory_classification as regulatoryClassification,
        tax_incentives as taxIncentives,
        summary
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.state_water_regulations\`
      ${whereClause}
      ORDER BY state_name, resource_type
    `

    const [rows] = await bigquery.query({ query })

    const states = rows.map((row: any) => ({
      state_code: row.state_code,
      state_name: row.state_name,
      resourceType: row.resourceType,
      legalStatus: row.legalStatus,
      governingCode: row.governingCode,
      permitThresholdGpd: row.permitThresholdGpd,
      collectionLimitGallons: row.collectionLimitGallons,
      permitRequired: row.permitRequired,
      permitExplanation: row.permitExplanation,
      permitProcess: row.permitProcess,
      indoorUseAllowed: row.indoorUseAllowed,
      outdoorUseAllowed: row.outdoorUseAllowed,
      potableUseAllowed: row.potableUseAllowed,
      approvedUses: row.approvedUses || [],
      keyRestrictions: row.keyRestrictions || [],
      recentChanges: row.recentChanges,
      primaryAgency: row.primaryAgency,
      agencyContact: row.agencyContact,
      agencyPhone: row.agencyPhone,
      governmentWebsite: row.governmentWebsite,
      regulatoryClassification: row.regulatoryClassification,
      taxIncentives: row.taxIncentives,
      summary: row.summary
    }))

    return NextResponse.json({
      status: 'success',
      resource_type: resourceType,
      count: states.length,
      data: states
    })

  } catch (error) {
    console.error('Error fetching all states:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Failed to fetch states data'
    }, { status: 500 })
  }
}
