import { getProduct } from '@/lib/shopify'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          {product.images?.edges?.length > 0 ? (
            <>
              {/* Main product image */}
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
              
              {/* Additional images gallery */}
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

        <div>
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

          {product.variants?.edges?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Options:</h3>
              <div className="space-y-2">
                {product.variants.edges.map((edge: any) => (
                  <div key={edge.node.id} className="flex justify-between items-center p-3 border rounded">
                    <span>{edge.node.title}</span>
                    <span className="font-semibold">
                      ${edge.node.priceV2.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AddToCartButton product={product} />
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