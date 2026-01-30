const { BigQuery } = require('@google-cloud/bigquery');

/**
 * Fix Verified Program Data
 *
 * This script corrects inaccurate incentive program data identified during fact-checking.
 * Run with: node scripts/fix-verified-program-data.js
 *
 * VERIFICATION DATE: 2026-01-30
 *
 * Changes made:
 *
 * FAKE/REMOVED:
 * - WA_REGIONAL_WASHER_2025: Saving Water Partnership Clothes Washer Rebate - DOES NOT EXIST
 * - CA_SAN_DIEGO_GREYWATER_REBATE_2026: San Diego Graywater Rebate - DOES NOT EXIST
 *
 * EXPIRED:
 * - CO_DENVER_CONTROLLER_2025: Denver Smart Irrigation Controller - ENDED Dec 31, 2025
 *
 * AMOUNT CORRECTIONS:
 * - NV_SNWA_WSL_2025: $3.50-$5 -> $5/sq ft residential, $2.50 thereafter
 * - UT_STATE_LANDSCAPE_2025: $1-$3/sq ft, $30k max -> $2-$3/sq ft, $50k max
 * - OR_PORTLAND_CRR_2025: 100% discount -> 35% discount (changed July 2024)
 * - OR_PORTLAND_OUTDOOR_2025: $25-$100 -> $3-$500 (commercial up to $500)
 * - WA_REGIONAL_TOILET_2025: $50 -> $100 per toilet
 * - WA_REGIONAL_CONTROLLER_2025: $125 -> $100 ($10/zone max 10)
 * - AZ Tucson Greywater: $200 -> $1,000
 * - CA Santa Barbara Irrigation: $5,000 -> $100 for graywater
 */

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'greywater-prospects-2025',
});

const datasetId = 'greywater_compliance';

// Programs to DELETE (fake/non-existent)
const PROGRAMS_TO_DELETE = [
  'WA_REGIONAL_WASHER_2025',      // Saving Water Partnership Clothes Washer - DOES NOT EXIST
  'CA_SAN_DIEGO_GREYWATER_REBATE_2026', // San Diego Graywater Rebate - DOES NOT EXIST
];

// Programs to mark as EXPIRED/INACTIVE
const PROGRAMS_TO_EXPIRE = [
  {
    program_id: 'CO_DENVER_CONTROLLER_2025',
    program_status: 'expired',
    notes: 'Program ended December 31, 2025'
  },
];

// Programs to UPDATE with correct data
const PROGRAMS_TO_UPDATE = [
  {
    program_id: 'NV_SNWA_WSL_2025',
    updates: {
      incentive_per_unit: 'Residential: $5/sq ft (first 10,000 sq ft), $2.50/sq ft thereafter. Commercial functional turf: $3/sq ft (first 10,000), $1.50 thereafter.',
      program_description: 'Convert grass to water-efficient, drip-irrigated landscaping. Residential: $5/sq ft for first 10,000 sq ft, $2.50/sq ft after. Commercial/HOA rates vary. Minimum 400 sq ft conversion.',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'NV_SNWA_TREE_2025',
    updates: {
      incentive_per_unit: '$100 per tree (up to 100% canopy coverage)',
      incentive_amount_max: null, // No fixed max - depends on canopy coverage
      program_description: 'Bonus $100 for every new tree installed as part of Water Smart Landscapes rebate. Trees must achieve up to 100% canopy coverage and be from qualifying list (236+ sq ft canopy at maturity).',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'UT_STATE_LANDSCAPE_2025',
    updates: {
      incentive_amount_min: 2,
      incentive_amount_max: 50000,
      incentive_per_unit: '$2-$3 per sq ft depending on district (state program $2/sq ft)',
      program_description: 'Replace lawn with water-efficient landscaping. State program (Division of Water Resources): $2/sq ft up to $50,000. Local district rates vary up to $3/sq ft with maximums from $15,000 to $100,000 depending on location.',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'OR_PORTLAND_CRR_2025',
    updates: {
      incentive_per_unit: 'Up to 35% discount on stormwater charges',
      program_description: 'Discount on stormwater charges if rain from roof/driveway soaks into ground on your property. As of July 1, 2024, maximum discount is 35% (previously 100%).',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'OR_PORTLAND_OUTDOOR_2025',
    updates: {
      incentive_amount_min: 3,
      incentive_amount_max: 500,
      incentive_per_unit: 'Irrigation controllers: $100 residential, $500 commercial. Rotary nozzles: $3 each (max 32 residential, 96 commercial)',
      program_description: 'Rebates for WaterSense-labeled irrigation controllers (up to $100 residential, $500 commercial/multifamily) and multistream rotator sprinkler nozzles ($3/each).',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'WA_REGIONAL_TOILET_2025',
    updates: {
      incentive_amount_min: 100,
      incentive_amount_max: 200,
      incentive_per_unit: '$100 per toilet (max 2 per household)',
      program_description: 'Rebate for MaP PREMIUM rated high-efficiency toilets. Up to $100 per toilet, maximum 2 toilets per household. Toilets being replaced must be manufactured before 2011.',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'WA_REGIONAL_CONTROLLER_2025',
    updates: {
      program_name: 'Saving Water Partnership Sprinkler Timer Rebate',
      incentive_amount_min: 10,
      incentive_amount_max: 100,
      incentive_per_unit: '$10 per zone (max 10 zones = $100)',
      program_description: 'Rebate for WaterSense-certified smart irrigation controllers/sprinkler timers. $10 per functioning zone, maximum $100. Available April 1 - October 31 only.',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'WA_SEATTLE_RAINWISE_2025',
    updates: {
      incentive_per_unit: '$7.90 per sq ft of rooftop runoff controlled',
      program_description: 'Rebates covering most or all of project costs for installation of rain gardens and/or cisterns that capture rooftop rainwater. Calculated at $7.90 per square foot of rooftop runoff controlled.',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'WA_SEATTLE_STORMWATER_CREDIT_2025',
    updates: {
      incentive_per_unit: 'Up to 50% credit on annual drainage fee',
      program_description: 'Credit for property owners with stormwater systems that provide flow control and/or water quality treatment. Up to 50% reduction on annual drainage fee.',
      application_url: 'https://www.seattle.gov/utilities/your-services/discounts-and-incentives/stormwater-facility-credit',
      verified_date: '2026-01-30'
    }
  },
  {
    program_id: 'CA_SANTA_BARBARA_IRRIGATION_REBATE_2026',
    updates: {
      incentive_amount_max: 100,
      incentive_per_unit: '50% of graywater materials cost, max $100',
      program_description: 'Santa Barbara graywater system rebate covers 50% of materials cost up to $100. Broader irrigation efficiency programs may have higher limits for non-graywater improvements.',
      verified_date: '2026-01-30'
    }
  },
];

// Tucson Water greywater rebate correction (if exists)
const TUCSON_GREYWATER_UPDATE = {
  where_clause: "program_id LIKE '%TUCSON%GREYWATER%' OR (program_name LIKE '%Tucson%' AND program_name LIKE '%Gray%Water%')",
  updates: {
    incentive_amount_max: 1000,
    program_description: 'Tucson Water Greywater Harvesting Rebate reimburses up to $1,000 for residential greywater systems.',
    verified_date: '2026-01-30'
  }
};

async function fixProgramData() {
  console.log('='.repeat(60));
  console.log('FIXING VERIFIED PROGRAM DATA');
  console.log('Verification Date: 2026-01-30');
  console.log('='.repeat(60));
  console.log('');

  try {
    // 1. DELETE fake/non-existent programs
    console.log('1. DELETING FAKE/NON-EXISTENT PROGRAMS');
    console.log('-'.repeat(40));

    for (const programId of PROGRAMS_TO_DELETE) {
      console.log(`   Deleting: ${programId}`);

      // Delete from programs_master
      const deleteQuery = `
        DELETE FROM \`greywater-prospects-2025.${datasetId}.programs_master\`
        WHERE program_id = '${programId}'
      `;

      await bigquery.query({ query: deleteQuery, location: 'US' });

      // Also delete from program_jurisdiction_link
      const deleteLinkQuery = `
        DELETE FROM \`greywater-prospects-2025.${datasetId}.program_jurisdiction_link\`
        WHERE program_id = '${programId}'
      `;

      try {
        await bigquery.query({ query: deleteLinkQuery, location: 'US' });
      } catch (e) {
        // Table might not exist or no rows to delete
      }

      console.log(`   ✓ Deleted: ${programId}`);
    }
    console.log('');

    // 2. EXPIRE discontinued programs
    console.log('2. MARKING EXPIRED PROGRAMS');
    console.log('-'.repeat(40));

    for (const program of PROGRAMS_TO_EXPIRE) {
      console.log(`   Expiring: ${program.program_id}`);

      const expireQuery = `
        UPDATE \`greywater-prospects-2025.${datasetId}.programs_master\`
        SET
          program_status = '${program.program_status}',
          program_description = CONCAT(program_description, ' [${program.notes}]'),
          verified_date = '2026-01-30',
          updated_at = CURRENT_TIMESTAMP()
        WHERE program_id = '${program.program_id}'
      `;

      await bigquery.query({ query: expireQuery, location: 'US' });
      console.log(`   ✓ Expired: ${program.program_id}`);
    }
    console.log('');

    // 3. UPDATE programs with corrected data
    console.log('3. UPDATING PROGRAMS WITH CORRECT DATA');
    console.log('-'.repeat(40));

    for (const program of PROGRAMS_TO_UPDATE) {
      console.log(`   Updating: ${program.program_id}`);

      const setClauses = Object.entries(program.updates)
        .map(([key, value]) => {
          if (value === null) {
            return `${key} = NULL`;
          } else if (typeof value === 'string') {
            return `${key} = '${value.replace(/'/g, "\\'")}'`;
          } else {
            return `${key} = ${value}`;
          }
        })
        .join(',\n          ');

      const updateQuery = `
        UPDATE \`greywater-prospects-2025.${datasetId}.programs_master\`
        SET
          ${setClauses},
          updated_at = CURRENT_TIMESTAMP()
        WHERE program_id = '${program.program_id}'
      `;

      const [result] = await bigquery.query({ query: updateQuery, location: 'US' });
      console.log(`   ✓ Updated: ${program.program_id}`);
    }
    console.log('');

    // 4. Update Tucson Water greywater rebate if it exists
    console.log('4. UPDATING TUCSON WATER GREYWATER REBATE');
    console.log('-'.repeat(40));

    const tucsonUpdateQuery = `
      UPDATE \`greywater-prospects-2025.${datasetId}.programs_master\`
      SET
        incentive_amount_max = 1000,
        program_description = 'Tucson Water Greywater Harvesting Rebate reimburses up to $1,000 for residential greywater systems.',
        verified_date = '2026-01-30',
        updated_at = CURRENT_TIMESTAMP()
      WHERE program_id LIKE '%TUCSON%GREY%'
         OR program_id LIKE '%TUCSON%GRAY%'
         OR (program_name LIKE '%Tucson%' AND (program_name LIKE '%Gray%Water%' OR program_name LIKE '%Grey%Water%'))
    `;

    try {
      await bigquery.query({ query: tucsonUpdateQuery, location: 'US' });
      console.log('   ✓ Updated Tucson Water greywater rebate to $1,000');
    } catch (e) {
      console.log('   - No Tucson greywater program found to update');
    }
    console.log('');

    // 5. Summary
    console.log('='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Programs deleted (fake):     ${PROGRAMS_TO_DELETE.length}`);
    console.log(`Programs expired:            ${PROGRAMS_TO_EXPIRE.length}`);
    console.log(`Programs updated:            ${PROGRAMS_TO_UPDATE.length}`);
    console.log('');
    console.log('✅ BigQuery program data has been corrected.');
    console.log('');
    console.log('REMAINING MANUAL FIXES NEEDED:');
    console.log('-'.repeat(40));
    console.log('1. Remove Arizona tax credit from knowledge-base.ts (EXPIRED ~2017)');
    console.log('2. Remove Arizona tax credit from greywater-state-directory.json');
    console.log('3. Remove Arizona tax credit from rainwater-state-directory.json');
    console.log('4. Update Aurora Water URL in BigQuery (returns 403)');
    console.log('5. Add missing Portland programs (Treebate, Percent for Green)');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error);
    if (error.errors) {
      console.error('Query errors:', JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

// Run the fix
fixProgramData();
