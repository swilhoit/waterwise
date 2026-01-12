import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery();
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'waterwise-website';

async function checkData() {
  // Check greywater_laws table for California
  const query = `
    SELECT *
    FROM \`${projectId}.greywater_compliance.greywater_laws\`
    WHERE state_code = 'CA'
    LIMIT 1
  `;

  const [rows] = await bigquery.query({ query }) as any;
  console.log('=== California Greywater Laws Data ===');
  console.log(JSON.stringify(rows[0], null, 2));

  // Also check state_water_regulations if exists
  try {
    const query2 = `
      SELECT *
      FROM \`${projectId}.greywater_compliance.state_water_regulations\`
      WHERE state_code = 'CA'
      LIMIT 1
    `;
    const [rows2] = await bigquery.query({ query: query2 }) as any;
    console.log('\n=== California State Water Regulations Data ===');
    console.log(JSON.stringify(rows2[0], null, 2));
  } catch (e) {
    console.log('\n(state_water_regulations table not found or empty for CA)');
  }
}

checkData().catch(console.error);
