# BigQuery Schema Audit Report

**Generated:** 2026-01-12
**Project:** greywater-prospects-2025
**Dataset:** greywater_compliance

---

## Executive Summary

This audit analyzes the BigQuery database schema used by the Water Wise Group directory application. The analysis identifies schema inconsistencies, missing columns, naming convention issues, and provides recommendations for schema improvements.

---

## 1. Tables Identified in Codebase

Based on code analysis, the following tables are referenced in the application:

### Primary Tables

| Table Name | Purpose | Primary Key |
|------------|---------|-------------|
| `greywater_laws` | State-level greywater regulations | `state_code` |
| `state_water_regulations` | Unified state water regulations (greywater + rainwater) | `state_code`, `resource_type` |
| `city_county_mapping` | Geographic hierarchy mapping | `city_jurisdiction_id` |
| `local_regulations` | Local jurisdiction regulations | `jurisdiction_id` |
| `programs_master` | Incentive programs | `program_id` |
| `program_jurisdiction_link` | Program-to-jurisdiction mapping (junction table) | `program_id`, `jurisdiction_id` |
| `city_permit_details` | City-specific permit requirements | `state_code`, `city_name` |
| `state_permit_details` | State-level permit frameworks | `state_code` |
| `incentives_master` | Legacy incentives table | `jurisdiction_id` |

### Lookup/Reference Tables

| Table Name | Purpose |
|------------|---------|
| `lookup_water_types` | Water type definitions (GREYWATER, RAINWATER) |
| `water_regulations` | Water regulations by type |

### Tables Referenced but May Not Exist

| Table Name | Referenced In | Status |
|------------|---------------|--------|
| `complete_jurisdiction_hierarchy` | `schema/route.ts` | Query may fail |
| `jurisdiction_hierarchy_complete` | `schema/route.ts` | Query may fail |
| `jurisdictions_master` | `schema/route.ts` | Query may fail |
| `state_level_data` | `schema/route.ts` | Query may fail |
| `county_level_data` | `schema/route.ts` | Query may fail |
| `water_district_data` | `schema/route.ts` | Query may fail |
| `regulations_master` | `schema/route.ts` | Query may fail |
| `permits_master` | `schema/route.ts` | Query may fail |

---

## 2. Schema Analysis by Table

### 2.1 `greywater_laws` Table

**Columns Expected by Code:**
```
state_code                 STRING (PK)
state_name                 STRING
legal_status               STRING (e.g., 'L', 'R', or full text)
governing_code             STRING
permit_required            STRING
permit_threshold_gpd       INT64
permit_explanation         STRING
permit_process             STRING
indoor_use_allowed         BOOL
outdoor_use_allowed        BOOL
approved_uses              ARRAY<STRING> or STRING (comma-separated)
key_restrictions           ARRAY<STRING> or STRING (comma-separated)
recent_changes             STRING
summary                    STRING
primary_agency             STRING
agency_contact             STRING
agency_phone               STRING
government_website         STRING
regulatory_classification  STRING
resource_type              STRING (used in hierarchy query for filtering)
jurisdiction_id            STRING
```

**Issues Identified:**
- `resource_type` column referenced in `hierarchy/route.ts` line 91 (`WHERE s.resource_type = 'greywater'`) but may not exist in the original schema
- `jurisdiction_id` referenced but unclear if it exists
- `approved_uses` and `key_restrictions` have inconsistent handling (sometimes treated as array, sometimes as comma-separated string)

---

### 2.2 `state_water_regulations` Table

**Columns Expected by Code:**
```
state_code                          STRING (PK)
state_name                          STRING
resource_type                       STRING (PK - 'greywater' or 'rainwater')
legal_status                        STRING
governing_code                      STRING
permit_required                     STRING
permit_threshold_gpd                INT64
permit_explanation                  STRING
permit_process                      STRING
indoor_use_allowed                  BOOL
outdoor_use_allowed                 BOOL
potable_use_allowed                 BOOL
approved_uses                       ARRAY<STRING>
key_restrictions                    ARRAY<STRING>
recent_changes                      STRING
summary                             STRING
primary_agency                      STRING
agency_contact                      STRING
agency_phone                        STRING
government_website                  STRING
regulatory_classification           STRING
collection_limit_gallons            INT64 (rainwater-specific)
tax_incentives                      STRING (rainwater-specific)
last_updated                        TIMESTAMP

-- Aliased columns expected in queries:
rainwater_legal_status              STRING (NOT a real column - aliased from legal_status)
rainwater_collection_limit_gallons  INT64 (NOT a real column)
rainwater_potable_allowed           BOOL (NOT a real column)
rainwater_permit_required           STRING (NOT a real column)
rainwater_governing_code            STRING (NOT a real column)
rainwater_tax_incentives            STRING (NOT a real column)
```

**CRITICAL ISSUE: Missing Column `rainwater_legal_status`**

The code in `lib/directory-data.ts` (lines 168, 205) and multiple location pages queries for `rainwater_legal_status` directly:

```sql
SELECT
  ...
  rainwater_legal_status,
  rainwater_collection_limit_gallons,
  ...
FROM `greywater_compliance.state_water_regulations`
```

However, this table likely uses a `resource_type` column to differentiate greywater vs rainwater data, meaning `rainwater_legal_status` is NOT a direct column. The query should either:
1. Join/self-join on `resource_type = 'rainwater'` to get rainwater data
2. Or the table needs columns prefixed with `rainwater_` for denormalized storage

**Current Mismatch:**
- Code expects denormalized columns: `rainwater_legal_status`, `rainwater_collection_limit_gallons`, etc.
- Table likely uses normalized structure with `resource_type` to separate greywater/rainwater rows

---

### 2.3 `city_county_mapping` Table

**Columns Expected by Code:**
```
state_code              STRING (FK)
city_name               STRING
county_name             STRING
city_jurisdiction_id    STRING (PK)
county_jurisdiction_id  STRING
```

**Status:** Schema appears consistent with code expectations.

---

### 2.4 `local_regulations` Table

**Columns Expected by Code:**
```
jurisdiction_id              STRING (PK)
jurisdiction_name            STRING
jurisdiction_type            STRING
legal_status                 STRING
notes                        STRING
permit_details               STRING
allowed_uses                 STRING
restrictions                 STRING
website                      STRING
permit_required              BOOL
has_preplumbing_mandate      BOOL
preplumbing_threshold_sqft   INT64
preplumbing_building_types   STRING
preplumbing_details          STRING
preplumbing_code_reference   STRING
```

**Status:** Schema appears consistent.

---

### 2.5 `programs_master` Table

**Columns Expected by Code:**
```
program_id                  STRING (PK)
program_name                STRING
program_type                STRING
program_subtype             STRING
resource_type               STRING ('greywater', 'rainwater', 'conservation')
program_status              STRING ('active', 'inactive')
incentive_amount_min        FLOAT64
incentive_amount_max        FLOAT64
incentive_per_unit          FLOAT64
application_url             STRING
program_description         STRING
notes                       STRING
water_utility               STRING
residential_eligible        BOOL
commercial_eligible         BOOL
municipal_eligible          BOOL
agricultural_eligible       BOOL
applicant_type              STRING
eligibility_details         STRING
how_to_apply                STRING
documentation_required      STRING
installation_requirements   STRING
property_requirements       STRING
income_requirements         STRING
pre_approval_required       BOOL
inspection_required         BOOL
contractor_requirements     STRING
product_requirements        STRING
timeline_to_complete        STRING
reimbursement_process       STRING
restrictions                STRING
steps_to_apply              STRING
processing_time             STRING
stacking_allowed            BOOL
stacking_details            STRING
contact_email               STRING
contact_phone               STRING
coverage_area               STRING
deadline_info               STRING
program_end_date            DATE
eligible_system_types       STRING
```

**Status:** Comprehensive schema, appears consistent with code.

---

### 2.6 `program_jurisdiction_link` Table

**Columns Expected by Code:**
```
program_id        STRING (PK, FK)
jurisdiction_id   STRING (PK, FK)
coverage_type     STRING ('state', 'county', 'city', 'utility')
```

**Status:** Schema appears consistent.

---

### 2.7 `city_permit_details` Table

**Columns Expected by Code (from SQL file):**
```
state_code                      STRING (PK)
city_name                       STRING (PK)
county_name                     STRING
jurisdiction_id                 STRING
permit_type                     STRING
permit_required                 BOOL
permit_required_threshold_gpd   INT64
laundry_to_landscape_allowed    BOOL
branched_drain_allowed          BOOL
surge_tank_system_allowed       BOOL
indoor_reuse_allowed            BOOL
application_url                 STRING
application_method              STRING
required_documents              ARRAY<STRING>
pre_approval_required           BOOL
permit_fee_min                  FLOAT64
permit_fee_max                  FLOAT64
plan_check_fee                  FLOAT64
inspection_fee                  FLOAT64
fee_notes                       STRING
inspections_required            ARRAY<STRING>
inspection_scheduling_url       STRING
inspection_scheduling_phone     STRING
licensed_plumber_required       BOOL
licensed_contractor_required    BOOL
diy_allowed                     BOOL
professional_requirements_notes STRING
typical_processing_days         INT64
expedited_available             BOOL
expedited_fee                   FLOAT64
department_name                 STRING
department_address              STRING
department_phone                STRING
department_email                STRING
department_hours                STRING
department_url                  STRING
hoa_approval_note               STRING
special_requirements            ARRAY<STRING>
exemptions                      ARRAY<STRING>
data_source                     STRING
data_verified_date              DATE
data_confidence                 STRING
last_updated                    TIMESTAMP
notes                           STRING
tips_for_residents              STRING
```

**Status:** Schema defined in SQL file, should be consistent.

---

### 2.8 `state_permit_details` Table

**Columns Expected by Code:**
```
state_code                  STRING (PK)
permit_authority            STRING
permit_framework            STRING
statewide_threshold_gpd     INT64
laundry_to_landscape_allowed BOOL
branched_drain_allowed      BOOL
surge_tank_allowed          BOOL
indoor_reuse_allowed        BOOL
permit_exemptions           ARRAY<STRING>
statewide_requirements      ARRAY<STRING>
typical_permit_type         STRING
typical_fee_range           STRING
typical_processing_days     INT64
diy_generally_allowed       BOOL
state_guidance_url          STRING
state_code_url              STRING
notes                       STRING
tips_for_residents          STRING
```

**Status:** Referenced in code but table may not exist or be fully populated.

---

### 2.9 `incentives_master` Table (Legacy)

**Columns Expected by Code:**
```
jurisdiction_id     STRING
program_name        STRING
program_status      STRING
... (various other incentive fields)
```

**Note:** This appears to be a legacy table. Code references it in test routes but primary incentive data comes from `programs_master`.

---

## 3. Naming Convention Issues

### 3.1 camelCase vs snake_case Inconsistencies

The codebase uses both conventions inconsistently:

| Location | Convention | Examples |
|----------|------------|----------|
| BigQuery columns | snake_case | `permit_threshold_gpd`, `legal_status` |
| TypeScript interfaces | camelCase | `permitThresholdGpd`, `legalStatus` |
| Query aliases | mixed | Sometimes aliased to camelCase in SELECT |

**Impact:** Requires manual mapping in every query result handler.

**Recommendation:** Standardize on snake_case for database columns and use consistent mapping utilities.

### 3.2 Inconsistent Table Naming

| Pattern | Tables |
|---------|--------|
| `*_master` | `programs_master`, `incentives_master`, `jurisdictions_master` |
| `*_details` | `city_permit_details`, `state_permit_details` |
| `*_mapping` | `city_county_mapping` |
| `*_link` | `program_jurisdiction_link` |
| No suffix | `greywater_laws`, `local_regulations` |

**Recommendation:** Adopt consistent naming pattern (e.g., all lookup tables use `lookup_*`, all junction tables use `*_link`).

---

## 4. Critical Issues Found

### Issue 1: rainwater_legal_status Column Missing

**Severity:** HIGH
**Files Affected:**
- `lib/directory-data.ts` (lines 168, 205)
- `app/(locations)/[state]/page.tsx` (lines 51, 148)
- `app/(locations)/[state]/rainwater/page.tsx` (lines 32, 57)
- `app/(locations)/[state]/[city]/rainwater/page.tsx` (lines 66, 89)

**Problem:** Code queries for `rainwater_legal_status` as a column, but `state_water_regulations` likely stores rainwater data as separate rows with `resource_type = 'rainwater'`.

**Solution Options:**
1. Modify queries to join rainwater data from separate rows
2. Add denormalized rainwater columns to the table
3. Create a view that exposes rainwater data as separate columns

### Issue 2: Duplicate Data Fetching Logic

**Severity:** MEDIUM
**Problem:** The same state data fetching logic is duplicated across multiple files:
- `lib/directory-data.ts` - `getStateData()`
- `app/(locations)/[state]/page.tsx` - `getStateData()`
- `app/(locations)/[state]/[city]/page.tsx` - `getStateRegulations()`
- `app/(locations)/[state]/greywater/page.tsx` - inline query

**Recommendation:** Consolidate into single source in `lib/directory-data.ts`.

### Issue 3: Inconsistent Array Handling

**Severity:** MEDIUM
**Problem:** Fields like `approved_uses` and `key_restrictions` are handled inconsistently:
```typescript
// Sometimes treated as array
approvedUses: row.approved_uses || []

// Sometimes parsed from string
approvedUses: row.approved_uses ? row.approved_uses.split(',').map((s: string) => s.trim()) : []

// Sometimes checked for type
approvedUses: row.approved_uses ?
  (Array.isArray(row.approved_uses) ? row.approved_uses : row.approved_uses.split(',').map((s: string) => s.trim())) : []
```

**Recommendation:** Standardize on ARRAY type in BigQuery and always use array handling.

### Issue 4: Missing Tables Referenced in Schema Route

**Severity:** LOW (diagnostic route only)
**Problem:** `app/api/greywater-directory/schema/route.ts` references tables that may not exist:
- `complete_jurisdiction_hierarchy`
- `jurisdiction_hierarchy_complete`
- `jurisdictions_master`
- `regulations_master`
- `permits_master`

These will cause errors in the schema exploration endpoint.

---

## 5. Redundant/Unused Fields

### Potentially Unused Fields

| Table | Field | Reason |
|-------|-------|--------|
| `greywater_laws` | `agency_contact` | Rarely accessed in frontend code |
| `programs_master` | `municipal_eligible` | No UI for municipal filtering |
| `programs_master` | `agricultural_eligible` | No UI for agricultural filtering |
| `programs_master` | `stacking_allowed` | Feature not implemented in UI |
| `programs_master` | `stacking_details` | Feature not implemented in UI |

### Duplicate Data Between Tables

| Table 1 | Table 2 | Overlapping Data |
|---------|---------|------------------|
| `greywater_laws` | `state_water_regulations` | State greywater regulations |
| `incentives_master` | `programs_master` | Incentive program data |

**Recommendation:** Consider deprecating `greywater_laws` in favor of unified `state_water_regulations` table.

---

## 6. Recommended Schema Changes

### Priority 1: Fix rainwater_legal_status Issue

**Option A: Add Denormalized Columns**
```sql
ALTER TABLE `greywater_compliance.state_water_regulations`
ADD COLUMN IF NOT EXISTS rainwater_legal_status STRING,
ADD COLUMN IF NOT EXISTS rainwater_collection_limit_gallons INT64,
ADD COLUMN IF NOT EXISTS rainwater_potable_allowed BOOL,
ADD COLUMN IF NOT EXISTS rainwater_permit_required STRING,
ADD COLUMN IF NOT EXISTS rainwater_governing_code STRING,
ADD COLUMN IF NOT EXISTS rainwater_tax_incentives STRING;
```

**Option B: Create View**
```sql
CREATE OR REPLACE VIEW `greywater_compliance.state_water_unified` AS
SELECT
  g.state_code,
  g.state_name,
  g.legal_status as greywater_legal_status,
  g.permit_required as greywater_permit_required,
  g.permit_threshold_gpd as greywater_permit_threshold,
  g.indoor_use_allowed as greywater_indoor_allowed,
  g.outdoor_use_allowed as greywater_outdoor_allowed,
  g.governing_code as greywater_governing_code,
  g.approved_uses as greywater_approved_uses,
  g.key_restrictions as greywater_key_restrictions,
  g.recent_changes as greywater_recent_changes,
  r.legal_status as rainwater_legal_status,
  r.collection_limit_gallons as rainwater_collection_limit_gallons,
  r.potable_use_allowed as rainwater_potable_allowed,
  r.permit_required as rainwater_permit_required,
  r.governing_code as rainwater_governing_code,
  r.tax_incentives as rainwater_tax_incentives,
  COALESCE(g.primary_agency, r.primary_agency) as primary_agency,
  COALESCE(g.agency_phone, r.agency_phone) as agency_phone,
  COALESCE(g.government_website, r.government_website) as government_website,
  GREATEST(g.last_updated, r.last_updated) as last_updated
FROM `greywater_compliance.state_water_regulations` g
LEFT JOIN `greywater_compliance.state_water_regulations` r
  ON g.state_code = r.state_code AND r.resource_type = 'rainwater'
WHERE g.resource_type = 'greywater';
```

### Priority 2: Standardize Array Fields

Ensure all array fields in BigQuery use ARRAY type:
```sql
ALTER TABLE `greywater_compliance.greywater_laws`
ALTER COLUMN approved_uses SET DATA TYPE ARRAY<STRING>,
ALTER COLUMN key_restrictions SET DATA TYPE ARRAY<STRING>;
```

### Priority 3: Add Missing Indexes

```sql
-- For faster jurisdiction lookups
CREATE INDEX idx_programs_jurisdiction
ON `greywater_compliance.program_jurisdiction_link` (jurisdiction_id);

-- For faster city lookups
CREATE INDEX idx_city_state
ON `greywater_compliance.city_county_mapping` (state_code, city_name);
```

### Priority 4: Deprecate Legacy Tables

Consider creating migration to:
1. Move all data from `greywater_laws` to `state_water_regulations`
2. Move all data from `incentives_master` to `programs_master`
3. Archive or delete legacy tables

---

## 7. TypeScript Interface Recommendations

Create a shared types file (`lib/types/database.ts`) to ensure consistency:

```typescript
// Database row types (snake_case - matching BigQuery)
export interface DbStateRegulation {
  state_code: string;
  state_name: string;
  resource_type: 'greywater' | 'rainwater';
  legal_status: string;
  permit_required: string;
  permit_threshold_gpd: number | null;
  indoor_use_allowed: boolean;
  outdoor_use_allowed: boolean;
  governing_code: string | null;
  approved_uses: string[] | null;
  key_restrictions: string[] | null;
  recent_changes: string | null;
  summary: string | null;
  primary_agency: string | null;
  agency_phone: string | null;
  government_website: string | null;
  last_updated: string | null;
  // Rainwater-specific
  collection_limit_gallons?: number | null;
  potable_use_allowed?: boolean;
  tax_incentives?: string | null;
}

// Application types (camelCase - for frontend use)
export interface StateRegulation {
  stateCode: string;
  stateName: string;
  greywater: GreywaterData | null;
  rainwater: RainwaterData | null;
  agency: AgencyData | null;
  lastUpdated?: string;
}

// Utility function to map DB rows to app types
export function mapDbToApp(row: DbStateRegulation): StateRegulation {
  // ... mapping logic
}
```

---

## 8. Summary of Findings

| Category | Count | Severity |
|----------|-------|----------|
| Missing columns | 6+ | HIGH |
| Naming inconsistencies | 10+ | MEDIUM |
| Duplicate logic | 4 files | MEDIUM |
| Unused fields | 5+ | LOW |
| Deprecated tables | 2 | LOW |

### Immediate Action Items

1. **FIX:** Add `rainwater_*` columns to `state_water_regulations` or create unified view
2. **REFACTOR:** Consolidate state data fetching logic
3. **STANDARDIZE:** Array field handling across all queries
4. **CLEAN UP:** Remove references to non-existent tables in schema route

### Long-term Improvements

1. Create comprehensive TypeScript types for all database schemas
2. Implement schema validation/migration tooling
3. Add database documentation with ERD
4. Consider using an ORM or query builder for type safety

---

## Appendix: Files Analyzed

- `/Volumes/LaCie/WEBDEV/greywater-website/lib/bigquery.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/lib/directory-data.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/lib/greywater-laws.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/scripts/create-city-permit-table.sql`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/api/greywater-directory/schema/route.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/api/greywater-directory/datasets/route.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/api/greywater-directory/compliance/route.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/api/greywater-directory/state-data/route.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/api/greywater-directory/hierarchy/route.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/api/water-regulations/route.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/api/test-incentives/route.ts`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/(locations)/[state]/page.tsx`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/(locations)/[state]/[city]/page.tsx`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/(locations)/[state]/rainwater/page.tsx`
- `/Volumes/LaCie/WEBDEV/greywater-website/app/(locations)/[state]/[city]/rainwater/page.tsx`
