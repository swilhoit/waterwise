-- =====================================================
-- DATA VERIFICATION FIXES - January 30, 2026
-- Run this in BigQuery Console
-- =====================================================

-- 1. DELETE FAKE/NON-EXISTENT PROGRAMS
-- =====================================================

-- WA: Saving Water Partnership Clothes Washer Rebate - DOES NOT EXIST
DELETE FROM `greywater-prospects-2025.greywater_compliance.programs_master`
WHERE program_id = 'WA_REGIONAL_WASHER_2025';

DELETE FROM `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link`
WHERE program_id = 'WA_REGIONAL_WASHER_2025';

-- CA: San Diego Graywater Rebate - DOES NOT EXIST
DELETE FROM `greywater-prospects-2025.greywater_compliance.programs_master`
WHERE program_id = 'CA_SAN_DIEGO_GREYWATER_REBATE_2026';

DELETE FROM `greywater-prospects-2025.greywater_compliance.program_jurisdiction_link`
WHERE program_id = 'CA_SAN_DIEGO_GREYWATER_REBATE_2026';


-- 2. MARK EXPIRED PROGRAMS
-- =====================================================

-- CO: Denver Smart Irrigation Controller - ENDED Dec 31, 2025
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  program_status = 'expired',
  program_description = CONCAT(program_description, ' [Program ended December 31, 2025]'),
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'CO_DENVER_CONTROLLER_2025';


-- 3. FIX PROGRAM AMOUNTS AND DETAILS
-- =====================================================

-- NV: SNWA Water Smart Landscapes - Fix rate description
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_per_unit = 'Residential: $5/sq ft (first 10,000 sq ft), $2.50/sq ft thereafter. Commercial functional turf: $3/sq ft (first 10,000), $1.50 thereafter.',
  program_description = 'Convert grass to water-efficient, drip-irrigated landscaping. Residential: $5/sq ft for first 10,000 sq ft, $2.50/sq ft after. Commercial/HOA rates vary. Minimum 400 sq ft conversion.',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'NV_SNWA_WSL_2025';

-- NV: Tree Enhancement Program - Remove fake 10-tree limit
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_per_unit = '$100 per tree (up to 100% canopy coverage)',
  program_description = 'Bonus $100 for every new tree installed as part of Water Smart Landscapes rebate. Trees must achieve up to 100% canopy coverage and be from qualifying list (236+ sq ft canopy at maturity).',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'NV_SNWA_TREE_2025';

-- UT: Landscape Incentive - Fix amounts ($2-3/sqft, $50k max not $1-3, $30k)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_amount_min = 2,
  incentive_amount_max = 50000,
  incentive_per_unit = '$2-$3 per sq ft depending on district (state program $2/sq ft)',
  program_description = 'Replace lawn with water-efficient landscaping. State program (Division of Water Resources): $2/sq ft up to $50,000. Local district rates vary up to $3/sq ft with maximums from $15,000 to $100,000 depending on location.',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'UT_STATE_LANDSCAPE_2025';

-- OR: Portland Clean River Rewards - MAJOR FIX: 100% -> 35% (changed July 2024)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_per_unit = 'Up to 35% discount on stormwater charges',
  program_description = 'Discount on stormwater charges if rain from roof/driveway soaks into ground on your property. As of July 1, 2024, maximum discount is 35% (previously 100%).',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'OR_PORTLAND_CRR_2025';

-- OR: Portland Outdoor Rebates - Fix range ($3-$500 not $25-$100)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_amount_min = 3,
  incentive_amount_max = 500,
  incentive_per_unit = 'Irrigation controllers: $100 residential, $500 commercial. Rotary nozzles: $3 each (max 32 residential, 96 commercial)',
  program_description = 'Rebates for WaterSense-labeled irrigation controllers (up to $100 residential, $500 commercial/multifamily) and multistream rotator sprinkler nozzles ($3/each).',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'OR_PORTLAND_OUTDOOR_2025';

-- WA: Toilet Rebate - DOUBLE the amount ($50 -> $100)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_amount_min = 100,
  incentive_amount_max = 200,
  incentive_per_unit = '$100 per toilet (max 2 per household)',
  program_description = 'Rebate for MaP PREMIUM rated high-efficiency toilets. Up to $100 per toilet, maximum 2 toilets per household. Toilets being replaced must be manufactured before 2011.',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'WA_REGIONAL_TOILET_2025';

-- WA: Smart Controller Rebate - Fix name and amount ($125 -> $100)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  program_name = 'Saving Water Partnership Sprinkler Timer Rebate',
  incentive_amount_min = 10,
  incentive_amount_max = 100,
  incentive_per_unit = '$10 per zone (max 10 zones = $100)',
  program_description = 'Rebate for WaterSense-certified smart irrigation controllers/sprinkler timers. $10 per functioning zone, maximum $100. Available April 1 - October 31 only.',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'WA_REGIONAL_CONTROLLER_2025';

-- WA: RainWise - Fix calculation method
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_per_unit = '$7.90 per sq ft of rooftop runoff controlled',
  program_description = 'Rebates covering most or all of project costs for installation of rain gardens and/or cisterns that capture rooftop rainwater. Calculated at $7.90 per square foot of rooftop runoff controlled.',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'WA_SEATTLE_RAINWISE_2025';

-- WA: Stormwater Credit - Fix URL and description
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_per_unit = 'Up to 50% credit on annual drainage fee',
  program_description = 'Credit for property owners with stormwater systems that provide flow control and/or water quality treatment. Up to 50% reduction on annual drainage fee.',
  application_url = 'https://www.seattle.gov/utilities/your-services/discounts-and-incentives/stormwater-facility-credit',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'WA_SEATTLE_STORMWATER_CREDIT_2025';

-- CA: Santa Barbara - Major fix ($5,000 -> $100 for graywater)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_amount_max = 100,
  incentive_per_unit = '50% of graywater materials cost, max $100',
  program_description = 'Santa Barbara graywater system rebate covers 50% of materials cost up to $100. Broader irrigation efficiency programs may have higher limits for non-graywater improvements.',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'CA_SANTA_BARBARA_IRRIGATION_REBATE_2026';

-- CO: Aurora Water - Fix broken URL
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  application_url = 'https://waterrebates.aurorawater.org/',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id = 'CO_AURORA_TOILET_2025';

-- AZ: Tucson Greywater - Fix amount ($200 -> $1,000)
UPDATE `greywater-prospects-2025.greywater_compliance.programs_master`
SET
  incentive_amount_max = 1000,
  program_description = 'Tucson Water Greywater Harvesting Rebate reimburses up to $1,000 for residential greywater systems.',
  verified_date = '2026-01-30',
  updated_at = CURRENT_TIMESTAMP()
WHERE program_id LIKE '%TUCSON%GREY%'
   OR program_id LIKE '%TUCSON%GRAY%'
   OR (program_name LIKE '%Tucson%' AND (program_name LIKE '%Gray%Water%' OR program_name LIKE '%Grey%Water%'));


-- 4. FIX STATE LEGAL STATUS - OHIO (MAJOR ERROR - Listed as Prohibited but is LEGAL)
-- =====================================================

UPDATE `greywater-prospects-2025.greywater_compliance.greywater_laws`
SET
  legal_status = 'Legal',
  permit_required = 'Yes',
  permit_explanation = 'Ohio allows greywater systems with a permit from your local health department. Four system types are available: Type 1 (under 60 GPD for subsurface irrigation), Type 2 (60-1,000 GPD), Type 3 (hand-carried greywater), and Type 4 (treated/disinfected for indoor use and year-round outdoor irrigation). Greywater systems are permitted even where municipal sewer is available.',
  permit_process = 'Contact your local health department to apply for a greywater system permit. Submit system design plans showing compliance with OAC 3701-29-17. Type 1 systems (under 60 GPD) have simpler requirements. Inspection required before system operation.',
  indoor_use_allowed = TRUE,
  outdoor_use_allowed = TRUE,
  governing_code = 'Ohio Administrative Code 3701-29-17',
  governing_code_url = 'https://codes.ohio.gov/ohio-administrative-code/rule-3701-29-17',
  regulatory_classification = 'Comprehensive Regulated',
  summary = 'Ohio has comprehensive greywater regulations under OAC 3701-29-17, effective since January 2015. The state offers four system types covering residential through commercial applications. Type 1 systems handle under 60 GPD for subsurface lawn and garden irrigation. Type 2 systems handle 60-1,000 GPD. Type 3 allows hand-carried greywater (common in Amish communities). Type 4 permits treated/disinfected greywater for indoor use (toilet flushing, houseplants) and year-round outdoor irrigation. Importantly, greywater systems are allowed even where sanitary sewer is available. Permits are obtained through local health departments.',
  recent_changes = 'Ohio WateReuse section established March 2024 to advance water recycling programs',
  updated_at = CURRENT_TIMESTAMP()
WHERE state_code = 'OH' AND resource_type = 'greywater';


-- 5. FIX STATE LEGAL STATUS - MASSACHUSETTS
-- =====================================================

UPDATE `greywater-prospects-2025.greywater_compliance.greywater_laws`
SET
  legal_status = 'Legal',
  permit_required = 'Yes',
  permit_explanation = 'Massachusetts allows greywater systems through special permission from the Board of State Examiners of Plumbers and Gas Fitters. Permitted uses include external irrigation, internal irrigation (houseplants), toilet/urinal flushing (with blue dye), composting, and liquid cooling systems. Systems require backflow protection, purple piping, and professional design (PE certification for residential, required for commercial).',
  permit_process = 'Apply for special permission through the Board of State Examiners of Plumbers and Gas Fitters. Submit system design prepared by a licensed professional engineer. Purple piping required for all greywater lines. Blue dye required for toilet/urinal flushing applications.',
  indoor_use_allowed = TRUE,
  outdoor_use_allowed = TRUE,
  governing_code = 'Massachusetts Board of Plumbers Policy Statement; 310 CMR 15.262 (Title 5)',
  governing_code_url = 'https://www.mass.gov/policy-statement/installation-of-water-recycling-systems',
  regulatory_classification = 'Permitted with Special Approval',
  summary = 'Massachusetts allows greywater systems through a special permission process from the Board of State Examiners of Plumbers and Gas Fitters. Permitted uses include external irrigation, internal irrigation (houseplants), toilet and urinal flushing (with blue dye), composting, and liquid cooling systems. Acceptable greywater sources include clothes washer, shower, bathtub, bathroom sink, condensation, and natural precipitation. All systems require backflow protection and purple piping. Professional design certification is required. Under Title 5 (310 CMR 15.262), absorption area may be reduced by up to 50% when using composting toilets with greywater-only discharge. New legislation (H.922) was filed in January 2025 proposing tiered residential greywater permits.',
  recent_changes = 'H.922 filed January 2025 proposing tiered residential greywater system permits',
  updated_at = CURRENT_TIMESTAMP()
WHERE state_code = 'MA' AND resource_type = 'greywater';


-- 6. FIX STATE LEGAL STATUS - INDIANA (Indoor reuse IS allowed)
-- =====================================================

UPDATE `greywater-prospects-2025.greywater_compliance.greywater_laws`
SET
  indoor_use_allowed = TRUE,
  outdoor_use_allowed = FALSE,
  permit_explanation = 'Indiana adopted Appendix C of the International Plumbing Code (2006 edition with 2012 amendments) which permits greywater recycling for toilet and urinal flushing with proper treatment and permits. However, Section C103 (Subsurface Landscape Irrigation) was deleted from Indiana adoption - outdoor greywater irrigation is NOT permitted. All greywater for landscape purposes must go through the septic system.',
  permit_process = 'For indoor toilet/urinal flushing systems: Apply for permit through local building department with system design showing compliance with IPC Appendix C. Treatment and disinfection required. Outdoor irrigation with greywater is not permitted in Indiana.',
  summary = 'Indiana has partial greywater allowances under its adoption of IPC Appendix C. Indoor greywater reuse for toilet and urinal flushing IS permitted with proper treatment, permits, and inspections. However, Indiana specifically deleted Section C103 from its code adoption, meaning subsurface landscape irrigation with greywater is NOT allowed. All greywater destined for outdoor use must be disposed through the septic system. This makes Indiana unusual - it permits indoor reuse but prohibits the outdoor irrigation that many other states allow.',
  recent_changes = 'Indiana code based on 2006 IPC with 2012 amendments; Section C103 (landscape irrigation) deliberately excluded',
  updated_at = CURRENT_TIMESTAMP()
WHERE state_code = 'IN' AND resource_type = 'greywater';


-- 7. FIX ARIZONA - Remove expired tax credit references from BigQuery
-- =====================================================

UPDATE `greywater-prospects-2025.greywater_compliance.greywater_laws`
SET
  recent_changes = 'Note: The 25% state tax credit (ARS 43-1090.01) expired around 2017 and is no longer available',
  summary = REPLACE(summary, 'The state incentivizes adoption with a 25% tax credit up to $1,000 and allows', 'The state allows'),
  updated_at = CURRENT_TIMESTAMP()
WHERE state_code = 'AZ' AND resource_type = 'greywater';


-- 8. VERIFICATION COMPLETE
-- =====================================================
-- Run this query to verify changes:

SELECT
  program_id,
  program_name,
  program_status,
  incentive_amount_max,
  verified_date
FROM `greywater-prospects-2025.greywater_compliance.programs_master`
WHERE verified_date = '2026-01-30'
ORDER BY program_id;
