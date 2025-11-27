# Water Sustainability Directory - Taxonomy Expansion Plan

## Executive Summary

Transform the current greywater-specific directory into a comprehensive **Water Sustainability & Irrigation Compliance Database** covering multiple water resource categories. Priority: **Rainwater Harvesting**.

---

## 1. Current State Analysis

### 1.1 Database Structure (BigQuery)

**Dataset:** `greywater_compliance`

| Table | Purpose | Records |
|-------|---------|---------|
| `greywater_laws` | State-level regulations | 50 states |
| `programs_master` | Incentive programs | ~100+ programs |
| `regulations_master` | Jurisdiction-specific regulations | Variable |
| `permits_master` | Permit requirements | Variable |
| `city_county_mapping` | Geographic hierarchy | All US |

### 1.2 Current Taxonomy Limitations

**Greywater-Specific Field Names:**
- `greywater_allowed` (BOOLEAN)
- `greywater_laws` table name
- `greywater_compliance` dataset name

**Hardcoded Classifications:**
- `legalStatus`: Legal, Regulated, Prohibited, etc.
- `regulatoryClassification`: "Progressive Three-Tier System", "Restrictive Indoor-Only", etc.
- `approvedUses`: Greywater-specific (toilet flushing, landscape irrigation)
- `keyRestrictions`: Greywater-specific (purple piping, no kitchen water)

**Missing Water Resource Categories:**
- Rainwater harvesting
- General water conservation

---

## 2. Proposed Taxonomy Structure

### 2.1 Water Resource Categories (Enum)

```typescript
type WaterResourceCategory =
  | 'greywater'           // Laundry, shower, sink water reuse
  | 'rainwater'           // Rainwater collection & harvesting
  | 'conservation'        // General water-saving programs (turf removal, efficient fixtures, etc.)
```

### 2.2 System Type Taxonomy

```typescript
// Greywater Systems
type GreywaterSystemType =
  | 'laundry_to_landscape'    // Simple washing machine systems
  | 'branched_drain'          // Multi-fixture gravity systems
  | 'pumped_system'           // Pressurized distribution
  | 'treatment_system'        // NSF 350 certified treatment
  | 'constructed_wetland'     // Natural treatment systems

// Rainwater Systems
type RainwaterSystemType =
  | 'rain_barrel'             // Small collection (<100 gal)
  | 'cistern_above_ground'    // Medium above-ground storage
  | 'cistern_underground'     // Underground tanks
  | 'first_flush_diverter'    // Roof washing systems
  | 'potable_treatment'       // Treatment for drinking water
  | 'irrigation_system'       // Direct landscape irrigation

// Conservation Programs (not systems, but rebate categories)
type ConservationProgramType =
  | 'turf_removal'            // Lawn-to-garden / grass replacement
  | 'smart_irrigation'        // Weather-based controllers, drip conversion
  | 'efficient_fixtures'      // WaterSense toilets, showerheads, faucets
  | 'pool_covers'             // Pool/spa covers to reduce evaporation
  | 'leak_detection'          // Smart leak detection devices
  | 'water_audit'             // Professional water use assessments
  | 'appliance_rebate'        // Efficient washers, dishwashers
  | 'landscape_transformation'// Native/drought-tolerant landscaping
```

### 2.3 Use Case Taxonomy

```typescript
type WaterUseCase =
  // Outdoor Uses
  | 'landscape_irrigation'
  | 'subsurface_irrigation'
  | 'drip_irrigation'
  | 'garden_vegetables'
  | 'garden_non_edibles'
  | 'lawn_watering'
  | 'tree_watering'
  | 'car_washing'
  | 'pool_filling'

  // Indoor Uses
  | 'toilet_flushing'
  | 'urinal_flushing'
  | 'laundry_washing'
  | 'potable_drinking'        // Rainwater only with treatment
  | 'cooking'                 // Rainwater only with treatment

  // Other Uses
  | 'fire_suppression'
  | 'hvac_cooling'
  | 'groundwater_recharge'
  | 'livestock_watering'
  | 'aquaculture'
```

### 2.4 Legal Status Taxonomy (Unified)

```typescript
type LegalStatus =
  | 'legal_no_permit'         // Explicitly allowed, no permit needed
  | 'legal_with_permit'       // Allowed with standard permit
  | 'legal_tiered'            // Tiered permit system by volume
  | 'legal_conditional'       // Allowed under specific conditions
  | 'local_discretion'        // Up to local jurisdictions
  | 'restricted'              // Significant limitations
  | 'prohibited'              // Explicitly banned
  | 'unregulated'             // No specific regulations
  | 'emerging'                // New regulations in development
```

### 2.5 Incentive Type Taxonomy (Extended)

```typescript
type IncentiveType =
  | 'rebate'                  // Direct cash back
  | 'grant'                   // Non-repayable funding
  | 'tax_credit_state'        // State income tax credit
  | 'tax_credit_federal'      // Federal income tax credit
  | 'tax_exemption_property'  // Property tax reduction
  | 'tax_exemption_sales'     // Sales tax exemption on equipment
  | 'low_interest_loan'       // Subsidized financing
  | 'free_equipment'          // Free rain barrels, etc.
  | 'fee_waiver'              // Permit/impact fee waivers
  | 'density_bonus'           // Development incentives
```

---

## 3. Schema Migration Plan

### 3.1 New Dataset Structure

**Option A: Single Unified Dataset (Recommended)**
```
water_sustainability/
  ├── laws_master              # All water laws (with resource_type)
  ├── programs_master          # All incentive programs (with resource_type)
  ├── regulations_master       # Jurisdiction regulations (with resource_type)
  ├── permits_master           # Permit requirements (with resource_type)
  ├── jurisdiction_hierarchy   # Geographic hierarchy (unchanged)
  └── resource_type_metadata   # Category definitions & metadata
```

**Option B: Category-Specific Tables**
```
water_sustainability/
  ├── greywater_laws
  ├── rainwater_laws
  ├── stormwater_laws
  ├── greywater_programs
  ├── rainwater_programs
  └── ...
```

### 3.2 laws_master Schema (New Unified Table)

```sql
CREATE TABLE water_sustainability.laws_master (
  -- Identification
  law_id STRING NOT NULL,              -- e.g., "CA_STATE_RAINWATER"
  jurisdiction_id STRING NOT NULL,     -- e.g., "STATE_CA"
  resource_type STRING NOT NULL,       -- greywater, rainwater, stormwater, etc.

  -- Geographic
  state_code STRING NOT NULL,
  state_name STRING NOT NULL,

  -- Legal Status
  legal_status STRING,                 -- Unified legal status enum
  governing_code STRING,               -- Legal reference
  regulatory_classification STRING,    -- Classification category

  -- Permit Information
  permit_required STRING,              -- Yes, No, Tiered, Conditional
  permit_threshold_gallons INTEGER,    -- Volume threshold for permits
  permit_threshold_unit STRING,        -- 'gpd', 'total_capacity', etc.
  permit_explanation STRING,           -- Plain language explanation
  permit_process STRING,               -- Step-by-step process

  -- Allowed Uses
  indoor_use_allowed BOOLEAN,
  outdoor_use_allowed BOOLEAN,
  potable_use_allowed BOOLEAN,         -- NEW: For rainwater
  approved_uses ARRAY<STRING>,
  approved_system_types ARRAY<STRING>, -- NEW: System types allowed

  -- Restrictions
  key_restrictions ARRAY<STRING>,
  volume_limits STRING,                -- NEW: Collection limits
  storage_requirements STRING,         -- NEW: Tank requirements
  setback_requirements STRING,
  treatment_requirements STRING,

  -- Agency Information
  primary_agency STRING,
  agency_contact STRING,
  agency_phone STRING,
  government_website STRING,

  -- Content
  summary STRING,
  recent_changes STRING,
  effective_date DATE,

  -- Metadata
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  data_source STRING,
  last_verified DATE
);
```

### 3.3 programs_master Schema Updates

```sql
-- Add columns to existing programs_master
ALTER TABLE greywater_compliance.programs_master
ADD COLUMN resource_type STRING;        -- greywater, rainwater, stormwater, etc.

ALTER TABLE greywater_compliance.programs_master
ADD COLUMN resource_types ARRAY<STRING>; -- For multi-category programs

ALTER TABLE greywater_compliance.programs_master
ADD COLUMN eligible_system_types_array ARRAY<STRING>;

ALTER TABLE greywater_compliance.programs_master
ADD COLUMN eligible_uses ARRAY<STRING>;
```

---

## 4. Rainwater Harvesting Data Requirements

### 4.1 State-Level Regulation Categories

**Category A: Unrestricted (No Permit Required)**
- States: Texas, Ohio, Rhode Island, Virginia, most others
- Collection: Unlimited from own roof
- Uses: Any non-potable use
- Storage: No limits

**Category B: Registration/Notification Required**
- States: Colorado (post-2016), Utah
- Collection: Limited gallons (e.g., 110 gal CO, 2,500 gal UT)
- Uses: Outdoor irrigation only (typically)
- Notes: Must register system

**Category C: Permit Required**
- States: Arkansas (some areas), Arizona (for potable)
- Collection: Varies by permit
- Uses: May include potable with treatment

**Category D: Incentivized**
- States: Texas (tax exemption), Arizona (tax credit), California (rebates)
- Programs: Rebates, tax breaks, free equipment

### 4.2 Key Rainwater Regulation Fields

| Field | Description | Example Values |
|-------|-------------|----------------|
| `collection_legal` | Is collection allowed? | true/false |
| `max_collection_gallons` | Volume limit | 110, 2500, unlimited |
| `roof_only` | Must be from roof? | true/false |
| `potable_allowed` | Drinking water use? | true/false |
| `potable_treatment_required` | Treatment for potable | "NSF 53/58", "UV + filtration" |
| `first_flush_required` | Roof washing required? | true/false |
| `tank_requirements` | Storage specifications | "Covered, mosquito-proof" |
| `signage_required` | Labeling requirements | "Non-potable water" signs |
| `backflow_prevention` | Cross-connection rules | Required/not required |
| `tax_incentive` | Tax benefits | "Sales tax exempt", "25% credit" |

### 4.3 Rainwater Data Sources to Research

1. **ARCSA** (American Rainwater Catchment Systems Association)
   - State-by-state regulations guide
   - URL: https://www.arcsa.org/

2. **NCSL** (National Conference of State Legislatures)
   - State rainwater harvesting laws database
   - URL: https://www.ncsl.org/environment-and-natural-resources/state-rainwater-harvesting-laws

3. **State Environmental Agencies**
   - Primary sources for current regulations

4. **University Extension Services**
   - Texas A&M, Arizona Cooperative Extension, etc.

---

## 5. Conservation Programs Data Requirements

### 5.1 Key Difference from Greywater/Rainwater

Conservation programs are **incentive-only** - they don't have state laws or regulations like greywater and rainwater. Instead, they're utility-sponsored or municipal rebate programs. This means:

- No `laws_master` entries needed for conservation
- Only `programs_master` entries with `resource_type = 'conservation'`
- Programs are tied to water utilities/districts, not state regulations

### 5.2 Conservation Program Categories

| Category | Description | Typical Rebate |
|----------|-------------|----------------|
| `turf_removal` | Replace lawn with drought-tolerant landscaping | $1-4 per sq ft |
| `smart_irrigation` | Weather-based controllers, drip conversion | $50-200 |
| `efficient_fixtures` | WaterSense toilets, showerheads, faucets | $25-100 per fixture |
| `pool_covers` | Reduce evaporation from pools/spas | $25-100 |
| `leak_detection` | Smart water monitors, leak sensors | $50-150 |
| `water_audit` | Professional water use assessment | Free or rebated |
| `appliance_rebate` | High-efficiency washers, dishwashers | $50-300 |
| `landscape_transformation` | Native/xeriscape design assistance | Varies |

### 5.3 Conservation Program Schema Fields

```sql
-- Additional fields for conservation programs in programs_master
program_subtype STRING,           -- turf_removal, smart_irrigation, etc.
min_area_sqft INTEGER,            -- Minimum area for turf removal
max_area_sqft INTEGER,            -- Maximum rebatable area
per_unit_amount FLOAT,            -- e.g., $2 per sq ft
unit_type STRING,                 -- 'sq_ft', 'per_device', 'flat_rate'
water_utility STRING,             -- Sponsoring utility name
utility_service_area STRING,      -- Geographic coverage
```

### 5.4 Conservation Data Sources

1. **Water utility websites** - LADWP, SFPUC, EBMUD, etc.
2. **SoCalWaterSmart.com** - Metropolitan Water District programs
3. **WaterSense (EPA)** - Federal rebate program database
4. **State water agency sites** - DWR, TWDB, etc.

---

## 6. Implementation Phases

### Phase 1: Schema Foundation

**Goal:** Add `resource_type` support without breaking existing functionality

**Tasks:**
1. Create `water_sustainability` dataset in BigQuery
2. Create `laws_master` table with unified schema
3. Create `resource_type_metadata` table
4. Migrate existing greywater_laws data with `resource_type = 'greywater'`
5. Add `resource_type` column to `programs_master`
6. Update existing programs with `resource_type = 'greywater'`

**Deliverables:**
- New BigQuery dataset and tables
- Migration scripts
- No frontend changes (backward compatible)

### Phase 2: Rainwater Data Population

**Tasks:**
1. Research rainwater regulations for all 50 states
2. Create `rainwater-state-directory.json` source file
3. Write upload script for rainwater laws
4. Research rainwater incentive programs
5. Add rainwater programs to `programs_master`
6. Verify data accuracy with primary sources

**Deliverables:**
- Complete rainwater laws for 50 states
- Rainwater incentive programs database
- Data verification documentation

### Phase 3: API Updates

**Tasks:**
1. Update `/api/greywater-directory/` routes to accept `resource_type` parameter
2. Create new `/api/water-directory/` routes (future-proof naming)
3. Add resource type filtering to compliance endpoint
4. Update hierarchy endpoint for multi-resource queries
5. Backward compatibility: Default to 'greywater' if no type specified

**API Changes:**
```typescript
// Before
GET /api/greywater-directory/compliance?state=CA

// After (with backward compatibility)
GET /api/water-directory/compliance?state=CA&resource_type=rainwater
GET /api/water-directory/compliance?state=CA&resource_type=greywater
GET /api/water-directory/compliance?state=CA  // Defaults to all types
```

### Phase 4: Frontend Updates

**Tasks:**
1. Add resource type selector/filter to directory UI
2. Update `SimpleDirectoryView` to handle multiple resource types
3. Create category-specific icons and color coding
4. Update state detail pages for multi-resource display
5. Add combined view showing all water resources
6. Update SEO metadata for new pages

**UI Components:**
- Resource type tabs/filter chips
- Category badges on programs
- Unified compliance summary cards
- Resource-specific detail sections

### Phase 5: Conservation Programs Expansion (Future)

**General Conservation:**
- WaterSense fixture rebates
- Turf removal / landscape transformation programs
- Smart irrigation controller rebates
- Water audit programs
- Drought response incentives
- Appliance rebate programs (washers, dishwashers)

---

## 7. URL Structure & Routing

### Current Routes
```
/directory                          # Directory home
/directory/[state]                  # State detail
/directory/[state]/[county]         # County detail
/directory/[state]/[county]/[city]  # City detail
```

### Proposed Routes (Option A: Query Parameters)
```
/directory?type=rainwater           # Filtered by resource type
/directory/CA?type=rainwater        # State + filter
/directory/CA/los-angeles/la?type=greywater,rainwater  # Multi-select
```

### Proposed Routes (Option B: Path-Based)
```
/directory/rainwater                # Rainwater directory home
/directory/rainwater/CA             # State rainwater laws
/directory/greywater/CA             # State greywater laws
/directory/all/CA                   # All water resources for state
```

**Recommendation:** Option A (query parameters) for flexibility and SEO benefits of keeping location hierarchy intact.

---

## 8. Data Model Diagrams

### Entity Relationship

```
┌─────────────────────┐
│ resource_type_meta  │
│ ─────────────────── │
│ type_id (PK)        │
│ display_name        │
│ description         │
│ icon                │
│ color               │
└──────────┬──────────┘
           │
           │ 1:M
           ▼
┌─────────────────────┐         ┌─────────────────────┐
│ laws_master         │         │ programs_master     │
│ ─────────────────── │         │ ─────────────────── │
│ law_id (PK)         │         │ program_id (PK)     │
│ jurisdiction_id (FK)│◄───────►│ jurisdiction_id     │
│ resource_type (FK)  │         │ resource_type (FK)  │
│ state_code          │         │ program_name        │
│ legal_status        │         │ incentive_type      │
│ ...                 │         │ ...                 │
└──────────┬──────────┘         └─────────────────────┘
           │
           │ M:1
           ▼
┌─────────────────────┐
│ jurisdiction_hier   │
│ ─────────────────── │
│ jurisdiction_id (PK)│
│ state_code          │
│ county_name         │
│ city_name           │
│ ...                 │
└─────────────────────┘
```

### API Response Structure

```json
{
  "status": "success",
  "location": {
    "state": "CA",
    "county": "Los Angeles",
    "city": "Santa Monica"
  },
  "resources": {
    "greywater": {
      "legal_status": "legal_conditional",
      "permit_required": "Conditional",
      "permit_explanation": "No permit for laundry-to-landscape...",
      "approved_uses": ["subsurface_irrigation", "toilet_flushing"],
      "incentives": [
        {
          "program_name": "SoCal Water Smart Greywater Rebate",
          "incentive_type": "rebate",
          "amount_max": 250
        }
      ]
    },
    "rainwater": {
      "legal_status": "legal_no_permit",
      "permit_required": "No",
      "permit_explanation": "Rainwater collection is legal without permits...",
      "approved_uses": ["landscape_irrigation", "garden_vegetables"],
      "incentives": [
        {
          "program_name": "Rain Barrel Rebate",
          "incentive_type": "rebate",
          "amount_max": 75
        }
      ]
    },
    "conservation": {
      "incentives": [
        {
          "program_name": "Turf Removal Rebate",
          "incentive_type": "rebate",
          "amount_max": 3000,
          "program_subtype": "turf_removal"
        },
        {
          "program_name": "Smart Irrigation Controller Rebate",
          "incentive_type": "rebate",
          "amount_max": 200,
          "program_subtype": "smart_irrigation"
        },
        {
          "program_name": "High-Efficiency Toilet Rebate",
          "incentive_type": "rebate",
          "amount_max": 100,
          "program_subtype": "efficient_fixtures"
        }
      ]
    }
  },
  "effective": {
    // Most specific regulations combining all sources
  }
}
```

---

## 9. Migration Scripts Needed

### Script 1: Create New Dataset
```bash
scripts/create-water-sustainability-dataset.js
```

### Script 2: Migrate Greywater Laws
```bash
scripts/migrate-greywater-to-laws-master.js
```

### Script 3: Add Resource Type to Programs
```bash
scripts/add-resource-type-to-programs.js
```

### Script 4: Upload Rainwater Laws
```bash
scripts/upload-rainwater-laws.js
```

### Script 5: Add Rainwater Programs
```bash
scripts/add-rainwater-programs.js
```

---

## 10. Testing Checklist

### Data Integrity
- [ ] All 50 states have greywater laws with resource_type
- [ ] All existing programs have resource_type assigned
- [ ] Rainwater laws populated for all 50 states
- [ ] Jurisdiction IDs consistent across tables
- [ ] No duplicate program entries

### API Functionality
- [ ] Backward compatible (no resource_type = returns greywater)
- [ ] Resource type filtering works correctly
- [ ] Multi-resource queries return combined data
- [ ] Performance acceptable (<500ms response)

### Frontend
- [ ] Resource type filter displays correctly
- [ ] Category badges show on programs
- [ ] State pages show all resources
- [ ] SEO metadata updated
- [ ] Mobile responsive

---

## 11. Success Metrics

1. **Data Coverage:** 50 states × 2 resource types (greywater + rainwater) = 100 law entries
2. **Rainwater Programs:** 50+ rainwater incentive programs added
3. **Conservation Programs:** 100+ conservation rebate programs added
4. **API Performance:** <500ms p95 latency
5. **User Engagement:** Resource filter usage tracking
6. **SEO:** Indexed pages for rainwater + greywater + conservation per state

---

## Appendix A: Rainwater Harvesting Quick Reference

### States with Explicit Rainwater Laws (as of 2024)

| State | Status | Notes |
|-------|--------|-------|
| Arizona | Legal + Incentivized | Tax credit up to $1,000 |
| California | Legal | No restrictions, rebates available |
| Colorado | Legal (Limited) | 110 gallons max, 2 barrels |
| Florida | Legal | No permit for residential |
| Georgia | Legal | No restrictions |
| Illinois | Legal | Chicago requires permits |
| Nevada | Legal | Encouraged, some rebates |
| Ohio | Legal | No restrictions |
| Oregon | Legal | Potable use requires permit |
| Texas | Legal + Incentivized | Sales tax exempt, some rebates |
| Utah | Legal (Limited) | 2,500 gallons max |
| Virginia | Legal | No restrictions |
| Washington | Legal | No permit for <5,000 gal |

### States Requiring Further Research

Most states have no explicit rainwater laws (collection is legal by default), but specific regulations may exist for:
- Potable use
- Large commercial systems
- Historic water rights states (Western US)

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **First Flush** | Initial runoff from roof that may contain contaminants |
| **Potable** | Safe for human consumption/drinking |
| **Non-potable** | Not safe for drinking but usable for irrigation, etc. |
| **GPD** | Gallons per day |
| **NSF 350** | Certification standard for greywater treatment systems |
| **NSF 53/58** | Certification for drinking water treatment |
| **Cistern** | Large water storage tank |
| **Purple Pipe** | Color-coded piping for non-potable water |
| **WaterSense** | EPA program certifying water-efficient fixtures |
| **Turf Removal** | Replacing lawn grass with drought-tolerant landscaping |
| **Xeriscape** | Landscaping designed to reduce irrigation needs |
| **Smart Controller** | Weather-based irrigation controller that adjusts watering |
| **Laundry-to-Landscape** | Simple greywater system routing washing machine water to plants |
| **Rain Barrel** | Small container (typically 50-100 gal) for collecting rainwater |

---

*Document Version: 1.0*
*Created: 2024*
*Author: Claude Code*
