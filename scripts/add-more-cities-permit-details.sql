-- Add more cities to city_permit_details table
-- Focus on Florida, Georgia, North Carolina, Hawaii, and additional water-conscious cities
-- Created: 2026-01-12

-- FLORIDA CITIES
-- Florida has traditionally been restrictive on greywater, but has made progress in recent years
-- Florida follows 62-610 F.A.C. for domestic wastewater reuse
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Miami - Miami-Dade County regulations
('FL', 'Miami', 'Miami-Dade', 'FL_CITY_MIAMI', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.miamidade.gov/permits/', 'Online or in-person',
 ['Site plan', 'System specifications', 'Licensed contractor information'], true, 150, 500,
 true, false, false, 14,
 'Miami-Dade Regulatory and Economic Resources', '(786) 315-2000',
 'https://www.miamidade.gov/permits/',
 ['Must treat to secondary standards for reuse', 'Subsurface irrigation only', 'Health department approval required', 'No kitchen greywater'],
 [],
 'Florida requires greywater treatment to secondary standards under Chapter 62-610 F.A.C. Miami-Dade requires licensed plumber installation.',
 'Florida regulations are stricter than western states. Consider rainwater harvesting as an easier alternative. Licensed plumber required.',
 'Florida DEP Chapter 62-610 F.A.C.', '2025-06-01', 'verified'),

-- Tampa - Hillsborough County
('FL', 'Tampa', 'Hillsborough', 'FL_CITY_TAMPA', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.hillsboroughcounty.org/services/permits', 'Online or in-person',
 ['Engineering drawings', 'System specifications', 'Health department pre-approval'], true, 150, 450,
 true, false, false, 14,
 'Hillsborough County Building Services', '(813) 272-5600',
 'https://www.hillsboroughcounty.org/services/permits',
 ['Florida DEP approval process', 'Treatment required', 'Subsurface only'],
 [],
 'Tampa follows Florida state regulations requiring treatment. Tampa Bay Water promotes conservation.',
 'Florida requires treatment systems. Contact Tampa Bay Water for conservation rebates on other water-saving measures.',
 'Florida DEP Chapter 62-610', '2025-06-01', 'verified'),

-- Orlando - Orange County
('FL', 'Orlando', 'Orange', 'FL_CITY_ORLANDO', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.orangecountyfl.net/BuildingPermitting/', 'Online or in-person',
 ['Site plan', 'System design', 'Treatment specifications'], true, 150, 400,
 true, false, false, 14,
 'Orange County Building Safety Division', '(407) 836-5550',
 'https://www.orangecountyfl.net/BuildingPermitting/',
 ['State treatment standards', 'No surface application', 'Health review required'],
 [],
 'Orlando follows Florida regulations requiring treatment to secondary standards.',
 'Florida has strict requirements. OUC offers water conservation programs that may be easier to implement.',
 'Florida DEP regulations', '2025-06-01', 'verified'),

-- Jacksonville - Duval County
('FL', 'Jacksonville', 'Duval', 'FL_CITY_JACKSONVILLE', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.coj.net/departments/planning-and-development/building-inspection', 'Online or in-person',
 ['Engineering plans', 'System specifications', 'Licensed contractor'], true, 150, 450,
 true, false, false, 14,
 'City of Jacksonville Building Inspection Division', '(904) 255-8300',
 'https://www.coj.net/departments/planning-and-development/building-inspection',
 ['Florida DEP compliance', 'Treatment system required', 'Subsurface irrigation'],
 [],
 'Jacksonville follows Florida state greywater regulations. JEA promotes water conservation.',
 'Check JEA for water conservation programs. Florida greywater regulations require treatment systems.',
 'Florida DEP Chapter 62-610', '2025-06-01', 'verified'),

-- Fort Lauderdale - Broward County
('FL', 'Fort Lauderdale', 'Broward', 'FL_CITY_FORT_LAUDERDALE', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.fortlauderdale.gov/departments/development-services/building-services', 'Online or in-person',
 ['Site plan', 'Treatment system specifications', 'Health approval'], true, 150, 500,
 true, false, false, 14,
 'City of Fort Lauderdale Building Services', '(954) 828-6520',
 'https://www.fortlauderdale.gov/departments/development-services/building-services',
 ['Florida treatment standards', 'Broward County Health approval', 'No surface ponding'],
 [],
 'Fort Lauderdale follows Florida state regulations. Treatment required for greywater reuse.',
 'Florida requires treatment systems. Consider rainwater harvesting which has fewer restrictions.',
 'Florida DEP Chapter 62-610', '2025-06-01', 'verified');

-- GEORGIA CITIES
-- Georgia follows International Plumbing Code with state amendments
-- Georgia DPH regulates onsite sewage management
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Atlanta - Fulton County
('GA', 'Atlanta', 'Fulton', 'GA_CITY_ATLANTA', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.atlantaga.gov/government/departments/city-planning/office-of-buildings', 'Online or in-person',
 ['Site plan', 'System design', 'Plumber license'], true, 100, 350,
 true, false, false, 10,
 'City of Atlanta Office of Buildings', '(404) 330-6170',
 'https://www.atlantaga.gov/government/departments/city-planning/office-of-buildings',
 ['Georgia DPH guidelines', 'Licensed plumber installation', 'Subsurface irrigation only', 'No kitchen sink greywater'],
 [],
 'Atlanta follows Georgia regulations based on IPC. Permit required for all greywater systems.',
 'Atlanta requires permits and licensed plumber. Consider starting with rainwater harvesting.',
 'Georgia DPH regulations', '2025-06-01', 'moderate'),

-- Savannah - Chatham County
('GA', 'Savannah', 'Chatham', 'GA_CITY_SAVANNAH', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.savannahga.gov/1247/Building-Permits', 'In-person or online',
 ['Site plan', 'System specifications', 'Licensed plumber'], true, 100, 300,
 true, false, false, 10,
 'City of Savannah Development Services', '(912) 651-6520',
 'https://www.savannahga.gov/1247/Building-Permits',
 ['State plumbing code compliance', 'Health department coordination'],
 [],
 'Savannah follows Georgia state plumbing regulations.',
 'Contact Development Services for current greywater permit requirements.',
 'Georgia plumbing regulations', '2025-06-01', 'moderate'),

-- Augusta - Richmond County
('GA', 'Augusta', 'Richmond', 'GA_CITY_AUGUSTA', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.augustaga.gov/1033/Permit-Center', 'In-person',
 ['Site plan', 'System layout', 'Contractor information'], true, 100, 300,
 true, false, false, 10,
 'Augusta Planning and Development', '(706) 821-1796',
 'https://www.augustaga.gov/1033/Permit-Center',
 ['Georgia state code', 'Subsurface irrigation'],
 [],
 'Augusta follows Georgia state plumbing regulations for greywater systems.',
 'Permit and licensed plumber required. Contact Planning and Development for details.',
 'Georgia plumbing code', '2025-06-01', 'moderate');

-- NORTH CAROLINA CITIES
-- North Carolina updated greywater regulations in 2019 (15A NCAC 18A .1900)
-- Allows residential greywater systems with permits
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Charlotte - Mecklenburg County
('NC', 'Charlotte', 'Mecklenburg', 'NC_CITY_CHARLOTTE', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.mecknc.gov/luesa/codeenforcement/Pages/default.aspx', 'Online or in-person',
 ['Site plan', 'System design per 15A NCAC 18A', 'Plumber certification'], false, 100, 400,
 true, false, false, 10,
 'Mecklenburg County Code Enforcement', '(980) 314-2633',
 'https://www.mecknc.gov/luesa/codeenforcement/',
 ['15A NCAC 18A .1900 compliance', 'Subsurface irrigation only', 'No kitchen greywater', 'Overflow to sewer/septic'],
 [],
 'Charlotte follows NC greywater rules (15A NCAC 18A .1900) adopted in 2019. Systems must be designed by licensed professional.',
 'NC allows residential greywater with permit. Licensed plumber required. Contact Charlotte Water for conservation programs.',
 '15A NCAC 18A .1900', '2025-06-01', 'verified'),

-- Raleigh - Wake County
('NC', 'Raleigh', 'Wake', 'NC_CITY_RALEIGH', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://raleighnc.gov/permits-and-inspections', 'Online or in-person',
 ['Site plan', 'System specifications', 'Licensed contractor'], false, 100, 350,
 true, false, false, 10,
 'City of Raleigh Inspections', '(919) 996-2200',
 'https://raleighnc.gov/permits-and-inspections',
 ['State greywater regulations', 'Subsurface drip irrigation preferred', 'No spray irrigation'],
 [],
 'Raleigh follows NC state greywater rules. Systems require design by licensed professional.',
 'NC updated greywater rules in 2019. Contact Raleigh Water for conservation incentives.',
 '15A NCAC 18A .1900', '2025-06-01', 'verified'),

-- Durham - Durham County
('NC', 'Durham', 'Durham', 'NC_CITY_DURHAM', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://durhamnc.gov/446/Inspections', 'Online or in-person',
 ['Site plan', 'System design', 'Plumber license'], false, 100, 350,
 true, false, false, 10,
 'City of Durham Inspections Department', '(919) 560-4137',
 'https://durhamnc.gov/446/Inspections',
 ['NC greywater code compliance', 'Subsurface irrigation'],
 [],
 'Durham follows NC state greywater regulations updated in 2019.',
 'Licensed plumber required. Check Durham Water for conservation rebates.',
 '15A NCAC 18A .1900', '2025-06-01', 'verified'),

-- Asheville - Buncombe County
('NC', 'Asheville', 'Buncombe', 'NC_CITY_ASHEVILLE', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.ashevillenc.gov/department/development-services/', 'In-person or online',
 ['Site plan', 'System specifications', 'Licensed contractor'], false, 100, 350,
 true, false, false, 10,
 'City of Asheville Development Services', '(828) 259-5846',
 'https://www.ashevillenc.gov/department/development-services/',
 ['Mountain region considerations', 'NC state compliance', 'Soil suitability'],
 [],
 'Asheville follows NC greywater regulations. Mountain climate may affect system design.',
 'Consider seasonal operation in mountain climate. Licensed plumber required.',
 '15A NCAC 18A .1900', '2025-06-01', 'verified');

-- HAWAII CITIES
-- Hawaii has county-based regulations
-- Honolulu follows Hawaii Administrative Rules Title 11 Chapter 62
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Honolulu - City and County of Honolulu (Oahu)
('HI', 'Honolulu', 'Honolulu', 'HI_CITY_HONOLULU', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.honolulu.gov/dpp/permits.html', 'Online or in-person',
 ['Site plan', 'System design', 'DOH wastewater approval', 'Licensed plumber'], true, 150, 500,
 true, false, false, 21,
 'Department of Planning and Permitting', '(808) 768-8000',
 'https://www.honolulu.gov/dpp/',
 ['Hawaii DOH approval required', 'No discharge to storm drains', 'Subsurface irrigation only', 'Setbacks from water sources'],
 [],
 'Honolulu requires DOH approval for greywater systems. Tropical climate supports year-round irrigation.',
 'Hawaii DOH must approve systems. Year-round growing season makes greywater beneficial. Contact Board of Water Supply for conservation.',
 'Hawaii Admin Rules Title 11 Chapter 62', '2025-06-01', 'moderate'),

-- Hilo - Hawaii County (Big Island)
('HI', 'Hilo', 'Hawaii', 'HI_CITY_HILO', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.hawaiicounty.gov/departments/public-works/building-division', 'In-person',
 ['Site plan', 'System specifications', 'DOH coordination'], true, 125, 400,
 true, false, false, 21,
 'Hawaii County Building Division', '(808) 961-8331',
 'https://www.hawaiicounty.gov/departments/public-works/building-division',
 ['State DOH guidelines', 'Island-specific requirements', 'Groundwater protection'],
 [],
 'Hawaii County follows state guidelines with island-specific considerations.',
 'Contact Hawaii County for specific requirements. High rainfall may reduce greywater benefits in Hilo.',
 'Hawaii DOH regulations', '2025-06-01', 'moderate'),

-- Kahului - Maui County
('HI', 'Kahului', 'Maui', 'HI_CITY_KAHULUI', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.mauicounty.gov/1787/Building-Permits', 'In-person',
 ['Site plan', 'System design', 'DOH wastewater approval'], true, 125, 400,
 true, false, false, 21,
 'Maui County Department of Public Works', '(808) 270-7845',
 'https://www.mauicounty.gov/1787/Building-Permits',
 ['State DOH compliance', 'No discharge near ocean', 'Subsurface only'],
 [],
 'Maui County requires state DOH coordination for greywater systems.',
 'Drier climate in Kahului makes greywater more beneficial. Contact Maui County Water for conservation.',
 'Hawaii DOH and Maui County regulations', '2025-06-01', 'moderate'),

-- Lihue - Kauai County
('HI', 'Lihue', 'Kauai', 'HI_CITY_LIHUE', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.kauai.gov/Government/Departments-Agencies/Public-Works/Building-Division', 'In-person',
 ['Site plan', 'System specifications', 'DOH approval'], true, 125, 400,
 true, false, false, 21,
 'Kauai County Building Division', '(808) 241-4854',
 'https://www.kauai.gov/Government/Departments-Agencies/Public-Works',
 ['State DOH guidelines', 'Island ecosystem protection'],
 [],
 'Kauai County follows Hawaii state DOH requirements for greywater systems.',
 'High rainfall may limit greywater benefits. Contact county for specific guidance.',
 'Hawaii DOH regulations', '2025-06-01', 'moderate');

-- ADDITIONAL WATER-CONSCIOUS CITIES

-- Virginia - Making progress on greywater
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Virginia Beach
('VA', 'Virginia Beach', 'Virginia Beach', 'VA_CITY_VIRGINIA_BEACH', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.vbgov.com/government/departments/planning/permits/Pages/default.aspx', 'Online or in-person',
 ['Site plan', 'System design', 'VDH coordination'], true, 100, 350,
 true, false, false, 14,
 'City of Virginia Beach Permits and Inspections', '(757) 385-4211',
 'https://www.vbgov.com/government/departments/planning/permits/',
 ['Virginia Uniform Statewide Building Code', 'VDH wastewater guidelines', 'Coastal considerations'],
 [],
 'Virginia Beach follows state building code and VDH guidelines for greywater.',
 'Contact city permitting for current greywater requirements. Coastal location may have additional requirements.',
 'Virginia USBC', '2025-06-01', 'moderate'),

-- Richmond VA
('VA', 'Richmond', 'Richmond City', 'VA_CITY_RICHMOND', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.rva.gov/planning-development-review/permits', 'Online or in-person',
 ['Site plan', 'System specifications', 'Licensed plumber'], true, 100, 350,
 true, false, false, 14,
 'City of Richmond Permits and Inspections', '(804) 646-6415',
 'https://www.rva.gov/planning-development-review/permits',
 ['Virginia USBC compliance', 'Subsurface irrigation'],
 [],
 'Richmond follows Virginia Uniform Statewide Building Code for greywater systems.',
 'Licensed plumber required. Contact Richmond utilities for water conservation programs.',
 'Virginia USBC', '2025-06-01', 'moderate');

-- Montana - Has made progress on greywater
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Bozeman
('MT', 'Bozeman', 'Gallatin', 'MT_CITY_BOZEMAN', 'Standard', false,
 400, true, true, true, false,
 'https://www.bozeman.net/government/community-development/permits', 'Online or in-person',
 ['Site plan for permitted systems'], false, 0, 200,
 false, false, true, 7,
 'City of Bozeman Community Development', '(406) 582-2260',
 'https://www.bozeman.net/government/community-development',
 ['Montana DEQ guidelines', 'Seasonal operation recommended', 'Freeze protection required'],
 ['Simple laundry systems under 400 GPD'],
 'Montana allows simple greywater systems. Cold climate requires seasonal draining.',
 'Drain system before freezing. Simple laundry-to-landscape may be permit-free.',
 'Montana DEQ', '2025-06-01', 'moderate'),

-- Missoula
('MT', 'Missoula', 'Missoula', 'MT_CITY_MISSOULA', 'Standard', false,
 400, true, true, true, false,
 'https://www.ci.missoula.mt.us/1742/Building-Permits', 'In-person or online',
 ['Site plan for larger systems'], false, 0, 200,
 false, false, true, 7,
 'City of Missoula Development Services', '(406) 552-6630',
 'https://www.ci.missoula.mt.us/1742/Building-Permits',
 ['Seasonal operation', 'Freeze protection', 'Montana guidelines'],
 ['Simple systems under 400 GPD'],
 'Missoula follows Montana greywater guidelines. Seasonal operation due to cold winters.',
 'System must be drained for winter. Simple laundry systems encouraged.',
 'Montana DEQ guidelines', '2025-06-01', 'moderate');

-- Idaho - Following progressive western approaches
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Boise
('ID', 'Boise', 'Ada', 'ID_CITY_BOISE', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.cityofboise.org/departments/planning-and-development-services/building/', 'Online or in-person',
 ['Site plan', 'System specifications'], false, 75, 250,
 false, false, true, 10,
 'City of Boise Planning and Development', '(208) 384-3830',
 'https://www.cityofboise.org/departments/planning-and-development-services/',
 ['Idaho DEQ coordination', 'Subsurface irrigation', 'No ponding'],
 [],
 'Boise follows Idaho plumbing code with greywater provisions. Semi-arid climate benefits from greywater reuse.',
 'DIY allowed for simple systems. Check with Boise city water for conservation programs.',
 'Idaho plumbing code', '2025-06-01', 'moderate');

-- Oklahoma - Making progress
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Oklahoma City
('OK', 'Oklahoma City', 'Oklahoma', 'OK_CITY_OKLAHOMA_CITY', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.okc.gov/departments/development-services/building-permits', 'Online or in-person',
 ['Site plan', 'System design', 'Plumber information'], false, 100, 300,
 true, false, false, 10,
 'City of Oklahoma City Development Services', '(405) 297-2525',
 'https://www.okc.gov/departments/development-services',
 ['Oklahoma DEQ guidelines', 'Subsurface irrigation only'],
 [],
 'Oklahoma City follows state plumbing code. Hot summers make greywater beneficial.',
 'Licensed plumber recommended. Contact OKC utilities for water conservation info.',
 'Oklahoma plumbing code', '2025-06-01', 'moderate'),

-- Tulsa
('OK', 'Tulsa', 'Tulsa', 'OK_CITY_TULSA', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.cityoftulsa.org/government/departments/working-in-neighborhoods/building-permits/', 'Online or in-person',
 ['Site plan', 'System specifications'], false, 100, 300,
 true, false, false, 10,
 'City of Tulsa Working in Neighborhoods', '(918) 596-9601',
 'https://www.cityoftulsa.org/government/departments/working-in-neighborhoods/',
 ['State plumbing code', 'No surface ponding'],
 [],
 'Tulsa follows Oklahoma state regulations for greywater systems.',
 'Permit required. Check Tulsa Water for conservation rebates.',
 'Oklahoma plumbing code', '2025-06-01', 'moderate');

-- Kansas - Following neighboring state approaches
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Wichita
('KS', 'Wichita', 'Sedgwick', 'KS_CITY_WICHITA', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.wichita.gov/Planning/Permits/Pages/default.aspx', 'Online or in-person',
 ['Site plan', 'System design'], false, 75, 250,
 true, false, false, 10,
 'City of Wichita Planning', '(316) 268-4421',
 'https://www.wichita.gov/Planning/',
 ['Kansas KDHE guidelines', 'Subsurface irrigation'],
 [],
 'Wichita follows Kansas state guidelines. Semi-arid climate benefits from water reuse.',
 'Contact Wichita Water for conservation programs.',
 'Kansas plumbing code', '2025-06-01', 'moderate');

-- Missouri
INSERT INTO `greywater-prospects-2025.greywater_compliance.city_permit_details`
(state_code, city_name, county_name, jurisdiction_id, permit_type, permit_required,
 permit_required_threshold_gpd, laundry_to_landscape_allowed, branched_drain_allowed,
 surge_tank_system_allowed, indoor_reuse_allowed, application_url, application_method,
 required_documents, pre_approval_required, permit_fee_min, permit_fee_max,
 licensed_plumber_required, licensed_contractor_required, diy_allowed,
 typical_processing_days, department_name, department_phone, department_url,
 special_requirements, exemptions, notes, tips_for_residents,
 data_source, data_verified_date, data_confidence)
VALUES
-- Kansas City MO
('MO', 'Kansas City', 'Jackson', 'MO_CITY_KANSAS_CITY', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.kcmo.gov/city-hall/departments/city-planning-development/permits-center', 'Online or in-person',
 ['Site plan', 'System specifications', 'Licensed plumber'], false, 100, 350,
 true, false, false, 10,
 'Kansas City Permits Center', '(816) 513-1500',
 'https://www.kcmo.gov/city-hall/departments/city-planning-development',
 ['Missouri DNR guidelines', 'Subsurface irrigation only'],
 [],
 'Kansas City follows Missouri state regulations for greywater systems.',
 'Permit and licensed plumber required. Contact KC Water for conservation info.',
 'Missouri plumbing code', '2025-06-01', 'moderate'),

-- St. Louis
('MO', 'St. Louis', 'St. Louis City', 'MO_CITY_ST_LOUIS', 'Plumbing Permit', true,
 0, true, true, true, false,
 'https://www.stlouis-mo.gov/government/departments/permit/index.cfm', 'In-person or online',
 ['Site plan', 'System design', 'Licensed contractor'], false, 100, 350,
 true, false, false, 10,
 'City of St. Louis Building Division', '(314) 622-3313',
 'https://www.stlouis-mo.gov/government/departments/permit/',
 ['Missouri DNR compliance', 'Subsurface irrigation'],
 [],
 'St. Louis follows Missouri state plumbing regulations.',
 'Licensed plumber required. Contact Metropolitan Sewer District for guidance.',
 'Missouri plumbing code', '2025-06-01', 'moderate');
