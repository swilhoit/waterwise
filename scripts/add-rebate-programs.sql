-- Add verified rebate/incentive programs for water conservation
-- Focus on greywater, rainwater, and turf replacement programs in drought-prone states
-- All programs verified from official utility websites as of January 2026

-- ============================================================================
-- CALIFORNIA PROGRAMS
-- ============================================================================

-- Austin Water (Texas) - Laundry-to-Landscape Greywater Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  created_at, updated_at
) VALUES (
  'TX_AUSTIN_WATER_L2L_2026',
  'Austin Water Laundry-to-Landscape Rebate',
  'rebate',
  'greywater',
  'laundry-to-landscape',
  0, 150, 'per system',
  'https://www.austintexas.gov/department/water-conservation-rebates',
  'active',
  'Austin Water',
  'Austin Water service area',
  'Rebate up to $150 for laundry-to-landscape graywater systems that reuse laundry water for landscape irrigation.',
  'Must be a residential customer of Austin Water or one of 14 qualifying regional water providers.',
  'Apply online through the Austin Water Conservation Rebates portal. Submit receipts and photos of installed system.',
  true, false, false, false,
  false, false,
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Austin Water - Rainwater Harvesting Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  created_at, updated_at
) VALUES (
  'TX_AUSTIN_WATER_RAINWATER_2026',
  'Austin Water Rainwater Harvesting Rebate',
  'rebate',
  'rainwater',
  'cistern',
  0, 5000, 'per site based on storage capacity',
  'https://www.austintexas.gov/department/water-conservation-rebates',
  'active',
  'Austin Water',
  'Austin Water service area',
  'Rebate up to $5,000 per site for rainwater harvesting systems, based on rainwater storage capacity.',
  'Must be a residential customer of Austin Water or one of 14 qualifying regional water providers.',
  'Apply online through the Austin Water Conservation Rebates portal. Submit receipts and photos of installed system.',
  true, false, false, false,
  false, false,
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Austin Water - WaterWise Rainscape Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  created_at, updated_at
) VALUES (
  'TX_AUSTIN_WATER_RAINSCAPE_2026',
  'Austin Water WaterWise Rainscape Rebate',
  'rebate',
  'rainwater',
  'rain-garden',
  0, 1500, '$0.50 per square foot (100 sq ft minimum)',
  'https://www.austintexas.gov/department/water-conservation-rebates',
  'active',
  'Austin Water',
  'Austin Water service area',
  'Rebate of $0.50 per square foot converted (100 sq ft minimum), up to $1,500 per property for landscape features that retain rainwater.',
  'Must be a residential customer of Austin Water or one of 14 qualifying regional water providers.',
  'Apply online through the Austin Water Conservation Rebates portal.',
  true, false, false, false,
  false, false,
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Austin Water - WaterWise Landscaping (Turf Replacement)
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  created_at, updated_at
) VALUES (
  'TX_AUSTIN_WATER_TURF_2026',
  'Austin Water WaterWise Landscaping Rebate',
  'rebate',
  'conservation',
  'turf-replacement',
  0, 3000, 'per property',
  'https://www.austintexas.gov/department/water-conservation-rebates',
  'active',
  'Austin Water',
  'Austin Water service area',
  'Rebate up to $3,000 to convert turf grass to native water-wise landscaping.',
  'Must be a residential customer of Austin Water or one of 14 qualifying regional water providers.',
  'Apply online through the Austin Water Conservation Rebates portal.',
  true, false, false, false,
  false, false,
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Austin Water - Irrigation System Upgrades
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  created_at, updated_at
) VALUES (
  'TX_AUSTIN_WATER_IRRIGATION_2026',
  'Austin Water Irrigation System Upgrades Rebate',
  'rebate',
  'conservation',
  'irrigation',
  0, 1000, 'per property',
  'https://www.austintexas.gov/department/water-conservation-rebates',
  'active',
  'Austin Water',
  'Austin Water service area',
  'Rebate up to $1,000 for irrigation system upgrades to improve water efficiency.',
  'Must be a residential customer of Austin Water or one of 14 qualifying regional water providers.',
  'Apply online through the Austin Water Conservation Rebates portal.',
  true, false, false, false,
  false, false,
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- ============================================================================
-- NEVADA PROGRAMS - Southern Nevada Water Authority
-- ============================================================================

-- SNWA Water Smart Landscapes Rebate (Residential)
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply, documentation_required,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  property_requirements, restrictions,
  created_at, updated_at
) VALUES (
  'NV_SNWA_WSL_RESIDENTIAL_2026',
  'SNWA Water Smart Landscapes Rebate (Residential)',
  'rebate',
  'conservation',
  'turf-replacement',
  5, 5, '$5/sq ft first 10,000 sq ft, then $2.50/sq ft',
  'https://www.snwa.com/rebates/wsl',
  'active',
  'Southern Nevada Water Authority',
  'Southern Nevada Water Authority service area (Las Vegas Valley)',
  'Rebate of $5 per square foot for the first 10,000 sq ft of grass removed and replaced with desert landscaping, then $2.50 per sq ft thereafter. Additional $100 per new tree installed (up to 100% canopy coverage).',
  'Must have live grass and active irrigation system. Plant coverage must reach at least 50% of converted area at full maturity. Drip irrigation system with filter and pressure regulator required.',
  'Apply online through SNWA portal. Mandatory pre-conversion site visit required - SNWA must approve before grass removal. 12-month completion window. Post-conversion inspection required. Conservation easement must be signed.',
  'Pre-approval from SNWA required before any grass removal. Photo documentation of existing grass and irrigation. Site plan for new landscaping.',
  true, false, false, false,
  true, true,
  'Must have live grass and active irrigation system',
  'Removing lawn without SNWA approval makes conversion ineligible. Must maintain landscape in perpetuity or reimburse full rebate amount. Well owners limited to 2,500 sq ft per fiscal year.',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- SNWA Water Smart Landscapes Rebate (Commercial/HOA)
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply, documentation_required,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  restrictions,
  created_at, updated_at
) VALUES (
  'NV_SNWA_WSL_COMMERCIAL_2026',
  'SNWA Water Smart Landscapes Rebate (Commercial/HOA)',
  'rebate',
  'conservation',
  'turf-replacement',
  2, 3, 'Functional turf: $3/sq ft (first 10K), $1.50/sq ft after. Non-functional: $2/sq ft (first 10K), $1/sq ft after.',
  'https://www.snwa.com/rebates/wsl',
  'active',
  'Southern Nevada Water Authority',
  'Southern Nevada Water Authority service area (Las Vegas Valley)',
  'Rebates for businesses, HOAs, and multifamily properties. Functional turf: $3/sq ft for first 10,000 sq ft, then $1.50/sq ft. Non-functional turf: $2/sq ft for first 10,000 sq ft, then $1/sq ft.',
  'Must have live grass and active irrigation system. Plant coverage must reach at least 50% of converted area at full maturity.',
  'Apply online through SNWA portal. Pre-conversion site visit required.',
  'Pre-approval from SNWA required. Photo documentation. Site plan.',
  false, true, true, false,
  true, true,
  'Removing lawn without SNWA approval makes conversion ineligible.',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Las Vegas Valley Water District additional rebate (stacks with SNWA)
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  stacking_allowed, stacking_details,
  created_at, updated_at
) VALUES (
  'NV_LVVWD_WSL_ADDON_2026',
  'LVVWD Water Smart Landscapes Additional Rebate',
  'rebate',
  'conservation',
  'turf-replacement',
  2, 2, '$2/sq ft additional for LVVWD customers',
  'https://www.lvvwd.com/conservation/rebates/index.html',
  'active',
  'Las Vegas Valley Water District',
  'Las Vegas Valley Water District service area',
  'Additional $2 per square foot rebate for LVVWD residential customers, bringing total rebate to $7/sq ft (first 10,000 sq ft), then $4.50/sq ft thereafter when combined with SNWA base incentive.',
  'Must be a LVVWD residential customer. Stacks with SNWA Water Smart Landscapes rebate.',
  'Applied automatically through SNWA Water Smart Landscapes program for LVVWD customers.',
  true, false, false, false,
  true, 'Automatically stacks with SNWA Water Smart Landscapes base rebate of $5/sq ft',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- ============================================================================
-- CALIFORNIA - San Francisco PUC Programs
-- ============================================================================

-- SFPUC Graywater Laundry-to-Landscape Rebate (enhanced details)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_amount_max = 100,
  incentive_per_unit = 'Up to $25 for PVC pipe, $50 for diverter valve, $25 for air admittance valve',
  program_description = 'Rebate up to $100 total for laundry-to-landscape graywater system components: up to $25 for Schedule 40 PVC pipe, up to $50 for full port diverter/three-way valve, and up to $25 for air admittance valve.',
  eligibility_details = 'Must have active SFPUC water service account. Install at single-family or two-unit residential property in San Francisco. Must have flat yard or yard sloping down from washer location. Working clothes washer at or above landscape grade required.',
  how_to_apply = 'Review required training presentation and request Graywater Design Manual. Purchase eligible components and retain receipts. Install system and take photographs. Apply online at conservation.sfwater.org',
  documentation_required = 'Water account number, photos of installed system, receipt images for components',
  contact_email = 'waterconservation@sfwater.org',
  contact_phone = '415-551-4730',
  property_requirements = 'Single-family or two-unit residential property. Flat yard or yard sloping down from washer location.',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'CA_SFPUC_L2L_REBATE_2026';

-- SFPUC Rain Barrel Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply, documentation_required,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  product_requirements, restrictions,
  contact_email, contact_phone,
  created_at, updated_at
) VALUES (
  'CA_SFPUC_RAIN_BARREL_2026',
  'SFPUC Rain Barrel Rebate',
  'rebate',
  'rainwater',
  'rain-barrel',
  0, 200, 'Up to $100 per barrel, maximum 2 barrels',
  'https://www.sfpuc.gov/learning/how-you-can-help/rain-barrel-and-cistern-rebate',
  'active',
  'San Francisco Public Utilities Commission',
  'San Francisco',
  'Rebate up to $100 per rain barrel (maximum 2 barrels, $200 total). Rain barrels must hold minimum 50 gallons.',
  'Must have active SFPUC water service account at installation property. Must reside in San Francisco. Property owner approval required if renting. Cannot have received discounted rain barrel from SFPUC within last 5 years.',
  'Review SFPUC resource materials. Purchase barrel and retain receipts. Install and photograph from multiple angles. Register and apply online using water account number. Submit W-9 form.',
  'Photos from multiple angles, receipts, W-9 form, water account number',
  true, false, false, false,
  false, false,
  'Rain barrel must hold minimum 50 gallons, connect to downspout or rain chain, have mosquito-proof screen (mesh less than 1mm) or sealed lid, include overflow protection, and be permanent non-collapsible container.',
  'Cannot have received discounted rain barrel or cistern from SFPUC within last 5 years.',
  'waterconservation@sfwater.org',
  '415-551-4730',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- SFPUC Cistern Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply, documentation_required,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  pre_approval_required, inspection_required,
  product_requirements, restrictions,
  contact_email, contact_phone,
  created_at, updated_at
) VALUES (
  'CA_SFPUC_CISTERN_2026',
  'SFPUC Cistern Rebate',
  'rebate',
  'rainwater',
  'cistern',
  0, 350, 'Up to $350 for one cistern (205-5,000 gallon capacity)',
  'https://www.sfpuc.gov/learning/how-you-can-help/rain-barrel-and-cistern-rebate',
  'active',
  'San Francisco Public Utilities Commission',
  'San Francisco',
  'Rebate up to $350 for one cistern with capacity between 205 and 5,000 gallons.',
  'Must have active SFPUC water service account at installation property. Must reside in San Francisco. Property owner approval required if renting. Cannot have received discounted rain barrel or cistern from SFPUC within last 5 years.',
  'Review SFPUC resource materials. Purchase cistern and retain receipts. Install and photograph from multiple angles. Register and apply online using water account number. Submit W-9 form.',
  'Photos from multiple angles, receipts, W-9 form, water account number',
  true, false, false, false,
  false, false,
  'Cistern must have capacity between 205 and 5,000 gallons.',
  'Cannot have received discounted rain barrel or cistern from SFPUC within last 5 years. Maximum one cistern per rebate.',
  'waterconservation@sfwater.org',
  '415-551-4730',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- ============================================================================
-- CALIFORNIA - East Bay MUD Programs (enhanced details)
-- ============================================================================

-- EBMUD Lawn Conversion Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  restrictions,
  contact_email, contact_phone,
  created_at, updated_at
) VALUES (
  'CA_EBMUD_LAWN_CONVERSION_2026',
  'EBMUD Lawn Conversion Rebate',
  'rebate',
  'conservation',
  'turf-replacement',
  0, 2000, 'Up to $2.00/sq ft',
  'https://www.ebmud.com/water/conservation-and-rebates/rebates',
  'active',
  'East Bay Municipal Utility District',
  'EBMUD service area (Alameda and Contra Costa Counties)',
  'Rebate up to $2.00 per square foot for converting lawn to water-wise landscaping. Modernize your garden with drought-tolerant plants.',
  'Must be an EBMUD customer with potable water service.',
  'Apply through EBMUD rebate portal. Pre-approval may be required.',
  true, true, false, false,
  'Combined landscape rebates capped at $2,000 per 24-month period for residential properties.',
  'waterconservation@ebmud.com',
  '866-403-2683',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- EBMUD Treebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_email, contact_phone,
  created_at, updated_at
) VALUES (
  'CA_EBMUD_TREEBATE_2026',
  'EBMUD Treebate Pilot Rebate',
  'rebate',
  'conservation',
  'tree-planting',
  0, 100, 'Up to $100 per tree',
  'https://www.ebmud.com/water/conservation-and-rebates/rebates',
  'active',
  'East Bay Municipal Utility District',
  'EBMUD service area (Alameda and Contra Costa Counties)',
  'Rebate up to $100 per tree for tree installation as part of an approved lawn conversion project.',
  'Must be part of an approved EBMUD lawn conversion project.',
  'Apply as part of lawn conversion rebate application.',
  true, false, false, false,
  'waterconservation@ebmud.com',
  '866-403-2683',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- EBMUD Flowmeter Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_email, contact_phone,
  created_at, updated_at
) VALUES (
  'CA_EBMUD_FLOWMETER_2026',
  'EBMUD Flowmeter Rebate',
  'rebate',
  'conservation',
  'leak-detection',
  0, 200, 'Up to $200 per device',
  'https://www.ebmud.com/water/conservation-and-rebates/rebates',
  'active',
  'East Bay Municipal Utility District',
  'EBMUD service area (Alameda and Contra Costa Counties)',
  'Rebate up to $200 for flowmeter installation. Get real-time notifications of water waste and leaks.',
  'Must be an EBMUD customer.',
  'Apply through EBMUD rebate portal.',
  true, true, false, false,
  'waterconservation@ebmud.com',
  '866-403-2683',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- EBMUD Landscape Design Assistance
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_email, contact_phone,
  created_at, updated_at
) VALUES (
  'CA_EBMUD_LANDSCAPE_DESIGN_2026',
  'EBMUD Landscape Design Assistance',
  'rebate',
  'conservation',
  'design-assistance',
  200, 200, '$200 for 2 hours of professional design',
  'https://www.ebmud.com/water/conservation-and-rebates/rebates',
  'active',
  'East Bay Municipal Utility District',
  'EBMUD service area (Alameda and Contra Costa Counties)',
  'Receive $200 worth of professional landscape designer support (2 hours) to plan your water-wise garden transformation.',
  'Must be an EBMUD customer planning a lawn conversion.',
  'Apply through EBMUD rebate portal.',
  true, false, false, false,
  'waterconservation@ebmud.com',
  '866-403-2683',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Update existing EBMUD Graywater Rebate entries with more details
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_per_unit = 'Up to $100 for laundry water system components',
  program_description = 'Rebate up to $100 for laundry-to-landscape graywater system components used to irrigate landscapes.',
  eligibility_details = 'Must be an EBMUD customer with potable water service.',
  contact_email = 'waterconservation@ebmud.com',
  contact_phone = '866-403-2683',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id LIKE 'CA_EBMUD_GREYWATER%';

-- ============================================================================
-- COLORADO - Denver Water Programs
-- ============================================================================

-- Denver Water Toilet Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  product_requirements,
  contact_phone,
  created_at, updated_at
) VALUES (
  'CO_DENVER_WATER_TOILET_2026',
  'Denver Water High-Efficiency Toilet Rebate',
  'rebate',
  'conservation',
  'toilet',
  0, 100, 'Up to $100 per WaterSense toilet',
  'https://www.denverwater.org/residential/rebates-conservation',
  'active',
  'Denver Water',
  'Denver Water service area',
  'Rebate up to $100 for WaterSense-labeled high-efficiency toilets. Toilets account for about 12% of household water use.',
  'Must receive water bills from Denver Water or qualifying water providers.',
  'Apply through Denver Water rebate portal.',
  true, false, false, false,
  'Must be WaterSense-labeled toilet',
  '303-893-2444',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Denver Water Smart Controller Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_phone,
  created_at, updated_at
) VALUES (
  'CO_DENVER_WATER_SMART_CONTROLLER_2026',
  'Denver Water Smart Irrigation Controller Rebate',
  'rebate',
  'conservation',
  'irrigation',
  0, 100, 'per controller',
  'https://www.denverwater.org/residential/rebates-conservation',
  'active',
  'Denver Water',
  'Denver Water service area',
  'Rebate for WaterSense-labeled smart irrigation controllers. About half of household water goes to lawn irrigation.',
  'Must receive water bills from Denver Water or qualifying water providers.',
  'Apply through Denver Water rebate portal.',
  true, false, false, false,
  '303-893-2444',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- ============================================================================
-- CALIFORNIA - Santa Clara Valley Water District (enhanced)
-- ============================================================================

-- Update existing SCVWD Graywater Rebate with more details
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  program_description = 'Rebate for graywater systems. Single-fixture systems (laundry-to-landscape): $200. Multi-fixture systems: up to $400.',
  eligibility_details = 'Must be within Santa Clara Valley Water District service area (Santa Clara County).',
  how_to_apply = 'Apply through Valley Water rebate portal at valleywater.org.',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'CA_SANTA_CLARA_VALLEY_GREYWATER_REBATE_2026';

-- ============================================================================
-- ARIZONA - Tucson Water Programs
-- ============================================================================

-- Tucson Water Greywater Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_phone,
  created_at, updated_at
) VALUES (
  'AZ_TUCSON_WATER_GREYWATER_2026',
  'Tucson Water Gray Water System Rebate',
  'rebate',
  'greywater',
  'laundry-to-landscape',
  0, 200, 'per system',
  'https://www.tucsonaz.gov/water/rebates',
  'active',
  'Tucson Water',
  'Tucson Water service area',
  'Rebate for gray water system installation to help reduce water usage and lower utility bills.',
  'Must be a Tucson Water residential customer. Low-income customers may qualify for additional assistance.',
  'Contact Tucson Water or apply through their rebate program.',
  true, false, false, false,
  '520-791-3242',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Tucson Water Rainwater Harvesting Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_phone,
  created_at, updated_at
) VALUES (
  'AZ_TUCSON_WATER_RAINWATER_2026',
  'Tucson Water Rainwater Harvesting Rebate',
  'rebate',
  'rainwater',
  'cistern',
  0, 2000, 'based on storage capacity',
  'https://www.tucsonaz.gov/water/rebates',
  'active',
  'Tucson Water',
  'Tucson Water service area',
  'Rebate for rainwater harvesting system installation. Help reduce reliance on municipal water supply.',
  'Must be a Tucson Water residential customer. Low-income customers may qualify for additional assistance.',
  'Contact Tucson Water or apply through their rebate program.',
  true, false, false, false,
  '520-791-3242',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Tucson Water High-Efficiency Toilet Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_phone,
  created_at, updated_at
) VALUES (
  'AZ_TUCSON_WATER_TOILET_2026',
  'Tucson Water High-Efficiency Toilet Rebate',
  'rebate',
  'conservation',
  'toilet',
  0, 100, 'per toilet',
  'https://www.tucsonaz.gov/water/rebates',
  'active',
  'Tucson Water',
  'Tucson Water service area',
  'Rebate for high-efficiency toilet installation. Help save water effortlessly and lower utility bills.',
  'Must be a Tucson Water residential customer. Low-income customers may qualify for additional assistance.',
  'Contact Tucson Water or apply through their rebate program.',
  true, false, false, false,
  '520-791-3242',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- Tucson Water High-Efficiency Clothes Washer Rebate
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  contact_phone,
  created_at, updated_at
) VALUES (
  'AZ_TUCSON_WATER_WASHER_2026',
  'Tucson Water High-Efficiency Clothes Washer Rebate',
  'rebate',
  'conservation',
  'appliance',
  0, 200, 'per washer',
  'https://www.tucsonaz.gov/water/rebates',
  'active',
  'Tucson Water',
  'Tucson Water service area',
  'Rebate for high-efficiency clothes washer installation. Save water and energy with modern appliances.',
  'Must be a Tucson Water residential customer. Low-income customers may qualify for additional assistance.',
  'Contact Tucson Water or apply through their rebate program.',
  true, false, false, false,
  '520-791-3242',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- ============================================================================
-- CALIFORNIA - Metropolitan Water District / SoCal WaterSmart Programs
-- ============================================================================

-- Note: MWD programs are accessed through member agencies via SoCal WaterSmart
INSERT INTO `greywater-prospects-2025.greywater_compliance.programs_master` (
  program_id, program_name, program_type, resource_type, program_subtype,
  incentive_amount_min, incentive_amount_max, incentive_per_unit,
  application_url, program_status, water_utility, coverage_area,
  program_description, eligibility_details, how_to_apply,
  residential_eligible, commercial_eligible, municipal_eligible, agricultural_eligible,
  notes,
  created_at, updated_at
) VALUES (
  'CA_MWD_SOCAL_WATERSMART_2026',
  'SoCal WaterSmart Rebate Program',
  'rebate',
  'conservation',
  'various',
  0, 6000, 'varies by rebate type',
  'https://socalwatersmart.com',
  'active',
  'Metropolitan Water District of Southern California',
  'Metropolitan Water District member agency service areas (Southern California)',
  'Regional rebate program serving 26 member agencies in Southern California. Rebates for turf replacement, smart controllers, high-efficiency toilets, and more. Rebate amounts may vary by member agency.',
  'Must be a customer of a Metropolitan Water District member agency. Member cities include: Anaheim, Beverly Hills, Burbank, Compton, Fullerton, Glendale, Long Beach, Los Angeles, Pasadena, San Fernando, San Marino, Santa Ana, Santa Monica, Torrance. Member water agencies include: Calleguas MWD, Central Basin MWD, Eastern MWD, San Diego County Water Authority, and others.',
  'Apply through SoCal WaterSmart portal. Check with your local water provider to confirm eligibility and current rebate amounts.',
  true, true, false, false,
  'Rebate amounts fluctuate based on funding availability. Check SoCal WaterSmart website for current amounts.',
  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
);

-- ============================================================================
-- LINK PROGRAMS TO JURISDICTIONS
-- ============================================================================

-- Austin Water programs to Texas jurisdictions
INSERT INTO `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link` (program_id, jurisdiction_id, coverage_type)
VALUES
  ('TX_AUSTIN_WATER_L2L_2026', 'TX_CITY_AUSTIN', 'city'),
  ('TX_AUSTIN_WATER_RAINWATER_2026', 'TX_CITY_AUSTIN', 'city'),
  ('TX_AUSTIN_WATER_RAINSCAPE_2026', 'TX_CITY_AUSTIN', 'city'),
  ('TX_AUSTIN_WATER_TURF_2026', 'TX_CITY_AUSTIN', 'city'),
  ('TX_AUSTIN_WATER_IRRIGATION_2026', 'TX_CITY_AUSTIN', 'city');

-- Nevada programs to Las Vegas area jurisdictions
INSERT INTO `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link` (program_id, jurisdiction_id, coverage_type)
VALUES
  ('NV_SNWA_WSL_RESIDENTIAL_2026', 'NV_CITY_LAS_VEGAS', 'city'),
  ('NV_SNWA_WSL_RESIDENTIAL_2026', 'NV_CITY_HENDERSON', 'city'),
  ('NV_SNWA_WSL_RESIDENTIAL_2026', 'NV_CITY_NORTH_LAS_VEGAS', 'city'),
  ('NV_SNWA_WSL_COMMERCIAL_2026', 'NV_CITY_LAS_VEGAS', 'city'),
  ('NV_SNWA_WSL_COMMERCIAL_2026', 'NV_CITY_HENDERSON', 'city'),
  ('NV_SNWA_WSL_COMMERCIAL_2026', 'NV_CITY_NORTH_LAS_VEGAS', 'city'),
  ('NV_LVVWD_WSL_ADDON_2026', 'NV_CITY_LAS_VEGAS', 'city');

-- San Francisco programs
INSERT INTO `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link` (program_id, jurisdiction_id, coverage_type)
VALUES
  ('CA_SFPUC_RAIN_BARREL_2026', 'CA_CITY_SAN_FRANCISCO', 'city'),
  ('CA_SFPUC_CISTERN_2026', 'CA_CITY_SAN_FRANCISCO', 'city');

-- EBMUD programs to East Bay cities
INSERT INTO `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link` (program_id, jurisdiction_id, coverage_type)
VALUES
  ('CA_EBMUD_LAWN_CONVERSION_2026', 'CA_CITY_OAKLAND', 'city'),
  ('CA_EBMUD_LAWN_CONVERSION_2026', 'CA_CITY_BERKELEY', 'city'),
  ('CA_EBMUD_LAWN_CONVERSION_2026', 'CA_CITY_ALAMEDA', 'city'),
  ('CA_EBMUD_LAWN_CONVERSION_2026', 'CA_CITY_RICHMOND', 'city'),
  ('CA_EBMUD_TREEBATE_2026', 'CA_CITY_OAKLAND', 'city'),
  ('CA_EBMUD_TREEBATE_2026', 'CA_CITY_BERKELEY', 'city'),
  ('CA_EBMUD_FLOWMETER_2026', 'CA_CITY_OAKLAND', 'city'),
  ('CA_EBMUD_FLOWMETER_2026', 'CA_CITY_BERKELEY', 'city'),
  ('CA_EBMUD_LANDSCAPE_DESIGN_2026', 'CA_CITY_OAKLAND', 'city'),
  ('CA_EBMUD_LANDSCAPE_DESIGN_2026', 'CA_CITY_BERKELEY', 'city');

-- Denver Water programs
INSERT INTO `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link` (program_id, jurisdiction_id, coverage_type)
VALUES
  ('CO_DENVER_WATER_TOILET_2026', 'CO_CITY_DENVER', 'city'),
  ('CO_DENVER_WATER_SMART_CONTROLLER_2026', 'CO_CITY_DENVER', 'city');

-- Tucson Water programs
INSERT INTO `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link` (program_id, jurisdiction_id, coverage_type)
VALUES
  ('AZ_TUCSON_WATER_GREYWATER_2026', 'AZ_CITY_TUCSON', 'city'),
  ('AZ_TUCSON_WATER_RAINWATER_2026', 'AZ_CITY_TUCSON', 'city'),
  ('AZ_TUCSON_WATER_TOILET_2026', 'AZ_CITY_TUCSON', 'city'),
  ('AZ_TUCSON_WATER_WASHER_2026', 'AZ_CITY_TUCSON', 'city');

-- Metropolitan Water District / SoCal WaterSmart - link to major Southern California cities
INSERT INTO `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link` (program_id, jurisdiction_id, coverage_type)
VALUES
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_LOS_ANGELES', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_LONG_BEACH', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_ANAHEIM', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_SANTA_ANA', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_GLENDALE', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_BURBANK', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_PASADENA', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_TORRANCE', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_FULLERTON', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_SANTA_MONICA', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_BEVERLY_HILLS', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_COMPTON', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_SAN_DIEGO', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_CHULA_VISTA', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_RIVERSIDE', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_CORONA', 'city'),
  ('CA_MWD_SOCAL_WATERSMART_2026', 'CA_CITY_IRVINE', 'city');
