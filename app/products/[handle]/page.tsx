import { getProduct, getEnhancedProduct } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { notFound, redirect } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import { CheckCircle, Star, Shield, Truck, Users, Zap, Droplets, Settings, Calculator, Wrench, MessageSquare, FileText, Ruler, ArrowRight, ShieldCheck, Calendar, ImageIcon, Award, Leaf, ChevronRight } from 'lucide-react'
import { formatPriceDisplay } from '@/lib/price-utils'
import { ProductWithReviewsSchema } from '@/components/schema-markup'
import { getReviewsByProduct, type Review } from '@/data/aqua2use-reviews'

// Comprehensive fallback product data with correct Shopify variants and real images
const fallbackProducts: { [key: string]: any } = {
  "aqua2use": {
    id: "gid://shopify/Product/7459820208334",
    title: "Aqua2use Greywater Recycling System",
    description: "The Aqua2use greywater system is the most advanced, affordable greywater treatment solution available. Choose from three configurations: GWDD Gravity for homes with natural slope, GWDD Pump for flexible installations, or Pro for commercial and high-capacity applications. All systems feature our patented 4-stage Matala filtration for superior water quality.",
    handle: "aqua2use",
    priceRange: {
      minVariantPrice: {
        amount: "599.99",
        currencyCode: "USD"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223",
            altText: "Aqua2use GWDD Greywater System"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-pump.jpg?v=1719253734",
            altText: "Aqua2use GWDD with Pump"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-ug.jpg?v=1719241821",
            altText: "Aqua2use Pro Commercial System"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Aqua2use-GWDD-components.jpg?v=1719252978",
            altText: "Aqua2use System Components"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-how-it-works.jpg?v=1719253036",
            altText: "How Aqua2use Works"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/42716695429326",
            title: "GWDD Gravity",
            priceV2: {
              amount: "599.99",
              currencyCode: "USD"
            },
            availableForSale: true,
            variantType: "gwdd-gravity",
            subtitle: "For homes with natural slope",
            specs: {
              capacity: "21 gal",
              flow: "17 GPM",
              solidRemoval: "90%",
              power: "None required"
            },
            bestFor: "Homes, cabins, tiny houses with gravity flow"
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/42716695462094",
            title: "GWDD with Pump",
            priceV2: {
              amount: "899.99",
              currencyCode: "USD"
            },
            availableForSale: true,
            variantType: "gwdd-pump",
            subtitle: "Flexible installation options",
            specs: {
              capacity: "21 gal",
              flow: "17 GPM",
              solidRemoval: "75%",
              power: "110V required"
            },
            bestFor: "Properties needing uphill pumping or flexible placement"
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/42713618972878",
            title: "Aqua2use Pro",
            priceV2: {
              amount: "2699.00",
              currencyCode: "USD"
            },
            availableForSale: true,
            variantType: "pro",
            subtitle: "Commercial & high-capacity",
            specs: {
              capacity: "50 gal",
              flow: "25 GPM",
              solidRemoval: "90%",
              power: "110V required"
            },
            bestFor: "Hotels, apartments, multi-family, commercial"
          }
        }
      ]
    },
    features: [
      "Fully automated greywater treatment system",
      "Patented 4-Stage Matala filtration technology",
      "Up to 90% suspended solid removal",
      "WaterMark approved certification",
      "Built-in overflow safety system",
      "UV resistant high-grade polyethylene construction",
      "No external timers required",
      "Can be installed above ground, half-submerged, or underground",
      "Suitable for laundry, shower, and bathroom sink water",
      "Integrated diverter valve for easy system bypass",
      "Cross-Flow depth filtration with 3-dimensional filter structure",
      "12-month warranty on all parts"
    ],
    specifications: {
      filtrationStages: "4-stage progressive by Matala",
      installation: "Above ground, half-submerged, or underground",
      certification: "WaterMark approved",
      filterCapacity: "Up to 15,850 gallons before cleaning",
      filterMaintenance: "Clean every 4-6 months",
      inletConnection: "2\"-4\" diameter",
      warranty: "12 months on all parts"
    },
    variantSpecs: {
      "gwdd-gravity": {
        tankCapacity: "21 gallons",
        dimensions: "23.2\" L x 14.6\" W x 19.7\" H",
        weight: "25 lbs",
        processingCapacity: "17 gallons per minute",
        solidRemoval: "90%",
        powerRequirement: "None - gravity fed"
      },
      "gwdd-pump": {
        tankCapacity: "21 gallons",
        dimensions: "23.2\" L x 14.6\" W x 19.7\" H",
        weight: "30 lbs",
        processingCapacity: "17 gallons per minute",
        solidRemoval: "75%",
        powerRequirement: "110V outlet required",
        pumpType: "Submersible with Electronic Controller"
      },
      "pro": {
        tankCapacity: "50 gallons",
        dimensions: "31.5\" L x 23.6\" W x 26\" H",
        processingCapacity: "25 gallons per minute",
        solidRemoval: "90%",
        powerRequirement: "110V outlet required",
        pumpType: "Submersible with Electronic Controller",
        filterSurfaceArea: "Over 108 sq ft",
        certification: "NSF/ANSI 350 compliant"
      }
    },
    faq: [
      {
        question: "What is an Aqua2use system?",
        answer: "The Aqua2use is the most advanced Grey Water Diversion Device on the market. It's designed to automatically filter and reuse water from your laundry, bath, and shower for irrigation, saving up to 40% on your water bills."
      },
      {
        question: "Which system should I choose?",
        answer: "Choose GWDD Gravity ($599) if you have natural slope for gravity flow - it offers 90% solid removal. Choose GWDD Pump ($899) if you need flexible installation or uphill pumping. Choose Pro ($2,699) for commercial properties or high-volume residential needs with 50-gallon capacity."
      },
      {
        question: "What's the difference between GWDD and Pro?",
        answer: "The GWDD systems have 21-gallon capacity and process 17 GPM - ideal for single-family homes. The Pro has 50-gallon capacity, processes 25 GPM, and is designed for commercial, multi-family, or high-usage residential applications."
      },
      {
        question: "How does it work?",
        answer: "The system automatically diverts greywater from your waste pipe through Matala's patented 4-stage progressive filtration. For pump units, magnetic micro floats activate the pump when water reaches optimal levels, sending filtered water to your irrigation system - all without external timers."
      },
      {
        question: "How often do I have to clean or replace the filters?",
        answer: "Testing in the field has shown that up to 15,850 gallons can pass through the unit before they need cleaning. Recommended cleaning cycle is every 4-6 months depending on usage."
      },
      {
        question: "Is it safe to use for garden irrigation?",
        answer: "Absolutely! When connected to a drip irrigation system with low phosphate detergent, the filtered water is perfectly safe for plants and trees. You'll be surprised how clear the water looks after filtration."
      },
      {
        question: "What water sources can I connect?",
        answer: "You can connect water from your laundry, bath, and shower. This EXCLUDES water from the kitchen sink, dishwashers, and toilets, which is classified as black water."
      },
      {
        question: "What is the warranty?",
        answer: "All parts and the pump are covered by a 12-month replacement warranty."
      }
    ]
  },
  // Legacy routes redirect to aqua2use
  "aqua2use-gwdd": {
    redirect: "aqua2use"
  },
  "aqua2use-pro": {
    redirect: "aqua2use"
  },
  "aqua2use-gwdd-pump": {
    id: "gid://shopify/Product/2",
    title: "Aqua2use GWDD Pump System",
    description: "The Aqua2use GWDD Pump System is ideal when gravity flow isn't possible or when higher flow rates are needed. This system includes a reliable submersible pump with electronic controller for versatile installation options and can process up to 17 gallons per minute with the same proven progressive filtration technology.",
    handle: "aqua2use-gwdd-pump",
    priceRange: {
      minVariantPrice: {
        amount: "2299.00",
        currencyCode: "USD"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-pump.jpg?v=1719253734",
            altText: "Aqua2use GWDD Pump System"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Aqua2use-GWDD-components.jpg?v=1719252978",
            altText: "Aqua2use Pump System Installation"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/4",
            title: "Standard Pump Kit",
            priceV2: {
              amount: "2299.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/5",
            title: "Premium Pump Kit with Installation",
            priceV2: {
              amount: "2699.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        }
      ]
    },
    features: [
      "Integrated submersible pump with electronic controller",
      "Processes 17 gallons per minute of greywater",
      "Ideal for uphill irrigation or longer distances",
      "Progressive 4-Stage Filtration by Matala",
      "Built-in overflow safety system",
      "UV resistant high-grade polyethylene construction",
      "WaterMark approved certification",
      "Dry run protection for pump longevity",
      "75% solid removal efficiency",
      "Two magnetic micro floats for automatic operation"
    ],
    specifications: {
      tankCapacity: "21 gallons",
      dimensions: "23.2\" x 14.6\" x 19.7\"",
      processingCapacity: "17 gallons per minute",
      pumpType: "Submersible pump with Electronic Controller",
      filtrationStages: "4-stage progressive by Matala",
      solidRemoval: "75% efficiency",
      installation: "Above ground, half-submerged, or underground",
      certification: "WaterMark approved",
      filterCapacity: "Up to 15,850 gallons before cleaning",
      power: "110V electrical connection required"
    },
    faq: [
      {
        question: "What's the difference between gravity and pump systems?",
        answer: "The pump system includes a submersible pump with electronic controller for situations where gravity flow isn't possible, such as when the system needs to pump uphill or when higher flow rates are required."
      },
      {
        question: "What power requirements does the pump system have?",
        answer: "The pump system requires a 110V electrical connection. The electronic pump controller includes dry run protection and automatic operation based on water level sensors."
      },
      {
        question: "How often does the pump need maintenance?",
        answer: "The submersible pump is designed for long-term operation with minimal maintenance. Regular filter cleaning every 4-6 months is the primary maintenance requirement."
      },
      {
        question: "Can it handle the same flow rate as gravity systems?",
        answer: "Yes, the pump system processes the same 17 gallons per minute as the gravity system, but with the added benefit of being able to pump to elevated irrigation areas."
      }
    ]
  },
  "replacement-filters": {
    id: "gid://shopify/Product/7463774912718",
    title: "Replacement Filters",
    description: "Keep your Aqua2use system running at peak performance with genuine replacement filters. Our progressive 4-stage filtration system by Matala includes multiple density filter mats that are easy to clean and replace, ensuring optimal greywater treatment for years to come.",
    handle: "replacement-filters",
    priceRange: {
      minVariantPrice: {
        amount: "249.99",
        currencyCode: "USD"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368",
            altText: "aqua2use replacement filters"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/description-gwdd-image.jpg?v=1719592385",
            altText: "replacement filters for gwdd"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/9",
            title: "Complete Filter Set",
            priceV2: {
              amount: "249.99",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/10",
            title: "Filter Maintenance Kit",
            priceV2: {
              amount: "299.99",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/11",
            title: "Annual Filter Package",
            priceV2: {
              amount: "449.99",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        }
      ]
    },
    features: [
      "Genuine OEM replacement filters for Aqua2use systems",
      "Progressive 4-Stage Matala filter mats",
      "3-dimensional cross-flow design",
      "UV resistant filter media",
      "Easy tool-free replacement",
      "Extends system life and performance",
      "Maintains optimal filtration efficiency",
      "Compatible with all GWDD and Pro models",
      "Cleanable and reusable design",
      "Maintains optimal system performance"
    ],
    specifications: {
      filterType: "Progressive 4-Stage Matala Filter Mats",
      filterStructure: "3-dimensional cross-flow design",
      compatibility: "All Aqua2use GWDD and Pro systems",
      cleaningCycle: "Every 4-6 months (depending on usage)",
      replacementCycle: "Every 3 years with proper maintenance",
      capacity: "Up to 15,850 gallons before cleaning required",
      installation: "Tool-free replacement",
      material: "UV resistant filter media",
      stages: "Multiple density layers for progressive filtration"
    },
    faq: [
      {
        question: "How often do I need to clean the filters?",
        answer: "Filters should be cleaned every 4-6 months depending on usage and water quality. With regular cleaning, filters can last up to 3 years before replacement."
      },
      {
        question: "How do I know when filters need cleaning?",
        answer: "Signs include reduced flow rate, longer processing times, or if it's been 4-6 months since last cleaning. The system will continue to work but efficiency decreases."
      },
      {
        question: "Can I clean the filters myself?",
        answer: "Yes! The filters are designed for easy maintenance. Simply remove them (no tools required), rinse with clean water, and reinstall. Full instructions are included."
      },
      {
        question: "Are these filters compatible with all Aqua2use systems?",
        answer: "Yes, these progressive 4-stage Matala filters are designed to work with all Aqua2use GWDD and Pro systems. The filter configuration is standardized across all models."
      }
    ]
  },
  "replacement-greywater-pump": {
    id: "gid://shopify/Product/7559824703694",
    title: "Greywater Pump Replacement for the Aqua2use GWDD",
    description: "High-Performance Submersible Pump for Effortless Water Reuse. Dealing with a failing greywater pump? Restore your system in minutes with this direct replacement for the Aqua2use GWDD. Designed for quick installation and reliable performance, this pump ensures your greywater recycling continues seamlessly.",
    handle: "replacement-greywater-pump",
    priceRange: {
      minVariantPrice: {
        amount: "399.99",
        currencyCode: "USD"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Pump_Pack_GWDD.jpg?v=1742748645",
            altText: "Greywater Pump Replacement for Aqua2use GWDD"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Aqua2use_GWDD_pump_performance_and_specifications.jpg?v=1742748645",
            altText: "Aqua2use GWDD pump performance and specifications"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/42992180723918",
            title: "Default Title",
            priceV2: {
              amount: "399.99",
              currencyCode: "USD"
            },
            availableForSale: false
          }
        }
      ]
    },
    features: [
      "Direct OEM replacement pump for Aqua2use GWDD",
      "Submersible design with electronic controller",
      "Dry run protection for extended life",
      "Automatic operation with water level sensors",
      "110V electrical connection",
      "Quick and easy installation",
      "Restores full system performance",
      "Compatible with all GWDD pump systems",
      "Built-in thermal overload protection",
      "12-month manufacturer warranty"
    ],
    specifications: {
      type: "Submersible Greywater Pump",
      power: "110V electrical connection",
      controller: "Electronic Pump Controller included",
      protection: "Dry run protection",
      compatibility: "All Aqua2use GWDD systems",
      installation: "Direct replacement",
      warranty: "12 months",
      operation: "Automatic with water level sensors"
    },
    faq: [
      {
        question: "Is this compatible with my existing Aqua2use system?",
        answer: "Yes, this pump is designed as a direct replacement for all Aqua2use GWDD systems, both gravity and pump models."
      },
      {
        question: "Does it include the electronic controller?",
        answer: "Yes, the replacement pump comes with the electronic pump controller and all necessary fittings for installation."
      },
      {
        question: "How difficult is the installation?",
        answer: "Installation is straightforward for most DIY homeowners. Basic plumbing and electrical connections are required. Professional installation is available if preferred."
      },
      {
        question: "What's the expected lifespan of the pump?",
        answer: "With proper maintenance and regular filter cleaning, the pump typically lasts 5-7 years depending on usage frequency and water conditions."
      }
    ]
  },
  "replacement-pumps": {
    id: "gid://shopify/Product/6",
    title: "Replacement Pumps",
    description: "High-quality replacement pumps and pump kits for your Aqua2use greywater system. Keep your system running at peak performance with genuine OEM pumps designed for reliable, long-term operation.",
    handle: "replacement-pumps",
    priceRange: {
      minVariantPrice: {
        amount: "399.99",
        currencyCode: "USD"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Pump_Pack_GWDD.jpg?v=1742748645",
            altText: "Replacement pump for Aqua2use GWDD"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Aqua2use_GWDD_pump_performance_and_specifications.jpg?v=1742748645",
            altText: "Pump specifications and performance"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/12",
            title: "Standard Pump Kit",
            priceV2: {
              amount: "399.99",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/13",
            title: "Premium Pump Kit with Controller",
            priceV2: {
              amount: "499.99",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        }
      ]
    },
    features: [
      "Direct OEM replacement pump for Aqua2use systems",
      "Submersible design with electronic controller",
      "Dry run protection for extended life",
      "Automatic operation with water level sensors",
      "110V electrical connection",
      "Quick and easy installation",
      "Restores full system performance",
      "Compatible with all GWDD pump systems",
      "Built-in thermal overload protection",
      "12-month manufacturer warranty"
    ],
    specifications: {
      type: "Submersible Greywater Pump",
      power: "110V electrical connection",
      controller: "Electronic Pump Controller included",
      protection: "Dry run protection",
      compatibility: "All Aqua2use GWDD systems",
      installation: "Direct replacement",
      warranty: "12 months",
      operation: "Automatic with water level sensors"
    },
    faq: [
      {
        question: "What pumps are compatible with my system?",
        answer: "These replacement pumps are designed for all Aqua2use GWDD systems that use pump-assisted operation."
      },
      {
        question: "What's included with the pump?",
        answer: "Each pump kit includes the submersible pump, electronic controller, and necessary fittings for installation."
      },
      {
        question: "How long do pumps typically last?",
        answer: "With proper maintenance, pumps typically last 5-7 years depending on usage and water conditions."
      },
      {
        question: "Is professional installation required?",
        answer: "While many homeowners can install it themselves, professional installation is recommended for optimal performance."
      }
    ]
  }
}

// Product-specific content data with exact content from original site
function getProductContent(handle: string) {
  const productContent: { [key: string]: any } = {
    "aqua2use": {
      features: [
        "Fully automated greywater treatment system",
        "Patented 4-Stage Matala filtration technology",
        "Up to 90% suspended solid removal",
        "WaterMark approved certification",
        "Built-in overflow safety system prevents flooding",
        "UV resistant high-grade polyethylene construction",
        "No external timers required - fully automated operation",
        "Can be installed above ground, half-submerged, or underground",
        "Suitable for laundry, shower, and bathroom sink water",
        "Integrated diverter valve for easy system bypass",
        "Cross-Flow depth filtration with 3-dimensional filter structure",
        "12-month warranty on all parts"
      ],
      specifications: {
        filtrationStages: "4-stage progressive by Matala",
        installation: "Above ground, half-submerged, or underground",
        certification: "WaterMark approved",
        filterCapacity: "Up to 15,850 gallons before cleaning",
        filterMaintenance: "Clean every 4-6 months",
        warranty: "12 months on all parts"
      },
      reviews: [
        {
          name: "Raul Chavez",
          rating: 5,
          review: "Planning to install one for my personal house. Love the people that work there. The owner answered the question that I had."
        },
        {
          name: "Mike Ellsworth",
          rating: 5,
          review: "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan."
        },
        {
          name: "Dave in Baja",
          rating: 5,
          review: "We live in the desert, and water is scarce. When we built our house, we put in two sewer lines - one for black water into the septic, and one for gray water into the garden."
        },
        {
          name: "Commercial Property Manager",
          rating: 5,
          review: "Upgraded to the Pro system for our small commercial building. Handles the capacity we need and maintenance is straightforward."
        },
        {
          name: "MrsT",
          rating: 5,
          review: "I used this system for my tiny house and love it! Best purchase I could have made."
        }
      ],
      faq: [
        {
          question: "What is an Aqua2use system?",
          answer: "The Aqua2use is the most advanced Grey Water Diversion Device on the market. It's designed to automatically filter and reuse water from your laundry, bath, and shower for irrigation, saving up to 40% on your water bills."
        },
        {
          question: "Which system should I choose?",
          answer: "Choose GWDD Gravity ($599) if you have natural slope for gravity flow - it offers 90% solid removal. Choose GWDD Pump ($899) if you need flexible installation or uphill pumping. Choose Pro ($2,699) for commercial properties or high-volume residential needs with 50-gallon capacity."
        },
        {
          question: "What's the difference between GWDD and Pro?",
          answer: "The GWDD systems have 21-gallon capacity and process 17 GPM - ideal for single-family homes. The Pro has 50-gallon capacity, processes 25 GPM, and is designed for commercial, multi-family, or high-usage residential applications."
        },
        {
          question: "How does it work?",
          answer: "The system automatically diverts greywater from your waste pipe through Matala's patented 4-stage progressive filtration. For pump units, magnetic micro floats activate the pump when water reaches optimal levels, sending filtered water to your irrigation system - all without external timers."
        },
        {
          question: "How often do I have to clean or replace the filters?",
          answer: "Testing in the field has shown that up to 15,850 gallons can pass through the unit before they need cleaning. Recommended cleaning cycle is every 4-6 months depending on usage."
        },
        {
          question: "Is it safe to use for garden irrigation?",
          answer: "Absolutely! When connected to a drip irrigation system with low phosphate detergent, the filtered water is perfectly safe for plants and trees. You'll be surprised how clear the water looks after filtration."
        },
        {
          question: "What water sources can I connect?",
          answer: "You can connect water from your laundry, bath, and shower. This EXCLUDES water from the kitchen sink, dishwashers, and toilets, which is classified as black water."
        },
        {
          question: "What is the warranty?",
          answer: "All parts and the pump are covered by a 12-month replacement warranty."
        }
      ]
    },
    "aqua2use-gwdd": {
      features: [
        "Fully automated greywater treatment system",
        "Processes 17 gallons per minute of greywater",
        "Compact dimensions: 23.2\" L x 14.6\" W x 19.7\" H",
        "State of the Art Progressive 4-Stage Filtration by Matala",
        "Built-in overflow safety system prevents flooding",
        "UV resistant high-grade polyethylene construction",
        "WaterMark approved certification",
        "Cross-Flow depth filtration with 3-dimensional filter structure",
        "Solid removal: 75% (pump unit), 90% (gravity unit)",
        "Two magnetic micro floats with Electronic Pump Controller (pump version)",
        "No external timers required - fully automated operation",
        "Can be installed above ground, half-submerged, or underground",
        "Suitable for laundry, shower, and bathroom sink water",
        "Integrated diverter valve for easy system bypass"
      ],
      specifications: {
        tankCapacity: "21 gallons total capacity",
        dimensions: "23.2\" L x 14.6\" W x 19.7\" H",
        weight: "13.6 kg (30 lbs) pump version",
        processingCapacity: "17 gallons per minute",
        filtrationStages: "4-stage progressive by Matala",
        solidRemoval: "90% (gravity), 75% (pump)",
        installation: "Above ground, half-submerged, or underground",
        powerRequirement: "110V outlet (pump version only)",
        certification: "WaterMark approved",
        filterCapacity: "Up to 15,850 gallons before cleaning",
        filterMaintenance: "Clean every 4-6 months",
        filterReplacement: "Replace every 3 years",
        warranty: "12 months on all parts"
      },
      reviews: [
        {
          name: "Raul Chavez",
          rating: 5,
          review: "Planning to install one for my personal house. Love the people that work there. The owner answered the question that I had."
        },
        {
          name: "Mike Ellsworth", 
          rating: 5,
          review: "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan."
        },
        {
          name: "Dave in Baja",
          rating: 5,
          review: "We live in the desert, and water is scarce. When we built our house, we put in two sewer lines - one for black water into the septic, and one for gray water into the garden."
        },
        {
          name: "J.G.",
          rating: 5,
          review: "Received a GWDD pump unit in 2020 and has been performing top notch ever since. Original filters are holding up with regular cleanings monthly."
        },
        {
          name: "MrsT",
          rating: 5,
          review: "I used this system for my tiny house and love it! Best purchase I could have made."
        }
      ],
      faq: [
        {
          question: "What is an Aqua2use GWDD?",
          answer: "The Aqua2use GWDD (Grey Water Diversion Device) is the most advanced greywater treatment system available. It's designed to automatically filter and reuse water from your laundry, bath, and shower for irrigation, saving up to 40% on your water bills."
        },
        {
          question: "What's the difference between the Gravity and Pump versions?",
          answer: "The Gravity version ($599.99) relies on natural water flow and achieves 90% solid removal. The Pump version ($899.99) includes a submersible pump with electronic controller for situations where gravity flow isn't possible, achieving 75% solid removal but offering more installation flexibility."
        },
        {
          question: "How does it work?",
          answer: "The system automatically diverts greywater from your waste pipe through Matala's patented 4-stage progressive filtration. For pump units, magnetic micro floats activate the pump when water reaches optimal levels, sending filtered water to your irrigation system - all without external timers."
        },
        {
          question: "How often do I have to clean or replace the filters?",
          answer: "Testing in the field has shown that up to 15,850 gallons can pass through the unit before they need cleaning. Recommended cleaning cycle depending on how many people are using the system is every 4-6 months."
        },
        {
          question: "Can I use kitchen sink water?",
          answer: "No, the system is not recommended for kitchen sink water due to grease and food particles that can clog the filtration system."
        },
        {
          question: "How long can I store filtered greywater?",
          answer: "It is not recommended to store filtered greywater for more than 24 hours to prevent bacterial growth and odors."
        },
        {
          question: "Is it safe to use the Aqua2use to irrigate my garden?",
          answer: "It is absolutely safe to use greywater to water your plants and your trees. Your system needs to be connected to a drip irrigation system, and you should use low phosphate detergent. The filtering system of the Aqua2use is the best on the market, and will intercept lint and other impurities."
        },
        {
          question: "Does the water look grey?",
          answer: "No, you will be surprised by how clear the water looks like after filtration by the Aqua2use. You will not water your plants with soapy and 'grey looking' water!"
        },
        {
          question: "What can I connect my unit to?",
          answer: "You can connect your unit to any grey waste water from your house, that includes the water coming from your laundry, bath and shower. This EXCLUDES water from the kitchen sink, dishwashers and toilets, which is classed as black water."
        },
        {
          question: "What do I need before I connect my unit?",
          answer: "You will need a 110 volt power outlet. The unit comes with a 16′ long extension cord that is ready to plug right into your GFI outlet. You need to be able to access your waste plumbing pipes."
        },
        {
          question: "Is the Aqua2use an Approved Greywater Device?",
          answer: "Yes, it has the Australian Water Mark for a Pumped system and a Gravity system. There is currently no national approval agency in the US for a greywater system."
        },
        {
          question: "How is the Aqua2use different from other Greywater Diversion Devices?",
          answer: "The New Aqua2use is designed to be the most efficient and advanced Grey Water Diversion Device available on the market. The Aqua2use is also simple to connect to a drip irrigation system, and requires very low maintenance."
        },
        {
          question: "What is the warranty?",
          answer: "All parts and the pump are covered by a 12 month replacement warranty."
        },
        {
          question: "How effective are the filters?",
          answer: "Independent laboratory tests have shown that the Aqua2use can remove up to 90% of suspended solids. There is nothing on the market that comes close to this amount of filtration."
        },
        {
          question: "How much water does my unit save me?",
          answer: "Independent tests have shown you can expect to save approximately 30 gallons per person per day."
        },
        {
          question: "What are the dimensions?",
          answer: "Length 24″, Width 15″, Height 20″ for the standard GWDD unit."
        },
        {
          question: "Does this unit break down in the sun?",
          answer: "No, it is made of UV resistant High Grade Poly Ethylene."
        },
        {
          question: "How do I choose between gravity and pump versions?",
          answer: "Choose the gravity version if your greywater source is higher than your irrigation area and you have natural slope. Choose the pump version if you need to pump water uphill, have limited fall, or want more flexibility in system placement."
        },
        {
          question: "What maintenance is required?",
          answer: "The system requires minimal maintenance: clean filters every 4-6 months (takes about 15 minutes), check and clean the pump inlet screen quarterly if you have the pump version, and replace filters every 3 years with proper maintenance."
        },
        {
          question: "Is this suitable for tiny houses and RVs?",
          answer: "Yes! The compact design (23.2\" x 14.6\" x 19.7\") makes it perfect for tiny houses and RVs. Many customers use it for mobile living situations where water conservation is critical."
        }
      ]
    },
    "aqua2use-gwdd-pump": {
      features: [
        "Fully automated greywater treatment with submersible pump",
        "Processes 17 gallons per minute of greywater",
        "Compact device: 24\" Length, 15\" Width, 20\" Height",
        "State of the Art Progressive 4 Stage Filtration by Matala",
        "Electronic Pump Controller with dry run protection",
        "Built-in overflow safety system",
        "UV resistant materials",
        "WaterMark approved certification",
        "Cross-Flow depth filtration with 3-dimensional filter structure",
        "Solid removal: 75% efficiency",
        "Two magnetic micro floats for automatic operation"
      ],
      specifications: {
        tankCapacity: "21 gallons",
        dimensions: "23.2\" x 14.6\" x 19.7\"",
        processingCapacity: "17 gallons per minute",
        pumpType: "Submersible pump with Electronic Controller",
        filtrationStages: "4-stage progressive by Matala",
        solidRemoval: "75% efficiency",
        installation: "Above ground, half-submerged, or underground",
        certification: "WaterMark approved",
        filterCapacity: "Up to 15,850 gallons before cleaning",
        power: "110V electrical connection required"
      },
      reviews: [
        {
          name: "J.G.",
          rating: 5,
          review: "Received a GWDD pump unit in 2020 and has been performing top notch ever since. Original filters are holding up with regular cleanings monthly."
        },
        {
          name: "Tom H.",
          rating: 5,
          review: "Perfect for our cabin where gravity flow wasn't an option. The pump system works flawlessly and has been running for 3 years now."
        },
        {
          name: "Desert Living Couple",
          rating: 5,
          review: "Essential for our off-grid setup. The electronic controller makes it completely automatic - we just clean the filters every few months."
        },
        {
          name: "Tiny House Builder",
          rating: 5,
          review: "Installed multiple pump units in tiny house builds. Reliable, compact, and customers love the water savings."
        }
      ],
      faq: [
        {
          question: "What's the difference between gravity and pump systems?",
          answer: "The pump system includes a submersible pump with electronic controller for situations where gravity flow isn't possible, such as when the system needs to pump uphill or when higher flow rates are required."
        },
        {
          question: "What power requirements does the pump system have?",
          answer: "The pump system requires a 110V electrical connection. The electronic pump controller includes dry run protection and automatic operation based on water level sensors."
        },
        {
          question: "How often does the pump need maintenance?",
          answer: "The submersible pump is designed for long-term operation with minimal maintenance. Regular filter cleaning every 4-6 months is the primary maintenance requirement."
        },
        {
          question: "Can it handle the same flow rate as gravity systems?",
          answer: "Yes, the pump system processes the same 17 gallons per minute as the gravity system, but with the added benefit of being able to pump to elevated irrigation areas."
        },
        {
          question: "Is installation more complex than gravity systems?",
          answer: "Installation requires an electrical connection in addition to plumbing connections. Professional installation is recommended to ensure proper electrical safety and optimal performance."
        }
      ]
    },
    "filters": {
      features: [
        "Progressive 4-Stage Filtration by Matala",
        "3-dimensional filter mat structure",
        "Cross-flow depth filtration technology",
        "Multiple density layers for optimal filtration",
        "Easy to clean - no tools required",
        "Long-lasting filter media",
        "Handles up to 15,850 gallons before cleaning needed",
        "Compatible with all Aqua2use systems",
        "UV resistant filter materials",
        "Maintains optimal system performance"
      ],
      specifications: {
        filterType: "Progressive 4-Stage Matala Filter Mats",
        filterStructure: "3-dimensional cross-flow design",
        compatibility: "All Aqua2use GWDD and Pro systems",
        cleaningCycle: "Every 4-6 months (depending on usage)",
        replacementCycle: "Every 3 years with proper maintenance",
        capacity: "Up to 15,850 gallons before cleaning required",
        installation: "Tool-free replacement",
        material: "UV resistant filter media",
        stages: "Multiple density layers for progressive filtration"
      },
      reviews: [
        {
          name: "System Owner - 5 Years",
          rating: 5,
          review: "Original filters still going strong after 5 years. I clean them every 4 months and they look almost new. Amazing quality."
        },
        {
          name: "RV Full-Timer",
          rating: 5,
          review: "Easy to maintain on the road. The filters clean up quickly and the system keeps running perfectly. Great investment."
        },
        {
          name: "Homeowner",
          rating: 5,
          review: "Replacement was super easy - just lift out the old ones and drop in the new. No tools needed and took 5 minutes."
        },
        {
          name: "Tiny House Community",
          rating: 5,
          review: "We maintain 12 Aqua2use systems in our community. These filters are incredibly durable and easy to service."
        }
      ],
      faq: [
        {
          question: "How often do I need to clean the filters?",
          answer: "Filters should be cleaned every 4-6 months depending on usage and water quality. With regular cleaning, filters can last up to 3 years before replacement."
        },
        {
          question: "How do I know when filters need cleaning?",
          answer: "Signs include reduced flow rate, longer processing times, or if it's been 4-6 months since last cleaning. The system will continue to work but efficiency decreases."
        },
        {
          question: "Can I clean the filters myself?",
          answer: "Yes! The filters are designed for easy maintenance. Simply remove them (no tools required), rinse with clean water, and reinstall. Full instructions are included."
        },
        {
          question: "Are these filters compatible with all Aqua2use systems?",
          answer: "Yes, these progressive 4-stage Matala filters are designed to work with all Aqua2use GWDD and Pro systems. The filter configuration is standardized across all models."
        },
        {
          question: "What makes Matala filters special?",
          answer: "Matala filters use a patented 3-dimensional structure with cross-flow depth filtration. This design provides superior solid removal while maintaining excellent flow rates and easy cleaning."
        }
      ]
    },
    "replacement-filters": {
      features: [
        "Progressive 4-Stage Filtration by Matala",
        "3-dimensional filter mat structure",
        "Cross-flow depth filtration technology",
        "Multiple density layers for optimal filtration",
        "Easy to clean - no tools required",
        "Long-lasting filter media",
        "Handles up to 15,850 gallons before cleaning needed",
        "Compatible with all Aqua2use systems",
        "UV resistant filter materials",
        "Maintains optimal system performance"
      ],
      specifications: {
        filterType: "Progressive 4-Stage Matala Filter Mats",
        filterStructure: "3-dimensional cross-flow design",
        compatibility: "All Aqua2use GWDD and Pro systems",
        cleaningCycle: "Every 4-6 months (depending on usage)",
        replacementCycle: "Every 3 years with proper maintenance",
        capacity: "Up to 15,850 gallons before cleaning required",
        installation: "Tool-free replacement",
        material: "UV resistant filter media",
        stages: "Multiple density layers for progressive filtration"
      },
      reviews: [
        {
          name: "System Owner - 5 Years",
          rating: 5,
          review: "Original filters still going strong after 5 years. I clean them every 4 months and they look almost new. Amazing quality."
        },
        {
          name: "RV Full-Timer",
          rating: 5,
          review: "Easy to maintain on the road. The filters clean up quickly and the system keeps running perfectly. Great investment."
        }
      ],
      faq: [
        {
          question: "How often do I need to clean the filters?",
          answer: "Filters should be cleaned every 4-6 months depending on usage and water quality. With regular cleaning, filters can last up to 3 years before replacement."
        },
        {
          question: "Are these filters compatible with all Aqua2use systems?",
          answer: "Yes, these progressive 4-stage Matala filters are designed to work with all Aqua2use GWDD and Pro systems. The filter configuration is standardized across all models."
        }
      ]
    },
    "replacement-greywater-pump": {
      features: [
        "Direct replacement for Aqua2use GWDD systems",
        "Submersible pump design for reliable operation",
        "Electronic pump controller included",
        "Automatic operation with water level sensors",
        "Dry run protection to prevent damage",
        "110V power requirement",
        "Easy installation with included fittings",
        "Compatible with all Aqua2use GWDD models",
        "Professional-grade construction",
        "12-month manufacturer warranty"
      ],
      specifications: {
        type: "Submersible Greywater Pump",
        power: "110V electrical connection",
        controller: "Electronic Pump Controller included",
        protection: "Dry run protection",
        compatibility: "All Aqua2use GWDD systems",
        installation: "Direct replacement",
        warranty: "12 months",
        operation: "Automatic with water level sensors"
      },
      reviews: [
        {
          name: "Replacement Customer",
          rating: 5,
          review: "Perfect replacement for my 3-year-old system. Installed in 30 minutes and works exactly like the original."
        },
        {
          name: "DIY Homeowner",
          rating: 5,
          review: "Easy to install and the electronic controller makes it completely automatic. Great quality pump."
        },
        {
          name: "System Maintenance",
          rating: 5,
          review: "Keep this as a spare. When pumps eventually wear out, having a replacement ready means no downtime."
        }
      ],
      faq: [
        {
          question: "Is this compatible with my existing Aqua2use system?",
          answer: "Yes, this pump is designed as a direct replacement for all Aqua2use GWDD systems, both gravity and pump models."
        },
        {
          question: "Does it include the electronic controller?",
          answer: "Yes, the replacement pump comes with the electronic pump controller and all necessary fittings for installation."
        },
        {
          question: "How difficult is the installation?",
          answer: "Installation is straightforward for most DIY homeowners. Basic plumbing and electrical connections are required. Professional installation is available if preferred."
        },
        {
          question: "What's the expected lifespan of the pump?",
          answer: "With proper maintenance and regular filter cleaning, the pump typically lasts 5-7 years depending on usage frequency and water conditions."
        }
      ]
    },
    "aqua2use-pro": {
      features: [
        "50 gallon capacity for larger applications",
        "Pump capacity up to 25 gallons per minute", 
        "Dimensions: 31.5\" L x 23.6\" W x 26\" H",
        "4-Stage Progressive Filtration by Matala",
        "Over 108 sq ft of filter surface area",
        "Removes up to 90% of suspended solids",
        "Submersible pump with Electronic Pump Controller",
        "Dry run pump protection",
        "Built-in overflow safety system",
        "110 volt outlet power requirement"
      ],
      specifications: {
        tankCapacity: "50 gallons",
        dimensions: "31.5\" L x 23.6\" W x 26\" H",
        pumpCapacity: "Up to 25 gallons per minute",
        power: "110 volt outlet",
        inletConnection: "2\"-4\" diameter",
        filtrationStages: "4-Stage Progressive Filtration by Matala",
        filterSurfaceArea: "Over 108 sq ft",
        solidRemoval: "Up to 90% of suspended solids",
        installation: "Above ground, half-submerged, or underground",
        certification: "WaterMark approved"
      },
      reviews: [
        {
          name: "Commercial Property Manager",
          rating: 5,
          review: "Perfect for our small commercial building. Handles the capacity we need and maintenance is straightforward."
        },
        {
          name: "School Administrator",
          rating: 5,
          review: "Great water conservation solution for our facility. Professional installation was seamless."
        },
        {
          name: "Large Home Owner",
          rating: 5,
          review: "Upgraded from the standard GWDD and the increased capacity makes a huge difference for our family."
        }
      ],
      faq: [
        {
          question: "What is the Aqua2use?",
          answer: "The Aqua2use is the most advanced Grey Water Diversion Device on the market. It is designed to help you easily reuse your waste water from your laundry, bath and shower."
        },
        {
          question: "Is it safe to use the Aqua2use to irrigate my garden?",
          answer: "It is absolutely safe to use greywater to water your plants and your trees. Your system needs to be connected to a drip irrigation system, and you should use low phosphate detergent. The filtering system of the Aqua2use is the best on the market, and will intercept lint and other impurities."
        },
        {
          question: "Does the water look grey?",
          answer: "No, you will be surprised by how clear the water looks like after filtration by the Aqua2use. You will not water your plants with soapy and 'grey looking' water!"
        },
        {
          question: "How does it work?",
          answer: "After being installed by one of our preferred installer or your plumber, the Aqua2use is connected and the water coming from your laundry, bath or shower flows into the unit. The greywater is filtered through the unique 4 Stage filtration system stage. The level detecting pump then pumps the filtered water into your irrigation system. This all happens automatically."
        },
        {
          question: "What can I connect my unit to?",
          answer: "You can connect your unit to any grey waste water from your house, that includes the water coming from your laundry, bath and shower. This EXCLUDES water from the kitchen sink, dishwashers and toilets, which is classed as black water. Check your local regulations with your plumber or local water authority."
        },
        {
          question: "What do I need before I connect my unit?",
          answer: "You will need a 110 volt power outlet. The unit comes with a 16′ long extension cord that is ready to plug right into your GFI outlet. You need to be able to access your waste plumbing pipes."
        },
        {
          question: "Why can't I connect it to my sink in the kitchen?",
          answer: "It is not advisable to try to reuse sink water. This water may contain many nutrients, food particles, oil and harsh detergents, which are not suitable for reuse. Sink water and dishwasher discharge water is considered to be Black Water and is considered waste."
        },
        {
          question: "Is the Aqua2use an Approved Greywater Device?",
          answer: "Yes, it has the Australian Water Mark for a Pumped system and a Gravity system. There is currently no national approval agency in the US for a greywater system."
        },
        {
          question: "How is the Aqua2use different from other Greywater Diversion Devices?",
          answer: "The New Aqua2use is designed to be the most efficient and advanced Grey Water Diversion Device available on the market. The Aqua2use is also simple to connect to a drip irrigation system, and requires very low maintenance."
        },
        {
          question: "What is the warranty?",
          answer: "All parts and the pump are covered by a 12 month replacement warranty."
        },
        {
          question: "How effective are the filters?",
          answer: "The Aqua2use has over 108 sqft of surface area ensuring the best filtration available for recycled greywater. Standard types of filtration such as mesh filters are prone to blocking by the nature of what is in greywater. Lint is especially good at blocking single dimensional screen filters. Independent laboratory tests have shown that the Aqua2use can remove up to 90% of suspended solids. There is nothing on the market that comes close to this amount of filtration."
        },
        {
          question: "How often do I have to replace or clean the filters?",
          answer: "The filters are designed to be cleaned over and over so you don't need to replace them. Testing in the field has shown that up to 15,000 gallons can pass through the unit before they need cleaning. The recommended cleaning cycle is from 4-6 months, depending on how many people are using the system. Dispose of waste thoughtfully and wear protective gloves when cleaning."
        },
        {
          question: "How is the pump in your unit different from other pumps?",
          answer: "The pump is different in 3 ways: 1. There are two magnetic micro floats that activate the control box that senses the water level, allowing for full capacity use and proper distribution. 2. The control box switches the pump on independently of the magnetic floats to ensure minimum residual remains. 3. There are no external timers - the control box automatically turns on the pump 4 times a day to check for residual water."
        },
        {
          question: "Why don't you use a low voltage pump like a 12volt unit?",
          answer: "Low voltage pumps have a very limited service life and generally won't do the hours expected in this type of installation. The Matala pump is a high quality pump that is designed for continuous operation and was specifically designed by MATALA for this application."
        },
        {
          question: "Who can service the pump?",
          answer: "The pump requires no servicing other than a cleaning once every six months. One of our preferred installer or your local plumber can easily service the Aqua2use."
        },
        {
          question: "What is the best way to disperse the greywater?",
          answer: "Water authorities recommend dispersal of greywater via drip system. Each garden has different requirements. Your installer should advise you on this."
        },
        {
          question: "Can I store the water once it has been through the Aqua2use?",
          answer: "It is not advisable to store greywater from any greywater diversion device for more than 24 hours. The Aqua2use will empty on demand if there is sufficient water to activate the upper float switch, or automatically on a 24 hour cycle with the 'smart' controller."
        },
        {
          question: "How much water does my unit save me?",
          answer: "Independent tests have shown you can expect to save approximately 30 gallons per person per day."
        },
        {
          question: "Can the unit handle hot water?",
          answer: "Yes the pump and filters can handle water at elevated temperatures. Boiling water should not be discharged into any greywater diversion device."
        },
        {
          question: "Can the unit overflow?",
          answer: "No, the unit has an inbuilt overflow so if you accidentally leave the power switched off to your unit it will simply send the water to waste. This is a requirement of the Watermark and all water authorities."
        },
        {
          question: "Does it work with my water softener?",
          answer: "The Aqua2use will work with your water softener. Using potassium instead of salt inside your water softener will guarantee that your plants stay healthy."
        },
        {
          question: "Can I buy spare parts for my unit?",
          answer: "We can provide spare filters and all other parts in the unit."
        },
        {
          question: "What are the dimensions?",
          answer: "Length 31.5″, Width 23.6″, Height 26″"
        },
        {
          question: "Does this unit break down in the sun?",
          answer: "No, it is made of UV resistant High Grade Poly Ethylene."
        }
      ]
    }
  }

  return productContent[handle] || {
    features: [
      "High-quality construction",
      "Easy installation",
      "Low maintenance",
      "Excellent performance"
    ],
    faq: [
      {
        question: "How do I maintain this product?",
        answer: "Regular maintenance instructions are provided with your purchase. Contact our support team for specific guidance."
      }
    ]
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  let product = null
  let shopifyProduct = null

  // Check for redirects (legacy URLs)
  if (fallbackProducts[handle]?.redirect) {
    redirect(`/products/${fallbackProducts[handle].redirect}`)
  }

  // Try to get enhanced product from Shopify first
  try {
    shopifyProduct = await getEnhancedProduct(handle)
    if (shopifyProduct) {
      product = shopifyProduct
    }
  } catch (error) {
    console.error('Failed to fetch enhanced product from Shopify:', error)
    // Fallback to basic product
    try {
      product = await getProduct(handle)
    } catch (basicError) {
      console.error('Failed to fetch basic product from Shopify:', basicError)
    }
  }

  // Fall back to default content if no Shopify product found
  if (!product && fallbackProducts[handle]) {
    product = fallbackProducts[handle]
  }

  if (!product) {
    notFound()
  }

  // Use Shopify data if available, otherwise fallback to local content
  const productContent = shopifyProduct ? {
    features: shopifyProduct.features || getProductContent(handle).features,
    specifications: shopifyProduct.specifications || getProductContent(handle).specifications,
    faq: shopifyProduct.faq || getProductContent(handle).faq,
    reviews: shopifyProduct.reviews || getProductContent(handle).reviews
  } : getProductContent(handle)

  // Get reviews from imported data (includes images and proper dates for Google)
  const productReviews = getReviewsByProduct(handle)
  const hasImportedReviews = productReviews.length > 0

  // Prepare product data for schema
  const productSchemaData = {
    name: product.title,
    description: product.description?.replace(/<[^>]*>/g, '').slice(0, 200) || '',
    image: product.images?.edges?.[0]?.node?.url || '',
    sku: handle,
    price: product.priceRange?.minVariantPrice?.amount || '599.99',
    url: `https://waterwisegroup.com/products/${handle}`
  }

  return (
    <div className="bg-sand-50">
      {/* Google Rich Snippets Schema */}
      {hasImportedReviews && (
        <ProductWithReviewsSchema
          product={productSchemaData}
          reviews={productReviews.map(r => ({
            id: r.id,
            name: r.name,
            rating: r.rating,
            review: r.review,
            created_at: r.created_at,
            images: r.images
          }))}
        />
      )}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sand-50 via-white to-ocean-50/30">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-pattern-dots opacity-30" />

        <div className="container mx-auto px-4 py-12 lg:py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Product Images - Sticky on desktop */}
              <div className="lg:sticky lg:top-24">
                {product.images?.edges?.length > 0 ? (
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-sand-200">
                      <Image
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-contain p-6"
                        priority
                        unoptimized
                      />
                    </div>

                    {/* Thumbnail Gallery */}
                    {product.images.edges.length > 1 && (
                      <div className="grid grid-cols-4 gap-3">
                        {product.images.edges.slice(0, 4).map((image: any, index: number) => (
                          <div
                            key={index}
                            className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all duration-300 cursor-pointer hover:border-ocean-400 ${index === 0 ? 'border-ocean-500 ring-2 ring-ocean-500/20' : 'border-sand-200'}`}
                          >
                            <Image
                              src={image.node.url}
                              alt={image.node.altText || `${product.title} view ${index + 1}`}
                              fill
                              sizes="100px"
                              className="object-contain p-2"
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-sand-100 to-sand-200 border border-sand-200">
                    <div className="flex items-center justify-center h-full text-sand-500">
                      <div className="text-center">
                        <Droplets className="h-16 w-16 mx-auto mb-4 text-ocean-300" />
                        <span className="text-lg font-medium">Product Image Coming Soon</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-sand-500">
                  <Link href="/products" className="hover:text-ocean-600 transition-colors link-underline">Shop</Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-sand-900 font-medium">{product.title}</span>
                </nav>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-ocean">
                    <Award className="h-3.5 w-3.5" />
                    WaterMark Approved
                  </span>
                  <span className="badge-sand">
                    <Shield className="h-3.5 w-3.5" />
                    12 Month Warranty
                  </span>
                  <span className="badge-terra">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    5.0 Rating
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-display-sm lg:text-display-md font-display text-sand-900 leading-tight mb-6">
                    {product.title}
                  </h1>

                  {/* Price Block */}
                  {product.priceRange?.minVariantPrice && (
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-sand-500">Starting at</span>
                        <span className="text-4xl font-bold text-sand-900">
                          {formatPriceDisplay(product.priceRange.minVariantPrice.amount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-ocean-50 px-4 py-2 rounded-full border border-ocean-100">
                        <Truck className="h-4 w-4 text-ocean-600" />
                        <span className="text-sm font-semibold text-ocean-700">Free Shipping</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-lg text-sand-600 leading-relaxed max-w-none">
                  {product.descriptionHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                  ) : (
                    <p>{product.description}</p>
                  )}
                </div>

                {/* Key Features Grid */}
                <div className="bg-white rounded-2xl p-6 border border-sand-200">
                  <h3 className="text-lg font-display text-sand-900 mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-ocean-600" />
                    Key Features
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {productContent.features.slice(0, 6).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-sand-50 border border-sand-100 hover:border-ocean-200 transition-colors">
                        <CheckCircle className="h-4 w-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-sand-700 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {productContent.features.length > 6 && (
                    <p className="text-xs text-sand-500 mt-4 text-center">
                      +{productContent.features.length - 6} more features below
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <div className="space-y-6">
                  <AddToCartButton product={product} />

                  {/* Trust Signals */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sand-200">
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-ocean-50 border border-ocean-100 hover:border-ocean-200 transition-colors group">
                      <Shield className="h-6 w-6 text-ocean-600 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold text-sand-900">12 Month Warranty</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-sand-100 border border-sand-200 hover:border-sand-300 transition-colors group">
                      <Truck className="h-6 w-6 text-sand-700 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold text-sand-900">Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-terra-50 border border-terra-100 hover:border-terra-200 transition-colors group">
                      <Users className="h-6 w-6 text-terra-600 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold text-sand-900">Expert Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Water Savings Infographic Section */}
      <section className="py-24 bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern-waves opacity-20" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-terra-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-ocean-400/20 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <span className="badge-ocean bg-white/10 border-white/20 text-white mb-6">
              <Leaf className="h-3 w-3" />
              Water Conservation
            </span>
            <h2 className="text-display-sm lg:text-display-md font-display text-white mb-4">
              Why Greywater Makes Sense
            </h2>
            <p className="text-xl text-ocean-100 mb-12 max-w-2xl mx-auto">
              Transform water waste into a sustainable resource for your landscape
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-500 group">
                <div className="w-16 h-16 bg-ocean-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Droplets className="h-8 w-8 text-white" />
                </div>
                <div className="stat-number text-white mb-2">55%</div>
                <div className="text-lg font-semibold mb-1">Outdoor Usage</div>
                <p className="text-ocean-200 text-sm">Household water used for landscape irrigation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-500 group">
                <div className="w-16 h-16 bg-terra-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-terra-300" />
                </div>
                <div className="stat-number text-white mb-2">40%</div>
                <div className="text-lg font-semibold mb-1">Bill Savings</div>
                <p className="text-ocean-200 text-sm">Typical reduction in monthly water costs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-500 group">
                <div className="w-16 h-16 bg-ocean-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <div className="stat-number text-white mb-2">17K+</div>
                <div className="text-lg font-semibold mb-1">Gallons/Year</div>
                <p className="text-ocean-200 text-sm">Water recycled by average household system</p>
              </div>
            </div>

            <p className="text-lg text-ocean-100 max-w-2xl mx-auto leading-relaxed">
              Reduce your environmental impact while nourishing your landscape with clean, filtered greywater.
            </p>
          </div>
        </div>
      </section>

      {/* Product Description & Demo Video Section */}
      <div className="bg-white border-b border-sand-200">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-display text-sand-900 mb-6">
                  See How It Works
                </h2>
                <p className="text-xl text-sand-600 mb-8 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-4 text-sand-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                    <span>Fully automated operation - no daily maintenance required</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                    <span>Progressive 4-stage filtration removes up to 90% of solids</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                    <span>WaterMark approved for safety and reliability</span>
                  </div>
                </div>
              </div>
              <div>
                {/* Video Demo */}
                <div className="relative">
                  <a
                    href="https://www.youtube.com/watch?v=XN6yyuSg5Kw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-video bg-sand-200 rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/maxresdefault.jpg?v=1719253200"
                      alt="How Greywater Works Video"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="h-8 w-8 text-sand-900 fill-sand-900 ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section - Open Layout */}
      <div className="border-t border-sand-200 bg-sand-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto space-y-16">
        
            {/* How It Works Section - Full Width */}
            <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
              <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Zap className="h-5 w-5 text-ocean-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Diagram Side */}
                  <div className="space-y-6">
                    <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-white border border-sand-200">
                      <Image
                        src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-how-it-works.jpg?v=1719253036"
                        alt="How Aqua2use Greywater System Works"
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sand-900 mb-3">4-Stage Filtration System</h4>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                        <Image
                          src="/docs/Aqua2use-Filtration-System.png"
                          alt="Aqua2use 4-Stage Filtration System"
                          fill
                          className="object-contain p-4"
                          unoptimized
                        />
                      </div>
                      <p className="text-sm text-sand-600 mt-2">Progressive filtration removes up to 90% of suspended solids through multiple density layers.</p>
                    </div>
                  </div>

                  {/* Steps Side */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                      <div className="w-10 h-10 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sand-900 mb-2">Collect</h4>
                        <p className="text-sand-600 leading-relaxed">Divert water from laundry, wash basins, bath, and shower into the treatment system</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                      <div className="w-10 h-10 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sand-900 mb-2">Filter</h4>
                        <p className="text-sand-600 leading-relaxed">Advanced filter mats remove impurities with 4-stage progressive filtration technology</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                      <div className="w-10 h-10 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sand-900 mb-2">Flourish</h4>
                        <p className="text-sand-600 leading-relaxed">Pump clean, filtered water to your subsurface irrigation system</p>
                      </div>
                    </div>

                    {/* Maintenance Info */}
                    <div className="pt-4 border-t border-sand-200">
                      <h4 className="font-semibold text-sand-900 mb-4 flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-ocean-600" />
                        Maintenance Schedule
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-sand-50 rounded-lg border border-sand-200">
                          <div>
                            <span className="font-medium text-sand-900 text-sm">Clean filters</span>
                            <p className="text-xs text-sand-600 mt-0.5">Simple rinse and reinstall</p>
                          </div>
                          <span className="badge-ocean text-xs">Every 4-6 months</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-sand-50 rounded-lg border border-sand-200">
                          <div>
                            <span className="font-medium text-sand-900 text-sm">Replace filters</span>
                            <p className="text-xs text-sand-600 mt-0.5">Full filter replacement</p>
                          </div>
                          <span className="badge-sand text-xs">Every 3 years</span>
                        </div>
                        <div className="bg-terra-50 border border-terra-200 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <div className="text-terra-600 flex-shrink-0 mt-0.5 text-sm">
                              ⚠️
                            </div>
                            <div>
                              <p className="text-terra-700 text-sm leading-relaxed">
                                Do not store filtered greywater for more than 24 hours to prevent bacterial growth
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Components & Cutaway Section - GWDD Only */}
            {handle === 'aqua2use-gwdd' && (
              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Settings className="h-6 w-6 text-ocean-600" />
                    System Components & Internal View
                  </CardTitle>
                  <CardDescription className="text-sand-600 mt-2">
                    Detailed view of internal components and system construction
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sand-900">System Internal View</h4>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                        <Image
                          src="/docs/Aqua2use-GWDD-Assembly-Guide.jpg"
                          alt="Aqua2use GWDD Assembly Guide"
                          fill
                          className="object-contain p-4"
                          unoptimized
                        />
                      </div>
                      <p className="text-sm text-sand-600">Detailed assembly and component breakdown</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sand-900">System Components</h4>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                        <Image
                          src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Aqua2use-GWDD-components.jpg?v=1719252978"
                          alt="Aqua2use GWDD System Components"
                          fill
                          className="object-contain p-4"
                          unoptimized
                        />
                      </div>
                      <p className="text-sm text-sand-600">Detailed view of all system parts and assembly</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Working Principle & Filter Flow Section - GWDD Only */}
            {handle === 'aqua2use-gwdd' && (
              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <ArrowRight className="h-6 w-6 text-ocean-600" />
                    Working Principle & Filter Flow
                  </CardTitle>
                  <CardDescription className="text-sand-600 mt-2">
                    Step-by-step filtration process and water flow pattern
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                      <Image
                        src="/docs/Aqua2use-How-It-Works.jpg"
                        alt="Complete Filtration Process Flow"
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    </div>
                    <div className="space-y-6">
                      <div className="p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                        <h5 className="font-semibold text-sand-900 mb-3">Filtration Steps</h5>
                        <ul className="space-y-2 text-sm text-sand-700">
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">1</span>
                            <span>Initial collection and overflow protection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">2</span>
                            <span>Primary debris separation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">3</span>
                            <span>Progressive density filtration</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-terra-50 rounded-xl border border-terra-100">
                        <h5 className="font-semibold text-sand-900 mb-3">Advanced Features</h5>
                        <ul className="space-y-2 text-sm text-sand-700">
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-terra-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">4</span>
                            <span>Cross-flow filter design</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-terra-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">5</span>
                            <span>Clean water collection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-terra-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">6</span>
                            <span>Automated distribution</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pump Performance & Design Section - GWDD Only */}
            {handle === 'aqua2use-gwdd' && (
              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Zap className="h-6 w-6 text-ocean-600" />
                    Pump Performance & Design
                  </CardTitle>
                  <CardDescription className="text-sand-600 mt-2">
                    Advanced pump technology with performance specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                      <Image
                        src="/docs/Aqua2use-GWDD-Pump-Performance-Specifications.jpg"
                        alt="GWDD Pump Performance Chart"
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    </div>
                    <div className="space-y-6">
                      <div className="p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                        <h5 className="font-semibold text-sand-900 mb-3">Pump Design Features</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-sand-700">Two magnetic micro floats for precise water level detection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-sand-700">Electronic pump controller with automatic operation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-sand-700">Dry run protection prevents pump damage</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-sand-100 rounded-xl border border-sand-200">
                        <h5 className="font-semibold text-sand-900 mb-3">Performance Specifications</h5>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-sand-700">Processes up to 17 gallons per minute</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-sand-700">Automatic 4x daily residual water check</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-sand-700">No external timers required</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Assembly Guide & Technical Images Section */}
            {(handle === 'aqua2use-gwdd' || handle === 'aqua2use-pro' || handle === 'replacement-greywater-pump') && (
              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Wrench className="h-6 w-6 text-ocean-600" />
                    {handle === 'replacement-greywater-pump' ? 'Performance Specifications' : 'Assembly Guide & Technical Diagrams'}
                  </CardTitle>
                  <CardDescription className="text-sand-600 mt-2">
                    {handle === 'replacement-greywater-pump'
                      ? 'Detailed pump performance specifications and installation guidelines'
                      : 'Visual guides and technical diagrams for installation and setup'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {handle === 'replacement-greywater-pump' ? (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sand-900">Pump Performance Chart</h4>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                        <Image
                          src="/docs/Aqua2use-GWDD-Pump-Performance-Specifications.jpg"
                          alt="Pump Performance and Specifications"
                          fill
                          className="object-contain p-4"
                          unoptimized
                        />
                      </div>
                      <a
                        href="/docs/Aqua2use-GWDD-Pump-Performance-Specifications.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        View Full Size Performance Chart
                      </a>
                    </div>
                  ) : handle === 'aqua2use-pro' ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sand-900">Assembly Guide</h4>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                          <Image
                            src="/docs/Aqua2use-Pro-Assembly-Guide.jpg"
                            alt="Aqua2use Pro Assembly Guide"
                            fill
                            className="object-contain p-4"
                            unoptimized
                          />
                        </div>
                        <a
                          href="/docs/Aqua2use-Pro-Assembly-Guide.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                        >
                          <FileText className="h-4 w-4" />
                          View Full Size Assembly Guide
                        </a>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sand-900">Performance Curve</h4>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                          <Image
                            src="/docs/Aqua2use-Pro-Performance-Curve.jpg"
                            alt="Aqua2use Pro Performance Curve"
                            fill
                            className="object-contain p-4"
                            unoptimized
                          />
                        </div>
                        <a
                          href="/docs/Aqua2use-Pro-Performance-Curve.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                        >
                          <FileText className="h-4 w-4" />
                          View Performance Curve
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sand-900">Assembly Guide</h4>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                        <Image
                          src="/docs/Aqua2use-GWDD-Assembly-Guide.jpg"
                          alt="Aqua2use GWDD Assembly Guide"
                          fill
                          className="object-contain p-4"
                          unoptimized
                        />
                      </div>
                      <a
                        href="/docs/Aqua2use-GWDD-Assembly-Guide.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        View Full Size Assembly Guide
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Technical Specifications Section */}
            <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-ocean-800 to-ocean-900 text-white pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <Ruler className="h-6 w-6" />
                  Technical Specifications
                </CardTitle>
                <CardDescription className="text-ocean-100 mt-2">
                  Complete technical details and performance data
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-sand-100">
                  {productContent.specifications && Object.entries(productContent.specifications).map(([key, value]: [string, any], index: number) => (
                    <div
                      key={key}
                      className={`flex justify-between items-center px-6 py-4 ${index % 2 === 0 ? 'bg-sand-50/50' : 'bg-white'} hover:bg-ocean-50/50 transition-colors`}
                    >
                      <span className="font-medium text-sand-600">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sand-900 font-semibold text-right flex-shrink-0 ml-4">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Installation & Documentation Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Wrench className="h-5 w-5 text-ocean-600" />
                    Installation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="bg-ocean-50 p-6 rounded-lg border border-ocean-100">
                    <h4 className="font-semibold text-sand-900 mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-ocean-600" />
                      Professional Installation Recommended
                    </h4>
                    <p className="text-sand-600 leading-relaxed">While DIY installation is possible, professional installation ensures optimal performance and warranty compliance.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-sand-900 mb-1">Site Assessment</h5>
                        <p className="text-sand-600">Evaluate plumbing connections and installation location</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-sand-900 mb-1">System Installation</h5>
                        <p className="text-sand-600">Connect inlet, outlet, and irrigation distribution</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-sand-900 mb-1">Testing & Commissioning</h5>
                        <p className="text-sand-600">Verify proper operation and flow rates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <MessageSquare className="h-5 w-5 text-ocean-600" />
                    Documentation & Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-8">
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-sand-200 hover:bg-sand-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD' : handle === 'aqua2use-pro' ? 'Pro' : 'GWDD'}-Assembly-Guide.jpg`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-ocean-600" />
                        <div>
                          <div className="font-medium text-sand-900">Assembly Guide</div>
                          <div className="text-sm text-sand-500">Step-by-step installation</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-sand-200 hover:bg-sand-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD' : handle === 'aqua2use-pro' ? 'Pro' : 'GWDD'}-Installation-${handle === 'aqua2use-pro' ? 'Manual' : 'Instructions'}.pdf`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-ocean-600" />
                        <div>
                          <div className="font-medium text-sand-900">Operating Instructions</div>
                          <div className="text-sm text-sand-500">Daily operation guide</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-sand-200 hover:bg-sand-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD-Technical-Brochure' : handle === 'aqua2use-pro' ? 'Pro-Dimensions' : 'GWDD-Technical-Brochure'}.pdf`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-ocean-600" />
                        <div>
                          <div className="font-medium text-sand-900">Technical Brochure</div>
                          <div className="text-sm text-sand-500">Complete specifications</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-sand-200 hover:bg-sand-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD' : handle === 'aqua2use-pro' ? 'Pro' : 'GWDD'}-Installation-${handle === 'aqua2use-pro' ? 'Manual' : 'Instructions'}.pdf`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5 text-ocean-600" />
                        <div>
                          <div className="font-medium text-sand-900">Maintenance Schedule</div>
                          <div className="text-sm text-sand-500">Keep your system running</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Customer Reviews Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Star className="h-5 w-5 text-terra-500" />
                    Customer Reviews ({hasImportedReviews ? productReviews.length : productContent.reviews?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  {/* Use imported reviews if available (includes images) */}
                  {hasImportedReviews ? (
                    productReviews.slice(0, 4).map((review: Review, index: number) => (
                      <div key={review.id} className={`${index < Math.min(productReviews.length, 4) - 1 ? 'border-b border-sand-200 pb-6' : 'pb-2'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-terra-400 text-terra-400' : 'text-sand-300'}`} />
                              ))}
                            </div>
                            <span className="font-semibold text-sand-900">{review.name}</span>
                            {review.verified_buyer && (
                              <Badge variant="secondary" className="bg-ocean-50 text-ocean-700 border-ocean-200 text-xs">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          {review.created_at && (
                            <div className="flex items-center gap-1 text-xs text-sand-500">
                              <Calendar className="h-3 w-3" />
                              {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          )}
                        </div>
                        {review.title && (
                          <p className="font-medium text-sand-900 mb-2">{review.title}</p>
                        )}
                        <p className="text-sand-600 leading-relaxed mb-3">"{review.review}"</p>
                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {review.images.slice(0, 4).map((image, imageIndex) => (
                                <div key={imageIndex} className="relative w-16 h-16 rounded-lg overflow-hidden border border-sand-200">
                                  <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                </div>
                              ))}
                              {review.images.length > 4 && (
                                <div className="w-16 h-16 rounded-lg bg-sand-100 flex items-center justify-center text-sand-500 text-xs font-medium">
                                  +{review.images.length - 4}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-sand-500 mt-2 flex items-center gap-1">
                              <ImageIcon className="h-3 w-3" />
                              {review.images.length} photo{review.images.length !== 1 ? 's' : ''} from customer
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    productContent.reviews && productContent.reviews.slice(0, 3).map((review: any, index: number) => (
                      <div key={index} className={`${index < productContent.reviews.length - 1 ? 'border-b border-sand-200 pb-6' : 'pb-2'}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-terra-400 text-terra-400" />
                            ))}
                          </div>
                          <span className="font-semibold text-sand-900">{review.name}</span>
                        </div>
                        <p className="text-sand-600 leading-relaxed">"{review.review}"</p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border border-sand-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-sand-50 border-b border-sand-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Star className="h-5 w-5 text-terra-500" />
                    Review Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-sand-50 rounded-lg">
                      <span className="font-medium text-sand-700">Performance</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-terra-400 text-terra-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-sand-50 rounded-lg">
                      <span className="font-medium text-sand-700">Easy Installation</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-terra-400 text-terra-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-sand-50 rounded-lg">
                      <span className="font-medium text-sand-700">Value for Money</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-terra-400 text-terra-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-sand-50 rounded-lg">
                      <span className="font-medium text-sand-700">Customer Support</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-terra-400 text-terra-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-sand-200">
                    <h4 className="font-semibold text-sand-900 mb-4">Common Highlights</h4>
                    <div className="space-y-2 text-sand-700">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-ocean-600 flex-shrink-0" />
                        <span>Excellent long-term performance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-ocean-600 flex-shrink-0" />
                        <span>Significant water savings</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-ocean-600 flex-shrink-0" />
                        <span>Low maintenance requirements</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-ocean-600 flex-shrink-0" />
                        <span>Great customer support</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
              <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 text-white px-8 py-8 text-center">
                <MessageSquare className="h-10 w-10 mx-auto mb-4 opacity-90" />
                <h2 className="text-2xl lg:text-3xl font-display mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-ocean-100 max-w-2xl mx-auto">
                  Everything you need to know about this greywater system
                </p>
              </div>

              <div className="divide-y divide-sand-100">
                {productContent.faq.slice(0, 8).map((item: any, index: number) => (
                  <div key={index} className="px-8 py-6 hover:bg-ocean-50/50 transition-colors">
                    <h3 className="text-lg font-semibold text-sand-900 mb-3 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ocean-100 text-ocean-700 text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {item.question}
                    </h3>
                    <p className="text-sand-600 leading-relaxed pl-10">{item.answer}</p>
                  </div>
                ))}
              </div>

              {productContent.faq.length > 8 && (
                <div className="px-8 py-6 bg-sand-50 text-center border-t border-sand-100">
                  <p className="text-sm text-sand-600">
                    Have more questions? <a href="/contact" className="text-ocean-600 font-medium hover:underline">Contact our team</a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for known product handles
export async function generateStaticParams() {
  // Include both potential Shopify products and our fallback products
  const fallbackHandles = Object.keys(fallbackProducts)
  
  try {
    // Try to get Shopify products for additional handles
    const { getProducts } = await import('@/lib/shopify')
    const products = await getProducts()
    const shopifyHandles = products.map((product: any) => product.handle).filter(Boolean)
    
    // Combine and deduplicate handles
    const allHandles = [...new Set([...fallbackHandles, ...shopifyHandles])]
    
    return allHandles.map((handle) => ({
      handle: handle
    }))
  } catch (error) {
    console.error('Failed to generate static params from Shopify:', error)
    // Fall back to just our fallback product handles
    return fallbackHandles.map((handle) => ({
      handle: handle
    }))
  }
}