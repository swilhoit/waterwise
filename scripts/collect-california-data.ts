/**
 * California Greywater Regulation Data Collection
 *
 * This script inserts local regulation data into BigQuery.
 * Data is collected by AI agents from official California sources.
 *
 * Schema matches actual BigQuery table: greywater_compliance.local_regulations
 */

import { BigQuery } from '@google-cloud/bigquery';

interface LocalRegulation {
  jurisdiction_id: string;        // e.g., CA_COUNTY_LOS_ANGELES, CA_CITY_SAN_DIEGO
  jurisdiction_name: string;      // e.g., "Los Angeles County", "City of San Diego"
  jurisdiction_type: 'state' | 'county' | 'city';
  state_code: string;             // e.g., "CA"
  resource_type?: string;         // e.g., "greywater", "rainwater", "both"

  // Status
  regulation_status?: string;     // e.g., "active", "proposed"
  legal_status?: string;          // e.g., "permitted", "encouraged"

  // Permit info
  permit_required: string;        // e.g., "No - for laundry systems", "Per state tiers"
  permit_details?: string;        // Additional permit information

  // Regulations
  allowed_uses?: string;          // Comma-separated list
  restrictions?: string;          // Comma-separated list
  local_code_reference?: string;  // e.g., "LA County Code Title 28"

  // Dates
  effective_date?: string;        // YYYY-MM-DD format

  // Contact
  contact_department?: string;
  contact_phone?: string;
  contact_email?: string;
  website?: string;               // Official source URL

  // Notes
  notes?: string;
}

async function insertRegulation(regulation: LocalRegulation) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT_ID not set');
  }

  const bigquery = new BigQuery({ projectId });
  const datasetId = 'greywater_compliance';
  const tableId = 'local_regulations';

  // Build the row matching actual schema
  const row = {
    jurisdiction_id: regulation.jurisdiction_id,
    jurisdiction_name: regulation.jurisdiction_name,
    jurisdiction_type: regulation.jurisdiction_type,
    state_code: regulation.state_code,
    resource_type: regulation.resource_type || 'greywater',
    regulation_status: regulation.regulation_status || 'active',
    legal_status: regulation.legal_status || null,
    permit_required: regulation.permit_required,
    permit_details: regulation.permit_details || null,
    allowed_uses: regulation.allowed_uses || null,
    restrictions: regulation.restrictions || null,
    local_code_reference: regulation.local_code_reference || null,
    effective_date: regulation.effective_date || null,
    notes: regulation.notes || null,
    contact_department: regulation.contact_department || null,
    contact_phone: regulation.contact_phone || null,
    contact_email: regulation.contact_email || null,
    website: regulation.website || null,
    last_updated: new Date().toISOString().split('T')[0],
  };

  // Use MERGE to upsert
  const query = `
    MERGE \`${projectId}.${datasetId}.${tableId}\` T
    USING (SELECT @jurisdiction_id as jurisdiction_id) S
    ON T.jurisdiction_id = S.jurisdiction_id
    WHEN MATCHED THEN
      UPDATE SET
        jurisdiction_name = @jurisdiction_name,
        jurisdiction_type = @jurisdiction_type,
        state_code = @state_code,
        resource_type = @resource_type,
        regulation_status = @regulation_status,
        legal_status = @legal_status,
        permit_required = @permit_required,
        permit_details = @permit_details,
        allowed_uses = @allowed_uses,
        restrictions = @restrictions,
        local_code_reference = @local_code_reference,
        effective_date = @effective_date,
        notes = @notes,
        contact_department = @contact_department,
        contact_phone = @contact_phone,
        contact_email = @contact_email,
        website = @website,
        last_updated = @last_updated
    WHEN NOT MATCHED THEN
      INSERT (jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type,
              regulation_status, legal_status, permit_required, permit_details, allowed_uses,
              restrictions, local_code_reference, effective_date, notes, contact_department,
              contact_phone, contact_email, website, last_updated)
      VALUES (@jurisdiction_id, @jurisdiction_name, @jurisdiction_type, @state_code, @resource_type,
              @regulation_status, @legal_status, @permit_required, @permit_details, @allowed_uses,
              @restrictions, @local_code_reference, @effective_date, @notes, @contact_department,
              @contact_phone, @contact_email, @website, @last_updated)
  `;

  try {
    await bigquery.query({
      query,
      params: row,
    });
    console.log(`✓ Inserted/Updated: ${regulation.jurisdiction_id}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed: ${regulation.jurisdiction_id}`, error);
    return false;
  }
}

// Export for use by agents
export { insertRegulation, LocalRegulation };

// Example usage for California state-level data
async function insertCaliforniaStateData() {
  const caState: LocalRegulation = {
    jurisdiction_id: 'CA_STATE',
    jurisdiction_name: 'California',
    jurisdiction_type: 'state',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted',
    permit_required: 'No - for laundry-to-landscape under 250 GPD',
    permit_details: 'Simple systems under 250 GPD need no permit. Complex systems require construction permit.',
    allowed_uses: 'Subsurface landscape irrigation, Fruit trees, Ornamental plants, Lawn (subsurface only)',
    restrictions: 'No surface ponding, No edible crop contact, Mulch basin or subsurface required, No potable cross-connection',
    local_code_reference: 'California Plumbing Code Chapter 15, Health & Safety Code Section 17922.12',
    website: 'https://www.hcd.ca.gov/building-standards',
    notes: 'California allows simple laundry-to-landscape systems under 250 GPD without a permit. Systems over 250 GPD require a construction permit.',
  };

  await insertRegulation(caState);
}

// Utility function for agents to easily update a jurisdiction
async function updateJurisdiction(
  jurisdictionId: string,
  updates: Partial<Omit<LocalRegulation, 'jurisdiction_id'>>
) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT_ID not set');
  }

  const bigquery = new BigQuery({ projectId });

  // Build SET clause dynamically
  const setClauses: string[] = [];
  const params: Record<string, unknown> = { jurisdiction_id: jurisdictionId };

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      setClauses.push(`${key} = @${key}`);
      params[key] = value;
    }
  });

  if (setClauses.length === 0) {
    console.log('No updates to apply');
    return false;
  }

  setClauses.push('last_updated = @last_updated');
  params.last_updated = new Date().toISOString().split('T')[0];

  const query = `
    UPDATE \`${projectId}.greywater_compliance.local_regulations\`
    SET ${setClauses.join(', ')}
    WHERE jurisdiction_id = @jurisdiction_id
  `;

  try {
    await bigquery.query({ query, params });
    console.log(`✓ Updated: ${jurisdictionId}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to update: ${jurisdictionId}`, error);
    return false;
  }
}

export { updateJurisdiction };

// Run if called directly
if (require.main === module) {
  insertCaliforniaStateData().catch(console.error);
}
