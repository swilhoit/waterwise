import { NextRequest, NextResponse } from 'next/server';
import { getBigQueryClient } from '@/lib/bigquery';

// Valid resource types
const VALID_RESOURCE_TYPES = ['greywater', 'rainwater', 'conservation', 'all'];

// GET compliance data with bulletproof jurisdiction-based program matching
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const county = searchParams.get('county');
    const city = searchParams.get('city');
    const resourceType = searchParams.get('resource_type') || 'all';

    if (!state) {
      return NextResponse.json({
        status: 'error',
        message: 'State parameter is required'
      }, { status: 400 });
    }

    if (!VALID_RESOURCE_TYPES.includes(resourceType)) {
      return NextResponse.json({
        status: 'error',
        message: `Invalid resource_type. Must be one of: ${VALID_RESOURCE_TYPES.join(', ')}`
      }, { status: 400 });
    }

    const bigquery = getBigQueryClient();

    // Build jurisdiction IDs for hierarchical lookup
    const stateJurisdictionId = `${state}_STATE`;
    const countyJurisdictionId = county
      ? `${state}_COUNTY_${county.toUpperCase().replace(/\s+/g, '_')}`
      : '';
    const cityJurisdictionId = city
      ? `${state}_CITY_${city.toUpperCase().replace(/\s+/g, '_')}`
      : '';

    // Query for regulations and permits (unchanged)
    let regulationsData: any[] = [];
    try {
      const stateJurisdictionIdOld = `STATE_${state}`;
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
        params: [stateJurisdictionIdOld, countyJurisdictionId, cityJurisdictionId, `CITY_${state}_${city}`],
        parameterMode: 'POSITIONAL'
      });
      regulationsData = rows;
    } catch (error) {
      console.error('Failed to fetch regulations:', error);
    }

    // Build resource type filter
    const resourceTypeFilter = resourceType === 'all'
      ? ''
      : `AND (p.resource_type = '${resourceType}' OR p.resource_type IS NULL)`;

    // Query programs using the junction table for bulletproof jurisdiction matching
    let incentivePrograms: any[] = [];

    // Build list of jurisdiction IDs to match (city, county, state)
    const jurisdictionIds = [stateJurisdictionId];
    if (countyJurisdictionId) jurisdictionIds.push(countyJurisdictionId);
    if (cityJurisdictionId) jurisdictionIds.push(cityJurisdictionId);

    try {
      // Query programs that are linked to any of the relevant jurisdictions
      // Uses the program_jurisdiction_link table for explicit mapping
      const incentiveQuery = `
        SELECT DISTINCT
          p.program_id,
          p.program_name,
          p.program_type as incentive_type,
          p.resource_type,
          p.program_subtype,
          p.incentive_amount_min,
          p.incentive_amount_max,
          p.eligible_system_types,
          p.application_url,
          p.program_status,
          p.notes,
          p.installation_requirements,
          p.contact_email,
          p.contact_phone,
          p.applicant_type,
          p.residential_eligible,
          p.commercial_eligible,
          p.municipal_eligible,
          p.agricultural_eligible,
          p.program_description,
          p.eligibility_details,
          p.how_to_apply,
          p.documentation_required,
          p.coverage_area,
          p.deadline_info,
          p.water_utility,
          pjl.jurisdiction_id as linked_jurisdiction_id,
          pjl.coverage_type
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
        JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
          ON p.program_id = pjl.program_id
        WHERE LOWER(p.program_status) = 'active'
          AND pjl.jurisdiction_id IN UNNEST(@jurisdiction_ids)
          AND (p.residential_eligible = TRUE OR p.commercial_eligible = TRUE OR p.applicant_type IS NULL)
          ${resourceTypeFilter}
        ORDER BY p.program_name
      `;

      const [rows] = await bigquery.query({
        query: incentiveQuery,
        params: { jurisdiction_ids: jurisdictionIds },
        types: { jurisdiction_ids: ['STRING'] }
      });

      incentivePrograms = rows;
      console.log(`Found ${incentivePrograms.length} programs for jurisdictions:`, jurisdictionIds);
    } catch (error) {
      console.error('Failed to fetch incentives:', error);
    }

    // Build compliance response
    const compliance: any = {};

    const getRegulationFor = (jurisdictionId: string, altId: string = '') => {
      return regulationsData.find(r => r.jurisdiction_id === jurisdictionId || (altId && r.jurisdiction_id === altId)) || {};
    }

    // State level
    const stateRegs = getRegulationFor(`STATE_${state}`);
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

    // County level
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

    // City level
    if (city) {
      const cityRegs = getRegulationFor(cityJurisdictionId);
      compliance.city = {
        compliance_level: 'City',
        state_code: state,
        state_name: state,
        county_name: county || '',
        city_name: city,
        jurisdiction_id: cityJurisdictionId,
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

    // Deduplicate and assign programs to appropriate compliance levels
    const seenPrograms = new Map<string, any>();

    incentivePrograms.forEach(program => {
      const existing = seenPrograms.get(program.program_name);
      if (!existing) {
        seenPrograms.set(program.program_name, program);
      }
    });

    // Process and assign incentives based on their linked jurisdiction
    Array.from(seenPrograms.values()).forEach(program => {
      const residentialEligible = program.residential_eligible ?? true;
      const commercialEligible = program.commercial_eligible ?? true;

      const formattedProgram = {
        program_name: program.program_name,
        incentive_type: program.incentive_type,
        resource_type: program.resource_type || 'greywater',
        program_subtype: program.program_subtype,
        water_utility: program.water_utility,
        incentive_amount_min: program.incentive_amount_min,
        incentive_amount_max: program.incentive_amount_max,
        eligibility_requirements: program.eligible_system_types,
        incentive_url: program.application_url,
        program_status: program.program_status,
        program_description: program.program_description || program.notes,
        max_funding_per_application: program.incentive_amount_max,
        installation_requirements: program.installation_requirements,
        program_contact_email: program.contact_email,
        program_contact_phone: program.contact_phone,
        residential_eligible: residentialEligible,
        commercial_eligible: commercialEligible,
        applicant_type: program.applicant_type,
        eligibility_details: program.eligibility_details,
        how_to_apply: program.how_to_apply,
        documentation_required: program.documentation_required,
        coverage_area: program.coverage_area,
        deadline_info: program.deadline_info,
        tiers: []
      };

      const linkedJurisdiction = program.linked_jurisdiction_id || '';
      const coverageType = program.coverage_type || '';

      // Assign to the most specific matching level
      // City-specific programs (linked to city jurisdiction)
      if (city && compliance.city && linkedJurisdiction === cityJurisdictionId) {
        compliance.city.incentives.push(formattedProgram);
        compliance.city.incentive_count++;
        compliance.city.max_incentive = Math.max(compliance.city.max_incentive || 0, program.incentive_amount_max || 0);
      }
      // County-specific programs (linked to county jurisdiction)
      else if (county && compliance.county && linkedJurisdiction === countyJurisdictionId) {
        compliance.county.incentives.push(formattedProgram);
        compliance.county.incentive_count++;
        compliance.county.max_incentive = Math.max(compliance.county.max_incentive || 0, program.incentive_amount_max || 0);
      }
      // State-level programs OR utility programs that cover this city
      else if (coverageType === 'state' || linkedJurisdiction === stateJurisdictionId) {
        compliance.state.incentives.push(formattedProgram);
        compliance.state.incentive_count++;
        compliance.state.max_incentive = Math.max(compliance.state.max_incentive || 0, program.incentive_amount_max || 0);
      }
      // Utility-based programs - assign to state level for visibility
      else if (coverageType === 'utility') {
        compliance.state.incentives.push(formattedProgram);
        compliance.state.incentive_count++;
        compliance.state.max_incentive = Math.max(compliance.state.max_incentive || 0, program.incentive_amount_max || 0);
      }
    });

    // Set effective compliance (most specific level)
    compliance.effective = compliance.city || compliance.county || compliance.state;

    return NextResponse.json({
      status: 'success',
      location: { state, county, city },
      resource_type: resourceType,
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
