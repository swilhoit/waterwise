import { getProduct } from '@/lib/shopify'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import { CheckCircle, Star, Shield, Truck, Users, Zap, Droplets, Settings } from 'lucide-react'

// Comprehensive fallback product data with variants
const fallbackProducts: { [key: string]: any } = {
  "aqua2use-gwdd": {
    id: "gid://shopify/Product/1",
    title: "Aqua2use GWDD Gravity System",
    description: "The Aqua2use Greywater Diversion Device (GWDD) Gravity System is perfect for homes and cabins with gravity-fed water systems. This innovative system processes up to 150 gallons per day using our proven progressive filtration technology, requiring no electricity to operate.",
    handle: "aqua2use-gwdd",
    priceRange: {
      minVariantPrice: {
        amount: "899.99",
        currencyCode: "USD"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "/images/gwdd-gravity.jpg",
            altText: "Aqua2use GWDD Gravity System"
          }
        },
        {
          node: {
            url: "/images/aqua2use-greywater-recycling-sytem.png",
            altText: "Aqua2use System Installation"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1",
            title: "Standard Kit",
            priceV2: {
              amount: "1999.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/2",
            title: "Standard Kit + Installation Manual",
            priceV2: {
              amount: "2099.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/3",
            title: "Premium Kit with Extra Filters",
            priceV2: {
              amount: "2299.00",
              currencyCode: "USD"
            },
            availableForSale: true
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
    id: "gid://shopify/Product/3",
    title: "Aqua2use Pro Commercial System",
    description: "The Aqua2use Pro is our high-capacity system designed for larger properties, multi-family units, and commercial applications. With advanced multi-stage filtration technology and commercial-grade components, it can process up to 500 gallons per day.",
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
            url: "/images/gwdd-ug.jpg",
            altText: "Aqua2use Pro Commercial System"
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
            id: "gid://shopify/ProductVariant/6",
            title: "Pro System - Standard",
            priceV2: {
              amount: "3999.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/7",
            title: "Pro System - With Installation Service",
            priceV2: {
              amount: "4999.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/8",
            title: "Pro System - Complete Package",
            priceV2: {
              amount: "5499.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  "filters": {
    id: "gid://shopify/Product/4",
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
            url: "/images/gwdd-gravity.jpg",
            altText: "Aqua2use Replacement Filters"
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
    id: "gid://shopify/Product/5",
    title: "Greywater Pump Replacement for the Aqua2use GWDD",
    description: "Official replacement pump for your Aqua2use GWDD system. This high-quality submersible pump is designed specifically for greywater applications and includes electronic controller for automatic operation.",
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
            url: "/images/gwdd-pump.jpg",
            altText: "Aqua2use Replacement Greywater Pump"
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/12",
            title: "Standard Replacement Pump",
            priceV2: {
              amount: "399.99",
              currencyCode: "USD"
            },
            availableForSale: true
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
          question: "What makes the Pro different from the standard GWDD?",
          answer: "The Pro has a 50-gallon capacity compared to 21 gallons, handles up to 25 GPM vs 17 GPM, and has over 108 sq ft of filter surface area for commercial applications."
        },
        {
          question: "What power requirements does it have?",
          answer: "The Pro system requires a 110V power outlet and includes a submersible pump with Electronic Pump Controller and dry run protection."
        },
        {
          question: "What size inlet connections does it accept?",
          answer: "The Pro system accepts inlet connections from 2\" to 4\" diameter, making it compatible with larger commercial plumbing systems."
        },
        {
          question: "Is it suitable for schools and commercial buildings?",
          answer: "Yes, the Pro is specifically designed for homes, schools, small commercial buildings, and other applications requiring higher capacity greywater processing."
        },
        {
          question: "What maintenance is required?",
          answer: "Filter cleaning is recommended every 4-6 months depending on usage. The large filter surface area reduces maintenance frequency compared to smaller units."
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images?.edges?.length > 0 ? (
            <>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
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
              
              {product.images.edges.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {product.images.edges.slice(1).map((edge: any, index: number) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={edge.node.url}
                        alt={edge.node.altText || product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <div className="flex items-center justify-center h-full text-gray-400">
                <span>No image available</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">WaterMark Approved</Badge>
            <Badge variant="outline">12 Month Warranty</Badge>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>
          
          {product.priceRange?.minVariantPrice && (
            <div className="text-3xl font-bold text-blue-600 mb-6">
              ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
            </div>
          )}

          <div className="prose prose-lg mb-8">
            <p>{product.description}</p>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Key Features:</h3>
            <div className="grid grid-cols-1 gap-2">
              {productContent.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {product.variants?.edges?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Product Options:</h3>
              <div className="space-y-2">
                {product.variants.edges.map((edge: any) => (
                  <div key={edge.node.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                    <span>{edge.node.title}</span>
                    <span className="font-semibold text-blue-600">
                      ${edge.node.priceV2.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AddToCartButton product={product} />
          
          {/* Trust Signals */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm">12 Month Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-sm">Expert Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Collect</h4>
                    <p className="text-sm text-gray-600">Divert water from laundry, wash basins, bath, and shower</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Filter</h4>
                    <p className="text-sm text-gray-600">Advanced filter mats remove impurities with 4-stage progressive filtration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Flourish</h4>
                    <p className="text-sm text-gray-600">Pump filtered water to subsurface irrigation system</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clean filters</span>
                    <Badge variant="outline">Every 4-6 months</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Replace filters</span>
                    <Badge variant="outline">Every 3 years</Badge>
                  </div>
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded">
                    ⚠️ Do not store filtered greywater over 24 hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {productContent.specifications && Object.entries(productContent.specifications).slice(0, Math.ceil(Object.keys(productContent.specifications).length / 2)).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {productContent.specifications && Object.entries(productContent.specifications).slice(Math.ceil(Object.keys(productContent.specifications).length / 2)).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installation" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Installation Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Professional Installation Recommended</h4>
                  <p className="text-sm text-gray-600">While DIY installation is possible, professional installation ensures optimal performance and warranty compliance.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Site Assessment</h5>
                      <p className="text-sm text-gray-600">Evaluate plumbing connections and installation location</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium">System Installation</h5>
                      <p className="text-sm text-gray-600">Connect inlet, outlet, and irrigation distribution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Testing & Commissioning</h5>
                      <p className="text-sm text-gray-600">Verify proper operation and flow rates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  📋 Assembly Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔧 Operating Instructions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📖 Technical Brochure
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🛠️ Maintenance Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">10 reviews • 100% positive</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {productContent.reviews && productContent.reviews.slice(0, 3).map((review: any, index: number) => (
                  <div key={index} className={`${index < productContent.reviews.length - 1 ? 'border-b pb-4' : 'pb-4'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{review.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">"{review.review}"</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Easy Installation</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Value for Money</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Support</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-2">Common Highlights:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• Excellent long-term performance</div>
                    <div>• Significant water savings</div>
                    <div>• Low maintenance requirements</div>
                    <div>• Great customer support</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-8">
          <div className="space-y-6">
            {productContent.faq.map((item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
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