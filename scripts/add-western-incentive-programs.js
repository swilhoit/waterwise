const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

// New incentive programs for Western US states based on research
const NEW_PROGRAMS = [
  // NEVADA - Las Vegas / Southern Nevada
  {
    program_id: 'NV_SNWA_WSL_2025',
    program_name: 'SNWA Water Smart Landscapes Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'landscape_conversion',
    incentive_amount_min: 350,
    incentive_amount_max: 50000,
    incentive_per_unit: '$3.50-$5 per sq ft (up to 10,000 sq ft at higher rate)',
    application_url: 'https://www.snwa.com/rebates/wsl/',
    program_status: 'active',
    water_utility: 'Southern Nevada Water Authority',
    coverage_area: 'Las Vegas Valley',
    program_description: 'Convert grass to water-efficient, drip-irrigated landscaping. $5/sq ft for first 10,000 sq ft (through 2024), $3.50/sq ft after. Minimum 400 sq ft conversion.',
    eligibility_details: 'Single-family property owners in SNWA service area. Must have existing grass lawn to convert.',
    residential_eligible: true,
    commercial_eligible: false,
    pre_approval_required: true,
    inspection_required: true,
    product_requirements: 'Must use approved water-smart plants from SNWA list. 50% minimum plant coverage required.',
    verified_date: '2025-01-30'
  },
  {
    program_id: 'NV_HENDERSON_WSL_2025',
    program_name: 'City of Henderson Landscape Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'landscape_conversion',
    incentive_amount_min: 575,
    incentive_amount_max: 575,
    incentive_per_unit: 'Flat $575 bonus on top of SNWA rebate',
    application_url: 'https://www.cityofhenderson.com/government/departments/utility-services/water-conservation/rebate-programs',
    program_status: 'active',
    water_utility: 'City of Henderson',
    coverage_area: 'Henderson, NV',
    program_description: 'Additional $575 rebate for Henderson residents who complete SNWA Water Smart Landscapes conversion.',
    eligibility_details: 'Must first apply and qualify for SNWA Water Smart Landscapes rebate.',
    residential_eligible: true,
    commercial_eligible: false,
    pre_approval_required: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'NV_SNWA_SMART_CONTROLLER_2025',
    program_name: 'SNWA Smart Irrigation Controller Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'irrigation_equipment',
    incentive_amount_min: 50,
    incentive_amount_max: 100,
    incentive_per_unit: '50% off up to $100',
    application_url: 'https://www.snwa.com/rebates/',
    program_status: 'active',
    water_utility: 'Southern Nevada Water Authority',
    coverage_area: 'Las Vegas Valley',
    program_description: 'Save 50% off the purchase price or up to $100, whichever is less, on a WaterSense-labeled smart irrigation controller.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'NV_SNWA_LEAK_DETECTOR_2025',
    program_name: 'SNWA Smart Leak Detector Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'leak_detection',
    incentive_amount_min: 100,
    incentive_amount_max: 200,
    incentive_per_unit: '50% off up to $200',
    application_url: 'https://www.snwa.com/rebates/',
    program_status: 'active',
    water_utility: 'Southern Nevada Water Authority',
    coverage_area: 'Las Vegas Valley',
    program_description: 'Rebate of 50% off up to $200 when you purchase a Smart Leak Detector.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'NV_SNWA_TREE_2025',
    program_name: 'SNWA Tree Enhancement Program',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'landscape_conversion',
    incentive_amount_min: 100,
    incentive_amount_max: 1000,
    incentive_per_unit: '$100 per tree (up to 10 trees)',
    application_url: 'https://www.snwa.com/rebates/wsl/',
    program_status: 'active',
    water_utility: 'Southern Nevada Water Authority',
    coverage_area: 'Las Vegas Valley',
    program_description: 'Bonus $100 for every new tree installed as part of Water Smart Landscapes rebate (up to 100% canopy coverage).',
    eligibility_details: 'Must be participating in Water Smart Landscapes program. Trees must be from qualifying list.',
    residential_eligible: true,
    commercial_eligible: false,
    pre_approval_required: true,
    verified_date: '2025-01-30'
  },

  // COLORADO - Denver
  {
    program_id: 'CO_DENVER_TOILET_2025',
    program_name: 'Denver Water High-Efficiency Toilet Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'fixture',
    incentive_amount_min: 50,
    incentive_amount_max: 100,
    incentive_per_unit: 'Up to $100 per WaterSense toilet',
    application_url: 'https://www.denverwater.org/residential/rebates-and-conservation-tips',
    program_status: 'active',
    water_utility: 'Denver Water',
    coverage_area: 'Denver Water service area',
    program_description: 'Rebate for WaterSense-labeled toilets with an average of 1.1 gallons per flush or less.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'CO_DENVER_SPRINKLER_2025',
    program_name: 'Denver Water Rotary Sprinkler Nozzle Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'irrigation_equipment',
    incentive_amount_min: 3,
    incentive_amount_max: 150,
    incentive_per_unit: '$3 per sprinkler head',
    application_url: 'https://www.denverwater.org/residential/rebates-and-conservation-tips',
    program_status: 'active',
    water_utility: 'Denver Water',
    coverage_area: 'Denver Water service area',
    program_description: 'Rebate for rotary/high-efficiency sprinkler nozzles at $3 per head.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'CO_DENVER_CONTROLLER_2025',
    program_name: 'Denver Water Smart Irrigation Controller Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'irrigation_equipment',
    incentive_amount_min: 50,
    incentive_amount_max: 75,
    incentive_per_unit: 'Up to $75',
    application_url: 'https://www.denverwater.org/residential/rebates-and-conservation-tips',
    program_status: 'active',
    water_utility: 'Denver Water',
    coverage_area: 'Denver Water service area',
    program_description: 'Rebate up to $75 for WaterSense-labeled smart irrigation controller.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'CO_AURORA_TOILET_2025',
    program_name: 'Aurora Water Ultra High-Efficiency Toilet Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'fixture',
    incentive_amount_min: 50,
    incentive_amount_max: 100,
    incentive_per_unit: 'Up to $100',
    application_url: 'https://waterrebates.aurorawater.org/',
    program_status: 'active',
    water_utility: 'Aurora Water',
    coverage_area: 'Aurora, CO',
    program_description: 'Rebate for ultra-high-efficiency WaterSense toilets (0.8 gpf). Up to $100 for replacing 1.6 gpf or more toilets. Up to 2 toilets per household every 10 years.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },

  // UTAH - Statewide
  {
    program_id: 'UT_STATE_LANDSCAPE_2025',
    program_name: 'Utah Landscape Incentive Program',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'landscape_conversion',
    incentive_amount_min: 1,
    incentive_amount_max: 30000,
    incentive_per_unit: '$1-$3 per sq ft depending on area',
    application_url: 'https://conservewater.utah.gov/landscape-rebates/',
    program_status: 'active',
    water_utility: 'Utah Division of Water Resources',
    coverage_area: 'Utah statewide (participating communities)',
    program_description: 'Replace lawn with water-efficient landscaping. Rates vary by district: up to $3/sq ft in Jordan Valley area.',
    eligibility_details: 'Property must be in community with qualifying water-efficient landscape ordinances.',
    residential_eligible: true,
    commercial_eligible: true,
    pre_approval_required: true,
    inspection_required: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'UT_STATE_CONTROLLER_2025',
    program_name: 'Utah Water Savers Smart Controller Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'irrigation_equipment',
    incentive_amount_min: 75,
    incentive_amount_max: 100,
    incentive_per_unit: 'Up to $100 (increased Oct 2024)',
    application_url: 'https://www.utahwatersavers.com/',
    program_status: 'active',
    water_utility: 'Utah Water Savers',
    coverage_area: 'Utah statewide',
    program_description: 'Rebate for WaterSense-labeled smart irrigation controllers. Increased to $100 as of October 2024.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'UT_STATE_TOILET_2025',
    program_name: 'Utah Water Savers Toilet Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'fixture',
    incentive_amount_min: 100,
    incentive_amount_max: 150,
    incentive_per_unit: 'Up to $150 (increased Oct 2024)',
    application_url: 'https://www.utahwatersavers.com/',
    program_status: 'active',
    water_utility: 'Utah Water Savers',
    coverage_area: 'Utah statewide',
    program_description: 'Rebate for water-efficient toilets. Increased to $150 as of October 2024.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },

  // OREGON - Portland
  {
    program_id: 'OR_PORTLAND_CRR_2025',
    program_name: 'Portland Clean River Rewards',
    program_type: 'discount',
    resource_type: 'rainwater',
    program_subtype: 'stormwater_management',
    incentive_amount_min: 0,
    incentive_amount_max: 1000,
    incentive_per_unit: 'Up to 100% discount on stormwater charges',
    application_url: 'https://www.portland.gov/bes/grants-incentives/clean-river-rewards',
    program_status: 'active',
    water_utility: 'City of Portland Bureau of Environmental Services',
    coverage_area: 'Portland, OR',
    program_description: 'Discount on stormwater charges if rain from roof/driveway soaks into ground on your property instead of running into sewer system.',
    eligibility_details: 'Must manage stormwater on-site through rain gardens, cisterns, or other approved methods.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'OR_PORTLAND_OUTDOOR_2025',
    program_name: 'Portland Water Bureau Outdoor Rebates',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'irrigation_equipment',
    incentive_amount_min: 25,
    incentive_amount_max: 100,
    incentive_per_unit: 'Varies by product',
    application_url: 'https://www.portland.gov/water/water-efficiency-programs/outdoor-rebate',
    program_status: 'active',
    water_utility: 'Portland Water Bureau',
    coverage_area: 'Portland, OR',
    program_description: 'Rebates for WaterSense-labeled irrigation controllers and multistream rotator sprinkler nozzles.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'OR_PORTLAND_BUSINESS_2025',
    program_name: 'Portland Business Water Efficiency Incentive',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'commercial',
    incentive_amount_min: 250,
    incentive_amount_max: 5000,
    incentive_per_unit: '50% of project costs up to $5,000',
    application_url: 'https://www.portland.gov/water/water-efficiency-programs/saving-water-business',
    program_status: 'active',
    water_utility: 'Portland Water Bureau',
    coverage_area: 'Portland, OR',
    program_description: 'Incentive for nonresidential water efficiency improvement projects. Pays 50% of approved costs up to $5,000 per project.',
    eligibility_details: 'Small businesses and nonprofits. Applications July 1, 2025 - June 30, 2026 or until funds run out.',
    residential_eligible: false,
    commercial_eligible: true,
    municipal_eligible: true,
    verified_date: '2025-01-30'
  },

  // WASHINGTON - Seattle
  {
    program_id: 'WA_SEATTLE_RAINWISE_2025',
    program_name: 'Seattle RainWise Rebate Program',
    program_type: 'rebate',
    resource_type: 'rainwater',
    program_subtype: 'stormwater_management',
    incentive_amount_min: 2000,
    incentive_amount_max: 15000,
    incentive_per_unit: '70-100% of project costs',
    application_url: 'https://www.700milliongallons.org/rainwise/',
    program_status: 'active',
    water_utility: 'Seattle Public Utilities',
    coverage_area: 'Eligible drainage areas in Seattle',
    program_description: 'Rebates covering 70-100% of project costs for installation of rain gardens and/or cisterns that capture rooftop rainwater.',
    eligibility_details: 'Property must be in eligible drainage area. Work with approved RainWise contractor.',
    residential_eligible: true,
    commercial_eligible: true,
    pre_approval_required: true,
    inspection_required: true,
    contractor_requirements: 'Must use RainWise-approved contractor',
    verified_date: '2025-01-30'
  },
  {
    program_id: 'WA_SEATTLE_STORMWATER_CREDIT_2025',
    program_name: 'Seattle Stormwater Facility Credit',
    program_type: 'discount',
    resource_type: 'rainwater',
    program_subtype: 'stormwater_management',
    incentive_amount_min: 0,
    incentive_amount_max: 500,
    incentive_per_unit: 'Credit on utility bill',
    application_url: 'https://www.seattle.gov/utilities/your-services/discounts-and-incentives',
    program_status: 'active',
    water_utility: 'Seattle Public Utilities',
    coverage_area: 'Seattle, WA',
    program_description: 'Credit for property owners with stormwater systems that provide flow control and/or water quality treatment.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'WA_REGIONAL_TOILET_2025',
    program_name: 'Saving Water Partnership Toilet Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'fixture',
    incentive_amount_min: 30,
    incentive_amount_max: 50,
    incentive_per_unit: 'Up to $50',
    application_url: 'https://www.savingwater.org/rebates/',
    program_status: 'active',
    water_utility: 'Saving Water Partnership',
    coverage_area: 'Seattle metro area',
    program_description: 'Rebate for high-efficiency toilets for customers of Saving Water Partnership utilities.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'WA_REGIONAL_WASHER_2025',
    program_name: 'Saving Water Partnership Clothes Washer Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'appliance',
    incentive_amount_min: 50,
    incentive_amount_max: 150,
    incentive_per_unit: 'Up to $150',
    application_url: 'https://www.savingwater.org/rebates/',
    program_status: 'active',
    water_utility: 'Saving Water Partnership',
    coverage_area: 'Seattle metro area',
    program_description: 'Rebate for high-efficiency clothes washers that use 35-50% less water and 50% less energy.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
  {
    program_id: 'WA_REGIONAL_CONTROLLER_2025',
    program_name: 'Saving Water Partnership Smart Controller Rebate',
    program_type: 'rebate',
    resource_type: 'conservation',
    program_subtype: 'irrigation_equipment',
    incentive_amount_min: 50,
    incentive_amount_max: 125,
    incentive_per_unit: 'Up to $125',
    application_url: 'https://www.savingwater.org/rebates/',
    program_status: 'active',
    water_utility: 'Saving Water Partnership',
    coverage_area: 'Seattle metro area',
    program_description: 'Rebate for smart irrigation controllers.',
    residential_eligible: true,
    commercial_eligible: true,
    verified_date: '2025-01-30'
  },
];

async function addIncentivePrograms() {
  console.log('💰 Adding Western US incentive programs to BigQuery...\n');

  try {
    // Check existing programs
    const [existing] = await bigquery.query({
      query: `
        SELECT program_id
        FROM \`greywater-prospects-2025.${datasetId}.programs_master\`
        WHERE program_id IN (${NEW_PROGRAMS.map(p => `'${p.program_id}'`).join(',')})
      `,
      location: 'US'
    });

    const existingIds = new Set(existing.map(r => r.program_id));
    const newPrograms = NEW_PROGRAMS.filter(p => !existingIds.has(p.program_id));

    if (newPrograms.length === 0) {
      console.log('All programs already exist in database.');
      return;
    }

    console.log(`📤 Inserting ${newPrograms.length} new programs (${existingIds.size} already exist)...\n`);

    // Add timestamps
    const programsWithTimestamps = newPrograms.map(p => ({
      ...p,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    // Insert into programs_master
    await bigquery
      .dataset(datasetId)
      .table('programs_master')
      .insert(programsWithTimestamps, {
        skipInvalidRows: false,
        ignoreUnknownValues: true
      });

    console.log('✅ Programs inserted successfully');

    // Also add to program_jurisdiction_link
    const jurisdictionLinks = newPrograms.map(p => {
      const stateCode = p.program_id.split('_')[0];
      return {
        program_id: p.program_id,
        jurisdiction_id: `${stateCode}_STATE`
      };
    });

    console.log(`\n📤 Adding ${jurisdictionLinks.length} jurisdiction links...`);

    await bigquery
      .dataset(datasetId)
      .table('program_jurisdiction_link')
      .insert(jurisdictionLinks, {
        skipInvalidRows: true,
        ignoreUnknownValues: true
      });

    console.log('✅ Jurisdiction links added');

    // Summary by state
    console.log('\n📋 Programs added by state:');
    const byState = {};
    newPrograms.forEach(p => {
      const state = p.program_id.split('_')[0];
      byState[state] = (byState[state] || 0) + 1;
    });

    Object.entries(byState).sort().forEach(([state, count]) => {
      console.log(`  ${state}: ${count} programs`);
    });

    // Verify final counts
    console.log('\n🔍 Final program counts by state:');
    const [finalCounts] = await bigquery.query({
      query: `
        SELECT
          SUBSTR(program_id, 1, 2) as state,
          COUNT(*) as count
        FROM \`greywater-prospects-2025.${datasetId}.programs_master\`
        WHERE program_status = 'active'
        GROUP BY state
        ORDER BY count DESC
        LIMIT 15
      `,
      location: 'US'
    });

    finalCounts.forEach(r => {
      console.log(`  ${r.state}: ${r.count} active programs`);
    });

    console.log('\n✅ Western US incentive programs added successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error.errors) {
      console.error('Insert errors:', JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

addIncentivePrograms();
