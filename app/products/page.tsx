import { getProducts } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Our Greywater Systems
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional-grade greywater recycling systems designed for easy installation and maximum water savings
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                {product.images?.edges?.[0]?.node && (
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{product.title}</CardTitle>
                <CardDescription className="mb-4">
                  {product.description}
                </CardDescription>
                {product.priceRange?.minVariantPrice && (
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                  </div>
                )}
                <Button asChild className="w-full">
                  <Link href={`/products/${product.handle}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Image
                src="/images/gwdd-gravity.jpg"
                alt="Aqua2use GWDD"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <CardTitle>Aqua2use GWDD</CardTitle>
              <CardDescription>Gravity & Pump Systems</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li>• Perfect for homes and cabins</li>
                <li>• Processes up to 150 gallons per day</li>
                <li>• Progressive filtration system</li>
                <li>• Easy DIY installation</li>
              </ul>
              <Button className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Image
                src="/images/gwdd-ug.jpg"
                alt="Aqua2use Pro"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <CardTitle>Aqua2use Pro</CardTitle>
              <CardDescription>Commercial Grade System</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li>• For larger properties & developments</li>
                <li>• Processes up to 500 gallons per day</li>
                <li>• Advanced multi-stage filtration</li>
                <li>• Professional installation recommended</li>
              </ul>
              <Button className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}