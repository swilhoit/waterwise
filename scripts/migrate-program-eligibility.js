const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery
const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';
const tableId = 'programs_master';

// Manually categorized program eligibility based on review of each program
// This is the source of truth - not automated parsing
const programEligibility = {
  // ============================================================================
  // CALIFORNIA PROGRAMS
  // ============================================================================

  // STATE-LEVEL - Residential
  'CA_WATER_EFFICIENCY_TAX_CREDIT_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_CPUC_WATER_CONSERVATION_2025': {
    applicant_type: 'individual',
    residential: true, // low-income households
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'CA_SAVE_OUR_WATER_2025': {
    applicant_type: 'individual',
    residential: true, // education program
    commercial: true,
    municipal: false,
    agricultural: false
  },

  // STATE-LEVEL - Municipal/Government Only
  'CA_AGRICULTURAL_WATER_EFFICIENCY_2025': {
    applicant_type: 'agricultural',
    residential: false,
    commercial: false,
    municipal: false,
    agricultural: true
  },
  'CA_EMERGENCY_DROUGHT_RELIEF_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'CA_CALRECYCLE_WATER_GRANT_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'CA_DWR_WATER_CONSERVATION_GRANT_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'CA_STATE_WATER_EFFICIENCY_GRANT_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'CA_AFFORDABLE_HOUSING_WATER_2025': {
    applicant_type: 'business', // affordable housing developers
    residential: false,
    commercial: true,
    municipal: false,
    agricultural: false
  },

  // WATER DISTRICT PROGRAMS - Residential
  'CA_LADWP_GREYWATER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_LADWP_TURF_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_LADWP_TURF_ENHANCED_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_MWD_TURF_REPLACEMENT_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_MWD_ROTATING_NOZZLES_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_EBMUD_GREYWATER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'CA_EBMUD_GREYWATER_IQ_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'CA_EMWD_GREYWATER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_SD_GREYWATER_REBATE_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'CA_SFPUC_GREYWATER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_SCVWD_GREYWATER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_SMGWA_GREYWATER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },

  // CITY PROGRAMS - Residential
  'CA_GLENDALE_GREYWATER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'CA_CITY_GLENDALE_L2L_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'CA_BAKERSFIELD_TURF_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'CA_CORONA_DWP_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_FRESNO_MICRO_IRRIGATION_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_FRESNO_RAIN_SENSOR_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CA_FRESNO_SMART_CONTROLLER_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },

  // ============================================================================
  // TEXAS PROGRAMS
  // ============================================================================
  'TX_AUSTIN_GREYWATER_REBATE_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'TX_AUSTIN_RAINWATER_REBATE_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'TX_AUSTIN_WATER_CONSERVATION_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },

  // ============================================================================
  // COLORADO PROGRAMS
  // ============================================================================
  'CO_DENVER_GREYWATER_REBATE_2024': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'CO_RAINWATER_HARVESTING_PERMIT_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },

  // ============================================================================
  // OTHER STATE PROGRAMS - Residential
  // ============================================================================
  'NM_ABQ_LANDSCAPE_REBATE_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'MA_BOSTON_RAIN_BARREL_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'MD_BALTIMORE_RAIN_CHECK_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'OH_COLUMBUS_RAIN_BARREL_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'MI_DETROIT_RAIN_GARDEN_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'IN_INDY_RAIN_GARDEN_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: false,
    municipal: false,
    agricultural: false
  },
  'MO_KC_RAIN_GARDEN_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'NC_CHARLOTTE_STORMWATER_REBATE_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },

  // ============================================================================
  // STATE INFRASTRUCTURE PROGRAMS - Municipal Only (NOT for individuals)
  // ============================================================================
  'AL_STATE_WATER_REVOLVING_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'AZ_STATE_WATER_CONSERVATION_GRANT_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'AR_STATE_WATER_PLAN_GRANT_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'CT_STATE_CLEAN_WATER_FUND_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'FL_WATER_CONSERVATION_TAX_EXEMPTION_2025': {
    applicant_type: 'individual',
    residential: true,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'GA_STATE_WATER_STEWARDSHIP_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'GA_ATLANTA_WATERSHED_GRANT_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'ID_STATE_WATER_RESOURCES_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'IL_STATE_WATER_REVOLVING_LOAN_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'IL_CHICAGO_GREEN_PERMIT_2025': {
    applicant_type: 'business',
    residential: false,
    commercial: true,
    municipal: false,
    agricultural: false
  },
  'IN_STATE_SRF_LOAN_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'IA_STATE_SRF_LOAN_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'KS_STATE_WATER_OFFICE_GRANT_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'KY_STATE_WATER_FINANCE_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: false
  },
  'OH_STATE_H2OHIO_2025': {
    applicant_type: 'municipality',
    residential: false,
    commercial: false,
    municipal: true,
    agricultural: true
  },
};

async function migrateEligibility() {
  console.log('Starting eligibility migration...\n');

  let updatedCount = 0;
  let skippedCount = 0;

  for (const [programId, eligibility] of Object.entries(programEligibility)) {
    try {
      const query = `
        UPDATE \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.${tableId}\`
        SET
          applicant_type = '${eligibility.applicant_type}',
          residential_eligible = ${eligibility.residential},
          commercial_eligible = ${eligibility.commercial},
          municipal_eligible = ${eligibility.municipal},
          agricultural_eligible = ${eligibility.agricultural}
        WHERE program_id = '${programId}'
      `;

      const [job] = await bigquery.createQueryJob({
        query,
        location: 'US'
      });

      await job.getQueryResults();
      console.log(`✓ Updated: ${programId}`);
      updatedCount++;
    } catch (error) {
      console.log(`✗ Skipped ${programId}: ${error.message}`);
      skippedCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Migration complete!`);
  console.log(`Updated: ${updatedCount} programs`);
  console.log(`Skipped: ${skippedCount} programs`);
  console.log(`========================================\n`);

  // Show results
  const verifyQuery = `
    SELECT
      program_id,
      program_name,
      applicant_type,
      residential_eligible,
      commercial_eligible,
      municipal_eligible,
      agricultural_eligible,
      incentive_amount_max
    FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025'}.${datasetId}.${tableId}\`
    WHERE applicant_type IS NOT NULL
    ORDER BY program_name
  `;

  const [rows] = await bigquery.query(verifyQuery);

  console.log('Updated programs:\n');
  console.table(rows.map(r => ({
    program: r.program_name?.substring(0, 40),
    type: r.applicant_type,
    res: r.residential_eligible ? '✓' : '',
    com: r.commercial_eligible ? '✓' : '',
    mun: r.municipal_eligible ? '✓' : '',
    agr: r.agricultural_eligible ? '✓' : '',
    max: r.incentive_amount_max ? `$${Number(r.incentive_amount_max).toLocaleString()}` : ''
  })));
}

migrateEligibility().catch(console.error);
