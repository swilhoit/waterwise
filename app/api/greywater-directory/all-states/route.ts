import { NextResponse } from 'next/server'
import { getBigQueryClient } from '@/lib/bigquery'

export async function GET() {
  try {
    const bigquery = getBigQueryClient()

    const query = `
      SELECT
        state_code,
        state_name,
        legal_status as legalStatus,
        governing_code as governingCode,
        permit_threshold_gpd as permitThresholdGpd,
        permit_required as permitRequired,
        permit_explanation as permitExplanation,
        permit_process as permitProcess,
        indoor_use_allowed as indoorUseAllowed,
        outdoor_use_allowed as outdoorUseAllowed,
        approved_uses as approvedUses,
        key_restrictions as keyRestrictions,
        recent_changes as recentChanges,
        primary_agency as primaryAgency,
        agency_contact as agencyContact,
        agency_phone as agencyPhone,
        government_website as governmentWebsite,
        regulatory_classification as regulatoryClassification,
        summary
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
      ORDER BY state_name
    `

    const [rows] = await bigquery.query({ query })

    const states = rows.map((row: any) => ({
      state_code: row.state_code,
      state_name: row.state_name,
      legalStatus: row.legalStatus,
      governingCode: row.governingCode,
      permitThresholdGpd: row.permitThresholdGpd,
      permitRequired: row.permitRequired,
      permitExplanation: row.permitExplanation,
      permitProcess: row.permitProcess,
      indoorUseAllowed: row.indoorUseAllowed,
      outdoorUseAllowed: row.outdoorUseAllowed,
      approvedUses: row.approvedUses || [],
      keyRestrictions: row.keyRestrictions || [],
      recentChanges: row.recentChanges,
      primaryAgency: row.primaryAgency,
      agencyContact: row.agencyContact,
      agencyPhone: row.agencyPhone,
      governmentWebsite: row.governmentWebsite,
      regulatoryClassification: row.regulatoryClassification,
      summary: row.summary
    }))

    return NextResponse.json({
      status: 'success',
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
