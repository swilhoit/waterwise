# Bulletproof Jurisdiction Hierarchy Plan

## Problem Statement
Programs from one jurisdiction (e.g., EBMUD/East Bay) are incorrectly appearing in unrelated jurisdictions (e.g., Rancho Cucamonga in San Bernardino County).

## Root Causes
1. **Empty junction table**: `program_jurisdiction_link` exists but has 0 rows
2. **Brittle program filtering**: Code relies on string pattern matching in `program_id`
3. **No water utility→city mapping**: California has 400+ water utilities with different service areas
4. **Unstructured coverage data**: `coverage_area` is free text, not queryable

## Solution: Three-Table Architecture

### Table 1: `water_utilities` (NEW)
Maps water utilities to their service areas.

```sql
CREATE TABLE water_utilities (
  utility_id STRING NOT NULL,           -- e.g., 'EBMUD', 'LADWP', 'MWD'
  utility_name STRING NOT NULL,         -- e.g., 'East Bay Municipal Utility District'
  utility_type STRING,                  -- 'municipal', 'district', 'private'
  state_code STRING NOT NULL,
  website STRING,
  phone STRING,
  PRIMARY KEY (utility_id)
);
```

### Table 2: `utility_service_areas` (NEW)
Junction table mapping utilities to cities/counties they serve.

```sql
CREATE TABLE utility_service_areas (
  utility_id STRING NOT NULL,
  jurisdiction_id STRING NOT NULL,      -- e.g., 'CA_CITY_OAKLAND', 'CA_COUNTY_ALAMEDA'
  jurisdiction_type STRING NOT NULL,    -- 'city', 'county', 'state'
  service_type STRING,                  -- 'primary', 'wholesale', 'partial'
  PRIMARY KEY (utility_id, jurisdiction_id)
);
```

### Table 3: `program_jurisdiction_link` (POPULATE EXISTING)
Explicit mapping of programs to jurisdictions they cover.

```sql
-- Already exists, just needs data:
-- program_id STRING
-- jurisdiction_id STRING

-- Add coverage_type for clarity:
ALTER TABLE program_jurisdiction_link ADD COLUMN coverage_type STRING;
-- Values: 'direct' (program run by jurisdiction), 'utility' (via water utility), 'regional'
```

## Data Population Strategy

### Step 1: Create California Water Utility Master List
Key utilities to map:

| Utility ID | Name | Counties Served |
|------------|------|-----------------|
| EBMUD | East Bay MUD | Alameda, Contra Costa (partial) |
| LADWP | LA Dept of Water & Power | Los Angeles (city only) |
| MWD | Metropolitan Water District | LA, Orange, Riverside, San Bernardino, San Diego, Ventura (26 member agencies) |
| SDCWA | San Diego County Water Authority | San Diego County |
| SFPUC | SF Public Utilities Commission | San Francisco |
| SCVWD | Santa Clara Valley Water District | Santa Clara County |
| EMWD | Eastern Municipal Water District | Riverside (western) |
| MWDOC | Municipal Water District of OC | Orange County |
| IEUA | Inland Empire Utilities Agency | San Bernardino (western) |
| CVWD | Coachella Valley Water District | Riverside (eastern) |

### Step 2: Map Utilities to Cities
For each utility, enumerate the cities served:

```sql
-- Example: EBMUD serves these cities
INSERT INTO utility_service_areas VALUES
('EBMUD', 'CA_CITY_OAKLAND', 'city', 'primary'),
('EBMUD', 'CA_CITY_BERKELEY', 'city', 'primary'),
('EBMUD', 'CA_CITY_ALAMEDA', 'city', 'primary'),
('EBMUD', 'CA_CITY_ALBANY', 'city', 'primary'),
('EBMUD', 'CA_CITY_EMERYVILLE', 'city', 'primary'),
('EBMUD', 'CA_CITY_PIEDMONT', 'city', 'primary'),
('EBMUD', 'CA_CITY_RICHMOND', 'city', 'primary'),
('EBMUD', 'CA_CITY_EL_CERRITO', 'city', 'primary'),
('EBMUD', 'CA_CITY_SAN_LEANDRO', 'city', 'primary'),
('EBMUD', 'CA_CITY_HAYWARD', 'city', 'primary'),
('EBMUD', 'CA_COUNTY_ALAMEDA', 'county', 'primary'),
('EBMUD', 'CA_COUNTY_CONTRA_COSTA', 'county', 'partial');
```

### Step 3: Link Programs to Jurisdictions via Utilities
For utility-based programs:

```sql
-- Link EBMUD programs to all cities EBMUD serves
INSERT INTO program_jurisdiction_link (program_id, jurisdiction_id, coverage_type)
SELECT
  p.program_id,
  usa.jurisdiction_id,
  'utility'
FROM programs_master p
JOIN utility_service_areas usa ON p.water_utility = usa.utility_id
WHERE p.program_id LIKE 'CA_EBMUD%';
```

For state-level programs:

```sql
-- State programs cover all cities in the state
INSERT INTO program_jurisdiction_link (program_id, jurisdiction_id, coverage_type)
SELECT
  p.program_id,
  c.city_jurisdiction_id,
  'state'
FROM programs_master p
CROSS JOIN city_county_mapping c
WHERE p.program_id LIKE 'CA_%'
  AND p.program_id NOT LIKE '%_CITY_%'
  AND p.program_id NOT LIKE '%_COUNTY_%'
  AND p.water_utility IS NULL
  AND c.state_code = 'CA';
```

## Query Pattern (New Compliance API)

```sql
-- Get programs for a specific city
SELECT DISTINCT p.*
FROM programs_master p
JOIN program_jurisdiction_link pjl ON p.program_id = pjl.program_id
WHERE pjl.jurisdiction_id IN (
  @city_jurisdiction_id,      -- Direct city match
  @county_jurisdiction_id,    -- County-level programs
  @state_jurisdiction_id      -- State-level programs
)
AND p.program_status = 'active';
```

## Benefits

1. **Explicit mapping**: No guessing from string patterns
2. **Utility-aware**: Programs correctly scoped to utility service areas
3. **Hierarchical inheritance**: State→County→City cascade built into data
4. **Maintainable**: Add new programs by inserting rows, not code changes
5. **Queryable**: Simple JOINs replace complex string matching
6. **Auditable**: Can verify exactly which programs cover which cities

## Migration Plan

### Phase 1: Create Tables (1 hour)
- Create `water_utilities` table
- Create `utility_service_areas` table

### Phase 2: Populate Utility Data (2-3 hours)
- Research and enter major CA water utilities
- Map utilities to cities they serve
- Start with top 20 utilities covering ~80% of CA population

### Phase 3: Populate Junction Table (1-2 hours)
- Run migration script to link programs to jurisdictions
- Verify with spot checks

### Phase 4: Update API (1 hour)
- Modify compliance API to query junction table
- Remove brittle string matching code

### Phase 5: Test & Validate (1 hour)
- Test East Bay cities show only EBMUD programs
- Test Rancho Cucamonga shows only relevant programs
- Test LA shows LADWP + MWD programs

## Files to Modify
1. `app/api/greywater-directory/compliance/route.ts` - Use junction table
2. Create migration script in `scripts/populate-program-jurisdictions.ts`
3. Create BigQuery schema updates

## Success Criteria
- [ ] Rancho Cucamonga does NOT show EBMUD programs
- [ ] Oakland shows EBMUD programs
- [ ] Los Angeles shows LADWP + MWD programs
- [ ] State-wide programs show for all CA cities
- [ ] No programs show for cities outside their coverage area
