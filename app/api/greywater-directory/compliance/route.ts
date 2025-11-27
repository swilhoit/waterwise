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

    // First, query for any active incentive programs from programs_master
    let incentivePrograms: any[] = [];
    let programTiers: any[] = [];

    // Build jurisdiction patterns for matching program_id
    const countyPattern = county ? `%${state}_COUNTY_${county.toUpperCase().replace(/\s+/g, '_')}%` : '';
    const cityPattern = city ? `%${state}_CITY_${city.toUpperCase().replace(/\s+/g, '_')}%` : '';

    try {
      // Query for all active programs - match by program_id pattern or notes containing jurisdiction
      const incentiveQuery = `
        SELECT
          program_id,
          program_name,
          program_type as incentive_type,
          incentive_amount_min,
          incentive_amount_max,
          eligible_system_types,
          application_url,
          program_status,
          notes,
          installation_requirements,
          contact_email,
          contact_phone,
          CASE
            WHEN program_id LIKE '%_COUNTY_%' THEN 'county'
            WHEN program_id LIKE '%_CITY_%' THEN 'city'
            WHEN program_id LIKE 'CA_%' AND program_id NOT LIKE '%_COUNTY_%' AND program_id NOT LIKE '%_CITY_%' THEN 'state'
            ELSE 'regional'
          END as jurisdiction_level,
          CASE
            WHEN program_id LIKE '%MWD%' THEN 'MWD_SERVICE_AREA'
            WHEN program_id LIKE '%_COUNTY_%' THEN REGEXP_EXTRACT(program_id, r'(CA_COUNTY_[A-Z_]+)')
            WHEN program_id LIKE '%_CITY_%' THEN REGEXP_EXTRACT(program_id, r'(CA_CITY_[A-Z_]+)')
            ELSE 'STATE_${state}'
          END as jurisdiction_id
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\`
        WHERE LOWER(program_status) = 'active'
          AND (
            program_id LIKE 'CA_%'
            OR LOWER(notes) LIKE '%${state.toLowerCase()}%'
          )
      `;

      const [rows] = await bigquery.query({
        query: incentiveQuery,
        location: 'US'
      });

      // City abbreviation mappings for filtering
      const cityAbbreviations: {[key: string]: string[]} = {
        'los angeles': ['LADWP', 'LA_'],
        'san francisco': ['SF_', 'SAN_FRANCISCO'],
        'san diego': ['SD_', 'SAN_DIEGO'],
        'santa monica': ['SM_', 'SANTA_MONICA'],
        'glendale': ['GLENDALE'],
        'bakersfield': ['BAKERSFIELD'],
        'corona': ['CORONA'],
        'fresno': ['FRESNO'],
        'austin': ['AUSTIN'],
        'las vegas': ['VEGAS', 'LAS_VEGAS'],
        'salt lake': ['SLC_', 'SALT_LAKE'],
        'albuquerque': ['ABQ_', 'ALBUQUERQUE'],
      };

      // Check if a program is city-specific
      const isCitySpecificProgram = (pid: string) => {
        for (const [cityName, abbrevs] of Object.entries(cityAbbreviations)) {
          for (const abbrev of abbrevs) {
            if (pid.includes(abbrev)) return cityName;
          }
        }
        // Also check for _CITY_ pattern
        if (pid.includes('_CITY_')) return 'unknown';
        return null;
      };

      // Check if program is for a different state
      const isOtherState = (pid: string) => {
        const otherStates = ['TX_', 'NV_', 'UT_', 'NM_', 'AZ_', 'OR_', 'WA_', 'CO_'];
        return otherStates.some(s => pid.startsWith(s));
      };

      // Filter to relevant jurisdictions
      incentivePrograms = rows.filter((p: any) => {
        const pid = p.program_id?.toUpperCase() || '';
        const notes = p.notes?.toLowerCase() || '';
        const cityLower = city?.toLowerCase() || '';
        const countyLower = county?.toLowerCase() || '';

        // Skip programs from other states
        if (isOtherState(pid)) return false;

        // Check if this is a city-specific program
        const cityFor = isCitySpecificProgram(pid);
        if (cityFor) {
          // Only include if it matches the current city
          return cityLower === cityFor || cityLower.includes(cityFor) || cityFor.includes(cityLower);
        }

        // Match MWD programs for LA County
        if (pid.includes('MWD') && countyLower === 'los angeles') return true;

        // Match county-specific programs
        if (county && (
          pid.includes(`_COUNTY_${county.toUpperCase().replace(/\s+/g, '_')}`) ||
          (notes.includes(countyLower) && !isCitySpecificProgram(pid))
        )) return true;

        // Match true state-level programs (general California programs)
        const isGeneralStateProgram = pid.startsWith('CA_') &&
          !isCitySpecificProgram(pid) &&
          !pid.includes('_COUNTY_') &&
          (pid.includes('DWR') || pid.includes('WATER_EFFICIENCY') || pid.includes('TAX_CREDIT') ||
           pid.includes('DROUGHT') || pid.includes('CALRECYCLE') || pid.includes('CPUC') ||
           pid.includes('AFFORDABLE_HOUSING') || pid.includes('AGRICULTURAL') || pid.includes('SAVE_OUR_WATER'));

        return isGeneralStateProgram;
      });

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
    
    // City abbreviation mappings for assignment
    const cityAbbrevAssign: {[key: string]: string[]} = {
      'los angeles': ['LADWP', 'LA_'],
      'san francisco': ['SF_', 'SAN_FRANCISCO'],
      'san diego': ['SD_', 'SAN_DIEGO'],
      'santa monica': ['SM_', 'SANTA_MONICA'],
      'glendale': ['GLENDALE'],
      'bakersfield': ['BAKERSFIELD'],
      'corona': ['CORONA'],
      'fresno': ['FRESNO'],
    };

    // Check if program is for a specific city
    const getCityForProgram = (pid: string) => {
      for (const [cityName, abbrevs] of Object.entries(cityAbbrevAssign)) {
        for (const abbrev of abbrevs) {
          if (pid.includes(abbrev)) return cityName;
        }
      }
      if (pid.includes('_CITY_')) return 'city_specific';
      return null;
    };

    // Helper to determine residential/commercial eligibility
    const parseEligibility = (eligibleTypes: string, notes: string) => {
      const text = `${eligibleTypes || ''} ${notes || ''}`.toLowerCase();
      const hasResidential = text.includes('residential') || text.includes('homeowner') ||
        text.includes('single-family') || text.includes('lawn') || text.includes('turf');
      const hasCommercial = text.includes('commercial') || text.includes('business') ||
        text.includes('multi-family') || text.includes('municipal') || text.includes('large-scale');
      // If neither specified, assume both (general programs)
      if (!hasResidential && !hasCommercial) {
        return { residential: true, commercial: true };
      }
      return { residential: hasResidential, commercial: hasCommercial };
    };

    // Process and assign incentives to appropriate levels
    Array.from(seenPrograms.values()).forEach(program => {
      const eligibility = parseEligibility(program.eligible_system_types, program.notes);

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
        installation_requirements: program.installation_requirements,
        program_contact_email: program.contact_email,
        program_contact_phone: program.contact_phone,
        residential_eligible: eligibility.residential,
        commercial_eligible: eligibility.commercial,
        tiers: []
      };

      const pid = program.program_id?.toUpperCase() || '';
      const notes = program.notes?.toLowerCase() || '';
      const countyUpper = county?.toUpperCase().replace(/\s+/g, '_') || '';
      const cityLower = city?.toLowerCase() || '';

      // Check if this is a city-specific program
      const programCityFor = getCityForProgram(pid);

      // Assign city-specific programs to city level if city matches
      if (programCityFor && city && compliance.city) {
        if (cityLower === programCityFor || cityLower.includes(programCityFor) || programCityFor.includes(cityLower)) {
          compliance.city.incentives.push(formattedProgram);
          compliance.city.incentive_count++;
          compliance.city.max_incentive = Math.max(compliance.city.max_incentive || 0, program.incentive_amount_max || 0);
          return; // Don't assign elsewhere
        }
      }

      // Assign MWD programs to county level for LA County
      if (pid.includes('MWD') && county?.toLowerCase() === 'los angeles' && compliance.county) {
        compliance.county.incentives.push(formattedProgram);
        compliance.county.incentive_count++;
        compliance.county.max_incentive = Math.max(compliance.county.max_incentive || 0, program.incentive_amount_max || 0);
      }
      // Assign county-specific programs to county level
      else if (county && compliance.county && (
        pid.includes(`_COUNTY_${countyUpper}`) ||
        (notes.includes(county.toLowerCase()) && !programCityFor)
      )) {
        compliance.county.incentives.push(formattedProgram);
        compliance.county.incentive_count++;
        compliance.county.max_incentive = Math.max(compliance.county.max_incentive || 0, program.incentive_amount_max || 0);
      }
      // Assign state-level programs (no county/city specificity)
      else if (compliance.state && !programCityFor && !pid.includes('_COUNTY_') && !pid.includes('MWD')) {
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