import { NextRequest, NextResponse } from 'next/server'
import { getStateNameFromCode } from '@/lib/state-utils'
import { getBigQueryClient } from '@/lib/bigquery'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stateCode = searchParams.get('state')

    if (!stateCode) {
      return NextResponse.json({
        status: 'error',
        message: 'State code is required'
      }, { status: 400 })
    }

    // Get state name from code
    const stateName = getStateNameFromCode(stateCode)

    if (!stateName) {
      return NextResponse.json({
        status: 'error',
        message: 'Invalid state code'
      }, { status: 404 })
    }

    const bigquery = getBigQueryClient()

    // Query BigQuery for all state data from greywater_laws table
    const stateQuery = `
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
      WHERE state_code = @stateCode
    `

    let stateData: any = null

    try {
      const [rows] = await bigquery.query({
        query: stateQuery,
        params: {
          stateCode: stateCode.toUpperCase()
        }
      })

      if (rows && rows[0]) {
        const row = rows[0]
        stateData = {
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
          summary: row.summary,
          state_name: row.state_name || stateName,
          state_code: stateCode.toUpperCase()
        }
      }
    } catch (error) {
      console.error('Failed to fetch state data from BigQuery:', error)
    }

    if (!stateData) {
      return NextResponse.json({
        status: 'error',
        message: 'State data not found'
      }, { status: 404 })
    }

    // Query BigQuery for incentive data
    let hasIncentives = false
    let maxRebateAmount = 0
    let incentiveCount = 0

    try {
      const incentiveQuery = `
        SELECT
          COUNT(*) as count,
          MAX(incentive_amount_max) as max_amount
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\`
        WHERE program_id LIKE @statePattern
        AND LOWER(program_status) = 'active'
      `

      const [rows] = await bigquery.query({
        query: incentiveQuery,
        params: {
          statePattern: `${stateCode.toUpperCase()}_%`
        }
      })

      if (rows && rows[0]) {
        incentiveCount = Number(rows[0].count) || 0
        hasIncentives = incentiveCount > 0
        maxRebateAmount = Number(rows[0].max_amount) || 0
      }
    } catch (error) {
      console.error('Failed to fetch incentive data:', error)
    }

    const responseData = {
      ...stateData,
      has_incentives: hasIncentives,
      incentive_count: incentiveCount,
      max_rebate_amount: maxRebateAmount
    }

    return NextResponse.json({
      status: 'success',
      data: responseData
    })

  } catch (error) {
    console.error('Error fetching state data:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Failed to fetch state data'
    }, { status: 500 })
  }
}
