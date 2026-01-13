-- City-level greywater permit details table
-- This table stores detailed permit requirements for specific cities

CREATE TABLE IF NOT EXISTS `greywater-prospects-2025.greywater_compliance.city_permit_details` (
  -- Location identifiers
  state_code STRING NOT NULL,
  city_name STRING NOT NULL,
  county_name STRING,
  jurisdiction_id STRING,  -- e.g., CA_CITY_LOS_ANGELES

  -- Permit type and status
  permit_type STRING,  -- e.g., "Building Permit", "Plumbing Permit", "None Required"
  permit_required BOOL,
  permit_required_threshold_gpd INT64,  -- Systems under this GPD don't need permit

  -- System types covered
  laundry_to_landscape_allowed BOOL,
  branched_drain_allowed BOOL,
  surge_tank_system_allowed BOOL,
  indoor_reuse_allowed BOOL,

  -- Application process
  application_url STRING,  -- Direct link to permit application
  application_method STRING,  -- e.g., "Online", "In-person", "Mail"
  required_documents ARRAY<STRING>,  -- e.g., ["Site plan", "System specs", "Photo of location"]
  pre_approval_required BOOL,

  -- Fees
  permit_fee_min FLOAT64,
  permit_fee_max FLOAT64,
  plan_check_fee FLOAT64,
  inspection_fee FLOAT64,
  fee_notes STRING,

  -- Inspections
  inspections_required ARRAY<STRING>,  -- e.g., ["Pre-installation", "Final", "Plumbing rough-in"]
  inspection_scheduling_url STRING,
  inspection_scheduling_phone STRING,

  -- Professional requirements
  licensed_plumber_required BOOL,
  licensed_contractor_required BOOL,
  diy_allowed BOOL,
  professional_requirements_notes STRING,

  -- Timeline
  typical_processing_days INT64,
  expedited_available BOOL,
  expedited_fee FLOAT64,

  -- Contact info
  department_name STRING,  -- e.g., "Building & Safety Department"
  department_address STRING,
  department_phone STRING,
  department_email STRING,
  department_hours STRING,
  department_url STRING,

  -- Additional requirements
  hoa_approval_note STRING,  -- Note about HOA requirements if applicable
  special_requirements ARRAY<STRING>,  -- City-specific requirements
  exemptions ARRAY<STRING>,  -- Cases where permits are not required

  -- Verification
  data_source STRING,  -- URL or source of this information
  data_verified_date DATE,
  data_confidence STRING,  -- "verified", "partial", "unverified"
  last_updated TIMESTAMP,

  -- Notes
  notes STRING,
  tips_for_residents STRING
);

-- Example insert for Los Angeles
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details` VALUES (
  'CA',
  'Los Angeles',
  'Los Angeles',
  'CA_CITY_LOS_ANGELES',
  'Plumbing Permit',
  true,
  250,  -- Under 250 GPD laundry-to-landscape doesn't need permit
  true,  -- laundry_to_landscape_allowed
  true,  -- branched_drain_allowed
  true,  -- surge_tank_system_allowed
  true,  -- indoor_reuse_allowed
  'https://www.ladbs.org/services/online-services/online-permit-application',
  'Online',
  ['Site plan showing greywater system location', 'System specifications', 'Property ownership documentation'],
  false,  -- pre_approval_required
  0,  -- permit_fee_min (simple systems)
  500,  -- permit_fee_max
  NULL,  -- plan_check_fee
  NULL,  -- inspection_fee
  'Simple laundry-to-landscape systems under 250 GPD do not require permits',
  ['Final inspection'],
  NULL,
  '311',
  false,  -- licensed_plumber_required
  false,  -- licensed_contractor_required
  true,  -- diy_allowed
  'DIY allowed for simple laundry-to-landscape systems',
  5,  -- typical_processing_days
  false,  -- expedited_available
  NULL,
  'Los Angeles Department of Building and Safety',
  '201 N. Figueroa St., Los Angeles, CA 90012',
  '311',
  NULL,
  'Monday-Friday 7:30am-4:30pm',
  'https://www.ladbs.org',
  'Check with your HOA before installing visible greywater components',
  ['Must use mulch basin or approved irrigation method', 'No surface ponding allowed'],
  ['Laundry-to-landscape systems under 250 GPD with 3-way valve'],
  'https://www.ladbs.org/docs/default-source/publications/information-bulletins/plumbing-code/ib-p-gc2020-002-graywater-systems.pdf',
  DATE '2024-01-15',
  'verified',
  CURRENT_TIMESTAMP(),
  'LA has been a leader in greywater adoption with streamlined permitting',
  'Start with a simple laundry-to-landscape system - no permit needed under 250 GPD!'
);
