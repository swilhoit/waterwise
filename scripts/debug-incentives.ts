import { BigQuery } from '@google-cloud/bigquery';

async function debugIncentives() {
  const bigquery = new BigQuery({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
  });

  console.log('\n=== PROGRAMS AND THEIR JURISDICTION LINKS ===\n');

  // Get all programs with their jurisdiction links
  const query = `
    SELECT
      p.program_id,
      p.program_name,
      p.water_utility,
      p.coverage_area,
      pjl.jurisdiction_id,
      pjl.coverage_type
    FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
    LEFT JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
      ON p.program_id = pjl.program_id
    WHERE LOWER(p.program_status) = 'active'
    ORDER BY p.program_name, pjl.jurisdiction_id
  `;

  const [rows] = await bigquery.query(query);

  console.log('Total program-jurisdiction links:', rows.length);
  console.log('\n');

  // Group by program
  const programs = new Map();
  rows.forEach((row: any) => {
    if (!programs.has(row.program_name)) {
      programs.set(row.program_name, {
        water_utility: row.water_utility,
        coverage_area: row.coverage_area,
        jurisdictions: []
      });
    }
    if (row.jurisdiction_id) {
      programs.get(row.program_name).jurisdictions.push({
        id: row.jurisdiction_id,
        type: row.coverage_type
      });
    }
  });

  programs.forEach((data, name) => {
    console.log(`\n${name}`);
    console.log(`  Utility: ${data.water_utility || 'N/A'}`);
    console.log(`  Coverage Area: ${data.coverage_area || 'N/A'}`);
    console.log(`  Linked Jurisdictions (${data.jurisdictions.length}):`);
    data.jurisdictions.forEach((j: any) => {
      console.log(`    - ${j.id} (${j.type || 'unknown'})`);
    });
  });

  // Check what would show for Willows
  console.log('\n\n=== WHAT SHOWS FOR WILLOWS, GLENN COUNTY ===\n');

  const willowsQuery = `
    SELECT DISTINCT
      p.program_name,
      p.water_utility,
      p.coverage_area,
      pjl.jurisdiction_id,
      pjl.coverage_type
    FROM \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.programs_master\` p
    JOIN \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.greywater_compliance.program_jurisdiction_link\` pjl
      ON p.program_id = pjl.program_id
    WHERE LOWER(p.program_status) = 'active'
      AND pjl.jurisdiction_id IN ('CA_STATE', 'CA_COUNTY_GLENN', 'CA_CITY_WILLOWS')
    ORDER BY p.program_name
  `;

  const [willowsRows] = await bigquery.query(willowsQuery);

  console.log('Programs that would show for Willows:');
  willowsRows.forEach((row: any) => {
    console.log(`  - ${row.program_name} (linked to: ${row.jurisdiction_id}, coverage: ${row.coverage_type})`);
    console.log(`    Utility: ${row.water_utility}, Area: ${row.coverage_area}`);
  });
}

debugIncentives().catch(console.error);
