/**
 * Migrate _PREPLUMB data into parent jurisdiction records
 *
 * Run with: GOOGLE_CLOUD_PROJECT_ID=greywater-prospects-2025 npx tsx scripts/migrate-preplumb-data.ts
 */

import { BigQuery } from '@google-cloud/bigquery';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
if (!projectId) {
  console.error('GOOGLE_CLOUD_PROJECT_ID not set');
  process.exit(1);
}

const bigquery = new BigQuery({ projectId });
const dataset = `${projectId}.greywater_compliance`;

interface PreplumbRecord {
  jurisdiction_id: string;
  jurisdiction_name: string;
  notes: string;
  local_code_reference: string;
  effective_date: { value: string } | null;
  regulation_status: string;
}

async function migratePreplumbData() {
  console.log('=== Migrating _PREPLUMB data to parent jurisdictions ===\n');

  // Get all _PREPLUMB records
  const query = `
    SELECT jurisdiction_id, jurisdiction_name, notes, local_code_reference, effective_date, regulation_status
    FROM \`${dataset}.local_regulations\`
    WHERE jurisdiction_id LIKE '%_PREPLUMB%'
  `;

  const [preplumbRecords] = await bigquery.query({ query });
  const records = preplumbRecords as PreplumbRecord[];

  console.log(`Found ${records.length} _PREPLUMB records to migrate\n`);

  for (const record of records) {
    const parentId = record.jurisdiction_id.replace(/_PREPLUMB.*$/, '');
    const hasMandate = record.notes?.includes('PRE-PLUMBING MANDATE:') || false;

    // Parse threshold from notes (look for patterns like '100,000+ sqft')
    let threshold: number | null = null;
    const thresholdMatch = record.notes?.match(/(\d+,?\d*)\+?\s*(?:sqft|square feet|sq ft)/i);
    if (thresholdMatch) {
      threshold = parseInt(thresholdMatch[1].replace(',', ''));
    }

    // Parse building types
    let buildingTypes: string | null = null;
    if (record.notes?.includes('single-family')) buildingTypes = 'Single-family, Duplex';
    else if (record.notes?.includes('100,000')) buildingTypes = 'Commercial 100,000+ sqft';
    else if (record.notes?.includes('nonresidential')) buildingTypes = 'Nonresidential';
    else if (record.notes?.includes('residential')) buildingTypes = 'Residential new construction';

    console.log(`Processing: ${record.jurisdiction_id}`);
    console.log(`  Parent: ${parentId}`);
    console.log(`  Has mandate: ${hasMandate}`);
    console.log(`  Threshold: ${threshold || 'N/A'}`);
    console.log(`  Building types: ${buildingTypes || 'N/A'}`);

    // Check if parent exists
    const parentCheckQuery = `
      SELECT jurisdiction_id
      FROM \`${dataset}.local_regulations\`
      WHERE jurisdiction_id = @parentId
    `;
    const [parentCheck] = await bigquery.query({
      query: parentCheckQuery,
      params: { parentId }
    });

    // Escape single quotes in strings for SQL
    const escapeSql = (str: string | null | undefined): string => {
      if (!str) return 'NULL';
      return `'${str.replace(/'/g, "''")}'`;
    };

    const jurisdictionType = parentId.includes('_STATE_') ? 'state' : 'city';
    const cleanName = record.jurisdiction_name?.replace(' Pre-Plumbing', '').replace(' Preplumb', '') || parentId;

    if ((parentCheck as unknown[]).length === 0) {
      console.log(`  ⚠ Parent record not found - creating new entry\n`);

      // Insert new record with pre-plumbing data using direct SQL
      const insertQuery = `
        INSERT INTO \`${dataset}.local_regulations\`
        (jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type,
         has_preplumbing_mandate, preplumbing_threshold_sqft, preplumbing_building_types,
         preplumbing_details, preplumbing_code_reference, last_updated)
        VALUES (
          '${parentId}',
          ${escapeSql(cleanName)},
          '${jurisdictionType}',
          'CA',
          'greywater',
          ${hasMandate},
          ${threshold || 'NULL'},
          ${escapeSql(buildingTypes)},
          ${escapeSql(record.notes)},
          ${escapeSql(record.local_code_reference)},
          CURRENT_DATE()
        )
      `;

      await bigquery.query({ query: insertQuery });
    } else {
      console.log(`  ✓ Updating parent record\n`);

      // Update existing parent record using direct SQL
      const updateQuery = `
        UPDATE \`${dataset}.local_regulations\`
        SET
          has_preplumbing_mandate = ${hasMandate},
          preplumbing_threshold_sqft = ${threshold || 'NULL'},
          preplumbing_building_types = ${escapeSql(buildingTypes)},
          preplumbing_details = ${escapeSql(record.notes)},
          preplumbing_code_reference = ${escapeSql(record.local_code_reference)},
          last_updated = CURRENT_DATE()
        WHERE jurisdiction_id = '${parentId}'
      `;

      await bigquery.query({ query: updateQuery });
    }
  }

  // Delete the _PREPLUMB records
  console.log('\nDeleting _PREPLUMB records...');
  const deleteQuery = `
    DELETE FROM \`${dataset}.local_regulations\`
    WHERE jurisdiction_id LIKE '%_PREPLUMB%'
  `;
  await bigquery.query({ query: deleteQuery });

  console.log('✓ Migration complete');

  // Verify
  const verifyQuery = `
    SELECT COUNT(*) as cnt
    FROM \`${dataset}.local_regulations\`
    WHERE has_preplumbing_mandate = true
  `;
  const [count] = await bigquery.query({ query: verifyQuery });
  console.log(`\nJurisdictions with pre-plumbing mandates: ${(count as { cnt: number }[])[0].cnt}`);
}

migratePreplumbData().catch(console.error);
