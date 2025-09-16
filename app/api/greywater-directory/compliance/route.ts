import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

// GET compliance data with real incentives from database 
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const county = searchParams.get('county');
    const city = searchParams.get('city');
    
    if (!state) {
      return NextResponse.json({
        status: 'error',
        message: 'State parameter is required'
      }, { status: 400 });
    }

    const bigquery = getBigQueryClient();

    const stateJurisdictionId = `STATE_${state}`;
    const countyJurisdictionId = county ? `COUNTY_${state}_${county.replace(/\s+/g, '_')}` : '';
    // For cities, check both formats - with and without underscores
    const cityJurisdictionId = city ? `CITY_${state}_${city}` : '';
    const cityJurisdictionIdAlt = city ? `CITY_${state}_${city.replace(/\s+/g, '_')}` : '';

    // Query for regulations and permits
    let regulationsData: any[] = [];
    try {
      const regulationsQuery = `
        SELECT 
          r.jurisdiction_id,
          r.greywater_allowed,
          r.regulation_summary,
          r.allowed_sources,
          r.prohibited_sources,
          r.treatment_requirements,
          r.system_size_limits,
          r.setback_requirements,
          r.inspection_required,
          r.documentation_url,
          p.permit_required,
          p.permit_type,
          p.permit_fee,
          p.annual_fee,
          p.processing_time_days
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.regulations_master\` r
        LEFT JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.permits_master\` p
          ON r.jurisdiction_id = p.jurisdiction_id
        WHERE r.jurisdiction_id IN (?, ?, ?, ?)
      `;
      const [rows] = await bigquery.query({
        query: regulationsQuery,
        params: [stateJurisdictionId, countyJurisdictionId, cityJurisdictionId, cityJurisdictionIdAlt],
        parameterMode: 'POSITIONAL'
      });
      regulationsData = rows;
    } catch (error) {
      console.error('Failed to fetch regulations:', error);
    }

    // First, query for any active incentive programs
    let incentivePrograms: any[] = [];
    let programTiers: any[] = [];
    
    try {
      // Query for all active incentives - MWD or any jurisdiction-specific
      const incentiveQuery = `
        SELECT 
          jurisdiction_id,
          program_name,
          incentive_type,
          incentive_amount_min,
          incentive_amount_max,
          eligible_system_types,
          application_url,
          program_status,
          notes,
          installation_requirements,
          contact_email,
          contact_phone,
          sector_applicability
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\`
        WHERE LOWER(program_status) = 'active'
          AND (
            jurisdiction_id = 'MWD_SERVICE_AREA'
            OR jurisdiction_id = ?
            OR jurisdiction_id = ?
            OR jurisdiction_id = ?
            OR jurisdiction_id = ?
          )
      `;
      
      const [rows] = await bigquery.query({
        query: incentiveQuery,
        params: [stateJurisdictionId, countyJurisdictionId, cityJurisdictionId, cityJurisdictionIdAlt],
        parameterMode: 'POSITIONAL'
      });
      
      incentivePrograms = rows;
      
      // Query for program tiers if we have state programs
      if (incentivePrograms.some(p => p.jurisdiction_id === stateJurisdictionId)) {
        const tierQuery = `
          SELECT 
            pt.*,
            im.program_name,
            im.jurisdiction_id
          FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_tiers\` pt
          JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.incentives_master\` im
            ON pt.program_id = im.program_id
          WHERE im.jurisdiction_id = ?
            AND LOWER(im.program_status) = 'active'
          ORDER BY pt.program_id, pt.tier_level
        `;
        
        try {
          const [tierRows] = await bigquery.query({
            query: tierQuery,
            params: [stateJurisdictionId],
            parameterMode: 'POSITIONAL'
          });
          programTiers = tierRows;
        } catch (tierError) {
          console.error('Failed to fetch program tiers:', tierError);
        }
      }
    } catch (error) {
      console.error('Failed to fetch incentives:', error);
    }

    // Build compliance response with real jurisdiction IDs
    const compliance: any = {};
    
    const getRegulationFor = (jurisdictionId: string, altId: string = '') => {
      return regulationsData.find(r => r.jurisdiction_id === jurisdictionId || (altId && r.jurisdiction_id === altId)) || {};
    }

    // State level - always include
    const stateRegs = getRegulationFor(stateJurisdictionId);
    compliance.state = {
      compliance_level: 'State',
      state_code: state,
      state_name: state,
      county_name: null,
      city_name: null,
      jurisdiction_id: stateJurisdictionId,
      greywater_allowed: stateRegs.greywater_allowed ?? true,
      permit_required: stateRegs.permit_required ?? null,
      permit_type: stateRegs.permit_type,
      permit_fee: stateRegs.permit_fee,
      annual_fee: stateRegs.annual_fee,
      regulation_summary: stateRegs.regulation_summary || 'State greywater regulations apply. Check local jurisdictions for additional requirements.',
      ...stateRegs,
      incentives: [],
      incentive_count: 0,
      max_incentive: null
    };
    
    // County level if requested
    if (county) {
      const countyRegs = getRegulationFor(countyJurisdictionId);
      compliance.county = {
        compliance_level: 'County',
        state_code: state,
        state_name: state,
        county_name: county,
        city_name: null,
        jurisdiction_id: countyJurisdictionId,
        greywater_allowed: countyRegs.greywater_allowed ?? true,
        permit_required: countyRegs.permit_required ?? null,
        permit_type: countyRegs.permit_type,
        permit_fee: countyRegs.permit_fee,
        annual_fee: countyRegs.annual_fee,
        regulation_summary: countyRegs.regulation_summary || `${county} County defers to state regulations.`,
        ...countyRegs,
        incentives: [],
        incentive_count: 0,
        max_incentive: null
      };
    }
    
    // City level if requested
    if (city) {
      const cityRegs = getRegulationFor(cityJurisdictionId, cityJurisdictionIdAlt);
      compliance.city = {
        compliance_level: 'City',
        state_code: state,
        state_name: state,
        county_name: county || '',
        city_name: city,
        jurisdiction_id: cityRegs.jurisdiction_id || cityJurisdictionId,
        greywater_allowed: cityRegs.greywater_allowed ?? true,
        permit_required: cityRegs.permit_required ?? null,
        permit_type: cityRegs.permit_type,
        permit_fee: cityRegs.permit_fee,
        annual_fee: cityRegs.annual_fee,
        regulation_summary: cityRegs.regulation_summary || `${city} defers to county and state regulations.`,
        ...cityRegs,
        incentives: [],
        incentive_count: 0,
        max_incentive: null
      };
    }
    
    // Deduplicate programs by program_name
    const seenPrograms = new Map<string, any>();
    incentivePrograms.forEach(program => {
      // Skip if we've already seen this program name
      if (seenPrograms.has(program.program_name)) {
        return;
      }
      seenPrograms.set(program.program_name, program);
    });
    
    // Process and assign incentives to appropriate levels
    Array.from(seenPrograms.values()).forEach(program => {
      // Find tiers for this program if it's a state program
      const programTiersData = programTiers.filter(t => t.program_name === program.program_name);
      
      const formattedProgram = {
        program_name: program.program_name,
        incentive_type: program.incentive_type,
        incentive_amount_min: program.incentive_amount_min,
        incentive_amount_max: program.incentive_amount_max,
        eligibility_requirements: program.eligible_system_types,
        incentive_url: program.application_url,
        program_status: program.program_status,
        program_description: program.notes,
        max_funding_per_application: program.incentive_amount_max,
        residential_eligibility: program.sector_applicability?.includes('residential') || false,
        commercial_eligibility: program.sector_applicability?.includes('commercial') || false,
        installation_requirements: program.installation_requirements,
        program_contact_email: program.contact_email,
        program_contact_phone: program.contact_phone,
        tiers: programTiersData.map(tier => ({
          tier_name: tier.tier_name,
          tier_number: tier.tier_level,
          min_amount: tier.min_amount,
          max_amount: tier.max_amount,
          requirements: tier.requirements,
          typical_applicants: tier.typical_applicant,
          processing_time: tier.processing_time,
          user_types: tier.user_types
        }))
      };
      
      // Assign MWD programs to county level for LA County
      if (program.jurisdiction_id === 'MWD_SERVICE_AREA' && county === 'Los Angeles' && compliance.county) {
        compliance.county.incentives.push(formattedProgram);
        compliance.county.incentive_count++;
        compliance.county.max_incentive = compliance.county.max_incentive === null 
          ? (program.incentive_amount_max || null)
          : Math.max(compliance.county.max_incentive, program.incentive_amount_max || 0);
      }
      // Assign state programs to state level
      else if (program.jurisdiction_id === `STATE_${state}` && compliance.state) {
        compliance.state.incentives.push(formattedProgram);
        compliance.state.incentive_count++;
        compliance.state.max_incentive = compliance.state.max_incentive === null 
          ? (program.incentive_amount_max || null)
          : Math.max(compliance.state.max_incentive, program.incentive_amount_max || 0);
      }
      // Assign county programs to county level
      else if (county && program.jurisdiction_id === `COUNTY_${state}_${county.replace(/\s+/g, '_')}` && compliance.county) {
        compliance.county.incentives.push(formattedProgram);
        compliance.county.incentive_count++;
        compliance.county.max_incentive = compliance.county.max_incentive === null 
          ? (program.incentive_amount_max || null)
          : Math.max(compliance.county.max_incentive, program.incentive_amount_max || 0);
      }
      // Assign city programs to city level (handle both with and without underscores in city name)
      else if (city && (
        program.jurisdiction_id === `CITY_${state}_${city}` || 
        program.jurisdiction_id === `CITY_${state}_${city.replace(/\s+/g, '_')}`
      ) && compliance.city) {
        compliance.city.incentives.push(formattedProgram);
        compliance.city.incentive_count++;
        compliance.city.max_incentive = compliance.city.max_incentive === null 
          ? (program.incentive_amount_max || null)
          : Math.max(compliance.city.max_incentive, program.incentive_amount_max || 0);
      }
    });
    
    // Set effective compliance (most specific level)
    compliance.effective = compliance.city || compliance.county || compliance.state;
    
    return NextResponse.json({
      status: 'success',
      location: { state, county, city },
      compliance,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Compliance query error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to query compliance data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}