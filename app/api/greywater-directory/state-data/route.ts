import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
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

    const filePath = path.join(process.cwd(), 'greywater-state-directory.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    // Get state name from code
    const stateName = getStateNameFromCode(stateCode)
    
    if (!stateName) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Invalid state code' 
      }, { status: 404 })
    }
    
    if (!data.states[stateName]) {
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
      const bigquery = getBigQueryClient()
      const incentiveQuery = `
        SELECT 
          COUNT(*) as count,
          MAX(incentive_amount_max) as max_amount
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
        WHERE (
          jurisdiction_id = @stateJurisdictionId
          OR (jurisdiction_id = 'MWD_SERVICE_AREA' AND @stateCode = 'CA')
        )
        AND LOWER(program_status) = 'active'
      `
      
      const [rows] = await bigquery.query({
        query: incentiveQuery,
        params: {
          stateJurisdictionId: `STATE_${stateCode.toUpperCase()}`,
          stateCode: stateCode.toUpperCase()
        }
      })
      
      if (rows && rows[0]) {
        incentiveCount = rows[0].count || 0
        hasIncentives = incentiveCount > 0
        maxRebateAmount = rows[0].max_amount || 0
      }
    } catch (error) {
      console.error('Failed to fetch incentive data:', error)
    }

    const stateData = {
      ...data.states[stateName],
      state_name: stateName,
      state_code: stateCode.toUpperCase(),
      has_incentives: hasIncentives,
      incentive_count: incentiveCount,
      max_rebate_amount: maxRebateAmount
    }

    return NextResponse.json({ 
      status: 'success', 
      data: stateData 
    })
    
  } catch (error) {
    console.error('Error fetching state data:', error)
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to fetch state data' 
    }, { status: 500 })
  }
}