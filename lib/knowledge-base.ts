// Water Wise Group Knowledge Base for RAG Customer Service
// Comprehensive content from waterwisegroup.com for AI chatbot

export interface KnowledgeSection {
  title: string;
  content: string;
  keywords: string[];
}

export const knowledgeBase: KnowledgeSection[] = [
  // ============================================
  // COMPANY INFORMATION
  // ============================================
  {
    title: "About Water Wise Group",
    content: `Water Wise Group, Inc. is a wholesale distributor headquartered in Atlanta, Georgia, specializing in greywater recycling systems for residential and commercial use. Founded and owned by Sam Wilhoit, the company became the exclusive U.S. distributor of Aqua2use Greywater Systems in March 2010 through a distribution agreement with Matala Water Technology Co., Ltd. Our mission is to help conserve our most precious resource — clean water, making greywater reuse accessible, affordable, and sustainable for every home. Our motto is "Pay once, use twice." We maintain a California warehouse for nationwide shipping and offer 24/7 customer service. Since 2010, we've sold over 5,000 systems.`,
    keywords: ["company", "about", "who", "water wise", "atlanta", "sam wilhoit", "founded", "history", "matala"]
  },
  {
    title: "Contact Information",
    content: `You can reach Water Wise Group at:
- Email: sales@waterwisegroup.com
- Phone: (678) 809-3008
- Location: Atlanta, GA 30068
- Hours: 24/7 customer service available
All products come with a 1-year manufacturer warranty. For technical support, warranty claims, or order inquiries, our team is available to assist.`,
    keywords: ["contact", "phone", "email", "address", "location", "warranty", "support", "help", "reach", "call"]
  },

  // ============================================
  // PRODUCTS - DETAILED SPECIFICATIONS
  // ============================================
  {
    title: "Aqua2use GWDD - Grey Water Diversion Device (Gravity Model)",
    content: `The Aqua2use GWDD Gravity model is priced at $625. This is our entry-level greywater system ideal for homes where the system can be placed below the fixtures (gravity-fed). Features include:
- 4-stage Matala biofilm filtration system
- Recommended for 1-2 fixtures (washing machine, shower, or bathroom sink)
- No pump required - uses gravity for water flow
- Overflow bypass protection (diverts to sewer if system is full)
- Compatible with drip irrigation systems
- Low maintenance design
- Perfect for single-story homes or basements
This system is ideal for homeowners who want an affordable entry into greywater reuse without the complexity of a pumped system.`,
    keywords: ["gwdd", "gravity", "625", "basic", "entry", "affordable", "no pump", "single story", "basement"]
  },
  {
    title: "Aqua2use GWDD - Grey Water Diversion Device (Pumped Model)",
    content: `The Aqua2use GWDD Pumped model is priced at $945. This version includes an integrated pump for situations where gravity feed isn't possible. Features include:
- 4-stage Matala biofilm filtration system
- Built-in pump for uphill water delivery
- Recommended for 1-2 fixtures (washing machine, shower, or bathroom sink)
- Overflow bypass protection
- Compatible with drip irrigation systems
- EPC (Electronic Pump Controller) for automatic operation
- Ideal for multi-story homes or when the system must be placed at fixture level
The pumped model is perfect when you need to push water uphill to your garden or when gravity installation isn't feasible.`,
    keywords: ["gwdd", "pumped", "945", "pump", "uphill", "multi-story", "epc"]
  },
  {
    title: "Aqua2use Pro Greywater System",
    content: `The Aqua2use Pro is our premium greywater diversion system priced at $2,695. Designed for larger households connecting 3 or more fixtures. Features include:
- Enhanced 4-stage Matala biofilm filtration with higher capacity
- Handles higher water volumes from multiple sources
- Commercial-grade pump system
- Suitable for: multiple bathrooms, laundry, and bathroom sinks simultaneously
- Ideal for larger families (5+ people)
- Best choice for maximizing whole-house greywater capture
- Professional installation recommended
This system is perfect for homeowners who want to capture greywater from throughout their entire home for maximum water savings.`,
    keywords: ["pro", "premium", "2695", "advanced", "large", "multiple fixtures", "3+", "commercial", "whole house", "big family"]
  },
  {
    title: "Replacement Filters",
    content: `Replacement filters for Aqua2use systems are available for $219.95. These maintain the 4-stage progressive filtration capabilities of your system. Filter replacement schedule depends on household size:
- 1-2 people: Every 150-180 days
- 3-4 people: Every 120-150 days
- 5+ people: Every 90-120 days
Signs you need new filters: reduced water pressure, longer pump run times, visible lint buildup, frequent pump cycling, or sediment accumulation.`,
    keywords: ["filter", "replacement", "219", "parts", "spare", "maintenance", "how often", "schedule"]
  },
  {
    title: "Greywater Pump Replacement",
    content: `Replacement pumps for the Aqua2use GWDD are available for $389.00. If your pump fails outside of warranty or after extended use, this is a direct replacement unit. Installation is straightforward - the pump lifts out of the unit and the new one drops in. If your pump hums but the impeller is stuck, try gently rotating the impeller with a screwdriver (after unplugging). If that doesn't work, replacement is needed.`,
    keywords: ["pump", "replacement", "389", "motor", "not working", "stuck", "humming"]
  },
  {
    title: "Greywater Drip Irrigation Kit",
    content: `The Greywater Drip Irrigation Kit - Standard is priced at $199.95. This complete kit is designed to work seamlessly with Aqua2use greywater systems for efficient yard and garden watering. Includes:
- Drip emitters rated for greywater use
- Mainline tubing
- Connectors and fittings
- Installation instructions
Drip irrigation is the most efficient way to use greywater as it delivers water directly to plant roots, minimizing evaporation and surface contact.`,
    keywords: ["drip", "irrigation", "kit", "199", "garden", "emitters", "tubing", "watering"]
  },

  // ============================================
  // PRICING COMPARISON & VALUE
  // ============================================
  {
    title: "Greywater System Pricing Comparison",
    content: `Here's how Aqua2use systems compare to alternatives:

DIY Laundry-to-Landscape: $100-$350
- No filtration, high maintenance, may not meet code

Branched Drain System: $800-$3,000
- Limited filtration, no pump, professional install required

Aqua2use GWDD Gravity: $625
- Full 4-stage filtration, drip-compatible, code-ready, low maintenance

Aqua2use GWDD Pumped: $945
- All GWDD features plus integrated pump for uphill delivery

Aqua2use Pro: $2,695
- High-capacity for 3+ fixtures, commercial-grade components

The Aqua2use delivers premium performance without the premium price - you get integrated filtration, overflow protection, and drip compatibility that cheaper alternatives lack.`,
    keywords: ["price", "cost", "compare", "comparison", "worth", "value", "diy", "alternative", "how much"]
  },
  {
    title: "Return on Investment",
    content: `An Aqua2use system can save up to 40,000 gallons of water per year, potentially reducing water bills by 30-40% depending on household size and garden usage. At average water rates, this means:
- Estimated annual savings: $200-$600 depending on local rates
- System payback period: 1-3 years
- Additional benefits: extended septic life, drought resilience, greener landscape
Beyond direct savings, greywater systems provide water security during droughts when municipal restrictions often prohibit landscape irrigation.`,
    keywords: ["roi", "savings", "payback", "worth it", "save money", "investment", "water bill"]
  },

  // ============================================
  // HOW GREYWATER WORKS
  // ============================================
  {
    title: "What is Greywater - Definition and Sources",
    content: `Greywater is relatively clean wastewater generated from household activities such as bathing, washing hands, and laundry. It is fundamentally different from blackwater, which originates from toilets and contains harmful pathogens.

Primary greywater sources:
- Washing machines
- Showers and bathtubs
- Bathroom sinks

NOT suitable for greywater systems:
- Kitchen sinks (food waste)
- Dishwashers (grease and food particles)
- Toilets (this is blackwater)

Greywater contains traces of dirt, soap, and hair but is safe for landscape irrigation when properly filtered. A typical household can generate 40,000+ gallons annually.`,
    keywords: ["greywater", "grey water", "gray water", "what is", "definition", "sources", "blackwater", "difference"]
  },
  {
    title: "How Aqua2use Systems Work",
    content: `Aqua2use greywater systems work through a simple process: Collect, Filter, Flourish.

1. COLLECT: Water from your shower, bathtub, bathroom sink, or washing machine is diverted from standard plumbing into the Aqua2use system via a 3-way diverter valve.

2. FILTER: The water passes through our 4-stage Matala biofilm filtration system:
   - Stage 1: Large debris capture
   - Stage 2: Medium particle filtration
   - Stage 3: Fine filtration
   - Stage 4: Biofilm polishing (beneficial bacteria break down organics)

3. FLOURISH: Filtered water is automatically pumped (or gravity-fed) to your landscape through drip irrigation or hose.

The system includes overflow bypass - if the tank fills faster than irrigation can handle, excess automatically diverts to your sewer connection.`,
    keywords: ["how", "work", "process", "stages", "filter", "collect", "divert", "automatic"]
  },
  {
    title: "Biofilm Filtration Technology Explained",
    content: `Matala biofilm filtration is considered the future of greywater reuse. Here's how it works:

Beneficial bacteria naturally colonize the filter media surfaces, forming a biofilm layer. As greywater passes through, these bacteria break down:
- Soap residues
- Organic matter
- Body oils
- Lint and hair particles

This biological process effectively treats water without chemicals. The 4-stage progressive filtration ensures water quality suitable for landscape irrigation while protecting plants and soil health.

Biofilm advantages over mechanical-only filtration:
- Self-maintaining bacterial colonies
- Continuous organic breakdown
- No chemical additives needed
- Longer filter life
- Better water quality output`,
    keywords: ["biofilm", "filtration", "bacteria", "matala", "technology", "how filter", "biological"]
  },
  {
    title: "Greywater Guidelines and Best Practices",
    content: `Important guidelines for greywater use:

DO:
- Use within 24 hours (prevents bacterial growth and odor)
- Apply directly to soil via drip irrigation
- Use for ornamental gardens, lawns, trees, and native plants
- Ensure water soaks into ground rather than pooling

DON'T:
- Store greywater more than 24 hours
- Use on vegetable gardens (food safety concern)
- Allow direct human or pet contact
- Let greywater run off property or into storm drains
- Use greywater from kitchen sinks or dishwashers

Unlike rainwater (seasonally dependent), greywater is available with every shower or laundry cycle, making it reliable for landscape maintenance year-round.`,
    keywords: ["guidelines", "rules", "best practices", "safe", "vegetables", "store", "storage", "24 hours"]
  },

  // ============================================
  // INSTALLATION
  // ============================================
  {
    title: "Installation Overview and Requirements",
    content: `Aqua2use systems can be installed by a handy homeowner or professional plumber. Basic installation steps:

1. Choose location for the Aqua2use unit (near fixtures, accessible for maintenance)
2. Install 3-way diverter valve on fixture drain lines
3. Connect collection plumbing from fixtures to unit inlet
4. Set up overflow connection to existing sewer/septic
5. Connect output to irrigation system or hose
6. For pumped models: connect power supply

Tools typically needed: pipe wrench, PVC cement, hacksaw, drill, level

Professional installation recommended for:
- Multiple fixture connections
- Complex plumbing configurations
- Unfamiliar with plumbing codes
- Aqua2use Pro systems

Assembly videos and detailed instructions are available at waterwisegroup.com/pages/how-to-assemble-aqua2use`,
    keywords: ["install", "installation", "setup", "diy", "plumber", "how to", "connect", "tools"]
  },
  {
    title: "Gravity vs Pumped Installation",
    content: `Choosing between gravity and pumped models:

GRAVITY MODEL ($625) - Best when:
- Aqua2use can be placed BELOW fixture level
- Irrigation area is at or below unit level
- Single-story home with outdoor access below bathroom
- Basement installation possible
- No electrical connection needed at unit location

PUMPED MODEL ($945) - Required when:
- Unit must be at same level as fixtures
- Garden is ABOVE unit location (uphill)
- Multi-story home without basement
- Indoor installation where gravity flow isn't possible
- Requires electrical outlet near unit

Rule of thumb: If water can flow downhill from fixtures to unit to garden, choose gravity. If not, you need pumped.`,
    keywords: ["gravity", "pumped", "which", "choose", "uphill", "downhill", "basement", "multi-story"]
  },

  // ============================================
  // MAINTENANCE - DETAILED
  // ============================================
  {
    title: "Maintenance Schedule by Household Size",
    content: `Regular maintenance keeps your Aqua2use system running optimally. Cleaning frequency depends on household occupancy:

1-2 PEOPLE: Clean every 150-180 days
3-4 PEOPLE: Clean every 120-150 days
5+ PEOPLE: Clean every 90-120 days

Signs to clean sooner:
- Reduced water pressure at irrigation
- Pump running longer than usual
- Visible lint buildup on filters
- Pump cycling frequently (short on/off cycles)
- Sediment accumulation in tank

Monthly quick checks:
- Verify diverter valve position
- Check inlet screen for debris
- Listen for normal pump operation
- Inspect irrigation lines for proper flow`,
    keywords: ["maintenance", "schedule", "how often", "clean", "frequency", "household", "people"]
  },
  {
    title: "Winterization - Complete Guide",
    content: `Winterization is CRITICAL in freezing climates to prevent damage. Follow these 7 steps:

1. POWER DOWN: Turn off power and unplug before any work

2. DIVERT FLOW: Set diverter valve to bypass/sewer mode

3. EMPTY TANK: Use drain fitting to remove ALL residual water

4. REMOVE COMPONENTS: Lift out pump pack, EPC (electronic controller), and floats

5. CLEAN GENTLY: Rinse filter media with clean water. Avoid wetting electrical boxes.

6. STORE PUMP CORRECTLY: Place pump in a bucket of clean water in a frost-free location
   WARNING: Do NOT store pump in RV antifreeze or propylene glycol - this damages seals

7. PROTECT TANK: Store filters indoors, or if leaving tank outside, ensure fully drained and insulated

In spring: Reverse process, reassemble, run test cycle before resuming normal use.`,
    keywords: ["winter", "winterize", "freeze", "freezing", "cold", "frost", "protect", "drain", "store"]
  },
  {
    title: "Troubleshooting Common Problems",
    content: `PUMP WON'T START:
- Check power connection and outlet
- Verify floats move freely (not stuck)
- Clean pump intake screens
- Run EPC float test (see manual)

PUMP HUMS BUT IMPELLER STUCK:
- Unplug first!
- Gently rotate impeller with flat screwdriver
- Never force - if stuck, replacement needed

PUMP STARTS & STOPS IMMEDIATELY:
- Clean around float switches
- Retest EPC function
- Check for stable voltage supply

TANK OVERFLOWING:
- Verify diverter valve position
- Check inlet port for obstructions
- Inspect overflow port for blockages

REDUCED FLOW/PRESSURE:
- Clean pre-filter screens
- Inspect irrigation lines for blockages
- Flush drip emitters
- Check for kinked tubing

EPC (ELECTRONIC CONTROLLER) ISSUES:
- The EPC is sealed and cannot be opened
- If moisture visible inside, replacement required
- Contact support: (678) 809-3008

For issues not resolved by these steps, contact Water Wise Group support.`,
    keywords: ["troubleshoot", "problem", "issue", "not working", "broken", "fix", "repair", "pump", "overflow", "stuck"]
  },

  // ============================================
  // DETERGENTS - DETAILED
  // ============================================
  {
    title: "Recommended Laundry Detergents for Greywater",
    content: `Using the right detergent is crucial for greywater systems and plant health.

HIGHLY RECOMMENDED:
- Oasis Laundry Detergent: Truly biocompatible, NO sodium compounds, designed specifically for greywater
- ECOS Liquid Laundry Detergent: Biodegradable, plant-based, only one sodium compound, essential oil scented
- Earth Breeze Laundry Sheets: Compact, plastic-free, low-salt formula

GOOD OPTIONS:
- 7th Generation Free & Clear: USDA certified biobased, low salt, fragrance-free
- Trader Joe's Liquid Laundry: Low salts, natural essential oils, no synthetics or dyes
- Ever Spring (Target): Clear formula, no dyes, budget-friendly

These products break down naturally, extend filter life, and protect your plants and soil.`,
    keywords: ["detergent", "laundry", "soap", "recommended", "best", "oasis", "ecos", "seventh generation"]
  },
  {
    title: "Detergents and Products to AVOID",
    content: `These products contain ingredients harmful to greywater systems and plants:

BRANDS TO AVOID:
- Tide (high salt concentration)
- Downy fabric softeners
- Gain (harsh cleaning agents)
- Most mainstream brands with "ultra" or "concentrated" formulas

INGREDIENTS TO AVOID:
- Salt-heavy compounds (anything starting with 'sodium')
- Borates/borax
- Phosphates
- Alkylbenzene
- Optical brighteners
- Artificial colorants/dyes
- Synthetic fragrances
- Chlorine bleach
- Fabric softeners
- Plastic-coated pods

Why this matters: High sodium damages soil structure, borates kill plants, and artificial additives don't break down, clogging your system and harming your landscape.`,
    keywords: ["avoid", "bad", "harmful", "tide", "downy", "gain", "sodium", "salt", "bleach", "softener"]
  },

  // ============================================
  // STATE LAWS - DETAILED
  // ============================================
  {
    title: "Arizona Greywater Laws",
    content: `Arizona has very progressive greywater regulations:

PERMIT REQUIREMENT: No permit needed for residential systems under 400 gallons/day

Type 1 Reclaimed Water General Permit allows private residential direct reuse with conditions:
- Must avoid human contact with greywater
- Proper system construction required
- Cannot discharge to surface waters
- Must have overflow to sewer/septic

NOTE: Arizona previously offered a 25% tax credit (up to $1,000) for greywater systems under ARS 43-1090.01, but this credit EXPIRED around 2017 and is no longer available.

Arizona is one of the most greywater-friendly states in the country with its permit-free Type 1 system allowing residential greywater reuse without bureaucratic hurdles.`,
    keywords: ["arizona", "az", "law", "permit", "legal", "tax credit", "400 gallons"]
  },
  {
    title: "California Greywater Laws",
    content: `California has simplified greywater regulations:

PERMIT REQUIREMENT: No permit required for single washing machine systems in single/two-family homes

Requirements for permit-exempt systems:
- Connected to clothes washer only
- Allows diversion to either irrigation OR building sewer
- Must have clearly labeled controls
- Single-family or two-family residence

For multi-fixture systems, a simple permit may be required depending on your county. Many California utilities offer rebates for greywater systems - check with your local water provider.

California's drought history has made it a leader in greywater-friendly policies.`,
    keywords: ["california", "ca", "law", "permit", "legal", "washing machine", "laundry"]
  },
  {
    title: "Texas Greywater Laws",
    content: `Texas allows residential greywater use:

PERMIT REQUIREMENT: No permit required for domestic use under 400 gallons/day

Texas definition includes water from:
- Clothes washing machines
- Showers and bathtubs
- Hand-washing sinks
- Bathroom sinks

NOT included (blackwater):
- Toilet waste
- Kitchen sinks with garbage disposals
- Dishwashers

Texas counties may have additional requirements - check with your local building department. The state is generally supportive of water conservation measures.`,
    keywords: ["texas", "tx", "law", "permit", "legal", "400 gallons"]
  },
  {
    title: "New Mexico Greywater Laws",
    content: `New Mexico supports greywater reuse:

PERMIT REQUIREMENT: No permit needed for flows under 250 gallons/day

Allowed uses:
- Household gardening
- Composting
- Landscape irrigation

Requirements:
- Must have overflow capability to sewage system
- Maintain at least 5 feet of groundwater separation
- Cannot create standing water or runoff

New Mexico's water scarcity has driven progressive greywater policies.`,
    keywords: ["new mexico", "nm", "law", "permit", "legal", "250 gallons"]
  },
  {
    title: "Greywater Laws - General Guidance",
    content: `Greywater regulations vary significantly by state, county, and even city. General guidance:

TYPICALLY PERMIT-FREE:
- Simple laundry-to-landscape systems
- Systems under 250-400 gallons/day
- Single fixture connections

MAY REQUIRE PERMITS:
- Multi-fixture systems
- Systems with subsurface irrigation
- Commercial applications

ALWAYS CHECK:
- State regulations
- County building codes
- City ordinances
- HOA restrictions

Water Wise Group maintains a Greywater State Laws Directory at waterwisegroup.com/blogs/greywater-laws. Contact your local building department before installation for the most current requirements.`,
    keywords: ["law", "legal", "permit", "regulation", "allowed", "code", "state", "county", "rules"]
  },

  // ============================================
  // APPLICATIONS
  // ============================================
  {
    title: "Greywater for Tiny Homes",
    content: `Aqua2use systems are ideal for tiny homes and small dwellings:

Why greywater makes sense for tiny homes:
- Limited water storage capacity
- Often off-grid or with limited utilities
- Every gallon matters
- Small footprint systems fit tight spaces

Recommended: Aqua2use GWDD ($625-$945)
- Compact design fits small spaces
- Handles typical tiny home water usage
- Works with 1-2 fixtures (perfect for tiny home bathroom + washer)
- Can extend limited water supply significantly

For mobile tiny homes, ensure proper winterization when moving to cold climates.`,
    keywords: ["tiny home", "tiny house", "small", "compact", "off-grid", "mobile"]
  },
  {
    title: "Greywater for RVs and Campers",
    content: `RV owners can benefit significantly from greywater recycling:

Benefits for RV use:
- Extend time between dump station visits
- Water plants at campsites
- Reduce environmental impact
- Make limited water supply last longer

Considerations:
- Portable or permanent installation options
- Weight considerations for travel
- Winterization essential for cold-weather camping
- Check campground rules about greywater discharge

The Aqua2use GWDD can be adapted for RV use, particularly for longer-term or stationary camping situations.`,
    keywords: ["rv", "camper", "motorhome", "travel", "mobile", "camping"]
  },
  {
    title: "Greywater and Septic Systems",
    content: `Greywater diversion can significantly benefit septic system owners:

Benefits of diverting greywater from septic:
- Reduces septic tank load by 40-60%
- Less frequent pumping required
- Reduces risk of system overload
- Extends septic system lifespan
- Prevents drain field saturation

In many jurisdictions, greywater CAN bypass the septic tank legally, but requirements vary. The Aqua2use system includes overflow protection that routes excess water to your septic if irrigation can't keep up.

This is especially valuable for:
- Older septic systems
- Properties with high water use
- Areas with high water tables
- Systems near capacity`,
    keywords: ["septic", "septic tank", "bypass", "pumping", "drain field", "overflow"]
  },
  {
    title: "Greywater for Off-Grid Living",
    content: `For off-grid properties, greywater systems are essential:

Off-grid benefits:
- Maximize limited water resources
- Reduce well pump usage
- Maintain landscape without using drinking water
- Essential for drought resilience

Off-grid considerations:
- Solar-compatible pumped systems available
- Gravity systems require no electricity
- Must plan for winterization in cold climates
- Combines well with rainwater harvesting

For cabins and off-grid homes without septic, greywater systems provide a responsible way to handle wastewater while benefiting your landscape.`,
    keywords: ["off-grid", "cabin", "remote", "well", "solar", "no septic", "rural"]
  },

  // ============================================
  // IRRIGATION
  // ============================================
  {
    title: "Greywater Drip Irrigation Setup",
    content: `Drip irrigation is the best method for distributing greywater:

Why drip is best:
- Delivers water directly to root zones
- Minimizes surface contact (safety)
- Reduces evaporation losses
- Prevents runoff
- Compatible with Aqua2use output

Our Greywater Drip Irrigation Kit ($199.95) includes everything needed. Key considerations:
- Use greywater-rated emitters (larger openings prevent clogging)
- Install filter at system output
- Flush lines periodically
- Avoid micro-spray or sprinkler heads (creates aerosols)

Greywater should NOT be used with:
- Lawn sprinklers
- Spray irrigation
- Any system creating mist or aerosols`,
    keywords: ["drip", "irrigation", "emitters", "garden", "water", "setup", "spray", "sprinkler"]
  },
  {
    title: "Plants Suitable for Greywater",
    content: `Greywater works well for most ornamental plants:

GREAT FOR GREYWATER:
- Fruit trees (citrus, apple, stone fruits)
- Native plants and shrubs
- Ornamental grasses
- Roses and flowering shrubs
- Lawns
- Established trees

AVOID USING GREYWATER ON:
- Vegetable gardens (food safety)
- Edible herbs
- Root vegetables
- Leafy greens
- Seedlings and young plants
- Acid-loving plants (if using high-pH soaps)

For edibles, stick to fruit trees and wash produce thoroughly. Leafy greens and root vegetables should use fresh water only.`,
    keywords: ["plants", "garden", "vegetables", "fruit", "trees", "lawn", "safe", "edible"]
  },

  // ============================================
  // SHIPPING & RETURNS
  // ============================================
  {
    title: "Shipping Information",
    content: `We ship from our California warehouse for fast nationwide delivery:

- Standard shipping: 5-7 business days
- Expedited options available at checkout
- Free shipping promotions run periodically
- All orders carefully packaged
- Tracking provided via email

Large items (Pro system, full kits) ship via freight. Signature may be required for high-value orders. International shipping available - contact us for quotes.`,
    keywords: ["shipping", "delivery", "ship", "how long", "tracking", "order", "days"]
  },
  {
    title: "Returns and Warranty Policy",
    content: `Returns:
- 30-day return window from delivery
- Products must be unused and in original packaging
- Contact us for return authorization before shipping
- Refund processed within 5-7 business days of receipt
- Customer responsible for return shipping unless defective

Warranty:
- 1-year manufacturer warranty on all Aqua2use products
- Covers defects in materials and workmanship
- Does NOT cover: freeze damage, improper installation, misuse
- Warranty claims require proof of purchase
- Contact (678) 809-3008 for warranty service

Extended warranty options may be available - ask at purchase.`,
    keywords: ["return", "refund", "warranty", "guarantee", "exchange", "money back", "defective"]
  },

  // ============================================
  // ADDITIONAL FAQs
  // ============================================
  {
    title: "Can I Store Greywater?",
    content: `Greywater should NOT be stored for more than 24 hours. Here's why:

Within 24 hours:
- Bacteria begin multiplying rapidly
- Nutrients break down, creating odors
- Water quality degrades significantly

Aqua2use systems are designed for immediate use - water flows in, gets filtered, and goes directly to irrigation. The tank is a processing chamber, not storage.

If you can't use greywater immediately:
- Divert to sewer/septic using the bypass valve
- Never store in barrels or tanks
- Unlike rainwater, greywater cannot be held for later use`,
    keywords: ["store", "storage", "tank", "barrel", "hold", "24 hours", "smell", "odor"]
  },
  {
    title: "Can Greywater Be Used for Pools?",
    content: `NO - Greywater should NEVER be used for swimming pools, hot tubs, or any water feature where human contact occurs.

Reasons:
- Greywater contains bacteria and soap residues
- Pool chemicals cannot adequately treat greywater contaminants
- Health codes prohibit this use universally
- Risk of skin irritation, eye problems, and illness

Greywater is safe for landscape irrigation only - not for any recreational water use.`,
    keywords: ["pool", "swimming", "hot tub", "spa", "fountain", "pond"]
  },
  {
    title: "Greywater System for Apartments or Condos",
    content: `Installing greywater systems in multi-unit buildings has challenges:

Considerations:
- HOA/building management approval required
- Shared plumbing may complicate installation
- May require modification to common areas
- Building codes may have specific requirements

Options:
- Portable washing machine greywater diverters (simplest)
- Dedicated systems for ground-floor units with garden access
- Building-wide systems (commercial-scale, requires professional design)

Contact us to discuss your specific situation - we can advise on feasibility.`,
    keywords: ["apartment", "condo", "rental", "hoa", "building", "multi-unit"]
  },
  {
    title: "Water Softener Compatibility",
    content: `Greywater from water softeners requires consideration:

Traditional salt-based softeners:
- Add sodium to water during regeneration
- High sodium can damage soil structure over time
- May harm salt-sensitive plants
- Best to bypass softened water or limit use

Salt-free conditioners:
- Generally compatible with greywater systems
- Don't add sodium to water
- Better choice for greywater applications

If you have a salt softener, consider:
- Connecting only the washing machine (uses less softened water)
- Using a softener bypass for greywater fixtures
- Choosing salt-tolerant plants for irrigation area`,
    keywords: ["water softener", "salt", "sodium", "hard water", "conditioner"]
  },
  {
    title: "Dishwasher Water - Can It Be Used?",
    content: `NO - Dishwasher water is NOT suitable for greywater systems.

Reasons:
- Contains food particles and grease
- Uses harsh detergents not safe for plants
- High temperatures can damage systems
- Difficult to filter effectively
- Most codes classify it closer to blackwater

Kitchen sinks with garbage disposals are also excluded for similar reasons. Stick to: showers, bathtubs, bathroom sinks, and washing machines for greywater collection.`,
    keywords: ["dishwasher", "kitchen", "sink", "garbage disposal", "food"]
  },
  {
    title: "Becoming a Greywater Installer",
    content: `Interested in installing greywater systems professionally?

Steps to become an installer:
1. Learn local plumbing codes and greywater regulations
2. Obtain appropriate plumbing or contractor licenses
3. Get trained on Aqua2use system installation
4. Consider certification programs in your state
5. Register with Water Wise Group as an authorized installer

We maintain a Greywater Installer Directory at waterwisegroup.com/pages/greywater-directory. Professional installers can be listed for customer referrals.

Contact us about installer training and partnership opportunities.`,
    keywords: ["installer", "contractor", "professional", "business", "certification", "license", "directory"]
  }
];

// Function to find relevant knowledge sections based on a query
export function findRelevantSections(query: string, maxSections: number = 4): KnowledgeSection[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);

  // Score each section based on keyword matches
  const scored = knowledgeBase.map(section => {
    let score = 0;

    // Check keyword matches (highest weight)
    for (const keyword of section.keywords) {
      if (queryLower.includes(keyword)) {
        score += 15;
      }
      for (const word of queryWords) {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 7;
        }
      }
    }

    // Check content matches
    for (const word of queryWords) {
      if (word.length > 3 && section.content.toLowerCase().includes(word)) {
        score += 3;
      }
    }

    // Check title matches
    for (const word of queryWords) {
      if (section.title.toLowerCase().includes(word)) {
        score += 10;
      }
    }

    return { section, score };
  });

  // Sort by score and return top sections
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSections)
    .map(s => s.section);
}

// Get all knowledge as a single context string
export function getAllKnowledge(): string {
  return knowledgeBase.map(s => `## ${s.title}\n${s.content}`).join('\n\n');
}

// Get knowledge summary for system prompt
export function getKnowledgeSummary(): string {
  return `Water Wise Group Knowledge Base - ${knowledgeBase.length} topics covering:
- Products: Aqua2use GWDD ($625-$945), Pro ($2,695), filters, pumps, irrigation kits
- Technical: Installation, maintenance, winterization, troubleshooting
- Legal: State-by-state greywater laws (AZ, CA, TX, NM, and more)
- Applications: Homes, tiny homes, RVs, off-grid, septic systems
- Guidance: Detergents, plants, irrigation, storage rules`;
}
