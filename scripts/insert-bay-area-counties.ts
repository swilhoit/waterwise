/**
 * Bay Area Counties Greywater Regulation Data
 *
 * Data collected from official county and water district sources.
 * Last verified: 2025-01-10
 */

import { BigQuery } from '@google-cloud/bigquery';

interface LocalRegulation {
  jurisdiction_id: string;
  jurisdiction_name: string;
  jurisdiction_type: string;
  state_code: string;
  resource_type: string;
  regulation_status?: string;
  legal_status?: string;
  permit_required?: string;
  permit_details?: string;
  allowed_uses?: string;
  restrictions?: string;
  local_code_reference?: string;
  effective_date?: string;
  notes?: string;
  contact_department?: string;
  contact_phone?: string;
  contact_email?: string;
  website?: string;
  last_updated: string;
}

async function insertRegulation(regulation: LocalRegulation) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT_ID not set');
  }

  const bigquery = new BigQuery({ projectId });
  const datasetId = 'greywater_compliance';
  const tableId = 'local_regulations';

  const row = {
    jurisdiction_id: regulation.jurisdiction_id,
    jurisdiction_name: regulation.jurisdiction_name,
    jurisdiction_type: regulation.jurisdiction_type,
    state_code: regulation.state_code,
    resource_type: regulation.resource_type,
    regulation_status: regulation.regulation_status || '',
    legal_status: regulation.legal_status || '',
    permit_required: regulation.permit_required || '',
    permit_details: regulation.permit_details || '',
    allowed_uses: regulation.allowed_uses || '',
    restrictions: regulation.restrictions || '',
    local_code_reference: regulation.local_code_reference || '',
    effective_date: regulation.effective_date || '',
    notes: regulation.notes || '',
    contact_department: regulation.contact_department || '',
    contact_phone: regulation.contact_phone || '',
    contact_email: regulation.contact_email || '',
    website: regulation.website || '',
    last_updated: regulation.last_updated,
  };

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
        regulation_status = NULLIF(@regulation_status, ''),
        legal_status = NULLIF(@legal_status, ''),
        permit_required = NULLIF(@permit_required, ''),
        permit_details = NULLIF(@permit_details, ''),
        allowed_uses = NULLIF(@allowed_uses, ''),
        restrictions = NULLIF(@restrictions, ''),
        local_code_reference = NULLIF(@local_code_reference, ''),
        effective_date = CASE WHEN @effective_date = '' THEN NULL ELSE CAST(@effective_date AS DATE) END,
        notes = NULLIF(@notes, ''),
        contact_department = NULLIF(@contact_department, ''),
        contact_phone = NULLIF(@contact_phone, ''),
        contact_email = NULLIF(@contact_email, ''),
        website = NULLIF(@website, ''),
        last_updated = CAST(@last_updated AS DATE)
    WHEN NOT MATCHED THEN
      INSERT (jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type,
              regulation_status, legal_status, permit_required, permit_details, allowed_uses,
              restrictions, local_code_reference, effective_date, notes, contact_department,
              contact_phone, contact_email, website, last_updated)
      VALUES (@jurisdiction_id, @jurisdiction_name, @jurisdiction_type, @state_code, @resource_type,
              NULLIF(@regulation_status, ''), NULLIF(@legal_status, ''), NULLIF(@permit_required, ''),
              NULLIF(@permit_details, ''), NULLIF(@allowed_uses, ''), NULLIF(@restrictions, ''),
              NULLIF(@local_code_reference, ''),
              CASE WHEN @effective_date = '' THEN NULL ELSE CAST(@effective_date AS DATE) END,
              NULLIF(@notes, ''), NULLIF(@contact_department, ''), NULLIF(@contact_phone, ''),
              NULLIF(@contact_email, ''), NULLIF(@website, ''), CAST(@last_updated AS DATE))
  `;

  try {
    await bigquery.query({
      query,
      params: row,
    });
    console.log(`Inserted/Updated: ${regulation.jurisdiction_id}`);
    return true;
  } catch (error) {
    console.error(`Failed: ${regulation.jurisdiction_id}`, error);
    return false;
  }
}

// Bay Area County Data - Collected from official sources
const bayAreaCounties: LocalRegulation[] = [
  // San Francisco County
  {
    jurisdiction_id: 'CA_COUNTY_SAN_FRANCISCO',
    jurisdiction_name: 'San Francisco County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems under 250 GPD exempt from permit per CPC Chapter 15. All other greywater systems require plumbing permit from SF Department of Building Inspection (DBI). Buildings 100,000+ sqft must install onsite water reuse systems per SF Health Code Article 12C.',
    allowed_uses: 'Subsurface landscape irrigation; Fruit trees and ornamental plants; Toilet and urinal flushing (with treatment, buildings 100k+ sqft); Cooling systems (commercial with treatment)',
    restrictions: 'No surface ponding or runoff; No contact with edible portions of food crops; Must use mulch basin or subsurface distribution; Backflow prevention required; Must be 100 feet from creeks/wetlands; Greywater must stay on property',
    local_code_reference: 'California Plumbing Code Chapter 15; SF Health Code Article 12C',
    notes: 'SFPUC offers $100 rebate for L2L systems (up to $25 PVC, $50 diverter valve, $25 air admittance valve). Large developments (100k+ sqft) must install onsite water reuse systems. Contact waterconservation@sfwater.org or 415-551-4730.',
    contact_department: 'SF Public Utilities Commission Water Conservation',
    contact_phone: '415-551-4730',
    contact_email: 'waterconservation@sfwater.org',
    website: 'https://www.sfpuc.gov/learning/conserve-water/graywater-laundry-landscape-rebate',
    last_updated: '2025-01-10',
  },

  // Alameda County
  {
    jurisdiction_id: 'CA_COUNTY_ALAMEDA',
    jurisdiction_name: 'Alameda County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems under 250 GPD exempt from permit per CPC Chapter 15 if following all guidelines. Building permit required for branched drain systems or systems over 250 GPD.',
    allowed_uses: 'Subsurface landscape irrigation; Fruit trees (no contact with edible parts); Ornamental plants and shrubs; Mulch basin irrigation',
    restrictions: 'No surface ponding or runoff; Must discharge under 2 inches of mulch, rock, or soil; No cross-connection with potable water; Greywater must not leave property; Must be 100 feet from any creek, wetland, or waterway; Groundwater table must be 3+ feet below irrigation point',
    local_code_reference: 'California Plumbing Code Chapter 15',
    notes: 'EBMUD serves most of Alameda County and offers $100 rebate for L2L systems. Rebate covers brass 3-way diverter, air admittance valve, and PVC conveyance lines. Systems save 3,600-11,200 gallons/year depending on washer efficiency.',
    contact_department: 'EBMUD Water Conservation',
    contact_phone: '866-403-2683',
    contact_email: 'waterconservation@ebmud.com',
    website: 'https://www.ebmud.com/water/conservation-and-rebates/rebates/graywater-rebates',
    last_updated: '2025-01-10',
  },

  // Contra Costa County
  {
    jurisdiction_id: 'CA_COUNTY_CONTRA_COSTA',
    jurisdiction_name: 'Contra Costa County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems exempt from permit per CPC Section 1502.1.1 if following all guidelines. Building permit required for complex systems or systems over 250 GPD.',
    allowed_uses: 'Subsurface landscape irrigation; Fruit trees and ornamental plants; Mulch basin distribution',
    restrictions: 'No surface ponding or runoff; Flow diverter must be clearly labeled and accessible; Must discharge under 2 inches mulch cover; No potable water connection; No pumps except washer internal pump; Must stay on property',
    local_code_reference: 'California Plumbing Code Chapter 15',
    notes: 'Contra Costa Water District offers $50 rebate (100% of materials up to $50) for brass 3-way diverter and air admittance valve. Application must be postmarked within 90 days of equipment purchase. Rebate processed in 6-8 weeks. Staff may inspect completed system.',
    contact_department: 'Contra Costa Water District Conservation',
    contact_phone: '925-688-8000',
    website: 'https://www.ccwater.com/868/Laundry-to-Landscape-Greywater-Rebate',
    last_updated: '2025-01-10',
  },

  // Santa Clara County
  {
    jurisdiction_id: 'CA_COUNTY_SANTA_CLARA',
    jurisdiction_name: 'Santa Clara County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems under 250 GPD exempt from permit per CPC Chapter 15. Building permit required for branched drain systems or complex installations. Must apply for Valley Water rebate before installation.',
    allowed_uses: 'Subsurface landscape irrigation; Decorative trees and fruit trees; Shrubs and drought-tolerant plants; Mulch basin distribution',
    restrictions: 'No edible crops (decorative and fruit trees allowed); First greywater outlet must be within 50 feet of washer; Must be 1.5 feet from property lines and building foundations; No surface ponding or runoff; Mulch basins required for distribution',
    local_code_reference: 'California Plumbing Code Chapter 15',
    notes: 'Valley Water offers $200-$400 rebates for L2L systems. $400 available in Milpitas, Morgan Hill, Palo Alto, Santa Clara, and San Jose service areas. Program funded through June 30, 2026. Must apply and receive approval BEFORE installation.',
    contact_department: 'Santa Clara Valley Water Conservation',
    contact_phone: '408-630-2554',
    contact_email: 'waterconservation@valleywater.org',
    website: 'https://www.valleywater.org/saving-water/rebates-surveys/graywater-rebate',
    last_updated: '2025-01-10',
  },

  // San Mateo County
  {
    jurisdiction_id: 'CA_COUNTY_SAN_MATEO',
    jurisdiction_name: 'San Mateo County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems exempt per UPC Section 1602.1.1. Environmental Health review required for complex systems. Property owners must submit Environmental Health Review Application with plans for systems beyond L2L. Treated greywater required for surface drip or spray irrigation.',
    allowed_uses: 'Subsurface landscape irrigation; Mulch pile distribution (appropriately maintained); Fruit trees and ornamental plants',
    restrictions: 'Treated greywater required for surface drip or spray irrigation; Environmental Health review required for complex systems; Backflow prevention device required; No cross-connection with potable water; Must submit plans to County Environmental Health',
    local_code_reference: 'California Plumbing Code Chapter 15; Uniform Plumbing Code Section 1602.1.1',
    notes: 'Laundry-to-landscape systems gaining popularity due to simpler installation and no permit requirement. Environmental Health review required for more complex systems. Contact San Mateo County Environmental Health at 650-372-6200 for permit information.',
    contact_department: 'San Mateo County Environmental Health',
    contact_phone: '650-372-6200',
    website: 'https://www.smchealth.org/alternative-water-program',
    last_updated: '2025-01-10',
  },

  // Marin County
  {
    jurisdiction_id: 'CA_COUNTY_MARIN',
    jurisdiction_name: 'Marin County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems under 250 GPD exempt from permit per CPC Chapter 15. Plumbing permit required for branched drain systems. Basic L2L systems typically do not require permits or alteration to existing plumbing.',
    allowed_uses: 'Subsurface landscape irrigation; Fruit trees and ornamental plants; Drought-tolerant landscaping',
    restrictions: 'No surface ponding or runoff; Must discharge under 2 inches of mulch; No cross-connection with potable water; Greywater must stay on property',
    local_code_reference: 'California Plumbing Code Chapter 15',
    notes: 'MMWD offers $125 voucher for L2L kit at The Urban Farmer store. From 2020-2023, 59 greywater kits were incentivized. North Marin Water District also offers greywater rebates (call 415-761-8944). Rainwater rebate cap raised to $2,000 per customer in 2024.',
    contact_department: 'Marin Municipal Water District Conservation',
    contact_phone: '415-945-1497',
    website: 'https://www.marinwater.org/rebates',
    last_updated: '2025-01-10',
  },

  // Sonoma County
  {
    jurisdiction_id: 'CA_COUNTY_SONOMA',
    jurisdiction_name: 'Sonoma County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Clothes washer systems require building (plumbing) permit but NOT septic permit. Simple and complex systems require BOTH septic AND building permits. Permit Sonoma (PRMD) regulates greywater in unincorporated areas. Incorporated cities may have their own programs.',
    allowed_uses: 'Subsurface landscape irrigation; Mulch basin irrigation (covered with 2 inches mulch); Fruit trees and ornamental plants',
    restrictions: 'Subsurface irrigation only; No surface ponding - must remain covered with 2 inches of mulch, rock, or soil; No storage of greywater for simple L2L systems (storage requires permit and filtration); Branched drain systems require $50-$100 plumbing permit',
    local_code_reference: 'California Plumbing Code Chapter 15; Sonoma County Code Chapter 7',
    notes: 'Permit Sonoma regulates greywater in unincorporated Sonoma County (delegated authority from RWQCB). Incorporated cities may implement their own programs with RWQCB approval. Contact Well & Septic division at (707) 565-1900 for permit questions.',
    contact_department: 'Permit Sonoma Well & Septic Division',
    contact_phone: '707-565-1900',
    website: 'https://permitsonoma.org/divisions/engineeringandconstruction/wellandsepticsystems/graywater',
    last_updated: '2025-01-10',
  },

  // Napa County
  {
    jurisdiction_id: 'CA_COUNTY_NAPA',
    jurisdiction_name: 'Napa County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems under 250 GPD exempt from permit per CPC Chapter 15. Environmental Health permit required for systems beyond L2L. All permits handled through Online Permit Center as of January 2024.',
    allowed_uses: 'Subsurface landscape irrigation; Mulch basin distribution; Fruit trees and ornamental plants',
    restrictions: 'Must notify Enforcing Agency if required; No surface ponding or runoff; Greywater must stay on property; Must be 100 feet from creeks, wetlands, or waterways; Groundwater table must be lower than 3 feet from lowest irrigation point',
    local_code_reference: 'California Plumbing Code Chapter 15; Napa County Code Chapter 13.15',
    notes: 'Well and Onsite Wastewater Treatment subdivision regulates greywater systems in unincorporated Napa County. Environmental Health Division handles permitting. No specific county greywater rebate program identified.',
    contact_department: 'Napa County Environmental Health Division',
    contact_phone: '707-253-4417',
    contact_email: 'envhealth@countyofnapa.org',
    website: 'https://www.napacounty.gov/1904/Environmental-Health-Division',
    last_updated: '2025-01-10',
  },

  // Solano County
  {
    jurisdiction_id: 'CA_COUNTY_SOLANO',
    jurisdiction_name: 'Solano County',
    jurisdiction_type: 'county',
    state_code: 'CA',
    resource_type: 'greywater',
    regulation_status: 'active',
    legal_status: 'permitted_with_conditions',
    permit_required: 'conditional',
    permit_details: 'Laundry-to-landscape systems under 250 GPD exempt from permit per CPC Chapter 15 if following all 13 guidelines. Building permit required for branched drain systems or complex installations.',
    allowed_uses: 'Subsurface landscape irrigation; Trees and shrubs; Ornamental plants',
    restrictions: 'Must follow 13 CPC guidelines for permit exemption; No water from diapers or soiled garments; No hazardous chemicals (car parts, photo lab waste); Must minimize contact with humans and pets; Flow diverter must be clearly labeled; Operation and maintenance manual required; Must notify new owners of greywater system',
    local_code_reference: 'California Plumbing Code Chapter 15; Solano County Code Chapter 6.3',
    notes: 'Solano County Water Agency offers general water conservation rebates but no specific greywater rebate program identified. City of Vacaville partners with SCWA for conservation programs. Sustainable Solano offers L2L workshops for residents.',
    contact_department: 'Solano County Building and Safety Division',
    contact_phone: '707-784-6765',
    contact_email: 'building@solanocounty.gov',
    website: 'https://www.solanocounty.com/depts/rm/buildingnsafety/faq.asp',
    last_updated: '2025-01-10',
  },
];

async function insertBayAreaCounties() {
  console.log('Inserting Bay Area County greywater regulations into BigQuery...\n');

  let successCount = 0;
  let failCount = 0;

  for (const county of bayAreaCounties) {
    const success = await insertRegulation(county);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\nCompleted: ${successCount} succeeded, ${failCount} failed`);
}

// Run if called directly
if (require.main === module) {
  insertBayAreaCounties().catch(console.error);
}

export { insertBayAreaCounties, bayAreaCounties };
