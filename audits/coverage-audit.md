# Water Conservation Directory - Data Coverage Audit

**Audit Date:** 2026-01-12
**Auditor:** Claude Code
**Database:** BigQuery `greywater-prospects-2025.greywater_compliance`

---

## Executive Summary

This audit examines the geographic and programmatic data coverage of the Water Wise Group's water conservation directory. The database uses a hierarchical jurisdiction model with six core tables that track regulations and incentive programs at state, county, and city levels.

### Key Findings

| Metric | Status |
|--------|--------|
| States with greywater data | 14 of 50 (~28%) |
| California county coverage | 9 Bay Area counties verified |
| City-county mapping | Present for multiple states |
| Incentive programs linked | Active with junction table |
| Water utility linkage | Partial (through programs only) |

---

## Database Schema Overview

### Core Tables

1. **`greywater_laws`** - State-level greywater regulations
   - Fields: state_code, state_name, legal_status, governing_code, permit_required, permit_threshold_gpd, indoor_use_allowed, outdoor_use_allowed, approved_uses, key_restrictions, recent_changes, primary_agency, agency_phone, government_website, regulatory_classification, summary
   - Note: Also contains rainwater data when resource_type = 'rainwater'

2. **`state_water_regulations`** - Unified state-level water regulations (greywater + rainwater)
   - Includes both greywater and rainwater fields in a single row per state

3. **`local_regulations`** - County and city-level regulation details
   - Key fields: jurisdiction_id, jurisdiction_name, jurisdiction_type, state_code, resource_type, legal_status, permit_required, permit_details, allowed_uses, restrictions, local_code_reference, website, notes
   - Pre-plumbing mandate fields: has_preplumbing_mandate, preplumbing_threshold_sqft, preplumbing_building_types, preplumbing_details, preplumbing_code_reference

4. **`city_county_mapping`** - Geographic hierarchy for cities/counties
   - Fields: city_name, county_name, state_code, city_jurisdiction_id, county_jurisdiction_id

5. **`programs_master`** - Incentive programs database
   - Key fields: program_id, program_name, program_type, resource_type, program_subtype, incentive_amount_min, incentive_amount_max, application_url, program_status, water_utility, residential_eligible, commercial_eligible, program_description, coverage_area

6. **`program_jurisdiction_link`** - Junction table linking programs to jurisdictions
   - Fields: program_id, jurisdiction_id, coverage_type

7. **`city_permit_details`** (proposed) - City-specific permit requirements
   - Detailed permit fee, inspection, and professional requirements

---

## State Coverage Analysis

### States with Verified Data (14 states)

Based on `data/regulation-sources.json`:

| State | Data Quality | Completeness | Notes |
|-------|--------------|--------------|-------|
| **CA** (California) | High | Complete | Comprehensive greywater regulations, CPC Appendix G |
| **AZ** (Arizona) | High | Complete | Most permissive - Type 1 under 400 GPD permit-exempt |
| **TX** (Texas) | Medium | Partial | Allows greywater for landscape irrigation |
| **NM** (New Mexico) | Medium | Partial | Under 250 GPD permit-exempt |
| **NV** (Nevada) | Low | Partial | Varies by county, Clark County has provisions |
| **OR** (Oregon) | Medium | Partial | Permit required over 300 GPD |
| **WA** (Washington) | Medium | Partial | Varies significantly by county |
| **CO** (Colorado) | Medium | Partial | Updated rainwater laws, local permits for greywater |
| **UT** (Utah) | Low | Partial | Greywater allowed with permit |
| **FL** (Florida) | Low | Needs Verification | Complex, varies by county |
| **MT** (Montana) | Low | Needs Verification | Limited official information |
| **WY** (Wyoming) | Low | Needs Verification | Varies by municipality |
| **HI** (Hawaii) | Medium | Partial | Under 400 GPD may be exempt |
| **ID** (Idaho) | Low | Needs Verification | Locally administered |

### States Missing Data (36 states)

**Priority Tier 1 - High Population States:**
- New York (NY)
- Pennsylvania (PA)
- Illinois (IL)
- Ohio (OH)
- Georgia (GA)
- North Carolina (NC)
- Michigan (MI)
- New Jersey (NJ)
- Virginia (VA)
- Massachusetts (MA)

**Priority Tier 2 - Water-Stressed or Progressive States:**
- Louisiana (LA)
- South Carolina (SC)
- Alabama (AL)
- Kentucky (KY)
- Tennessee (TN)
- Oklahoma (OK)
- Maryland (MD)

**Remaining States:**
All other states not listed in regulation-sources.json

---

## California Coverage Deep Dive

### Counties with Verified Data (9 Bay Area Counties)

Based on `scripts/insert-bay-area-counties.ts`:

| County | Jurisdiction ID | Permit Status | Rebate Available |
|--------|-----------------|---------------|------------------|
| San Francisco | CA_COUNTY_SAN_FRANCISCO | Conditional (L2L exempt) | Yes - $100 SFPUC |
| Alameda | CA_COUNTY_ALAMEDA | Conditional (L2L exempt) | Yes - $100 EBMUD |
| Contra Costa | CA_COUNTY_CONTRA_COSTA | Conditional | Yes - $50 CCWD |
| Santa Clara | CA_COUNTY_SANTA_CLARA | Conditional | Yes - $200-$400 Valley Water |
| San Mateo | CA_COUNTY_SAN_MATEO | Conditional | Unknown |
| Marin | CA_COUNTY_MARIN | Conditional | Yes - $125 MMWD |
| Sonoma | CA_COUNTY_SONOMA | Requires permit | Unknown |
| Napa | CA_COUNTY_NAPA | Conditional | Unknown |
| Solano | CA_COUNTY_SOLANO | Conditional | Unknown |

### California Counties Missing Data (49 of 58)

**Priority - Major Population Counties:**
1. Los Angeles County (pop. ~10M) - Partial data exists in legacy-content.json
2. San Diego County (pop. ~3.3M)
3. Orange County (pop. ~3.2M)
4. Riverside County (pop. ~2.5M)
5. San Bernardino County (pop. ~2.2M)
6. Sacramento County (pop. ~1.5M)
7. Fresno County (pop. ~1M)
8. Kern County (pop. ~900K)
9. Ventura County (pop. ~850K)
10. San Joaquin County (pop. ~760K)

**Other Missing Counties:**
All 39 remaining California counties not in Bay Area dataset

### California Cities - Coverage Status

**Cities with Data (from legacy-content.json and fix-program-links.ts):**
- Los Angeles
- San Diego
- San Francisco
- Santa Monica
- Tucson (AZ - not CA)
- Austin (TX - not CA)
- Novato

**California Cities Missing (Major population centers):**

1. **Greater Los Angeles Area:**
   - Long Beach
   - Anaheim
   - Santa Ana
   - Irvine
   - Glendale
   - Huntington Beach
   - Santa Clarita
   - Pasadena
   - Torrance
   - Pomona
   - Burbank

2. **San Francisco Bay Area:**
   - San Jose
   - Oakland
   - Fremont
   - Santa Rosa
   - Hayward
   - Sunnyvale
   - Concord
   - Berkeley
   - Richmond
   - Daly City

3. **Central Valley:**
   - Fresno
   - Sacramento
   - Bakersfield
   - Stockton
   - Modesto
   - Visalia

4. **Southern California (other):**
   - Riverside
   - San Bernardino
   - Fontana
   - Moreno Valley
   - Ontario
   - Oceanside
   - Escondido
   - Carlsbad

---

## Greywater Data Completeness

### Required Fields per Jurisdiction

| Field | Purpose | States | Counties | Cities |
|-------|---------|--------|----------|--------|
| legal_status | Legal classification | Partial | Partial | Missing |
| governing_code | Applicable law/code | Partial | Partial | Missing |
| permit_required | Permit requirements | Partial | Partial | Missing |
| permit_threshold_gpd | GPD threshold | Partial | Rare | Missing |
| allowed_uses | Permitted applications | Partial | Partial | Missing |
| restrictions | Key limitations | Partial | Partial | Missing |
| has_preplumbing_mandate | Pre-plumbing requirements | CA only | CA only | Missing |

### Jurisdictions with Incomplete Greywater Data

**States:**
- NV, UT, FL, MT, WY, ID - Low quality/unverified data
- All 36 unlisted states - No data

**Counties (California):**
- All 49 non-Bay Area counties - No local regulation data
- Bay Area counties have REBATE data but limited PERMIT data

**Cities:**
- All California cities except LA, SF, Santa Monica - No city-specific permit data
- No city_permit_details table populated

---

## Rainwater Data Coverage

### States with Rainwater Data

Based on `data/regulation-sources.json`:

| State | Rainwater URL | Data Status |
|-------|---------------|-------------|
| CA | waterboards.ca.gov | Partial |
| AZ | waterinfo.az.gov | Partial |
| TX | twdb.texas.gov | Partial |
| CO | dnr.colorado.gov | Partial |
| WA | rain-barrel.net (non-official) | Low quality |

**Missing Rainwater Data:**
- All other states
- No county-level rainwater data
- No city-level rainwater data

### Rainwater Fields Tracked

From `state_water_regulations` table:
- rainwater_legal_status
- rainwater_collection_limit_gallons
- rainwater_potable_allowed
- rainwater_permit_required
- rainwater_governing_code
- rainwater_tax_incentives

---

## Incentive Programs Analysis

### Program Coverage by Jurisdiction Type

From `fix-program-links.ts` and `debug-incentives.ts`:

| Type | Example Programs | Link Status |
|------|------------------|-------------|
| State | CA_STATE programs | Linked |
| County | CA_COUNTY_* | Some linked |
| City | CA_CITY_SAN_DIEGO, CA_CITY_SANTA_MONICA | Fixed |
| Utility | EBMUD, SFPUC, MMWD, CCWD, Valley Water | Via county links |
| MWD | Metropolitan Water District | MWD_SERVICE_AREA |

### Orphaned Programs (Not Linked to Jurisdictions)

From `fix-data-quality.ts`:
- Programs with no junction table entries
- Duplicate programs (CA_AGRICULTURAL_WATER_EFFICIENCY_2025, etc.)

### Programs Incorrectly Linked

Fixed in `fix-program-links.ts`:
- City of San Diego programs linked to CA_STATE (should be city only)
- San Francisco Greywater Rebate linked to CA_STATE
- North Marin Water District linked to CA_STATE
- Santa Clara Valley Water District linked to CA_STATE (fixed)

---

## Water Utility Linkage Status

### Current State

Water utilities are tracked ONLY through the `programs_master.water_utility` field:
- No dedicated water utility table
- No utility-to-city mapping table
- Utility coverage inferred from program jurisdiction links

### Known Utilities in Database

| Utility | Coverage Area | Linked Jurisdictions |
|---------|---------------|----------------------|
| EBMUD | East Bay | CA_COUNTY_ALAMEDA |
| SFPUC | San Francisco | CA_COUNTY_SAN_FRANCISCO |
| MMWD | Marin | CA_COUNTY_MARIN |
| CCWD | Contra Costa | CA_COUNTY_CONTRA_COSTA |
| Valley Water (SCVWD) | Santa Clara | CA_COUNTY_SANTA_CLARA |
| North Marin WD | Novato area | CA_CITY_NOVATO, CA_COUNTY_MARIN |
| Tucson Water | Tucson | AZ jurisdictions |
| Austin Water | Austin | TX jurisdictions |

### Utilities Not Properly Linked

- Metropolitan Water District (MWD) - uses MWD_SERVICE_AREA
- San Diego utilities
- Most Southern California utilities
- All non-California utilities

---

## Priority Gaps to Fill

### Immediate Priority (Week 1-2)

1. **Los Angeles County** - Largest population, existing partial data
2. **San Diego County** - High population, programs exist but not linked
3. **Orange County** - High population, no data
4. **Riverside County** - Growing population, drought-prone
5. **San Bernardino County** - Large area, no data

### Short-Term Priority (Month 1)

1. Complete California county coverage (all 58 counties)
2. Add major California city permit details:
   - Los Angeles (detailed permit process)
   - San Jose
   - San Francisco (update existing)
   - Sacramento
   - Fresno

3. Add other southwestern states:
   - New Mexico (expand from partial)
   - Nevada (focus on Las Vegas/Clark County)
   - Utah (Salt Lake City focus)

### Medium-Term Priority (Month 2-3)

1. Complete top 10 most populous states
2. Add rainwater data for all states with greywater data
3. Create water utility mapping table
4. Populate city_permit_details for top 50 California cities

---

## Data Quality Issues Identified

### Schema Issues

1. **Duplicate resource_type rows** - greywater_laws has separate rows for greywater and rainwater per state
2. **No water utility table** - Utilities only tracked via program field
3. **city_permit_details table empty** - Schema defined but no data
4. **Inconsistent jurisdiction_id formats** - Some use PREPLUMB suffix

### Data Integrity Issues

1. **Orphaned programs** - Some programs not linked to any jurisdiction
2. **Incorrectly linked programs** - City programs linked to state level
3. **Missing county data** - Programs reference counties with no regulation data
4. **Stale last_updated dates** - Some records not updated since 2024

---

## Recommendations

### Database Improvements

1. **Create water_utilities table:**
   ```sql
   CREATE TABLE water_utilities (
     utility_id STRING PRIMARY KEY,
     utility_name STRING,
     utility_type STRING, -- municipal, private, district
     service_area_description STRING,
     website STRING,
     phone STRING
   )
   ```

2. **Create utility_jurisdiction_link table:**
   ```sql
   CREATE TABLE utility_jurisdiction_link (
     utility_id STRING,
     jurisdiction_id STRING,
     PRIMARY KEY (utility_id, jurisdiction_id)
   )
   ```

3. **Populate city_permit_details** - Start with LA, SF, SD

### Data Collection Priorities

1. Focus on California first (largest market)
2. Add Arizona cities (Phoenix, Tucson, Mesa)
3. Add Texas cities (Austin, San Antonio, Dallas)
4. Complete Oregon and Washington counties

### Quality Assurance

1. Run fix-data-quality.ts monthly
2. Validate all program jurisdiction links
3. Audit stale records (last_updated > 6 months)
4. Cross-reference with official government sources

---

## Appendix: Jurisdiction ID Format

Standard format: `{STATE_CODE}_{TYPE}_{NAME}`

Examples:
- `CA_STATE` - California state level
- `CA_COUNTY_LOS_ANGELES` - Los Angeles County
- `CA_CITY_SAN_FRANCISCO` - City of San Francisco
- `MWD_SERVICE_AREA` - Metropolitan Water District (special case)

---

*End of Audit Report*
