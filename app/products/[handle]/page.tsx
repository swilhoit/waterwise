import { getProduct } from '@/lib/shopify'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          {product.images?.edges?.map((edge: any, index: number) => (
            <div key={index} className="mb-4">
              <Image
                src={edge.node.url}
                alt={edge.node.altText || product.title}
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          ))}
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

          <Button size="lg" className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}