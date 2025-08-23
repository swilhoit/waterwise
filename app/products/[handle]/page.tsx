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
        amount: "1999.00",
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
    description: "The Aqua2use GWDD Pump System is ideal when gravity flow isn't possible. This system includes a reliable pump system for versatile installation options and can handle up to 150 gallons per day with the same proven progressive filtration technology.",
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
        amount: "3999.00",
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
    description: "Keep your Aqua2use system running at peak performance with genuine replacement filters. Our 3-stage filtration system includes coarse, fine, and carbon filters that are easy to replace with no tools required.",
    handle: "filters",
    priceRange: {
      minVariantPrice: {
        amount: "89.00",
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
            title: "Single Filter Set",
            priceV2: {
              amount: "89.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/10",
            title: "3-Pack Filter Set",
            priceV2: {
              amount: "249.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/11",
            title: "6-Pack Filter Set (Best Value)",
            priceV2: {
              amount: "449.00",
              currencyCode: "USD"
            },
            availableForSale: true
          }
        }
      ]
    }
  }
}

// Product-specific content data
function getProductContent(handle: string) {
  const productContent: { [key: string]: any } = {
    "aqua2use-gwdd": {
      features: [
        "Fully automated greywater treatment system",
        "Manages up to 17 gallons per minute",
        "Compact design (24\" × 15\" × 20\")",
        "4-stage progressive filtration",
        "UV resistant materials",
        "WaterMark approved certification",
        "Above or below ground installation"
      ],
      faq: [
        {
          question: "What type of water can be processed?",
          answer: "The system can process greywater from laundry, wash basins, baths, and showers. Do not use with blackwater from toilets or heavily contaminated water sources."
        },
        {
          question: "How often does the system require maintenance?",
          answer: "Clean filters every 4-6 months and replace filters every 3 years. Regular inspection of the pump and connections is recommended."
        },
        {
          question: "Can I install this system myself?",
          answer: "While DIY installation is possible, we recommend professional installation to ensure optimal performance and warranty compliance. The system comes with detailed installation instructions."
        },
        {
          question: "What is the warranty coverage?",
          answer: "The system includes a 12-month replacement warranty on parts and pump. Professional installation may extend certain warranty benefits."
        },
        {
          question: "Is the system suitable for all climates?",
          answer: "Yes, the system is designed to work in various climates. In freezing conditions, proper winterization may be required to prevent damage."
        }
      ]
    },
    "aqua2use-pro": {
      features: [
        "Commercial-grade greywater system",
        "Processes up to 500 gallons per day",
        "Advanced multi-stage filtration",
        "Stainless steel components",
        "Remote monitoring capability",
        "Professional installation included",
        "Extended warranty coverage"
      ],
      faq: [
        {
          question: "What size properties is this system suitable for?",
          answer: "The Pro system is designed for larger properties, multi-family units, and commercial applications processing 300-500 gallons per day."
        },
        {
          question: "Does professional installation come included?",
          answer: "Yes, professional installation and commissioning are included with the Pro system to ensure optimal performance."
        },
        {
          question: "Can the system be monitored remotely?",
          answer: "Yes, the Pro system includes remote monitoring capabilities that alert you to maintenance needs and performance issues."
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
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Tank Capacity</span>
                    <span>21 gallons</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Processing Capacity</span>
                    <span>17 gallons per minute</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Dimensions</span>
                    <span>23.2" × 14.6" × 19.7"</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Weight</span>
                    <span>45 lbs (empty)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Filtration Stages</span>
                    <span>4-stage progressive</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Solid Removal</span>
                    <span>Up to 90% (gravity)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Installation</span>
                    <span>Above/below ground</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Certification</span>
                    <span>WaterMark Approved</span>
                  </div>
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
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Sarah M.</span>
                  </div>
                  <p className="text-sm text-gray-600">"Perfect for our tiny house! Been running for 2 years with minimal maintenance. Water savings are incredible."</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Mike R.</span>
                  </div>
                  <p className="text-sm text-gray-600">"5 years and still going strong. Easy maintenance and great support from the team. Highly recommend!"</p>
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Lisa K.</span>
                  </div>
                  <p className="text-sm text-gray-600">"Installation was straightforward and the water conservation results exceeded our expectations."</p>
                </div>
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