import { getProduct } from '@/lib/shopify'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// Removed tabs import - using open layout instead
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import { CheckCircle, Star, Shield, Truck, Users, Zap, Droplets, Settings, Calculator, Wrench, MessageSquare, FileText } from 'lucide-react'
import { formatPriceDisplay } from '@/lib/price-utils'
import { ProductReviews } from '@/components/product-reviews'

// Comprehensive fallback product data with correct Shopify variants and real images
const fallbackProducts: { [key: string]: any } = {
  "aqua2use-gwdd": {
    id: "gid://shopify/Product/7459820208334",
    title: "Aqua2use Grey Water Diversion System", 
    description: "The Aqua2use greywater diversion system is an advanced, affordable greywater treatment system. Available as gravity filtration or pump assisted unit, this grey water filter is the perfect choice for treating greywater from your laundry, bathroom sinks and showers.",
    handle: "aqua2use-gwdd",
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
            altText: "Greywater System Aqua2use"
          }
        },
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-pump.jpg?v=1719253734",
            altText: "Greywater System Aqua2use with pump"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/42716695429326",
            title: "Gravity - No Pump Included",
            priceV2: {
              amount: "599.99",
              currencyCode: "USD"
            },
            availableForSale: false
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/42716695462094",
            title: "GWDD - Includes Pump",
            priceV2: {
              amount: "899.99",
              currencyCode: "USD"
            },
            availableForSale: false
          }
        }
      ]
    }
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
            url: "/images/gwdd-ug.jpg",
            altText: "Aqua2use GWDD Pump System"
          }
        },
        {
          node: {
            url: "/images/aqua2use-greywater-recycling-sytem.png",
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
    }
  },
  "aqua2use-pro": {
    id: "gid://shopify/Product/7459819061454",
    title: "Aqua2use Pro",
    description: "The Aqua2use Pro (also called Aqua2use UG) is capable of handling large volume of greywater, up to 25 gallons per minute. The system is using the same type of filtration as the Aqua2use GWDD, but it is bigger in size to handle the commercial and multi-family applications. The system needs 110v power outlet to run its submersible pump.",
    handle: "aqua2use-pro",
    priceRange: {
      minVariantPrice: {
        amount: "2699.00",
        currencyCode: "USD"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-ug.jpg?v=1719241821",
            altText: "Greywater System Aqua2use Pro"
          }
        },
        {
          node: {
            url: "/images/aqua2use-greywater-recycling-sytem.png",
            altText: "Aqua2use Pro System Components"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/42713618972878",
            title: "Default Title",
            priceV2: {
              amount: "2699.00",
              currencyCode: "USD"
            },
            availableForSale: false
          }
        }
      ]
    }
  },
  "filters": {
    id: "gid://shopify/Product/7463774912718",
    title: "Replacement Filters",
    description: "Keep your Aqua2use system running at peak performance with genuine replacement filters. Our progressive 4-stage filtration system by Matala includes multiple density filter mats that are easy to clean and replace, ensuring optimal greywater treatment for years to come.",
    handle: "filters",
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
    }
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
    }
  },
  "replacement-filters": {
    id: "gid://shopify/Product/7463774912718",
    title: "Replacement Filters",
    description: "Easy Replacement – No Service Necessary Complete Set of 6 Filters Works with Aqua2use Gravity and GWDD No more cleaning of the filters every 6 months Simply remove the old filters and install the new ones in your unit",
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
            id: "gid://shopify/ProductVariant/42721174552782",
            title: "Default Title",
            priceV2: {
              amount: "249.99",
              currencyCode: "USD"
            },
            availableForSale: false
          }
        }
      ]
    }
  }
}

// Product-specific content data with exact content from original site
function getProductContent(handle: string) {
  const productContent: { [key: string]: any } = {
    "aqua2use-gwdd": {
      features: [
        "Fully automated greywater treatment system",
        "Manages 17 gallons per minute of greywater",
        "Compact device: 24\" Length, 15\" Width, 20\" Height",
        "State of the Art Progressive 4 Stage Filtration",
        "Built-in overflow safety system",
        "UV resistant materials",
        "WaterMark approved certification",
        "Cross-Flow depth filtration with 3-dimensional filter structure",
        "Solid removal: 75% (pump unit), 90% (gravity unit)",
        "Two magnetic micro floats with Electronic Pump Controller"
      ],
      specifications: {
        tankCapacity: "21 gallons",
        dimensions: "23.2\" x 14.6\" x 19.7\"",
        processingCapacity: "17 gallons per minute",
        filtrationStages: "4-stage progressive by Matala",
        solidRemoval: "Up to 90% (gravity unit)",
        installation: "Above ground, half-submerged, or underground",
        certification: "WaterMark approved",
        filterCapacity: "Up to 15,850 gallons before cleaning"
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
          review: "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan.",
          images: [
            {
              url: "/images/solutions/situation-tiny-rv-ai.jpg",
              alt: "Tiny house greywater installation",
              thumbnail: "/images/solutions/situation-tiny-rv-ai.jpg"
            }
          ]
        },
        {
          name: "Dave in Baja",
          rating: 5,
          review: "We live in the desert, and water is scarce. When we built our house, we put in two sewer lines - one for black water into the septic, and one for gray water into the garden.",
          images: [
            {
              url: "/images/customer-stories/arizona-oasis.jpg",
              alt: "Desert garden with greywater irrigation",
              thumbnail: "/images/customer-stories/arizona-oasis.jpg"
            },
            {
              url: "/images/solutions/situation-drought-ai.jpg", 
              alt: "Drought-resistant landscaping",
              thumbnail: "/images/solutions/situation-drought-ai.jpg"
            }
          ]
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
          answer: "The Aqua2use GWDD is the most advanced Grey Water Diversion Device available. It is designed to help you reuse your waste water from your laundry, bath, and shower."
        },
        {
          question: "How does it work?",
          answer: "It simply diverts grey water from your waste pipe and then filters the water as it passes through the Matala Patented 3-Dimensional Progressive Filter mats. Then the pumps get activated and diverts the water into your irrigation system. This all happens automatically."
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

  // Try to get product from Shopify first
  try {
    product = await getProduct(handle)
  } catch (error) {
    console.error('Failed to fetch product from Shopify:', error)
  }

  // Fall back to default content if no Shopify product found
  if (!product && fallbackProducts[handle]) {
    product = fallbackProducts[handle]
  }

  if (!product) {
    notFound()
  }

  const productContent = getProductContent(handle)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Images */}
              <div className="relative">

                {product.images?.edges?.length > 0 ? (
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border">
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border">
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <Droplets className="h-16 w-16 mx-auto mb-4 text-blue-300" />
                        <span className="text-lg font-medium">Product Image Coming Soon</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 px-3 py-1">
                    <Shield className="h-3 w-3 mr-1" />
                    WaterMark Approved
                  </Badge>
                  <Badge variant="secondary" className="border-blue-200 text-blue-700 hover:bg-blue-50 px-3 py-1">
                    <Zap className="h-3 w-3 mr-1" />
                    12 Month Warranty
                  </Badge>
                </div>
                
                {/* Title */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    {product.title}
                  </h1>
                  
                  {/* Price */}
                  {product.priceRange?.minVariantPrice && (
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-bold text-gray-600">
                        {formatPriceDisplay(product.priceRange.minVariantPrice.amount)}
                      </span>
                      <span className="text-lg text-gray-500 font-medium">
                        {product.priceRange.minVariantPrice.currencyCode}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-xl text-gray-600 leading-relaxed max-w-none">
                  <p>{product.description}</p>
                </div>

                {/* Key Features Grid */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    Key Features
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {productContent.features.slice(0, 6).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {productContent.features.length > 6 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        +{productContent.features.length - 6} more features in detailed specifications
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="space-y-4">
                  <AddToCartButton product={product} />
                  
                  {/* Trust Signals */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>12 Month Warranty</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4 text-gray-600" />
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>Expert Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section - Open Layout */}
      <div className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto space-y-16">
        
            {/* How It Works & Maintenance Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Zap className="h-5 w-5 text-gray-600" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  {/* How It Works Diagram */}
                  <div className="mb-6">
                    <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-white border">
                      <Image
                        src="/docs/Aqua2use-How-It-Works.jpg"
                        alt="How Aqua2use Greywater System Works"
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Collect</h4>
                      <p className="text-gray-600 leading-relaxed">Divert water from laundry, wash basins, bath, and shower into the treatment system</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Filter</h4>
                      <p className="text-gray-600 leading-relaxed">Advanced filter mats remove impurities with 4-stage progressive filtration technology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Flourish</h4>
                      <p className="text-gray-600 leading-relaxed">Pump clean, filtered water to your subsurface irrigation system</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Wrench className="h-5 w-5 text-gray-600" />
                    Maintenance Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <span className="font-medium text-gray-900">Clean filters</span>
                        <p className="text-sm text-gray-600 mt-1">Simple rinse and reinstall</p>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-900 px-3 py-1 border border-gray-200">Every 4-6 months</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <span className="font-medium text-gray-900">Replace filters</span>
                        <p className="text-sm text-gray-600 mt-1">Full filter replacement</p>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-900 px-3 py-1 border border-gray-200">Every 3 years</Badge>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-amber-600 flex-shrink-0 mt-0.5">
                          ⚠️
                        </div>
                        <div>
                          <p className="text-amber-800 font-medium mb-1">Important Safety Note</p>
                          <p className="text-amber-700 text-sm leading-relaxed">
                            Do not store filtered greywater for more than 24 hours to prevent bacterial growth
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assembly Guide & Technical Images Section */}
            {(handle === 'aqua2use-gwdd' || handle === 'aqua2use-pro' || handle === 'replacement-greywater-pump') && (
              <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Wrench className="h-6 w-6 text-gray-600" />
                    {handle === 'replacement-greywater-pump' ? 'Performance Specifications' : 'Assembly Guide & Technical Diagrams'}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {handle === 'replacement-greywater-pump' 
                      ? 'Detailed pump performance specifications and installation guidelines'
                      : 'Visual guides and technical diagrams for installation and setup'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {handle === 'replacement-greywater-pump' ? (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Pump Performance Chart</h4>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border">
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
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        View Full Size Performance Chart
                      </a>
                    </div>
                  ) : handle === 'aqua2use-pro' ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Assembly Guide</h4>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border">
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
                          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <FileText className="h-4 w-4" />
                          View Full Size Assembly Guide
                        </a>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Performance Curve</h4>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border">
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
                          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <FileText className="h-4 w-4" />
                          View Performance Curve
                        </a>
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <h4 className="font-semibold text-gray-900">Pro Features & Specifications</h4>
                        <div className="relative aspect-[5/2] rounded-lg overflow-hidden bg-white border">
                          <Image
                            src="/docs/Aqua2use-Pro-Features.jpg"
                            alt="Aqua2use Pro Features"
                            fill
                            className="object-contain p-4"
                            unoptimized
                          />
                        </div>
                        <a 
                          href="/docs/Aqua2use-Pro-Features.jpg" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <FileText className="h-4 w-4" />
                          View Features Diagram
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Assembly Guide</h4>
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border">
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
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
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
            <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Settings className="h-6 w-6 text-gray-600" />
                  Technical Specifications
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Detailed technical information and performance specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {productContent.specifications && Object.entries(productContent.specifications).slice(0, Math.ceil(Object.keys(productContent.specifications).length / 2)).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        <span className="text-gray-900 font-semibold text-right flex-shrink-0 ml-4">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {productContent.specifications && Object.entries(productContent.specifications).slice(Math.ceil(Object.keys(productContent.specifications).length / 2)).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        <span className="text-gray-900 font-semibold text-right flex-shrink-0 ml-4">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installation & Documentation Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Wrench className="h-5 w-5 text-gray-600" />
                    Installation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-600" />
                      Professional Installation Recommended
                    </h4>
                    <p className="text-gray-600 leading-relaxed">While DIY installation is possible, professional installation ensures optimal performance and warranty compliance.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Site Assessment</h5>
                        <p className="text-gray-600">Evaluate plumbing connections and installation location</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">System Installation</h5>
                        <p className="text-gray-600">Connect inlet, outlet, and irrigation distribution</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Testing & Commissioning</h5>
                        <p className="text-gray-600">Verify proper operation and flow rates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    Documentation & Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-8">
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-gray-200 hover:bg-gray-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD' : handle === 'aqua2use-pro' ? 'Pro' : 'GWDD'}-Assembly-Guide.jpg`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Assembly Guide</div>
                          <div className="text-sm text-gray-500">Step-by-step installation</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-gray-200 hover:bg-gray-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD' : handle === 'aqua2use-pro' ? 'Pro' : 'GWDD'}-Installation-${handle === 'aqua2use-pro' ? 'Manual' : 'Instructions'}.pdf`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Operating Instructions</div>
                          <div className="text-sm text-gray-500">Daily operation guide</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-gray-200 hover:bg-gray-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD-Technical-Brochure' : handle === 'aqua2use-pro' ? 'Pro-Dimensions' : 'GWDD-Technical-Brochure'}.pdf`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Technical Brochure</div>
                          <div className="text-sm text-gray-500">Complete specifications</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start h-14 text-left border-gray-200 hover:bg-gray-50 transition-all duration-200" asChild>
                    <a href={`/docs/Aqua2use-${handle === 'aqua2use-gwdd' ? 'GWDD' : handle === 'aqua2use-pro' ? 'Pro' : 'GWDD'}-Installation-${handle === 'aqua2use-pro' ? 'Manual' : 'Instructions'}.pdf`} target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Maintenance Schedule</div>
                          <div className="text-sm text-gray-500">Keep your system running</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Dynamic Reviews Section */}
            <ProductReviews 
              product={product} 
              fallbackReviews={productContent.reviews || []} 
            />

            {/* FAQ Section */}
            <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MessageSquare className="h-6 w-6 text-gray-600" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Everything you need to know about this greywater system
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {productContent.faq.map((item: any, index: number) => (
                    <div key={index} className="border border-gray-200 p-6 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-semibold text-gray-900 text-lg mb-3">
                        {item.question}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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