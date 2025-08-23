require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Comprehensive blog post content
const blogPosts = [
  {
    _type: 'blogPost',
    title: '10 Ways Greywater Recycling Can Transform Your Home',
    slug: { _type: 'slug', current: '10-ways-greywater-recycling-transforms-home' },
    author: 'Water Wise Team',
    publishedAt: '2024-03-15T00:00:00Z',
    excerpt: 'Discover how installing a greywater system can reduce your water bills, improve your garden, and increase your home\'s sustainability rating.',
    readTime: 8,
    category: 'conservation',
    tags: ['water savings', 'sustainability', 'home improvement', 'garden irrigation'],
    featured: true,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater recycling is revolutionizing how homeowners approach water conservation and sustainability. By reusing water from sinks, showers, and washing machines, you can significantly reduce your environmental footprint while saving money on utility bills.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Here are 10 transformative ways greywater recycling can benefit your home:' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '1. Reduce Water Bills by 30-50%', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The most immediate benefit of greywater recycling is the significant reduction in your water bills. By reusing water from showers, bathroom sinks, and washing machines for irrigation and toilet flushing, most homeowners see a 30-50% reduction in their monthly water costs. Over the course of a year, this can translate to hundreds or even thousands of dollars in savings, depending on your local water rates and usage patterns.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '2. Improve Garden Health and Productivity', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater contains beneficial nutrients like nitrogen and phosphorus that act as natural fertilizers for your plants. Unlike treated municipal water, greywater is free of harsh chemicals like chlorine that can harm beneficial soil microorganisms. Many gardeners report healthier, more vibrant plants and increased yields when using greywater irrigation systems.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '3. Increase Property Value', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Sustainable features like greywater systems are increasingly valued by environmentally conscious buyers. A professionally installed greywater system can increase your property value and make your home more attractive in the real estate market. Green building certifications that include water conservation features are particularly sought after.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '4. Reduce Environmental Impact', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'By recycling greywater, you\'re reducing the demand on municipal water treatment facilities and decreasing the amount of wastewater entering sewage systems. This reduces energy consumption associated with water treatment and helps protect local water sources from over-extraction.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '5. Create Emergency Water Supply', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater systems provide a backup water source during emergencies or water shortages. While not potable, greywater can be used for toilet flushing, cleaning, and garden maintenance when municipal water is unavailable, providing peace of mind during crisis situations.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '6. Support Drought-Resistant Landscaping', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater systems enable you to maintain beautiful landscapes even during drought conditions and water restrictions. By using recycled water for irrigation, you can keep your garden thriving while respecting local water conservation ordinances.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '7. Reduce Strain on Septic Systems', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'For homes with septic systems, diverting greywater reduces the load on your septic tank and drain field. This can extend the life of your septic system and reduce the frequency of pumping and maintenance required.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '8. Enable Off-Grid Living', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater recycling is essential for off-grid homes, tiny houses, and RVs where water conservation is critical. These systems allow you to maximize your water usage and minimize waste, making sustainable living more practical and affordable.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '9. Low Maintenance Operation', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Modern greywater systems like the Aqua2use are designed for minimal maintenance. With simple filter changes every few months and basic system monitoring, these systems operate reliably for years with minimal intervention.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '10. Educational and Community Benefits', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Installing a greywater system demonstrates environmental leadership in your community and provides educational opportunities for family members and neighbors. Many homeowners find that their greywater system becomes a conversation starter about sustainability and water conservation.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Ready to transform your home with greywater recycling? Contact our team to learn which system is right for your property and start enjoying these benefits today.' }]
      }
    ]
  },
  {
    _type: 'blogPost',
    title: 'Understanding Greywater: What It Is and Why It Matters',
    slug: { _type: 'slug', current: 'understanding-greywater-basics' },
    author: 'Sarah Johnson',
    publishedAt: '2024-03-10T00:00:00Z',
    excerpt: 'Learn the basics of greywater, where it comes from, and why recycling it is crucial for water conservation and environmental protection.',
    readTime: 7,
    category: 'conservation',
    tags: ['greywater basics', 'water conservation', 'sustainability', 'education'],
    featured: true,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater is wastewater generated from domestic activities such as laundry, dishwashing, and bathing. Unlike blackwater (from toilets), greywater is relatively clean and can be recycled for various non-potable uses, making it an excellent resource for water conservation.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'What is Greywater?', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater comes from showers, bathroom sinks, washing machines, and sometimes kitchen sinks (though kitchen greywater requires more treatment due to grease and food particles). This water typically contains soap, detergent, dirt, and small amounts of bacteria, but lacks the pathogens found in blackwater.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The average household produces 50-80 gallons of greywater daily, representing 50-80% of total household wastewater. This substantial volume presents a significant opportunity for conservation and reuse.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Sources of Greywater', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Bathroom sinks and showers (cleanest greywater)' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Washing machines (largest volume source)' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Utility sinks and floor drains' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Kitchen sinks (requires additional treatment)' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Why Greywater Recycling Matters', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Water scarcity affects nearly 40% of the global population, and this number is expected to rise due to climate change and population growth. In many regions, freshwater resources are being depleted faster than they can be replenished, making conservation efforts critical.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Greywater recycling offers several environmental benefits:' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Reduces freshwater consumption for non-potable uses' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Decreases wastewater volume entering treatment facilities' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Provides nutrients to gardens and landscapes' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Reduces energy consumption associated with water treatment' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Common Uses for Recycled Greywater', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Recycled greywater can be used for irrigation of ornamental plants, fruit trees, and vegetable gardens (with proper precautions). It\'s also suitable for toilet flushing, floor mopping, and car washing. With advanced treatment, greywater can even be used for cooling systems and industrial processes.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Safety Considerations', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'While greywater is generally safe to handle, it\'s important to use biodegradable, plant-safe soaps and detergents. Avoid using greywater on edible crops that come into direct contact with the recycled water, and always follow local health department guidelines.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Understanding greywater is the first step toward implementing sustainable water management in your home. With proper systems in place, you can significantly reduce your environmental impact while maintaining a beautiful, thriving landscape.' }]
      }
    ]
  },
  {
    _type: 'blogPost',
    title: 'DIY vs Professional Installation: Which is Right for You?',
    slug: { _type: 'slug', current: 'diy-vs-professional-installation' },
    author: 'Mike Chen',
    publishedAt: '2024-03-05T00:00:00Z',
    excerpt: 'Explore the pros and cons of DIY installation versus hiring professionals for your greywater recycling system.',
    readTime: 6,
    category: 'installation',
    tags: ['DIY installation', 'professional installation', 'greywater systems', 'home improvement'],
    featured: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'When it comes to installing a greywater recycling system, you have two main options: tackle it yourself or hire professionals. Both approaches have their advantages and challenges, and the right choice depends on your skills, budget, timeline, and local regulations.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'DIY Installation: Pros and Cons', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Advantages of DIY Installation:', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Lower upfront costs - save on labor expenses' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Complete control over the installation process' }]
      },
      {
        _type: 'Block',
        children: [{ _type: 'span', text: '• Learning experience that helps with future maintenance' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Flexible timeline - work at your own pace' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Satisfaction of completing the project yourself' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Challenges of DIY Installation:', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Requires technical knowledge of plumbing and electrical work' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Potential for costly mistakes that require professional correction' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• No warranty on installation work' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Time-intensive process, especially for beginners' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Need to obtain permits and ensure code compliance' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Professional Installation: Benefits and Considerations', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Benefits of Professional Installation:', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Expertise ensures proper installation and code compliance' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Warranty coverage on both materials and labor' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Faster installation timeline' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Professional handling of permits and inspections' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Access to specialized tools and equipment' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Ongoing support and maintenance services' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Considerations for Professional Installation:', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Higher upfront costs due to labor charges' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Less control over installation details and timeline' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '• Need to research and select qualified contractors' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Making the Right Choice', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Consider DIY installation if you have plumbing experience, are comfortable with complex projects, have flexible timing, and want to minimize costs. The Aqua2use system is designed with DIY installers in mind and includes comprehensive instructions.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Choose professional installation if you lack technical experience, want warranty protection, need quick completion, or live in an area with complex permit requirements. Professional installation ensures optimal performance and code compliance.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Hybrid Approach', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Some homeowners choose a hybrid approach: handling site preparation and simple connections themselves while hiring professionals for complex plumbing and electrical work. This can reduce costs while ensuring critical components are installed correctly.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Whatever approach you choose, ensure you understand local codes, obtain necessary permits, and prioritize safety throughout the installation process.' }]
      }
    ]
  },
  {
    _type: 'blogPost',
    title: 'Maximizing Water Savings: Best Practices for Greywater Systems',
    slug: { _type: 'slug', current: 'maximizing-water-savings-best-practices' },
    author: 'Emily Rodriguez',
    publishedAt: '2024-02-28T00:00:00Z',
    excerpt: 'Tips and strategies to get the most water savings and environmental benefits from your greywater recycling system.',
    readTime: 6,
    category: 'maintenance',
    tags: ['water savings', 'best practices', 'system optimization', 'maintenance'],
    featured: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Installing a greywater recycling system is just the first step toward maximizing your water conservation efforts. To achieve optimal water savings and environmental benefits, you need to implement best practices for system operation, maintenance, and usage optimization.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Choose the Right Household Products', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The products you use in your home directly impact your greywater quality and system performance. Switch to biodegradable, plant-safe soaps, shampoos, and detergents. Avoid products containing bleach, fabric softeners, or harsh chemicals that can harm plants and soil microorganisms.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Look for products labeled as "greywater-safe" or "biodegradable." Castile soap, phosphate-free detergents, and natural cleaning products are excellent choices that won\'t compromise your system\'s effectiveness.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Optimize Your Water Usage Patterns', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Understanding when and how greywater is generated helps you plan irrigation schedules and system operation. Shower and laundry water are typically produced at predictable times, allowing you to coordinate irrigation with greywater availability.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Consider installing low-flow fixtures to generate more greywater relative to total water usage. A low-flow showerhead can extend shower time while producing the same volume of greywater, maximizing the useful output from your system.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Implement Smart Irrigation Practices', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Use greywater for deep, infrequent watering rather than frequent light watering. This encourages deep root growth and improves plant drought tolerance. Water early morning or evening to minimize evaporation and maximize plant uptake.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mulch around irrigated plants to retain moisture and reduce evaporation. This practice can increase the effective value of your greywater by 25-40%, allowing you to water more area with the same volume of recycled water.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Regular System Maintenance', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Consistent maintenance is crucial for optimal performance. Clean or replace filters according to manufacturer recommendations - typically every 2-3 months for standard use. Monitor system performance and address issues promptly to prevent efficiency loss.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Inspect distribution lines regularly for clogs or damage. Flush the system periodically with fresh water to prevent buildup and maintain flow rates. Keep detailed maintenance records to track system performance over time.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Monitor and Measure Savings', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Track your water usage before and after installation to quantify savings. Monitor both water bills and system output to understand performance trends. Use water meters to measure greywater production and distribution for optimization opportunities.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Many homeowners are surprised to discover they can achieve 40-60% reduction in irrigation water use, translating to significant cost savings and environmental benefits.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Seasonal Adjustments', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Adjust your system operation for seasonal variations in water production and irrigation needs. During winter months, you may produce more greywater due to longer showers while irrigation needs decrease. Consider storage options or alternate uses during these periods.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'In summer, maximize greywater production by timing showers and laundry with irrigation needs. Consider installing additional storage capacity to handle peak irrigation demands.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'By implementing these best practices, you can maximize the water savings and environmental benefits of your greywater recycling system while ensuring long-term, reliable operation.' }]
      }
    ]
  },
  {
    _type: 'blogPost',
    title: 'The Future of Water Conservation in Residential Properties',
    slug: { _type: 'slug', current: 'future-water-conservation-residential' },
    author: 'David Thompson',
    publishedAt: '2024-02-20T00:00:00Z',
    excerpt: 'Explore emerging trends in water conservation technology and what they mean for homeowners and property developers.',
    readTime: 8,
    category: 'conservation',
    tags: ['future technology', 'smart systems', 'conservation trends', 'innovation'],
    featured: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The future of residential water conservation is being shaped by innovative technologies, changing regulations, and growing environmental awareness. As water scarcity becomes a global concern, homeowners and developers are looking toward advanced solutions that go beyond traditional conservation methods.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Smart Water Management Systems', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The integration of IoT sensors and smart technology is revolutionizing water management in homes. Advanced systems can monitor water quality, track usage patterns, and automatically optimize distribution based on real-time needs. These systems provide homeowners with detailed insights into their water consumption and conservation effectiveness.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Smart greywater systems can now adjust treatment levels based on water quality sensors, automatically switch between different water sources, and send maintenance alerts to smartphones. This technology ensures optimal performance while minimizing user intervention.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Advanced Treatment Technologies', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Emerging treatment technologies are making it possible to recycle greywater to near-potable standards. Membrane bioreactors, UV disinfection, and advanced oxidation processes are becoming more affordable and compact for residential use.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'These advanced systems enable broader applications for recycled water, including indoor uses like toilet flushing and laundry, significantly increasing potential water savings. Some systems can even produce water suitable for drinking with additional treatment stages.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Integration with Renewable Energy', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The future of water conservation is closely tied to renewable energy systems. Solar-powered greywater treatment and distribution systems are becoming more efficient and cost-effective. These systems can operate independently of the electrical grid, making them ideal for remote locations and emergency situations.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Heat recovery systems are being integrated with greywater recycling to capture thermal energy from shower and washing machine water, further improving overall home efficiency.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Regulatory Evolution', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Building codes and regulations are evolving to encourage or mandate water conservation features in new construction. Many jurisdictions now offer incentives for greywater systems, rainwater harvesting, and other conservation technologies.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Future regulations may require water conservation features in new homes, similar to current energy efficiency requirements. This regulatory push will accelerate adoption and drive innovation in the industry.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Community-Scale Systems', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The future may see more community-scale water recycling systems that serve multiple homes or neighborhoods. These systems can achieve economies of scale while providing advanced treatment capabilities that may not be cost-effective for individual homes.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Smart grid technology could enable homes to share treated water based on real-time demand and production, optimizing resource use across entire communities.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Integration with Home Automation', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Water conservation systems are being integrated with comprehensive home automation platforms. This integration allows for coordinated operation with other systems like HVAC, lighting, and security, creating truly intelligent homes that optimize resource use automatically.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Machine learning algorithms can analyze usage patterns and automatically adjust system operation to maximize conservation while maintaining user comfort and convenience.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The future of residential water conservation is bright, with technology providing increasingly sophisticated and cost-effective solutions. Homeowners who invest in these systems today are positioning themselves at the forefront of sustainable living while enjoying immediate benefits in cost savings and environmental impact.' }]
      }
    ]
  },
  {
    _type: 'blogPost',
    title: 'Greywater Systems for Different Climates: What You Need to Know',
    slug: { _type: 'slug', current: 'greywater-systems-different-climates' },
    author: 'Lisa Santos',
    publishedAt: '2024-02-15T00:00:00Z',
    excerpt: 'How climate affects greywater system performance and what considerations to make for your specific region.',
    readTime: 5,
    category: 'installation',
    tags: ['climate considerations', 'system design', 'regional variations', 'performance optimization'],
    featured: false,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Climate plays a crucial role in greywater system design, performance, and maintenance requirements. Understanding how temperature, humidity, precipitation, and seasonal variations affect your system helps ensure optimal operation and longevity regardless of your geographic location.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Hot, Arid Climates', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Desert and semi-arid regions present unique opportunities and challenges for greywater systems. High evaporation rates mean irrigation demand is greatest, but also that storage tanks lose water quickly if not properly covered.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'In hot climates, insulated storage tanks and shaded pump locations prevent overheating and extend equipment life. UV-resistant materials are essential for outdoor components. Consider subsurface irrigation to minimize evaporation and maximize water efficiency.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The consistent irrigation demand in arid climates makes greywater systems particularly cost-effective, with payback periods often under 3 years due to high water costs and constant irrigation needs.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Cold Climate Considerations', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Freezing temperatures require special considerations to prevent system damage. Insulation, heat trace cables, and freeze-protection valves are essential in regions where temperatures drop below 32°F (0°C).' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Indoor storage and treatment components should be located in heated spaces when possible. Outdoor distribution lines need to be buried below the frost line or equipped with drainage systems for winter shutdown.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Seasonal operation may be necessary in extreme cold climates, with systems shut down during winter months and reactivated in spring. This requires planning for water disposal during shutdown periods.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Humid, Temperate Climates', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Moderate climates with regular rainfall present different challenges. High humidity can affect biological treatment processes and may require enhanced ventilation for storage tanks to prevent anaerobic conditions.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Regular rainfall may reduce irrigation needs seasonally, requiring overflow provisions or alternate uses for excess greywater. System design should accommodate variable demand throughout the year.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'These climates often have moderate water costs and irrigation needs, making return on investment longer but still attractive, especially during drought periods.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Tropical and Subtropical Regions', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'High temperatures and humidity accelerate biological processes in greywater, which can be both beneficial and challenging. Faster decomposition of organic matter occurs, but systems may require more frequent cleaning and maintenance.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Mosquito control becomes important in warm, humid climates. Sealed storage tanks and proper system design prevent standing water that could become breeding sites.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Corrosion resistance is crucial in coastal tropical areas due to salt air exposure. Stainless steel or high-grade plastic components perform better than standard materials in these environments.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'System Design Adaptations', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Climate-specific design modifications can significantly improve system performance and reliability. Consider local weather patterns when sizing storage capacity - areas with irregular greywater production or irrigation demand may need larger storage tanks.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Wind patterns affect evaporation rates and may influence distribution system design. Prevailing winds can be used to assist natural evaporation in treatment systems or may require wind protection for spray irrigation.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Working with Local Experts', style: 'strong' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Consult with local installers and system designers who understand regional climate challenges. They can recommend specific equipment, installation techniques, and maintenance schedules that work best in your area.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Local building codes often reflect climate considerations and may specify requirements for freeze protection, drainage, or other climate-related factors.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Understanding your climate\'s impact on greywater systems ensures you choose the right equipment and design for long-term, trouble-free operation while maximizing water conservation benefits.' }]
      }
    ]
  }
]

async function uploadBlogPosts() {
  console.log('Starting blog content migration...')
  
  try {
    // Create a transaction to upload all posts
    const transaction = client.transaction()
    
    blogPosts.forEach((post, index) => {
      const docId = `blogPost-${index + 1}`
      transaction.create({
        _id: docId,
        _type: post._type,
        ...post
      })
    })
    
    const result = await transaction.commit()
    console.log('Successfully uploaded blog posts:', result)
    
    return result
  } catch (error) {
    console.error('Error uploading blog posts:', error)
    throw error
  }
}

// Run the migration
uploadBlogPosts()
  .then((result) => {
    console.log(`Migration completed successfully! Uploaded ${result.length} blog posts.`)
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })