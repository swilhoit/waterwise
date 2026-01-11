/**
 * Fix incorrectly linked incentive programs
 *
 * Problem: Some city/utility-specific programs are linked to CA_STATE
 * when they should only be linked to their specific service areas.
 *
 * This script removes the incorrect CA_STATE links for programs that
 * are clearly utility/city-specific based on their name or coverage_area.
 */

import { BigQuery } from '@google-cloud/bigquery';

const PROGRAMS_TO_FIX = [
  // Programs that say "San Diego" but are linked to CA_STATE
  { program_name: 'City of San Diego Greywater Rebate', remove_from: ['CA_STATE'] },
  { program_name: 'San Diego Greywater Permit Assistance', remove_from: ['CA_STATE'] },
  { program_name: 'San Diego Simple Greywater (No Permit)', remove_from: ['CA_STATE'] },

  // Programs that are specific to other cities but linked to CA_STATE
  { program_name: 'San Francisco Greywater Rebate', remove_from: ['CA_STATE'] },
  { program_name: 'North Marin Water District Greywater Rebate', remove_from: ['CA_STATE'] },

  // Programs that have proper utility links but ALSO have CA_STATE (remove state link)
  // Only remove CA_STATE if they already have city/utility links
  { program_name: 'Santa Clara Valley Water District Greywater Rebate', remove_from: ['CA_STATE'] },
  { program_name: 'Santa Monica Greywater Rebate', remove_from: ['CA_STATE'] },
];

// Programs that need to be properly linked to their correct jurisdictions
const PROGRAMS_TO_ADD_LINKS = [
  {
    program_name: 'City of San Diego Greywater Rebate',
    add_jurisdictions: [
      { jurisdiction_id: 'CA_CITY_SAN_DIEGO', coverage_type: 'utility' },
      { jurisdiction_id: 'CA_COUNTY_SAN_DIEGO', coverage_type: 'utility' }
    ]
  },
  {
    program_name: 'San Diego Greywater Permit Assistance',
    add_jurisdictions: [
      { jurisdiction_id: 'CA_CITY_SAN_DIEGO', coverage_type: 'city' },
    ]
  },
  {
    program_name: 'San Diego Simple Greywater (No Permit)',
    add_jurisdictions: [
      { jurisdiction_id: 'CA_CITY_SAN_DIEGO', coverage_type: 'city' },
    ]
  },
  {
    program_name: 'San Francisco Greywater Rebate',
    add_jurisdictions: [
      { jurisdiction_id: 'CA_CITY_SAN_FRANCISCO', coverage_type: 'utility' },
      { jurisdiction_id: 'CA_COUNTY_SAN_FRANCISCO', coverage_type: 'utility' }
    ]
  },
  {
    program_name: 'North Marin Water District Greywater Rebate',
    add_jurisdictions: [
      { jurisdiction_id: 'CA_COUNTY_MARIN', coverage_type: 'utility' },
      // North Marin serves Novato and nearby areas
      { jurisdiction_id: 'CA_CITY_NOVATO', coverage_type: 'utility' },
    ]
  },
];

async function fixProgramLinks() {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  if (!projectId) {
    console.error('GOOGLE_CLOUD_PROJECT_ID not set');
    process.exit(1);
  }

  const bigquery = new BigQuery({ projectId });

  console.log('=== FIXING PROGRAM JURISDICTION LINKS ===\n');

  // Step 1: Remove incorrect CA_STATE links
  console.log('Step 1: Removing incorrect state-level links...\n');

  for (const fix of PROGRAMS_TO_FIX) {
    console.log(`Processing: ${fix.program_name}`);

    // First get the program_id
    const [programs] = await bigquery.query({
      query: `SELECT program_id FROM \`${projectId}.greywater_compliance.programs_master\` WHERE program_name = @name`,
      params: { name: fix.program_name }
    });

    if (programs.length === 0) {
      console.log(`  ⚠️ Program not found: ${fix.program_name}`);
      continue;
    }

    const programId = programs[0].program_id;

    for (const jurisdictionId of fix.remove_from) {
      const deleteQuery = `
        DELETE FROM \`${projectId}.greywater_compliance.program_jurisdiction_link\`
        WHERE program_id = @programId AND jurisdiction_id = @jurisdictionId
      `;

      try {
        const [job] = await bigquery.createQueryJob({
          query: deleteQuery,
          params: { programId, jurisdictionId }
        });
        await job.getQueryResults();
        console.log(`  ✓ Removed link: ${jurisdictionId}`);
      } catch (error) {
        console.log(`  ✗ Failed to remove ${jurisdictionId}:`, error);
      }
    }
  }

  // Step 2: Add correct jurisdiction links
  console.log('\nStep 2: Adding correct jurisdiction links...\n');

  for (const add of PROGRAMS_TO_ADD_LINKS) {
    console.log(`Processing: ${add.program_name}`);

    const [programs] = await bigquery.query({
      query: `SELECT program_id FROM \`${projectId}.greywater_compliance.programs_master\` WHERE program_name = @name`,
      params: { name: add.program_name }
    });

    if (programs.length === 0) {
      console.log(`  ⚠️ Program not found: ${add.program_name}`);
      continue;
    }

    const programId = programs[0].program_id;

    for (const link of add.add_jurisdictions) {
      // Check if link already exists
      const [existing] = await bigquery.query({
        query: `
          SELECT 1 FROM \`${projectId}.greywater_compliance.program_jurisdiction_link\`
          WHERE program_id = @programId AND jurisdiction_id = @jurisdictionId
        `,
        params: { programId, jurisdictionId: link.jurisdiction_id }
      });

      if (existing.length > 0) {
        console.log(`  ℹ️ Link already exists: ${link.jurisdiction_id}`);
        continue;
      }

      const insertQuery = `
        INSERT INTO \`${projectId}.greywater_compliance.program_jurisdiction_link\`
        (program_id, jurisdiction_id, coverage_type)
        VALUES (@programId, @jurisdictionId, @coverageType)
      `;

      try {
        const [job] = await bigquery.createQueryJob({
          query: insertQuery,
          params: {
            programId,
            jurisdictionId: link.jurisdiction_id,
            coverageType: link.coverage_type
          }
        });
        await job.getQueryResults();
        console.log(`  ✓ Added link: ${link.jurisdiction_id} (${link.coverage_type})`);
      } catch (error) {
        console.log(`  ✗ Failed to add ${link.jurisdiction_id}:`, error);
      }
    }
  }

  console.log('\n=== DONE ===');
  console.log('\nRun debug-incentives.ts again to verify the fixes.');
}

// Run with: GOOGLE_CLOUD_PROJECT_ID=greywater-prospects-2025 npx tsx scripts/fix-program-links.ts
fixProgramLinks().catch(console.error);
