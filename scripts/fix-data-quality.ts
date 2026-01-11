/**
 * Fix Critical Data Quality Issues in BigQuery
 *
 * This script addresses:
 * 1. Duplicate programs in programs_master table
 * 2. Orphaned programs that need jurisdiction links
 * 3. Jurisdiction ID format consistency diagnostic
 *
 * Run with: GOOGLE_CLOUD_PROJECT_ID=greywater-prospects-2025 npx tsx scripts/fix-data-quality.ts
 */

import { BigQuery } from '@google-cloud/bigquery';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

if (!projectId) {
  console.error('Error: GOOGLE_CLOUD_PROJECT_ID environment variable not set');
  process.exit(1);
}

const bigquery = new BigQuery({ projectId });
const dataset = `${projectId}.greywater_compliance`;

interface DuplicateProgram {
  program_id: string;
  program_name: string;
  created_at: { value: string } | string;
  updated_at: { value: string } | string;
}

interface OrphanedProgram {
  program_id: string;
  program_name: string;
  program_status: string;
}

interface JurisdictionFormat {
  jurisdiction_id: string;
  format_type: string;
  is_valid: boolean;
}

async function removeDuplicatePrograms(): Promise<void> {
  console.log('\n========================================');
  console.log('STEP 1: Remove Duplicate Programs');
  console.log('========================================\n');

  const duplicateProgramIds = [
    'CA_AGRICULTURAL_WATER_EFFICIENCY_2025',
    'CA_AFFORDABLE_HOUSING_WATER_2025',
  ];

  for (const programIdPrefix of duplicateProgramIds) {
    console.log(`\nChecking for duplicates of: ${programIdPrefix}`);

    // Find all versions of this program
    const findDuplicatesQuery = `
      SELECT program_id, program_name, created_at, updated_at
      FROM \`${dataset}.programs_master\`
      WHERE program_id LIKE @programIdPattern
      ORDER BY updated_at DESC, created_at DESC
    `;

    try {
      const [rows] = await bigquery.query({
        query: findDuplicatesQuery,
        params: { programIdPattern: `${programIdPrefix}%` },
      });

      const duplicates = rows as DuplicateProgram[];

      if (duplicates.length === 0) {
        console.log(`  No programs found matching: ${programIdPrefix}`);
        continue;
      }

      if (duplicates.length === 1) {
        console.log(`  Only 1 version found (no duplicates): ${duplicates[0].program_id}`);
        continue;
      }

      console.log(`  Found ${duplicates.length} versions:`);
      duplicates.forEach((p, i) => {
        const updatedAt = typeof p.updated_at === 'object' ? p.updated_at.value : p.updated_at;
        console.log(`    ${i + 1}. ${p.program_id} (updated: ${updatedAt || 'N/A'})`);
      });

      // Keep the first one (most recent), delete the rest
      const keepProgram = duplicates[0];
      const deletePrograms = duplicates.slice(1);

      console.log(`  Keeping: ${keepProgram.program_id}`);
      console.log(`  Deleting: ${deletePrograms.map((p) => p.program_id).join(', ')}`);

      for (const prog of deletePrograms) {
        // First delete from junction table
        const deleteLinkQuery = `
          DELETE FROM \`${dataset}.program_jurisdiction_link\`
          WHERE program_id = @programId
        `;

        await bigquery.query({
          query: deleteLinkQuery,
          params: { programId: prog.program_id },
        });
        console.log(`    Deleted junction links for: ${prog.program_id}`);

        // Then delete from programs_master
        const deleteProgramQuery = `
          DELETE FROM \`${dataset}.programs_master\`
          WHERE program_id = @programId
        `;

        await bigquery.query({
          query: deleteProgramQuery,
          params: { programId: prog.program_id },
        });
        console.log(`    Deleted program: ${prog.program_id}`);
      }
    } catch (error) {
      console.error(`  Error processing ${programIdPrefix}:`, error);
    }
  }
}

async function linkOrphanedPrograms(): Promise<void> {
  console.log('\n========================================');
  console.log('STEP 2: Link Orphaned Programs to Jurisdictions');
  console.log('========================================\n');

  const programsToLink = [
    {
      programId: 'CA_SCVWD_GREYWATER_2024',
      jurisdictionId: 'CA_COUNTY_SANTA_CLARA',
      coverageType: 'utility',
    },
    {
      programId: 'CA_SM_GREYWATER_REBATE_2024_CITY_CA_SANTA_MONICA',
      jurisdictionId: 'CA_CITY_SANTA_MONICA',
      coverageType: 'city',
      checkActive: true,
    },
  ];

  for (const link of programsToLink) {
    console.log(`\nProcessing: ${link.programId}`);

    // Check if program exists
    const [programs] = await bigquery.query({
      query: `
        SELECT program_id, program_name, program_status
        FROM \`${dataset}.programs_master\`
        WHERE program_id = @programId
      `,
      params: { programId: link.programId },
    });

    const programRows = programs as OrphanedProgram[];

    if (programRows.length === 0) {
      console.log(`  Program not found: ${link.programId}`);
      continue;
    }

    const program = programRows[0];
    console.log(`  Found: ${program.program_name} (status: ${program.program_status})`);

    // If we need to check active status
    if (link.checkActive && program.program_status?.toLowerCase() !== 'active') {
      console.log(`  Skipping (not active): ${program.program_status}`);
      continue;
    }

    // Check if link already exists
    const [existingLinks] = await bigquery.query({
      query: `
        SELECT program_id, jurisdiction_id
        FROM \`${dataset}.program_jurisdiction_link\`
        WHERE program_id = @programId AND jurisdiction_id = @jurisdictionId
      `,
      params: { programId: link.programId, jurisdictionId: link.jurisdictionId },
    });

    if ((existingLinks as unknown[]).length > 0) {
      console.log(`  Link already exists: ${link.programId} -> ${link.jurisdictionId}`);
      continue;
    }

    // Create the link
    try {
      await bigquery.query({
        query: `
          INSERT INTO \`${dataset}.program_jurisdiction_link\`
          (program_id, jurisdiction_id, coverage_type)
          VALUES (@programId, @jurisdictionId, @coverageType)
        `,
        params: {
          programId: link.programId,
          jurisdictionId: link.jurisdictionId,
          coverageType: link.coverageType,
        },
      });
      console.log(`  Created link: ${link.programId} -> ${link.jurisdictionId} (${link.coverageType})`);
    } catch (error) {
      console.error(`  Error creating link:`, error);
    }
  }
}

async function runJurisdictionFormatDiagnostic(): Promise<void> {
  console.log('\n========================================');
  console.log('STEP 3: Jurisdiction ID Format Diagnostic');
  console.log('========================================\n');

  // Check all unique jurisdiction IDs in the link table
  const diagnosticQuery = `
    WITH jurisdiction_analysis AS (
      SELECT DISTINCT
        jurisdiction_id,
        CASE
          WHEN REGEXP_CONTAINS(jurisdiction_id, r'^[A-Z]{2}_COUNTY_[A-Z_]+$') THEN 'COUNTY_FORMAT'
          WHEN REGEXP_CONTAINS(jurisdiction_id, r'^[A-Z]{2}_CITY_[A-Z_]+$') THEN 'CITY_FORMAT'
          WHEN REGEXP_CONTAINS(jurisdiction_id, r'^[A-Z]{2}_STATE$') THEN 'STATE_FORMAT'
          WHEN REGEXP_CONTAINS(jurisdiction_id, r'^[A-Z]{2}_UTILITY_[A-Z_]+$') THEN 'UTILITY_FORMAT'
          ELSE 'NON_STANDARD'
        END AS format_type,
        CASE
          WHEN REGEXP_CONTAINS(jurisdiction_id, r'^[A-Z]{2}_(COUNTY|CITY|STATE|UTILITY)_?[A-Z_]*$') THEN TRUE
          ELSE FALSE
        END AS is_valid_format
      FROM \`${dataset}.program_jurisdiction_link\`
    )
    SELECT
      jurisdiction_id,
      format_type,
      is_valid_format
    FROM jurisdiction_analysis
    ORDER BY format_type, jurisdiction_id
  `;

  try {
    const [rows] = await bigquery.query({ query: diagnosticQuery });
    const results = rows as JurisdictionFormat[];

    // Group by format type
    const byFormat: Record<string, string[]> = {};
    const inconsistent: string[] = [];

    results.forEach((row) => {
      if (!byFormat[row.format_type]) {
        byFormat[row.format_type] = [];
      }
      byFormat[row.format_type].push(row.jurisdiction_id);

      if (!row.is_valid || row.format_type === 'NON_STANDARD') {
        inconsistent.push(row.jurisdiction_id);
      }
    });

    console.log('Jurisdiction ID Format Summary:');
    console.log('--------------------------------');

    Object.entries(byFormat).forEach(([format, ids]) => {
      console.log(`\n${format} (${ids.length} entries):`);
      ids.slice(0, 10).forEach((id) => console.log(`  - ${id}`));
      if (ids.length > 10) {
        console.log(`  ... and ${ids.length - 10} more`);
      }
    });

    console.log('\n--------------------------------');
    if (inconsistent.length === 0) {
      console.log('All jurisdiction IDs follow the expected format.');
    } else {
      console.log(`\nINCONSISTENT FORMAT DETECTED (${inconsistent.length} entries):`);
      inconsistent.forEach((id) => console.log(`  - ${id}`));
    }
  } catch (error) {
    console.error('Error running diagnostic:', error);
  }
}

async function showSummary(): Promise<void> {
  console.log('\n========================================');
  console.log('SUMMARY: Current Data State');
  console.log('========================================\n');

  // Count programs
  const [programCount] = await bigquery.query({
    query: `SELECT COUNT(*) as count FROM \`${dataset}.programs_master\``,
  });
  console.log(`Total programs: ${(programCount as { count: number }[])[0].count}`);

  // Count links
  const [linkCount] = await bigquery.query({
    query: `SELECT COUNT(*) as count FROM \`${dataset}.program_jurisdiction_link\``,
  });
  console.log(`Total program-jurisdiction links: ${(linkCount as { count: number }[])[0].count}`);

  // Count orphaned programs (no links)
  const [orphanedCount] = await bigquery.query({
    query: `
      SELECT COUNT(*) as count
      FROM \`${dataset}.programs_master\` p
      LEFT JOIN \`${dataset}.program_jurisdiction_link\` pjl ON p.program_id = pjl.program_id
      WHERE pjl.program_id IS NULL
    `,
  });
  console.log(`Orphaned programs (no links): ${(orphanedCount as { count: number }[])[0].count}`);

  // List orphaned programs
  const [orphaned] = await bigquery.query({
    query: `
      SELECT p.program_id, p.program_name, p.program_status
      FROM \`${dataset}.programs_master\` p
      LEFT JOIN \`${dataset}.program_jurisdiction_link\` pjl ON p.program_id = pjl.program_id
      WHERE pjl.program_id IS NULL
      ORDER BY p.program_id
    `,
  });

  if ((orphaned as OrphanedProgram[]).length > 0) {
    console.log('\nOrphaned programs list:');
    (orphaned as OrphanedProgram[]).forEach((p) => {
      console.log(`  - ${p.program_id} (${p.program_status || 'unknown status'})`);
    });
  }
}

async function main(): Promise<void> {
  console.log('='.repeat(50));
  console.log('DATA QUALITY FIX SCRIPT');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: greywater_compliance`);
  console.log('='.repeat(50));

  try {
    await removeDuplicatePrograms();
    await linkOrphanedPrograms();
    await runJurisdictionFormatDiagnostic();
    await showSummary();

    console.log('\n='.repeat(50));
    console.log('DATA QUALITY FIXES COMPLETE');
    console.log('='.repeat(50));
  } catch (error) {
    console.error('\nFatal error:', error);
    process.exit(1);
  }
}

main();
