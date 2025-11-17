const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

/**
 * COMPREHENSIVE WATER CONSERVATION PROGRAMS
 * For: CA, TX, AZ, CO, OR, WA, FL
 *
 * Each program includes:
 * - Detailed information (amounts, eligibility, requirements)
 * - URL for more information
 * - Water type classification
 * - Sector applicability
 */

const comprehensivePrograms = {
  // ============================================
  // CALIFORNIA PROGRAMS
  // ============================================
  CA: {
    state: [
      {
        program_id: 'CA_AFFORDABLE_HOUSING_WATER_2025',
        program_name: 'California Affordable Housing Water Efficiency',
        program_type: 'grant',
        incentive_amount_min: 10000,
        incentive_amount_max: 150000,
        sector_applicability: 'residential',
        water_types: ['GENERAL_CONSERVATION'],
        eligible_system_types: 'Multi-family affordable housing water conservation projects',
        application_url: 'https://www.hcd.ca.gov/grants-and-funding',
        notes: 'Supports water efficiency upgrades in affordable housing developments',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active'
      },
      {
        program_id: 'CA_AGRICULTURAL_WATER_EFFICIENCY_2025',
        program_name: 'California Agricultural Water Use Efficiency',
        program_type: 'grant',
        incentive_amount_min: 5000,
        incentive_amount_max: 200000,
        sector_applicability: 'commercial',
        water_types: ['GENERAL_CONSERVATION'],
        eligible_system_types: 'Drip irrigation, soil moisture monitoring, greywater systems for agriculture',
        application_url: 'https://water.ca.gov/Work-With-Us/Grants-And-Loans',
        notes: 'Department of Water Resources agricultural efficiency grants',
        residential_eligibility: false,
        commercial_eligibility: true,
        program_status: 'active'
      },
      {
        program_id: 'CA_DWR_WATER_CONSERVATION_GRANT_2025',
        program_name: 'DWR Water Conservation and Efficiency Grant',
        program_type: 'grant',
        incentive_amount_min: 50000,
        incentive_amount_max: 5000000,
        sector_applicability: 'both',
        water_types: ['GENERAL_CONSERVATION', 'GREYWATER', 'RAINWATER'],
        eligible_system_types: 'Large-scale water conservation projects including greywater and rainwater systems',
        application_url: 'https://water.ca.gov/Work-With-Us/Grants-And-Loans/Water-Use-Efficiency-Grant-Program',
        notes: 'Competitive grants for municipalities and water districts',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      },
      {
        program_id: 'CA_WATER_EFFICIENCY_TAX_CREDIT_2025',
        program_name: 'California Water Efficiency Tax Credit',
        program_type: 'tax_credit',
        incentive_amount_min: 500,
        incentive_amount_max: 2500,
        sector_applicability: 'both',
        water_types: ['GENERAL_CONSERVATION'],
        eligible_system_types: 'Water-efficient appliances, fixtures, and systems',
        application_url: 'https://www.ftb.ca.gov',
        notes: 'State tax credit for water efficiency improvements',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      }
    ],
    utilities: [
      {
        program_id: 'CA_LADWP_GREYWATER_ENHANCED_2024',
        jurisdiction_id: 'CA_CITY_LOS_ANGELES',
        program_name: 'LADWP Greywater System Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 3000,
        sector_applicability: 'both',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Residential and commercial greywater systems',
        application_url: 'https://www.ladwp.com/water-rebates',
        notes: 'Los Angeles Department of Water and Power greywater rebate program',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active',
        contact_email: 'waterconservation@ladwp.com',
        contact_phone: '(800) 342-5397'
      },
      {
        program_id: 'CA_LADWP_TURF_REPLACEMENT_2024',
        jurisdiction_id: 'CA_CITY_LOS_ANGELES',
        program_name: 'LADWP Turf Replacement Program',
        program_type: 'rebate',
        incentive_amount_min: null,
        incentive_amount_max: 15000,
        incentive_per_unit: '$3 per square foot',
        sector_applicability: 'both',
        water_types: ['GENERAL_CONSERVATION'],
        eligible_system_types: 'Lawn removal and replacement with drought-tolerant landscaping',
        application_url: 'https://www.ladwp.com/turf-replacement',
        notes: '$3 per sq ft for removing turf grass, maximum 5,000 sq ft residential',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      },
      {
        program_id: 'CA_SF_GREYWATER_GRANT_2024',
        jurisdiction_id: 'CA_CITY_SAN_FRANCISCO',
        program_name: 'San Francisco Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 2500,
        sector_applicability: 'both',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Laundry-to-landscape and constructed greywater systems',
        application_url: 'https://sfwater.org/save-water/residential/rebates',
        notes: 'SFPUC greywater system rebate for residential and commercial',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active',
        contact_email: 'conserve@sfwater.org',
        contact_phone: '(415) 551-3000'
      },
      {
        program_id: 'CA_EBMUD_GREYWATER_2024',
        jurisdiction_id: 'CA_CITY_OAKLAND',
        program_name: 'EBMUD Greywater Rebate Program',
        program_type: 'rebate',
        incentive_amount_min: 300,
        incentive_amount_max: 1500,
        sector_applicability: 'residential',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Laundry-to-landscape systems',
        application_url: 'https://www.ebmud.com/water/conservation-and-rebates/residential/greywater-rebate',
        notes: 'East Bay Municipal Utility District greywater rebate',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active',
        contact_phone: '(866) 403-2683'
      },
      {
        program_id: 'CA_SD_GREYWATER_REBATE_2024',
        jurisdiction_id: 'CA_CITY_SAN_DIEGO',
        program_name: 'City of San Diego Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 2000,
        sector_applicability: 'residential',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Residential greywater systems',
        application_url: 'https://www.sandiego.gov/water/conservation/greywater',
        notes: 'City of San Diego greywater system rebate program',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active',
        contact_email: 'watercon@sandiego.gov'
      },
      {
        program_id: 'CA_SM_GREYWATER_REBATE_2024',
        jurisdiction_id: 'CA_CITY_SANTA_MONICA',
        program_name: 'Santa Monica Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 250,
        incentive_amount_max: 1500,
        sector_applicability: 'residential',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Laundry-to-landscape and full greywater systems',
        application_url: 'https://www.smgov.net/water-rebates',
        notes: 'Santa Monica water conservation rebate program',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active'
      },
      {
        program_id: 'CA_GLENDALE_GREYWATER_2024',
        jurisdiction_id: 'CA_CITY_GLENDALE',
        program_name: 'Glendale Water & Power Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 2000,
        sector_applicability: 'residential',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Residential greywater systems',
        application_url: 'https://glendaleca.gov/government/departments/glendale-water-power/water-services/water-rebates',
        notes: 'Glendale Water & Power greywater rebate',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active'
      }
    ]
  },

  // ============================================
  // TEXAS PROGRAMS
  // ============================================
  TX: {
    state: [
      {
        program_id: 'TX_RAINWATER_HARVESTING_TAX_EXEMPTION_2025',
        program_name: 'Texas Rainwater Harvesting Equipment Tax Exemption',
        program_type: 'tax_exemption',
        incentive_amount_min: null,
        incentive_amount_max: null,
        sector_applicability: 'both',
        water_types: ['RAINWATER'],
        eligible_system_types: 'Rainwater harvesting equipment and systems',
        application_url: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/rainwater.php',
        notes: 'Sales tax exemption for rainwater harvesting equipment in Texas',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      },
      {
        program_id: 'TX_TWDB_WATER_CONSERVATION_GRANT_2025',
        program_name: 'TWDB Water Conservation Grant',
        program_type: 'grant',
        incentive_amount_min: 25000,
        incentive_amount_max: 500000,
        sector_applicability: 'both',
        water_types: ['GENERAL_CONSERVATION', 'GREYWATER', 'RAINWATER'],
        eligible_system_types: 'Municipal water conservation projects',
        application_url: 'https://www.twdb.texas.gov/financial/programs/WaterConservation/',
        notes: 'Texas Water Development Board conservation grants',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active',
        contact_email: 'twdb@twdb.texas.gov'
      }
    ],
    cities: [
      {
        program_id: 'TX_AUSTIN_GREYWATER_REBATE_2024',
        jurisdiction_id: 'TX_CITY_AUSTIN',
        program_name: 'Austin Water Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 200,
        incentive_amount_max: 1500,
        sector_applicability: 'residential',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Residential greywater systems',
        application_url: 'https://www.austintexas.gov/department/greywater-rebate',
        notes: 'City of Austin greywater system rebate program',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active',
        contact_phone: '(512) 494-9400'
      },
      {
        program_id: 'TX_AUSTIN_RAINWATER_REBATE_2024',
        jurisdiction_id: 'TX_CITY_AUSTIN',
        program_name: 'Austin Rainwater Harvesting Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 5000,
        sector_applicability: 'both',
        water_types: ['RAINWATER'],
        eligible_system_types: 'Rainwater harvesting systems 500+ gallons',
        application_url: 'https://www.austintexas.gov/department/rainwater-harvesting-rebate',
        notes: 'Up to $1 per gallon of storage capacity, max $5,000',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      },
      {
        program_id: 'TX_SAN_ANTONIO_GREYWATER_2024',
        jurisdiction_id: 'TX_CITY_SAN_ANTONIO',
        program_name: 'SAWS Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 2500,
        sector_applicability: 'both',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Indoor and outdoor greywater systems',
        application_url: 'https://www.saws.org/conservation/commercial-programs/greywater-rebate/',
        notes: 'San Antonio Water System greywater rebate',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active',
        contact_phone: '(210) 704-7283'
      }
    ]
  },

  // ============================================
  // ARIZONA PROGRAMS
  // ============================================
  AZ: {
    cities: [
      {
        program_id: 'AZ_TUCSON_GREYWATER_REBATE_2024',
        jurisdiction_id: 'AZ_CITY_TUCSON',
        program_name: 'Tucson Water Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 3000,
        sector_applicability: 'both',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Commercial and residential greywater systems',
        application_url: 'https://www.tucsonaz.gov/water/greywater-rebate',
        notes: 'Tucson Water greywater system rebate - up to 75% of installation cost',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active',
        contact_email: 'water@tucsonaz.gov',
        contact_phone: '(520) 791-3242'
      },
      {
        program_id: 'AZ_TUCSON_RAINWATER_REBATE_2024',
        jurisdiction_id: 'AZ_CITY_TUCSON',
        program_name: 'Tucson Water Rainwater Harvesting Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 2000,
        sector_applicability: 'both',
        water_types: ['RAINWATER'],
        eligible_system_types: 'Rainwater harvesting systems 200+ gallons',
        application_url: 'https://www.tucsonaz.gov/water/rainwater-harvesting',
        notes: 'Up to $2,000 for passive or active rainwater harvesting',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      },
      {
        program_id: 'AZ_PHOENIX_GREYWATER_2024',
        jurisdiction_id: 'AZ_CITY_PHOENIX',
        program_name: 'Phoenix Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 200,
        incentive_amount_max: 1000,
        sector_applicability: 'residential',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Residential laundry-to-landscape systems',
        application_url: 'https://www.phoenix.gov/waterservices/conservation/rebates',
        notes: 'City of Phoenix water conservation rebates',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active',
        contact_phone: '(602) 262-6251'
      },
      {
        program_id: 'AZ_TEMPE_GREYWATER_REBATE_2024',
        jurisdiction_id: 'AZ_CITY_TEMPE',
        program_name: 'Tempe Greywater System Rebate',
        program_type: 'rebate',
        incentive_amount_min: 300,
        incentive_amount_max: 1500,
        sector_applicability: 'residential',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Residential greywater irrigation systems',
        application_url: 'https://www.tempe.gov/water-rebates',
        notes: 'City of Tempe greywater rebate program',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active'
      }
    ]
  },

  // ============================================
  // COLORADO PROGRAMS
  // ============================================
  CO: {
    state: [
      {
        program_id: 'CO_RAINWATER_HARVESTING_PERMIT_2025',
        program_name: 'Colorado Residential Rainwater Harvesting',
        program_type: 'permit',
        incentive_amount_min: null,
        incentive_amount_max: null,
        sector_applicability: 'residential',
        water_types: ['RAINWATER'],
        eligible_system_types: 'Residential rainwater collection up to 110 gallons',
        application_url: 'https://dwr.colorado.gov/services/well-permits/rainwater-collection',
        notes: 'Permits residential rainwater collection with restrictions (2 barrels max)',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active'
      }
    ],
    cities: [
      {
        program_id: 'CO_DENVER_GREYWATER_REBATE_2024',
        jurisdiction_id: 'CO_CITY_DENVER',
        program_name: 'Denver Water Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 300,
        incentive_amount_max: 2000,
        sector_applicability: 'both',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Greywater systems for irrigation',
        application_url: 'https://www.denverwater.org/rebates-programs/greywater',
        notes: 'Denver Water greywater system rebate',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active',
        contact_phone: '(303) 893-2444'
      }
    ]
  },

  // ============================================
  // OREGON PROGRAMS
  // ============================================
  OR: {
    cities: [
      {
        program_id: 'OR_PORTLAND_GREYWATER_REBATE_2024',
        jurisdiction_id: 'OR_CITY_PORTLAND',
        program_name: 'Portland Greywater System Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 2500,
        sector_applicability: 'both',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Residential and commercial greywater systems',
        application_url: 'https://www.portland.gov/water/conservation/greywater',
        notes: 'Portland Water Bureau greywater rebate',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active',
        contact_email: 'waterconservation@portlandoregon.gov'
      }
    ]
  },

  // ============================================
  // WASHINGTON PROGRAMS
  // ============================================
  WA: {
    cities: [
      {
        program_id: 'WA_SEATTLE_RAINWATER_REBATE_2024',
        jurisdiction_id: 'WA_CITY_SEATTLE',
        program_name: 'Seattle RainWise Rebate',
        program_type: 'rebate',
        incentive_amount_min: 1000,
        incentive_amount_max: 7500,
        sector_applicability: 'residential',
        water_types: ['RAINWATER', 'STORMWATER'],
        eligible_system_types: 'Rain gardens, cisterns, and stormwater management',
        application_url: 'https://www.seattle.gov/utilities/protecting-our-environment/rainwise',
        notes: 'Seattle Public Utilities rainwater management rebate',
        residential_eligibility: true,
        commercial_eligibility: false,
        program_status: 'active',
        contact_email: 'rainwise@seattle.gov',
        contact_phone: '(206) 615-0663'
      }
    ]
  },

  // ============================================
  // FLORIDA PROGRAMS
  // ============================================
  FL: {
    state: [
      {
        program_id: 'FL_WATER_CONSERVATION_TAX_EXEMPTION_2025',
        program_name: 'Florida Water Conservation Equipment Tax Exemption',
        program_type: 'tax_exemption',
        incentive_amount_min: null,
        incentive_amount_max: null,
        sector_applicability: 'both',
        water_types: ['GENERAL_CONSERVATION', 'RAINWATER'],
        eligible_system_types: 'Water conservation equipment including rainwater systems',
        application_url: 'https://floridarevenue.com/taxes/taxesfees/Pages/water_conservation.aspx',
        notes: 'Sales tax exemption for water conservation equipment',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      }
    ],
    utilities: [
      {
        program_id: 'FL_TAMPA_GREYWATER_2024',
        jurisdiction_id: 'FL_CITY_TAMPA',
        program_name: 'Tampa Water Greywater Rebate',
        program_type: 'rebate',
        incentive_amount_min: 500,
        incentive_amount_max: 2000,
        sector_applicability: 'both',
        water_types: ['GREYWATER'],
        eligible_system_types: 'Commercial and residential greywater systems',
        application_url: 'https://www.tampa.gov/water/rebates',
        notes: 'Tampa Water Department greywater rebate',
        residential_eligibility: true,
        commercial_eligibility: true,
        program_status: 'active'
      }
    ]
  }
};

async function populatePrograms() {
  console.log('🚀 Populating comprehensive water conservation programs\n');

  try {
    let totalPrograms = 0;
    let programsWithUrls = 0;

    for (const [stateCode, stateData] of Object.entries(comprehensivePrograms)) {
      console.log(`\n📍 Processing ${stateCode} programs...`);

      // Process state-level programs
      if (stateData.state) {
        console.log(`  State-level programs: ${stateData.state.length}`);

        for (const program of stateData.state) {
          // Insert into programs_master
          await bigquery.dataset(datasetId).table('programs_master').insert([{
            program_id: program.program_id,
            program_name: program.program_name,
            program_type: program.program_type,
            incentive_amount_min: program.incentive_amount_min,
            incentive_amount_max: program.incentive_amount_max,
            incentive_per_unit: program.incentive_per_unit || null,
            eligible_system_types: program.eligible_system_types,
            application_url: program.application_url,
            program_status: program.program_status,
            notes: program.notes,
            contact_email: program.contact_email || null,
            contact_phone: program.contact_phone || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

          // Insert into program_jurisdiction_link
          await bigquery.dataset(datasetId).table('program_jurisdiction_link').insert([{
            program_id: program.program_id,
            jurisdiction_id: `${stateCode}_STATE`
          }]);

          // Insert into program_sector_link
          const sectorId = program.sector_applicability === 'residential' ? 1 :
                          program.sector_applicability === 'commercial' ? 2 : 3;

          await bigquery.dataset(datasetId).table('program_sector_link').insert([{
            program_id: program.program_id,
            sector_id: sectorId
          }]);

          // Insert into program_water_type_link for each water type
          for (const waterType of program.water_types) {
            await bigquery.dataset(datasetId).table('program_water_type_link').insert([{
              program_id: program.program_id,
              water_type_id: waterType
            }]);
          }

          totalPrograms++;
          if (program.application_url) programsWithUrls++;
        }
      }

      // Process city/utility programs
      const cityPrograms = [...(stateData.cities || []), ...(stateData.utilities || [])];
      if (cityPrograms.length > 0) {
        console.log(`  City/Utility programs: ${cityPrograms.length}`);

        for (const program of cityPrograms) {
          // Insert into programs_master
          await bigquery.dataset(datasetId).table('programs_master').insert([{
            program_id: program.program_id,
            program_name: program.program_name,
            program_type: program.program_type,
            incentive_amount_min: program.incentive_amount_min,
            incentive_amount_max: program.incentive_amount_max,
            incentive_per_unit: program.incentive_per_unit || null,
            eligible_system_types: program.eligible_system_types,
            application_url: program.application_url,
            program_status: program.program_status,
            notes: program.notes,
            contact_email: program.contact_email || null,
            contact_phone: program.contact_phone || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

          // Insert into program_jurisdiction_link
          await bigquery.dataset(datasetId).table('program_jurisdiction_link').insert([{
            program_id: program.program_id,
            jurisdiction_id: program.jurisdiction_id
          }]);

          // Insert into program_sector_link
          const sectorId = program.sector_applicability === 'residential' ? 1 :
                          program.sector_applicability === 'commercial' ? 2 : 3;

          await bigquery.dataset(datasetId).table('program_sector_link').insert([{
            program_id: program.program_id,
            sector_id: sectorId
          }]);

          // Insert into program_water_type_link
          for (const waterType of program.water_types) {
            await bigquery.dataset(datasetId).table('program_water_type_link').insert([{
              program_id: program.program_id,
              water_type_id: waterType
            }]);
          }

          totalPrograms++;
          if (program.application_url) programsWithUrls++;
        }
      }
    }

    console.log('\n✅ COMPLETED!');
    console.log(`   Total programs added: ${totalPrograms}`);
    console.log(`   Programs with URLs: ${programsWithUrls} (${Math.round(programsWithUrls/totalPrograms*100)}%)`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

populatePrograms();
