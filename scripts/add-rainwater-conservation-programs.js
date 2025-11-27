const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

// Rainwater harvesting programs
const rainwaterPrograms = [
  // Arizona
  {
    program_id: 'AZ_STATE_RAINWATER_TAX_CREDIT',
    program_name: 'Arizona Rainwater Harvesting Tax Credit',
    program_type: 'tax_credit',
    resource_type: 'rainwater',
    incentive_amount_min: 0,
    incentive_amount_max: 1000,
    eligible_system_types: 'Rain barrels, cisterns, rainwater harvesting systems',
    application_url: 'https://azdor.gov/tax-credits',
    program_status: 'active',
    notes: 'Arizona state income tax credit of 25% of system cost up to $1,000',
    residential_eligible: true,
    commercial_eligible: true,
    program_description: 'Arizona offers a 25% state income tax credit for the purchase and installation of rainwater harvesting systems. The credit applies to tanks, pumps, filtration equipment, and installation costs.',
    eligibility_details: 'Available to Arizona residents and businesses who install qualifying rainwater harvesting systems on their property.',
    how_to_apply: 'Claim the credit when filing your Arizona state income tax return using Form 310.',
    coverage_area: 'Statewide'
  },
  {
    program_id: 'AZ_TUCSON_RAINWATER_REBATE',
    program_name: 'Tucson Water Rain Barrel & Cistern Rebate',
    program_type: 'rebate',
    resource_type: 'rainwater',
    incentive_amount_min: 75,
    incentive_amount_max: 2000,
    eligible_system_types: 'Rain barrels, cisterns',
    application_url: 'https://www.tucsonaz.gov/water/rainwater-harvesting',
    program_status: 'active',
    notes: 'Tucson Water rebates for rainwater harvesting - Level 1 (up to $500) and Level 2 (up to $2,000)',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Tucson Water',
    program_description: 'Tucson Water offers two levels of rainwater harvesting rebates. Level 1 provides up to 50% rebate (max $500) for simple rain barrel systems. Level 2 provides rebates up to $2,000 for larger cistern installations.',
    eligibility_details: 'Must be a Tucson Water customer. System must be installed by qualified contractor for Level 2.',
    how_to_apply: 'Apply through Tucson Water website. Pre-approval required before purchase.',
    coverage_area: 'Tucson Water service area'
  },
  // Texas
  {
    program_id: 'TX_STATE_RAINWATER_TAX_EXEMPTION',
    program_name: 'Texas Rainwater Harvesting Sales Tax Exemption',
    program_type: 'tax_exemption',
    resource_type: 'rainwater',
    incentive_amount_min: null,
    incentive_amount_max: null,
    eligible_system_types: 'All rainwater harvesting equipment',
    application_url: 'https://comptroller.texas.gov/taxes/sales/faq/rainwater.php',
    program_status: 'active',
    notes: 'Texas exempts rainwater harvesting equipment from state sales tax',
    residential_eligible: true,
    commercial_eligible: true,
    program_description: 'Texas provides a complete sales tax exemption for equipment used to collect, store, and use rainwater. This includes tanks, pumps, filters, and related equipment.',
    eligibility_details: 'Equipment must be used exclusively for rainwater harvesting purposes.',
    how_to_apply: 'Present exemption certificate (Form 01-339) to vendor at time of purchase.',
    coverage_area: 'Statewide'
  },
  {
    program_id: 'TX_AUSTIN_RAIN_BARREL_REBATE',
    program_name: 'Austin Water Rain Barrel Rebate',
    program_type: 'rebate',
    resource_type: 'rainwater',
    incentive_amount_min: 30,
    incentive_amount_max: 500,
    eligible_system_types: 'Rain barrels, cisterns',
    application_url: 'https://www.austintexas.gov/department/rainwater-harvesting-rebates',
    program_status: 'active',
    notes: 'Austin Water rebate up to $0.50/gallon capacity for rainwater systems',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Austin Water',
    program_description: 'Austin Water provides rebates of $0.50 per gallon of storage capacity for rainwater harvesting systems. Residential customers can receive up to $500.',
    eligibility_details: 'Must be Austin Water customer. System must have minimum 50-gallon capacity.',
    how_to_apply: 'Apply online through Austin Water website. Submit photos and receipts after installation.',
    coverage_area: 'Austin Water service area'
  },
  // Virginia
  {
    program_id: 'VA_STATE_RAINWATER_TAX_CREDIT',
    program_name: 'Virginia Rainwater Harvesting Tax Credit',
    program_type: 'tax_credit',
    resource_type: 'rainwater',
    incentive_amount_min: 0,
    incentive_amount_max: 2000,
    eligible_system_types: 'Rainwater harvesting systems',
    application_url: 'https://www.deq.virginia.gov/water/water-conservation',
    program_status: 'active',
    notes: 'Virginia tax credit of 50% of installation cost up to $2,000 (residential) or $50,000 (commercial)',
    residential_eligible: true,
    commercial_eligible: true,
    program_description: 'Virginia Senate Bill 1416 provides a state income tax credit equal to 50% of the cost of installing a rainwater harvesting system. Residential credit capped at $2,000, commercial at $50,000.',
    eligibility_details: 'Must be Virginia taxpayer. System must be new installation on property you own.',
    how_to_apply: 'Claim credit on Virginia state tax return. Keep receipts and installation documentation.',
    coverage_area: 'Statewide'
  },
  {
    program_id: 'VA_STATE_RAINWATER_REIMBURSEMENT',
    program_name: 'Virginia Rainwater Tank Reimbursement',
    program_type: 'rebate',
    resource_type: 'rainwater',
    incentive_amount_min: 1000,
    incentive_amount_max: 20000,
    eligible_system_types: 'Rainwater tanks over 250 gallons',
    application_url: 'https://www.deq.virginia.gov/water/water-conservation',
    program_status: 'active',
    notes: 'Virginia reimbursement of $4/gallon capacity for tanks over 250 gallons, up to $20,000',
    residential_eligible: true,
    commercial_eligible: true,
    program_description: 'In addition to the tax credit, Virginia offers reimbursement of $4 per gallon of roof runoff collected for systems with tanks larger than 250 gallons. Maximum reimbursement is $20,000.',
    eligibility_details: 'Tank must be larger than 250 gallons. Must apply within one year of installation.',
    how_to_apply: 'Apply through Virginia DEQ. Submit system specifications and proof of installation.',
    coverage_area: 'Statewide'
  },
  // Rhode Island
  {
    program_id: 'RI_STATE_CISTERN_TAX_CREDIT',
    program_name: 'Rhode Island Cistern Tax Credit',
    program_type: 'tax_credit',
    resource_type: 'rainwater',
    incentive_amount_min: 0,
    incentive_amount_max: null,
    eligible_system_types: 'Cisterns',
    application_url: 'https://dem.ri.gov/',
    program_status: 'active',
    notes: 'Rhode Island 10% state income tax credit for cistern installation (House Bill 7070)',
    residential_eligible: true,
    commercial_eligible: true,
    program_description: 'Rhode Island House Bill 7070 provides a 10% state income tax credit for the installation of cisterns to collect rainwater. Available to both individuals and businesses.',
    eligibility_details: 'Must be Rhode Island taxpayer. Cistern must be installed on property you own.',
    how_to_apply: 'Claim credit on Rhode Island state tax return.',
    coverage_area: 'Statewide'
  },
  // Georgia
  {
    program_id: 'GA_STATE_WATER_EFFICIENCY_TAX_CREDIT',
    program_name: 'Georgia Water Efficiency Tax Credit',
    program_type: 'tax_credit',
    resource_type: 'rainwater',
    incentive_amount_min: 0,
    incentive_amount_max: 2500,
    eligible_system_types: 'Rainwater harvesting and water efficiency equipment',
    application_url: 'https://dor.georgia.gov/',
    program_status: 'active',
    notes: 'Georgia 25% income tax credit up to $2,500 for water efficiency equipment including rainwater systems',
    residential_eligible: true,
    commercial_eligible: false,
    program_description: 'Georgia offers a 25% state income tax credit for the purchase of water conservation and efficiency equipment, including rainwater harvesting systems. Maximum credit is $2,500.',
    eligibility_details: 'Available to Georgia residents. Equipment must be for residential use.',
    how_to_apply: 'Claim on Georgia state income tax return. Keep receipts for equipment purchases.',
    coverage_area: 'Statewide'
  },
  // California - Various utilities
  {
    program_id: 'CA_LADWP_RAIN_BARREL_REBATE',
    program_name: 'LADWP Rain Barrel Rebate',
    program_type: 'rebate',
    resource_type: 'rainwater',
    incentive_amount_min: 35,
    incentive_amount_max: 75,
    eligible_system_types: 'Rain barrels',
    application_url: 'https://www.ladwp.com/save-money/rebates-programs',
    program_status: 'active',
    notes: 'LADWP rebate for rain barrels - $35 for first barrel, up to $75 total',
    residential_eligible: true,
    commercial_eligible: false,
    water_utility: 'LADWP',
    program_description: 'Los Angeles Department of Water and Power offers rebates for rain barrels. $35 rebate for first barrel, additional rebates available up to $75 total.',
    eligibility_details: 'Must be LADWP residential customer.',
    how_to_apply: 'Apply online through LADWP rebate portal.',
    coverage_area: 'LADWP service area'
  },
  {
    program_id: 'CA_MWD_RAIN_BARREL_REBATE',
    program_name: 'SoCal Water$mart Rain Barrel Rebate',
    program_type: 'rebate',
    resource_type: 'rainwater',
    incentive_amount_min: 35,
    incentive_amount_max: 75,
    eligible_system_types: 'Rain barrels (minimum 50 gallons)',
    application_url: 'https://socalwatersmart.com/',
    program_status: 'active',
    notes: 'MWD regional rain barrel rebate program',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Metropolitan Water District',
    program_description: 'The Metropolitan Water District SoCal Water$mart program provides rebates for rain barrels with minimum 50-gallon capacity.',
    eligibility_details: 'Must be customer of MWD member agency in Southern California.',
    how_to_apply: 'Apply through SoCalWaterSmart.com. Pre-approval required.',
    coverage_area: 'MWD service area (Southern California)'
  }
];

// Conservation programs (turf removal, smart irrigation, etc.)
const conservationPrograms = [
  // California - Turf Removal
  {
    program_id: 'CA_LADWP_TURF_REPLACEMENT',
    program_name: 'LADWP Turf Replacement Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'turf_removal',
    incentive_amount_min: 500,
    incentive_amount_max: 10000,
    eligible_system_types: 'Lawn-to-garden conversion',
    application_url: 'https://www.ladwp.com/save-money/rebates-programs/lawn-be-gone',
    program_status: 'active',
    notes: 'LADWP pays $3/sq ft for residential lawn removal, up to $10,000',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'LADWP',
    program_description: 'LADWP\'s turf replacement program pays $3 per square foot for removing lawn and replacing with drought-tolerant landscaping. Residential cap is $10,000, commercial is higher.',
    eligibility_details: 'Must be LADWP customer. Minimum 250 sq ft removal. Must replace with qualifying plants.',
    how_to_apply: 'Pre-approval required. Apply online, submit before/after photos.',
    coverage_area: 'LADWP service area'
  },
  {
    program_id: 'CA_MWD_TURF_REPLACEMENT',
    program_name: 'SoCal Water$mart Turf Replacement',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'turf_removal',
    incentive_amount_min: 500,
    incentive_amount_max: 6000,
    eligible_system_types: 'Lawn-to-garden conversion',
    application_url: 'https://socalwatersmart.com/residential/turf-replacement/',
    program_status: 'active',
    notes: 'MWD regional turf replacement program - $2/sq ft up to 3,000 sq ft',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Metropolitan Water District',
    program_description: 'The SoCal Water$mart turf replacement program offers $2 per square foot for replacing lawn with California-friendly landscaping. Maximum 3,000 square feet per property.',
    eligibility_details: 'Must be customer of MWD member agency. Minimum 250 sq ft.',
    how_to_apply: 'Apply through SoCalWaterSmart.com. Pre-approval required before removal.',
    coverage_area: 'MWD service area (Southern California)'
  },
  // Smart Irrigation Controllers
  {
    program_id: 'CA_MWD_SMART_CONTROLLER',
    program_name: 'SoCal Water$mart Smart Controller Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'smart_irrigation',
    incentive_amount_min: 80,
    incentive_amount_max: 250,
    eligible_system_types: 'Weather-based irrigation controllers (WBIC)',
    application_url: 'https://socalwatersmart.com/residential/rebates/',
    program_status: 'active',
    notes: 'Rebate for WaterSense-labeled smart irrigation controllers',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Metropolitan Water District',
    program_description: 'Rebates for WaterSense-labeled weather-based irrigation controllers that automatically adjust watering based on weather conditions.',
    eligibility_details: 'Controller must be WaterSense labeled. Must be MWD member agency customer.',
    how_to_apply: 'Apply through SoCalWaterSmart.com after purchase.',
    coverage_area: 'MWD service area'
  },
  {
    program_id: 'CA_EBMUD_SMART_CONTROLLER',
    program_name: 'EBMUD Smart Irrigation Controller Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'smart_irrigation',
    incentive_amount_min: 50,
    incentive_amount_max: 200,
    eligible_system_types: 'Weather-based irrigation controllers',
    application_url: 'https://www.ebmud.com/water/conservation-rebates-programs/',
    program_status: 'active',
    notes: 'EBMUD rebate for smart irrigation controllers',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'East Bay MUD',
    program_description: 'East Bay Municipal Utility District offers rebates for smart irrigation controllers to help reduce outdoor water use.',
    eligibility_details: 'Must be EBMUD customer. Controller must be WaterSense certified.',
    how_to_apply: 'Apply online through EBMUD website.',
    coverage_area: 'EBMUD service area (East Bay)'
  },
  // High-Efficiency Fixtures
  {
    program_id: 'CA_MWD_HE_TOILET',
    program_name: 'SoCal Water$mart High-Efficiency Toilet Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'efficient_fixtures',
    incentive_amount_min: 40,
    incentive_amount_max: 100,
    eligible_system_types: 'WaterSense toilets (1.28 gpf or less)',
    application_url: 'https://socalwatersmart.com/residential/rebates/',
    program_status: 'active',
    notes: 'Rebate for replacing old toilets with WaterSense models',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Metropolitan Water District',
    program_description: 'Rebates for replacing older toilets (3.5 gpf or higher) with WaterSense-labeled high-efficiency toilets using 1.28 gallons per flush or less.',
    eligibility_details: 'Must replace toilet using 3.5 gpf or more. New toilet must be WaterSense labeled.',
    how_to_apply: 'Apply through SoCalWaterSmart.com.',
    coverage_area: 'MWD service area'
  },
  // Texas
  {
    program_id: 'TX_AUSTIN_IRRIGATION_UPGRADE',
    program_name: 'Austin Water Irrigation System Upgrade',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'smart_irrigation',
    incentive_amount_min: 100,
    incentive_amount_max: 500,
    eligible_system_types: 'Drip irrigation, smart controllers, pressure regulators',
    application_url: 'https://www.austintexas.gov/department/irrigation-rebates',
    program_status: 'active',
    notes: 'Austin Water rebates for irrigation system improvements',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Austin Water',
    program_description: 'Austin Water provides rebates for converting spray irrigation to drip systems, installing smart controllers, and other irrigation improvements.',
    eligibility_details: 'Must be Austin Water customer. Pre-inspection required.',
    how_to_apply: 'Schedule free irrigation consultation first. Apply after improvements.',
    coverage_area: 'Austin Water service area'
  },
  // Arizona
  {
    program_id: 'AZ_PHOENIX_SMART_CONTROLLER',
    program_name: 'Phoenix Water Smart Irrigation Controller Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'smart_irrigation',
    incentive_amount_min: 50,
    incentive_amount_max: 200,
    eligible_system_types: 'WaterSense smart irrigation controllers',
    application_url: 'https://www.phoenix.gov/waterservices/conservation',
    program_status: 'active',
    notes: 'Phoenix Water rebate for weather-based irrigation controllers',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Phoenix Water',
    program_description: 'Phoenix Water Services offers rebates for WaterSense-labeled smart irrigation controllers that adjust watering based on weather and soil conditions.',
    eligibility_details: 'Must be Phoenix Water customer. Controller must be WaterSense certified.',
    how_to_apply: 'Apply online through Phoenix Water conservation portal.',
    coverage_area: 'Phoenix Water service area'
  },
  // Nevada
  {
    program_id: 'NV_SNWA_TURF_CONVERSION',
    program_name: 'SNWA Water Smart Landscapes Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'turf_removal',
    incentive_amount_min: 1000,
    incentive_amount_max: 12000,
    eligible_system_types: 'Lawn-to-desert landscape conversion',
    application_url: 'https://www.snwa.com/rebates/wsl/index.html',
    program_status: 'active',
    notes: 'SNWA pays $3/sq ft for grass removal up to 10,000 sq ft',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Southern Nevada Water Authority',
    program_description: 'Southern Nevada Water Authority pays $3 per square foot for removing grass and replacing with water-smart desert landscaping. One of the highest rebates in the country.',
    eligibility_details: 'Must be SNWA member agency customer. Minimum 100 sq ft, maximum 10,000 sq ft first year.',
    how_to_apply: 'Pre-approval required. Apply online, schedule pre-conversion inspection.',
    coverage_area: 'Las Vegas Valley'
  },
  // Colorado
  {
    program_id: 'CO_DENVER_TURF_REPLACEMENT',
    program_name: 'Denver Water Lawn Replacement Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'turf_removal',
    incentive_amount_min: 500,
    incentive_amount_max: 3000,
    eligible_system_types: 'Lawn-to-xeriscape conversion',
    application_url: 'https://www.denverwater.org/rebates',
    program_status: 'active',
    notes: 'Denver Water rebate for replacing lawn with xeric landscaping',
    residential_eligible: true,
    commercial_eligible: true,
    water_utility: 'Denver Water',
    program_description: 'Denver Water offers rebates for replacing traditional lawn with xeric (low-water) landscaping. Rebate amount varies by square footage converted.',
    eligibility_details: 'Must be Denver Water customer. Must replace with approved xeric plants.',
    how_to_apply: 'Apply through Denver Water website. Pre-approval required.',
    coverage_area: 'Denver Water service area'
  }
];

async function addPrograms() {
  console.log('📊 Adding rainwater and conservation programs...\n');

  const allPrograms = [...rainwaterPrograms, ...conservationPrograms];

  console.log(`📄 Preparing ${allPrograms.length} programs to add:`);
  console.log(`   - ${rainwaterPrograms.length} rainwater programs`);
  console.log(`   - ${conservationPrograms.length} conservation programs\n`);

  try {
    const table = bigquery.dataset(datasetId).table('programs_master');

    // Add created_at and updated_at timestamps
    const now = new Date().toISOString();
    const programsWithTimestamps = allPrograms.map(p => ({
      ...p,
      created_at: now,
      updated_at: now
    }));

    // Insert programs
    console.log('📤 Inserting programs...');
    await table.insert(programsWithTimestamps, {
      skipInvalidRows: false,
      ignoreUnknownValues: true
    });

    console.log(`   ✅ Inserted ${allPrograms.length} programs\n`);

    // Verify
    console.log('🔍 Verifying programs by resource_type...');
    const [rows] = await bigquery.query({
      query: `
        SELECT resource_type, COUNT(*) as count
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.programs_master\`
        GROUP BY resource_type
        ORDER BY resource_type
      `,
      location: 'US'
    });

    console.log('\n📋 Programs by resource_type:');
    rows.forEach(row => {
      console.log(`   ${row.resource_type || 'NULL'}: ${row.count} programs`);
    });

    // Show sample of new programs
    console.log('\n📋 Sample new programs:');
    const [sampleRows] = await bigquery.query({
      query: `
        SELECT program_name, resource_type, program_subtype, incentive_amount_max
        FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.programs_master\`
        WHERE resource_type IN ('rainwater', 'conservation')
        ORDER BY resource_type, program_name
        LIMIT 15
      `,
      location: 'US'
    });

    sampleRows.forEach(row => {
      const subtype = row.program_subtype ? ` [${row.program_subtype}]` : '';
      const amount = row.incentive_amount_max ? ` - up to $${row.incentive_amount_max}` : '';
      console.log(`   [${row.resource_type}]${subtype} ${row.program_name}${amount}`);
    });

    console.log('\n✅ Programs added successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error.errors) {
      console.error('Insert errors:', JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

addPrograms();
