-- Populate city_permit_details for major cities
-- Based on research of local greywater regulations

-- ARIZONA CITIES (follows state's progressive tiered system)
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Tucson - Very greywater friendly, has rebate program
('AZ', 'Tucson', 'Pima', 'AZ_CITY_TUCSON', 'Tiered', false,
 400, true, true, true, false,
 'https://www.tucsonaz.gov/pdsd/greywater-permitting', 'Online or in-person',
 ['Site plan showing irrigation area', 'System diagram'], false, 0, 150,
 false, false, true, 1,
 'Planning and Development Services', '(520) 791-5550',
 'https://www.tucsonaz.gov/pdsd',
 ['Must follow Arizona Appendix K guidelines', 'Subsurface irrigation only'],
 ['Laundry-to-landscape under 400 GPD exempt from permit'],
 'Tucson is one of the most greywater-friendly cities in the US. Tucson Water offers rebates up to $1,000 for greywater systems.',
 'Start with a simple laundry-to-landscape system - no permit needed under 400 GPD. Check Tucson Water rebate program.'),

-- Phoenix - Follows state code
('AZ', 'Phoenix', 'Maricopa', 'AZ_CITY_PHOENIX', 'Tiered', false,
 400, true, true, true, false,
 'https://www.phoenix.gov/pdd/permits', 'Online or in-person',
 ['Site plan', 'System specifications'], false, 0, 200,
 false, false, true, 3,
 'Planning and Development Department', '(602) 262-7811',
 'https://www.phoenix.gov/pdd',
 ['Follow Arizona Appendix K', 'No spray irrigation'],
 ['Simple systems under 400 GPD exempt'],
 'Phoenix follows Arizona state greywater code. Simple laundry-to-landscape systems are permit-free.',
 'No permit needed for basic laundry-to-landscape under 400 GPD.'),

-- Scottsdale - Follows state code
('AZ', 'Scottsdale', 'Maricopa', 'AZ_CITY_SCOTTSDALE', 'Tiered', false,
 400, true, true, true, false,
 'https://www.scottsdaleaz.gov/permits', 'Online or in-person',
 ['Site plan', 'System diagram'], false, 0, 175,
 false, false, true, 3,
 'Building & Life Safety Division', '(480) 312-2500',
 'https://www.scottsdaleaz.gov/building-safety',
 ['Arizona Appendix K compliance'],
 ['Under 400 GPD exempt'],
 'Scottsdale follows state regulations. Check for water conservation rebate programs.',
 'Simple systems are permit-free. Scottsdale Water may offer conservation incentives.'),

-- Mesa - Follows state code
('AZ', 'Mesa', 'Maricopa', 'AZ_CITY_MESA', 'Tiered', false,
 400, true, true, true, false,
 'https://www.mesaaz.gov/residents/development-services', 'Online or in-person',
 ['Site plan'], false, 0, 150,
 false, false, true, 2,
 'Development Services', '(480) 644-2211',
 'https://www.mesaaz.gov/residents/development-services',
 ['State code compliance'],
 ['Under 400 GPD exempt'],
 'Mesa follows Arizona state code for greywater.',
 'No permit for simple laundry systems under 400 GPD.'),

-- Tempe - Follows state code, has conservation programs
('AZ', 'Tempe', 'Maricopa', 'AZ_CITY_TEMPE', 'Tiered', false,
 400, true, true, true, false,
 'https://www.tempe.gov/government/community-development/building-safety', 'Online or in-person',
 ['Site plan', 'System description'], false, 0, 150,
 false, false, true, 2,
 'Building Safety', '(480) 350-8361',
 'https://www.tempe.gov/government/community-development/building-safety',
 ['Arizona code compliance'],
 ['Under 400 GPD exempt'],
 'Tempe follows state code and offers various water conservation rebates.',
 'Check Tempe water conservation rebate programs. Simple systems need no permit.'),

-- Flagstaff - Follows state code
('AZ', 'Flagstaff', 'Coconino', 'AZ_CITY_FLAGSTAFF', 'Tiered', false,
 400, true, true, true, false,
 'https://www.flagstaff.az.gov/2685/Building-Permits', 'In-person',
 ['Site plan'], false, 0, 125,
 false, false, true, 3,
 'Building Division', '(928) 213-2610',
 'https://www.flagstaff.az.gov/2685/Building-Permits',
 ['Seasonal considerations due to freezing'],
 ['Under 400 GPD exempt'],
 'Flagstaff follows state code. Consider freeze protection for winter months.',
 'Drain systems before freezing weather. Simple laundry systems are permit-free.');

-- TEXAS CITIES
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Austin - Progressive, follows state code
('TX', 'Austin', 'Travis', 'TX_CITY_AUSTIN', 'Standard', false,
 400, true, true, true, false,
 'https://www.austintexas.gov/department/development-services', 'Online',
 ['Site plan', 'System layout'], false, 0, 200,
 false, false, true, 5,
 'Development Services', '(512) 978-4000',
 'https://www.austintexas.gov/department/development-services',
 ['Must overflow to sewer/septic', 'Subsurface irrigation'],
 ['Simple systems under 400 GPD'],
 'Austin follows Texas state code. Austin Water offers various conservation rebates.',
 'Check Austin Water rebate programs for rainwater and conservation.'),

-- San Antonio - Follows state code
('TX', 'San Antonio', 'Bexar', 'TX_CITY_SAN_ANTONIO', 'Standard', false,
 400, true, true, true, false,
 'https://www.sanantonio.gov/DSD', 'Online or in-person',
 ['Site plan'], false, 0, 175,
 false, false, true, 5,
 'Development Services', '(210) 207-1111',
 'https://www.sanantonio.gov/DSD',
 ['SAWS service area requirements'],
 ['Under 400 GPD exempt'],
 'San Antonio follows Texas code. SAWS offers conservation programs.',
 'Contact SAWS for water conservation incentives.'),

-- Houston - Follows state code
('TX', 'Houston', 'Harris', 'TX_CITY_HOUSTON', 'Standard', false,
 400, true, true, true, false,
 'https://www.houstonpermittingcenter.org/', 'Online',
 ['Site plan', 'System description'], false, 0, 200,
 false, false, true, 5,
 'Houston Permitting Center', '(832) 394-8811',
 'https://www.houstonpermittingcenter.org/',
 ['Must overflow to sewer'],
 ['Simple systems under 400 GPD'],
 'Houston follows Texas state greywater code.',
 'Simple laundry-to-landscape systems need no permit under 400 GPD.'),

-- Dallas - Follows state code
('TX', 'Dallas', 'Dallas', 'TX_CITY_DALLAS', 'Standard', false,
 400, true, true, true, false,
 'https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/default.aspx', 'Online or in-person',
 ['Site plan'], false, 0, 175,
 false, false, true, 5,
 'Building Inspection', '(214) 948-4480',
 'https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/default.aspx',
 ['State code compliance'],
 ['Under 400 GPD exempt'],
 'Dallas follows Texas state code for greywater systems.',
 'No permit required for simple systems under 400 GPD.');

-- NEW MEXICO CITIES
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Albuquerque - Very progressive
('NM', 'Albuquerque', 'Bernalillo', 'NM_CITY_ALBUQUERQUE', 'Tiered', false,
 250, true, true, true, false,
 'https://www.cabq.gov/planning/building-safety-permits', 'Online or in-person',
 ['Site plan for larger systems'], false, 0, 150,
 false, false, true, 3,
 'Planning Building Safety', '(505) 924-3600',
 'https://www.cabq.gov/planning/building-safety-permits',
 ['State guidelines compliance', 'Subsurface only'],
 ['Simple laundry systems under 250 GPD exempt'],
 'Albuquerque follows New Mexico progressive greywater regulations. ABCWUA offers rebates.',
 'No permit needed for simple laundry-to-landscape under 250 GPD. Check ABCWUA rebate programs.'),

-- Santa Fe - Very progressive
('NM', 'Santa Fe', 'Santa Fe', 'NM_CITY_SANTA_FE', 'Tiered', false,
 250, true, true, true, false,
 'https://www.santafenm.gov/building_permits', 'In-person',
 ['Site plan for permitted systems'], false, 0, 125,
 false, false, true, 3,
 'Land Use Department', '(505) 955-6605',
 'https://www.santafenm.gov/building_permits',
 ['Water conservation focus', 'Subsurface irrigation'],
 ['Under 250 GPD exempt'],
 'Santa Fe is a leader in water conservation. Simple greywater systems are encouraged.',
 'Water is precious in Santa Fe. Simple laundry systems need no permit.');

-- COLORADO CITIES
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Denver - Follows state code
('CO', 'Denver', 'Denver', 'CO_CITY_DENVER', 'Standard', false,
 400, true, true, false, false,
 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Community-Planning-and-Development/Building-Permits', 'Online',
 ['Site plan', 'System layout'], false, 0, 200,
 false, false, true, 5,
 'Community Planning and Development', '(720) 865-2705',
 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Community-Planning-and-Development',
 ['State compliance', 'Subsurface only'],
 ['Simple systems under 400 GPD'],
 'Denver follows Colorado state greywater regulations.',
 'Simple laundry systems under 400 GPD typically do not need permits.'),

-- Boulder - Progressive
('CO', 'Boulder', 'Boulder', 'CO_CITY_BOULDER', 'Standard', false,
 400, true, true, false, false,
 'https://bouldercolorado.gov/plan-and-build', 'Online or in-person',
 ['Site plan'], false, 0, 175,
 false, false, true, 5,
 'Planning and Development Services', '(303) 441-1880',
 'https://bouldercolorado.gov/plan-and-build',
 ['Environmental considerations'],
 ['Under 400 GPD exempt'],
 'Boulder is environmentally progressive. Simple greywater systems are supported.',
 'Boulder encourages water conservation. Simple systems need no permit.');

-- OREGON CITIES
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Portland - Progressive
('OR', 'Portland', 'Multnomah', 'OR_CITY_PORTLAND', 'Standard', false,
 NULL, true, true, true, false,
 'https://www.portland.gov/bds/permits', 'Online',
 ['Site plan', 'System description'], false, 0, 200,
 false, false, true, 5,
 'Bureau of Development Services', '(503) 823-7300',
 'https://www.portland.gov/bds',
 ['Oregon plumbing code compliance'],
 ['Simple laundry-to-landscape systems'],
 'Portland follows Oregon Reach Code. Simple laundry systems often exempt.',
 'Check Portland Bureau of Environmental Services for water conservation resources.'),

-- Eugene - Follows state code
('OR', 'Eugene', 'Lane', 'OR_CITY_EUGENE', 'Standard', false,
 NULL, true, true, true, false,
 'https://www.eugene-or.gov/708/Permits', 'Online or in-person',
 ['Site plan'], false, 0, 150,
 false, false, true, 5,
 'Building and Permit Services', '(541) 682-5086',
 'https://www.eugene-or.gov/708/Permits',
 ['State code compliance'],
 ['Simple systems exempt'],
 'Eugene follows Oregon state greywater guidelines.',
 'Simple laundry-to-landscape systems are generally permit-free.');

-- WASHINGTON CITIES
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Seattle - Follows state guidelines
('WA', 'Seattle', 'King', 'WA_CITY_SEATTLE', 'Standard', true,
 NULL, true, true, true, false,
 'https://www.seattle.gov/sdci/permits', 'Online',
 ['Site plan', 'System specifications', 'Soil assessment'], false, 100, 300,
 false, false, true, 10,
 'Seattle Department of Construction & Inspections', '(206) 684-8600',
 'https://www.seattle.gov/sdci',
 ['Seattle/King County health approval', 'Washington DOH guidelines'],
 ['Some simple systems with local health approval'],
 'Seattle follows Washington state guidelines. Contact Seattle Public Utilities for conservation programs.',
 'Check Seattle Public Utilities for rebate and conservation programs.');

-- NEVADA CITIES
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Las Vegas - Follows state code
('NV', 'Las Vegas', 'Clark', 'NV_CITY_LAS_VEGAS', 'Standard', false,
 NULL, true, true, true, false,
 'https://www.lasvegasnevada.gov/Government/Departments/Building-and-Safety', 'Online or in-person',
 ['Site plan'], false, 0, 200,
 false, false, true, 5,
 'Building and Safety', '(702) 229-6251',
 'https://www.lasvegasnevada.gov/Government/Departments/Building-and-Safety',
 ['State guidelines', 'Desert landscaping focus'],
 ['Simple laundry systems'],
 'Las Vegas follows Nevada state code. Water conservation is critical in the desert.',
 'Water is precious. Check Southern Nevada Water Authority for conservation rebates.'),

-- Henderson - Follows state code
('NV', 'Henderson', 'Clark', 'NV_CITY_HENDERSON', 'Standard', false,
 NULL, true, true, true, false,
 'https://www.cityofhenderson.com/government/departments/community-development/building', 'Online or in-person',
 ['Site plan'], false, 0, 175,
 false, false, true, 5,
 'Community Development', '(702) 267-1500',
 'https://www.cityofhenderson.com/government/departments/community-development',
 ['State compliance'],
 ['Simple systems'],
 'Henderson follows Nevada state greywater guidelines.',
 'Check SNWA for water conservation incentives.'),

-- Reno - Follows state code
('NV', 'Reno', 'Washoe', 'NV_CITY_RENO', 'Standard', false,
 NULL, true, true, true, false,
 'https://www.reno.gov/government/departments/community-development-department/building-division', 'Online or in-person',
 ['Site plan'], false, 0, 150,
 false, false, true, 5,
 'Building Division', '(775) 334-2090',
 'https://www.reno.gov/government/departments/community-development-department',
 ['State code compliance'],
 ['Simple systems'],
 'Reno follows Nevada state greywater regulations.',
 'Check Truckee Meadows Water Authority for conservation programs.');

-- UTAH CITIES
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents)
VALUES
-- Salt Lake City - Follows state code
('UT', 'Salt Lake City', 'Salt Lake', 'UT_CITY_SALT_LAKE_CITY', 'Tiered', false,
 400, true, true, true, false,
 'https://www.slc.gov/buildingservices/', 'Online or in-person',
 ['Site plan for permitted systems'], false, 0, 150,
 false, false, true, 5,
 'Building Services', '(801) 535-7752',
 'https://www.slc.gov/buildingservices/',
 ['Utah DEQ notification for larger systems', 'Subsurface irrigation'],
 ['Simple laundry systems under 400 GPD'],
 'Salt Lake City follows Utah state code. Simple systems are permit-free.',
 'No permit for basic laundry-to-landscape under 400 GPD.');
