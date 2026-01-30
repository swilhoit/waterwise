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

    // Query for BOTH greywater and rainwater data in one call
    const stateQuery = `
      SELECT
        state_code,
        state_name,
        resource_type,
        legal_status,
        governing_code,
        permit_threshold_gpd,
        collection_limit_gallons,
        permit_required,
        permit_explanation,
        permit_process,
        indoor_use_allowed,
        outdoor_use_allowed,
        potable_use_allowed,
        approved_uses,
        key_restrictions,
        recent_changes,
        primary_agency,
        agency_contact,
        agency_phone,
        government_website,
        regulatory_classification,
        tax_incentives,
        summary
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.greywater_laws\`
      WHERE state_code = @stateCode
      ORDER BY resource_type
    `

    let greywater: any = null
    let rainwater: any = null
    let agency: any = null

    try {
      const [rows] = await bigquery.query({
        query: stateQuery,
        params: {
          stateCode: stateCode.toUpperCase()
        }
      })

      rows.forEach((row: any) => {
        const resourceData = {
          legalStatus: row.legal_status,
          governingCode: row.governing_code,
          permitRequired: row.permit_required,
          permitExplanation: row.permit_explanation,
          permitProcess: row.permit_process,
          approvedUses: row.approved_uses || [],
          keyRestrictions: row.key_restrictions || [],
          recentChanges: row.recent_changes,
          regulatoryClassification: row.regulatory_classification,
          summary: row.summary
        }

        if (row.resource_type === 'greywater') {
          greywater = {
            ...resourceData,
            permitThresholdGpd: row.permit_threshold_gpd,
            indoorUseAllowed: row.indoor_use_allowed,
            outdoorUseAllowed: row.outdoor_use_allowed
          }
          // Use greywater agency as primary (usually same for both)
          if (!agency) {
            agency = {
              name: row.primary_agency,
              contact: row.agency_contact,
              phone: row.agency_phone,
              website: row.government_website
            }
          }
        } else if (row.resource_type === 'rainwater') {
          rainwater = {
            ...resourceData,
            collectionLimitGallons: row.collection_limit_gallons,
            potableUseAllowed: row.potable_use_allowed,
            taxIncentives: row.tax_incentives
          }
          // Use rainwater agency if greywater didn't provide one
          if (!agency || !agency.name) {
            agency = {
              name: row.primary_agency,
              contact: row.agency_contact,
              phone: row.agency_phone,
              website: row.government_website
            }
          }
        }
      })
    } catch (error) {
      console.error('Failed to fetch state data from BigQuery:', error)
    }

    if (!greywater && !rainwater) {
      return NextResponse.json({
        status: 'error',
        message: 'State data not found'
      }, { status: 404 })
    }

    // Query for incentive counts by resource type
    let incentiveSummary = {
      total: 0,
      greywater: 0,
      rainwater: 0,
      conservation: 0,
      maxRebate: 0
    }

    try {
      const incentiveQuery = `
        SELECT
          COALESCE(resource_type, 'greywater') as resource_type,
          COUNT(*) as count,
          MAX(incentive_amount_max) as max_amount
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\`
        WHERE program_id LIKE @statePattern
        AND LOWER(program_status) = 'active'
        GROUP BY resource_type
      `

      const [rows] = await bigquery.query({
        query: incentiveQuery,
        params: {
          statePattern: `${stateCode.toUpperCase()}_%`
        }
      })

      let maxRebate = 0
      rows.forEach((row: any) => {
        const count = Number(row.count) || 0
        const max = Number(row.max_amount) || 0
        incentiveSummary.total += count
        if (max > maxRebate) maxRebate = max

        if (row.resource_type === 'greywater') {
          incentiveSummary.greywater = count
        } else if (row.resource_type === 'rainwater') {
          incentiveSummary.rainwater = count
        } else if (row.resource_type === 'conservation') {
          incentiveSummary.conservation = count
        }
      })
      incentiveSummary.maxRebate = maxRebate
    } catch (error) {
      console.error('Failed to fetch incentive data:', error)
    }

    // Build unified response
    const responseData = {
      state_code: stateCode.toUpperCase(),
      state_name: stateName,
      greywater,
      rainwater,
      conservation: {
        hasRegulations: false,
        message: 'Conservation programs are incentive-based. See available rebates below.',
        incentiveCount: incentiveSummary.conservation
      },
      agency,
      incentives: incentiveSummary
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
