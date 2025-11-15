const { BigQuery } = require('@google-cloud/bigquery');

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025';
const bigquery = new BigQuery({ projectId });
const datasetId = 'greywater_compliance';

// Major city programs with researched URLs
const cityPrograms = {
  // NEW YORK
  'NY_CITY_NEW_YORK_CITY': {
    programs: [
      {
        program_id: 'NY_NYC_RAINWATER_HARVESTING_GRANT_2025',
        program_name: 'NYC Rainwater Harvesting Grant',
        program_type: 'grant',
        incentive_amount_max: 10000,
        application_url: 'https://www1.nyc.gov/site/dep/water/rain-gardens.page',
        water_types: ['RAINWATER'],
        notes: 'Grants for installing rainwater harvesting systems in NYC',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },

  // PENNSYLVANIA
  'PA_CITY_PHILADELPHIA': {
    programs: [
      {
        program_id: 'PA_PHILLY_RAIN_CHECK_2025',
        program_name: 'Philadelphia RainCheck Program',
        program_type: 'rebate',
        incentive_amount_max: 5000,
        application_url: 'https://www.phila.gov/programs/raincheck/',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Rebates for rain gardens, rain barrels, and other green stormwater infrastructure',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },

  // ILLINOIS
  'IL_CITY_CHICAGO': {
    programs: [
      {
        program_id: 'IL_CHICAGO_GREEN_PERMIT_2025',
        program_name: 'Chicago Green Permit Program',
        program_type: 'permit_waiver',
        incentive_amount_max: 25000,
        application_url: 'https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits/svcs/greenpermit.html',
        water_types: ['GREYWATER', 'RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Expedited permit review and fee waivers for green building projects',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },

  // OHIO
  'OH_CITY_COLUMBUS': {
    programs: [
      {
        program_id: 'OH_COLUMBUS_RAIN_BARREL_2025',
        program_name: 'Columbus Rain Barrel Program',
        program_type: 'rebate',
        incentive_amount_max: 50,
        application_url: 'https://www.columbus.gov/utilities/stormwater/Homeowner-Services/',
        water_types: ['RAINWATER'],
        notes: 'Discounted rain barrels for Columbus residents',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  // GEORGIA
  'GA_CITY_ATLANTA': {
    programs: [
      {
        program_id: 'GA_ATLANTA_WATERSHED_GRANT_2025',
        program_name: 'Atlanta Watershed Grant Program',
        program_type: 'grant',
        incentive_amount_max: 20000,
        application_url: 'https://www.atlantawatershed.org/environment/green-infrastructure/',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Grants for stormwater management and water conservation projects',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },

  // MICHIGAN
  'MI_CITY_DETROIT': {
    programs: [
      {
        program_id: 'MI_DETROIT_RAIN_GARDEN_2025',
        program_name: 'Detroit Rain Garden Initiative',
        program_type: 'grant',
        incentive_amount_max: 2500,
        application_url: 'https://detroitmi.gov/departments/water-and-sewerage-department/drainage-and-sewerage-system/green-stormwater-infrastructure',
        water_types: ['RAINWATER'],
        notes: 'Funding for residential rain gardens',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  // NORTH CAROLINA
  'NC_CITY_CHARLOTTE': {
    programs: [
      {
        program_id: 'NC_CHARLOTTE_STORMWATER_REBATE_2025',
        program_name: 'Charlotte Stormwater Fee Discount',
        program_type: 'rebate',
        incentive_amount_max: 10000,
        application_url: 'https://charlottenc.gov/StormWater/SurfaceWaterManagement/Pages/CreditManual.aspx',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Credits on stormwater fees for implementing green infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },

  // NEW JERSEY
  'NJ_CITY_NEWARK': {
    programs: [
      {
        program_id: 'NJ_NEWARK_GREEN_INFRASTRUCTURE_2025',
        program_name: 'Newark Green Infrastructure Program',
        program_type: 'grant',
        incentive_amount_max: 15000,
        application_url: 'https://www.newarknj.gov/departments/watershed',
        water_types: ['RAINWATER'],
        notes: 'Funding for rain gardens and green infrastructure',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },

  // VIRGINIA
  'VA_CITY_VIRGINIA_BEACH': {
    programs: [
      {
        program_id: 'VA_VB_RAIN_BARREL_2025',
        program_name: 'Virginia Beach Rain Barrel Program',
        program_type: 'rebate',
        incentive_amount_max: 100,
        application_url: 'https://www.vbgov.com/government/departments/public-works/stormwater/Pages/rain-barrels.aspx',
        water_types: ['RAINWATER'],
        notes: 'Rebates for rain barrel purchases',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  // MASSACHUSETTS
  'MA_CITY_BOSTON': {
    programs: [
      {
        program_id: 'MA_BOSTON_RAIN_BARREL_2025',
        program_name: 'Boston Rain Barrel Program',
        program_type: 'subsidy',
        incentive_amount_max: 80,
        application_url: 'https://www.boston.gov/departments/water-and-sewer-commission/rain-barrels',
        water_types: ['RAINWATER'],
        notes: 'Subsidized rain barrels for Boston residents',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  // INDIANA
  'IN_CITY_INDIANAPOLIS': {
    programs: [
      {
        program_id: 'IN_INDY_RAIN_GARDEN_2025',
        program_name: 'Indianapolis Rain Garden Program',
        program_type: 'grant',
        incentive_amount_max: 1200,
        application_url: 'https://www.indy.gov/activity/apply-for-a-rain-garden-rebate',
        water_types: ['RAINWATER'],
        notes: 'Funding for residential rain gardens',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  // TENNESSEE
  'TN_CITY_NASHVILLE': {
    programs: [
      {
        program_id: 'TN_NASHVILLE_STORMWATER_CREDIT_2025',
        program_name: 'Nashville Stormwater Management Credit',
        program_type: 'rebate',
        incentive_amount_max: 5000,
        application_url: 'https://www.nashville.gov/departments/water/stormwater/green-infrastructure',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Credits for implementing green stormwater infrastructure',
        residential_eligibility: false,
        commercial_eligibility: true
      }
    ]
  },

  // MISSOURI
  'MO_CITY_KANSAS_CITY': {
    programs: [
      {
        program_id: 'MO_KC_RAIN_GARDEN_2025',
        program_name: 'Kansas City RainSmart Program',
        program_type: 'rebate',
        incentive_amount_max: 2000,
        application_url: 'https://www.kcmo.gov/city-hall/departments/water/rainsmart-homes',
        water_types: ['RAINWATER'],
        notes: 'Rebates for rain gardens and green infrastructure',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  // MARYLAND
  'MD_CITY_BALTIMORE': {
    programs: [
      {
        program_id: 'MD_BALTIMORE_RAIN_CHECK_2025',
        program_name: 'Baltimore RainCheck Rebate',
        program_type: 'rebate',
        incentive_amount_max: 4000,
        application_url: 'https://publicworks.baltimorecity.gov/raincheck',
        water_types: ['RAINWATER'],
        notes: 'Rebates for rain gardens, cisterns, and green roofs',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },

  // WISCONSIN
  'WI_CITY_MILWAUKEE': {
    programs: [
      {
        program_id: 'WI_MILWAUKEE_GREEN_SOLUTIONS_2025',
        program_name: 'Milwaukee Green Solutions Program',
        program_type: 'grant',
        incentive_amount_max: 10000,
        application_url: 'https://city.milwaukee.gov/Freshwater/Green-Infrastructure',
        water_types: ['RAINWATER', 'GENERAL_CONSERVATION'],
        notes: 'Grants for green infrastructure projects',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },

  // MINNESOTA
  'MN_CITY_MINNEAPOLIS': {
    programs: [
      {
        program_id: 'MN_MINNEAPOLIS_RAIN_GARDEN_2025',
        program_name: 'Minneapolis Rain Garden Program',
        program_type: 'rebate',
        incentive_amount_max: 350,
        application_url: 'https://www.minneapolismn.gov/resident-services/property-housing/green-homes/rain-gardens/',
        water_types: ['RAINWATER'],
        notes: 'Rebates for installing rain gardens',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  // Additional major cities
  'NV_CITY_LAS_VEGAS': {
    programs: [
      {
        program_id: 'NV_VEGAS_WATER_SMART_2025',
        program_name: 'Las Vegas Water Smart Landscapes Rebate',
        program_type: 'rebate',
        incentive_amount_max: 3,
        incentive_per_unit: '$3 per square foot',
        application_url: 'https://www.snwa.com/rebates/wsl-rebate/index.html',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Rebates for converting grass to water-efficient landscaping',
        residential_eligibility: true,
        commercial_eligibility: true
      }
    ]
  },

  'UT_CITY_SALT_LAKE_CITY': {
    programs: [
      {
        program_id: 'UT_SLC_LOCALSCAPES_2025',
        program_name: 'Salt Lake City Localscapes Rebate',
        program_type: 'rebate',
        incentive_amount_max: 2000,
        application_url: 'https://www.slc.gov/utilities/localscapes/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Rebates for water-wise landscaping',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  },

  'NM_CITY_ALBUQUERQUE': {
    programs: [
      {
        program_id: 'NM_ABQ_LANDSCAPE_REBATE_2025',
        program_name: 'Albuquerque Landscape Rebate Program',
        program_type: 'rebate',
        incentive_amount_max: 1000,
        application_url: 'https://www.abcwua.org/landscape-rebate/',
        water_types: ['GENERAL_CONSERVATION'],
        notes: 'Rebates for replacing grass with water-conserving landscapes',
        residential_eligibility: true,
        commercial_eligibility: false
      }
    ]
  }
};

async function addCityPrograms() {
  console.log('🌆 Adding major city water conservation programs...\n');

  // Step 1: Insert programs into programs_master
  const programRows = [];
  const linkRows = [];
  const sectorRows = [];
  const waterTypeRows = [];

  for (const [jurisdictionId, data] of Object.entries(cityPrograms)) {
    for (const program of data.programs) {
      // Add to programs_master
      programRows.push({
        program_id: program.program_id,
        program_name: program.program_name,
        program_type: program.program_type,
        incentive_amount_min: program.incentive_amount_min || null,
        incentive_amount_max: program.incentive_amount_max || null,
        incentive_per_unit: program.incentive_per_unit || null,
        eligible_system_types: program.eligible_system_types || program.water_types?.join(', '),
        application_url: program.application_url,
        program_status: 'active',
        notes: program.notes,
        contact_email: program.contact_email || null,
        contact_phone: program.contact_phone || null,
        installation_requirements: program.installation_requirements || null
      });

      // Add jurisdiction link
      linkRows.push({
        program_id: program.program_id,
        jurisdiction_id: jurisdictionId
      });

      // Add sector links
      if (program.residential_eligibility) {
        sectorRows.push({
          program_id: program.program_id,
          sector_id: 'RESIDENTIAL'
        });
      }
      if (program.commercial_eligibility) {
        sectorRows.push({
          program_id: program.program_id,
          sector_id: 'COMMERCIAL'
        });
      }

      // Add water type links
      if (program.water_types) {
        program.water_types.forEach(waterType => {
          waterTypeRows.push({
            program_id: program.program_id,
            water_type_id: waterType
          });
        });
      }
    }
  }

  console.log(`📊 Programs to insert: ${programRows.length}`);
  console.log(`🔗 Jurisdiction links: ${linkRows.length}`);
  console.log(`👥 Sector links: ${sectorRows.length}`);
  console.log(`💧 Water type links: ${waterTypeRows.length}\n`);

  try {
    // Insert programs
    if (programRows.length > 0) {
      await bigquery.dataset(datasetId).table('programs_master').insert(programRows);
      console.log('✅ Programs inserted into programs_master');
    }

    // Insert jurisdiction links
    if (linkRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_jurisdiction_link').insert(linkRows);
      console.log('✅ Jurisdiction links inserted');
    }

    // Insert sector links
    if (sectorRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_sector_link').insert(sectorRows);
      console.log('✅ Sector links inserted');
    }

    // Insert water type links
    if (waterTypeRows.length > 0) {
      await bigquery.dataset(datasetId).table('program_water_type_link').insert(waterTypeRows);
      console.log('✅ Water type links inserted');
    }

    console.log('\n🎉 All city programs successfully added!');
    console.log(`\n📍 Cities with new programs: ${Object.keys(cityPrograms).length}`);

  } catch (error) {
    if (error.name === 'PartialFailureError') {
      console.error('⚠️  Some rows failed:', error.errors);
    } else {
      console.error('❌ Error:', error);
    }
  }
}

addCityPrograms().catch(console.error);
