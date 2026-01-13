-- Add preplumbing/stub-out mandates for cities that have them
-- Using correct jurisdiction_id format: STATE_CODE_CITY_CITY_NAME or STATE_CODE_COUNTY_COUNTY_NAME

-- Tucson, AZ - Rainwater harvesting stub-out requirements
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('AZ_CITY_TUCSON', 'City of Tucson', 'city', 'AZ', 'rainwater', 'Legal', 'No', true,
'PRE-PLUMBING MANDATE: All new single-family homes in Tucson must include rainwater harvesting infrastructure provisions. City offers rebates up to $2,000 for rainwater harvesting systems.',
'Single-family residential', 'Tucson Water Conservation Ordinance', CURRENT_DATE());

-- Pima County, AZ - Rainwater requirements
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('AZ_COUNTY_PIMA', 'Pima County', 'county', 'AZ', 'rainwater', 'Legal', 'No', true,
'PRE-PLUMBING MANDATE: Commercial development must use 50% of landscape water from rainwater harvesting or reclaimed water. Residential encouraged through rebate programs.',
'Commercial new construction', 'Pima County Code Chapter 18.81', CURRENT_DATE());

-- Santa Fe, NM - Water harvesting requirements
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('NM_CITY_SANTA_FE', 'City of Santa Fe', 'city', 'NM', 'rainwater', 'Legal', 'No', true,
'PRE-PLUMBING MANDATE: New development must include rainwater harvesting provisions. Part of comprehensive water conservation strategy. City offers rebates for cisterns and rain barrels.',
'All new construction', 'Santa Fe City Code Chapter 25', CURRENT_DATE());

-- San Jose, CA - Graywater reach code
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_SAN_JOSE', 'City of San Jose', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: San Jose adopted reach code exceeding CALGreen with enhanced graywater-ready requirements for new residential construction. Part of Climate Smart San Jose.',
'Residential new construction', 'San Jose Municipal Code Title 24, Climate Smart San Jose', CURRENT_DATE());

-- Pasadena, CA - Water efficiency requirements
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_PASADENA', 'City of Pasadena', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Pasadena green building requirements include graywater-ready plumbing per CALGreen plus additional water efficiency measures. Strong rebate program available.',
'Residential and commercial', 'Pasadena Municipal Code Chapter 14.17', CURRENT_DATE());

-- Burbank, CA - Water efficiency
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_BURBANK', 'City of Burbank', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Burbank Water follows CALGreen requirements with enhanced water efficiency standards. Graywater-ready plumbing required for new residential construction.',
'Residential new construction', 'Burbank Municipal Code, CALGreen Section 4.305.2', CURRENT_DATE());

-- National City, CA - San Diego area mandate
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_NATIONAL_CITY', 'National City', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Following regional San Diego County water conservation efforts, National City requires graywater-ready plumbing in new residential construction.',
'Single-family, duplex', 'National City Municipal Code', CURRENT_DATE());

-- Solana Beach, CA - San Diego area mandate
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_SOLANA_BEACH', 'Solana Beach', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Solana Beach requires graywater pre-plumbing for new single-family and duplex construction, part of regional water conservation efforts in San Diego County.',
'Single-family, duplex', 'Solana Beach Municipal Code Chapter 15', CURRENT_DATE());

-- Del Mar, CA - San Diego area mandate
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_DEL_MAR', 'Del Mar', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Del Mar requires graywater-ready plumbing in new residential construction as part of citywide sustainability initiatives.',
'Single-family, duplex', 'Del Mar Municipal Code', CURRENT_DATE());

-- Marin County, CA - Progressive water policy
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_COUNTY_MARIN', 'Marin County', 'county', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Marin County Development Code requires water-efficient landscaping and encourages graywater-ready plumbing. Strong rebate programs through MMWD.',
'Residential new construction', 'Marin County Development Code Chapter 22', CURRENT_DATE());

-- Alameda, CA
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_ALAMEDA', 'City of Alameda', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Alameda adopted reach code with enhanced water efficiency requirements including graywater-ready plumbing for new construction.',
'Residential new construction', 'Alameda Municipal Code, CALGreen Reach Code', CURRENT_DATE());

-- Oakland, CA
INSERT INTO `greywater-prospects-2025.greywater_compliance.local_regulations`
(jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, has_preplumbing_mandate, preplumbing_details, preplumbing_building_types, preplumbing_code_reference, last_updated)
VALUES
('CA_CITY_OAKLAND', 'City of Oakland', 'city', 'CA', 'greywater', 'Legal', 'Under 250 GPD no permit', true,
'PRE-PLUMBING MANDATE: Oakland Green Building Ordinance includes graywater-ready requirements consistent with CALGreen. City offers technical assistance for graywater systems.',
'Residential and commercial', 'Oakland Municipal Code Chapter 18.02', CURRENT_DATE());
