/**
 * California City Greywater Regulations
 *
 * This script inserts greywater regulation data for major California cities into BigQuery.
 * Data collected from official city building department websites, municipal codes,
 * and water utility sources.
 *
 * Date collected: January 2026
 */

const { BigQuery } = require('@google-cloud/bigquery');

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025';
const bigquery = new BigQuery({ projectId });
const datasetId = 'greywater_compliance';

// California City Regulations Data
// Schema: jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type,
//         regulation_status, legal_status, permit_required, permit_details, allowed_uses,
//         restrictions, local_code_reference, effective_date, notes, contact_department,
//         contact_phone, contact_email, website, last_updated
const cityRegulations = [
  // Los Angeles
  {
    jurisdiction_id: 'CA_CITY_LOS_ANGELES',
    jurisdiction_name: 'City of Los Angeles',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Clothes washer systems exempt from permit if no cutting of existing plumbing (1-2 family dwellings). All other systems require permit. Average cost $507 (plancheck $396 + permit $111). LA County Dept of Public Health approval required first.',
    allowed_uses: 'Subsurface landscape irrigation, mulch basin irrigation, laundry-to-landscape systems',
    restrictions: 'No surface irrigation. No toilet flushing (not currently approved). No graywater treatment systems for expanded uses. Must have backflow prevention if cross-connection risk. County Health stamp required before LADBS approval.',
    local_code_reference: 'Los Angeles Plumbing Code Chapter 15, LAMC Section 99.04.305',
    notes: 'City does not currently allow expanded uses like toilet flushing due to lack of approved standards.',
    contact_department: 'Los Angeles Department of Building and Safety (LADBS)',
    contact_phone: '(213) 482-0000',
    website: 'https://dbs.lacity.gov/',
    last_updated: '2026-01-10'
  },

  // San Diego
  {
    jurisdiction_id: 'CA_CITY_SAN_DIEGO',
    jurisdiction_name: 'City of San Diego',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Clothes washer systems exempt from permit if meeting specific requirements. Plumbing permit required for all other gray water systems. Historic review required if building 45+ years old.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems',
    restrictions: 'Surge tanks with overflows to sewer required for permitted systems. No surface irrigation. Operation and maintenance manual required.',
    local_code_reference: 'California Plumbing Code Chapter 16A, San Diego Municipal Code',
    notes: 'City requires surge tanks with overflows for all permitted systems, making some options difficult. Greywater rebates up to $1,000 available.',
    contact_department: 'Development Services Department',
    contact_phone: '(619) 446-5000',
    website: 'https://www.sandiego.gov/development-services',
    last_updated: '2026-01-10'
  },

  // San Jose
  {
    jurisdiction_id: 'CA_CITY_SAN_JOSE',
    jurisdiction_name: 'City of San Jose',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Single clothes washer graywater system does NOT require permit if no plumbing/electrical modifications. All other systems require building/plumbing permit.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems',
    restrictions: 'No modifications to plumbing or electrical for exempt systems. Three-way valve required for diversion. Clearly labeled controls required.',
    local_code_reference: 'California Plumbing Code Section 1503.0',
    notes: 'Santa Clara Valley Water District offers $200-$400 greywater rebate for L2L systems.',
    contact_department: 'Planning, Building and Code Enforcement',
    contact_email: 'InfoInspector@sanjoseca.gov',
    website: 'https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division',
    last_updated: '2026-01-10'
  },

  // San Francisco
  {
    jurisdiction_id: 'CA_CITY_SAN_FRANCISCO',
    jurisdiction_name: 'City and County of San Francisco',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry graywater systems exempt from permit if meeting design criteria. DBI Plumbing Permit required for other systems. SFDPH permit required for treated systems. Large developments 100,000+ sq ft must install onsite water reuse (as of Jan 2022).',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems, toilet flushing (with treatment for large developments), clothes washing (with treatment for large developments)',
    restrictions: 'Commercial buildings must meet toilet/urinal flushing demands with blackwater/condensate. Residential/mixed-use must meet toilet, irrigation, clothes washing with greywater/condensate.',
    local_code_reference: 'San Francisco Health Code Article 12C (Non-potable Water Ordinance)',
    notes: 'Non-potable Water Ordinance (2021) requires onsite water reuse for new large developments. SFPUC offers discounted L2L kits and $100 rebate.',
    contact_department: 'San Francisco Public Utilities Commission (SFPUC)',
    contact_phone: '(415) 551-4730',
    contact_email: 'waterconservation@sfwater.org',
    website: 'https://sfpuc.org/construction-contracts/design-guidelines-standards/onsite-water-reuse',
    last_updated: '2026-01-10'
  },

  // Fresno
  {
    jurisdiction_id: 'CA_CITY_FRESNO',
    jurisdiction_name: 'City of Fresno',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Follows California state plumbing code. Laundry-to-landscape systems under 250 GPD exempt from permit. Plumbing permit required for larger systems.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems',
    restrictions: 'Follow California Plumbing Code Chapter 15 requirements. No kitchen sink or dishwasher water. Must not leave property or reach waterways within 100 ft.',
    local_code_reference: 'California Plumbing Code Chapter 15',
    notes: 'Contact Building and Safety Division for specific requirements.',
    contact_department: 'Building and Safety Division',
    website: 'https://www.fresno.gov/planning/building-and-safety/',
    last_updated: '2026-01-10'
  },

  // Sacramento
  {
    jurisdiction_id: 'CA_CITY_SACRAMENTO',
    jurisdiction_name: 'City of Sacramento',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape exempt from permit under state code. Buildings 10,000+ sq ft require greywater systems for irrigation (new construction). Buildings 50,000+ sq ft require dual plumbing.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems',
    restrictions: 'May require separate sewer lines. Additional metering may be required. Flood protection measures may apply.',
    local_code_reference: 'Sacramento Municipal Code Section 15.24.050, California Plumbing Code Chapter 15',
    notes: 'City Council approved water recycling requirements for new commercial buildings in 2022.',
    contact_department: 'Community Development Department - Building Division',
    website: 'https://www.cityofsacramento.org/Community-Development/Building/Permit-Services',
    last_updated: '2026-01-10'
  },

  // Long Beach
  {
    jurisdiction_id: 'CA_CITY_LONG_BEACH',
    jurisdiction_name: 'City of Long Beach',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Follows California state plumbing code. Laundry-to-landscape exempt. Plumbing permit required for other systems.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems',
    restrictions: 'Follow California Plumbing Code Part 5 requirements. Must comply with CALGreen standards. Low Impact Development (LID) standards apply.',
    local_code_reference: 'Long Beach Municipal Code Title 18, California Plumbing Code',
    notes: 'Effective Jan 2026, must comply with 2025 California Building Standards Code.',
    contact_department: 'Building and Safety Bureau',
    website: 'https://www.longbeach.gov/lbcd/building/',
    last_updated: '2026-01-10'
  },

  // Oakland
  {
    jurisdiction_id: 'CA_CITY_OAKLAND',
    jurisdiction_name: 'City of Oakland',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'yes',
    permit_details: 'Oakland requires plumbing permits even for simple systems. City provides specific graywater permit application and checklist.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems, simple clothes washer diversion',
    restrictions: 'Graywater cannot irrigate edible portion of plants (root vegetables). Groundwater depth must be below 3 ft. Setbacks: 2 ft from structures, 1.5 ft from property line, 100 ft from streams/lakes, 10 ft from pressurized water main.',
    local_code_reference: 'California Plumbing Code Chapter 15, Oakland Building Code',
    notes: 'EBMUD offers graywater rebates up to $100 for Oakland residents.',
    contact_department: 'Building Services Department',
    contact_phone: '(510) 238-3891',
    website: 'https://www.oaklandca.gov/My-Household/Building-and-Remodeling/Homeowner-Projects-Permits/Greywater-Irrigation-System',
    last_updated: '2026-01-10'
  },

  // Santa Monica
  {
    jurisdiction_id: 'CA_CITY_SANTA_MONICA',
    jurisdiction_name: 'City of Santa Monica',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Triple permitting (plumbing, health, zoning) required. Lowest fee nearly $1,000. Laundry-to-landscape exempt under state code.',
    allowed_uses: 'Subsurface drip irrigation, mulch basin irrigation, laundry-to-landscape systems',
    restrictions: 'No spray irrigation. No ponding or runoff. Cannot discharge to storm system or surface water. Cannot irrigate root crops or edible parts touching soil.',
    local_code_reference: 'Santa Monica Municipal Code, Water Neutrality Ordinance (2017)',
    notes: 'Water Neutrality Ordinance requires new developments to meet historical water use averages. Design assistance available for water-saving systems.',
    contact_department: 'Building and Safety Division',
    contact_phone: '(310) 458-8355',
    website: 'https://www.santamonica.gov/plan-review',
    last_updated: '2026-01-10'
  },

  // Pasadena
  {
    jurisdiction_id: 'CA_CITY_PASADENA',
    jurisdiction_name: 'City of Pasadena',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Three types: L2L (no permit), Simple (permit required, max 250 GPD), Complex (permit required, over 250 GPD). PWP offers streamlined permit process and rebate for permit fees.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems, bathtub/shower/bathroom sink water (with permit)',
    restrictions: 'Simple systems max 250 GPD discharge. No toilet, kitchen sink, or dishwasher water. PWP pre-approval required before permit.',
    local_code_reference: 'California Plumbing Code Chapter 15',
    notes: 'PWP offers FREE Laundry-to-Landscape installation program with supplies from Landscape Warehouse and monthly training workshops.',
    contact_department: 'Pasadena Water and Power / Planning and Community Development',
    contact_phone: '(626) 744-4655',
    contact_email: 'greywater@cityofpasadena.net',
    website: 'https://pwp.cityofpasadena.net/greywatersystems/',
    last_updated: '2026-01-10'
  },

  // Santa Barbara
  {
    jurisdiction_id: 'CA_CITY_SANTA_BARBARA',
    jurisdiction_name: 'City of Santa Barbara',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Follows California Plumbing Code Chapter 15. Laundry-to-landscape exempt. Building/plumbing permit for other systems.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems, graywater systems (with irrigation efficiency rebate)',
    restrictions: 'Must comply with 2025 Building Standards Code (effective Jan 2026).',
    local_code_reference: 'California Plumbing Code Chapter 15, Santa Barbara Municipal Code',
    notes: 'Graywater systems included under Irrigation Efficiency Rebates. Also Sustainable Lawn Replacement rebate ($2/sq ft), Storm Water Rebate (up to $5,000 residential, $15,000 commercial).',
    contact_department: 'Building & Safety Division',
    contact_phone: '(805) 963-0611',
    website: 'https://santabarbaraca.gov/government/departments/community-development/building-safety',
    last_updated: '2026-01-10'
  },

  // Berkeley
  {
    jurisdiction_id: 'CA_CITY_BERKELEY',
    jurisdiction_name: 'City of Berkeley',
    jurisdiction_type: 'city',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Follows California Plumbing Code Chapter 15. Laundry-to-landscape exempt. Building/plumbing permit for other systems.',
    allowed_uses: 'Subsurface landscape irrigation, laundry-to-landscape systems',
    restrictions: 'Natural gas prohibition for new buildings applies. Gas shut-off valve requirements. Energy reach codes and green building codes apply.',
    local_code_reference: 'California Plumbing Code Chapter 15, Berkeley Municipal Code',
    notes: 'Berkeley has additional local sustainability requirements. EBMUD offers graywater rebates up to $100 for L2L system components.',
    contact_department: 'Building and Safety Division',
    contact_email: 'buildingandsafety@berkeleyca.gov',
    website: 'https://berkeleyca.gov/construction-development/permits-design-parameters',
    last_updated: '2026-01-10'
  }
];

// California City Incentive Programs Data
const cityPrograms = [
  // San Diego Greywater Rebate
  {
    program_id: 'CA_SAN_DIEGO_GREYWATER_REBATE_2026',
    program_name: 'San Diego Graywater Rebate Program',
    program_type: 'rebate',
    incentive_amount_min: 150,
    incentive_amount_max: 1000,
    application_url: 'https://www.sandiego.gov/public-utilities/sustainability/water-conservation/rebates',
    program_status: 'active',
    notes: 'Rebates starting at $150 for no-permit laundry systems, up to $1,000 for residential greywater systems.',
    residential_eligible: true,
    commercial_eligible: false,
    resource_type: 'greywater',
    water_utility: 'City of San Diego Public Utilities',
    jurisdiction_id: 'CA_CITY_SAN_DIEGO'
  },

  // Santa Clara Valley Water District Greywater Rebate
  {
    program_id: 'CA_SANTA_CLARA_VALLEY_GREYWATER_REBATE_2026',
    program_name: 'Santa Clara Valley Water District Graywater Rebate',
    program_type: 'rebate',
    incentive_amount_min: 200,
    incentive_amount_max: 400,
    application_url: 'https://www.valleywater.org/saving-water/rebates-surveys/graywater-rebate',
    program_status: 'active',
    notes: '$200 or $400 rebate for Laundry-to-Landscape systems. Pre-inspection required. System must be gravity-fed with no filters, tanks, or pumps. Mulch basins required.',
    residential_eligible: true,
    commercial_eligible: false,
    resource_type: 'greywater',
    water_utility: 'Santa Clara Valley Water District',
    jurisdiction_id: 'CA_CITY_SAN_JOSE'
  },

  // SFPUC Laundry-to-Landscape Rebate
  {
    program_id: 'CA_SFPUC_L2L_REBATE_2026',
    program_name: 'SFPUC Laundry-to-Landscape Rebate',
    program_type: 'rebate',
    incentive_amount_max: 100,
    application_url: 'https://sfpuc.org/learning/conserve-water/save-water-outdoors',
    program_status: 'active',
    notes: 'Up to $100 rebate for 3 essential L2L graywater components (brass diverter, anti-siphon valve, PVC conveyance line). Single/two-unit residential only. Yard must be flat or slope down from washer.',
    residential_eligible: true,
    commercial_eligible: false,
    resource_type: 'greywater',
    water_utility: 'San Francisco Public Utilities Commission',
    jurisdiction_id: 'CA_CITY_SAN_FRANCISCO'
  },

  // Pasadena Water & Power Free L2L Program
  {
    program_id: 'CA_PWP_FREE_L2L_PROGRAM_2026',
    program_name: 'Pasadena Water & Power Free L2L Greywater Program',
    program_type: 'free_installation',
    application_url: 'https://pwp.cityofpasadena.net/greywatersystems/',
    program_status: 'active',
    notes: 'FREE no-cost Laundry-to-Landscape installation for PWP single-family customers. Supplies redeemed through Landscape Warehouse. Monthly training workshops with Greywater Action. Saves 9,000-14,000 gallons/year ($55-86/year).',
    residential_eligible: true,
    commercial_eligible: false,
    resource_type: 'greywater',
    water_utility: 'Pasadena Water and Power',
    jurisdiction_id: 'CA_CITY_PASADENA'
  },

  // Santa Barbara Irrigation Efficiency Rebate
  {
    program_id: 'CA_SANTA_BARBARA_IRRIGATION_REBATE_2026',
    program_name: 'Santa Barbara Irrigation Efficiency Rebate',
    program_type: 'rebate',
    incentive_amount_max: 5000,
    application_url: 'https://santabarbaraca.gov/government/departments/public-works/water-resources/water-conservation/rebates',
    program_status: 'active',
    notes: 'Includes graywater systems as eligible projects. Also covers drip irrigation, low-precipitation nozzles, smart controllers. Single-family up to $5,000, commercial up to $15,000.',
    residential_eligible: true,
    commercial_eligible: true,
    resource_type: 'greywater',
    water_utility: 'City of Santa Barbara',
    jurisdiction_id: 'CA_CITY_SANTA_BARBARA'
  },

  // EBMUD Graywater Rebate (Berkeley)
  {
    program_id: 'CA_EBMUD_GREYWATER_REBATE_BERKELEY_2026',
    program_name: 'EBMUD Graywater Rebate (Berkeley)',
    program_type: 'rebate',
    incentive_amount_max: 100,
    application_url: 'https://www.ebmud.com/water/conservation-and-rebates/rebates/graywater-rebates',
    program_status: 'active',
    notes: 'Up to $100 for L2L system components: brass three-way diverter, air admittance or anti-siphon valve, PVC conveyance line. Submit completed application and receipts within 90 days of purchase.',
    contact_email: 'waterconservation@ebmud.com',
    residential_eligible: true,
    commercial_eligible: true,
    resource_type: 'greywater',
    water_utility: 'East Bay Municipal Utility District',
    jurisdiction_id: 'CA_CITY_BERKELEY'
  },

  // EBMUD Graywater Rebate (Oakland)
  {
    program_id: 'CA_EBMUD_GREYWATER_REBATE_OAKLAND_2026',
    program_name: 'EBMUD Graywater Rebate (Oakland)',
    program_type: 'rebate',
    incentive_amount_max: 100,
    application_url: 'https://www.ebmud.com/water/conservation-and-rebates/rebates/graywater-rebates',
    program_status: 'active',
    notes: 'Up to $100 for L2L system components. Available to EBMUD customers with potable water service.',
    contact_email: 'waterconservation@ebmud.com',
    residential_eligible: true,
    commercial_eligible: true,
    resource_type: 'greywater',
    water_utility: 'East Bay Municipal Utility District',
    jurisdiction_id: 'CA_CITY_OAKLAND'
  }
];

async function insertRegulations() {
  console.log('Inserting California city greywater regulations...\n');

  const tableId = 'local_regulations';

  // Build rows for insert - use streaming insert API
  const rows = cityRegulations.map(reg => ({
    jurisdiction_id: reg.jurisdiction_id,
    jurisdiction_name: reg.jurisdiction_name,
    jurisdiction_type: reg.jurisdiction_type,
    state_code: reg.state_code,
    resource_type: reg.resource_type,
    regulation_status: reg.regulation_status || 'active',
    legal_status: reg.legal_status || 'permitted_with_conditions',
    permit_required: reg.permit_required,
    permit_details: reg.permit_details || '',
    allowed_uses: reg.allowed_uses || '',
    restrictions: reg.restrictions || '',
    local_code_reference: reg.local_code_reference || '',
    notes: reg.notes || '',
    contact_department: reg.contact_department || '',
    contact_phone: reg.contact_phone || '',
    contact_email: reg.contact_email || '',
    website: reg.website || '',
    last_updated: reg.last_updated
  }));

  try {
    // First delete existing records for these jurisdictions
    const jurisdictionIds = rows.map(r => `'${r.jurisdiction_id}'`).join(',');
    const deleteQuery = `
      DELETE FROM \`${projectId}.${datasetId}.${tableId}\`
      WHERE jurisdiction_id IN (${jurisdictionIds})
    `;

    console.log('Deleting existing records...');
    await bigquery.query(deleteQuery);

    // Now insert the new records
    console.log(`Inserting ${rows.length} city regulations...`);
    await bigquery.dataset(datasetId).table(tableId).insert(rows);

    console.log(`Successfully inserted ${rows.length} city regulations.`);

    // List what was inserted
    rows.forEach(r => console.log(`  - ${r.jurisdiction_id} (${r.jurisdiction_name})`));

  } catch (error) {
    if (error.name === 'PartialFailureError') {
      console.error('Some rows failed:', error.errors?.length || 'unknown');
      console.error('Details:', JSON.stringify(error.errors?.slice(0, 3), null, 2));
    } else {
      console.error('Error inserting regulations:', error.message);
      throw error;
    }
  }
}

async function insertPrograms() {
  console.log('\nInserting California city greywater incentive programs...\n');

  const programRows = [];
  const linkRows = [];
  const sectorRows = [];
  const waterTypeRows = [];

  for (const program of cityPrograms) {
    const jurisdictionId = program.jurisdiction_id;
    delete program.jurisdiction_id; // Remove from program row

    // Add to programs_master
    programRows.push({
      program_id: program.program_id,
      program_name: program.program_name,
      program_type: program.program_type,
      incentive_amount_min: program.incentive_amount_min || null,
      incentive_amount_max: program.incentive_amount_max || null,
      incentive_per_unit: program.incentive_per_unit || null,
      eligible_system_types: 'GREYWATER',
      application_url: program.application_url,
      program_status: program.program_status || 'active',
      notes: program.notes || null,
      contact_email: program.contact_email || null,
      contact_phone: program.contact_phone || null,
      residential_eligible: program.residential_eligible || false,
      commercial_eligible: program.commercial_eligible || false,
      resource_type: program.resource_type || 'greywater',
      water_utility: program.water_utility || null
    });

    // Add jurisdiction link
    linkRows.push({
      program_id: program.program_id,
      jurisdiction_id: jurisdictionId
    });

    // Add sector links
    if (program.residential_eligible) {
      sectorRows.push({
        program_id: program.program_id,
        sector_id: 'RESIDENTIAL'
      });
    }
    if (program.commercial_eligible) {
      sectorRows.push({
        program_id: program.program_id,
        sector_id: 'COMMERCIAL'
      });
    }

    // Add water type links
    waterTypeRows.push({
      program_id: program.program_id,
      water_type_id: 'GREYWATER'
    });
  }

  console.log(`Programs to insert: ${programRows.length}`);
  console.log(`Jurisdiction links: ${linkRows.length}`);
  console.log(`Sector links: ${sectorRows.length}`);
  console.log(`Water type links: ${waterTypeRows.length}\n`);

  try {
    // Delete existing programs first
    const programIds = programRows.map(r => `'${r.program_id}'`).join(',');

    const deleteQueries = [
      `DELETE FROM \`${projectId}.${datasetId}.program_water_type_link\` WHERE program_id IN (${programIds})`,
      `DELETE FROM \`${projectId}.${datasetId}.program_sector_link\` WHERE program_id IN (${programIds})`,
      `DELETE FROM \`${projectId}.${datasetId}.program_jurisdiction_link\` WHERE program_id IN (${programIds})`,
      `DELETE FROM \`${projectId}.${datasetId}.programs_master\` WHERE program_id IN (${programIds})`
    ];

    console.log('Deleting existing program records...');
    for (const query of deleteQueries) {
      try {
        await bigquery.query(query);
      } catch (e) {
        // Table may not exist or query may fail, continue
      }
    }

    // Insert programs
    if (programRows.length > 0) {
      await bigquery.dataset(datasetId).table('programs_master').insert(programRows);
      console.log('Programs inserted into programs_master');
    }

    // Insert jurisdiction links
    if (linkRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_jurisdiction_link').insert(linkRows);
      console.log('Jurisdiction links inserted');
    }

    // Insert sector links
    if (sectorRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_sector_link').insert(sectorRows);
      console.log('Sector links inserted');
    }

    // Insert water type links
    if (waterTypeRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_water_type_link').insert(waterTypeRows);
      console.log('Water type links inserted');
    }

    console.log('\nAll city programs successfully added!');
    programRows.forEach(p => console.log(`  - ${p.program_id}`));

  } catch (error) {
    if (error.name === 'PartialFailureError') {
      console.error('Some rows failed (may already exist):', error.errors?.length || 'unknown');
      // Log first few errors for debugging
      if (error.errors) {
        error.errors.slice(0, 3).forEach((e, i) => {
          console.error(`  Error ${i + 1}:`, JSON.stringify(e));
        });
      }
    } else {
      console.error('Error:', error.message);
      throw error;
    }
  }
}

async function verifyData() {
  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION');
  console.log('='.repeat(60) + '\n');

  // Check regulations
  const regQuery = `
    SELECT jurisdiction_id, jurisdiction_name, permit_required
    FROM \`${projectId}.${datasetId}.local_regulations\`
    WHERE state_code = 'CA' AND jurisdiction_type = 'city'
    ORDER BY jurisdiction_name
  `;

  try {
    const [regRows] = await bigquery.query(regQuery);
    console.log(`California city regulations in database: ${regRows.length}`);
    console.table(regRows);
  } catch (error) {
    console.log('Could not query regulations:', error.message);
  }

  // Check programs
  const progQuery = `
    SELECT pm.program_id, pm.program_name, pm.incentive_amount_max, pjl.jurisdiction_id
    FROM \`${projectId}.${datasetId}.programs_master\` pm
    JOIN \`${projectId}.${datasetId}.program_jurisdiction_link\` pjl ON pm.program_id = pjl.program_id
    WHERE pjl.jurisdiction_id LIKE 'CA_CITY_%'
    ORDER BY pm.program_name
  `;

  try {
    const [progRows] = await bigquery.query(progQuery);
    console.log(`\nCalifornia city incentive programs in database: ${progRows.length}`);
    console.table(progRows);
  } catch (error) {
    console.log('Could not query programs:', error.message);
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('California City Greywater Regulations - BigQuery Insert');
  console.log('='.repeat(60));
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${datasetId}`);
  console.log(`Date: ${new Date().toISOString().split('T')[0]}`);
  console.log('='.repeat(60) + '\n');

  await insertRegulations();
  await insertPrograms();
  await verifyData();

  console.log('\nDone!');
}

main().catch(console.error);
