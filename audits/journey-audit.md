# User Journey Audit Report
## Water Wise Group - Water Conservation Directory

**Audit Date:** 2026-01-12
**Auditor:** Claude Code
**Scope:** Homepage to Directory/Location pages user journeys

---

## 1. Site Map / Page Hierarchy

### Complete Site Structure

```
waterwisegroup.com/
|
+-- Homepage (/)
|   +-- Hero with "Explore Systems" CTA
|   +-- Water Source Selector (leads to lead form modal)
|   +-- Products showcase
|   +-- Testimonials, Newsletter
|
+-- Directory (/directory)
|   +-- Lists all 50 states by region
|   +-- Shows legal status badges + rebate counts
|   +-- Links to state hub pages
|
+-- State Hub Pages (/[state-code])          # e.g., /ca, /tx, /az
|   +-- Overview of state regulations
|   +-- Greywater summary card -> links to /ca/greywater
|   +-- Rainwater summary card -> links to /ca/rainwater
|   +-- Incentive programs list (expandable)
|   +-- City search/browser (links to city pages)
|   +-- Permit section
|
+-- State Spoke Pages
|   +-- /[state]/greywater     # Deep-dive on greywater laws
|   +-- /[state]/rainwater     # Deep-dive on rainwater laws
|
+-- City Hub Pages (/[state]/[city])         # e.g., /ca/los-angeles
|   +-- City-specific regulations (inherits state data)
|   +-- City/County/State rebates aggregated
|   +-- Permit details (when available)
|   +-- Links to greywater/rainwater spoke pages
|
+-- City Spoke Pages
|   +-- /[state]/[city]/greywater
|   +-- /[state]/[city]/rainwater
|
+-- Products (/products, /products/[handle])
+-- Solutions (/solutions, /solutions/[type])
+-- Blog (/blog, /blog/[slug])
+-- Static pages (about, contact, shipping, returns, privacy, terms)
```

### Page Relationships (Hub & Spoke Model)

```
                    /directory
                         |
         +---------------+---------------+
         |               |               |
      /ca             /tx             /az     ... (50 states)
    (State Hub)    (State Hub)    (State Hub)
         |
    +----+----+
    |         |
/ca/greywater  /ca/rainwater
  (Spoke)       (Spoke)
         |
    +----+----+----+
    |         |    |
/ca/los-angeles  /ca/san-diego  ... (cities)
   (City Hub)      (City Hub)
         |
    +----+----+
    |         |
/ca/los-angeles/greywater  /ca/los-angeles/rainwater
       (Spoke)                   (Spoke)
```

---

## 2. Key User Personas and Goals

### Persona 1: "Research-Ready Homeowner" (Sarah)
- **Profile:** California homeowner, drought-conscious, considering greywater system
- **Primary Goal:** Determine if greywater is legal in her city and what permits are needed
- **Secondary Goal:** Find out if there are rebates to offset costs
- **Technical Level:** Low-medium; needs plain language
- **Time Budget:** 5-10 minutes to get key answers

### Persona 2: "Rebate Hunter" (Mike)
- **Profile:** Budget-conscious homeowner, already decided on water conservation
- **Primary Goal:** Find and maximize available rebates before purchasing
- **Secondary Goal:** Understand what documentation is needed for rebate application
- **Technical Level:** Medium; comfortable with research
- **Time Budget:** 15-20 minutes for thorough rebate exploration

### Persona 3: "DIY Installer" (Alex)
- **Profile:** Handy homeowner, wants to install a laundry-to-landscape system
- **Primary Goal:** Understand if DIY is allowed and what the permit process looks like
- **Secondary Goal:** Find specific permit forms and application URLs
- **Technical Level:** High; wants technical details
- **Time Budget:** 20-30 minutes for complete planning

### Persona 4: "Quick Checker" (Pat)
- **Profile:** Curious visitor, early research phase
- **Primary Goal:** Quick answer to "Is greywater legal in my state?"
- **Secondary Goal:** General understanding of greywater benefits
- **Technical Level:** Varies
- **Time Budget:** 2-3 minutes for yes/no answer

---

## 3. User Journeys for Key Questions

### Journey 1: "Is greywater legal in my city?"

**Path A: Via Navigation (Optimal)**
```
Homepage -> Nav "How it Works" dropdown -> "State Laws" -> /greywater-laws (BROKEN LINK!)
```
- **Issue:** The `/greywater-laws` link in navigation doesn't exist as a page
- **Clicks Required:** 2 (if it worked)
- **Friction:** HIGH - Dead end

**Path B: Via Footer**
```
Homepage -> Footer "Water Laws by State" -> /ca -> State Hub Page -> See "Greywater Regulations" card
```
- **Clicks Required:** 2-3
- **Info Density:** State hub shows legal status + permit threshold on first view
- **Friction:** LOW - Direct path works well

**Path C: Via Directory**
```
Homepage -> ??? (No direct link to /directory from homepage or main nav!)
-> Direct URL /directory -> State card -> State Hub -> Greywater card
```
- **Clicks Required:** 3+ (if user knows to type /directory)
- **Friction:** HIGH - Directory is not discoverable

**Path D: For City-Specific Answer**
```
Footer -> /ca -> Scroll to cities list -> Search for city -> /ca/los-angeles -> City Hub
```
- **Clicks Required:** 4
- **Info Density:** City page shows state regulations (city-specific data may be limited)
- **Friction:** MEDIUM - Cities list can be overwhelming

### Journey 2: "What rebates can I get?"

**Path A: Starting from Homepage**
```
Homepage -> Footer "Water Laws by State" -> /ca -> State Hub -> Incentives section
OR
Homepage -> ??? -> /directory -> State card shows "X rebates" badge -> Click state -> Incentives
```
- **Clicks Required:** 2-3
- **Info Density:** State hub shows all incentives with expandable details
- **Friction:** MEDIUM - No "Rebates" or "Incentives" link in main navigation

**Path B: For City-Specific Rebates**
```
State Hub -> Cities list -> Click city -> City Hub -> Incentives section
```
- **Clicks Required:** 4 from homepage
- **Info Density:** City page aggregates state + county + city incentives
- **Friction:** MEDIUM - Must navigate through state first

**Key Issue:** Users cannot directly search "rebates in [city]" - must navigate through geographic hierarchy

### Journey 3: "Do I need a permit?"

**Path A: State-Level Answer**
```
State Hub page -> Greywater card shows "Permit Required: Over X GPD"
```
- **Clicks Required:** 2 from homepage
- **Info Density:** Clear yes/no with threshold shown
- **Friction:** LOW

**Path B: City-Level Permit Details**
```
State Hub -> City -> City Hub -> May show permit section OR
State Hub -> City -> /[city]/greywater -> Detailed permit info
```
- **Clicks Required:** 3-4
- **Info Density:** Full permit details (fees, forms, contacts) when data exists
- **Friction:** MEDIUM - Data availability varies by city

---

## 4. Friction Points Analysis

### Critical Issues

| Issue | Location | Impact | Priority |
|-------|----------|--------|----------|
| **Broken navigation link** | "State Laws" -> /greywater-laws | Dead end for users seeking legal info | P0 |
| **Directory not discoverable** | No link to /directory from homepage or nav | Users cannot find the main regulatory directory | P0 |
| **No search functionality** | Directory, state pages | Cannot search by city name globally | P1 |
| **No direct "Rebates" entry point** | Navigation | Users seeking rebates must navigate through states | P1 |

### Medium-Impact Issues

| Issue | Location | Impact | Priority |
|-------|----------|--------|----------|
| Cities list can be overwhelming | State hub pages | 30+ cities shown initially, pagination hidden | P2 |
| Redundant data between hub and spoke | State hub vs /state/greywater | Same info appears in slightly different format | P2 |
| Mobile city search UX | State hub pages | Small search input, hard to type on mobile | P2 |
| Inconsistent CTA placement | Hub vs Spoke pages | "View Products" CTAs vary in placement | P3 |

### Low-Impact Issues

| Issue | Location | Impact | Priority |
|-------|----------|--------|----------|
| No breadcrumb on directory page | /directory | Users can't see they're in directory section | P3 |
| County information inconsistent | City pages | Some show county, some don't | P3 |
| Data confidence badges unclear | Hub pages | "Partial Data" meaning not explained | P3 |

---

## 5. Redundant Information Analysis

### Information Shown at Multiple Levels

| Data Element | Directory | State Hub | State Spoke | City Hub | City Spoke |
|--------------|-----------|-----------|-------------|----------|------------|
| Legal Status | Badge only | Card + detail | Full section | Inherited | Full section |
| Permit Required | - | Summary | Detailed | Summary | Detailed |
| Rebate Count | Badge | Full list | Filtered list | Full list | Filtered list |
| Approved Uses | - | Tags | Detailed list | Tags | Detailed list |
| Key Restrictions | - | 3 items | Full list | 3 items | Full list |
| Agency Contact | - | Footer | Full section | Footer | Full section |
| Governing Code | - | Link | Link + context | Link | Link + context |

### Redundancy Assessment

**Appropriate Redundancy:**
- Legal status shown at every level (users expect this)
- Rebate counts as badges (good for scanning)

**Excessive Redundancy:**
- Spoke pages repeat 80%+ of hub page content
- Same permit threshold shown in card AND inline
- Agency contact repeated in multiple sections

**Missing Progressive Disclosure:**
- Hub pages should tease, spokes should detail
- Currently, hub pages show too much detail

---

## 6. Missing CTAs and Unclear Next Steps

### Homepage

| Section | Current CTA | Missing/Needed |
|---------|-------------|----------------|
| Hero | "Explore Systems", "How It Works" | "Check Your Local Laws" or "Find Rebates" |
| Water Source Selector | "Get Started" (leads to form) | "Check Legality in My Area" option |
| Trust Indicators | None | Could link to directory |

### Directory Page

| Section | Current CTA | Missing/Needed |
|---------|-------------|----------------|
| State cards | Click to navigate | "Compare States" option |
| Bottom CTA | "Browse Systems", "Get Expert Help" | "Find My City" quick search |

### State Hub Page

| Section | Current CTA | Missing/Needed |
|---------|-------------|----------------|
| Greywater card | "Full details" -> spoke | Clear (good) |
| Rainwater card | "Full details" -> spoke | Clear (good) |
| Incentives | "Apply Now" per program | "Download All Rebates" summary |
| Cities list | Click city name | "Search all cities" more prominent |
| After city exploration | None | "Still have questions? Chat with us" |

### City Hub Page

| Section | Current CTA | Missing/Needed |
|---------|-------------|----------------|
| Regulations | Links to spokes | Clear (good) |
| Incentives | "Apply Now" per program | "Calculate My Savings" tool |
| Bottom | None visible | "Ready to Start?" -> Products or Contact |

### Spoke Pages

| Section | Current CTA | Missing/Needed |
|---------|-------------|----------------|
| After regulations | Limited | "Get a Quote for Your System" |
| Permit section | Links to forms | "Need Help with Permits? Contact Us" |
| End of page | None prominent | "Back to [City] Overview" or "Compare Products" |

---

## 7. Recommendations for Streamlining Journeys

### Priority 1: Fix Critical Navigation Issues

1. **Create /greywater-laws page OR fix navigation link**
   - Option A: Create a simple redirect from /greywater-laws to /directory
   - Option B: Change nav link to point to /directory with anchor #laws

2. **Add Directory to Main Navigation**
   - Add "Water Laws" or "Directory" as top-level nav item
   - Show state dropdown on hover (similar to Products)

3. **Add Directory Link to Homepage**
   - Hero section: Add "Check Your Local Regulations" button
   - Or: Add dedicated section before/after Water Source Selector

### Priority 2: Improve Search & Discovery

4. **Add Global City Search**
   - Search bar on directory page that searches all cities across all states
   - Autocomplete with format: "City, ST" (e.g., "Los Angeles, CA")

5. **Add "Rebates" Entry Point**
   - New nav item: "Rebates & Incentives"
   - Page that lists all rebates, filterable by state/city
   - Or: Prominent "Find Rebates" button on homepage

### Priority 3: Reduce Redundancy & Improve Spoke Pages

6. **Differentiate Hub vs Spoke Content**
   - Hub pages: Summary cards with key facts (2-3 sentences each)
   - Spoke pages: Full regulatory text, edge cases, detailed restrictions
   - Add "What You Need to Know" summary at top of spoke pages

7. **Add "Quick Answer" Sections**
   - Top of each spoke page: FAQ-style quick answers
   - "Is it legal? Yes/No. Do I need a permit? Under X GPD, no."

### Priority 4: Improve CTAs & Conversion Paths

8. **Add Contextual CTAs**
   - After rebates section: "Shop Systems That Qualify"
   - After permit section: "Need Installation Help? Get a Quote"
   - Bottom of every location page: Sticky "Ready to Start?" bar

9. **Add "Save for Later" or "Email Summary"**
   - Allow users to email themselves a summary of regulations + rebates
   - Captures lead while providing value

### Priority 5: Mobile Experience

10. **Improve Mobile Navigation**
    - Larger touch targets for city selection
    - Sticky header with "Search Cities" option
    - Collapsible sections for long incentive lists

---

## 8. Implementation Priority Matrix

| Recommendation | Effort | Impact | Priority Score |
|----------------|--------|--------|----------------|
| Fix /greywater-laws nav link | Low | High | **P0** |
| Add Directory to main nav | Low | High | **P0** |
| Add Directory link to homepage | Low | High | **P0** |
| Add global city search | Medium | High | **P1** |
| Add "Rebates" entry point | Medium | High | **P1** |
| Add contextual CTAs | Low | Medium | **P2** |
| Differentiate hub/spoke content | High | Medium | **P2** |
| Add quick answer sections | Medium | Medium | **P2** |
| Add "Email Summary" feature | High | Medium | **P3** |
| Improve mobile navigation | Medium | Medium | **P3** |

---

## 9. Appendix: Page-by-Page Content Inventory

### Directory Page (`/directory`)
- Hero with stats (X states, Y rebate programs)
- Tip for Ctrl+F search
- States grouped by region (West, Southwest, etc.)
- Each state card shows: name, code, legal status badge, rebate count
- Bottom CTA: "Browse Systems" / "Get Expert Help"

### State Hub Page (`/[state]`)
- Breadcrumb (Home > State)
- Hero with state name and description
- Data confidence badge
- LocationContextCard component (rebates banner, utilities)
- Two-column grid: Greywater card | Rainwater card
- Incentives section with expandable program details
- City browser with search (30 shown initially)
- Permit section (when data available)

### State Spoke Pages (`/[state]/greywater`, `/[state]/rainwater`)
- Breadcrumb (Home > State > Greywater/Rainwater)
- Hero specific to resource type
- Full regulation details
- Approved uses list
- Key restrictions list
- Agency contact information
- Related incentives (filtered by resource type)

### City Hub Page (`/[state]/[city]`)
- Breadcrumb (Home > State > City)
- Hero with city and state name
- LocationContextCard
- Two-column grid: Greywater card | Rainwater card
- Incentives (aggregated from city + county + state)
- Permit section (when city-specific data available)
- FAQ schema markup for SEO

### City Spoke Pages (`/[state]/[city]/greywater`, `/[state]/[city]/rainwater`)
- Breadcrumb (Home > State > City > Greywater/Rainwater)
- Full regulation details (inherits state + local overrides)
- Permit process details (when available)
- Local agency contacts
- Filtered incentives

---

## 10. Summary

The Water Wise Group directory has a well-structured hub-and-spoke architecture for SEO, but suffers from **discoverability issues** that prevent users from finding the directory content. The three highest-priority fixes are:

1. **Fix the broken /greywater-laws navigation link** - Currently leads to 404
2. **Add Directory to main navigation** - Currently completely hidden
3. **Add Directory access from homepage** - No path exists today

Secondary improvements should focus on:
- Global city search functionality
- Dedicated rebates entry point
- Contextual CTAs throughout location pages

The hub/spoke content model works well structurally, but pages contain too much redundant information. Spoke pages should differentiate more clearly from hub pages by providing deeper detail rather than repeating the same summaries.
